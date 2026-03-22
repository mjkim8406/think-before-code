# AGENT.md — src/hooks/

## 책임

Supabase 데이터 페치, 상태 관리, 파생 상태를 처리하는 커스텀 훅. 화면은 이 훅만 호출하고 서비스를 직접 호출하지 않는다.

---

## 현재 파일 (6개, 모두 구현 완료)

### useHomeData.ts
```typescript
useHomeData() → {
  todaysProblem: TodaysProblem | null,
  streak: StreakData,
  activityGrid: ActivityDay[],
  totalSolved: number,
  isLoading, error, refresh
}
```
4개 쿼리 `Promise.all` 병렬 실행.

### useLibraryData.ts
```typescript
useLibraryData() → {
  problems: LibraryProblemRow[],
  solvedIds: Set<string>,
  totalCount, solvedCount, allTags: string[],
  isLoading, error,
  search, setSearch,           // 검색어 상태 내장
  activeTag, setActiveTag,     // 태그 필터 상태 내장
  refresh
}
```
`search`, `activeTag` 변경 시 자동 재조회 (useEffect dependency).

### useStatsData.ts
```typescript
useStatsData() → {
  summary: StatsSummary,
  conceptMastery: ConceptMasteryItem[],
  monthlyActivity: WeeklyActivity[],
  difficultyDist: DifficultyCount,
  isLoading, error, refresh
}
```

### useProfileData.ts
```typescript
useProfileData() → {
  profile: ProfileData | null,
  isLoading, error, refresh
}
```

### useTrainingSession.ts
세션 오케스트레이션: 유저 인증 → 문제 fetch → 기존 세션 확인/생성 → INIT_SESSION dispatch.

### useAutosave.ts
디바운스 2초, 앱 백그라운드 시 즉시 flush. `isDirty` 플래그 기반.

---

## 화면에서 사용 패턴

```tsx
// 탭 화면
const { data, isLoading, refresh } = useXxxData();
useFocusEffect(useCallback(() => { refresh(); }, []));  // 탭 전환 시 새로고침

if (isLoading) return <ActivityIndicator />;
```

---

## 훅 작성 규칙
- `src/services/`를 통해서만 Supabase 접근
- `Promise.all`로 병렬 가능한 쿼리 묶기
- `refresh()` 함수 반드시 제공 (useFocusEffect용)
- 에러는 `error: string | null`로 노출, 화면에서 처리
