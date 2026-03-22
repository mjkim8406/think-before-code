# AGENT.md — src/components/

## 책임

재사용 가능한 UI 컴포넌트. 비즈니스 로직 없음. 순수 UI 렌더링.

---

## 디렉터리 구조

```
ui/           # 기본 원자 컴포넌트 — 앱 전체에서 사용
  Button.tsx
  Card.tsx
  Chip.tsx
  TextInput.tsx
  ProgressBar.tsx

home/         # 홈 화면 전용 컴포넌트
  ProblemCard.tsx
  StreakCard.tsx
  WeakConceptCard.tsx

analysis/     # 문제 해석 화면 전용 (비어있음)
solution/     # 풀이 흐름 화면 전용 (비어있음)
comparison/   # 해설 비교 화면 전용 (비어있음)
```

---

## UI 컴포넌트 계약

### Button
```tsx
<Button
  title="텍스트"
  onPress={fn}
  variant="primary" | "secondary" | "ghost"  // 기본: primary
  disabled={boolean}                          // 비활성 시 opacity 40%
  style={ViewStyle}                           // 추가 스타일
/>
```

### Card
```tsx
<Card style={ViewStyle}>
  {children}
</Card>
```
`padding: 24, borderRadius: 16, backgroundColor: COLORS.surface`가 기본.

### Chip
```tsx
<Chip
  label="텍스트"
  selected={boolean}     // 선택 시 primary 배경색
  onPress={fn}           // 없으면 비인터랙티브 표시용
/>
```

### TextInput
```tsx
<TextInput
  label="라벨 텍스트"          // 선택적
  placeholder="플레이스홀더"
  value={string}
  onChangeText={fn}
  multiline={boolean}           // 멀티라인 시 style에 minHeight 추가
  style={ViewStyle}
/>
```

### ProgressBar
```tsx
<ProgressBar current={2} total={4} />
// 단계 라벨은 내부 상수로 정의됨: ['문제 읽기', '문제 해석', '풀이 흐름', '해설 비교']
```

---

## 컴포넌트 작성 규칙

### DO
- 모든 색상/간격/폰트 크기는 `src/lib/constants.ts`에서 import
- `StyleSheet.create()`로 스타일 정의
- Props 타입 명시 (interface 사용)
- Named export (`export function ComponentName`)

### DON'T
- 인라인 스타일 작성 (`style={{ color: 'red' }}`)
- Supabase/router/store import — 컴포넌트는 순수해야 함
- useEffect/useState를 이용한 비즈니스 로직 처리

### 파일명
- PascalCase: `ProblemCard.tsx`
- 단일 컴포넌트 = 단일 파일 원칙

---

## 비어있는 디렉터리 채우는 방법

`analysis/`, `solution/`, `comparison/` 디렉터리는 현재 비어있다. 화면 내 복잡한 UI가 필요할 때 여기에 추가한다.

예시 — 개념 선택기가 복잡해지면:
```
analysis/
  ConceptSelector.tsx    # multi-select chip group
  ObservationInput.tsx   # 관찰 입력 + 힌트
```

기준: 화면 파일이 100줄 이상이 되거나, 동일 컴포넌트가 2개 이상의 화면에서 반복 사용될 때.
