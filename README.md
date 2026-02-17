# 성당 행정 자동화 시스템

성당 행정 업무를 위한 MVP 시스템입니다.

## 기능

- **로그인**: JWT 기반 관리자 인증
- **신자 관리**: 교적 등록/수정/삭제/검색
- **성사 기록**: 세례/견진/혼인/장례 기록 관리
- **회계 관리**: 수입/지출 등록 및 월별 합계 조회
- **대시보드**: 신자 현황 및 이달 재정 통계

## 기술 스택

- **백엔드**: NestJS + PostgreSQL + Prisma + JWT
- **프론트엔드**: Next.js 14 + TypeScript + Tailwind CSS
- **인프라**: Docker Compose

## 빠른 시작 (Docker)

```bash
# 전체 실행
docker compose up -d

# 초기 DB 마이그레이션 및 시드 (첫 실행 시 자동)
# 기본 계정: admin@church.com / admin1234
```

접속: http://localhost:3000

## 로컬 개발 환경

### 사전 요구사항
- Node.js 20+
- PostgreSQL 15+

### 백엔드 실행

```bash
cd backend
cp .env.example .env
# .env 파일의 DATABASE_URL 수정

npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

백엔드: http://localhost:4000

### 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

프론트엔드: http://localhost:3000

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | /api/v1/auth/login | 로그인 |
| GET | /api/v1/members | 신자 목록 |
| POST | /api/v1/members | 신자 등록 |
| PUT | /api/v1/members/:id | 신자 수정 |
| DELETE | /api/v1/members/:id | 신자 삭제 |
| GET | /api/v1/sacraments?memberId= | 성사 기록 조회 |
| POST | /api/v1/sacraments | 성사 기록 추가 |
| DELETE | /api/v1/sacraments/:id | 성사 기록 삭제 |
| GET | /api/v1/finance | 회계 목록 |
| GET | /api/v1/finance/summary | 월별 합계 |
| POST | /api/v1/finance | 회계 등록 |
| DELETE | /api/v1/finance/:id | 회계 삭제 |
| GET | /api/v1/dashboard | 대시보드 통계 |

## 기본 계정

- 이메일: `admin@church.com`
- 비밀번호: `admin1234`
