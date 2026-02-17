# 성당 관리 프로그램

## 프로젝트 개요
천주교 성당 운영을 위한 풀스택 웹 애플리케이션. 교적(신자) 관리, 성사 기록, 재무 관리, 대시보드 기능 제공.

## 기술 스택

### 백엔드 (`backend/`)
- **프레임워크**: NestJS (TypeScript)
- **ORM**: Prisma
- **DB**: PostgreSQL (또는 SQLite 개발용)
- **인증**: JWT

### 프론트엔드 (`frontend/`)
- **프레임워크**: Next.js (App Router, TypeScript)
- **스타일링**: Tailwind CSS
- **상태관리**: React Query (서버 상태) + Zustand (클라이언트 상태)

## 프로젝트 구조

```
성당프로그램/
├── CLAUDE.md
├── backend/
│   ├── prisma/
│   │   └── schema.prisma        # DB 스키마
│   └── src/
│       ├── auth/                # 인증 (로그인, JWT)
│       ├── common/              # 공통 유틸, 미들웨어, 데코레이터
│       ├── dashboard/           # 대시보드 통계 API
│       ├── finance/             # 재무/헌금 관리
│       ├── members/             # 교적 관리
│       └── sacraments/          # 성사 기록 (세례, 견진, 혼인 등)
└── frontend/
    └── src/
        ├── app/                 # Next.js App Router 페이지
        ├── components/          # 재사용 UI 컴포넌트
        ├── lib/                 # API 클라이언트, 유틸 함수
        └── types/               # TypeScript 타입 정의
```

## 핵심 도메인

### 교적 (Members)
- 신자 개인정보 (이름, 세례명, 생년월일, 연락처, 주소)
- 가족 관계 연결
- 구역/반 소속

### 성사 (Sacraments)
- 세례 (Baptism)
- 견진 (Confirmation)
- 첫영성체 (First Communion)
- 혼인 (Marriage)
- 장례 (Funeral)

### 재무 (Finance)
- 헌금 기록 (주일헌금, 특별헌금)
- 지출 관리
- 월별/연별 재무 보고서

### 인증 (Auth)
- 역할: 관리자(admin), 사무원(staff), 사제(priest)
- JWT 기반 인증

## 코드 규칙

### 공통
- 언어: 한국어 (주석, 변수명은 영어)
- TypeScript strict mode 사용
- 파일명: kebab-case

### 백엔드
- NestJS 모듈 패턴 준수 (module, controller, service, dto)
- DTO에 class-validator 데코레이터 사용
- Prisma 클라이언트는 서비스 레이어에서만 사용

### 프론트엔드
- React Server Components 우선 (필요 시 `'use client'`)
- API 호출은 `lib/api/` 에 집중
- 컴포넌트는 기능별로 폴더 구성

## 개발 명령어

```bash
# 백엔드
cd backend
npm run start:dev      # 개발 서버 실행
npm run build          # 빌드
npx prisma migrate dev # DB 마이그레이션
npx prisma studio      # DB GUI

# 프론트엔드
cd frontend
npm run dev            # 개발 서버 실행 (localhost:3000)
npm run build          # 빌드
npm run lint           # ESLint 검사
```

## 환경변수

### 백엔드 (`backend/.env`)
```
DATABASE_URL="postgresql://user:pass@localhost:5432/cathedral"
JWT_SECRET="your-secret-key"
PORT=3001
```

### 프론트엔드 (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

## 참고사항
- 현재 초기 구조만 생성된 상태 (파일 없음)
- 백엔드 포트: 3001, 프론트엔드 포트: 3000
- 한국어 사용자 대상 서비스 (UI는 한국어)
