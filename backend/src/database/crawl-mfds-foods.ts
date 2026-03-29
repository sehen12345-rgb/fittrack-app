/**
 * 식품의약품안전처 (MFDS) 식품영양성분 DB 크롤러
 *
 * 사용법:
 *   1. https://www.foodsafetykorea.go.kr/api/openApiInfo.do 에서 무료 API 키 발급
 *   2. 환경 변수 설정: MFDS_API_KEY=발급받은키
 *   3. 실행: npx ts-node src/database/crawl-mfds-foods.ts
 *
 * 또는 공공데이터포털 (data.go.kr) 에서 "식품의약품안전처_식품영양성분DB" 검색 후 신청
 */

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { FoodItem } from '../food/food-item.entity';
import { FoodSource } from '../common/enums';
import * as path from 'path';

const API_KEY = process.env.MFDS_API_KEY;
const BASE_URL = 'https://openapi.foodsafetykorea.go.kr/api';
const SERVICE_ID = 'I2790'; // 식품영양성분 서비스 ID

interface MfdsItem {
  FOOD_NM_KR: string;       // 식품명
  SERVING_SIZE: string;      // 1회 제공량 (g)
  NUTR_CONT1: string;        // 열량 (kcal)
  NUTR_CONT2: string;        // 탄수화물 (g)
  NUTR_CONT3: string;        // 단백질 (g)
  NUTR_CONT4: string;        // 지방 (g)
  NUTR_CONT5: string;        // 식이섬유 (g)
  NUTR_CONT6: string;        // 나트륨 (mg)
  NUTR_CONT7: string;        // 콜레스테롤 (mg)
  NUTR_CONT8: string;        // 당류 (g)
  MAKER_NM: string;          // 제조사명
  RESEARCH_YEAR: string;     // 조사연도
}

async function fetchMfdsPage(start: number, end: number): Promise<MfdsItem[]> {
  const url = `${BASE_URL}/${API_KEY}/${SERVICE_ID}/json/${start}/${end}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MFDS API 오류: ${res.status}`);
  const json: any = await res.json();

  if (json[SERVICE_ID]?.RESULT?.CODE === 'INFO-000') {
    return json[SERVICE_ID].row || [];
  }
  if (json[SERVICE_ID]?.RESULT?.CODE === 'INFO-200') {
    return []; // 데이터 없음
  }
  throw new Error(`MFDS API 에러: ${json[SERVICE_ID]?.RESULT?.MSG}`);
}

function parseNum(val: string | undefined): number {
  if (!val || val === 'N/A' || val === '') return 0;
  const n = parseFloat(val.replace(/,/g, ''));
  return isNaN(n) ? 0 : n;
}

async function crawl() {
  if (!API_KEY) {
    console.error('❌ MFDS_API_KEY 환경 변수가 설정되지 않았습니다.');
    console.log('👉 https://www.foodsafetykorea.go.kr/api/openApiInfo.do 에서 무료 키 발급');
    process.exit(1);
  }

  const dataSource = new DataSource({
    type: 'sqljs',
    autoSave: true,
    location: path.join(process.cwd(), 'fitness.db'),
    entities: [FoodItem],
    synchronize: true,
  });

  await dataSource.initialize();
  const repo = dataSource.getRepository(FoodItem);

  const existingNames = new Set(
    (await repo.find({ select: ['name'] })).map((f) => f.name),
  );

  let added = 0;
  let page = 1;
  const pageSize = 500;

  console.log('🔍 MFDS 식품영양성분 DB 크롤링 시작...');

  while (true) {
    const start = (page - 1) * pageSize + 1;
    const end = page * pageSize;

    process.stdout.write(`  페이지 ${page} (${start}~${end}) 처리 중...`);

    let rows: MfdsItem[];
    try {
      rows = await fetchMfdsPage(start, end);
    } catch (e: any) {
      console.log(`\n❌ 오류: ${e.message}`);
      break;
    }

    if (rows.length === 0) {
      console.log(' 완료 (더 이상 데이터 없음)');
      break;
    }

    const toInsert: Partial<FoodItem>[] = [];
    for (const row of rows) {
      const name = row.FOOD_NM_KR?.trim();
      if (!name || existingNames.has(name)) continue;

      const servingSize = parseNum(row.SERVING_SIZE) || 100;
      const calories = parseNum(row.NUTR_CONT1);
      if (calories === 0) continue; // 칼로리 없는 항목 제외

      toInsert.push({
        name,
        brand: row.MAKER_NM?.trim() || undefined,
        servingSizeG: servingSize,
        caloriesPerServing: calories,
        carbG: parseNum(row.NUTR_CONT2),
        proteinG: parseNum(row.NUTR_CONT3),
        fatG: parseNum(row.NUTR_CONT4),
        fiberG: parseNum(row.NUTR_CONT5) || undefined,
        sodiumMg: parseNum(row.NUTR_CONT6) || undefined,
        sugarG: parseNum(row.NUTR_CONT8) || undefined,
        source: FoodSource.SYSTEM,
        isVerified: true,
      });
      existingNames.add(name);
    }

    if (toInsert.length > 0) {
      await repo.save(toInsert.map((f) => repo.create(f)));
      added += toInsert.length;
    }

    console.log(` ${toInsert.length}개 추가 (누적 ${added}개)`);

    if (rows.length < pageSize) break; // 마지막 페이지
    page++;

    // API 호출 간격 (rate limit 방지)
    await new Promise((r) => setTimeout(r, 200));
  }

  await dataSource.destroy();
  console.log(`\n✅ 크롤링 완료: 총 ${added}개 음식 데이터 추가`);
}

crawl().catch((e) => {
  console.error('크롤링 실패:', e);
  process.exit(1);
});
