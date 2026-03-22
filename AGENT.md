# AGENT.md — Root

## 이 파일의 목적

이 파일은 AI 에이전트가 **think-before-code** 프로젝트를 자율적으로 분석하고 개발하기 위한 기준 문서다. 코드를 수정하기 전에 이 파일과 각 서브디렉터리의 AGENT.md를 먼저 읽어라.

---

## 제품 한 줄 정의

코딩테스트 문제를 **맞히는 앱**이 아니라, 문제를 보고 **어떤 개념을 떠올리고 어떻게 설명할지** 훈련하는 앱. 정답 제출 없음. 사고력 루틴화가 목적.

---

## 기술 스택

| 레이어 | 기술 |
|--------|------|
| 프레임워크 | React Native + Expo 54 |
| 라우팅 | expo-router (파일 기반) |
| 언어 | TypeScript (strict) |
| 상태 관리 | Context + useReducer (외부 라이브러리 없음) |
| 백엔드 | Supabase (Postgres + Auth, 익명 인증) |
| 스타일 | StyleSheet.create (UI 라이브러리 없음) |

---

## 디렉터리 구조

```
think-before-code/
├── app/                  # 화면 및 라우팅 (expo-router)
│   ├── _layout.tsx       # 루트 레이아웃 (TrainingProvider 포함)
│   ├── (tabs)/           # 탭 네비게이터 (Home, Library, Stats, Settings)
│   │   ├── _layout.tsx   # 탭 구조 정의
│   │   ├── home.tsx      # 메인 대시보드
│   │   ├── library.tsx   # 문제 라이브러리 (검색/필터)
│   │   ├── stats.tsx     # 퍼포먼스 통계
│   │   └── settings.tsx  # 설정/프로필
│   └── training/         # 7단계 훈련 플로우 스택
│       ├── reading.tsx
│       ├── pattern-analysis.tsx
│       ├── strategy-design.tsx
│       ├── solution-flow.tsx
│       ├── edge-cases.tsx
│       ├── complexity.tsx
│       ├── comparison.tsx
│       └── result.tsx    # 결과 화면 (홈으로 / 다른 문제 풀기)
├── src/
│   ├── components/       # 재사용 UI 컴포넌트
│   │   └── training/     # 7개 질문 컴포넌트 (SingleSelect, MultiSelect 등)
│   ├── hooks/            # 커스텀 훅 (6개 구현 완료)
│   ├── lib/              # 상수, Supabase 클라이언트, 태그 라벨, 채점 로직
│   ├── services/         # Supabase API 서비스 레이어 (5개 구현 완료)
│   ├── stores/           # TrainingStore (Context + useReducer)
│   └── types/            # TypeScript 타입 정의
├── scripts/
│   ├── seed.ts           # v2 문제 시딩 스크립트
│   └── data/v2/          # 11개 카테고리 문제 데이터 (101+문제)
└── supabase/
    ├── migrations/00001_schema.sql  # 9테이블 + 트리거 + RPC
    └── seed.sql                     # 로컬 개발용 시드 (2문제)
```

각 디렉터리에 `AGENT.md`가 있다. 작업 전에 해당 AGENT.md를 읽어라.

---

## 핵심 데이터 흐름

```
사용자 입력
  → Screen (app/training/*)
  → dispatch (src/stores/trainingStore)
  → TrainingState 업데이트
  → useAutosave → saveProgress (Supabase)
  → 세션 완료 시 completeSession → DB 트리거 자동 집계
    (activity_log + user_step_stats + user_concept_stats + user_streaks)
```

```
탭 화면 데이터:
  Screen → useXxxData hook → xxxService → Supabase
  예: home.tsx → useHomeData → homeService.fetchTodaysProblem → supabase.rpc('assign_daily_problem')
```

---

## 현재 상태 (2026-03-22)

