import type { ProblemV2 } from '../types';

export const SORTING_V2: ProblemV2[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1377 — 버블 소트
  // ──────────────────────────────────────────────────────
  {
    id: 'b001377-boj',
    title: '버블 소트',
    difficulty: 'hard',
    domain: 'sorting_analysis',
    summary: '버블 소트에서 교환이 멈추는 패스 번호를 정렬 전후 인덱스 비교로 O(N log N)에 구하는 문제',
    tags: ['sorting', 'array', 'index-tracking'],
    input_type: 'integer_array',
    output_type: 'single_value',
    constraints: {
      bubble_sort_pass_number: true,
      input_size_hint: '1 <= N <= 500000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'minimum_steps', 'boolean_existence', 'sorted_array'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'bubble_sort_behavior',
            'find_stopping_pass',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['integer_array', 'bubble_sort_behavior', 'find_stopping_pass'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'bubble_sort_first_no_swap_pass',
            'max_leftward_displacement_plus_1',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['index_displacement_analysis', 'bubble_sort_simulation', 'inversion_count', 'binary_search', 'greedy', 'dp_bottom_up'],
          accepted_answers: ['index_displacement_analysis'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'each_pass_moves_element_left_by_1',
            'max_leftward_shift_determines_passes',
            'simulation_is_O_N2',
            'sort_then_compare_indices',
            'need_shortest_path',
          ],
          accepted_answers: ['each_pass_moves_element_left_by_1', 'max_leftward_shift_determines_passes', 'simulation_is_O_N2'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['stable_sort_needed', 'pair_sorting', 'index_tracking', 'inversion_count', 'memoization'],
          accepted_answers: ['stable_sort_needed', 'pair_sorting', 'index_tracking'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['value_index_pair_array', 'sorted_array', 'map', 'stack', 'dp_array'],
          accepted_answers: ['value_index_pair_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_with_original_index',
            'compute_max_leftward_shift',
            'answer_is_max_shift_plus_1',
            'simulate_bubble_sort',
            'count_inversions',
          ],
          accepted_answers: ['sort_with_original_index', 'compute_max_leftward_shift', 'answer_is_max_shift_plus_1'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'pair_with_index', label: '(값, 원래 인덱스) 쌍 배열 생성' },
          { id: 'sort_pairs', label: '값 기준 정렬 (같은 값이면 원래 인덱스 오름차순)' },
          { id: 'compute_shifts', label: '각 원소의 (원래 인덱스 - 정렬 후 인덱스) 계산' },
          { id: 'find_max', label: '왼쪽 이동 거리의 최댓값 구하기 (음수는 0으로)' },
          { id: 'add_one', label: '최댓값 + 1을 출력' },
        ],
        correct_order: ['pair_with_index', 'sort_pairs', 'compute_shifts', 'find_max', 'add_one'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'stable_sort_for_equal_values',
          'answer_plus_one_for_final_pass',
          'rightward_shift_ignored',
          'already_sorted_answer_is_1',
          'all_same_values_answer_is_1',
          'negative_shift_means_moved_right',
        ],
        required_answers: ['stable_sort_for_equal_values', 'answer_plus_one_for_final_pass', 'rightward_shift_ignored'],
        recommended_answers: ['already_sorted_answer_is_1', 'negative_shift_means_moved_right'],
        optional_answers: ['all_same_values_answer_is_1'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(NlogN)', 'O(N)', 'O(N^2)', 'O(NsqrtN)'],
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
            'sorting_dominates',
            'linear_scan_for_max',
            'pair_array_size_N',
            'simulation_is_O_N2',
            'constant_work_per_element',
          ],
          accepted_answers: ['sorting_dominates', 'linear_scan_for_max', 'pair_array_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'index_displacement',
        label: '정렬 전후 인덱스 차이의 최댓값 + 1',
        pattern_analysis_answer: 'index_displacement_analysis',
        required_strategy_tags: ['sort_with_original_index', 'compute_max_leftward_shift', 'answer_is_max_shift_plus_1'],
      },
    ],

    common_mistakes: [
      {
        tag: 'simulate_bubble',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'simulate_bubble_sort' },
        ],
        feedback:
          '버블 소트를 직접 시뮬레이션하면 O(N²)입니다. N=500,000에서 시간 초과입니다. 핵심 성질(한 패스당 왼쪽으로 최대 1칸 이동)을 이용하면 O(N log N)에 해결 가능합니다.',
      },
      {
        tag: 'miss_plus_one',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'answer_plus_one_for_final_pass' },
        ],
        feedback:
          '답에 +1을 해야 합니다. 최대 이동 거리만큼의 패스 + "교환이 없음을 확인하는" 마지막 패스 1번이 추가됩니다. 이미 정렬된 배열이면 답은 1입니다.',
      },
      {
        tag: 'unstable_sort',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'stable_sort_for_equal_values' },
        ],
        feedback:
          '같은 값이 여러 개일 때 안정 정렬을 사용하거나 (값, 원래 인덱스)로 정렬해야 합니다. 불안정 정렬은 같은 값의 상대 순서를 바꿔 인덱스 차이가 잘못 계산됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: '버블 소트의 패스 수 = max(원래 인덱스 - 정렬 후 인덱스) + 1. 핵심: 한 패스당 왼쪽으로 최대 1칸.',
      mentor_hint: '"왜 왼쪽 이동만 보면 되는가?"를 설명할 수 있어야 한다. 오른쪽으로는 한 패스에서 여러 칸 이동 가능하지만, 왼쪽으로는 최대 1칸만 가능하므로 왼쪽 이동이 병목이다.',
      pattern_trigger: '"버블 소트의 패스 수/교환 횟수를 직접 시뮬레이션 없이"가 보이면 → 정렬 전후 인덱스 비교를 떠올려라.',
      why_it_works: '버블 소트의 한 패스에서 각 원소는 왼쪽으로 최대 1칸 이동한다. k칸 왼쪽으로 이동해야 하는 원소가 있으면 최소 k번의 패스가 필요하다. 따라서 최대 왼쪽 이동 거리가 필요한 패스 수를 결정한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1427 — 소트인사이드
  // ──────────────────────────────────────────────────────
  {
    id: 'b001427-boj',
    title: '소트인사이드',
    difficulty: 'easy',
    domain: 'basic_sorting',
    summary: '숫자의 각 자릿수를 내림차순으로 정렬하는 기초 문제',
    tags: ['sorting', 'string'],
    input_type: 'single_integer',
    output_type: 'single_value',
    constraints: {
      sort_digits_descending: true,
      input_size_hint: 'N <= 10^9 (최대 10자리)',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'minimum_steps', 'boolean_existence', 'sorted_array'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_number',
            'sort_individual_digits',
            'descending_order',
            'sorted_data',
            'modular_output_required',
          ],
          accepted_answers: ['single_number', 'sort_individual_digits', 'descending_order'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'sort_digits_of_number_descending',
            'rearrange_digits_largest_first',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['string_sort', 'counting_sort', 'math_extraction', 'brute_force', 'binary_search', 'greedy'],
          accepted_answers: ['string_sort', 'counting_sort'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'constant_size_at_most_10_digits',
            'simple_sort_sufficient',
            'string_conversion_simplifies_digit_extraction',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['constant_size_at_most_10_digits', 'simple_sort_sufficient', 'string_conversion_simplifies_digit_extraction'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['char_array_sort', 'reverse_sort', 'digit_extraction', 'memoization', 'two_pointer'],
          accepted_answers: ['char_array_sort', 'reverse_sort', 'digit_extraction'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['char_array', 'digit_array', 'count_array_10', 'map', 'stack'],
          accepted_answers: ['char_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'to_string_then_sort_reverse',
            'counting_sort_9_to_0',
            'mod_div_extraction',
            'parse_as_number_then_rearrange',
            'brute_force_permutations',
          ],
          accepted_answers: ['to_string_then_sort_reverse'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'to_string', label: '숫자를 문자열로 변환' },
          { id: 'to_array', label: '각 문자를 배열에 저장' },
          { id: 'sort_desc', label: '내림차순 정렬' },
          { id: 'join_output', label: '배열을 결합하여 출력' },
        ],
        correct_order: ['to_string', 'to_array', 'sort_desc', 'join_output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'descending_not_ascending',
          'single_digit_input',
          'all_same_digits',
          'leading_zeros_not_possible',
          'max_10_digits_constant_time',
        ],
        required_answers: ['descending_not_ascending'],
        recommended_answers: ['single_digit_input', 'max_10_digits_constant_time'],
        optional_answers: ['all_same_digits', 'leading_zeros_not_possible'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(1)', 'O(d*logd)', 'O(N)', 'O(NlogN)'],
          accepted_answers: ['O(1)', 'O(d*logd)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(d)', 'O(N)'],
          accepted_answers: ['O(1)', 'O(d)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'max_10_digits_is_constant',
            'sort_of_constant_size',
            'no_dependency_on_input_size',
            'counting_sort_is_O_d',
            'sorting_dominates',
          ],
          accepted_answers: ['max_10_digits_is_constant', 'sort_of_constant_size'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'string_sort',
        label: '문자열 변환 → 문자 배열 내림차순 정렬',
        pattern_analysis_answer: 'string_sort',
        required_strategy_tags: ['to_string_then_sort_reverse'],
      },
    ],

    common_mistakes: [
      {
        tag: 'ascending_sort',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'descending_not_ascending' },
        ],
        feedback:
          '내림차순 정렬입니다. 기본 sort는 오름차순이므로 역순 비교 함수를 지정하거나 정렬 후 reverse해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '숫자를 문자열로 변환, 각 자릿수를 내림차순 정렬 후 결합. 최대 10자리이므로 상수 시간.',
      mentor_hint: '자릿수가 최대 10개이므로 어떤 방법이든 상수 시간이다. 카운팅 정렬(0~9 카운트 후 9부터 출력)이 가장 효율적.',
      pattern_trigger: '"숫자의 자릿수를 재배열"이 보이면 → 문자열 변환 후 정렬을 떠올려라.',
      why_it_works: '자릿수는 최대 10개로 고정 크기이다. 어떤 정렬이든 O(1)이며, 내림차순으로 배치하면 가장 큰 수가 된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1517 — 버블 소트 (역전의 수)
  // ──────────────────────────────────────────────────────
  {
    id: 'b001517-boj',
    title: '버블 소트',
    difficulty: 'hard',
    domain: 'inversion_count',
    summary: '버블 소트의 swap 횟수(= 역전 쌍 수)를 병합 정렬로 O(N log N)에 구하는 문제',
    tags: ['merge-sort', 'divide-and-conquer', 'inversion-count'],
    input_type: 'integer_array',
    output_type: 'single_value',
    constraints: {
      count_bubble_sort_swaps: true,
      equals_inversion_count: true,
      input_size_hint: '1 <= N <= 500000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'minimum_steps', 'boolean_existence', 'sorted_array'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'bubble_sort_swap_count',
            'equals_inversion_pairs',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['integer_array', 'bubble_sort_swap_count', 'equals_inversion_pairs'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_inversions_via_merge_sort',
            'bubble_sort_swap_count_equals_inversions',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['merge_sort_inversion', 'bubble_sort_simulation', 'BIT_inversion', 'brute_force', 'binary_search', 'dp_bottom_up'],
          accepted_answers: ['merge_sort_inversion'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'swap_count_equals_inversion_count',
            'merge_step_counts_cross_inversions',
            'divide_and_conquer_O_NlogN',
            'simulation_is_O_N2',
            'need_shortest_path',
          ],
          accepted_answers: ['swap_count_equals_inversion_count', 'merge_step_counts_cross_inversions', 'divide_and_conquer_O_NlogN', 'simulation_is_O_N2'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['BIT_alternative', 'segment_tree', 'coordinate_compression', 'memoization', 'two_pointer'],
          accepted_answers: ['BIT_alternative', 'segment_tree'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'temp_array_for_merge', 'BIT', 'segment_tree', 'stack'],
          accepted_answers: ['array', 'temp_array_for_merge'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'merge_sort_with_inversion_count',
            'right_element_selected_adds_left_remaining',
            'use_long_for_result',
            'simulate_bubble_sort',
            'BIT_count_inversions',
          ],
          accepted_answers: ['merge_sort_with_inversion_count', 'right_element_selected_adds_left_remaining', 'use_long_for_result'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init', label: '배열 입력 및 역전 카운터 = 0 초기화' },
          { id: 'merge_sort', label: '병합 정렬 재귀 호출 (배열을 반으로 분할)' },
          { id: 'merge', label: '두 정렬된 반을 merge' },
          { id: 'count_inversion', label: '오른쪽 원소가 선택될 때 왼쪽에 남은 원소 수를 카운터에 추가' },
          { id: 'equal_left_first', label: '같은 값이면 왼쪽 우선 (swap 안 함)' },
          { id: 'output', label: '총 역전 수 출력' },
        ],
        correct_order: ['init', 'merge_sort', 'merge', 'count_inversion', 'equal_left_first', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'result_exceeds_int_use_long',
          'equal_values_left_first_no_swap',
          'already_sorted_answer_0',
          'reverse_sorted_max_inversions',
          'temp_array_allocation',
          'N_equals_1_answer_0',
        ],
        required_answers: ['result_exceeds_int_use_long', 'equal_values_left_first_no_swap'],
        recommended_answers: ['already_sorted_answer_0', 'temp_array_allocation'],
        optional_answers: ['reverse_sorted_max_inversions', 'N_equals_1_answer_0'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(NlogN)', 'O(N)', 'O(N^2)', 'O(NsqrtN)'],
          accepted_answers: ['O(NlogN)'],
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
            'merge_sort_O_NlogN',
            'temp_array_for_merge',
            'recursive_stack_O_logN',
            'simulation_is_O_N2',
            'BIT_also_O_NlogN',
          ],
          accepted_answers: ['merge_sort_O_NlogN', 'temp_array_for_merge'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'merge_sort_inversion',
        label: '병합 정렬 merge 단계에서 역전 쌍 카운트',
        pattern_analysis_answer: 'merge_sort_inversion',
        required_strategy_tags: ['merge_sort_with_inversion_count', 'right_element_selected_adds_left_remaining', 'use_long_for_result'],
      },
      {
        strategy_id: 'bit_inversion',
        label: 'BIT로 각 원소 삽입 시 역전 쌍 카운트',
        pattern_analysis_answer: 'BIT_inversion',
        required_strategy_tags: ['BIT_count_inversions'],
      },
    ],

    common_mistakes: [
      {
        tag: 'simulate_bubble',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'bubble_sort_simulation' },
        ],
        feedback:
          'O(N²) 시뮬레이션은 N=500,000에서 시간 초과입니다. 버블 소트 swap 수 = 역전 쌍 수라는 성질을 이용하여 병합 정렬로 O(N log N)에 세야 합니다.',
      },
      {
        tag: 'int_overflow',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'result_exceeds_int_use_long' },
        ],
        feedback:
          '역전 쌍 수의 최댓값은 N*(N-1)/2 ≈ 1.25×10^11입니다. int(32bit) 범위를 초과하므로 long 타입을 사용해야 합니다.',
      },
      {
        tag: 'equal_swap',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'equal_values_left_first_no_swap' },
        ],
        feedback:
          '같은 값에 대해서는 버블 소트가 swap하지 않습니다. merge 시 A[left] <= A[right]이면 왼쪽을 먼저 선택해야 합니다. 등호를 잘못 처리하면 역전 수가 과대 계산됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: '버블 소트 swap 수 = 역전 쌍 수. 병합 정렬의 merge에서 오른쪽 원소 선택 시 왼쪽 잔여 수를 카운트.',
      mentor_hint: '"오른쪽이 먼저 선택된다 = 오른쪽 원소가 왼쪽 잔여 원소 모두보다 작다 = 그만큼의 역전 쌍이 존재"를 정확히 설명할 수 있어야 한다.',
      pattern_trigger: '"버블 소트의 swap 횟수" 또는 "배열의 역전 쌍 수"가 보이면 → 병합 정렬 변형을 떠올려라.',
      why_it_works: '병합 시 두 정렬된 부분 배열에서, 오른쪽 원소가 왼쪽 원소보다 먼저 결과에 들어가면 왼쪽에 남은 모든 원소와 역전 관계이다. 이 교차 역전 쌍을 정확히 세면 전체 역전 쌍 수가 된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2750 — 수 정렬하기
  // ──────────────────────────────────────────────────────
  {
    id: 'b002750-boj',
    title: '수 정렬하기',
    difficulty: 'easy',
    domain: 'basic_sorting',
    summary: 'N개의 수를 오름차순 정렬하는 기초 문제. O(N²) 알고리즘 직접 구현 연습.',
    tags: ['sorting'],
    input_type: 'integer_array',
    output_type: 'sorted_array',
    constraints: {
      ascending_order: true,
      no_duplicates: true,
      input_size_hint: '1 <= N <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['sorted_array', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['sorted_array'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'small_N_up_to_1000',
            'no_duplicates',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['integer_array', 'small_N_up_to_1000', 'no_duplicates'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'basic_ascending_sort',
            'implement_O_N2_sorting_algorithm',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['selection_sort', 'insertion_sort', 'bubble_sort', 'merge_sort', 'quick_sort', 'built_in_sort'],
          accepted_answers: ['selection_sort', 'insertion_sort', 'bubble_sort', 'built_in_sort'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'N_small_any_sort_works',
            'practice_basic_sort_implementation',
            'O_N2_acceptable',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['N_small_any_sort_works', 'practice_basic_sort_implementation', 'O_N2_acceptable'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['built_in_sort', 'swap_operation', 'index_management', 'memoization', 'two_pointer'],
          accepted_answers: ['built_in_sort', 'swap_operation', 'index_management'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'linked_list', 'heap', 'stack', 'map'],
          accepted_answers: ['array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'selection_sort_find_min_swap',
            'insertion_sort_shift_and_insert',
            'bubble_sort_adjacent_swap',
            'built_in_sort_function',
            'merge_sort_divide_conquer',
          ],
          accepted_answers: ['selection_sort_find_min_swap', 'insertion_sort_shift_and_insert', 'bubble_sort_adjacent_swap', 'built_in_sort_function'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요 (선택 정렬 기준).',
        steps_catalog: [
          { id: 'read_array', label: 'N개의 수를 배열에 입력' },
          { id: 'outer_loop', label: 'i = 0부터 N-2까지 순회' },
          { id: 'find_min', label: 'i~N-1 범위에서 최솟값의 인덱스 찾기' },
          { id: 'swap', label: 'A[i]와 A[min_idx] 교환' },
          { id: 'output', label: '정렬된 배열 출력' },
        ],
        correct_order: ['read_array', 'outer_loop', 'find_min', 'swap', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'off_by_one_loop_boundary',
          'N_equals_1_already_sorted',
          'negative_numbers',
          'swap_with_self_is_ok',
          'ascending_not_descending',
        ],
        required_answers: ['off_by_one_loop_boundary', 'ascending_not_descending'],
        recommended_answers: ['negative_numbers', 'N_equals_1_already_sorted'],
        optional_answers: ['swap_with_self_is_ok'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^2)', 'O(NlogN)', 'O(N)', 'O(N^3)'],
          accepted_answers: ['O(N^2)', 'O(NlogN)'],
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
            'nested_loops_N_squared',
            'in_place_sort_O1_space',
            'N_small_O_N2_fast_enough',
            'built_in_is_O_NlogN',
            'merge_sort_O_N_space',
          ],
          accepted_answers: ['nested_loops_N_squared', 'in_place_sort_O1_space', 'N_small_O_N2_fast_enough'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'selection_sort',
        label: '선택 정렬: 최솟값 찾아 swap',
        pattern_analysis_answer: 'selection_sort',
        required_strategy_tags: ['selection_sort_find_min_swap'],
      },
      {
        strategy_id: 'built_in',
        label: '내장 sort 함수',
        pattern_analysis_answer: 'built_in_sort',
        required_strategy_tags: ['built_in_sort_function'],
      },
    ],

    common_mistakes: [
      {
        tag: 'off_by_one',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'off_by_one_loop_boundary' },
        ],
        feedback:
          '반복문 범위 설정에서 off-by-one 에러가 흔합니다. 선택 정렬의 외부 루프는 i < N-1 (마지막 원소는 자동 정렬), 내부 루프는 j = i+1부터 N-1까지입니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'N <= 1000이므로 O(N²) 정렬로 충분. 선택/삽입/버블 정렬을 직접 구현하는 연습 문제.',
      mentor_hint: '면접에서 "O(N²) 정렬을 직접 구현해보세요"라고 할 때 선택 정렬이 가장 구현이 간단하다.',
      pattern_trigger: '"N이 작고 기본 정렬"이 보이면 → O(N²) 정렬 직접 구현을 떠올려라.',
      why_it_works: 'N = 1000일 때 10^6 연산이므로 O(N²)도 빠르게 완료된다. 기본 정렬 알고리즘의 정확성만 보장하면 된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2751 — 수 정렬하기 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b002751-boj',
    title: '수 정렬하기 2',
    difficulty: 'easy',
    domain: 'efficient_sorting',
    summary: 'N이 최대 100만이므로 O(N log N) 정렬이 필요한 문제',
    tags: ['sorting', 'merge-sort'],
    input_type: 'integer_array',
    output_type: 'sorted_array',
    constraints: {
      ascending_order: true,
      no_duplicates: true,
      fast_io_needed: true,
      input_size_hint: '1 <= N <= 1000000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['sorted_array', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['sorted_array'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'large_N_up_to_1M',
            'no_duplicates',
            'fast_io_critical',
            'sorted_data',
          ],
          accepted_answers: ['integer_array', 'large_N_up_to_1M', 'fast_io_critical'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'sort_1M_numbers_in_NlogN',
            'efficient_comparison_sort',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['merge_sort', 'quick_sort', 'heap_sort', 'built_in_sort', 'bubble_sort', 'counting_sort'],
          accepted_answers: ['merge_sort', 'built_in_sort', 'heap_sort'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'N_too_large_for_O_N2',
            'O_NlogN_guaranteed_needed',
            'quick_sort_worst_case_risk',
            'fast_io_also_important',
            'need_shortest_path',
          ],
          accepted_answers: ['N_too_large_for_O_N2', 'O_NlogN_guaranteed_needed', 'fast_io_also_important'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['fast_io', 'random_pivot_quicksort', 'introsort', 'counting_sort', 'memoization'],
          accepted_answers: ['fast_io', 'random_pivot_quicksort'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'temp_array', 'heap', 'map', 'stack'],
          accepted_answers: ['array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'built_in_sort_with_fast_io',
            'merge_sort_implementation',
            'heap_sort_implementation',
            'bubble_sort',
            'counting_sort',
          ],
          accepted_answers: ['built_in_sort_with_fast_io', 'merge_sort_implementation'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'fast_io', label: '빠른 입출력 설정' },
          { id: 'read_array', label: 'N개의 수 입력' },
          { id: 'sort', label: 'O(N log N) 정렬 수행' },
          { id: 'output', label: '정렬된 배열 출력' },
        ],
        correct_order: ['fast_io', 'read_array', 'sort', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'O_N2_sort_will_TLE',
          'fast_io_mandatory',
          'quicksort_worst_case',
          'merge_sort_extra_memory',
          'already_sorted_input',
          'reverse_sorted_input',
        ],
        required_answers: ['O_N2_sort_will_TLE', 'fast_io_mandatory'],
        recommended_answers: ['quicksort_worst_case', 'merge_sort_extra_memory'],
        optional_answers: ['already_sorted_input', 'reverse_sorted_input'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(NlogN)', 'O(N)', 'O(N^2)', 'O(NsqrtN)'],
          accepted_answers: ['O(NlogN)'],
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
            'comparison_sort_lower_bound',
            'merge_sort_guaranteed_NlogN',
            'temp_array_or_input_array',
            'quicksort_average_NlogN',
            'heap_sort_in_place',
          ],
          accepted_answers: ['comparison_sort_lower_bound', 'merge_sort_guaranteed_NlogN', 'temp_array_or_input_array'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'built_in_fast_io',
        label: '내장 sort + 빠른 I/O',
        pattern_analysis_answer: 'built_in_sort',
        required_strategy_tags: ['built_in_sort_with_fast_io'],
      },
      {
        strategy_id: 'merge_sort',
        label: '병합 정렬 직접 구현',
        pattern_analysis_answer: 'merge_sort',
        required_strategy_tags: ['merge_sort_implementation'],
      },
    ],

    common_mistakes: [
      {
        tag: 'O_N2_sort',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'O_N2_sort_will_TLE' },
        ],
        feedback:
          'N=1,000,000에서 O(N²)는 10^12 연산으로 시간 초과입니다. O(N log N) 보장 정렬(병합, 힙)을 사용하세요.',
      },
      {
        tag: 'slow_io',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'fast_io_mandatory' },
        ],
        feedback:
          'N=100만에서 느린 I/O(예: Scanner, endl)는 TLE의 주요 원인입니다. BufferedReader/Writer, sys.stdin, ios::sync_with_stdio(false) 등을 사용하세요.',
      },
    ],

    review_notes: {
      core_takeaway: 'N = 10^6이면 O(N log N) 필수. 내장 sort + 빠른 I/O가 가장 실용적.',
      mentor_hint: '이 문제에서 TLE가 나면 알고리즘이 아니라 I/O가 원인인 경우가 많다. 정렬 전에 I/O를 먼저 최적화하라.',
      pattern_trigger: '"N이 크고 정렬"이 보이면 → O(N log N) 보장 정렬 + 빠른 I/O를 떠올려라.',
      why_it_works: '비교 기반 정렬의 하한은 Ω(N log N)이다. 병합 정렬은 항상 이 하한에 맞으며, 내장 sort도 대부분 O(N log N)을 보장한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 10989 — 수 정렬하기 3
  // ──────────────────────────────────────────────────────
  {
    id: 'b010989-boj',
    title: '수 정렬하기 3',
    difficulty: 'easy',
    domain: 'counting_sort',
    summary: '값 범위가 작고 N이 매우 클 때 카운팅 정렬로 O(N+K)에 해결하는 문제',
    tags: ['counting-sort', 'sorting'],
    input_type: 'integer_array',
    output_type: 'sorted_array',
    constraints: {
      value_range_small: '1 <= value <= 10000',
      N_very_large: true,
      memory_tight: true,
      input_size_hint: 'N <= 10000000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['sorted_array', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['sorted_array'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'very_large_N_10M',
            'small_value_range_1_to_10000',
            'memory_constraint_tight',
            'fast_io_critical',
            'sorted_data',
          ],
          accepted_answers: ['very_large_N_10M', 'small_value_range_1_to_10000', 'memory_constraint_tight', 'fast_io_critical'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'counting_sort_for_small_range_large_N',
            'frequency_array_based_sorting',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['counting_sort', 'merge_sort', 'quick_sort', 'radix_sort', 'built_in_sort', 'bucket_sort'],
          accepted_answers: ['counting_sort'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'value_range_K_much_smaller_than_N',
            'avoid_storing_all_N_elements',
            'O_N_plus_K_beats_NlogN',
            'memory_constraint_favors_counting',
            'need_shortest_path',
          ],
          accepted_answers: ['value_range_K_much_smaller_than_N', 'avoid_storing_all_N_elements', 'O_N_plus_K_beats_NlogN', 'memory_constraint_favors_counting'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['fast_io', 'memory_optimization', 'radix_sort', 'bucket_sort', 'string_builder'],
          accepted_answers: ['fast_io', 'memory_optimization'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['count_array_10001', 'full_array_N', 'map', 'heap', 'dp_array'],
          accepted_answers: ['count_array_10001'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'count_frequencies',
            'output_by_frequency',
            'no_need_to_store_all_elements',
            'comparison_sort_NlogN',
            'radix_sort',
          ],
          accepted_answers: ['count_frequencies', 'output_by_frequency', 'no_need_to_store_all_elements'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_cnt', label: 'cnt[0..10000] = 0 초기화' },
          { id: 'read_and_count', label: 'N개의 수를 읽으며 cnt[value]++ 카운트' },
          { id: 'output_sorted', label: '1부터 10000까지 cnt[v]만큼 반복 출력' },
          { id: 'fast_output', label: 'StringBuilder/BufferedWriter로 출력 최적화' },
        ],
        correct_order: ['init_cnt', 'read_and_count', 'output_sorted', 'fast_output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'do_not_store_all_N_elements',
          'fast_io_mandatory',
          'output_volume_up_to_10M_lines',
          'memory_limit_tight',
          'values_start_from_1_not_0',
          'all_same_values',
        ],
        required_answers: ['do_not_store_all_N_elements', 'fast_io_mandatory', 'output_volume_up_to_10M_lines'],
        recommended_answers: ['memory_limit_tight', 'values_start_from_1_not_0'],
        optional_answers: ['all_same_values'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+K)', 'O(NlogN)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(N+K)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(K)', 'O(N)', 'O(N+K)'],
          accepted_answers: ['O(K)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'read_N_elements_count_only',
            'count_array_size_K',
            'output_loop_over_K',
            'no_full_array_needed',
            'comparison_sort_is_NlogN',
          ],
          accepted_answers: ['read_N_elements_count_only', 'count_array_size_K', 'output_loop_over_K', 'no_full_array_needed'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'counting_sort',
        label: '카운팅 정렬: 빈도 배열로 정렬',
        pattern_analysis_answer: 'counting_sort',
        required_strategy_tags: ['count_frequencies', 'output_by_frequency', 'no_need_to_store_all_elements'],
      },
    ],

    common_mistakes: [
      {
        tag: 'store_all_elements',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'do_not_store_all_N_elements' },
        ],
        feedback:
          'N=10^7개를 모두 배열에 저장하면 메모리 초과(특히 Java)가 발생합니다. 값 범위가 1~10000이므로 크기 10001의 카운트 배열만 유지하세요.',
      },
      {
        tag: 'slow_output',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'fast_io_mandatory' },
        ],
        feedback:
          '출력이 최대 1000만 줄입니다. println이나 cout << endl을 매번 호출하면 I/O만으로 시간 초과됩니다. 버퍼링 출력을 사용하세요.',
      },
    ],

    review_notes: {
      core_takeaway: '값 범위 K가 작으면 카운팅 정렬 O(N+K). 원소를 저장하지 않고 빈도만 관리하여 메모리도 절약.',
      mentor_hint: '"비교 정렬은 Ω(N log N)이지만, 값 범위가 제한되면 카운팅/기수 정렬로 O(N)에 가능하다"는 것을 설명할 수 있어야 한다.',
      pattern_trigger: '"N이 매우 크고 값 범위가 작다"가 보이면 → 카운팅 정렬을 떠올려라.',
      why_it_works: '값 범위가 K로 제한되면 크기 K의 배열로 각 값의 빈도를 세고, 순서대로 출력하면 O(N+K)에 정렬이 완료된다. 비교 연산이 불필요하므로 Ω(N log N) 하한을 우회한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11004 — K번째 수
  // ──────────────────────────────────────────────────────
  {
    id: 'b011004-boj',
    title: 'K번째 수',
    difficulty: 'medium',
    domain: 'order_statistics',
    summary: 'N개의 수에서 K번째로 작은 수를 정렬 또는 퀵 셀렉트로 구하는 문제',
    tags: ['sorting', 'quick-select', 'divide-and-conquer'],
    input_type: 'integer_array_and_K',
    output_type: 'single_value',
    constraints: {
      kth_smallest: true,
      fast_io_needed: true,
      input_size_hint: 'N <= 5000000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'sorted_array', 'boolean_existence', 'minimum_steps'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'find_kth_smallest',
            'large_N_up_to_5M',
            'fast_io_critical',
            'sorted_data',
          ],
          accepted_answers: ['integer_array', 'find_kth_smallest', 'large_N_up_to_5M', 'fast_io_critical'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_kth_order_statistic',
            'sort_and_index_or_quick_select',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['sort_and_index', 'quick_select', 'heap_partial_sort', 'brute_force', 'binary_search', 'counting_sort'],
          accepted_answers: ['sort_and_index', 'quick_select'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'sort_NlogN_is_safe',
            'quick_select_average_O_N',
            'full_sort_not_strictly_needed',
            'N_5M_needs_efficient_approach',
            'need_shortest_path',
          ],
          accepted_answers: ['sort_NlogN_is_safe', 'quick_select_average_O_N', 'N_5M_needs_efficient_approach'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['random_pivot', 'introselect', 'partial_sort', 'fast_io', 'memoization'],
          accepted_answers: ['random_pivot', 'fast_io'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'heap', 'balanced_bst', 'map', 'stack'],
          accepted_answers: ['array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_then_index_K',
            'quick_select_partition',
            'random_pivot_for_worst_case',
            'heap_extract_K_times',
            'brute_force_find_min_K_times',
          ],
          accepted_answers: ['sort_then_index_K', 'quick_select_partition'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요 (정렬 방식).',
        steps_catalog: [
          { id: 'fast_io', label: '빠른 입출력 설정' },
          { id: 'read_array', label: 'N개의 수 입력' },
          { id: 'sort', label: 'O(N log N) 정렬' },
          { id: 'output_k', label: 'A[K-1] 출력 (0-indexed)' },
        ],
        correct_order: ['fast_io', 'read_array', 'sort', 'output_k'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'K_is_1_indexed',
          'fast_io_mandatory',
          'quickselect_worst_case_random_pivot',
          'N_equals_K_is_max',
          'K_equals_1_is_min',
          'duplicate_values',
        ],
        required_answers: ['K_is_1_indexed', 'fast_io_mandatory'],
        recommended_answers: ['quickselect_worst_case_random_pivot', 'duplicate_values'],
        optional_answers: ['N_equals_K_is_max', 'K_equals_1_is_min'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(NlogN)', 'O(N)', 'O(N^2)', 'O(NK)'],
          accepted_answers: ['O(NlogN)', 'O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(1)', 'O(K)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'sort_dominates_NlogN',
            'quickselect_average_O_N',
            'input_array_stored',
            'heap_is_O_NlogK',
            'brute_force_is_O_NK',
          ],
          accepted_answers: ['sort_dominates_NlogN', 'quickselect_average_O_N', 'input_array_stored'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'sort_index',
        label: '정렬 후 A[K-1] 출력',
        pattern_analysis_answer: 'sort_and_index',
        required_strategy_tags: ['sort_then_index_K'],
      },
      {
        strategy_id: 'quick_select',
        label: '퀵 셀렉트로 평균 O(N)에 K번째 찾기',
        pattern_analysis_answer: 'quick_select',
        required_strategy_tags: ['quick_select_partition', 'random_pivot_for_worst_case'],
      },
    ],

    common_mistakes: [
      {
        tag: 'wrong_index',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'K_is_1_indexed' },
        ],
        feedback:
          'K는 1-indexed입니다. 정렬 후 A[K-1](0-indexed)을 출력해야 합니다. A[K]를 출력하면 한 칸 밀려 오답입니다.',
      },
      {
        tag: 'quickselect_deterministic',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'quickselect_worst_case_random_pivot' },
        ],
        feedback:
          '퀵 셀렉트에서 피벗을 항상 첫 원소로 잡으면 정렬된 입력에서 O(N²)가 됩니다. 랜덤 피벗을 사용하여 최악의 경우를 방지하세요.',
      },
    ],

    review_notes: {
      core_takeaway: '정렬 후 K번째 인덱싱이 가장 안전. 퀵 셀렉트는 평균 O(N)이지만 구현 복잡도와 최악 방지가 필요.',
      mentor_hint: '면접에서 "정렬 없이 K번째를 찾을 수 있나요?"라고 물으면 퀵 셀렉트를 설명하라. 파티션 결과에 따라 한 쪽만 재귀하는 것이 핵심.',
      pattern_trigger: '"N개 중 K번째로 작은/큰 수"가 보이면 → 정렬 또는 퀵 셀렉트를 떠올려라.',
      why_it_works: '정렬하면 K번째는 A[K-1]로 즉시 얻는다. 퀵 셀렉트는 파티션 후 피벗 위치가 K-1이면 바로 답, 아니면 한 쪽만 탐색하여 평균 O(N)에 찾는다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11399 — ATM
  // ──────────────────────────────────────────────────────
  {
    id: 'b011399-boj',
    title: 'ATM',
    difficulty: 'easy',
    domain: 'greedy_sorting',
    summary: 'ATM 대기 시간 최소화: 짧은 작업 우선(SJF) 그리디로 누적합의 합을 최소화',
    tags: ['sorting', 'greedy', 'prefix-sum'],
    input_type: 'integer_array',
    output_type: 'minimum_value',
    constraints: {
      minimize_total_waiting_time: true,
      SJF_principle: true,
      input_size_hint: '1 <= N <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_value', 'count', 'sorted_array', 'boolean_existence', 'single_value'],
          accepted_answers: ['minimum_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'processing_times_array',
            'order_determines_total_cost',
            'minimize_sum_of_waiting',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['processing_times_array', 'order_determines_total_cost', 'minimize_sum_of_waiting'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimize_total_waiting_by_shortest_job_first',
            'sort_ascending_and_sum_prefix_sums',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['greedy_SJF', 'dp_bottom_up', 'brute_force_permutation', 'binary_search', 'bfs', 'two_pointer'],
          accepted_answers: ['greedy_SJF'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'shorter_job_first_minimizes_total',
            'locally_optimal_is_globally_optimal',
            'each_job_affects_all_subsequent',
            'permutation_search_is_N_factorial',
            'need_shortest_path',
          ],
          accepted_answers: ['shorter_job_first_minimizes_total', 'locally_optimal_is_globally_optimal', 'each_job_affects_all_subsequent'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['sorting_preprocessing', 'prefix_sum', 'weighted_sum_formula', 'memoization', 'sliding_window'],
          accepted_answers: ['sorting_preprocessing', 'prefix_sum', 'weighted_sum_formula'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['sorted_array', 'prefix_sum_array', 'heap', 'map', 'dp_array'],
          accepted_answers: ['sorted_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_ascending',
            'sum_of_prefix_sums',
            'weighted_sum_P_i_times_N_minus_i',
            'try_all_permutations',
            'sort_descending',
          ],
          accepted_answers: ['sort_ascending', 'sum_of_prefix_sums'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_array', label: 'N개의 처리 시간 입력' },
          { id: 'sort_asc', label: '오름차순 정렬' },
          { id: 'compute_prefix', label: '누적합 계산: prefix[i] = P[1]+...+P[i]' },
          { id: 'sum_prefixes', label: '모든 prefix[i]의 합 계산' },
          { id: 'output', label: '합 출력' },
        ],
        correct_order: ['read_array', 'sort_asc', 'compute_prefix', 'sum_prefixes', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'ascending_not_descending',
          'SJF_principle',
          'weighted_sum_alternative',
          'N_equals_1_answer_is_P1',
          'all_same_times',
          'descending_is_worst',
        ],
        required_answers: ['ascending_not_descending', 'SJF_principle'],
        recommended_answers: ['weighted_sum_alternative', 'descending_is_worst'],
        optional_answers: ['N_equals_1_answer_is_P1', 'all_same_times'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(NlogN)', 'O(N)', 'O(N^2)', 'O(N!)'],
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
            'sorting_dominates',
            'prefix_sum_is_O_N',
            'input_array_stored',
            'permutation_is_O_N_factorial',
            'constant_variables_only',
          ],
          accepted_answers: ['sorting_dominates', 'prefix_sum_is_O_N', 'input_array_stored'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'sjf_sort',
        label: '오름차순 정렬 + 누적합의 합',
        pattern_analysis_answer: 'greedy_SJF',
        required_strategy_tags: ['sort_ascending', 'sum_of_prefix_sums'],
      },
    ],

    common_mistakes: [
      {
        tag: 'descending_sort',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'ascending_not_descending' },
        ],
        feedback:
          '내림차순으로 정렬하면 긴 작업이 앞에 와서 뒤 사람들의 대기 시간이 최대화됩니다. 오름차순(짧은 작업 우선)이 정답입니다.',
      },
      {
        tag: 'no_sort',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'sort_ascending' },
        ],
        feedback:
          '정렬 없이 입력 순서 그대로 합산하면 최솟값이 아닙니다. 예: [3, 1, 4]를 그대로 처리하면 3+4+8=15이지만 [1, 3, 4]로 정렬하면 1+4+8=13입니다.',
      },
    ],

    review_notes: {
      core_takeaway: '대기 시간 합 최소화 = SJF(짧은 작업 우선). 오름차순 정렬 후 누적합의 합.',
      mentor_hint: 'P[i]가 총 (N-i)명에게 영향을 미치므로 답 = Σ P[i]×(N-i)로도 계산 가능. 이 가중 합 공식을 유도할 수 있어야 한다.',
      pattern_trigger: '"작업 순서를 정해 전체 대기 시간을 최소화"가 보이면 → SJF 그리디(짧은 작업 우선 정렬)를 떠올려라.',
      why_it_works: 'i번째 사람의 대기 시간은 P[1]+...+P[i]이다. P[i]는 i번째부터 N번째까지 (N-i+1)명의 대기 시간에 포함되므로, P[i]가 작을수록 뒤에 미치는 영향이 적다. 따라서 짧은 작업을 앞에 배치하면 총합이 최소화된다.',
    },
  },
];
