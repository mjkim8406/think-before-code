import type { ProblemV2 } from '../types';

interface CourseProblemV2 extends ProblemV2 {
  course_level: 'beginner' | 'basic' | 'intermediate' | 'advanced';
}

export const COURSE_DP: CourseProblemV2[] = [
  // ══════════════════════════════════════════════════════════
  // BEGINNER — 기초 DP 개념 입문
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────
  // course-dp-001 — 계단 오르기
  // ──────────────────────────────────────────────────────
  {
    id: 'course-dp-001',
    title: '계단 오르기',
    difficulty: 'easy',
    course_level: 'beginner',
    domain: 'climbing_stairs',
    summary: 'N번째 계단까지 한 번에 1칸 또는 2칸씩 오를 수 있을 때, 오르는 방법의 수를 구하는 문제',
    tags: ['dynamic-programming'],
    input_type: 'single_integer',
    output_type: 'count',
    constraints: {
      step_1_or_2: true,
      start_from_ground: true,
      input_size_hint: '1 <= N <= 45',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_steps', 'maximum_sum', 'boolean_existence', 'single_value'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_integer',
            'two_choices_per_step',
            'recursive_definition',
            'sorted_data',
            'graph_structure',
          ],
          accepted_answers: ['single_integer', 'two_choices_per_step', 'recursive_definition'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_ways_to_reach_nth_stair',
            'fibonacci_variant_counting',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['brute_force', 'dp_bottom_up', 'greedy', 'dfs', 'binary_search', 'math_formula'],
          accepted_answers: ['dp_bottom_up'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'optimal_substructure_f(n)=f(n-1)+f(n-2)',
            'overlapping_subproblems',
            'counting_all_possibilities',
            'locally_optimal_choice_exists',
            'need_shortest_path',
          ],
          accepted_answers: ['optimal_substructure_f(n)=f(n-1)+f(n-2)', 'overlapping_subproblems', 'counting_all_possibilities'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['memoization', 'space_optimization_two_variables', 'matrix_exponentiation', 'sorting', 'graph_traversal'],
          accepted_answers: ['memoization', 'space_optimization_two_variables'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['dp_array', 'two_variables', 'stack', 'queue', 'hash_map'],
          accepted_answers: ['dp_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'bottom_up_from_base_cases',
            'dp[i]=dp[i-1]+dp[i-2]',
            'top_down_with_memoization',
            'enumerate_all_paths',
            'greedy_take_2_steps',
          ],
          accepted_answers: ['bottom_up_from_base_cases', 'dp[i]=dp[i-1]+dp[i-2]'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'base_cases', label: 'dp[1] = 1, dp[2] = 2로 초기화' },
          { id: 'loop_3_to_n', label: 'i = 3부터 N까지 순회' },
          { id: 'recurrence', label: 'dp[i] = dp[i-1] + dp[i-2] 계산' },
          { id: 'output', label: 'dp[N] 출력' },
          { id: 'sort_input', label: '입력을 정렬 (디스트랙터)' },
          { id: 'check_even', label: 'N이 짝수인지 확인 (디스트랙터)' },
        ],
        correct_order: ['base_cases', 'loop_3_to_n', 'recurrence', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'N_equals_1_answer_is_1',
          'N_equals_2_answer_is_2',
          'integer_overflow_for_large_N',
          'dp_index_starts_from_1',
          'negative_N_not_possible',
          'N_equals_0_answer_is_1_or_0',
        ],
        required_answers: ['N_equals_1_answer_is_1', 'N_equals_2_answer_is_2'],
        recommended_answers: ['integer_overflow_for_large_N', 'dp_index_starts_from_1'],
        optional_answers: ['negative_N_not_possible', 'N_equals_0_answer_is_1_or_0'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(NlogN)', 'O(2^N)'],
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
            'single_loop_1_to_N',
            'dp_array_of_size_N',
            'constant_work_per_step',
            'recursive_tree_has_2^N_nodes',
            'can_optimize_to_O(1)_space_with_two_vars',
          ],
          accepted_answers: ['single_loop_1_to_N', 'dp_array_of_size_N', 'constant_work_per_step'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_bottom_up',
        label: '바텀업 DP: dp[i] = dp[i-1] + dp[i-2]',
        pattern_analysis_answer: 'dp_bottom_up',
        required_strategy_tags: ['bottom_up_from_base_cases', 'dp[i]=dp[i-1]+dp[i-2]'],
      },
    ],

    common_mistakes: [
      {
        tag: 'naive_recursion',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force' },
        ],
        feedback:
          '단순 재귀로 f(n) = f(n-1) + f(n-2)를 호출하면 시간복잡도가 O(2^N)이 됩니다. N=45이면 약 10^13번의 호출이 발생합니다. 메모이제이션 또는 바텀업 DP로 중복 계산을 제거하세요.',
      },
      {
        tag: 'miss_base_case_n1',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'N_equals_1_answer_is_1' },
        ],
        feedback:
          'N=1일 때 dp[0]에 접근하면 배열 범위를 벗어납니다. N=1일 때 바로 1을 반환하는 처리가 필요합니다.',
      },
      {
        tag: 'greedy_always_2',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'greedy' },
        ],
        feedback:
          '그리디로 항상 2칸을 먼저 오르는 것은 "방법의 수"를 구하는 문제에서 의미가 없습니다. 이 문제는 최적화가 아닌 경우의 수 계산 문제입니다.',
      },
      {
        tag: 'wrong_complexity_exponential',
        conditions: [
          { step: 'complexity', field: 'time', operator: 'equals', value: 'O(2^N)' },
        ],
        feedback:
          'O(2^N)은 메모이제이션 없는 재귀의 시간복잡도입니다. DP 배열을 사용하면 각 값을 한 번만 계산하므로 O(N)입니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i] = dp[i-1] + dp[i-2]는 피보나치 수열과 동일한 점화식. DP의 가장 기본 형태를 익히는 문제.',
      mentor_hint: '공간 최적화: dp 배열 대신 변수 2개만으로도 풀 수 있다. prev, curr를 갱신하면 O(1) 공간.',
      pattern_trigger: '"N번째 도달 방법의 수" + "매 단계 k가지 선택지"가 보이면 → 점화식 기반 DP를 떠올려라.',
      why_it_works: 'N번째 계단에 도달하려면 N-1 또는 N-2에서 와야 한다. 따라서 f(N) = f(N-1) + f(N-2). 각 부분 문제가 독립적이고 중복되므로 DP가 최적.',
    },
  },

  // ──────────────────────────────────────────────────────
  // course-dp-002 — 1로 만들기
  // ──────────────────────────────────────────────────────
  {
    id: 'course-dp-002',
    title: '1로 만들기',
    difficulty: 'easy',
    course_level: 'beginner',
    domain: 'make_one',
    summary: '정수 N에 ÷3, ÷2, -1 세 가지 연산을 적용하여 1로 만드는 최소 연산 횟수를 구하는 문제',
    tags: ['dynamic-programming'],
    input_type: 'single_integer',
    output_type: 'minimum_steps',
    constraints: {
      three_operations: true,
      divide_by_3_if_divisible: true,
      divide_by_2_if_divisible: true,
      subtract_1: true,
      input_size_hint: '1 <= N <= 1000000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_steps', 'count', 'maximum_sum', 'boolean_existence', 'single_value'],
          accepted_answers: ['minimum_steps'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_integer',
            'multiple_operations_available',
            'target_is_fixed_value_1',
            'sorted_data',
            'graph_structure',
          ],
          accepted_answers: ['single_integer', 'multiple_operations_available', 'target_is_fixed_value_1'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimum_operations_to_reduce_to_1',
            'shortest_path_from_N_to_1_via_3_ops',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['brute_force', 'dp_bottom_up', 'bfs_shortest_path', 'greedy', 'dfs', 'binary_search'],
          accepted_answers: ['dp_bottom_up', 'bfs_shortest_path'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'optimal_substructure_from_smaller_values',
            'overlapping_subproblems',
            'locally_optimal_not_guaranteed',
            'need_shortest_path',
            'counting_all_possibilities',
          ],
          accepted_answers: ['optimal_substructure_from_smaller_values', 'overlapping_subproblems', 'locally_optimal_not_guaranteed'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bfs_alternative', 'memoization', 'single_pass', 'sorting', 'graph_traversal'],
          accepted_answers: ['bfs_alternative', 'memoization'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['dp_array', 'queue', 'stack', 'hash_map', 'set'],
          accepted_answers: ['dp_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'bottom_up_from_1_to_N',
            'try_all_three_operations_take_min',
            'top_down_with_memoization',
            'greedy_divide_first',
            'bfs_from_N_to_1',
          ],
          accepted_answers: ['bottom_up_from_1_to_N', 'try_all_three_operations_take_min'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_dp', label: 'dp[1] = 0으로 초기화' },
          { id: 'loop_2_to_N', label: 'i = 2부터 N까지 순회' },
          { id: 'dp_subtract', label: 'dp[i] = dp[i-1] + 1 (-1 연산)' },
          { id: 'check_div2', label: 'i%2 == 0이면 dp[i] = min(dp[i], dp[i/2] + 1)' },
          { id: 'check_div3', label: 'i%3 == 0이면 dp[i] = min(dp[i], dp[i/3] + 1)' },
          { id: 'output', label: 'dp[N] 출력' },
          { id: 'sort_ops', label: '연산을 우선순위로 정렬 (디스트랙터)' },
        ],
        correct_order: ['init_dp', 'loop_2_to_N', 'dp_subtract', 'check_div2', 'check_div3', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'N_equals_1_answer_is_0',
          'greedy_divide_is_not_optimal',
          'dp_base_case_dp1_eq_0',
          'check_divisibility_before_access',
          'must_compare_all_three_operations',
          'N_equals_2_or_3',
        ],
        required_answers: ['N_equals_1_answer_is_0', 'greedy_divide_is_not_optimal', 'dp_base_case_dp1_eq_0'],
        recommended_answers: ['check_divisibility_before_access', 'must_compare_all_three_operations'],
        optional_answers: ['N_equals_2_or_3'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(NlogN)', 'O(N^2)'],
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
            'single_pass_1_to_N',
            'dp_array_size_N',
            'constant_operations_per_step',
            'recursive_calls',
            'sorting_dominates',
          ],
          accepted_answers: ['single_pass_1_to_N', 'dp_array_size_N', 'constant_operations_per_step'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_bottom_up',
        label: '바텀업 DP로 1부터 N까지 채우기',
        pattern_analysis_answer: 'dp_bottom_up',
        required_strategy_tags: ['bottom_up_from_1_to_N', 'try_all_three_operations_take_min'],
      },
      {
        strategy_id: 'bfs_shortest',
        label: 'BFS로 N에서 1까지 최단거리 탐색',
        pattern_analysis_answer: 'bfs_shortest_path',
        required_strategy_tags: ['bfs_from_N_to_1'],
      },
    ],

    common_mistakes: [
      {
        tag: 'greedy_divide',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'greedy' },
        ],
        feedback:
          '그리디로 나누기를 우선하면 최적이 아닙니다. 반례: 10에서 그리디는 10→5→4→2→1(4번)이지만, 10→9→3→1(3번)이 최적입니다.',
      },
      {
        tag: 'miss_greedy_counterexample',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'greedy_divide_is_not_optimal' },
        ],
        feedback:
          '핵심 함정: "나눌 수 있으면 나누는 것이 항상 최적"이라는 직관은 틀립니다. 10→9→3→1(3번) vs 10→5→4→2→1(4번). DP가 필요한 이유입니다.',
      },
      {
        tag: 'miss_base_case',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'N_equals_1_answer_is_0' },
        ],
        feedback:
          'N=1이면 이미 1이므로 연산 횟수는 0입니다. dp[1]=0이 기저 조건이며, 이를 누락하면 잘못된 답이 나옵니다.',
      },
      {
        tag: 'miss_divisibility_check',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'check_divisibility_before_access' },
        ],
        feedback:
          '나누어 떨어지지 않는데 dp[i/2], dp[i/3]에 접근하면 잘못된 인덱스를 참조합니다. 반드시 나눗셈 조건을 확인한 후 접근하세요.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i] = min(dp[i-1], dp[i/2], dp[i/3]) + 1. 바텀업 DP의 전형적인 형태로, 그리디가 최적이 아님을 보이는 대표 문제.',
      mentor_hint: '10→9→3→1 반례를 기억하라. 면접에서 "왜 DP인가?"를 물으면 이 반례로 즉시 답할 수 있어야 한다.',
      pattern_trigger: '"여러 연산 중 하나를 반복 적용해 목표에 도달하는 최소 횟수"가 보이면 → 바텀업 DP 또는 BFS.',
      why_it_works: 'dp[i]는 1~i-1의 최적해를 기반으로 3가지 연산의 결과 중 최솟값을 취한다. 최적 부분 구조와 중복 부분 문제가 모두 성립.',
    },
  },

  // ══════════════════════════════════════════════════════════
  // BASIC — 기본 DP 테크닉
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────
  // course-dp-003 — 동전 교환
  // ──────────────────────────────────────────────────────
  {
    id: 'course-dp-003',
    title: '동전 교환',
    difficulty: 'medium',
    course_level: 'basic',
    domain: 'coin_change',
    summary: '주어진 종류의 동전들로 목표 금액을 만드는 데 필요한 최소 동전 수를 구하는 문제',
    tags: ['dynamic-programming'],
    input_type: 'integer_array_and_target',
    output_type: 'minimum_count',
    constraints: {
      unlimited_coin_supply: true,
      coin_values_positive: true,
      may_be_impossible: true,
      input_size_hint: '1 <= coins.length <= 12, 1 <= amount <= 10000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_count', 'count_of_ways', 'maximum_sum', 'boolean_existence', 'single_value'],
          accepted_answers: ['minimum_count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array_coin_denominations',
            'single_target_value',
            'unlimited_supply_of_each_coin',
            'sorted_data',
            'graph_structure',
          ],
          accepted_answers: ['integer_array_coin_denominations', 'single_target_value', 'unlimited_supply_of_each_coin'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimum_coins_to_make_target_amount',
            'unbounded_knapsack_variant',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dp_bottom_up', 'greedy', 'brute_force', 'bfs_shortest_path', 'binary_search', 'backtracking'],
          accepted_answers: ['dp_bottom_up'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'optimal_substructure_dp[a]=min(dp[a-c])+1',
            'overlapping_subproblems_same_amount_reachable',
            'greedy_largest_coin_first_not_always_optimal',
            'need_to_try_all_coin_combinations',
            'need_connected_components',
          ],
          accepted_answers: ['optimal_substructure_dp[a]=min(dp[a-c])+1', 'overlapping_subproblems_same_amount_reachable', 'greedy_largest_coin_first_not_always_optimal'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bfs_alternative', 'memoization', 'greedy_special_cases', 'sorting', 'backtracking'],
          accepted_answers: ['bfs_alternative', 'memoization'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['dp_array', 'queue', 'hash_map', 'stack', '2d_array'],
          accepted_answers: ['dp_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp_array_size_amount_plus_1',
            'for_each_amount_try_all_coins',
            'dp[a]=min(dp[a-coin]+1)_for_all_coins',
            'greedy_largest_coin_first',
            'bfs_level_by_level',
          ],
          accepted_answers: ['dp_array_size_amount_plus_1', 'for_each_amount_try_all_coins', 'dp[a]=min(dp[a-coin]+1)_for_all_coins'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_dp', label: 'dp[0] = 0, 나머지 dp[1..amount] = INF로 초기화' },
          { id: 'outer_loop', label: 'a = 1부터 amount까지 순회' },
          { id: 'inner_loop', label: '각 동전 coin에 대해 순회' },
          { id: 'check_valid', label: 'a - coin >= 0이면' },
          { id: 'update_dp', label: 'dp[a] = min(dp[a], dp[a - coin] + 1)' },
          { id: 'output', label: 'dp[amount]가 INF이면 -1, 아니면 dp[amount] 출력' },
          { id: 'sort_coins', label: '동전을 내림차순 정렬 (디스트랙터)' },
        ],
        correct_order: ['init_dp', 'outer_loop', 'inner_loop', 'check_valid', 'update_dp', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'amount_0_answer_is_0',
          'no_combination_possible_return_minus_1',
          'greedy_not_optimal_eg_coins_1_3_4_amount_6',
          'initialize_dp_to_infinity_not_zero',
          'single_coin_type',
          'coin_larger_than_amount',
        ],
        required_answers: ['amount_0_answer_is_0', 'no_combination_possible_return_minus_1', 'greedy_not_optimal_eg_coins_1_3_4_amount_6'],
        recommended_answers: ['initialize_dp_to_infinity_not_zero', 'single_coin_type'],
        optional_answers: ['coin_larger_than_amount'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는? (amount = A, 동전 수 = C)',
          options: ['O(A)', 'O(A*C)', 'O(A^2)', 'O(2^A)'],
          accepted_answers: ['O(A*C)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(A)', 'O(A*C)', 'O(C)'],
          accepted_answers: ['O(A)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'outer_loop_A_times',
            'inner_loop_C_coins_per_amount',
            'dp_array_size_A',
            'only_1d_dp_needed',
            'sorting_dominates',
          ],
          accepted_answers: ['outer_loop_A_times', 'inner_loop_C_coins_per_amount', 'dp_array_size_A', 'only_1d_dp_needed'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_bottom_up_1d',
        label: '1D DP: dp[a] = min(dp[a-coin]+1)',
        pattern_analysis_answer: 'dp_bottom_up',
        required_strategy_tags: ['dp_array_size_amount_plus_1', 'for_each_amount_try_all_coins', 'dp[a]=min(dp[a-coin]+1)_for_all_coins'],
      },
    ],

    common_mistakes: [
      {
        tag: 'greedy_largest_first',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'greedy' },
        ],
        feedback:
          '큰 동전부터 사용하는 그리디는 최적이 아닙니다. 반례: coins=[1,3,4], amount=6. 그리디: 4+1+1=3개, 최적: 3+3=2개.',
      },
      {
        tag: 'miss_impossible_case',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'no_combination_possible_return_minus_1' },
        ],
        feedback:
          '목표 금액을 만들 수 없는 경우(예: coins=[3], amount=5)를 처리해야 합니다. dp[amount]가 여전히 INF이면 -1을 반환하세요.',
      },
      {
        tag: 'wrong_init_zero',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'initialize_dp_to_infinity_not_zero' },
        ],
        feedback:
          'dp 배열을 0으로 초기화하면 min 연산이 항상 0을 선택합니다. dp[0]=0, dp[1..amount]=INF로 초기화해야 합니다.',
      },
      {
        tag: 'miss_greedy_counterexample',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'greedy_not_optimal_eg_coins_1_3_4_amount_6' },
        ],
        feedback:
          'coins=[1,3,4], amount=6에서 그리디(4+1+1)는 3개지만 최적(3+3)은 2개입니다. 동전 문제에서 그리디가 안 되는 대표 반례를 기억하세요.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[a] = min(dp[a - coin] + 1) for all coins. Unbounded knapsack 패턴의 대표 문제.',
      mentor_hint: '그리디가 통하는 특수 경우(예: 화폐 단위가 배수 관계)와 안 통하는 일반 경우를 구분할 줄 알아야 한다.',
      pattern_trigger: '"무제한 사용 가능한 아이템으로 목표를 달성하는 최소/최대"가 보이면 → 1D DP, dp[i] = min/max(dp[i-item]).',
      why_it_works: '금액 a를 만드는 최소 동전 수는, 각 동전 c를 마지막으로 사용했을 때 dp[a-c]+1 중 최솟값이다. 최적 부분 구조가 성립하므로 DP가 정확한 답을 보장한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // course-dp-004 — 격자 최소 비용 경로
  // ──────────────────────────────────────────────────────
  {
    id: 'course-dp-004',
    title: '격자 최소 비용 경로',
    difficulty: 'medium',
    course_level: 'basic',
    domain: 'grid_min_cost_path',
    summary: 'M×N 격자에서 좌상단(0,0)부터 우하단(M-1,N-1)까지 이동할 때, 경로 비용 합의 최솟값을 구하는 문제. 이동은 오른쪽 또는 아래로만 가능.',
    tags: ['dynamic-programming', 'array'],
    input_type: '2d_integer_array',
    output_type: 'minimum_cost',
    constraints: {
      move_right_or_down_only: true,
      all_cells_have_nonnegative_cost: true,
      input_size_hint: '1 <= M, N <= 500',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_cost', 'count_of_paths', 'shortest_path_length', 'boolean_reachable', 'maximum_sum'],
          accepted_answers: ['minimum_cost'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            '2d_grid_with_costs',
            'only_right_and_down_movement',
            'start_top_left_end_bottom_right',
            'negative_weights_possible',
            'graph_with_cycles',
          ],
          accepted_answers: ['2d_grid_with_costs', 'only_right_and_down_movement', 'start_top_left_end_bottom_right'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_min_cost_path_in_grid_top_left_to_bottom_right',
            '2d_dp_on_grid',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dp_2d_grid', 'dijkstra', 'bfs', 'greedy', 'dfs', 'binary_search'],
          accepted_answers: ['dp_2d_grid'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'optimal_substructure_from_left_or_above',
            'no_cycles_in_movement_direction',
            'overlapping_subproblems_in_grid',
            'locally_optimal_choice_exists',
            'need_negative_weight_handling',
          ],
          accepted_answers: ['optimal_substructure_from_left_or_above', 'no_cycles_in_movement_direction', 'overlapping_subproblems_in_grid'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['prefix_sum', 'in_place_dp', 'space_optimization_1d', 'sorting', 'graph_shortest_path'],
          accepted_answers: ['in_place_dp', 'space_optimization_1d'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_dp_array', '1d_dp_array', 'priority_queue', 'stack', 'hash_map'],
          accepted_answers: ['2d_dp_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'fill_first_row_and_column_cumulatively',
            'dp[i][j]=grid[i][j]+min(dp[i-1][j],dp[i][j-1])',
            'iterate_row_by_row',
            'dijkstra_with_priority_queue',
            'dfs_with_backtracking',
          ],
          accepted_answers: ['fill_first_row_and_column_cumulatively', 'dp[i][j]=grid[i][j]+min(dp[i-1][j],dp[i][j-1])', 'iterate_row_by_row'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_origin', label: 'dp[0][0] = grid[0][0]' },
          { id: 'fill_first_row', label: '첫 행 누적합: dp[0][j] = dp[0][j-1] + grid[0][j]' },
          { id: 'fill_first_col', label: '첫 열 누적합: dp[i][0] = dp[i-1][0] + grid[i][0]' },
          { id: 'fill_rest', label: '나머지 셀: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])' },
          { id: 'output', label: 'dp[M-1][N-1] 출력' },
          { id: 'sort_grid', label: '격자 값을 정렬 (디스트랙터)' },
        ],
        correct_order: ['init_origin', 'fill_first_row', 'fill_first_col', 'fill_rest', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          '1x1_grid_answer_is_grid[0][0]',
          'first_row_only_from_left',
          'first_column_only_from_above',
          'cannot_move_left_or_up',
          'single_row_or_column_grid',
          'all_cells_same_value',
        ],
        required_answers: ['1x1_grid_answer_is_grid[0][0]', 'first_row_only_from_left', 'first_column_only_from_above'],
        recommended_answers: ['cannot_move_left_or_up', 'single_row_or_column_grid'],
        optional_answers: ['all_cells_same_value'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(M+N)', 'O(M*N)', 'O(M*N*log(M*N))', 'O(2^(M+N))'],
          accepted_answers: ['O(M*N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(M*N)', 'O(M+N)'],
          accepted_answers: ['O(M*N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'visit_each_cell_once',
            'dp_table_same_size_as_grid',
            'constant_work_per_cell',
            'can_optimize_to_O(N)_with_1d_array',
            'priority_queue_log_factor',
          ],
          accepted_answers: ['visit_each_cell_once', 'dp_table_same_size_as_grid', 'constant_work_per_cell'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_2d_grid',
        label: '2D DP: dp[i][j] = grid[i][j] + min(위, 왼쪽)',
        pattern_analysis_answer: 'dp_2d_grid',
        required_strategy_tags: ['fill_first_row_and_column_cumulatively', 'dp[i][j]=grid[i][j]+min(dp[i-1][j],dp[i][j-1])'],
      },
    ],

    common_mistakes: [
      {
        tag: 'greedy_min_neighbor',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'greedy' },
        ],
        feedback:
          '매 순간 비용이 적은 쪽(오른쪽 vs 아래)을 선택하는 그리디는 최적이 아닙니다. 당장 비용이 높은 셀을 지나더라도 이후 경로가 더 저렴할 수 있습니다.',
      },
      {
        tag: 'miss_first_row_col',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'first_row_only_from_left' },
        ],
        feedback:
          '첫 행은 왼쪽에서만, 첫 열은 위에서만 올 수 있으므로 누적합으로 초기화해야 합니다. min을 취할 수 없는 경계 조건을 빠뜨리면 잘못된 값이 전파됩니다.',
      },
      {
        tag: 'miss_1x1_grid',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: '1x1_grid_answer_is_grid[0][0]' },
        ],
        feedback:
          '1x1 격자에서는 시작점이 곧 도착점입니다. 별도 처리 없이 grid[0][0]을 반환하면 됩니다.',
      },
      {
        tag: 'use_dijkstra_unnecessarily',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dijkstra' },
        ],
        feedback:
          '이동 방향이 오른쪽/아래로만 제한되어 사이클이 없으므로 Dijkstra는 과도합니다. 단순 2D DP로 O(MN)에 해결 가능합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). 2D DP의 가장 기본적인 형태.',
      mentor_hint: '공간 최적화: 행 단위로 처리하면 1D 배열(O(N))만으로 풀 수 있다. 이전 행 정보만 필요하기 때문.',
      pattern_trigger: '"격자에서 한 방향으로만 이동, 경로 비용 최소/최대"가 보이면 → 2D DP를 떠올려라.',
      why_it_works: '(i,j)에 도달하려면 반드시 (i-1,j) 또는 (i,j-1)에서 와야 한다. 두 부분 문제가 독립적이고, 각각의 최적해를 이미 알고 있으므로 min을 취하면 된다.',
    },
  },

  // ══════════════════════════════════════════════════════════
  // INTERMEDIATE — 중급 DP 패턴
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────
  // course-dp-005 — 0-1 배낭 문제
  // ──────────────────────────────────────────────────────
  {
    id: 'course-dp-005',
    title: '0-1 배낭 문제',
    difficulty: 'medium',
    course_level: 'intermediate',
    domain: 'knapsack_01',
    summary: 'N개의 물건이 각각 무게와 가치를 가질 때, 배낭의 무게 제한 W 이내에서 가치의 합을 최대화하는 문제. 각 물건은 한 번만 사용 가능.',
    tags: ['dynamic-programming'],
    input_type: 'items_array_and_capacity',
    output_type: 'maximum_value',
    constraints: {
      each_item_used_at_most_once: true,
      weight_and_value_positive: true,
      input_size_hint: '1 <= N <= 100, 1 <= W <= 10000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['maximum_value', 'minimum_cost', 'count_of_ways', 'boolean_existence', 'all_combinations'],
          accepted_answers: ['maximum_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'items_with_weight_and_value',
            'capacity_constraint',
            'each_item_select_or_not',
            'unlimited_supply',
            'sorted_data',
          ],
          accepted_answers: ['items_with_weight_and_value', 'capacity_constraint', 'each_item_select_or_not'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'maximize_value_under_weight_limit',
            'classic_0_1_knapsack',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dp_knapsack', 'greedy_value_per_weight', 'brute_force_all_subsets', 'sorting', 'binary_search', 'bfs'],
          accepted_answers: ['dp_knapsack'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'optimal_substructure_include_or_exclude',
            'overlapping_subproblems_same_remaining_capacity',
            'greedy_by_value_per_weight_not_optimal',
            'need_all_subsets_exponential',
            'need_shortest_path',
          ],
          accepted_answers: ['optimal_substructure_include_or_exclude', 'overlapping_subproblems_same_remaining_capacity', 'greedy_by_value_per_weight_not_optimal'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['space_optimization_1d', 'memoization', 'backtracking_with_pruning', 'sorting', 'meet_in_the_middle'],
          accepted_answers: ['space_optimization_1d', 'memoization'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_dp_array', '1d_dp_array', 'hash_map', 'priority_queue', 'stack'],
          accepted_answers: ['2d_dp_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp[i][w]=max(exclude,include)',
            'iterate_items_then_weights',
            'include_if_weight_fits',
            'greedy_sort_by_ratio',
            'brute_force_2^N',
          ],
          accepted_answers: ['dp[i][w]=max(exclude,include)', 'iterate_items_then_weights', 'include_if_weight_fits'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_dp', label: 'dp[0][w] = 0 (물건 0개일 때 가치 0)으로 초기화' },
          { id: 'outer_items', label: '물건 i = 1부터 N까지 순회' },
          { id: 'inner_weights', label: '용량 w = 0부터 W까지 순회' },
          { id: 'exclude', label: 'dp[i][w] = dp[i-1][w] (물건 i를 안 넣는 경우)' },
          { id: 'include_check', label: 'weight[i] <= w이면' },
          { id: 'include_update', label: 'dp[i][w] = max(dp[i][w], dp[i-1][w-weight[i]] + value[i])' },
          { id: 'output', label: 'dp[N][W] 출력' },
        ],
        correct_order: ['init_dp', 'outer_items', 'inner_weights', 'exclude', 'include_check', 'include_update', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'all_items_too_heavy',
          'single_item_fits_exactly',
          'greedy_ratio_not_optimal',
          'capacity_0_answer_is_0',
          '1d_dp_must_iterate_weight_reverse',
          'item_weight_equals_capacity',
        ],
        required_answers: ['all_items_too_heavy', 'greedy_ratio_not_optimal', 'capacity_0_answer_is_0'],
        recommended_answers: ['1d_dp_must_iterate_weight_reverse', 'single_item_fits_exactly'],
        optional_answers: ['item_weight_equals_capacity'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는? (N: 물건 수, W: 용량)',
          options: ['O(N*W)', 'O(2^N)', 'O(N*logN)', 'O(N^2)'],
          accepted_answers: ['O(N*W)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(W)', 'O(N*W)', 'O(N)', 'O(1)'],
          accepted_answers: ['O(N*W)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'two_nested_loops_N_and_W',
            'dp_table_N_by_W',
            'pseudo_polynomial_depends_on_W',
            'can_optimize_to_O(W)_with_1d',
            'sorting_NlogN',
          ],
          accepted_answers: ['two_nested_loops_N_and_W', 'dp_table_N_by_W', 'pseudo_polynomial_depends_on_W'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_2d_knapsack',
        label: '2D DP: dp[i][w] = max(제외, 포함)',
        pattern_analysis_answer: 'dp_knapsack',
        required_strategy_tags: ['dp[i][w]=max(exclude,include)', 'iterate_items_then_weights'],
      },
    ],

    common_mistakes: [
      {
        tag: 'greedy_ratio',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'greedy_value_per_weight' },
        ],
        feedback:
          '가치/무게 비율이 높은 순서로 넣는 그리디는 0-1 배낭에서 최적이 아닙니다. 반례: items=[(w:10,v:60),(w:20,v:100),(w:30,v:120)], W=50. 그리디(비율순)=160, 최적(2번+3번)=220. 분할 가능 배낭에서만 그리디가 통합니다.',
      },
      {
        tag: '1d_forward_iteration',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: '1d_dp_must_iterate_weight_reverse' },
        ],
        feedback:
          '1D DP 최적화 시 무게를 순방향으로 순회하면 같은 물건을 여러 번 사용하게 됩니다(unbounded knapsack). 0-1 배낭에서는 반드시 역방향(W→0)으로 순회해야 합니다.',
      },
      {
        tag: 'miss_all_heavy',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'all_items_too_heavy' },
        ],
        feedback:
          '모든 물건이 배낭 용량보다 무거우면 아무것도 넣을 수 없어 답은 0입니다. 이 경우를 고려하지 않으면 빈 dp 테이블에서 잘못된 값을 읽을 수 있습니다.',
      },
      {
        tag: 'brute_force_exponential',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force_all_subsets' },
        ],
        feedback:
          '모든 부분집합을 탐색하면 O(2^N)으로 N=100일 때 실행 불가능합니다. DP를 사용하면 O(N*W)로 해결할 수 있습니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i][w] = max(dp[i-1][w], dp[i-1][w-wi]+vi). 각 물건에 대해 "넣는다/안 넣는다" 두 선택지를 DP로 최적화.',
      mentor_hint: '1D 최적화 시 무게 역순 순회가 핵심. 순방향이면 unbounded, 역방향이면 0-1이 된다.',
      pattern_trigger: '"N개 아이템 중 선택, 용량 제한, 가치 최대화"가 보이면 → 0-1 배낭 DP를 떠올려라.',
      why_it_works: 'i번째 물건까지 고려했을 때 용량 w에서의 최적 가치는, i번째를 포함/미포함한 두 경우 중 최대값이다. 이 재귀 관계가 최적 부분 구조를 보장한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // course-dp-006 — 최장 증가 부분수열 (LIS)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-dp-006',
    title: '최장 증가 부분수열',
    difficulty: 'medium',
    course_level: 'intermediate',
    domain: 'longest_increasing_subsequence',
    summary: '정수 배열에서 순서를 유지하면서 원소가 순증가하는 가장 긴 부분수열의 길이를 구하는 문제',
    tags: ['dynamic-programming', 'binary-search'],
    input_type: 'integer_array',
    output_type: 'maximum_length',
    constraints: {
      strictly_increasing: true,
      subsequence_not_subarray: true,
      input_size_hint: '1 <= N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['maximum_length', 'count', 'minimum_steps', 'the_subsequence_itself', 'boolean_existence'],
          accepted_answers: ['maximum_length'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array_unsorted',
            'order_must_be_preserved',
            'elements_may_be_skipped',
            'sorted_data',
            'graph_structure',
          ],
          accepted_answers: ['integer_array_unsorted', 'order_must_be_preserved', 'elements_may_be_skipped'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_longest_strictly_increasing_subsequence',
            'LIS_problem',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dp_O(N^2)', 'dp_with_binary_search_O(NlogN)', 'greedy', 'sorting', 'divide_and_conquer', 'two_pointers'],
          accepted_answers: ['dp_O(N^2)', 'dp_with_binary_search_O(NlogN)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'optimal_substructure_extend_shorter_LIS',
            'overlapping_subproblems',
            'binary_search_on_tails_array',
            'greedy_just_pick_small_fails',
            'need_all_pairs_comparison',
          ],
          accepted_answers: ['optimal_substructure_extend_shorter_LIS', 'overlapping_subproblems'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['binary_search_optimization', 'patience_sorting', 'segment_tree', 'sorting', 'stack'],
          accepted_answers: ['binary_search_optimization', 'patience_sorting'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['dp_array', 'tails_array', 'segment_tree', 'stack', 'hash_map'],
          accepted_answers: ['dp_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp[i]=max(dp[j]+1)_for_j<i_and_a[j]<a[i]',
            'tails_array_with_binary_search',
            'sort_then_scan',
            'greedy_always_extend',
            'two_pointers',
          ],
          accepted_answers: ['dp[i]=max(dp[j]+1)_for_j<i_and_a[j]<a[i]'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요 (O(N^2) DP).',
        steps_catalog: [
          { id: 'init_dp_all_1', label: '모든 dp[i] = 1로 초기화 (자기 자신만 포함)' },
          { id: 'outer_loop', label: 'i = 1부터 N-1까지 순회' },
          { id: 'inner_loop', label: 'j = 0부터 i-1까지 순회' },
          { id: 'check_increasing', label: 'a[j] < a[i]이면' },
          { id: 'update_dp', label: 'dp[i] = max(dp[i], dp[j] + 1)' },
          { id: 'find_max', label: 'dp 배열의 최댓값 출력' },
          { id: 'sort_array', label: '배열을 정렬 (디스트랙터)' },
        ],
        correct_order: ['init_dp_all_1', 'outer_loop', 'inner_loop', 'check_increasing', 'update_dp', 'find_max'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'all_elements_same_LIS_is_1',
          'already_sorted_LIS_is_N',
          'strictly_decreasing_LIS_is_1',
          'answer_is_max_of_dp_not_dp[N-1]',
          'subsequence_not_subarray',
          'single_element_LIS_is_1',
        ],
        required_answers: ['answer_is_max_of_dp_not_dp[N-1]', 'subsequence_not_subarray', 'all_elements_same_LIS_is_1'],
        recommended_answers: ['already_sorted_LIS_is_N', 'strictly_decreasing_LIS_is_1'],
        optional_answers: ['single_element_LIS_is_1'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '기본 DP의 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(2^N)'],
          accepted_answers: ['O(N^2)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'nested_loop_i_and_j',
            'dp_array_size_N',
            'can_optimize_to_O(NlogN)_with_binary_search',
            'single_pass',
            'sorting_dominates',
          ],
          accepted_answers: ['nested_loop_i_and_j', 'dp_array_size_N', 'can_optimize_to_O(NlogN)_with_binary_search'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_n_squared',
        label: 'O(N^2) DP: dp[i] = max(dp[j]+1) for j < i',
        pattern_analysis_answer: 'dp_O(N^2)',
        required_strategy_tags: ['dp[i]=max(dp[j]+1)_for_j<i_and_a[j]<a[i]'],
      },
      {
        strategy_id: 'dp_binary_search',
        label: 'O(NlogN) tails 배열 + 이분탐색',
        pattern_analysis_answer: 'dp_with_binary_search_O(NlogN)',
        required_strategy_tags: ['tails_array_with_binary_search'],
      },
    ],

    common_mistakes: [
      {
        tag: 'answer_is_dp_last',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'answer_is_max_of_dp_not_dp[N-1]' },
        ],
        feedback:
          'LIS가 반드시 마지막 원소를 포함하지 않습니다. dp[N-1]이 아니라 max(dp[0..N-1])이 정답입니다. 예: [10,1,2,3]에서 LIS는 [1,2,3]이지만 dp[0]=1이 아닌 dp[3]=3이 답.',
      },
      {
        tag: 'sort_then_scan',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'sorting' },
        ],
        feedback:
          '배열을 정렬하면 원래 순서가 파괴됩니다. LIS는 부분수열이므로 원래 순서를 유지해야 합니다. 정렬은 사용하지 않습니다.',
      },
      {
        tag: 'confuse_subarray_subsequence',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'subsequence_not_subarray' },
        ],
        feedback:
          '부분수열(subsequence)은 연속이 아니어도 됩니다. 부분배열(subarray)과 혼동하면 안 됩니다. [1,3,2,4]에서 LIS [1,3,4]는 연속이 아닌 부분수열입니다.',
      },
      {
        tag: 'miss_equal_elements',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'all_elements_same_LIS_is_1' },
        ],
        feedback:
          '모든 원소가 같으면 순증가 조건(strictly increasing)을 만족하는 원소는 하나뿐이므로 LIS 길이는 1입니다. 등호(<=)를 포함하면 오답이 됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i] = i에서 끝나는 LIS 길이. O(N^2) 기본 DP와 O(NlogN) tails+이분탐색 두 접근법을 모두 알아야 한다.',
      mentor_hint: 'O(NlogN) 풀이의 tails 배열은 "길이 k인 증가 부분수열의 마지막 원소 최솟값"을 유지한다. lower_bound로 교체 위치를 찾는다.',
      pattern_trigger: '"순서 유지 + 가장 긴 증가/감소 부분수열"이 보이면 → LIS DP를 떠올려라.',
      why_it_works: 'dp[i]는 a[i]로 끝나는 가장 긴 증가 부분수열의 길이. a[j] < a[i]인 모든 j에서 dp[j]+1의 최대를 취하면 최적 부분 구조가 성립한다.',
    },
  },

  // ══════════════════════════════════════════════════════════
  // ADVANCED — 고급 DP
  // ══════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────
  // course-dp-007 — 편집 거리
  // ──────────────────────────────────────────────────────
  {
    id: 'course-dp-007',
    title: '편집 거리',
    difficulty: 'hard',
    course_level: 'advanced',
    domain: 'edit_distance',
    summary: '두 문자열 A, B가 주어질 때, A를 B로 변환하는 데 필요한 최소 편집 연산(삽입, 삭제, 교체) 수를 구하는 문제',
    tags: ['dynamic-programming', 'string'],
    input_type: 'two_strings',
    output_type: 'minimum_operations',
    constraints: {
      three_operations_insert_delete_replace: true,
      each_operation_cost_1: true,
      input_size_hint: '0 <= |A|, |B| <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_operations', 'boolean_match', 'longest_common_substring', 'count_of_ways', 'single_value'],
          accepted_answers: ['minimum_operations'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'two_strings',
            'three_edit_operations',
            'transform_A_to_B',
            'sorted_characters',
            'single_string',
          ],
          accepted_answers: ['two_strings', 'three_edit_operations', 'transform_A_to_B'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimum_edit_distance_between_two_strings',
            'levenshtein_distance',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dp_2d_on_two_sequences', 'greedy', 'lcs_variant', 'brute_force', 'divide_and_conquer', 'two_pointers'],
          accepted_answers: ['dp_2d_on_two_sequences'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'optimal_substructure_from_prefixes',
            'overlapping_subproblems_prefix_pairs',
            'three_choices_per_state',
            'greedy_character_matching_fails',
            'need_sorting',
          ],
          accepted_answers: ['optimal_substructure_from_prefixes', 'overlapping_subproblems_prefix_pairs', 'three_choices_per_state'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['space_optimization_two_rows', 'lcs_relationship', 'memoization', 'string_hashing', 'trie'],
          accepted_answers: ['space_optimization_two_rows', 'lcs_relationship'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_dp_array', '1d_dp_array', 'hash_map', 'trie', 'stack'],
          accepted_answers: ['2d_dp_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp[i][j]=edit_distance_of_A[0..i]_B[0..j]',
            'if_match_dp[i-1][j-1]_else_min_of_3_ops',
            'base_case_empty_string_to_prefix',
            'greedy_match_characters',
            'lcs_then_subtract',
          ],
          accepted_answers: ['dp[i][j]=edit_distance_of_A[0..i]_B[0..j]', 'if_match_dp[i-1][j-1]_else_min_of_3_ops', 'base_case_empty_string_to_prefix'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_base_row', label: 'dp[0][j] = j (빈 문자열 → B의 접두사: j번 삽입)' },
          { id: 'init_base_col', label: 'dp[i][0] = i (A의 접두사 → 빈 문자열: i번 삭제)' },
          { id: 'outer_loop', label: 'i = 1부터 |A|까지 순회' },
          { id: 'inner_loop', label: 'j = 1부터 |B|까지 순회' },
          { id: 'check_match', label: 'A[i-1] == B[j-1]이면 dp[i][j] = dp[i-1][j-1]' },
          { id: 'check_mismatch', label: '아니면 dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])' },
          { id: 'output', label: 'dp[|A|][|B|] 출력' },
          { id: 'sort_chars', label: '문자열 정렬 (디스트랙터)' },
        ],
        correct_order: ['init_base_row', 'init_base_col', 'outer_loop', 'inner_loop', 'check_match', 'check_mismatch', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'empty_string_A_answer_is_len_B',
          'empty_string_B_answer_is_len_A',
          'identical_strings_answer_is_0',
          'match_case_no_cost',
          'three_operations_are_independent',
          'completely_different_strings',
        ],
        required_answers: ['empty_string_A_answer_is_len_B', 'empty_string_B_answer_is_len_A', 'match_case_no_cost'],
        recommended_answers: ['identical_strings_answer_is_0', 'three_operations_are_independent'],
        optional_answers: ['completely_different_strings'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는? (|A| = M, |B| = N)',
          options: ['O(M+N)', 'O(M*N)', 'O(M*N*min(M,N))', 'O(3^(M+N))'],
          accepted_answers: ['O(M*N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(min(M,N))', 'O(M*N)', 'O(M+N)'],
          accepted_answers: ['O(M*N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'two_nested_loops_M_and_N',
            'dp_table_M_by_N',
            'constant_work_per_cell',
            'can_optimize_to_O(min(M,N))_space',
            'sorting_dominates',
          ],
          accepted_answers: ['two_nested_loops_M_and_N', 'dp_table_M_by_N', 'constant_work_per_cell'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_2d_edit_distance',
        label: '2D DP: dp[i][j] = A[0..i]→B[0..j] 최소 편집 수',
        pattern_analysis_answer: 'dp_2d_on_two_sequences',
        required_strategy_tags: ['dp[i][j]=edit_distance_of_A[0..i]_B[0..j]', 'if_match_dp[i-1][j-1]_else_min_of_3_ops', 'base_case_empty_string_to_prefix'],
      },
    ],

    common_mistakes: [
      {
        tag: 'greedy_character_match',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'greedy' },
        ],
        feedback:
          '앞에서부터 같은 문자를 매칭하는 그리디는 최적이 아닙니다. "abc"→"cab"에서 그리디로 하면 3번이지만 최적은 2번(a를 끝으로 이동, b 교체)입니다. 전체 접두사 쌍을 고려하는 DP가 필요합니다.',
      },
      {
        tag: 'miss_empty_base_case',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'empty_string_A_answer_is_len_B' },
        ],
        feedback:
          '빈 문자열에서 길이 N인 문자열을 만들려면 N번 삽입이 필요합니다. dp[0][j]=j 기저 조건을 누락하면 전체 DP 테이블이 잘못됩니다.',
      },
      {
        tag: 'miss_match_no_cost',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'match_case_no_cost' },
        ],
        feedback:
          'A[i]==B[j]일 때는 비용 없이 dp[i-1][j-1]을 가져옵니다. 이 조건을 빠뜨리고 항상 +1을 하면 과대 계산됩니다.',
      },
      {
        tag: 'confuse_three_operations',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'three_operations_are_independent' },
        ],
        feedback:
          'dp[i-1][j]+1은 삭제, dp[i][j-1]+1은 삽입, dp[i-1][j-1]+1은 교체입니다. 세 연산의 의미를 혼동하면 점화식을 잘못 세울 수 있습니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i][j] = A[i]==B[j] ? dp[i-1][j-1] : 1 + min(삽입, 삭제, 교체). 두 시퀀스 비교 DP의 대표 패턴.',
      mentor_hint: '편집 거리 = |A| + |B| - 2*LCS(A,B)라는 관계도 성립한다. LCS와 편집 거리의 연관성을 이해하면 시야가 넓어진다.',
      pattern_trigger: '"두 시퀀스를 변환, 삽입/삭제/교체 최소 횟수"가 보이면 → 2D DP (편집 거리 패턴)를 떠올려라.',
      why_it_works: 'A[0..i]→B[0..j] 변환은 마지막 문자가 같으면 A[0..i-1]→B[0..j-1]과 같고, 다르면 3가지 연산 각각의 결과 중 최소를 취한다. 모든 접두사 쌍에 대해 최적 부분 구조가 성립.',
    },
  },

  // ──────────────────────────────────────────────────────
  // course-dp-008 — 행렬 곱셈 순서
  // ──────────────────────────────────────────────────────
  {
    id: 'course-dp-008',
    title: '행렬 곱셈 순서',
    difficulty: 'hard',
    course_level: 'advanced',
    domain: 'matrix_chain_multiplication',
    summary: 'N개의 행렬을 연쇄 곱셈할 때, 괄호를 어떻게 묶느냐에 따라 스칼라 곱셈 횟수가 달라진다. 최소 스칼라 곱셈 횟수를 구하는 문제.',
    tags: ['dynamic-programming'],
    input_type: 'dimension_array',
    output_type: 'minimum_operations',
    constraints: {
      matrix_i_has_dimensions_p_i_by_p_i_plus_1: true,
      multiplication_order_does_not_change_result: true,
      input_size_hint: '2 <= N <= 500, dimensions array length = N+1',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_operations', 'count_of_ways', 'maximum_value', 'boolean_existence', 'the_optimal_order'],
          accepted_answers: ['minimum_operations'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'dimension_array_of_N_plus_1_elements',
            'matrix_i_is_p[i]_x_p[i+1]',
            'parenthesization_affects_cost',
            'sorted_data',
            'graph_structure',
          ],
          accepted_answers: ['dimension_array_of_N_plus_1_elements', 'matrix_i_is_p[i]_x_p[i+1]', 'parenthesization_affects_cost'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimize_scalar_multiplications_in_matrix_chain',
            'optimal_parenthesization_of_matrix_product',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dp_interval', 'greedy', 'divide_and_conquer', 'dp_bottom_up', 'brute_force', 'binary_search'],
          accepted_answers: ['dp_interval'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'optimal_substructure_split_at_k',
            'overlapping_subproblems_same_subchains',
            'try_all_split_points',
            'greedy_smallest_matrix_first_not_optimal',
            'need_sorting',
          ],
          accepted_answers: ['optimal_substructure_split_at_k', 'overlapping_subproblems_same_subchains', 'try_all_split_points'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['memoization', 'interval_dp_template', 'divide_and_conquer_optimization', 'sorting', 'stack'],
          accepted_answers: ['memoization', 'interval_dp_template'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_dp_array', '1d_dp_array', 'hash_map', 'stack', 'priority_queue'],
          accepted_answers: ['2d_dp_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp[i][j]=min_cost_to_multiply_matrices_i_to_j',
            'try_all_split_points_k_between_i_and_j',
            'iterate_by_chain_length',
            'greedy_multiply_smallest_pair_first',
            'recursive_without_memoization',
          ],
          accepted_answers: ['dp[i][j]=min_cost_to_multiply_matrices_i_to_j', 'try_all_split_points_k_between_i_and_j', 'iterate_by_chain_length'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_diagonal', label: 'dp[i][i] = 0 (단일 행렬은 곱셈 비용 0)' },
          { id: 'loop_chain_len', label: '체인 길이 L = 2부터 N까지 순회' },
          { id: 'loop_start', label: '시작 인덱스 i = 1부터 N-L+1까지 순회' },
          { id: 'compute_end', label: 'j = i + L - 1 계산' },
          { id: 'init_dp_ij_inf', label: 'dp[i][j] = INF로 초기화' },
          { id: 'loop_split', label: '분할점 k = i부터 j-1까지 순회' },
          { id: 'update_dp', label: 'dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j])' },
          { id: 'output', label: 'dp[1][N] 출력' },
        ],
        correct_order: ['init_diagonal', 'loop_chain_len', 'loop_start', 'compute_end', 'init_dp_ij_inf', 'loop_split', 'update_dp', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'single_matrix_answer_is_0',
          'two_matrices_only_one_way',
          'greedy_smallest_dimension_not_optimal',
          'chain_length_iteration_order_matters',
          'index_off_by_one_in_dimensions',
          'large_dimensions_may_overflow_int32',
        ],
        required_answers: ['single_matrix_answer_is_0', 'greedy_smallest_dimension_not_optimal', 'chain_length_iteration_order_matters'],
        recommended_answers: ['index_off_by_one_in_dimensions', 'two_matrices_only_one_way'],
        optional_answers: ['large_dimensions_may_overflow_int32'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^2)', 'O(N^3)', 'O(N^2 * logN)', 'O(2^N)'],
          accepted_answers: ['O(N^3)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(N^3)', 'O(1)'],
          accepted_answers: ['O(N^2)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'three_nested_loops_L_i_k',
            'dp_table_N_by_N',
            'each_cell_checked_up_to_N_splits',
            'can_optimize_with_Knuth_to_O(N^2)',
            'sorting_dominates',
          ],
          accepted_answers: ['three_nested_loops_L_i_k', 'dp_table_N_by_N', 'each_cell_checked_up_to_N_splits'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_interval',
        label: '구간 DP: dp[i][j] = min over k of (dp[i][k] + dp[k+1][j] + cost)',
        pattern_analysis_answer: 'dp_interval',
        required_strategy_tags: ['dp[i][j]=min_cost_to_multiply_matrices_i_to_j', 'try_all_split_points_k_between_i_and_j', 'iterate_by_chain_length'],
      },
    ],

    common_mistakes: [
      {
        tag: 'greedy_smallest_first',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'greedy' },
        ],
        feedback:
          '가장 작은 행렬부터 곱하는 그리디는 최적이 아닙니다. 반례: 행렬 A(10x30), B(30x5), C(5x60). AB먼저: 10*30*5+10*5*60=4500. BC먼저: 30*5*60+10*30*60=27000. 곱셈 순서가 결과에 큰 영향을 미칩니다.',
      },
      {
        tag: 'wrong_iteration_order',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'chain_length_iteration_order_matters' },
        ],
        feedback:
          '구간 DP에서는 짧은 체인부터 긴 체인 순으로 채워야 합니다. dp[i][j]를 계산할 때 dp[i][k]와 dp[k+1][j]가 이미 계산되어 있어야 하기 때문입니다. i,j를 단순 이중 루프로 순회하면 참조할 값이 아직 없을 수 있습니다.',
      },
      {
        tag: 'index_off_by_one',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'index_off_by_one_in_dimensions' },
        ],
        feedback:
          '행렬 i의 크기는 p[i-1] x p[i]입니다 (1-indexed 기준). 인덱스 변환을 잘못하면 곱셈 비용 p[i-1]*p[k]*p[j]에서 잘못된 차원을 참조합니다.',
      },
      {
        tag: 'miss_single_matrix',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'single_matrix_answer_is_0' },
        ],
        feedback:
          '행렬이 1개이면 곱셈을 할 필요가 없으므로 답은 0입니다. dp[i][i]=0 초기화를 빠뜨리면 안 됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i][j] = min_{i<=k<j}(dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j]). 구간 DP의 대표 문제로, "어디서 쪼갤 것인가"를 모든 분할점에 대해 시도.',
      mentor_hint: '구간 DP의 핵심은 반복 순서: 반드시 짧은 구간 → 긴 구간 순으로 채워야 한다. 이 순서가 올바른 의존성을 보장한다.',
      pattern_trigger: '"연속된 원소들을 어떤 순서로 합칠 때 비용 최소화"가 보이면 → 구간 DP를 떠올려라.',
      why_it_works: '행렬 체인 i~j를 곱하려면 어딘가에서 반드시 분할해야 한다. 분할점 k에서의 비용은 좌측(i~k) + 우측(k+1~j) + 합치는 비용이다. 모든 k를 시도하여 최소를 취하면 최적 부분 구조가 보장된다.',
    },
  },
];
