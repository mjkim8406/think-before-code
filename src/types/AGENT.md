# AGENT.md — src/types/

## 책임

앱 전체의 **TypeScript 타입 계약**. 이 파일의 타입들이 DB 스키마, 화면 Props, 서비스 인터페이스의 공통 언어다.

---

## 타입 계층

```
DB 테이블 (supabase/migrations/*.sql)
    ↕ 미러링
src/types/index.ts (TypeScript 인터페이스)
    ↕ 참조
src/services/*.ts       ← DB 읽기/쓰기
src/hooks/*.ts          ← 데이터 페치
src/stores/*.ts         ← 인메모리 상태
app/**/*.tsx            ← 화면 렌더링
```

---

## 주요 타입

### DB 모델 (Supabase 테이블 반영)

```typescript
Problem              // problems 테이블
DailyAssignment      // daily_assignments 테이블
TrainingSession      // problem_training_sessions 테이블
UserWeakConcept      // user_weak_concepts 테이블
UserStreak           // user_streaks 테이블
LiveCodingFlow       // problems.live_coding_flow JSONB
```

### 런타임 상태 (인메모리)

```typescript
TrainingState        // 진행 중인 세션 (Supabase에 없음)
INITIAL_TRAINING_STATE  // 초기값 상수
```

### 공용 타입

```typescript
Difficulty = 'easy' | 'medium' | 'hard'
```

---

## 네이밍 컨벤션

| 대상 | 규칙 | 예시 |
|------|------|------|
| DB 레코드 | PascalCase | `Problem`, `TrainingSession` |
| 런타임 상태 | PascalCase + "State" | `TrainingState` |
| 유니온 타입 | PascalCase | `Difficulty` |
| JSONB 필드 | 구조 인터페이스 | `LiveCodingFlow` |
| 상수 초기값 | UPPER_SNAKE_CASE | `INITIAL_TRAINING_STATE` |

---

## DB ↔ 타입 매핑 규칙

Supabase DB는 `snake_case`를 사용하고, TypeScript는 `camelCase`를 사용한다.

```sql
-- DB
concept_matched boolean
last_missed_at timestamptz
```

```typescript
// TypeScript
conceptMatched: boolean | null
lastMissedAt: string
```

**자동 변환**: `supabase-js`는 기본적으로 자동 변환하지 않는다. 서비스 레이어에서 수동으로 변환하거나 `supabase gen types`로 생성된 타입 사용.

---

## Supabase 타입 생성

```bash
npx supabase gen types typescript --local > src/lib/database.types.ts
```

생성 후 `src/types/index.ts`와 병행 사용:
- `database.types.ts`: DB 정확한 스키마 (자동 생성, 수정 금지)
- `types/index.ts`: 앱 레이어에서 사용하는 변환된 타입 (수동 유지)

---

## 타입 수정 시 체크리스트

1. DB 스키마가 변경되었나? → `supabase/migrations/` 업데이트
2. 새 필드가 `TrainingState`에 영향을 주나? → `stores/trainingStore.tsx` 액션 타입 추가
3. 화면에서 새 타입을 사용하나? → `src/lib/sampleData.ts` 샘플 데이터 업데이트
4. `INITIAL_TRAINING_STATE`에 기본값 추가 필요한가?
