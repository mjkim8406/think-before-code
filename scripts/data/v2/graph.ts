import type { ProblemV2 } from '../types';

export const GRAPH_V2: ProblemV2[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1043 — 거짓말
  // ──────────────────────────────────────────────────────
  {
    id: 'b001043-boj',
    title: '거짓말',
    difficulty: 'medium',
    domain: 'union_find_truth_propagation',
    summary: 'Union-Find로 같은 파티에 속한 사람들을 묶고, 진실을 아는 그룹이 있는 파티를 제외하여 과장된 이야기를 할 수 있는 파티 수를 구하는 문제',
    tags: ['union-find', 'graph', 'set'],
    input_type: 'party_members',
    output_type: 'count',
    constraints: {
      truth_propagation: true,
      undirected_grouping: true,
      input_size_hint: 'N <= 50, M <= 50',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'boolean_existence', 'single_value', 'traversal_order', 'minimum_cost'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'people_and_parties',
            'truth_knowers_given',
            'transitive_truth_propagation',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['people_and_parties', 'truth_knowers_given', 'transitive_truth_propagation'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_parties_where_lie_is_possible',
            'union_find_truth_group_propagation',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['union_find', 'bfs_dfs', 'topological_sort', 'dijkstra', 'greedy', 'floyd_warshall'],
          accepted_answers: ['union_find'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'same_party_members_form_group',
            'truth_propagation_is_transitive',
            'need_group_membership_query',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['same_party_members_form_group', 'truth_propagation_is_transitive', 'need_group_membership_query'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bfs_propagation', 'set_management', 'party_list_storage', 'memoization', 'two_pointer'],
          accepted_answers: ['bfs_propagation', 'set_management', 'party_list_storage'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['union_find', 'party_member_list', 'truth_set', 'adjacency_list', 'queue'],
          accepted_answers: ['union_find', 'party_member_list', 'truth_set'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'union_same_party_members',
            'check_truth_group_in_party',
            'count_safe_parties',
            'bfs_from_truth_knowers',
            'brute_force_repeat_until_convergence',
          ],
          accepted_answers: ['union_same_party_members', 'check_truth_group_in_party', 'count_safe_parties'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_uf', label: 'Union-Find 초기화' },
          { id: 'read_parties', label: '파티 정보 읽으면서 같은 파티 사람들을 union' },
          { id: 'mark_truth', label: '진실을 아는 사람의 그룹(find) 기록' },
          { id: 'check_parties', label: '각 파티에 진실 그룹과 같은 집합의 사람이 있는지 확인' },
          { id: 'count_result', label: '진실 그룹이 없는 파티 수 출력' },
        ],
        correct_order: ['init_uf', 'read_parties', 'mark_truth', 'check_parties', 'count_result'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'truth_knowers_zero_all_parties_ok',
          'union_all_members_in_same_party',
          'indirect_propagation_through_shared_party',
          'single_person_party',
          'all_parties_have_truth_knowers',
          'person_attends_multiple_parties',
        ],
        required_answers: ['truth_knowers_zero_all_parties_ok', 'union_all_members_in_same_party', 'indirect_propagation_through_shared_party'],
        recommended_answers: ['person_attends_multiple_parties'],
        optional_answers: ['single_person_party', 'all_parties_have_truth_knowers'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(M*N*alpha(N))', 'O(N^2)', 'O(M^2*N)', 'O(NlogN)'],
          accepted_answers: ['O(M*N*alpha(N))'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N+M)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'union_find_nearly_constant_per_op',
            'iterate_all_parties_and_members',
            'store_party_member_lists',
            'adjacency_matrix_not_needed',
          ],
          accepted_answers: ['union_find_nearly_constant_per_op', 'iterate_all_parties_and_members', 'store_party_member_lists'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'union_find_truth_propagation',
        label: 'Union-Find로 파티 그룹 묶기 + 진실 그룹 체크',
        pattern_analysis_answer: 'union_find',
        required_strategy_tags: ['union_same_party_members', 'check_truth_group_in_party', 'count_safe_parties'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_propagation',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'indirect_propagation_through_shared_party' },
        ],
        feedback:
          '진실은 같은 파티를 통해 간접적으로도 전파됩니다. 직접 참석한 파티만 제외하면 간접 전파를 놓칩니다.',
      },
      {
        tag: 'truth_zero_not_handled',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'truth_knowers_zero_all_parties_ok' },
        ],
        feedback:
          '진실을 아는 사람이 0명이면 모든 파티에서 거짓말이 가능합니다. 이 경우를 별도 처리해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '같은 파티에 속한 사람들을 Union-Find로 그룹화하고, 진실 그룹과 같은 집합에 속한 사람이 있는 파티를 제외한다.',
      mentor_hint: 'union 후 find로 비교해야 경로 압축이 적용된 최신 루트를 얻는다. union만 하고 parent를 직접 비교하면 오답이 날 수 있다.',
      pattern_trigger: '"같은 그룹에 속한 적 있으면 정보가 전파된다"가 보이면 → Union-Find 전파를 떠올려라.',
      why_it_works: '같은 파티 참석 관계가 전이적이므로 Union-Find로 연결 요소를 관리하면 O(alpha(N))에 그룹 질의가 가능하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1197 — 최소 스패닝 트리
  // ──────────────────────────────────────────────────────
  {
    id: 'b001197-boj',
    title: '최소 스패닝 트리',
    difficulty: 'medium',
    domain: 'kruskal_mst',
    summary: 'Kruskal 알고리즘으로 간선을 가중치 순 정렬 후 Union-Find로 사이클을 판별하여 MST를 구하는 문제',
    tags: ['mst', 'union-find', 'greedy', 'sorting'],
    input_type: 'weighted_edges',
    output_type: 'single_value',
    constraints: {
      negative_weights_possible: true,
      undirected_graph: true,
      input_size_hint: 'V <= 10000, E <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'traversal_order', 'boolean_existence', 'minimum_steps'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'undirected_weighted_graph',
            'find_minimum_spanning_tree',
            'negative_weights_possible',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['undirected_weighted_graph', 'find_minimum_spanning_tree', 'negative_weights_possible'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_MST_weight_sum',
            'kruskal_or_prim_MST',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['kruskal_mst', 'prim_mst', 'dijkstra', 'bfs_dfs', 'union_find', 'greedy'],
          accepted_answers: ['kruskal_mst'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'connect_all_vertices_minimum_cost',
            'greedy_edge_selection_by_weight',
            'cycle_detection_needed',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['connect_all_vertices_minimum_cost', 'greedy_edge_selection_by_weight', 'cycle_detection_needed'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['edge_sorting', 'union_find_cycle_check', 'early_termination_V_minus_1', 'memoization', 'two_pointer'],
          accepted_answers: ['edge_sorting', 'union_find_cycle_check', 'early_termination_V_minus_1'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['edge_list', 'union_find', 'adjacency_list', 'priority_queue', 'adjacency_matrix'],
          accepted_answers: ['edge_list', 'union_find'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_edges_by_weight',
            'union_find_cycle_detection',
            'select_V_minus_1_edges',
            'prim_with_priority_queue',
            'brute_force_all_spanning_trees',
          ],
          accepted_answers: ['sort_edges_by_weight', 'union_find_cycle_detection', 'select_V_minus_1_edges'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_edges', label: '간선 리스트 입력' },
          { id: 'sort_edges', label: '간선을 가중치 오름차순 정렬' },
          { id: 'init_uf', label: 'Union-Find 초기화' },
          { id: 'iterate_edges', label: '간선을 순서대로 순회하며 사이클이 아니면 선택' },
          { id: 'output_sum', label: '선택된 간선의 가중치 합 출력' },
        ],
        correct_order: ['read_edges', 'sort_edges', 'init_uf', 'iterate_edges', 'output_sum'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'negative_edge_weights',
          'early_stop_after_V_minus_1_edges',
          'path_compression_and_rank',
          'duplicate_edges_between_same_pair',
          'single_vertex_graph',
          'disconnected_graph_not_possible',
        ],
        required_answers: ['negative_edge_weights', 'early_stop_after_V_minus_1_edges', 'path_compression_and_rank'],
        recommended_answers: ['duplicate_edges_between_same_pair'],
        optional_answers: ['single_vertex_graph', 'disconnected_graph_not_possible'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(ElogE)', 'O(V^2)', 'O(V*E)', 'O(E*alpha(V))'],
          accepted_answers: ['O(ElogE)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(V+E)', 'O(V)', 'O(V^2)'],
          accepted_answers: ['O(V+E)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'sorting_dominates_ElogE',
            'union_find_nearly_linear',
            'edge_list_stored',
            'adjacency_matrix_would_be_V2',
          ],
          accepted_answers: ['sorting_dominates_ElogE', 'union_find_nearly_linear', 'edge_list_stored'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'kruskal_mst',
        label: 'Kruskal: 간선 정렬 + Union-Find 사이클 판별',
        pattern_analysis_answer: 'kruskal_mst',
        required_strategy_tags: ['sort_edges_by_weight', 'union_find_cycle_detection', 'select_V_minus_1_edges'],
      },
    ],

    common_mistakes: [
      {
        tag: 'ignore_negative_weight',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'negative_edge_weights' },
        ],
        feedback:
          '간선 가중치가 음수일 수 있습니다. 절댓값이 아닌 실제 값으로 정렬해야 합니다.',
      },
      {
        tag: 'no_early_stop',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'early_stop_after_V_minus_1_edges' },
        ],
        feedback:
          'V-1개 간선을 선택하면 MST가 완성됩니다. 조기 종료하지 않으면 불필요한 간선을 처리하게 됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: '간선을 가중치 순으로 정렬하고, Union-Find로 사이클을 판별하여 V-1개 간선을 선택하면 MST가 된다.',
      mentor_hint: '가중치가 음수일 수 있으므로 항상 실제 값으로 정렬하라. V-1개를 선택하면 바로 종료하여 불필요한 연산을 줄여라.',
      pattern_trigger: '"모든 정점을 최소 비용으로 연결하라"가 보이면 → Kruskal(간선 정렬 + UF) 또는 Prim을 떠올려라.',
      why_it_works: 'Kruskal의 탐욕 선택: 가장 가벼운 간선부터 선택하되 사이클을 만들지 않으면, cut property에 의해 항상 MST에 포함되는 안전한 간선이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1219 — 오민식의 고민
  // ──────────────────────────────────────────────────────
  {
    id: 'b001219-boj',
    title: '오민식의 고민',
    difficulty: 'hard',
    domain: 'bellman_ford_positive_cycle_detection',
    summary: '벨만-포드를 변형하여 최대 수익 경로를 구하고, 양의 사이클이 도착점에 영향을 주는지 BFS로 확인하는 문제',
    tags: ['bellman-ford', 'graph', 'shortest-path', 'negative-cycle'],
    input_type: 'weighted_directed_graph_with_city_income',
    output_type: 'single_value_or_special',
    constraints: {
      positive_cycle_to_destination_check: true,
      unreachable_case: true,
      input_size_hint: 'N <= 100, M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value_or_special', 'count', 'boolean_existence', 'traversal_order', 'minimum_cost'],
          accepted_answers: ['single_value_or_special'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'directed_graph_with_edge_costs',
            'city_income_at_nodes',
            'maximize_profit_start_to_end',
            'infinite_profit_possible',
            'unreachable_destination_possible',
          ],
          accepted_answers: ['directed_graph_with_edge_costs', 'city_income_at_nodes', 'maximize_profit_start_to_end', 'infinite_profit_possible', 'unreachable_destination_possible'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'max_profit_path_with_positive_cycle_detection',
            'bellman_ford_variant_for_longest_path',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bellman_ford_variant', 'dijkstra', 'floyd_warshall', 'bfs_dfs', 'topological_sort', 'dp'],
          accepted_answers: ['bellman_ford_variant'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'negative_edges_after_cost_transform',
            'cycle_detection_needed',
            'cycle_reachability_to_destination',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['negative_edges_after_cost_transform', 'cycle_detection_needed', 'cycle_reachability_to_destination'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bfs_reachability_check', 'cost_transformation', 'negative_infinity_init', 'memoization', 'two_pointer'],
          accepted_answers: ['bfs_reachability_check', 'cost_transformation', 'negative_infinity_init'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['edge_list', 'dist_array', 'queue_for_bfs', 'adjacency_list', 'priority_queue'],
          accepted_answers: ['edge_list', 'dist_array', 'queue_for_bfs'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'transform_cost_to_shortest_path',
            'bellman_ford_N_minus_1_relaxation',
            'detect_cycle_on_Nth_iteration',
            'bfs_check_cycle_reaches_destination',
            'dijkstra_with_negation',
          ],
          accepted_answers: ['transform_cost_to_shortest_path', 'bellman_ford_N_minus_1_relaxation', 'detect_cycle_on_Nth_iteration', 'bfs_check_cycle_reaches_destination'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'transform', label: '간선 비용 = 교통비 - 도착 도시 수입으로 변환' },
          { id: 'init_dist', label: 'dist를 -INF로 초기화, 시작점만 시작 도시 수입으로 설정' },
          { id: 'relax_N_1', label: 'N-1번 모든 간선 완화 (최장 경로)' },
          { id: 'detect_cycle', label: 'N번째 반복에서 갱신되는 정점 수집' },
          { id: 'check_reach', label: '갱신 정점에서 도착점까지 BFS/DFS로 도달 가능 여부 확인' },
          { id: 'output', label: '도착 불가면 gg, 무한 이득이면 Gee, 아니면 최대 수익 출력' },
        ],
        correct_order: ['transform', 'init_dist', 'relax_N_1', 'detect_cycle', 'check_reach', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'cycle_must_reach_destination',
          'start_city_income_included',
          'dist_init_negative_infinity',
          'unreachable_gg_case',
          'multiple_cycles_only_relevant_ones',
          'zero_edges_possible',
        ],
        required_answers: ['cycle_must_reach_destination', 'start_city_income_included', 'dist_init_negative_infinity'],
        recommended_answers: ['unreachable_gg_case', 'multiple_cycles_only_relevant_ones'],
        optional_answers: ['zero_edges_possible'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(V*E)', 'O(V^3)', 'O(E*logV)', 'O(V+E)'],
          accepted_answers: ['O(V*E)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(V+E)', 'O(V)', 'O(V^2)'],
          accepted_answers: ['O(V+E)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'bellman_ford_V_iterations_E_edges',
            'bfs_reachability_V_plus_E',
            'edge_list_and_dist_array',
            'adjacency_matrix_not_needed',
          ],
          accepted_answers: ['bellman_ford_V_iterations_E_edges', 'bfs_reachability_V_plus_E', 'edge_list_and_dist_array'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'bellman_ford_with_cycle_reach',
        label: '벨만-포드 변형 + BFS 도달 가능 여부 확인',
        pattern_analysis_answer: 'bellman_ford_variant',
        required_strategy_tags: ['transform_cost_to_shortest_path', 'bellman_ford_N_minus_1_relaxation', 'detect_cycle_on_Nth_iteration', 'bfs_check_cycle_reaches_destination'],
      },
    ],

    common_mistakes: [
      {
        tag: 'cycle_no_reach_check',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'cycle_must_reach_destination' },
        ],
        feedback:
          '양의 사이클이 존재해도 도착점에 영향을 주지 않으면 Gee가 아닙니다. 사이클에서 도착점까지 도달 가능한지 BFS/DFS로 확인해야 합니다.',
      },
      {
        tag: 'wrong_init',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'dist_init_negative_infinity' },
        ],
        feedback:
          '최대화 문제이므로 dist를 -INF로 초기화해야 합니다. 0이나 INF로 초기화하면 도달 불가능한 정점을 올바르게 판별할 수 없습니다.',
      },
    ],

    review_notes: {
      core_takeaway: '간선 비용을 변환하여 벨만-포드로 최장 경로를 구하고, N번째 반복에서 갱신되는 정점이 도착점에 영향을 주는지 확인한다.',
      mentor_hint: '핵심은 "사이클 존재"가 아니라 "사이클이 도착점에 도달 가능한가"이다. N번째 반복에서 갱신된 정점들로부터 BFS를 돌려라.',
      pattern_trigger: '"음의 간선 + 사이클 검출 + 도달 가능성"이 보이면 → 벨만-포드 + BFS 조합을 떠올려라.',
      why_it_works: '벨만-포드는 N-1번 반복으로 최단(최장) 거리를 확정하고, N번째 갱신은 음의(양의) 사이클을 의미한다. 그 사이클의 도달 범위를 BFS로 파악한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1325 — 효율적인 해킹
  // ──────────────────────────────────────────────────────
  {
    id: 'b001325-boj',
    title: '효율적인 해킹',
    difficulty: 'medium',
    domain: 'reverse_graph_bfs',
    summary: '신뢰 관계를 역방향 그래프로 구성한 뒤 각 노드에서 BFS하여 도달 가능한 정점 수가 최대인 노드를 찾는 문제',
    tags: ['bfs', 'graph', 'reverse-graph'],
    input_type: 'directed_edges',
    output_type: 'node_list',
    constraints: {
      reverse_direction: true,
      multiple_answers_possible: true,
      input_size_hint: 'N <= 10000, M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['node_list', 'count', 'single_value', 'boolean_existence', 'traversal_order'],
          accepted_answers: ['node_list'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'directed_trust_relationship',
            'reverse_direction_for_hacking',
            'find_max_reachable_nodes',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['directed_trust_relationship', 'reverse_direction_for_hacking', 'find_max_reachable_nodes'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_node_with_max_reachable_count_via_reverse_bfs',
            'reverse_graph_bfs_max_hack_count',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bfs_per_node', 'dijkstra', 'union_find', 'topological_sort', 'floyd_warshall', 'dfs'],
          accepted_answers: ['bfs_per_node'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'count_reachable_from_each_node',
            'reverse_edge_direction_needed',
            'unweighted_reachability',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['count_reachable_from_each_node', 'reverse_edge_direction_needed', 'unweighted_reachability'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['reverse_graph_construction', 'visited_reset_per_start', 'max_tracking', 'memoization', 'two_pointer'],
          accepted_answers: ['reverse_graph_construction', 'visited_reset_per_start', 'max_tracking'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'visited_array', 'queue', 'count_array', 'priority_queue'],
          accepted_answers: ['adjacency_list', 'visited_array', 'queue', 'count_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'build_reverse_graph',
            'bfs_from_each_node',
            'count_reachable_and_find_max',
            'single_bfs_from_target',
            'in_degree_based_heuristic',
          ],
          accepted_answers: ['build_reverse_graph', 'bfs_from_each_node', 'count_reachable_and_find_max'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_reverse', label: '"A가 B를 신뢰" → B→A 방향으로 역방향 그래프 구성' },
          { id: 'bfs_each', label: '각 노드에서 BFS 수행' },
          { id: 'count_reach', label: '도달 가능한 정점 수 카운트' },
          { id: 'find_max', label: '최대 카운트 값 찾기' },
          { id: 'output_all', label: '최대 카운트를 가진 노드를 오름차순 출력' },
        ],
        correct_order: ['build_reverse', 'bfs_each', 'count_reach', 'find_max', 'output_all'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'reverse_edge_direction_A_trusts_B_means_B_to_A',
          'multiple_nodes_with_same_max',
          'ascending_order_output',
          'visited_reset_per_bfs',
          'self_loop_possible',
          'disconnected_components',
        ],
        required_answers: ['reverse_edge_direction_A_trusts_B_means_B_to_A', 'multiple_nodes_with_same_max', 'ascending_order_output'],
        recommended_answers: ['visited_reset_per_bfs'],
        optional_answers: ['self_loop_possible', 'disconnected_components'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N*(N+M))', 'O(N+M)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N*(N+M))'],
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
            'N_bfs_each_N_plus_M',
            'adjacency_list_size_N_plus_M',
            'visited_and_count_arrays_size_N',
            'adjacency_matrix_not_feasible',
          ],
          accepted_answers: ['N_bfs_each_N_plus_M', 'adjacency_list_size_N_plus_M', 'visited_and_count_arrays_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'reverse_bfs_all_nodes',
        label: '역방향 그래프 구성 + 각 노드 BFS 카운트',
        pattern_analysis_answer: 'bfs_per_node',
        required_strategy_tags: ['build_reverse_graph', 'bfs_from_each_node', 'count_reachable_and_find_max'],
      },
    ],

    common_mistakes: [
      {
        tag: 'wrong_direction',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'reverse_edge_direction_A_trusts_B_means_B_to_A' },
        ],
        feedback:
          '"A가 B를 신뢰"는 B를 해킹하면 A도 해킹됨을 의미합니다. 간선 방향을 B→A로 설정해야 합니다.',
      },
      {
        tag: 'single_answer_only',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'multiple_nodes_with_same_max' },
        ],
        feedback:
          '가장 많이 해킹할 수 있는 컴퓨터가 여러 대일 수 있습니다. 최대값과 같은 모든 노드를 출력해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '신뢰 관계를 역방향 간선으로 저장하고, 각 노드에서 BFS로 도달 가능 정점 수를 센 뒤 최댓값 노드들을 출력한다.',
      mentor_hint: '"A가 B를 신뢰" → B를 해킹하면 A도 해킹. 이 방향을 정확히 이해하는 것이 핵심이다.',
      pattern_trigger: '"X를 하면 Y에 영향"이라는 전파 관계가 보이면 → 방향을 정확히 파악하고, 필요시 역방향 그래프를 구성하라.',
      why_it_works: '역방향 그래프에서 BFS하면 해킹 전파 경로를 따라가는 것과 동일하다. 각 시작점에서 도달 가능 수를 세면 해킹 가능 컴퓨터 수를 구할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1389 — 케빈 베이컨의 6단계 법칙
  // ──────────────────────────────────────────────────────
  {
    id: 'b001389-boj',
    title: '케빈 베이컨의 6단계 법칙',
    difficulty: 'easy',
    domain: 'floyd_warshall_all_pairs',
    summary: '플로이드-워셜로 모든 쌍 최단 거리를 구한 뒤 케빈 베이컨 수가 최소인 사람을 찾는 문제',
    tags: ['floyd-warshall', 'shortest-path', 'graph'],
    input_type: 'undirected_edges',
    output_type: 'single_value',
    constraints: {
      all_pairs_shortest: true,
      small_N: true,
      input_size_hint: 'N <= 100, M <= 5000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'traversal_order', 'boolean_existence', 'minimum_cost'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'undirected_friend_graph',
            'all_pairs_shortest_distance_needed',
            'sum_of_distances_per_person',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['undirected_friend_graph', 'all_pairs_shortest_distance_needed', 'sum_of_distances_per_person'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_person_with_minimum_kevin_bacon_number',
            'floyd_warshall_minimum_distance_sum',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['floyd_warshall', 'bfs_per_node', 'dijkstra', 'union_find', 'dfs', 'bellman_ford'],
          accepted_answers: ['floyd_warshall'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'all_pairs_shortest_path_needed',
            'N_small_enough_for_N3',
            'unweighted_graph_unit_distance',
            'need_single_source_shortest',
            'overlapping_subproblems',
          ],
          accepted_answers: ['all_pairs_shortest_path_needed', 'N_small_enough_for_N3', 'unweighted_graph_unit_distance'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bfs_n_times_alternative', 'distance_sum_comparison', 'smallest_index_tiebreak', 'memoization', 'two_pointer'],
          accepted_answers: ['bfs_n_times_alternative', 'distance_sum_comparison', 'smallest_index_tiebreak'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['dist_2d_array', 'adjacency_list', 'queue', 'priority_queue', 'union_find'],
          accepted_answers: ['dist_2d_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'floyd_warshall_triple_loop',
            'sum_distances_per_person',
            'find_min_sum_smallest_index',
            'bfs_from_each_node',
            'dijkstra_from_each_node',
          ],
          accepted_answers: ['floyd_warshall_triple_loop', 'sum_distances_per_person', 'find_min_sum_smallest_index'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_dist', label: 'dist[i][i]=0, 나머지 INF로 초기화, 간선 입력' },
          { id: 'floyd', label: '플로이드-워셜 삼중 루프 (k 바깥)' },
          { id: 'sum_dist', label: '각 사람의 dist 합 계산' },
          { id: 'find_min', label: '합이 최소인 사람 번호 출력 (같으면 작은 번호)' },
        ],
        correct_order: ['init_dist', 'floyd', 'sum_dist', 'find_min'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'dist_init_self_zero_rest_INF',
          'k_loop_outermost',
          'tie_break_smallest_number',
          'bidirectional_edges',
          'N_equals_2_trivial',
          'overflow_on_INF_addition',
        ],
        required_answers: ['dist_init_self_zero_rest_INF', 'k_loop_outermost', 'tie_break_smallest_number'],
        recommended_answers: ['bidirectional_edges'],
        optional_answers: ['N_equals_2_trivial', 'overflow_on_INF_addition'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^3)', 'O(N^2)', 'O(N*(N+M))', 'O(NlogN)'],
          accepted_answers: ['O(N^3)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N^2)', 'O(N)', 'O(N+M)'],
          accepted_answers: ['O(N^2)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'triple_loop_N3',
            'dist_matrix_N2',
            'N_100_so_N3_is_10_6',
            'bfs_alternative_N_times_N_plus_M',
          ],
          accepted_answers: ['triple_loop_N3', 'dist_matrix_N2', 'N_100_so_N3_is_10_6'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'floyd_warshall_kevin_bacon',
        label: '플로이드-워셜 모든 쌍 최단 거리 + 합 최소 탐색',
        pattern_analysis_answer: 'floyd_warshall',
        required_strategy_tags: ['floyd_warshall_triple_loop', 'sum_distances_per_person', 'find_min_sum_smallest_index'],
      },
    ],

    common_mistakes: [
      {
        tag: 'k_not_outermost',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'k_loop_outermost' },
        ],
        feedback:
          '플로이드-워셜에서 k(중간 정점) 루프가 가장 바깥에 있어야 합니다. 안쪽에 배치하면 중간 정점을 통한 경로를 올바르게 계산하지 못합니다.',
      },
      {
        tag: 'no_tie_break',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'tie_break_smallest_number' },
        ],
        feedback:
          '케빈 베이컨 수가 같으면 번호가 가장 작은 사람을 출력해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'N이 작으면(100 이하) 플로이드-워셜 O(N^3)으로 모든 쌍 최단 거리를 구할 수 있다. 각 사람의 거리 합 중 최솟값이 답.',
      mentor_hint: '플로이드-워셜의 k 루프는 반드시 가장 바깥에 위치해야 한다. 이것을 까먹으면 결과가 틀린다.',
      pattern_trigger: '"모든 쌍 사이의 거리/관계"가 필요하고 N이 작으면 → 플로이드-워셜을 떠올려라.',
      why_it_works: '플로이드-워셜은 DP로 모든 쌍 최단 거리를 O(N^3)에 구한다. N=100이면 10^6 연산으로 매우 빠르다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1414 — 불우이웃돕기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001414-boj',
    title: '불우이웃돕기',
    difficulty: 'medium',
    domain: 'mst_total_minus_mst',
    summary: 'MST를 구하여 최소 연결에 필요한 랜선만 남기고, 전체 랜선 합에서 MST 가중치를 빼 기부 가능 최대 길이를 구하는 문제',
    tags: ['mst', 'union-find', 'greedy', 'graph'],
    input_type: 'adjacency_matrix_encoded',
    output_type: 'single_value',
    constraints: {
      alphabet_to_number_conversion: true,
      disconnected_returns_minus_1: true,
      input_size_hint: 'N <= 50',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'boolean_existence', 'traversal_order', 'minimum_cost'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'adjacency_matrix_as_alphabet',
            'maximize_donated_cable_length',
            'maintain_full_connectivity',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['adjacency_matrix_as_alphabet', 'maximize_donated_cable_length', 'maintain_full_connectivity'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'total_cable_minus_MST_equals_max_donation',
            'MST_for_minimum_connectivity_then_donate_rest',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['kruskal_mst', 'prim_mst', 'dijkstra', 'bfs_dfs', 'greedy', 'floyd_warshall'],
          accepted_answers: ['kruskal_mst'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'minimize_kept_cables_for_connectivity',
            'total_minus_MST_maximizes_donation',
            'greedy_edge_selection',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['minimize_kept_cables_for_connectivity', 'total_minus_MST_maximizes_donation', 'greedy_edge_selection'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['input_parsing_alphabet', 'connectivity_check', 'diagonal_exclusion', 'memoization', 'two_pointer'],
          accepted_answers: ['input_parsing_alphabet', 'connectivity_check', 'diagonal_exclusion'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['edge_list', 'union_find', 'adjacency_matrix', 'priority_queue', 'dist_array'],
          accepted_answers: ['edge_list', 'union_find'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'parse_alphabet_to_weight',
            'build_edge_list_skip_diagonal_and_zero',
            'kruskal_mst',
            'total_sum_minus_mst_weight',
            'check_connectivity_V_minus_1_edges',
          ],
          accepted_answers: ['parse_alphabet_to_weight', 'build_edge_list_skip_diagonal_and_zero', 'kruskal_mst', 'total_sum_minus_mst_weight', 'check_connectivity_V_minus_1_edges'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'parse_input', label: '알파벳을 숫자로 변환하여 간선 리스트 구성 (대각선, 0 제외)' },
          { id: 'calc_total', label: '전체 랜선 길이 합 계산' },
          { id: 'kruskal', label: 'Kruskal로 MST 가중치 합 계산' },
          { id: 'check_conn', label: 'MST가 N-1개 간선을 선택했는지 확인' },
          { id: 'output', label: '연결 가능하면 전체 합 - MST 출력, 불가면 -1' },
        ],
        correct_order: ['parse_input', 'calc_total', 'kruskal', 'check_conn', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'alphabet_conversion_lowercase_1_26_uppercase_27_52',
          'diagonal_is_self_loop_exclude_from_edges',
          'zero_means_no_connection',
          'disconnected_graph_output_minus_1',
          'diagonal_cable_included_in_total_sum',
          'N_equals_1_output_zero',
        ],
        required_answers: ['alphabet_conversion_lowercase_1_26_uppercase_27_52', 'diagonal_is_self_loop_exclude_from_edges', 'disconnected_graph_output_minus_1'],
        recommended_answers: ['zero_means_no_connection', 'diagonal_cable_included_in_total_sum'],
        optional_answers: ['N_equals_1_output_zero'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^2*logN)', 'O(N^3)', 'O(N^2)', 'O(NlogN)'],
          accepted_answers: ['O(N^2*logN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N^2)', 'O(N)', 'O(N+E)'],
          accepted_answers: ['O(N^2)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'N2_edges_from_matrix',
            'sorting_N2_edges',
            'union_find_nearly_constant',
            'input_matrix_size_N2',
          ],
          accepted_answers: ['N2_edges_from_matrix', 'sorting_N2_edges', 'union_find_nearly_constant', 'input_matrix_size_N2'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'mst_donation',
        label: 'Kruskal MST 구한 뒤 전체 합 - MST = 기부량',
        pattern_analysis_answer: 'kruskal_mst',
        required_strategy_tags: ['parse_alphabet_to_weight', 'kruskal_mst', 'total_sum_minus_mst_weight', 'check_connectivity_V_minus_1_edges'],
      },
    ],

    common_mistakes: [
      {
        tag: 'wrong_alphabet_parse',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'alphabet_conversion_lowercase_1_26_uppercase_27_52' },
        ],
        feedback:
          '소문자 a-z는 1-26, 대문자 A-Z는 27-52로 변환해야 합니다. 변환을 잘못하면 가중치가 틀립니다.',
      },
      {
        tag: 'include_diagonal',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'diagonal_is_self_loop_exclude_from_edges' },
        ],
        feedback:
          '대각선(자기 자신)은 간선이 아닙니다. MST 간선 후보에서 제외해야 하지만, 기부 가능 랜선 총합에는 포함될 수 있습니다.',
      },
    ],

    review_notes: {
      core_takeaway: '모든 컴퓨터를 연결하는 최소 랜선 = MST. 기부 가능량 = 전체 랜선 합 - MST 가중치.',
      mentor_hint: '입력 파싱(알파벳→숫자)과 대각선 처리가 까다롭다. 대각선의 랜선은 자기 자신 연결이므로 MST 간선에 포함시키면 안 된다.',
      pattern_trigger: '"최소한의 연결만 유지하고 나머지를 제거/기부"가 보이면 → MST를 구하고 전체에서 빼라.',
      why_it_works: 'MST는 모든 정점을 연결하는 최소 비용 트리이다. 나머지 간선은 사이클을 형성하므로 제거해도 연결성이 유지된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1516 — 게임 개발
  // ──────────────────────────────────────────────────────
  {
    id: 'b001516-boj',
    title: '게임 개발',
    difficulty: 'medium',
    domain: 'topological_sort_dp',
    summary: '위상 정렬과 DP를 결합하여 선행 건물 완성 시간의 최댓값 + 자신의 건설 시간으로 각 건물의 최소 완성 시간을 구하는 문제',
    tags: ['topological-sort', 'dp', 'dag', 'graph'],
    input_type: 'dag_with_node_weights',
    output_type: 'array_of_values',
    constraints: {
      parallel_build_possible: true,
      predecessor_max_not_sum: true,
      input_size_hint: 'N <= 500',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['array_of_values', 'single_value', 'count', 'boolean_existence', 'traversal_order'],
          accepted_answers: ['array_of_values'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'dag_with_build_times',
            'predecessor_constraints',
            'parallel_construction_allowed',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['dag_with_build_times', 'predecessor_constraints', 'parallel_construction_allowed'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'topological_sort_DP_for_min_completion_time',
            'dag_longest_path_per_node',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['topological_sort_dp', 'dijkstra', 'bfs_dfs', 'floyd_warshall', 'greedy', 'bellman_ford'],
          accepted_answers: ['topological_sort_dp'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'dag_with_dependency_order',
            'completion_time_depends_on_predecessors',
            'parallel_means_max_not_sum',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['dag_with_dependency_order', 'completion_time_depends_on_predecessors', 'parallel_means_max_not_sum'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['kahn_bfs_topological', 'in_degree_tracking', 'dp_on_dag', 'memoization', 'two_pointer'],
          accepted_answers: ['kahn_bfs_topological', 'in_degree_tracking', 'dp_on_dag'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'in_degree_array', 'dp_result_array', 'queue', 'stack'],
          accepted_answers: ['adjacency_list', 'in_degree_array', 'dp_result_array', 'queue'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'kahn_topological_sort',
            'dp_result_max_predecessor_plus_self',
            'initialize_no_predecessor_with_build_time',
            'dfs_memoization_alternative',
            'brute_force_all_orders',
          ],
          accepted_answers: ['kahn_topological_sort', 'dp_result_max_predecessor_plus_self', 'initialize_no_predecessor_with_build_time'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_graph', label: '인접 리스트와 진입 차수 배열 구성' },
          { id: 'init_dp', label: 'result[i] = build_time[i]로 DP 초기화' },
          { id: 'enqueue_zero', label: '진입 차수 0인 건물을 큐에 추가' },
          { id: 'process_topo', label: '큐에서 꺼내 인접 건물의 result를 max(result[next], result[cur]) + build_time[next]로 갱신' },
          { id: 'output', label: '각 건물의 result 출력' },
        ],
        correct_order: ['build_graph', 'init_dp', 'enqueue_zero', 'process_topo', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'use_max_not_sum_for_parallel',
          'no_predecessor_means_just_build_time',
          'multiple_predecessors_take_max',
          'building_with_zero_time_not_possible',
          'self_dependency_not_possible',
          'single_building_trivial',
        ],
        required_answers: ['use_max_not_sum_for_parallel', 'no_predecessor_means_just_build_time', 'multiple_predecessors_take_max'],
        recommended_answers: ['building_with_zero_time_not_possible'],
        optional_answers: ['self_dependency_not_possible', 'single_building_trivial'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+M)', 'O(N^2)', 'O(NlogN)', 'O(N*M)'],
          accepted_answers: ['O(N+M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N+M)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'topological_sort_visits_each_node_edge_once',
            'adjacency_list_and_in_degree',
            'dp_array_size_N',
            'no_repeated_computation',
          ],
          accepted_answers: ['topological_sort_visits_each_node_edge_once', 'adjacency_list_and_in_degree', 'dp_array_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'topo_sort_dp',
        label: 'Kahn 위상 정렬 + DP (선행 최대 + 자신 건설 시간)',
        pattern_analysis_answer: 'topological_sort_dp',
        required_strategy_tags: ['kahn_topological_sort', 'dp_result_max_predecessor_plus_self', 'initialize_no_predecessor_with_build_time'],
      },
    ],

    common_mistakes: [
      {
        tag: 'sum_instead_of_max',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'use_max_not_sum_for_parallel' },
        ],
        feedback:
          '선행 건물들은 동시에 지을 수 있으므로 완성 시간의 "합"이 아니라 "최대값"을 사용해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'DAG에서 위상 정렬 순서로 DP를 적용. result[i] = build_time[i] + max(result[선행 건물들]). 동시 건설이므로 합이 아닌 max.',
      mentor_hint: '동시 실행 가능한 작업의 완료 시간은 max이지, sum이 아니다. 이것을 놓치면 바로 오답이다.',
      pattern_trigger: '"선행 조건이 있는 작업들의 완료 시간"이 보이면 → 위상 정렬 + DP(max of predecessors)를 떠올려라.',
      why_it_works: '위상 정렬은 선행 조건을 만족하는 순서로 처리를 보장한다. 각 노드에서 선행 완료 시간의 max를 취하면 병렬 실행 시 최소 완료 시간이 된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1707 — 이분 그래프
  // ──────────────────────────────────────────────────────
  {
    id: 'b001707-boj',
    title: '이분 그래프',
    difficulty: 'medium',
    domain: 'bfs_2_coloring',
    summary: 'BFS로 2-색 칠하기를 수행하여 인접한 정점에 같은 색이 칠해지면 이분 그래프가 아님을 판별하는 문제',
    tags: ['bfs', 'bipartite', 'graph', 'coloring'],
    input_type: 'undirected_graph_multiple_cases',
    output_type: 'boolean_per_case',
    constraints: {
      multiple_test_cases: true,
      may_be_disconnected: true,
      input_size_hint: 'V <= 20000, E <= 200000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['boolean_per_case', 'count', 'single_value', 'traversal_order', 'minimum_cost'],
          accepted_answers: ['boolean_per_case'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'undirected_graph',
            'bipartite_check',
            'multiple_test_cases',
            'may_be_disconnected',
            'single_integer',
          ],
          accepted_answers: ['undirected_graph', 'bipartite_check', 'multiple_test_cases', 'may_be_disconnected'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'check_bipartite_via_2_coloring',
            'bfs_bipartite_graph_detection',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bfs_2_coloring', 'dfs_2_coloring', 'union_find', 'dijkstra', 'topological_sort', 'floyd_warshall'],
          accepted_answers: ['bfs_2_coloring'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'bipartite_equals_2_colorable',
            'bfs_alternating_color_by_level',
            'conflict_means_not_bipartite',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['bipartite_equals_2_colorable', 'bfs_alternating_color_by_level', 'conflict_means_not_bipartite'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['handle_disconnected_components', 'color_array_as_visited', 'dfs_alternative', 'memoization', 'two_pointer'],
          accepted_answers: ['handle_disconnected_components', 'color_array_as_visited', 'dfs_alternative'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'color_array', 'queue', 'visited_array', 'stack'],
          accepted_answers: ['adjacency_list', 'color_array', 'queue'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'bfs_assign_opposite_color',
            'check_color_conflict_on_neighbor',
            'iterate_all_components',
            'dfs_recursive_coloring',
            'odd_cycle_detection',
          ],
          accepted_answers: ['bfs_assign_opposite_color', 'check_color_conflict_on_neighbor', 'iterate_all_components'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_color', label: 'color 배열을 -1(미방문)로 초기화' },
          { id: 'iterate_nodes', label: '모든 노드를 순회하며 미방문이면 BFS 시작' },
          { id: 'bfs_color', label: 'BFS에서 인접 노드에 반대 색 배정' },
          { id: 'check_conflict', label: '인접 노드가 같은 색이면 이분 그래프가 아님' },
          { id: 'output', label: '모든 연결 요소에서 충돌이 없으면 YES, 있으면 NO' },
        ],
        correct_order: ['init_color', 'iterate_nodes', 'bfs_color', 'check_conflict', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'disconnected_graph_check_all_components',
          'reset_data_per_test_case',
          'color_serves_as_visited',
          'single_node_is_bipartite',
          'self_loop_not_bipartite',
          'multiple_edges_between_same_pair',
        ],
        required_answers: ['disconnected_graph_check_all_components', 'reset_data_per_test_case', 'color_serves_as_visited'],
        recommended_answers: ['single_node_is_bipartite'],
        optional_answers: ['self_loop_not_bipartite', 'multiple_edges_between_same_pair'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(V+E)', 'O(V*E)', 'O(V^2)', 'O(ElogV)'],
          accepted_answers: ['O(V+E)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(V+E)', 'O(V)', 'O(V^2)'],
          accepted_answers: ['O(V+E)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'bfs_visits_each_node_edge_once',
            'adjacency_list_size_V_plus_E',
            'color_array_size_V',
            'queue_max_size_V',
          ],
          accepted_answers: ['bfs_visits_each_node_edge_once', 'adjacency_list_size_V_plus_E', 'color_array_size_V'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'bfs_bipartite_check',
        label: 'BFS 2-색 칠하기로 이분 그래프 판별',
        pattern_analysis_answer: 'bfs_2_coloring',
        required_strategy_tags: ['bfs_assign_opposite_color', 'check_color_conflict_on_neighbor', 'iterate_all_components'],
      },
    ],

    common_mistakes: [
      {
        tag: 'single_component_only',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'disconnected_graph_check_all_components' },
        ],
        feedback:
          '비연결 그래프에서는 모든 연결 요소에 대해 BFS를 수행해야 합니다. 하나의 연결 요소만 검사하면 오답입니다.',
      },
      {
        tag: 'no_reset',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'reset_data_per_test_case' },
        ],
        feedback:
          '테스트 케이스마다 color 배열과 인접 리스트를 초기화해야 합니다. 이전 케이스 데이터가 남으면 오답입니다.',
      },
    ],

    review_notes: {
      core_takeaway: '이분 그래프 = 2-색 칠하기 가능. BFS로 인접 정점에 반대 색을 칠하다가 충돌이 나면 NOT 이분 그래프.',
      mentor_hint: '비연결 그래프를 까먹기 쉽다. 모든 미방문 노드에서 BFS를 시작해야 한다. color 배열이 visited 역할도 겸한다.',
      pattern_trigger: '"정점을 두 그룹으로 나눌 수 있는가"가 보이면 → BFS 2-색 칠하기를 떠올려라.',
      why_it_works: '이분 그래프의 정의가 2-색 칠하기 가능 그래프와 동치이다. BFS 레벨별로 번갈아 칠하면 O(V+E)에 판별 가능하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1717 — 집합의 표현
  // ──────────────────────────────────────────────────────
  {
    id: 'b001717-boj',
    title: '집합의 표현',
    difficulty: 'medium',
    domain: 'union_find_implementation',
    summary: 'Union-Find를 경로 압축과 랭크 기반 합치기로 구현하여 합집합과 같은 집합 판별 쿼리를 처리하는 문제',
    tags: ['union-find', 'disjoint-set'],
    input_type: 'union_find_queries',
    output_type: 'boolean_per_query',
    constraints: {
      path_compression_required: true,
      union_by_rank_required: true,
      input_size_hint: 'n <= 1000000, m <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['boolean_per_query', 'count', 'single_value', 'traversal_order', 'minimum_cost'],
          accepted_answers: ['boolean_per_query'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'union_and_find_operations',
            'initial_singleton_sets',
            'large_n_requires_efficient_structure',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['union_and_find_operations', 'initial_singleton_sets', 'large_n_requires_efficient_structure'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'implement_union_find_with_optimizations',
            'disjoint_set_union_and_same_set_query',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['union_find', 'bfs_dfs', 'sorting', 'hash_map', 'segment_tree', 'binary_search'],
          accepted_answers: ['union_find'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'explicit_union_and_find_operations',
            'disjoint_set_management',
            'near_constant_time_per_query',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['explicit_union_and_find_operations', 'disjoint_set_management', 'near_constant_time_per_query'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['path_compression', 'union_by_rank_or_size', 'iterative_find', 'memoization', 'two_pointer'],
          accepted_answers: ['path_compression', 'union_by_rank_or_size', 'iterative_find'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['parent_array', 'rank_array', 'size_array', 'adjacency_list', 'hash_map'],
          accepted_answers: ['parent_array', 'rank_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'path_compression_in_find',
            'union_by_rank',
            'check_same_root_for_query',
            'array_replacement_union',
            'linked_list_union',
          ],
          accepted_answers: ['path_compression_in_find', 'union_by_rank', 'check_same_root_for_query'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init', label: 'parent[i] = i, rank[i] = 0으로 초기화 (0~n)' },
          { id: 'read_query', label: '쿼리 읽기 (0: union, 1: find)' },
          { id: 'union_op', label: '0이면 union(a, b) 수행' },
          { id: 'find_op', label: '1이면 find(a) == find(b)로 비교하여 YES/NO 출력' },
        ],
        correct_order: ['init', 'read_query', 'union_op', 'find_op'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'element_0_included',
          'path_compression_essential_for_speed',
          'recursion_depth_use_iterative_find',
          'union_same_element_no_op',
          'large_n_array_size_n_plus_1',
          'output_YES_or_NO',
        ],
        required_answers: ['element_0_included', 'path_compression_essential_for_speed', 'recursion_depth_use_iterative_find'],
        recommended_answers: ['union_same_element_no_op', 'large_n_array_size_n_plus_1'],
        optional_answers: ['output_YES_or_NO'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(m*alpha(n))', 'O(m*n)', 'O(m*logn)', 'O(m)'],
          accepted_answers: ['O(m*alpha(n))'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(n)', 'O(n+m)', 'O(n^2)'],
          accepted_answers: ['O(n)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'ackermann_inverse_nearly_constant',
            'path_compression_flattens_tree',
            'rank_union_limits_height',
            'parent_and_rank_arrays_size_n',
          ],
          accepted_answers: ['ackermann_inverse_nearly_constant', 'path_compression_flattens_tree', 'rank_union_limits_height', 'parent_and_rank_arrays_size_n'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'optimized_union_find',
        label: 'Union-Find (경로 압축 + 랭크 합치기)',
        pattern_analysis_answer: 'union_find',
        required_strategy_tags: ['path_compression_in_find', 'union_by_rank', 'check_same_root_for_query'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_path_compression',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'path_compression_essential_for_speed' },
        ],
        feedback:
          '경로 압축 없이는 트리가 편향되어 find가 O(n)이 됩니다. n이 100만이므로 시간 초과가 발생합니다.',
      },
      {
        tag: 'missing_element_0',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'element_0_included' },
        ],
        feedback:
          '집합에 0번 원소도 포함됩니다. 배열 크기를 n+1로 설정해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'Union-Find의 핵심 최적화: 경로 압축(find 시 루트 직접 연결)과 랭크 합치기(작은 트리를 큰 트리에 붙임). 쿼리당 거의 O(1).',
      mentor_hint: 'n이 클 때 재귀 find는 스택 오버플로 위험이 있다. 반복문으로 구현하거나 경로 압축으로 깊이를 줄여라.',
      pattern_trigger: '"집합 합치기 + 같은 집합 질의"가 보이면 → Union-Find를 떠올려라.',
      why_it_works: '경로 압축은 find 경로의 모든 노드를 루트에 직접 연결하고, 랭크 합치기는 트리 높이 증가를 억제한다. 두 최적화를 함께 적용하면 아커만 역함수 시간이 된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1753 — 최단경로
  // ──────────────────────────────────────────────────────
  {
    id: 'b001753-boj',
    title: '최단경로',
    difficulty: 'medium',
    domain: 'dijkstra_priority_queue',
    summary: '우선순위 큐를 사용한 다익스트라로 단일 시작점에서 모든 정점까지의 최단 경로를 구하는 문제',
    tags: ['dijkstra', 'shortest-path', 'priority-queue', 'graph'],
    input_type: 'weighted_directed_graph',
    output_type: 'distance_per_node',
    constraints: {
      positive_weights_only: true,
      priority_queue_needed: true,
      input_size_hint: 'V <= 20000, E <= 300000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['distance_per_node', 'single_value', 'count', 'boolean_existence', 'traversal_order'],
          accepted_answers: ['distance_per_node'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'directed_weighted_graph',
            'positive_edge_weights',
            'single_source_shortest_path',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['directed_weighted_graph', 'positive_edge_weights', 'single_source_shortest_path'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'dijkstra_single_source_shortest_path',
            'priority_queue_dijkstra_implementation',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dijkstra', 'bellman_ford', 'bfs', 'floyd_warshall', 'topological_sort', 'union_find'],
          accepted_answers: ['dijkstra'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'single_source_all_destinations',
            'positive_weights_allow_dijkstra',
            'priority_queue_for_efficiency',
            'negative_edges_present',
            'overlapping_subproblems',
          ],
          accepted_answers: ['single_source_all_destinations', 'positive_weights_allow_dijkstra', 'priority_queue_for_efficiency'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['lazy_deletion_in_heap', 'dist_array_init_INF', 'skip_outdated_entries', 'memoization', 'two_pointer'],
          accepted_answers: ['lazy_deletion_in_heap', 'dist_array_init_INF', 'skip_outdated_entries'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'min_heap', 'dist_array', 'visited_array', 'edge_list'],
          accepted_answers: ['adjacency_list', 'min_heap', 'dist_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'init_dist_INF_start_zero',
            'extract_min_from_heap',
            'relax_adjacent_edges',
            'skip_if_dist_already_smaller',
            'bellman_ford_relaxation',
          ],
          accepted_answers: ['init_dist_INF_start_zero', 'extract_min_from_heap', 'relax_adjacent_edges', 'skip_if_dist_already_smaller'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init', label: 'dist를 INF로 초기화, 시작점 dist=0, 힙에 (0, 시작점) 추가' },
          { id: 'extract', label: '힙에서 최소 거리 정점 추출' },
          { id: 'skip', label: 'dist[v]보다 큰 값이면 스킵' },
          { id: 'relax', label: '인접 정점의 dist 갱신, 갱신되면 힙에 추가' },
          { id: 'output', label: '각 정점의 dist 출력 (INF면 INF)' },
        ],
        correct_order: ['init', 'extract', 'skip', 'relax', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'skip_outdated_heap_entries',
          'unreachable_nodes_print_INF',
          'start_node_distance_zero',
          'duplicate_edges_same_pair',
          'self_loop_possible',
          'large_V_E_need_efficient_impl',
        ],
        required_answers: ['skip_outdated_heap_entries', 'unreachable_nodes_print_INF', 'start_node_distance_zero'],
        recommended_answers: ['duplicate_edges_same_pair', 'large_V_E_need_efficient_impl'],
        optional_answers: ['self_loop_possible'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O((V+E)logV)', 'O(V*E)', 'O(V^2)', 'O(ElogE)'],
          accepted_answers: ['O((V+E)logV)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(V+E)', 'O(V)', 'O(V^2)'],
          accepted_answers: ['O(V+E)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'heap_operations_logV',
            'each_edge_processed_once',
            'adjacency_list_V_plus_E',
            'dist_array_size_V',
          ],
          accepted_answers: ['heap_operations_logV', 'each_edge_processed_once', 'adjacency_list_V_plus_E', 'dist_array_size_V'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dijkstra_min_heap',
        label: '우선순위 큐(min-heap) 다익스트라',
        pattern_analysis_answer: 'dijkstra',
        required_strategy_tags: ['init_dist_INF_start_zero', 'extract_min_from_heap', 'relax_adjacent_edges', 'skip_if_dist_already_smaller'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_skip_outdated',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'skip_outdated_heap_entries' },
        ],
        feedback:
          '힙에서 꺼낸 값이 현재 dist[v]보다 크면 이미 더 짧은 경로가 확정된 것입니다. 스킵하지 않으면 불필요한 처리가 발생합니다.',
      },
      {
        tag: 'unreachable_not_handled',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'unreachable_nodes_print_INF' },
        ],
        feedback:
          '시작점에서 도달 불가능한 정점은 INF를 출력해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '양의 가중치 그래프에서 단일 출발점 최단 경로 → 다익스트라 + 우선순위 큐. 힙에서 최소 꺼내고 인접 간선 완화.',
      mentor_hint: '힙에서 꺼낸 (거리, 정점)이 현재 dist보다 크면 즉시 스킵하라. 이 lazy deletion이 없으면 같은 정점을 여러 번 처리하게 된다.',
      pattern_trigger: '"양의 가중치 + 단일 시작점 최단 경로"가 보이면 → 다익스트라 + min-heap을 떠올려라.',
      why_it_works: '다익스트라는 탐욕적으로 확정된 최단 거리 정점부터 확장한다. 양의 가중치에서 한 번 확정된 거리는 이후에 줄어들지 않으므로 정확하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1854 — K번째 최단경로
  // ──────────────────────────────────────────────────────
  {
    id: 'b001854-boj',
    title: 'K번째 최단경로',
    difficulty: 'hard',
    domain: 'modified_dijkstra_k_max_heaps',
    summary: '각 정점마다 크기 K의 max-heap을 유지하는 변형 다익스트라로 K번째 최단 경로를 구하는 문제',
    tags: ['dijkstra', 'priority-queue', 'shortest-path', 'heap'],
    input_type: 'weighted_directed_graph',
    output_type: 'kth_distance_per_node',
    constraints: {
      k_shortest_paths: true,
      revisit_allowed: true,
      input_size_hint: 'N <= 1000, M <= 2000000, K <= 100',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['kth_distance_per_node', 'single_value', 'count', 'boolean_existence', 'shortest_path'],
          accepted_answers: ['kth_distance_per_node'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'directed_weighted_graph',
            'kth_shortest_path_required',
            'revisit_same_node_allowed',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['directed_weighted_graph', 'kth_shortest_path_required', 'revisit_same_node_allowed'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'kth_shortest_path_via_modified_dijkstra',
            'per_node_max_heap_size_K_dijkstra',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['modified_dijkstra_k_heap', 'standard_dijkstra', 'bellman_ford', 'bfs_dfs', 'yen_k_shortest', 'floyd_warshall'],
          accepted_answers: ['modified_dijkstra_k_heap'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'need_K_shortest_not_just_one',
            'max_heap_per_node_tracks_K_best',
            'no_visited_check_allow_revisit',
            'need_single_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['need_K_shortest_not_just_one', 'max_heap_per_node_tracks_K_best', 'no_visited_check_allow_revisit'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['max_heap_as_threshold', 'global_min_heap_for_expansion', 'lazy_pruning', 'memoization', 'two_pointer'],
          accepted_answers: ['max_heap_as_threshold', 'global_min_heap_for_expansion', 'lazy_pruning'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'global_min_heap', 'per_node_max_heap_size_K', 'dist_array', 'visited_array'],
          accepted_answers: ['adjacency_list', 'global_min_heap', 'per_node_max_heap_size_K'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'maintain_K_size_max_heap_per_node',
            'push_if_heap_size_less_than_K',
            'replace_top_if_new_dist_smaller',
            'no_visited_check',
            'standard_dijkstra_K_times',
          ],
          accepted_answers: ['maintain_K_size_max_heap_per_node', 'push_if_heap_size_less_than_K', 'replace_top_if_new_dist_smaller', 'no_visited_check'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init', label: '각 정점의 max-heap 초기화, 전역 min-heap에 (0, 시작점) 추가' },
          { id: 'extract', label: '전역 min-heap에서 최소 거리 추출' },
          { id: 'check_heap', label: '해당 정점의 max-heap 크기가 K 미만이면 추가, K이면 top보다 작을 때만 교체' },
          { id: 'expand', label: '추가/교체 성공 시 인접 정점으로 확장' },
          { id: 'output', label: '각 정점 max-heap의 top이 K번째 최단 거리, 크기 < K이면 -1' },
        ],
        correct_order: ['init', 'extract', 'check_heap', 'expand', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'no_visited_check_revisit_allowed',
          'heap_size_less_than_K_means_no_kth_path',
          'max_heap_top_is_kth_shortest',
          'same_node_revisit_creates_valid_path',
          'start_node_kth_path',
          'M_can_be_very_large',
        ],
        required_answers: ['no_visited_check_revisit_allowed', 'heap_size_less_than_K_means_no_kth_path', 'max_heap_top_is_kth_shortest'],
        recommended_answers: ['same_node_revisit_creates_valid_path'],
        optional_answers: ['start_node_kth_path', 'M_can_be_very_large'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(M*K*logK)', 'O(M*logN)', 'O(N*M)', 'O(K*M*logN)'],
          accepted_answers: ['O(M*K*logK)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N*K+M)', 'O(N+M)', 'O(N^2)'],
          accepted_answers: ['O(N*K+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_edge_processed_up_to_K_times',
            'per_node_heap_size_K',
            'global_heap_size_up_to_N_K',
            'adjacency_list_size_M',
          ],
          accepted_answers: ['each_edge_processed_up_to_K_times', 'per_node_heap_size_K', 'global_heap_size_up_to_N_K', 'adjacency_list_size_M'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dijkstra_k_heap',
        label: '변형 다익스트라: 각 정점 max-heap(크기 K) 유지',
        pattern_analysis_answer: 'modified_dijkstra_k_heap',
        required_strategy_tags: ['maintain_K_size_max_heap_per_node', 'push_if_heap_size_less_than_K', 'replace_top_if_new_dist_smaller', 'no_visited_check'],
      },
    ],

    common_mistakes: [
      {
        tag: 'visited_check',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'no_visited_check_revisit_allowed' },
        ],
        feedback:
          'K번째 경로를 찾으려면 같은 정점을 여러 번 방문해야 합니다. visited 체크를 하면 K번째 경로를 놓칩니다.',
      },
      {
        tag: 'wrong_output_condition',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'heap_size_less_than_K_means_no_kth_path' },
        ],
        feedback:
          '어떤 정점의 max-heap 크기가 K보다 작으면 K번째 경로가 존재하지 않으므로 -1을 출력해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '각 정점마다 max-heap(크기 K)을 유지. 새 경로가 K번째보다 짧으면 교체. 힙의 top이 K번째 최단 거리.',
      mentor_hint: '핵심은 "visited를 사용하지 않는다"는 것이다. 일반 다익스트라와 달리 같은 정점을 여러 번 확장해야 K개의 경로를 찾을 수 있다.',
      pattern_trigger: '"K번째 최단 경로"가 보이면 → 정점별 K-크기 max-heap을 유지하는 변형 다익스트라를 떠올려라.',
      why_it_works: '전역 min-heap으로 짧은 경로부터 확장하고, 정점별 max-heap으로 K개만 유지하면 K번째까지의 최단 거리를 효율적으로 추적할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1916 — 최소비용 구하기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001916-boj',
    title: '최소비용 구하기',
    difficulty: 'medium',
    domain: 'dijkstra',
    summary: '우선순위 큐를 사용한 다익스트라로 A에서 B까지의 최소 비용을 구하는 기본 최단 경로 문제',
    tags: ['dijkstra', 'shortest-path', 'priority-queue', 'graph'],
    input_type: 'weighted_directed_graph',
    output_type: 'single_value',
    constraints: {
      positive_weights: true,
      single_source_single_dest: true,
      input_size_hint: 'N <= 1000, M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'distance_per_node', 'count', 'boolean_existence', 'traversal_order'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'directed_weighted_graph',
            'positive_or_zero_edge_weights',
            'single_source_to_single_destination',
            'multiple_edges_same_pair_possible',
            'single_integer',
          ],
          accepted_answers: ['directed_weighted_graph', 'positive_or_zero_edge_weights', 'single_source_to_single_destination', 'multiple_edges_same_pair_possible'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'dijkstra_minimum_cost_A_to_B',
            'single_source_shortest_path_to_destination',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dijkstra', 'bellman_ford', 'bfs', 'floyd_warshall', 'topological_sort', 'union_find'],
          accepted_answers: ['dijkstra'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'positive_weights_enable_dijkstra',
            'single_source_shortest_path',
            'priority_queue_efficiency',
            'negative_edges_present',
            'overlapping_subproblems',
          ],
          accepted_answers: ['positive_weights_enable_dijkstra', 'single_source_shortest_path', 'priority_queue_efficiency'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['skip_outdated_entries', 'multiple_edges_handling', 'zero_weight_edges', 'memoization', 'two_pointer'],
          accepted_answers: ['skip_outdated_entries', 'multiple_edges_handling', 'zero_weight_edges'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'min_heap', 'dist_array', 'visited_array', 'edge_list'],
          accepted_answers: ['adjacency_list', 'min_heap', 'dist_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'dijkstra_with_priority_queue',
            'store_all_edges_including_duplicates',
            'output_dist_of_destination',
            'bfs_for_unweighted',
            'bellman_ford_relaxation',
          ],
          accepted_answers: ['dijkstra_with_priority_queue', 'store_all_edges_including_duplicates', 'output_dist_of_destination'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_graph', label: '인접 리스트 구성 (같은 쌍 여러 간선 모두 저장)' },
          { id: 'init_dist', label: 'dist를 INF로 초기화, dist[start]=0, 힙에 추가' },
          { id: 'dijkstra', label: '힙에서 추출 → 스킵 체크 → 인접 정점 완화' },
          { id: 'output', label: 'dist[destination] 출력' },
        ],
        correct_order: ['build_graph', 'init_dist', 'dijkstra', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'multiple_edges_same_pair',
          'zero_cost_edge',
          'skip_outdated_heap_entry',
          'start_equals_destination_possible',
          'self_loop_possible',
          'all_edges_from_start_only',
        ],
        required_answers: ['multiple_edges_same_pair', 'zero_cost_edge', 'skip_outdated_heap_entry'],
        recommended_answers: ['start_equals_destination_possible'],
        optional_answers: ['self_loop_possible', 'all_edges_from_start_only'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O((N+M)logN)', 'O(N*M)', 'O(N^2)', 'O(MlogM)'],
          accepted_answers: ['O((N+M)logN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N+M)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'heap_operations_logN',
            'each_edge_relaxed_once',
            'adjacency_list_size_M',
            'dist_array_size_N',
          ],
          accepted_answers: ['heap_operations_logN', 'each_edge_relaxed_once', 'adjacency_list_size_M', 'dist_array_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dijkstra_basic',
        label: '다익스트라 + 우선순위 큐 기본 구현',
        pattern_analysis_answer: 'dijkstra',
        required_strategy_tags: ['dijkstra_with_priority_queue', 'store_all_edges_including_duplicates', 'output_dist_of_destination'],
      },
    ],

    common_mistakes: [
      {
        tag: 'overwrite_duplicate_edges',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'multiple_edges_same_pair' },
        ],
        feedback:
          '같은 출발-도착 쌍에 여러 버스가 있을 수 있습니다. 인접 리스트에 모두 추가해야 합니다.',
      },
      {
        tag: 'bfs_for_weighted',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'bfs' },
        ],
        feedback:
          '가중치가 다른 그래프에서 BFS는 최단 거리를 보장하지 않습니다. 다익스트라를 사용해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '양의 가중치 방향 그래프, A→B 최소 비용 → 다익스트라. 같은 쌍에 여러 간선이 있을 수 있으므로 모두 저장.',
      mentor_hint: '같은 (출발, 도착) 쌍에 비용이 다른 여러 버스가 있다. 인접 리스트에 모두 추가하면 다익스트라가 자동으로 최솟값을 선택한다.',
      pattern_trigger: '"양의 가중치 + A에서 B까지 최소 비용"이 보이면 → 다익스트라를 떠올려라.',
      why_it_works: '다익스트라는 양의 가중치에서 최단 거리를 탐욕적으로 확정한다. 우선순위 큐로 효율적으로 다음 확장 정점을 선택한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1948 — 임계경로
  // ──────────────────────────────────────────────────────
  {
    id: 'b001948-boj',
    title: '임계경로',
    difficulty: 'hard',
    domain: 'topological_sort_critical_path_backtracking',
    summary: '위상 정렬로 최장 거리를 구한 뒤, 역방향 BFS로 임계 간선(dist[u]+w==dist[v])을 역추적하여 개수를 세는 문제',
    tags: ['topological-sort', 'critical-path', 'dag', 'dp', 'graph'],
    input_type: 'dag_with_edge_weights',
    output_type: 'value_and_count',
    constraints: {
      critical_path_and_edge_count: true,
      reverse_backtracking_needed: true,
      input_size_hint: 'N <= 10000, M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['value_and_count', 'single_value', 'count', 'boolean_existence', 'traversal_order'],
          accepted_answers: ['value_and_count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'dag_with_weighted_edges',
            'longest_path_needed',
            'count_critical_edges',
            'start_and_end_given',
            'single_integer',
          ],
          accepted_answers: ['dag_with_weighted_edges', 'longest_path_needed', 'count_critical_edges', 'start_and_end_given'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'critical_path_length_and_edge_count',
            'topological_sort_longest_path_then_backtrack',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['topological_sort_critical_path', 'dijkstra', 'bfs_dfs', 'floyd_warshall', 'bellman_ford', 'greedy'],
          accepted_answers: ['topological_sort_critical_path'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'dag_longest_path_via_topo_sort',
            'critical_edges_require_backtracking',
            'dist_u_plus_w_equals_dist_v',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['dag_longest_path_via_topo_sort', 'critical_edges_require_backtracking', 'dist_u_plus_w_equals_dist_v'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['reverse_graph_for_backtrack', 'visited_to_avoid_double_count', 'kahn_bfs', 'memoization', 'two_pointer'],
          accepted_answers: ['reverse_graph_for_backtrack', 'visited_to_avoid_double_count', 'kahn_bfs'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list_forward', 'adjacency_list_reverse', 'in_degree_array', 'dist_array', 'queue'],
          accepted_answers: ['adjacency_list_forward', 'adjacency_list_reverse', 'in_degree_array', 'dist_array', 'queue'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'topo_sort_forward_longest_path',
            'reverse_bfs_from_end',
            'count_edges_where_dist_u_plus_w_equals_dist_v',
            'visited_to_prevent_duplicate_edge_count',
            'dfs_all_paths_enumeration',
          ],
          accepted_answers: ['topo_sort_forward_longest_path', 'reverse_bfs_from_end', 'count_edges_where_dist_u_plus_w_equals_dist_v', 'visited_to_prevent_duplicate_edge_count'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_both', label: '정방향 + 역방향 인접 리스트 구성' },
          { id: 'topo_longest', label: '위상 정렬로 1번부터 각 정점까지 최장 거리 계산' },
          { id: 'output_dist', label: 'dist[N] 출력 (최장 경로 길이)' },
          { id: 'reverse_bfs', label: 'N번부터 역방향 BFS로 임계 간선 카운트' },
          { id: 'output_count', label: '임계 간선 수 출력' },
        ],
        correct_order: ['build_both', 'topo_longest', 'output_dist', 'reverse_bfs', 'output_count'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'visited_prevents_duplicate_edge_count',
          'reverse_graph_needed_for_backtracking',
          'critical_edge_condition_dist_u_plus_w_eq_dist_v',
          'multiple_critical_paths_possible',
          'single_path_trivial',
          'all_edges_critical',
        ],
        required_answers: ['visited_prevents_duplicate_edge_count', 'reverse_graph_needed_for_backtracking', 'critical_edge_condition_dist_u_plus_w_eq_dist_v'],
        recommended_answers: ['multiple_critical_paths_possible'],
        optional_answers: ['single_path_trivial', 'all_edges_critical'],
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
          options: ['O(N+M)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'topo_sort_N_plus_M',
            'reverse_bfs_N_plus_M',
            'two_adjacency_lists',
            'dist_and_visited_arrays_size_N',
          ],
          accepted_answers: ['topo_sort_N_plus_M', 'reverse_bfs_N_plus_M', 'two_adjacency_lists', 'dist_and_visited_arrays_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'topo_critical_path',
        label: '위상 정렬 최장 경로 + 역방향 BFS 임계 간선 카운트',
        pattern_analysis_answer: 'topological_sort_critical_path',
        required_strategy_tags: ['topo_sort_forward_longest_path', 'reverse_bfs_from_end', 'count_edges_where_dist_u_plus_w_equals_dist_v', 'visited_to_prevent_duplicate_edge_count'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_visited_backtrack',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'visited_prevents_duplicate_edge_count' },
        ],
        feedback:
          '역추적 시 visited를 사용하지 않으면 같은 간선을 중복 카운트하여 답이 과대 계산됩니다.',
      },
      {
        tag: 'no_reverse_graph',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'reverse_graph_needed_for_backtracking' },
        ],
        feedback:
          '역추적을 위해 역방향 그래프가 필요합니다. 정방향만으로는 도착점에서 출발점 방향으로 효율적으로 추적할 수 없습니다.',
      },
    ],

    review_notes: {
      core_takeaway: '위상 정렬로 최장 거리를 구한 뒤, 도착점부터 역방향 BFS로 dist[u]+w==dist[v]인 간선만 따라가며 카운트.',
      mentor_hint: '역추적에서 visited를 정점 단위로 관리하라. 간선 단위가 아닌 정점 단위로 중복 방문을 막으면 자연스럽게 간선 중복 카운트도 방지된다.',
      pattern_trigger: '"DAG 최장 경로 + 그 경로에 속하는 간선 수"가 보이면 → 위상 정렬 DP + 역추적 BFS를 떠올려라.',
      why_it_works: '위상 정렬은 DAG에서 최장 경로를 O(N+M)에 구한다. 임계 간선은 dist[u]+w==dist[v]를 만족하는 간선이며, 역방향 BFS로 이를 효율적으로 추적한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1976 — 여행 가자
  // ──────────────────────────────────────────────────────
  {
    id: 'b001976-boj',
    title: '여행 가자',
    difficulty: 'medium',
    domain: 'union_find_connectivity',
    summary: 'Union-Find로 도시들의 연결 요소를 관리하여 여행 계획의 모든 도시가 같은 연결 요소에 속하는지 확인하는 문제',
    tags: ['union-find', 'graph', 'connectivity'],
    input_type: 'adjacency_matrix_and_travel_plan',
    output_type: 'boolean',
    constraints: {
      connectivity_check: true,
      order_irrelevant: true,
      input_size_hint: 'N <= 200, M <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['boolean', 'count', 'single_value', 'traversal_order', 'minimum_cost'],
          accepted_answers: ['boolean'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'undirected_adjacency_matrix',
            'travel_plan_cities',
            'connectivity_check_not_path',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['undirected_adjacency_matrix', 'travel_plan_cities', 'connectivity_check_not_path'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'check_all_travel_cities_in_same_component',
            'union_find_connectivity_query',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['union_find', 'bfs_dfs', 'dijkstra', 'floyd_warshall', 'topological_sort', 'greedy'],
          accepted_answers: ['union_find'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'connectivity_check_is_core',
            'same_component_means_reachable',
            'path_order_irrelevant',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['connectivity_check_is_core', 'same_component_means_reachable', 'path_order_irrelevant'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['adjacency_matrix_parsing', 'bfs_alternative', 'find_comparison', 'memoization', 'two_pointer'],
          accepted_answers: ['adjacency_matrix_parsing', 'bfs_alternative', 'find_comparison'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['union_find', 'adjacency_matrix', 'travel_plan_array', 'queue', 'visited_array'],
          accepted_answers: ['union_find', 'travel_plan_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'union_connected_cities',
            'check_all_travel_cities_same_root',
            'read_adjacency_matrix',
            'bfs_from_first_travel_city',
            'floyd_warshall_connectivity',
          ],
          accepted_answers: ['union_connected_cities', 'check_all_travel_cities_same_root', 'read_adjacency_matrix'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_uf', label: 'Union-Find 초기화' },
          { id: 'read_matrix', label: '인접 행렬을 읽으며 연결된 도시 쌍 union' },
          { id: 'read_plan', label: '여행 계획 도시 리스트 읽기' },
          { id: 'check_roots', label: '모든 여행 도시의 find 결과가 동일한지 확인' },
          { id: 'output', label: '같으면 YES, 아니면 NO' },
        ],
        correct_order: ['init_uf', 'read_matrix', 'read_plan', 'check_roots', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'connectivity_not_path_finding',
          'single_city_travel_always_yes',
          'city_numbering_starts_from_1',
          'adjacency_matrix_symmetric',
          'disconnected_components',
          'all_cities_in_plan_same',
        ],
        required_answers: ['connectivity_not_path_finding', 'single_city_travel_always_yes', 'city_numbering_starts_from_1'],
        recommended_answers: ['adjacency_matrix_symmetric'],
        optional_answers: ['disconnected_components', 'all_cities_in_plan_same'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^2*alpha(N))', 'O(N^3)', 'O(N+M)', 'O(N^2)'],
          accepted_answers: ['O(N^2*alpha(N))'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(N+M)'],
          accepted_answers: ['O(N)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'reading_N2_matrix',
            'union_find_nearly_constant_per_op',
            'parent_and_rank_arrays_only',
            'travel_plan_check_M_finds',
          ],
          accepted_answers: ['reading_N2_matrix', 'union_find_nearly_constant_per_op', 'parent_and_rank_arrays_only', 'travel_plan_check_M_finds'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'uf_connectivity_check',
        label: 'Union-Find 연결 요소 확인',
        pattern_analysis_answer: 'union_find',
        required_strategy_tags: ['union_connected_cities', 'check_all_travel_cities_same_root', 'read_adjacency_matrix'],
      },
    ],

    common_mistakes: [
      {
        tag: 'path_finding_attempt',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'connectivity_not_path_finding' },
        ],
        feedback:
          '실제 경로를 구할 필요 없이 연결 여부만 확인하면 됩니다. 같은 연결 요소 안에 있으면 어떤 순서든 이동 가능합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '여행 도시가 모두 같은 연결 요소에 속하면 YES. 순서와 무관하게 연결만 확인하면 된다.',
      mentor_hint: '"경로가 있는가"를 물을 때 실제 경로를 구하지 말고 연결성만 확인하라. Union-Find가 가장 간결하다.',
      pattern_trigger: '"여러 도시/노드가 서로 도달 가능한가"가 보이면 → Union-Find 연결 요소 확인을 떠올려라.',
      why_it_works: '같은 연결 요소에 속한 두 정점은 반드시 경로가 존재한다. Union-Find로 연결 요소를 관리하면 O(alpha(N))에 질의 가능.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2251 — 물통
  // ──────────────────────────────────────────────────────
  {
    id: 'b002251-boj',
    title: '물통',
    difficulty: 'medium',
    domain: 'bfs_state_space_search',
    summary: '상태를 (A의 물, B의 물)로 정의하고 BFS로 모든 도달 가능 상태를 탐색하여 A가 비었을 때 C의 물 양을 수집하는 문제',
    tags: ['bfs', 'graph', 'state-space-search'],
    input_type: 'three_integers',
    output_type: 'sorted_list',
    constraints: {
      state_space_small: true,
      six_transitions_per_state: true,
      input_size_hint: 'A, B, C <= 200',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['sorted_list', 'count', 'single_value', 'boolean_existence', 'minimum_steps'],
          accepted_answers: ['sorted_list'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'three_bucket_capacities',
            'initial_state_C_full',
            'collect_C_values_when_A_empty',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['three_bucket_capacities', 'initial_state_C_full', 'collect_C_values_when_A_empty'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'bfs_state_space_water_pouring',
            'find_all_C_values_when_A_is_zero',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bfs_state_space', 'dfs', 'greedy', 'math_formula', 'simulation', 'dp'],
          accepted_answers: ['bfs_state_space'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'state_defined_by_water_amounts',
            'explore_all_reachable_states',
            'small_state_space_200x200',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['state_defined_by_water_amounts', 'explore_all_reachable_states', 'small_state_space_200x200'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['six_pour_transitions', 'visited_2d_array', 'c_determined_by_a_b', 'memoization', 'two_pointer'],
          accepted_answers: ['six_pour_transitions', 'visited_2d_array', 'c_determined_by_a_b'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['queue', 'visited_2d_array', 'result_set', 'adjacency_list', 'stack'],
          accepted_answers: ['queue', 'visited_2d_array', 'result_set'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'state_as_a_b_pair',
            'six_transitions_pour_each_direction',
            'bfs_from_initial_0_0',
            'collect_c_when_a_is_zero',
            'greedy_pouring_strategy',
          ],
          accepted_answers: ['state_as_a_b_pair', 'six_transitions_pour_each_direction', 'bfs_from_initial_0_0', 'collect_c_when_a_is_zero'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init', label: '초기 상태 (0, 0) → c=C, visited[0][0] = true, 큐에 추가' },
          { id: 'bfs', label: '큐에서 상태 꺼내 6가지 물 옮기기 시도' },
          { id: 'pour', label: '각 방향 물 옮기기: 옮기는 양 = min(출발 물 양, 도착 남은 용량)' },
          { id: 'collect', label: 'a == 0인 상태에서 c값 수집' },
          { id: 'output', label: '수집된 c값을 오름차순 출력' },
        ],
        correct_order: ['init', 'bfs', 'pour', 'collect', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'six_pour_directions_all_handled',
          'pour_amount_min_source_remaining_capacity',
          'ascending_output_order',
          'initial_state_a0_b0_cC',
          'a_equals_0_includes_initial_state',
          'all_same_capacity',
        ],
        required_answers: ['six_pour_directions_all_handled', 'pour_amount_min_source_remaining_capacity', 'ascending_output_order'],
        recommended_answers: ['initial_state_a0_b0_cC', 'a_equals_0_includes_initial_state'],
        optional_answers: ['all_same_capacity'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(A*B)', 'O(A*B*C)', 'O(A+B+C)', 'O(2^(A+B))'],
          accepted_answers: ['O(A*B)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(A*B)', 'O(A*B*C)', 'O(A+B)'],
          accepted_answers: ['O(A*B)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'state_space_A_times_B',
            'c_determined_by_a_and_b',
            'visited_array_A_by_B',
            'queue_max_A_times_B',
          ],
          accepted_answers: ['state_space_A_times_B', 'c_determined_by_a_and_b', 'visited_array_A_by_B'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'bfs_water_state',
        label: 'BFS 상태 공간 탐색 (a, b) → c = C - a - b',
        pattern_analysis_answer: 'bfs_state_space',
        required_strategy_tags: ['state_as_a_b_pair', 'six_transitions_pour_each_direction', 'bfs_from_initial_0_0', 'collect_c_when_a_is_zero'],
      },
    ],

    common_mistakes: [
      {
        tag: 'missing_pour_direction',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'six_pour_directions_all_handled' },
        ],
        feedback:
          '6가지 물 옮기기(A→B, A→C, B→A, B→C, C→A, C→B)를 모두 처리해야 합니다. 누락하면 도달 가능한 상태를 놓칩니다.',
      },
      {
        tag: 'wrong_pour_amount',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'pour_amount_min_source_remaining_capacity' },
        ],
        feedback:
          '물을 옮길 때 옮기는 양은 min(출발 물통의 현재량, 도착 물통의 남은 용량)입니다. 이를 잘못 계산하면 물통이 넘치거나 음수가 됩니다.',
      },
    ],

    review_notes: {
      core_takeaway: '상태를 (a, b)로 정의하고 c=C-a-b로 결정. BFS로 6방향 물 옮기기를 수행하여 모든 도달 가능 상태를 탐색. a==0일 때 c값 수집.',
      mentor_hint: '상태 공간이 200x200=40,000으로 매우 작다. BFS로 완전 탐색이 가능하므로 복잡한 수학적 풀이가 필요 없다.',
      pattern_trigger: '"제한된 상태 공간에서 모든 가능한 상태를 탐색"이 보이면 → BFS 상태 탐색을 떠올려라.',
      why_it_works: '물의 총량은 보존되므로 (a, b)만 알면 c가 결정된다. 상태 수가 유한하고 작으므로 BFS로 완전 탐색이 가능하다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2252 — 줄 세우기
  // ──────────────────────────────────────────────────────
  {
    id: 'b002252-boj',
    title: '줄 세우기',
    difficulty: 'medium',
    domain: 'topological_sort_kahn',
    summary: 'Kahn 알고리즘(BFS 위상 정렬)으로 키 비교 결과를 반영한 유효한 줄 세우기 순서를 구하는 문제',
    tags: ['topological-sort', 'dag', 'graph'],
    input_type: 'directed_edges',
    output_type: 'ordered_list',
    constraints: {
      any_valid_topological_order: true,
      no_cycle_guaranteed: true,
      input_size_hint: 'N <= 32000, M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['ordered_list', 'count', 'single_value', 'boolean_existence', 'minimum_cost'],
          accepted_answers: ['ordered_list'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'partial_order_constraints',
            'dag_guaranteed',
            'any_valid_order_accepted',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['partial_order_constraints', 'dag_guaranteed', 'any_valid_order_accepted'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'topological_sort_any_valid_order',
            'kahn_bfs_ordering',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['topological_sort_kahn', 'topological_sort_dfs', 'bfs', 'sorting', 'greedy', 'union_find'],
          accepted_answers: ['topological_sort_kahn'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'partial_order_requires_topological_sort',
            'dag_structure',
            'in_degree_zero_first',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['partial_order_requires_topological_sort', 'dag_structure', 'in_degree_zero_first'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['dfs_post_order_reverse', 'queue_based_bfs', 'in_degree_tracking', 'memoization', 'two_pointer'],
          accepted_answers: ['dfs_post_order_reverse', 'queue_based_bfs', 'in_degree_tracking'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'in_degree_array', 'queue', 'result_array', 'stack'],
          accepted_answers: ['adjacency_list', 'in_degree_array', 'queue', 'result_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'compute_in_degrees',
            'enqueue_zero_in_degree',
            'dequeue_and_reduce_neighbors',
            'dfs_reverse_post_order',
            'sort_by_comparison_count',
          ],
          accepted_answers: ['compute_in_degrees', 'enqueue_zero_in_degree', 'dequeue_and_reduce_neighbors'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_graph', label: '인접 리스트와 진입 차수 배열 구성' },
          { id: 'enqueue', label: '진입 차수 0인 노드를 큐에 추가' },
          { id: 'dequeue', label: '큐에서 꺼내 결과에 추가' },
          { id: 'reduce', label: '인접 노드의 진입 차수 감소, 0이 되면 큐에 추가' },
          { id: 'output', label: '결과 순서 출력' },
        ],
        correct_order: ['build_graph', 'enqueue', 'dequeue', 'reduce', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'multiple_valid_orders',
          'no_cycle_guaranteed',
          'multiple_zero_in_degree_nodes',
          'isolated_nodes',
          'N_1_trivial_case',
          'large_N_M_efficient_impl_needed',
        ],
        required_answers: ['multiple_valid_orders', 'no_cycle_guaranteed', 'multiple_zero_in_degree_nodes'],
        recommended_answers: ['isolated_nodes'],
        optional_answers: ['N_1_trivial_case', 'large_N_M_efficient_impl_needed'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+M)', 'O(N*M)', 'O(NlogN)', 'O(N^2)'],
          accepted_answers: ['O(N+M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N+M)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_node_and_edge_processed_once',
            'adjacency_list_N_plus_M',
            'queue_and_in_degree_size_N',
            'no_repeated_processing',
          ],
          accepted_answers: ['each_node_and_edge_processed_once', 'adjacency_list_N_plus_M', 'queue_and_in_degree_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'kahn_topological',
        label: 'Kahn 알고리즘 (BFS 위상 정렬)',
        pattern_analysis_answer: 'topological_sort_kahn',
        required_strategy_tags: ['compute_in_degrees', 'enqueue_zero_in_degree', 'dequeue_and_reduce_neighbors'],
      },
    ],

    common_mistakes: [
      {
        tag: 'dfs_wrong_order',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'topological_sort_dfs' },
        ],
        feedback:
          'DFS 위상 정렬도 올바르지만, 방문 순서가 아닌 후위 순서의 역순이 위상 정렬임을 명심하세요.',
      },
    ],

    review_notes: {
      core_takeaway: 'Kahn 알고리즘: 진입 차수 0인 노드부터 큐에 넣고, 꺼내면서 인접 노드의 진입 차수를 줄인다. 0이 되면 큐에 추가.',
      mentor_hint: '답이 유일하지 않으므로 어떤 유효한 순서든 출력하면 된다. 진입 차수 0인 노드가 여러 개면 아무거나 먼저 뽑아도 된다.',
      pattern_trigger: '"순서 제약이 있는 정렬"이 보이면 → 위상 정렬(Kahn 또는 DFS)을 떠올려라.',
      why_it_works: 'DAG에서 진입 차수 0인 노드는 선행 조건이 없으므로 맨 앞에 올 수 있다. 이를 반복하면 유효한 위상 순서가 된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11403 — 경로 찾기
  // ──────────────────────────────────────────────────────
  {
    id: 'b011403-boj',
    title: '경로 찾기',
    difficulty: 'easy',
    domain: 'floyd_warshall_transitive_closure',
    summary: '플로이드-워셜을 boolean 전이적 폐포로 변형하여 모든 정점 쌍의 도달 가능 여부를 구하는 문제',
    tags: ['floyd-warshall', 'graph', 'transitive-closure'],
    input_type: 'adjacency_matrix',
    output_type: 'boolean_matrix',
    constraints: {
      transitive_closure: true,
      self_loop_via_cycle: true,
      input_size_hint: 'N <= 100',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['boolean_matrix', 'count', 'single_value', 'boolean_existence', 'minimum_cost'],
          accepted_answers: ['boolean_matrix'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'directed_adjacency_matrix',
            'all_pairs_reachability',
            'indirect_paths_included',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['directed_adjacency_matrix', 'all_pairs_reachability', 'indirect_paths_included'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'floyd_warshall_boolean_transitive_closure',
            'all_pairs_reachability_check',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['floyd_warshall_closure', 'bfs_per_node', 'dfs_per_node', 'dijkstra', 'union_find', 'topological_sort'],
          accepted_answers: ['floyd_warshall_closure'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'all_pairs_reachability',
            'boolean_version_of_floyd',
            'N_small_N3_feasible',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['all_pairs_reachability', 'boolean_version_of_floyd', 'N_small_N3_feasible'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bfs_N_times_alternative', 'or_and_operations', 'k_loop_outermost', 'memoization', 'two_pointer'],
          accepted_answers: ['bfs_N_times_alternative', 'or_and_operations', 'k_loop_outermost'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['boolean_2d_array', 'adjacency_list', 'queue', 'dist_array', 'union_find'],
          accepted_answers: ['boolean_2d_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'floyd_boolean_or_and',
            'k_loop_outermost',
            'read_adjacency_matrix',
            'bfs_from_each_node',
            'dfs_from_each_node',
          ],
          accepted_answers: ['floyd_boolean_or_and', 'k_loop_outermost', 'read_adjacency_matrix'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_matrix', label: '인접 행렬 입력으로 reach[i][j] 초기화' },
          { id: 'floyd', label: '삼중 루프: reach[i][j] |= (reach[i][k] & reach[k][j]), k 바깥' },
          { id: 'output', label: 'reach 행렬 출력' },
        ],
        correct_order: ['read_matrix', 'floyd', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'k_loop_must_be_outermost',
          'self_loop_possible_via_cycle',
          'directed_graph_not_symmetric',
          'no_initial_self_reachability',
          'zero_indexed_vs_one_indexed',
          'all_zeros_no_edges',
        ],
        required_answers: ['k_loop_must_be_outermost', 'self_loop_possible_via_cycle', 'directed_graph_not_symmetric'],
        recommended_answers: ['no_initial_self_reachability'],
        optional_answers: ['zero_indexed_vs_one_indexed', 'all_zeros_no_edges'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^3)', 'O(N^2)', 'O(N*(N+E))', 'O(NlogN)'],
          accepted_answers: ['O(N^3)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N^2)', 'O(N)', 'O(N+E)'],
          accepted_answers: ['O(N^2)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'triple_loop_N3',
            'boolean_matrix_N2',
            'N_100_so_10_6_operations',
            'in_place_update_no_extra_space',
          ],
          accepted_answers: ['triple_loop_N3', 'boolean_matrix_N2', 'N_100_so_10_6_operations'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'floyd_transitive',
        label: '플로이드-워셜 boolean 전이적 폐포',
        pattern_analysis_answer: 'floyd_warshall_closure',
        required_strategy_tags: ['floyd_boolean_or_and', 'k_loop_outermost', 'read_adjacency_matrix'],
      },
    ],

    common_mistakes: [
      {
        tag: 'adjacency_only',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'not_equals', value: 'floyd_warshall_closure' },
        ],
        feedback:
          '인접 행렬을 그대로 출력하면 간접 경로(길이 2 이상)를 놓칩니다. 플로이드-워셜이나 BFS로 전이적 폐포를 구해야 합니다.',
      },
      {
        tag: 'k_not_outer',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'k_loop_must_be_outermost' },
        ],
        feedback:
          'k(중간 정점) 루프가 가장 바깥에 있어야 합니다. 안쪽에 배치하면 중간 정점을 통한 경로를 올바르게 계산하지 못합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '플로이드-워셜을 boolean으로 변형: reach[i][j] |= reach[i][k] & reach[k][j]. k 루프가 반드시 바깥.',
      mentor_hint: '자기 자신으로의 경로도 사이클을 통해 존재할 수 있다. reach[i][i]를 0으로 초기화하되, 플로이드 후 갱신될 수 있음을 인지하라.',
      pattern_trigger: '"모든 쌍의 도달 가능 여부"가 보이고 N이 작으면 → 플로이드-워셜 boolean 변형을 떠올려라.',
      why_it_works: '플로이드-워셜의 점화식을 min/+에서 OR/AND로 바꾸면 전이적 폐포가 된다. 중간 정점 k를 거쳐 i→j로 갈 수 있으면 도달 가능.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11404 — 플로이드
  // ──────────────────────────────────────────────────────
  {
    id: 'b011404-boj',
    title: '플로이드',
    difficulty: 'medium',
    domain: 'floyd_warshall_all_pairs_shortest',
    summary: '플로이드-워셜 알고리즘으로 모든 도시 쌍의 최소 비용을 구하는 전형적인 문제',
    tags: ['floyd-warshall', 'shortest-path', 'graph', 'dp'],
    input_type: 'weighted_directed_edges',
    output_type: 'distance_matrix',
    constraints: {
      multiple_edges_same_pair: true,
      no_path_output_zero: true,
      input_size_hint: 'N <= 100, M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['distance_matrix', 'single_value', 'count', 'boolean_matrix', 'minimum_cost'],
          accepted_answers: ['distance_matrix'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'directed_weighted_graph',
            'all_pairs_shortest_path',
            'multiple_buses_same_pair',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['directed_weighted_graph', 'all_pairs_shortest_path', 'multiple_buses_same_pair'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'floyd_warshall_all_pairs_shortest_path',
            'N_small_all_pairs_distance',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['floyd_warshall', 'dijkstra_n_times', 'bellman_ford', 'bfs', 'topological_sort', 'union_find'],
          accepted_answers: ['floyd_warshall'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'all_pairs_shortest_needed',
            'N_100_allows_N3',
            'simple_triple_loop',
            'negative_edges_present',
            'overlapping_subproblems',
          ],
          accepted_answers: ['all_pairs_shortest_needed', 'N_100_allows_N3', 'simple_triple_loop'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['keep_minimum_of_duplicates', 'INF_overflow_check', 'k_outermost_loop', 'memoization', 'two_pointer'],
          accepted_answers: ['keep_minimum_of_duplicates', 'INF_overflow_check', 'k_outermost_loop'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['dist_2d_array', 'adjacency_list', 'priority_queue', 'edge_list', 'union_find'],
          accepted_answers: ['dist_2d_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'init_self_zero_rest_INF',
            'keep_min_for_duplicate_edges',
            'floyd_triple_loop_k_outer',
            'convert_INF_to_zero_in_output',
            'dijkstra_from_each_node',
          ],
          accepted_answers: ['init_self_zero_rest_INF', 'keep_min_for_duplicate_edges', 'floyd_triple_loop_k_outer', 'convert_INF_to_zero_in_output'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init', label: 'dist[i][i]=0, 나머지 INF, 간선 입력 시 최솟값 유지' },
          { id: 'floyd', label: '삼중 루프: dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j]), k 바깥' },
          { id: 'convert', label: 'INF를 0으로 변환하여 출력' },
        ],
        correct_order: ['init', 'floyd', 'convert'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'multiple_edges_keep_minimum',
          'INF_plus_INF_overflow',
          'k_loop_outermost',
          'no_path_output_zero',
          'self_distance_zero',
          'directed_not_symmetric',
        ],
        required_answers: ['multiple_edges_keep_minimum', 'INF_plus_INF_overflow', 'k_loop_outermost', 'no_path_output_zero'],
        recommended_answers: ['self_distance_zero'],
        optional_answers: ['directed_not_symmetric'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^3)', 'O(N^2*M)', 'O(N*(N+M)logN)', 'O(N^2)'],
          accepted_answers: ['O(N^3)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N^2)', 'O(N+M)', 'O(N)'],
          accepted_answers: ['O(N^2)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'triple_loop_N3',
            'dist_matrix_N2',
            'N_100_gives_10_6',
            'no_additional_data_structures',
          ],
          accepted_answers: ['triple_loop_N3', 'dist_matrix_N2', 'N_100_gives_10_6'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'floyd_warshall_basic',
        label: '플로이드-워셜 기본 구현 (중복 간선 처리 + INF 변환)',
        pattern_analysis_answer: 'floyd_warshall',
        required_strategy_tags: ['init_self_zero_rest_INF', 'keep_min_for_duplicate_edges', 'floyd_triple_loop_k_outer', 'convert_INF_to_zero_in_output'],
      },
    ],

    common_mistakes: [
      {
        tag: 'overwrite_duplicate',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'multiple_edges_keep_minimum' },
        ],
        feedback:
          '같은 (출발, 도착) 쌍에 여러 버스가 있을 때 최솟값만 저장해야 합니다. 마지막 값으로 덮어쓰면 최소가 아닐 수 있습니다.',
      },
      {
        tag: 'INF_overflow',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'INF_plus_INF_overflow' },
        ],
        feedback:
          'dist[i][k] + dist[k][j]에서 두 값이 모두 INF이면 오버플로가 발생합니다. 갱신 전에 dist[i][k] != INF를 체크해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '플로이드-워셜: dist[i][j] = min(dist[i][j], dist[i][k]+dist[k][j]). k 루프 바깥. 중복 간선은 최솟값 유지. INF는 0으로 출력.',
      mentor_hint: '세 가지를 주의하라: 1) 중복 간선은 min 유지 2) k 루프는 가장 바깥 3) INF+INF 오버플로 방지.',
      pattern_trigger: '"모든 쌍 최단 거리"가 필요하고 N <= 수백이면 → 플로이드-워셜 O(N^3)을 떠올려라.',
      why_it_works: '플로이드-워셜은 DP: "정점 {1..k}를 중간에 거칠 수 있을 때의 최단 거리"를 k를 늘려가며 갱신한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11657 — 타임머신
  // ──────────────────────────────────────────────────────
  {
    id: 'b011657-boj',
    title: '타임머신',
    difficulty: 'medium',
    domain: 'bellman_ford_negative_cycle',
    summary: '벨만-포드 알고리즘으로 음의 가중치가 있는 그래프에서 최단 경로를 구하고, 음의 사이클을 검출하는 문제',
    tags: ['bellman-ford', 'shortest-path', 'negative-cycle', 'graph'],
    input_type: 'weighted_directed_graph',
    output_type: 'distance_per_node_or_special',
    constraints: {
      negative_weights: true,
      negative_cycle_detection: true,
      input_size_hint: 'N <= 500, M <= 6000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['distance_per_node_or_special', 'single_value', 'count', 'boolean_existence', 'traversal_order'],
          accepted_answers: ['distance_per_node_or_special'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'directed_graph_with_negative_weights',
            'single_source_shortest_path',
            'negative_cycle_means_minus_1',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['directed_graph_with_negative_weights', 'single_source_shortest_path', 'negative_cycle_means_minus_1'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'bellman_ford_with_negative_cycle_detection',
            'shortest_path_with_negative_edges',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bellman_ford', 'dijkstra', 'floyd_warshall', 'bfs', 'topological_sort', 'spfa'],
          accepted_answers: ['bellman_ford'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'negative_weights_prohibit_dijkstra',
            'negative_cycle_detection_needed',
            'N_minus_1_relaxations_then_check',
            'positive_weights_only',
            'overlapping_subproblems',
          ],
          accepted_answers: ['negative_weights_prohibit_dijkstra', 'negative_cycle_detection_needed', 'N_minus_1_relaxations_then_check'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['long_long_for_dist', 'unreachable_minus_1_output', 'edge_list_representation', 'memoization', 'two_pointer'],
          accepted_answers: ['long_long_for_dist', 'unreachable_minus_1_output', 'edge_list_representation'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['edge_list', 'dist_array', 'adjacency_list', 'priority_queue', 'visited_array'],
          accepted_answers: ['edge_list', 'dist_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'relax_all_edges_N_minus_1_times',
            'check_Nth_iteration_for_cycle',
            'init_dist_INF_start_zero',
            'dijkstra_with_negative_handling',
            'spfa_queue_optimization',
          ],
          accepted_answers: ['relax_all_edges_N_minus_1_times', 'check_Nth_iteration_for_cycle', 'init_dist_INF_start_zero'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init', label: 'dist를 INF로 초기화, dist[1]=0' },
          { id: 'relax', label: 'N-1번 모든 간선 완화' },
          { id: 'check_cycle', label: 'N번째 반복에서 갱신 발생 시 음의 사이클' },
          { id: 'output', label: '음의 사이클이면 -1, 아니면 각 도시의 dist 출력 (INF면 -1)' },
        ],
        correct_order: ['init', 'relax', 'check_cycle', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'long_long_for_dist_overflow',
          'unreachable_output_minus_1',
          'negative_cycle_output_first_line_minus_1',
          'only_relax_reachable_nodes',
          'self_loop_with_negative_weight',
          'N_equals_1_no_edges',
        ],
        required_answers: ['long_long_for_dist_overflow', 'unreachable_output_minus_1', 'negative_cycle_output_first_line_minus_1'],
        recommended_answers: ['only_relax_reachable_nodes'],
        optional_answers: ['self_loop_with_negative_weight', 'N_equals_1_no_edges'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(V*E)', 'O(V^3)', 'O(E*logV)', 'O(V+E)'],
          accepted_answers: ['O(V*E)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(V+E)', 'O(V)', 'O(V^2)'],
          accepted_answers: ['O(V+E)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'V_iterations_times_E_edges',
            '500_times_6000_equals_3M',
            'edge_list_size_E',
            'dist_array_size_V',
          ],
          accepted_answers: ['V_iterations_times_E_edges', '500_times_6000_equals_3M', 'edge_list_size_E', 'dist_array_size_V'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'bellman_ford_negative_cycle',
        label: '벨만-포드: N-1번 완화 + N번째 사이클 검출',
        pattern_analysis_answer: 'bellman_ford',
        required_strategy_tags: ['relax_all_edges_N_minus_1_times', 'check_Nth_iteration_for_cycle', 'init_dist_INF_start_zero'],
      },
    ],

    common_mistakes: [
      {
        tag: 'use_dijkstra',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dijkstra' },
        ],
        feedback:
          '음의 가중치가 있는 그래프에서 다익스트라는 올바른 결과를 보장하지 않습니다. 벨만-포드를 사용해야 합니다.',
      },
      {
        tag: 'int_overflow',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'long_long_for_dist_overflow' },
        ],
        feedback:
          '음수 가중치가 누적되면 int 범위를 넘어갈 수 있습니다. dist 배열을 long long으로 선언해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '음의 가중치 → 다익스트라 불가 → 벨만-포드. N-1번 완화 후 N번째에 갱신 발생하면 음의 사이클.',
      mentor_hint: '벨만-포드에서 dist 타입을 long long으로 선언하라. 음수가 계속 누적되면 int 범위를 초과할 수 있다.',
      pattern_trigger: '"음의 가중치 + 최단 경로 + 음의 사이클 검출"이 보이면 → 벨만-포드를 떠올려라.',
      why_it_works: '벨만-포드는 최대 V-1개의 간선을 사용하는 최단 경로를 구한다. V번째 반복에서 여전히 갱신되면 음의 사이클이 존재하여 거리가 무한히 줄어들 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 17472 — 다리 만들기 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b017472-boj',
    title: '다리 만들기 2',
    difficulty: 'hard',
    domain: 'bfs_labeling_bridge_enumeration_mst',
    summary: 'BFS로 섬을 라벨링하고, 직선 탐색으로 다리 후보를 열거한 뒤, Kruskal MST로 모든 섬을 최소 비용으로 연결하는 복합 문제',
    tags: ['bfs', 'mst', 'implementation', 'union-find', 'graph'],
    input_type: 'grid_map',
    output_type: 'single_value',
    constraints: {
      bridge_straight_line_only: true,
      bridge_length_at_least_2: true,
      input_size_hint: 'N, M <= 10, islands <= 6',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['single_value', 'count', 'boolean_existence', 'traversal_order', 'grid_output'],
          accepted_answers: ['single_value'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'grid_with_islands',
            'connect_all_islands_with_bridges',
            'bridges_must_be_straight',
            'bridge_length_min_2',
            'single_integer',
          ],
          accepted_answers: ['grid_with_islands', 'connect_all_islands_with_bridges', 'bridges_must_be_straight', 'bridge_length_min_2'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'bfs_labeling_bridge_enumeration_kruskal_MST',
            'connect_all_islands_with_minimum_straight_bridges',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bfs_plus_mst', 'dijkstra', 'bfs_only', 'greedy', 'dp', 'floyd_warshall'],
          accepted_answers: ['bfs_plus_mst'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'island_labeling_needs_bfs',
            'bridge_enumeration_brute_force',
            'connect_all_islands_minimum_cost_is_mst',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['island_labeling_needs_bfs', 'bridge_enumeration_brute_force', 'connect_all_islands_minimum_cost_is_mst'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['four_direction_scan', 'union_find_for_mst', 'grid_bfs', 'memoization', 'two_pointer'],
          accepted_answers: ['four_direction_scan', 'union_find_for_mst', 'grid_bfs'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['grid_label_array', 'edge_list', 'union_find', 'queue', 'adjacency_matrix'],
          accepted_answers: ['grid_label_array', 'edge_list', 'union_find', 'queue'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'bfs_island_labeling',
            'straight_line_bridge_scan',
            'filter_bridges_length_ge_2',
            'kruskal_mst_on_bridges',
            'check_all_islands_connected',
          ],
          accepted_answers: ['bfs_island_labeling', 'straight_line_bridge_scan', 'filter_bridges_length_ge_2', 'kruskal_mst_on_bridges', 'check_all_islands_connected'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'label_islands', label: 'BFS로 각 섬에 번호 부여' },
          { id: 'scan_bridges', label: '각 육지 칸에서 4방향으로 직선 탐색하여 다리 후보 수집' },
          { id: 'filter_bridges', label: '길이 2 미만, 같은 섬 연결 다리 제거' },
          { id: 'kruskal', label: '다리를 간선으로 Kruskal MST 수행' },
          { id: 'output', label: '모든 섬 연결되면 MST 가중치, 불가면 -1' },
        ],
        correct_order: ['label_islands', 'scan_bridges', 'filter_bridges', 'kruskal', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'bridge_straight_only_no_bend',
          'bridge_min_length_2',
          'bridge_over_sea_only_no_land_between',
          'same_island_pair_multiple_bridges',
          'cannot_connect_all_output_minus_1',
          'island_count_2_minimum',
        ],
        required_answers: ['bridge_straight_only_no_bend', 'bridge_min_length_2', 'bridge_over_sea_only_no_land_between'],
        recommended_answers: ['same_island_pair_multiple_bridges', 'cannot_connect_all_output_minus_1'],
        optional_answers: ['island_count_2_minimum'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N*M*max(N,M)+ElogE)', 'O(N^2*M^2)', 'O((N*M)^2)', 'O(NM)'],
          accepted_answers: ['O(N*M*max(N,M)+ElogE)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N*M+E)', 'O(N*M)', 'O(N^2*M^2)'],
          accepted_answers: ['O(N*M+E)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'bfs_labeling_NM',
            'bridge_scan_NM_times_max_NM',
            'kruskal_sort_ElogE',
            'grid_and_edge_storage',
          ],
          accepted_answers: ['bfs_labeling_NM', 'bridge_scan_NM_times_max_NM', 'kruskal_sort_ElogE', 'grid_and_edge_storage'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'bfs_bridge_mst',
        label: 'BFS 라벨링 + 직선 다리 열거 + Kruskal MST',
        pattern_analysis_answer: 'bfs_plus_mst',
        required_strategy_tags: ['bfs_island_labeling', 'straight_line_bridge_scan', 'filter_bridges_length_ge_2', 'kruskal_mst_on_bridges', 'check_all_islands_connected'],
      },
    ],

    common_mistakes: [
      {
        tag: 'bridge_length_1',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'bridge_min_length_2' },
        ],
        feedback:
          '다리 길이가 2 이상이어야 합니다. 인접한 섬 사이(길이 1)에는 다리를 놓을 수 없습니다.',
      },
      {
        tag: 'bridge_bends',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'bridge_straight_only_no_bend' },
        ],
        feedback:
          '다리는 가로 또는 세로로 직선으로만 놓을 수 있습니다. 꺾이는 다리는 허용되지 않습니다.',
      },
      {
        tag: 'land_between_bridge',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'bridge_over_sea_only_no_land_between' },
        ],
        feedback:
          '다리 중간에 다른 섬(육지)이 있으면 그 다리는 유효하지 않습니다. 바다 위로만 놓아야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '3단계: 1) BFS 섬 라벨링 2) 직선 탐색으로 다리 열거(길이 >= 2, 바다 위만) 3) Kruskal MST로 모든 섬 연결.',
      mentor_hint: '이 문제는 구현량이 많다. 각 단계를 독립적인 함수로 분리하여 구현하라. 특히 다리 스캔에서 중간에 육지가 있으면 중단해야 한다.',
      pattern_trigger: '"그리드 위의 여러 컴포넌트를 최소 비용으로 연결"이 보이면 → BFS 라벨링 + 간선 열거 + MST를 떠올려라.',
      why_it_works: '섬을 노드, 다리를 간선으로 추상화하면 MST 문제가 된다. 다리 열거는 직선 제약으로 O(N*M*max(N,M))에 가능하고, MST는 간선 수가 적어 빠르다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 18352 — 특정 거리의 도시 찾기
  // ──────────────────────────────────────────────────────
  {
    id: 'b018352-boj',
    title: '특정 거리의 도시 찾기',
    difficulty: 'easy',
    domain: 'bfs_distance_k',
    summary: '가중치 1인 그래프에서 BFS로 최단 거리를 구하고, 거리가 정확히 K인 도시를 오름차순 출력하는 문제',
    tags: ['bfs', 'shortest-path', 'graph'],
    input_type: 'unweighted_directed_graph',
    output_type: 'sorted_list',
    constraints: {
      unit_weight_edges: true,
      exact_distance_K: true,
      input_size_hint: 'N <= 300000, M <= 1000000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['sorted_list', 'count', 'single_value', 'boolean_existence', 'traversal_order'],
          accepted_answers: ['sorted_list'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'directed_unweighted_graph',
            'unit_edge_weight',
            'find_nodes_at_exact_distance_K',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['directed_unweighted_graph', 'unit_edge_weight', 'find_nodes_at_exact_distance_K'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'bfs_find_nodes_at_distance_K',
            'unit_weight_shortest_distance_filtering',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bfs', 'dijkstra', 'dfs', 'bellman_ford', 'floyd_warshall', 'union_find'],
          accepted_answers: ['bfs'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'unit_weight_bfs_gives_shortest_distance',
            'bfs_level_equals_distance',
            'efficient_O_N_plus_M',
            'negative_edges_present',
            'overlapping_subproblems',
          ],
          accepted_answers: ['unit_weight_bfs_gives_shortest_distance', 'bfs_level_equals_distance', 'efficient_O_N_plus_M'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['dist_array_tracking', 'result_sorting', 'adjacency_list_large_graph', 'memoization', 'two_pointer'],
          accepted_answers: ['dist_array_tracking', 'result_sorting', 'adjacency_list_large_graph'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'dist_array', 'queue', 'priority_queue', 'visited_array'],
          accepted_answers: ['adjacency_list', 'dist_array', 'queue'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'bfs_from_X',
            'dist_array_init_minus_1',
            'collect_nodes_with_dist_K',
            'sort_result_ascending',
            'dijkstra_overkill',
          ],
          accepted_answers: ['bfs_from_X', 'dist_array_init_minus_1', 'collect_nodes_with_dist_K', 'sort_result_ascending'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_graph', label: '인접 리스트 구성' },
          { id: 'init_dist', label: 'dist를 -1로 초기화, dist[X]=0, 큐에 X 추가' },
          { id: 'bfs', label: 'BFS 수행하며 dist 갱신' },
          { id: 'collect', label: 'dist[v] == K인 노드 수집' },
          { id: 'output', label: '오름차순 정렬하여 출력, 없으면 -1' },
        ],
        correct_order: ['build_graph', 'init_dist', 'bfs', 'collect', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'use_adjacency_list_not_matrix',
          'no_result_output_minus_1',
          'ascending_order_output',
          'dist_minus_1_as_unvisited',
          'large_N_M_efficient_bfs',
          'K_larger_than_max_distance',
        ],
        required_answers: ['use_adjacency_list_not_matrix', 'no_result_output_minus_1', 'ascending_order_output'],
        recommended_answers: ['dist_minus_1_as_unvisited', 'large_N_M_efficient_bfs'],
        optional_answers: ['K_larger_than_max_distance'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N+M)', 'O(N*M)', 'O(NlogN)', 'O(N^2)'],
          accepted_answers: ['O(N+M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N+M)', 'O(N)', 'O(N^2)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'bfs_visits_each_node_edge_once',
            'adjacency_list_N_plus_M',
            'dist_array_size_N',
            'adjacency_matrix_infeasible_for_300K',
          ],
          accepted_answers: ['bfs_visits_each_node_edge_once', 'adjacency_list_N_plus_M', 'dist_array_size_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'bfs_distance_filter',
        label: 'BFS 최단 거리 계산 후 거리 K 필터링',
        pattern_analysis_answer: 'bfs',
        required_strategy_tags: ['bfs_from_X', 'dist_array_init_minus_1', 'collect_nodes_with_dist_K', 'sort_result_ascending'],
      },
    ],

    common_mistakes: [
      {
        tag: 'adjacency_matrix_tle',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'use_adjacency_list_not_matrix' },
        ],
        feedback:
          'N이 300,000이므로 인접 행렬(N^2)은 메모리 초과입니다. 반드시 인접 리스트를 사용해야 합니다.',
      },
      {
        tag: 'dfs_not_shortest',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dfs' },
        ],
        feedback:
          'DFS는 최단 거리를 보장하지 않습니다. 가중치 1인 그래프에서는 BFS가 최단 거리를 보장합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '가중치 1인 그래프에서 BFS의 레벨 = 최단 거리. X에서 BFS 후 dist==K인 노드를 수집하여 오름차순 출력.',
      mentor_hint: 'N, M이 크므로 인접 행렬이 아닌 인접 리스트를 사용하라. BFS 한 번이면 충분하다.',
      pattern_trigger: '"가중치 1 + 특정 거리의 노드 찾기"가 보이면 → BFS 한 번으로 해결.',
      why_it_works: 'BFS는 가중치 1인 그래프에서 레벨별로 탐색하므로, 먼저 도달한 노드의 거리가 최단이다. O(N+M)으로 효율적.',
    },
  },
];
