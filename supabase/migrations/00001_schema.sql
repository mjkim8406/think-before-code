-- ============================================================
-- Think Before Code — Database Schema
-- 7단계 Training Flow 기반 알고리즘 사고력 훈련 앱
--
-- MVP: 익명 인증, 1일 1문제, 7단계 autosave
-- 확장: 소셜 로그인, 멀티 문제, 북마크, 커리큘럼, 프리미엄
-- ============================================================

create extension if not exists "uuid-ossp";

-- ─── ENUM ────────────────────────────────────────────────────

create type difficulty_level as enum ('easy', 'medium', 'hard');
create type session_status   as enum ('in_progress', 'completed', 'abandoned');


-- ═════════════════════════════════════════════════════════════
-- 1. PROBLEMS — 문제 데이터
-- ═════════════════════════════════════════════════════════════
-- training_flow 전체를 JSONB로 저장 (문제마다 질문 구성이 다름)
-- 검색/필터용 컬럼만 정규화하여 인덱싱

create table problems (
  id           text primary key,                    -- 'b001931-boj', 'lc-001' 등 사람이 읽기 쉬운 ID
  title        text not null,
  difficulty   difficulty_level not null default 'medium',
  domain       text not null,                       -- 'interval_scheduling', 'coin_greedy' 등
  summary      text not null,                       -- 문제 한 줄 요약
  tags         text[] not null default '{}',        -- ['greedy', 'sorting', 'interval']
  input_type   text not null,                       -- 'array', 'interval_list', 'string_expression'
  output_type  text not null,                       -- 'count', 'value', 'indices'
  constraints  jsonb not null default '{}',         -- 문제 제약조건 메타데이터

  -- 7단계 훈련 데이터
  training_flow       jsonb not null,               -- { reading, pattern_analysis, strategy_design, solution_flow, edge_cases, complexity }
  accepted_strategies jsonb not null default '[]',  -- AcceptedStrategy[]
  common_mistakes     jsonb not null default '[]',  -- CommonMistake[]
  review_notes        jsonb not null default '{}',  -- { core_takeaway, mentor_hint, pattern_trigger, why_it_works }

  -- 확장: 문제 원문 (현재는 nullable, 추후 in-app 문제 표시 시 사용)
  description  text,
  source_url   text,                                -- BOJ/LeetCode 원문 링크

  -- 확장: 문제 관계
  related_ids  text[] default '{}',                 -- 유사 문제 ID 목록
  prerequisite_ids text[] default '{}',             -- 선행 문제 ID 목록

  is_active    boolean not null default true,       -- 소프트 삭제 / 비활성화
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 검색/필터 인덱스
create index idx_problems_difficulty on problems (difficulty);
create index idx_problems_domain     on problems (domain);
create index idx_problems_tags       on problems using gin (tags);
create index idx_problems_active     on problems (is_active) where is_active = true;


-- ═════════════════════════════════════════════════════════════
-- 2. PROFILES — 유저 프로필
-- ═════════════════════════════════════════════════════════════
-- auth.users와 1:1. anonymous → 소셜 로그인 전환 시 데이터 보존.
-- MVP에서는 최소 필드만 사용, 확장 시 닉네임/아바타/설정 추가.

create table profiles (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  display_name  text,                               -- 확장: 닉네임
  avatar_url    text,                               -- 확장: 프로필 이미지
  daily_goal    smallint not null default 1,        -- MVP: 1 고정, 확장: 1/2/3/5
  timezone      text not null default 'Asia/Seoul', -- 스트릭 계산 기준
  is_premium    boolean not null default false,     -- 확장: 프리미엄 여부
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);


-- ═════════════════════════════════════════════════════════════
-- 3. TRAINING SESSIONS — 7단계 풀이 기록
-- ═════════════════════════════════════════════════════════════
-- 한 세션 = 한 유저가 한 문제를 한 번 푼 기록
-- autosave: current_step + step_answers 단계별 업데이트

create table training_sessions (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  problem_id     text not null references problems(id),

  -- 진행 상태
  current_step   smallint not null default 1,       -- 1~7 (현재 진행 중인 단계)
  status         session_status not null default 'in_progress',

  -- 단계별 유저 응답 (autosave 대상)
  -- { "reading": { "goal_type": "count", ... }, "pattern_analysis": {...}, ... }
  step_answers   jsonb not null default '{}',

  -- 단계별 점수 (0.0 / 0.5 / 1.0)
  -- { "reading": 1.0, "pattern_analysis": 0.5, ... }
  step_scores    jsonb not null default '{}',

  -- 트리거된 common_mistakes
  triggered_mistakes text[] not null default '{}',

  -- 최종 점수 (0~100, 세션 완료 시 계산)
  total_score    numeric(5,2),

  -- 타임스탬프
  started_at     timestamptz not null default now(),
  completed_at   timestamptz,
  last_saved_at  timestamptz not null default now(),

  created_at     timestamptz not null default now()
);

create index idx_sessions_user           on training_sessions (user_id, started_at desc);
create index idx_sessions_user_problem   on training_sessions (user_id, problem_id, started_at desc);
create index idx_sessions_in_progress    on training_sessions (user_id)
  where status = 'in_progress';


-- ═════════════════════════════════════════════════════════════
-- 4. DAILY ASSIGNMENTS — 오늘의 문제
-- ═════════════════════════════════════════════════════════════

create table daily_assignments (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  problem_id     text not null references problems(id),
  assigned_date  date not null default current_date,
  session_id     uuid references training_sessions(id),  -- 연결된 세션 (시작 전 null)

  unique (user_id, assigned_date)
);

create index idx_daily_user_date on daily_assignments (user_id, assigned_date desc);


-- ═════════════════════════════════════════════════════════════
-- 5. ACTIVITY LOG — 잔디 그리드
-- ═════════════════════════════════════════════════════════════
-- 날짜별 활동 요약. 트리거로 자동 upsert.

create table activity_log (
  user_id             uuid not null references auth.users(id) on delete cascade,
  active_date         date not null,
  sessions_completed  smallint not null default 0,
  best_score          numeric(5,2),

  primary key (user_id, active_date)
);

-- 잔디 그리드: 최근 N주 조회
create index idx_activity_date on activity_log (user_id, active_date desc);


-- ═════════════════════════════════════════════════════════════
-- 6. USER STEP STATS — 단계별 약점 추적
-- ═════════════════════════════════════════════════════════════
-- "패턴 분석은 잘 하는데 Edge Cases를 자주 놓침" 인사이트 제공

create table user_step_stats (
  user_id         uuid not null references auth.users(id) on delete cascade,
  step_name       text not null,                    -- 'reading', 'pattern_analysis', ...
  total_attempts  integer not null default 0,
  total_score     numeric(7,2) not null default 0,  -- 누적 점수 합 (평균 = total_score / total_attempts)
  perfect_count   integer not null default 0,       -- 1.0 횟수
  miss_count      integer not null default 0,       -- 0.0 횟수

  primary key (user_id, step_name)
);


-- ═════════════════════════════════════════════════════════════
-- 7. USER CONCEPT STATS — 패턴별 마스터리
-- ═════════════════════════════════════════════════════════════
-- "Greedy 평균 88%, DP 평균 65%" 표시용

create table user_concept_stats (
  user_id          uuid not null references auth.users(id) on delete cascade,
  concept_tag      text not null,                   -- 'greedy', 'dp', 'graph'
  problems_solved  integer not null default 0,
  total_score      numeric(7,2) not null default 0,
  last_solved_at   timestamptz,

  primary key (user_id, concept_tag)
);


-- ═════════════════════════════════════════════════════════════
-- 8. USER STREAKS — 연속 풀이
-- ═════════════════════════════════════════════════════════════

create table user_streaks (
  user_id           uuid primary key references auth.users(id) on delete cascade,
  current_streak    integer not null default 0,
  longest_streak    integer not null default 0,
  last_trained_date date
);


-- ═════════════════════════════════════════════════════════════
-- 9. BOOKMARKS — 확장: 문제 북마크
-- ═════════════════════════════════════════════════════════════

create table bookmarks (
  user_id     uuid not null references auth.users(id) on delete cascade,
  problem_id  text not null references problems(id),
  created_at  timestamptz not null default now(),

  primary key (user_id, problem_id)
);


-- ═════════════════════════════════════════════════════════════
-- RLS POLICIES
-- ═════════════════════════════════════════════════════════════

alter table problems           enable row level security;
alter table profiles           enable row level security;
alter table training_sessions  enable row level security;
alter table daily_assignments  enable row level security;
alter table activity_log       enable row level security;
alter table user_step_stats    enable row level security;
alter table user_concept_stats enable row level security;
alter table user_streaks       enable row level security;
alter table bookmarks          enable row level security;

-- problems: 누구나 읽기
create policy "problems_read" on problems
  for select to authenticated using (true);

-- profiles: 자기 것만 읽기/쓰기
create policy "profiles_own" on profiles
  for all to authenticated using (auth.uid() = user_id);

-- training_sessions: 자기 세션만
create policy "sessions_own" on training_sessions
  for all to authenticated using (auth.uid() = user_id);

-- daily_assignments: 자기 것만 읽기
create policy "daily_own" on daily_assignments
  for select to authenticated using (auth.uid() = user_id);

-- activity_log: 자기 것만
create policy "activity_own" on activity_log
  for all to authenticated using (auth.uid() = user_id);

-- user_step_stats: 자기 것만
create policy "step_stats_own" on user_step_stats
  for all to authenticated using (auth.uid() = user_id);

-- user_concept_stats: 자기 것만
create policy "concept_stats_own" on user_concept_stats
  for all to authenticated using (auth.uid() = user_id);

-- user_streaks: 자기 것만
create policy "streaks_own" on user_streaks
  for all to authenticated using (auth.uid() = user_id);

-- bookmarks: 자기 것만
create policy "bookmarks_own" on bookmarks
  for all to authenticated using (auth.uid() = user_id);


-- ═════════════════════════════════════════════════════════════
-- FUNCTIONS & TRIGGERS
-- ═════════════════════════════════════════════════════════════

-- ─── updated_at 자동 갱신 ────────────────────────────────────

create or replace function fn_set_updated_at()
returns trigger as $$
begin
  NEW.updated_at = now();
  return NEW;
end;
$$ language plpgsql;

create trigger trg_problems_updated before update on problems
  for each row execute function fn_set_updated_at();

create trigger trg_profiles_updated before update on profiles
  for each row execute function fn_set_updated_at();


-- ─── 신규 유저 → 자동 profile 생성 ──────────────────────────

create or replace function fn_create_profile()
returns trigger as $$
begin
  insert into profiles (user_id)
  values (NEW.id)
  on conflict do nothing;
  return NEW;
end;
$$ language plpgsql security definer;

create trigger trg_new_user_profile
  after insert on auth.users
  for each row execute function fn_create_profile();


-- ─── 세션 완료 트리거 ────────────────────────────────────────
-- status가 'completed'로 바뀔 때:
--   1) activity_log upsert
--   2) user_step_stats upsert (단계별)
--   3) user_concept_stats upsert (태그별)
--   4) user_streaks 업데이트

