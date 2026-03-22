import type { ProblemV2 } from '../types';

/**
 * Course-oriented representative algorithm problems for the "data-structures" category.
 * These are NOT BOJ problems — they are original problems designed for algorithmic thinking training.
 * Organized by course_level: beginner → basic → intermediate → advanced.
 */

type CourseProblem = ProblemV2 & { course_level: 'beginner' | 'basic' | 'intermediate' | 'advanced' };

export const COURSE_DATA_STRUCTURES: CourseProblem[] = [
  // ──────────────────────────────────────────────────────
  // course-ds-001 — Two Sum (beginner)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-ds-001',
    title: 'Two Sum',
    difficulty: 'easy',
    course_level: 'beginner',
    domain: 'hash_lookup',
    summary: '정수 배열과 target이 주어질 때, 합이 target이 되는 두 수의 인덱스를 반환하는 문제',
    tags: ['hash-map', 'array'],
    input_type: 'integer_array_and_target',
    output_type: 'index_pair',
    constraints: {
      exactly_one_solution: true,
      same_element_twice: false,
      input_size_hint: '2 <= N <= 10^4',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'indices', 'boolean_existence', 'maximum_sum', 'minimum_difference'],
          accepted_answers: ['indices'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'single_target_value',
            'exactly_one_valid_pair',
            'sorted_array',
            'duplicates_possible',
          ],
          accepted_answers: ['integer_array', 'single_target_value', 'exactly_one_valid_pair'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_two_indices_whose_values_sum_to_target',
            'hash_map_complement_lookup',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['hash_map_lookup', 'brute_force', 'two_pointer', 'binary_search', 'sorting', 'sliding_window'],
          accepted_answers: ['hash_map_lookup'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'complement_can_be_precomputed',
            'O1_lookup_needed_for_each_element',
            'index_must_be_preserved',
            'array_is_unsorted',
            'need_shortest_path',
          ],
          accepted_answers: ['complement_can_be_precomputed', 'O1_lookup_needed_for_each_element', 'index_must_be_preserved'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['sort_and_two_pointer', 'brute_force_nested_loop', 'binary_search_complement', 'prefix_sum', 'sliding_window'],
          accepted_answers: ['sort_and_two_pointer', 'brute_force_nested_loop'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['hash_map', 'hash_set', 'sorted_array', 'stack', 'queue'],
          accepted_answers: ['hash_map'],
        },
        map_key_value: {
          type: 'single_select',
          question: 'Hash map의 key와 value는 각각 무엇이어야 하는가?',
          options: [
            'key=값_value=인덱스',
            'key=인덱스_value=값',
            'key=complement_value=인덱스',
            'key=값_value=빈도',
          ],
          accepted_answers: ['key=값_value=인덱스'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_map', label: '빈 hash map 초기화' },
          { id: 'iterate', label: '배열을 순회하며 각 원소 처리' },
          { id: 'calc_complement', label: 'complement = target - nums[i] 계산' },
          { id: 'check_map', label: 'complement가 map에 존재하는지 확인' },
          { id: 'return_indices', label: '존재하면 [map[complement], i] 반환' },
          { id: 'store_in_map', label: '존재하지 않으면 nums[i] → i를 map에 저장' },
        ],
        correct_order: ['init_map', 'iterate', 'calc_complement', 'check_map', 'return_indices', 'store_in_map'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'same_index_cannot_be_used_twice',
          'negative_numbers_in_array',
          'duplicate_values_with_different_indices',
          'target_is_zero',
          'array_length_is_2',
          'very_large_values_overflow',
        ],
        required_answers: ['same_index_cannot_be_used_twice', 'negative_numbers_in_array'],
        recommended_answers: ['duplicate_values_with_different_indices', 'array_length_is_2'],
        optional_answers: ['target_is_zero', 'very_large_values_overflow'],
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
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'single_pass_through_array',
            'hash_map_stores_up_to_N_entries',
            'each_lookup_is_O1',
            'sorting_adds_NlogN',
            'nested_loop_is_N_squared',
          ],
          accepted_answers: ['single_pass_through_array', 'hash_map_stores_up_to_N_entries', 'each_lookup_is_O1'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'hash_map_one_pass',
        label: 'Hash map으로 complement를 한 번의 순회로 탐색',
        pattern_analysis_answer: 'hash_map_lookup',
        required_strategy_tags: ['hash_map'],
      },
    ],

    common_mistakes: [
      {
        tag: 'brute_force_n2',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force' },
        ],
        feedback:
          'O(N^2) 이중 루프는 동작하지만 비효율적입니다. Hash map을 사용하면 complement를 O(1)에 조회하여 O(N)으로 해결할 수 있습니다.',
      },
      {
        tag: 'use_same_index',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'same_index_cannot_be_used_twice' },
        ],
        feedback:
          '같은 원소를 두 번 사용할 수 없습니다. complement를 먼저 확인한 뒤 현재 원소를 map에 저장하면 자연스럽게 자기 자신과의 중복을 방지할 수 있습니다.',
      },
      {
        tag: 'sort_loses_indices',
        conditions: [
          { step: 'strategy_design', field: 'data_structures', operator: 'includes', value: 'sorted_array' },
        ],
        feedback:
          '정렬하면 원래 인덱스가 사라집니다. 인덱스를 반환해야 하므로 정렬 전에 인덱스를 별도로 저장하거나, hash map 방식을 사용해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'Hash map에 값→인덱스를 저장하면 complement 조회가 O(1). 순회하면서 동시에 저장하면 한 번의 패스로 해결 가능.',
      mentor_hint: '"저장 전에 확인"이 핵심이다. complement를 먼저 map에서 찾고, 없으면 현재 값을 저장한다. 이 순서가 자기 자신 중복 사용을 막아준다.',
      pattern_trigger: '"배열에서 합이 target인 두 수 찾기"가 보이면 → hash map complement 패턴을 떠올려라.',
      why_it_works: 'target - x를 key로 조회하면 O(1). 전체 N개 원소를 한 번 순회하므로 O(N). 인덱스를 value로 저장하므로 결과를 바로 반환할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // course-ds-002 — 괄호 유효성 검사 (beginner)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-ds-002',
    title: '괄호 유효성 검사',
    difficulty: 'easy',
    course_level: 'beginner',
    domain: 'bracket_matching',
    summary: '소괄호, 중괄호, 대괄호로 이루어진 문자열이 올바르게 닫히는지 판별하는 문제',
    tags: ['stack', 'string'],
    input_type: 'string',
    output_type: 'boolean',
    constraints: {
      bracket_types: '(), {}, []',
      input_size_hint: '1 <= len <= 10^4',
      only_brackets: true,
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['boolean_validity', 'count', 'maximum_depth', 'indices', 'matched_pairs'],
          accepted_answers: ['boolean_validity'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'string_of_brackets',
            'three_bracket_types',
            'order_matters_for_matching',
            'numeric_array',
            'single_bracket_type',
          ],
          accepted_answers: ['string_of_brackets', 'three_bracket_types', 'order_matters_for_matching'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'check_if_all_brackets_are_properly_matched_and_closed',
            'validate_nested_bracket_pairs_using_stack',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['stack_matching', 'counter_only', 'recursion', 'hash_map', 'two_pointer', 'greedy'],
          accepted_answers: ['stack_matching'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'LIFO_order_matches_nesting',
            'most_recent_open_must_close_first',
            'multiple_bracket_types_need_type_matching',
            'counter_suffices_for_one_type',
            'need_to_check_pairs_across_distance',
          ],
          accepted_answers: ['LIFO_order_matches_nesting', 'most_recent_open_must_close_first', 'multiple_bracket_types_need_type_matching'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['hash_map_for_pair_lookup', 'simple_counter', 'string_replacement', 'recursion', 'regex'],
          accepted_answers: ['hash_map_for_pair_lookup'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['stack', 'hash_map', 'queue', 'array', 'counter_variable'],
          accepted_answers: ['stack', 'hash_map'],
        },
        matching_strategy: {
          type: 'single_select',
          question: '괄호 매칭을 어떻게 처리하는가?',
          options: [
            'open_push_close_pop_and_compare',
            'count_open_close_separately',
            'replace_pairs_until_empty',
            'recursive_parse',
          ],
          accepted_answers: ['open_push_close_pop_and_compare'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_stack', label: '빈 스택 초기화' },
          { id: 'iterate_chars', label: '문자열을 한 문자씩 순회' },
          { id: 'push_open', label: '여는 괄호면 스택에 push' },
          { id: 'check_close', label: '닫는 괄호면 스택이 비었는지 확인' },
          { id: 'pop_and_match', label: '스택에서 pop하여 짝이 맞는지 비교' },
          { id: 'final_check', label: '순회 후 스택이 비어있으면 true 반환' },
        ],
        correct_order: ['init_stack', 'iterate_chars', 'push_open', 'check_close', 'pop_and_match', 'final_check'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'close_without_matching_open',
          'open_remaining_after_traversal',
          'empty_string_is_valid',
          'single_character_string',
          'mixed_types_interleaved',
          'very_deeply_nested',
        ],
        required_answers: ['close_without_matching_open', 'open_remaining_after_traversal'],
        recommended_answers: ['empty_string_is_valid', 'single_character_string'],
        optional_answers: ['mixed_types_interleaved', 'very_deeply_nested'],
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
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'single_pass_through_string',
            'stack_size_up_to_N_in_worst_case',
            'each_push_pop_is_O1',
            'hash_map_is_constant_size',
            'no_extra_space_needed',
          ],
          accepted_answers: ['single_pass_through_string', 'stack_size_up_to_N_in_worst_case', 'each_push_pop_is_O1'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'stack_matching',
        label: '스택에 여는 괄호를 push하고 닫는 괄호에서 pop하여 매칭',
        pattern_analysis_answer: 'stack_matching',
        required_strategy_tags: ['stack', 'hash_map'],
      },
    ],

    common_mistakes: [
      {
        tag: 'counter_only',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'counter_only' },
        ],
        feedback:
          '카운터만으로는 여러 종류의 괄호를 처리할 수 없습니다. "([)]"처럼 개수는 맞지만 순서가 틀린 경우를 놓칩니다. 스택을 사용해야 최근 열린 괄호의 종류를 정확히 확인할 수 있습니다.',
      },
      {
        tag: 'miss_remaining_open',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'open_remaining_after_traversal' },
        ],
        feedback:
          '모든 닫는 괄호가 매칭되더라도 스택에 여는 괄호가 남아있으면 유효하지 않습니다. 순회 후 반드시 스택이 비어있는지 확인해야 합니다.',
      },
      {
        tag: 'miss_empty_stack_pop',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'close_without_matching_open' },
        ],
        feedback:
          '닫는 괄호를 만났을 때 스택이 비어있으면 pop할 수 없습니다. 빈 스택에서 pop 시도를 방지하는 검사가 필요합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '여는 괄호는 push, 닫는 괄호는 pop하여 짝 확인. 순회 후 스택이 비어야 유효.',
      mentor_hint: '괄호 매칭의 핵심은 "가장 최근에 열린 것이 먼저 닫혀야 한다"는 LIFO 성질. 이것이 스택을 선택하는 이유다.',
      pattern_trigger: '"괄호/중첩/매칭 유효성"이 보이면 → 스택을 떠올려라.',
      why_it_works: '스택의 LIFO 특성이 중첩 구조의 안쪽부터 바깥쪽 순서로 닫히는 성질과 정확히 일치한다. 각 문자를 O(1)에 처리하므로 전체 O(N).',
    },
  },

  // ──────────────────────────────────────────────────────
  // course-ds-003 — 아나그램 그룹핑 (basic)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-ds-003',
    title: '아나그램 그룹핑',
    difficulty: 'medium',
    course_level: 'basic',
    domain: 'hash_grouping',
    summary: '문자열 배열이 주어질 때 아나그램끼리 같은 그룹으로 묶어 반환하는 문제',
    tags: ['hash-map', 'sorting', 'string'],
    input_type: 'string_array',
    output_type: 'grouped_string_arrays',
    constraints: {
      lowercase_only: true,
      input_size_hint: '1 <= N <= 10^4, 0 <= len <= 100',
      order_does_not_matter: true,
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['grouped_arrays', 'count', 'boolean_existence', 'single_string', 'sorted_array'],
          accepted_answers: ['grouped_arrays'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'array_of_strings',
            'anagram_means_same_character_frequency',
            'group_by_equivalence',
            'numeric_input',
            'single_string',
          ],
          accepted_answers: ['array_of_strings', 'anagram_means_same_character_frequency', 'group_by_equivalence'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'group_strings_by_anagram_equivalence',
            'use_sorted_form_as_hash_key_for_grouping',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['hash_grouping_by_key', 'sorting_only', 'brute_force_compare', 'trie', 'union_find', 'sliding_window'],
          accepted_answers: ['hash_grouping_by_key'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'anagrams_share_canonical_form',
            'sorted_string_is_unique_key',
            'need_to_group_not_just_check',
            'hash_map_groups_by_key_efficiently',
            'need_to_find_shortest_path',
          ],
          accepted_answers: ['anagrams_share_canonical_form', 'sorted_string_is_unique_key', 'need_to_group_not_just_check', 'hash_map_groups_by_key_efficiently'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['character_count_as_key', 'sorting_each_string', 'pairwise_comparison', 'trie_based_grouping', 'frequency_array'],
          accepted_answers: ['character_count_as_key', 'sorting_each_string'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['hash_map', 'sorted_string', 'trie', 'array', 'set'],
          accepted_answers: ['hash_map', 'sorted_string'],
        },
        key_choice: {
          type: 'single_select',
          question: 'Hash map의 key로 무엇을 사용해야 하는가?',
          options: [
            'sorted_string',
            'character_count_tuple',
            'original_string',
            'string_length',
            'first_character',
          ],
          accepted_answers: ['sorted_string'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_map', label: 'key=정렬된문자열, value=문자열리스트인 hash map 초기화' },
          { id: 'iterate_strings', label: '문자열 배열을 순회' },
          { id: 'sort_string', label: '각 문자열을 정렬하여 canonical key 생성' },
          { id: 'add_to_group', label: '해당 key의 리스트에 원본 문자열 추가' },
          { id: 'collect_values', label: 'map의 모든 value 리스트를 수집하여 반환' },
        ],
        correct_order: ['init_map', 'iterate_strings', 'sort_string', 'add_to_group', 'collect_values'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'empty_string_is_valid_anagram',
          'single_character_strings',
          'all_strings_are_anagrams',
          'no_anagrams_exist',
          'duplicate_strings',
          'very_long_strings',
        ],
        required_answers: ['empty_string_is_valid_anagram', 'duplicate_strings'],
        recommended_answers: ['single_character_strings', 'all_strings_are_anagrams'],
        optional_answers: ['no_anagrams_exist', 'very_long_strings'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는? (N=문자열 수, K=최대 문자열 길이)',
          options: ['O(N * KlogK)', 'O(N^2 * K)', 'O(N * K)', 'O(NlogN)'],
          accepted_answers: ['O(N * KlogK)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N * K)', 'O(N)', 'O(1)', 'O(K)'],
          accepted_answers: ['O(N * K)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_string_sorted_in_KlogK',
            'N_strings_processed',
            'all_strings_stored_in_map',
            'sorting_the_entire_array',
            'constant_space_only',
          ],
          accepted_answers: ['each_string_sorted_in_KlogK', 'N_strings_processed', 'all_strings_stored_in_map'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'sort_key_hash',
        label: '각 문자열을 정렬하여 key로 사용, hash map으로 그룹핑',
        pattern_analysis_answer: 'hash_grouping_by_key',
        required_strategy_tags: ['hash_map', 'sorted_string'],
      },
    ],

    common_mistakes: [
      {
        tag: 'pairwise_compare',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force_compare' },
        ],
        feedback:
          '모든 쌍을 비교하면 O(N^2 * K)입니다. 정렬된 문자열을 key로 사용하면 hash map으로 O(N * KlogK)에 그룹핑할 수 있습니다.',
      },
      {
        tag: 'forget_empty_string',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'empty_string_is_valid_anagram' },
        ],
        feedback:
          '빈 문자열("")도 유효한 입력입니다. 빈 문자열끼리는 서로 아나그램이며, 정렬해도 빈 문자열이므로 같은 그룹에 들어갑니다.',
      },
    ],

    review_notes: {
      core_takeaway: '아나그램은 같은 문자 구성을 가지므로 정렬하면 동일한 문자열이 된다. 이를 hash map의 key로 사용하면 O(N*KlogK)에 그룹핑.',
      mentor_hint: 'key 선택이 핵심이다. 정렬된 문자열 외에도 "각 문자의 빈도를 튜플로 만드는 방법"이 있다 (O(N*K) 가능). 면접에서는 두 방법 모두 설명할 수 있으면 좋다.',
      pattern_trigger: '"같은 속성끼리 그룹핑"이 보이면 → hash map + canonical key 패턴을 떠올려라.',
      why_it_works: '아나그램의 정의상 문자 구성이 동일하므로 정렬하면 같은 문자열이 된다. 이 불변량을 hash key로 쓰면 한 번의 순회로 분류 완료.',
    },
  },

  // ──────────────────────────────────────────────────────
  // course-ds-004 — 슬라이딩 윈도우 최대합 (basic)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-ds-004',
    title: '슬라이딩 윈도우 최대합',
    difficulty: 'medium',
    course_level: 'basic',
    domain: 'sliding_window_sum',
    summary: '정수 배열에서 길이 K인 연속 부분배열의 최대 합을 구하는 문제',
    tags: ['sliding-window', 'array'],
    input_type: 'integer_array_and_k',
    output_type: 'maximum_sum',
    constraints: {
      fixed_window_size: true,
      input_size_hint: '1 <= K <= N <= 10^5',
      negative_values_possible: true,
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['maximum_sum', 'count', 'boolean_existence', 'minimum_length', 'indices'],
          accepted_answers: ['maximum_sum'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'fixed_window_size_K',
            'contiguous_subarray_required',
            'sorted_input',
            'variable_window_size',
          ],
          accepted_answers: ['integer_array', 'fixed_window_size_K', 'contiguous_subarray_required'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_maximum_sum_of_contiguous_subarray_of_length_K',
            'fixed_size_sliding_window_maximum',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['fixed_sliding_window', 'prefix_sum', 'brute_force', 'two_pointer', 'dynamic_programming', 'divide_and_conquer'],
          accepted_answers: ['fixed_sliding_window'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'window_size_is_fixed',
            'consecutive_elements_required',
            'previous_window_can_be_reused',
            'add_right_remove_left_pattern',
            'need_to_sort_first',
          ],
          accepted_answers: ['window_size_is_fixed', 'consecutive_elements_required', 'previous_window_can_be_reused', 'add_right_remove_left_pattern'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['prefix_sum_difference', 'brute_force_recompute', 'kadane_algorithm', 'deque_based_window', 'binary_search'],
          accepted_answers: ['prefix_sum_difference'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['window_sum_variable', 'prefix_sum_array', 'deque', 'heap', 'hash_map'],
          accepted_answers: ['window_sum_variable'],
        },
        window_update: {
          type: 'single_select',
          question: '윈도우를 이동할 때 합을 어떻게 갱신하는가?',
          options: [
            'add_new_right_subtract_old_left',
            'recompute_entire_window',
            'prefix_sum_subtract',
            'divide_and_conquer',
          ],
          accepted_answers: ['add_new_right_subtract_old_left'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_window', label: '처음 K개 원소의 합을 계산하여 window_sum에 저장' },
          { id: 'init_max', label: 'max_sum = window_sum으로 초기화' },
          { id: 'slide', label: 'i = K부터 N-1까지 순회' },
          { id: 'update_sum', label: 'window_sum += arr[i] - arr[i - K]' },
          { id: 'update_max', label: 'max_sum = max(max_sum, window_sum)' },
          { id: 'return_result', label: 'max_sum 반환' },
        ],
        correct_order: ['init_window', 'init_max', 'slide', 'update_sum', 'update_max', 'return_result'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'K_equals_N',
          'all_negative_values',
          'K_equals_1',
          'integer_overflow_for_large_sums',
          'empty_array',
          'single_element_array',
        ],
        required_answers: ['K_equals_N', 'all_negative_values'],
        recommended_answers: ['K_equals_1', 'integer_overflow_for_large_sums'],
        optional_answers: ['empty_array', 'single_element_array'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NK)', 'O(NlogN)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(K)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'single_pass_after_initial_window',
            'only_two_variables_maintained',
            'each_element_added_and_removed_once',
            'prefix_sum_needs_O_N_space',
            'recompute_each_window_is_O_NK',
          ],
          accepted_answers: ['single_pass_after_initial_window', 'only_two_variables_maintained', 'each_element_added_and_removed_once'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'fixed_sliding_window',
        label: '고정 크기 슬라이딩 윈도우로 합을 점진적으로 갱신',
        pattern_analysis_answer: 'fixed_sliding_window',
        required_strategy_tags: ['window_sum_variable'],
      },
    ],

    common_mistakes: [
      {
        tag: 'recompute_each_window',
        conditions: [
          { step: 'strategy_design', field: 'window_update', operator: 'equals', value: 'recompute_entire_window' },
        ],
        feedback:
          '매 윈도우마다 K개를 다시 더하면 O(NK)입니다. 이전 윈도우 합에서 빠지는 원소를 빼고 새 원소를 더하면 O(1)로 갱신하여 전체 O(N)에 해결됩니다.',
      },
      {
        tag: 'miss_all_negative',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'all_negative_values' },
        ],
        feedback:
          '모든 값이 음수일 수 있습니다. max_sum을 0으로 초기화하면 안 되고, 반드시 첫 번째 윈도우의 합으로 초기화해야 합니다.',
      },
      {
        tag: 'off_by_one_window',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'K_equals_N' },
        ],
        feedback:
          'K = N이면 전체 배열이 하나의 윈도우입니다. 이 경우 슬라이딩할 필요 없이 전체 합이 답입니다. 초기 윈도우 계산만으로 종료되어야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '고정 길이 윈도우는 오른쪽 추가 + 왼쪽 제거로 O(1)에 합을 갱신. 전체 O(N).',
      mentor_hint: '"고정 크기 연속 구간"이 나오면 슬라이딩 윈도우가 첫 번째 후보다. 가변 크기면 투 포인터 또는 조건부 윈도우를 고려해야 한다.',
      pattern_trigger: '"길이 K인 연속 부분배열의 최대/최소/합"이 보이면 → 고정 크기 슬라이딩 윈도우를 떠올려라.',
      why_it_works: '연속 구간이 한 칸 이동할 때 변하는 것은 양 끝 원소뿐이다. 이전 합을 재활용하면 중복 계산을 제거하여 O(N)에 모든 윈도우를 확인할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // course-ds-005 — Top K 빈출 요소 (intermediate)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-ds-005',
    title: 'Top K 빈출 요소',
    difficulty: 'medium',
    course_level: 'intermediate',
    domain: 'top_k_frequent',
    summary: '정수 배열에서 가장 자주 등장하는 K개의 요소를 반환하는 문제',
    tags: ['heap', 'hash-map'],
    input_type: 'integer_array_and_k',
    output_type: 'integer_array',
    constraints: {
      unique_answer_guaranteed: true,
      input_size_hint: '1 <= K <= distinct_count <= N <= 10^5',
      return_order_does_not_matter: true,
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['top_k_elements', 'count', 'boolean_existence', 'sorted_array', 'maximum_frequency'],
          accepted_answers: ['top_k_elements'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array_with_duplicates',
            'need_frequency_count',
            'select_top_K_by_frequency',
            'sorted_input',
            'streaming_data',
          ],
          accepted_answers: ['integer_array_with_duplicates', 'need_frequency_count', 'select_top_K_by_frequency'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_K_most_frequent_elements_in_array',
            'frequency_count_then_top_K_selection',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['heap_top_k', 'full_sort', 'bucket_sort_by_frequency', 'quickselect', 'binary_search', 'sliding_window'],
          accepted_answers: ['heap_top_k'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'need_partial_ordering_not_full_sort',
            'min_heap_of_size_K_maintains_top_K',
            'frequency_count_is_prerequisite',
            'heap_insert_is_O_logK',
            'need_to_traverse_graph',
          ],
          accepted_answers: ['need_partial_ordering_not_full_sort', 'min_heap_of_size_K_maintains_top_K', 'frequency_count_is_prerequisite', 'heap_insert_is_O_logK'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bucket_sort_by_frequency', 'full_sort_by_frequency', 'quickselect_partition', 'counting_sort', 'trie'],
          accepted_answers: ['bucket_sort_by_frequency', 'full_sort_by_frequency'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['hash_map', 'min_heap', 'max_heap', 'sorted_array', 'bucket_array'],
          accepted_answers: ['hash_map', 'min_heap'],
        },
        heap_strategy: {
          type: 'single_select',
          question: 'Heap을 어떻게 활용하는가?',
          options: [
            'min_heap_size_K_evict_smallest',
            'max_heap_pop_K_times',
            'sort_all_then_slice',
            'no_heap_needed',
          ],
          accepted_answers: ['min_heap_size_K_evict_smallest'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'count_freq', label: 'Hash map으로 각 원소의 빈도수 계산' },
          { id: 'init_heap', label: '크기 K의 min heap 초기화' },
          { id: 'iterate_freq', label: '빈도수 map을 순회' },
          { id: 'push_heap', label: '(빈도, 원소) 쌍을 heap에 push' },
          { id: 'evict_min', label: 'heap 크기가 K를 초과하면 최소 빈도 원소를 pop' },
          { id: 'collect_result', label: 'heap에 남은 K개 원소를 결과로 반환' },
        ],
        correct_order: ['count_freq', 'init_heap', 'iterate_freq', 'push_heap', 'evict_min', 'collect_result'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'K_equals_distinct_count',
          'all_elements_same_frequency',
          'single_element_array',
          'negative_numbers',
          'K_equals_1',
          'very_large_array',
        ],
        required_answers: ['K_equals_distinct_count', 'all_elements_same_frequency'],
        recommended_answers: ['single_element_array', 'K_equals_1'],
        optional_answers: ['negative_numbers', 'very_large_array'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는? (D = distinct 원소 수)',
          options: ['O(N + DlogK)', 'O(NlogN)', 'O(N^2)', 'O(N)'],
          accepted_answers: ['O(N + DlogK)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(D)', 'O(N)', 'O(K)', 'O(1)'],
          accepted_answers: ['O(D)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'frequency_count_is_O_N',
            'heap_operations_O_logK_each',
            'D_entries_processed_through_heap',
            'hash_map_stores_D_entries',
            'full_sort_would_be_DlogD',
          ],
          accepted_answers: ['frequency_count_is_O_N', 'heap_operations_O_logK_each', 'D_entries_processed_through_heap', 'hash_map_stores_D_entries'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'hash_plus_min_heap',
        label: 'Hash map으로 빈도 계산 후 min heap으로 Top K 추출',
        pattern_analysis_answer: 'heap_top_k',
        required_strategy_tags: ['hash_map', 'min_heap'],
      },
    ],

    common_mistakes: [
      {
        tag: 'full_sort',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'full_sort' },
        ],
        feedback:
          '전체 정렬은 O(DlogD)입니다. K가 D보다 훨씬 작을 때 min heap(O(DlogK))이 더 효율적입니다. Top K 문제에서는 부분 정렬을 우선 고려하세요.',
      },
      {
        tag: 'max_heap_instead_of_min',
        conditions: [
          { step: 'strategy_design', field: 'data_structures', operator: 'includes', value: 'max_heap' },
        ],
        feedback:
          'Max heap을 사용하면 K개를 추출하기 위해 K번 pop해야 합니다(O(DlogD)로 구축). Min heap을 크기 K로 유지하면 최소 빈도를 효율적으로 제거하여 O(DlogK)에 해결됩니다.',
      },
      {
        tag: 'miss_same_frequency',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'all_elements_same_frequency' },
        ],
        feedback:
          '모든 원소의 빈도가 같으면 아무 K개나 반환해도 됩니다. 하지만 heap 비교 로직에서 동률 처리가 올바른지 확인해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'Hash map으로 빈도 계산 후 min heap(크기 K)으로 Top K를 O(N + DlogK)에 추출.',
      mentor_hint: 'Top K 문제에서 min heap을 쓰는 이유: 크기를 K로 유지하면서 가장 작은 것을 제거하면 자연스럽게 큰 것 K개가 남는다. max heap은 전체를 넣어야 하므로 비효율적.',
      pattern_trigger: '"가장 빈번한/큰/작은 K개"가 보이면 → heap + hash map 조합을 떠올려라.',
      why_it_works: 'Min heap은 크기 K를 초과할 때 최소를 제거하므로 항상 빈도 상위 K개만 남는다. heap 연산이 O(logK)이고 D개를 처리하므로 O(DlogK).',
    },
  },

  // ──────────────────────────────────────────────────────
  // course-ds-006 — 다음 큰 수 (intermediate)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-ds-006',
    title: '다음 큰 수',
    difficulty: 'medium',
    course_level: 'intermediate',
    domain: 'next_greater_element',
    summary: '배열의 각 원소에 대해 오른쪽에서 처음으로 자기보다 큰 수를 찾는 문제. 없으면 -1.',
    tags: ['monotonic-stack', 'array'],
    input_type: 'integer_array',
    output_type: 'integer_array',
    constraints: {
      result_same_length_as_input: true,
      no_greater_means_minus_1: true,
      input_size_hint: '1 <= N <= 10^5',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['next_greater_for_each', 'count', 'maximum_value', 'indices', 'boolean_existence'],
          accepted_answers: ['next_greater_for_each'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'find_first_greater_to_the_right',
            'per_element_answer_needed',
            'sorted_input',
            'circular_array',
          ],
          accepted_answers: ['integer_array', 'find_first_greater_to_the_right', 'per_element_answer_needed'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'for_each_element_find_next_greater_element_to_its_right',
            'monotonic_stack_for_next_greater_element',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['monotonic_stack', 'brute_force', 'binary_search', 'two_pointer', 'sorting', 'segment_tree'],
          accepted_answers: ['monotonic_stack'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'need_first_greater_not_global_max',
            'stack_maintains_decreasing_order',
            'new_element_resolves_pending_elements',
            'each_element_pushed_and_popped_once',
            'need_to_sort_input',
          ],
          accepted_answers: ['need_first_greater_not_global_max', 'stack_maintains_decreasing_order', 'new_element_resolves_pending_elements', 'each_element_pushed_and_popped_once'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['brute_force_nested_scan', 'right_to_left_traversal', 'sparse_table', 'binary_indexed_tree', 'deque'],
          accepted_answers: ['brute_force_nested_scan', 'right_to_left_traversal'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['stack', 'result_array', 'hash_map', 'heap', 'deque'],
          accepted_answers: ['stack', 'result_array'],
        },
        stack_content: {
          type: 'single_select',
          question: '스택에 무엇을 저장하는가?',
          options: [
            'indices_of_unresolved_elements',
            'values_directly',
            'pairs_of_value_and_index',
            'next_greater_values',
          ],
          accepted_answers: ['indices_of_unresolved_elements'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init', label: '결과 배열을 -1로 초기화, 빈 스택 준비' },
          { id: 'iterate', label: '배열을 왼쪽에서 오른쪽으로 순회' },
          { id: 'pop_smaller', label: '현재 값이 스택 top의 값보다 크면 pop하고 결과에 현재 값 기록' },
          { id: 'repeat_pop', label: '스택이 비거나 top이 현재 값 이상이 될 때까지 반복' },
          { id: 'push_current', label: '현재 인덱스를 스택에 push' },
          { id: 'remaining', label: '스택에 남은 인덱스들은 -1 유지 (이미 초기화됨)' },
        ],
        correct_order: ['init', 'iterate', 'pop_smaller', 'repeat_pop', 'push_current', 'remaining'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'strictly_decreasing_array',
          'strictly_increasing_array',
          'all_same_values',
          'single_element',
          'duplicate_values',
          'last_element_always_minus_1',
        ],
        required_answers: ['strictly_decreasing_array', 'last_element_always_minus_1'],
        recommended_answers: ['all_same_values', 'duplicate_values'],
        optional_answers: ['strictly_increasing_array', 'single_element'],
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
          options: ['O(N)', 'O(1)', 'O(NlogN)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_element_pushed_and_popped_at_most_once',
            'total_stack_operations_are_2N',
            'result_array_takes_O_N',
            'nested_loop_would_be_N_squared',
            'sorting_not_needed',
          ],
          accepted_answers: ['each_element_pushed_and_popped_at_most_once', 'total_stack_operations_are_2N', 'result_array_takes_O_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'monotonic_stack_left_to_right',
        label: '단조 감소 스택으로 왼쪽에서 오른쪽 순회하며 다음 큰 수 기록',
        pattern_analysis_answer: 'monotonic_stack',
        required_strategy_tags: ['stack', 'result_array'],
      },
    ],

    common_mistakes: [
      {
        tag: 'brute_force_n2',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force' },
        ],
        feedback:
          '각 원소마다 오른쪽을 전부 스캔하면 O(N^2)입니다. 단조 스택을 사용하면 각 원소가 최대 한 번 push/pop되므로 O(N)에 해결됩니다.',
      },
      {
        tag: 'store_values_not_indices',
        conditions: [
          { step: 'strategy_design', field: 'stack_content', operator: 'equals', value: 'values_directly' },
        ],
        feedback:
          '스택에 값만 저장하면 결과 배열의 어느 위치에 기록해야 하는지 알 수 없습니다. 인덱스를 저장해야 pop 시 result[index]에 올바르게 기록할 수 있습니다.',
      },
      {
        tag: 'miss_decreasing_case',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'strictly_decreasing_array' },
        ],
        feedback:
          '단조 감소 배열에서는 모든 원소의 답이 -1입니다. 스택에 모든 원소가 쌓이기만 하고 pop되지 않으며, 초기값 -1이 그대로 유지되어야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '단조 감소 스택에 인덱스를 저장. 현재 값이 top보다 크면 pop하며 결과 기록. 각 원소는 최대 1번 push + 1번 pop → O(N).',
      mentor_hint: 'Monotonic stack의 핵심 통찰: "아직 답을 못 찾은 원소"를 스택에 대기시키고, 큰 값이 오면 한꺼번에 해결한다. amortized O(N)의 전형적 예.',
      pattern_trigger: '"각 원소의 다음 큰/작은 값"이 보이면 → 단조 스택을 떠올려라.',
      why_it_works: '스택이 단조 감소를 유지하므로 새 원소가 top보다 크면 그것이 "처음으로 큰 수"임이 보장된다. 각 원소가 O(1) amortized로 처리되어 전체 O(N).',
    },
  },

  // ──────────────────────────────────────────────────────
  // course-ds-007 — LRU 캐시 (advanced)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-ds-007',
    title: 'LRU 캐시',
    difficulty: 'hard',
    course_level: 'advanced',
    domain: 'lru_cache_design',
    summary: 'get과 put 연산을 모두 O(1)에 수행하는 LRU(Least Recently Used) 캐시를 설계하는 문제',
    tags: ['hash-map', 'linked-list'],
    input_type: 'operations_sequence',
    output_type: 'operation_results',
    constraints: {
      get_and_put_must_be_O1: true,
      capacity_given: true,
      input_size_hint: '1 <= capacity <= 3000, ops <= 2 * 10^5',
      evict_least_recently_used: true,
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['data_structure_design', 'count', 'maximum_value', 'boolean_existence', 'shortest_path'],
          accepted_answers: ['data_structure_design'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'sequence_of_get_put_operations',
            'fixed_capacity_constraint',
            'O1_time_required_for_both_ops',
            'evict_least_recently_used_on_full',
            'sorted_keys',
          ],
          accepted_answers: ['sequence_of_get_put_operations', 'fixed_capacity_constraint', 'O1_time_required_for_both_ops', 'evict_least_recently_used_on_full'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'design_LRU_cache_with_O1_get_and_put',
            'hash_map_plus_doubly_linked_list_for_LRU',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['hash_map_plus_doubly_linked_list', 'ordered_dict', 'array_with_timestamp', 'binary_search_tree', 'heap', 'queue'],
          accepted_answers: ['hash_map_plus_doubly_linked_list'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'hash_map_gives_O1_key_lookup',
            'doubly_linked_list_gives_O1_removal',
            'move_to_front_on_access',
            'remove_tail_on_eviction',
            'array_removal_is_O_N',
          ],
          accepted_answers: ['hash_map_gives_O1_key_lookup', 'doubly_linked_list_gives_O1_removal', 'move_to_front_on_access', 'remove_tail_on_eviction'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['ordered_dictionary', 'timestamp_based_eviction', 'linked_hash_map', 'array_based_cache', 'tree_map'],
          accepted_answers: ['ordered_dictionary', 'linked_hash_map'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['hash_map', 'doubly_linked_list', 'singly_linked_list', 'array', 'heap'],
          accepted_answers: ['hash_map', 'doubly_linked_list'],
        },
        map_value_type: {
          type: 'single_select',
          question: 'Hash map의 value는 무엇을 가리켜야 하는가?',
          options: [
            'linked_list_node_reference',
            'value_directly',
            'index_in_array',
            'timestamp',
          ],
          accepted_answers: ['linked_list_node_reference'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: 'LRU 캐시의 put 연산 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'check_exists', label: 'key가 이미 존재하는지 hash map에서 확인' },
          { id: 'update_existing', label: '존재하면: 값을 업데이트하고 해당 노드를 리스트 head로 이동' },
          { id: 'create_new', label: '존재하지 않으면: 새 노드를 생성하여 리스트 head에 삽입' },
          { id: 'add_to_map', label: '새 노드를 hash map에 추가' },
          { id: 'check_capacity', label: '캐시 크기가 capacity를 초과하는지 확인' },
          { id: 'evict_tail', label: '초과하면 리스트 tail 노드를 제거하고 map에서도 삭제' },
        ],
        correct_order: ['check_exists', 'update_existing', 'create_new', 'add_to_map', 'check_capacity', 'evict_tail'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'put_existing_key_updates_value_and_position',
          'get_nonexistent_key_returns_minus_1',
          'capacity_is_1',
          'get_moves_node_to_most_recent',
          'eviction_order_correctness',
          'concurrent_access',
        ],
        required_answers: ['put_existing_key_updates_value_and_position', 'get_nonexistent_key_returns_minus_1', 'get_moves_node_to_most_recent'],
        recommended_answers: ['capacity_is_1', 'eviction_order_correctness'],
        optional_answers: ['concurrent_access'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: 'get과 put의 시간복잡도는?',
          options: ['O(1)', 'O(logN)', 'O(N)', 'O(NlogN)'],
          accepted_answers: ['O(1)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(capacity)', 'O(N)', 'O(1)', 'O(N^2)'],
          accepted_answers: ['O(capacity)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'hash_map_lookup_is_O1',
            'doubly_linked_list_insert_remove_is_O1',
            'no_need_to_traverse_list',
            'map_stores_up_to_capacity_entries',
            'list_mirrors_map_size',
          ],
          accepted_answers: ['hash_map_lookup_is_O1', 'doubly_linked_list_insert_remove_is_O1', 'no_need_to_traverse_list', 'map_stores_up_to_capacity_entries'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'hash_map_dll',
        label: 'Hash map + Doubly linked list로 O(1) get/put 구현',
        pattern_analysis_answer: 'hash_map_plus_doubly_linked_list',
        required_strategy_tags: ['hash_map', 'doubly_linked_list'],
      },
    ],

    common_mistakes: [
      {
        tag: 'array_based_eviction',
        conditions: [
          { step: 'strategy_design', field: 'data_structures', operator: 'includes', value: 'array' },
        ],
        feedback:
          '배열에서 중간 원소를 제거하면 O(N)입니다. Doubly linked list를 사용하면 노드의 참조를 알고 있을 때 O(1)에 제거할 수 있습니다.',
      },
      {
        tag: 'singly_linked_list',
        conditions: [
          { step: 'strategy_design', field: 'data_structures', operator: 'includes', value: 'singly_linked_list' },
        ],
        feedback:
          '단일 연결 리스트에서 노드를 삭제하려면 이전 노드를 찾아야 하므로 O(N)입니다. 이중 연결 리스트는 prev 포인터로 O(1) 삭제가 가능합니다.',
      },
      {
        tag: 'miss_get_updates_position',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'get_moves_node_to_most_recent' },
        ],
        feedback:
          'get 연산도 "사용"에 해당하므로 해당 노드를 가장 최근으로 이동시켜야 합니다. 이를 놓치면 자주 조회되는 항목이 잘못 퇴출됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'Hash map은 O(1) 조회, doubly linked list는 O(1) 삽입/삭제/이동을 담당. 두 자료구조를 결합하여 LRU를 O(1)에 구현.',
      mentor_hint: 'Dummy head와 dummy tail 노드를 사용하면 삽입/삭제 시 null 체크를 줄여 코드가 깔끔해진다. 면접에서 자주 나오는 설계 문제.',
      pattern_trigger: '"O(1) 접근 + O(1) 순서 변경"이 동시에 필요하면 → hash map + doubly linked list 조합을 떠올려라.',
      why_it_works: 'Hash map으로 key → node를 O(1)에 찾고, doubly linked list에서 그 노드를 O(1)에 제거 후 head에 재삽입. 두 자료구조가 서로의 약점을 보완한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // course-ds-008 — 구간 합 업데이트 (advanced)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-ds-008',
    title: '구간 합 업데이트',
    difficulty: 'hard',
    course_level: 'advanced',
    domain: 'range_sum_update',
    summary: '값의 업데이트가 빈번한 정수 배열에서 임의 구간의 합을 효율적으로 구하는 문제',
    tags: ['prefix-sum', 'array'],
    input_type: 'integer_array_and_queries',
    output_type: 'query_results',
    constraints: {
      two_operations: 'update(i, val) and sumRange(l, r)',
      input_size_hint: '1 <= N <= 3 * 10^4, ops <= 3 * 10^4',
      both_update_and_query_frequent: true,
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['data_structure_design', 'single_range_sum', 'maximum_subarray', 'count', 'sorted_output'],
          accepted_answers: ['data_structure_design'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array_with_updates',
            'range_sum_queries',
            'both_point_update_and_range_query',
            'static_array_no_updates',
            'insert_and_delete_operations',
          ],
          accepted_answers: ['integer_array_with_updates', 'range_sum_queries', 'both_point_update_and_range_query'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'support_point_update_and_range_sum_query_efficiently',
            'binary_indexed_tree_or_segment_tree_for_dynamic_range_sum',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['binary_indexed_tree', 'prefix_sum_rebuild', 'segment_tree', 'brute_force', 'sqrt_decomposition', 'sparse_table'],
          accepted_answers: ['binary_indexed_tree'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'both_update_and_query_must_be_efficient',
            'prefix_sum_update_is_O_N',
            'BIT_gives_O_logN_for_both',
            'simpler_implementation_than_segment_tree',
            'need_to_sort_input_first',
          ],
          accepted_answers: ['both_update_and_query_must_be_efficient', 'prefix_sum_update_is_O_N', 'BIT_gives_O_logN_for_both', 'simpler_implementation_than_segment_tree'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['segment_tree', 'sqrt_decomposition', 'prefix_sum_with_rebuild', 'sparse_table', 'balanced_BST'],
          accepted_answers: ['segment_tree', 'sqrt_decomposition'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['binary_indexed_tree', 'segment_tree', 'prefix_sum_array', 'original_array', 'sqrt_buckets'],
          accepted_answers: ['binary_indexed_tree'],
        },
        bit_operation: {
          type: 'single_select',
          question: 'BIT에서 구간 합을 어떻게 계산하는가?',
          options: [
            'prefixSum_r_minus_prefixSum_l_minus_1',
            'direct_range_query',
            'iterate_all_elements',
            'binary_search_for_range',
          ],
          accepted_answers: ['prefixSum_r_minus_prefixSum_l_minus_1'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: 'BIT 기반 구간 합 구현 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_bit', label: '크기 N+1의 BIT 배열을 0으로 초기화' },
          { id: 'build', label: '원본 배열의 각 원소를 BIT에 update하여 초기 트리 구축' },
          { id: 'update_impl', label: 'update(i, delta): i부터 i += i & (-i)로 올라가며 BIT[i] += delta' },
          { id: 'query_impl', label: 'prefixSum(i): i부터 i -= i & (-i)로 내려가며 합산' },
          { id: 'range_sum', label: 'sumRange(l, r) = prefixSum(r) - prefixSum(l - 1)' },
          { id: 'point_update', label: '값 변경 시 delta = newVal - oldVal 계산 후 update(i, delta) 호출' },
        ],
        correct_order: ['init_bit', 'build', 'update_impl', 'query_impl', 'range_sum', 'point_update'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'one_indexed_BIT_array',
          'update_uses_delta_not_new_value',
          'query_l_equals_0_boundary',
          'single_element_range',
          'all_updates_no_queries',
          'negative_values_in_array',
        ],
        required_answers: ['one_indexed_BIT_array', 'update_uses_delta_not_new_value'],
        recommended_answers: ['query_l_equals_0_boundary', 'single_element_range'],
        optional_answers: ['all_updates_no_queries', 'negative_values_in_array'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: 'update와 sumRange의 시간복잡도는?',
          options: ['O(logN)', 'O(N)', 'O(1)', 'O(sqrt(N))'],
          accepted_answers: ['O(logN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(1)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'BIT_traverses_logN_nodes_per_operation',
            'bit_manipulation_determines_parent',
            'BIT_array_same_size_as_input',
            'prefix_sum_query_is_O1_but_update_O_N',
            'segment_tree_uses_2N_to_4N_space',
          ],
          accepted_answers: ['BIT_traverses_logN_nodes_per_operation', 'bit_manipulation_determines_parent', 'BIT_array_same_size_as_input'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'binary_indexed_tree',
        label: 'BIT(Fenwick Tree)로 O(logN) update/query 구현',
        pattern_analysis_answer: 'binary_indexed_tree',
        required_strategy_tags: ['binary_indexed_tree'],
      },
      {
        strategy_id: 'segment_tree',
        label: 'Segment tree로 O(logN) update/query 구현',
        pattern_analysis_answer: 'segment_tree',
        required_strategy_tags: ['segment_tree'],
      },
    ],

    common_mistakes: [
      {
        tag: 'prefix_sum_only',
        conditions: [
          { step: 'strategy_design', field: 'data_structures', operator: 'includes', value: 'prefix_sum_array' },
        ],
        feedback:
          '일반 prefix sum은 구간 합 O(1)이지만 update가 O(N)입니다. 업데이트가 빈번하면 BIT나 segment tree를 사용하여 양쪽 모두 O(logN)으로 처리해야 합니다.',
      },
      {
        tag: 'miss_1_indexed',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'one_indexed_BIT_array' },
        ],
        feedback:
          'BIT는 1-indexed여야 합니다. 0-indexed를 사용하면 i & (-i) 연산에서 0에 빠져 무한 루프가 발생합니다. 인덱스를 +1하여 사용하세요.',
      },
      {
        tag: 'new_value_not_delta',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'update_uses_delta_not_new_value' },
        ],
        feedback:
          'BIT의 update는 delta(변화량)를 더합니다. 새 값을 직접 저장하면 안 되고, delta = newVal - oldVal을 계산하여 전달해야 합니다. 원본 배열을 별도로 유지하세요.',
      },
    ],

    review_notes: {
      core_takeaway: 'BIT는 i & (-i) 비트 연산으로 O(logN)에 point update와 prefix sum query를 지원. 구간 합은 prefixSum(r) - prefixSum(l-1).',
      mentor_hint: 'BIT의 핵심은 "최하위 비트(LSB)"다. update는 LSB를 더하며 올라가고, query는 LSB를 빼며 내려간다. segment tree보다 구현이 간결하므로 구간 합에는 BIT를 먼저 고려하라.',
      pattern_trigger: '"point update + range query"가 동시에 필요하면 → BIT 또는 segment tree를 떠올려라.',
      why_it_works: 'BIT의 각 인덱스는 LSB 크기만큼의 구간 합을 저장한다. logN개의 노드만 거치면 prefix sum을 구할 수 있고, update도 logN개의 노드만 갱신하면 된다.',
    },
  },
];
