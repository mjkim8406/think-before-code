# AGENT.md — src/stores/

## 책임

훈련 세션의 **인메모리 상태 관리**. Context + useReducer 패턴.

---

## TrainingStore 설계

### 상태 구조

```typescript
TrainingState | null
  null          // 진행 중인 세션 없음
  TrainingState // 진행 중인 세션 있음
    ├── problemId: string
    ├── step: 'reading' | 'analysis' | 'solution-flow' | 'comparison'
    ├── selectedConcepts: string[]        // Analysis
    ├── whyThisConcept: string            // Analysis
    ├── keyObservationAnswer: string      // Analysis
    ├── wrongApproachSelections: string[] // Analysis (현재 미사용)
    ├── problemSummary: string            // Solution
    ├── bruteForceAnalysis: string        // Solution
    ├── finalApproach: string             // Solution
    ├── dataStructures: string[]          // Solution (현재 미사용)
    ├── timeComplexity: string            // Solution
    └── edgeCases: string[]              // Solution
```

### 액션

| 액션 | 언제 | 효과 |
|------|------|------|
| `START_TRAINING` | 홈에서 "학습 시작" | state = INITIAL + problemId |
| `SET_STEP` | 단계 전환 시 | step 값 변경 |
| `UPDATE_ANALYSIS` | Analysis 화면 입력 | 분석 필드 업데이트 |
| `UPDATE_SOLUTION` | Solution 화면 입력 | 풀이 필드 업데이트 |
| `RESET` | Comparison 완료 | state = null |

---

## 사용법

```tsx
// Provider는 app/_layout.tsx에서 루트 수준으로 감싸야 함
<TrainingProvider>
  <Stack />
</TrainingProvider>

// 어떤 화면에서든
const { state, dispatch } = useTraining();

// 분석 업데이트
dispatch({
  type: 'UPDATE_ANALYSIS',
  payload: { selectedConcepts: ['hash-map', 'array'] }
});

// 세션 시작
dispatch({ type: 'START_TRAINING', problemId: '...' });

// 세션 종료 (Supabase 저장 후 호출)
dispatch({ type: 'RESET' });
```

---

## 설계 결정

**왜 Context + useReducer인가?**
- 훈련 플로우는 4개 화면의 선형 진행
- 상태 공유가 필요한 컴포넌트 수가 적음
- Zustand/Redux는 과도한 복잡성

**왜 null을 초기 상태로 쓰는가?**
- 앱이 훈련 세션 없이 시작될 수 있음
- `state === null` guard가 세션 시작 여부를 명확히 표현

---

## 미구현 / 확장 필요

### Supabase 저장 시 패턴

`comparison.tsx`에서 "학습 완료" 버튼 클릭 시:

```tsx
async function handleFinish() {
  if (!state) return;

  // 1. 세션 저장
  await sessionService.saveSession({
    userId: getCurrentUserId(),
    problemId: state.problemId,
    ...state,
    conceptMatched,
    flowCompleted: true,
    completedAt: new Date().toISOString(),
  });

  // 2. 약한 개념 업데이트
  if (!conceptMatched) {
    await weakConceptService.incrementMiss(getCurrentUserId(), problem.conceptTags);
  }

  // 3. 스트릭 업데이트
  await streakService.updateStreak(getCurrentUserId());

  // 4. 로컬 상태 초기화
  dispatch({ type: 'RESET' });
  router.dismissAll();
}
```

### 저장 상태 추가 (필요 시)

저장 중 로딩 상태가 필요하면 액션 추가:
```typescript
| { type: 'SET_SAVING'; saving: boolean }
```

---

## 알려진 제약

- **앱 종료 시 상태 초기화**: 세션 데이터가 사라짐. 재개(resume) 기능 없음. MVP에서는 허용.
- `wrongApproachSelections`, `dataStructures` 필드는 수집되지만 비교에 사용 안 됨. 추후 피드백 고도화 시 활용.
