-- Fix assign_daily_problem RPC: handle missing profile row gracefully
-- When profile doesn't exist (e.g. new anonymous user), timezone subquery
-- returned no rows → v_today became NULL → insert failed with NOT NULL violation.

create or replace function assign_daily_problem()
returns text as $$
declare
  v_user_id uuid := auth.uid();
  v_tz text;
  v_today date;
  v_problem_id text;
  v_existing text;
begin
  -- timezone 안전하게 조회 (프로필 없으면 기본값)
  select coalesce(p.timezone, 'Asia/Seoul')
    into v_tz
    from profiles p
    where p.user_id = v_user_id;

  if v_tz is null then
    v_tz := 'Asia/Seoul';
  end if;

  v_today := (now() at time zone v_tz)::date;

  -- 프로필 없으면 자동 생성
  insert into profiles (user_id)
  values (v_user_id)
  on conflict do nothing;

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
