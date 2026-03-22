# AGENT.md — app/

## 책임

이 디렉터리는 **expo-router의 파일 기반 라우팅**을 담당한다. 파일 경로가 곧 URL 경로다. 비즈니스 로직은 여기에 두지 않는다.

---

## 라우팅 구조

```
(tabs)/               # 탭 네비게이터 (4탭)
  _layout.tsx         # 탭 구조 (Home, Library, Stats, Settings)
  home.tsx            # 메인 대시보드 — 오늘의 문제, streak, 잔디, 러닝패스
  library.tsx         # 문제 라이브러리 — 검색, 카테고리 필터, 문제 카드
  stats.tsx           # 퍼포먼스 — Volume/Precision/Momentum, 마스터리, 활동
  settings.tsx        # 설정 — 프로필, Daily Goal, 로그아웃

training/             # 훈련 플로우 스택 (7단계 + result)
  _layout.tsx         # 스택 네비게이터
  reading.tsx         # 1/7 — 문제 읽기 (목표, 입력 성격, 요약)
  pattern-analysis.tsx # 2/7 — 패턴 분석 (핵심/보조 패턴)
  strategy-design.tsx  # 3/7 — 전략 설계 (자료구조, 접근법)
  solution-flow.tsx    # 4/7 — 풀이 흐름 (순서 배치)
  edge-cases.tsx       # 5/7 — 엣지 케이스 (3단계 중요도)
  complexity.tsx       # 6/7 — 복잡도 (시간/공간/이유)
  comparison.tsx       # 7/7 — 비교 검토 (정답 비교, 피드백)
  result.tsx           # 결과 — 점수, 단계별 분석, 실수 피드백, 네비게이션

_layout.tsx           # 루트 레이아웃 — TrainingProvider 포함
+not-found.tsx        # 404 화면
```

---

## 데이터 소스

**모든 탭 화면이 실제 Supabase 데이터를 사용한다** (sampleData 아님).

```
home.tsx     → useHomeData()     → homeService → Supabase
library.tsx  → useLibraryData()  → libraryService → Supabase
stats.tsx    → useStatsData()    → statsService → Supabase
settings.tsx → useProfileData()  → profileService → Supabase
```

탭 전환 시 `useFocusEffect`로 자동 새로고침.

---

## 훈련 플로우 진행 방식

```
home.tsx (or library.tsx)
  → router.push('/training/reading?problemId=xxx')
    ↓
  reading → pattern-analysis → strategy-design → solution-flow
    → edge-cases → complexity → comparison → result
    ↓
  result.tsx
    "홈으로" → router.dismissAll()
    "다른 문제 풀기" → router.replace('/training/reading?problemId=newId')
```

- `useTrainingSession` 훅: 인증 → 문제 fetch → 세션 생성/복원
- `useAutosave` 훅: 2초 디바운스 자동 저장
- 세션 완료 시 DB 트리거가 stats 자동 집계

---

## Screen 파일 작성 규칙

### 탭 화면 패턴
```tsx
export default function XxxScreen() {
  const { data, isLoading, refresh } = useXxxData();
  useFocusEffect(useCallback(() => { refresh(); }, []));

  if (isLoading) return <ActivityIndicator />;

  return <SafeAreaView edges={['top']}>...</SafeAreaView>;
}
```

### 훈련 화면 패턴
```tsx
export default function XxxScreen() {
  const { state, dispatch } = useTraining();
  if (!state.problem) return null;

  return (
    <SafeAreaView edges={['bottom']}>
      <ProgressBar current={N} total={7} />
      <ScrollView>...</ScrollView>
      <Button onPress={handleNext} />
    </SafeAreaView>
  );
}
```

### 금지
- 스크린에서 Supabase 직접 호출 금지 → hooks/services 사용
- 스타일 인라인 금지 → StyleSheet.create 사용
- 태그 표시 시 `getTagLabel()` 사용

---

## 알려진 이슈

- **reading.tsx**: `step` 변수 undefined 가능 → null guard 필요 (TS18048 x6)
