import type { ProblemV2 } from '../types';

export const DATA_STRUCTURES_V2: ProblemV2[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1253 — 좋다
  // ──────────────────────────────────────────────────────
  {
    id: 'b001253-boj',
    title: '좋다',
    difficulty: 'medium',
    domain: 'two_pointer',
    summary: '배열에서 다른 두 수의 합으로 나타낼 수 있는 수(좋은 수)의 개수를 구하는 문제',
    tags: ['two-pointer', 'sorting', 'array'],
    input_type: 'integer_array',
    output_type: 'count',
    constraints: {
      two_different_indices: true,
      negative_numbers_possible: true,
      input_size_hint: '1 <= N <= 2000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_steps', 'maximum_sum', 'boolean_existence', 'indices'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array_with_negatives',
            'find_pairs_summing_to_target',
            'self_index_excluded',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['integer_array_with_negatives', 'find_pairs_summing_to_target', 'self_index_excluded'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_numbers_expressible_as_sum_of_two_others',
            'two_sum_variant_for_each_element',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['sort_and_two_pointer', 'brute_force', 'hash_map', 'binary_search', 'prefix_sum', 'greedy'],
          accepted_answers: ['sort_and_two_pointer'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'sorted_array_enables_two_pointer',
            'pair_sum_comparison_with_target',
            'N_squared_acceptable_for_2000',
            'need_to_exclude_self_index',
            'need_shortest_path',
          ],
          accepted_answers: ['sorted_array_enables_two_pointer', 'pair_sum_comparison_with_target', 'N_squared_acceptable_for_2000'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['hash_set_alternative', 'sorting_preprocessing', 'index_tracking', 'binary_search', 'sliding_window'],
          accepted_answers: ['hash_set_alternative', 'sorting_preprocessing', 'index_tracking'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['sorted_array', 'hash_set', 'map', 'stack', 'two_pointers'],
          accepted_answers: ['sorted_array', 'two_pointers'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_then_two_pointer_per_target',
            'skip_self_index_during_search',
            'hash_all_pairs',
            'brute_force_triple_loop',
            'binary_search_complement',
          ],
          accepted_answers: ['sort_then_two_pointer_per_target', 'skip_self_index_during_search'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'sort_array', label: '배열을 오름차순 정렬' },
          { id: 'iterate_targets', label: '각 원소 A[k]를 타겟으로 순회' },
          { id: 'init_pointers', label: 'left = 0, right = N-1로 투 포인터 초기화' },
          { id: 'skip_self', label: 'left == k이면 left++, right == k이면 right--로 자기 자신 건너뛰기' },
          { id: 'compare_sum', label: 'A[left] + A[right]와 A[k] 비교하여 포인터 이동' },
          { id: 'count_good', label: '합이 A[k]와 같으면 좋은 수 카운트 증가 후 다음 타겟으로' },
        ],
        correct_order: [
          'sort_array',
          'iterate_targets',
          'init_pointers',
          'skip_self',
          'compare_sum',
          'count_good',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'must_exclude_self_index',
          'zero_plus_zero_equals_zero',
          'negative_numbers_in_array',
          'duplicate_values_different_indices',
          'N_less_than_3_answer_is_0',
          'all_same_values',
        ],
        required_answers: ['must_exclude_self_index', 'zero_plus_zero_equals_zero', 'negative_numbers_in_array'],
        recommended_answers: ['duplicate_values_different_indices', 'N_less_than_3_answer_is_0'],
        optional_answers: ['all_same_values'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^2)', 'O(N^3)', 'O(NlogN)', 'O(N)'],
          accepted_answers: ['O(N^2)'],
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
            'N_targets_each_O_N_search',
            'sorting_is_O_NlogN',
            'two_pointer_is_O_N_per_target',
            'hash_map_is_O_N_space',
            'constant_pointers_only',
          ],
          accepted_answers: ['N_targets_each_O_N_search', 'sorting_is_O_NlogN', 'two_pointer_is_O_N_per_target'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'sort_two_pointer',
        label: '정렬 후 각 타겟에 대해 투 포인터 탐색',
        pattern_analysis_answer: 'sort_and_two_pointer',
        required_strategy_tags: ['sort_then_two_pointer_per_target', 'skip_self_index_during_search'],
      },
    ],

    common_mistakes: [
      {
        tag: 'include_self',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'must_exclude_self_index' },
        ],
        feedback:
          '자기 자신을 두 수 중 하나로 사용할 수 없습니다. left == k이면 left++, right == k이면 right--로 건너뛰어야 합니다. 이를 놓치면 A[k] = A[k] + 0 같은 경우 잘못 카운트됩니다.',
      },
      {
        tag: 'miss_zero_case',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'zero_plus_zero_equals_zero' },
        ],
        feedback:
          '0이 3개 이상 있으면 0 + 0 = 0으로 "좋은 수"가 됩니다. 자기 자신 인덱스만 건너뛰고 나머지 두 0을 사용하면 됩니다. 자기 자신 건너뛰기 로직이 정확해야 이 경우를 처리할 수 있습니다.',
      },
      {
        tag: 'brute_force_n3',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force' },
        ],
        feedback:
          'O(N³) 브루트포스는 N=2000에서 8×10⁹ 연산으로 시간 초과입니다. 정렬 후 투 포인터를 사용하면 O(N²)로 해결 가능합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '정렬 후 각 타겟에 대해 투 포인터로 합이 되는 쌍을 O(N)에 탐색. 자기 자신 인덱스 건너뛰기가 핵심.',
      mentor_hint: '자기 자신 건너뛰기 로직이 가장 실수하기 쉬운 부분이다. left==k → left++, right==k → right--를 투 포인터 루프 안에서 처리해야 한다.',
      pattern_trigger: '"배열의 각 원소에 대해 다른 두 원소의 합으로 표현 가능한지"가 보이면 → 정렬 + 투 포인터를 떠올려라.',
      why_it_works: '정렬된 배열에서 투 포인터는 합이 작으면 left 증가, 크면 right 감소로 모든 쌍을 O(N)에 탐색한다. 자기 자신 인덱스만 건너뛰면 "다른 두 수" 조건을 보장한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1546 — 평균
  // ──────────────────────────────────────────────────────
  {
    id: 'b001546-boj',
    title: '평균',
    difficulty: 'easy',
    domain: 'basic_array',
    summary: '점수를 최댓값 기준으로 변환한 후 새로운 평균을 구하는 기초 구현 문제',
    tags: ['array', 'math'],
    input_type: 'integer_array',
    output_type: 'float_value',
    constraints: {
      transform_formula: 'score / max * 100',
      at_least_one_nonzero: true,
      input_size_hint: '1 <= N <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['float_value', 'count', 'minimum_steps', 'boolean_existence', 'indices'],
          accepted_answers: ['float_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'transform_each_element',
            'need_max_value',
            'sorted_data',
            'modular_output_required',
          ],
          accepted_answers: ['integer_array', 'transform_each_element', 'need_max_value'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'average_after_scaling_by_max',
            'transform_scores_and_compute_mean',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['single_pass_aggregation', 'sorting', 'two_pointer', 'dp_bottom_up', 'binary_search', 'prefix_sum'],
          accepted_answers: ['single_pass_aggregation'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'need_sum_and_max_simultaneously',
            'formula_simplification',
            'single_traversal_sufficient',
            'overlapping_subproblems',
            'need_shortest_path',
          ],
          accepted_answers: ['need_sum_and_max_simultaneously', 'formula_simplification', 'single_traversal_sufficient'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['floating_point_arithmetic', 'formula_simplification', 'sorting', 'memoization', 'prefix_sum'],
          accepted_answers: ['floating_point_arithmetic', 'formula_simplification'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['two_variables_sum_max', 'array', 'map', 'stack', 'dp_array'],
          accepted_answers: ['two_variables_sum_max'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'find_max_and_sum_in_one_pass',
            'apply_formula_sum_over_M_times_100_over_N',
            'transform_each_then_average',
            'sort_and_take_last',
            'binary_search_for_max',
          ],
          accepted_answers: ['find_max_and_sum_in_one_pass', 'apply_formula_sum_over_M_times_100_over_N'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_array', label: '배열 입력' },
          { id: 'find_sum_and_max', label: '한 번 순회하며 sum과 max 계산' },
          { id: 'apply_formula', label: '새 평균 = sum / max * 100 / N 계산' },
          { id: 'output', label: '실수형으로 출력' },
        ],
        correct_order: [
          'read_array',
          'find_sum_and_max',
          'apply_formula',
          'output',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'use_float_not_integer_division',
          'max_is_guaranteed_nonzero',
          'formula_can_be_simplified',
          'output_decimal_precision',
          'all_scores_same',
        ],
        required_answers: ['use_float_not_integer_division', 'formula_can_be_simplified'],
        recommended_answers: ['max_is_guaranteed_nonzero', 'output_decimal_precision'],
        optional_answers: ['all_scores_same'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(1)'],
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
            'single_pass_through_array',
            'constant_variables_only',
            'no_auxiliary_structure',
            'sorting_dominates',
            'dp_table_needed',
          ],
          accepted_answers: ['single_pass_through_array', 'constant_variables_only', 'no_auxiliary_structure'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'single_pass',
        label: '한 번 순회로 sum, max 구한 후 공식 적용',
        pattern_analysis_answer: 'single_pass_aggregation',
        required_strategy_tags: ['find_max_and_sum_in_one_pass', 'apply_formula_sum_over_M_times_100_over_N'],
      },
    ],

    common_mistakes: [
      {
        tag: 'integer_division',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'use_float_not_integer_division' },
        ],
        feedback:
          '정수 나눗셈을 사용하면 소수점 이하가 잘립니다. sum / max를 먼저 정수로 나누면 0이 될 수 있습니다. 실수형(double)으로 계산해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '새 평균 = (sum / M) × 100 / N. 한 번 순회로 sum과 max를 구하고 실수형으로 계산.',
      mentor_hint: '수식을 먼저 정리하면 코드가 단순해진다. 각 원소를 변환할 필요 없이 전체 합에 공식을 적용하면 된다.',
      pattern_trigger: '"배열의 각 원소를 변환하고 통계량(평균, 합 등)을 구하라"가 보이면 → 수식 정리 후 한 번 순회를 떠올려라.',
      why_it_works: '새 점수 = score_i / M × 100이므로 새 평균 = Σ(score_i / M × 100) / N = (sum / M × 100) / N. 수식을 정리하면 한 번 순회로 충분하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1874 — 스택 수열
  // ──────────────────────────────────────────────────────
  {
    id: 'b001874-boj',
    title: '스택 수열',
    difficulty: 'medium',
    domain: 'stack',
    summary: '1~n을 오름차순으로 push하여 주어진 수열을 생성할 수 있는지 스택 시뮬레이션으로 판단하는 문제',
    tags: ['stack', 'simulation'],
    input_type: 'integer_sequence',
    output_type: 'operation_sequence_or_no',
    constraints: {
      push_in_ascending_order: true,
      LIFO_constraint: true,
      input_size_hint: '1 <= n <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['operation_sequence', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['operation_sequence'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'target_sequence_to_produce',
            'push_only_ascending',
            'LIFO_stack_constraint',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['target_sequence_to_produce', 'push_only_ascending', 'LIFO_stack_constraint'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'simulate_stack_to_produce_target_sequence',
            'check_if_sequence_is_stack_sortable',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['stack_simulation', 'queue_simulation', 'greedy', 'dp_bottom_up', 'sorting', 'binary_search'],
          accepted_answers: ['stack_simulation'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'LIFO_behavior_required',
            'push_order_fixed',
            'pop_order_must_match_target',
            'need_shortest_path',
            'locally_optimal_not_guaranteed',
          ],
          accepted_answers: ['LIFO_behavior_required', 'push_order_fixed', 'pop_order_must_match_target'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['simulation', 'greedy_pop_when_possible', 'counter_tracking', 'memoization', 'two_pointer'],
          accepted_answers: ['simulation', 'greedy_pop_when_possible', 'counter_tracking'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['stack', 'queue', 'array', 'map', 'deque'],
          accepted_answers: ['stack'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'push_until_target_reached',
            'pop_when_top_matches',
            'no_if_top_exceeds_target',
            'track_next_push_value',
            'sort_and_compare',
          ],
          accepted_answers: ['push_until_target_reached', 'pop_when_top_matches', 'no_if_top_exceeds_target', 'track_next_push_value'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init', label: '빈 스택, push 카운터 = 1, 결과 배열 초기화' },
          { id: 'iterate_targets', label: '타겟 수열의 각 원소를 순서대로 처리' },
          { id: 'push_until', label: '현재 타겟까지 push 카운터를 올리며 스택에 push (+기록)' },
          { id: 'check_top', label: '스택 top이 타겟과 같으면 pop (-기록)' },
          { id: 'impossible', label: '스택 top이 타겟보다 크면 NO 출력 후 종료' },
          { id: 'output', label: '모든 타겟 처리 후 push/pop 기록 출력' },
        ],
        correct_order: [
          'init',
          'iterate_targets',
          'push_until',
          'check_top',
          'impossible',
          'output',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'top_exceeds_target_means_NO',
          'push_counter_only_increases',
          'large_output_use_string_builder',
          'n_equals_1_trivial',
          'already_pushed_cannot_push_again',
          'descending_sequence_always_possible',
        ],
        required_answers: ['top_exceeds_target_means_NO', 'push_counter_only_increases', 'already_pushed_cannot_push_again'],
        recommended_answers: ['large_output_use_string_builder'],
        optional_answers: ['n_equals_1_trivial', 'descending_sequence_always_possible'],
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
          options: ['O(N)', 'O(1)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_number_pushed_and_popped_once',
            'stack_size_at_most_N',
            'output_size_2N',
            'sorting_dominates',
            'recursive_calls',
          ],
          accepted_answers: ['each_number_pushed_and_popped_once', 'stack_size_at_most_N', 'output_size_2N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'stack_sim',
        label: '스택 시뮬레이션: push until target, pop when match',
        pattern_analysis_answer: 'stack_simulation',
        required_strategy_tags: ['push_until_target_reached', 'pop_when_top_matches', 'no_if_top_exceeds_target'],
      },
    ],

    common_mistakes: [
      {
        tag: 'miss_impossible_check',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'top_exceeds_target_means_NO' },
        ],
        feedback:
          '스택 top이 현재 타겟보다 크면 해당 수열은 만들 수 없습니다(이미 push된 수는 되돌릴 수 없으므로). 즉시 NO를 출력해야 합니다.',
      },
      {
        tag: 'double_push',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'already_pushed_cannot_push_again' },
        ],
        feedback:
          '이미 push한 수를 다시 push할 수 없습니다. push 카운터를 별도로 관리하여 1부터 n까지 오름차순으로만 push해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '1~n을 순서대로 push하며, top이 타겟과 일치하면 pop. top이 타겟보다 크면 불가능.',
      mentor_hint: '"스택 top > 타겟 → NO"가 핵심 판정 조건이다. 이 조건을 빠뜨리면 무한 루프에 빠지거나 잘못된 결과가 나온다.',
      pattern_trigger: '"제한된 순서로 push하여 특정 수열을 만들 수 있는가"가 보이면 → 스택 시뮬레이션을 떠올려라.',
      why_it_works: '스택은 LIFO이므로, 이미 push된 수 중 top보다 아래에 있는 수는 top을 먼저 pop해야 접근 가능하다. top이 타겟보다 크면 타겟은 접근 불가능하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1940 — 주몽
  // ──────────────────────────────────────────────────────
  {
    id: 'b001940-boj',
    title: '주몽',
    difficulty: 'easy',
    domain: 'two_pointer',
    summary: '두 재료 번호의 합이 M인 쌍의 수를 정렬 + 투 포인터로 구하는 문제',
    tags: ['two-pointer', 'sorting'],
    input_type: 'integer_array_and_target',
    output_type: 'count',
    constraints: {
      pair_sum_equals_M: true,
      each_material_used_once: true,
      input_size_hint: '1 <= N <= 15000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_steps', 'maximum_sum', 'boolean_existence', 'indices'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'find_pairs_with_target_sum',
            'each_pair_counted_once',
            'sorted_data',
            'graph_like_relation',
          ],
          accepted_answers: ['integer_array', 'find_pairs_with_target_sum', 'each_pair_counted_once'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_pairs_summing_to_M',
            'two_sum_count_variant',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['sort_and_two_pointer', 'brute_force', 'hash_set', 'binary_search', 'prefix_sum', 'greedy'],
          accepted_answers: ['sort_and_two_pointer'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'pair_sum_problem',
            'sorted_enables_directional_search',
            'O_NlogN_sufficient',
            'hash_set_also_works',
            'need_shortest_path',
          ],
          accepted_answers: ['pair_sum_problem', 'sorted_enables_directional_search', 'O_NlogN_sufficient'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['hash_set_alternative', 'sorting_preprocessing', 'binary_search_complement', 'sliding_window', 'prefix_sum'],
          accepted_answers: ['hash_set_alternative', 'sorting_preprocessing'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['sorted_array', 'hash_set', 'map', 'stack', 'two_pointers'],
          accepted_answers: ['sorted_array', 'two_pointers'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_then_two_pointer',
            'compare_sum_with_M',
            'move_pointers_based_on_sum',
            'hash_lookup_complement',
            'brute_force_all_pairs',
          ],
          accepted_answers: ['sort_then_two_pointer', 'compare_sum_with_M', 'move_pointers_based_on_sum'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'sort', label: '배열 오름차순 정렬' },
          { id: 'init_pointers', label: 'left = 0, right = N-1 초기화' },
          { id: 'loop', label: 'left < right인 동안 반복' },
          { id: 'check_sum', label: 'A[left] + A[right]와 M 비교' },
          { id: 'adjust', label: '합 < M이면 left++, 합 > M이면 right--, 합 == M이면 count++ 후 양쪽 이동' },
          { id: 'output', label: 'count 출력' },
        ],
        correct_order: ['sort', 'init_pointers', 'loop', 'check_sum', 'adjust', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'left_must_be_less_than_right',
          'both_pointers_move_on_match',
          'no_duplicate_pair_counting',
          'N_equals_1_answer_is_0',
          'all_same_values',
        ],
        required_answers: ['left_must_be_less_than_right', 'both_pointers_move_on_match'],
        recommended_answers: ['no_duplicate_pair_counting'],
        optional_answers: ['N_equals_1_answer_is_0', 'all_same_values'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(NlogN)'],
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
            'sorting_dominates_O_NlogN',
            'two_pointer_scan_is_O_N',
            'array_copy_for_sorting',
            'hash_set_is_O_N',
            'constant_pointers_only',
          ],
          accepted_answers: ['sorting_dominates_O_NlogN', 'two_pointer_scan_is_O_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'sort_two_pointer',
        label: '정렬 후 양끝 투 포인터',
        pattern_analysis_answer: 'sort_and_two_pointer',
        required_strategy_tags: ['sort_then_two_pointer', 'compare_sum_with_M', 'move_pointers_based_on_sum'],
      },
    ],

    common_mistakes: [
      {
        tag: 'single_pointer_move',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'both_pointers_move_on_match' },
        ],
        feedback:
          '합이 M과 같을 때 한쪽 포인터만 이동하면 동일한 쌍을 중복 카운트하거나 다음 쌍을 놓칩니다. 양쪽 포인터를 모두 이동해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '정렬 후 양끝에서 투 포인터로 합이 M인 쌍을 세는 기본 Two Sum 패턴.',
      mentor_hint: '합이 정확히 M일 때 양쪽 포인터를 모두 이동하는 것을 잊지 마라.',
      pattern_trigger: '"두 수의 합이 특정 값인 쌍의 수"가 보이면 → 정렬 + 투 포인터를 떠올려라.',
      why_it_works: '정렬된 배열에서 합이 M보다 작으면 왼쪽을 키우고, 크면 오른쪽을 줄이면 모든 유효한 쌍을 빠짐없이 O(N)에 탐색한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2018 — 수들의 합 5
  // ──────────────────────────────────────────────────────
  {
    id: 'b002018-boj',
    title: '수들의 합 5',
    difficulty: 'easy',
    domain: 'two_pointer',
    summary: '연속된 자연수의 합으로 N을 나타낼 수 있는 경우의 수를 투 포인터로 구하는 문제',
    tags: ['two-pointer', 'math', 'prefix-sum'],
    input_type: 'single_integer',
    output_type: 'count',
    constraints: {
      consecutive_natural_numbers: true,
      input_size_hint: '1 <= N <= 10000000',
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
            'consecutive_natural_number_sum',
            'variable_length_subarray',
            'sorted_data',
            'graph_like_relation',
          ],
          accepted_answers: ['single_integer_N', 'consecutive_natural_number_sum', 'variable_length_subarray'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_consecutive_sum_representations',
            'sliding_window_on_natural_numbers',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['two_pointer_sliding', 'brute_force', 'math_divisor', 'binary_search', 'prefix_sum', 'dp_bottom_up'],
          accepted_answers: ['two_pointer_sliding'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'contiguous_range_sum',
            'expand_or_shrink_window',
            'natural_numbers_are_sorted',
            'N_up_to_10M_needs_linear',
            'need_shortest_path',
          ],
          accepted_answers: ['contiguous_range_sum', 'expand_or_shrink_window', 'natural_numbers_are_sorted'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['math_odd_divisor', 'prefix_sum', 'sliding_window', 'binary_search', 'memoization'],
          accepted_answers: ['math_odd_divisor', 'prefix_sum'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['two_variables_start_end', 'array', 'map', 'stack', 'dp_array'],
          accepted_answers: ['two_variables_start_end'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'expand_end_when_sum_less',
            'shrink_start_when_sum_greater',
            'count_when_sum_equals_N',
            'brute_force_all_starts',
            'formula_based_divisor',
          ],
          accepted_answers: ['expand_end_when_sum_less', 'shrink_start_when_sum_greater', 'count_when_sum_equals_N'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init', label: 'start = 1, end = 1, sum = 1, count = 0 초기화' },
          { id: 'loop', label: 'end <= N인 동안 반복' },
          { id: 'check_sum', label: 'sum == N이면 count++ 후 end++, sum += end' },
          { id: 'expand', label: 'sum < N이면 end++, sum += end' },
          { id: 'shrink', label: 'sum > N이면 sum -= start, start++' },
          { id: 'output', label: 'count 출력' },
        ],
        correct_order: ['init', 'loop', 'check_sum', 'expand', 'shrink', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'N_itself_is_valid_single_number',
          'start_must_not_exceed_end',
          'end_termination_condition',
          'sum_of_1_to_k_formula',
          'N_equals_1_answer_is_1',
        ],
        required_answers: ['N_itself_is_valid_single_number', 'start_must_not_exceed_end'],
        recommended_answers: ['end_termination_condition'],
        optional_answers: ['sum_of_1_to_k_formula', 'N_equals_1_answer_is_1'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(sqrtN)', 'O(NlogN)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(sqrtN)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_pointer_moves_at_most_N_times',
            'constant_variables_only',
            'no_array_needed',
            'divisor_approach_is_O_sqrtN',
            'sorting_dominates',
          ],
          accepted_answers: ['each_pointer_moves_at_most_N_times', 'constant_variables_only', 'no_array_needed'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'two_pointer',
        label: 'start/end 투 포인터로 연속 구간합 관리',
        pattern_analysis_answer: 'two_pointer_sliding',
        required_strategy_tags: ['expand_end_when_sum_less', 'shrink_start_when_sum_greater', 'count_when_sum_equals_N'],
      },
    ],

    common_mistakes: [
      {
        tag: 'miss_self',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'N_itself_is_valid_single_number' },
        ],
        feedback:
          'N 자체도 연속된 자연수 1개(N 자체)의 합입니다. 예: 15 = 15. 이를 빠뜨리면 답이 1 작습니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'start, end를 이동하며 연속 자연수의 구간합을 관리. sum < N이면 확장, sum > N이면 축소.',
      mentor_hint: '투 포인터의 종료 조건(end > N)과 N 자체를 포함하는 것을 잊지 마라.',
      pattern_trigger: '"연속된 자연수의 합으로 N을 표현하는 방법의 수"가 보이면 → 투 포인터 슬라이딩 윈도우를 떠올려라.',
      why_it_works: '자연수는 정렬되어 있으므로 구간합이 단조 증가한다. end를 늘리면 합이 커지고 start를 늘리면 합이 작아지므로, 두 포인터로 모든 유효 구간을 빠짐없이 탐색 가능하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2164 — 카드2
  // ──────────────────────────────────────────────────────
  {
    id: 'b002164-boj',
    title: '카드2',
    difficulty: 'easy',
    domain: 'queue',
    summary: '카드 더미에서 맨 위 버리기 → 다음 카드 맨 아래로 보내기를 반복하여 마지막 카드를 구하는 큐 시뮬레이션 문제',
    tags: ['queue', 'simulation'],
    input_type: 'single_integer',
    output_type: 'single_value',
    constraints: {
      discard_top_then_move_next_to_bottom: true,
      input_size_hint: '1 <= N <= 500000',
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
            'ordered_card_deck',
            'FIFO_behavior',
            'discard_and_rotate',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['ordered_card_deck', 'FIFO_behavior', 'discard_and_rotate'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'last_remaining_card_after_discard_rotate',
            'queue_simulation_josephus_variant',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['queue_simulation', 'stack_simulation', 'math_formula', 'linked_list', 'binary_search', 'dp_bottom_up'],
          accepted_answers: ['queue_simulation'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'front_removal_back_insertion',
            'FIFO_exactly_matches_queue',
            'simple_simulation_sufficient',
            'math_formula_exists_but_complex',
            'need_shortest_path',
          ],
          accepted_answers: ['front_removal_back_insertion', 'FIFO_exactly_matches_queue', 'simple_simulation_sufficient'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['math_power_of_2', 'linked_list', 'simulation', 'josephus_problem', 'stack'],
          accepted_answers: ['math_power_of_2', 'simulation'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['queue', 'stack', 'deque', 'array', 'linked_list'],
          accepted_answers: ['queue'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'enqueue_1_to_N',
            'dequeue_discard_dequeue_enqueue',
            'repeat_until_one_left',
            'math_formula_direct',
            'array_simulation',
          ],
          accepted_answers: ['enqueue_1_to_N', 'dequeue_discard_dequeue_enqueue', 'repeat_until_one_left'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_queue', label: '큐에 1부터 N까지 순서대로 삽입' },
          { id: 'loop_until_one', label: '큐 크기가 1이 될 때까지 반복' },
          { id: 'discard', label: '맨 앞 카드를 dequeue(버리기)' },
          { id: 'move_to_back', label: '다음 맨 앞 카드를 dequeue 후 enqueue(뒤로 보내기)' },
          { id: 'output', label: '남은 카드 번호 출력' },
        ],
        correct_order: ['init_queue', 'loop_until_one', 'discard', 'move_to_back', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'N_equals_1_answer_is_1',
          'use_real_queue_not_array_shift',
          'two_dequeues_per_iteration',
          'language_specific_queue_impl',
          'power_of_2_pattern',
        ],
        required_answers: ['N_equals_1_answer_is_1', 'use_real_queue_not_array_shift'],
        recommended_answers: ['two_dequeues_per_iteration', 'language_specific_queue_impl'],
        optional_answers: ['power_of_2_pattern'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(1)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(1)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_card_processed_once',
            'queue_operations_O1',
            'queue_initial_size_N',
            'array_shift_would_be_O_N',
            'math_formula_is_O1',
          ],
          accepted_answers: ['each_card_processed_once', 'queue_operations_O1', 'queue_initial_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'queue_sim',
        label: '큐로 discard-rotate 시뮬레이션',
        pattern_analysis_answer: 'queue_simulation',
        required_strategy_tags: ['enqueue_1_to_N', 'dequeue_discard_dequeue_enqueue', 'repeat_until_one_left'],
      },
    ],

    common_mistakes: [
      {
        tag: 'array_shift',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'use_real_queue_not_array_shift' },
        ],
        feedback:
          '배열의 shift(앞에서 제거)는 O(N)이므로 전체 O(N²)가 됩니다. N=500000에서 시간 초과입니다. 연결 리스트 기반 큐 또는 덱을 사용하세요.',
      },
    ],

    review_notes: {
      core_takeaway: '큐에 1~N을 넣고, dequeue(버리기) → dequeue+enqueue(뒤로 보내기)를 반복. 큐 크기 1이면 종료.',
      mentor_hint: '언어별 큐 구현 특성을 확인하라. JS의 Array.shift()는 O(N)이다.',
      pattern_trigger: '"앞에서 빼고 뒤로 넣기"가 보이면 → 큐(FIFO)를 떠올려라.',
      why_it_works: '큐는 FIFO이므로 "앞에서 빼기"와 "뒤로 넣기"가 모두 O(1)이다. N-1번의 반복에서 매번 2회 dequeue + 1회 enqueue로 총 O(N) 연산이면 충분하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 10986 — 나머지 합
  // ──────────────────────────────────────────────────────
  {
    id: 'b010986-boj',
    title: '나머지 합',
    difficulty: 'hard',
    domain: 'prefix_sum_modular',
    summary: '누적합의 나머지 성질을 이용하여 구간합이 M의 배수인 쌍의 수를 O(N)에 구하는 문제',
    tags: ['prefix-sum', 'math', 'counting', 'modular-arithmetic'],
    input_type: 'integer_array_and_modulus',
    output_type: 'count',
    constraints: {
      subarray_sum_divisible_by_M: true,
      input_size_hint: 'N <= 1000000, M <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_steps', 'maximum_sum', 'boolean_existence', 'indices'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'divisibility_condition',
            'contiguous_subarray_sum',
            'modular_counting',
            'sorted_data',
          ],
          accepted_answers: ['integer_array', 'divisibility_condition', 'contiguous_subarray_sum', 'modular_counting'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_subarrays_with_sum_divisible_by_M',
            'prefix_sum_remainder_pair_counting',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['prefix_sum_mod_counting', 'brute_force', 'sliding_window', 'two_pointer', 'dp_bottom_up', 'binary_search'],
          accepted_answers: ['prefix_sum_mod_counting'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'prefix_diff_mod_equals_zero',
            'same_remainder_means_divisible',
            'counting_pairs_with_same_remainder',
            'N_too_large_for_O_N2',
            'need_shortest_path',
          ],
          accepted_answers: ['prefix_diff_mod_equals_zero', 'same_remainder_means_divisible', 'counting_pairs_with_same_remainder', 'N_too_large_for_O_N2'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['combination_counting', 'modular_arithmetic', 'hash_map_counting', 'prefix_sum', 'sliding_window'],
          accepted_answers: ['combination_counting', 'modular_arithmetic', 'prefix_sum'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['remainder_count_array', 'prefix_sum_array', 'hash_map', 'stack', 'dp_array'],
          accepted_answers: ['remainder_count_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'track_prefix_mod_counts',
            'C_cnt_r_2_for_each_remainder',
            'include_prefix_0_in_count',
            'brute_force_all_subarrays',
            'sliding_window_fixed_mod',
          ],
          accepted_answers: ['track_prefix_mod_counts', 'C_cnt_r_2_for_each_remainder', 'include_prefix_0_in_count'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_cnt', label: '나머지 카운트 배열 cnt[0..M-1] 초기화, cnt[0] = 1 (prefix[0]=0)' },
          { id: 'iterate_prefix', label: '누적합을 순회하며 prefix_mod = (prefix + A[i]) % M 갱신' },
          { id: 'increment_cnt', label: 'cnt[prefix_mod]++ 증가' },
          { id: 'compute_answer', label: '각 나머지 r에 대해 cnt[r] * (cnt[r] - 1) / 2 합산' },
          { id: 'output', label: '답 출력 (long 타입)' },
        ],
        correct_order: ['init_cnt', 'iterate_prefix', 'increment_cnt', 'compute_answer', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'prefix_0_must_be_counted',
          'result_exceeds_int_range',
          'prefix_sum_overflow_use_mod_incrementally',
          'cnt_0_initialized_to_1',
          'M_equals_1_all_subarrays_valid',
          'negative_mod_handling',
        ],
        required_answers: ['prefix_0_must_be_counted', 'result_exceeds_int_range', 'prefix_sum_overflow_use_mod_incrementally'],
        recommended_answers: ['cnt_0_initialized_to_1', 'M_equals_1_all_subarrays_valid'],
        optional_answers: ['negative_mod_handling'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(N+M)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N+M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(M)', 'O(N)', 'O(N+M)'],
          accepted_answers: ['O(M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'single_pass_for_prefix_mods',
            'remainder_array_size_M',
            'final_sum_over_M_remainders',
            'no_full_prefix_array_needed',
            'sorting_dominates',
          ],
          accepted_answers: ['single_pass_for_prefix_mods', 'remainder_array_size_M', 'final_sum_over_M_remainders'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'prefix_mod_count',
        label: '누적합 나머지 카운팅 + C(cnt, 2) 합산',
        pattern_analysis_answer: 'prefix_sum_mod_counting',
        required_strategy_tags: ['track_prefix_mod_counts', 'C_cnt_r_2_for_each_remainder', 'include_prefix_0_in_count'],
      },
    ],

    common_mistakes: [
      {
        tag: 'miss_prefix_0',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'prefix_0_must_be_counted' },
        ],
        feedback:
          'prefix[0] = 0도 카운트에 포함해야 합니다. 이를 빠뜨리면 구간 [1, j]의 합이 M의 배수인 경우(prefix[j] % M == 0)를 놓칩니다. cnt[0] = 1로 초기화하세요.',
      },
      {
        tag: 'int_overflow',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'result_exceeds_int_range' },
        ],
        feedback:
          'M=1이면 모든 구간이 유효하여 답은 N*(N+1)/2 ≈ 5×10^11입니다. int(32bit) 범위를 초과하므로 long 타입을 사용해야 합니다.',
      },
      {
        tag: 'brute_force_n2',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force' },
        ],
        feedback:
          'O(N²) 브루트포스는 N=1,000,000에서 10^12 연산으로 시간 초과입니다. 누적합의 나머지 성질을 이용하면 O(N)에 해결 가능합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'prefix[j] % M == prefix[i] % M이면 구간 [i+1, j]의 합은 M의 배수. 나머지별 카운트에서 C(cnt, 2)를 합산.',
      mentor_hint: 'cnt[0] = 1 초기화가 핵심이다. prefix[0] = 0을 포함하지 않으면 "처음부터 j까지" 구간을 놓친다.',
      pattern_trigger: '"연속 구간합이 M의 배수인 쌍의 수"가 보이면 → 누적합 나머지 카운팅을 떠올려라.',
      why_it_works: 'S[i..j] = prefix[j] - prefix[i-1]이므로 S[i..j] % M == 0 ↔ prefix[j] % M == prefix[i-1] % M. 나머지가 같은 쌍의 수는 C(cnt[r], 2)이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11003 — 최솟값 찾기
  // ──────────────────────────────────────────────────────
  {
    id: 'b011003-boj',
    title: '최솟값 찾기',
    difficulty: 'hard',
    domain: 'monotone_deque',
    summary: '슬라이딩 윈도우 최솟값을 모노톤 덱으로 O(N)에 구하는 문제',
    tags: ['deque', 'sliding-window', 'monotone-queue'],
    input_type: 'integer_array_and_window',
    output_type: 'array',
    constraints: {
      sliding_window_minimum: true,
      fast_io_required: true,
      input_size_hint: '1 <= L <= N <= 5000000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['array', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['array'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'large_array_up_to_5M',
            'fixed_window_size_L',
            'minimum_in_each_window',
            'fast_io_critical',
            'sorted_data',
          ],
          accepted_answers: ['large_array_up_to_5M', 'fixed_window_size_L', 'minimum_in_each_window', 'fast_io_critical'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'sliding_window_minimum_with_monotone_deque',
            'range_minimum_query_online',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['monotone_deque', 'brute_force', 'segment_tree', 'sparse_table', 'heap', 'two_pointer'],
          accepted_answers: ['monotone_deque'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'maintain_candidates_in_sorted_order',
            'remove_expired_from_front',
            'remove_dominated_from_back',
            'amortized_O1_per_element',
            'N_up_to_5M_needs_linear',
          ],
          accepted_answers: ['maintain_candidates_in_sorted_order', 'remove_expired_from_front', 'remove_dominated_from_back', 'amortized_O1_per_element', 'N_up_to_5M_needs_linear'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['segment_tree_alternative', 'sparse_table', 'heap_with_lazy_deletion', 'sliding_window', 'fast_io'],
          accepted_answers: ['segment_tree_alternative', 'sliding_window', 'fast_io'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['deque', 'segment_tree', 'heap', 'sparse_table', 'stack'],
          accepted_answers: ['deque'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'store_indices_in_deque',
            'pop_back_if_larger_than_current',
            'pop_front_if_out_of_window',
            'front_is_always_minimum',
            'brute_force_each_window',
          ],
          accepted_answers: ['store_indices_in_deque', 'pop_back_if_larger_than_current', 'pop_front_if_out_of_window', 'front_is_always_minimum'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_deque', label: '빈 덱 초기화' },
          { id: 'iterate', label: '각 원소 A[i]를 순서대로 처리' },
          { id: 'remove_back', label: '덱 뒤에서 A[i]보다 큰 값들을 모두 제거' },
          { id: 'push_back', label: '현재 인덱스 i를 덱 뒤에 추가' },
          { id: 'remove_front', label: '덱 앞이 윈도우 범위(i-L+1) 바깥이면 제거' },
          { id: 'output_front', label: '덱 앞의 값(A[deque.front])이 현재 윈도우의 최솟값' },
        ],
        correct_order: ['init_deque', 'iterate', 'remove_back', 'push_back', 'remove_front', 'output_front'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'store_index_not_value',
          'fast_io_mandatory',
          'initial_window_partial',
          'equal_values_keep_later_index',
          'L_equals_1_output_original',
          'L_equals_N_single_minimum',
        ],
        required_answers: ['store_index_not_value', 'fast_io_mandatory', 'initial_window_partial'],
        recommended_answers: ['equal_values_keep_later_index'],
        optional_answers: ['L_equals_1_output_original', 'L_equals_N_single_minimum'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(NL)', 'O(N*sqrtN)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(L)', 'O(NlogN)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_element_pushed_popped_once',
            'amortized_O1_per_operation',
            'deque_size_at_most_L',
            'output_array_size_N',
            'segment_tree_is_O_NlogN',
          ],
          accepted_answers: ['each_element_pushed_popped_once', 'amortized_O1_per_operation', 'output_array_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'monotone_deque',
        label: '모노톤 덱: 뒤에서 큰 값 제거, 앞에서 만료 제거',
        pattern_analysis_answer: 'monotone_deque',
        required_strategy_tags: ['store_indices_in_deque', 'pop_back_if_larger_than_current', 'pop_front_if_out_of_window', 'front_is_always_minimum'],
      },
    ],

    common_mistakes: [
      {
        tag: 'store_value_not_index',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'store_index_not_value' },
        ],
        feedback:
          '덱에 값이 아닌 인덱스를 저장해야 합니다. 인덱스가 없으면 윈도우 범위를 벗어난 원소를 판별할 수 없어 잘못된 최솟값을 출력합니다.',
      },
      {
        tag: 'slow_io',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'fast_io_mandatory' },
        ],
        feedback:
          'N이 최대 500만이고 출력도 500만 줄입니다. 빠른 I/O(BufferedReader/Writer, sys.stdin 등)를 사용하지 않으면 I/O만으로 시간 초과됩니다.',
      },
      {
        tag: 'brute_force_NL',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force' },
        ],
        feedback:
          'O(NL) 브루트포스는 N=5×10⁶, L이 클 때 시간 초과입니다. 모노톤 덱을 사용하면 각 원소가 최대 한 번 삽입/삭제되어 O(N)에 해결됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: '모노톤 덱: 뒤에서 A[i]보다 큰 값 제거(이후 절대 최솟값 안 됨), 앞에서 윈도우 벗어난 것 제거. front가 항상 최솟값.',
      mentor_hint: '모노톤 덱의 핵심 직관은 "나보다 크고 나보다 먼저 들어온 원소는 나 때문에 절대 최솟값이 될 수 없다"이다.',
      pattern_trigger: '"슬라이딩 윈도우에서 최솟값/최댓값"이 보이면 → 모노톤 덱을 떠올려라.',
      why_it_works: '새 원소보다 큰 기존 원소는 새 원소보다 먼저 윈도우를 벗어나고, 값도 더 크므로 절대 최솟값이 될 수 없다. 제거해도 정답에 영향이 없으며, 덱 front에 항상 최솟값이 유지된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11286 — 절댓값 힙
  // ──────────────────────────────────────────────────────
  {
    id: 'b011286-boj',
    title: '절댓값 힙',
    difficulty: 'medium',
    domain: 'priority_queue',
    summary: '절댓값 기준 최소 힙을 커스텀 비교 함수로 구현하는 문제',
    tags: ['priority-queue', 'heap'],
    input_type: 'operation_sequence',
    output_type: 'query_results',
    constraints: {
      custom_comparator: '(|a|, a) 순서',
      insert_and_extract_min: true,
      input_size_hint: '1 <= N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['query_results', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['query_results'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'insert_and_extract_operations',
            'custom_priority_absolute_value',
            'tie_break_by_original_value',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['insert_and_extract_operations', 'custom_priority_absolute_value', 'tie_break_by_original_value'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'min_heap_with_absolute_value_priority',
            'custom_comparator_priority_queue',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['custom_heap', 'sorted_array', 'balanced_bst', 'brute_force', 'hash_map', 'stack'],
          accepted_answers: ['custom_heap'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'repeated_insert_and_extract_min',
            'custom_ordering_needed',
            'O_logN_per_operation',
            'sorted_array_insert_is_O_N',
            'need_shortest_path',
          ],
          accepted_answers: ['repeated_insert_and_extract_min', 'custom_ordering_needed', 'O_logN_per_operation'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['tuple_comparison', 'comparator_design', 'balanced_bst', 'memoization', 'two_pointer'],
          accepted_answers: ['tuple_comparison', 'comparator_design'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['min_heap', 'sorted_array', 'balanced_bst', 'stack', 'deque'],
          accepted_answers: ['min_heap'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'compare_by_abs_then_original',
            'insert_on_nonzero',
            'extract_min_on_zero',
            'output_0_if_empty',
            'sort_on_every_query',
          ],
          accepted_answers: ['compare_by_abs_then_original', 'insert_on_nonzero', 'extract_min_on_zero', 'output_0_if_empty'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_heap', label: '커스텀 비교 함수 (|a|, a) 기준 최소 힙 초기화' },
          { id: 'read_op', label: '각 연산 x를 읽기' },
          { id: 'insert', label: 'x != 0이면 힙에 x 삽입' },
          { id: 'extract', label: 'x == 0이면 힙에서 최솟값 추출 후 출력 (비었으면 0)' },
        ],
        correct_order: ['init_heap', 'read_op', 'insert', 'extract'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'abs_tie_negative_first',
          'empty_heap_output_0',
          'language_specific_heap_api',
          'python_tuple_comparison',
          'java_comparator_interface',
        ],
        required_answers: ['abs_tie_negative_first', 'empty_heap_output_0'],
        recommended_answers: ['language_specific_heap_api'],
        optional_answers: ['python_tuple_comparison', 'java_comparator_interface'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(NlogN)', 'O(N)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(NlogN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(1)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'N_operations_each_O_logN',
            'heap_size_at_most_N',
            'constant_comparison',
            'sorted_array_insert_O_N',
            'no_auxiliary_structure',
          ],
          accepted_answers: ['N_operations_each_O_logN', 'heap_size_at_most_N', 'constant_comparison'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'custom_min_heap',
        label: '(|x|, x) 기준 최소 힙',
        pattern_analysis_answer: 'custom_heap',
        required_strategy_tags: ['compare_by_abs_then_original', 'insert_on_nonzero', 'extract_min_on_zero', 'output_0_if_empty'],
      },
    ],

    common_mistakes: [
      {
        tag: 'abs_only_compare',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'abs_tie_negative_first' },
        ],
        feedback:
          '절댓값만으로 비교하면 -1과 1 중 어느 것을 먼저 출력할지 결정할 수 없습니다. 절댓값이 같으면 원래 값이 작은(음수) 쪽을 먼저 출력해야 합니다.',
      },
      {
        tag: 'miss_empty_check',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'empty_heap_output_0' },
        ],
        feedback:
          '빈 힙에서 추출을 시도하면 0을 출력해야 합니다. 예외 처리를 누락하면 런타임 에러가 발생합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '비교 기준 (|x|, x) 최소 힙. 절댓값 같으면 음수 우선.',
      mentor_hint: 'Python은 heapq에 (abs(x), x) 튜플을 넣으면 자동으로 원하는 순서가 된다. Java는 Comparator를 직접 구현해야 한다.',
      pattern_trigger: '"커스텀 우선순위로 삽입/추출을 반복"이 보이면 → 커스텀 비교 함수 힙을 떠올려라.',
      why_it_works: '(|a|, a) 튜플 비교는 먼저 절댓값으로 정렬하고, 같으면 원래 값으로 정렬한다. 음수가 양수보다 작으므로 자연스럽게 음수가 우선된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11659 — 구간 합 구하기 4
  // ──────────────────────────────────────────────────────
  {
    id: 'b011659-boj',
    title: '구간 합 구하기 4',
    difficulty: 'easy',
    domain: 'prefix_sum',
    summary: '1차원 누적합으로 구간 합 쿼리를 O(1)에 응답하는 기본 문제',
    tags: ['prefix-sum', 'array'],
    input_type: 'integer_array_and_queries',
    output_type: 'query_results',
    constraints: {
      range_sum_query: true,
      input_size_hint: 'N, M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['query_results', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['query_results'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'multiple_range_sum_queries',
            'static_array_no_updates',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['integer_array', 'multiple_range_sum_queries', 'static_array_no_updates'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'prefix_sum_for_range_queries',
            'precompute_cumulative_sum',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['prefix_sum', 'brute_force', 'segment_tree', 'binary_indexed_tree', 'two_pointer', 'sorting'],
          accepted_answers: ['prefix_sum'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'static_array_no_updates',
            'O1_query_after_ON_preprocess',
            'simplest_approach_for_range_sum',
            'many_queries_need_fast_response',
            'need_shortest_path',
          ],
          accepted_answers: ['static_array_no_updates', 'O1_query_after_ON_preprocess', 'simplest_approach_for_range_sum', 'many_queries_need_fast_response'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['segment_tree_for_updates', 'fast_io', 'index_handling', 'memoization', 'sliding_window'],
          accepted_answers: ['fast_io', 'index_handling'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['prefix_sum_array', 'segment_tree', 'binary_indexed_tree', 'map', 'stack'],
          accepted_answers: ['prefix_sum_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'precompute_prefix_sum',
            'query_as_prefix_j_minus_prefix_i1',
            'prefix_0_equals_0',
            'brute_force_per_query',
            'segment_tree_build',
          ],
          accepted_answers: ['precompute_prefix_sum', 'query_as_prefix_j_minus_prefix_i1', 'prefix_0_equals_0'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_array', label: 'N개의 수 입력' },
          { id: 'build_prefix', label: 'prefix[0] = 0, prefix[k] = prefix[k-1] + A[k] 구축' },
          { id: 'read_query', label: '각 쿼리 (i, j) 읽기' },
          { id: 'answer_query', label: 'prefix[j] - prefix[i-1] 출력' },
        ],
        correct_order: ['read_array', 'build_prefix', 'read_query', 'answer_query'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'prefix_0_for_boundary',
          '1_indexed_vs_0_indexed',
          'fast_io_for_large_M',
          'single_element_range',
          'full_range_query',
        ],
        required_answers: ['prefix_0_for_boundary', '1_indexed_vs_0_indexed'],
        recommended_answers: ['fast_io_for_large_M'],
        optional_answers: ['single_element_range', 'full_range_query'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+M)', 'O(NM)', 'O(NlogN)', 'O(N^2)'],
          accepted_answers: ['O(N+M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(1)', 'O(NM)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'preprocess_O_N',
            'each_query_O_1',
            'prefix_array_size_N',
            'segment_tree_is_O_NlogN',
            'brute_force_is_O_NM',
          ],
          accepted_answers: ['preprocess_O_N', 'each_query_O_1', 'prefix_array_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'prefix_sum',
        label: '누적합 전처리 + O(1) 쿼리',
        pattern_analysis_answer: 'prefix_sum',
        required_strategy_tags: ['precompute_prefix_sum', 'query_as_prefix_j_minus_prefix_i1', 'prefix_0_equals_0'],
      },
    ],

    common_mistakes: [
      {
        tag: 'brute_force_per_query',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'brute_force_per_query' },
        ],
        feedback:
          '매 쿼리마다 i~j를 합산하면 O(NM) = 10^10으로 시간 초과입니다. 누적합을 전처리하면 각 쿼리를 O(1)에 응답할 수 있습니다.',
      },
      {
        tag: 'miss_prefix_0',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'prefix_0_for_boundary' },
        ],
        feedback:
          'prefix[0] = 0으로 초기화해야 i=1일 때 prefix[j] - prefix[0]으로 정상 동작합니다. prefix[0]을 설정하지 않으면 i=1인 쿼리에서 오답이 나옵니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'prefix[k] = A[1]+...+A[k]. 구간합 S[i..j] = prefix[j] - prefix[i-1]. 전처리 O(N), 쿼리 O(1).',
      mentor_hint: 'prefix[0] = 0 초기화가 핵심이다. 이것이 없으면 경계 조건에서 항상 실수한다.',
      pattern_trigger: '"정적 배열에서 여러 구간 합 쿼리"가 보이면 → 누적합 전처리를 떠올려라.',
      why_it_works: 'prefix[j] - prefix[i-1] = A[i] + ... + A[j]. 한 번의 뺄셈으로 임의 구간의 합을 O(1)에 구할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11660 — 구간 합 구하기 5
  // ──────────────────────────────────────────────────────
  {
    id: 'b011660-boj',
    title: '구간 합 구하기 5',
    difficulty: 'medium',
    domain: 'prefix_sum_2d',
    summary: '2차원 누적합과 포함-배제 원리로 2D 구간 합 쿼리를 O(1)에 응답하는 문제',
    tags: ['prefix-sum', '2d-array', 'inclusion-exclusion'],
    input_type: 'matrix_and_queries',
    output_type: 'query_results',
    constraints: {
      '2d_range_sum_query': true,
      inclusion_exclusion_principle: true,
      input_size_hint: 'N <= 1024, M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['query_results', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['query_results'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            '2d_matrix',
            'multiple_rectangle_sum_queries',
            'static_no_updates',
            'sorted_data',
            'single_array',
          ],
          accepted_answers: ['2d_matrix', 'multiple_rectangle_sum_queries', 'static_no_updates'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            '2d_prefix_sum_for_rectangle_queries',
            'inclusion_exclusion_range_sum',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['prefix_sum_2d', 'brute_force', '1d_prefix_per_row', 'segment_tree_2d', 'binary_search', 'dp_2d'],
          accepted_answers: ['prefix_sum_2d'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'extends_1d_prefix_to_2d',
            'inclusion_exclusion_for_rectangles',
            'O1_query_after_preprocess',
            'many_queries_need_fast_response',
            'need_shortest_path',
          ],
          accepted_answers: ['extends_1d_prefix_to_2d', 'inclusion_exclusion_for_rectangles', 'O1_query_after_preprocess', 'many_queries_need_fast_response'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['inclusion_exclusion', 'fast_io', 'index_padding', 'memoization', 'sliding_window'],
          accepted_answers: ['inclusion_exclusion', 'fast_io', 'index_padding'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['2d_prefix_array', 'segment_tree_2d', '1d_prefix_per_row', 'map', 'stack'],
          accepted_answers: ['2d_prefix_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'build_2d_prefix_with_inclusion_exclusion',
            'query_with_four_prefix_lookups',
            'pad_0_row_and_0_col',
            'brute_force_per_query',
            '1d_prefix_per_row',
          ],
          accepted_answers: ['build_2d_prefix_with_inclusion_exclusion', 'query_with_four_prefix_lookups', 'pad_0_row_and_0_col'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_matrix', label: 'N×N 행렬 입력, 0행/0열을 0으로 패딩' },
          { id: 'build_prefix', label: 'prefix[i][j] = A[i][j] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]' },
          { id: 'read_query', label: '각 쿼리 (x1,y1,x2,y2) 읽기' },
          { id: 'answer_query', label: 'prefix[x2][y2] - prefix[x1-1][y2] - prefix[x2][y1-1] + prefix[x1-1][y1-1] 출력' },
        ],
        correct_order: ['read_matrix', 'build_prefix', 'read_query', 'answer_query'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'inclusion_exclusion_add_subtract_order',
          'padding_0th_row_and_col',
          '1_indexed_coordinates',
          'fast_io_for_large_M',
          'single_cell_query',
          'full_matrix_query',
        ],
        required_answers: ['inclusion_exclusion_add_subtract_order', 'padding_0th_row_and_col', '1_indexed_coordinates'],
        recommended_answers: ['fast_io_for_large_M'],
        optional_answers: ['single_cell_query', 'full_matrix_query'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^2+M)', 'O(N^2*M)', 'O(N^2logN)', 'O(NM)'],
          accepted_answers: ['O(N^2+M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N^2)', 'O(N)', 'O(NM)'],
          accepted_answers: ['O(N^2)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'preprocess_N_squared',
            'each_query_O_1',
            'prefix_table_N_by_N',
            'brute_force_is_O_N2_per_query',
            'segment_tree_is_O_NlogN',
          ],
          accepted_answers: ['preprocess_N_squared', 'each_query_O_1', 'prefix_table_N_by_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'prefix_2d',
        label: '2D 누적합 + 포함-배제 O(1) 쿼리',
        pattern_analysis_answer: 'prefix_sum_2d',
        required_strategy_tags: ['build_2d_prefix_with_inclusion_exclusion', 'query_with_four_prefix_lookups', 'pad_0_row_and_0_col'],
      },
    ],

    common_mistakes: [
      {
        tag: 'wrong_inclusion_exclusion',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'inclusion_exclusion_add_subtract_order' },
        ],
        feedback:
          '포함-배제에서 빼기/더하기 순서를 잘못하면 영역이 중복 계산되거나 누락됩니다. 쿼리: prefix[x2][y2] - prefix[x1-1][y2] - prefix[x2][y1-1] + prefix[x1-1][y1-1]. 그림으로 확인하세요.',
      },
      {
        tag: 'miss_padding',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'padding_0th_row_and_col' },
        ],
        feedback:
          '0행과 0열을 0으로 패딩하지 않으면 x1=1 또는 y1=1일 때 prefix[-1]을 참조하게 됩니다. 패딩으로 경계 조건을 단순화하세요.',
      },
    ],

    review_notes: {
      core_takeaway: '2D prefix sum + 포함-배제. 전처리 O(N²), 쿼리 O(1). 쿼리 = P[x2][y2] - P[x1-1][y2] - P[x2][y1-1] + P[x1-1][y1-1].',
      mentor_hint: '포함-배제 공식을 그림으로 외워라. 전체 사각형에서 위쪽과 왼쪽을 빼고, 두 번 빼진 왼쪽 위 꼭짓점을 다시 더한다.',
      pattern_trigger: '"2D 배열에서 여러 직사각형 영역의 합"이 보이면 → 2D 누적합 + 포함-배제를 떠올려라.',
      why_it_works: '1D 누적합의 자연스러운 2D 확장이다. prefix[i][j]가 (1,1)~(i,j) 영역의 합을 저장하면, 임의 직사각형의 합은 4개의 prefix 값으로 O(1)에 계산된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11720 — 숫자의 합
  // ──────────────────────────────────────────────────────
  {
    id: 'b011720-boj',
    title: '숫자의 합',
    difficulty: 'easy',
    domain: 'basic_string',
    summary: '공백 없이 이어진 숫자 문자열에서 각 자릿수를 합산하는 기초 구현 문제',
    tags: ['string', 'array'],
    input_type: 'string',
    output_type: 'single_value',
    constraints: {
      digits_concatenated: true,
      each_char_is_0_to_9: true,
      input_size_hint: '1 <= N <= 100',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'minimum_steps', 'boolean_existence', 'string'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'digit_string',
            'sum_individual_digits',
            'no_spaces',
            'sorted_data',
            'modular_output_required',
          ],
          accepted_answers: ['digit_string', 'sum_individual_digits', 'no_spaces'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'sum_of_individual_digits_in_string',
            'char_to_int_and_accumulate',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['string_traversal', 'parsing', 'math_formula', 'sorting', 'dp_bottom_up', 'binary_search'],
          accepted_answers: ['string_traversal'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'each_char_independently_processed',
            'char_to_digit_conversion',
            'simple_accumulation',
            'overlapping_subproblems',
            'need_shortest_path',
          ],
          accepted_answers: ['each_char_independently_processed', 'char_to_digit_conversion', 'simple_accumulation'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['ascii_arithmetic', 'parseInt', 'array_sum', 'memoization', 'two_pointer'],
          accepted_answers: ['ascii_arithmetic', 'parseInt'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['sum_variable', 'array', 'map', 'stack', 'dp_array'],
          accepted_answers: ['sum_variable'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'iterate_chars_and_convert',
            'subtract_char_0_for_digit',
            'parse_as_single_number',
            'split_by_delimiter',
            'regex_extraction',
          ],
          accepted_answers: ['iterate_chars_and_convert', 'subtract_char_0_for_digit'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_N', label: 'N 입력' },
          { id: 'read_string', label: '숫자 문자열 입력' },
          { id: 'iterate_and_sum', label: '각 문자를 숫자로 변환하여 합산' },
          { id: 'output', label: '합 출력' },
        ],
        correct_order: ['read_N', 'read_string', 'iterate_and_sum', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'do_not_parse_as_single_number',
          'char_to_int_conversion',
          'max_sum_is_900',
          'all_zeros',
          'N_and_string_length_may_differ',
        ],
        required_answers: ['do_not_parse_as_single_number', 'char_to_int_conversion'],
        recommended_answers: ['max_sum_is_900'],
        optional_answers: ['all_zeros', 'N_and_string_length_may_differ'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(1)', 'O(NlogN)', 'O(N^2)'],
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
            'single_pass_through_string',
            'constant_accumulator',
            'no_auxiliary_structure',
            'string_stored_anyway',
            'sorting_dominates',
          ],
          accepted_answers: ['single_pass_through_string', 'constant_accumulator', 'no_auxiliary_structure'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'char_sum',
        label: '문자열 순회 + 문자→숫자 변환 합산',
        pattern_analysis_answer: 'string_traversal',
        required_strategy_tags: ['iterate_chars_and_convert', 'subtract_char_0_for_digit'],
      },
    ],

    common_mistakes: [
      {
        tag: 'parse_as_number',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'do_not_parse_as_single_number' },
        ],
        feedback:
          '100자리 숫자는 어떤 정수형으로도 표현할 수 없습니다. 전체를 하나의 숫자로 파싱하면 오버플로우가 발생합니다. 각 문자를 개별 숫자로 변환하여 합산하세요.',
      },
    ],

    review_notes: {
      core_takeaway: '문자열을 한 글자씩 순회하며 char - "0"으로 숫자 변환 후 합산. O(N).',
      mentor_hint: '큰 수를 정수로 파싱하려 하지 마라. 자릿수 합은 각 문자를 개별 처리하면 된다.',
      pattern_trigger: '"공백 없이 이어진 숫자의 각 자릿수에 대한 연산"이 보이면 → 문자열 순회 + char→int 변환을 떠올려라.',
      why_it_works: '각 문자는 ASCII 코드로 "0"~"9"이며, "0"을 빼면 0~9 정수로 변환된다. 합은 최대 9×100 = 900으로 int 범위 내이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 12891 — DNA 비밀번호
  // ──────────────────────────────────────────────────────
  {
    id: 'b012891-boj',
    title: 'DNA 비밀번호',
    difficulty: 'medium',
    domain: 'sliding_window',
    summary: '고정 크기 슬라이딩 윈도우로 문자 빈도 조건을 만족하는 부분 문자열 수를 구하는 문제',
    tags: ['sliding-window', 'string', 'counting'],
    input_type: 'string_and_constraints',
    output_type: 'count',
    constraints: {
      DNA_chars_ACGT: true,
      fixed_window_size_P: true,
      minimum_count_per_char: true,
      input_size_hint: '|DNA| <= 1000000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_steps', 'maximum_sum', 'boolean_existence', 'string'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'DNA_string_ACGT',
            'fixed_length_substring',
            'character_frequency_constraint',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['DNA_string_ACGT', 'fixed_length_substring', 'character_frequency_constraint'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_valid_substrings_by_char_frequency',
            'sliding_window_frequency_check',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['sliding_window_fixed', 'brute_force', 'two_pointer_variable', 'hash_map', 'sorting', 'binary_search'],
          accepted_answers: ['sliding_window_fixed'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'fixed_window_size',
            'frequency_incrementally_updatable',
            'O1_update_per_slide',
            'only_4_characters_to_track',
            'need_shortest_path',
          ],
          accepted_answers: ['fixed_window_size', 'frequency_incrementally_updatable', 'O1_update_per_slide', 'only_4_characters_to_track'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['counting_array', 'hash_map', 'string_processing', 'memoization', 'prefix_sum'],
          accepted_answers: ['counting_array', 'string_processing'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['frequency_array_4', 'hash_map', 'sliding_window', 'stack', 'dp_array'],
          accepted_answers: ['frequency_array_4', 'sliding_window'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'init_first_window',
            'slide_and_update_freq',
            'check_all_4_chars_meet_min',
            'recount_every_window',
            'sort_and_binary_search',
          ],
          accepted_answers: ['init_first_window', 'slide_and_update_freq', 'check_all_4_chars_meet_min'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_freq', label: '첫 윈도우 [0, P-1]의 A/C/G/T 빈도 계산' },
          { id: 'check_first', label: '첫 윈도우가 조건을 만족하면 count++' },
          { id: 'slide', label: '윈도우를 한 칸씩 오른쪽으로 이동' },
          { id: 'update_freq', label: '나가는 문자 빈도 감소, 들어오는 문자 빈도 증가' },
          { id: 'check_condition', label: '4개 문자 모두 최소 조건 이상이면 count++' },
          { id: 'output', label: 'count 출력' },
        ],
        correct_order: ['init_freq', 'check_first', 'slide', 'update_freq', 'check_condition', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'decrement_leaving_char',
          'minimum_0_always_satisfied',
          'P_equals_string_length',
          'all_same_characters',
          'fast_io_for_large_input',
        ],
        required_answers: ['decrement_leaving_char', 'minimum_0_always_satisfied'],
        recommended_answers: ['P_equals_string_length', 'fast_io_for_large_input'],
        optional_answers: ['all_same_characters'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NP)', 'O(NlogN)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(P)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'single_pass_slide',
            'constant_4_char_check',
            'frequency_array_size_4',
            'recount_per_window_is_O_NP',
            'no_auxiliary_structure',
          ],
          accepted_answers: ['single_pass_slide', 'constant_4_char_check', 'frequency_array_size_4'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'sliding_window',
        label: '고정 크기 슬라이딩 윈도우 + 빈도 배열',
        pattern_analysis_answer: 'sliding_window_fixed',
        required_strategy_tags: ['init_first_window', 'slide_and_update_freq', 'check_all_4_chars_meet_min'],
      },
    ],

    common_mistakes: [
      {
        tag: 'forget_decrement',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'decrement_leaving_char' },
        ],
        feedback:
          '윈도우를 이동할 때 나가는 문자의 빈도를 감소시키지 않으면 빈도가 계속 누적됩니다. 들어오는 문자 증가 + 나가는 문자 감소를 반드시 쌍으로 처리하세요.',
      },
      {
        tag: 'recount_every_window',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'recount_every_window' },
        ],
        feedback:
          '매 윈도우마다 P개를 다시 세면 O(NP)입니다. N=10⁶에서 시간 초과입니다. 슬라이딩 윈도우로 O(1)에 빈도를 갱신하세요.',
      },
    ],

    review_notes: {
      core_takeaway: '고정 크기 P 윈도우를 슬라이드하며 빈도 배열을 O(1)에 갱신. 4개 문자 조건을 매번 O(1)에 체크.',
      mentor_hint: '슬라이딩 윈도우의 핵심은 "들어오는 것 더하고, 나가는 것 빼기"이다. 이 두 연산을 항상 쌍으로 처리하라.',
      pattern_trigger: '"고정 길이 부분 문자열에서 문자 빈도 조건"이 보이면 → 고정 크기 슬라이딩 윈도우를 떠올려라.',
      why_it_works: '윈도우가 한 칸 이동하면 문자 하나가 빠지고 하나가 들어온다. 빈도 배열을 O(1)에 갱신하고, 고정 4종 문자만 체크하면 O(1)에 조건을 확인할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 17298 — 오큰수
  // ──────────────────────────────────────────────────────
  {
    id: 'b017298-boj',
    title: '오큰수',
    difficulty: 'medium',
    domain: 'monotone_stack',
    summary: '모노톤 스택으로 각 원소의 오른쪽에서 처음 나타나는 더 큰 수(Next Greater Element)를 O(N)에 구하는 문제',
    tags: ['stack', 'monotone-stack', 'array'],
    input_type: 'integer_array',
    output_type: 'array',
    constraints: {
      next_greater_element: true,
      minus_1_if_none: true,
      input_size_hint: '1 <= N <= 1000000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['array', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['array'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'find_next_greater_for_each',
            'rightward_search',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['integer_array', 'find_next_greater_for_each', 'rightward_search'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'next_greater_element_for_each_position',
            'monotone_stack_NGE',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['monotone_stack', 'brute_force', 'binary_search', 'segment_tree', 'two_pointer', 'sorting'],
          accepted_answers: ['monotone_stack'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'pending_elements_resolved_by_larger',
            'LIFO_resolves_most_recent_first',
            'each_element_pushed_popped_once',
            'N_up_to_1M_needs_linear',
            'need_shortest_path',
          ],
          accepted_answers: ['pending_elements_resolved_by_larger', 'LIFO_resolves_most_recent_first', 'each_element_pushed_popped_once', 'N_up_to_1M_needs_linear'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['decreasing_stack', 'index_based_stack', 'fast_io', 'memoization', 'sliding_window'],
          accepted_answers: ['decreasing_stack', 'index_based_stack', 'fast_io'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['stack', 'queue', 'deque', 'segment_tree', 'result_array'],
          accepted_answers: ['stack', 'result_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'push_index_to_stack',
            'pop_while_current_greater_than_top',
            'set_NGE_for_popped_indices',
            'remaining_stack_gets_minus_1',
            'brute_force_right_scan',
          ],
          accepted_answers: ['push_index_to_stack', 'pop_while_current_greater_than_top', 'set_NGE_for_popped_indices', 'remaining_stack_gets_minus_1'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init', label: '빈 스택과 결과 배열 NGE[] = -1로 초기화' },
          { id: 'iterate', label: '왼쪽에서 오른쪽으로 순회' },
          { id: 'pop_smaller', label: 'A[i] > A[stack.top()]이면 pop하고 NGE[popped] = A[i]' },
          { id: 'push_current', label: '현재 인덱스 i를 스택에 push' },
          { id: 'output', label: 'NGE 배열 출력 (스택에 남은 것은 이미 -1)' },
        ],
        correct_order: ['init', 'iterate', 'pop_smaller', 'push_current', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'remaining_stack_is_minus_1',
          'store_index_not_value_in_stack',
          'fast_io_for_N_1M',
          'descending_array_all_minus_1',
          'ascending_array_immediate_NGE',
          'equal_values_not_greater',
        ],
        required_answers: ['remaining_stack_is_minus_1', 'store_index_not_value_in_stack', 'fast_io_for_N_1M'],
        recommended_answers: ['equal_values_not_greater'],
        optional_answers: ['descending_array_all_minus_1', 'ascending_array_immediate_NGE'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(NsqrtN)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(1)', 'O(NlogN)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_element_pushed_popped_at_most_once',
            'amortized_O1_per_element',
            'stack_plus_result_array',
            'brute_force_is_O_N2',
            'segment_tree_is_O_NlogN',
          ],
          accepted_answers: ['each_element_pushed_popped_at_most_once', 'amortized_O1_per_element', 'stack_plus_result_array'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'monotone_stack',
        label: '모노톤 감소 스택: 큰 수 만나면 미결 원소 해결',
        pattern_analysis_answer: 'monotone_stack',
        required_strategy_tags: ['push_index_to_stack', 'pop_while_current_greater_than_top', 'set_NGE_for_popped_indices', 'remaining_stack_gets_minus_1'],
      },
    ],

    common_mistakes: [
      {
        tag: 'brute_force_n2',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force' },
        ],
        feedback:
          'O(N²) 브루트포스는 N=1,000,000에서 10^12 연산으로 시간 초과입니다. 모노톤 스택을 사용하면 O(N)에 해결 가능합니다.',
      },
      {
        tag: 'store_value_not_index',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'store_index_not_value_in_stack' },
        ],
        feedback:
          '스택에 값이 아닌 인덱스를 저장해야 합니다. 인덱스가 없으면 결과 배열의 어느 위치에 NGE를 기록해야 하는지 알 수 없습니다.',
      },
      {
        tag: 'equal_is_not_greater',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'equal_values_not_greater' },
        ],
        feedback:
          '오큰수는 "크다(greater)"입니다. 같은 값은 오큰수가 아닙니다. pop 조건은 A[i] > A[stack.top()]이어야 하며, >= 로 하면 같은 값을 오큰수로 잘못 처리합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '모노톤 감소 스택: 현재 원소가 top보다 크면 pop하며 NGE 설정. 각 원소 최대 1회 push/pop으로 O(N).',
      mentor_hint: '"아직 오큰수를 못 찾은 원소"를 스택에 대기시킨다는 관점으로 이해하라. 큰 수가 나타나면 대기 중인 원소들의 답이 한꺼번에 결정된다.',
      pattern_trigger: '"각 원소의 오른쪽(또는 왼쪽)에서 처음 나타나는 더 큰(또는 작은) 수"가 보이면 → 모노톤 스택을 떠올려라.',
      why_it_works: '스택에 남아 있는 원소는 아직 자신보다 큰 수를 만나지 못한 것들이다. 새 원소가 이들보다 크면, 해당 원소가 바로 가장 가까운 오큰수이다. LIFO 구조로 가장 최근 것부터 해결하므로 "가장 왼쪽" 조건도 충족된다.',
    },
  },
];
