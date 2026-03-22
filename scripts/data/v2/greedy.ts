import type { ProblemV2 } from '../types';

export const GREEDY_V2: ProblemV2[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1931 — 회의실 배정
  // ──────────────────────────────────────────────────────
  {
    id: 'b001931-boj',
    title: '회의실 배정',
    difficulty: 'easy',
    domain: 'interval_scheduling',
    summary: '겹치지 않는 회의를 최대한 많이 선택하는 활동 선택 문제',
    tags: ['greedy', 'sorting', 'interval', 'activity-selection'],
    input_type: 'interval_list',
    output_type: 'count',
    constraints: {
      non_overlapping_required: true,
      simultaneous_end_start_allowed: true,
      input_size_hint: 'N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_cost', 'indices', 'boolean_existence', 'maximum_sum'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'interval_pairs',
            'sorted_data',
            'graph_like_relation',
            'single_array',
            'can_overlap',
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
            'bfs',
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
            'need_connected_components',
            'need_ordering',
          ],
          accepted_answers: ['need_maximize_count', 'locally_optimal_gives_global_optimal'],
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
          { id: 'sort_by_end_time_asc', label: '끝나는 시간 기준 오름차순 정렬 (같으면 시작 시간 오름차순)' },
          { id: 'initialize_count_and_last_end', label: 'count = 0, lastEnd = 0 초기화' },
          { id: 'iterate_all_meetings', label: '모든 회의를 순회' },
          { id: 'check_start_ge_last_end', label: '현재 회의의 시작 시간 >= lastEnd인지 확인' },
          { id: 'select_meeting_and_update', label: '조건 만족 시 count++ 하고 lastEnd를 현재 회의 끝 시간으로 갱신' },
          { id: 'return_count', label: 'count 출력' },
        ],
        correct_order: [
          'sort_by_end_time_asc',
          'initialize_count_and_last_end',
          'iterate_all_meetings',
          'check_start_ge_last_end',
          'select_meeting_and_update',
          'return_count',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'same_end_time_sort_by_start',
          'start_equals_end_zero_length',
          'start_equals_prev_end_allowed',
          'integer_overflow_large_time',
          'empty_input',
          'single_meeting',
        ],
        required_answers: [
          'same_end_time_sort_by_start',
          'start_equals_end_zero_length',
          'start_equals_prev_end_allowed',
        ],
        recommended_answers: ['integer_overflow_large_time'],
        optional_answers: ['single_meeting', 'empty_input'],
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
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'sort_by_start_time' },
        ],
        feedback:
          '시작 시간 기준 정렬은 (1, 100)처럼 긴 회의가 먼저 선택되어 최적이 아닙니다. "끝나는 시간이 빠른 회의를 먼저 선택하면 남은 시간이 최대화된다"는 것이 이 패턴의 핵심입니다. 시작 시간이 아니라 종료 시간이 다음 선택지의 수를 결정합니다.',
      },
      {
        tag: 'sort_by_duration',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'sort_by_duration' },
        ],
        feedback:
          '회의 길이가 짧다고 최적은 아닙니다. 반례: (1,3), (2,5), (4,6)에서 길이 기준은 (1,3)→(4,6)=2개지만, 끝나는 시간 기준도 동일합니다. 진짜 문제는 (1,4), (2,3), (3,5) 같은 경우인데, 짧은 (2,3)을 먼저 선택하면 (1,4)와 겹쳐 최적이 아닐 수 있습니다.',
      },
      {
        tag: 'wrong_time_complexity',
        conditions: [
          { step: 'complexity', field: 'time', operator: 'equals', value: 'O(N)' },
        ],
        feedback:
          '정렬이 필요하므로 O(N log N)이 하한입니다. 순회만 O(N)이지만 정렬이 시간복잡도를 지배합니다. 면접에서 "정렬 O(N log N) + 순회 O(N) = O(N log N)"이라고 설명하면 정확합니다.',
      },
      {
        tag: 'miss_secondary_sort',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'same_end_time_sort_by_start' },
        ],
        feedback:
          '끝나는 시간이 같은 회의가 여러 개 있을 때 시작 시간으로 2차 정렬하지 않으면 길이 0인 회의(시작=끝)를 놓칠 수 있습니다. 예: (1,2), (2,2)에서 (2,2)도 선택 가능해야 합니다.',
      },
      {
        tag: 'dp_overkill',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dp_interval' },
        ],
        feedback:
          '가중 구간 스케줄링이라면 DP가 필요하지만, 이 문제는 모든 회의의 가치가 동일(1)합니다. 가치가 균등할 때는 그리디가 DP보다 단순하고 효율적입니다. DP는 O(N log N)으로 같지만 구현이 복잡합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '활동 선택 문제에서는 끝나는 시간이 빠른 순으로 정렬 후 탐욕 선택하면 최대 개수를 보장한다.',
      mentor_hint: '끝나는 시간이 같을 때 시작 시간으로 2차 정렬하는 것을 잊지 말 것. 시작=끝인 길이 0 회의가 함정.',
      pattern_trigger: '"겹치지 않는 구간을 최대한 많이 선택"이라는 조건이 보이면 → 끝나는 시간 기준 그리디를 떠올려라.',
      why_it_works: '가장 빨리 끝나는 회의를 선택하면 남은 시간 구간이 최대화되어, 이후 선택 가능한 회의 수가 절대 줄어들지 않는다. 이것이 Exchange Argument로 증명되는 그리디 정당성의 핵심이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1541 — 잃어버린 괄호
  // ──────────────────────────────────────────────────────
  {
    id: 'b001541-boj',
    title: '잃어버린 괄호',
    difficulty: 'easy',
    domain: 'string_greedy',
    summary: '괄호를 적절히 쳐서 식의 값을 최소로 만드는 문제',
    tags: ['greedy', 'string', 'math', 'parsing'],
    input_type: 'string_expression',
    output_type: 'value',
    constraints: {
      expression_length_max: true,
      operators_plus_minus_only: true,
      input_size_hint: '식의 길이 <= 50',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_value', 'maximum_value', 'count', 'boolean_existence', 'indices'],
          accepted_answers: ['minimum_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'string_expression',
            'only_plus_minus_operators',
            'parentheses_can_be_added',
            'single_array',
            'graph_like_relation',
          ],
          accepted_answers: ['string_expression', 'only_plus_minus_operators', 'parentheses_can_be_added'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimize_expression_by_adding_parentheses',
            'group_additions_after_minus_to_minimize',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['brute_force', 'greedy_grouping', 'dp', 'stack_based', 'two_pointers', 'dfs'],
          accepted_answers: ['greedy_grouping'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'first_minus_makes_all_after_subtractable',
            'grouping_plus_after_minus_is_always_optimal',
            'need_dp_for_optimal_substructure',
            'need_stack_for_nested_structure',
            'need_shortest_path',
          ],
          accepted_answers: ['first_minus_makes_all_after_subtractable', 'grouping_plus_after_minus_is_always_optimal'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['string_split', 'accumulation', 'sorting', 'graph_traversal', 'counting'],
          accepted_answers: ['string_split', 'accumulation'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'set', 'map', 'stack', 'queue', 'dp_array'],
          accepted_answers: ['array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'split_by_minus',
            'sum_each_group',
            'add_first_group_subtract_rest',
            'try_all_parentheses',
            'stack_based_evaluation',
          ],
          accepted_answers: ['split_by_minus', 'sum_each_group', 'add_first_group_subtract_rest'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'split_expression_by_minus', label: '식을 "-" 기준으로 분리하여 그룹 배열 생성' },
          { id: 'split_each_group_by_plus', label: '각 그룹을 "+" 기준으로 분리' },
          { id: 'sum_numbers_in_each_group', label: '각 그룹 내 숫자들의 합 계산' },
          { id: 'add_first_group_to_result', label: '첫 번째 그룹의 합을 결과에 더하기' },
          { id: 'subtract_remaining_groups', label: '나머지 그룹들의 합을 결과에서 빼기' },
          { id: 'output_result', label: '최종 결과 출력' },
        ],
        correct_order: [
          'split_expression_by_minus',
          'split_each_group_by_plus',
          'sum_numbers_in_each_group',
          'add_first_group_to_result',
          'subtract_remaining_groups',
          'output_result',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'no_minus_in_expression',
          'leading_zeros_in_numbers',
          'only_one_number',
          'minus_at_start',
          'all_additions_only',
          'overflow_possible',
        ],
        required_answers: ['no_minus_in_expression', 'leading_zeros_in_numbers'],
        recommended_answers: ['all_additions_only'],
        optional_answers: ['only_one_number'],
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
            'single_pass_parsing',
            'split_creates_token_array',
            'no_nested_loops',
            'recursive_calls',
            'store_all_elements',
          ],
          accepted_answers: ['single_pass_parsing', 'split_creates_token_array', 'no_nested_loops'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_minus_split',
        label: '마이너스 기준 분리 그리디',
        pattern_analysis_answer: 'greedy_grouping',
        required_strategy_tags: ['split_by_minus', 'sum_each_group', 'add_first_group_subtract_rest'],
      },
    ],

    common_mistakes: [
      {
        tag: 'try_all_parentheses',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'try_all_parentheses' },
        ],
        feedback:
          '모든 괄호 조합을 시도할 필요 없습니다. 핵심 관찰: 첫 번째 마이너스 이후 나오는 모든 수를 빼면 항상 최솟값입니다. 마이너스 뒤의 "+"는 괄호로 묶으면 전부 "-"로 전환되기 때문입니다.',
      },
      {
        tag: 'stack_based_wrong',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'stack_based_evaluation' },
        ],
        feedback:
          '스택은 괄호가 중첩된 일반 수식 평가에 필요합니다. 이 문제는 +와 -만 있고 괄호를 직접 치는 문제이므로, 문자열 split만으로 충분합니다. 스택은 오버엔지니어링입니다.',
      },
      {
        tag: 'miss_no_minus_case',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'no_minus_in_expression' },
        ],
        feedback:
          '식에 마이너스가 하나도 없는 경우를 놓치면 안 됩니다. "55+30+40"처럼 전부 덧셈인 식에서는 괄호를 어디에 쳐도 값이 바뀌지 않으므로 전부 더해야 합니다. 코드에서 split("-")의 결과가 1개일 때를 처리해야 합니다.',
      },
      {
        tag: 'wrong_pattern_dp',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dp' },
        ],
        feedback:
          'DP를 생각할 수도 있지만, 이 문제는 "첫 - 이후 모든 수를 빼면 최적"이라는 그리디 관찰 하나로 해결됩니다. 식의 길이가 50 이하이므로 DP도 가능하지만, 그리디가 훨씬 간결하고 면접에서 설명하기 좋습니다.',
      },
    ],

    review_notes: {
      core_takeaway: '마이너스 뒤의 연속 덧셈을 괄호로 묶으면 모두 빼기로 전환 가능하다. 첫 "-" 이후의 모든 수를 빼는 것이 최솟값.',
      mentor_hint: '식에 마이너스가 없는 경우를 놓치지 말 것. split("-")의 결과가 1개일 때 전부 더하는 분기가 필요하다.',
      pattern_trigger: '"수식에 괄호를 적절히 쳐서 값을 최소/최대화"라는 조건이 보이면 → 연산자 기준 그룹핑 그리디를 떠올려라.',
      why_it_works: '-(a+b+c) = -a-b-c이므로, 마이너스 뒤의 덧셈 그룹에 괄호를 치면 그 안의 모든 수가 빼기로 전환된다. 빼는 수가 많을수록 결과가 작아지므로, 첫 마이너스 이후 전부 빼는 것이 최적이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1744 — 수 묶기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001744-boj',
    title: '수 묶기',
    difficulty: 'medium',
    domain: 'number_greedy',
    summary: '수열의 수를 적절히 묶어 곱한 뒤 합의 최대를 구하는 문제',
    tags: ['greedy', 'sorting', 'math', 'classification'],
    input_type: 'array',
    output_type: 'maximum_sum',
    constraints: {
      can_bundle_pairs: true,
      negative_numbers_possible: true,
      zero_included: true,
      input_size_hint: 'N <= 50',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['maximum_sum', 'minimum_cost', 'count', 'indices', 'boolean_existence'],
          accepted_answers: ['maximum_sum'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            '1d_array',
            'contains_negative_numbers',
            'contains_zero',
            'can_pair_multiply',
            'sorted_data',
          ],
          accepted_answers: ['1d_array', 'contains_negative_numbers', 'contains_zero', 'can_pair_multiply'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'maximize_sum_by_pairing_and_multiplying',
            'optimal_number_bundling_for_max_sum',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['brute_force', 'greedy_classification', 'dp', 'two_pointers', 'binary_search', 'dfs'],
          accepted_answers: ['greedy_classification'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'classify_positive_negative_zero',
            'locally_optimal_pairing',
            'need_optimal_substructure',
            'need_shortest_path',
            'need_connected_components',
          ],
          accepted_answers: ['classify_positive_negative_zero', 'locally_optimal_pairing'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['sorting_preprocessing', 'accumulation', 'counting', 'graph_traversal', 'single_pass'],
          accepted_answers: ['sorting_preprocessing', 'accumulation'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'set', 'map', 'stack', 'queue', 'priority_queue', 'dp_array'],
          accepted_answers: ['array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'separate_positive_negative_zero',
            'sort_positive_desc_negative_asc',
            'pair_largest_positives',
            'pair_smallest_negatives',
            'one_should_not_be_multiplied',
            'zero_cancels_leftover_negative',
          ],
          accepted_answers: [
            'separate_positive_negative_zero',
            'sort_positive_desc_negative_asc',
            'pair_largest_positives',
            'pair_smallest_negatives',
            'one_should_not_be_multiplied',
            'zero_cancels_leftover_negative',
          ],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'separate_into_positive_negative_zero_one', label: '수를 양수(>1), 음수, 0, 1로 분류' },
          { id: 'sort_positives_descending', label: '양수 리스트를 내림차순 정렬' },
          { id: 'sort_negatives_ascending', label: '음수 리스트를 오름차순(절댓값 큰 순) 정렬' },
          { id: 'pair_and_multiply_positives', label: '양수를 두 개씩 묶어 곱하고, 홀수 개면 마지막은 그냥 더하기' },
          { id: 'pair_and_multiply_negatives', label: '음수를 두 개씩 묶어 곱하기 (음수*음수=양수)' },
          { id: 'handle_leftover_negative_with_zero', label: '음수가 홀수 개 남으면 0이 있으면 버리고, 없으면 그냥 더하기' },
          { id: 'add_all_ones', label: '1은 곱하지 않고 개수만큼 더하기' },
          { id: 'sum_all_results', label: '모든 결과를 합산하여 출력' },
        ],
        correct_order: [
          'separate_into_positive_negative_zero_one',
          'sort_positives_descending',
          'sort_negatives_ascending',
          'pair_and_multiply_positives',
          'pair_and_multiply_negatives',
          'handle_leftover_negative_with_zero',
          'add_all_ones',
          'sum_all_results',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'one_should_add_not_multiply',
          'odd_negatives_use_zero',
          'no_zero_odd_negatives_just_add',
          'single_element_no_pair',
          'all_zeros',
          'all_ones',
          'overflow_possible',
        ],
        required_answers: [
          'one_should_add_not_multiply',
          'odd_negatives_use_zero',
          'no_zero_odd_negatives_just_add',
        ],
        recommended_answers: ['single_element_no_pair'],
        optional_answers: ['all_zeros', 'all_ones'],
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
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'sorting_dominates',
            'separate_lists_stored',
            'constant_extra_space',
            'recursive_calls',
            'single_pass_after_sort',
          ],
          accepted_answers: ['sorting_dominates', 'separate_lists_stored'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_classify_pair',
        label: '양수/음수/0 분류 후 쌍 묶기',
        pattern_analysis_answer: 'greedy_classification',
        required_strategy_tags: [
          'separate_positive_negative_zero',
          'sort_positive_desc_negative_asc',
          'pair_largest_positives',
          'pair_smallest_negatives',
          'one_should_not_be_multiplied',
        ],
      },
    ],

    common_mistakes: [
      {
        tag: 'multiply_one',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'one_should_add_not_multiply' },
        ],
        feedback:
          '1은 곱하면 손해입니다. 1*5=5이지만 1+5=6입니다. 1보다 큰 양수 x에 대해 항상 1+x > 1*x이므로, 1은 반드시 따로 더해야 합니다. 이것이 가장 흔한 실수입니다.',
      },
      {
        tag: 'mix_positive_negative',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force' },
        ],
        feedback:
          '양수와 음수를 분류해서 같은 부호끼리 묶으면 O(N log N)에 최적해를 구할 수 있습니다. 양수끼리 곱하면 큰 양수, 음수끼리 곱하면 양수가 되어 이득이지만, 양수*음수는 음수가 되어 손해입니다.',
      },
      {
        tag: 'forget_zero_negative_cancel',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'odd_negatives_use_zero' },
        ],
        feedback:
          '음수가 홀수 개 남았을 때 0이 있으면 마지막 음수와 0을 묶어서 0으로 만들 수 있습니다. 이걸 놓치면 불필요한 음수가 합에 포함됩니다. 예: [-5, 0]에서 -5*0=0 > -5.',
      },
      {
        tag: 'wrong_sort_direction',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'sort_positive_desc_negative_asc' },
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'pair_largest_positives' },
        ],
        feedback:
          '양수는 큰 것끼리(내림차순), 음수는 절댓값 큰 것끼리(오름차순) 묶어야 합니다. 정렬 방향이 올바르지 않으면 5*3=15 대신 5*2=10을 택하는 식으로 최적이 아닌 결과가 나옵니다.',
      },
    ],

    review_notes: {
      core_takeaway: '양수끼리, 음수끼리 묶되 1은 더하고 남는 음수는 0으로 상쇄. 부호별 분류가 핵심 전략이다.',
      mentor_hint: '1을 곱하지 않는 것과 남는 음수 처리가 핵심. 면접에서 "왜 1은 따로?"라는 질문이 자주 나온다.',
      pattern_trigger: '"수를 둘씩 묶어 곱할 수 있고 합을 최대화"라는 조건이 보이면 → 부호별 분류 + 정렬 그리디를 떠올려라.',
      why_it_works: '같은 부호끼리 곱하면 항상 양수(이득)가 되고, 큰 것끼리 곱할수록 곱이 커진다. 1은 곱해봤자 값이 그대로이므로 더하는 게 이득. 이 세 가지 로컬 최적 선택이 글로벌 최적을 보장한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1715 — 카드 정렬하기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001715-boj',
    title: '카드 정렬하기',
    difficulty: 'medium',
    domain: 'merge_greedy',
    summary: 'N개의 카드 묶음을 합칠 때 최소 비교 횟수를 구하는 문제',
    tags: ['greedy', 'priority-queue', 'huffman-coding'],
    input_type: 'array',
    output_type: 'minimum_cost',
    constraints: {
      must_merge_all: true,
      merge_cost_is_sum: true,
      input_size_hint: 'N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_cost', 'maximum_sum', 'count', 'indices', 'boolean_existence'],
          accepted_answers: ['minimum_cost'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            '1d_array',
            'merge_pairwise',
            'cost_depends_on_merge_order',
            'sorted_data',
            'graph_like_relation',
          ],
          accepted_answers: ['1d_array', 'merge_pairwise', 'cost_depends_on_merge_order'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimize_total_merge_cost',
            'optimal_merge_order_huffman',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: [
            'brute_force',
            'greedy_min_heap',
            'dp',
            'two_pointers',
            'binary_search',
            'sorting_only',
          ],
          accepted_answers: ['greedy_min_heap'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'smallest_first_minimizes_repeated_addition',
            'merged_result_reenters_candidates',
            'need_optimal_substructure',
            'need_connected_components',
            'need_shortest_path',
          ],
          accepted_answers: ['smallest_first_minimizes_repeated_addition', 'merged_result_reenters_candidates'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['priority_queue_usage', 'huffman_like', 'accumulation', 'sorting', 'graph_traversal'],
          accepted_answers: ['priority_queue_usage', 'huffman_like'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'set', 'map', 'stack', 'queue', 'priority_queue', 'dp_array'],
          accepted_answers: ['priority_queue'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'insert_all_to_min_heap',
            'extract_two_smallest',
            'merge_and_reinsert',
            'accumulate_cost',
            'sort_and_merge_sequentially',
          ],
          accepted_answers: ['insert_all_to_min_heap', 'extract_two_smallest', 'merge_and_reinsert', 'accumulate_cost'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'insert_all_into_min_heap', label: '모든 카드 묶음을 최소 힙에 삽입' },
          { id: 'while_heap_size_gt_1', label: '힙 크기가 1보다 큰 동안 반복' },
          { id: 'extract_two_smallest', label: '힙에서 가장 작은 두 묶음 추출' },
          { id: 'compute_merge_cost', label: '두 묶음의 합(합치는 비용) 계산' },
          { id: 'add_cost_to_total', label: '비용을 총 비교 횟수에 누적' },
          { id: 'insert_merged_back', label: '합친 묶음을 다시 힙에 삽입' },
          { id: 'return_total_cost', label: '총 비교 횟수 출력' },
        ],
        correct_order: [
          'insert_all_into_min_heap',
          'while_heap_size_gt_1',
          'extract_two_smallest',
          'compute_merge_cost',
          'add_cost_to_total',
          'insert_merged_back',
          'return_total_cost',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'single_bundle_no_merge',
          'merged_result_must_reenter_heap',
          'total_cost_overflow_use_long',
          'empty_input',
          'all_same_size_bundles',
          'two_bundles_only',
        ],
        required_answers: ['single_bundle_no_merge', 'merged_result_must_reenter_heap'],
        recommended_answers: ['total_cost_overflow_use_long'],
        optional_answers: ['all_same_size_bundles', 'two_bundles_only'],
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
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'heap_operations_logN_each',
            'N_minus_1_merges',
            'heap_stores_N_elements',
            'constant_extra_space',
            'recursive_calls',
          ],
          accepted_answers: ['heap_operations_logN_each', 'N_minus_1_merges', 'heap_stores_N_elements'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_min_heap',
        label: '최소 힙으로 가장 작은 두 묶음 합치기',
        pattern_analysis_answer: 'greedy_min_heap',
        required_strategy_tags: ['insert_all_to_min_heap', 'extract_two_smallest', 'merge_and_reinsert', 'accumulate_cost'],
      },
    ],

    common_mistakes: [
      {
        tag: 'sort_merge_sequential',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'sort_and_merge_sequentially' },
        ],
        feedback:
          '정렬 후 순서대로 합치면 합친 결과가 후보에 다시 포함되지 않습니다. 예: [1,2,3,4]에서 순서대로 하면 1+2=3(비용3), 3+3=6(비용6), 6+4=10(비용10) → 총 19. 하지만 [1,2,100,200]에서는 1+2=3(비용3), 3+100=103(비용103), 103+200=303(비용303) → 총 409. 최소 힙 방식이면 1+2=3, 3+100=103, 103+200=303 → 동일하지만, [5,10,20,30]에서 차이가 납니다. 합친 결과가 다음 후보가 되어야 하므로 우선순위 큐가 필수입니다.',
      },
      {
        tag: 'forget_reinsert',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'merged_result_must_reenter_heap' },
        ],
        feedback:
          '합친 결과를 힙에 다시 넣지 않으면 이후 합치기에서 최솟값을 올바르게 선택할 수 없습니다. 이것이 단순 정렬과 우선순위 큐 접근의 핵심 차이입니다.',
      },
      {
        tag: 'miss_single_bundle',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'single_bundle_no_merge' },
        ],
        feedback:
          'N=1일 때는 합칠 묶음이 하나뿐이므로 비교가 필요 없습니다. 답은 0입니다. 이를 처리하지 않으면 힙에서 두 개를 꺼내려다 에러가 발생합니다.',
      },
      {
        tag: 'wrong_pattern_sorting_only',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'sorting_only' },
        ],
        feedback:
          '단순 정렬만으로는 부족합니다. 정렬은 초기 순서만 결정하지만, 합친 결과가 새로운 후보가 되므로 동적으로 최솟값을 관리할 수 있는 우선순위 큐가 필요합니다. 이것이 허프만 코딩과 동일한 구조인 이유입니다.',
      },
      {
        tag: 'wrong_ds_array',
        conditions: [
          { step: 'strategy_design', field: 'data_structures', operator: 'includes', value: 'array' },
          { step: 'strategy_design', field: 'data_structures', operator: 'not_includes', value: 'priority_queue' },
        ],
        feedback:
          '배열만 사용하면 매번 최솟값 두 개를 찾는 데 O(N)이 걸려 전체 O(N^2)가 됩니다. 최소 힙을 사용하면 추출과 삽입이 O(log N)이므로 전체 O(N log N)으로 효율적입니다.',
      },
    ],

    review_notes: {
      core_takeaway: '매번 가장 작은 두 묶음을 합치는 것이 최적이다. 합친 결과를 다시 후보에 넣어야 하므로 최소 힙이 핵심 자료구조.',
      mentor_hint: '합친 결과를 힙에 다시 넣는 것을 잊지 말 것. N=1일 때 0을 출력하는 예외 처리도 중요하다.',
      pattern_trigger: '"여러 개를 순차적으로 합치는데 합치는 비용이 크기에 비례"하는 조건이 보이면 → 최소 힙 그리디(허프만 코딩)를 떠올려라.',
      why_it_works: '먼저 합친 묶음이 이후 단계에서 반복적으로 비용에 포함되므로, 작은 것을 먼저 합치면 큰 값이 더해지는 횟수가 줄어든다. 이는 허프만 코딩에서 빈도가 낮은 문자에 긴 코드를 부여하는 것과 동일한 원리다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11047 — 동전 0
  // ──────────────────────────────────────────────────────
  {
    id: 'b011047-boj',
    title: '동전 0',
    difficulty: 'easy',
    domain: 'coin_greedy',
    summary: '배수 관계 동전으로 금액을 만드는 최소 동전 수 문제',
    tags: ['greedy', 'math', 'coin-change'],
    input_type: 'array_and_target',
    output_type: 'count',
    constraints: {
      coins_are_multiples: true,
      unlimited_coins: true,
      input_size_hint: 'N <= 10, K <= 100000000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_cost', 'boolean_existence', 'indices', 'all_combinations'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'coin_denominations',
            'coins_are_multiples_of_previous',
            'target_value_given',
            'sorted_ascending',
            'graph_like_relation',
          ],
          accepted_answers: ['coin_denominations', 'coins_are_multiples_of_previous', 'target_value_given', 'sorted_ascending'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimum_coins_for_target_with_multiples',
            'greedy_coin_change_with_divisibility',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['brute_force', 'greedy_largest_first', 'dp_coin_change', 'binary_search', 'dfs', 'bfs'],
          accepted_answers: ['greedy_largest_first'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'coins_divisibility_guarantees_greedy',
            'largest_coin_always_optimal',
            'need_dp_for_general_coins',
            'need_shortest_path',
            'need_connected_components',
          ],
          accepted_answers: ['coins_divisibility_guarantees_greedy', 'largest_coin_always_optimal'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['division_and_modulo', 'reverse_iteration', 'counting', 'sorting', 'graph_traversal'],
          accepted_answers: ['division_and_modulo', 'reverse_iteration'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['array', 'set', 'map', 'stack', 'queue', 'dp_array'],
          accepted_answers: ['array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'iterate_coins_largest_first',
            'use_division_for_count',
            'update_remainder_with_modulo',
            'dp_bottom_up',
            'try_all_combinations',
          ],
          accepted_answers: ['iterate_coins_largest_first', 'use_division_for_count', 'update_remainder_with_modulo'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_coins_and_target', label: '동전 종류 배열과 목표 금액 K 입력' },
          { id: 'iterate_from_largest_coin', label: '가장 큰 동전부터 역순으로 순회' },
          { id: 'check_coin_le_remaining', label: '현재 동전이 남은 금액 이하인지 확인' },
          { id: 'add_remaining_div_coin_to_count', label: '남은 금액 / 동전 값 = 사용 개수를 count에 누적' },
          { id: 'update_remaining_with_modulo', label: '남은 금액 = 남은 금액 % 동전 값으로 갱신' },
          { id: 'output_count', label: '총 동전 개수 출력' },
        ],
        correct_order: [
          'read_coins_and_target',
          'iterate_from_largest_coin',
          'check_coin_le_remaining',
          'add_remaining_div_coin_to_count',
          'update_remaining_with_modulo',
          'output_count',
        ],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'greedy_only_valid_with_multiples',
          'coin_larger_than_K_skip',
          'K_equals_zero',
          'single_coin_type',
          'largest_coin_equals_K',
          'overflow_possible',
        ],
        required_answers: ['greedy_only_valid_with_multiples', 'coin_larger_than_K_skip'],
        recommended_answers: ['K_equals_zero'],
        optional_answers: ['single_coin_type', 'largest_coin_equals_K'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(NlogN)', 'O(N*K)'],
          accepted_answers: ['O(N)'],
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
            'single_pass_through_coins',
            'only_count_and_remainder_variables',
            'no_extra_storage_needed',
            'dp_table_size_K',
            'recursive_calls',
          ],
          accepted_answers: ['single_pass_through_coins', 'only_count_and_remainder_variables', 'no_extra_storage_needed'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'greedy_largest_first',
        label: '큰 동전부터 그리디 선택',
        pattern_analysis_answer: 'greedy_largest_first',
        required_strategy_tags: ['iterate_coins_largest_first', 'use_division_for_count', 'update_remainder_with_modulo'],
      },
    ],

    common_mistakes: [
      {
        tag: 'dp_overkill',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dp_coin_change' },
        ],
        feedback:
          '동전이 배수 관계이므로 DP가 필요 없습니다. K가 1억까지 가능하므로 DP는 O(N*K)로 시간/메모리 초과입니다. 배수 조건 덕분에 그리디 O(N)으로 충분합니다. 면접에서 "왜 DP가 아닌가?"라는 질문에 배수 조건을 근거로 설명하세요.',
      },
      {
        tag: 'greedy_without_multiples_awareness',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'greedy_only_valid_with_multiples' },
        ],
        feedback:
          '이 문제에서 그리디가 성립하는 핵심 이유는 동전이 배수 관계이기 때문입니다. 일반 동전 문제(예: 1, 3, 4원)에서는 그리디가 최적이 아닙니다. 6원을 만들 때 그리디는 4+1+1=3개이지만 최적은 3+3=2개입니다. 이 구분을 반드시 인지해야 합니다.',
      },
      {
        tag: 'forget_skip_large_coin',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'coin_larger_than_K_skip' },
        ],
        feedback:
          '동전 값이 남은 금액보다 클 수 있습니다. 예: K=3700이고 동전이 [1,5,10,50,100,500,1000,5000,10000,50000]이면 5000원 이상은 건너뛰어야 합니다. coin <= remaining 체크를 잊으면 음수 나머지가 발생합니다.',
      },
      {
        tag: 'try_all_combinations',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'try_all_combinations' },
        ],
        feedback:
          '모든 조합을 시도하면 지수 시간이 걸립니다. 동전이 배수 관계라는 제약 조건을 활용하면 큰 동전부터 나누기만 하면 됩니다. 항상 문제의 제약 조건을 먼저 확인하세요.',
      },
    ],

    review_notes: {
      core_takeaway: '동전이 배수 관계일 때는 큰 동전부터 사용하는 그리디가 최적이다. 일반 동전 문제와 반드시 구분해야 한다.',
      mentor_hint: '면접에서 "배수 조건이 없으면 어떻게 하나?"라는 후속 질문이 높은 확률로 나온다. "DP로 전환해야 합니다"라고 답하면 된다.',
      pattern_trigger: '"동전의 가치가 이전 동전의 배수"라는 조건이 보이면 → 큰 동전부터 그리디. 배수 조건이 없으면 → DP coin change.',
      why_it_works: 'A_i가 A_{i-1}의 배수이므로, 큰 동전 1개는 항상 작은 동전 정확히 k개로 교환 가능하다. 따라서 큰 동전을 안 쓰고 작은 동전으로 대체하면 동전 수만 늘어나며, 큰 동전 우선 사용이 항상 최적이다.',
    },
  },
];
