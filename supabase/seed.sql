-- Seed data: sample problems for local development
-- Production seeding uses: npm run seed
-- This file runs on `npx supabase db reset`

insert into problems (id, title, difficulty, domain, summary, tags, input_type, output_type, constraints, training_flow, accepted_strategies, common_mistakes, review_notes)
values (
  'b001931-boj',
  '회의실 배정',
  'easy',
  'interval_scheduling',
  '겹치지 않는 회의를 최대한 많이 선택하는 활동 선택 문제',
  ARRAY['greedy', 'sorting', 'interval', 'activity-selection'],
  'interval_list',
  'count',
  '{"non_overlapping_required": true, "simultaneous_end_start_allowed": true, "input_size_hint": "N <= 100000"}'::jsonb,
  '{
    "reading": {
      "goal_type": {"type": "single_select", "question": "이 문제에서 구해야 하는 것은 무엇인가?", "options": ["count", "minimum_cost", "indices", "boolean_existence", "maximum_sum"], "accepted_answers": ["count"]},
      "input_summary": {"type": "multi_select", "question": "입력의 성격은 무엇인가?", "options": ["interval_pairs", "sorted_data", "graph_like_relation", "single_array", "can_overlap"], "accepted_answers": ["interval_pairs", "can_overlap"]},
      "one_line_summary": {"type": "tag_select", "question": "이 문제를 한 문장으로 요약하면?", "accepted_answers": ["max_non_overlapping_intervals", "activity_selection_problem"]}
    },
    "pattern_analysis": {
      "primary_pattern": {"type": "single_select", "question": "가장 적절한 핵심 패턴은?", "options": ["brute_force", "greedy_interval", "dp_interval", "two_pointers"], "accepted_answers": ["greedy_interval"]},
      "reason_tags": {"type": "multi_select", "question": "그렇게 판단한 이유는?", "options": ["need_maximize_count", "locally_optimal_gives_global_optimal", "overlapping_subproblems"], "accepted_answers": ["need_maximize_count", "locally_optimal_gives_global_optimal"]},
      "secondary_patterns": {"type": "multi_select", "question": "보조 패턴은?", "options": ["sorting_preprocessing", "single_pass", "counting"], "accepted_answers": ["sorting_preprocessing", "single_pass"]}
    },
    "strategy_design": {
      "data_structures": {"type": "multi_select", "question": "자료구조는?", "options": ["array", "set", "map", "priority_queue"], "accepted_answers": ["array"]},
      "approach_tags": {"type": "multi_select", "question": "접근 방식은?", "options": ["sort_by_end_time", "sort_by_start_time", "iterate_and_select", "track_last_end_time"], "accepted_answers": ["sort_by_end_time", "iterate_and_select", "track_last_end_time"]}
    },
    "solution_flow": {
      "type": "ordered_steps",
      "question": "올바른 절차를 순서대로 배치하세요.",
      "steps_catalog": [
        {"id": "sort_by_end", "label": "끝나는 시간 기준 오름차순 정렬"},
        {"id": "init_count", "label": "count = 0, last_end = 0 초기화"},
        {"id": "iterate", "label": "모든 회의를 순회"},
        {"id": "check_start", "label": "시작 시간 >= last_end 확인"},
        {"id": "select", "label": "회의 선택, count++, last_end 갱신"},
        {"id": "return", "label": "count 반환"}
      ],
      "correct_order": ["sort_by_end", "init_count", "iterate", "check_start", "select", "return"]
    },
    "edge_cases": {
      "type": "multi_select",
      "question": "예외/주의 사항은?",
      "options": ["same_end_time_sort_by_start", "start_equals_end_zero_length", "start_equals_prev_end_allowed", "integer_overflow_large_time", "empty_input", "single_meeting"],
      "required_answers": ["start_equals_prev_end_allowed", "start_equals_end_zero_length"],
      "recommended_answers": ["same_end_time_sort_by_start", "integer_overflow_large_time"],
      "optional_answers": ["single_meeting", "empty_input"]
    },
    "complexity": {
      "time": {"type": "single_select", "question": "시간복잡도는?", "options": ["O(N)", "O(NlogN)", "O(N^2)", "O(2^N)"], "accepted_answers": ["O(NlogN)"]},
      "space": {"type": "single_select", "question": "공간복잡도는?", "options": ["O(1)", "O(N)", "O(N^2)"], "accepted_answers": ["O(1)"]},
      "reason_tags": {"type": "multi_select", "question": "이유는?", "options": ["sorting_dominates", "single_pass_after_sort", "only_track_last_end_variable"], "accepted_answers": ["sorting_dominates", "single_pass_after_sort", "only_track_last_end_variable"]}
    }
  }'::jsonb,
  '[{"strategy_id": "greedy_end_time", "label": "끝나는 시간 기준 그리디", "pattern_analysis_answer": "greedy_interval", "required_strategy_tags": ["sort_by_end_time", "iterate_and_select", "track_last_end_time"]}]'::jsonb,
  '[{"tag": "sort_by_start", "conditions": [{"step": "strategy_design", "field": "sorting_rule", "operator": "equals", "value": "sort_by_start_time"}], "feedback": "시작 시간 기준 정렬은 긴 회의가 먼저 선택되어 최적이 아닙니다."}]'::jsonb,
  '{"core_takeaway": "끝나는 시간이 빠른 순으로 정렬 후 탐욕 선택", "mentor_hint": "끝나는 시간이 같을 때 시작 시간으로 2차 정렬", "pattern_trigger": "겹치지 않는 구간을 최대한 많이 선택", "why_it_works": "끝나는 시간이 가장 빠른 회의를 선택하면 남은 시간이 최대가 된다"}'::jsonb
),
(
  'b011047-boj',
  '동전 0',
  'easy',
  'coin_greedy',
  '배수 관계 동전으로 금액을 만드는 최소 동전 수 문제',
  ARRAY['greedy', 'math', 'coin-change'],
  'array_and_target',
  'count',
  '{"coins_are_multiples": true, "unlimited_coins": true, "input_size_hint": "N <= 10, K <= 100000000"}'::jsonb,
  '{
    "reading": {
      "goal_type": {"type": "single_select", "question": "구해야 하는 것은?", "options": ["count", "minimum_cost", "boolean_existence"], "accepted_answers": ["count"]},
      "input_summary": {"type": "multi_select", "question": "입력 성격은?", "options": ["coin_denominations", "coins_are_multiples_of_previous", "target_value_given", "sorted_ascending"], "accepted_answers": ["coin_denominations", "coins_are_multiples_of_previous", "target_value_given", "sorted_ascending"]},
      "one_line_summary": {"type": "tag_select", "question": "한 문장 요약?", "accepted_answers": ["minimum_coins_for_target_with_multiples"]}
    },
    "pattern_analysis": {
      "primary_pattern": {"type": "single_select", "question": "핵심 패턴은?", "options": ["brute_force", "greedy_largest_first", "dp_coin_change"], "accepted_answers": ["greedy_largest_first"]},
      "reason_tags": {"type": "multi_select", "question": "이유는?", "options": ["coins_divisibility_guarantees_greedy", "largest_coin_always_optimal", "need_dp_for_general_coins"], "accepted_answers": ["coins_divisibility_guarantees_greedy", "largest_coin_always_optimal"]},
      "secondary_patterns": {"type": "multi_select", "question": "보조 패턴은?", "options": ["division_and_modulo", "reverse_iteration"], "accepted_answers": ["division_and_modulo", "reverse_iteration"]}
    },
    "strategy_design": {
      "data_structures": {"type": "multi_select", "question": "자료구조는?", "options": ["array", "dp_array"], "accepted_answers": ["array"]},
      "approach_tags": {"type": "multi_select", "question": "접근 방식은?", "options": ["iterate_coins_largest_first", "use_division_for_count", "update_remainder_with_modulo", "dp_bottom_up"], "accepted_answers": ["iterate_coins_largest_first", "use_division_for_count", "update_remainder_with_modulo"]}
    },
    "solution_flow": {
      "type": "ordered_steps",
      "question": "올바른 절차를 순서대로 배치하세요.",
      "steps_catalog": [
        {"id": "read_input", "label": "동전 종류와 목표 금액 입력"},
        {"id": "iterate_desc", "label": "큰 동전부터 역순 순회"},
        {"id": "check_le", "label": "현재 동전이 남은 금액 이하인지 확인"},
        {"id": "div_count", "label": "남은 금액 / 동전 = 사용 개수 누적"},
        {"id": "mod_remainder", "label": "남은 금액을 나머지(%)로 갱신"},
        {"id": "output", "label": "총 동전 수 출력"}
      ],
      "correct_order": ["read_input", "iterate_desc", "check_le", "div_count", "mod_remainder", "output"]
    },
    "edge_cases": {
      "type": "multi_select",
      "question": "예외/주의 사항은?",
      "options": ["greedy_only_valid_with_multiples", "coin_larger_than_K_skip", "K_equals_zero", "single_coin_type", "general_coins_need_dp"],
      "required_answers": ["greedy_only_valid_with_multiples"],
      "recommended_answers": ["coin_larger_than_K_skip", "general_coins_need_dp"],
      "optional_answers": ["single_coin_type", "K_equals_zero"]
    },
    "complexity": {
      "time": {"type": "single_select", "question": "시간복잡도는?", "options": ["O(1)", "O(N)", "O(NlogN)"], "accepted_answers": ["O(N)"]},
      "space": {"type": "single_select", "question": "공간복잡도는?", "options": ["O(1)", "O(N)"], "accepted_answers": ["O(1)"]},
      "reason_tags": {"type": "multi_select", "question": "이유는?", "options": ["single_pass_through_coins", "only_count_and_remainder_variables", "no_extra_storage_needed"], "accepted_answers": ["single_pass_through_coins", "only_count_and_remainder_variables", "no_extra_storage_needed"]}
    }
  }'::jsonb,
  '[{"strategy_id": "greedy_largest_first", "label": "큰 동전부터 그리디", "pattern_analysis_answer": "greedy_largest_first", "required_strategy_tags": ["iterate_coins_largest_first", "use_division_for_count", "update_remainder_with_modulo"]}]'::jsonb,
  '[{"tag": "dp_overkill", "conditions": [{"step": "pattern_analysis", "field": "primary_pattern", "operator": "equals", "value": "dp_coin_change"}], "feedback": "동전이 배수 관계이므로 DP가 필요 없습니다. 그리디로 O(N)에 해결 가능합니다."}]'::jsonb,
  '{"core_takeaway": "동전이 배수 관계일 때는 그리디가 최적", "mentor_hint": "배수 조건이 없으면 DP 필요", "pattern_trigger": "배수 관계 동전 + 최소 개수", "why_it_works": "배수 관계에서 작은 동전 여러 개는 항상 큰 동전 하나로 대체 가능"}'::jsonb
)
on conflict (id) do update set
  training_flow = excluded.training_flow,
  accepted_strategies = excluded.accepted_strategies,
  common_mistakes = excluded.common_mistakes,
  review_notes = excluded.review_notes,
  updated_at = now();
