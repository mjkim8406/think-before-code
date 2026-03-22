import type { ProblemV2 } from '../types';

export const TREE_V2: ProblemV2[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1068 — 트리
  // ──────────────────────────────────────────────────────
  {
    id: 'b001068-boj',
    title: '트리',
    difficulty: 'medium',
    domain: 'tree',
    summary: '트리에서 노드 하나를 삭제한 뒤 남은 리프 노드의 수를 구하는 문제',
    tags: ['tree', 'dfs', 'graph', 'recursion'],
    input_type: 'parent_array',
    output_type: 'single_value',
    constraints: {
      node_deletion: true,
      subtree_removal: true,
      input_size_hint: 'N <= 50',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['leaf_count_after_deletion', 'tree_depth', 'traversal_order', 'subtree_size', 'single_value'],
          accepted_answers: ['leaf_count_after_deletion'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'parent_array_given',
            'root_parent_is_minus_one',
            'node_to_delete_given',
            'adjacency_list_given',
            'sorted_data',
          ],
          accepted_answers: ['parent_array_given', 'root_parent_is_minus_one', 'node_to_delete_given'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_leaves_after_subtree_deletion',
            'tree_node_deletion_leaf_counting',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dfs_on_tree', 'bfs_level_order', 'segment_tree', 'binary_lifting', 'union_find', 'greedy'],
          accepted_answers: ['dfs_on_tree'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'subtree_must_be_removed',
            'leaf_counting_requires_traversal',
            'parent_to_children_conversion',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['subtree_must_be_removed', 'leaf_counting_requires_traversal', 'parent_to_children_conversion'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['adjacency_list_construction', 'recursion', 'visited_array', 'memoization', 'two_pointer'],
          accepted_answers: ['adjacency_list_construction', 'recursion'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'parent_array', 'visited_array', 'stack', 'queue'],
          accepted_answers: ['adjacency_list', 'parent_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'build_adj_from_parent_array',
            'dfs_skip_deleted_node',
            'count_childless_nodes_as_leaf',
            'bfs_level_order_traversal',
            'mark_deleted_subtree_first',
          ],
          accepted_answers: ['build_adj_from_parent_array', 'dfs_skip_deleted_node', 'count_childless_nodes_as_leaf'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_adj', label: '부모 배열로 인접 리스트(부모→자식) 구성' },
          { id: 'find_root', label: '부모가 -1인 노드를 루트로 설정' },
          { id: 'check_root_deleted', label: '루트가 삭제 대상이면 답은 0' },
          { id: 'dfs_skip', label: '루트부터 DFS, 삭제 노드를 만나면 탐색 중단' },
          { id: 'count_leaves', label: '자식이 없거나 모든 자식이 삭제된 노드를 리프로 카운팅' },
        ],
        correct_order: ['build_adj', 'find_root', 'check_root_deleted', 'dfs_skip', 'count_leaves'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'root_deleted_answer_zero',
          'deleted_node_parent_becomes_leaf',
          'subtree_fully_removed',
          'single_node_tree',
          'leaf_node_deleted',
          'parent_minus_one_is_root',
        ],
        required_answers: ['root_deleted_answer_zero', 'deleted_node_parent_becomes_leaf', 'subtree_fully_removed'],
        recommended_answers: ['single_node_tree'],
        optional_answers: ['leaf_node_deleted', 'parent_minus_one_is_root'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(logN)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(1)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'visit_each_node_once',
            'adjacency_list_size_N',
            'recursion_stack_depth_N',
            'segment_tree_4N',
            'binary_search_logN',
          ],
          accepted_answers: ['visit_each_node_once', 'adjacency_list_size_N', 'recursion_stack_depth_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dfs_skip_deleted',
        label: 'DFS로 삭제 노드 서브트리 건너뛰기',
        pattern_analysis_answer: 'dfs_on_tree',
        required_strategy_tags: ['build_adj_from_parent_array', 'dfs_skip_deleted_node', 'count_childless_nodes_as_leaf'],
      },
    ],

    common_mistakes: [
      {
        tag: 'forget_parent_becomes_leaf',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'deleted_node_parent_becomes_leaf' },
        ],
        feedback:
          '삭제 노드가 유일한 자식이면 부모가 새로운 리프가 됩니다. 삭제 후 자식이 없어진 노드를 리프로 카운팅해야 합니다.',
      },
      {
        tag: 'forget_root_deletion',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'root_deleted_answer_zero' },
        ],
        feedback:
          '루트 노드를 삭제하면 전체 트리가 제거되어 리프 수가 0입니다. 이 경우를 별도로 처리해야 합니다.',
      },
      {
        tag: 'only_delete_node_not_subtree',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'subtree_fully_removed' },
        ],
        feedback:
          '삭제 노드만 제거하고 자손은 남기면 오답입니다. 삭제 노드와 모든 자손을 함께 제거해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '부모 배열로 인접 리스트를 구성하고 DFS로 순회하되 삭제 노드를 만나면 서브트리 탐색을 중단. 자식이 없는 노드를 리프로 카운팅.',
      mentor_hint: '삭제로 인해 부모가 새 리프가 되는 경우가 가장 흔한 실수 포인트다. "유일한 자식이 삭제되면 부모가 리프"를 항상 확인하라.',
      pattern_trigger: '"트리에서 노드 삭제 후 리프 카운팅"이 보이면 → DFS + 삭제 노드 스킵 + 자식 없는 노드 카운팅을 떠올려라.',
      why_it_works: 'DFS로 루트부터 탐색하되 삭제 노드에서 중단하면 서브트리 전체가 자연스럽게 제외된다. 남은 노드 중 자식이 없는 것이 리프이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1991 — 트리 순회
  // ──────────────────────────────────────────────────────
  {
    id: 'b001991-boj',
    title: '트리 순회',
    difficulty: 'easy',
    domain: 'tree',
    summary: '이진 트리의 전위, 중위, 후위 순회 결과를 각각 출력하는 기본 구현 문제',
    tags: ['tree', 'recursion', 'dfs'],
    input_type: 'binary_tree_nodes',
    output_type: 'traversal_order',
    constraints: {
      binary_tree: true,
      root_is_A: true,
      input_size_hint: 'N <= 26',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['traversal_order', 'tree_depth', 'single_value', 'count', 'boolean_existence'],
          accepted_answers: ['traversal_order'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'binary_tree_with_left_right',
            'root_is_always_A',
            'dot_means_no_child',
            'three_traversals_required',
            'sorted_data',
          ],
          accepted_answers: ['binary_tree_with_left_right', 'root_is_always_A', 'dot_means_no_child', 'three_traversals_required'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'output_preorder_inorder_postorder',
            'basic_binary_tree_traversal',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['recursive_tree_traversal', 'bfs_level_order', 'segment_tree', 'binary_search', 'dp_on_tree', 'greedy'],
          accepted_answers: ['recursive_tree_traversal'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'three_traversal_orders_requested',
            'binary_tree_structure',
            'recursive_definition_of_traversals',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['three_traversal_orders_requested', 'binary_tree_structure', 'recursive_definition_of_traversals'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['hashmap_storage', 'recursion', 'stack_based_iteration', 'memoization', 'two_pointer'],
          accepted_answers: ['hashmap_storage', 'recursion'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['hashmap_node_to_children', 'array_based_tree', 'adjacency_list', 'stack', 'queue'],
          accepted_answers: ['hashmap_node_to_children'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'store_left_right_in_map',
            'recursive_preorder_root_left_right',
            'recursive_inorder_left_root_right',
            'recursive_postorder_left_right_root',
            'iterative_with_stack',
          ],
          accepted_answers: ['store_left_right_in_map', 'recursive_preorder_root_left_right', 'recursive_inorder_left_root_right', 'recursive_postorder_left_right_root'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'parse_input', label: '입력을 파싱하여 각 노드의 (왼쪽, 오른쪽) 자식을 맵에 저장' },
          { id: 'handle_dot', label: '.은 null로 처리' },
          { id: 'run_preorder', label: '전위 순회: 현재 → 왼쪽 → 오른쪽' },
          { id: 'run_inorder', label: '중위 순회: 왼쪽 → 현재 → 오른쪽' },
          { id: 'run_postorder', label: '후위 순회: 왼쪽 → 오른쪽 → 현재' },
        ],
        correct_order: ['parse_input', 'handle_dot', 'run_preorder', 'run_inorder', 'run_postorder'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'dot_means_null_child',
          'traversal_order_must_be_exact',
          'root_always_A',
          'single_node_tree',
          'full_binary_tree',
          'N_equals_1_output_A_three_times',
        ],
        required_answers: ['dot_means_null_child', 'traversal_order_must_be_exact', 'root_always_A'],
        recommended_answers: ['single_node_tree'],
        optional_answers: ['full_binary_tree', 'N_equals_1_output_A_three_times'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(3N)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(1)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_traversal_visits_all_nodes_once',
            'map_stores_N_entries',
            'recursion_depth_at_most_N',
            'three_traversals_but_each_O_N',
            'adjacency_matrix_is_N2',
          ],
          accepted_answers: ['each_traversal_visits_all_nodes_once', 'map_stores_N_entries', 'recursion_depth_at_most_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'recursive_three_traversals',
        label: '맵에 자식 저장 후 재귀로 세 가지 순회',
        pattern_analysis_answer: 'recursive_tree_traversal',
        required_strategy_tags: ['store_left_right_in_map', 'recursive_preorder_root_left_right', 'recursive_inorder_left_root_right', 'recursive_postorder_left_right_root'],
      },
    ],

    common_mistakes: [
      {
        tag: 'wrong_traversal_order',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'recursive_preorder_root_left_right' },
        ],
        feedback:
          '전위(루트-왼-오), 중위(왼-루트-오), 후위(왼-오-루트) 순서를 혼동하면 출력이 틀립니다. 각 순회의 "현재 노드 방문 시점"을 정확히 구분하세요.',
      },
      {
        tag: 'no_null_handling',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'dot_means_null_child' },
        ],
        feedback:
          '자식이 .인 경우 null로 처리하지 않으면 존재하지 않는 자식을 탐색하여 무한 재귀 또는 런타임 에러가 발생합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '각 노드의 왼쪽/오른쪽 자식을 맵에 저장. 전위(루트-왼-오), 중위(왼-루트-오), 후위(왼-오-루트) 순서로 재귀 호출.',
      mentor_hint: '순회 순서가 헷갈리면 "루트를 언제 방문하느냐"로 기억하라. pre=먼저, in=중간, post=나중.',
      pattern_trigger: '"이진 트리 순회" 또는 "전위/중위/후위"가 보이면 → 맵에 자식 저장 + 재귀 순회 함수 3개를 떠올려라.',
      why_it_works: '재귀의 호출 순서만 바꾸면 세 가지 순회를 자연스럽게 구현할 수 있다. 각 노드를 정확히 한 번 방문하므로 O(N).',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 10868 — 최솟값
  // ──────────────────────────────────────────────────────
  {
    id: 'b010868-boj',
    title: '최솟값',
    difficulty: 'medium',
    domain: 'segment_tree',
    summary: 'N개의 정수에서 M개의 구간 최솟값 쿼리를 세그먼트 트리로 처리하는 문제',
    tags: ['segment-tree', 'tree', 'range-query'],
    input_type: 'integer_array_with_queries',
    output_type: 'multiple_values',
    constraints: {
      no_update_queries: true,
      range_minimum_query: true,
      input_size_hint: 'N, M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['range_minimum', 'range_sum', 'single_value', 'count', 'boolean_existence'],
          accepted_answers: ['range_minimum'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'static_array_no_update',
            'multiple_range_queries',
            'large_N_and_M',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['static_array_no_update', 'multiple_range_queries', 'large_N_and_M'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'range_minimum_query_with_segment_tree',
            'static_rmq_problem',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['segment_tree', 'sparse_table', 'prefix_sum', 'brute_force', 'binary_search', 'dp_bottom_up'],
          accepted_answers: ['segment_tree'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'multiple_range_queries',
            'log_N_per_query_needed',
            'brute_force_NM_too_slow',
            'segment_tree_is_general_purpose',
            'need_shortest_path',
          ],
          accepted_answers: ['multiple_range_queries', 'log_N_per_query_needed', 'brute_force_NM_too_slow', 'segment_tree_is_general_purpose'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['sparse_table_for_static_rmq', 'divide_and_conquer', 'sqrt_decomposition', 'memoization', 'two_pointer'],
          accepted_answers: ['sparse_table_for_static_rmq', 'divide_and_conquer'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['segment_tree_array', 'sparse_table', 'prefix_min_array', 'heap', 'stack'],
          accepted_answers: ['segment_tree_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'build_segment_tree_bottom_up',
            'query_range_min_log_N',
            'identity_element_INF',
            'brute_force_each_query',
            'sort_then_binary_search',
          ],
          accepted_answers: ['build_segment_tree_bottom_up', 'query_range_min_log_N', 'identity_element_INF'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_array', label: 'N개의 정수를 입력받아 배열 저장' },
          { id: 'build_tree', label: '세그먼트 트리 빌드 (각 노드에 구간 최솟값 저장)' },
          { id: 'process_query', label: '각 쿼리마다 구간 [a, b]의 최솟값을 세그먼트 트리로 조회' },
          { id: 'output_result', label: '각 쿼리 결과 출력' },
        ],
        correct_order: ['read_array', 'build_tree', 'process_query', 'output_result'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'tree_array_size_4N',
          'leaf_init_with_INF',
          'one_indexed_vs_zero_indexed',
          'query_range_fully_outside_returns_INF',
          'single_element_range',
          'all_elements_same',
        ],
        required_answers: ['tree_array_size_4N', 'leaf_init_with_INF', 'one_indexed_vs_zero_indexed'],
        recommended_answers: ['query_range_fully_outside_returns_INF'],
        optional_answers: ['single_element_range', 'all_elements_same'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+MlogN)', 'O(NM)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N+MlogN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'build_is_O_N',
            'each_query_is_O_logN',
            'tree_size_is_4N_linear',
            'brute_force_is_NM',
            'sparse_table_is_NlogN_space',
          ],
          accepted_answers: ['build_is_O_N', 'each_query_is_O_logN', 'tree_size_is_4N_linear'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'segment_tree_rmq',
        label: '세그먼트 트리 구간 최솟값 쿼리',
        pattern_analysis_answer: 'segment_tree',
        required_strategy_tags: ['build_segment_tree_bottom_up', 'query_range_min_log_N', 'identity_element_INF'],
      },
    ],

    common_mistakes: [
      {
        tag: 'brute_force_tle',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'brute_force' },
        ],
        feedback:
          '매 쿼리마다 구간을 순회하면 O(NM) = 10^10으로 시간 초과입니다. 세그먼트 트리로 O(log N) 쿼리를 구현해야 합니다.',
      },
      {
        tag: 'wrong_identity',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'leaf_init_with_INF' },
        ],
        feedback:
          '세그먼트 트리의 빈 리프를 INF로 초기화하지 않으면 최솟값이 0이나 쓰레기 값으로 계산됩니다. 최솟값의 항등원은 INF입니다.',
      },
      {
        tag: 'index_off_by_one',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'one_indexed_vs_zero_indexed' },
        ],
        feedback:
          '1-indexed 입력을 0-indexed 배열에 매핑할 때 인덱스를 잘못 변환하면 쿼리 결과가 틀립니다.',
      },
    ],

    review_notes: {
      core_takeaway: '세그먼트 트리를 빌드하여 각 노드에 구간 최솟값 저장. 빌드 O(N), 쿼리 O(log N). 항등원은 INF.',
      mentor_hint: '세그먼트 트리의 "항등원"을 결합 연산에 맞게 설정하는 것이 핵심이다. 최솟값=INF, 최댓값=-INF, 합=0, 곱=1.',
      pattern_trigger: '"구간 최솟값/최댓값 쿼리가 다수"이면 → 세그먼트 트리 또는 Sparse Table을 떠올려라.',
      why_it_works: '세그먼트 트리는 구간을 재귀적으로 반으로 나누어 각 노드에 구간 정보를 저장한다. 쿼리 시 관련 노드만 방문하므로 O(log N).',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11437 — LCA
  // ──────────────────────────────────────────────────────
  {
    id: 'b011437-boj',
    title: 'LCA',
    difficulty: 'medium',
    domain: 'tree',
    summary: '트리에서 두 노드의 최소 공통 조상(LCA)을 나이브하게 구하는 문제',
    tags: ['tree', 'lca', 'dfs', 'bfs'],
    input_type: 'tree_edges_with_queries',
    output_type: 'multiple_values',
    constraints: {
      naive_lca_possible: true,
      root_is_one: true,
      input_size_hint: 'N <= 50000, M <= 10000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['lowest_common_ancestor', 'tree_depth', 'traversal_order', 'single_value', 'count'],
          accepted_answers: ['lowest_common_ancestor'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'rooted_tree_with_edges',
            'multiple_lca_queries',
            'small_enough_for_naive',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['rooted_tree_with_edges', 'multiple_lca_queries', 'small_enough_for_naive'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_LCA_for_multiple_queries',
            'naive_LCA_with_depth_matching',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['naive_lca', 'binary_lifting', 'euler_tour_rmq', 'dfs_bfs_standard', 'segment_tree', 'union_find'],
          accepted_answers: ['naive_lca'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'N_M_small_enough_for_naive',
            'depth_matching_then_climb',
            'lca_query_problem',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['N_M_small_enough_for_naive', 'depth_matching_then_climb', 'lca_query_problem'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bfs_for_depth_and_parent', 'dfs_for_depth_and_parent', 'binary_lifting_upgrade', 'memoization', 'two_pointer'],
          accepted_answers: ['bfs_for_depth_and_parent', 'dfs_for_depth_and_parent'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'parent_array', 'depth_array', 'queue_for_bfs', 'segment_tree'],
          accepted_answers: ['adjacency_list', 'parent_array', 'depth_array', 'queue_for_bfs'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'bfs_from_root_for_depth_parent',
            'match_depth_by_climbing',
            'climb_together_until_same',
            'binary_lifting_table',
            'euler_tour_plus_rmq',
          ],
          accepted_answers: ['bfs_from_root_for_depth_parent', 'match_depth_by_climbing', 'climb_together_until_same'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_adj', label: '인접 리스트 구성 (양방향)' },
          { id: 'bfs_depth_parent', label: '루트(1번)부터 BFS로 depth, parent 배열 계산' },
          { id: 'match_depth', label: '깊이가 깊은 쪽을 먼저 올려 깊이 맞추기' },
          { id: 'climb_together', label: '두 노드가 같아질 때까지 동시에 부모로 올리기' },
          { id: 'output_lca', label: '만나는 노드가 LCA — 출력' },
        ],
        correct_order: ['build_adj', 'bfs_depth_parent', 'match_depth', 'climb_together', 'output_lca'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'match_depth_before_climbing',
          'both_climb_when_depth_equal',
          'one_node_is_ancestor_of_other',
          'root_depth_is_zero',
          'same_node_query',
          'undirected_edges_bidirectional',
        ],
        required_answers: ['match_depth_before_climbing', 'both_climb_when_depth_equal', 'one_node_is_ancestor_of_other'],
        recommended_answers: ['root_depth_is_zero', 'undirected_edges_bidirectional'],
        optional_answers: ['same_node_query'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+MN)', 'O(NlogN+MlogN)', 'O(N^2)', 'O(NM)'],
          accepted_answers: ['O(N+MN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'bfs_preprocessing_O_N',
            'each_query_worst_case_O_N',
            'parent_and_depth_arrays_O_N',
            'binary_lifting_NlogN_space',
            'adjacency_list_O_N',
          ],
          accepted_answers: ['bfs_preprocessing_O_N', 'each_query_worst_case_O_N', 'parent_and_depth_arrays_O_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'naive_lca_climb',
        label: 'BFS로 깊이/부모 계산 후 나이브 LCA',
        pattern_analysis_answer: 'naive_lca',
        required_strategy_tags: ['bfs_from_root_for_depth_parent', 'match_depth_by_climbing', 'climb_together_until_same'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_depth_matching',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'match_depth_before_climbing' },
        ],
        feedback:
          '깊이를 맞추지 않고 바로 올리면 한쪽이 먼저 루트에 도달하여 LCA를 놓칩니다. 반드시 깊이를 맞춘 뒤 동시에 올려야 합니다.',
      },
      {
        tag: 'forget_ancestor_case',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'one_node_is_ancestor_of_other' },
        ],
        feedback:
          '깊이를 맞춘 후 두 노드가 이미 같으면 그 노드가 LCA입니다. 이 경우를 처리하지 않으면 불필요하게 올라가 오답이 됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'BFS로 depth, parent를 전처리. LCA 쿼리 시 깊이 맞추기 → 동시에 올리기. N, M이 작으면 나이브 O(N)도 가능.',
      mentor_hint: '깊이를 맞춘 직후 "두 노드가 같은지" 체크를 빠뜨리는 것이 가장 흔한 실수다. 한쪽이 다른 쪽의 조상일 때 발생한다.',
      pattern_trigger: '"두 노드의 LCA를 구하시오"가 보이면 → 깊이 맞추기 + 동시 올리기를 떠올려라. N이 크면 Binary Lifting으로 업그레이드.',
      why_it_works: '깊이를 맞추면 두 노드가 같은 레벨에 있게 되고, 동시에 한 칸씩 올리면 반드시 LCA에서 만난다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11438 — LCA 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b011438-boj',
    title: 'LCA 2',
    difficulty: 'hard',
    domain: 'tree',
    summary: 'Binary Lifting을 이용하여 대규모 트리에서 LCA를 O(log N)에 구하는 문제',
    tags: ['tree', 'lca', 'sparse-table', 'binary-lifting'],
    input_type: 'tree_edges_with_queries',
    output_type: 'multiple_values',
    constraints: {
      binary_lifting_required: true,
      root_is_one: true,
      input_size_hint: 'N, M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['lowest_common_ancestor', 'tree_depth', 'traversal_order', 'single_value', 'count'],
          accepted_answers: ['lowest_common_ancestor'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'rooted_tree_with_edges',
            'large_N_and_M_naive_TLE',
            'multiple_lca_queries',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['rooted_tree_with_edges', 'large_N_and_M_naive_TLE', 'multiple_lca_queries'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'efficient_LCA_with_binary_lifting',
            'LCA_log_N_per_query',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['binary_lifting', 'naive_lca', 'euler_tour_rmq', 'segment_tree', 'dfs_bfs_standard', 'union_find'],
          accepted_answers: ['binary_lifting'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'naive_O_N_per_query_TLE',
            'binary_lifting_O_logN_per_query',
            'preprocess_2k_ancestors',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['naive_O_N_per_query_TLE', 'binary_lifting_O_logN_per_query', 'preprocess_2k_ancestors'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['dp_on_ancestors', 'bfs_dfs_preprocessing', 'euler_tour_alternative', 'memoization', 'two_pointer'],
          accepted_answers: ['dp_on_ancestors', 'bfs_dfs_preprocessing'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['parent_2d_array', 'depth_array', 'adjacency_list', 'segment_tree', 'queue'],
          accepted_answers: ['parent_2d_array', 'depth_array', 'adjacency_list'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dfs_bfs_for_depth_parent0',
            'fill_dp_table_parent_v_k',
            'binary_decompose_depth_diff',
            'climb_from_large_k',
            'naive_one_step_climb',
          ],
          accepted_answers: ['dfs_bfs_for_depth_parent0', 'fill_dp_table_parent_v_k', 'binary_decompose_depth_diff', 'climb_from_large_k'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_adj', label: '인접 리스트 구성' },
          { id: 'bfs_depth_parent0', label: 'BFS/DFS로 depth와 parent[v][0] 계산' },
          { id: 'fill_dp', label: 'parent[v][k] = parent[parent[v][k-1]][k-1]로 DP 테이블 채우기' },
          { id: 'match_depth_binary', label: '깊이 차이를 이진 분해하여 2^k씩 점프로 깊이 맞추기' },
          { id: 'check_same', label: '깊이를 맞춘 후 같은 노드이면 바로 반환' },
          { id: 'climb_binary', label: '큰 k부터 parent[a][k] != parent[b][k]이면 함께 점프' },
          { id: 'return_parent', label: 'parent[a][0] 반환 (LCA)' },
        ],
        correct_order: ['build_adj', 'bfs_depth_parent0', 'fill_dp', 'match_depth_binary', 'check_same', 'climb_binary', 'return_parent'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'LOG_size_ceil_log2_N',
          'check_same_after_depth_match',
          'climb_from_largest_k_down',
          'dp_table_boundary_check',
          'one_node_is_ancestor',
          'root_parent_is_self_or_zero',
        ],
        required_answers: ['LOG_size_ceil_log2_N', 'check_same_after_depth_match', 'climb_from_largest_k_down'],
        recommended_answers: ['dp_table_boundary_check', 'one_node_is_ancestor'],
        optional_answers: ['root_parent_is_self_or_zero'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(NlogN+MlogN)', 'O(N+MN)', 'O(N^2)', 'O(NM)'],
          accepted_answers: ['O(NlogN+MlogN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(NlogN)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(NlogN)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'dp_table_N_times_logN',
            'each_query_O_logN',
            'bfs_preprocessing_O_N',
            'naive_query_is_O_N',
            'adjacency_list_O_N',
          ],
          accepted_answers: ['dp_table_N_times_logN', 'each_query_O_logN', 'bfs_preprocessing_O_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'binary_lifting_lca',
        label: 'Binary Lifting으로 O(log N) LCA',
        pattern_analysis_answer: 'binary_lifting',
        required_strategy_tags: ['dfs_bfs_for_depth_parent0', 'fill_dp_table_parent_v_k', 'binary_decompose_depth_diff', 'climb_from_large_k'],
      },
    ],

    common_mistakes: [
      {
        tag: 'naive_tle',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'naive_lca' },
        ],
        feedback:
          'N, M = 10^5이면 나이브 LCA(쿼리당 O(N))는 최악 10^10 연산으로 시간 초과입니다. Binary Lifting으로 O(log N)에 해결해야 합니다.',
      },
      {
        tag: 'no_same_check',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'check_same_after_depth_match' },
        ],
        feedback:
          '깊이를 맞춘 후 두 노드가 같은지 확인하지 않으면, 한쪽이 다른 쪽의 조상일 때 불필요하게 올라가 오답이 됩니다.',
      },
      {
        tag: 'wrong_log_size',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'LOG_size_ceil_log2_N' },
        ],
        feedback:
          'LOG 값을 너무 작게 잡으면 배열 범위 초과, 너무 크게 잡으면 메모리 낭비입니다. LOG = 17 (2^17 > 100000) 정도가 적절합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'parent[v][k] = v의 2^k번째 조상을 DP로 전처리. 깊이 차이를 이진 분해하여 점프, 같은 깊이에서 큰 k부터 조상이 다르면 점프.',
      mentor_hint: 'Binary Lifting의 핵심은 "2^k 점프의 DP 점화식"이다. parent[v][k] = parent[parent[v][k-1]][k-1]을 외워두어라.',
      pattern_trigger: '"LCA 쿼리가 많고 N이 크다"면 → Binary Lifting을 떠올려라. 나이브와 달리 전처리 O(N log N), 쿼리 O(log N).',
      why_it_works: '임의의 정수는 2의 거듭제곱의 합으로 표현 가능하므로, 2^k씩 점프하면 최대 log N번의 점프로 원하는 조상에 도달할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11505 — 구간 곱 구하기
  // ──────────────────────────────────────────────────────
  {
    id: 'b011505-boj',
    title: '구간 곱 구하기',
    difficulty: 'hard',
    domain: 'segment_tree',
    summary: '세그먼트 트리로 포인트 업데이트와 구간 곱 쿼리를 모듈러 연산과 함께 처리하는 문제',
    tags: ['segment-tree', 'tree', 'math', 'modular-arithmetic'],
    input_type: 'integer_array_with_updates_and_queries',
    output_type: 'multiple_values',
    constraints: {
      point_update: true,
      range_product_query: true,
      modular_arithmetic: true,
      input_size_hint: 'N <= 1000000, M, K <= 10000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['range_product_mod', 'range_sum', 'range_minimum', 'single_value', 'count'],
          accepted_answers: ['range_product_mod'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'point_update_given',
            'range_product_queries',
            'mod_1e9_plus_7',
            'values_can_be_zero',
            'sorted_data',
          ],
          accepted_answers: ['point_update_given', 'range_product_queries', 'mod_1e9_plus_7', 'values_can_be_zero'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'segment_tree_range_product_with_update',
            'point_update_range_product_mod',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['segment_tree', 'fenwick_tree', 'prefix_product', 'brute_force', 'binary_search', 'dp_bottom_up'],
          accepted_answers: ['segment_tree'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'point_update_and_range_query',
            'fenwick_needs_inverse_but_zero_has_none',
            'brute_force_too_slow',
            'segment_tree_handles_any_associative_op',
            'need_shortest_path',
          ],
          accepted_answers: ['point_update_and_range_query', 'fenwick_needs_inverse_but_zero_has_none', 'brute_force_too_slow', 'segment_tree_handles_any_associative_op'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['modular_arithmetic', 'identity_element_design', 'lazy_propagation', 'memoization', 'two_pointer'],
          accepted_answers: ['modular_arithmetic', 'identity_element_design'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['segment_tree_array', 'fenwick_tree', 'prefix_product_array', 'heap', 'stack'],
          accepted_answers: ['segment_tree_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'build_product_segment_tree',
            'identity_element_is_one',
            'mod_on_every_multiplication',
            'point_update_leaf_to_root',
            'fenwick_with_modular_inverse',
          ],
          accepted_answers: ['build_product_segment_tree', 'identity_element_is_one', 'mod_on_every_multiplication', 'point_update_leaf_to_root'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_array', label: 'N개의 수를 입력' },
          { id: 'build_tree', label: '세그먼트 트리 빌드 (각 노드에 구간 곱 % MOD 저장)' },
          { id: 'process_update', label: '변경 연산: 리프 값 변경 후 부모 노드 갱신' },
          { id: 'process_query', label: '곱 쿼리: 구간을 분할하며 곱 % MOD 반환' },
          { id: 'output_result', label: '각 쿼리 결과 출력' },
        ],
        correct_order: ['read_array', 'build_tree', 'process_update', 'process_query', 'output_result'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'identity_for_product_is_one',
          'mod_every_multiplication',
          'value_zero_makes_product_zero',
          'tree_array_size_4N',
          'long_long_for_multiplication',
          'update_is_replace_not_add',
        ],
        required_answers: ['identity_for_product_is_one', 'mod_every_multiplication', 'value_zero_makes_product_zero'],
        recommended_answers: ['tree_array_size_4N', 'long_long_for_multiplication'],
        optional_answers: ['update_is_replace_not_add'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+(M+K)logN)', 'O(NM)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N+(M+K)logN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'build_O_N',
            'each_update_and_query_O_logN',
            'tree_array_4N_is_linear',
            'brute_force_is_NK',
            'fenwick_same_complexity',
          ],
          accepted_answers: ['build_O_N', 'each_update_and_query_O_logN', 'tree_array_4N_is_linear'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'segment_tree_product',
        label: '세그먼트 트리 구간 곱 + 포인트 업데이트',
        pattern_analysis_answer: 'segment_tree',
        required_strategy_tags: ['build_product_segment_tree', 'identity_element_is_one', 'mod_on_every_multiplication', 'point_update_leaf_to_root'],
      },
    ],

    common_mistakes: [
      {
        tag: 'identity_zero_not_one',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'identity_for_product_is_one' },
        ],
        feedback:
          '구간 곱의 항등원은 1입니다 (합의 항등원은 0). 빈 구간이나 범위 밖의 반환값을 0으로 하면 전체 곱이 0이 됩니다.',
      },
      {
        tag: 'no_mod',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'mod_every_multiplication' },
        ],
        feedback:
          '곱셈마다 MOD를 취하지 않으면 오버플로우가 발생합니다. 모든 곱셈 직후 % 1000000007을 적용해야 합니다.',
      },
      {
        tag: 'fenwick_with_zero',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'fenwick_tree' },
        ],
        feedback:
          '펜윅 트리로 곱을 처리하려면 모듈러 역원이 필요하지만, 값이 0이면 역원이 존재하지 않습니다. 세그먼트 트리를 사용하세요.',
      },
    ],

    review_notes: {
      core_takeaway: '세그먼트 트리에서 합 대신 곱을 저장. 항등원은 1, 모든 곱셈 후 MOD. 포인트 업데이트는 리프→루트 갱신.',
      mentor_hint: '세그먼트 트리 문제에서 "어떤 연산인가"와 "항등원은 무엇인가"를 먼저 확인하라. 합=0, 곱=1, 최솟값=INF, 최댓값=-INF.',
      pattern_trigger: '"구간 곱 + 포인트 업데이트"가 보이면 → 세그먼트 트리(항등원=1, MOD 연산)를 떠올려라. 펜윅은 0 때문에 부적합.',
      why_it_works: '세그먼트 트리는 결합법칙을 만족하는 모든 연산에 적용 가능하다. 곱셈은 결합법칙을 만족하므로 구간 분할 후 병합이 정확하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11725 — 트리의 부모 찾기
  // ──────────────────────────────────────────────────────
  {
    id: 'b011725-boj',
    title: '트리의 부모 찾기',
    difficulty: 'easy',
    domain: 'tree',
    summary: '루트가 1인 트리에서 BFS/DFS로 각 노드의 부모를 구하는 기본 문제',
    tags: ['tree', 'bfs', 'dfs', 'graph'],
    input_type: 'tree_edges',
    output_type: 'parent_array',
    constraints: {
      undirected_tree: true,
      root_is_one: true,
      input_size_hint: 'N <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['parent_of_each_node', 'tree_depth', 'traversal_order', 'single_value', 'count'],
          accepted_answers: ['parent_of_each_node'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'undirected_tree_edges',
            'root_defined_as_node_1',
            'N_minus_1_edges',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['undirected_tree_edges', 'root_defined_as_node_1', 'N_minus_1_edges'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_parent_of_each_node_from_root',
            'bfs_dfs_to_determine_parent',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bfs_dfs_on_tree', 'topological_sort', 'union_find', 'binary_search', 'segment_tree', 'greedy'],
          accepted_answers: ['bfs_dfs_on_tree'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'tree_traversal_from_root',
            'parent_determined_by_visit_order',
            'undirected_edges_need_visited_check',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['tree_traversal_from_root', 'parent_determined_by_visit_order', 'undirected_edges_need_visited_check'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['adjacency_list_construction', 'queue_usage', 'recursion', 'memoization', 'two_pointer'],
          accepted_answers: ['adjacency_list_construction', 'queue_usage'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'parent_array', 'visited_array', 'queue', 'stack'],
          accepted_answers: ['adjacency_list', 'parent_array', 'visited_array', 'queue'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'build_bidirectional_adj',
            'bfs_from_root',
            'set_parent_on_first_visit',
            'dfs_from_root',
            'use_edge_direction_as_parent',
          ],
          accepted_answers: ['build_bidirectional_adj', 'bfs_from_root', 'set_parent_on_first_visit'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_adj', label: '양방향 인접 리스트 구성' },
          { id: 'init_bfs', label: '1번 노드를 큐에 넣고 visited 표시' },
          { id: 'bfs_loop', label: '큐에서 꺼낸 노드의 미방문 인접 노드의 부모를 현재 노드로 설정' },
          { id: 'output', label: '2번부터 N번까지 parent[i] 출력' },
        ],
        correct_order: ['build_adj', 'init_bfs', 'bfs_loop', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'bidirectional_edges',
          'visited_check_to_prevent_backtrack',
          'edge_order_is_not_parent_child_order',
          'output_from_node_2_to_N',
          'adjacency_matrix_memory_overflow',
          'N_equals_2_trivial',
        ],
        required_answers: ['bidirectional_edges', 'visited_check_to_prevent_backtrack', 'edge_order_is_not_parent_child_order'],
        recommended_answers: ['output_from_node_2_to_N'],
        optional_answers: ['adjacency_matrix_memory_overflow', 'N_equals_2_trivial'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(NlogN)', 'O(N^2)', 'O(N+M)'],
          accepted_answers: ['O(N)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(1)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'bfs_visits_each_node_once',
            'adjacency_list_size_2N_minus_2',
            'parent_and_visited_arrays_O_N',
            'adjacency_matrix_is_N2',
            'tree_has_N_minus_1_edges',
          ],
          accepted_answers: ['bfs_visits_each_node_once', 'adjacency_list_size_2N_minus_2', 'parent_and_visited_arrays_O_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'bfs_parent_finding',
        label: 'BFS로 루트부터 탐색하며 부모 기록',
        pattern_analysis_answer: 'bfs_dfs_on_tree',
        required_strategy_tags: ['build_bidirectional_adj', 'bfs_from_root', 'set_parent_on_first_visit'],
      },
    ],

    common_mistakes: [
      {
        tag: 'assume_edge_order_is_parent',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'edge_order_is_not_parent_child_order' },
        ],
        feedback:
          '간선 입력의 첫 번째 노드가 항상 부모라고 가정하면 안 됩니다. 간선은 순서 무관하며, BFS/DFS로 탐색해야 부모가 결정됩니다.',
      },
      {
        tag: 'no_visited_check',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'visited_check_to_prevent_backtrack' },
        ],
        feedback:
          'visited 체크 없이 양방향 간선을 탐색하면 부모 방향으로 역방향 탐색이 일어나 무한 루프에 빠집니다.',
      },
    ],

    review_notes: {
      core_takeaway: '양방향 인접 리스트를 구성하고 루트(1번)부터 BFS. 미방문 인접 노드의 부모를 현재 노드로 기록. O(N).',
      mentor_hint: '"간선 입력 순서 = 부모-자식 순서"라는 가정을 하지 마라. 트리에서 부모는 루트로부터의 탐색으로만 결정된다.',
      pattern_trigger: '"루트가 주어진 트리에서 각 노드의 부모를 구하시오"가 보이면 → BFS/DFS로 루트부터 탐색을 떠올려라.',
      why_it_works: '트리는 사이클이 없으므로 루트에서 BFS/DFS로 탐색하면 각 노드를 정확히 한 번 방문하고, 최초 방문 시의 이전 노드가 부모이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 14425 — 문자열 집합
  // ──────────────────────────────────────────────────────
  {
    id: 'b014425-boj',
    title: '문자열 집합',
    difficulty: 'easy',
    domain: 'trie',
    summary: '트라이 또는 해시 집합으로 문자열 존재 여부를 효율적으로 판별하는 문제',
    tags: ['trie', 'tree', 'hash-map', 'string'],
    input_type: 'string_set_with_queries',
    output_type: 'single_value',
    constraints: {
      membership_check: true,
      lowercase_only: true,
      input_size_hint: 'N, M <= 10000, L <= 500',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['membership_count', 'traversal_order', 'single_value', 'boolean_existence', 'longest_match'],
          accepted_answers: ['membership_count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'string_set_given',
            'query_strings_given',
            'count_matches_in_set',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['string_set_given', 'query_strings_given', 'count_matches_in_set'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_strings_present_in_set',
            'trie_or_hashset_membership_check',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['trie', 'hash_set', 'binary_search_on_sorted', 'brute_force', 'suffix_array', 'dp_on_string'],
          accepted_answers: ['trie'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'string_membership_check',
            'trie_provides_prefix_structure',
            'hashset_also_valid_but_trie_practice',
            'brute_force_NML_too_slow',
            'need_shortest_path',
          ],
          accepted_answers: ['string_membership_check', 'trie_provides_prefix_structure', 'hashset_also_valid_but_trie_practice'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['hash_set_alternative', 'sort_binary_search_alternative', 'prefix_matching', 'memoization', 'two_pointer'],
          accepted_answers: ['hash_set_alternative', 'sort_binary_search_alternative'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['trie_node_with_children_26', 'hash_set', 'sorted_array', 'heap', 'stack'],
          accepted_answers: ['trie_node_with_children_26'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'insert_N_strings_into_trie',
            'mark_end_of_word',
            'search_M_strings_in_trie',
            'insert_into_hashset',
            'sort_and_binary_search',
          ],
          accepted_answers: ['insert_N_strings_into_trie', 'mark_end_of_word', 'search_M_strings_in_trie'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_trie', label: 'N개의 문자열을 트라이에 삽입 (각 끝에 isEnd 표시)' },
          { id: 'search_query', label: 'M개의 쿼리 문자열을 트라이에서 탐색' },
          { id: 'check_end', label: '탐색 완료 시 isEnd가 true이면 카운트 증가' },
          { id: 'output', label: '총 카운트 출력' },
        ],
        correct_order: ['build_trie', 'search_query', 'check_end', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'is_end_flag_required',
          'prefix_only_match_is_wrong',
          'trie_memory_up_to_NL_nodes',
          'empty_string_possible',
          'all_queries_match',
          'no_queries_match',
        ],
        required_answers: ['is_end_flag_required', 'prefix_only_match_is_wrong', 'trie_memory_up_to_NL_nodes'],
        recommended_answers: ['empty_string_possible'],
        optional_answers: ['all_queries_match', 'no_queries_match'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O((N+M)*L)', 'O(NML)', 'O(NlogN)', 'O(N+M)'],
          accepted_answers: ['O((N+M)*L)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(NL)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(NL)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_insert_and_search_O_L',
            'trie_nodes_at_most_NL',
            'hashset_O_1_per_query',
            'brute_force_NML',
            'sorted_search_NlogN_plus_MlogN',
          ],
          accepted_answers: ['each_insert_and_search_O_L', 'trie_nodes_at_most_NL'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'trie_membership',
        label: '트라이 삽입 후 문자열 존재 여부 탐색',
        pattern_analysis_answer: 'trie',
        required_strategy_tags: ['insert_N_strings_into_trie', 'mark_end_of_word', 'search_M_strings_in_trie'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_is_end',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'is_end_flag_required' },
        ],
        feedback:
          'isEnd 플래그 없이 트라이를 탐색하면 접두사만 일치해도 존재한다고 판단합니다. 문자열의 끝을 명시적으로 표시해야 합니다.',
      },
      {
        tag: 'prefix_match_only',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'prefix_only_match_is_wrong' },
        ],
        feedback:
          '쿼리 문자열이 집합 내 문자열의 접두사이거나 그 반대인 경우, isEnd 체크 없이는 오답이 됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: '트라이에 N개 문자열 삽입 (isEnd 표시). M개 쿼리를 트라이에서 탐색하여 isEnd가 true인 것만 카운팅. O((N+M)*L).',
      mentor_hint: '트라이 구현의 핵심은 isEnd 플래그다. 이것을 빠뜨리면 "app"을 삽입했을 때 "ap"도 존재한다고 오판한다.',
      pattern_trigger: '"문자열 집합에서 존재 여부 판별"이 보이면 → 트라이 또는 HashSet을 떠올려라. 면접에서는 트라이가 더 인상적.',
      why_it_works: '트라이는 공통 접두사를 공유하므로 문자열 탐색이 O(L)이다. isEnd로 완전 일치를 확인하여 정확한 멤버십 체크가 가능하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2042 — 구간 합 구하기
  // ──────────────────────────────────────────────────────
  {
    id: 'b002042-boj',
    title: '구간 합 구하기',
    difficulty: 'medium',
    domain: 'segment_tree',
    summary: '세그먼트 트리로 포인트 업데이트와 구간 합 쿼리를 처리하는 기본 문제',
    tags: ['segment-tree', 'tree', 'fenwick-tree', 'prefix-sum'],
    input_type: 'integer_array_with_updates_and_queries',
    output_type: 'multiple_values',
    constraints: {
      point_update: true,
      range_sum_query: true,
      large_value_range: true,
      input_size_hint: 'N <= 1000000, M, K <= 10000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['range_sum', 'range_minimum', 'single_value', 'count', 'boolean_existence'],
          accepted_answers: ['range_sum'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'point_update_given',
            'range_sum_queries',
            'large_N_needs_efficient_structure',
            'values_can_be_very_large',
            'sorted_data',
          ],
          accepted_answers: ['point_update_given', 'range_sum_queries', 'large_N_needs_efficient_structure', 'values_can_be_very_large'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'segment_tree_point_update_range_sum',
            'dynamic_range_sum_with_updates',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['segment_tree', 'fenwick_tree', 'prefix_sum', 'brute_force', 'binary_search', 'dp_bottom_up'],
          accepted_answers: ['segment_tree'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'point_update_and_range_query',
            'prefix_sum_update_is_O_N',
            'brute_force_too_slow',
            'segment_tree_is_general_purpose',
            'fenwick_tree_also_valid',
          ],
          accepted_answers: ['point_update_and_range_query', 'prefix_sum_update_is_O_N', 'brute_force_too_slow', 'segment_tree_is_general_purpose'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['fenwick_tree_alternative', 'prefix_sum_static_only', 'sqrt_decomposition', 'memoization', 'two_pointer'],
          accepted_answers: ['fenwick_tree_alternative', 'prefix_sum_static_only'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['segment_tree_array', 'fenwick_tree', 'prefix_sum_array', 'heap', 'stack'],
          accepted_answers: ['segment_tree_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'build_sum_segment_tree',
            'point_update_leaf_to_root',
            'range_sum_query_log_N',
            'identity_element_is_zero',
            'fenwick_tree_update_query',
          ],
          accepted_answers: ['build_sum_segment_tree', 'point_update_leaf_to_root', 'range_sum_query_log_N', 'identity_element_is_zero'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_array', label: 'N개의 정수를 입력' },
          { id: 'build_tree', label: '세그먼트 트리 빌드 (각 노드에 구간 합 저장)' },
          { id: 'process_update', label: '변경 연산: 리프 값 변경, 차이만큼 부모 갱신 또는 직접 덮어쓰기' },
          { id: 'process_query', label: '합 쿼리: 구간을 분할하며 합 반환' },
          { id: 'output_result', label: '각 쿼리 결과 출력' },
        ],
        correct_order: ['read_array', 'build_tree', 'process_update', 'process_query', 'output_result'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'long_long_for_large_values',
          'tree_array_size_4N',
          'update_is_replace_not_add',
          'one_indexed_vs_zero_indexed',
          'identity_for_sum_is_zero',
          'single_element_range',
        ],
        required_answers: ['long_long_for_large_values', 'tree_array_size_4N', 'update_is_replace_not_add'],
        recommended_answers: ['one_indexed_vs_zero_indexed', 'identity_for_sum_is_zero'],
        optional_answers: ['single_element_range'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+(M+K)logN)', 'O(NM)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N+(M+K)logN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'build_O_N',
            'each_update_and_query_O_logN',
            'tree_array_4N_is_linear',
            'prefix_sum_update_O_N',
            'fenwick_same_complexity',
          ],
          accepted_answers: ['build_O_N', 'each_update_and_query_O_logN', 'tree_array_4N_is_linear'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'segment_tree_range_sum',
        label: '세그먼트 트리 구간 합 + 포인트 업데이트',
        pattern_analysis_answer: 'segment_tree',
        required_strategy_tags: ['build_sum_segment_tree', 'point_update_leaf_to_root', 'range_sum_query_log_N', 'identity_element_is_zero'],
      },
    ],

    common_mistakes: [
      {
        tag: 'int_overflow',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'long_long_for_large_values' },
        ],
        feedback:
          '값의 범위가 -2^63 ~ 2^63-1이므로 int(32비트)로 처리하면 오버플로우가 발생합니다. long long(64비트)을 사용해야 합니다.',
      },
      {
        tag: 'prefix_sum_tle',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'prefix_sum' },
        ],
        feedback:
          '누적합은 업데이트마다 O(N) 재계산이 필요하여 O(NM)이 됩니다. N=10^6이면 시간 초과입니다. 세그먼트 트리를 사용하세요.',
      },
      {
        tag: 'wrong_update_semantics',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'update_is_replace_not_add' },
        ],
        feedback:
          '이 문제의 업데이트는 "값을 v로 변경"입니다. 기존 값과의 차이를 계산하여 반영하거나 리프를 직접 덮어쓰고 재계산해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '세그먼트 트리로 구간 합 저장. 포인트 업데이트는 리프→루트 갱신 O(log N), 구간 합 쿼리 O(log N). long long 필수.',
      mentor_hint: '세그먼트 트리의 "업데이트 의미"를 정확히 파악하라. "값을 v로 변경"이면 diff 계산 또는 직접 덮어쓰기, "v를 더하기"이면 바로 가산.',
      pattern_trigger: '"포인트 업데이트 + 구간 합/최소/최대 쿼리"가 보이면 → 세그먼트 트리를 떠올려라. 펜윅 트리도 합에는 사용 가능.',
      why_it_works: '세그먼트 트리는 구간을 재귀적으로 반분하여 각 노드에 구간 합을 저장한다. 업데이트 시 관련 노드만 갱신하므로 O(log N).',
    },
  },
];
