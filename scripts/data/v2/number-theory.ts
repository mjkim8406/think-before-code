import type { ProblemV2 } from '../types';

export const NUMBER_THEORY_V2: ProblemV2[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1929 — 소수 구하기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001929-boj',
    title: '소수 구하기',
    difficulty: 'easy',
    domain: 'number_theory',
    summary: 'M 이상 N 이하의 소수를 에라토스테네스의 체로 구하는 기본 문제',
    tags: ['number-theory', 'sieve', 'math'],
    input_type: 'two_integers',
    output_type: 'list_of_primes',
    constraints: {
      range_query: true,
      sieve_required: true,
      input_size_hint: '1 <= M <= N <= 1,000,000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['list_of_primes', 'count', 'single_value', 'boolean_existence', 'minimum_steps'],
          accepted_answers: ['list_of_primes'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'range_M_to_N',
            'single_integer',
            'need_all_primes_in_range',
            'sorted_data',
            'large_N_up_to_1M',
          ],
          accepted_answers: ['range_M_to_N', 'need_all_primes_in_range', 'large_N_up_to_1M'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_all_primes_in_range_M_to_N',
            'sieve_of_eratosthenes_basic',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['sieve_of_eratosthenes', 'trial_division', 'prime_factorization', 'binary_search', 'dp_bottom_up', 'brute_force'],
          accepted_answers: ['sieve_of_eratosthenes'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'need_all_primes_in_range',
            'N_up_to_1M_sieve_feasible',
            'sieve_is_O_N_log_log_N',
            'individual_check_too_slow',
            'need_single_prime_check',
          ],
          accepted_answers: ['need_all_primes_in_range', 'N_up_to_1M_sieve_feasible', 'sieve_is_O_N_log_log_N'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['boolean_array', 'sqrt_optimization', 'range_filtering', 'memoization', 'two_pointer'],
          accepted_answers: ['boolean_array', 'sqrt_optimization', 'range_filtering'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['boolean_array_isPrime', 'list', 'set', 'priority_queue', 'map'],
          accepted_answers: ['boolean_array_isPrime'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'init_all_true',
            'mark_multiples_from_2',
            'start_marking_from_i_squared',
            'filter_range_M_to_N',
            'trial_division_per_number',
          ],
          accepted_answers: ['init_all_true', 'mark_multiples_from_2', 'start_marking_from_i_squared', 'filter_range_M_to_N'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_array', label: 'isPrime[0..N]을 true로 초기화, isPrime[0]=isPrime[1]=false' },
          { id: 'sieve_loop', label: 'i=2부터 sqrt(N)까지 순회, isPrime[i]이면 i*i부터 i의 배수를 false 처리' },
          { id: 'filter_range', label: 'M부터 N까지 isPrime[i]가 true인 수 출력' },
        ],
        correct_order: ['init_array', 'sieve_loop', 'filter_range'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'zero_and_one_not_prime',
          'mark_from_i_squared_optimization',
          'M_equals_1_skip_1',
          'i_times_i_overflow_check',
          'M_equals_N',
          'N_equals_2_smallest_prime',
        ],
        required_answers: ['zero_and_one_not_prime', 'mark_from_i_squared_optimization', 'M_equals_1_skip_1'],
        recommended_answers: ['i_times_i_overflow_check'],
        optional_answers: ['M_equals_N', 'N_equals_2_smallest_prime'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(NloglogN)', 'O(N*sqrtN)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(NloglogN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(1)', 'O(sqrtN)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'sieve_harmonic_sum_NloglogN',
            'boolean_array_size_N',
            'each_composite_marked_once_per_prime_factor',
            'trial_division_is_N_sqrtN',
            'output_size_at_most_N',
          ],
          accepted_answers: ['sieve_harmonic_sum_NloglogN', 'boolean_array_size_N', 'each_composite_marked_once_per_prime_factor'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'sieve_and_filter',
        label: '에라토스테네스의 체 + 범위 필터링',
        pattern_analysis_answer: 'sieve_of_eratosthenes',
        required_strategy_tags: ['init_all_true', 'mark_multiples_from_2', 'start_marking_from_i_squared', 'filter_range_M_to_N'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_sieve',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'trial_division' },
        ],
        feedback:
          '각 수마다 나눗셈으로 소수 판별하면 O(N * sqrt(N))입니다. N=10^6에서 가능하지만 체보다 느립니다. 에라토스테네스의 체를 사용하세요.',
      },
      {
        tag: 'include_one',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'zero_and_one_not_prime' },
        ],
        feedback:
          '0과 1은 소수가 아닙니다. isPrime[0]과 isPrime[1]을 false로 초기화해야 합니다.',
      },
      {
        tag: 'no_sqrt_optimization',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'mark_from_i_squared_optimization' },
        ],
        feedback:
          '체에서 i의 배수를 지울 때 i*i부터 시작하면 됩니다. i*2, i*3, ...은 이미 더 작은 소수에 의해 처리되었습니다.',
      },
    ],

    review_notes: {
      core_takeaway: '에라토스테네스의 체: boolean 배열을 true로 초기화하고 2부터 sqrt(N)까지 소수의 배수를 제거. O(N log log N).',
      mentor_hint: '체에서 i*i부터 시작하는 최적화를 잊지 마라. 또한 i*i가 int 범위를 넘을 수 있으므로 long 비교 또는 i <= sqrt(N) 체크.',
      pattern_trigger: '"범위 내 모든 소수" 또는 "소수 판별을 여러 번"이 보이면 → 에라토스테네스의 체를 떠올려라.',
      why_it_works: '합성수는 반드시 sqrt(N) 이하의 소인수를 가진다. 따라서 2~sqrt(N)의 소수 배수만 제거하면 남는 것이 모두 소수다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1934 — 최소공배수
  // ──────────────────────────────────────────────────────
  {
    id: 'b001934-boj',
    title: '최소공배수',
    difficulty: 'easy',
    domain: 'number_theory',
    summary: '유클리드 호제법으로 GCD를 구하고 LCM = A * B / GCD 공식을 적용하는 기본 문제',
    tags: ['number-theory', 'math', 'gcd', 'euclidean-algorithm'],
    input_type: 'pair_integers_multiple_cases',
    output_type: 'single_value_per_case',
    constraints: {
      multiple_test_cases: true,
      gcd_lcm_required: true,
      input_size_hint: 'T <= 1000, 1 <= A, B <= 45,000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'list_of_primes', 'boolean_existence', 'minimum_steps'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'two_integers_per_case',
            'multiple_test_cases',
            'need_LCM_of_two_numbers',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['two_integers_per_case', 'multiple_test_cases', 'need_LCM_of_two_numbers'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'compute_LCM_of_two_numbers',
            'gcd_then_lcm_formula',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['euclidean_gcd', 'prime_factorization', 'brute_force_multiples', 'sieve_of_eratosthenes', 'binary_search', 'dp_bottom_up'],
          accepted_answers: ['euclidean_gcd'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'LCM_equals_A_times_B_div_GCD',
            'euclidean_algorithm_O_log_min',
            'multiple_test_cases_need_fast_method',
            'prime_factorization_unnecessary',
            'need_all_primes_in_range',
          ],
          accepted_answers: ['LCM_equals_A_times_B_div_GCD', 'euclidean_algorithm_O_log_min', 'multiple_test_cases_need_fast_method'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['recursion', 'modular_arithmetic', 'overflow_prevention', 'memoization', 'two_pointer'],
          accepted_answers: ['recursion', 'overflow_prevention'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['no_extra_structure', 'array', 'map', 'priority_queue', 'stack'],
          accepted_answers: ['no_extra_structure'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'gcd_recursive_or_iterative',
            'lcm_formula_A_div_gcd_times_B',
            'enumerate_multiples',
            'prime_factorize_both',
            'overflow_safe_division_first',
          ],
          accepted_answers: ['gcd_recursive_or_iterative', 'lcm_formula_A_div_gcd_times_B', 'overflow_safe_division_first'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_input', label: 'T개의 테스트 케이스에 대해 A, B 입력' },
          { id: 'compute_gcd', label: '유클리드 호제법으로 GCD(A, B) 계산' },
          { id: 'compute_lcm', label: 'LCM = A / GCD * B로 계산 (오버플로우 방지)' },
          { id: 'output', label: 'LCM 출력' },
        ],
        correct_order: ['read_input', 'compute_gcd', 'compute_lcm', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'A_times_B_overflow_use_division_first',
          'gcd_base_case_gcd_n_0_equals_n',
          'A_equals_B_lcm_equals_A',
          'one_of_them_is_1_lcm_equals_other',
          'negative_numbers_not_in_constraint',
        ],
        required_answers: ['A_times_B_overflow_use_division_first', 'gcd_base_case_gcd_n_0_equals_n'],
        recommended_answers: ['A_equals_B_lcm_equals_A'],
        optional_answers: ['one_of_them_is_1_lcm_equals_other', 'negative_numbers_not_in_constraint'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(T*log(min(A,B)))', 'O(T*A)', 'O(T*sqrtA)', 'O(T*N)'],
          accepted_answers: ['O(T*log(min(A,B)))'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(T)', 'O(A)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'euclidean_halves_smaller_value_each_step',
            'no_auxiliary_structure_needed',
            'T_test_cases_each_O_log',
            'enumeration_is_O_B',
            'recursion_depth_log_min',
          ],
          accepted_answers: ['euclidean_halves_smaller_value_each_step', 'no_auxiliary_structure_needed', 'T_test_cases_each_O_log'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'euclidean_gcd_lcm',
        label: '유클리드 호제법 GCD + LCM 공식',
        pattern_analysis_answer: 'euclidean_gcd',
        required_strategy_tags: ['gcd_recursive_or_iterative', 'lcm_formula_A_div_gcd_times_B', 'overflow_safe_division_first'],
      },
    ],

    common_mistakes: [
      {
        tag: 'overflow_multiply_first',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'A_times_B_overflow_use_division_first' },
        ],
        feedback:
          'A * B를 먼저 계산하면 45000 * 45000 = 2 * 10^9로 int 경계입니다. A / GCD * B 순서로 나눗셈을 먼저 하여 오버플로우를 방지하세요.',
      },
      {
        tag: 'wrong_base_case',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'gcd_base_case_gcd_n_0_equals_n' },
        ],
        feedback:
          '유클리드 호제법의 기저 조건은 gcd(n, 0) = n입니다. 이를 잘못 구현하면 무한 재귀 또는 0 반환이 발생합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'LCM(A, B) = A / GCD(A, B) * B. GCD는 유클리드 호제법으로 O(log(min(A,B)))에 계산.',
      mentor_hint: '오버플로우 방지를 위해 A * B / GCD가 아니라 A / GCD * B 순서로 계산하라. A는 항상 GCD로 나누어 떨어진다.',
      pattern_trigger: '"최소공배수" 또는 "LCM"이 보이면 → 유클리드 호제법으로 GCD를 구한 뒤 공식을 적용하라.',
      why_it_works: 'A와 B의 소인수 분해에서 LCM은 각 소인수의 최대 지수, GCD는 최소 지수를 취한다. 따라서 A * B = GCD * LCM이 성립한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1850 — 최대공약수
  // ──────────────────────────────────────────────────────
  {
    id: 'b001850-boj',
    title: '최대공약수',
    difficulty: 'easy',
    domain: 'number_theory',
    summary: '1이 연속된 수의 GCD가 R(GCD(a,b))임을 파악하는 수학적 관찰 문제',
    tags: ['number-theory', 'math', 'gcd', 'euclidean-algorithm'],
    input_type: 'two_integers',
    output_type: 'repeated_ones',
    constraints: {
      repunit_numbers: true,
      unsigned_64bit: true,
      input_size_hint: '1 <= A, B <= 2^63 - 1',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['repeated_ones_string', 'single_value', 'count', 'boolean_existence', 'list_of_primes'],
          accepted_answers: ['repeated_ones_string'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'two_counts_of_ones',
            'repunit_R_a_and_R_b',
            'actual_numbers_too_large_to_store',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['two_counts_of_ones', 'repunit_R_a_and_R_b', 'actual_numbers_too_large_to_store'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'gcd_of_repunits_is_repunit_of_gcd',
            'mathematical_property_of_repunit_gcd',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['mathematical_observation_gcd', 'big_integer_gcd', 'euclidean_gcd', 'sieve_of_eratosthenes', 'brute_force', 'string_manipulation'],
          accepted_answers: ['mathematical_observation_gcd'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'R_a_too_large_to_represent',
            'gcd_R_a_R_b_equals_R_gcd_a_b',
            'reduce_to_gcd_of_counts',
            'need_big_integer_library',
            'pattern_matching_on_examples',
          ],
          accepted_answers: ['R_a_too_large_to_represent', 'gcd_R_a_R_b_equals_R_gcd_a_b', 'reduce_to_gcd_of_counts'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['euclidean_algorithm', 'string_output', 'modular_arithmetic', 'memoization', 'two_pointer'],
          accepted_answers: ['euclidean_algorithm', 'string_output'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['long_long_variables', 'string_builder', 'array', 'big_integer', 'map'],
          accepted_answers: ['long_long_variables', 'string_builder'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'compute_gcd_of_a_b',
            'output_gcd_ones',
            'big_integer_gcd_direct',
            'string_comparison',
            'use_unsigned_64bit',
          ],
          accepted_answers: ['compute_gcd_of_a_b', 'output_gcd_ones', 'use_unsigned_64bit'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_ab', label: 'A, B 입력 (각각 1의 개수)' },
          { id: 'compute_gcd', label: '유클리드 호제법으로 g = GCD(A, B) 계산' },
          { id: 'output_ones', label: '1을 g번 출력' },
        ],
        correct_order: ['read_ab', 'compute_gcd', 'output_ones'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'unsigned_64bit_or_long_long',
          'gcd_result_can_be_very_large',
          'output_may_need_string_builder',
          'A_equals_B_output_A_ones',
          'gcd_0_n_equals_n',
        ],
        required_answers: ['unsigned_64bit_or_long_long', 'gcd_result_can_be_very_large', 'output_may_need_string_builder'],
        recommended_answers: ['A_equals_B_output_A_ones'],
        optional_answers: ['gcd_0_n_equals_n'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(log(min(A,B))+g)', 'O(A+B)', 'O(A*B)', 'O(sqrtA)'],
          accepted_answers: ['O(log(min(A,B))+g)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(g)', 'O(1)', 'O(A)', 'O(A+B)'],
          accepted_answers: ['O(g)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'euclidean_gcd_O_log',
            'output_g_ones_O_g',
            'string_builder_size_g',
            'no_need_for_big_integer',
            'gcd_dominates_if_g_large',
          ],
          accepted_answers: ['euclidean_gcd_O_log', 'output_g_ones_O_g', 'string_builder_size_g'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'repunit_gcd_property',
        label: 'GCD(R(a), R(b)) = R(GCD(a, b)) 성질 이용',
        pattern_analysis_answer: 'mathematical_observation_gcd',
        required_strategy_tags: ['compute_gcd_of_a_b', 'output_gcd_ones', 'use_unsigned_64bit'],
      },
    ],

    common_mistakes: [
      {
        tag: 'try_big_integer',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'big_integer_gcd' },
        ],
        feedback:
          'R(a)를 실제로 구하면 최대 2^63자리 수가 됩니다. 수학적 성질 GCD(R(a), R(b)) = R(GCD(a, b))를 이용하면 GCD만 구하면 됩니다.',
      },
      {
        tag: 'no_unsigned',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'unsigned_64bit_or_long_long' },
        ],
        feedback:
          'A, B가 2^63 - 1까지 가능합니다. 부호 있는 정수 타입으로는 범위를 초과할 수 있으므로 unsigned 또는 적절한 큰 정수 타입을 사용하세요.',
      },
    ],

    review_notes: {
      core_takeaway: 'GCD(R(a), R(b)) = R(GCD(a, b)). 1의 개수에 대해 유클리드 호제법을 적용하고 결과만큼 1을 출력.',
      mentor_hint: '핵심은 수학적 성질을 알아내는 것이다. 예시로 확인: R(6)과 R(4)의 GCD가 R(2)=11인지 검증해보라.',
      pattern_trigger: '"1이 반복되는 수의 GCD" 또는 "직접 표현할 수 없는 큰 수의 GCD"가 보이면 → 수학적 성질로 축소할 수 있는지 확인하라.',
      why_it_works: 'R(a) = R(b) * 10^(a-b) + R(a-b) (a > b)이므로 유클리드 호제법과 동일한 나머지 구조를 가진다. 따라서 GCD도 동일한 재귀 구조를 따른다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1456 — 거의 소수
  // ──────────────────────────────────────────────────────
  {
    id: 'b001456-boj',
    title: '거의 소수',
    difficulty: 'medium',
    domain: 'number_theory',
    summary: 'sqrt(B)까지의 소수를 체로 구한 뒤 각 소수의 거듭제곱이 [A, B] 범위에 속하는지 카운트하는 문제',
    tags: ['number-theory', 'sieve', 'math'],
    input_type: 'two_integers',
    output_type: 'count',
    constraints: {
      almost_prime_definition: true,
      large_range: true,
      input_size_hint: '1 <= A <= B <= 10^14',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'single_value', 'list_of_primes', 'boolean_existence', 'minimum_steps'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'range_A_to_B',
            'B_up_to_10_14',
            'count_prime_powers_k_geq_2',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['range_A_to_B', 'B_up_to_10_14', 'count_prime_powers_k_geq_2'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_prime_powers_in_range',
            'sieve_then_enumerate_powers',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['sieve_plus_power_enumeration', 'factorize_each_number', 'range_sieve', 'binary_search', 'dp_bottom_up', 'brute_force'],
          accepted_answers: ['sieve_plus_power_enumeration'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'p_squared_leq_B_means_p_leq_sqrt_B',
            'sqrt_10_14_is_10_7_sieve_feasible',
            'enumerate_powers_per_prime',
            'factorize_each_too_slow',
            'need_all_primes_in_range',
          ],
          accepted_answers: ['p_squared_leq_B_means_p_leq_sqrt_B', 'sqrt_10_14_is_10_7_sieve_feasible', 'enumerate_powers_per_prime'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['overflow_safe_multiplication', 'sieve_of_eratosthenes', 'counting', 'memoization', 'two_pointer'],
          accepted_answers: ['overflow_safe_multiplication', 'sieve_of_eratosthenes', 'counting'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['sieve_array_sqrt_B', 'counter_variable', 'array', 'map', 'priority_queue'],
          accepted_answers: ['sieve_array_sqrt_B', 'counter_variable'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sieve_up_to_sqrt_B',
            'for_each_prime_enumerate_powers',
            'check_power_in_range_A_B',
            'overflow_check_before_multiply',
            'factorize_each_number_individually',
          ],
          accepted_answers: ['sieve_up_to_sqrt_B', 'for_each_prime_enumerate_powers', 'check_power_in_range_A_B', 'overflow_check_before_multiply'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'sieve', label: 'sqrt(B) = 10^7까지 에라토스테네스의 체로 소수 목록 생성' },
          { id: 'init_count', label: '카운터 = 0 초기화' },
          { id: 'power_loop', label: '각 소수 p에 대해 cur = p*p부터 시작, cur <= B인 동안 반복' },
          { id: 'range_check', label: 'cur >= A이면 카운터 증가' },
          { id: 'safe_multiply', label: 'cur <= B/p이면 cur *= p, 아니면 break (오버플로우 방지)' },
          { id: 'output', label: '카운터 출력' },
        ],
        correct_order: ['sieve', 'init_count', 'power_loop', 'range_check', 'safe_multiply', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'overflow_check_cur_leq_B_div_p',
          'sieve_size_10_7_memory',
          'A_equals_1_is_not_almost_prime',
          'long_long_for_cur',
          'p_squared_may_exceed_B',
          'B_equals_A_single_number',
        ],
        required_answers: ['overflow_check_cur_leq_B_div_p', 'long_long_for_cur', 'A_equals_1_is_not_almost_prime'],
        recommended_answers: ['sieve_size_10_7_memory'],
        optional_answers: ['p_squared_may_exceed_B', 'B_equals_A_single_number'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(sqrtB*loglog(sqrtB))', 'O(B)', 'O(B*sqrtB)', 'O(NlogN)'],
          accepted_answers: ['O(sqrtB*loglog(sqrtB))'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(sqrtB)', 'O(B)', 'O(1)', 'O(N)'],
          accepted_answers: ['O(sqrtB)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'sieve_dominates_time',
            'sieve_array_size_sqrt_B',
            'power_enumeration_negligible',
            'factorize_each_is_B_sqrt_B',
            'counter_O_1_space',
          ],
          accepted_answers: ['sieve_dominates_time', 'sieve_array_size_sqrt_B', 'power_enumeration_negligible'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'sieve_power_enumeration',
        label: '체 + 소수 거듭제곱 열거',
        pattern_analysis_answer: 'sieve_plus_power_enumeration',
        required_strategy_tags: ['sieve_up_to_sqrt_B', 'for_each_prime_enumerate_powers', 'check_power_in_range_A_B', 'overflow_check_before_multiply'],
      },
    ],

    common_mistakes: [
      {
        tag: 'overflow_multiply',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'overflow_check_cur_leq_B_div_p' },
        ],
        feedback:
          'cur *= p를 무조건 수행하면 long long 범위를 초과할 수 있습니다. cur <= B / p인지 먼저 확인하고 곱해야 합니다.',
      },
      {
        tag: 'no_long_long',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'long_long_for_cur' },
        ],
        feedback:
          'B가 10^14이므로 int로는 표현할 수 없습니다. cur와 관련 변수를 반드시 long long으로 선언하세요.',
      },
      {
        tag: 'factorize_each',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'factorize_each_number' },
        ],
        feedback:
          'A부터 B까지 각 수를 소인수분해하면 B가 10^14이므로 시간 초과입니다. 소수의 거듭제곱을 열거하는 방식이 효율적입니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'sqrt(B)까지의 소수를 체로 구하고, 각 소수 p에 대해 p^2, p^3, ...이 [A, B]에 속하는지 카운트.',
      mentor_hint: '오버플로우 방지가 핵심이다. cur *= p 전에 cur <= B / p를 확인하라. 나눗셈으로 상한을 체크하는 패턴을 익혀두라.',
      pattern_trigger: '"소수의 거듭제곱 조건" 또는 "범위 내 특수 조건 수 카운트"가 보이면 → 체 + 거듭제곱 열거를 떠올려라.',
      why_it_works: '거의 소수 p^k에서 k >= 2이므로 p <= sqrt(B)이다. sqrt(B) = 10^7까지의 소수만 체로 구하면 모든 후보를 열거할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1747 — 소수&팰린드롬
  // ──────────────────────────────────────────────────────
  {
    id: 'b001747-boj',
    title: '소수&팰린드롬',
    difficulty: 'easy',
    domain: 'number_theory',
    summary: '에라토스테네스의 체로 소수를 구한 뒤 N 이상의 첫 번째 소수이면서 팰린드롬인 수를 찾는 문제',
    tags: ['number-theory', 'sieve', 'string', 'palindrome'],
    input_type: 'single_integer',
    output_type: 'single_value',
    constraints: {
      prime_and_palindrome: true,
      sieve_range_larger_than_N: true,
      input_size_hint: '1 <= N <= 1,000,000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'list_of_primes', 'boolean_existence', 'minimum_steps'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_integer_N',
            'find_smallest_geq_N',
            'must_be_prime_and_palindrome',
            'sorted_data',
            'range_query',
          ],
          accepted_answers: ['single_integer_N', 'find_smallest_geq_N', 'must_be_prime_and_palindrome'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_smallest_prime_palindrome_geq_N',
            'sieve_plus_palindrome_check',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['sieve_plus_condition_check', 'trial_division', 'generate_palindromes', 'binary_search', 'dp_bottom_up', 'brute_force'],
          accepted_answers: ['sieve_plus_condition_check'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'need_prime_check_for_many_numbers',
            'sieve_precomputes_primality',
            'palindrome_check_is_O_digits',
            'answer_may_exceed_N',
            'need_shortest_path',
          ],
          accepted_answers: ['need_prime_check_for_many_numbers', 'sieve_precomputes_primality', 'palindrome_check_is_O_digits', 'answer_may_exceed_N'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['string_reversal', 'linear_scan', 'sieve_of_eratosthenes', 'memoization', 'two_pointer'],
          accepted_answers: ['string_reversal', 'linear_scan', 'sieve_of_eratosthenes'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['boolean_array_isPrime', 'string_for_palindrome', 'array', 'map', 'priority_queue'],
          accepted_answers: ['boolean_array_isPrime', 'string_for_palindrome'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sieve_up_to_2M_or_more',
            'scan_from_N_upward',
            'check_prime_and_palindrome',
            'generate_palindromes_then_prime_check',
            'trial_division_per_number',
          ],
          accepted_answers: ['sieve_up_to_2M_or_more', 'scan_from_N_upward', 'check_prime_and_palindrome'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'sieve', label: '에라토스테네스의 체를 넉넉한 범위(~2,000,000)까지 구성' },
          { id: 'scan', label: 'i = N부터 순회 시작' },
          { id: 'check_prime', label: 'isPrime[i]가 true인지 확인' },
          { id: 'check_palindrome', label: '숫자를 문자열로 변환하여 팰린드롬인지 확인' },
          { id: 'output', label: '두 조건 모두 만족하는 첫 번째 i를 출력' },
        ],
        correct_order: ['sieve', 'scan', 'check_prime', 'check_palindrome', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'sieve_range_must_exceed_N',
          'one_is_not_prime',
          'palindrome_check_string_reversal',
          'answer_may_be_7_digit_palindrome',
          'N_equals_1_answer_is_2',
          'two_is_smallest_prime_palindrome',
        ],
        required_answers: ['sieve_range_must_exceed_N', 'one_is_not_prime', 'palindrome_check_string_reversal'],
        recommended_answers: ['answer_may_be_7_digit_palindrome'],
        optional_answers: ['N_equals_1_answer_is_2', 'two_is_smallest_prime_palindrome'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(MAX*loglog(MAX))', 'O(N*sqrtN)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(MAX*loglog(MAX))'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(MAX)', 'O(N)', 'O(1)', 'O(N^2)'],
          accepted_answers: ['O(MAX)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'sieve_construction_dominates',
            'boolean_array_size_MAX',
            'palindrome_check_O_digits_negligible',
            'linear_scan_O_MAX_worst_case',
            'trial_division_is_slower',
          ],
          accepted_answers: ['sieve_construction_dominates', 'boolean_array_size_MAX', 'palindrome_check_O_digits_negligible'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'sieve_scan_palindrome',
        label: '에라토스테네스의 체 + N부터 순차 탐색 + 팰린드롬 체크',
        pattern_analysis_answer: 'sieve_plus_condition_check',
        required_strategy_tags: ['sieve_up_to_2M_or_more', 'scan_from_N_upward', 'check_prime_and_palindrome'],
      },
    ],

    common_mistakes: [
      {
        tag: 'sieve_too_small',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'sieve_range_must_exceed_N' },
        ],
        feedback:
          '체 범위를 N까지만 잡으면 답이 N을 초과할 때 찾을 수 없습니다. N=1,000,000일 때 답이 1003001일 수 있으므로 약 200만 이상으로 체 범위를 잡아야 합니다.',
      },
      {
        tag: 'include_one',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'one_is_not_prime' },
        ],
        feedback:
          '1은 소수가 아닙니다. N=1일 때 답은 2입니다.',
      },
    ],

    review_notes: {
      core_takeaway: '체를 넉넉한 범위(~200만)까지 구성한 뒤 N부터 순회하며 소수이면서 팰린드롬인 첫 번째 수를 반환.',
      mentor_hint: '체 범위 설정이 핵심이다. 답이 N을 넘을 수 있으므로 충분히 큰 상한을 잡아야 한다. 1003001(7자리 팰린드롬 소수)까지 고려하라.',
      pattern_trigger: '"소수이면서 추가 조건을 만족하는 최소 수"가 보이면 → 체로 소수를 전처리하고 조건 체크를 결합하라.',
      why_it_works: '체로 O(MAX log log MAX)에 소수 여부를 전처리하면, 이후 각 수의 소수 판별이 O(1)이다. 팰린드롬 체크는 O(자릿수)로 무시할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11689 — GCD(n, k) = 1
  // ──────────────────────────────────────────────────────
  {
    id: 'b011689-boj',
    title: 'GCD(n, k) = 1',
    difficulty: 'medium',
    domain: 'number_theory',
    summary: '오일러 피 함수 phi(n)을 소인수분해로 O(sqrt(n))에 계산하는 문제',
    tags: ['number-theory', 'euler-totient', 'math', 'prime-factorization'],
    input_type: 'single_integer',
    output_type: 'single_value',
    constraints: {
      euler_totient: true,
      large_n: true,
      input_size_hint: '1 <= n <= 10^12',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'list_of_primes', 'boolean_existence', 'minimum_steps'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_large_integer_n',
            'count_coprime_to_n',
            'euler_totient_phi_n',
            'sorted_data',
            'range_query',
          ],
          accepted_answers: ['single_large_integer_n', 'count_coprime_to_n', 'euler_totient_phi_n'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'compute_euler_totient_phi_n',
            'count_integers_coprime_to_n',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['prime_factorization_euler_phi', 'sieve_of_eratosthenes', 'brute_force_gcd', 'inclusion_exclusion', 'binary_search', 'dp_bottom_up'],
          accepted_answers: ['prime_factorization_euler_phi'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'phi_formula_uses_prime_factors',
            'sqrt_n_factorization_O_10_6',
            'brute_force_gcd_O_n_too_slow',
            'sieve_up_to_10_12_impossible',
            'single_n_not_range',
          ],
          accepted_answers: ['phi_formula_uses_prime_factors', 'sqrt_n_factorization_O_10_6', 'brute_force_gcd_O_n_too_slow'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['trial_division', 'overflow_prevention', 'remainder_prime_factor', 'memoization', 'two_pointer'],
          accepted_answers: ['trial_division', 'overflow_prevention', 'remainder_prime_factor'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['long_long_result', 'no_extra_structure', 'array', 'sieve_array', 'map'],
          accepted_answers: ['long_long_result', 'no_extra_structure'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'factorize_by_trial_division',
            'apply_phi_formula_per_prime',
            'division_first_avoid_overflow',
            'check_remaining_factor_after_sqrt',
            'sieve_then_lookup',
          ],
          accepted_answers: ['factorize_by_trial_division', 'apply_phi_formula_per_prime', 'division_first_avoid_overflow', 'check_remaining_factor_after_sqrt'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_result', label: 'result = n으로 초기화' },
          { id: 'trial_div', label: 'i = 2부터 sqrt(n)까지 순회, n이 i로 나누어지면 소인수 p = i 발견' },
          { id: 'apply_phi', label: 'result = result / p * (p - 1) 적용' },
          { id: 'remove_factor', label: 'n에서 p를 모두 나누어 제거' },
          { id: 'remaining', label: '순회 후 n > 1이면 남은 n도 소인수이므로 result = result / n * (n - 1)' },
          { id: 'output', label: 'result 출력' },
        ],
        correct_order: ['init_result', 'trial_div', 'apply_phi', 'remove_factor', 'remaining', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'long_long_required_n_up_to_10_12',
          'division_before_multiply_overflow',
          'remaining_factor_after_sqrt',
          'n_equals_1_phi_is_1',
          'n_is_prime_phi_is_n_minus_1',
          'sqrt_boundary_i_times_i_leq_n',
        ],
        required_answers: ['long_long_required_n_up_to_10_12', 'division_before_multiply_overflow', 'remaining_factor_after_sqrt'],
        recommended_answers: ['n_equals_1_phi_is_1'],
        optional_answers: ['n_is_prime_phi_is_n_minus_1', 'sqrt_boundary_i_times_i_leq_n'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(sqrtN)', 'O(N)', 'O(NlogN)', 'O(N^2)'],
          accepted_answers: ['O(sqrtN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(sqrtN)', 'O(logN)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'trial_division_up_to_sqrt_n',
            'only_constant_variables',
            'no_sieve_needed_for_single_n',
            'brute_force_is_O_n',
            'sqrt_10_12_is_10_6_fast',
          ],
          accepted_answers: ['trial_division_up_to_sqrt_n', 'only_constant_variables', 'sqrt_10_12_is_10_6_fast'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'trial_div_euler_phi',
        label: '시행 나눗셈 소인수분해 + 오일러 피 공식',
        pattern_analysis_answer: 'prime_factorization_euler_phi',
        required_strategy_tags: ['factorize_by_trial_division', 'apply_phi_formula_per_prime', 'division_first_avoid_overflow', 'check_remaining_factor_after_sqrt'],
      },
    ],

    common_mistakes: [
      {
        tag: 'brute_force_gcd',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force_gcd' },
        ],
        feedback:
          '1부터 n까지 모든 수에 대해 GCD를 계산하면 O(n log n)입니다. n=10^12에서 시간 초과입니다. 소인수분해 후 오일러 피 공식을 사용하세요.',
      },
      {
        tag: 'miss_remaining_factor',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'remaining_factor_after_sqrt' },
        ],
        feedback:
          'sqrt(n)까지 나눈 후 n > 1이면 남은 n 자체가 소인수입니다. 이를 처리하지 않으면 phi 값이 잘못됩니다.',
      },
      {
        tag: 'overflow_multiply_first',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'division_before_multiply_overflow' },
        ],
        feedback:
          'result * (p - 1) / p 순서로 계산하면 중간에 오버플로우가 발생할 수 있습니다. result / p * (p - 1) 순서로 나눗셈을 먼저 하세요. result는 항상 p로 나누어 떨어집니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'phi(n) = n * product((p-1)/p). 시행 나눗셈으로 소인수를 찾고 result = result / p * (p - 1)을 적용. sqrt(n) 이후 잔여 소인수 처리 필수.',
      mentor_hint: '오일러 피의 핵심은 "나눗셈을 먼저"이다. result는 항상 p의 배수이므로 나눗셈이 정수로 떨어진다.',
      pattern_trigger: '"n과 서로소인 수의 개수" 또는 "오일러 피 함수"가 보이면 → 소인수분해 + phi 공식을 떠올려라.',
      why_it_works: '오일러 피 함수는 곱셈적(multiplicative)이다. n의 소인수 분해 n = p1^a1 * ... * pk^ak에 대해 phi(n) = n * product((1 - 1/pi))이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1016 — 제곱 ㄴㄴ 수
  // ──────────────────────────────────────────────────────
  {
    id: 'b001016-boj',
    title: '제곱 ㄴㄴ 수',
    difficulty: 'hard',
    domain: 'number_theory',
    summary: '범위 체(range sieve)로 [min, max] 구간에서 소수 제곱의 배수를 제거하여 squarefree 수를 카운트하는 문제',
    tags: ['number-theory', 'sieve', 'math', 'range-sieve'],
    input_type: 'two_integers',
    output_type: 'count',
    constraints: {
      squarefree_number: true,
      range_sieve_required: true,
      input_size_hint: '1 <= min <= max <= 10^12, max - min <= 1,000,000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'single_value', 'list_of_primes', 'boolean_existence', 'minimum_steps'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'range_min_to_max',
            'max_up_to_10_12',
            'range_length_up_to_10_6',
            'count_squarefree_in_range',
            'single_integer',
          ],
          accepted_answers: ['range_min_to_max', 'max_up_to_10_12', 'range_length_up_to_10_6', 'count_squarefree_in_range'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_squarefree_numbers_in_range',
            'range_sieve_with_square_multiples',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['range_sieve', 'factorize_each_number', 'inclusion_exclusion', 'sieve_of_eratosthenes', 'binary_search', 'brute_force'],
          accepted_answers: ['range_sieve'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'range_length_small_array_feasible',
            'max_too_large_for_full_sieve',
            'mark_p_squared_multiples_in_range',
            'primes_up_to_sqrt_max_is_10_6',
            'need_shortest_path',
          ],
          accepted_answers: ['range_length_small_array_feasible', 'max_too_large_for_full_sieve', 'mark_p_squared_multiples_in_range', 'primes_up_to_sqrt_max_is_10_6'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['offset_indexing', 'sieve_of_eratosthenes', 'ceil_division', 'memoization', 'two_pointer'],
          accepted_answers: ['offset_indexing', 'sieve_of_eratosthenes', 'ceil_division'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['prime_sieve_sqrt_max', 'boolean_array_range', 'array', 'map', 'segment_tree'],
          accepted_answers: ['prime_sieve_sqrt_max', 'boolean_array_range'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sieve_primes_up_to_sqrt_max',
            'mark_p_squared_multiples_in_offset_array',
            'ceil_min_div_p2_for_start',
            'count_unmarked_as_squarefree',
            'factorize_each_number_in_range',
          ],
          accepted_answers: ['sieve_primes_up_to_sqrt_max', 'mark_p_squared_multiples_in_offset_array', 'ceil_min_div_p2_for_start', 'count_unmarked_as_squarefree'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'small_sieve', label: 'sqrt(max) = 10^6까지 에라토스테네스의 체로 소수 목록 생성' },
          { id: 'init_range', label: 'boolean 배열 marked[0..max-min]을 false로 초기화' },
          { id: 'mark_loop', label: '각 소수 p에 대해 p^2의 배수 중 [min, max] 범위에 있는 것을 marked에 표시' },
          { id: 'start_calc', label: '시작점 = ceil(min / p^2) * p^2로 계산' },
          { id: 'count', label: 'marked가 false인 원소의 수를 카운트하여 출력' },
        ],
        correct_order: ['small_sieve', 'init_range', 'mark_loop', 'start_calc', 'count'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'ceil_division_integer_formula',
          'offset_indexing_arr_x_minus_min',
          'one_is_squarefree',
          'p_squared_overflow_long_long',
          'min_equals_max',
          'min_equals_1',
        ],
        required_answers: ['ceil_division_integer_formula', 'offset_indexing_arr_x_minus_min', 'one_is_squarefree', 'p_squared_overflow_long_long'],
        recommended_answers: ['min_equals_1'],
        optional_answers: ['min_equals_max'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(sqrtMax*loglog(sqrtMax)+(max-min))', 'O(max)', 'O((max-min)*sqrtMax)', 'O(NlogN)'],
          accepted_answers: ['O(sqrtMax*loglog(sqrtMax)+(max-min))'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(sqrtMax+(max-min))', 'O(max)', 'O(1)', 'O(N)'],
          accepted_answers: ['O(sqrtMax+(max-min))'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'small_sieve_sqrt_max',
            'range_array_max_minus_min',
            'marking_sums_to_range_size',
            'full_sieve_max_impossible',
            'each_composite_marked_once',
          ],
          accepted_answers: ['small_sieve_sqrt_max', 'range_array_max_minus_min', 'marking_sums_to_range_size'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'range_sieve_squarefree',
        label: '범위 체: 소수 체 + p^2 배수 표시 + 카운트',
        pattern_analysis_answer: 'range_sieve',
        required_strategy_tags: ['sieve_primes_up_to_sqrt_max', 'mark_p_squared_multiples_in_offset_array', 'ceil_min_div_p2_for_start', 'count_unmarked_as_squarefree'],
      },
    ],

    common_mistakes: [
      {
        tag: 'full_sieve',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'sieve_of_eratosthenes' },
        ],
        feedback:
          'max가 10^12이므로 전체 범위에 대한 체는 메모리 초과입니다. [min, max] 범위만 관리하는 범위 체(range sieve)를 사용하세요.',
      },
      {
        tag: 'wrong_ceil',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'ceil_division_integer_formula' },
        ],
        feedback:
          'p^2의 배수 시작점을 정확히 계산해야 합니다. ceil(min / p^2) * p^2는 정수로 (min + p^2 - 1) / p^2 * p^2로 계산합니다.',
      },
      {
        tag: 'no_offset',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'offset_indexing_arr_x_minus_min' },
        ],
        feedback:
          '배열 인덱스를 arr[x]로 접근하면 min이 10^12일 때 불가능합니다. arr[x - min]으로 오프셋 인덱싱해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '범위 체: sqrt(max)까지의 소수를 구하고, [min, max] 범위 배열에서 p^2의 배수를 표시. 표시되지 않은 수가 squarefree.',
      mentor_hint: '시작점 계산이 핵심이다. ceil(min / p^2) * p^2를 정수 연산으로 정확히 계산하는 패턴을 반드시 익혀두라.',
      pattern_trigger: '"큰 범위에서 조건을 만족하는 수의 개수" + "범위 길이가 작음"이 보이면 → 범위 체(range sieve)를 떠올려라.',
      why_it_works: '제곱수의 배수인 수는 squarefree가 아니다. p <= sqrt(max)인 소수 p의 p^2 배수만 제거하면 충분하다. 범위 길이가 10^6이므로 배열로 관리 가능하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 21568 — Ax+By=C
  // ──────────────────────────────────────────────────────
  {
    id: 'b021568-boj',
    title: 'Ax+By=C',
    difficulty: 'medium',
    domain: 'number_theory',
    summary: '확장 유클리드 호제법으로 일차 디오판토스 방정식 Ax+By=C의 정수 해를 구하는 문제',
    tags: ['number-theory', 'extended-gcd', 'math', 'euclidean-algorithm'],
    input_type: 'three_integers',
    output_type: 'pair_or_no_solution',
    constraints: {
      linear_diophantine: true,
      extended_gcd_required: true,
      input_size_hint: '-10^9 <= A, B, C <= 10^9',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['integer_pair_xy', 'single_value', 'count', 'boolean_existence', 'minimum_steps'],
          accepted_answers: ['integer_pair_xy'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'linear_equation_Ax_By_C',
            'need_integer_solution',
            'no_solution_possible',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['linear_equation_Ax_By_C', 'need_integer_solution', 'no_solution_possible'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'solve_linear_diophantine_Ax_By_C',
            'extended_gcd_application',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['extended_euclidean', 'brute_force_enumerate_x', 'matrix_equation', 'binary_search', 'dp_bottom_up', 'greedy'],
          accepted_answers: ['extended_euclidean'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'gcd_divides_C_existence_condition',
            'ext_gcd_gives_Ax0_By0_equals_g',
            'scale_solution_by_C_div_g',
            'enumeration_range_too_large',
            'need_shortest_path',
          ],
          accepted_answers: ['gcd_divides_C_existence_condition', 'ext_gcd_gives_Ax0_By0_equals_g', 'scale_solution_by_C_div_g'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['recursion', 'sign_handling', 'overflow_prevention', 'memoization', 'two_pointer'],
          accepted_answers: ['recursion', 'sign_handling', 'overflow_prevention'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['recursive_function', 'no_extra_structure', 'array', 'map', 'stack'],
          accepted_answers: ['recursive_function', 'no_extra_structure'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'ext_gcd_recursive',
            'check_gcd_divides_C',
            'scale_solution_C_div_g',
            'handle_A_or_B_zero',
            'handle_negative_A_or_B',
          ],
          accepted_answers: ['ext_gcd_recursive', 'check_gcd_divides_C', 'scale_solution_C_div_g', 'handle_A_or_B_zero', 'handle_negative_A_or_B'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'compute_gcd', label: 'g = GCD(|A|, |B|) 계산' },
          { id: 'check_divisible', label: 'C % g != 0이면 -1 출력 (해 없음)' },
          { id: 'ext_gcd', label: '확장 유클리드로 Ax0 + By0 = g 만족하는 (x0, y0) 계산' },
          { id: 'scale', label: 'x = x0 * (C/g), y = y0 * (C/g) 계산' },
          { id: 'output', label: 'x, y 출력' },
        ],
        correct_order: ['compute_gcd', 'check_divisible', 'ext_gcd', 'scale', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'A_or_B_is_zero',
          'negative_A_or_B_sign_correction',
          'C_div_g_multiply_overflow',
          'gcd_not_divide_C_no_solution',
          'A_and_B_both_nonzero',
          'C_equals_zero',
        ],
        required_answers: ['A_or_B_is_zero', 'negative_A_or_B_sign_correction', 'C_div_g_multiply_overflow', 'gcd_not_divide_C_no_solution'],
        recommended_answers: ['C_equals_zero'],
        optional_answers: ['A_and_B_both_nonzero'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(log(min(|A|,|B|)))', 'O(A+B)', 'O(A*B)', 'O(sqrtA)'],
          accepted_answers: ['O(log(min(|A|,|B|)))'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(log(min(|A|,|B|)))', 'O(1)', 'O(A)', 'O(N)'],
          accepted_answers: ['O(log(min(|A|,|B|)))'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'euclidean_recursion_depth_log',
            'recursion_stack_log_depth',
            'no_auxiliary_array',
            'brute_force_is_O_range',
            'single_call_per_query',
          ],
          accepted_answers: ['euclidean_recursion_depth_log', 'recursion_stack_log_depth', 'single_call_per_query'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'extended_gcd_solve',
        label: '확장 유클리드 호제법 + 해 스케일링',
        pattern_analysis_answer: 'extended_euclidean',
        required_strategy_tags: ['ext_gcd_recursive', 'check_gcd_divides_C', 'scale_solution_C_div_g', 'handle_A_or_B_zero', 'handle_negative_A_or_B'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_existence_check',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'gcd_not_divide_C_no_solution' },
        ],
        feedback:
          'GCD(A, B)가 C를 나누지 않으면 정수 해가 존재하지 않습니다. 이 조건을 확인하지 않으면 잘못된 답을 출력합니다.',
      },
      {
        tag: 'no_sign_handling',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'negative_A_or_B_sign_correction' },
        ],
        feedback:
          'A 또는 B가 음수일 수 있습니다. GCD는 절댓값으로 구하고, 확장 유클리드의 결과에 부호를 보정해야 합니다.',
      },
      {
        tag: 'no_zero_check',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'A_or_B_is_zero' },
        ],
        feedback:
          'A=0이면 By=C이므로 C%B==0일 때 y=C/B, x는 아무 값. B=0이면 유사하게 처리. 별도 분기가 필요합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '확장 유클리드: gcd(a, 0) = a → x=1, y=0. 재귀에서 x=y1, y=x1-(a/b)*y1. 해 스케일링: x0*(C/g), y0*(C/g).',
      mentor_hint: '확장 유클리드 재귀식을 정확히 외워라: gcd(b, a%b)의 해 (x1, y1)에서 x=y1, y=x1-(a/b)*y1. 이것이 핵심이다.',
      pattern_trigger: '"Ax+By=C 정수 해" 또는 "일차 디오판토스 방정식"이 보이면 → 확장 유클리드 호제법을 떠올려라.',
      why_it_works: 'Bezout의 항등식에 의해 gcd(A,B) | C이면 반드시 정수 해가 존재한다. 확장 유클리드는 gcd를 구하면서 동시에 Bezout 계수를 계산한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1033 — 칵테일
  // ──────────────────────────────────────────────────────
  {
    id: 'b001033-boj',
    title: '칵테일',
    difficulty: 'hard',
    domain: 'number_theory',
    summary: '비율 조건이 트리를 형성함을 파악하고 DFS로 비율을 전파한 뒤 LCM/GCD로 정수 최소화하는 문제',
    tags: ['number-theory', 'graph', 'tree', 'gcd', 'lcm', 'dfs'],
    input_type: 'ratio_conditions',
    output_type: 'integer_weights',
    constraints: {
      tree_structure: true,
      fraction_propagation: true,
      input_size_hint: '2 <= N <= 10, N-1 ratio conditions',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['integer_weights_min_sum', 'single_value', 'count', 'boolean_existence', 'traversal_order'],
          accepted_answers: ['integer_weights_min_sum'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'N_minus_1_ratio_conditions',
            'tree_structure_connecting_all_nodes',
            'all_weights_must_be_positive_integers',
            'minimize_total_sum',
            'single_integer',
          ],
          accepted_answers: ['N_minus_1_ratio_conditions', 'tree_structure_connecting_all_nodes', 'all_weights_must_be_positive_integers', 'minimize_total_sum'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'DFS_ratio_propagation_then_LCM_GCD',
            'tree_fraction_assignment_minimize_sum',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['tree_dfs_fraction_propagation', 'system_of_equations', 'union_find', 'topological_sort', 'brute_force', 'greedy'],
          accepted_answers: ['tree_dfs_fraction_propagation'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'N_minus_1_edges_N_nodes_is_tree',
            'DFS_propagates_ratios_transitively',
            'LCM_makes_all_integers',
            'GCD_minimizes_sum',
            'need_shortest_path',
          ],
          accepted_answers: ['N_minus_1_edges_N_nodes_is_tree', 'DFS_propagates_ratios_transitively', 'LCM_makes_all_integers', 'GCD_minimizes_sum'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['fraction_arithmetic', 'gcd_lcm_operations', 'adjacency_list', 'memoization', 'two_pointer'],
          accepted_answers: ['fraction_arithmetic', 'gcd_lcm_operations', 'adjacency_list'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list_with_ratios', 'fraction_array_num_den', 'gcd_lcm_functions', 'union_find', 'priority_queue'],
          accepted_answers: ['adjacency_list_with_ratios', 'fraction_array_num_den', 'gcd_lcm_functions'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'set_root_to_1_DFS_propagate',
            'multiply_by_LCM_of_denominators',
            'divide_by_GCD_of_all_values',
            'float_calculation_then_round',
            'brute_force_all_assignments',
          ],
          accepted_answers: ['set_root_to_1_DFS_propagate', 'multiply_by_LCM_of_denominators', 'divide_by_GCD_of_all_values'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_tree', label: '비율 조건으로 인접 리스트(트리) 구성 (양방향, p:q와 q:p)' },
          { id: 'init_root', label: '0번 노드를 분수 1/1로 초기화' },
          { id: 'dfs_propagate', label: 'DFS로 각 노드의 비율을 분수(분자/분모)로 계산' },
          { id: 'lcm_multiply', label: '모든 분모의 LCM을 구해 곱하여 정수화' },
          { id: 'gcd_divide', label: '모든 값의 GCD로 나누어 최소화' },
          { id: 'output', label: '각 재료의 질량 출력' },
        ],
        correct_order: ['build_tree', 'init_root', 'dfs_propagate', 'lcm_multiply', 'gcd_divide', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'bidirectional_ratio_a_b_p_q_means_b_a_q_p',
          'fraction_reduce_by_gcd_to_avoid_overflow',
          'final_gcd_division_for_minimum',
          'lcm_overflow_N_small_so_long_long_ok',
          'N_equals_2_single_ratio',
          'all_ratios_1_to_1',
        ],
        required_answers: ['bidirectional_ratio_a_b_p_q_means_b_a_q_p', 'fraction_reduce_by_gcd_to_avoid_overflow', 'final_gcd_division_for_minimum'],
        recommended_answers: ['lcm_overflow_N_small_so_long_long_ok'],
        optional_answers: ['N_equals_2_single_ratio', 'all_ratios_1_to_1'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^2)', 'O(N)', 'O(NlogN)', 'O(2^N)'],
          accepted_answers: ['O(N^2)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(1)', 'O(NlogN)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'N_leq_10_constant_time_effectively',
            'DFS_visits_each_node_once',
            'LCM_GCD_over_N_values',
            'adjacency_list_size_N',
            'fraction_operations_log_factor',
          ],
          accepted_answers: ['N_leq_10_constant_time_effectively', 'DFS_visits_each_node_once', 'LCM_GCD_over_N_values'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dfs_fraction_lcm_gcd',
        label: 'DFS 분수 전파 + LCM 정수화 + GCD 최소화',
        pattern_analysis_answer: 'tree_dfs_fraction_propagation',
        required_strategy_tags: ['set_root_to_1_DFS_propagate', 'multiply_by_LCM_of_denominators', 'divide_by_GCD_of_all_values'],
      },
    ],

    common_mistakes: [
      {
        tag: 'float_rounding',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'float_calculation_then_round' },
        ],
        feedback:
          '실수로 비율을 계산하면 정밀도 문제로 정수화가 어렵습니다. 분수(분자/분모)로 정확히 관리해야 합니다.',
      },
      {
        tag: 'no_gcd_reduction',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'final_gcd_division_for_minimum' },
        ],
        feedback:
          'LCM을 곱해 정수화한 후 모든 값의 GCD로 나누지 않으면 합이 최소가 아닙니다.',
      },
      {
        tag: 'wrong_direction',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'bidirectional_ratio_a_b_p_q_means_b_a_q_p' },
        ],
        feedback:
          'a:b = p:q 비율에서 a→b 방향은 *q/p, b→a 방향은 *p/q입니다. 양방향 간선에 올바른 비율을 저장해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '비율 조건 N-1개 + N개 노드 = 트리. DFS로 분수 비율 전파 → LCM으로 정수화 → GCD로 최소화.',
      mentor_hint: '분수 연산 시 매 단계 GCD로 약분하여 오버플로우를 방지하라. N이 작으므로 효율성보다 정확성이 중요하다.',
      pattern_trigger: '"N개 변수, N-1개 비율 조건, 정수 최소합"이 보이면 → 트리 DFS + 분수 전파 + LCM/GCD를 떠올려라.',
      why_it_works: 'N-1개의 조건이 N개 노드를 연결하면 트리이다. 트리에서 한 노드를 고정하면 나머지가 유일하게 결정된다. LCM으로 정수화하고 GCD로 나누면 최소 정수해를 얻는다.',
    },
  },
];