create or replace function fn_on_session_complete()
returns trigger as $$
declare
  v_step text;
  v_score numeric;
  v_tags text[];
  v_tz text;
  v_date date;
begin
  if NEW.status != 'completed' then return NEW; end if;
  if OLD.status = 'completed' then return NEW; end if;  -- 이미 완료된 건 무시

  -- 유저 타임존 가져오기 (없으면 KST)
  select coalesce(timezone, 'Asia/Seoul') into v_tz
  from profiles where user_id = NEW.user_id;

  v_date := (coalesce(NEW.completed_at, now()) at time zone coalesce(v_tz, 'Asia/Seoul'))::date;

  -- 1) activity_log
  insert into activity_log (user_id, active_date, sessions_completed, best_score)
  values (NEW.user_id, v_date, 1, NEW.total_score)
  on conflict (user_id, active_date) do update set
    sessions_completed = activity_log.sessions_completed + 1,
    best_score = greatest(activity_log.best_score, excluded.best_score);

  -- 2) user_step_stats
  for v_step, v_score in
    select key, (value::text)::numeric from jsonb_each(NEW.step_scores)
  loop
    insert into user_step_stats (user_id, step_name, total_attempts, total_score, perfect_count, miss_count)
    values (
      NEW.user_id, v_step, 1, v_score,
      case when v_score >= 1.0 then 1 else 0 end,
      case when v_score <= 0.0 then 1 else 0 end
    )
    on conflict (user_id, step_name) do update set
      total_attempts = user_step_stats.total_attempts + 1,
      total_score    = user_step_stats.total_score + excluded.total_score,
      perfect_count  = user_step_stats.perfect_count + excluded.perfect_count,
      miss_count     = user_step_stats.miss_count + excluded.miss_count;
  end loop;

  -- 3) user_concept_stats
  select tags into v_tags from problems where id = NEW.problem_id;
  if v_tags is not null and array_length(v_tags, 1) > 0 then
    for i in 1..array_length(v_tags, 1) loop
      insert into user_concept_stats (user_id, concept_tag, problems_solved, total_score, last_solved_at)
      values (NEW.user_id, v_tags[i], 1, coalesce(NEW.total_score, 0), now())
      on conflict (user_id, concept_tag) do update set
        problems_solved = user_concept_stats.problems_solved + 1,
        total_score     = user_concept_stats.total_score + excluded.total_score,
        last_solved_at  = now();
    end loop;
  end if;

  -- 4) user_streaks
  insert into user_streaks (user_id, current_streak, longest_streak, last_trained_date)
  values (NEW.user_id, 1, 1, v_date)
  on conflict (user_id) do update set
    current_streak = case
      when user_streaks.last_trained_date = v_date then user_streaks.current_streak
      when user_streaks.last_trained_date = v_date - 1 then user_streaks.current_streak + 1
      else 1
    end,
    longest_streak = greatest(
      user_streaks.longest_streak,
      case
        when user_streaks.last_trained_date = v_date then user_streaks.current_streak
        when user_streaks.last_trained_date = v_date - 1 then user_streaks.current_streak + 1
        else 1
      end
    ),
    last_trained_date = v_date;

  return NEW;