### ✅ 완성된 것
- [x] 7단계 훈련 플로우 UI (reading → comparison + result)
- [x] 질문 컴포넌트 7개 (SingleSelect, MultiSelect, TagSelect, TieredMultiSelect, OrderedSteps 등)
- [x] TrainingStore (Context + useReducer, 11개 액션)
- [x] 채점 로직 (scoring.ts — LCS 기반 순서 채점 포함)
- [x] 실수 평가 (mistakes.ts — 조건 기반 피드백)
- [x] DB 스키마 v2 (9테이블, 트리거 4개, RPC 1개, RLS 전체)
- [x] 문제 데이터 101+개 (11개 카테고리, v2 ProblemV2 형식)
- [x] 시딩 파이프라인 (npm run seed → 검증 + 배치 upsert)
- [x] 4개 탭 화면 전부 실제 Supabase 데이터 연동
  - Home: 오늘의 문제 (assign_daily_problem RPC), 스트릭, 잔디 그리드, 풀이 수
  - Library: 문제 목록 (검색/태그 필터), 풀이 완료 배지, 진행률
  - Stats: Volume/Precision/Momentum, 컨셉 마스터리, 주간 활동, 난이도 분포
  - Settings: 프로필 조회, Daily Goal 변경, 로그아웃
- [x] 서비스 레이어 5개 (homeService, libraryService, statsService, profileService, trainingService)
- [x] 데이터 훅 6개 (useHomeData, useLibraryData, useStatsData, useProfileData, useAutosave, useTrainingSession)
- [x] useFocusEffect 탭 전환 시 데이터 새로고침
- [x] 한국어 태그 라벨 매핑 (tagLabels.ts — 200+ 항목)
- [x] 한국어 제약조건 라벨 (constraintLabels)
- [x] 결과 화면 네비게이션 (홈으로 + 다른 문제 풀기)
- [x] 익명 인증 (Anonymous Auth) 작동
- [x] 빈 상태 UI (새 유저, 검색 결과 없음)

### 🔴 알려진 버그 (반드시 수정 필요)
1. **tagLabels.ts 중복 키** — `single_pass_after_sort` 252행/262행 중복 → TS1117 에러
2. **reading.tsx null safety** — `step` 변수 undefined 가능 → TS18048 에러 6개

### 🟡 미구현 (다음 작업 후보)
1. **소셜 로그인** — 현재 익명 인증만. Google/Apple 로그인 미구현
2. **Learning Path** — Home 화면의 "Dynamic Programming" 카드가 하드코딩 (DB 연동 안 됨)
3. **Insight Card** — Home 화면의 팁 카드가 정적 (추후 동적 인사이트 필요)
4. **북마크 기능** — DB 테이블은 있지만 UI 미구현
5. **Notification** — Settings에 시간 표시만 있고 실제 알림 미구현
6. **문제 상세 화면** — Library에서 카드 탭 시 바로 training flow로 진입 (상세 미리보기 없음)
7. **프로필 편집** — displayName/avatarUrl 변경 UI 없음
8. **오프라인 캐싱** — 네트워크 없을 때 처리 없음
9. **에러 바운더리** — 전역 에러 핸들링 없음
10. **테스트** — 단위/통합 테스트 없음

---

## 개발 원칙

### DO
- 타입 안전성 유지 (strict TS, no `any`)
- 기존 UI 컴포넌트 재사용 (`src/components/`)
- 상수는 `src/lib/constants.ts`에서 import
- 서비스 로직은 `src/services/`에, 훅은 `src/hooks/`에 분리
- 한국어 UI, 영어 데이터 레이어 유지
- 태그 표시 시 `getTagLabel()` 사용

### DON'T
- UI 라이브러리 추가 금지 (NativeBase, Tamagui 등)
- 상태 관리 라이브러리 추가 금지 (Zustand, Redux 등)
- 인라인 스타일 대신 StyleSheet.create 사용
- 새 screen에 비즈니스 로직 직접 작성 금지 → 훅/서비스 분리
- sampleData.ts 직접 import 금지 (실제 데이터 훅 사용)

---

## 에이전트 자율 분석 방법

```
1. AGENT.md 읽기 (이 파일 + 작업 대상 디렉터리의 AGENT.md)
2. 관련 소스 파일 읽기
3. src/types/index.ts 확인 (타입 구조 파악)
4. 의존 관계 파악
5. 변경 전 영향 범위 평가
6. 변경 후 검증 (npx tsc --noEmit)
```

---

## Supabase 설정

- URL/Key: `app.config.ts` > `extra` (환경변수 `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`)
- 인증: 익명 인증 활성화됨 (Anonymous Sign-Ins)
- RLS: 모든 테이블 활성화. problems는 누구나 읽기, 나머지는 `auth.uid() = user_id`
- 트리거: 세션 완료 시 자동 통계 집계 (activity_log, step_stats, concept_stats, streaks)
- RPC: `assign_daily_problem()` — 안 푼 문제 중 랜덤 배정
