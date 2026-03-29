import { FoodSource } from '../common/enums';

// 식품의약품안전처 식품영양성분 데이터베이스 기준 (단위: 100g 또는 1회 제공량)
export const FOOD_DATA = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 밥류
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '흰쌀밥', servingSizeG: 210, caloriesPerServing: 313, proteinG: 5.5, carbG: 69.3, fatG: 0.5, fiberG: 0.4, sodiumMg: 2, isVerified: true },
  { name: '현미밥', servingSizeG: 210, caloriesPerServing: 294, proteinG: 6.1, carbG: 62.8, fatG: 1.9, fiberG: 2.5, sodiumMg: 2, isVerified: true },
  { name: '잡곡밥', servingSizeG: 210, caloriesPerServing: 300, proteinG: 6.8, carbG: 63.0, fatG: 1.5, fiberG: 2.8, sodiumMg: 3, isVerified: true },
  { name: '콩밥', servingSizeG: 210, caloriesPerServing: 316, proteinG: 9.5, carbG: 63.1, fatG: 2.0, fiberG: 3.5, sodiumMg: 2, isVerified: true },
  { name: '보리밥', servingSizeG: 210, caloriesPerServing: 285, proteinG: 5.9, carbG: 61.5, fatG: 0.9, fiberG: 4.2, sodiumMg: 2, isVerified: true },
  { name: '오곡밥', servingSizeG: 210, caloriesPerServing: 298, proteinG: 7.1, carbG: 62.4, fatG: 1.6, fiberG: 3.0, sodiumMg: 3, isVerified: true },
  { name: '김밥 (1줄)', servingSizeG: 250, caloriesPerServing: 373, proteinG: 11.3, carbG: 64.5, fatG: 8.5, fiberG: 2.5, sodiumMg: 780, isVerified: true },
  { name: '참치김밥 (1줄)', servingSizeG: 260, caloriesPerServing: 420, proteinG: 16.5, carbG: 62.0, fatG: 11.2, fiberG: 2.3, sodiumMg: 890, isVerified: true },
  { name: '삼각김밥 참치마요', servingSizeG: 115, caloriesPerServing: 241, proteinG: 6.8, carbG: 39.5, fatG: 6.5, fiberG: 1.0, sodiumMg: 430, isVerified: true },
  { name: '삼각김밥 불고기', servingSizeG: 115, caloriesPerServing: 228, proteinG: 6.2, carbG: 40.1, fatG: 5.3, fiberG: 0.9, sodiumMg: 480, isVerified: true },
  { name: '볶음밥', servingSizeG: 250, caloriesPerServing: 400, proteinG: 8.5, carbG: 68.0, fatG: 10.5, fiberG: 1.5, sodiumMg: 620, isVerified: true },
  { name: '김치볶음밥', servingSizeG: 250, caloriesPerServing: 415, proteinG: 9.2, carbG: 70.0, fatG: 10.8, fiberG: 2.5, sodiumMg: 780, isVerified: true },
  { name: '오므라이스', servingSizeG: 300, caloriesPerServing: 510, proteinG: 14.5, carbG: 68.5, fatG: 18.5, fiberG: 1.8, sodiumMg: 750, isVerified: true },
  { name: '비빔밥 (야채)', servingSizeG: 350, caloriesPerServing: 490, proteinG: 13.2, carbG: 82.5, fatG: 11.0, fiberG: 4.5, sodiumMg: 820, isVerified: true },
  { name: '돌솥비빔밥', servingSizeG: 380, caloriesPerServing: 545, proteinG: 16.8, carbG: 85.0, fatG: 13.5, fiberG: 4.8, sodiumMg: 980, isVerified: true },
  { name: '소고기덮밥', servingSizeG: 350, caloriesPerServing: 588, proteinG: 21.5, carbG: 78.0, fatG: 18.0, fiberG: 2.0, sodiumMg: 850, isVerified: true },
  { name: '카레라이스', servingSizeG: 350, caloriesPerServing: 520, proteinG: 12.5, carbG: 79.5, fatG: 14.0, fiberG: 3.5, sodiumMg: 750, isVerified: true },
  { name: '덮밥 (나물)', servingSizeG: 300, caloriesPerServing: 410, proteinG: 9.5, carbG: 73.5, fatG: 7.5, fiberG: 4.0, sodiumMg: 580, isVerified: true },
  { name: '알밥', servingSizeG: 200, caloriesPerServing: 390, proteinG: 12.5, carbG: 65.0, fatG: 9.5, fiberG: 1.0, sodiumMg: 680, isVerified: true },
  { name: '초밥 (1피스)', servingSizeG: 30, caloriesPerServing: 49, proteinG: 2.5, carbG: 8.5, fatG: 0.8, fiberG: 0.1, sodiumMg: 110, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 국/탕/찌개/전골
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '된장찌개', servingSizeG: 300, caloriesPerServing: 114, proteinG: 8.5, carbG: 9.5, fatG: 3.8, fiberG: 2.5, sodiumMg: 1620, isVerified: true },
  { name: '김치찌개', servingSizeG: 300, caloriesPerServing: 162, proteinG: 10.5, carbG: 10.0, fatG: 7.5, fiberG: 2.0, sodiumMg: 1850, isVerified: true },
  { name: '순두부찌개', servingSizeG: 300, caloriesPerServing: 135, proteinG: 10.5, carbG: 6.5, fatG: 6.8, fiberG: 1.5, sodiumMg: 1420, isVerified: true },
  { name: '부대찌개', servingSizeG: 400, caloriesPerServing: 380, proteinG: 17.5, carbG: 28.5, fatG: 18.5, fiberG: 3.0, sodiumMg: 2200, isVerified: true },
  { name: '청국장찌개', servingSizeG: 300, caloriesPerServing: 145, proteinG: 12.5, carbG: 11.0, fatG: 5.0, fiberG: 3.0, sodiumMg: 1500, isVerified: true },
  { name: '미역국', servingSizeG: 300, caloriesPerServing: 72, proteinG: 6.5, carbG: 5.0, fatG: 2.5, fiberG: 2.0, sodiumMg: 1050, isVerified: true },
  { name: '콩나물국', servingSizeG: 300, caloriesPerServing: 53, proteinG: 4.5, carbG: 5.5, fatG: 1.5, fiberG: 2.0, sodiumMg: 980, isVerified: true },
  { name: '갈비탕', servingSizeG: 500, caloriesPerServing: 365, proteinG: 25.5, carbG: 18.5, fatG: 18.0, fiberG: 0.5, sodiumMg: 1680, isVerified: true },
  { name: '설렁탕', servingSizeG: 500, caloriesPerServing: 245, proteinG: 20.5, carbG: 15.5, fatG: 9.5, fiberG: 0.3, sodiumMg: 1200, isVerified: true },
  { name: '삼계탕', servingSizeG: 800, caloriesPerServing: 678, proteinG: 62.5, carbG: 48.5, fatG: 22.0, fiberG: 1.5, sodiumMg: 1350, isVerified: true },
  { name: '육개장', servingSizeG: 400, caloriesPerServing: 190, proteinG: 14.5, carbG: 12.0, fatG: 8.5, fiberG: 3.0, sodiumMg: 1750, isVerified: true },
  { name: '해장국', servingSizeG: 400, caloriesPerServing: 215, proteinG: 15.5, carbG: 16.5, fatG: 8.8, fiberG: 2.0, sodiumMg: 1580, isVerified: true },
  { name: '순댓국', servingSizeG: 400, caloriesPerServing: 295, proteinG: 18.5, carbG: 18.0, fatG: 13.5, fiberG: 1.5, sodiumMg: 1680, isVerified: true },
  { name: '감자탕', servingSizeG: 450, caloriesPerServing: 380, proteinG: 22.5, carbG: 28.5, fatG: 16.5, fiberG: 3.5, sodiumMg: 2050, isVerified: true },
  { name: '사골국', servingSizeG: 300, caloriesPerServing: 90, proteinG: 7.5, carbG: 1.5, fatG: 5.5, fiberG: 0, sodiumMg: 580, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 면류
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '라면 (봉지)', servingSizeG: 120, caloriesPerServing: 505, proteinG: 10.5, carbG: 73.5, fatG: 18.0, fiberG: 2.5, sodiumMg: 1680, isVerified: true },
  { name: '신라면', servingSizeG: 120, caloriesPerServing: 505, proteinG: 11.0, carbG: 73.5, fatG: 17.5, fiberG: 2.0, sodiumMg: 1830, isVerified: true },
  { name: '짜파게티', servingSizeG: 140, caloriesPerServing: 595, proteinG: 12.5, carbG: 84.0, fatG: 20.5, fiberG: 3.5, sodiumMg: 1620, isVerified: true },
  { name: '비빔면', servingSizeG: 130, caloriesPerServing: 430, proteinG: 9.5, carbG: 79.5, fatG: 7.5, fiberG: 2.5, sodiumMg: 1250, isVerified: true },
  { name: '짜장면', servingSizeG: 500, caloriesPerServing: 770, proteinG: 24.5, carbG: 130.5, fatG: 14.5, fiberG: 5.0, sodiumMg: 1580, isVerified: true },
  { name: '짬뽕', servingSizeG: 600, caloriesPerServing: 560, proteinG: 26.5, carbG: 80.0, fatG: 12.5, fiberG: 5.5, sodiumMg: 2350, isVerified: true },
  { name: '냉면 (물냉면)', servingSizeG: 500, caloriesPerServing: 385, proteinG: 15.5, carbG: 72.5, fatG: 4.5, fiberG: 3.5, sodiumMg: 1450, isVerified: true },
  { name: '냉면 (비빔냉면)', servingSizeG: 450, caloriesPerServing: 445, proteinG: 12.5, carbG: 82.5, fatG: 8.0, fiberG: 3.0, sodiumMg: 1620, isVerified: true },
  { name: '칼국수', servingSizeG: 500, caloriesPerServing: 465, proteinG: 17.5, carbG: 81.5, fatG: 7.5, fiberG: 3.5, sodiumMg: 1380, isVerified: true },
  { name: '우동', servingSizeG: 450, caloriesPerServing: 395, proteinG: 14.0, carbG: 72.5, fatG: 5.5, fiberG: 2.5, sodiumMg: 1480, isVerified: true },
  { name: '스파게티 (토마토)', servingSizeG: 350, caloriesPerServing: 495, proteinG: 15.5, carbG: 85.5, fatG: 9.5, fiberG: 5.5, sodiumMg: 680, isVerified: true },
  { name: '파스타 (크림)', servingSizeG: 350, caloriesPerServing: 610, proteinG: 14.5, carbG: 78.5, fatG: 25.5, fiberG: 3.0, sodiumMg: 750, isVerified: true },
  { name: '국수 (잔치국수)', servingSizeG: 400, caloriesPerServing: 355, proteinG: 12.5, carbG: 68.5, fatG: 4.5, fiberG: 2.5, sodiumMg: 1050, isVerified: true },
  { name: '쫄면', servingSizeG: 380, caloriesPerServing: 425, proteinG: 11.5, carbG: 79.5, fatG: 7.5, fiberG: 3.5, sodiumMg: 1380, isVerified: true },
  { name: '소면 (삶은, 100g)', servingSizeG: 100, caloriesPerServing: 149, proteinG: 4.8, carbG: 30.2, fatG: 0.5, fiberG: 1.1, sodiumMg: 1, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 육류 / 단백질
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '닭가슴살 (삶은)', servingSizeG: 100, caloriesPerServing: 165, proteinG: 31.0, carbG: 0, fatG: 3.6, fiberG: 0, sodiumMg: 75, isVerified: true },
  { name: '닭가슴살 (구운)', servingSizeG: 100, caloriesPerServing: 153, proteinG: 32.5, carbG: 0, fatG: 2.5, fiberG: 0, sodiumMg: 82, isVerified: true },
  { name: '닭다리 (구운)', servingSizeG: 100, caloriesPerServing: 210, proteinG: 26.5, carbG: 0, fatG: 11.5, fiberG: 0, sodiumMg: 95, isVerified: true },
  { name: '닭날개 (구운)', servingSizeG: 100, caloriesPerServing: 240, proteinG: 23.5, carbG: 0, fatG: 15.5, fiberG: 0, sodiumMg: 110, isVerified: true },
  { name: '삼겹살 (구운)', servingSizeG: 100, caloriesPerServing: 349, proteinG: 17.0, carbG: 0, fatG: 30.5, fiberG: 0, sodiumMg: 68, isVerified: true },
  { name: '목살 (구운)', servingSizeG: 100, caloriesPerServing: 285, proteinG: 18.5, carbG: 0, fatG: 22.5, fiberG: 0, sodiumMg: 75, isVerified: true },
  { name: '소 등심 (구운)', servingSizeG: 100, caloriesPerServing: 247, proteinG: 24.5, carbG: 0, fatG: 15.5, fiberG: 0, sodiumMg: 68, isVerified: true },
  { name: '소 안심 (구운)', servingSizeG: 100, caloriesPerServing: 195, proteinG: 28.5, carbG: 0, fatG: 8.5, fiberG: 0, sodiumMg: 65, isVerified: true },
  { name: '소 갈비 (구운)', servingSizeG: 100, caloriesPerServing: 310, proteinG: 20.5, carbG: 1.5, fatG: 24.5, fiberG: 0, sodiumMg: 85, isVerified: true },
  { name: '소 불고기', servingSizeG: 100, caloriesPerServing: 198, proteinG: 20.5, carbG: 6.5, fatG: 9.5, fiberG: 0.5, sodiumMg: 510, isVerified: true },
  { name: '돼지갈비 (구운)', servingSizeG: 100, caloriesPerServing: 265, proteinG: 19.5, carbG: 2.5, fatG: 18.5, fiberG: 0, sodiumMg: 420, isVerified: true },
  { name: '소시지 (프랑크)', servingSizeG: 100, caloriesPerServing: 305, proteinG: 12.5, carbG: 4.5, fatG: 26.5, fiberG: 0, sodiumMg: 950, isVerified: true },
  { name: '햄 (슬라이스)', servingSizeG: 100, caloriesPerServing: 195, proteinG: 14.5, carbG: 4.0, fatG: 13.5, fiberG: 0, sodiumMg: 1080, isVerified: true },
  { name: '베이컨', servingSizeG: 100, caloriesPerServing: 417, proteinG: 12.5, carbG: 1.5, fatG: 40.5, fiberG: 0, sodiumMg: 1650, isVerified: true },
  { name: '스팸 (클래식)', servingSizeG: 100, caloriesPerServing: 300, proteinG: 13.0, carbG: 3.0, fatG: 26.0, fiberG: 0, sodiumMg: 1380, isVerified: true },
  { name: '닭볶음탕', servingSizeG: 250, caloriesPerServing: 370, proteinG: 25.5, carbG: 22.5, fatG: 18.5, fiberG: 3.5, sodiumMg: 1250, isVerified: true },
  { name: '불닭 (양념)', servingSizeG: 200, caloriesPerServing: 340, proteinG: 23.5, carbG: 18.5, fatG: 17.5, fiberG: 2.0, sodiumMg: 1450, isVerified: true },
  { name: '찜닭', servingSizeG: 300, caloriesPerServing: 395, proteinG: 28.5, carbG: 32.5, fatG: 14.5, fiberG: 3.5, sodiumMg: 1620, isVerified: true },
  { name: '제육볶음', servingSizeG: 200, caloriesPerServing: 380, proteinG: 20.5, carbG: 16.5, fatG: 24.5, fiberG: 2.5, sodiumMg: 1350, isVerified: true },
  { name: '계란 (1개)', servingSizeG: 60, caloriesPerServing: 91, proteinG: 7.9, carbG: 0.4, fatG: 6.3, fiberG: 0, sodiumMg: 72, isVerified: true },
  { name: '계란 흰자 (1개)', servingSizeG: 33, caloriesPerServing: 16, proteinG: 3.5, carbG: 0.2, fatG: 0.1, fiberG: 0, sodiumMg: 54, isVerified: true },
  { name: '삶은 달걀', servingSizeG: 60, caloriesPerServing: 90, proteinG: 7.7, carbG: 0.5, fatG: 6.2, fiberG: 0, sodiumMg: 71, isVerified: true },
  { name: '계란후라이', servingSizeG: 65, caloriesPerServing: 112, proteinG: 7.5, carbG: 0.5, fatG: 8.5, fiberG: 0, sodiumMg: 120, isVerified: true },
  { name: '두부 (모두부)', servingSizeG: 100, caloriesPerServing: 79, proteinG: 8.1, carbG: 2.1, fatG: 4.2, fiberG: 0.3, sodiumMg: 8, isVerified: true },
  { name: '연두부', servingSizeG: 100, caloriesPerServing: 55, proteinG: 4.9, carbG: 1.5, fatG: 3.0, fiberG: 0.1, sodiumMg: 6, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 해산물
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '연어 (생)', servingSizeG: 100, caloriesPerServing: 208, proteinG: 20.0, carbG: 0, fatG: 13.0, fiberG: 0, sodiumMg: 59, isVerified: true },
  { name: '고등어 (구운)', servingSizeG: 100, caloriesPerServing: 225, proteinG: 21.5, carbG: 0, fatG: 14.5, fiberG: 0, sodiumMg: 105, isVerified: true },
  { name: '참치캔 (물)', servingSizeG: 100, caloriesPerServing: 132, proteinG: 29.1, carbG: 0, fatG: 1.2, fiberG: 0, sodiumMg: 370, isVerified: true },
  { name: '참치캔 (기름)', servingSizeG: 100, caloriesPerServing: 198, proteinG: 26.5, carbG: 0, fatG: 9.5, fiberG: 0, sodiumMg: 350, isVerified: true },
  { name: '새우 (삶은)', servingSizeG: 100, caloriesPerServing: 99, proteinG: 20.5, carbG: 1.5, fatG: 1.1, fiberG: 0, sodiumMg: 185, isVerified: true },
  { name: '오징어 (삶은)', servingSizeG: 100, caloriesPerServing: 91, proteinG: 17.5, carbG: 3.2, fatG: 1.0, fiberG: 0, sodiumMg: 105, isVerified: true },
  { name: '꽃게 (삶은)', servingSizeG: 100, caloriesPerServing: 87, proteinG: 16.8, carbG: 1.5, fatG: 1.5, fiberG: 0, sodiumMg: 342, isVerified: true },
  { name: '조기 (구운)', servingSizeG: 100, caloriesPerServing: 159, proteinG: 21.5, carbG: 0, fatG: 7.5, fiberG: 0, sodiumMg: 125, isVerified: true },
  { name: '삼치 (구운)', servingSizeG: 100, caloriesPerServing: 168, proteinG: 22.5, carbG: 0, fatG: 8.0, fiberG: 0, sodiumMg: 85, isVerified: true },
  { name: '갈치 (구운)', servingSizeG: 100, caloriesPerServing: 182, proteinG: 20.5, carbG: 0, fatG: 10.5, fiberG: 0, sodiumMg: 98, isVerified: true },
  { name: '문어 (삶은)', servingSizeG: 100, caloriesPerServing: 82, proteinG: 17.5, carbG: 0.5, fatG: 0.5, fiberG: 0, sodiumMg: 165, isVerified: true },
  { name: '전복 (생)', servingSizeG: 100, caloriesPerServing: 73, proteinG: 14.5, carbG: 3.5, fatG: 0.4, fiberG: 0, sodiumMg: 155, isVerified: true },
  { name: '홍합 (삶은)', servingSizeG: 100, caloriesPerServing: 86, proteinG: 11.9, carbG: 3.7, fatG: 2.2, fiberG: 0, sodiumMg: 285, isVerified: true },
  { name: '굴 (생)', servingSizeG: 100, caloriesPerServing: 59, proteinG: 6.8, carbG: 4.7, fatG: 1.5, fiberG: 0, sodiumMg: 510, isVerified: true },
  { name: '어묵 (찐)', servingSizeG: 100, caloriesPerServing: 95, proteinG: 10.5, carbG: 9.5, fatG: 1.5, fiberG: 0, sodiumMg: 850, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 채소류
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '브로콜리 (생)', servingSizeG: 100, caloriesPerServing: 34, proteinG: 2.8, carbG: 6.6, fatG: 0.4, fiberG: 2.6, sodiumMg: 33, isVerified: true },
  { name: '시금치 (생)', servingSizeG: 100, caloriesPerServing: 23, proteinG: 2.9, carbG: 3.6, fatG: 0.4, fiberG: 2.2, sodiumMg: 79, isVerified: true },
  { name: '상추 (생)', servingSizeG: 100, caloriesPerServing: 16, proteinG: 1.3, carbG: 2.9, fatG: 0.2, fiberG: 1.3, sodiumMg: 28, isVerified: true },
  { name: '양상추', servingSizeG: 100, caloriesPerServing: 14, proteinG: 1.4, carbG: 2.0, fatG: 0.2, fiberG: 1.3, sodiumMg: 10, isVerified: true },
  { name: '양배추 (생)', servingSizeG: 100, caloriesPerServing: 25, proteinG: 1.3, carbG: 5.8, fatG: 0.1, fiberG: 2.5, sodiumMg: 18, isVerified: true },
  { name: '당근 (생)', servingSizeG: 100, caloriesPerServing: 41, proteinG: 0.9, carbG: 9.6, fatG: 0.2, fiberG: 2.8, sodiumMg: 69, isVerified: true },
  { name: '오이 (생)', servingSizeG: 100, caloriesPerServing: 16, proteinG: 0.7, carbG: 3.6, fatG: 0.1, fiberG: 0.5, sodiumMg: 2, isVerified: true },
  { name: '토마토 (생)', servingSizeG: 100, caloriesPerServing: 18, proteinG: 0.9, carbG: 3.9, fatG: 0.2, fiberG: 1.2, sodiumMg: 5, isVerified: true },
  { name: '방울토마토', servingSizeG: 100, caloriesPerServing: 19, proteinG: 0.9, carbG: 4.2, fatG: 0.2, fiberG: 1.4, sodiumMg: 6, isVerified: true },
  { name: '파프리카 (빨강)', servingSizeG: 100, caloriesPerServing: 31, proteinG: 1.0, carbG: 7.0, fatG: 0.3, fiberG: 2.1, sodiumMg: 4, isVerified: true },
  { name: '버섯 (새송이)', servingSizeG: 100, caloriesPerServing: 35, proteinG: 2.8, carbG: 7.4, fatG: 0.2, fiberG: 2.2, sodiumMg: 3, isVerified: true },
  { name: '버섯 (표고)', servingSizeG: 100, caloriesPerServing: 34, proteinG: 2.5, carbG: 7.0, fatG: 0.3, fiberG: 3.3, sodiumMg: 9, isVerified: true },
  { name: '버섯 (팽이)', servingSizeG: 100, caloriesPerServing: 37, proteinG: 2.7, carbG: 8.0, fatG: 0.3, fiberG: 2.7, sodiumMg: 5, isVerified: true },
  { name: '콩나물 (삶은)', servingSizeG: 100, caloriesPerServing: 19, proteinG: 2.3, carbG: 2.1, fatG: 0.5, fiberG: 1.5, sodiumMg: 8, isVerified: true },
  { name: '숙주나물', servingSizeG: 100, caloriesPerServing: 18, proteinG: 2.1, carbG: 2.5, fatG: 0.2, fiberG: 1.4, sodiumMg: 5, isVerified: true },
  { name: '고구마 (찐)', servingSizeG: 100, caloriesPerServing: 86, proteinG: 1.6, carbG: 20.1, fatG: 0.1, fiberG: 2.2, sodiumMg: 27, isVerified: true },
  { name: '감자 (삶은)', servingSizeG: 100, caloriesPerServing: 73, proteinG: 2.0, carbG: 16.5, fatG: 0.1, fiberG: 1.8, sodiumMg: 5, isVerified: true },
  { name: '단호박 (찐)', servingSizeG: 100, caloriesPerServing: 45, proteinG: 1.5, carbG: 10.5, fatG: 0.1, fiberG: 2.1, sodiumMg: 3, isVerified: true },
  { name: '아보카도', servingSizeG: 100, caloriesPerServing: 160, proteinG: 2.0, carbG: 8.5, fatG: 14.7, fiberG: 6.7, sodiumMg: 7, isVerified: true },
  { name: '김치 (배추)', servingSizeG: 100, caloriesPerServing: 18, proteinG: 1.7, carbG: 3.3, fatG: 0.2, fiberG: 1.5, sodiumMg: 750, isVerified: true },
  { name: '깍두기', servingSizeG: 100, caloriesPerServing: 22, proteinG: 1.2, carbG: 4.5, fatG: 0.2, fiberG: 1.2, sodiumMg: 680, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 과일류
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '바나나 (1개)', servingSizeG: 120, caloriesPerServing: 107, proteinG: 1.3, carbG: 27.5, fatG: 0.4, fiberG: 3.1, sodiumMg: 1, isVerified: true },
  { name: '사과 (1개)', servingSizeG: 200, caloriesPerServing: 106, proteinG: 0.5, carbG: 28.0, fatG: 0.3, fiberG: 4.4, sodiumMg: 2, isVerified: true },
  { name: '배 (1개)', servingSizeG: 300, caloriesPerServing: 162, proteinG: 0.9, carbG: 43.5, fatG: 0.3, fiberG: 5.7, sodiumMg: 0, isVerified: true },
  { name: '포도 (1송이)', servingSizeG: 150, caloriesPerServing: 103, proteinG: 1.1, carbG: 27.0, fatG: 0.2, fiberG: 1.4, sodiumMg: 2, isVerified: true },
  { name: '딸기 (10개)', servingSizeG: 150, caloriesPerServing: 48, proteinG: 1.0, carbG: 11.5, fatG: 0.5, fiberG: 2.9, sodiumMg: 1, isVerified: true },
  { name: '수박 (1조각)', servingSizeG: 200, caloriesPerServing: 62, proteinG: 1.2, carbG: 15.6, fatG: 0.2, fiberG: 0.6, sodiumMg: 2, isVerified: true },
  { name: '귤 (1개)', servingSizeG: 100, caloriesPerServing: 46, proteinG: 0.7, carbG: 12.0, fatG: 0.2, fiberG: 2.0, sodiumMg: 2, isVerified: true },
  { name: '오렌지 (1개)', servingSizeG: 180, caloriesPerServing: 83, proteinG: 1.6, carbG: 21.2, fatG: 0.2, fiberG: 3.6, sodiumMg: 0, isVerified: true },
  { name: '블루베리', servingSizeG: 100, caloriesPerServing: 57, proteinG: 0.7, carbG: 14.5, fatG: 0.3, fiberG: 2.4, sodiumMg: 1, isVerified: true },
  { name: '키위 (1개)', servingSizeG: 100, caloriesPerServing: 61, proteinG: 1.1, carbG: 15.0, fatG: 0.5, fiberG: 3.0, sodiumMg: 3, isVerified: true },
  { name: '망고', servingSizeG: 100, caloriesPerServing: 65, proteinG: 0.5, carbG: 17.0, fatG: 0.3, fiberG: 1.8, sodiumMg: 2, isVerified: true },
  { name: '복숭아 (1개)', servingSizeG: 150, caloriesPerServing: 57, proteinG: 1.4, carbG: 14.3, fatG: 0.1, fiberG: 1.5, sodiumMg: 0, isVerified: true },
  { name: '파인애플', servingSizeG: 100, caloriesPerServing: 50, proteinG: 0.5, carbG: 13.1, fatG: 0.1, fiberG: 1.4, sodiumMg: 1, isVerified: true },
  { name: '체리 (10개)', servingSizeG: 80, caloriesPerServing: 50, proteinG: 0.8, carbG: 12.8, fatG: 0.1, fiberG: 1.2, sodiumMg: 0, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 유제품 / 단백질
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '우유 (200ml)', servingSizeG: 200, caloriesPerServing: 130, proteinG: 6.6, carbG: 9.6, fatG: 7.6, fiberG: 0, sodiumMg: 100, isVerified: true },
  { name: '저지방 우유 (200ml)', servingSizeG: 200, caloriesPerServing: 94, proteinG: 6.8, carbG: 10.2, fatG: 2.0, fiberG: 0, sodiumMg: 104, isVerified: true },
  { name: '무지방 우유 (200ml)', servingSizeG: 200, caloriesPerServing: 70, proteinG: 7.0, carbG: 10.0, fatG: 0.2, fiberG: 0, sodiumMg: 105, isVerified: true },
  { name: '두유 (무당, 190ml)', servingSizeG: 190, caloriesPerServing: 85, proteinG: 6.5, carbG: 7.5, fatG: 2.8, fiberG: 0.8, sodiumMg: 55, isVerified: true },
  { name: '그릭요거트 (무지방, 150g)', servingSizeG: 150, caloriesPerServing: 100, proteinG: 17.0, carbG: 6.0, fatG: 0.7, fiberG: 0, sodiumMg: 65, isVerified: true },
  { name: '플레인 요거트 (100g)', servingSizeG: 100, caloriesPerServing: 62, proteinG: 3.5, carbG: 7.0, fatG: 1.8, fiberG: 0, sodiumMg: 47, isVerified: true },
  { name: '코티지치즈 (100g)', servingSizeG: 100, caloriesPerServing: 98, proteinG: 11.1, carbG: 3.4, fatG: 4.3, fiberG: 0, sodiumMg: 364, isVerified: true },
  { name: '체다치즈 (1장)', servingSizeG: 20, caloriesPerServing: 80, proteinG: 4.8, carbG: 0.4, fatG: 6.6, fiberG: 0, sodiumMg: 172, isVerified: true },
  { name: '모짜렐라 치즈 (100g)', servingSizeG: 100, caloriesPerServing: 280, proteinG: 18.0, carbG: 2.2, fatG: 22.0, fiberG: 0, sodiumMg: 627, isVerified: true },
  { name: '오트밀 (건조, 100g)', servingSizeG: 100, caloriesPerServing: 389, proteinG: 16.9, carbG: 66.3, fatG: 6.9, fiberG: 10.6, sodiumMg: 2, isVerified: true },
  { name: '프로틴 쉐이크 (1스쿱)', servingSizeG: 30, caloriesPerServing: 118, proteinG: 23.0, carbG: 4.0, fatG: 1.5, fiberG: 0.5, sodiumMg: 80, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 견과류 / 씨앗
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '아몬드 (30g)', servingSizeG: 30, caloriesPerServing: 173, proteinG: 6.3, carbG: 6.0, fatG: 15.0, fiberG: 3.5, sodiumMg: 0, isVerified: true },
  { name: '호두 (30g)', servingSizeG: 30, caloriesPerServing: 196, proteinG: 4.6, carbG: 4.1, fatG: 19.6, fiberG: 2.0, sodiumMg: 0, isVerified: true },
  { name: '땅콩 (30g)', servingSizeG: 30, caloriesPerServing: 170, proteinG: 7.8, carbG: 5.0, fatG: 14.0, fiberG: 2.2, sodiumMg: 5, isVerified: true },
  { name: '캐슈넛 (30g)', servingSizeG: 30, caloriesPerServing: 162, proteinG: 4.3, carbG: 9.3, fatG: 13.1, fiberG: 0.9, sodiumMg: 3, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 빵 / 곡류
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '식빵 (1장)', servingSizeG: 35, caloriesPerServing: 96, proteinG: 3.0, carbG: 17.5, fatG: 1.8, fiberG: 0.9, sodiumMg: 130, isVerified: true },
  { name: '통밀빵 (1장)', servingSizeG: 35, caloriesPerServing: 88, proteinG: 3.5, carbG: 15.5, fatG: 1.3, fiberG: 2.1, sodiumMg: 120, isVerified: true },
  { name: '베이글 (1개)', servingSizeG: 100, caloriesPerServing: 272, proteinG: 10.0, carbG: 53.0, fatG: 1.7, fiberG: 2.3, sodiumMg: 490, isVerified: true },
  { name: '크루아상 (1개)', servingSizeG: 60, caloriesPerServing: 240, proteinG: 4.5, carbG: 27.5, fatG: 12.5, fiberG: 1.0, sodiumMg: 280, isVerified: true },
  { name: '찐빵 (1개)', servingSizeG: 100, caloriesPerServing: 220, proteinG: 5.5, carbG: 44.5, fatG: 2.0, fiberG: 1.5, sodiumMg: 280, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 한식 반찬
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '잡채', servingSizeG: 200, caloriesPerServing: 302, proteinG: 7.5, carbG: 55.5, fatG: 6.5, fiberG: 3.0, sodiumMg: 680, isVerified: true },
  { name: '나물 (시금치)', servingSizeG: 100, caloriesPerServing: 44, proteinG: 3.5, carbG: 5.5, fatG: 1.5, fiberG: 2.5, sodiumMg: 420, isVerified: true },
  { name: '도라지 무침', servingSizeG: 100, caloriesPerServing: 72, proteinG: 1.5, carbG: 15.5, fatG: 0.8, fiberG: 3.2, sodiumMg: 380, isVerified: true },
  { name: '멸치볶음', servingSizeG: 50, caloriesPerServing: 98, proteinG: 11.5, carbG: 5.5, fatG: 3.5, fiberG: 0, sodiumMg: 780, isVerified: true },
  { name: '콩자반', servingSizeG: 50, caloriesPerServing: 88, proteinG: 6.0, carbG: 10.5, fatG: 2.5, fiberG: 2.0, sodiumMg: 420, isVerified: true },
  { name: '두부조림', servingSizeG: 100, caloriesPerServing: 102, proteinG: 7.5, carbG: 4.5, fatG: 5.5, fiberG: 0.5, sodiumMg: 520, isVerified: true },
  { name: '계란말이', servingSizeG: 100, caloriesPerServing: 155, proteinG: 11.5, carbG: 2.5, fatG: 11.5, fiberG: 0, sodiumMg: 280, isVerified: true },
  { name: '된장', servingSizeG: 15, caloriesPerServing: 28, proteinG: 2.2, carbG: 3.8, fatG: 0.5, fiberG: 0.5, sodiumMg: 830, isVerified: true },
  { name: '고추장', servingSizeG: 15, caloriesPerServing: 30, proteinG: 1.0, carbG: 6.5, fatG: 0.3, fiberG: 0.5, sodiumMg: 610, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 치킨 / 패스트푸드
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '후라이드치킨 (1조각)', servingSizeG: 100, caloriesPerServing: 290, proteinG: 20.5, carbG: 12.5, fatG: 17.5, fiberG: 0.5, sodiumMg: 520, isVerified: true },
  { name: '양념치킨 (1조각)', servingSizeG: 100, caloriesPerServing: 290, proteinG: 18.5, carbG: 18.5, fatG: 14.5, fiberG: 1.0, sodiumMg: 680, isVerified: true },
  { name: '간장치킨 (1조각)', servingSizeG: 100, caloriesPerServing: 265, proteinG: 19.5, carbG: 14.5, fatG: 13.5, fiberG: 0.5, sodiumMg: 720, isVerified: true },
  { name: '맥도날드 빅맥', servingSizeG: 214, caloriesPerServing: 550, proteinG: 25.0, carbG: 45.0, fatG: 29.0, fiberG: 3.0, sodiumMg: 1040, isVerified: true },
  { name: '맥도날드 치킨버거', servingSizeG: 150, caloriesPerServing: 379, proteinG: 15.5, carbG: 47.5, fatG: 13.5, fiberG: 2.0, sodiumMg: 780, isVerified: true },
  { name: '맥도날드 감자튀김 (중)', servingSizeG: 117, caloriesPerServing: 365, proteinG: 4.5, carbG: 48.0, fatG: 17.0, fiberG: 4.0, sodiumMg: 400, isVerified: true },
  { name: '롯데리아 불고기버거', servingSizeG: 155, caloriesPerServing: 398, proteinG: 15.5, carbG: 50.5, fatG: 14.5, fiberG: 2.0, sodiumMg: 820, isVerified: true },
  { name: '버거킹 와퍼', servingSizeG: 291, caloriesPerServing: 670, proteinG: 28.5, carbG: 52.5, fatG: 38.0, fiberG: 2.5, sodiumMg: 1080, isVerified: true },
  { name: '피자 (치즈, 1조각)', servingSizeG: 120, caloriesPerServing: 280, proteinG: 12.5, carbG: 33.5, fatG: 10.5, fiberG: 1.5, sodiumMg: 650, isVerified: true },
  { name: '핫도그', servingSizeG: 100, caloriesPerServing: 290, proteinG: 11.5, carbG: 25.5, fatG: 15.5, fiberG: 1.0, sodiumMg: 750, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 편의점 / 가공식품
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '편의점 도시락 (일반)', servingSizeG: 350, caloriesPerServing: 590, proteinG: 18.5, carbG: 88.5, fatG: 16.0, fiberG: 3.5, sodiumMg: 1280, isVerified: true },
  { name: '편의점 샌드위치', servingSizeG: 130, caloriesPerServing: 295, proteinG: 11.5, carbG: 38.5, fatG: 10.5, fiberG: 1.8, sodiumMg: 580, isVerified: true },
  { name: '컵라면 (일반)', servingSizeG: 65, caloriesPerServing: 295, proteinG: 6.5, carbG: 42.0, fatG: 11.0, fiberG: 1.5, sodiumMg: 1580, isVerified: true },
  { name: '컵밥 (불고기)', servingSizeG: 243, caloriesPerServing: 380, proteinG: 10.5, carbG: 68.5, fatG: 7.5, fiberG: 2.0, sodiumMg: 850, isVerified: true },
  { name: '즉석떡볶이', servingSizeG: 300, caloriesPerServing: 390, proteinG: 8.5, carbG: 75.5, fatG: 6.5, fiberG: 3.0, sodiumMg: 1350, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 한식 외식
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '떡볶이', servingSizeG: 300, caloriesPerServing: 380, proteinG: 8.5, carbG: 75.5, fatG: 6.0, fiberG: 3.5, sodiumMg: 1420, isVerified: true },
  { name: '순대 (100g)', servingSizeG: 100, caloriesPerServing: 178, proteinG: 8.5, carbG: 16.5, fatG: 8.5, fiberG: 0.5, sodiumMg: 420, isVerified: true },
  { name: '튀김 (새우, 1개)', servingSizeG: 30, caloriesPerServing: 80, proteinG: 4.0, carbG: 7.5, fatG: 3.5, fiberG: 0.3, sodiumMg: 135, isVerified: true },
  { name: '탕수육 (100g)', servingSizeG: 100, caloriesPerServing: 255, proteinG: 11.5, carbG: 30.5, fatG: 9.5, fiberG: 1.0, sodiumMg: 620, isVerified: true },
  { name: '해물파전', servingSizeG: 200, caloriesPerServing: 390, proteinG: 14.5, carbG: 48.5, fatG: 15.5, fiberG: 2.0, sodiumMg: 850, isVerified: true },
  { name: '보쌈 (삶은 돼지고기)', servingSizeG: 100, caloriesPerServing: 195, proteinG: 22.5, carbG: 0, fatG: 11.5, fiberG: 0, sodiumMg: 75, isVerified: true },
  { name: '족발 (100g)', servingSizeG: 100, caloriesPerServing: 218, proteinG: 20.5, carbG: 3.5, fatG: 13.0, fiberG: 0, sodiumMg: 580, isVerified: true },
  { name: '순두부 (요리 전)', servingSizeG: 100, caloriesPerServing: 55, proteinG: 5.5, carbG: 2.0, fatG: 2.8, fiberG: 0.1, sodiumMg: 5, isVerified: true },
  { name: '돈까스', servingSizeG: 200, caloriesPerServing: 480, proteinG: 22.5, carbG: 38.5, fatG: 24.5, fiberG: 1.5, sodiumMg: 680, isVerified: true },
  { name: '생선까스', servingSizeG: 150, caloriesPerServing: 340, proteinG: 17.5, carbG: 29.5, fatG: 15.5, fiberG: 1.0, sodiumMg: 520, isVerified: true },
  { name: '함박스테이크', servingSizeG: 150, caloriesPerServing: 335, proteinG: 18.5, carbG: 15.5, fatG: 21.5, fiberG: 1.0, sodiumMg: 680, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 과자 / 간식
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '새우깡 (90g)', servingSizeG: 90, caloriesPerServing: 432, proteinG: 5.8, carbG: 66.5, fatG: 15.5, fiberG: 1.5, sodiumMg: 780, isVerified: true },
  { name: '포카칩 (66g)', servingSizeG: 66, caloriesPerServing: 352, proteinG: 3.5, carbG: 41.0, fatG: 19.0, fiberG: 2.0, sodiumMg: 285, isVerified: true },
  { name: '오레오 쿠키 (3개)', servingSizeG: 36, caloriesPerServing: 160, proteinG: 2.0, carbG: 24.0, fatG: 6.5, fiberG: 0.5, sodiumMg: 140, isVerified: true },
  { name: '초코파이 (1개)', servingSizeG: 39, caloriesPerServing: 158, proteinG: 1.5, carbG: 25.5, fatG: 5.5, fiberG: 0.5, sodiumMg: 80, isVerified: true },
  { name: '빼빼로 (1봉)', servingSizeG: 54, caloriesPerServing: 268, proteinG: 3.5, carbG: 37.5, fatG: 11.5, fiberG: 1.0, sodiumMg: 120, isVerified: true },
  { name: '초콜릿 (다크, 100g)', servingSizeG: 100, caloriesPerServing: 546, proteinG: 4.9, carbG: 59.4, fatG: 31.3, fiberG: 7.0, sodiumMg: 10, isVerified: true },
  { name: '아이스크림 (바닐라)', servingSizeG: 100, caloriesPerServing: 207, proteinG: 3.5, carbG: 23.5, fatG: 11.0, fiberG: 0, sodiumMg: 80, isVerified: true },
  { name: '붕어빵 (1개)', servingSizeG: 60, caloriesPerServing: 150, proteinG: 3.5, carbG: 30.5, fatG: 2.0, fiberG: 1.0, sodiumMg: 130, isVerified: true },
  { name: '호떡 (1개)', servingSizeG: 80, caloriesPerServing: 230, proteinG: 3.5, carbG: 40.5, fatG: 6.5, fiberG: 1.0, sodiumMg: 180, isVerified: true },
  { name: '떡 (가래떡, 100g)', servingSizeG: 100, caloriesPerServing: 185, proteinG: 3.5, carbG: 42.5, fatG: 0.5, fiberG: 0.5, sodiumMg: 5, isVerified: true },
  { name: '인절미 (100g)', servingSizeG: 100, caloriesPerServing: 225, proteinG: 4.5, carbG: 48.5, fatG: 1.5, fiberG: 1.0, sodiumMg: 8, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 음료류
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '아메리카노 (355ml)', servingSizeG: 355, caloriesPerServing: 10, proteinG: 0.5, carbG: 1.5, fatG: 0.1, fiberG: 0, sodiumMg: 10, isVerified: true },
  { name: '카페라떼 (355ml)', servingSizeG: 355, caloriesPerServing: 140, proteinG: 7.5, carbG: 14.0, fatG: 5.5, fiberG: 0, sodiumMg: 90, isVerified: true },
  { name: '카푸치노 (355ml)', servingSizeG: 355, caloriesPerServing: 120, proteinG: 6.5, carbG: 11.0, fatG: 5.0, fiberG: 0, sodiumMg: 85, isVerified: true },
  { name: '콜라 (355ml)', servingSizeG: 355, caloriesPerServing: 139, proteinG: 0, carbG: 38.5, fatG: 0, fiberG: 0, sodiumMg: 45, isVerified: true },
  { name: '제로콜라 (355ml)', servingSizeG: 355, caloriesPerServing: 1, proteinG: 0, carbG: 0.4, fatG: 0, fiberG: 0, sodiumMg: 40, isVerified: true },
  { name: '오렌지주스 (240ml)', servingSizeG: 240, caloriesPerServing: 110, proteinG: 1.7, carbG: 26.0, fatG: 0.5, fiberG: 0.5, sodiumMg: 2, isVerified: true },
  { name: '스포츠음료 게토레이 (500ml)', servingSizeG: 500, caloriesPerServing: 125, proteinG: 0, carbG: 32.5, fatG: 0, fiberG: 0, sodiumMg: 275, isVerified: true },
  { name: '식혜 (240ml)', servingSizeG: 240, caloriesPerServing: 110, proteinG: 1.0, carbG: 27.5, fatG: 0.1, fiberG: 0, sodiumMg: 65, isVerified: true },
  { name: '막걸리 (300ml)', servingSizeG: 300, caloriesPerServing: 198, proteinG: 2.1, carbG: 18.0, fatG: 0, fiberG: 0, sodiumMg: 6, isVerified: true },
  { name: '맥주 (355ml)', servingSizeG: 355, caloriesPerServing: 155, proteinG: 1.5, carbG: 12.5, fatG: 0, fiberG: 0, sodiumMg: 14, isVerified: true },
  { name: '소주 (1잔, 50ml)', servingSizeG: 50, caloriesPerServing: 65, proteinG: 0, carbG: 0.3, fatG: 0, fiberG: 0, sodiumMg: 0, isVerified: true },
  { name: '이온음료 포카리 (240ml)', servingSizeG: 240, caloriesPerServing: 57, proteinG: 0, carbG: 14.4, fatG: 0, fiberG: 0, sodiumMg: 117, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 분식 / 길거리 음식
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '국물 떡볶이', servingSizeG: 350, caloriesPerServing: 430, proteinG: 9.5, carbG: 85.0, fatG: 7.5, fiberG: 4.0, sodiumMg: 1650, isVerified: true },
  { name: '로제 떡볶이', servingSizeG: 350, caloriesPerServing: 520, proteinG: 11.5, carbG: 78.5, fatG: 17.0, fiberG: 3.5, sodiumMg: 1420, isVerified: true },
  { name: '궁중 떡볶이', servingSizeG: 300, caloriesPerServing: 395, proteinG: 10.0, carbG: 72.0, fatG: 9.0, fiberG: 2.5, sodiumMg: 980, isVerified: true },
  { name: '가래떡 (100g)', servingSizeG: 100, caloriesPerServing: 222, proteinG: 4.2, carbG: 50.5, fatG: 0.4, fiberG: 0.5, sodiumMg: 4, isVerified: true },
  { name: '어묵꼬치 (1개)', servingSizeG: 50, caloriesPerServing: 58, proteinG: 5.0, carbG: 6.5, fatG: 1.2, fiberG: 0, sodiumMg: 480, isVerified: true },
  { name: '순대볶음 (200g)', servingSizeG: 200, caloriesPerServing: 390, proteinG: 17.5, carbG: 38.5, fatG: 17.0, fiberG: 2.5, sodiumMg: 1050, isVerified: true },
  { name: '오뎅국물 (300ml)', servingSizeG: 300, caloriesPerServing: 45, proteinG: 3.0, carbG: 5.5, fatG: 0.5, fiberG: 0, sodiumMg: 980, isVerified: true },
  { name: '튀김만두 (5개)', servingSizeG: 150, caloriesPerServing: 390, proteinG: 12.5, carbG: 42.5, fatG: 18.5, fiberG: 2.5, sodiumMg: 680, isVerified: true },
  { name: '군만두 (5개)', servingSizeG: 150, caloriesPerServing: 355, proteinG: 12.0, carbG: 40.0, fatG: 16.0, fiberG: 2.5, sodiumMg: 620, isVerified: true },
  { name: '찐만두 (5개)', servingSizeG: 150, caloriesPerServing: 290, proteinG: 12.0, carbG: 38.5, fatG: 9.0, fiberG: 2.5, sodiumMg: 590, isVerified: true },
  { name: '김말이튀김 (1개)', servingSizeG: 50, caloriesPerServing: 120, proteinG: 2.5, carbG: 16.5, fatG: 5.0, fiberG: 0.5, sodiumMg: 180, isVerified: true },
  { name: '계란빵 (1개)', servingSizeG: 85, caloriesPerServing: 182, proteinG: 7.5, carbG: 25.5, fatG: 5.5, fiberG: 0.5, sodiumMg: 220, isVerified: true },
  { name: '타코야키 (6개)', servingSizeG: 120, caloriesPerServing: 260, proteinG: 8.5, carbG: 35.5, fatG: 9.0, fiberG: 1.0, sodiumMg: 580, isVerified: true },
  { name: '와플 (1개)', servingSizeG: 75, caloriesPerServing: 210, proteinG: 4.5, carbG: 32.5, fatG: 7.5, fiberG: 0.5, sodiumMg: 195, isVerified: true },
  { name: '핫바 (1개)', servingSizeG: 80, caloriesPerServing: 145, proteinG: 7.0, carbG: 12.5, fatG: 6.5, fiberG: 0, sodiumMg: 520, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 중식 (중화요리)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '짜장면 (곱빼기)', servingSizeG: 650, caloriesPerServing: 1000, proteinG: 32.0, carbG: 169.5, fatG: 18.5, fiberG: 6.5, sodiumMg: 2050, isVerified: true },
  { name: '간짜장', servingSizeG: 500, caloriesPerServing: 800, proteinG: 26.0, carbG: 125.5, fatG: 20.0, fiberG: 5.0, sodiumMg: 1820, isVerified: true },
  { name: '짬뽕밥', servingSizeG: 500, caloriesPerServing: 640, proteinG: 22.0, carbG: 95.5, fatG: 15.5, fiberG: 4.5, sodiumMg: 2150, isVerified: true },
  { name: '볶음밥 (중국식)', servingSizeG: 350, caloriesPerServing: 590, proteinG: 15.5, carbG: 95.5, fatG: 15.0, fiberG: 3.0, sodiumMg: 1180, isVerified: true },
  { name: '울면', servingSizeG: 600, caloriesPerServing: 510, proteinG: 21.5, carbG: 78.5, fatG: 10.5, fiberG: 4.0, sodiumMg: 2050, isVerified: true },
  { name: '유산슬', servingSizeG: 300, caloriesPerServing: 380, proteinG: 19.5, carbG: 28.5, fatG: 18.5, fiberG: 3.5, sodiumMg: 1250, isVerified: true },
  { name: '깐풍기', servingSizeG: 200, caloriesPerServing: 430, proteinG: 24.5, carbG: 28.5, fatG: 22.5, fiberG: 2.0, sodiumMg: 980, isVerified: true },
  { name: '라조기', servingSizeG: 200, caloriesPerServing: 380, proteinG: 22.0, carbG: 22.5, fatG: 20.0, fiberG: 3.0, sodiumMg: 1050, isVerified: true },
  { name: '팔보채', servingSizeG: 300, caloriesPerServing: 320, proteinG: 22.5, carbG: 22.5, fatG: 14.5, fiberG: 4.0, sodiumMg: 1180, isVerified: true },
  { name: '마파두부', servingSizeG: 200, caloriesPerServing: 195, proteinG: 11.5, carbG: 10.5, fatG: 11.5, fiberG: 2.0, sodiumMg: 920, isVerified: true },
  { name: '군만두 (중국식)', servingSizeG: 200, caloriesPerServing: 420, proteinG: 15.5, carbG: 52.5, fatG: 16.0, fiberG: 3.0, sodiumMg: 780, isVerified: true },
  { name: '딤섬 (하가우, 3개)', servingSizeG: 90, caloriesPerServing: 165, proteinG: 8.5, carbG: 20.5, fatG: 5.0, fiberG: 0.5, sodiumMg: 380, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 일식
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '돈코츠 라멘', servingSizeG: 550, caloriesPerServing: 580, proteinG: 24.5, carbG: 75.5, fatG: 19.0, fiberG: 2.5, sodiumMg: 2280, isVerified: true },
  { name: '쇼유 라멘', servingSizeG: 500, caloriesPerServing: 480, proteinG: 22.0, carbG: 68.5, fatG: 12.5, fiberG: 2.0, sodiumMg: 2150, isVerified: true },
  { name: '미소 라멘', servingSizeG: 500, caloriesPerServing: 510, proteinG: 20.5, carbG: 72.5, fatG: 14.5, fiberG: 3.0, sodiumMg: 2300, isVerified: true },
  { name: '덴동 (새우튀김덮밥)', servingSizeG: 400, caloriesPerServing: 620, proteinG: 20.5, carbG: 92.5, fatG: 18.5, fiberG: 2.5, sodiumMg: 1150, isVerified: true },
  { name: '가츠동 (돈까스덮밥)', servingSizeG: 400, caloriesPerServing: 680, proteinG: 26.5, carbG: 88.5, fatG: 23.5, fiberG: 2.0, sodiumMg: 1250, isVerified: true },
  { name: '오야코동 (닭고기덮밥)', servingSizeG: 380, caloriesPerServing: 595, proteinG: 25.5, carbG: 80.5, fatG: 17.5, fiberG: 1.5, sodiumMg: 1180, isVerified: true },
  { name: '돈까스 (일식)', servingSizeG: 180, caloriesPerServing: 450, proteinG: 23.5, carbG: 32.5, fatG: 24.5, fiberG: 1.5, sodiumMg: 580, isVerified: true },
  { name: '초밥 세트 (8피스)', servingSizeG: 240, caloriesPerServing: 395, proteinG: 20.5, carbG: 68.0, fatG: 6.5, fiberG: 0.8, sodiumMg: 880, isVerified: true },
  { name: '연어 초밥 (1피스)', servingSizeG: 35, caloriesPerServing: 62, proteinG: 3.5, carbG: 9.5, fatG: 1.5, fiberG: 0.1, sodiumMg: 118, isVerified: true },
  { name: '참치 초밥 (1피스)', servingSizeG: 30, caloriesPerServing: 52, proteinG: 4.0, carbG: 8.5, fatG: 0.5, fiberG: 0.1, sodiumMg: 105, isVerified: true },
  { name: '새우 초밥 (1피스)', servingSizeG: 30, caloriesPerServing: 48, proteinG: 3.5, carbG: 8.5, fatG: 0.3, fiberG: 0.1, sodiumMg: 120, isVerified: true },
  { name: '우동 (튀김)', servingSizeG: 500, caloriesPerServing: 550, proteinG: 16.5, carbG: 82.5, fatG: 16.0, fiberG: 2.5, sodiumMg: 1620, isVerified: true },
  { name: '소바 (자루소바)', servingSizeG: 250, caloriesPerServing: 330, proteinG: 14.5, carbG: 62.5, fatG: 2.5, fiberG: 3.5, sodiumMg: 580, isVerified: true },
  { name: '오니기리 (연어)', servingSizeG: 110, caloriesPerServing: 185, proteinG: 7.5, carbG: 35.0, fatG: 2.5, fiberG: 0.5, sodiumMg: 380, isVerified: true },
  { name: '규동 (소고기덮밥)', servingSizeG: 400, caloriesPerServing: 630, proteinG: 22.5, carbG: 88.0, fatG: 20.5, fiberG: 2.5, sodiumMg: 1320, isVerified: true },
  { name: '나베 (전골)', servingSizeG: 400, caloriesPerServing: 220, proteinG: 18.5, carbG: 18.5, fatG: 7.5, fiberG: 3.5, sodiumMg: 1480, isVerified: true },
  { name: '야키토리 (닭꼬치, 2개)', servingSizeG: 80, caloriesPerServing: 145, proteinG: 13.5, carbG: 5.5, fatG: 7.5, fiberG: 0, sodiumMg: 480, isVerified: true },
  { name: '에다마메 (100g)', servingSizeG: 100, caloriesPerServing: 122, proteinG: 11.9, carbG: 7.6, fatG: 5.2, fiberG: 4.2, sodiumMg: 4, isVerified: true },
  { name: '미소된장국', servingSizeG: 200, caloriesPerServing: 55, proteinG: 3.5, carbG: 5.5, fatG: 1.8, fiberG: 1.0, sodiumMg: 850, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 양식
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '시저샐러드', servingSizeG: 200, caloriesPerServing: 280, proteinG: 9.5, carbG: 15.5, fatG: 20.5, fiberG: 3.5, sodiumMg: 580, isVerified: true },
  { name: '그린샐러드 (드레싱 제외)', servingSizeG: 150, caloriesPerServing: 35, proteinG: 2.5, carbG: 7.0, fatG: 0.5, fiberG: 3.0, sodiumMg: 45, isVerified: true },
  { name: '리조또 (버섯)', servingSizeG: 350, caloriesPerServing: 490, proteinG: 11.5, carbG: 78.5, fatG: 14.5, fiberG: 2.5, sodiumMg: 720, isVerified: true },
  { name: '리조또 (새우)', servingSizeG: 350, caloriesPerServing: 510, proteinG: 16.5, carbG: 76.5, fatG: 15.0, fiberG: 2.0, sodiumMg: 780, isVerified: true },
  { name: '그라탕', servingSizeG: 250, caloriesPerServing: 420, proteinG: 16.5, carbG: 38.5, fatG: 22.5, fiberG: 2.0, sodiumMg: 650, isVerified: true },
  { name: '치킨 알프레도', servingSizeG: 350, caloriesPerServing: 680, proteinG: 28.5, carbG: 68.5, fatG: 30.5, fiberG: 2.5, sodiumMg: 850, isVerified: true },
  { name: '뇨키 (크림소스)', servingSizeG: 300, caloriesPerServing: 480, proteinG: 11.5, carbG: 72.5, fatG: 16.5, fiberG: 2.0, sodiumMg: 580, isVerified: true },
  { name: '클램차우더 (한 그릇)', servingSizeG: 300, caloriesPerServing: 245, proteinG: 9.5, carbG: 22.5, fatG: 13.5, fiberG: 1.5, sodiumMg: 1050, isVerified: true },
  { name: '미네스트로네', servingSizeG: 300, caloriesPerServing: 115, proteinG: 4.5, carbG: 18.5, fatG: 2.5, fiberG: 4.5, sodiumMg: 680, isVerified: true },
  { name: '스테이크 (소 안심, 150g)', servingSizeG: 150, caloriesPerServing: 293, proteinG: 42.5, carbG: 0, fatG: 12.5, fiberG: 0, sodiumMg: 98, isVerified: true },
  { name: '스테이크 (등심, 200g)', servingSizeG: 200, caloriesPerServing: 494, proteinG: 49.0, carbG: 0, fatG: 31.0, fiberG: 0, sodiumMg: 136, isVerified: true },
  { name: '치킨 스테이크', servingSizeG: 150, caloriesPerServing: 230, proteinG: 34.5, carbG: 2.5, fatG: 8.5, fiberG: 0.5, sodiumMg: 520, isVerified: true },
  { name: '연어 스테이크', servingSizeG: 150, caloriesPerServing: 312, proteinG: 30.0, carbG: 0.5, fatG: 19.5, fiberG: 0, sodiumMg: 90, isVerified: true },
  { name: '랍스터 (삶은, 100g)', servingSizeG: 100, caloriesPerServing: 89, proteinG: 18.8, carbG: 0.5, fatG: 0.9, fiberG: 0, sodiumMg: 296, isVerified: true },
  { name: '피시앤칩스', servingSizeG: 300, caloriesPerServing: 625, proteinG: 24.5, carbG: 68.5, fatG: 28.5, fiberG: 4.5, sodiumMg: 780, isVerified: true },
  { name: '브런치 세트 (에그베네딕트)', servingSizeG: 280, caloriesPerServing: 490, proteinG: 20.5, carbG: 38.5, fatG: 28.5, fiberG: 2.0, sodiumMg: 820, isVerified: true },
  { name: '아보카도 토스트', servingSizeG: 180, caloriesPerServing: 320, proteinG: 8.5, carbG: 28.5, fatG: 19.5, fiberG: 7.5, sodiumMg: 380, isVerified: true },
  { name: '프렌치토스트', servingSizeG: 150, caloriesPerServing: 350, proteinG: 10.5, carbG: 45.5, fatG: 14.5, fiberG: 1.5, sodiumMg: 350, isVerified: true },
  { name: '팬케이크 (3장)', servingSizeG: 180, caloriesPerServing: 430, proteinG: 10.5, carbG: 68.5, fatG: 13.0, fiberG: 1.5, sodiumMg: 620, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 치킨 전문점 (교촌/BBQ/BHC/굽네)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '교촌 오리지날 (1조각)', servingSizeG: 100, caloriesPerServing: 280, proteinG: 21.5, carbG: 8.5, fatG: 17.5, fiberG: 0.5, sodiumMg: 490, isVerified: true },
  { name: '교촌 허니콤보 (1조각)', servingSizeG: 100, caloriesPerServing: 305, proteinG: 20.5, carbG: 16.5, fatG: 16.5, fiberG: 0.5, sodiumMg: 580, isVerified: true },
  { name: 'BBQ 황금올리브 (1조각)', servingSizeG: 100, caloriesPerServing: 270, proteinG: 20.5, carbG: 11.5, fatG: 16.0, fiberG: 0.5, sodiumMg: 450, isVerified: true },
  { name: 'BHC 맛초킹 (1조각)', servingSizeG: 100, caloriesPerServing: 295, proteinG: 19.5, carbG: 14.5, fatG: 17.5, fiberG: 0.5, sodiumMg: 620, isVerified: true },
  { name: '굽네 고추바사삭 (1조각)', servingSizeG: 100, caloriesPerServing: 245, proteinG: 22.5, carbG: 7.5, fatG: 13.5, fiberG: 0.5, sodiumMg: 510, isVerified: true },
  { name: '네네치킨 파닭 (1조각)', servingSizeG: 100, caloriesPerServing: 260, proteinG: 20.5, carbG: 10.5, fatG: 15.5, fiberG: 0.5, sodiumMg: 530, isVerified: true },
  { name: '치킨 (닭다리, 반마리)', servingSizeG: 300, caloriesPerServing: 765, proteinG: 61.5, carbG: 28.5, fatG: 43.5, fiberG: 1.5, sodiumMg: 1380, isVerified: true },
  { name: '치킨 (닭봉, 5개)', servingSizeG: 200, caloriesPerServing: 510, proteinG: 34.5, carbG: 21.5, fatG: 29.5, fiberG: 0.5, sodiumMg: 890, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 피자 전문점
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '도미노 페퍼로니 피자 (1조각)', servingSizeG: 115, caloriesPerServing: 285, proteinG: 13.5, carbG: 31.5, fatG: 11.5, fiberG: 1.5, sodiumMg: 680, isVerified: true },
  { name: '피자헛 슈퍼슈프림 (1조각)', servingSizeG: 130, caloriesPerServing: 320, proteinG: 14.5, carbG: 36.0, fatG: 13.0, fiberG: 2.0, sodiumMg: 720, isVerified: true },
  { name: '미스터피자 포테이토 (1조각)', servingSizeG: 120, caloriesPerServing: 295, proteinG: 11.5, carbG: 37.5, fatG: 11.5, fiberG: 1.5, sodiumMg: 640, isVerified: true },
  { name: '피자 마르게리타 (1조각)', servingSizeG: 100, caloriesPerServing: 235, proteinG: 10.5, carbG: 28.5, fatG: 9.0, fiberG: 1.5, sodiumMg: 580, isVerified: true },
  { name: '피자 (치즈 가득, 1조각)', servingSizeG: 120, caloriesPerServing: 310, proteinG: 14.5, carbG: 33.5, fatG: 13.0, fiberG: 1.5, sodiumMg: 690, isVerified: true },
  { name: '핫윙 (5개)', servingSizeG: 150, caloriesPerServing: 370, proteinG: 22.5, carbG: 15.5, fatG: 24.5, fiberG: 0.5, sodiumMg: 820, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 스타벅스 / 카페 음료
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '스타벅스 아메리카노 (Tall)', servingSizeG: 355, caloriesPerServing: 10, proteinG: 1.0, carbG: 1.0, fatG: 0, fiberG: 0, sodiumMg: 15, isVerified: true },
  { name: '스타벅스 카페라떼 (Tall)', servingSizeG: 355, caloriesPerServing: 150, proteinG: 8.0, carbG: 13.5, fatG: 6.0, fiberG: 0, sodiumMg: 105, isVerified: true },
  { name: '스타벅스 카라멜 마키아토 (Tall)', servingSizeG: 355, caloriesPerServing: 240, proteinG: 7.5, carbG: 34.0, fatG: 7.5, fiberG: 0, sodiumMg: 135, isVerified: true },
  { name: '스타벅스 프라푸치노 (Tall)', servingSizeG: 355, caloriesPerServing: 380, proteinG: 5.5, carbG: 60.5, fatG: 13.0, fiberG: 0, sodiumMg: 195, isVerified: true },
  { name: '스타벅스 그린티 라떼 (Tall)', servingSizeG: 355, caloriesPerServing: 215, proteinG: 7.0, carbG: 32.5, fatG: 6.0, fiberG: 0.5, sodiumMg: 100, isVerified: true },
  { name: '스타벅스 돌체 라떼 (Tall)', servingSizeG: 355, caloriesPerServing: 265, proteinG: 7.5, carbG: 39.5, fatG: 7.5, fiberG: 0, sodiumMg: 120, isVerified: true },
  { name: '투썸 딸기 생크림 케이크 (1조각)', servingSizeG: 130, caloriesPerServing: 380, proteinG: 5.5, carbG: 47.5, fatG: 18.5, fiberG: 1.0, sodiumMg: 120, isVerified: true },
  { name: '메가커피 아메리카노', servingSizeG: 355, caloriesPerServing: 10, proteinG: 0.5, carbG: 1.5, fatG: 0, fiberG: 0, sodiumMg: 10, isVerified: true },
  { name: '컴포즈 아메리카노', servingSizeG: 355, caloriesPerServing: 10, proteinG: 0.5, carbG: 1.5, fatG: 0, fiberG: 0, sodiumMg: 10, isVerified: true },
  { name: '빽다방 원조커피', servingSizeG: 355, caloriesPerServing: 125, proteinG: 3.5, carbG: 20.5, fatG: 3.0, fiberG: 0, sodiumMg: 65, isVerified: true },
  { name: '달고나 커피 (100ml)', servingSizeG: 100, caloriesPerServing: 95, proteinG: 1.5, carbG: 18.5, fatG: 1.5, fiberG: 0, sodiumMg: 30, isVerified: true },
  { name: '버블티 (밀크티)', servingSizeG: 500, caloriesPerServing: 350, proteinG: 3.5, carbG: 68.5, fatG: 5.5, fiberG: 0.5, sodiumMg: 80, isVerified: true },
  { name: '아이스 초코라떼 (Tall)', servingSizeG: 355, caloriesPerServing: 280, proteinG: 7.5, carbG: 42.0, fatG: 8.0, fiberG: 1.5, sodiumMg: 130, isVerified: true },
  { name: '유자차 (200ml)', servingSizeG: 200, caloriesPerServing: 95, proteinG: 0.5, carbG: 25.5, fatG: 0, fiberG: 1.0, sodiumMg: 5, isVerified: true },
  { name: '쌍화차 (200ml)', servingSizeG: 200, caloriesPerServing: 82, proteinG: 1.0, carbG: 20.5, fatG: 0.2, fiberG: 0.5, sodiumMg: 10, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 베이커리 (파리바게뜨 / 뚜레쥬르)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '파리바게뜨 소보로빵', servingSizeG: 80, caloriesPerServing: 295, proteinG: 6.5, carbG: 45.5, fatG: 9.5, fiberG: 1.0, sodiumMg: 285, isVerified: true },
  { name: '파리바게뜨 단팥빵', servingSizeG: 90, caloriesPerServing: 270, proteinG: 5.5, carbG: 48.5, fatG: 6.5, fiberG: 1.5, sodiumMg: 195, isVerified: true },
  { name: '파리바게뜨 크림빵', servingSizeG: 85, caloriesPerServing: 280, proteinG: 5.5, carbG: 42.0, fatG: 9.5, fiberG: 0.5, sodiumMg: 205, isVerified: true },
  { name: '뚜레쥬르 치즈케이크 (1조각)', servingSizeG: 100, caloriesPerServing: 330, proteinG: 7.5, carbG: 32.5, fatG: 18.5, fiberG: 0.5, sodiumMg: 280, isVerified: true },
  { name: '도넛 (글레이즈드)', servingSizeG: 50, caloriesPerServing: 195, proteinG: 2.5, carbG: 26.5, fatG: 9.0, fiberG: 0.5, sodiumMg: 185, isVerified: true },
  { name: '도넛 (초콜릿)', servingSizeG: 55, caloriesPerServing: 220, proteinG: 2.5, carbG: 30.0, fatG: 10.5, fiberG: 0.5, sodiumMg: 195, isVerified: true },
  { name: '머핀 (블루베리)', servingSizeG: 100, caloriesPerServing: 340, proteinG: 5.5, carbG: 54.5, fatG: 11.5, fiberG: 1.5, sodiumMg: 320, isVerified: true },
  { name: '치아바타', servingSizeG: 60, caloriesPerServing: 155, proteinG: 5.5, carbG: 30.5, fatG: 1.5, fiberG: 1.5, sodiumMg: 280, isVerified: true },
  { name: '프레첼', servingSizeG: 50, caloriesPerServing: 190, proteinG: 5.5, carbG: 38.5, fatG: 1.5, fiberG: 1.5, sodiumMg: 480, isVerified: true },
  { name: '쑥떡 (100g)', servingSizeG: 100, caloriesPerServing: 210, proteinG: 4.5, carbG: 46.0, fatG: 1.0, fiberG: 1.5, sodiumMg: 10, isVerified: true },
  { name: '카스테라 (1조각)', servingSizeG: 60, caloriesPerServing: 190, proteinG: 4.5, carbG: 35.5, fatG: 4.0, fiberG: 0.5, sodiumMg: 105, isVerified: true },
  { name: '롤케이크 (1조각)', servingSizeG: 80, caloriesPerServing: 225, proteinG: 4.0, carbG: 35.5, fatG: 7.5, fiberG: 0.5, sodiumMg: 115, isVerified: true },
  { name: '마카롱 (1개)', servingSizeG: 25, caloriesPerServing: 110, proteinG: 1.5, carbG: 18.5, fatG: 3.5, fiberG: 0.5, sodiumMg: 20, isVerified: true },
  { name: '에클레어 (1개)', servingSizeG: 80, caloriesPerServing: 240, proteinG: 5.5, carbG: 27.5, fatG: 12.5, fiberG: 0.5, sodiumMg: 145, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 아이스크림 / 디저트
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '배스킨라빈스 아이스크림 (1스쿱)', servingSizeG: 90, caloriesPerServing: 175, proteinG: 3.0, carbG: 23.5, fatG: 8.0, fiberG: 0, sodiumMg: 65, isVerified: true },
  { name: '매일 바나나맛 우유 (240ml)', servingSizeG: 240, caloriesPerServing: 178, proteinG: 5.8, carbG: 30.5, fatG: 4.3, fiberG: 0, sodiumMg: 115, isVerified: true },
  { name: '부라보콘 (1개)', servingSizeG: 80, caloriesPerServing: 178, proteinG: 2.5, carbG: 24.5, fatG: 8.0, fiberG: 0, sodiumMg: 68, isVerified: true },
  { name: '돼지바 (1개)', servingSizeG: 80, caloriesPerServing: 172, proteinG: 1.5, carbG: 26.0, fatG: 7.0, fiberG: 0, sodiumMg: 55, isVerified: true },
  { name: '빵빠레 (1개)', servingSizeG: 100, caloriesPerServing: 178, proteinG: 2.5, carbG: 23.5, fatG: 8.5, fiberG: 0, sodiumMg: 60, isVerified: true },
  { name: '메로나 (1개)', servingSizeG: 80, caloriesPerServing: 105, proteinG: 1.0, carbG: 20.5, fatG: 2.5, fiberG: 0, sodiumMg: 30, isVerified: true },
  { name: '누가바 (1개)', servingSizeG: 90, caloriesPerServing: 225, proteinG: 3.5, carbG: 32.0, fatG: 9.5, fiberG: 0, sodiumMg: 55, isVerified: true },
  { name: '설레임 (1개)', servingSizeG: 180, caloriesPerServing: 155, proteinG: 1.0, carbG: 37.5, fatG: 0.2, fiberG: 0, sodiumMg: 40, isVerified: true },
  { name: '티라미수 (1조각)', servingSizeG: 120, caloriesPerServing: 365, proteinG: 7.5, carbG: 35.5, fatG: 20.5, fiberG: 0.5, sodiumMg: 115, isVerified: true },
  { name: '푸딩 (1개)', servingSizeG: 100, caloriesPerServing: 130, proteinG: 3.5, carbG: 22.5, fatG: 3.5, fiberG: 0, sodiumMg: 85, isVerified: true },
  { name: '젤리 (과일맛)', servingSizeG: 100, caloriesPerServing: 79, proteinG: 1.0, carbG: 18.5, fatG: 0, fiberG: 0, sodiumMg: 45, isVerified: true },
  { name: '팥빙수 (기본)', servingSizeG: 400, caloriesPerServing: 380, proteinG: 6.5, carbG: 81.5, fatG: 3.5, fiberG: 3.5, sodiumMg: 85, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 편의점 인기 제품 (GS25 / CU / 세븐일레븐)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: 'CU 그릭치킨 샐러드', servingSizeG: 200, caloriesPerServing: 180, proteinG: 15.5, carbG: 15.5, fatG: 6.0, fiberG: 4.0, sodiumMg: 420, isVerified: true },
  { name: 'GS25 닭가슴살 도시락', servingSizeG: 350, caloriesPerServing: 390, proteinG: 28.5, carbG: 52.5, fatG: 6.5, fiberG: 3.5, sodiumMg: 850, isVerified: true },
  { name: '편의점 소떡소떡 (1개)', servingSizeG: 70, caloriesPerServing: 185, proteinG: 6.5, carbG: 26.5, fatG: 5.5, fiberG: 0.5, sodiumMg: 380, isVerified: true },
  { name: '편의점 치즈 스틱 (1개)', servingSizeG: 30, caloriesPerServing: 88, proteinG: 4.5, carbG: 7.5, fatG: 4.5, fiberG: 0, sodiumMg: 195, isVerified: true },
  { name: '구운 계란 (1개)', servingSizeG: 55, caloriesPerServing: 80, proteinG: 7.0, carbG: 0.5, fatG: 5.5, fiberG: 0, sodiumMg: 65, isVerified: true },
  { name: '편의점 핫바 (큰것)', servingSizeG: 100, caloriesPerServing: 195, proteinG: 9.0, carbG: 17.5, fatG: 9.0, fiberG: 0, sodiumMg: 680, isVerified: true },
  { name: '편의점 스팸 주먹밥', servingSizeG: 150, caloriesPerServing: 320, proteinG: 8.5, carbG: 55.5, fatG: 7.5, fiberG: 1.0, sodiumMg: 680, isVerified: true },
  { name: '편의점 불닭 주먹밥', servingSizeG: 140, caloriesPerServing: 295, proteinG: 7.5, carbG: 52.5, fatG: 6.0, fiberG: 1.5, sodiumMg: 720, isVerified: true },
  { name: '편의점 닭다리 (1개)', servingSizeG: 120, caloriesPerServing: 265, proteinG: 19.5, carbG: 11.5, fatG: 14.5, fiberG: 0, sodiumMg: 580, isVerified: true },
  { name: '편의점 치킨 한 마리 (오리지날)', servingSizeG: 700, caloriesPerServing: 1450, proteinG: 98.5, carbG: 55.5, fatG: 85.5, fiberG: 2.5, sodiumMg: 2850, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 과자 / 스낵 추가
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '양파링 (84g)', servingSizeG: 84, caloriesPerServing: 428, proteinG: 5.5, carbG: 61.5, fatG: 17.5, fiberG: 1.5, sodiumMg: 680, isVerified: true },
  { name: '맛동산 (90g)', servingSizeG: 90, caloriesPerServing: 430, proteinG: 6.0, carbG: 67.5, fatG: 15.5, fiberG: 2.0, sodiumMg: 310, isVerified: true },
  { name: '홈런볼 (46g)', servingSizeG: 46, caloriesPerServing: 225, proteinG: 3.0, carbG: 31.5, fatG: 10.0, fiberG: 0.5, sodiumMg: 130, isVerified: true },
  { name: '스니커즈 (1개, 52g)', servingSizeG: 52, caloriesPerServing: 245, proteinG: 4.0, carbG: 33.0, fatG: 11.5, fiberG: 1.0, sodiumMg: 115, isVerified: true },
  { name: '킷캣 (1개)', servingSizeG: 45, caloriesPerServing: 225, proteinG: 3.0, carbG: 29.5, fatG: 11.5, fiberG: 0.5, sodiumMg: 50, isVerified: true },
  { name: '에너지바 (프로틴바)', servingSizeG: 60, caloriesPerServing: 230, proteinG: 20.5, carbG: 22.5, fatG: 7.0, fiberG: 3.5, sodiumMg: 180, isVerified: true },
  { name: '마이쮸 (40g)', servingSizeG: 40, caloriesPerServing: 145, proteinG: 0.5, carbG: 35.5, fatG: 0.5, fiberG: 0, sodiumMg: 15, isVerified: true },
  { name: '젤리 (하리보, 100g)', servingSizeG: 100, caloriesPerServing: 345, proteinG: 7.0, carbG: 77.0, fatG: 0.5, fiberG: 0.5, sodiumMg: 65, isVerified: true },
  { name: '팝콘 (버터맛, 50g)', servingSizeG: 50, caloriesPerServing: 220, proteinG: 2.5, carbG: 27.5, fatG: 11.0, fiberG: 3.5, sodiumMg: 280, isVerified: true },
  { name: '포테이토칩 (100g)', servingSizeG: 100, caloriesPerServing: 546, proteinG: 6.5, carbG: 53.5, fatG: 33.0, fiberG: 4.5, sodiumMg: 428, isVerified: true },
  { name: '쌀과자 (100g)', servingSizeG: 100, caloriesPerServing: 398, proteinG: 7.5, carbG: 84.5, fatG: 3.5, fiberG: 1.5, sodiumMg: 280, isVerified: true },
  { name: '누룽지 (100g)', servingSizeG: 100, caloriesPerServing: 375, proteinG: 7.0, carbG: 82.5, fatG: 1.5, fiberG: 1.0, sodiumMg: 5, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 음료 추가
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '레드불 (250ml)', servingSizeG: 250, caloriesPerServing: 115, proteinG: 1.0, carbG: 27.5, fatG: 0, fiberG: 0, sodiumMg: 105, isVerified: true },
  { name: '핫식스 (250ml)', servingSizeG: 250, caloriesPerServing: 118, proteinG: 0.5, carbG: 29.5, fatG: 0, fiberG: 0, sodiumMg: 80, isVerified: true },
  { name: '비타500 (100ml)', servingSizeG: 100, caloriesPerServing: 50, proteinG: 0.2, carbG: 12.5, fatG: 0, fiberG: 0, sodiumMg: 5, isVerified: true },
  { name: '박카스 (120ml)', servingSizeG: 120, caloriesPerServing: 65, proteinG: 0.5, carbG: 16.0, fatG: 0, fiberG: 0, sodiumMg: 15, isVerified: true },
  { name: '사이다 (355ml)', servingSizeG: 355, caloriesPerServing: 136, proteinG: 0, carbG: 36.5, fatG: 0, fiberG: 0, sodiumMg: 35, isVerified: true },
  { name: '환타 오렌지 (355ml)', servingSizeG: 355, caloriesPerServing: 155, proteinG: 0, carbG: 42.5, fatG: 0, fiberG: 0, sodiumMg: 55, isVerified: true },
  { name: '복숭아 아이스티 (500ml)', servingSizeG: 500, caloriesPerServing: 110, proteinG: 0, carbG: 28.5, fatG: 0, fiberG: 0, sodiumMg: 40, isVerified: true },
  { name: '제주 삼다수 (500ml)', servingSizeG: 500, caloriesPerServing: 0, proteinG: 0, carbG: 0, fatG: 0, fiberG: 0, sodiumMg: 8, isVerified: true },
  { name: '녹차 (200ml)', servingSizeG: 200, caloriesPerServing: 4, proteinG: 0.2, carbG: 0.8, fatG: 0, fiberG: 0, sodiumMg: 3, isVerified: true },
  { name: '홍차 (200ml)', servingSizeG: 200, caloriesPerServing: 4, proteinG: 0.1, carbG: 0.9, fatG: 0, fiberG: 0, sodiumMg: 2, isVerified: true },
  { name: '두유 (달콤한)', servingSizeG: 190, caloriesPerServing: 132, proteinG: 5.5, carbG: 19.5, fatG: 3.5, fiberG: 0.8, sodiumMg: 75, isVerified: true },
  { name: '코코아 (핫초코, 200ml)', servingSizeG: 200, caloriesPerServing: 152, proteinG: 4.5, carbG: 25.5, fatG: 4.5, fiberG: 1.0, sodiumMg: 120, isVerified: true },
  { name: '와인 레드 (150ml)', servingSizeG: 150, caloriesPerServing: 125, proteinG: 0.2, carbG: 3.8, fatG: 0, fiberG: 0, sodiumMg: 10, isVerified: true },
  { name: '와인 화이트 (150ml)', servingSizeG: 150, caloriesPerServing: 118, proteinG: 0.1, carbG: 3.8, fatG: 0, fiberG: 0, sodiumMg: 8, isVerified: true },
  { name: '토마토주스 (200ml)', servingSizeG: 200, caloriesPerServing: 42, proteinG: 1.8, carbG: 9.0, fatG: 0.2, fiberG: 1.0, sodiumMg: 210, isVerified: true },
  { name: '당근주스 (200ml)', servingSizeG: 200, caloriesPerServing: 78, proteinG: 1.5, carbG: 18.5, fatG: 0.3, fiberG: 2.0, sodiumMg: 85, isVerified: true },
  { name: '사과주스 (200ml)', servingSizeG: 200, caloriesPerServing: 92, proteinG: 0.3, carbG: 23.5, fatG: 0.1, fiberG: 0.5, sodiumMg: 10, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 건강식 / 다이어트 식품
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '닭가슴살 소시지 (100g)', servingSizeG: 100, caloriesPerServing: 115, proteinG: 18.5, carbG: 4.5, fatG: 2.5, fiberG: 0.5, sodiumMg: 620, isVerified: true },
  { name: '닭가슴살 스테이크 (100g)', servingSizeG: 100, caloriesPerServing: 120, proteinG: 21.5, carbG: 2.5, fatG: 2.0, fiberG: 0, sodiumMg: 540, isVerified: true },
  { name: '곤약밥 (150g)', servingSizeG: 150, caloriesPerServing: 85, proteinG: 1.5, carbG: 19.5, fatG: 0.2, fiberG: 3.5, sodiumMg: 5, isVerified: true },
  { name: '곤약 (100g)', servingSizeG: 100, caloriesPerServing: 7, proteinG: 0.2, carbG: 1.3, fatG: 0.1, fiberG: 2.9, sodiumMg: 10, isVerified: true },
  { name: '두부면 (100g)', servingSizeG: 100, caloriesPerServing: 52, proteinG: 6.5, carbG: 1.5, fatG: 2.5, fiberG: 0.5, sodiumMg: 8, isVerified: true },
  { name: '렌틸콩 (삶은, 100g)', servingSizeG: 100, caloriesPerServing: 116, proteinG: 9.0, carbG: 20.0, fatG: 0.4, fiberG: 7.9, sodiumMg: 2, isVerified: true },
  { name: '병아리콩 (삶은, 100g)', servingSizeG: 100, caloriesPerServing: 164, proteinG: 8.9, carbG: 27.4, fatG: 2.6, fiberG: 7.6, sodiumMg: 7, isVerified: true },
  { name: '퀴노아 (삶은, 100g)', servingSizeG: 100, caloriesPerServing: 120, proteinG: 4.4, carbG: 21.3, fatG: 1.9, fiberG: 2.8, sodiumMg: 7, isVerified: true },
  { name: '아마씨 (15g)', servingSizeG: 15, caloriesPerServing: 75, proteinG: 2.5, carbG: 4.0, fatG: 6.0, fiberG: 3.8, sodiumMg: 3, isVerified: true },
  { name: '치아씨드 (15g)', servingSizeG: 15, caloriesPerServing: 69, proteinG: 2.4, carbG: 5.9, fatG: 4.4, fiberG: 5.5, sodiumMg: 3, isVerified: true },
  { name: '프로틴 요거트', servingSizeG: 150, caloriesPerServing: 130, proteinG: 20.0, carbG: 8.5, fatG: 1.5, fiberG: 0, sodiumMg: 75, isVerified: true },
  { name: '무가당 아몬드 우유 (200ml)', servingSizeG: 200, caloriesPerServing: 30, proteinG: 1.0, carbG: 1.5, fatG: 2.5, fiberG: 0.5, sodiumMg: 150, isVerified: true },
  { name: '두부 샐러드', servingSizeG: 200, caloriesPerServing: 145, proteinG: 12.5, carbG: 9.5, fatG: 7.0, fiberG: 3.5, sodiumMg: 380, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 채소 추가
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '케일 (생)', servingSizeG: 100, caloriesPerServing: 49, proteinG: 4.3, carbG: 8.8, fatG: 0.9, fiberG: 3.6, sodiumMg: 38, isVerified: true },
  { name: '루꼴라', servingSizeG: 100, caloriesPerServing: 25, proteinG: 2.6, carbG: 3.7, fatG: 0.7, fiberG: 1.6, sodiumMg: 27, isVerified: true },
  { name: '셀러리 (생)', servingSizeG: 100, caloriesPerServing: 16, proteinG: 0.7, carbG: 3.0, fatG: 0.2, fiberG: 1.6, sodiumMg: 80, isVerified: true },
  { name: '비트 (생)', servingSizeG: 100, caloriesPerServing: 43, proteinG: 1.6, carbG: 9.6, fatG: 0.2, fiberG: 2.8, sodiumMg: 78, isVerified: true },
  { name: '콜리플라워', servingSizeG: 100, caloriesPerServing: 25, proteinG: 1.9, carbG: 5.0, fatG: 0.3, fiberG: 2.0, sodiumMg: 30, isVerified: true },
  { name: '가지 (생)', servingSizeG: 100, caloriesPerServing: 25, proteinG: 1.0, carbG: 5.9, fatG: 0.2, fiberG: 3.0, sodiumMg: 2, isVerified: true },
  { name: '호박 (애호박)', servingSizeG: 100, caloriesPerServing: 17, proteinG: 1.2, carbG: 3.1, fatG: 0.2, fiberG: 1.1, sodiumMg: 2, isVerified: true },
  { name: '무 (생)', servingSizeG: 100, caloriesPerServing: 18, proteinG: 0.7, carbG: 3.9, fatG: 0.1, fiberG: 1.9, sodiumMg: 28, isVerified: true },
  { name: '연근 (생)', servingSizeG: 100, caloriesPerServing: 74, proteinG: 2.6, carbG: 17.2, fatG: 0.1, fiberG: 2.7, sodiumMg: 36, isVerified: true },
  { name: '마늘 (생)', servingSizeG: 10, caloriesPerServing: 14, proteinG: 0.6, carbG: 3.1, fatG: 0.1, fiberG: 0.2, sodiumMg: 2, isVerified: true },
  { name: '생강 (생)', servingSizeG: 10, caloriesPerServing: 8, proteinG: 0.2, carbG: 1.8, fatG: 0.1, fiberG: 0.2, sodiumMg: 2, isVerified: true },
  { name: '양파 (생)', servingSizeG: 100, caloriesPerServing: 40, proteinG: 1.1, carbG: 9.3, fatG: 0.1, fiberG: 1.7, sodiumMg: 4, isVerified: true },
  { name: '대파 (생)', servingSizeG: 50, caloriesPerServing: 21, proteinG: 1.1, carbG: 4.3, fatG: 0.1, fiberG: 1.5, sodiumMg: 10, isVerified: true },
  { name: '깻잎 (생)', servingSizeG: 100, caloriesPerServing: 44, proteinG: 3.9, carbG: 6.8, fatG: 1.0, fiberG: 3.2, sodiumMg: 10, isVerified: true },
  { name: '부추 (생)', servingSizeG: 100, caloriesPerServing: 31, proteinG: 2.4, carbG: 5.5, fatG: 0.4, fiberG: 2.7, sodiumMg: 7, isVerified: true },
  { name: '미나리', servingSizeG: 100, caloriesPerServing: 27, proteinG: 2.5, carbG: 4.9, fatG: 0.2, fiberG: 2.5, sodiumMg: 30, isVerified: true },
  { name: '쑥갓', servingSizeG: 100, caloriesPerServing: 24, proteinG: 2.3, carbG: 3.8, fatG: 0.4, fiberG: 2.4, sodiumMg: 45, isVerified: true },
  { name: '고추 (청고추)', servingSizeG: 100, caloriesPerServing: 33, proteinG: 1.6, carbG: 7.0, fatG: 0.3, fiberG: 2.9, sodiumMg: 6, isVerified: true },
  { name: '쪽파', servingSizeG: 50, caloriesPerServing: 17, proteinG: 1.0, carbG: 3.5, fatG: 0.2, fiberG: 1.3, sodiumMg: 8, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 과일 추가
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '아사이베리', servingSizeG: 100, caloriesPerServing: 70, proteinG: 1.5, carbG: 4.0, fatG: 5.0, fiberG: 2.0, sodiumMg: 7, isVerified: true },
  { name: '라즈베리', servingSizeG: 100, caloriesPerServing: 52, proteinG: 1.2, carbG: 11.9, fatG: 0.7, fiberG: 6.5, sodiumMg: 1, isVerified: true },
  { name: '자두', servingSizeG: 100, caloriesPerServing: 46, proteinG: 0.7, carbG: 11.4, fatG: 0.3, fiberG: 1.4, sodiumMg: 0, isVerified: true },
  { name: '무화과', servingSizeG: 100, caloriesPerServing: 74, proteinG: 0.7, carbG: 19.2, fatG: 0.3, fiberG: 2.9, sodiumMg: 1, isVerified: true },
  { name: '석류', servingSizeG: 100, caloriesPerServing: 83, proteinG: 1.7, carbG: 18.7, fatG: 1.2, fiberG: 4.0, sodiumMg: 3, isVerified: true },
  { name: '두리안', servingSizeG: 100, caloriesPerServing: 147, proteinG: 1.5, carbG: 27.1, fatG: 5.3, fiberG: 3.8, sodiumMg: 2, isVerified: true },
  { name: '용과 (드래곤푸르트)', servingSizeG: 100, caloriesPerServing: 60, proteinG: 1.2, carbG: 13.0, fatG: 0.4, fiberG: 2.9, sodiumMg: 39, isVerified: true },
  { name: '토마토체리 (방울토마토, 10개)', servingSizeG: 100, caloriesPerServing: 18, proteinG: 0.9, carbG: 3.9, fatG: 0.2, fiberG: 1.2, sodiumMg: 5, isVerified: true },
  { name: '참외 (1개)', servingSizeG: 250, caloriesPerServing: 78, proteinG: 1.5, carbG: 19.3, fatG: 0.3, fiberG: 1.8, sodiumMg: 10, isVerified: true },
  { name: '멜론 (1/4)', servingSizeG: 200, caloriesPerServing: 64, proteinG: 1.6, carbG: 15.6, fatG: 0.2, fiberG: 0.9, sodiumMg: 20, isVerified: true },
  { name: '자몽', servingSizeG: 200, caloriesPerServing: 82, proteinG: 1.6, carbG: 20.8, fatG: 0.2, fiberG: 2.8, sodiumMg: 0, isVerified: true },
  { name: '레몬', servingSizeG: 100, caloriesPerServing: 29, proteinG: 1.1, carbG: 9.3, fatG: 0.3, fiberG: 2.8, sodiumMg: 2, isVerified: true },
  { name: '라임', servingSizeG: 100, caloriesPerServing: 30, proteinG: 0.7, carbG: 10.5, fatG: 0.2, fiberG: 2.8, sodiumMg: 2, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 견과류 / 씨앗 추가
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '마카다미아 (30g)', servingSizeG: 30, caloriesPerServing: 204, proteinG: 2.2, carbG: 3.9, fatG: 21.5, fiberG: 2.4, sodiumMg: 0, isVerified: true },
  { name: '피스타치오 (30g)', servingSizeG: 30, caloriesPerServing: 171, proteinG: 6.1, carbG: 8.3, fatG: 13.7, fiberG: 3.1, sodiumMg: 130, isVerified: true },
  { name: '브라질너트 (30g)', servingSizeG: 30, caloriesPerServing: 196, proteinG: 4.3, carbG: 3.5, fatG: 19.8, fiberG: 2.1, sodiumMg: 0, isVerified: true },
  { name: '해바라기씨 (30g)', servingSizeG: 30, caloriesPerServing: 170, proteinG: 5.7, carbG: 6.8, fatG: 14.8, fiberG: 2.7, sodiumMg: 0, isVerified: true },
  { name: '호박씨 (30g)', servingSizeG: 30, caloriesPerServing: 163, proteinG: 8.5, carbG: 5.3, fatG: 14.0, fiberG: 1.8, sodiumMg: 2, isVerified: true },
  { name: '땅콩버터 (1큰술, 16g)', servingSizeG: 16, caloriesPerServing: 94, proteinG: 4.0, carbG: 3.5, fatG: 8.0, fiberG: 0.9, sodiumMg: 73, isVerified: true },
  { name: '아몬드버터 (1큰술, 16g)', servingSizeG: 16, caloriesPerServing: 98, proteinG: 3.5, carbG: 3.0, fatG: 8.9, fiberG: 1.1, sodiumMg: 36, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 가공식품 / 즉석식품
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '비빔면 (팔도, 1봉)', servingSizeG: 130, caloriesPerServing: 485, proteinG: 10.5, carbG: 86.5, fatG: 9.5, fiberG: 3.5, sodiumMg: 1380, isVerified: true },
  { name: '너구리 라면 (1봉)', servingSizeG: 120, caloriesPerServing: 512, proteinG: 11.0, carbG: 74.5, fatG: 18.5, fiberG: 2.5, sodiumMg: 1720, isVerified: true },
  { name: '불닭볶음면 (1봉)', servingSizeG: 140, caloriesPerServing: 530, proteinG: 13.0, carbG: 81.5, fatG: 16.0, fiberG: 3.0, sodiumMg: 1920, isVerified: true },
  { name: '진라면 (1봉)', servingSizeG: 120, caloriesPerServing: 490, proteinG: 10.5, carbG: 72.5, fatG: 17.0, fiberG: 2.0, sodiumMg: 1680, isVerified: true },
  { name: '삼양라면 (1봉)', servingSizeG: 120, caloriesPerServing: 495, proteinG: 10.5, carbG: 72.0, fatG: 17.5, fiberG: 2.0, sodiumMg: 1620, isVerified: true },
  { name: '틈새라면 (1봉)', servingSizeG: 120, caloriesPerServing: 500, proteinG: 10.5, carbG: 73.5, fatG: 18.0, fiberG: 2.5, sodiumMg: 1750, isVerified: true },
  { name: '진짬뽕 (1봉)', servingSizeG: 130, caloriesPerServing: 490, proteinG: 12.5, carbG: 70.5, fatG: 16.0, fiberG: 3.0, sodiumMg: 1980, isVerified: true },
  { name: '볶음진짜장 (1봉)', servingSizeG: 140, caloriesPerServing: 570, proteinG: 12.5, carbG: 84.5, fatG: 18.5, fiberG: 3.5, sodiumMg: 1520, isVerified: true },
  { name: '햇반 (210g)', servingSizeG: 210, caloriesPerServing: 329, proteinG: 5.5, carbG: 72.5, fatG: 1.0, fiberG: 0.4, sodiumMg: 2, isVerified: true },
  { name: '햇반 현미 (210g)', servingSizeG: 210, caloriesPerServing: 303, proteinG: 5.8, carbG: 65.5, fatG: 1.8, fiberG: 2.1, sodiumMg: 2, isVerified: true },
  { name: '즉석 카레 (1봉, 200g)', servingSizeG: 200, caloriesPerServing: 210, proteinG: 5.5, carbG: 30.5, fatG: 8.0, fiberG: 3.0, sodiumMg: 680, isVerified: true },
  { name: '즉석 미역국 (1봉)', servingSizeG: 200, caloriesPerServing: 28, proteinG: 2.0, carbG: 3.5, fatG: 0.5, fiberG: 1.5, sodiumMg: 820, isVerified: true },
  { name: '레토르트 갈비탕', servingSizeG: 500, caloriesPerServing: 290, proteinG: 18.5, carbG: 20.5, fatG: 12.5, fiberG: 0.5, sodiumMg: 1250, isVerified: true },
  { name: '레토르트 삼계탕', servingSizeG: 800, caloriesPerServing: 600, proteinG: 52.5, carbG: 45.5, fatG: 20.5, fiberG: 1.0, sodiumMg: 1180, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 조미료 / 소스
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '간장 (1큰술, 15ml)', servingSizeG: 15, caloriesPerServing: 9, proteinG: 1.0, carbG: 1.5, fatG: 0, fiberG: 0, sodiumMg: 1080, isVerified: true },
  { name: '마요네즈 (1큰술, 14g)', servingSizeG: 14, caloriesPerServing: 94, proteinG: 0.2, carbG: 0.8, fatG: 10.0, fiberG: 0, sodiumMg: 85, isVerified: true },
  { name: '케첩 (1큰술, 17g)', servingSizeG: 17, caloriesPerServing: 18, proteinG: 0.3, carbG: 4.5, fatG: 0, fiberG: 0.1, sodiumMg: 168, isVerified: true },
  { name: '올리브오일 (1큰술, 14g)', servingSizeG: 14, caloriesPerServing: 126, proteinG: 0, carbG: 0, fatG: 14.0, fiberG: 0, sodiumMg: 0, isVerified: true },
  { name: '참기름 (1작은술, 5g)', servingSizeG: 5, caloriesPerServing: 45, proteinG: 0, carbG: 0, fatG: 5.0, fiberG: 0, sodiumMg: 0, isVerified: true },
  { name: '설탕 (1큰술, 12g)', servingSizeG: 12, caloriesPerServing: 46, proteinG: 0, carbG: 12.0, fatG: 0, fiberG: 0, sodiumMg: 0, isVerified: true },
  { name: '꿀 (1큰술, 21g)', servingSizeG: 21, caloriesPerServing: 64, proteinG: 0.1, carbG: 17.3, fatG: 0, fiberG: 0, sodiumMg: 1, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 맥도날드 / KFC 추가 메뉴
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '맥도날드 에그 맥머핀', servingSizeG: 135, caloriesPerServing: 305, proteinG: 17.5, carbG: 30.5, fatG: 12.5, fiberG: 1.5, sodiumMg: 820, isVerified: true },
  { name: '맥도날드 해피밀 치킨너겟 (6조각)', servingSizeG: 105, caloriesPerServing: 270, proteinG: 14.5, carbG: 19.5, fatG: 14.0, fiberG: 1.0, sodiumMg: 490, isVerified: true },
  { name: '맥도날드 맥플러리', servingSizeG: 285, caloriesPerServing: 445, proteinG: 8.5, carbG: 71.5, fatG: 14.5, fiberG: 0.5, sodiumMg: 180, isVerified: true },
  { name: 'KFC 오리지날 치킨 (1조각)', servingSizeG: 120, caloriesPerServing: 305, proteinG: 22.5, carbG: 12.5, fatG: 17.5, fiberG: 0.5, sodiumMg: 615, isVerified: true },
  { name: 'KFC 징거버거', servingSizeG: 210, caloriesPerServing: 490, proteinG: 25.5, carbG: 54.5, fatG: 18.5, fiberG: 3.0, sodiumMg: 1050, isVerified: true },
  { name: '롯데리아 모짜버거', servingSizeG: 170, caloriesPerServing: 430, proteinG: 17.5, carbG: 48.5, fatG: 17.5, fiberG: 2.0, sodiumMg: 890, isVerified: true },
  { name: '서브웨이 이탈리안 BMT (15cm)', servingSizeG: 248, caloriesPerServing: 450, proteinG: 23.5, carbG: 47.5, fatG: 17.5, fiberG: 3.5, sodiumMg: 1480, isVerified: true },
  { name: '서브웨이 베지 딜라이트 (15cm)', servingSizeG: 201, caloriesPerServing: 230, proteinG: 9.5, carbG: 44.5, fatG: 2.5, fiberG: 4.5, sodiumMg: 520, isVerified: true },
  { name: '서브웨이 터키 (15cm)', servingSizeG: 228, caloriesPerServing: 280, proteinG: 18.5, carbG: 45.5, fatG: 4.0, fiberG: 3.5, sodiumMg: 1120, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 한식 추가 (구이 / 찜 / 볶음)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '갈치조림', servingSizeG: 150, caloriesPerServing: 220, proteinG: 18.5, carbG: 10.5, fatG: 10.5, fiberG: 1.5, sodiumMg: 1050, isVerified: true },
  { name: '고등어 조림', servingSizeG: 150, caloriesPerServing: 245, proteinG: 19.5, carbG: 8.5, fatG: 13.5, fiberG: 1.0, sodiumMg: 1120, isVerified: true },
  { name: '닭볶음탕 (매운)', servingSizeG: 300, caloriesPerServing: 415, proteinG: 28.5, carbG: 25.5, fatG: 20.5, fiberG: 4.0, sodiumMg: 1380, isVerified: true },
  { name: '오삼불고기', servingSizeG: 200, caloriesPerServing: 360, proteinG: 22.5, carbG: 18.5, fatG: 20.0, fiberG: 2.5, sodiumMg: 1280, isVerified: true },
  { name: '낙지볶음', servingSizeG: 200, caloriesPerServing: 195, proteinG: 20.5, carbG: 15.5, fatG: 5.5, fiberG: 3.5, sodiumMg: 1350, isVerified: true },
  { name: '쭈꾸미볶음', servingSizeG: 200, caloriesPerServing: 185, proteinG: 19.0, carbG: 14.5, fatG: 4.5, fiberG: 3.0, sodiumMg: 1420, isVerified: true },
  { name: '두루치기', servingSizeG: 200, caloriesPerServing: 355, proteinG: 20.5, carbG: 16.5, fatG: 22.5, fiberG: 2.5, sodiumMg: 1250, isVerified: true },
  { name: '돼지 수육 (100g)', servingSizeG: 100, caloriesPerServing: 185, proteinG: 21.5, carbG: 0, fatG: 10.5, fiberG: 0, sodiumMg: 65, isVerified: true },
  { name: '도가니탕', servingSizeG: 400, caloriesPerServing: 215, proteinG: 18.5, carbG: 6.5, fatG: 12.5, fiberG: 0.5, sodiumMg: 980, isVerified: true },
  { name: '꼬리곰탕', servingSizeG: 450, caloriesPerServing: 320, proteinG: 22.5, carbG: 5.5, fatG: 22.5, fiberG: 0, sodiumMg: 1050, isVerified: true },
  { name: '해물탕', servingSizeG: 500, caloriesPerServing: 280, proteinG: 28.5, carbG: 18.5, fatG: 8.5, fiberG: 4.5, sodiumMg: 2100, isVerified: true },
  { name: '아귀찜', servingSizeG: 300, caloriesPerServing: 245, proteinG: 25.5, carbG: 15.5, fatG: 7.5, fiberG: 4.5, sodiumMg: 1680, isVerified: true },
  { name: '간장게장 (100g)', servingSizeG: 100, caloriesPerServing: 98, proteinG: 11.5, carbG: 5.5, fatG: 3.5, fiberG: 0, sodiumMg: 1650, isVerified: true },
  { name: '양념게장 (100g)', servingSizeG: 100, caloriesPerServing: 118, proteinG: 10.5, carbG: 10.5, fatG: 3.5, fiberG: 1.0, sodiumMg: 1380, isVerified: true },
  { name: '불낙전골', servingSizeG: 400, caloriesPerServing: 380, proteinG: 25.5, carbG: 28.5, fatG: 17.5, fiberG: 4.0, sodiumMg: 1750, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 유제품 추가
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '파마산 치즈 (1큰술, 5g)', servingSizeG: 5, caloriesPerServing: 21, proteinG: 1.9, carbG: 0.2, fatG: 1.4, fiberG: 0, sodiumMg: 85, isVerified: true },
  { name: '리코타 치즈 (100g)', servingSizeG: 100, caloriesPerServing: 174, proteinG: 11.3, carbG: 3.0, fatG: 13.0, fiberG: 0, sodiumMg: 84, isVerified: true },
  { name: '버터 (1큰술, 14g)', servingSizeG: 14, caloriesPerServing: 102, proteinG: 0.1, carbG: 0, fatG: 11.5, fiberG: 0, sodiumMg: 82, isVerified: true },
  { name: '생크림 (100ml)', servingSizeG: 100, caloriesPerServing: 340, proteinG: 2.5, carbG: 3.0, fatG: 35.5, fiberG: 0, sodiumMg: 30, isVerified: true },
  { name: '아이스크림 (저칼로리)', servingSizeG: 100, caloriesPerServing: 95, proteinG: 3.5, carbG: 17.5, fatG: 1.5, fiberG: 0, sodiumMg: 60, isVerified: true },
  { name: '발효유 (야쿠르트)', servingSizeG: 65, caloriesPerServing: 43, proteinG: 1.0, carbG: 9.5, fatG: 0.1, fiberG: 0, sodiumMg: 17, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 국수/파스타 재료
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '우동면 (삶은, 100g)', servingSizeG: 100, caloriesPerServing: 105, proteinG: 2.7, carbG: 22.5, fatG: 0.4, fiberG: 0.8, sodiumMg: 2, isVerified: true },
  { name: '냉면 면 (삶은, 100g)', servingSizeG: 100, caloriesPerServing: 141, proteinG: 3.2, carbG: 32.8, fatG: 0.2, fiberG: 1.5, sodiumMg: 1, isVerified: true },
  { name: '펜네 (삶은, 100g)', servingSizeG: 100, caloriesPerServing: 158, proteinG: 5.8, carbG: 30.9, fatG: 0.9, fiberG: 1.8, sodiumMg: 1, isVerified: true },
  { name: '스파게티면 (삶은, 100g)', servingSizeG: 100, caloriesPerServing: 158, proteinG: 5.8, carbG: 30.9, fatG: 0.9, fiberG: 1.8, sodiumMg: 1, isVerified: true },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 웰빙 / 슈퍼푸드
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  { name: '스피루리나 (1큰술, 7g)', servingSizeG: 7, caloriesPerServing: 20, proteinG: 4.0, carbG: 1.7, fatG: 0.5, fiberG: 0.3, sodiumMg: 73, isVerified: true },
  { name: '콜라겐 파우더 (10g)', servingSizeG: 10, caloriesPerServing: 35, proteinG: 8.5, carbG: 0.5, fatG: 0, fiberG: 0, sodiumMg: 15, isVerified: true },
  { name: '귀리 (삶은, 100g)', servingSizeG: 100, caloriesPerServing: 71, proteinG: 2.5, carbG: 12.0, fatG: 1.5, fiberG: 1.7, sodiumMg: 49, isVerified: true },
  { name: '아마란스 (삶은, 100g)', servingSizeG: 100, caloriesPerServing: 102, proteinG: 3.8, carbG: 18.7, fatG: 1.6, fiberG: 2.1, sodiumMg: 6, isVerified: true },
  { name: '컬러푸드 믹스 (100g)', servingSizeG: 100, caloriesPerServing: 130, proteinG: 4.5, carbG: 25.5, fatG: 1.5, fiberG: 5.5, sodiumMg: 20, isVerified: true },
].map((item) => ({ ...item, source: FoodSource.SYSTEM }));
