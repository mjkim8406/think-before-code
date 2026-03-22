import type { ProblemV2 } from '../types';

export const DP_V2: ProblemV2[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1463 — 1로 만들기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001463-boj',
    title: '1로 만들기',
    difficulty: 'easy',
    domain: 'basic_dp',
    summary: '정수 X에 세 가지 연산을 적용하여 1로 만드는 최소 연산 횟수를 구하는 문제',
    tags: ['dynamic-programming', 'bfs', 'bottom-up'],
    input_type: 'single_integer',
    output_type: 'minimum_steps',
    constraints: {
      three_operations: true,
      divide_by_3_if_divisible: true,
      divide_by_2_if_divisible: true,
      subtract_1: true,
      input_size_hint: 'N <= 1000000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_steps', 'count', 'maximum_sum', 'boolean_existence', 'indices'],
          accepted_answers: ['minimum_steps'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_integer',
            'multiple_operations_available',
            'target_is_fixed_value_1',
            'state_transition_problem',
            'sorted_data',
          ],
          accepted_answers: ['single_integer', 'multiple_operations_available', 'target_is_fixed_value_1'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimum_operations_to_reduce_to_1',
            'shortest_path_from_N_to_1',
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
            'need_connected_components',
          ],
          accepted_answers: ['optimal_substructure_from_smaller_values', 'overlapping_subproblems'],
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
          options: ['array', 'set', 'map', 'stack', 'queue', 'dp_array'],
          accepted_answers: ['dp_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'bottom_up_from_1_to_N',
            'top_down_with_memoization',
            'bfs_from_N_to_1',
            'greedy_divide_first',
            'try_all_three_operations',
          ],
          accepted_answers: ['bottom_up_from_1_to_N', 'try_all_three_operations'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_dp_array', label: 'dp[1] = 0으로 초기화' },
          { id: 'iterate_2_to_N', label: 'i = 2부터 N까지 순회' },
          { id: 'set_dp_i_from_subtract', label: 'dp[i] = dp[i-1] + 1 (1 빼기 연산)' },
          { id: 'check_div_by_2', label: 'i가 2로 나누어 떨어지면 dp[i] = min(dp[i], dp[i/2] + 1)' },
          { id: 'check_div_by_3', label: 'i가 3으로 나누어 떨어지면 dp[i] = min(dp[i], dp[i/3] + 1)' },
          { id: 'output_dp_N', label: 'dp[N] 출력' },
        ],
        correct_order: [
          'init_dp_array',
          'iterate_2_to_N',
          'set_dp_i_from_subtract',
          'check_div_by_2',
          'check_div_by_3',
          'output_dp_N',
        ],
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
        required_strategy_tags: ['bottom_up_from_1_to_N', 'try_all_three_operations'],
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
          '그리디로 나누기를 우선하면 최적이 아닙니다. 반례: 10에서 그리디는 10→5→4→2→1(4번)이지만, 10→9→3→1(3번)이 최적입니다. "나눌 수 있으면 항상 나누는 게 좋다"는 직관이 틀린 대표적인 예입니다.',
      },
      {
        tag: 'miss_greedy_counterexample',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'greedy_divide_is_not_optimal' },
        ],
        feedback:
          '이 문제의 핵심 함정은 "나누기 우선 그리디가 최적이 아니다"라는 점입니다. 10→5→4→2→1(4번) vs 10→9→3→1(3번). DP가 필요한 이유를 설명할 때 이 반례를 반드시 제시하세요.',
      },
      {
        tag: 'miss_base_case',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'N_equals_1_answer_is_0' },
        ],
        feedback:
          'N=1이면 이미 1이므로 연산이 필요 없습니다. dp[1]=0이 기저 조건이며, 이를 처리하지 않으면 불필요한 연산이 수행됩니다.',
      },
      {
        tag: 'miss_divisibility_guard',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'check_divisibility_before_access' },
        ],
        feedback:
          'i가 2 또는 3으로 나누어 떨어지는지 확인하지 않고 dp[i/2], dp[i/3]에 접근하면 잘못된 인덱스를 참조합니다. 예: i=7일 때 dp[7/3]=dp[2]를 참조하면 7→2가 한 번의 연산인 것처럼 처리되어 오답입니다.',
      },
      {
        tag: 'miss_compare_all_operations',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'must_compare_all_three_operations' },
        ],
        feedback:
          '세 연산(÷3, ÷2, -1) 중 하나만 빠뜨려도 최적해를 놓칩니다. dp[i] = dp[i-1]+1로 시작한 뒤, 나누기 2와 나누기 3을 순서대로 비교하여 min을 갱신해야 합니다. if-else가 아니라 독립적인 if 두 개를 사용하세요.',
      },
      {
        tag: 'wrong_complexity_logN',
        conditions: [
          { step: 'complexity', field: 'time', operator: 'equals', value: 'O(NlogN)' },
        ],
        feedback:
          '각 i에 대해 상수 시간(최대 3번 비교)에 dp[i]를 계산하므로 O(N)입니다. 정렬이 필요 없으므로 O(N log N)은 과대 평가입니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i] = min(dp[i-1], dp[i/2], dp[i/3]) + 1. 작은 값부터 채우는 바텀업 DP의 가장 기본적인 형태.',
      mentor_hint: '그리디(나누기 우선)가 왜 최적이 아닌지를 10→9→3→1 반례로 즉시 설명할 수 있어야 한다.',
      pattern_trigger: '"여러 연산 중 하나를 반복 적용해 목표에 도달하는 최소 횟수"가 보이면 → 바텀업 DP 또는 BFS를 떠올려라.',
      why_it_works: 'dp[i]는 dp[i-1], dp[i/2], dp[i/3] 중 최솟값에 1을 더한 것이므로, 작은 값부터 최적해를 보장하며 채워나갈 수 있다. 최적 부분 구조와 중복 부분 문제가 모두 성립한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2747 — 피보나치 수
  // ──────────────────────────────────────────────────────
  {
    id: 'b002747-boj',
    title: '피보나치 수',
    difficulty: 'easy',
    domain: 'basic_dp',
    summary: 'n번째 피보나치 수를 재귀가 아닌 반복문으로 효율적으로 구하는 문제',
    tags: ['dynamic-programming', 'math', 'recursion-optimization'],
    input_type: 'single_integer',
    output_type: 'single_value',
    constraints: {
      fibonacci_definition: true,
      fib_0_is_0: true,
      fib_1_is_1: true,
      input_size_hint: '0 <= n <= 45',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'minimum_steps', 'boolean_existence', 'sequence'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_integer',
            'recursive_definition',
            'depends_on_two_previous_values',
            'sorted_data',
            'state_transition_problem',
          ],
          accepted_answers: ['single_integer', 'recursive_definition', 'depends_on_two_previous_values'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'compute_nth_fibonacci_number',
            'iterative_recurrence_evaluation',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['naive_recursion', 'dp_bottom_up', 'memoization', 'matrix_exponentiation', 'greedy', 'binary_search'],
          accepted_answers: ['dp_bottom_up'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'overlapping_subproblems',
            'optimal_substructure_from_smaller_values',
            'exponential_recursion_without_memo',
            'only_two_previous_values_needed',
            'need_shortest_path',
          ],
          accepted_answers: ['overlapping_subproblems', 'optimal_substructure_from_smaller_values', 'exponential_recursion_without_memo'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['space_optimization', 'memoization', 'matrix_exponentiation', 'single_pass', 'tail_recursion'],
          accepted_answers: ['space_optimization', 'memoization'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'two_variables', 'map', 'stack', 'dp_array'],
          accepted_answers: ['two_variables'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'iterate_from_0_to_n',
            'keep_two_previous_values',
            'top_down_with_memoization',
            'naive_recursion',
            'matrix_power',
          ],
          accepted_answers: ['iterate_from_0_to_n', 'keep_two_previous_values'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'handle_base_cases', label: 'n이 0이면 0, 1이면 1을 바로 출력' },
          { id: 'init_two_vars', label: 'prev = 0, curr = 1로 초기화' },
          { id: 'iterate_2_to_n', label: 'i = 2부터 n까지 순회' },
          { id: 'compute_next', label: 'next = prev + curr 계산' },
          { id: 'shift_variables', label: 'prev = curr, curr = next로 갱신' },
          { id: 'output_curr', label: 'curr 출력' },
        ],
        correct_order: [
          'handle_base_cases',
          'init_two_vars',
          'iterate_2_to_n',
          'compute_next',
          'shift_variables',
          'output_curr',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'n_equals_0_answer_is_0',
          'n_equals_1_answer_is_1',
          'naive_recursion_is_exponential',
          'swap_order_matters',
          'fib_45_fits_in_int32',
          'off_by_one_in_loop_range',
        ],
        required_answers: ['n_equals_0_answer_is_0', 'naive_recursion_is_exponential'],
        recommended_answers: ['swap_order_matters', 'n_equals_1_answer_is_1'],
        optional_answers: ['fib_45_fits_in_int32', 'off_by_one_in_loop_range'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(1)', 'O(n)', 'O(n^2)', 'O(2^n)'],
          accepted_answers: ['O(n)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(n)', 'O(n^2)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'single_pass_0_to_n',
            'only_two_variables_maintained',
            'no_auxiliary_data_structure',
            'recursive_calls',
            'dp_array_size_n',
          ],
          accepted_answers: ['single_pass_0_to_n', 'only_two_variables_maintained', 'no_auxiliary_data_structure'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'iterative_two_vars',
        label: '변수 2개로 반복문 순회',
        pattern_analysis_answer: 'dp_bottom_up',
        required_strategy_tags: ['iterate_from_0_to_n', 'keep_two_previous_values'],
      },
      {
        strategy_id: 'memoization',
        label: '메모이제이션 재귀',
        pattern_analysis_answer: 'memoization',
        required_strategy_tags: ['top_down_with_memoization'],
      },
    ],

    common_mistakes: [
      {
        tag: 'naive_recursion',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'naive_recursion' },
        ],
        feedback:
          '단순 재귀 fib(n) = fib(n-1) + fib(n-2)는 O(2^n)입니다. fib(45)에서 약 2^45 ≈ 3.5조 번의 호출이 발생하여 시간 초과됩니다. 이전 계산 결과를 저장(메모이제이션)하거나 반복문을 사용하세요.',
      },
      {
        tag: 'miss_base_case_0',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'n_equals_0_answer_is_0' },
        ],
        feedback:
          'fib(0) = 0입니다. n=0일 때를 처리하지 않으면 반복문이 실행되지 않거나 잘못된 초기값이 출력됩니다.',
      },
      {
        tag: 'miss_exponential_warning',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'naive_recursion_is_exponential' },
        ],
        feedback:
          '이 문제의 핵심 교훈은 "재귀의 중복 호출"입니다. fib(5) 계산에도 fib(2)가 3번, fib(1)이 5번 호출됩니다. n이 커지면 지수적으로 증가하므로 반드시 메모이제이션 또는 반복문이 필요합니다.',
      },
      {
        tag: 'swap_order_error',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'swap_order_matters' },
        ],
        feedback:
          'prev와 curr를 갱신할 때 순서가 중요합니다. next = prev + curr를 먼저 계산한 후 prev = curr, curr = next 순서로 갱신해야 합니다. 순서를 바꾸면 prev가 이미 새 값으로 덮여 잘못된 결과가 나옵니다.',
      },
      {
        tag: 'wrong_complexity_2n',
        conditions: [
          { step: 'complexity', field: 'time', operator: 'equals', value: 'O(2^n)' },
        ],
        feedback:
          'O(2^n)은 메모이제이션 없이 재귀를 사용할 때의 복잡도입니다. 반복문이나 메모이제이션을 사용하면 O(n)으로 해결됩니다.',
      },
      {
        tag: 'unnecessary_array',
        conditions: [
          { step: 'strategy_design', field: 'data_structures', operator: 'includes', value: 'dp_array' },
        ],
        feedback:
          '배열을 사용해도 정답은 구할 수 있지만, 피보나치 수는 이전 두 값만 필요하므로 변수 2개로 O(1) 공간에 해결 가능합니다. 공간 최적화를 의식하세요.',
      },
    ],

    review_notes: {
      core_takeaway: 'fib(n)은 이전 두 값만 필요하므로 변수 2개로 O(n) 시간, O(1) 공간에 계산 가능하다.',
      mentor_hint: '단순 재귀의 O(2^n) 문제를 면접에서 설명할 수 있어야 한다. fib(5)의 호출 트리를 그려 중복을 시각적으로 보여줘라.',
      pattern_trigger: '"점화식이 이전 k개 값에만 의존"하면 → 변수 k개로 공간 O(1) 최적화를 떠올려라.',
      why_it_works: 'fib(n)은 fib(n-1)과 fib(n-2)에만 의존하므로, 한 번의 순방향 순회로 모든 값을 순차적으로 계산할 수 있다. 배열 없이 이전 두 값만 유지하면 충분하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 10844 — 쉬운 계단 수
  // ──────────────────────────────────────────────────────
  {
    id: 'b010844-boj',
    title: '쉬운 계단 수',
    difficulty: 'medium',
    domain: 'digit_dp',
    summary: '인접 자릿수 차이가 1인 N자리 수(계단 수)의 개수를 구하는 자릿수 DP 문제',
    tags: ['dynamic-programming', 'digit-dp', 'math'],
    input_type: 'single_integer',
    output_type: 'count_mod',
    constraints: {
      adjacent_digit_diff_is_1: true,
      no_leading_zero: true,
      mod_1000000000: true,
      input_size_hint: '1 <= N <= 100',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_steps', 'single_value', 'boolean_existence', 'maximum_sum'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_integer',
            'digit_level_constraint',
            'adjacent_relation_matters',
            'modular_output_required',
            'sorted_data',
          ],
          accepted_answers: ['single_integer', 'digit_level_constraint', 'adjacent_relation_matters', 'modular_output_required'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_staircase_numbers_of_length_N',
            'digit_dp_with_adjacent_constraint',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['brute_force', 'dp_2d_state', 'greedy', 'bfs', 'combinatorics', 'binary_search'],
          accepted_answers: ['dp_2d_state'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'next_digit_depends_on_current_digit',
            'overlapping_subproblems',
            'counting_with_constraints',
            'locally_optimal_not_guaranteed',
            'need_shortest_path',
          ],
          accepted_answers: ['next_digit_depends_on_current_digit', 'overlapping_subproblems', 'counting_with_constraints'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['rolling_array', 'modular_arithmetic', 'boundary_handling', 'memoization', 'single_pass'],
          accepted_answers: ['rolling_array', 'modular_arithmetic', 'boundary_handling'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_array', '1d_array_rolling', 'map', 'stack', 'dp_array'],
          accepted_answers: ['2d_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp_length_and_last_digit',
            'transition_from_adjacent_digits',
            'handle_boundary_digits_0_and_9',
            'brute_force_enumeration',
            'combinatorics_formula',
          ],
          accepted_answers: ['dp_length_and_last_digit', 'transition_from_adjacent_digits', 'handle_boundary_digits_0_and_9'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_dp_length_1', label: 'dp[1][1..9] = 1, dp[1][0] = 0으로 초기화 (0으로 시작 불가)' },
          { id: 'iterate_length_2_to_N', label: '길이 i = 2부터 N까지 순회' },
          { id: 'handle_digit_0', label: 'dp[i][0] = dp[i-1][1] (0 뒤에는 1만 가능)' },
          { id: 'handle_digit_1_to_8', label: 'dp[i][j] = dp[i-1][j-1] + dp[i-1][j+1] (j = 1~8)' },
          { id: 'handle_digit_9', label: 'dp[i][9] = dp[i-1][8] (9 뒤에는 8만 가능)' },
          { id: 'apply_mod', label: '매 덧셈마다 mod 1,000,000,000 적용' },
          { id: 'sum_dp_N', label: 'dp[N][0] + dp[N][1] + ... + dp[N][9]의 합 출력' },
        ],
        correct_order: [
          'init_dp_length_1',
          'iterate_length_2_to_N',
          'handle_digit_0',
          'handle_digit_1_to_8',
          'handle_digit_9',
          'apply_mod',
          'sum_dp_N',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'digit_0_only_transitions_to_1',
          'digit_9_only_transitions_to_8',
          'no_leading_zero_dp1_0_equals_0',
          'mod_at_every_addition',
          'N_equals_1_answer_is_9',
          'final_sum_also_needs_mod',
        ],
        required_answers: ['digit_0_only_transitions_to_1', 'digit_9_only_transitions_to_8', 'no_leading_zero_dp1_0_equals_0'],
        recommended_answers: ['mod_at_every_addition', 'final_sum_also_needs_mod'],
        optional_answers: ['N_equals_1_answer_is_9'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(N * 10)', 'O(N^2)', 'O(10^N)'],
          accepted_answers: ['O(N * 10)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(10)', 'O(N * 10)', 'O(N^2)'],
          accepted_answers: ['O(N * 10)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'iterate_N_lengths',
            'ten_digits_per_length',
            'constant_transitions_per_state',
            'dp_table_N_by_10',
            'rolling_array_reduces_to_O10',
          ],
          accepted_answers: ['iterate_N_lengths', 'ten_digits_per_length', 'constant_transitions_per_state', 'dp_table_N_by_10'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_2d_length_digit',
        label: '2D DP: dp[길이][마지막 자릿수]로 카운팅',
        pattern_analysis_answer: 'dp_2d_state',
        required_strategy_tags: ['dp_length_and_last_digit', 'transition_from_adjacent_digits', 'handle_boundary_digits_0_and_9'],
      },
    ],

    common_mistakes: [
      {
        tag: 'include_leading_zero',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'no_leading_zero_dp1_0_equals_0' },
        ],
        feedback:
          '0으로 시작하는 수는 계단 수가 아닙니다. dp[1][0] = 0으로 초기화해야 합니다. dp[1][0] = 1로 설정하면 01, 010 같은 수가 포함되어 오답입니다.',
      },
      {
        tag: 'miss_boundary_digit_0',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'digit_0_only_transitions_to_1' },
        ],
        feedback:
          '마지막 자릿수가 0이면 다음에 올 수 있는 자릿수는 1뿐입니다. dp[i][0] = dp[i-1][1]만 가능합니다. -1은 유효한 자릿수가 아니므로 dp[i-1][-1]을 참조하면 배열 범위 초과입니다.',
      },
      {
        tag: 'miss_boundary_digit_9',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'digit_9_only_transitions_to_8' },
        ],
        feedback:
          '마지막 자릿수가 9이면 다음에 올 수 있는 자릿수는 8뿐입니다. dp[i][9] = dp[i-1][8]만 가능합니다. 10은 유효한 자릿수가 아닙니다.',
      },
      {
        tag: 'miss_mod_application',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'mod_at_every_addition' },
        ],
        feedback:
          '매 덧셈마다 mod를 적용하지 않으면 N=100일 때 값이 매우 커져 오버플로우가 발생합니다. dp[i][j] = (dp[i-1][j-1] + dp[i-1][j+1]) % 1000000000 형태로 매번 적용하세요.',
      },
      {
        tag: 'wrong_state_no_last_digit',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'dp_length_and_last_digit' },
        ],
        feedback:
          '마지막 자릿수를 상태로 추적하지 않으면 "인접 자릿수 차이가 1"이라는 조건을 확인할 수 없습니다. dp[길이][마지막 자릿수]로 2차원 상태를 정의해야 합니다.',
      },
      {
        tag: 'wrong_complexity',
        conditions: [
          { step: 'complexity', field: 'time', operator: 'equals', value: 'O(10^N)' },
        ],
        feedback:
          'O(10^N)은 모든 N자리 수를 열거하는 브루트포스의 복잡도입니다. DP를 사용하면 각 길이에서 10개 자릿수만 처리하므로 O(N * 10)입니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i][j] = dp[i-1][j-1] + dp[i-1][j+1]. 마지막 자릿수를 상태로 가지는 자릿수 DP의 기본 형태.',
      mentor_hint: 'j=0과 j=9 경계 처리를 빠뜨리는 것이 가장 흔한 실수다. if-else로 분기하거나 j-1, j+1을 참조하기 전에 범위를 체크하라.',
      pattern_trigger: '"자릿수별 조건이 있고, 인접 자릿수 간 관계가 있다"가 보이면 → dp[길이][마지막 자릿수] 자릿수 DP를 떠올려라.',
      why_it_works: '길이 i의 계단 수에서 마지막 자릿수가 j이면, 길이 i-1에서 마지막이 j-1 또는 j+1인 계단 수에서만 전이될 수 있다. 이 최적 부분 구조가 정확히 dp 점화식을 형성한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11726 — 2xn 타일링
  // ──────────────────────────────────────────────────────
  {
    id: 'b011726-boj',
    title: '2xn 타일링',
    difficulty: 'easy',
    domain: 'basic_dp',
    summary: '2xn 직사각형을 1x2, 2x1 타일로 채우는 방법의 수를 구하는 문제',
    tags: ['dynamic-programming', 'math', 'fibonacci'],
    input_type: 'single_integer',
    output_type: 'count_mod',
    constraints: {
      tile_sizes: '1x2 and 2x1',
      rectangle_height_is_2: true,
      mod_10007: true,
      input_size_hint: '1 <= n <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_steps', 'single_value', 'boolean_existence', 'maximum_sum'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_integer',
            'tiling_problem',
            'two_choices_at_each_step',
            'modular_output_required',
            'sorted_data',
          ],
          accepted_answers: ['single_integer', 'tiling_problem', 'two_choices_at_each_step', 'modular_output_required'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_ways_to_tile_2xn_rectangle',
            'fibonacci_variant_tiling',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['brute_force', 'dp_bottom_up', 'greedy', 'dfs', 'combinatorics', 'binary_search'],
          accepted_answers: ['dp_bottom_up'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'recurrence_from_last_column_choice',
            'overlapping_subproblems',
            'optimal_substructure_from_smaller_values',
            'locally_optimal_not_guaranteed',
            'need_shortest_path',
          ],
          accepted_answers: ['recurrence_from_last_column_choice', 'overlapping_subproblems', 'optimal_substructure_from_smaller_values'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['fibonacci_structure', 'space_optimization', 'modular_arithmetic', 'matrix_exponentiation', 'memoization'],
          accepted_answers: ['fibonacci_structure', 'space_optimization', 'modular_arithmetic'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'two_variables', 'map', 'stack', 'dp_array'],
          accepted_answers: ['dp_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp_n_equals_dp_n1_plus_dp_n2',
            'iterate_from_1_to_n',
            'consider_last_column_placement',
            'brute_force_all_placements',
            'matrix_power',
          ],
          accepted_answers: ['dp_n_equals_dp_n1_plus_dp_n2', 'iterate_from_1_to_n', 'consider_last_column_placement'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_base_cases', label: 'dp[1] = 1, dp[2] = 2로 초기화' },
          { id: 'iterate_3_to_n', label: 'i = 3부터 n까지 순회' },
          { id: 'apply_recurrence', label: 'dp[i] = dp[i-1] + dp[i-2]' },
          { id: 'apply_mod', label: '매 덧셈마다 mod 10007 적용' },
          { id: 'output_dp_n', label: 'dp[n] 출력' },
        ],
        correct_order: [
          'init_base_cases',
          'iterate_3_to_n',
          'apply_recurrence',
          'apply_mod',
          'output_dp_n',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'n_equals_1_answer_is_1',
          'horizontal_tiles_must_come_in_pairs',
          'recurrence_is_fibonacci',
          'mod_at_every_step',
          'dp2_is_2_not_1',
          'n_equals_2_answer_is_2',
        ],
        required_answers: ['horizontal_tiles_must_come_in_pairs', 'recurrence_is_fibonacci', 'mod_at_every_step'],
        recommended_answers: ['n_equals_1_answer_is_1', 'dp2_is_2_not_1'],
        optional_answers: ['n_equals_2_answer_is_2'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(1)', 'O(n)', 'O(nlogn)', 'O(2^n)'],
          accepted_answers: ['O(n)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(n)', 'O(n^2)'],
          accepted_answers: ['O(n)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'single_pass_1_to_n',
            'dp_array_size_n',
            'constant_work_per_step',
            'two_variables_suffice_for_O1',
            'recursive_calls',
          ],
          accepted_answers: ['single_pass_1_to_n', 'dp_array_size_n', 'constant_work_per_step'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_fibonacci',
        label: 'dp[n] = dp[n-1] + dp[n-2] 피보나치형 DP',
        pattern_analysis_answer: 'dp_bottom_up',
        required_strategy_tags: ['dp_n_equals_dp_n1_plus_dp_n2', 'iterate_from_1_to_n'],
      },
    ],

    common_mistakes: [
      {
        tag: 'wrong_base_dp2',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'dp2_is_2_not_1' },
        ],
        feedback:
          'dp[2] = 2입니다. 2x2 직사각형을 채우는 방법은 세로 타일 2개 또는 가로 타일 2개, 총 2가지입니다. dp[2] = 1로 설정하면 가로 배치를 빠뜨립니다.',
      },
      {
        tag: 'horizontal_single_tile',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'horizontal_tiles_must_come_in_pairs' },
        ],
        feedback:
          '가로 타일(1x2)은 반드시 2개가 한 쌍으로 놓여야 합니다. 높이가 2인 직사각형에서 가로 타일 1개만 놓으면 빈 칸이 남습니다. 이것이 dp[n-2]가 아닌 dp[n-3] 등의 항이 불필요한 이유입니다.',
      },
      {
        tag: 'miss_mod',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'mod_at_every_step' },
        ],
        feedback:
          'n=1000일 때 dp 값이 매우 커질 수 있습니다. 매 덧셈마다 mod 10007을 적용하지 않으면 오버플로우가 발생합니다.',
      },
      {
        tag: 'wrong_recurrence',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'consider_last_column_placement' },
        ],
        feedback:
          '맨 오른쪽 열을 채우는 방법은 두 가지뿐입니다: (1) 세로 타일 1개 → 나머지 2x(n-1), (2) 가로 타일 2개 → 나머지 2x(n-2). 이 관찰이 dp[n] = dp[n-1] + dp[n-2] 점화식의 근거입니다.',
      },
      {
        tag: 'wrong_complexity_2n',
        conditions: [
          { step: 'complexity', field: 'time', operator: 'equals', value: 'O(2^n)' },
        ],
        feedback:
          'O(2^n)은 모든 배치를 재귀로 열거할 때의 복잡도입니다. DP를 사용하면 이전 두 값만으로 다음 값을 계산하므로 O(n)입니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[n] = dp[n-1] + dp[n-2]. 맨 오른쪽 열에 세로 1개 또는 가로 2개를 놓는 두 경우로 나뉘어 피보나치와 동일한 구조.',
      mentor_hint: '"왜 dp[n-2]인가?"를 설명할 때, 가로 타일은 반드시 2개 한 쌍이라는 점을 먼저 언급하라. 가로 1개만 놓으면 빈 칸이 남는다는 것을 시각적으로 보여줘라.',
      pattern_trigger: '"2xn 또는 고정 높이 직사각형을 타일로 채우는 경우의 수"가 보이면 → 맨 끝 열 배치 경우를 나누는 DP를 떠올려라.',
      why_it_works: '맨 오른쪽 열을 채우는 방법이 정확히 2가지이고, 각 경우가 독립적인 하위 문제(2x(n-1)과 2x(n-2))로 분해된다. 경우가 겹치지 않으므로 합의 법칙으로 카운팅이 정확하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2193 — 이친수
  // ──────────────────────────────────────────────────────
  {
    id: 'b002193-boj',
    title: '이친수',
    difficulty: 'easy',
    domain: 'basic_dp',
    summary: '1이 연속으로 나타나지 않는 N자리 이진수(이친수)의 개수를 구하는 문제',
    tags: ['dynamic-programming', 'math', 'fibonacci'],
    input_type: 'single_integer',
    output_type: 'count',
    constraints: {
      no_leading_zero: true,
      no_consecutive_ones: true,
      binary_digits_only: true,
      input_size_hint: '1 <= N <= 90',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_steps', 'single_value', 'boolean_existence', 'maximum_sum'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_integer',
            'digit_level_constraint',
            'adjacent_relation_matters',
            'binary_string',
            'sorted_data',
          ],
          accepted_answers: ['single_integer', 'digit_level_constraint', 'adjacent_relation_matters', 'binary_string'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_n_digit_binary_without_consecutive_ones',
            'fibonacci_variant_binary_counting',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['brute_force', 'dp_2d_state', 'dp_bottom_up', 'greedy', 'combinatorics', 'binary_search'],
          accepted_answers: ['dp_2d_state', 'dp_bottom_up'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'next_bit_depends_on_current_bit',
            'overlapping_subproblems',
            'counting_with_constraints',
            'reduces_to_fibonacci',
            'need_shortest_path',
          ],
          accepted_answers: ['next_bit_depends_on_current_bit', 'overlapping_subproblems', 'counting_with_constraints'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['fibonacci_structure', 'space_optimization', 'state_merging', 'memoization', 'modular_arithmetic'],
          accepted_answers: ['fibonacci_structure', 'space_optimization', 'state_merging'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_array', 'two_variables', 'map', 'dp_array', 'stack'],
          accepted_answers: ['two_variables'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp_by_last_bit',
            'merge_states_to_fibonacci',
            'track_zero_end_and_one_end',
            'brute_force_all_binaries',
            'inclusion_exclusion',
          ],
          accepted_answers: ['dp_by_last_bit', 'track_zero_end_and_one_end'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_length_1', label: 'dp[1][0] = 0 (0으로 시작 불가), dp[1][1] = 1로 초기화' },
          { id: 'iterate_2_to_N', label: 'i = 2부터 N까지 순회' },
          { id: 'transition_end_0', label: 'dp[i][0] = dp[i-1][0] + dp[i-1][1] (0 뒤에는 0 또는 1)' },
          { id: 'transition_end_1', label: 'dp[i][1] = dp[i-1][0] (1 뒤에는 0만 가능)' },
          { id: 'output_sum', label: 'dp[N][0] + dp[N][1] 출력' },
        ],
        correct_order: [
          'init_length_1',
          'iterate_2_to_N',
          'transition_end_0',
          'transition_end_1',
          'output_sum',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'no_leading_zero_dp1_0_equals_0',
          'after_1_only_0_allowed',
          'reduces_to_fibonacci_sequence',
          'long_long_needed_for_N_90',
          'N_equals_1_answer_is_1',
          'state_can_be_merged_to_1d',
        ],
        required_answers: ['no_leading_zero_dp1_0_equals_0', 'after_1_only_0_allowed', 'long_long_needed_for_N_90'],
        recommended_answers: ['reduces_to_fibonacci_sequence', 'state_can_be_merged_to_1d'],
        optional_answers: ['N_equals_1_answer_is_1'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(N^2)', 'O(2^N)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(N * 2)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'single_pass_1_to_N',
            'only_two_variables_per_state',
            'previous_row_only_needed',
            'dp_array_size_N',
            'recursive_calls',
          ],
          accepted_answers: ['single_pass_1_to_N', 'only_two_variables_per_state', 'previous_row_only_needed'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_last_bit',
        label: '마지막 비트 기준 2D DP → 변수 2개로 최적화',
        pattern_analysis_answer: 'dp_2d_state',
        required_strategy_tags: ['dp_by_last_bit', 'track_zero_end_and_one_end'],
      },
      {
        strategy_id: 'fibonacci_direct',
        label: '피보나치 관찰로 1D DP',
        pattern_analysis_answer: 'dp_bottom_up',
        required_strategy_tags: ['merge_states_to_fibonacci'],
      },
    ],

    common_mistakes: [
      {
        tag: 'include_leading_zero',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'no_leading_zero_dp1_0_equals_0' },
        ],
        feedback:
          '이친수는 0으로 시작하지 않습니다. dp[1][0] = 0으로 초기화해야 합니다. dp[1][0] = 1로 설정하면 "0", "00..." 등이 포함되어 오답입니다.',
      },
      {
        tag: 'miss_consecutive_constraint',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'after_1_only_0_allowed' },
        ],
        feedback:
          '이친수의 핵심 조건은 "1이 연속으로 나타나지 않는다"입니다. 마지막 비트가 1이면 다음에 0만 올 수 있습니다. dp[i][1] = dp[i-1][0]이며, dp[i-1][1]을 더하면 "11"이 허용되어 오답입니다.',
      },
      {
        tag: 'miss_long_long',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'long_long_needed_for_N_90' },
        ],
        feedback:
          'N=90일 때 이친수의 개수는 약 2.88 × 10^18로 int(32bit) 범위를 초과합니다. long long(64bit)을 사용해야 합니다.',
      },
      {
        tag: 'no_state_tracking',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'dp_by_last_bit' },
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'merge_states_to_fibonacci' },
        ],
        feedback:
          '마지막 비트를 상태로 추적하지 않으면 "1이 연속으로 나타나지 않는다"는 조건을 점화식에 반영할 수 없습니다. dp[길이][마지막 비트]로 정의하거나, 피보나치와 동치임을 관찰하세요.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i][0] = dp[i-1][0] + dp[i-1][1], dp[i][1] = dp[i-1][0]. 합치면 f(n) = f(n-1) + f(n-2) 피보나치와 동일.',
      mentor_hint: '이 문제의 점화식이 피보나치와 동치라는 것을 유도할 수 있어야 한다. 상태를 합치면: f(n) = zero_end(n) + one_end(n) = f(n-1) + f(n-2).',
      pattern_trigger: '"이진 문자열에서 특정 패턴(연속 1 등)을 금지하는 조건"이 보이면 → 마지막 비트 기준 상태 DP를 떠올려라.',
      why_it_works: '마지막 비트가 0이면 다음에 0 또는 1 모두 가능하고, 1이면 다음에 0만 가능하므로 상태 전이가 완전히 결정된다. 이 구조가 피보나치 점화식을 형성한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1915 — 가장 큰 정사각형
  // ──────────────────────────────────────────────────────
  {
    id: 'b001915-boj',
    title: '가장 큰 정사각형',
    difficulty: 'medium',
    domain: '2d_dp',
    summary: '0과 1로 이루어진 2D 배열에서 1로만 구성된 가장 큰 정사각형의 넓이를 구하는 문제',
    tags: ['dynamic-programming', '2d-array', 'matrix'],
    input_type: 'matrix',
    output_type: 'maximum_area',
    constraints: {
      binary_matrix: true,
      answer_is_area_not_side: true,
      input_size_hint: '1 <= n, m <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['maximum_area', 'count', 'minimum_steps', 'boolean_existence', 'maximum_sum'],
          accepted_answers: ['maximum_area'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'binary_2d_matrix',
            'find_largest_substructure',
            'square_not_rectangle',
            'single_array',
            'sorted_data',
          ],
          accepted_answers: ['binary_2d_matrix', 'find_largest_substructure', 'square_not_rectangle'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'largest_all_ones_square_in_binary_matrix',
            'max_square_submatrix_area',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['brute_force', 'dp_2d_state', 'prefix_sum', 'histogram_stack', 'binary_search', 'greedy'],
          accepted_answers: ['dp_2d_state'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'square_expandable_from_three_neighbors',
            'optimal_substructure_2d',
            'overlapping_subproblems',
            'need_shortest_path',
            'locally_optimal_not_guaranteed',
          ],
          accepted_answers: ['square_expandable_from_three_neighbors', 'optimal_substructure_2d', 'overlapping_subproblems'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['in_place_update', 'track_global_max', 'histogram_approach', 'prefix_sum', 'rolling_array'],
          accepted_answers: ['in_place_update', 'track_global_max'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_array', 'stack', 'prefix_sum_array', 'map', 'dp_array'],
          accepted_answers: ['2d_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp_min_of_three_neighbors_plus_1',
            'check_top_left_top_left_diag',
            'enumerate_all_squares',
            'histogram_max_rectangle',
            'prefix_sum_counting',
          ],
          accepted_answers: ['dp_min_of_three_neighbors_plus_1', 'check_top_left_top_left_diag'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_matrix', label: '행렬 입력 및 dp 테이블 초기화 (첫 행/열은 원본 값 그대로)' },
          { id: 'iterate_from_1_1', label: 'i = 1, j = 1부터 (n-1, m-1)까지 순회' },
          { id: 'check_cell_is_1', label: 'grid[i][j] == 1인 경우에만 dp 갱신' },
          { id: 'compute_min_three', label: 'dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1' },
          { id: 'update_max', label: 'dp[i][j]가 전체 최댓값보다 크면 갱신' },
          { id: 'output_square', label: '최댓값의 제곱을 출력 (넓이)' },
        ],
        correct_order: [
          'read_matrix',
          'iterate_from_1_1',
          'check_cell_is_1',
          'compute_min_three',
          'update_max',
          'output_square',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'first_row_col_no_neighbors',
          'cell_is_0_then_dp_is_0',
          'answer_is_area_side_squared',
          'min_not_max_of_neighbors',
          'input_may_be_string_parse_carefully',
          'all_zeros_answer_is_0',
        ],
        required_answers: ['first_row_col_no_neighbors', 'cell_is_0_then_dp_is_0', 'answer_is_area_side_squared'],
        recommended_answers: ['min_not_max_of_neighbors', 'input_may_be_string_parse_carefully'],
        optional_answers: ['all_zeros_answer_is_0'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(n*m)', 'O(n*m*min(n,m))', 'O(n^2*m^2)', 'O(nlogn)'],
          accepted_answers: ['O(n*m)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(n*m)', 'O(n+m)'],
          accepted_answers: ['O(n*m)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'visit_each_cell_once',
            'constant_work_per_cell',
            'dp_table_same_size_as_input',
            'can_reuse_input_for_O1_extra',
            'sorting_dominates',
          ],
          accepted_answers: ['visit_each_cell_once', 'constant_work_per_cell', 'dp_table_same_size_as_input'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_min_three',
        label: 'dp[i][j] = min(위, 왼쪽, 대각선) + 1',
        pattern_analysis_answer: 'dp_2d_state',
        required_strategy_tags: ['dp_min_of_three_neighbors_plus_1', 'check_top_left_top_left_diag'],
      },
    ],

    common_mistakes: [
      {
        tag: 'max_instead_of_min',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'min_not_max_of_neighbors' },
        ],
        feedback:
          'dp[i][j] = min(위, 왼쪽, 대각선) + 1입니다. max가 아닌 min을 사용해야 합니다. 세 방향 중 가장 작은 정사각형이 확장의 병목이기 때문입니다. 예: 위=3, 왼쪽=1, 대각선=2이면 왼쪽이 1이므로 2x2까지만 확장 가능합니다.',
      },
      {
        tag: 'forget_area_not_side',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'answer_is_area_side_squared' },
        ],
        feedback:
          '답은 정사각형의 "넓이"입니다. dp의 최댓값은 한 변의 길이이므로 제곱해야 합니다. 한 변이 3이면 답은 9입니다.',
      },
      {
        tag: 'miss_first_row_col',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'first_row_col_no_neighbors' },
        ],
        feedback:
          '첫 행(i=0)과 첫 열(j=0)은 위, 왼쪽, 대각선 이웃이 없으므로 dp 값은 grid 원본 값 그대로입니다. 이를 처리하지 않으면 배열 범위를 벗어납니다.',
      },
      {
        tag: 'wrong_brute_force',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'enumerate_all_squares' },
        ],
        feedback:
          '모든 정사각형을 열거하면 O(n * m * min(n,m)²)로 n=m=1000에서 시간 초과입니다. dp를 사용하면 O(n*m)에 해결 가능합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1. 세 방향의 최솟값이 정사각형 확장의 한계를 결정한다.',
      mentor_hint: '"왜 min인가?"를 직관적으로 설명할 수 있어야 한다. 한 변 k인 정사각형이 (i,j)에서 존재하려면, (i-1,j), (i,j-1), (i-1,j-1) 모두에서 k-1 이상의 정사각형이 존재해야 한다.',
      pattern_trigger: '"2D 배열에서 조건을 만족하는 최대 정사각형"이 보이면 → min(위, 왼쪽, 대각선) + 1 DP를 떠올려라.',
      why_it_works: '(i,j)를 오른쪽 아래 꼭짓점으로 하는 정사각형이 k×k이려면, 위로 k칸, 왼쪽으로 k칸, 대각선으로 k칸 모두 1이어야 한다. 이 조건은 세 이웃의 dp 값 중 최솟값으로 정확히 표현된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 9252 — LCS 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b009252-boj',
    title: 'LCS 2',
    difficulty: 'medium',
    domain: 'string_dp',
    summary: '두 문자열의 최장 공통 부분 수열(LCS)의 길이와 실제 문자열을 구하는 문제',
    tags: ['dynamic-programming', 'string', 'backtracking'],
    input_type: 'two_strings',
    output_type: 'length_and_string',
    constraints: {
      uppercase_only: true,
      need_actual_lcs_string: true,
      input_size_hint: '문자열 길이 <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['length_and_string', 'count', 'minimum_steps', 'boolean_existence', 'maximum_sum'],
          accepted_answers: ['length_and_string'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'two_strings',
            'find_common_subsequence',
            'order_must_be_preserved',
            'single_array',
            'sorted_data',
          ],
          accepted_answers: ['two_strings', 'find_common_subsequence', 'order_must_be_preserved'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'longest_common_subsequence_with_reconstruction',
            'lcs_length_and_actual_string',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['brute_force', 'dp_2d_state', 'greedy', 'two_pointers', 'binary_search', 'dfs'],
          accepted_answers: ['dp_2d_state'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'two_sequences_comparison',
            'overlapping_subproblems',
            'optimal_substructure_from_prefixes',
            'locally_optimal_not_guaranteed',
            'need_backtracking_for_reconstruction',
          ],
          accepted_answers: ['two_sequences_comparison', 'overlapping_subproblems', 'optimal_substructure_from_prefixes', 'need_backtracking_for_reconstruction'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['backtracking_reconstruction', 'string_matching', 'memoization', 'prefix_comparison', 'rolling_array'],
          accepted_answers: ['backtracking_reconstruction', 'prefix_comparison'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_array', 'stack', 'string_builder', 'map', '1d_array'],
          accepted_answers: ['2d_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp_prefix_matching',
            'backtrack_from_dp_n_m',
            'space_optimized_1d',
            'enumerate_all_subsequences',
            'greedy_matching',
          ],
          accepted_answers: ['dp_prefix_matching', 'backtrack_from_dp_n_m'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_dp_table', label: 'dp[0][*] = 0, dp[*][0] = 0으로 초기화 (빈 문자열 기저)' },
          { id: 'fill_dp_table', label: 'i = 1~n, j = 1~m 순회하며 dp 테이블 채우기' },
          { id: 'match_case', label: 'A[i] == B[j]이면 dp[i][j] = dp[i-1][j-1] + 1' },
          { id: 'mismatch_case', label: 'A[i] != B[j]이면 dp[i][j] = max(dp[i-1][j], dp[i][j-1])' },
          { id: 'backtrack', label: 'dp[n][m]에서 역추적: 같은 문자면 기록 후 대각선, 아니면 큰 쪽으로 이동' },
          { id: 'reverse_output', label: '역추적 결과를 뒤집어 LCS 문자열 출력' },
        ],
        correct_order: [
          'init_dp_table',
          'fill_dp_table',
          'match_case',
          'mismatch_case',
          'backtrack',
          'reverse_output',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'lcs_length_0_empty_output',
          'full_table_needed_for_backtrack',
          'backtrack_direction_match_diagonal',
          'backtrack_direction_mismatch_larger',
          'space_optimization_breaks_backtrack',
          'both_strings_identical',
        ],
        required_answers: ['full_table_needed_for_backtrack', 'backtrack_direction_match_diagonal', 'lcs_length_0_empty_output'],
        recommended_answers: ['backtrack_direction_mismatch_larger', 'space_optimization_breaks_backtrack'],
        optional_answers: ['both_strings_identical'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(n*m)', 'O(n+m)', 'O(n^2)', 'O(2^n)'],
          accepted_answers: ['O(n*m)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(n*m)', 'O(n+m)', 'O(min(n,m))'],
          accepted_answers: ['O(n*m)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'fill_n_by_m_table',
            'constant_work_per_cell',
            'full_table_for_backtracking',
            'backtrack_is_O_n_plus_m',
            'rolling_array_not_possible_here',
          ],
          accepted_answers: ['fill_n_by_m_table', 'constant_work_per_cell', 'full_table_for_backtracking'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_2d_backtrack',
        label: '2D DP 테이블 + 역추적으로 LCS 복원',
        pattern_analysis_answer: 'dp_2d_state',
        required_strategy_tags: ['dp_prefix_matching', 'backtrack_from_dp_n_m'],
      },
    ],

    common_mistakes: [
      {
        tag: 'space_optimize_no_backtrack',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'full_table_needed_for_backtrack' },
        ],
        feedback:
          '공간 최적화(1D 배열)를 하면 LCS 길이는 구할 수 있지만, 실제 문자열을 역추적할 수 없습니다. 이 문제는 실제 LCS를 출력해야 하므로 전체 2D 테이블을 유지해야 합니다.',
      },
      {
        tag: 'wrong_backtrack_direction',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'backtrack_direction_match_diagonal' },
        ],
        feedback:
          '역추적 시 A[i] == B[j]이면 해당 문자를 기록하고 대각선(i-1, j-1)으로 이동해야 합니다. 위(i-1, j) 또는 왼쪽(i, j-1)으로 이동하면 LCS에 포함되지 않는 문자를 기록하게 됩니다.',
      },
      {
        tag: 'miss_empty_lcs',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'lcs_length_0_empty_output' },
        ],
        feedback:
          'LCS 길이가 0이면 빈 줄을 출력해야 합니다. 이를 처리하지 않으면 역추적 로직에서 오류가 발생하거나 잘못된 문자가 출력됩니다.',
      },
      {
        tag: 'enumerate_subsequences',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'enumerate_all_subsequences' },
        ],
        feedback:
          '한 문자열의 모든 부분 수열을 생성하면 2^1000가지로 불가능합니다. DP를 사용하면 O(n*m)에 해결됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i][j] = A[i]==B[j] ? dp[i-1][j-1]+1 : max(dp[i-1][j], dp[i][j-1]). 역추적으로 실제 문자열 복원.',
      mentor_hint: '역추적 시 "같은 문자 → 대각선, 다른 문자 → 큰 쪽"이라는 규칙을 정확히 외워라. 틀리면 LCS가 아닌 문자열이 나온다.',
      pattern_trigger: '"두 문자열/수열의 공통 부분 수열 중 가장 긴 것"이 보이면 → 2D DP + 역추적을 떠올려라.',
      why_it_works: 'A[i]==B[j]이면 두 문자를 LCS에 포함시킬 수 있고, 나머지는 A[1..i-1]과 B[1..j-1]의 LCS로 환원된다. 다르면 A를 줄이거나 B를 줄이는 두 경우 중 더 긴 쪽을 선택하면 최적이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 14003 — 가장 긴 증가하는 부분 수열 5
  // ──────────────────────────────────────────────────────
  {
    id: 'b014003-boj',
    title: '가장 긴 증가하는 부분 수열 5',
    difficulty: 'hard',
    domain: 'lis',
    summary: 'O(N log N) LIS 알고리즘으로 최장 증가 부분 수열의 길이와 실제 수열을 구하는 문제',
    tags: ['dynamic-programming', 'binary-search', 'greedy', 'backtracking'],
    input_type: 'integer_array',
    output_type: 'length_and_sequence',
    constraints: {
      strictly_increasing: true,
      need_actual_subsequence: true,
      input_size_hint: 'N <= 1000000',
      value_range: '-10^9 <= A[i] <= 10^9',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['length_and_sequence', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['length_and_sequence'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'need_subsequence_not_subarray',
            'large_N_up_to_1M',
            'need_reconstruction',
            'sorted_data',
          ],
          accepted_answers: ['integer_array', 'need_subsequence_not_subarray', 'large_N_up_to_1M', 'need_reconstruction'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'lis_with_reconstruction_in_nlogn',
            'longest_increasing_subsequence_length_and_elements',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dp_O_n2', 'greedy_binary_search', 'sorting', 'divide_and_conquer', 'segment_tree', 'brute_force'],
          accepted_answers: ['greedy_binary_search'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'N_too_large_for_O_n2',
            'tails_array_maintains_optimal_endpoints',
            'binary_search_for_insertion_point',
            'need_position_tracking_for_reconstruction',
            'locally_optimal_not_guaranteed',
          ],
          accepted_answers: ['N_too_large_for_O_n2', 'tails_array_maintains_optimal_endpoints', 'binary_search_for_insertion_point', 'need_position_tracking_for_reconstruction'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['backtracking_reconstruction', 'lower_bound_search', 'patience_sorting', 'dp_optimization', 'memoization'],
          accepted_answers: ['backtracking_reconstruction', 'lower_bound_search', 'patience_sorting'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['tails_array', 'position_array', 'dp_array', 'stack', 'segment_tree'],
          accepted_answers: ['tails_array', 'position_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'maintain_tails_with_binary_search',
            'record_position_for_each_element',
            'backtrack_from_end_to_reconstruct',
            'dp_O_n2_with_predecessor',
            'sort_and_scan',
          ],
          accepted_answers: ['maintain_tails_with_binary_search', 'record_position_for_each_element', 'backtrack_from_end_to_reconstruct'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_tails_and_pos', label: 'tails 배열과 pos 배열 초기화' },
          { id: 'iterate_elements', label: '수열의 각 원소를 순서대로 순회' },
          { id: 'binary_search_lower_bound', label: 'tails에서 lower_bound로 삽입 위치 탐색' },
          { id: 'update_tails', label: '해당 위치의 tails 값을 현재 원소로 갱신 (또는 끝에 추가)' },
          { id: 'record_position', label: '현재 원소의 LIS 위치(인덱스)를 pos에 기록' },
          { id: 'backtrack_reconstruct', label: 'pos를 뒤에서부터 순회하며 가장 큰 위치부터 역순으로 LIS 복원' },
          { id: 'reverse_and_output', label: '역순 결과를 뒤집어 출력' },
        ],
        correct_order: [
          'init_tails_and_pos',
          'iterate_elements',
          'binary_search_lower_bound',
          'update_tails',
          'record_position',
          'backtrack_reconstruct',
          'reverse_and_output',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'tails_is_not_actual_lis',
          'lower_bound_for_strict_increase',
          'backtrack_from_end_largest_pos_first',
          'negative_values_in_input',
          'all_same_values_lis_length_1',
          'single_element_lis_length_1',
        ],
        required_answers: ['tails_is_not_actual_lis', 'lower_bound_for_strict_increase', 'backtrack_from_end_largest_pos_first'],
        recommended_answers: ['negative_values_in_input', 'all_same_values_lis_length_1'],
        optional_answers: ['single_element_lis_length_1'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(N^2logN)'],
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
            'binary_search_per_element',
            'N_elements_processed',
            'tails_and_pos_arrays_size_N',
            'backtrack_is_O_N',
            'sorting_dominates',
          ],
          accepted_answers: ['binary_search_per_element', 'N_elements_processed', 'tails_and_pos_arrays_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'tails_binary_search',
        label: 'tails + 이분 탐색 + 위치 기록 역추적',
        pattern_analysis_answer: 'greedy_binary_search',
        required_strategy_tags: ['maintain_tails_with_binary_search', 'record_position_for_each_element', 'backtrack_from_end_to_reconstruct'],
      },
    ],

    common_mistakes: [
      {
        tag: 'tails_is_lis',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'tails_is_not_actual_lis' },
        ],
        feedback:
          'tails 배열은 "각 길이별 최소 마지막 원소"이지 실제 LIS가 아닙니다. 예: [3, 1, 2, 4]에서 tails는 [1, 2, 4]이지만 LIS는 [1, 2, 4] 또는 [3, 4] 등이 될 수 있습니다. 실제 수열 복원은 pos 배열을 통한 역추적이 필요합니다.',
      },
      {
        tag: 'upper_bound_instead',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'lower_bound_for_strict_increase' },
        ],
        feedback:
          '순증가(strictly increasing)이므로 같은 값은 대체해야 합니다. lower_bound를 사용해야 같은 값을 찾아 대체합니다. upper_bound를 사용하면 같은 값이 LIS에 중복 포함될 수 있습니다.',
      },
      {
        tag: 'wrong_backtrack',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'backtrack_from_end_largest_pos_first' },
        ],
        feedback:
          '역추적은 pos 배열을 뒤에서부터 순회하며, 현재 찾는 위치값과 일치하는 원소를 모아야 합니다. 앞에서부터 순회하거나 tails 배열을 직접 출력하면 오답입니다.',
      },
      {
        tag: 'dp_n2_tle',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dp_O_n2' },
        ],
        feedback:
          'O(N²) DP는 N=1,000,000에서 10^12 연산으로 시간 초과입니다. tails 배열 + 이분 탐색으로 O(N log N)에 해결해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'tails 배열을 유지하며 lower_bound로 삽입/갱신하고, pos 배열로 역추적하여 실제 LIS를 복원한다. O(N log N).',
      mentor_hint: '"tails가 LIS가 아닌 이유"를 명확히 설명할 수 있어야 한다. tails[i]는 길이 (i+1)인 증가 부분 수열의 최소 마지막 원소일 뿐이다.',
      pattern_trigger: '"LIS 길이 + 실제 수열"이 보이고 N이 크면 → tails + binary search + pos 역추적을 떠올려라.',
      why_it_works: 'tails 배열은 항상 정렬 상태를 유지하며, 각 원소를 lower_bound 위치에 넣으면 "같은 길이의 IS 중 마지막 원소가 가장 작은 것"을 유지한다. 이것이 이후 원소를 더 많이 붙일 수 있는 최적 조건을 보장한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 14501 — 퇴사
  // ──────────────────────────────────────────────────────
  {
    id: 'b014501-boj',
    title: '퇴사',
    difficulty: 'easy',
    domain: 'basic_dp',
    summary: '퇴사까지 N일 동안 상담 일정을 선택하여 최대 수익을 구하는 문제',
    tags: ['dynamic-programming', 'brute-force', 'scheduling'],
    input_type: 'pair_array',
    output_type: 'maximum_value',
    constraints: {
      each_day_has_duration_and_profit: true,
      consultation_must_finish_by_day_N: true,
      input_size_hint: '1 <= N <= 15',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['maximum_value', 'count', 'minimum_steps', 'boolean_existence', 'indices'],
          accepted_answers: ['maximum_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'pair_array_duration_and_profit',
            'scheduling_with_deadline',
            'small_N_brute_force_possible',
            'sorted_data',
            'single_array',
          ],
          accepted_answers: ['pair_array_duration_and_profit', 'scheduling_with_deadline', 'small_N_brute_force_possible'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'maximize_profit_from_scheduling_consultations',
            'select_non_overlapping_jobs_for_max_profit',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['brute_force', 'dp_backward', 'greedy', 'dfs', 'binary_search', 'bfs'],
          accepted_answers: ['dp_backward'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'choose_or_skip_each_day',
            'future_days_affect_optimal_choice',
            'overlapping_subproblems',
            'small_N_allows_brute_force_too',
            'locally_optimal_not_guaranteed',
          ],
          accepted_answers: ['choose_or_skip_each_day', 'future_days_affect_optimal_choice', 'overlapping_subproblems'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['brute_force_backup', 'forward_dp', 'greedy_approximation', 'memoization', 'interval_scheduling'],
          accepted_answers: ['brute_force_backup', 'forward_dp'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['dp_array', 'stack', 'queue', 'map', 'two_variables'],
          accepted_answers: ['dp_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'backward_dp_from_day_N',
            'dp_i_max_skip_or_take',
            'check_deadline_before_taking',
            'forward_dp_from_day_1',
            'greedy_highest_profit_first',
          ],
          accepted_answers: ['backward_dp_from_day_N', 'dp_i_max_skip_or_take', 'check_deadline_before_taking'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_dp_N_plus_1', label: 'dp[N+1] = 0으로 초기화 (퇴사 후 수익 0)' },
          { id: 'iterate_backward', label: 'i = N부터 1까지 역순으로 순회' },
          { id: 'check_feasibility', label: 'i + T[i] > N+1이면 상담 불가: dp[i] = dp[i+1]' },
          { id: 'take_or_skip', label: '상담 가능하면 dp[i] = max(dp[i+1], P[i] + dp[i + T[i]])' },
          { id: 'output_dp_1', label: 'dp[1] 출력' },
        ],
        correct_order: [
          'init_dp_N_plus_1',
          'iterate_backward',
          'check_feasibility',
          'take_or_skip',
          'output_dp_1',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'consultation_exceeds_deadline',
          'dp_base_case_N_plus_1_is_0',
          'backward_iteration_required',
          'greedy_not_optimal',
          'N_equals_1_single_day',
          'all_consultations_impossible',
        ],
        required_answers: ['consultation_exceeds_deadline', 'dp_base_case_N_plus_1_is_0', 'greedy_not_optimal'],
        recommended_answers: ['backward_iteration_required', 'all_consultations_impossible'],
        optional_answers: ['N_equals_1_single_day'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(2^N)', 'O(NlogN)'],
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
            'single_backward_pass',
            'constant_work_per_day',
            'dp_array_size_N',
            'brute_force_is_2_to_N',
            'sorting_dominates',
          ],
          accepted_answers: ['single_backward_pass', 'constant_work_per_day', 'dp_array_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'backward_dp',
        label: '역방향 DP: dp[i] = i일부터의 최대 수익',
        pattern_analysis_answer: 'dp_backward',
        required_strategy_tags: ['backward_dp_from_day_N', 'dp_i_max_skip_or_take', 'check_deadline_before_taking'],
      },
      {
        strategy_id: 'brute_force',
        label: '완전 탐색: 각 날 수행/미수행 2^N',
        pattern_analysis_answer: 'brute_force',
        required_strategy_tags: ['try_take_or_skip_each_day', 'check_deadline_constraint', 'recurse_from_day_1'],
      },
    ],

    common_mistakes: [
      {
        tag: 'greedy_highest_profit',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'greedy' },
        ],
        feedback:
          '수익이 높은 상담을 먼저 선택하는 그리디는 최적이 아닙니다. 예: 1일에 T=5, P=100이고 2~5일에 각 T=1, P=30이면, 그리디는 100을 선택하지만 실제 최적은 30*4 = 120입니다.',
      },
      {
        tag: 'miss_deadline_check',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'consultation_exceeds_deadline' },
        ],
        feedback:
          'i + T[i] > N+1이면 해당 상담은 퇴사일까지 끝나지 않아 수행할 수 없습니다. 이 조건을 체크하지 않으면 퇴사 후까지 일하는 상담을 포함하게 되어 오답입니다.',
      },
      {
        tag: 'forward_dp_confusion',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'backward_dp_from_day_N' },
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'forward_dp_from_day_1' },
        ],
        feedback:
          '역방향 DP(dp[N+1]=0에서 시작)가 가장 직관적입니다. 순방향 DP도 가능하지만, "i일에 상담을 수행하면 i+T[i]일로 점프"하는 전이를 정확히 구현해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i] = max(dp[i+1], P[i] + dp[i+T[i]]). 역방향으로 채우면 "이 날 상담을 하면 며칠 후부터 다시 시작"이 자연스럽다.',
      mentor_hint: 'N이 15 이하이므로 완전 탐색(2^15 = 32768)도 가능하지만, DP로 O(N)에 풀 수 있음을 보여라. 면접에서는 두 접근법 모두 설명할 수 있어야 한다.',
      pattern_trigger: '"각 날 작업을 수행/건너뛰기 선택, 수행 시 며칠간 다른 작업 불가"가 보이면 → 역방향 DP를 떠올려라.',
      why_it_works: 'dp[i]는 i일부터 마지막 날까지의 최대 수익이다. i일 상담을 수행하면 다음 선택 가능일은 i+T[i]이고, 건너뛰면 i+1이다. 두 경우의 max가 최적을 보장한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 13398 — 연속합 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b013398-boj',
    title: '연속합 2',
    difficulty: 'medium',
    domain: 'kadane_variant',
    summary: '수열에서 최대 하나의 원소를 제거할 수 있을 때 최대 연속합을 구하는 문제',
    tags: ['dynamic-programming', 'kadane', 'array'],
    input_type: 'integer_array',
    output_type: 'maximum_value',
    constraints: {
      can_remove_at_most_one: true,
      must_select_at_least_one: true,
      input_size_hint: '1 <= n <= 100000',
      value_range: '-1000 <= a[i] <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['maximum_sum', 'count', 'minimum_steps', 'boolean_existence', 'indices'],
          accepted_answers: ['maximum_sum'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array_with_negatives',
            'contiguous_subarray',
            'optional_one_removal',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['integer_array_with_negatives', 'contiguous_subarray', 'optional_one_removal'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'max_contiguous_sum_with_optional_deletion',
            'kadane_with_one_skip_allowed',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['kadane_extended', 'brute_force', 'prefix_suffix', 'greedy', 'divide_and_conquer', 'dp_2d_state'],
          accepted_answers: ['kadane_extended'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'extends_basic_kadane_with_state',
            'two_states_deleted_or_not',
            'overlapping_subproblems',
            'locally_optimal_not_guaranteed',
            'need_shortest_path',
          ],
          accepted_answers: ['extends_basic_kadane_with_state', 'two_states_deleted_or_not', 'overlapping_subproblems'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['prefix_suffix_max', 'space_optimization', 'rolling_variables', 'memoization', 'segment_tree'],
          accepted_answers: ['prefix_suffix_max', 'space_optimization', 'rolling_variables'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['four_variables', 'two_arrays', 'prefix_suffix_arrays', 'dp_array', 'segment_tree'],
          accepted_answers: ['four_variables'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'track_no_delete_and_one_delete',
            'no_del_is_standard_kadane',
            'with_del_skip_current_or_extend',
            'try_removing_each_element',
            'prefix_max_plus_suffix_max',
          ],
          accepted_answers: ['track_no_delete_and_one_delete', 'no_del_is_standard_kadane', 'with_del_skip_current_or_extend'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_states', label: 'no_del = a[0], with_del = -INF, answer = a[0]으로 초기화' },
          { id: 'iterate_from_1', label: 'i = 1부터 n-1까지 순회' },
          { id: 'update_with_del', label: 'with_del = max(no_del, with_del + a[i]) — a[i]를 제거하거나, 이전 제거를 이어감' },
          { id: 'update_no_del', label: 'no_del = max(a[i], no_del + a[i]) — 기본 Kadane' },
          { id: 'update_answer', label: 'answer = max(answer, no_del, with_del)' },
          { id: 'output_answer', label: 'answer 출력' },
        ],
        correct_order: [
          'init_states',
          'iterate_from_1',
          'update_with_del',
          'update_no_del',
          'update_answer',
          'output_answer',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'update_with_del_before_no_del',
          'all_negative_pick_largest',
          'with_del_uses_old_no_del',
          'deletion_is_optional',
          'single_element_no_deletion',
          'n_equals_1_answer_is_a0',
        ],
        required_answers: ['update_with_del_before_no_del', 'all_negative_pick_largest', 'with_del_uses_old_no_del'],
        recommended_answers: ['deletion_is_optional', 'single_element_no_deletion'],
        optional_answers: ['n_equals_1_answer_is_a0'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(n)', 'O(nlogn)', 'O(n^2)', 'O(2^n)'],
          accepted_answers: ['O(n)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(n)', 'O(n^2)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'single_pass_through_array',
            'constant_variables_only',
            'no_auxiliary_array',
            'two_state_variables',
            'sorting_dominates',
          ],
          accepted_answers: ['single_pass_through_array', 'constant_variables_only', 'two_state_variables'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'kadane_two_state',
        label: '상태 확장 Kadane: no_del / with_del',
        pattern_analysis_answer: 'kadane_extended',
        required_strategy_tags: ['track_no_delete_and_one_delete', 'no_del_is_standard_kadane', 'with_del_skip_current_or_extend'],
      },
      {
        strategy_id: 'prefix_suffix',
        label: 'prefix max + suffix max 합산',
        pattern_analysis_answer: 'prefix_suffix',
        required_strategy_tags: ['prefix_max_plus_suffix_max'],
      },
    ],

    common_mistakes: [
      {
        tag: 'update_order_wrong',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'update_with_del_before_no_del' },
        ],
        feedback:
          'with_del 갱신 시 이전 no_del 값이 필요합니다(현재 원소를 제거하는 경우). no_del을 먼저 갱신하면 이전 값이 사라져 with_del이 잘못 계산됩니다. 반드시 with_del → no_del 순서로 갱신하세요.',
      },
      {
        tag: 'miss_all_negative',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'all_negative_pick_largest' },
        ],
        feedback:
          '모든 원소가 음수인 경우에도 최소 하나는 선택해야 합니다. 이때 답은 가장 큰 음수입니다. with_del을 -INF로 초기화하고, 답에서 no_del도 고려해야 이 경우를 올바르게 처리합니다.',
      },
      {
        tag: 'remove_each_kadane',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'try_removing_each_element' },
        ],
        feedback:
          '각 원소를 제거하고 Kadane를 돌리면 O(n²)입니다. n=100,000에서 10^10 연산으로 시간 초과입니다. 상태 확장 Kadane로 O(n)에 해결하세요.',
      },
      {
        tag: 'miss_with_del_transition',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'with_del_uses_old_no_del' },
        ],
        feedback:
          'with_del = max(no_del_old, with_del + a[i])에서 no_del_old는 "현재 a[i]를 제거한다"는 의미입니다. 즉, a[i]는 포함하지 않지만 연속 구간은 유지됩니다. 이 전이를 이해하는 것이 이 문제의 핵심입니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'Kadane에 "제거 여부" 상태를 추가. no_del = max(a[i], no_del+a[i]), with_del = max(no_del_old, with_del+a[i]).',
      mentor_hint: 'with_del 전이에서 no_del_old는 "a[i]를 건너뛴다"는 의미다. a[i]를 빼는 것이 아니라 포함하지 않는 것이다. 이 미묘한 차이를 정확히 설명하라.',
      pattern_trigger: '"최대 연속합 + 최대 k개 원소 제거 허용"이 보이면 → Kadane에 제거 상태를 추가한 확장 DP를 떠올려라.',
      why_it_works: '각 위치에서 "아직 제거 안 함"과 "이미 1개 제거함" 두 상태를 유지하면, 모든 가능한 연속 구간과 제거 조합을 O(n)에 탐색할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11049 — 행렬 곱셈 순서
  // ──────────────────────────────────────────────────────
  {
    id: 'b011049-boj',
    title: '행렬 곱셈 순서',
    difficulty: 'hard',
    domain: 'interval_dp',
    summary: 'N개의 행렬을 곱하는 순서를 최적화하여 연산 횟수를 최소화하는 구간 DP 문제',
    tags: ['dynamic-programming', 'interval-dp', 'matrix-chain'],
    input_type: 'pair_array',
    output_type: 'minimum_value',
    constraints: {
      matrix_multiplication_cost: 'N * M * K',
      multiplication_is_associative: true,
      input_size_hint: '1 <= N <= 500',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_value', 'count', 'maximum_sum', 'boolean_existence', 'indices'],
          accepted_answers: ['minimum_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'sequence_of_matrix_dimensions',
            'order_matters_for_cost',
            'associative_operation',
            'sorted_data',
            'single_array',
          ],
          accepted_answers: ['sequence_of_matrix_dimensions', 'order_matters_for_cost', 'associative_operation'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimize_matrix_chain_multiplication_cost',
            'optimal_parenthesization_of_matrix_product',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['interval_dp', 'greedy', 'divide_and_conquer', 'dp_bottom_up', 'brute_force', 'binary_search'],
          accepted_answers: ['interval_dp'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'split_point_divides_into_subproblems',
            'overlapping_subproblems',
            'optimal_substructure_on_intervals',
            'need_to_try_all_split_points',
            'locally_optimal_not_guaranteed',
          ],
          accepted_answers: ['split_point_divides_into_subproblems', 'overlapping_subproblems', 'optimal_substructure_on_intervals', 'need_to_try_all_split_points'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bottom_up_by_interval_length', 'memoization', 'knuth_optimization', 'divide_and_conquer', 'greedy_approximation'],
          accepted_answers: ['bottom_up_by_interval_length', 'memoization'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_array', 'dimension_arrays', 'stack', 'map', 'dp_array'],
          accepted_answers: ['2d_array', 'dimension_arrays'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'iterate_by_interval_length',
            'try_all_split_points',
            'cost_is_r_i_times_c_k_times_c_j',
            'greedy_smallest_matrix_first',
            'left_to_right_sequential',
          ],
          accepted_answers: ['iterate_by_interval_length', 'try_all_split_points', 'cost_is_r_i_times_c_k_times_c_j'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_dimensions', label: '행렬 크기 배열 r[], c[] 입력' },
          { id: 'init_dp_diagonal', label: 'dp[i][i] = 0으로 초기화 (단일 행렬은 비용 0)' },
          { id: 'iterate_interval_length', label: '구간 길이 len = 2부터 N까지 순회' },
          { id: 'iterate_start', label: '시작점 i를 순회 (j = i + len - 1)' },
          { id: 'try_split_points', label: 'k = i ~ j-1 모든 분할점에 대해 dp[i][k] + dp[k+1][j] + r[i]*c[k]*c[j] 계산' },
          { id: 'take_minimum', label: 'dp[i][j] = 모든 분할점 중 최솟값' },
          { id: 'output_dp_0_N', label: 'dp[0][N-1] 출력' },
        ],
        correct_order: [
          'read_dimensions',
          'init_dp_diagonal',
          'iterate_interval_length',
          'iterate_start',
          'try_split_points',
          'take_minimum',
          'output_dp_0_N',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'single_matrix_cost_is_0',
          'fill_order_short_intervals_first',
          'cost_formula_three_dimensions',
          'N_500_cubed_is_1_25e8',
          'greedy_order_is_not_optimal',
          'N_equals_1_answer_is_0',
        ],
        required_answers: ['single_matrix_cost_is_0', 'fill_order_short_intervals_first', 'cost_formula_three_dimensions'],
        recommended_answers: ['N_500_cubed_is_1_25e8', 'greedy_order_is_not_optimal'],
        optional_answers: ['N_equals_1_answer_is_0'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^2)', 'O(N^3)', 'O(N^2logN)', 'O(2^N)'],
          accepted_answers: ['O(N^3)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(N^3)'],
          accepted_answers: ['O(N^2)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'three_nested_loops',
            'interval_start_end_split',
            'dp_table_N_by_N',
            'constant_work_per_split',
            'catalan_number_without_dp',
          ],
          accepted_answers: ['three_nested_loops', 'interval_start_end_split', 'dp_table_N_by_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'interval_dp',
        label: '구간 DP: 짧은 구간부터 채우며 모든 분할점 시도',
        pattern_analysis_answer: 'interval_dp',
        required_strategy_tags: ['iterate_by_interval_length', 'try_all_split_points', 'cost_is_r_i_times_c_k_times_c_j'],
      },
    ],

    common_mistakes: [
      {
        tag: 'greedy_order',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'greedy' },
        ],
        feedback:
          '작은 행렬부터 곱하거나 순서대로 곱하는 그리디는 최적이 아닙니다. 예: (10x30), (30x5), (5x60)에서 왼→오 순서는 10*30*5 + 10*5*60 = 4500이지만, 오→왼은 30*5*60 + 10*30*60 = 27000입니다.',
      },
      {
        tag: 'wrong_fill_order',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'fill_order_short_intervals_first' },
        ],
        feedback:
          '구간 길이가 짧은 것부터 채워야 dp[i][k]와 dp[k+1][j]가 이미 계산된 상태입니다. 큰 구간부터 채우면 아직 계산되지 않은 하위 문제를 참조하게 됩니다.',
      },
      {
        tag: 'wrong_cost_formula',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'cost_formula_three_dimensions' },
        ],
        feedback:
          '분할점 k에서의 결합 비용은 r[i] * c[k] * c[j]입니다 (행렬 i의 행 수 × 분할점 행렬의 열 수 × 행렬 j의 열 수). 이 세 값의 곱을 잘못 지정하면 전체 결과가 틀립니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[i][j] = min_k(dp[i][k] + dp[k+1][j] + r[i]*c[k]*c[j]). 구간 길이를 점점 늘려가며 채우는 전형적 구간 DP.',
      mentor_hint: '구간 DP의 핵심은 "어디서 자르느냐"이다. 모든 분할점을 시도하고, 하위 문제가 이미 풀려 있도록 짧은 구간부터 채워야 한다.',
      pattern_trigger: '"연속된 원소들을 합치는 순서에 따라 비용이 달라지고, 최소 비용을 구하라"가 보이면 → 구간 DP를 떠올려라.',
      why_it_works: '행렬 i~j를 어떤 분할점 k에서 나누든, (i~k)과 (k+1~j)는 독립적인 하위 문제이다. 모든 분할점의 최솟값이 전체 최적이 된다는 최적 부분 구조가 성립한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2342 — Dance Dance Revolution
  // ──────────────────────────────────────────────────────
  {
    id: 'b002342-boj',
    title: 'Dance Dance Revolution',
    difficulty: 'hard',
    domain: 'state_dp',
    summary: 'DDR 발판 이동의 최소 비용을 구하는 3차원 상태 DP 문제',
    tags: ['dynamic-programming', '3d-state', 'game'],
    input_type: 'integer_sequence',
    output_type: 'minimum_value',
    constraints: {
      five_positions: '0(center), 1(up), 2(left), 3(down), 4(right)',
      no_same_position_both_feet: true,
      movement_costs_vary: true,
      input_size_hint: '명령 수 <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_value', 'count', 'maximum_sum', 'boolean_existence', 'indices'],
          accepted_answers: ['minimum_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'sequence_of_commands',
            'two_feet_state_tracking',
            'movement_cost_depends_on_position',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['sequence_of_commands', 'two_feet_state_tracking', 'movement_cost_depends_on_position'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimize_total_movement_cost_on_ddr_pad',
            'optimal_foot_assignment_for_step_sequence',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dp_state_tracking', 'greedy', 'bfs', 'brute_force', 'binary_search', 'simulation'],
          accepted_answers: ['dp_state_tracking'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'state_is_both_feet_positions',
            'future_commands_affect_optimal_choice',
            'overlapping_subproblems',
            'greedy_nearest_foot_not_optimal',
            'manageable_state_space_5x5',
          ],
          accepted_answers: ['state_is_both_feet_positions', 'future_commands_affect_optimal_choice', 'overlapping_subproblems', 'manageable_state_space_5x5'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['rolling_array', 'cost_function_design', 'state_compression', 'memoization', 'greedy_approximation'],
          accepted_answers: ['rolling_array', 'cost_function_design'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_array_5x5', '3d_array', 'map', 'priority_queue', 'dp_array'],
          accepted_answers: ['2d_array_5x5'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp_left_right_foot_positions',
            'try_move_left_or_right_foot',
            'rolling_dp_current_and_next',
            'precompute_movement_cost',
            'greedy_closer_foot',
          ],
          accepted_answers: ['dp_left_right_foot_positions', 'try_move_left_or_right_foot', 'rolling_dp_current_and_next', 'precompute_movement_cost'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'define_cost_function', label: '이동 비용 함수 정의: 같은 위치 1, 가운데↔다른 2, 인접 3, 반대 4' },
          { id: 'init_dp_0_0', label: 'dp[0][0] = 0 (양발 가운데), 나머지 INF' },
          { id: 'iterate_commands', label: '각 명령 target을 순서대로 처리' },
          { id: 'try_move_left', label: '왼발을 target으로 이동: dp_next[target][r] = min(dp[l][r] + cost(l, target))' },
          { id: 'try_move_right', label: '오른발을 target으로 이동: dp_next[l][target] = min(dp[l][r] + cost(r, target))' },
          { id: 'swap_dp', label: 'dp = dp_next, dp_next 초기화' },
          { id: 'find_min', label: '모든 dp[l][r] 중 최솟값 출력' },
        ],
        correct_order: [
          'define_cost_function',
          'init_dp_0_0',
          'iterate_commands',
          'try_move_left',
          'try_move_right',
          'swap_dp',
          'find_min',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'cost_function_adjacent_vs_opposite',
          'both_feet_start_at_center',
          'same_position_both_feet_invalid',
          'greedy_nearest_foot_fails',
          'rolling_dp_saves_memory',
          'initial_center_has_special_cost',
        ],
        required_answers: ['cost_function_adjacent_vs_opposite', 'both_feet_start_at_center', 'same_position_both_feet_invalid'],
        recommended_answers: ['greedy_nearest_foot_fails', 'initial_center_has_special_cost'],
        optional_answers: ['rolling_dp_saves_memory'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(N * 25)', 'O(N * 125)', 'O(N^2)'],
          accepted_answers: ['O(N * 25)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(25)', 'O(N * 25)', 'O(N)'],
          accepted_answers: ['O(25)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'N_commands_processed',
            '5x5_states_per_command',
            'rolling_two_layers_only',
            'constant_transitions_per_state',
            'full_3d_table_unnecessary',
          ],
          accepted_answers: ['N_commands_processed', '5x5_states_per_command', 'rolling_two_layers_only', 'constant_transitions_per_state'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_feet_positions',
        label: 'dp[왼발][오른발] 롤링 DP',
        pattern_analysis_answer: 'dp_state_tracking',
        required_strategy_tags: ['dp_left_right_foot_positions', 'try_move_left_or_right_foot', 'rolling_dp_current_and_next'],
      },
    ],

    common_mistakes: [
      {
        tag: 'greedy_nearest',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'greedy' },
        ],
        feedback:
          '가까운 발을 이동하는 그리디는 최적이 아닙니다. 현재는 먼 발을 보내는 것이 미래 명령에서 더 유리할 수 있습니다. 예: 명령이 [1, 3, 1, 3]이면 왼발=1, 오른발=3으로 고정하는 것이 최적이지만, 그리디는 매번 가까운 발을 이동합니다.',
      },
      {
        tag: 'wrong_cost_adjacent_opposite',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'cost_function_adjacent_vs_opposite' },
        ],
        feedback:
          '인접(3)과 반대(4)를 혼동하면 전체 결과가 틀립니다. 위(1)↔아래(3), 왼쪽(2)↔오른쪽(4)이 반대 위치이고 비용은 4입니다. |a - b| == 2이면 반대, 그 외는 인접(비용 3)입니다.',
      },
      {
        tag: 'miss_same_position_rule',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'same_position_both_feet_invalid' },
        ],
        feedback:
          '두 발이 같은 위치(가운데 제외)에 올 수 없습니다. dp 전이 시 왼발과 오른발이 같은 비-센터 위치에 오는 경우를 제외해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[l][r] = 양발이 l, r에 있을 때의 최소 비용. 각 명령마다 왼발 또는 오른발을 이동하는 두 전이를 시도.',
      mentor_hint: '비용 함수를 정확히 구현하는 것이 핵심이다. 같은 위치 1, 가운데↔ 2, 인접 3, 반대 4. |a-b| == 2이면 반대라는 규칙을 외워라.',
      pattern_trigger: '"두 개의 에이전트(손, 발 등)가 각각 위치를 가지고, 각 이벤트에서 하나를 이동"이 보이면 → dp[agent1_pos][agent2_pos] 상태 DP를 떠올려라.',
      why_it_works: '각 명령에서의 최적 선택은 이후 명령에 의존하므로 그리디가 불가하다. 두 발의 위치 조합(5×5=25)이 상태이고, 각 상태에서 전이가 2개뿐이므로 O(25N)에 최적해를 구할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2098 — 외판원 순회
  // ──────────────────────────────────────────────────────
  {
    id: 'b002098-boj',
    title: '외판원 순회',
    difficulty: 'hard',
    domain: 'bitmask_dp',
    summary: '비트마스크 DP로 TSP(외판원 순회 문제)의 최소 비용을 구하는 문제',
    tags: ['dynamic-programming', 'bitmask', 'graph', 'tsp'],
    input_type: 'adjacency_matrix',
    output_type: 'minimum_value',
    constraints: {
      visit_all_cities_exactly_once: true,
      return_to_start: true,
      zero_means_no_path: true,
      input_size_hint: '2 <= N <= 16',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_value', 'count', 'maximum_sum', 'boolean_existence', 'shortest_path'],
          accepted_answers: ['minimum_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'complete_weighted_graph',
            'visit_all_nodes_once',
            'return_to_origin',
            'some_edges_unavailable',
            'sorted_data',
          ],
          accepted_answers: ['complete_weighted_graph', 'visit_all_nodes_once', 'return_to_origin', 'some_edges_unavailable'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'traveling_salesman_minimum_cost_cycle',
            'visit_all_cities_and_return_minimum_cost',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bitmask_dp', 'greedy', 'brute_force_permutation', 'bfs', 'dp_bottom_up', 'mst_approximation'],
          accepted_answers: ['bitmask_dp'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'visited_set_as_bitmask',
            'N_small_enough_for_2N_states',
            'overlapping_subproblems_same_visited_set',
            'N_factorial_too_large',
            'greedy_nearest_not_optimal',
          ],
          accepted_answers: ['visited_set_as_bitmask', 'N_small_enough_for_2N_states', 'overlapping_subproblems_same_visited_set', 'N_factorial_too_large'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['graph_traversal', 'memoization', 'state_compression', 'permutation_enumeration', 'branch_and_bound'],
          accepted_answers: ['state_compression', 'memoization'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_array_2N_by_N', 'cost_matrix', 'adjacency_list', 'priority_queue', 'stack'],
          accepted_answers: ['2d_array_2N_by_N', 'cost_matrix'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp_mask_current_city',
            'transition_to_unvisited_neighbor',
            'fix_start_city_to_0',
            'add_return_cost_at_end',
            'nearest_neighbor_heuristic',
          ],
          accepted_answers: ['dp_mask_current_city', 'transition_to_unvisited_neighbor', 'fix_start_city_to_0', 'add_return_cost_at_end'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_dp', label: 'dp 테이블을 INF로 초기화, dp[1<<0][0] = 0 (0번 도시에서 시작)' },
          { id: 'iterate_masks', label: '모든 mask를 0부터 (1<<N)-1까지 순회' },
          { id: 'iterate_current', label: '현재 도시 i를 순회 (mask에 i가 포함된 경우만)' },
          { id: 'try_next_city', label: '미방문 도시 j에 대해 cost[i][j] > 0이면 전이' },
          { id: 'update_dp', label: 'dp[mask|(1<<j)][j] = min(dp[mask][i] + cost[i][j])' },
          { id: 'add_return', label: '모든 도시 방문 후: answer = min(dp[(1<<N)-1][i] + cost[i][0])' },
        ],
        correct_order: [
          'init_dp',
          'iterate_masks',
          'iterate_current',
          'try_next_city',
          'update_dp',
          'add_return',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'zero_cost_means_no_edge',
          'return_to_start_cost_included',
          'start_city_can_be_fixed',
          'impossible_tour_check',
          'dp_init_all_INF_except_start',
          'asymmetric_costs_possible',
        ],
        required_answers: ['zero_cost_means_no_edge', 'return_to_start_cost_included', 'start_city_can_be_fixed'],
        recommended_answers: ['dp_init_all_INF_except_start', 'impossible_tour_check'],
        optional_answers: ['asymmetric_costs_possible'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N!)', 'O(2^N * N^2)', 'O(2^N * N)', 'O(N^3)'],
          accepted_answers: ['O(2^N * N^2)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N^2)', 'O(2^N * N)', 'O(N!)'],
          accepted_answers: ['O(2^N * N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            '2_to_N_possible_masks',
            'N_cities_per_mask',
            'N_transitions_per_state',
            'dp_table_2N_times_N',
            'permutation_is_N_factorial',
          ],
          accepted_answers: ['2_to_N_possible_masks', 'N_cities_per_mask', 'N_transitions_per_state', 'dp_table_2N_times_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'bitmask_dp',
        label: '비트마스크 DP: dp[방문집합][현재도시]',
        pattern_analysis_answer: 'bitmask_dp',
        required_strategy_tags: ['dp_mask_current_city', 'transition_to_unvisited_neighbor', 'fix_start_city_to_0', 'add_return_cost_at_end'],
      },
    ],

    common_mistakes: [
      {
        tag: 'greedy_nearest',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'greedy' },
        ],
        feedback:
          '최근접 이웃 휴리스틱(가장 가까운 미방문 도시로 이동)은 근사 해만 제공합니다. 최적 경로와 크게 다를 수 있습니다. N이 16 이하이므로 비트마스크 DP로 정확한 최적해를 구할 수 있습니다.',
      },
      {
        tag: 'miss_return_cost',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'return_to_start_cost_included' },
        ],
        feedback:
          '모든 도시를 방문한 후 시작 도시로 돌아오는 비용을 포함해야 합니다. dp[(1<<N)-1][i]에 cost[i][0]을 더한 값의 최솟값이 답입니다.',
      },
      {
        tag: 'miss_zero_is_no_edge',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'zero_cost_means_no_edge' },
        ],
        feedback:
          'cost[i][j] = 0은 비용이 0이 아니라 "이동 불가"를 의미합니다. 전이 시 cost > 0인 경우만 처리해야 합니다. 0을 유효한 비용으로 처리하면 존재하지 않는 경로를 사용합니다.',
      },
      {
        tag: 'try_all_starts',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'start_city_can_be_fixed' },
        ],
        feedback:
          '순회(cycle)이므로 어떤 도시에서 시작해도 같은 순회 비용입니다. 시작 도시를 0번으로 고정하면 불필요한 반복을 줄일 수 있습니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[mask][i] = mask에 포함된 도시를 방문하고 i에 있을 때의 최소 비용. 시작점으로의 복귀 비용을 마지막에 더한다.',
      mentor_hint: '비트마스크 DP의 전형적 패턴이다. "방문 집합"을 비트로 표현하는 아이디어가 핵심. N <= 16이면 2^16 = 65536개 상태로 충분히 처리 가능하다.',
      pattern_trigger: '"모든 노드를 정확히 한 번 방문하는 최소 비용 경로"가 보이고 N <= 20이면 → 비트마스크 DP를 떠올려라.',
      why_it_works: '같은 방문 집합 + 같은 현재 도시인 상태들은 앞으로의 최적 선택이 동일하다. 이 중복을 비트마스크로 압축하면 N!에서 2^N * N으로 상태 수가 줄어든다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1328 — 고층 빌딩
  // ──────────────────────────────────────────────────────
  {
    id: 'b001328-boj',
    title: '고층 빌딩',
    difficulty: 'hard',
    domain: 'combinatorial_dp',
    summary: '왼쪽에서 L개, 오른쪽에서 R개가 보이는 N개 빌딩 배치의 수를 구하는 3D DP 문제',
    tags: ['dynamic-programming', 'combinatorics', 'math', '3d-state'],
    input_type: 'three_integers',
    output_type: 'count_mod',
    constraints: {
      all_heights_distinct: true,
      left_visible_L: true,
      right_visible_R: true,
      mod_1000000007: true,
      input_size_hint: '1 <= N <= 100, 1 <= L, R <= N',
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
            'three_parameters_N_L_R',
            'permutation_counting',
            'visibility_constraint',
            'sorted_data',
            'single_array',
          ],
          accepted_answers: ['three_parameters_N_L_R', 'permutation_counting', 'visibility_constraint'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_permutations_with_L_left_R_right_visible',
            'building_arrangement_visibility_counting',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dp_3d_state', 'brute_force', 'greedy', 'combinatorics_formula', 'inclusion_exclusion', 'divide_and_conquer'],
          accepted_answers: ['dp_3d_state'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'insert_smallest_first_key_insight',
            'three_parameters_define_state',
            'overlapping_subproblems',
            'no_closed_form_known',
            'counting_with_multiple_constraints',
          ],
          accepted_answers: ['insert_smallest_first_key_insight', 'three_parameters_define_state', 'overlapping_subproblems', 'counting_with_multiple_constraints'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['stirling_numbers_connection', 'modular_arithmetic', 'insertion_based_counting', 'memoization', 'prefix_sum'],
          accepted_answers: ['stirling_numbers_connection', 'modular_arithmetic', 'insertion_based_counting'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['3d_array', '2d_array', 'map', 'stack', 'dp_array'],
          accepted_answers: ['3d_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'insert_smallest_building_first',
            'three_insertion_positions',
            'leftmost_increases_left_visible',
            'rightmost_increases_right_visible',
            'middle_positions_hidden',
          ],
          accepted_answers: ['insert_smallest_building_first', 'three_insertion_positions', 'leftmost_increases_left_visible', 'rightmost_increases_right_visible', 'middle_positions_hidden'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_base', label: 'dp[1][1][1] = 1 (빌딩 1개는 양쪽에서 1개 보임)' },
          { id: 'iterate_n', label: 'n = 2부터 N까지 순회' },
          { id: 'iterate_l_r', label: 'l = 1~n, r = 1~n 순회' },
          { id: 'transition_left', label: '맨 왼쪽 삽입: dp[n-1][l-1][r] (왼쪽 보이는 수 +1)' },
          { id: 'transition_right', label: '맨 오른쪽 삽입: dp[n-1][l][r-1] (오른쪽 보이는 수 +1)' },
          { id: 'transition_middle', label: '가운데 (n-2)곳 삽입: (n-2) * dp[n-1][l][r] (보이는 수 변화 없음)' },
          { id: 'sum_and_mod', label: '세 값을 합하고 mod 10^9+7 적용' },
          { id: 'output_result', label: 'dp[N][L][R] 출력' },
        ],
        correct_order: [
          'init_base',
          'iterate_n',
          'iterate_l_r',
          'transition_left',
          'transition_right',
          'transition_middle',
          'sum_and_mod',
          'output_result',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'insert_smallest_not_largest',
          'middle_positions_count_is_n_minus_2',
          'base_case_dp_1_1_1_equals_1',
          'mod_on_multiplication_overflow',
          'L_plus_R_greater_than_N_plus_1_impossible',
          'L_or_R_equals_N_only_sorted',
        ],
        required_answers: ['insert_smallest_not_largest', 'middle_positions_count_is_n_minus_2', 'base_case_dp_1_1_1_equals_1'],
        recommended_answers: ['mod_on_multiplication_overflow', 'L_plus_R_greater_than_N_plus_1_impossible'],
        optional_answers: ['L_or_R_equals_N_only_sorted'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N * L * R)', 'O(N^3)', 'O(N!)', 'O(2^N)'],
          accepted_answers: ['O(N * L * R)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N * L * R)', 'O(L * R)', 'O(N^2)'],
          accepted_answers: ['O(N * L * R)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'three_nested_loops_N_L_R',
            'constant_work_per_state',
            '3d_dp_table',
            'can_optimize_to_2d_rolling',
            'N_factorial_without_dp',
          ],
          accepted_answers: ['three_nested_loops_N_L_R', 'constant_work_per_state', '3d_dp_table'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_insert_smallest',
        label: '가장 작은 빌딩부터 삽입하는 3D DP',
        pattern_analysis_answer: 'dp_3d_state',
        required_strategy_tags: ['insert_smallest_building_first', 'three_insertion_positions'],
      },
    ],

    common_mistakes: [
      {
        tag: 'insert_largest_first',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'insert_smallest_not_largest' },
        ],
        feedback:
          '가장 큰 빌딩부터 배치하면 어디에 놓느냐에 따라 양쪽 시야가 복잡하게 변합니다. 가장 작은 빌딩부터 삽입하면 기존 빌딩에 가려지므로 시야에 영향을 주지 않습니다. 이것이 점화식을 단순하게 만드는 핵심 발상입니다.',
      },
      {
        tag: 'wrong_middle_count',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'middle_positions_count_is_n_minus_2' },
        ],
        feedback:
          'n번째 빌딩의 삽입 위치는 총 n곳입니다. 맨 왼쪽 1곳, 맨 오른쪽 1곳을 제외하면 가운데는 (n-2)곳입니다. (n-1)로 계산하면 양쪽을 중복으로 빼거나 덜 빼게 됩니다.',
      },
      {
        tag: 'mod_overflow',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'mod_on_multiplication_overflow' },
        ],
        feedback:
          '(n-2) * dp[n-1][l][r]에서 n-2 최대 98, dp 값은 최대 10^9+6이므로 곱이 약 10^11에 달할 수 있습니다. 64비트 정수를 사용하거나 곱셈 전후로 mod를 적용해야 합니다.',
      },
      {
        tag: 'independent_left_right',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'three_insertion_positions' },
        ],
        feedback:
          '왼쪽과 오른쪽 시야를 독립적으로 계산할 수 없습니다. 가운데 빌딩이 양쪽 시야에 동시에 영향을 주므로 반드시 l과 r을 함께 상태로 관리해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[n][l][r] = dp[n-1][l-1][r] + dp[n-1][l][r-1] + (n-2)*dp[n-1][l][r]. 가장 작은 빌딩부터 삽입하는 것이 핵심 발상.',
      mentor_hint: '"왜 가장 작은 것부터 삽입하는가?"를 설명할 수 있어야 한다. 가장 작은 빌딩은 어디에 넣어도 기존 빌딩에 가려지므로, 삽입 위치에 따른 시야 변화를 3가지(왼쪽/오른쪽/가운데)로 단순화할 수 있다.',
      pattern_trigger: '"순열 배치에서 특정 조건(보이는 개수 등)을 만족하는 경우의 수"가 보이면 → 작은 것부터 삽입하는 DP를 떠올려라.',
      why_it_works: '높이 1인 빌딩은 어디에 삽입해도 다른 빌딩에 가려진다. 맨 왼쪽이면 왼쪽 시야만 +1, 맨 오른쪽이면 오른쪽 시야만 +1, 나머지 (n-2)곳이면 시야 변화 없음. 이 세 경우가 점화식을 완전히 결정한다.',
    },
  },
];
