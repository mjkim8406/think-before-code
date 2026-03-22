# AGENT.md — supabase/

## 책임

데이터베이스 스키마 정의 및 시드 데이터.

---

## 스키마 (00001_schema.sql)

```
problems                       문제 데이터 (7단계 training_flow 포함)
  id text PK                     'b001931-boj' 형식
  title, difficulty, domain, summary
  tags text[] (GIN)
  input_type, output_type, constraints jsonb
  training_flow jsonb            7단계 전체
  accepted_strategies jsonb
  common_mistakes jsonb
  review_notes jsonb
  description text (nullable)    확장: 문제 원문
  source_url text (nullable)     확장: BOJ/LC 링크
  related_ids text[]             확장: 유사 문제
  prerequisite_ids text[]        확장: 선행 문제
  is_active boolean

profiles                       유저 프로필 (auth.users 1:1)
  user_id uuid PK
  display_name, avatar_url       확장: 닉네임/아바타
  daily_goal smallint (기본 1)   확장: 1/2/3/5
  timezone text (기본 KST)
  is_premium boolean             확장: 프리미엄

training_sessions              7단계 풀이 기록
  user_id, problem_id
  current_step (1~7)             autosave 지점
  status (in_progress/completed/abandoned)
  step_answers jsonb             단계별 유저 응답
  step_scores jsonb              단계별 점수
  triggered_mistakes text[]
  total_score numeric(5,2)

daily_assignments              오늘의 문제
  user_id, problem_id, assigned_date, session_id

activity_log                   잔디 그리드
  (user_id, active_date) PK
  sessions_completed, best_score

user_step_stats                단계별 약점
  (user_id, step_name) PK
  total_attempts, total_score, perfect_count, miss_count

user_concept_stats             패턴별 마스터리
  (user_id, concept_tag) PK
  problems_solved, total_score, last_solved_at

user_streaks                   연속 풀이
  user_id PK
  current_streak, longest_streak, last_trained_date

bookmarks                      문제 북마크
  (user_id, problem_id) PK
```

---

## 트리거

| 트리거 | 실행 조건 | 동작 |
|--------|----------|------|
| `trg_new_user_profile` | auth.users INSERT | profiles 자동 생성 |
| `trg_session_complete` | training_sessions.status → completed | activity_log + step_stats + concept_stats + streaks 일괄 업데이트 |
| `trg_problems_updated` | problems UPDATE | updated_at 갱신 |
| `trg_profiles_updated` | profiles UPDATE | updated_at 갱신 |

## RPC 함수

| 함수 | 설명 |
|------|------|
| `assign_daily_problem()` | 오늘의 문제 배정 (안 푼 것 중 랜덤, 이미 있으면 기존 반환) |

---

## 시딩

```bash
npm run seed              # problems 테이블에 upsert
npm run seed:validate     # 검증만 (DB 변경 없음)
npm run seed:dry          # dry-run
npm run seed -- --category greedy  # 특정 카테고리만
```

### 데이터 파일 구조

```
scripts/
  seed.ts               시딩 스크립트 (검증 + 배치 upsert)
  data/
    types.ts            ProblemV2 인터페이스
    v2/
      index.ts          통합 배럴 (중복 ID 자동 검증)
      greedy.ts
      dp.ts
      (추후 추가...)
```

---

## CLI 명령

```bash
npx supabase start                    # 로컬 DB
npx supabase db push                  # 마이그레이션 적용
npx supabase db reset                 # 리셋 (마이그레이션 + seed.sql)
npx supabase gen types typescript --local > src/lib/database.types.ts
```
