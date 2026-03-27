# FitTrack — 다이어트 · 벌크업 · 유지어터 웹

## 빠른 시작

### 1. 의존성 설치

```bash
# 백엔드
cd backend && npm install

# 프론트엔드
cd ../frontend && npm install
```

### 2. 인프라 실행 (Docker 필요)

```bash
cd ..
docker-compose up -d
```

### 3. 환경변수 설정

```bash
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```

### 4. 서버 실행

```bash
# 백엔드 (포트 4000)
cd backend && npm run start:dev

# 프론트엔드 (포트 3000) — 새 터미널
cd frontend && npm run dev
```

### 5. 접속

- **앱**: http://localhost:3000
- **Swagger API 문서**: http://localhost:4000/api/docs

---

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| 프론트엔드 | Next.js 14, React 18, Tailwind CSS, React Query, Zustand, Recharts |
| 백엔드 | NestJS, TypeORM, Passport JWT |
| 데이터베이스 | PostgreSQL 16 |
| 캐시 / 큐 | Redis 7 |
| 검색 | Elasticsearch 8 |
| 컨테이너 | Docker Compose |

## 주요 기능

### 다이어트
- TDEE 기반 칼로리 결핍 목표 자동 계산
- 탄단지 비율 35/40/25 기본 설정
- 실시간 칼로리 잔여량 표시
- 체지방률 추적

### 벌크업
- 칼로리 잉여 목표 자동 계산
- 단백질 섭취 강조 트래킹
- 세트·반복·중량 기반 운동 볼륨 집계
- 점진적 과부하 추적

### 유지
- TDEE = 목표 칼로리
- 체중 변동 감지
- 균형 잡힌 식단 관리

## 디렉토리 구조

```
fitness-web/
├── docker-compose.yml
├── backend/
│   └── src/
│       ├── auth/          # JWT 인증
│       ├── users/         # 사용자 프로필
│       ├── goals/         # 목표 & TDEE 계산
│       ├── food/          # 식단 로그 & 음식 DB
│       ├── workout/       # 운동 로그 & 템플릿
│       ├── metrics/       # 신체 측정
│       ├── analytics/     # 통계 & 대시보드
│       ├── notifications/ # 알림
│       └── achievements/  # 업적
└── frontend/
    └── src/
        ├── app/           # Next.js App Router 페이지
        ├── components/    # 재사용 컴포넌트
        ├── lib/           # API 클라이언트, 유틸
        └── store/         # Zustand 상태
```
