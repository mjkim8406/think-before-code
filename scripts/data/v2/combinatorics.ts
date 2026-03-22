import type { ProblemV2 } from '../types';

export const COMBINATORICS_V2: ProblemV2[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1010 — 다리 놓기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001010-boj',
    title: '다리 놓기',
    difficulty: 'easy',
    domain: 'combination',
    summary: '서쪽 N개, 동쪽 M개 사이트에서 교차하지 않게 다리를 놓는 경우의 수(조합 C(M,N))를 구하는 문제',
    tags: ['combinatorics', 'math', 'dynamic-programming'],
    input_type: 'two_integers',
    output_type: 'count',
    constraints: {
      no_crossing_bridges: true,
      N_le_M: true,
      input_size_hint: '0 < N <= M < 30',
      multiple_test_cases: true,
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_cost', 'maximum_sum', 'boolean_existence', 'indices'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'two_sets_of_sites',
            'no_crossing_constraint',
            'selection_from_M_choose_N',
            'sorted_data',
            'graph_like_relation',
          ],
          accepted_answers: ['two_sets_of_sites', 'no_crossing_constraint', 'selection_from_M_choose_N'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_non_crossing_bridge_connections',
            'combination_C_M_N',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['combination', 'permutation', 'dp_bottom_up', 'greedy', 'brute_force', 'graph_matching'],
          accepted_answers: ['combination'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'order_fixed_by_no_crossing',
            'choosing_N_from_M',
            'counting_problem',
            'need_shortest_path',
            'locally_optimal_not_guaranteed',
          ],
          accepted_answers: ['order_fixed_by_no_crossing', 'choosing_N_from_M', 'counting_problem'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['pascal_triangle_dp', 'factorial_computation', 'memoization', 'modular_arithmetic', 'graph_traversal'],
          accepted_answers: ['pascal_triangle_dp', 'factorial_computation'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_array', 'factorial_array', 'map', 'stack', 'dp_array'],
          accepted_answers: ['2d_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'pascal_triangle_recurrence',
            'factorial_division',
            'recursive_with_memo',
            'brute_force_enumeration',
            'modular_inverse',
          ],
          accepted_answers: ['pascal_triangle_recurrence'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'observe_combination', label: '교차 불가 조건에서 C(M, N) 조합임을 관찰' },
          { id: 'build_pascal', label: '파스칼 삼각형 dp[i][j] = dp[i-1][j-1] + dp[i-1][j] 구축' },
          { id: 'set_base', label: 'dp[i][0] = dp[i][i] = 1 기저 조건 설정' },
          { id: 'read_and_answer', label: '각 테스트 케이스에 대해 dp[M][N] 출력' },
        ],
        correct_order: [
          'observe_combination',
          'set_base',
          'build_pascal',
          'read_and_answer',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'crossing_means_order_is_fixed',
          'C_n_0_equals_1',
          'C_n_n_equals_1',
          'factorial_overflow_risk',
          'prebuild_table_for_multiple_testcases',
          'N_equals_M_answer_is_1',
        ],
        required_answers: ['crossing_means_order_is_fixed', 'C_n_0_equals_1', 'factorial_overflow_risk'],
        recommended_answers: ['prebuild_table_for_multiple_testcases', 'C_n_n_equals_1'],
        optional_answers: ['N_equals_M_answer_is_1'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(M*N)', 'O(M^2)', 'O(N!)', 'O(M)'],
          accepted_answers: ['O(M*N)', 'O(M^2)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(M*N)', 'O(M^2)', 'O(N)'],
          accepted_answers: ['O(M*N)', 'O(M^2)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'pascal_triangle_table_size',
            'constant_work_per_cell',
            'precomputed_once',
            'factorial_is_O_M',
            'recursive_calls',
          ],
          accepted_answers: ['pascal_triangle_table_size', 'constant_work_per_cell', 'precomputed_once'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'pascal_dp',
        label: '파스칼 삼각형 DP로 C(M, N) 계산',
        pattern_analysis_answer: 'combination',
        required_strategy_tags: ['pascal_triangle_recurrence'],
      },
      {
        strategy_id: 'factorial_direct',
        label: '팩토리얼 직접 계산 C(M,N) = M!/(N!(M-N)!)',
        pattern_analysis_answer: 'combination',
        required_strategy_tags: ['factorial_division'],
      },
    ],

    common_mistakes: [
      {
        tag: 'permutation_not_combination',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'permutation' },
        ],
        feedback:
          '다리가 교차하지 않으면 동쪽 사이트를 오름차순으로 선택해야 하므로 순서가 자동으로 결정됩니다. 순열이 아닌 조합 C(M, N)이 정답입니다.',
      },
      {
        tag: 'factorial_overflow',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'factorial_overflow_risk' },
        ],
        feedback:
          '30! ≈ 2.65 × 10^32로 long long 범위를 초과합니다. 팩토리얼을 직접 계산하면 오버플로우 위험이 있습니다. 파스칼 삼각형 점화식은 덧셈만 사용하므로 안전합니다.',
      },
      {
        tag: 'miss_no_crossing_insight',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'crossing_means_order_is_fixed' },
        ],
        feedback:
          '"교차 불가" 조건이 핵심입니다. 동쪽 사이트를 오름차순으로 선택하면 교차가 자동으로 방지됩니다. 이 관찰이 문제를 조합 C(M,N)으로 변환하는 핵심 발상입니다.',
      },
    ],

    review_notes: {
      core_takeaway: '다리가 교차하지 않으면 선택 순서가 고정되므로 C(M, N) 조합. 파스칼 삼각형 DP로 안전하게 계산.',
      mentor_hint: '"교차 불가 → 오름차순 선택 → 조합"이라는 핵심 관찰을 30초 안에 할 수 있어야 한다.',
      pattern_trigger: '"N개를 M개에서 선택하되 순서가 정해져 있다"가 보이면 → 조합 C(M, N)을 떠올려라.',
      why_it_works: '교차 불가 조건은 선택한 동쪽 사이트를 정렬하면 유일한 연결이 결정된다는 것을 의미한다. 따라서 "어떤 N개를 고르는가"만 결정하면 되고, 이는 정확히 C(M, N)이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11050 — 이항 계수 1
  // ──────────────────────────────────────────────────────
  {
    id: 'b011050-boj',
    title: '이항 계수 1',
    difficulty: 'easy',
    domain: 'combination',
    summary: 'N이 최대 10인 환경에서 이항 계수 C(N, K)를 구하는 기본 문제',
    tags: ['combinatorics', 'math'],
    input_type: 'two_integers',
    output_type: 'single_value',
    constraints: {
      small_N: true,
      no_modular_needed: true,
      input_size_hint: '1 <= N <= 10, 0 <= K <= N',
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
            'two_integers_N_K',
            'very_small_range',
            'binomial_coefficient',
            'modular_output_required',
            'sorted_data',
          ],
          accepted_answers: ['two_integers_N_K', 'very_small_range', 'binomial_coefficient'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'compute_binomial_coefficient_small_N',
            'C_N_K_direct_calculation',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['direct_factorial', 'pascal_triangle_dp', 'modular_inverse', 'brute_force', 'binary_search', 'greedy'],
          accepted_answers: ['direct_factorial'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'N_small_enough_for_factorial',
            'no_overflow_risk',
            'simplest_approach_sufficient',
            'modular_arithmetic_needed',
            'large_N_requires_dp',
          ],
          accepted_answers: ['N_small_enough_for_factorial', 'no_overflow_risk', 'simplest_approach_sufficient'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['pascal_triangle_dp', 'iterative_multiplication', 'recursion', 'modular_arithmetic', 'prefix_product'],
          accepted_answers: ['pascal_triangle_dp', 'iterative_multiplication'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['factorial_function', '2d_array', 'map', 'stack', 'dp_array'],
          accepted_answers: ['factorial_function'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'factorial_formula_N_over_K_NK',
            'pascal_triangle_dp',
            'iterative_multiply_divide',
            'modular_inverse',
            'recursive_combination',
          ],
          accepted_answers: ['factorial_formula_N_over_K_NK'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_N_K', label: 'N과 K를 입력받기' },
          { id: 'compute_factorials', label: 'N!, K!, (N-K)! 계산' },
          { id: 'divide', label: 'N! / (K! * (N-K)!) 출력' },
        ],
        correct_order: [
          'read_N_K',
          'compute_factorials',
          'divide',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'K_equals_0_answer_is_1',
          'K_equals_N_answer_is_1',
          'no_overflow_for_N_10',
          'integer_division_exact',
          'unnecessary_modular',
        ],
        required_answers: ['K_equals_0_answer_is_1', 'K_equals_N_answer_is_1'],
        recommended_answers: ['no_overflow_for_N_10', 'integer_division_exact'],
        optional_answers: ['unnecessary_modular'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(N*K)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(N*K)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'factorial_computed_in_N_steps',
            'constant_variables_only',
            'no_table_needed',
            'dp_table_N_by_K',
            'recursive_calls',
          ],
          accepted_answers: ['factorial_computed_in_N_steps', 'constant_variables_only', 'no_table_needed'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'factorial_direct',
        label: '팩토리얼 직접 계산 C(N,K) = N!/(K!(N-K)!)',
        pattern_analysis_answer: 'direct_factorial',
        required_strategy_tags: ['factorial_formula_N_over_K_NK'],
      },
      {
        strategy_id: 'pascal_dp',
        label: '파스칼 삼각형 DP',
        pattern_analysis_answer: 'pascal_triangle_dp',
        required_strategy_tags: ['pascal_triangle_dp'],
      },
    ],

    common_mistakes: [
      {
        tag: 'overcomplicate',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'modular_inverse' },
        ],
        feedback:
          'N이 최대 10이므로 모듈러 역원은 불필요합니다. 10! = 3,628,800으로 int 범위 내입니다. 팩토리얼을 직접 계산하면 됩니다.',
      },
      {
        tag: 'miss_base_case_0',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'K_equals_0_answer_is_1' },
        ],
        feedback:
          'C(N, 0) = 1입니다. 0!을 1로 처리하지 않으면 0으로 나누는 오류가 발생합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'C(N, K) = N! / (K! × (N-K)!). N이 작으면 팩토리얼 직접 계산이 가장 간단하다.',
      mentor_hint: '이항 계수 문제에서 가장 먼저 확인할 것은 N의 범위이다. N <= 10이면 어떤 방법이든 가능하고, N이 커지면 파스칼 DP 또는 모듈러 역원이 필요하다.',
      pattern_trigger: '"C(N, K)를 구하시오"가 보이면 → N의 범위를 먼저 확인하고 적절한 계산 방법을 선택하라.',
      why_it_works: 'N! / (K! × (N-K)!)는 이항 계수의 정의이다. N <= 10에서 최대 분자 10! = 3,628,800이므로 정수 범위 내에서 정확한 나눗셈이 보장된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11051 — 이항 계수 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b011051-boj',
    title: '이항 계수 2',
    difficulty: 'easy',
    domain: 'combination_modular',
    summary: 'C(N, K) mod 10007을 파스칼 삼각형 DP로 구하는 문제',
    tags: ['combinatorics', 'math', 'dynamic-programming', 'modular-arithmetic'],
    input_type: 'two_integers',
    output_type: 'value_mod',
    constraints: {
      mod_10007: true,
      input_size_hint: '1 <= N <= 1000, 0 <= K <= N',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['value_mod', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['value_mod'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'two_integers_N_K',
            'medium_range_N_up_to_1000',
            'modular_output_required',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['two_integers_N_K', 'medium_range_N_up_to_1000', 'modular_output_required'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'binomial_coefficient_mod_prime',
            'pascal_triangle_with_modular',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['pascal_triangle_dp', 'direct_factorial', 'modular_inverse_fermat', 'brute_force', 'lucas_theorem', 'binary_search'],
          accepted_answers: ['pascal_triangle_dp'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'addition_based_recurrence_mod_friendly',
            'factorial_division_needs_inverse',
            'N_up_to_1000_manageable_table',
            'overlapping_subproblems',
            'need_shortest_path',
          ],
          accepted_answers: ['addition_based_recurrence_mod_friendly', 'N_up_to_1000_manageable_table', 'overlapping_subproblems'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['modular_arithmetic', 'space_optimization_1d', 'fermat_inverse', 'lucas_theorem', 'memoization'],
          accepted_answers: ['modular_arithmetic', 'space_optimization_1d'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_array', '1d_array_rolling', 'factorial_array', 'map', 'dp_array'],
          accepted_answers: ['2d_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'pascal_recurrence_with_mod',
            'factorial_with_modular_inverse',
            'direct_factorial_division',
            'recursive_with_memo',
            'lucas_theorem',
          ],
          accepted_answers: ['pascal_recurrence_with_mod'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_base', label: 'dp[i][0] = 1, dp[i][i] = 1 기저 조건 설정' },
          { id: 'fill_pascal', label: 'dp[i][j] = (dp[i-1][j-1] + dp[i-1][j]) % 10007 채우기' },
          { id: 'iterate_rows', label: 'i = 1부터 N까지 행 순회' },
          { id: 'iterate_cols', label: 'j = 1부터 min(i-1, K)까지 열 순회' },
          { id: 'output', label: 'dp[N][K] 출력' },
        ],
        correct_order: [
          'init_base',
          'iterate_rows',
          'iterate_cols',
          'fill_pascal',
          'output',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'mod_at_every_addition',
          'base_case_C_n_0_and_C_n_n',
          'factorial_division_needs_inverse',
          'K_equals_0_answer_is_1',
          '1d_optimization_reverse_order',
          'N_equals_K_answer_is_1',
        ],
        required_answers: ['mod_at_every_addition', 'base_case_C_n_0_and_C_n_n', 'factorial_division_needs_inverse'],
        recommended_answers: ['K_equals_0_answer_is_1', '1d_optimization_reverse_order'],
        optional_answers: ['N_equals_K_answer_is_1'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(N*K)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N*K)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(K)', 'O(N*K)', 'O(N^2)'],
          accepted_answers: ['O(N*K)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'pascal_table_N_by_K',
            'constant_work_per_cell',
            'can_optimize_to_1d_O_K',
            'factorial_is_O_N',
            'recursive_calls',
          ],
          accepted_answers: ['pascal_table_N_by_K', 'constant_work_per_cell'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'pascal_mod',
        label: '파스칼 삼각형 + mod 10007',
        pattern_analysis_answer: 'pascal_triangle_dp',
        required_strategy_tags: ['pascal_recurrence_with_mod'],
      },
      {
        strategy_id: 'fermat_inverse',
        label: '팩토리얼 + 페르마 소정리 역원',
        pattern_analysis_answer: 'modular_inverse_fermat',
        required_strategy_tags: ['factorial_with_modular_inverse'],
      },
    ],

    common_mistakes: [
      {
        tag: 'direct_factorial_division',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'direct_factorial_division' },
        ],
        feedback:
          '팩토리얼을 직접 나누면 모듈러 환경에서 정확하지 않습니다. (a / b) mod p ≠ (a mod p) / (b mod p)입니다. 나눗셈은 곱셈 역원이 필요하며, 파스칼 삼각형은 덧셈만 사용하므로 모듈러 적용이 쉽습니다.',
      },
      {
        tag: 'miss_mod_every_step',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'mod_at_every_addition' },
        ],
        feedback:
          '모듈러를 마지막에만 적용하면 중간 과정에서 int 범위를 초과합니다. C(1000, 500)은 천문학적 수이므로 매 덧셈마다 mod 10007을 적용해야 합니다.',
      },
      {
        tag: 'miss_inverse_insight',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'factorial_division_needs_inverse' },
        ],
        feedback:
          '모듈러 환경에서 나눗셈은 단순 나눗셈이 아닌 곱셈 역원입니다. 이 사실을 모르고 팩토리얼 나눗셈을 시도하면 오답입니다. 파스칼 삼각형을 사용하면 이 문제를 우회할 수 있습니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'C(n, r) = C(n-1, r-1) + C(n-1, r). 파스칼 삼각형은 덧셈만 사용하므로 모듈러 적용이 자연스럽다.',
      mentor_hint: '"모듈러 환경에서 나눗셈이 안 된다"는 것을 이 문제에서 체득해야 한다. 파스칼 삼각형이 안전한 대안인 이유를 설명할 수 있어야 한다.',
      pattern_trigger: '"이항 계수 + 모듈러"가 보이면 → 파스칼 삼각형 DP(작은 N) 또는 페르마 역원(큰 N, 소수 mod)을 선택하라.',
      why_it_works: '파스칼 삼각형의 점화식은 덧셈으로만 이루어져 있어 (a + b) mod p = ((a mod p) + (b mod p)) mod p가 성립한다. 중간값이 절대 모듈러 값을 초과하지 않는다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1256 — 사전
  // ──────────────────────────────────────────────────────
  {
    id: 'b001256-boj',
    title: '사전',
    difficulty: 'medium',
    domain: 'combinatorial_ranking',
    summary: "'a' N개와 'z' M개로 만들 수 있는 문자열 중 K번째 사전순 문자열을 구하는 문제",
    tags: ['combinatorics', 'math', 'greedy'],
    input_type: 'three_integers',
    output_type: 'string',
    constraints: {
      two_characters_only: true,
      kth_lexicographic: true,
      input_size_hint: '1 <= N, M <= 100, 1 <= K <= 10^9',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['string', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['string'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'fixed_count_of_two_chars',
            'kth_in_sorted_order',
            'large_K_up_to_1e9',
            'sorted_data',
            'single_array',
          ],
          accepted_answers: ['fixed_count_of_two_chars', 'kth_in_sorted_order', 'large_K_up_to_1e9'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_kth_lexicographic_binary_string',
            'combinatorial_unranking_with_two_chars',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['greedy_with_combination', 'brute_force', 'binary_search', 'dp_bottom_up', 'permutation', 'sorting'],
          accepted_answers: ['greedy_with_combination'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'decide_each_position_greedily',
            'count_remaining_with_combination',
            'too_many_strings_to_enumerate',
            'K_comparison_determines_choice',
            'need_shortest_path',
          ],
          accepted_answers: ['decide_each_position_greedily', 'count_remaining_with_combination', 'too_many_strings_to_enumerate', 'K_comparison_determines_choice'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['pascal_triangle_precompute', 'overflow_clamping', 'lexicographic_ordering', 'memoization', 'binary_representation'],
          accepted_answers: ['pascal_triangle_precompute', 'overflow_clamping', 'lexicographic_ordering'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_combination_table', 'string_builder', 'map', 'stack', 'dp_array'],
          accepted_answers: ['2d_combination_table', 'string_builder'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'greedy_position_by_position',
            'compare_K_with_a_count',
            'clamp_combination_to_avoid_overflow',
            'enumerate_all_strings',
            'binary_search_on_rank',
          ],
          accepted_answers: ['greedy_position_by_position', 'compare_K_with_a_count', 'clamp_combination_to_avoid_overflow'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'precompute_comb', label: '파스칼 삼각형으로 조합 테이블 전처리 (값을 10^9+1로 클램핑)' },
          { id: 'check_total', label: 'C(N+M, N) < K이면 -1 출력' },
          { id: 'iterate_positions', label: '각 위치를 앞에서부터 순회' },
          { id: 'count_if_a', label: "'a'를 놓았을 때 남는 경우의 수 cnt = C(남은a+남은z-1, 남은z) 계산" },
          { id: 'decide_char', label: "cnt >= K이면 'a' 선택, 아니면 K -= cnt 후 'z' 선택" },
          { id: 'output_string', label: '완성된 문자열 출력' },
        ],
        correct_order: [
          'precompute_comb',
          'check_total',
          'iterate_positions',
          'count_if_a',
          'decide_char',
          'output_string',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'overflow_clamping_to_1e9_plus_1',
          'K_exceeds_total_output_minus_1',
          'N_or_M_is_0',
          'greedy_a_first_in_lex_order',
          'combination_table_size_200x200',
          'all_a_or_all_z',
        ],
        required_answers: ['overflow_clamping_to_1e9_plus_1', 'K_exceeds_total_output_minus_1', 'greedy_a_first_in_lex_order'],
        recommended_answers: ['N_or_M_is_0', 'combination_table_size_200x200'],
        optional_answers: ['all_a_or_all_z'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+M)', 'O((N+M)^2)', 'O(N*M)', 'O(2^(N+M))'],
          accepted_answers: ['O((N+M)^2)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N+M)', 'O((N+M)^2)', 'O(N*M)'],
          accepted_answers: ['O((N+M)^2)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'combination_table_precompute',
            'string_construction_is_O_N_plus_M',
            'table_dominates',
            'factorial_is_O_N',
            'recursive_calls',
          ],
          accepted_answers: ['combination_table_precompute', 'string_construction_is_O_N_plus_M', 'table_dominates'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_comb',
        label: '그리디 + 조합 카운팅으로 한 글자씩 결정',
        pattern_analysis_answer: 'greedy_with_combination',
        required_strategy_tags: ['greedy_position_by_position', 'compare_K_with_a_count', 'clamp_combination_to_avoid_overflow'],
      },
    ],

    common_mistakes: [
      {
        tag: 'enumerate_all',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'enumerate_all_strings' },
        ],
        feedback:
          "C(200, 100)은 천문학적 수입니다. 모든 문자열을 생성하고 K번째를 찾는 것은 물리적으로 불가능합니다. 한 글자씩 그리디하게 결정해야 합니다.",
      },
      {
        tag: 'miss_overflow_clamping',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'overflow_clamping_to_1e9_plus_1' },
        ],
        feedback:
          "C(N+M, N)이 K의 최댓값 10^9를 초과할 수 있습니다. 조합 값을 min(값, 10^9+1)로 클램핑하지 않으면 오버플로우가 발생합니다. 'K보다 크다'는 정보만 있으면 되므로 정확한 값이 필요하지 않습니다.",
      },
      {
        tag: 'miss_minus_1',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'K_exceeds_total_output_minus_1' },
        ],
        feedback:
          '총 문자열 수가 K보다 작으면 -1을 출력해야 합니다. 이 체크를 누락하면 잘못된 문자열이 출력됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: "각 위치에서 'a'를 놓았을 때 남는 경우의 수와 K를 비교하며 한 글자씩 결정. 오버플로우 클램핑이 핵심 기법.",
      mentor_hint: '조합 값의 오버플로우를 K+1로 클램핑하는 테크닉을 익혀라. "K보다 큰가?"만 알면 되므로 정확한 값이 불필요하다.',
      pattern_trigger: '"N개의 a와 M개의 z로 만든 문자열 중 K번째"가 보이면 → 조합 카운팅 + 그리디 unranking을 떠올려라.',
      why_it_works: "사전순에서 'a'가 'z'보다 앞이므로, 현재 위치에 'a'를 놓으면 그 뒤의 모든 배열이 'z'를 놓은 것보다 앞에 온다. 남은 경우의 수가 K 이상이면 'a'를 놓고, 아니면 K에서 빼고 'z'를 놓으면 정확히 K번째를 구성할 수 있다.",
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1722 — 순열의 순서
  // ──────────────────────────────────────────────────────
  {
    id: 'b001722-boj',
    title: '순열의 순서',
    difficulty: 'medium',
    domain: 'permutation_ranking',
    summary: 'K번째 순열을 구하거나, 주어진 순열이 몇 번째인지 계산하는 팩토리얼 수 체계 문제',
    tags: ['combinatorics', 'math', 'greedy'],
    input_type: 'integer_and_query',
    output_type: 'permutation_or_rank',
    constraints: {
      two_query_types: true,
      factoradic_number_system: true,
      input_size_hint: '1 <= N <= 20',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['permutation_or_rank', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['permutation_or_rank'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'permutation_of_1_to_N',
            'two_types_of_queries',
            'large_rank_up_to_N_factorial',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['permutation_of_1_to_N', 'two_types_of_queries', 'large_rank_up_to_N_factorial'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'factoradic_ranking_and_unranking',
            'kth_permutation_or_permutation_rank',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['factoradic_system', 'brute_force', 'next_permutation', 'dp_bottom_up', 'binary_search', 'sorting'],
          accepted_answers: ['factoradic_system'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'each_position_determined_by_factorial',
            'N_factorial_too_large_to_enumerate',
            'divide_K_by_remaining_factorial',
            'count_smaller_elements_for_rank',
            'locally_optimal_not_guaranteed',
          ],
          accepted_answers: ['each_position_determined_by_factorial', 'N_factorial_too_large_to_enumerate', 'divide_K_by_remaining_factorial'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['greedy_construction', 'available_set_management', 'modular_arithmetic', 'memoization', 'binary_indexed_tree'],
          accepted_answers: ['greedy_construction', 'available_set_management'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['factorial_array', 'available_list', 'map', 'segment_tree', 'dp_array'],
          accepted_answers: ['factorial_array', 'available_list'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'divide_K_by_factorial_for_unranking',
            'count_smaller_unused_for_ranking',
            'remove_used_from_available',
            'generate_all_permutations',
            'next_permutation_K_times',
          ],
          accepted_answers: ['divide_K_by_factorial_for_unranking', 'count_smaller_unused_for_ranking', 'remove_used_from_available'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'precompute_factorials', label: 'fact[0..20] 팩토리얼 배열 전처리' },
          { id: 'init_available', label: '사용 가능한 숫자 리스트 [1, 2, ..., N] 초기화' },
          { id: 'convert_K_0indexed', label: 'K번째 순열 구하기: K -= 1 (0-indexed 변환)' },
          { id: 'determine_position', label: '각 위치에서 K / fact[남은 수 - 1]번째 수 선택, K %= fact[남은 수 - 1]' },
          { id: 'rank_count_smaller', label: '순서 구하기: 각 위치에서 현재 수보다 작은 미사용 수 개수 × fact[남은 자리]를 합산' },
          { id: 'output', label: '결과 출력 (순서 구하기는 최종 합 + 1)' },
        ],
        correct_order: [
          'precompute_factorials',
          'init_available',
          'convert_K_0indexed',
          'determine_position',
          'rank_count_smaller',
          'output',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'K_must_be_0_indexed',
          'long_long_for_20_factorial',
          'remove_from_available_after_use',
          'two_query_types_handle_both',
          'N_equals_1_trivial',
          'rank_is_1_indexed_in_output',
        ],
        required_answers: ['K_must_be_0_indexed', 'long_long_for_20_factorial', 'remove_from_available_after_use'],
        recommended_answers: ['two_query_types_handle_both', 'rank_is_1_indexed_in_output'],
        optional_answers: ['N_equals_1_trivial'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(N!)', 'O(NlogN)'],
          accepted_answers: ['O(N^2)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(N!)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'N_positions_each_O_N_search',
            'available_list_linear_search',
            'factorial_array_size_N',
            'can_optimize_to_NlogN_with_BIT',
            'enumerate_all_permutations',
          ],
          accepted_answers: ['N_positions_each_O_N_search', 'available_list_linear_search', 'factorial_array_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'factoradic',
        label: '팩토리얼 수 체계로 ranking/unranking',
        pattern_analysis_answer: 'factoradic_system',
        required_strategy_tags: ['divide_K_by_factorial_for_unranking', 'count_smaller_unused_for_ranking', 'remove_used_from_available'],
      },
    ],

    common_mistakes: [
      {
        tag: 'miss_0_index',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'K_must_be_0_indexed' },
        ],
        feedback:
          'K번째 순열을 구할 때 K를 0-indexed로 변환(K -= 1)해야 합니다. 1-indexed 그대로 사용하면 한 칸씩 밀려 오답입니다. 반대로 순서를 구할 때는 결과에 1을 더해야 합니다.',
      },
      {
        tag: 'miss_long_long',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'long_long_for_20_factorial' },
        ],
        feedback:
          '20! ≈ 2.43 × 10^18로 int(32bit) 범위를 초과합니다. K와 팩토리얼 배열 모두 long long(64bit)을 사용해야 합니다.',
      },
      {
        tag: 'enumerate_all',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force' },
        ],
        feedback:
          '모든 순열을 생성하면 20! ≈ 2.4 × 10^18개로 물리적으로 불가능합니다. 팩토리얼 수 체계를 사용하면 O(N²)에 직접 구성할 수 있습니다.',
      },
      {
        tag: 'next_perm_k_times',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'next_permutation' },
        ],
        feedback:
          'next_permutation을 K번 호출하면 K가 최대 20!이므로 시간 초과입니다. 팩토리얼 수 체계로 O(N²)에 직접 구해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'K를 (N-1)!, (N-2)!, ...로 나누며 각 자리를 결정하는 팩토리얼 수 체계. 역방향은 미사용 수 중 작은 수 개수 × 팩토리얼 합산.',
      mentor_hint: 'K를 0-indexed로 변환하는 것을 반드시 기억하라. 1-indexed 그대로 쓰면 모든 답이 한 칸씩 밀린다.',
      pattern_trigger: '"N개의 순열에서 K번째" 또는 "주어진 순열의 순서"가 보이면 → 팩토리얼 수 체계(factoradic)를 떠올려라.',
      why_it_works: '첫 자리를 고정하면 나머지 (N-1)!개의 순열이 연속으로 배치된다. K를 (N-1)!로 나눈 몫이 첫 자리의 인덱스이고, 나머지로 이후 자리를 재귀적으로 결정할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1947 — 선물 전달
  // ──────────────────────────────────────────────────────
  {
    id: 'b001947-boj',
    title: '선물 전달',
    difficulty: 'medium',
    domain: 'derangement',
    summary: '자기 자신에게 줄 수 없는 선물 교환 방법의 수(교란, Derangement)를 구하는 문제',
    tags: ['combinatorics', 'math', 'dynamic-programming', 'derangement'],
    input_type: 'single_integer',
    output_type: 'count_mod',
    constraints: {
      no_self_assignment: true,
      mod_1000000000: true,
      input_size_hint: '1 <= N <= 1000000',
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
            'single_integer_N',
            'permutation_with_constraint',
            'no_fixed_point_allowed',
            'modular_output_required',
            'sorted_data',
          ],
          accepted_answers: ['single_integer_N', 'permutation_with_constraint', 'no_fixed_point_allowed', 'modular_output_required'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_derangements_mod_1e9',
            'permutations_with_no_fixed_points',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['derangement_recurrence', 'inclusion_exclusion', 'brute_force', 'dp_bottom_up', 'greedy', 'matrix_exponentiation'],
          accepted_answers: ['derangement_recurrence'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'classic_derangement_problem',
            'recurrence_D_n_eq_n1_times_D_n1_plus_D_n2',
            'N_up_to_1M_needs_linear',
            'overlapping_subproblems',
            'locally_optimal_not_guaranteed',
          ],
          accepted_answers: ['classic_derangement_problem', 'recurrence_D_n_eq_n1_times_D_n1_plus_D_n2', 'N_up_to_1M_needs_linear'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['inclusion_exclusion_formula', 'space_optimization', 'modular_arithmetic', 'rolling_variables', 'memoization'],
          accepted_answers: ['inclusion_exclusion_formula', 'space_optimization', 'modular_arithmetic'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['two_variables', 'dp_array', 'map', 'stack', 'factorial_array'],
          accepted_answers: ['two_variables'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'iterative_recurrence',
            'rolling_two_variables',
            'mod_at_every_step',
            'inclusion_exclusion_sum',
            'brute_force_permutations',
          ],
          accepted_answers: ['iterative_recurrence', 'rolling_two_variables', 'mod_at_every_step'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'recognize_derangement', label: '문제를 교란(Derangement) 문제로 인식' },
          { id: 'set_base', label: 'D(1) = 0, D(2) = 1 기저 조건 설정' },
          { id: 'iterate_3_to_N', label: 'i = 3부터 N까지 순회' },
          { id: 'apply_recurrence', label: 'D(i) = (i-1) * (D(i-1) + D(i-2)) % MOD' },
          { id: 'roll_variables', label: '변수 롤링: D(i-2) = D(i-1), D(i-1) = D(i)' },
          { id: 'output', label: 'D(N) 출력' },
        ],
        correct_order: [
          'recognize_derangement',
          'set_base',
          'iterate_3_to_N',
          'apply_recurrence',
          'roll_variables',
          'output',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'D_1_equals_0',
          'D_2_equals_1',
          'multiplication_overflow_long_long',
          'mod_after_multiplication',
          'N_equals_1_answer_0',
          'inclusion_exclusion_alternative',
        ],
        required_answers: ['D_1_equals_0', 'D_2_equals_1', 'multiplication_overflow_long_long'],
        recommended_answers: ['mod_after_multiplication', 'N_equals_1_answer_0'],
        optional_answers: ['inclusion_exclusion_alternative'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(NlogN)', 'O(N!)'],
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
            'single_pass_3_to_N',
            'only_two_variables_maintained',
            'constant_work_per_step',
            'dp_array_size_N',
            'recursive_calls',
          ],
          accepted_answers: ['single_pass_3_to_N', 'only_two_variables_maintained', 'constant_work_per_step'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'derangement_iterative',
        label: 'D(n) = (n-1)(D(n-1) + D(n-2)) 반복문',
        pattern_analysis_answer: 'derangement_recurrence',
        required_strategy_tags: ['iterative_recurrence', 'rolling_two_variables', 'mod_at_every_step'],
      },
      {
        strategy_id: 'inclusion_exclusion',
        label: '포함-배제 원리: D(n) = n! × Σ(-1)^k/k!',
        pattern_analysis_answer: 'inclusion_exclusion',
        required_strategy_tags: ['inclusion_exclusion_sum'],
      },
    ],

    common_mistakes: [
      {
        tag: 'subtract_from_factorial',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'iterative_recurrence' },
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'inclusion_exclusion_sum' },
        ],
        feedback:
          'N!에서 "자기 자신을 포함하는 경우"를 단순히 빼면 오답입니다. 포함-배제 없이는 중복 카운팅이 발생합니다. 점화식 D(n) = (n-1)(D(n-1) + D(n-2))가 가장 간단합니다.',
      },
      {
        tag: 'miss_D1_0',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'D_1_equals_0' },
        ],
        feedback:
          'D(1) = 0입니다. 1명이면 자기 자신에게만 줄 수 있으므로 교란이 불가능합니다. D(1) = 1로 설정하면 전체 결과가 틀립니다.',
      },
      {
        tag: 'multiplication_overflow',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'multiplication_overflow_long_long' },
        ],
        feedback:
          '(n-1) × (D(n-1) + D(n-2))에서 n-1은 최대 999999, 합은 최대 약 2×10^9이므로 곱이 약 2×10^15에 달합니다. long long을 사용하고 곱셈 후 mod를 적용해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'D(n) = (n-1) × (D(n-1) + D(n-2)). 교란(Derangement) 점화식을 변수 2개로 O(N) 시간, O(1) 공간에 계산.',
      mentor_hint: '교란 점화식의 직관을 설명할 수 있어야 한다: n번 사람이 i번에게 줄 때 (n-1가지), i번이 n번에게 주면 D(n-2), 그렇지 않으면 D(n-1).',
      pattern_trigger: '"모든 원소가 자기 위치에 오지 않는 순열"이 보이면 → 교란 점화식을 떠올려라.',
      why_it_works: 'n번 원소가 i번 위치로 가면 (n-1가지 선택), i번 원소에 대해 두 가지: (1) i가 n으로 가면 나머지 n-2개의 교란 D(n-2), (2) i가 n이 아닌 곳으로 가면 n-1개의 교란 D(n-1). 합하면 (n-1)(D(n-1)+D(n-2)).',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2775 — 부녀회장이 될테야
  // ──────────────────────────────────────────────────────
  {
    id: 'b002775-boj',
    title: '부녀회장이 될테야',
    difficulty: 'easy',
    domain: 'prefix_sum_dp',
    summary: '각 층의 거주자 수가 아래층의 누적합인 아파트에서 k층 n호 거주자 수를 구하는 문제',
    tags: ['combinatorics', 'dynamic-programming', 'math', 'prefix-sum'],
    input_type: 'two_integers',
    output_type: 'single_value',
    constraints: {
      floor_0_has_i_people: true,
      each_floor_prefix_sum_of_below: true,
      input_size_hint: '1 <= k, n <= 14',
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
            'two_integers_floor_and_room',
            'cumulative_sum_structure',
            'small_range',
            'sorted_data',
            'modular_output_required',
          ],
          accepted_answers: ['two_integers_floor_and_room', 'cumulative_sum_structure', 'small_range'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'apartment_residents_prefix_sum_dp',
            'cumulative_sum_table_lookup',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dp_2d_prefix_sum', 'brute_force', 'combination_formula', 'greedy', 'recursion', 'binary_search'],
          accepted_answers: ['dp_2d_prefix_sum'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'each_cell_depends_on_below_and_left',
            'small_table_easy_to_fill',
            'overlapping_subproblems',
            'equivalent_to_combination',
            'need_shortest_path',
          ],
          accepted_answers: ['each_cell_depends_on_below_and_left', 'small_table_easy_to_fill', 'overlapping_subproblems'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['combination_C_k_plus_n_minus_1', 'precomputation', 'modular_arithmetic', 'memoization', 'prefix_sum'],
          accepted_answers: ['combination_C_k_plus_n_minus_1', 'precomputation'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_array', '1d_array', 'map', 'stack', 'dp_array'],
          accepted_answers: ['2d_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dp_k_n_eq_dp_k_n1_plus_dp_k1_n',
            'fill_floor_by_floor',
            'base_floor_0_is_i',
            'combination_direct',
            'recursive_sum',
          ],
          accepted_answers: ['dp_k_n_eq_dp_k_n1_plus_dp_k1_n', 'fill_floor_by_floor', 'base_floor_0_is_i'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_floor_0', label: '0층 초기화: dp[0][i] = i (1 <= i <= 14)' },
          { id: 'fill_table', label: '1층부터 14층까지 dp[k][n] = dp[k][n-1] + dp[k-1][n] 채우기' },
          { id: 'handle_col_1', label: '각 층의 1호: dp[k][1] = 1 (기저)' },
          { id: 'answer_query', label: '각 테스트 케이스에 대해 dp[k][n] 출력' },
        ],
        correct_order: [
          'init_floor_0',
          'handle_col_1',
          'fill_table',
          'answer_query',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'floor_0_i_th_room_has_i_people',
          'room_starts_from_1_not_0',
          'equivalent_to_C_k_plus_n_minus_1_choose_k',
          'prebuild_for_multiple_testcases',
          'k_equals_0_answer_is_n',
          'n_equals_1_answer_is_1',
        ],
        required_answers: ['floor_0_i_th_room_has_i_people', 'room_starts_from_1_not_0'],
        recommended_answers: ['equivalent_to_C_k_plus_n_minus_1_choose_k', 'prebuild_for_multiple_testcases'],
        optional_answers: ['k_equals_0_answer_is_n', 'n_equals_1_answer_is_1'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(k*n)', 'O(k*n^2)', 'O(k+n)', 'O(1)'],
          accepted_answers: ['O(k*n)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(k*n)', 'O(n)', 'O(1)'],
          accepted_answers: ['O(k*n)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'fill_2d_table_k_by_n',
            'constant_work_per_cell',
            'table_precomputed_once',
            'rolling_array_possible',
            'recursive_calls',
          ],
          accepted_answers: ['fill_2d_table_k_by_n', 'constant_work_per_cell', 'table_precomputed_once'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dp_prefix_sum',
        label: 'dp[k][n] = dp[k][n-1] + dp[k-1][n] 누적합 DP',
        pattern_analysis_answer: 'dp_2d_prefix_sum',
        required_strategy_tags: ['dp_k_n_eq_dp_k_n1_plus_dp_k1_n', 'fill_floor_by_floor', 'base_floor_0_is_i'],
      },
      {
        strategy_id: 'combination_direct',
        label: 'f(k, n) = C(k+n-1, k) 조합 공식',
        pattern_analysis_answer: 'combination_formula',
        required_strategy_tags: ['combination_direct'],
      },
    ],

    common_mistakes: [
      {
        tag: 'room_from_0',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'room_starts_from_1_not_0' },
        ],
        feedback:
          '호수는 1부터 시작합니다. 0호는 존재하지 않으므로 dp[k][0]을 사용하면 오답이 됩니다. 0층의 i호에는 i명이 살고, dp[k][1] = 1입니다.',
      },
      {
        tag: 'wrong_base_floor',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'floor_0_i_th_room_has_i_people' },
        ],
        feedback:
          '0층의 i호에는 i명이 살고 있습니다 (1명이 아님). dp[0][i] = i로 초기화해야 합니다. dp[0][i] = 1로 설정하면 모든 결과가 틀립니다.',
      },
      {
        tag: 'sum_each_time',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'recursive_sum' },
        ],
        feedback:
          '매번 1~n까지 합을 직접 구하면 O(k*n²)입니다. dp[k][n] = dp[k][n-1] + dp[k-1][n] 관계를 이용하면 O(k*n)으로 줄일 수 있습니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'dp[k][n] = dp[k][n-1] + dp[k-1][n]. 0층을 기저로 각 층을 아래층의 누적합으로 채운다. 수학적으로는 C(k+n-1, k).',
      mentor_hint: '이 문제의 DP 테이블이 파스칼 삼각형과 동치라는 것을 관찰할 수 있으면 수학적 감각이 좋은 것이다.',
      pattern_trigger: '"각 층이 아래층의 누적합" 같은 계단식 누적 구조가 보이면 → 2D 누적합 DP를 떠올려라.',
      why_it_works: 'k층 n호는 k층 (n-1)호 + (k-1)층 n호로 분해된다. 이는 k층 n호가 (k-1)층 1~n호의 합이라는 원래 정의에서 자연스럽게 도출되는 점화식이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 13251 — 조약돌 꺼내기
  // ──────────────────────────────────────────────────────
  {
    id: 'b013251-boj',
    title: '조약돌 꺼내기',
    difficulty: 'easy',
    domain: 'probability',
    summary: 'K개를 뽑아 모두 같은 색일 확률을 조합/확률 곱으로 구하는 문제',
    tags: ['combinatorics', 'math', 'probability'],
    input_type: 'array_and_integer',
    output_type: 'probability',
    constraints: {
      without_replacement: true,
      all_same_color_probability: true,
      input_size_hint: 'M <= 50, 총 개수 <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['probability', 'count', 'minimum_steps', 'boolean_existence', 'maximum_sum'],
          accepted_answers: ['probability'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'color_counts_array',
            'draw_K_without_replacement',
            'all_same_color_condition',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['color_counts_array', 'draw_K_without_replacement', 'all_same_color_condition'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'probability_all_K_same_color',
            'sum_of_hypergeometric_probabilities',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['probability_multiplication', 'combination_ratio', 'simulation', 'dp_bottom_up', 'greedy', 'brute_force'],
          accepted_answers: ['probability_multiplication'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'mutually_exclusive_color_events',
            'sequential_probability_product',
            'simple_sum_of_per_color_prob',
            'need_shortest_path',
            'locally_optimal_not_guaranteed',
          ],
          accepted_answers: ['mutually_exclusive_color_events', 'sequential_probability_product', 'simple_sum_of_per_color_prob'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['combination_C_count_K', 'floating_point_arithmetic', 'hypergeometric_distribution', 'memoization', 'modular_arithmetic'],
          accepted_answers: ['floating_point_arithmetic', 'hypergeometric_distribution'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['double_variable', 'array', 'map', 'combination_table', 'dp_array'],
          accepted_answers: ['double_variable'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'multiply_probabilities_per_draw',
            'sum_over_all_colors',
            'skip_if_count_less_than_K',
            'use_combination_ratio',
            'simulate_random_draws',
          ],
          accepted_answers: ['multiply_probabilities_per_draw', 'sum_over_all_colors', 'skip_if_count_less_than_K'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'compute_total', label: '전체 조약돌 수 total 계산' },
          { id: 'init_prob_0', label: '결과 확률 = 0으로 초기화' },
          { id: 'iterate_colors', label: '각 색상 i를 순회' },
          { id: 'skip_small', label: 'count_i < K이면 건너뛰기' },
          { id: 'multiply_k_times', label: '(count_i/total) × ((count_i-1)/(total-1)) × ... K번 곱하기' },
          { id: 'add_to_result', label: '결과에 해당 확률 더하기' },
          { id: 'output', label: '결과 확률 출력' },
        ],
        correct_order: [
          'compute_total',
          'init_prob_0',
          'iterate_colors',
          'skip_small',
          'multiply_k_times',
          'add_to_result',
          'output',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'without_replacement_not_with',
          'skip_color_if_count_less_than_K',
          'mutually_exclusive_sum',
          'floating_point_precision',
          'K_equals_1_answer_is_1',
          'single_color_only',
        ],
        required_answers: ['without_replacement_not_with', 'skip_color_if_count_less_than_K', 'mutually_exclusive_sum'],
        recommended_answers: ['floating_point_precision', 'K_equals_1_answer_is_1'],
        optional_answers: ['single_color_only'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(M*K)', 'O(M)', 'O(total)', 'O(M^2)'],
          accepted_answers: ['O(M*K)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(M)', 'O(total)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'M_colors_K_multiplications_each',
            'constant_variables_only',
            'no_auxiliary_data_structure',
            'combination_table_size',
            'recursive_calls',
          ],
          accepted_answers: ['M_colors_K_multiplications_each', 'constant_variables_only', 'no_auxiliary_data_structure'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'prob_product',
        label: '각 색상별 확률 곱 후 합산',
        pattern_analysis_answer: 'probability_multiplication',
        required_strategy_tags: ['multiply_probabilities_per_draw', 'sum_over_all_colors', 'skip_if_count_less_than_K'],
      },
      {
        strategy_id: 'combination_ratio',
        label: 'Σ C(count_i, K) / C(total, K)',
        pattern_analysis_answer: 'combination_ratio',
        required_strategy_tags: ['use_combination_ratio'],
      },
    ],

    common_mistakes: [
      {
        tag: 'with_replacement',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'without_replacement_not_with' },
        ],
        feedback:
          '비복원 추출입니다. 한 번 뽑은 조약돌은 돌려놓지 않으므로, 두 번째 뽑을 때 전체 수가 1 줄어듭니다. (count_i/total)^K로 계산하면 복원 추출이 되어 오답입니다.',
      },
      {
        tag: 'miss_skip_small',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'skip_color_if_count_less_than_K' },
        ],
        feedback:
          'count_i < K인 색상은 K개를 모두 해당 색으로 뽑을 수 없으므로 확률이 0입니다. 건너뛰지 않으면 (count_i - j)가 음수가 되어 계산 오류가 발생합니다.',
      },
      {
        tag: 'miss_mutual_exclusion',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'mutually_exclusive_sum' },
        ],
        feedback:
          '각 색상별 사건은 상호 배타적입니다 (K개가 빨간색이면서 동시에 파란색일 수 없음). 따라서 각 색상의 확률을 단순 합산하면 됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: '각 색상별로 K개 모두 해당 색일 확률을 곱셈으로 구하고, 상호 배타적이므로 단순 합산.',
      mentor_hint: '복원 vs 비복원 추출의 차이를 정확히 이해해야 한다. 비복원이면 두 번째부터 분모가 줄어든다.',
      pattern_trigger: '"주머니에서 K개를 뽑아 조건을 만족할 확률"이 보이면 → 조건별로 확률을 곱하고 상호 배타적 사건은 합산하라.',
      why_it_works: '"모두 같은 색" = "모두 색1" ∪ "모두 색2" ∪ ... 이고 이 사건들은 상호 배타적이므로 P = Σ P(모두 색i). 각 P는 비복원 추출의 순차 곱 (c_i/t) × ((c_i-1)/(t-1)) × ... 이다.',
    },
  },
];