end;
$$ language plpgsql security definer;

create trigger trg_session_complete
  after update on training_sessions
  for each row execute function fn_on_session_complete();


-- ─── 오늘의 문제 배정 함수 ──────────────────────────────────
-- 안 푼 문제 중 랜덤 1개 배정. 다 풀었으면 null 반환.
-- 클라이언트에서 RPC로 호출: supabase.rpc('assign_daily_problem')

create or replace function assign_daily_problem()
returns text as $$
declare
  v_user_id uuid := auth.uid();
  v_today date := (now() at time zone (
    select coalesce(timezone, 'Asia/Seoul') from profiles where user_id = v_user_id
  ))::date;
  v_problem_id text;
  v_existing text;
begin
  -- 이미 오늘 배정된 게 있으면 그거 반환
  select problem_id into v_existing
  from daily_assignments
  where user_id = v_user_id and assigned_date = v_today;

  if v_existing is not null then
    return v_existing;
  end if;

  -- 완료한 적 없는 문제 중 랜덤 1개
  select p.id into v_problem_id
  from problems p
  where p.is_active = true
    and p.id not in (
      select ts.problem_id from training_sessions ts
      where ts.user_id = v_user_id and ts.status = 'completed'
    )
  order by random()
  limit 1;

  -- 다 풀었으면 null
  if v_problem_id is null then
    return null;
  end if;

  -- 배정
  insert into daily_assignments (user_id, problem_id, assigned_date)
  values (v_user_id, v_problem_id, v_today);

  return v_problem_id;
end;
$$ language plpgsql security definer;
