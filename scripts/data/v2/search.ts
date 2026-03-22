import type { ProblemV2 } from '../types';

export const SEARCH_V2: ProblemV2[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1260 — DFS와 BFS
  // ──────────────────────────────────────────────────────
  {
    id: 'b001260-boj',
    title: 'DFS와 BFS',
    difficulty: 'easy',
    domain: 'graph_traversal',
    summary: '그래프를 DFS와 BFS로 탐색한 결과를 각각 출력하는 기본 구현 문제',
    tags: ['dfs', 'bfs', 'graph'],
    input_type: 'graph_edges',
    output_type: 'traversal_order',
    constraints: {
      visit_smallest_first: true,
      undirected_graph: true,
      input_size_hint: 'N <= 1000, M <= 10000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['traversal_order', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['traversal_order'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'undirected_graph',
            'visit_smallest_number_first',
            'both_DFS_and_BFS_required',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['undirected_graph', 'visit_smallest_number_first', 'both_DFS_and_BFS_required'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'output_DFS_and_BFS_traversal_orders',
            'basic_graph_traversal_implementation',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dfs_bfs_standard', 'dijkstra', 'topological_sort', 'binary_search', 'union_find', 'greedy'],
          accepted_answers: ['dfs_bfs_standard'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'explicit_DFS_BFS_requested',
            'graph_traversal_problem',
            'visit_order_matters',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['explicit_DFS_BFS_requested', 'graph_traversal_problem', 'visit_order_matters'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['adjacency_list_sorting', 'recursion', 'queue_usage', 'memoization', 'two_pointer'],
          accepted_answers: ['adjacency_list_sorting', 'recursion', 'queue_usage'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'visited_array', 'queue', 'stack', 'adjacency_matrix'],
          accepted_answers: ['adjacency_list', 'visited_array', 'queue'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_adjacency_lists',
            'recursive_DFS',
            'queue_based_BFS',
            'reset_visited_between_traversals',
            'iterative_DFS_with_stack',
          ],
          accepted_answers: ['sort_adjacency_lists', 'recursive_DFS', 'queue_based_BFS', 'reset_visited_between_traversals'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_adj', label: '인접 리스트 구성 (양방향)' },
          { id: 'sort_adj', label: '각 인접 리스트를 오름차순 정렬' },
          { id: 'run_dfs', label: 'visited 초기화 후 DFS 실행 및 결과 출력' },
          { id: 'reset_visited', label: 'visited 배열 초기화' },
          { id: 'run_bfs', label: 'BFS 실행 및 결과 출력' },
        ],
        correct_order: ['build_adj', 'sort_adj', 'run_dfs', 'reset_visited', 'run_bfs'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'sort_adj_for_smallest_first',
          'reset_visited_between_DFS_BFS',
          'BFS_mark_visited_on_enqueue',
          'disconnected_nodes_not_visited',
          'self_loop_not_mentioned',
          'N_equals_1_trivial',
        ],
        required_answers: ['sort_adj_for_smallest_first', 'reset_visited_between_DFS_BFS', 'BFS_mark_visited_on_enqueue'],
        recommended_answers: ['disconnected_nodes_not_visited'],
        optional_answers: ['self_loop_not_mentioned', 'N_equals_1_trivial'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+M)', 'O(N*M)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N+M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N+M)', 'O(N^2)', 'O(N)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'visit_each_node_and_edge_once',
            'adjacency_list_size_N_plus_M',
            'queue_and_visited_size_N',
            'adjacency_matrix_is_N2',
            'sorting_adj_is_MlogM',
          ],
          accepted_answers: ['visit_each_node_and_edge_once', 'adjacency_list_size_N_plus_M', 'queue_and_visited_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'recursive_dfs_queue_bfs',
        label: '재귀 DFS + 큐 BFS (인접 리스트 정렬)',
        pattern_analysis_answer: 'dfs_bfs_standard',
        required_strategy_tags: ['sort_adjacency_lists', 'recursive_DFS', 'queue_based_BFS', 'reset_visited_between_traversals'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_sort',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'sort_adj_for_smallest_first' },
        ],
        feedback:
          '인접 리스트를 정렬하지 않으면 "정점 번호가 작은 것부터 방문" 조건을 만족하지 못합니다. 입력 순서가 정렬 순서와 다를 수 있습니다.',
      },
      {
        tag: 'no_reset',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'reset_visited_between_DFS_BFS' },
        ],
        feedback:
          'DFS와 BFS 사이에 visited 배열을 초기화하지 않으면 BFS에서 이미 방문된 노드를 건너뛰어 결과가 틀립니다.',
      },
      {
        tag: 'bfs_late_visit',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'BFS_mark_visited_on_enqueue' },
        ],
        feedback:
          'BFS에서 큐에서 꺼낼 때(pop) visited를 체크하면 같은 노드가 여러 번 큐에 들어갑니다. 큐에 넣을 때(enqueue) visited를 체크해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'DFS는 재귀/스택, BFS는 큐. 인접 리스트를 정렬하여 작은 번호부터 방문. visited 배열을 DFS/BFS 사이에 초기화.',
      mentor_hint: 'BFS에서 "큐에 넣을 때 vs 꺼낼 때" visited 체크 시점이 가장 흔한 실수다. 큐에 넣을 때 체크해야 중복 삽입을 방지한다.',
      pattern_trigger: '"그래프를 DFS/BFS로 탐색하시오"가 보이면 → 인접 리스트 구성 + 정렬 + 재귀DFS/큐BFS를 떠올려라.',
      why_it_works: 'DFS는 스택(재귀)으로 깊이 우선 탐색, BFS는 큐로 너비 우선 탐색. 각 노드와 간선을 한 번씩만 방문하므로 O(N+M)이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1300 — K번째 수
  // ──────────────────────────────────────────────────────
  {
    id: 'b001300-boj',
    title: 'K번째 수',
    difficulty: 'medium',
    domain: 'parametric_search',
    summary: 'N×N 곱셈 표에서 K번째로 작은 수를 답에 대한 이분 탐색으로 구하는 문제',
    tags: ['binary-search', 'parametric-search', 'math'],
    input_type: 'two_integers',
    output_type: 'single_value',
    constraints: {
      multiplication_table: true,
      kth_smallest: true,
      input_size_hint: 'N <= 100000, K <= min(10^9, N^2)',
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
            'implicit_NxN_array',
            'cannot_materialize_array',
            'kth_element_in_sorted_order',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['implicit_NxN_array', 'cannot_materialize_array', 'kth_element_in_sorted_order'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'kth_smallest_in_multiplication_table',
            'parametric_search_on_answer',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['parametric_search', 'sort_and_index', 'quick_select', 'brute_force', 'dp_bottom_up', 'two_pointer'],
          accepted_answers: ['parametric_search'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'count_leq_x_is_monotone',
            'count_computable_in_O_N',
            'array_too_large_to_materialize',
            'binary_search_on_answer_value',
            'need_shortest_path',
          ],
          accepted_answers: ['count_leq_x_is_monotone', 'count_computable_in_O_N', 'array_too_large_to_materialize', 'binary_search_on_answer_value'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['lower_bound', 'math_floor_division', 'counting', 'memoization', 'sliding_window'],
          accepted_answers: ['lower_bound', 'math_floor_division', 'counting'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['binary_search_variables', 'array', 'heap', 'map', 'segment_tree'],
          accepted_answers: ['binary_search_variables'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'binary_search_on_x',
            'count_leq_x_sum_min_x_div_i_N',
            'lower_bound_for_exact_kth',
            'materialize_and_sort',
            'quick_select_on_implicit',
          ],
          accepted_answers: ['binary_search_on_x', 'count_leq_x_sum_min_x_div_i_N', 'lower_bound_for_exact_kth'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'set_range', label: 'lo = 1, hi = K로 이분 탐색 범위 설정' },
          { id: 'compute_mid', label: 'mid = (lo + hi) / 2 계산' },
          { id: 'count_leq', label: 'mid 이하의 원소 수 = Σ min(mid/i, N) for i=1..N' },
          { id: 'compare_K', label: 'count >= K이면 hi = mid, 아니면 lo = mid + 1' },
          { id: 'output', label: 'lo 출력' },
        ],
        correct_order: ['set_range', 'compute_mid', 'count_leq', 'compare_K', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'hi_can_be_K_not_N_squared',
          'floor_division_for_count',
          'min_x_div_i_and_N',
          'answer_exists_in_table',
          'duplicates_in_table',
          'N_equals_1_answer_is_K',
        ],
        required_answers: ['hi_can_be_K_not_N_squared', 'floor_division_for_count', 'min_x_div_i_and_N'],
        recommended_answers: ['answer_exists_in_table', 'duplicates_in_table'],
        optional_answers: ['N_equals_1_answer_is_K'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(NlogN)', 'O(N^2)', 'O(NlogN^2)', 'O(N)'],
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
            'binary_search_log_K_iterations',
            'count_function_O_N',
            'no_auxiliary_structure',
            'materialize_is_O_N2',
            'K_at_most_N2',
          ],
          accepted_answers: ['binary_search_log_K_iterations', 'count_function_O_N', 'no_auxiliary_structure'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'parametric_search',
        label: '답에 대한 이분 탐색 + O(N) 카운팅',
        pattern_analysis_answer: 'parametric_search',
        required_strategy_tags: ['binary_search_on_x', 'count_leq_x_sum_min_x_div_i_N', 'lower_bound_for_exact_kth'],
      },
    ],

    common_mistakes: [
      {
        tag: 'materialize_array',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'sort_and_index' },
        ],
        feedback:
          'N=10^5이면 N²=10^10개의 원소를 생성해야 하므로 메모리/시간 모두 초과합니다. 답에 대한 이분 탐색으로 배열을 생성하지 않고 해결해야 합니다.',
      },
      {
        tag: 'miss_min_N',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'min_x_div_i_and_N' },
        ],
        feedback:
          'i번째 행에서 x 이하인 원소는 x/i개이지만 N을 초과할 수 없습니다. min(x/i, N)으로 클램핑하지 않으면 카운트가 과대 계산됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: '답 x에 대해 이분 탐색. x 이하 원소 수 = Σmin(⌊x/i⌋, N). count >= K인 최소 x가 답.',
      mentor_hint: '파라메트릭 서치의 핵심은 "결정 문제가 단조성을 가지는가"이다. count(x)는 x가 커질수록 증가하므로 이분 탐색 가능.',
      pattern_trigger: '"암시적 배열에서 K번째 원소" 또는 "배열을 직접 만들 수 없지만 카운팅 가능"이 보이면 → 답에 대한 이분 탐색을 떠올려라.',
      why_it_works: 'f(x) = x 이하 원소 수는 단조 증가 함수이다. f(x) >= K인 최소 x를 이분 탐색하면, x는 곱셈 표에 실제 존재하는 값이며 정확히 K번째이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1920 — 수 찾기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001920-boj',
    title: '수 찾기',
    difficulty: 'easy',
    domain: 'binary_search',
    summary: '정렬 후 이분 탐색으로 존재 여부를 판별하는 기본 문제',
    tags: ['binary-search', 'sorting'],
    input_type: 'array_and_queries',
    output_type: 'boolean_per_query',
    constraints: {
      existence_check: true,
      input_size_hint: 'N, M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['boolean_per_query', 'count', 'minimum_steps', 'single_value', 'sorted_array'],
          accepted_answers: ['boolean_per_query'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'integer_array',
            'multiple_existence_queries',
            'unsorted_initially',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['integer_array', 'multiple_existence_queries', 'unsorted_initially'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'binary_search_existence_check',
            'sort_then_binary_search_per_query',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['sort_binary_search', 'hash_set', 'linear_search', 'two_pointer', 'sorting_only', 'trie'],
          accepted_answers: ['sort_binary_search', 'hash_set'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'multiple_queries_need_fast_lookup',
            'sort_enables_logN_search',
            'hash_set_enables_O1_lookup',
            'linear_per_query_is_NM_TLE',
            'need_shortest_path',
          ],
          accepted_answers: ['multiple_queries_need_fast_lookup', 'sort_enables_logN_search', 'linear_per_query_is_NM_TLE'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['hash_set_alternative', 'fast_io', 'sorting_preprocessing', 'memoization', 'prefix_sum'],
          accepted_answers: ['hash_set_alternative', 'fast_io', 'sorting_preprocessing'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['sorted_array', 'hash_set', 'map', 'trie', 'stack'],
          accepted_answers: ['sorted_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_array_first',
            'binary_search_per_query',
            'hash_set_lookup',
            'linear_search_per_query',
            'two_pointer_merge',
          ],
          accepted_answers: ['sort_array_first', 'binary_search_per_query'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_A', label: 'N개의 수 배열 A 입력' },
          { id: 'sort_A', label: '배열 A 정렬' },
          { id: 'read_query', label: 'M개의 쿼리 수 입력' },
          { id: 'binary_search', label: '각 쿼리에 대해 이분 탐색으로 존재 여부 판별' },
          { id: 'output', label: '존재하면 1, 아니면 0 출력' },
        ],
        correct_order: ['read_A', 'sort_A', 'read_query', 'binary_search', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'must_sort_before_binary_search',
          'binary_search_boundary_lo_le_hi',
          'mid_overflow_prevention',
          'fast_io_important',
          'negative_numbers',
          'value_at_boundary',
        ],
        required_answers: ['must_sort_before_binary_search', 'binary_search_boundary_lo_le_hi'],
        recommended_answers: ['mid_overflow_prevention', 'fast_io_important'],
        optional_answers: ['negative_numbers', 'value_at_boundary'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(NlogN+MlogN)', 'O(NM)', 'O(N+M)', 'O((N+M)logN)'],
          accepted_answers: ['O(NlogN+MlogN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(1)', 'O(N+M)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'sorting_O_NlogN',
            'M_queries_each_O_logN',
            'array_stored_size_N',
            'hash_set_is_O_N_plus_M',
            'linear_search_is_O_NM',
          ],
          accepted_answers: ['sorting_O_NlogN', 'M_queries_each_O_logN', 'array_stored_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'sort_bsearch',
        label: '정렬 후 이분 탐색',
        pattern_analysis_answer: 'sort_binary_search',
        required_strategy_tags: ['sort_array_first', 'binary_search_per_query'],
      },
      {
        strategy_id: 'hash_set',
        label: 'HashSet으로 O(1) 조회',
        pattern_analysis_answer: 'hash_set',
        required_strategy_tags: ['hash_set_lookup'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_sort',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'must_sort_before_binary_search' },
        ],
        feedback:
          '정렬하지 않고 이분 탐색을 수행하면 올바른 결과를 보장하지 못합니다. 이분 탐색은 정렬된 배열에서만 동작합니다.',
      },
      {
        tag: 'linear_search',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'linear_search_per_query' },
        ],
        feedback:
          '매 쿼리마다 선형 탐색하면 O(NM) = 10^10으로 시간 초과입니다. 정렬 후 이분 탐색 O(M log N) 또는 HashSet O(M)을 사용하세요.',
      },
    ],

    review_notes: {
      core_takeaway: '배열 정렬 후 각 쿼리에 이분 탐색. 정렬 O(N log N) + 쿼리 O(M log N).',
      mentor_hint: '이분 탐색 구현에서 lo, hi, mid의 갱신 규칙을 정확히 외워라. while(lo <= hi), lo = mid+1, hi = mid-1.',
      pattern_trigger: '"배열에서 특정 값의 존재 여부를 여러 번 판별"이 보이면 → 정렬 + 이분 탐색 또는 HashSet을 떠올려라.',
      why_it_works: '정렬된 배열에서 mid 값과 타겟을 비교하여 탐색 범위를 절반으로 줄인다. 매 쿼리 O(log N)에 존재 여부를 판별할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2023 — 신기한 소수
  // ──────────────────────────────────────────────────────
  {
    id: 'b002023-boj',
    title: '신기한 소수',
    difficulty: 'medium',
    domain: 'dfs_backtracking',
    summary: '왼쪽부터 한 자리씩 소수인 N자리 수를 DFS + 가지치기로 찾는 문제',
    tags: ['dfs', 'backtracking', 'math', 'prime'],
    input_type: 'single_integer',
    output_type: 'list',
    constraints: {
      all_prefixes_are_prime: true,
      input_size_hint: '1 <= N <= 8',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['list', 'count', 'minimum_steps', 'boolean_existence', 'single_value'],
          accepted_answers: ['list'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'single_integer_N',
            'every_prefix_must_be_prime',
            'output_all_valid_numbers',
            'sorted_data',
            'graph_like_relation',
          ],
          accepted_answers: ['single_integer_N', 'every_prefix_must_be_prime', 'output_all_valid_numbers'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_all_N_digit_primes_with_prime_prefixes',
            'dfs_prime_extension',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dfs_with_pruning', 'brute_force', 'sieve_of_eratosthenes', 'dynamic_programming', 'binary_search', 'bfs'],
          accepted_answers: ['dfs_with_pruning'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'build_number_digit_by_digit',
            'prune_if_prefix_not_prime',
            'small_branching_factor',
            'sieve_needs_10_to_8_too_large',
            'need_shortest_path',
          ],
          accepted_answers: ['build_number_digit_by_digit', 'prune_if_prefix_not_prime', 'small_branching_factor'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['prime_check_sqrt', 'odd_digits_only', 'recursion', 'memoization', 'sorting'],
          accepted_answers: ['prime_check_sqrt', 'odd_digits_only', 'recursion'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['recursion_stack', 'sieve_array', 'map', 'queue', 'dp_array'],
          accepted_answers: ['recursion_stack'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'start_from_single_digit_primes',
            'append_digit_and_check_prime',
            'prune_non_prime_prefixes',
            'only_odd_digits_after_first',
            'enumerate_all_N_digit_numbers',
          ],
          accepted_answers: ['start_from_single_digit_primes', 'append_digit_and_check_prime', 'prune_non_prime_prefixes', 'only_odd_digits_after_first'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'start_primes', label: '1자리 소수 2, 3, 5, 7에서 DFS 시작' },
          { id: 'check_length', label: '현재 수의 자릿수가 N이면 출력' },
          { id: 'append_digit', label: '현재 수 × 10 + d (d = 1,3,5,7,9)로 확장' },
          { id: 'check_prime', label: '확장된 수가 소수인지 sqrt(n)까지 나눠서 확인' },
          { id: 'recurse_or_prune', label: '소수이면 재귀 진행, 아니면 가지치기' },
        ],
        correct_order: ['start_primes', 'check_length', 'append_digit', 'check_prime', 'recurse_or_prune'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'start_only_from_2_3_5_7',
          'even_digits_never_prime_after_2',
          'N_equals_1_output_2_3_5_7',
          'ascending_order_output',
          'sqrt_primality_test',
          'digit_0_makes_even_skip',
        ],
        required_answers: ['start_only_from_2_3_5_7', 'even_digits_never_prime_after_2', 'sqrt_primality_test'],
        recommended_answers: ['N_equals_1_output_2_3_5_7', 'ascending_order_output'],
        optional_answers: ['digit_0_makes_even_skip'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(4*5^N*sqrt(10^N))', 'O(10^N)', 'O(N*10^N)', 'O(NlogN)'],
          accepted_answers: ['O(4*5^N*sqrt(10^N))'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(10^N)', 'O(1)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'pruning_drastically_reduces_search',
            'branching_at_most_5_per_level',
            'depth_is_N',
            'primality_test_sqrt',
            'actual_candidates_much_fewer',
          ],
          accepted_answers: ['pruning_drastically_reduces_search', 'branching_at_most_5_per_level', 'depth_is_N', 'actual_candidates_much_fewer'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dfs_pruning',
        label: '1자리 소수에서 시작 → 홀수 자릿수 추가 → 소수 체크 가지치기',
        pattern_analysis_answer: 'dfs_with_pruning',
        required_strategy_tags: ['start_from_single_digit_primes', 'append_digit_and_check_prime', 'prune_non_prime_prefixes', 'only_odd_digits_after_first'],
      },
    ],

    common_mistakes: [
      {
        tag: 'enumerate_all',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'enumerate_all_N_digit_numbers' },
        ],
        feedback:
          'N=8이면 10^8개의 수를 모두 확인해야 합니다. DFS + 가지치기는 소수가 아닌 접두사를 즉시 제거하여 탐색 공간을 극적으로 줄입니다.',
      },
      {
        tag: 'miss_even_pruning',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'even_digits_never_prime_after_2' },
        ],
        feedback:
          '첫 자리 이후 짝수(0, 2, 4, 6, 8)를 붙이면 2의 배수가 되어 소수가 아닙니다(첫 자리 2 제외). 홀수(1, 3, 5, 7, 9)만 시도하면 탐색이 절반으로 줄어듭니다.',
      },
    ],

    review_notes: {
      core_takeaway: '1자리 소수(2,3,5,7)에서 DFS 시작. 뒤에 홀수만 붙이며 소수 체크로 가지치기. N자리 도달 시 출력.',
      mentor_hint: '"짝수를 붙이면 2의 배수" 관찰로 탐색 공간을 반으로 줄이는 것이 중요하다.',
      pattern_trigger: '"모든 접두사가 조건을 만족하는 수 찾기"가 보이면 → DFS + 가지치기(조건 불만족 시 확장 중단)를 떠올려라.',
      why_it_works: '접두사가 소수가 아니면 그 이후 어떤 자릿수를 붙여도 신기한 소수가 될 수 없다. 이 가지치기가 탐색 공간을 지수적으로 줄인다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2178 — 미로 탐색
  // ──────────────────────────────────────────────────────
  {
    id: 'b002178-boj',
    title: '미로 탐색',
    difficulty: 'easy',
    domain: 'bfs_shortest_path',
    summary: '격자 미로에서 (1,1)→(N,M) 최단 칸 수를 BFS로 구하는 문제',
    tags: ['bfs', 'graph', 'shortest-path', 'grid'],
    input_type: 'grid',
    output_type: 'minimum_steps',
    constraints: {
      unweighted_grid: true,
      start_and_end_always_1: true,
      input_size_hint: 'N, M <= 100',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_steps', 'count', 'boolean_existence', 'single_value', 'traversal_order'],
          accepted_answers: ['minimum_steps'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'binary_grid',
            'shortest_path_on_grid',
            'uniform_edge_weight',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['binary_grid', 'shortest_path_on_grid', 'uniform_edge_weight'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'BFS_shortest_path_on_grid',
            'minimum_cells_from_start_to_end',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bfs_grid', 'dfs', 'dijkstra', 'dp_grid', 'a_star', 'brute_force'],
          accepted_answers: ['bfs_grid'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'uniform_cost_edges',
            'BFS_guarantees_shortest',
            'grid_is_implicit_graph',
            'DFS_does_not_guarantee_shortest',
            'need_minimum_path',
          ],
          accepted_answers: ['uniform_cost_edges', 'BFS_guarantees_shortest', 'grid_is_implicit_graph', 'need_minimum_path'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['direction_vectors', 'visited_or_distance_array', 'string_parsing', 'memoization', 'two_pointer'],
          accepted_answers: ['direction_vectors', 'visited_or_distance_array', 'string_parsing'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['queue', 'distance_2d_array', 'direction_vectors', 'stack', 'priority_queue'],
          accepted_answers: ['queue', 'distance_2d_array', 'direction_vectors'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'BFS_from_start',
            'mark_distance_on_visit',
            'four_directional_movement',
            'DFS_all_paths',
            'dijkstra_weighted',
          ],
          accepted_answers: ['BFS_from_start', 'mark_distance_on_visit', 'four_directional_movement'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_grid', label: '격자 입력 (공백 없이 붙은 문자열 파싱)' },
          { id: 'init_bfs', label: '큐에 (0,0) 삽입, dist[0][0] = 1' },
          { id: 'process_queue', label: '큐에서 좌표를 꺼내 상하좌우 탐색' },
          { id: 'check_valid', label: '범위 내이고, 값이 1이고, 미방문이면 큐에 추가' },
          { id: 'set_distance', label: 'dist[nr][nc] = dist[r][c] + 1' },
          { id: 'output', label: 'dist[N-1][M-1] 출력' },
        ],
        correct_order: ['read_grid', 'init_bfs', 'process_queue', 'check_valid', 'set_distance', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'start_distance_is_1_not_0',
          'DFS_not_shortest',
          'input_no_spaces_parse_chars',
          'boundary_check_before_access',
          'visited_prevents_infinite_loop',
          'start_equals_end_2x2',
        ],
        required_answers: ['start_distance_is_1_not_0', 'DFS_not_shortest', 'boundary_check_before_access'],
        recommended_answers: ['input_no_spaces_parse_chars', 'visited_prevents_infinite_loop'],
        optional_answers: ['start_equals_end_2x2'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N*M)', 'O(N+M)', 'O((N*M)^2)', 'O(N*M*log(N*M))'],
          accepted_answers: ['O(N*M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N*M)', 'O(N+M)', 'O(1)'],
          accepted_answers: ['O(N*M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_cell_visited_once',
            'queue_size_at_most_NM',
            'distance_array_NM',
            'four_neighbors_constant',
            'DFS_stack_at_most_NM',
          ],
          accepted_answers: ['each_cell_visited_once', 'queue_size_at_most_NM', 'distance_array_NM'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'bfs_grid',
        label: 'BFS로 격자 최단 경로',
        pattern_analysis_answer: 'bfs_grid',
        required_strategy_tags: ['BFS_from_start', 'mark_distance_on_visit', 'four_directional_movement'],
      },
    ],

    common_mistakes: [
      {
        tag: 'use_dfs',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dfs' },
        ],
        feedback:
          'DFS는 최단 경로를 보장하지 않습니다. 먼저 찾은 경로가 최단이 아닐 수 있습니다. 가중치가 같은 그래프에서 최단 경로는 BFS로 구해야 합니다.',
      },
      {
        tag: 'start_distance_0',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'start_distance_is_1_not_0' },
        ],
        feedback:
          '시작 칸도 칸 수에 포함되므로 초기 거리를 1로 설정해야 합니다. 0으로 시작하면 답이 1 작게 나옵니다.',
      },
    ],

    review_notes: {
      core_takeaway: '가중치 없는 격자 최단 경로 = BFS. 시작 거리 1, 상하좌우 탐색, dist[N-1][M-1] 출력.',
      mentor_hint: '"격자 + 최단 거리 = BFS"를 반사적으로 떠올려야 한다. DFS는 최단 보장 안 됨.',
      pattern_trigger: '"격자에서 (1,1)→(N,M) 최소 이동"이 보이면 → BFS를 떠올려라.',
      why_it_works: 'BFS는 거리 순으로 탐색하므로, 어떤 셀에 처음 도달했을 때가 최단 거리이다. 모든 간선 비용이 1이므로 Dijkstra 없이 BFS로 충분하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2343 — 기타 레슨
  // ──────────────────────────────────────────────────────
  {
    id: 'b002343-boj',
    title: '기타 레슨',
    difficulty: 'medium',
    domain: 'parametric_search',
    summary: 'N개 강의를 M개 블루레이에 나눌 때 블루레이 크기의 최솟값을 파라메트릭 서치로 구하는 문제',
    tags: ['binary-search', 'parametric-search', 'greedy'],
    input_type: 'array_and_M',
    output_type: 'minimum_value',
    constraints: {
      order_preserved: true,
      minimize_max_group_sum: true,
      input_size_hint: 'N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_value', 'count', 'maximum_sum', 'boolean_existence', 'sorted_array'],
          accepted_answers: ['minimum_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'sequential_items_to_partition',
            'fixed_number_of_groups_M',
            'minimize_max_group_sum',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['sequential_items_to_partition', 'fixed_number_of_groups_M', 'minimize_max_group_sum'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'minimize_max_partition_sum_with_M_groups',
            'parametric_search_on_bluray_size',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['parametric_search', 'dp_partition', 'greedy', 'brute_force', 'binary_search_on_index', 'two_pointer'],
          accepted_answers: ['parametric_search'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'monotone_decision_function',
            'greedy_verification_O_N',
            'minimize_answer_with_binary_search',
            'dp_is_O_NM_too_slow',
            'need_shortest_path',
          ],
          accepted_answers: ['monotone_decision_function', 'greedy_verification_O_N', 'minimize_answer_with_binary_search'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['greedy_packing', 'lower_bound_upper_bound', 'prefix_sum', 'memoization', 'sliding_window'],
          accepted_answers: ['greedy_packing', 'lower_bound_upper_bound'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['binary_search_variables', 'array', 'prefix_sum', 'map', 'dp_table'],
          accepted_answers: ['binary_search_variables', 'array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'binary_search_on_size',
            'greedy_count_groups',
            'lo_equals_max_hi_equals_sum',
            'dp_optimal_partition',
            'try_all_sizes',
          ],
          accepted_answers: ['binary_search_on_size', 'greedy_count_groups', 'lo_equals_max_hi_equals_sum'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'set_range', label: 'lo = max(강의), hi = sum(강의)로 설정' },
          { id: 'binary_search', label: 'lo < hi인 동안 mid = (lo+hi)/2' },
          { id: 'greedy_check', label: '크기 mid로 강의를 순서대로 담아 필요한 블루레이 수 계산' },
          { id: 'adjust', label: '필요 수 <= M이면 hi = mid, 아니면 lo = mid + 1' },
          { id: 'output', label: 'lo 출력' },
        ],
        correct_order: ['set_range', 'binary_search', 'greedy_check', 'adjust', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'lo_must_be_max_element',
          'greedy_new_disc_when_overflow',
          'M_equals_1_answer_is_sum',
          'M_equals_N_answer_is_max',
          'order_cannot_be_changed',
          'single_lecture_exceeds_mid',
        ],
        required_answers: ['lo_must_be_max_element', 'greedy_new_disc_when_overflow', 'order_cannot_be_changed'],
        recommended_answers: ['M_equals_1_answer_is_sum', 'M_equals_N_answer_is_max'],
        optional_answers: ['single_lecture_exceeds_mid'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(NlogS)', 'O(NM)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(NlogS)'],
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
            'binary_search_log_S_iterations',
            'greedy_check_O_N',
            'input_array_stored',
            'dp_is_O_NM',
            'S_is_sum_of_all',
          ],
          accepted_answers: ['binary_search_log_S_iterations', 'greedy_check_O_N', 'input_array_stored'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'parametric_search',
        label: '블루레이 크기에 대한 이분 탐색 + 그리디 검증',
        pattern_analysis_answer: 'parametric_search',
        required_strategy_tags: ['binary_search_on_size', 'greedy_count_groups', 'lo_equals_max_hi_equals_sum'],
      },
    ],

    common_mistakes: [
      {
        tag: 'lo_from_0',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'lo_must_be_max_element' },
        ],
        feedback:
          'lo를 0이나 1로 설정하면 가장 긴 강의를 한 블루레이에 담지 못합니다. lo = max(강의 길이)로 설정해야 어떤 강의도 한 장에 들어갈 수 있습니다.',
      },
      {
        tag: 'miss_order_constraint',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'order_cannot_be_changed' },
        ],
        feedback:
          '강의 순서를 바꿀 수 없습니다. 정렬하거나 재배열하면 오답입니다. 순서대로 연속된 강의를 그룹으로 묶어야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '크기 x에 대해 이분 탐색. 검증: 순서대로 담아 M개 이내 가능한지 그리디로 O(N) 확인. lo = max, hi = sum.',
      mentor_hint: '파라메트릭 서치의 3요소: (1) 답에 대한 이분 탐색, (2) 결정 문제의 단조성, (3) 효율적 검증 함수. 이 문제에서 세 가지를 정확히 짚어라.',
      pattern_trigger: '"최댓값을 최소화" 또는 "최솟값을 최대화"가 보이면 → 파라메트릭 서치를 떠올려라.',
      why_it_works: '크기 x가 커질수록 필요한 블루레이 수는 줄어든다(단조 감소). f(x) <= M인 최소 x를 이분 탐색하면 최적 크기를 O(N log S)에 찾는다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11724 — 연결 요소의 개수
  // ──────────────────────────────────────────────────────
  {
    id: 'b011724-boj',
    title: '연결 요소의 개수',
    difficulty: 'easy',
    domain: 'connected_components',
    summary: '무방향 그래프의 연결 요소 개수를 DFS/BFS로 구하는 문제',
    tags: ['dfs', 'bfs', 'graph', 'connected-component'],
    input_type: 'graph_edges',
    output_type: 'count',
    constraints: {
      undirected_graph: true,
      count_connected_components: true,
      input_size_hint: 'N <= 1000, M <= N*(N-1)/2',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'minimum_steps', 'boolean_existence', 'single_value', 'traversal_order'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'undirected_graph',
            'possibly_disconnected',
            'count_components',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['undirected_graph', 'possibly_disconnected', 'count_components'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_connected_components_in_graph',
            'DFS_from_each_unvisited_node',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dfs_component_count', 'bfs_component_count', 'union_find', 'topological_sort', 'dijkstra', 'binary_search'],
          accepted_answers: ['dfs_component_count', 'bfs_component_count', 'union_find'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'each_DFS_covers_one_component',
            'count_DFS_starts',
            'union_find_counts_roots',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['each_DFS_covers_one_component', 'count_DFS_starts'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['visited_array', 'adjacency_list', 'union_find_alternative', 'memoization', 'two_pointer'],
          accepted_answers: ['visited_array', 'adjacency_list', 'union_find_alternative'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'visited_array', 'union_find', 'queue', 'stack'],
          accepted_answers: ['adjacency_list', 'visited_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'iterate_all_nodes',
            'DFS_from_unvisited',
            'increment_counter_per_DFS',
            'BFS_from_unvisited',
            'edge_count_based',
          ],
          accepted_answers: ['iterate_all_nodes', 'DFS_from_unvisited', 'increment_counter_per_DFS'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_graph', label: '인접 리스트 구성 (양방향)' },
          { id: 'init', label: 'visited 배열 초기화, counter = 0' },
          { id: 'iterate', label: '1번부터 N번까지 모든 정점 순회' },
          { id: 'check_visit', label: '미방문이면 counter++ 후 DFS 시작' },
          { id: 'dfs', label: 'DFS로 연결된 모든 정점 방문 처리' },
          { id: 'output', label: 'counter 출력' },
        ],
        correct_order: ['build_graph', 'init', 'iterate', 'check_visit', 'dfs', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'isolated_nodes_are_components',
          'M_equals_0_answer_is_N',
          'bidirectional_edges',
          'check_all_nodes_1_to_N',
          'single_node_is_one_component',
        ],
        required_answers: ['isolated_nodes_are_components', 'bidirectional_edges', 'check_all_nodes_1_to_N'],
        recommended_answers: ['M_equals_0_answer_is_N'],
        optional_answers: ['single_node_is_one_component'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+M)', 'O(N*M)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N+M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N+M)', 'O(N^2)', 'O(N)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_node_visited_once',
            'each_edge_traversed_once',
            'adjacency_list_size',
            'visited_array_size_N',
            'union_find_is_O_alpha',
          ],
          accepted_answers: ['each_node_visited_once', 'each_edge_traversed_once', 'adjacency_list_size'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dfs_count',
        label: '모든 정점 순회 + 미방문 시 DFS + 카운터 증가',
        pattern_analysis_answer: 'dfs_component_count',
        required_strategy_tags: ['iterate_all_nodes', 'DFS_from_unvisited', 'increment_counter_per_DFS'],
      },
    ],

    common_mistakes: [
      {
        tag: 'miss_isolated',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'isolated_nodes_are_components' },
        ],
        feedback:
          '간선이 없는 고립 정점도 하나의 연결 요소입니다. M=0이면 모든 N개 정점이 각각 연결 요소이므로 답은 N입니다.',
      },
    ],

    review_notes: {
      core_takeaway: '1~N 모든 정점 순회. 미방문 정점에서 DFS 시작할 때마다 카운터 증가. O(N+M).',
      mentor_hint: '간선이 없는 경우도 반드시 테스트하라. 고립 정점을 놓치는 것이 가장 흔한 실수이다.',
      pattern_trigger: '"그래프의 연결 요소 수"가 보이면 → 모든 정점 순회 + DFS/BFS 카운팅을 떠올려라.',
      why_it_works: 'DFS는 한 연결 요소의 모든 정점을 방문한다. 새로운 DFS가 시작되면 이전과 다른 연결 요소이다. 따라서 DFS 시작 횟수 = 연결 요소 수.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 13023 — ABCDE
  // ──────────────────────────────────────────────────────
  {
    id: 'b013023-boj',
    title: 'ABCDE',
    difficulty: 'medium',
    domain: 'dfs_backtracking',
    summary: '길이 4의 단순 경로(5개 노드)가 존재하는지 DFS + 백트래킹으로 판별하는 문제',
    tags: ['dfs', 'backtracking', 'graph'],
    input_type: 'graph_edges',
    output_type: 'boolean',
    constraints: {
      path_of_length_4: true,
      simple_path: true,
      input_size_hint: 'N <= 2000, M <= 5000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['boolean_existence', 'count', 'minimum_steps', 'single_value', 'traversal_order'],
          accepted_answers: ['boolean_existence'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'undirected_friendship_graph',
            'find_path_of_5_nodes',
            'simple_path_no_revisit',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['undirected_friendship_graph', 'find_path_of_5_nodes', 'simple_path_no_revisit'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'does_path_of_length_4_exist',
            'DFS_backtracking_depth_5',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dfs_backtracking', 'bfs', 'brute_force_nested', 'dp_on_graph', 'union_find', 'binary_search'],
          accepted_answers: ['dfs_backtracking'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'path_finding_is_DFS',
            'backtrack_to_explore_all_paths',
            'depth_limit_5_keeps_it_fast',
            'BFS_hard_to_track_path',
            'need_shortest_path',
          ],
          accepted_answers: ['path_finding_is_DFS', 'backtrack_to_explore_all_paths', 'depth_limit_5_keeps_it_fast'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['visited_backtracking', 'early_termination', 'adjacency_list', 'memoization', 'topological_sort'],
          accepted_answers: ['visited_backtracking', 'early_termination', 'adjacency_list'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'visited_array', 'recursion_stack', 'queue', 'dp_array'],
          accepted_answers: ['adjacency_list', 'visited_array', 'recursion_stack'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'DFS_from_every_node',
            'track_depth_stop_at_5',
            'backtrack_visited_on_return',
            'early_exit_on_found',
            'nested_5_loops',
          ],
          accepted_answers: ['DFS_from_every_node', 'track_depth_stop_at_5', 'backtrack_visited_on_return', 'early_exit_on_found'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_graph', label: '인접 리스트 구성' },
          { id: 'iterate_starts', label: '모든 정점을 시작점으로 시도' },
          { id: 'dfs_depth', label: 'DFS(현재 노드, 깊이)로 탐색' },
          { id: 'check_depth', label: '깊이 == 5이면 true 반환' },
          { id: 'backtrack', label: 'visited[v] = true → 재귀 → visited[v] = false' },
          { id: 'output', label: '하나라도 true면 1, 모두 false면 0 출력' },
        ],
        correct_order: ['build_graph', 'iterate_starts', 'dfs_depth', 'check_depth', 'backtrack', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'must_backtrack_visited',
          'depth_5_means_5_nodes',
          'early_termination_on_found',
          'try_all_start_nodes',
          'N_less_than_5_impossible',
          'disconnected_graph',
        ],
        required_answers: ['must_backtrack_visited', 'depth_5_means_5_nodes', 'try_all_start_nodes'],
        recommended_answers: ['early_termination_on_found', 'N_less_than_5_impossible'],
        optional_answers: ['disconnected_graph'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N*M)', 'O(N^5)', 'O(N!)', 'O(N+M)'],
          accepted_answers: ['O(N*M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N+M)', 'O(N^2)', 'O(N)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'depth_limited_to_5',
            'each_start_DFS_bounded',
            'adjacency_list_stored',
            'backtracking_limits_branching',
            'brute_force_is_N5',
          ],
          accepted_answers: ['depth_limited_to_5', 'each_start_DFS_bounded', 'adjacency_list_stored'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dfs_backtrack_depth5',
        label: '모든 시작점에서 DFS + 백트래킹, 깊이 5 도달 시 true',
        pattern_analysis_answer: 'dfs_backtracking',
        required_strategy_tags: ['DFS_from_every_node', 'track_depth_stop_at_5', 'backtrack_visited_on_return', 'early_exit_on_found'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_backtrack',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'must_backtrack_visited' },
        ],
        feedback:
          '방문 배열을 복원(backtrack)하지 않으면 한 번 방문한 노드를 다른 경로에서 사용할 수 없습니다. 예: A-B-C 경로 탐색 후 B를 방문 해제하지 않으면 D-B-E 경로를 시도할 수 없습니다.',
      },
      {
        tag: 'single_start',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'try_all_start_nodes' },
        ],
        feedback:
          '한 시작점에서만 DFS를 하면 다른 연결 요소에 경로가 있는 경우를 놓칩니다. 모든 정점을 시작점으로 시도해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '모든 정점에서 DFS 시작. 깊이 5 도달 시 true. 백트래킹으로 visited 복원하여 다른 경로도 탐색.',
      mentor_hint: '백트래킹의 핵심: visited[v] = true → 재귀 호출 → visited[v] = false. 이 패턴을 반사적으로 사용할 수 있어야 한다.',
      pattern_trigger: '"특정 길이의 단순 경로가 존재하는가"가 보이면 → DFS + 백트래킹 + 깊이 제한을 떠올려라.',
      why_it_works: '깊이가 5로 제한되므로 각 시작점에서의 DFS는 매우 얕다. N개 시작점 × 제한된 탐색으로 전체 시간이 충분히 작다. 백트래킹으로 모든 가능한 경로를 빠짐없이 탐색한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1167 — 트리의 지름
  // ──────────────────────────────────────────────────────
  {
    id: 'b001167-boj',
    title: '트리의 지름',
    difficulty: 'medium',
    domain: 'tree_diameter',
    summary: '가중 트리의 지름(가장 먼 두 노드 거리)을 BFS/DFS 2회로 구하는 문제',
    tags: ['dfs', 'bfs', 'tree', 'graph'],
    input_type: 'weighted_tree',
    output_type: 'single_value',
    constraints: {
      weighted_edges: true,
      tree_structure: true,
      input_size_hint: 'V <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'minimum_steps', 'boolean_existence', 'traversal_order'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'weighted_tree',
            'find_maximum_distance',
            'diameter_of_tree',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['weighted_tree', 'find_maximum_distance', 'diameter_of_tree'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'tree_diameter_via_two_BFS',
            'farthest_pair_distance_in_tree',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['two_bfs_tree_diameter', 'all_pairs_shortest', 'dfs_single', 'dijkstra', 'dp_on_tree', 'brute_force'],
          accepted_answers: ['two_bfs_tree_diameter'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'farthest_from_any_node_is_diameter_endpoint',
            'two_traversals_suffice',
            'all_pairs_is_V_squared',
            'tree_property_unique_path',
            'need_shortest_path',
          ],
          accepted_answers: ['farthest_from_any_node_is_diameter_endpoint', 'two_traversals_suffice', 'tree_property_unique_path'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['weighted_graph_traversal', 'distance_array', 'input_parsing', 'dp_on_tree', 'memoization'],
          accepted_answers: ['weighted_graph_traversal', 'distance_array', 'input_parsing'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['weighted_adjacency_list', 'distance_array', 'queue_or_stack', 'priority_queue', 'dp_array'],
          accepted_answers: ['weighted_adjacency_list', 'distance_array', 'queue_or_stack'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'bfs_from_any_node_find_u',
            'bfs_from_u_find_v_and_diameter',
            'dfs_two_passes',
            'all_pairs_bfs',
            'dp_rooting',
          ],
          accepted_answers: ['bfs_from_any_node_find_u', 'bfs_from_u_find_v_and_diameter'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_tree', label: '가중 인접 리스트 구성 (입력 파싱 주의: -1 종료)' },
          { id: 'bfs1', label: '임의의 노드(예: 1번)에서 BFS/DFS로 가장 먼 노드 u 찾기' },
          { id: 'reset_dist', label: '거리 배열 초기화' },
          { id: 'bfs2', label: 'u에서 BFS/DFS로 가장 먼 노드 v와 거리 찾기' },
          { id: 'output', label: 'dist(u, v) 출력 = 트리의 지름' },
        ],
        correct_order: ['build_tree', 'bfs1', 'reset_dist', 'bfs2', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'two_traversals_not_one',
          'weighted_edges_not_hop_count',
          'input_parsing_ends_with_minus_1',
          'reset_distance_between_traversals',
          'V_equals_2_diameter_is_edge_weight',
          'single_node_diameter_0',
        ],
        required_answers: ['two_traversals_not_one', 'weighted_edges_not_hop_count', 'input_parsing_ends_with_minus_1'],
        recommended_answers: ['reset_distance_between_traversals'],
        optional_answers: ['V_equals_2_diameter_is_edge_weight', 'single_node_diameter_0'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(V)', 'O(V^2)', 'O(VlogV)', 'O(V+E)'],
          accepted_answers: ['O(V)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(V)', 'O(V^2)', 'O(VlogV)'],
          accepted_answers: ['O(V)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'two_BFS_each_O_V',
            'tree_has_V_minus_1_edges',
            'distance_array_size_V',
            'adjacency_list_size_V',
            'all_pairs_is_V_squared',
          ],
          accepted_answers: ['two_BFS_each_O_V', 'tree_has_V_minus_1_edges', 'distance_array_size_V'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'two_bfs',
        label: 'BFS 2회: 임의→최원점 u → u→최원점 v, dist(u,v) = 지름',
        pattern_analysis_answer: 'two_bfs_tree_diameter',
        required_strategy_tags: ['bfs_from_any_node_find_u', 'bfs_from_u_find_v_and_diameter'],
      },
    ],

    common_mistakes: [
      {
        tag: 'single_bfs',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'two_traversals_not_one' },
        ],
        feedback:
          'BFS 1회만 수행하면 시작점이 지름의 끝점이 아닐 수 있어 오답입니다. 첫 BFS로 최원점을 찾고, 그 점에서 두 번째 BFS로 지름을 구해야 합니다.',
      },
      {
        tag: 'ignore_weight',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'weighted_edges_not_hop_count' },
        ],
        feedback:
          '간선에 가중치가 있으므로 단순 간선 수가 아닌 가중치 합으로 거리를 계산해야 합니다. 가중치를 무시하면 답이 틀립니다.',
      },
    ],

    review_notes: {
      core_takeaway: '트리 지름 = BFS 2회. 임의 노드 → 최원점 u → u에서 최원점 v. dist(u,v)가 지름.',
      mentor_hint: '"왜 첫 BFS의 최원점이 지름의 끝점인가?"를 증명할 수 있어야 한다. 귀류법: 최원점이 지름 위에 없다면 더 긴 경로가 존재하여 모순.',
      pattern_trigger: '"트리의 지름" 또는 "트리에서 가장 먼 두 노드"가 보이면 → BFS/DFS 2회를 떠올려라.',
      why_it_works: '트리에서 임의 노드의 최원점은 반드시 지름의 한 끝점이다(트리의 성질). 그 끝점에서 다시 최원점을 찾으면 지름의 다른 끝점이 되어 정확한 지름을 구할 수 있다.',
    },
  },
];
