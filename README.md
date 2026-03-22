# Think Before Code

> 코딩테스트 문제를 **맞히는 앱**이 아니라, 문제를 보고 **어떻게 생각하고 설명할지** 훈련하는 앱.

코드를 한 줄도 작성하지 않고, **6단계 사고 훈련**을 통해 문제 해결 패턴을 체화합니다.

---

## 핵심 컨셉

기존 코딩테스트 앱은 "코드를 짜서 제출"하는 데 집중합니다.
하지만 실제 면접에서는 **"왜 이 접근을 선택했는지"** 설명하는 능력이 더 중요합니다.

Think Before Code는 각 문제에 대해:

1. 문제를 정확히 읽었는지
2. 어떤 패턴인지 인식했는지
3. 왜 그 자료구조/알고리즘을 선택했는지
4. 풀이 흐름을 논리적으로 구성했는지
5. 엣지 케이스를 고려했는지
6. 시간/공간 복잡도를 분석했는지

를 단계별로 훈련합니다.

---

## 주요 기능

### 6단계 사고 훈련

| 단계 | 이름 | 하는 일 |
|:---:|------|---------|
| 1 | 문제 읽기 | 목표 유형 파악, 입력 요약, 한 줄 정리 |
| 2 | 패턴 분석 | 핵심 패턴 식별, 근거 태그, 보조 패턴 |
| 3 | 전략 설계 | 자료구조 선택, 접근법 결정 |
| 4 | 풀이 흐름 | 구현 순서 배열 (드래그 정렬) |
| 5 | 엣지 케이스 | 필수/권장/선택 경계조건 체크 |
| 6 | 복잡도 분석 | 시간/공간 복잡도 + 근거 |
| 7 | 비교 검토 | 전문가 풀이와 비교, 핵심 요약 |

각 단계마다 **연속 점수(0~100)**로 평가하고, 결과 화면에서 **스텝별 아코디언 리뷰**로 내 답 vs 정답을 확인할 수 있습니다.

### 10단계 코스 시스템

프로그래머스 고득점 Kit 기반 순차 학습 경로:

```
Hash → Stack/Queue → Sort → Brute Force → DFS/BFS
  → Binary Search → Heap → Greedy → DP → Graph
```

각 토픽마다 **4개 레벨** (입문 → 기초 → 중급 → 실전) = 총 40개 학습 노드

### 추천 엔진

- 코스 경로에서 현재 위치 자동 파악
- 약한 스텝이 있으면 해당 토픽 보강 추천
- 레벨업 준비되면 다음 단계 추천
- 한국어 추천 이유 생성

### 통계 대시보드

- **Volume**: 총 풀이 수
- **Precision**: 전체 정확도 + 스텝별 정확도 상세
- **Momentum**: 학습 일수 + 스트릭
- **Category Mastery**: 카테고리별 완료율 게이지
- **Level Distribution**: 입문/기초/중급/실전 분포
- **Activity**: 월간/주간 막대 차트

### 그 외

- **오늘의 문제**: 매일 자동 배정
- **일일 목표**: 1~10문제 목표 설정
- **스트릭**: 연속 학습일 추적
- **북마크**: 다시 풀고 싶은 문제 저장
- **잔디 그리드**: GitHub 스타일 20주 활동 히트맵

---

## 스크린샷

> TODO: 앱 스크린샷 추가

---

## 실행 방법

### 요구사항

- Node.js 18 이상
- iOS: Xcode + iOS Simulator (Mac 전용)
- Android: Android Studio + AVD
- 또는 실기기에 [Expo Go](https://expo.dev/go) 앱 설치

### 설치 & 실행

```bash
npm install

# 개발 서버 시작
npm start

# 플랫폼별 실행
npm run ios
npm run android
npm run web
```

`npm start` 후 QR 코드를 Expo Go 앱으로 스캔하면 실기기에서 바로 확인할 수 있습니다.

### APK 빌드 (Android)

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | React Native + Expo SDK 54 |
| Routing | Expo Router (파일 기반) |
| State | Context + useReducer |
| Backend | Supabase (PostgreSQL + Auth) |
| Storage | AsyncStorage (로컬 캐시) |
| Test | Jest |
| Build | EAS Build |

---

## Supabase 연동

1. [supabase.com](https://supabase.com)에서 프로젝트 생성

2. `.env` 파일 생성:
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

3. 마이그레이션 적용:
```bash
npx supabase db push
```

---

## 프로젝트 구조

```
app/
  (tabs)/           # 탭 화면 (Home, Library, Stats, Settings)
  training/         # 7단계 훈련 플로우
  problem/          # 문제 상세
src/
  components/       # 재사용 UI 컴포넌트
  stores/           # TrainingStore (Context + Reducer)
  hooks/            # Custom hooks (useHomeData, useBookmarks, ...)
  lib/              # 스코어링, 추천, 분석 엔진
  services/         # Supabase API 레이어
  data/             # 코스 경로 정의 (10토픽 × 4레벨)
  types/            # TypeScript 타입
scripts/
  data/             # 문제 데이터 스키마 & 생성
supabase/
  migrations/       # DB 스키마
```

---

## 라이선스

MIT
