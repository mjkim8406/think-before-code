# AGENT.md — src/services/

## 책임

Supabase와 직접 통신하는 **데이터 접근 레이어**. 훅은 이 서비스를 호출하고, 화면은 훅을 호출한다. 서비스는 훅이나 화면을 알지 못한다.

---

## 현재 파일 (5개, 모두 구현 완료)

### trainingService.ts
```typescript
getCurrentUserId()          // 세션 확인 → 없으면 익명 로그인
fetchProblem(problemId)     // problems 테이블 단건 조회
getInProgressSession(userId, problemId)  // 진행 중 세션 조회
createSession(userId, problemId)         // 새 세션 생성
saveProgress(sessionId, stepAnswers, stepScores, currentStep)  // autosave
completeSession(sessionId, totalScore, stepScores, triggeredMistakes)  // 완료
assignDailyProblem()        // RPC 호출
```

### homeService.ts
```typescript
fetchTodaysProblem()        // assign_daily_problem RPC → 문제 상세 조회
fetchUserStreak()           // user_streaks 테이블
fetchActivityGrid()         // activity_log 최근 140일 (20주)
fetchTotalSolvedCount()     // completed 세션 count
```

### libraryService.ts
```typescript
fetchProblems({ search?, tag?, limit?, offset? })  // 필터/검색/페이지네이션
fetchSolvedProblemIds()     // 완료 문제 ID Set
fetchTotalProblemCount()    // 활성 문제 수
fetchAllTags()              // 전체 고유 태그 목록
```

### statsService.ts
```typescript
fetchStatsSummary()         // totalSolved, accuracyRate, totalStudyDays, currentStreak
fetchConceptMastery(limit)  // 패턴별 마스터리 (problems_solved 내림차순)
fetchMonthlyActivity()      // 최근 5주 주간 활동
fetchDifficultyDistribution()  // easy/medium/hard 카운트
```

### profileService.ts
```typescript
fetchProfile()              // profiles + auth 이메일
updateDailyGoal(goal)       // daily_goal 업데이트
signOut()                   // supabase.auth.signOut
```

---

## 서비스 작성 패턴

```typescript
import { supabase } from '@/src/lib/supabase';
import { getCurrentUserId } from './trainingService';

export async function fetchSomething(): Promise<SomeType> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase.from('table').select('*').eq('user_id', userId);
  if (error) throw new Error(`Descriptive message: ${error.message}`);
  return data as SomeType;
}
```

**규칙**:
- 항상 `error` 처리 (throw)
- `getCurrentUserId()`로 인증 처리 (익명 자동 로그인 포함)
- 병렬 가능한 쿼리는 `Promise.all` 사용
