import type { ProblemV2 } from '../types';

/**
 * Course-mode Greedy 문제 — 레벨별 대표 문제 (original, non-BOJ)
 *
 * beginner  → 동전 거스름돈, 사탕 나누기
 * basic     → 회의실 배정, 점프 게임
 * intermediate → 작업 스케줄링, 구간 합치기
 * advanced  → 주유소 순환, 문자열 최소 제거
 */

type CourseProblem = ProblemV2 & { course_level: 'beginner' | 'basic' | 'intermediate' | 'advanced' };

export const COURSE_GREEDY: CourseProblem[] = [
  // ══════════════════════════════════════════════════════════
  //  BEGINNER
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────
  // 동전 거스름돈
  // ──────────────────────────────────────────────────────
  {
    id: 'course-greedy-001',
    title: '동전 거스름돈',
    difficulty: 'easy',
    course_level: 'beginner',
    domain: 'coin_change_greedy',
    summary: '500원, 100원, 50원, 10원 동전으로 거스름돈을 만들 때 최소 동전 수를 구하는 문제',
    tags: ['greedy'],
    input_type: 'integer',
    output_type: 'count',
    constraints: {
      coin_denominations_fixed: true,
      amount_multiple_of_10: true,
      input_size_hint: '10 <= N <= 100000, N은 10의 배수',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_count', 'maximum_sum', 'boolean_existence', 'all_combinations', 'indices'],
          accepted_answers: ['minimum_count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_integer',
            'fixed_coin_denominations',
            'sorted_data',
            'array_of_pairs',
            'graph_like_relation',
          ],
          accepted_answers: ['single_integer', 'fixed_coin_denominations'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimum_coins_for_change',
            'greedy_coin_change_with_fixed_denominations',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: [
            'greedy_largest_first',
            'dp_knapsack',
            'brute_force',
            'bfs',
            'binary_search',
            'dfs',
          ],
          accepted_answers: ['greedy_largest_first'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'larger_coin_always_better',
            'coin_denominations_are_multiples',
            'overlapping_subproblems',
            'need_shortest_path',
            'need_all_combinations',
            'locally_optimal_gives_global_optimal',
          ],
          accepted_answers: ['larger_coin_always_better', 'coin_denominations_are_multiples', 'locally_optimal_gives_global_optimal'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: [
            'simple_iteration',
            'sorting_preprocessing',
            'divide_and_conquer',
            'dp_optimization',
            'graph_traversal',
          ],
          accepted_answers: ['simple_iteration'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'map', 'stack', 'queue', 'priority_queue', 'dp_array'],
          accepted_answers: ['array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'iterate_coins_largest_first',
            'use_division_and_modulo',
            'dp_bottom_up',
            'bfs_level_by_level',
            'try_all_combinations',
            'accumulate_count',
          ],
          accepted_answers: ['iterate_coins_largest_first', 'use_division_and_modulo', 'accumulate_count'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'define_coins', label: '동전 배열을 [500, 100, 50, 10] 순으로 정의' },
          { id: 'init_count', label: 'count = 0 초기화' },
          { id: 'iterate_coins', label: '동전 배열을 큰 것부터 순회' },
          { id: 'divide_amount', label: '현재 금액 ÷ 동전 값 = 사용할 동전 수' },
          { id: 'add_to_count', label: 'count에 해당 동전 수를 더함' },
          { id: 'update_remainder', label: '금액을 나머지(mod)로 갱신' },
          { id: 'return_count', label: 'count 출력' },
        ],
        correct_order: [
          'define_coins',
          'init_count',
          'iterate_coins',
          'divide_amount',
          'add_to_count',
          'update_remainder',
          'return_count',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'amount_is_zero',
          'amount_exactly_one_coin',
          'large_amount_performance',
          'non_multiple_of_10_input',
          'coin_order_matters',
          'integer_overflow',
        ],
        required_answers: ['amount_is_zero', 'coin_order_matters'],
        recommended_answers: ['amount_exactly_one_coin'],
        optional_answers: ['large_amount_performance', 'non_multiple_of_10_input', 'integer_overflow'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(NlogN)', 'O(K) (K=동전 종류 수)'],
          accepted_answers: ['O(K) (K=동전 종류 수)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(K)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'fixed_number_of_coins',
            'single_pass_over_coins',
            'only_count_variable_needed',
            'store_all_results',
            'recursive_calls',
          ],
          accepted_answers: ['fixed_number_of_coins', 'single_pass_over_coins', 'only_count_variable_needed'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_largest_first',
        label: '큰 동전부터 최대한 사용하는 그리디',
        pattern_analysis_answer: 'greedy_largest_first',
        required_strategy_tags: ['iterate_coins_largest_first', 'use_division_and_modulo', 'accumulate_count'],
      },
    ],

    common_mistakes: [
      {
        tag: 'dp_overkill',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dp_knapsack' },
        ],
        feedback:
          '일반적인 동전 문제는 DP가 필요하지만, 이 문제의 동전(500, 100, 50, 10)은 모두 배수 관계입니다. 배수 관계일 때는 큰 동전을 우선 사용하는 그리디가 항상 최적입니다. DP는 불필요한 복잡성을 더합니다.',
      },
      {
        tag: 'smallest_coin_first',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'iterate_coins_largest_first' },
        ],
        feedback:
          '작은 동전부터 사용하면 동전 수가 불필요하게 늘어납니다. 예: 1000원을 10원짜리 100개로 만드는 것보다 500원 2개가 최적입니다. 그리디의 핵심은 "가장 큰 단위부터 최대한 사용"하는 것입니다.',
      },
      {
        tag: 'miss_modulo_update',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'use_division_and_modulo' },
        ],
        feedback:
          '나눗셈과 나머지 연산을 함께 사용해야 합니다. 나눗셈으로 동전 수를 구하고, 나머지로 남은 금액을 갱신하는 것이 핵심입니다.',
      },
    ],

    review_notes: {
      core_takeaway: '동전 단위가 배수 관계일 때는 큰 동전부터 사용하는 그리디가 최적이다.',
      mentor_hint: '동전이 배수 관계가 아닌 경우(예: 1, 3, 4원)에는 그리디가 실패하고 DP가 필요하다. 면접에서 "왜 그리디가 되는가?"를 설명할 수 있어야 한다.',
      pattern_trigger: '"최소 개수로 합을 구성" + "단위가 배수 관계" → 큰 것부터 그리디',
      why_it_works: '500은 100의 배수, 100은 50의 배수, 50은 10의 배수이므로 큰 동전을 작은 동전으로 교체하면 항상 더 많은 동전이 필요하다. 따라서 큰 것을 우선 사용하는 것이 최적이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // 사탕 나누기
  // ──────────────────────────────────────────────────────
  {
    id: 'course-greedy-002',
    title: '사탕 나누기',
    difficulty: 'easy',
    course_level: 'beginner',
    domain: 'candy_distribution',
    summary: '일렬로 선 아이들에게 rating에 따라 최소한의 사탕을 배분하는 문제. 이웃보다 rating이 높으면 더 많은 사탕을 받아야 한다.',
    tags: ['greedy', 'array'],
    input_type: 'integer_array',
    output_type: 'count',
    constraints: {
      each_child_at_least_one: true,
      higher_rating_gets_more_than_neighbor: true,
      input_size_hint: '1 <= N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_total', 'maximum_total', 'count', 'boolean_existence', 'assignment_array'],
          accepted_answers: ['minimum_total'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_array_of_ratings',
            'neighbor_comparison_required',
            'sorted_data',
            'graph_like_relation',
            'interval_pairs',
          ],
          accepted_answers: ['single_array_of_ratings', 'neighbor_comparison_required'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimize_total_candy_with_neighbor_constraint',
            'assign_minimum_values_satisfying_relative_order',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: [
            'greedy_two_pass',
            'dp_1d',
            'brute_force',
            'sorting_and_assign',
            'graph_topological_sort',
            'binary_search',
          ],
          accepted_answers: ['greedy_two_pass'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'left_neighbor_and_right_neighbor_constraints',
            'single_direction_pass_insufficient',
            'locally_optimal_gives_global_optimal',
            'overlapping_subproblems',
            'need_shortest_path',
            'need_topological_ordering',
          ],
          accepted_answers: ['left_neighbor_and_right_neighbor_constraints', 'single_direction_pass_insufficient', 'locally_optimal_gives_global_optimal'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: [
            'two_direction_sweep',
            'prefix_max',
            'sorting_preprocessing',
            'single_pass',
            'graph_traversal',
          ],
          accepted_answers: ['two_direction_sweep'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'map', 'stack', 'queue', 'priority_queue', 'dp_array'],
          accepted_answers: ['array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'left_to_right_pass',
            'right_to_left_pass',
            'take_max_of_both_passes',
            'sort_by_rating',
            'dp_with_memoization',
            'assign_1_then_increment',
          ],
          accepted_answers: ['left_to_right_pass', 'right_to_left_pass', 'take_max_of_both_passes', 'assign_1_then_increment'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_candy_array', label: '모든 아이에게 사탕 1개씩 배정한 배열 초기화' },
          { id: 'left_pass', label: '왼쪽→오른쪽 순회: rating[i] > rating[i-1]이면 candy[i] = candy[i-1] + 1' },
          { id: 'right_pass', label: '오른쪽→왼쪽 순회: rating[i] > rating[i+1]이면 candy[i] = max(candy[i], candy[i+1] + 1)' },
          { id: 'sum_candies', label: 'candy 배열의 합을 구해서 출력' },
          { id: 'sort_by_rating', label: 'rating 기준으로 정렬 (오답 단계 — 함정)' },
          { id: 'assign_from_smallest', label: '가장 작은 rating부터 사탕 배정 (오답 단계 — 함정)' },
        ],
        correct_order: [
          'init_candy_array',
          'left_pass',
          'right_pass',
          'sum_candies',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'all_same_rating',
          'strictly_increasing_sequence',
          'strictly_decreasing_sequence',
          'single_child',
          'adjacent_equal_ratings',
          'peak_and_valley_pattern',
        ],
        required_answers: ['all_same_rating', 'adjacent_equal_ratings', 'peak_and_valley_pattern'],
        recommended_answers: ['strictly_decreasing_sequence'],
        optional_answers: ['single_child', 'strictly_increasing_sequence'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(2^N)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'two_linear_passes',
            'candy_array_same_size_as_input',
            'no_sorting_needed',
            'sorting_dominates',
            'recursive_calls',
          ],
          accepted_answers: ['two_linear_passes', 'candy_array_same_size_as_input', 'no_sorting_needed'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_two_pass',
        label: '좌→우, 우→좌 두 번 순회 그리디',
        pattern_analysis_answer: 'greedy_two_pass',
        required_strategy_tags: ['left_to_right_pass', 'right_to_left_pass', 'take_max_of_both_passes'],
      },
    ],

    common_mistakes: [
      {
        tag: 'single_pass_only',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'right_to_left_pass' },
        ],
        feedback:
          '한 방향만 순회하면 반대쪽 이웃 조건을 놓칩니다. 예: [1, 3, 2]에서 왼→오만 하면 [1, 2, 1]이 되어 맞지만, [1, 2, 3, 1]에서 왼→오만 하면 [1, 2, 3, 1]이고 이는 맞습니다. 하지만 [3, 2, 1]에서 왼→오만 하면 [1, 1, 1]이 되어 조건 위반입니다.',
      },
      {
        tag: 'miss_equal_rating_case',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'adjacent_equal_ratings' },
        ],
        feedback:
          'rating이 같은 이웃끼리는 사탕 수가 같을 필요가 없습니다. "높으면 더 많이"이지 "같으면 같게"가 아닙니다. [1, 2, 2]의 답은 [1, 2, 1] = 4개입니다.',
      },
      {
        tag: 'forget_max_in_right_pass',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'take_max_of_both_passes' },
        ],
        feedback:
          '오른쪽→왼쪽 순회에서 기존 값과 max를 취해야 합니다. 단순 덮어쓰기를 하면 왼쪽 조건이 깨집니다. 예: [1, 3, 5, 2]에서 오른쪽 패스가 왼쪽 패스 결과를 덮어쓰면 안 됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: '양방향 이웃 조건이 있으면 왼→오, 오→왼 두 번 순회 후 max를 취하는 그리디가 핵심이다.',
      mentor_hint: '"같은 rating = 같은 사탕"이 아님에 주의. 문제 조건을 정확히 읽어야 한다.',
      pattern_trigger: '"이웃과 비교하여 상대적 크기 조건"이 양방향으로 있으면 → 두 번 순회 그리디를 떠올려라.',
      why_it_works: '왼→오 패스는 왼쪽 이웃 조건만, 오→왼 패스는 오른쪽 이웃 조건만 만족시킨다. max를 취하면 양쪽 조건을 동시에 만족하면서 최소값을 보장한다.',
    },
  },

  // ══════════════════════════════════════════════════════════
  //  BASIC
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────
  // 회의실 배정
  // ──────────────────────────────────────────────────────
  {
    id: 'course-greedy-003',
    title: '회의실 배정',
    difficulty: 'medium',
    course_level: 'basic',
    domain: 'activity_selection',
    summary: '여러 회의의 시작/종료 시간이 주어질 때, 겹치지 않게 최대한 많은 회의를 선택하는 활동 선택 문제',
    tags: ['greedy', 'sorting', 'interval'],
    input_type: 'interval_list',
    output_type: 'count',
    constraints: {
      non_overlapping_required: true,
      simultaneous_end_start_allowed: true,
      input_size_hint: '1 <= N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['maximum_count', 'minimum_cost', 'indices', 'boolean_existence', 'maximum_sum'],
          accepted_answers: ['maximum_count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'interval_pairs',
            'can_overlap',
            'sorted_data',
            'single_array',
            'graph_like_relation',
          ],
          accepted_answers: ['interval_pairs', 'can_overlap'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'max_non_overlapping_intervals',
            'activity_selection_problem',
            'maximum_meetings_without_conflict',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: [
            'brute_force',
            'greedy_interval',
            'dp_interval',
            'two_pointers',
            'binary_search',
            'dfs',
          ],
          accepted_answers: ['greedy_interval'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'need_maximize_count',
            'locally_optimal_gives_global_optimal',
            'overlapping_subproblems',
            'need_shortest_path',
            'equal_weight_intervals',
            'need_ordering',
          ],
          accepted_answers: ['need_maximize_count', 'locally_optimal_gives_global_optimal', 'equal_weight_intervals'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: [
            'sorting_preprocessing',
            'single_pass',
            'counting',
            'dp_optimization',
            'graph_traversal',
          ],
          accepted_answers: ['sorting_preprocessing', 'single_pass'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'set', 'map', 'stack', 'queue', 'priority_queue', 'dp_array'],
          accepted_answers: ['array'],
        },
        sorting_rule: {
          type: 'single_select',
          question: '정렬 기준은 무엇인가?',
          options: [
            'sort_by_end_time_asc',
            'sort_by_start_time_asc',
            'sort_by_duration_asc',
            'sort_by_start_time_desc',
            'no_sorting_needed',
          ],
          accepted_answers: ['sort_by_end_time_asc'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_by_end_time',
            'sort_by_start_time',
            'sort_by_duration',
            'iterate_and_select',
            'track_last_end_time',
            'dp_with_binary_search',
          ],
          accepted_answers: ['sort_by_end_time', 'iterate_and_select', 'track_last_end_time'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'sort_end_asc', label: '끝나는 시간 기준 오름차순 정렬 (같으면 시작 시간 오름차순)' },
          { id: 'init_vars', label: 'count = 0, lastEnd = 0 초기화' },
          { id: 'iterate', label: '모든 회의를 순회' },
          { id: 'check_condition', label: '현재 회의의 시작 시간 >= lastEnd인지 확인' },
          { id: 'select_and_update', label: '조건 만족 시 count++ 하고 lastEnd를 현재 회의 끝 시간으로 갱신' },
          { id: 'output', label: 'count 출력' },
          { id: 'sort_start_asc', label: '시작 시간 기준 정렬 (오답 단계 — 함정)' },
        ],
        correct_order: [
          'sort_end_asc',
          'init_vars',
          'iterate',
          'check_condition',
          'select_and_update',
          'output',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'same_end_time_multiple_meetings',
          'zero_length_meeting_start_eq_end',
          'start_equals_prev_end_allowed',
          'all_meetings_overlap',
          'single_meeting',
          'very_large_time_values',
        ],
        required_answers: ['same_end_time_multiple_meetings', 'zero_length_meeting_start_eq_end', 'start_equals_prev_end_allowed'],
        recommended_answers: ['all_meetings_overlap'],
        optional_answers: ['single_meeting', 'very_large_time_values'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(2^N)'],
          accepted_answers: ['O(NlogN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'sorting_dominates',
            'single_pass_after_sort',
            'only_track_last_end_variable',
            'store_all_intervals',
            'recursive_calls',
          ],
          accepted_answers: ['sorting_dominates', 'single_pass_after_sort', 'only_track_last_end_variable'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_end_time',
        label: '끝나는 시간 기준 그리디',
        pattern_analysis_answer: 'greedy_interval',
        required_strategy_tags: ['sort_by_end_time', 'iterate_and_select', 'track_last_end_time'],
      },
    ],

    common_mistakes: [
      {
        tag: 'sort_by_start',
        conditions: [
          { step: 'strategy_design', field: 'sorting_rule', operator: 'equals', value: 'sort_by_start_time_asc' },
        ],
        feedback:
          '시작 시간 기준 정렬은 (1, 100)처럼 긴 회의가 먼저 선택되어 최적이 아닙니다. 끝나는 시간이 빠른 회의를 선택해야 남은 시간이 최대화됩니다.',
      },
      {
        tag: 'sort_by_duration',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'sort_by_duration' },
        ],
        feedback:
          '짧은 회의가 항상 최적은 아닙니다. (1,5), (2,3), (4,8)에서 짧은 (2,3)을 선택하면 (1,5)와 겹쳐 (4,8)만 추가 가능(2개). 끝나는 시간 기준이면 (2,3)→(4,8)=2개로 같지만, 다른 케이스에서 차이가 납니다.',
      },
      {
        tag: 'dp_overkill',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dp_interval' },
        ],
        feedback:
          '모든 회의의 가치가 동일(1)할 때는 그리디로 충분합니다. 가중 구간 스케줄링(가치가 다른 경우)에서만 DP가 필요합니다.',
      },
      {
        tag: 'miss_zero_length',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'zero_length_meeting_start_eq_end' },
        ],
        feedback:
          '시작 시간 = 끝나는 시간인 길이 0 회의를 놓치기 쉽습니다. 2차 정렬을 하지 않으면 이런 회의를 선택하지 못할 수 있습니다.',
      },
    ],

    review_notes: {
      core_takeaway: '활동 선택 문제에서는 끝나는 시간 기준으로 정렬 후 탐욕 선택하면 최대 개수를 보장한다.',
      mentor_hint: '면접에서 "왜 끝나는 시간 기준인가?"라는 질문에 Exchange Argument를 설명할 수 있어야 한다.',
      pattern_trigger: '"겹치지 않는 구간을 최대한 많이 선택" → 끝나는 시간 기준 그리디',
      why_it_works: '가장 빨리 끝나는 활동을 선택하면 남은 시간이 최대화되어, 이후 선택 가능한 활동 수가 줄어들지 않는다. Exchange Argument: 최적해에서 아무 활동을 "가장 빨리 끝나는 활동"으로 교체해도 해가 나빠지지 않는다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // 점프 게임
  // ──────────────────────────────────────────────────────
  {
    id: 'course-greedy-004',
    title: '점프 게임',
    difficulty: 'medium',
    course_level: 'basic',
    domain: 'jump_game',
    summary: '배열의 각 위치에서 최대 점프 거리가 주어질 때, 첫 위치에서 마지막 위치까지 도달 가능한지 판별하는 문제',
    tags: ['greedy', 'array'],
    input_type: 'integer_array',
    output_type: 'boolean',
    constraints: {
      non_negative_values: true,
      start_at_index_0: true,
      input_size_hint: '1 <= N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['boolean_reachability', 'minimum_jumps', 'count', 'maximum_sum', 'path'],
          accepted_answers: ['boolean_reachability'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_array',
            'each_element_is_max_jump_distance',
            'interval_pairs',
            'graph_like_relation',
            'sorted_data',
          ],
          accepted_answers: ['single_array', 'each_element_is_max_jump_distance'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'can_reach_last_index_from_first',
            'greedy_reachability_check',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: [
            'greedy_max_reach',
            'bfs_shortest_path',
            'dp_1d',
            'brute_force_dfs',
            'binary_search',
            'two_pointers',
          ],
          accepted_answers: ['greedy_max_reach'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'only_need_reachability_not_path',
            'max_reach_monotonically_trackable',
            'locally_optimal_gives_global_optimal',
            'overlapping_subproblems',
            'need_shortest_path',
            'need_all_paths',
          ],
          accepted_answers: ['only_need_reachability_not_path', 'max_reach_monotonically_trackable', 'locally_optimal_gives_global_optimal'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: [
            'single_pass',
            'tracking_running_maximum',
            'sorting_preprocessing',
            'dp_optimization',
            'graph_traversal',
          ],
          accepted_answers: ['single_pass', 'tracking_running_maximum'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'stack', 'queue', 'set', 'priority_queue', 'dp_array'],
          accepted_answers: ['array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'track_max_reachable_index',
            'update_max_reach_at_each_step',
            'stop_if_current_exceeds_max_reach',
            'bfs_from_index_0',
            'dp_reachable_array',
            'iterate_left_to_right',
          ],
          accepted_answers: ['track_max_reachable_index', 'update_max_reach_at_each_step', 'stop_if_current_exceeds_max_reach', 'iterate_left_to_right'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_max_reach', label: 'maxReach = 0 초기화' },
          { id: 'iterate_array', label: '배열을 인덱스 0부터 순회' },
          { id: 'check_reachable', label: '현재 인덱스 > maxReach이면 도달 불가 → false 반환' },
          { id: 'update_max_reach', label: 'maxReach = max(maxReach, i + nums[i])로 갱신' },
          { id: 'check_done', label: 'maxReach >= 마지막 인덱스이면 true 반환 (조기 종료 가능)' },
          { id: 'return_result', label: '순회 완료 후 maxReach >= 마지막 인덱스 여부 반환' },
          { id: 'sort_array', label: '배열 정렬 (오답 단계 — 함정)' },
        ],
        correct_order: [
          'init_max_reach',
          'iterate_array',
          'check_reachable',
          'update_max_reach',
          'check_done',
          'return_result',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'single_element_array',
          'first_element_is_zero',
          'all_zeros_except_first',
          'zero_in_the_middle_blocking',
          'very_large_jump_values',
          'already_at_destination',
        ],
        required_answers: ['single_element_array', 'first_element_is_zero', 'zero_in_the_middle_blocking'],
        recommended_answers: ['all_zeros_except_first'],
        optional_answers: ['very_large_jump_values', 'already_at_destination'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(2^N)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'single_pass_linear',
            'only_track_max_reach_variable',
            'no_extra_array_needed',
            'sorting_dominates',
            'store_all_states',
          ],
          accepted_answers: ['single_pass_linear', 'only_track_max_reach_variable', 'no_extra_array_needed'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_max_reach',
        label: '최대 도달 가능 인덱스 추적 그리디',
        pattern_analysis_answer: 'greedy_max_reach',
        required_strategy_tags: ['track_max_reachable_index', 'update_max_reach_at_each_step', 'iterate_left_to_right'],
      },
    ],

    common_mistakes: [
      {
        tag: 'bfs_approach',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'bfs_shortest_path' },
        ],
        feedback:
          'BFS는 최소 점프 횟수를 구할 때 유용하지만, 단순 도달 가능 여부만 판별하는 이 문제에서는 O(N) 그리디가 훨씬 효율적입니다. maxReach 하나만 추적하면 됩니다.',
      },
      {
        tag: 'dp_overkill',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dp_1d' },
        ],
        feedback:
          'DP로 각 위치의 도달 가능 여부를 저장하면 O(N^2)이 됩니다. 도달 가능 여부만 필요할 때는 maxReach 변수 하나로 O(N)에 해결 가능합니다.',
      },
      {
        tag: 'miss_zero_blocking',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'zero_in_the_middle_blocking' },
        ],
        feedback:
          '중간에 0이 있으면 해당 위치에서 더 진행이 불가합니다. 하지만 이전 위치에서 0을 뛰어넘을 수 있다면 문제없습니다. [3, 0, 0, 1]은 도달 가능하지만 [1, 0, 2]는 불가합니다.',
      },
      {
        tag: 'forget_early_termination_check',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'stop_if_current_exceeds_max_reach' },
        ],
        feedback:
          '현재 인덱스가 maxReach를 초과하면 즉시 false를 반환해야 합니다. 이 체크 없이 순회하면 도달 불가능한 위치의 값을 사용하게 되어 잘못된 결과가 나옵니다.',
      },
    ],

    review_notes: {
      core_takeaway: '도달 가능 여부는 maxReach 변수 하나만 추적하는 그리디로 O(N)에 판별 가능하다.',
      mentor_hint: '이 문제의 변형인 "최소 점프 횟수"에서는 BFS나 별도 그리디가 필요하다. 도달 여부와 최소 횟수를 구분하라.',
      pattern_trigger: '"각 위치에서 최대 이동 가능" + "끝까지 도달 가능?" → maxReach 그리디',
      why_it_works: '각 위치에서 도달 가능한 최대 인덱스를 갱신하면, 도달 가능한 모든 위치를 빠짐없이 커버한다. 도달 불가능한 위치는 maxReach보다 뒤에 있으므로 자동으로 걸러진다.',
    },
  },

  // ══════════════════════════════════════════════════════════
  //  INTERMEDIATE
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────
  // 작업 스케줄링
  // ──────────────────────────────────────────────────────
  {
    id: 'course-greedy-005',
    title: '작업 스케줄링',
    difficulty: 'medium',
    course_level: 'intermediate',
    domain: 'job_scheduling',
    summary: '각 작업에 마감일과 이익이 주어질 때, 마감일 내에 완료하여 최대 이익을 얻도록 작업을 선택하는 문제. 하루에 작업 하나만 가능.',
    tags: ['greedy', 'sorting', 'heap'],
    input_type: 'job_list',
    output_type: 'maximum_profit',
    constraints: {
      one_job_per_day: true,
      deadline_1_based: true,
      input_size_hint: '1 <= N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['maximum_profit', 'minimum_cost', 'count', 'boolean_existence', 'schedule_order'],
          accepted_answers: ['maximum_profit'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'jobs_with_deadline_and_profit',
            'one_unit_time_per_job',
            'interval_pairs',
            'single_array',
            'graph_like_relation',
          ],
          accepted_answers: ['jobs_with_deadline_and_profit', 'one_unit_time_per_job'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'maximize_profit_by_scheduling_within_deadlines',
            'deadline_scheduling_with_profit_maximization',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: [
            'greedy_sort_by_profit',
            'dp_knapsack',
            'brute_force',
            'greedy_sort_by_deadline',
            'binary_search',
            'graph_topological_sort',
          ],
          accepted_answers: ['greedy_sort_by_profit'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'higher_profit_should_be_prioritized',
            'latest_available_slot_preserves_flexibility',
            'locally_optimal_gives_global_optimal',
            'overlapping_subproblems',
            'need_shortest_path',
            'need_all_combinations',
          ],
          accepted_answers: ['higher_profit_should_be_prioritized', 'latest_available_slot_preserves_flexibility', 'locally_optimal_gives_global_optimal'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: [
            'sorting_preprocessing',
            'slot_assignment',
            'union_find_optimization',
            'dp_optimization',
            'graph_traversal',
          ],
          accepted_answers: ['sorting_preprocessing', 'slot_assignment'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'boolean_slot_array', 'priority_queue', 'union_find', 'map', 'stack'],
          accepted_answers: ['array', 'boolean_slot_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_by_profit_desc',
            'sort_by_deadline_asc',
            'assign_latest_available_slot',
            'use_min_heap_for_profit',
            'try_all_permutations',
            'accumulate_profit',
          ],
          accepted_answers: ['sort_by_profit_desc', 'assign_latest_available_slot', 'accumulate_profit'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'sort_profit_desc', label: '작업을 이익 기준 내림차순 정렬' },
          { id: 'init_slot_array', label: '마감일 최댓값 크기의 슬롯 배열(빈 칸) 초기화' },
          { id: 'iterate_jobs', label: '정렬된 작업을 순회' },
          { id: 'find_latest_slot', label: '현재 작업의 마감일부터 역방향으로 빈 슬롯 탐색' },
          { id: 'assign_job', label: '빈 슬롯을 찾으면 작업 배정하고 이익 누적' },
          { id: 'return_profit', label: '총 이익 출력' },
          { id: 'sort_deadline_asc', label: '마감일 기준 오름차순 정렬 (오답 단계 — 함정)' },
        ],
        correct_order: [
          'sort_profit_desc',
          'init_slot_array',
          'iterate_jobs',
          'find_latest_slot',
          'assign_job',
          'return_profit',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'multiple_jobs_same_deadline',
          'deadline_larger_than_n',
          'all_deadlines_are_1',
          'single_job',
          'profit_is_zero',
          'no_available_slot_for_job',
        ],
        required_answers: ['multiple_jobs_same_deadline', 'all_deadlines_are_1', 'no_available_slot_for_job'],
        recommended_answers: ['deadline_larger_than_n'],
        optional_answers: ['single_job', 'profit_is_zero'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는? (기본 슬롯 배열 방식)',
          options: ['O(N)', 'O(NlogN)', 'O(N*D) (D=최대 마감일)', 'O(N^2)'],
          accepted_answers: ['O(N*D) (D=최대 마감일)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(D) (D=최대 마감일)', 'O(N^2)'],
          accepted_answers: ['O(D) (D=최대 마감일)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'sorting_NlogN_plus_slot_search',
            'slot_array_size_depends_on_max_deadline',
            'each_job_searches_up_to_D_slots',
            'union_find_can_optimize_to_NlogN',
            'only_track_single_variable',
          ],
          accepted_answers: ['sorting_NlogN_plus_slot_search', 'slot_array_size_depends_on_max_deadline', 'each_job_searches_up_to_D_slots'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_profit_slot',
        label: '이익 내림차순 정렬 + 최대한 늦은 슬롯 배정',
        pattern_analysis_answer: 'greedy_sort_by_profit',
        required_strategy_tags: ['sort_by_profit_desc', 'assign_latest_available_slot', 'accumulate_profit'],
      },
    ],

    common_mistakes: [
      {
        tag: 'sort_by_deadline',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'sort_by_deadline_asc' },
        ],
        feedback:
          '마감일 기준 정렬은 이익이 낮은 작업이 먼저 배정될 수 있습니다. 이익이 높은 작업을 우선 배정해야 최대 이익을 보장합니다. 마감일은 슬롯 탐색 범위로만 사용합니다.',
      },
      {
        tag: 'assign_earliest_slot',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'assign_latest_available_slot' },
        ],
        feedback:
          '가장 빠른 빈 슬롯에 배정하면 나중에 마감일이 빠른 고이익 작업이 들어올 슬롯이 없어집니다. 마감일 직전의 가장 늦은 빈 슬롯에 배정해야 유연성이 유지됩니다.',
      },
      {
        tag: 'miss_all_same_deadline',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'all_deadlines_are_1' },
        ],
        feedback:
          '모든 마감일이 1이면 슬롯이 1개뿐이므로 이익이 가장 큰 작업 하나만 선택 가능합니다. 이 경우를 놓치면 여러 작업을 잘못 배정할 수 있습니다.',
      },
    ],

    review_notes: {
      core_takeaway: '이익이 큰 작업부터 가능한 가장 늦은 슬롯에 배정하면 최대 이익을 보장한다.',
      mentor_hint: 'Union-Find를 사용하면 슬롯 탐색을 거의 O(1)로 최적화할 수 있다. 면접에서 후속 질문으로 자주 나온다.',
      pattern_trigger: '"마감일이 있고 각 작업에 이익이 다르며 하루에 하나만 가능" → 이익 기준 내림차순 그리디',
      why_it_works: '이익이 큰 작업을 먼저 배정하되, 가능한 늦은 슬롯을 쓰면 빠른 슬롯이 보존되어 마감일이 이른 작업에 기회를 준다. 이것이 Exchange Argument의 핵심이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // 구간 합치기
  // ──────────────────────────────────────────────────────
  {
    id: 'course-greedy-006',
    title: '구간 합치기',
    difficulty: 'medium',
    course_level: 'intermediate',
    domain: 'merge_intervals',
    summary: '겹치는 구간들을 합쳐서 겹치지 않는 최소 구간 수로 만드는 문제',
    tags: ['greedy', 'sorting', 'interval'],
    input_type: 'interval_list',
    output_type: 'interval_list',
    constraints: {
      intervals_can_overlap: true,
      adjacent_intervals_merge: true,
      input_size_hint: '1 <= N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['merged_interval_list', 'count', 'boolean_existence', 'maximum_sum', 'indices'],
          accepted_answers: ['merged_interval_list'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'interval_pairs',
            'can_overlap',
            'unsorted_input',
            'single_array',
            'graph_like_relation',
          ],
          accepted_answers: ['interval_pairs', 'can_overlap', 'unsorted_input'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'merge_overlapping_intervals',
            'combine_overlapping_ranges_into_disjoint_set',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: [
            'greedy_interval_merge',
            'sweep_line',
            'dp_interval',
            'brute_force',
            'union_find',
            'two_pointers',
          ],
          accepted_answers: ['greedy_interval_merge'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'sorted_order_enables_single_pass_merge',
            'locally_optimal_gives_global_optimal',
            'overlapping_subproblems',
            'need_connected_components',
            'need_shortest_path',
            'adjacent_comparison_sufficient',
          ],
          accepted_answers: ['sorted_order_enables_single_pass_merge', 'locally_optimal_gives_global_optimal', 'adjacent_comparison_sufficient'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: [
            'sorting_preprocessing',
            'single_pass',
            'stack_based',
            'dp_optimization',
            'graph_traversal',
          ],
          accepted_answers: ['sorting_preprocessing', 'single_pass'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'stack', 'map', 'priority_queue', 'linked_list', 'dp_array'],
          accepted_answers: ['array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_by_start_time',
            'sort_by_end_time',
            'compare_with_last_merged',
            'extend_end_if_overlap',
            'start_new_if_no_overlap',
            'use_sweep_line_events',
          ],
          accepted_answers: ['sort_by_start_time', 'compare_with_last_merged', 'extend_end_if_overlap', 'start_new_if_no_overlap'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'sort_by_start', label: '시작 시간 기준 오름차순 정렬' },
          { id: 'init_result', label: '결과 배열에 첫 구간 추가' },
          { id: 'iterate_intervals', label: '두 번째 구간부터 순회' },
          { id: 'check_overlap', label: '현재 구간의 시작 <= 결과의 마지막 구간 끝인지 확인' },
          { id: 'merge_extend', label: '겹치면 결과의 마지막 구간 끝을 max(기존 끝, 현재 끝)으로 갱신' },
          { id: 'new_interval', label: '겹치지 않으면 현재 구간을 결과에 새로 추가' },
          { id: 'return_result', label: '결과 배열 출력' },
        ],
        correct_order: [
          'sort_by_start',
          'init_result',
          'iterate_intervals',
          'check_overlap',
          'merge_extend',
          'new_interval',
          'return_result',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'completely_contained_interval',
          'adjacent_intervals_touching',
          'all_intervals_disjoint',
          'all_intervals_same',
          'single_interval',
          'negative_coordinates',
        ],
        required_answers: ['completely_contained_interval', 'adjacent_intervals_touching'],
        recommended_answers: ['all_intervals_disjoint', 'all_intervals_same'],
        optional_answers: ['single_interval', 'negative_coordinates'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(NlogN + N)'],
          accepted_answers: ['O(NlogN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'sorting_dominates',
            'single_pass_after_sort',
            'result_array_up_to_N',
            'no_extra_space_beyond_result',
            'recursive_calls',
          ],
          accepted_answers: ['sorting_dominates', 'single_pass_after_sort', 'result_array_up_to_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'sort_and_merge',
        label: '시작 시간 정렬 후 순차 병합',
        pattern_analysis_answer: 'greedy_interval_merge',
        required_strategy_tags: ['sort_by_start_time', 'compare_with_last_merged', 'extend_end_if_overlap'],
      },
    ],

    common_mistakes: [
      {
        tag: 'sort_by_end',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'sort_by_end_time' },
        ],
        feedback:
          '구간 합치기에서는 시작 시간 기준 정렬이 맞습니다. 끝나는 시간 기준 정렬은 활동 선택(최대 개수 선택)에 적합합니다. 시작 시간으로 정렬해야 "다음 구간이 현재와 겹치는지"를 올바르게 판단할 수 있습니다.',
      },
      {
        tag: 'miss_contained_interval',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'completely_contained_interval' },
        ],
        feedback:
          '[1, 10]과 [3, 5]처럼 하나가 다른 하나를 완전히 포함하는 경우, 끝을 max로 갱신해야 합니다. 단순히 현재 구간의 끝으로 덮어쓰면 더 넓은 구간이 줄어듭니다.',
      },
      {
        tag: 'forget_max_end_update',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'extend_end_if_overlap' },
        ],
        feedback:
          '병합 시 끝 시간을 max(기존 끝, 현재 끝)으로 갱신해야 합니다. 현재 끝으로 단순 교체하면 기존 구간이 더 길 때 잘못된 결과가 나옵니다.',
      },
    ],

    review_notes: {
      core_takeaway: '시작 시간으로 정렬 후, 겹치면 끝을 max로 갱신하고, 안 겹치면 새 구간을 시작한다.',
      mentor_hint: '활동 선택은 "끝나는 시간" 정렬, 구간 합치기는 "시작 시간" 정렬 — 이 차이를 면접에서 명확히 설명할 수 있어야 한다.',
      pattern_trigger: '"겹치는 구간을 합치기" + "정렬되지 않은 구간 리스트" → 시작 시간 정렬 + 순차 병합',
      why_it_works: '시작 시간 정렬 후 순회하면, 현재 구간은 이전까지의 병합 결과와만 비교하면 된다. 시작이 정렬되어 있으므로 이후 구간은 더 뒤에서 시작하거나 겹칠 수밖에 없다.',
    },
  },

  // ══════════════════════════════════════════════════════════
  //  ADVANCED
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────
  // 주유소 순환
  // ──────────────────────────────────────────────────────
  {
    id: 'course-greedy-007',
    title: '주유소 순환',
    difficulty: 'hard',
    course_level: 'advanced',
    domain: 'gas_station_circuit',
    summary: '원형 경로에 N개의 주유소가 있고, 각 주유소의 연료량과 다음 주유소까지 비용이 주어질 때, 한 바퀴를 완주할 수 있는 출발 주유소를 찾는 문제',
    tags: ['greedy', 'array'],
    input_type: 'two_arrays',
    output_type: 'index',
    constraints: {
      circular_route: true,
      unique_solution_guaranteed: true,
      input_size_hint: '1 <= N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['start_index', 'boolean_existence', 'minimum_cost', 'count', 'maximum_sum'],
          accepted_answers: ['start_index'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'two_parallel_arrays',
            'circular_structure',
            'fuel_and_cost_at_each_station',
            'single_array',
            'graph_like_relation',
          ],
          accepted_answers: ['two_parallel_arrays', 'circular_structure', 'fuel_and_cost_at_each_station'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_start_station_for_circular_completion',
            'circular_gas_station_feasibility',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: [
            'greedy_reset_start',
            'brute_force_all_starts',
            'dp_circular',
            'prefix_sum',
            'binary_search',
            'two_pointers',
          ],
          accepted_answers: ['greedy_reset_start'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'failed_segment_eliminates_all_starts_in_it',
            'total_fuel_ge_total_cost_guarantees_solution',
            'locally_optimal_gives_global_optimal',
            'overlapping_subproblems',
            'need_shortest_path',
            'circular_to_linear_reduction',
          ],
          accepted_answers: ['failed_segment_eliminates_all_starts_in_it', 'total_fuel_ge_total_cost_guarantees_solution', 'locally_optimal_gives_global_optimal'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: [
            'single_pass',
            'running_sum_tracking',
            'sorting_preprocessing',
            'sliding_window',
            'graph_traversal',
          ],
          accepted_answers: ['single_pass', 'running_sum_tracking'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'stack', 'queue', 'map', 'priority_queue', 'dp_array'],
          accepted_answers: ['array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'track_current_tank',
            'track_total_surplus',
            'reset_start_when_tank_negative',
            'simulate_all_starts',
            'prefix_sum_min_index',
            'check_total_feasibility_first',
          ],
          accepted_answers: ['track_current_tank', 'track_total_surplus', 'reset_start_when_tank_negative', 'check_total_feasibility_first'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_vars', label: 'totalSurplus = 0, currentTank = 0, startStation = 0 초기화' },
          { id: 'iterate_stations', label: '모든 주유소를 0부터 N-1까지 순회' },
          { id: 'compute_diff', label: 'diff = gas[i] - cost[i] 계산' },
          { id: 'update_totals', label: 'totalSurplus += diff, currentTank += diff' },
          { id: 'check_tank', label: 'currentTank < 0이면 startStation = i+1, currentTank = 0으로 리셋' },
          { id: 'check_feasibility', label: '순회 후 totalSurplus >= 0이면 startStation 반환, 아니면 -1' },
          { id: 'double_array', label: '배열을 두 배로 복제 (오답 단계 — 함정)' },
        ],
        correct_order: [
          'init_vars',
          'iterate_stations',
          'compute_diff',
          'update_totals',
          'check_tank',
          'check_feasibility',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'total_fuel_less_than_total_cost',
          'answer_is_last_station',
          'all_stations_have_surplus',
          'single_station',
          'multiple_resets_during_traversal',
          'start_reset_to_index_n',
        ],
        required_answers: ['total_fuel_less_than_total_cost', 'answer_is_last_station', 'multiple_resets_during_traversal'],
        recommended_answers: ['start_reset_to_index_n'],
        optional_answers: ['single_station', 'all_stations_have_surplus'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(2N)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'single_pass_over_array',
            'only_three_variables_needed',
            'no_sorting_needed',
            'no_extra_array_needed',
            'sorting_dominates',
          ],
          accepted_answers: ['single_pass_over_array', 'only_three_variables_needed', 'no_sorting_needed', 'no_extra_array_needed'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_reset_start',
        label: '누적합 리셋 그리디',
        pattern_analysis_answer: 'greedy_reset_start',
        required_strategy_tags: ['track_current_tank', 'track_total_surplus', 'reset_start_when_tank_negative'],
      },
    ],

    common_mistakes: [
      {
        tag: 'brute_force_all_starts',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force_all_starts' },
        ],
        feedback:
          '모든 출발점에서 시뮬레이션하면 O(N^2)입니다. 핵심 관찰: A에서 출발해 B에서 실패하면, A~B 사이의 어떤 지점에서 출발해도 B를 지날 수 없습니다. 따라서 B+1부터 새로 시도하면 됩니다.',
      },
      {
        tag: 'miss_total_check',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'check_total_feasibility_first' },
        ],
        feedback:
          'totalSurplus < 0이면 어디서 출발해도 완주 불가능합니다. 이 전역 체크를 빠뜨리면 잘못된 출발점을 반환할 수 있습니다. 전역 연료 합 >= 전역 비용 합이 해 존재의 필요충분조건입니다.',
      },
      {
        tag: 'miss_reset_edge',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'answer_is_last_station' },
        ],
        feedback:
          '마지막 주유소가 답인 경우를 놓치기 쉽습니다. 리셋이 N-1에서 일어나면 startStation = N이 되어 범위를 벗어날 수 있습니다. 하지만 totalSurplus >= 0이면 그 리셋 후의 start가 답입니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'A에서 B까지 실패하면 그 구간 내 어디서 시작해도 실패하므로, B+1부터 리셋하면 O(N)에 해결된다.',
      mentor_hint: '"왜 A~B 구간을 건너뛸 수 있는가?"를 증명할 수 있어야 한다. A에서의 누적합이 가장 유리한데도 실패했으므로, A 이후 어느 지점은 더 불리하다.',
      pattern_trigger: '"원형 순환 + 각 위치의 이득/손실" → 누적합 리셋 그리디',
      why_it_works: 'A에서 시작한 누적합은 A~B 구간의 모든 중간 지점보다 항상 크거나 같다. A에서도 B를 넘지 못했으면 중간 시작점은 더욱 불가능하다. 따라서 B+1로 건너뛰는 것이 안전하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // 문자열 최소 제거
  // ──────────────────────────────────────────────────────
  {
    id: 'course-greedy-008',
    title: '문자열 최소 제거',
    difficulty: 'hard',
    course_level: 'advanced',
    domain: 'smallest_string_after_removal',
    summary: '문자열에서 K개의 문자를 제거하여 사전순으로 가장 작은 문자열을 만드는 문제',
    tags: ['greedy', 'stack', 'string'],
    input_type: 'string_and_integer',
    output_type: 'string',
    constraints: {
      remove_exactly_k: true,
      lowercase_letters_only: true,
      input_size_hint: '1 <= |S| <= 100000, 0 <= K < |S|',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: [
            'lexicographically_smallest_string',
            'minimum_removals',
            'count',
            'boolean_existence',
            'longest_subsequence',
          ],
          accepted_answers: ['lexicographically_smallest_string'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_string',
            'removal_count_k',
            'order_must_be_preserved',
            'array_of_integers',
            'graph_like_relation',
          ],
          accepted_answers: ['single_string', 'removal_count_k', 'order_must_be_preserved'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'remove_k_chars_for_lexicographically_smallest',
            'greedy_stack_based_character_removal',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: [
            'greedy_stack',
            'dp_subsequence',
            'brute_force_combinations',
            'two_pointers',
            'binary_search',
            'sliding_window',
          ],
          accepted_answers: ['greedy_stack'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'earlier_position_has_higher_priority',
            'remove_larger_char_when_followed_by_smaller',
            'locally_optimal_gives_global_optimal',
            'overlapping_subproblems',
            'need_all_combinations',
            'monotone_stack_pattern',
          ],
          accepted_answers: ['earlier_position_has_higher_priority', 'remove_larger_char_when_followed_by_smaller', 'locally_optimal_gives_global_optimal', 'monotone_stack_pattern'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: [
            'monotone_stack',
            'single_pass',
            'sorting_preprocessing',
            'dp_optimization',
            'sliding_window',
          ],
          accepted_answers: ['monotone_stack', 'single_pass'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['stack', 'array', 'queue', 'map', 'priority_queue', 'dp_array'],
          accepted_answers: ['stack'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'use_stack_as_result_builder',
            'pop_when_top_greater_and_k_remaining',
            'push_current_char',
            'trim_remaining_k_from_end',
            'sort_and_pick',
            'dp_with_position_and_remaining',
          ],
          accepted_answers: ['use_stack_as_result_builder', 'pop_when_top_greater_and_k_remaining', 'push_current_char', 'trim_remaining_k_from_end'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_stack', label: '빈 스택 초기화, 남은 제거 횟수 remaining = K' },
          { id: 'iterate_chars', label: '문자열을 왼쪽부터 순회' },
          { id: 'pop_loop', label: 'remaining > 0 && 스택 비어있지 않음 && 스택 top > 현재 문자이면 pop, remaining--' },
          { id: 'push_char', label: '현재 문자를 스택에 push' },
          { id: 'trim_end', label: '순회 후 remaining > 0이면 스택 뒤에서 remaining개 제거' },
          { id: 'build_result', label: '스택의 내용을 문자열로 변환하여 출력' },
          { id: 'sort_chars', label: '문자를 정렬하여 선택 (오답 단계 — 함정)' },
        ],
        correct_order: [
          'init_stack',
          'iterate_chars',
          'pop_loop',
          'push_char',
          'trim_end',
          'build_result',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'k_equals_zero',
          'k_equals_string_length_minus_one',
          'already_sorted_string',
          'all_same_characters',
          'remaining_k_after_full_pass',
          'leading_characters_matter_most',
        ],
        required_answers: ['remaining_k_after_full_pass', 'already_sorted_string', 'leading_characters_matter_most'],
        recommended_answers: ['k_equals_zero', 'all_same_characters'],
        optional_answers: ['k_equals_string_length_minus_one'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N*K)', 'O(2^N)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(N*K)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_char_pushed_and_popped_at_most_once',
            'stack_stores_result_string',
            'amortized_linear',
            'sorting_dominates',
            'recursive_calls',
          ],
          accepted_answers: ['each_char_pushed_and_popped_at_most_once', 'stack_stores_result_string', 'amortized_linear'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_monotone_stack',
        label: '단조 스택 기반 그리디 제거',
        pattern_analysis_answer: 'greedy_stack',
        required_strategy_tags: ['use_stack_as_result_builder', 'pop_when_top_greater_and_k_remaining', 'push_current_char'],
      },
    ],

    common_mistakes: [
      {
        tag: 'dp_approach',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dp_subsequence' },
        ],
        feedback:
          'DP로 풀면 O(N*K)으로 K가 클 때 TLE가 납니다. 스택 그리디는 O(N)입니다. 핵심 관찰: "더 큰 문자 뒤에 더 작은 문자가 오면, 큰 문자를 제거하는 것이 항상 이득"이라는 탐욕 성질이 성립합니다.',
      },
      {
        tag: 'forget_trim_end',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'trim_remaining_k_from_end' },
        ],
        feedback:
          '이미 오름차순인 문자열(예: "abcde", K=2)에서는 pop 조건이 한 번도 발동하지 않습니다. 이 경우 순회 후 남은 K개를 뒤에서 잘라야 합니다. 뒤의 큰 문자를 제거하는 것이 올바릅니다.',
      },
      {
        tag: 'miss_amortized_analysis',
        conditions: [
          { step: 'complexity', field: 'time', operator: 'not_equals', value: 'O(N)' },
        ],
        feedback:
          'pop 루프가 있어 O(N*K)로 보일 수 있지만, 각 문자는 최대 1번 push, 1번 pop됩니다. 총 연산 수는 2N을 넘지 않으므로 분할 상환 O(N)입니다.',
      },
      {
        tag: 'brute_force_combinations',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force_combinations' },
        ],
        feedback:
          'C(N, K) 조합을 모두 시도하면 시간복잡도가 지수적입니다. 사전순 최소를 위해서는 앞쪽 위치의 문자를 최대한 작게 만드는 것이 중요하고, 이는 스택 그리디로 O(N)에 해결됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: '스택에 문자를 쌓되, top이 현재보다 크고 제거 횟수가 남았으면 pop하는 단조 스택 패턴이 핵심이다.',
      mentor_hint: '이 패턴은 "다음 작은 원소", "히스토그램 최대 넓이" 등 단조 스택 문제군과 같은 계열이다. 스택 + 그리디 조합을 숙달하라.',
      pattern_trigger: '"K개 제거하여 사전순/숫자 최소(최대)" → 단조 스택 그리디',
      why_it_works: '사전순에서 앞쪽 자리의 값이 가장 중요하다. 앞에 큰 문자가 있고 뒤에 작은 문자가 오면, 큰 문자를 제거하는 것이 항상 사전순으로 이득이다. 스택이 이 비교를 효율적으로 수행한다.',
    },
  },
];
