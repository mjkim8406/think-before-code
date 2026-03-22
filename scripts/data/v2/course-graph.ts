import type { ProblemV2 } from '../types';

/**
 * Course-mode 그래프 문제 — 레벨별 대표 알고리즘 훈련용
 *
 * beginner  : DFS 기본 탐색 (섬의 개수, 연결 요소)
 * basic     : BFS 최단거리, 이분 그래프 판별
 * intermediate : Dijkstra, 위상 정렬
 * advanced  : Floyd-Warshall, MST (Kruskal)
 */

export interface CourseProblem extends ProblemV2 {
  course_level: 'beginner' | 'basic' | 'intermediate' | 'advanced';
}

export const COURSE_GRAPH: CourseProblem[] = [
  // ──────────────────────────────────────────────────────
  // beginner-1 — 섬의 개수
  // ──────────────────────────────────────────────────────
  {
    id: 'course-graph-001',
    title: '섬의 개수',
    difficulty: 'easy',
    course_level: 'beginner',
    domain: 'grid_connected_components',
    summary: 'N×M 격자에서 1로 이루어진 연결된 영역(섬)의 개수를 DFS/BFS로 탐색하여 세는 문제',
    tags: ['dfs', 'graph', 'array'],
    input_type: 'grid',
    output_type: 'count',
    constraints: {
      grid_values_binary: true,
      four_directional: true,
      input_size_hint: '1 <= N, M <= 100',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'boolean_existence', 'shortest_path', 'traversal_order', 'maximum_area'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            '2d_binary_grid',
            'adjacent_cells_form_connection',
            'weighted_edges',
            'directed_graph',
            'single_start_point',
          ],
          accepted_answers: ['2d_binary_grid', 'adjacent_cells_form_connection'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_connected_components_in_grid',
            'dfs_flood_fill_count_islands',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dfs_flood_fill', 'bfs_shortest_path', 'union_find', 'dynamic_programming', 'greedy'],
          accepted_answers: ['dfs_flood_fill'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'need_to_visit_all_connected_cells',
            'counting_disjoint_groups',
            'no_weight_on_edges',
            'need_shortest_distance',
            'overlapping_subproblems',
          ],
          accepted_answers: ['need_to_visit_all_connected_cells', 'counting_disjoint_groups', 'no_weight_on_edges'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bfs_level_order', 'visited_matrix', 'stack_based_dfs', 'union_find', 'memoization'],
          accepted_answers: ['visited_matrix', 'stack_based_dfs'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['visited_2d_array', 'recursion_stack', 'queue', 'adjacency_list', 'union_find'],
          accepted_answers: ['visited_2d_array', 'recursion_stack'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'iterate_all_cells_start_dfs_on_unvisited_land',
            'mark_visited_during_traversal',
            'increment_count_per_new_component',
            'bfs_layer_by_layer',
            'sort_cells_by_value',
          ],
          accepted_answers: ['iterate_all_cells_start_dfs_on_unvisited_land', 'mark_visited_during_traversal', 'increment_count_per_new_component'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_visited', label: 'visited 배열 초기화' },
          { id: 'scan_grid', label: '격자의 모든 셀을 순회' },
          { id: 'check_land', label: '현재 셀이 1이고 미방문이면 DFS 시작' },
          { id: 'dfs_mark', label: 'DFS로 연결된 모든 1을 방문 처리' },
          { id: 'increment', label: '섬 개수 +1' },
          { id: 'output', label: '최종 섬 개수 출력' },
        ],
        correct_order: ['init_visited', 'scan_grid', 'check_land', 'dfs_mark', 'increment', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'all_zeros_no_island',
          'all_ones_single_island',
          'single_cell_grid',
          'diagonal_not_connected',
          'large_grid_recursion_depth',
          'grid_with_one_row_or_column',
        ],
        required_answers: ['all_zeros_no_island', 'all_ones_single_island', 'diagonal_not_connected'],
        recommended_answers: ['large_grid_recursion_depth'],
        optional_answers: ['single_cell_grid', 'grid_with_one_row_or_column'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N*M)', 'O(N*M*log(N*M))', 'O(N^2*M^2)', 'O(N+M)'],
          accepted_answers: ['O(N*M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N*M)', 'O(N+M)', 'O(1)', 'O(N^2*M^2)'],
          accepted_answers: ['O(N*M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'visit_every_cell_once',
            'visited_array_same_size_as_grid',
            'recursion_stack_worst_case_all_cells',
            'no_additional_data_structure',
          ],
          accepted_answers: ['visit_every_cell_once', 'visited_array_same_size_as_grid', 'recursion_stack_worst_case_all_cells'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dfs_flood_fill',
        label: 'DFS로 격자 flood-fill하여 섬 개수 세기',
        pattern_analysis_answer: 'dfs_flood_fill',
        required_strategy_tags: ['iterate_all_cells_start_dfs_on_unvisited_land', 'mark_visited_during_traversal', 'increment_count_per_new_component'],
      },
    ],

    common_mistakes: [
      {
        tag: 'diagonal_counted_as_connected',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'diagonal_not_connected' },
        ],
        feedback: '대각선은 연결로 취급하지 않습니다. 상하좌우 4방향만 인접으로 처리해야 합니다.',
      },
      {
        tag: 'forgot_visited_check',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'mark_visited_during_traversal' },
        ],
        feedback: '방문 체크를 하지 않으면 같은 셀을 반복 방문하여 무한 루프에 빠지거나 섬을 중복 카운트합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '격자에서 연결 요소를 세는 것은 그래프 연결 요소 문제와 동일하다. 모든 셀을 순회하며 미방문 땅에서 DFS/BFS를 시작하면 된다.',
      mentor_hint: '격자를 in-place로 0으로 바꾸면 visited 배열 없이도 풀 수 있다. 하지만 입력을 훼손하므로 면접에서는 visited 배열을 쓰는 게 안전하다.',
      pattern_trigger: '"2D 격자에서 연결된 영역의 개수"가 보이면 → DFS/BFS flood-fill을 떠올려라.',
      why_it_works: '각 셀을 최대 한 번 방문하므로 O(N*M)에 모든 연결 요소를 찾을 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // beginner-2 — 연결 요소의 개수
  // ──────────────────────────────────────────────────────
  {
    id: 'course-graph-002',
    title: '연결 요소의 개수',
    difficulty: 'easy',
    course_level: 'beginner',
    domain: 'connected_components',
    summary: '무방향 그래프가 주어질 때 DFS로 연결 요소의 개수를 세는 문제',
    tags: ['dfs', 'graph'],
    input_type: 'adjacency_list',
    output_type: 'count',
    constraints: {
      undirected: true,
      no_weights: true,
      input_size_hint: '1 <= N <= 1000, 0 <= M <= N*(N-1)/2',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['count', 'boolean_existence', 'shortest_path', 'specific_node', 'traversal_order'],
          accepted_answers: ['count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'undirected_edge_list',
            'node_count_and_edge_count',
            'weighted_edges',
            'directed_edges',
            'tree_structure',
          ],
          accepted_answers: ['undirected_edge_list', 'node_count_and_edge_count'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_connected_components_in_undirected_graph',
            'dfs_count_disjoint_subgraphs',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dfs_traversal', 'bfs_shortest_path', 'union_find', 'topological_sort', 'dijkstra'],
          accepted_answers: ['dfs_traversal'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'need_to_explore_all_reachable_nodes',
            'counting_separate_components',
            'no_need_for_shortest_path',
            'need_cycle_detection',
            'need_edge_weights',
          ],
          accepted_answers: ['need_to_explore_all_reachable_nodes', 'counting_separate_components', 'no_need_for_shortest_path'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bfs_alternative', 'union_find_alternative', 'visited_array', 'adjacency_matrix', 'stack_recursion'],
          accepted_answers: ['bfs_alternative', 'union_find_alternative', 'visited_array'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'visited_array', 'recursion_stack', 'priority_queue', 'union_find_array'],
          accepted_answers: ['adjacency_list', 'visited_array', 'recursion_stack'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'build_adjacency_list',
            'iterate_all_nodes_dfs_on_unvisited',
            'count_dfs_starts',
            'bfs_layer_expansion',
            'sort_edges_by_weight',
          ],
          accepted_answers: ['build_adjacency_list', 'iterate_all_nodes_dfs_on_unvisited', 'count_dfs_starts'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_adj', label: '간선 정보로 인접 리스트 구성' },
          { id: 'init_visited', label: 'visited 배열 초기화' },
          { id: 'loop_nodes', label: '모든 노드를 순회' },
          { id: 'start_dfs', label: '미방문 노드에서 DFS 시작, 카운트 +1' },
          { id: 'mark_all', label: 'DFS로 도달 가능한 모든 노드를 방문 처리' },
          { id: 'output', label: '최종 연결 요소 개수 출력' },
        ],
        correct_order: ['build_adj', 'init_visited', 'loop_nodes', 'start_dfs', 'mark_all', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'no_edges_each_node_is_component',
          'fully_connected_single_component',
          'isolated_nodes_exist',
          'self_loops',
          'duplicate_edges',
          'single_node_graph',
        ],
        required_answers: ['no_edges_each_node_is_component', 'isolated_nodes_exist'],
        recommended_answers: ['fully_connected_single_component', 'single_node_graph'],
        optional_answers: ['self_loops', 'duplicate_edges'],
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
          options: ['O(N+M)', 'O(N)', 'O(N^2)', 'O(M)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'visit_each_node_and_edge_once',
            'adjacency_list_stores_all_edges',
            'visited_array_size_n',
            'no_sorting_needed',
          ],
          accepted_answers: ['visit_each_node_and_edge_once', 'adjacency_list_stores_all_edges', 'visited_array_size_n'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dfs_connected_components',
        label: 'DFS로 모든 노드를 순회하며 연결 요소 세기',
        pattern_analysis_answer: 'dfs_traversal',
        required_strategy_tags: ['build_adjacency_list', 'iterate_all_nodes_dfs_on_unvisited', 'count_dfs_starts'],
      },
    ],

    common_mistakes: [
      {
        tag: 'forget_isolated_nodes',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'isolated_nodes_exist' },
        ],
        feedback: '간선이 없는 고립된 노드도 하나의 연결 요소입니다. 간선 리스트에 등장하지 않는 노드를 놓치지 마세요.',
      },
      {
        tag: 'wrong_pattern_dijkstra',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dijkstra' },
        ],
        feedback: '가중치가 없고 최단 경로를 구하는 것이 아니므로 Dijkstra는 불필요합니다. 단순 DFS/BFS로 충분합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '무방향 그래프에서 연결 요소를 세는 것은 모든 노드를 순회하며 미방문 노드에서 DFS/BFS를 시작하는 횟수와 같다.',
      mentor_hint: '노드 번호가 1부터 시작하는지 0부터 시작하는지 확인하라. 인접 리스트 크기와 visited 배열 크기가 달라 인덱스 오류가 나기 쉽다.',
      pattern_trigger: '"그래프에서 서로 연결된 그룹이 몇 개인지"가 보이면 → DFS/BFS 연결 요소 카운팅을 떠올려라.',
      why_it_works: 'DFS는 한 번의 호출로 도달 가능한 모든 노드를 방문하므로, 호출 횟수가 곧 연결 요소의 수이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // basic-1 — 미로 최단거리
  // ──────────────────────────────────────────────────────
  {
    id: 'course-graph-003',
    title: '미로 최단거리',
    difficulty: 'medium',
    course_level: 'basic',
    domain: 'grid_shortest_path',
    summary: 'N×M 격자 미로에서 (0,0)→(N-1,M-1)까지의 최단 거리를 BFS로 구하는 문제',
    tags: ['bfs', 'graph', 'array'],
    input_type: 'grid',
    output_type: 'shortest_distance',
    constraints: {
      grid_values_binary: true,
      four_directional: true,
      unweighted_edges: true,
      input_size_hint: '2 <= N, M <= 100',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['shortest_distance', 'count', 'boolean_reachability', 'all_paths', 'maximum_distance'],
          accepted_answers: ['shortest_distance'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            '2d_binary_grid_maze',
            'start_and_end_fixed',
            'walls_block_movement',
            'weighted_cells',
            'multiple_start_points',
          ],
          accepted_answers: ['2d_binary_grid_maze', 'start_and_end_fixed', 'walls_block_movement'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'bfs_shortest_path_in_grid_maze',
            'find_minimum_steps_from_start_to_end',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bfs_shortest_path', 'dfs_traversal', 'dijkstra', 'dynamic_programming', 'a_star'],
          accepted_answers: ['bfs_shortest_path'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'all_edges_have_same_weight',
            'need_shortest_distance',
            'bfs_guarantees_shortest_in_unweighted',
            'need_to_explore_all_paths',
            'edges_have_different_weights',
          ],
          accepted_answers: ['all_edges_have_same_weight', 'need_shortest_distance', 'bfs_guarantees_shortest_in_unweighted'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['distance_array', 'queue_fifo', 'four_direction_delta', 'visited_matrix', 'dp_grid'],
          accepted_answers: ['distance_array', 'queue_fifo', 'four_direction_delta'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['queue', 'distance_2d_array', 'priority_queue', 'stack', 'adjacency_list'],
          accepted_answers: ['queue', 'distance_2d_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'bfs_from_start_cell',
            'record_distance_at_each_cell',
            'stop_when_destination_reached',
            'dfs_explore_all_paths',
            'dijkstra_with_priority_queue',
          ],
          accepted_answers: ['bfs_from_start_cell', 'record_distance_at_each_cell', 'stop_when_destination_reached'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_dist', label: 'distance 배열을 -1(미방문)로 초기화' },
          { id: 'enqueue_start', label: '시작점을 큐에 넣고 distance[0][0] = 1' },
          { id: 'bfs_loop', label: '큐에서 셀을 꺼내 4방향 탐색' },
          { id: 'check_wall', label: '벽(0)이 아니고 미방문인 셀만 큐에 추가' },
          { id: 'update_dist', label: '새 셀의 distance = 현재 셀 distance + 1' },
          { id: 'output', label: 'distance[N-1][M-1] 출력 (도달 불가면 -1)' },
        ],
        correct_order: ['init_dist', 'enqueue_start', 'bfs_loop', 'check_wall', 'update_dist', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'destination_unreachable',
          'start_equals_destination',
          'start_or_end_is_wall',
          'narrow_corridor_maze',
          'minimum_2x2_grid',
          'distance_counts_cells_not_edges',
        ],
        required_answers: ['destination_unreachable', 'start_or_end_is_wall', 'distance_counts_cells_not_edges'],
        recommended_answers: ['start_equals_destination'],
        optional_answers: ['narrow_corridor_maze', 'minimum_2x2_grid'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N*M)', 'O(N*M*log(N*M))', 'O((N*M)^2)', 'O(N+M)'],
          accepted_answers: ['O(N*M)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N*M)', 'O(N+M)', 'O(1)', 'O(N^2*M^2)'],
          accepted_answers: ['O(N*M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'bfs_visits_each_cell_at_most_once',
            'distance_array_same_size_as_grid',
            'queue_can_hold_all_cells',
            'no_repeated_visits',
          ],
          accepted_answers: ['bfs_visits_each_cell_at_most_once', 'distance_array_same_size_as_grid', 'queue_can_hold_all_cells'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'bfs_grid_shortest',
        label: 'BFS로 격자 미로 최단거리 탐색',
        pattern_analysis_answer: 'bfs_shortest_path',
        required_strategy_tags: ['bfs_from_start_cell', 'record_distance_at_each_cell', 'stop_when_destination_reached'],
      },
    ],

    common_mistakes: [
      {
        tag: 'dfs_for_shortest_path',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dfs_traversal' },
        ],
        feedback: 'DFS는 최단 경로를 보장하지 않습니다. 가중치가 동일한 그래프에서 최단 거리는 BFS를 사용해야 합니다.',
      },
      {
        tag: 'distance_off_by_one',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'distance_counts_cells_not_edges' },
        ],
        feedback: '거리가 "칸 수"인지 "이동 횟수"인지 정확히 확인하세요. 시작 칸을 1로 세는지 0으로 세는지에 따라 결과가 달라집니다.',
      },
    ],

    review_notes: {
      core_takeaway: '가중치가 없는(동일한) 그래프에서 최단 거리는 BFS의 레벨이 곧 거리이다.',
      mentor_hint: 'BFS에서 방문 체크는 큐에 넣을 때 해야 한다. 큐에서 꺼낼 때 하면 같은 셀이 여러 번 큐에 들어가 메모리와 시간이 낭비된다.',
      pattern_trigger: '"가중치 없는 격자/그래프에서 최단 거리"가 보이면 → BFS를 떠올려라.',
      why_it_works: 'BFS는 시작점에서 거리 순으로 노드를 방문하므로 처음 도달했을 때의 거리가 최단 거리이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // basic-2 — 이분 그래프 판별
  // ──────────────────────────────────────────────────────
  {
    id: 'course-graph-004',
    title: '이분 그래프 판별',
    difficulty: 'medium',
    course_level: 'basic',
    domain: 'bipartite_check',
    summary: '무방향 그래프가 이분 그래프인지 판별하는 문제. BFS/DFS로 2-coloring이 가능한지 확인한다.',
    tags: ['bfs', 'graph'],
    input_type: 'adjacency_list',
    output_type: 'boolean',
    constraints: {
      undirected: true,
      no_weights: true,
      may_be_disconnected: true,
      input_size_hint: '1 <= N <= 20000, 0 <= M <= 200000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['boolean_existence', 'count', 'shortest_path', 'partitioning', 'traversal_order'],
          accepted_answers: ['boolean_existence'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'undirected_graph',
            'may_have_multiple_components',
            'need_two_color_assignment',
            'weighted_edges',
            'directed_acyclic_graph',
          ],
          accepted_answers: ['undirected_graph', 'may_have_multiple_components', 'need_two_color_assignment'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'check_if_graph_is_two_colorable',
            'bfs_bipartite_check_by_coloring',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['bfs_coloring', 'dfs_cycle_detection', 'union_find', 'topological_sort', 'greedy_partition'],
          accepted_answers: ['bfs_coloring'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'two_groups_with_no_internal_edges',
            'adjacent_nodes_must_differ',
            'coloring_is_natural_bfs_extension',
            'need_shortest_path',
            'need_to_count_components',
          ],
          accepted_answers: ['two_groups_with_no_internal_edges', 'adjacent_nodes_must_differ', 'coloring_is_natural_bfs_extension'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['dfs_coloring_alternative', 'odd_cycle_detection', 'connected_component_iteration', 'memoization', 'two_pointer'],
          accepted_answers: ['dfs_coloring_alternative', 'odd_cycle_detection', 'connected_component_iteration'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'color_array', 'queue', 'stack', 'priority_queue'],
          accepted_answers: ['adjacency_list', 'color_array', 'queue'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'bfs_assign_alternating_colors',
            'check_neighbor_color_conflict',
            'iterate_all_components',
            'detect_odd_length_cycle',
            'greedy_color_assignment',
          ],
          accepted_answers: ['bfs_assign_alternating_colors', 'check_neighbor_color_conflict', 'iterate_all_components'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_adj', label: '인접 리스트 구성' },
          { id: 'init_color', label: 'color 배열을 미배정(-1)으로 초기화' },
          { id: 'loop_components', label: '모든 노드를 순회, 미배정이면 BFS 시작' },
          { id: 'color_start', label: '시작 노드에 색 0 배정, 큐에 추가' },
          { id: 'bfs_color', label: '큐에서 노드를 꺼내 이웃에 반대 색 배정' },
          { id: 'conflict_check', label: '이웃이 이미 같은 색이면 이분 그래프 아님' },
          { id: 'output', label: '충돌 없으면 YES, 있으면 NO 출력' },
        ],
        correct_order: ['build_adj', 'init_color', 'loop_components', 'color_start', 'bfs_color', 'conflict_check', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'disconnected_graph_check_all_components',
          'single_node_is_bipartite',
          'self_loop_makes_non_bipartite',
          'odd_cycle_means_non_bipartite',
          'no_edges_always_bipartite',
          'tree_is_always_bipartite',
        ],
        required_answers: ['disconnected_graph_check_all_components', 'odd_cycle_means_non_bipartite'],
        recommended_answers: ['no_edges_always_bipartite', 'tree_is_always_bipartite'],
        optional_answers: ['single_node_is_bipartite', 'self_loop_makes_non_bipartite'],
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
          options: ['O(N+M)', 'O(N)', 'O(N^2)', 'O(M)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'bfs_visits_each_node_and_edge_once',
            'color_array_size_n',
            'adjacency_list_size_n_plus_m',
            'queue_holds_at_most_n_nodes',
          ],
          accepted_answers: ['bfs_visits_each_node_and_edge_once', 'color_array_size_n', 'adjacency_list_size_n_plus_m'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'bfs_two_coloring',
        label: 'BFS로 2-coloring하여 이분 그래프 판별',
        pattern_analysis_answer: 'bfs_coloring',
        required_strategy_tags: ['bfs_assign_alternating_colors', 'check_neighbor_color_conflict', 'iterate_all_components'],
      },
    ],

    common_mistakes: [
      {
        tag: 'single_component_only',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'disconnected_graph_check_all_components' },
        ],
        feedback: '그래프가 연결되어 있지 않을 수 있습니다. 모든 연결 요소에 대해 이분 그래프 검사를 해야 합니다.',
      },
      {
        tag: 'wrong_pattern_topological',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'topological_sort' },
        ],
        feedback: '위상 정렬은 DAG에서 순서를 구할 때 사용합니다. 이분 그래프 판별은 2-coloring 문제이므로 BFS/DFS coloring이 적절합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '이분 그래프는 "인접한 노드를 항상 다른 색으로 칠할 수 있는가"와 동치이다. BFS로 색을 번갈아 배정하며 충돌을 확인하면 된다.',
      mentor_hint: '이분 그래프 ↔ 홀수 길이 사이클이 없음. 충돌이 발생하면 즉시 false를 반환해도 되지만, 모든 컴포넌트를 확인하는 것을 잊지 마라.',
      pattern_trigger: '"두 그룹으로 나눌 수 있는가" 또는 "인접한 것끼리 다른 속성"이 보이면 → 이분 그래프(2-coloring)를 떠올려라.',
      why_it_works: 'BFS 레벨의 홀짝이 곧 색 배정이므로, 같은 레벨 내 간선이 있으면 홀수 사이클이 존재하는 것이다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // intermediate-1 — 최단 경로 (Dijkstra)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-graph-005',
    title: '최단 경로',
    difficulty: 'medium',
    course_level: 'intermediate',
    domain: 'dijkstra_shortest_path',
    summary: '가중치가 있는 방향 그래프에서 출발 노드로부터 모든 노드까지의 최단 거리를 Dijkstra 알고리즘으로 구하는 문제',
    tags: ['graph', 'heap'],
    input_type: 'weighted_edge_list',
    output_type: 'distance_array',
    constraints: {
      directed: true,
      non_negative_weights: true,
      possible_multiple_edges: true,
      input_size_hint: '1 <= N <= 20000, 1 <= M <= 300000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['distance_array', 'shortest_single_path', 'count', 'boolean_reachability', 'minimum_cost'],
          accepted_answers: ['distance_array'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'weighted_directed_edges',
            'single_source',
            'non_negative_weights',
            'negative_weight_edges',
            'unweighted_graph',
          ],
          accepted_answers: ['weighted_directed_edges', 'single_source', 'non_negative_weights'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'single_source_shortest_path_weighted_graph',
            'dijkstra_from_source_to_all_nodes',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['dijkstra', 'bfs_shortest_path', 'bellman_ford', 'floyd_warshall', 'dfs_traversal'],
          accepted_answers: ['dijkstra'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'weighted_graph_with_non_negative_edges',
            'single_source_shortest_path',
            'greedy_relaxation_on_min_distance',
            'negative_edges_present',
            'all_pairs_needed',
          ],
          accepted_answers: ['weighted_graph_with_non_negative_edges', 'single_source_shortest_path', 'greedy_relaxation_on_min_distance'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['priority_queue_greedy', 'relaxation', 'adjacency_list_weighted', 'bfs_alternative', 'dp_on_dag'],
          accepted_answers: ['priority_queue_greedy', 'relaxation', 'adjacency_list_weighted'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['priority_queue_min_heap', 'distance_array', 'adjacency_list', 'visited_set', 'queue'],
          accepted_answers: ['priority_queue_min_heap', 'distance_array', 'adjacency_list'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'init_dist_infinity_source_zero',
            'extract_min_from_heap',
            'relax_neighbors',
            'skip_already_finalized',
            'bellman_ford_repeat_n_times',
          ],
          accepted_answers: ['init_dist_infinity_source_zero', 'extract_min_from_heap', 'relax_neighbors', 'skip_already_finalized'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_adj', label: '가중치 포함 인접 리스트 구성' },
          { id: 'init_dist', label: 'dist 배열을 INF로 초기화, dist[source] = 0' },
          { id: 'push_source', label: '(0, source)를 min-heap에 추가' },
          { id: 'extract_min', label: 'heap에서 최소 거리 노드 추출' },
          { id: 'skip_check', label: '이미 더 짧은 거리로 확정된 노드면 스킵' },
          { id: 'relax', label: '인접 노드에 대해 dist[next] > dist[cur] + w이면 갱신 후 heap에 추가' },
          { id: 'output', label: '각 노드의 최단 거리 출력 (도달 불가면 INF)' },
        ],
        correct_order: ['build_adj', 'init_dist', 'push_source', 'extract_min', 'skip_check', 'relax', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'unreachable_nodes_output_inf',
          'multiple_edges_between_same_pair',
          'self_loops_ignored',
          'skip_stale_heap_entries',
          'source_distance_is_zero',
          'integer_overflow_on_dist_addition',
        ],
        required_answers: ['unreachable_nodes_output_inf', 'skip_stale_heap_entries', 'source_distance_is_zero'],
        recommended_answers: ['multiple_edges_between_same_pair', 'integer_overflow_on_dist_addition'],
        optional_answers: ['self_loops_ignored'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O((N+M)logN)', 'O(N*M)', 'O(N^2)', 'O(N^3)'],
          accepted_answers: ['O((N+M)logN)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N+M)', 'O(N)', 'O(N^2)', 'O(M)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_edge_relaxed_at_most_once',
            'heap_operations_logN',
            'adjacency_list_and_dist_array',
            'heap_can_hold_up_to_M_entries',
          ],
          accepted_answers: ['each_edge_relaxed_at_most_once', 'heap_operations_logN', 'adjacency_list_and_dist_array'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'dijkstra_min_heap',
        label: 'Min-Heap 기반 Dijkstra로 단일 출발점 최단 경로',
        pattern_analysis_answer: 'dijkstra',
        required_strategy_tags: ['init_dist_infinity_source_zero', 'extract_min_from_heap', 'relax_neighbors', 'skip_already_finalized'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_skip_stale_entries',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'skip_already_finalized' },
        ],
        feedback: 'Heap에서 꺼낸 노드의 거리가 이미 저장된 최단 거리보다 크면 스킵해야 합니다. 그렇지 않으면 불필요한 연산이 발생하고 TLE가 날 수 있습니다.',
      },
      {
        tag: 'bfs_on_weighted_graph',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'bfs_shortest_path' },
        ],
        feedback: '가중치가 있는 그래프에서 일반 BFS는 최단 경로를 보장하지 않습니다. 간선 가중치가 다르면 Dijkstra를 사용해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'Dijkstra는 "현재까지 가장 가까운 미확정 노드를 확정하고 이웃을 갱신하는" 그리디 알고리즘이다.',
      mentor_hint: 'Python에서는 heapq가 min-heap이므로 (dist, node) 튜플을 넣으면 자연스럽게 최소 거리 노드가 추출된다. C++은 priority_queue가 max-heap이므로 음수 거리를 넣거나 greater<>를 사용하라.',
      pattern_trigger: '"가중치가 양수인 그래프에서 한 노드로부터 최단 거리"가 보이면 → Dijkstra를 떠올려라.',
      why_it_works: '음이 아닌 가중치에서 최소 거리 노드를 확정하면, 이후 더 짧은 경로가 발견될 수 없으므로 그리디가 성립한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // intermediate-2 — 작업 순서 (Topological Sort)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-graph-006',
    title: '작업 순서',
    difficulty: 'medium',
    course_level: 'intermediate',
    domain: 'topological_ordering',
    summary: 'N개의 작업과 선행 조건이 주어질 때 모든 작업을 수행할 수 있는 순서를 위상 정렬로 구하는 문제',
    tags: ['topological-sort', 'graph'],
    input_type: 'dag_edge_list',
    output_type: 'ordered_sequence',
    constraints: {
      directed_acyclic: true,
      multiple_valid_orderings: true,
      input_size_hint: '1 <= N <= 32000, 1 <= M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['ordered_sequence', 'count', 'shortest_path', 'boolean_existence', 'single_value'],
          accepted_answers: ['ordered_sequence'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'directed_prerequisite_edges',
            'acyclic_guaranteed_or_detect',
            'task_dependency_graph',
            'undirected_edges',
            'weighted_edges',
          ],
          accepted_answers: ['directed_prerequisite_edges', 'acyclic_guaranteed_or_detect', 'task_dependency_graph'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_valid_task_execution_order',
            'topological_sort_on_prerequisite_dag',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['topological_sort', 'bfs_shortest_path', 'dfs_traversal', 'dijkstra', 'dynamic_programming'],
          accepted_answers: ['topological_sort'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'precedence_constraints_exist',
            'need_linear_ordering_of_dag',
            'in_degree_zero_nodes_can_go_first',
            'need_shortest_path',
            'need_minimum_cost',
          ],
          accepted_answers: ['precedence_constraints_exist', 'need_linear_ordering_of_dag', 'in_degree_zero_nodes_can_go_first'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['bfs_kahn_algorithm', 'dfs_post_order_reverse', 'cycle_detection', 'queue_processing', 'greedy_selection'],
          accepted_answers: ['bfs_kahn_algorithm', 'dfs_post_order_reverse', 'cycle_detection'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['adjacency_list', 'in_degree_array', 'queue', 'result_list', 'priority_queue'],
          accepted_answers: ['adjacency_list', 'in_degree_array', 'queue', 'result_list'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'compute_in_degrees',
            'enqueue_zero_in_degree_nodes',
            'process_queue_decrement_neighbors',
            'dfs_based_reverse_post_order',
            'brute_force_permutation',
          ],
          accepted_answers: ['compute_in_degrees', 'enqueue_zero_in_degree_nodes', 'process_queue_decrement_neighbors'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'build_adj', label: '인접 리스트 구성 및 in-degree 계산' },
          { id: 'init_queue', label: 'in-degree가 0인 노드를 큐에 추가' },
          { id: 'process', label: '큐에서 노드를 꺼내 결과에 추가' },
          { id: 'update_indeg', label: '해당 노드의 이웃들의 in-degree를 1 감소' },
          { id: 'new_zero', label: 'in-degree가 0이 된 노드를 큐에 추가' },
          { id: 'output', label: '결과 순서 출력 (사이클 시 불가 판별)' },
        ],
        correct_order: ['build_adj', 'init_queue', 'process', 'update_indeg', 'new_zero', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'cycle_exists_no_valid_ordering',
          'multiple_valid_orderings',
          'isolated_nodes_no_prerequisites',
          'linear_chain_single_ordering',
          'all_nodes_independent',
          'result_count_less_than_n_means_cycle',
        ],
        required_answers: ['cycle_exists_no_valid_ordering', 'result_count_less_than_n_means_cycle'],
        recommended_answers: ['multiple_valid_orderings', 'isolated_nodes_no_prerequisites'],
        optional_answers: ['linear_chain_single_ordering', 'all_nodes_independent'],
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
          options: ['O(N+M)', 'O(N)', 'O(N^2)', 'O(M)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_node_and_edge_processed_once',
            'adjacency_list_and_in_degree_array',
            'queue_holds_at_most_n_nodes',
            'no_sorting_required',
          ],
          accepted_answers: ['each_node_and_edge_processed_once', 'adjacency_list_and_in_degree_array', 'queue_holds_at_most_n_nodes'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'kahn_topological_sort',
        label: 'Kahn 알고리즘(BFS 기반 위상 정렬)으로 작업 순서 결정',
        pattern_analysis_answer: 'topological_sort',
        required_strategy_tags: ['compute_in_degrees', 'enqueue_zero_in_degree_nodes', 'process_queue_decrement_neighbors'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_cycle_detection',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'cycle_exists_no_valid_ordering' },
        ],
        feedback: '사이클이 있으면 위상 정렬이 불가능합니다. 결과의 노드 수가 N보다 적으면 사이클이 존재하는 것입니다.',
      },
      {
        tag: 'wrong_pattern_dijkstra',
        conditions: [
          { step: 'pattern_analysis', field: 'primary_pattern', operator: 'equals', value: 'dijkstra' },
        ],
        feedback: '이 문제는 최단 경로가 아닌 순서를 구하는 문제입니다. 선행 조건이 있는 순서 결정은 위상 정렬로 풀어야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '위상 정렬은 DAG에서 선행 조건을 만족하는 선형 순서를 O(N+M)에 구한다. Kahn 알고리즘(BFS)이 가장 직관적이다.',
      mentor_hint: 'Kahn 알고리즘의 결과 리스트 크기가 N보다 작으면 사이클이 존재한다. 이 방법으로 사이클 탐지도 동시에 할 수 있다.',
      pattern_trigger: '"선행 조건이 있는 작업 순서" 또는 "의존성이 있는 실행 순서"가 보이면 → 위상 정렬을 떠올려라.',
      why_it_works: 'in-degree가 0인 노드는 선행 조건이 모두 충족된 노드이므로 먼저 실행할 수 있다. 이를 반복하면 전체 순서가 결정된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // advanced-1 — 모든 쌍 최단거리 (Floyd-Warshall)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-graph-007',
    title: '모든 쌍 최단거리',
    difficulty: 'hard',
    course_level: 'advanced',
    domain: 'all_pairs_shortest_path',
    summary: 'N개 도시 사이의 모든 쌍 최단 거리를 Floyd-Warshall 알고리즘으로 구하는 문제',
    tags: ['graph', 'dynamic-programming'],
    input_type: 'weighted_edge_list',
    output_type: 'distance_matrix',
    constraints: {
      directed_or_undirected: true,
      non_negative_weights: true,
      small_n_for_cubic: true,
      input_size_hint: '1 <= N <= 500, 1 <= M <= N*(N-1)',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['distance_matrix', 'single_shortest_path', 'count', 'boolean_reachability', 'minimum_cost'],
          accepted_answers: ['distance_matrix'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'weighted_edges_between_cities',
            'all_pairs_query',
            'small_number_of_nodes',
            'single_source_query',
            'unweighted_graph',
          ],
          accepted_answers: ['weighted_edges_between_cities', 'all_pairs_query', 'small_number_of_nodes'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'compute_all_pairs_shortest_distances',
            'floyd_warshall_distance_matrix',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['floyd_warshall', 'dijkstra_repeated', 'bellman_ford', 'bfs_shortest_path', 'dynamic_programming'],
          accepted_answers: ['floyd_warshall'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'all_pairs_shortest_path_needed',
            'n_is_small_enough_for_cubic',
            'dp_on_intermediate_vertices',
            'single_source_only',
            'negative_cycle_detection_needed',
          ],
          accepted_answers: ['all_pairs_shortest_path_needed', 'n_is_small_enough_for_cubic', 'dp_on_intermediate_vertices'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['dp_transition', 'adjacency_matrix', 'relaxation', 'dijkstra_n_times_alternative', 'matrix_multiplication'],
          accepted_answers: ['dp_transition', 'adjacency_matrix', 'relaxation'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['distance_matrix_2d', 'adjacency_list', 'priority_queue', 'visited_array', 'parent_matrix'],
          accepted_answers: ['distance_matrix_2d'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'init_matrix_direct_edges_and_inf',
            'triple_loop_k_i_j',
            'relax_dist_i_j_via_k',
            'diagonal_zero',
            'run_dijkstra_from_each_node',
          ],
          accepted_answers: ['init_matrix_direct_edges_and_inf', 'triple_loop_k_i_j', 'relax_dist_i_j_via_k', 'diagonal_zero'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'init_matrix', label: 'dist[i][j]를 INF로, dist[i][i]=0으로, 직접 간선은 가중치로 초기화' },
          { id: 'loop_k', label: '중간 경유지 k를 1부터 N까지 순회 (가장 바깥 루프)' },
          { id: 'loop_i', label: '출발지 i를 순회' },
          { id: 'loop_j', label: '도착지 j를 순회' },
          { id: 'relax', label: 'dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])' },
          { id: 'output', label: '최종 dist 행렬 출력' },
        ],
        correct_order: ['init_matrix', 'loop_k', 'loop_i', 'loop_j', 'relax', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'k_must_be_outermost_loop',
          'self_distance_is_zero',
          'integer_overflow_inf_plus_weight',
          'no_direct_edge_means_inf',
          'multiple_edges_take_minimum',
          'unreachable_pairs_remain_inf',
        ],
        required_answers: ['k_must_be_outermost_loop', 'integer_overflow_inf_plus_weight', 'self_distance_is_zero'],
        recommended_answers: ['multiple_edges_take_minimum', 'unreachable_pairs_remain_inf'],
        optional_answers: ['no_direct_edge_means_inf'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^3)', 'O(N^2*M)', 'O(N^2*logN)', 'O(N*M*logN)'],
          accepted_answers: ['O(N^3)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N^2)', 'O(N+M)', 'O(N^3)', 'O(N)'],
          accepted_answers: ['O(N^2)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'three_nested_loops_over_n',
            'distance_matrix_n_by_n',
            'in_place_update_no_extra_matrix',
            'constant_work_per_triple',
          ],
          accepted_answers: ['three_nested_loops_over_n', 'distance_matrix_n_by_n', 'in_place_update_no_extra_matrix'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'floyd_warshall',
        label: 'Floyd-Warshall 3중 루프로 모든 쌍 최단거리 계산',
        pattern_analysis_answer: 'floyd_warshall',
        required_strategy_tags: ['init_matrix_direct_edges_and_inf', 'triple_loop_k_i_j', 'relax_dist_i_j_via_k', 'diagonal_zero'],
      },
    ],

    common_mistakes: [
      {
        tag: 'wrong_loop_order',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'k_must_be_outermost_loop' },
        ],
        feedback: 'Floyd-Warshall에서 경유지 k가 반드시 가장 바깥 루프여야 합니다. k를 안쪽에 두면 아직 갱신되지 않은 중간 경로를 참조하여 오답이 됩니다.',
      },
      {
        tag: 'overflow_on_inf_addition',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'integer_overflow_inf_plus_weight' },
        ],
        feedback: 'dist[i][k] + dist[k][j]에서 INF + 양수가 오버플로우될 수 있습니다. INF 값을 적절히 설정하거나 연산 전에 INF 체크를 해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'Floyd-Warshall은 "1~k번 노드만 경유할 때의 최단 거리"를 DP로 확장하는 알고리즘이다. k가 가장 바깥 루프인 이유를 이해하는 것이 핵심이다.',
      mentor_hint: 'INF 값은 문제의 최대 가중치 합보다 충분히 크되, INF + INF가 오버플로우되지 않는 값으로 설정하라. 예: 1e9 정도.',
      pattern_trigger: '"모든 쌍의 최단 거리" 또는 "N이 작고(500 이하) 여러 출발-도착 쿼리"가 보이면 → Floyd-Warshall을 떠올려라.',
      why_it_works: 'k번째 반복에서 "1~k번 노드를 경유 가능"한 최단 거리가 확정되므로, N번 반복 후 모든 경유지를 고려한 최종 답이 완성된다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // advanced-2 — 최소 신장 트리 (Kruskal)
  // ──────────────────────────────────────────────────────
  {
    id: 'course-graph-008',
    title: '최소 신장 트리',
    difficulty: 'hard',
    course_level: 'advanced',
    domain: 'minimum_spanning_tree',
    summary: '가중치 무방향 그래프에서 모든 노드를 연결하는 최소 비용 신장 트리를 Kruskal 알고리즘으로 구하는 문제',
    tags: ['graph', 'union-find', 'greedy'],
    input_type: 'weighted_edge_list',
    output_type: 'minimum_cost',
    constraints: {
      undirected: true,
      connected_graph: true,
      positive_weights: true,
      input_size_hint: '1 <= N <= 10000, 1 <= M <= 100000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_cost', 'shortest_path', 'count', 'boolean_existence', 'traversal_order'],
          accepted_answers: ['minimum_cost'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'weighted_undirected_edges',
            'all_nodes_must_be_connected',
            'select_subset_of_edges',
            'directed_edges',
            'negative_weights_possible',
          ],
          accepted_answers: ['weighted_undirected_edges', 'all_nodes_must_be_connected', 'select_subset_of_edges'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'find_minimum_cost_spanning_tree',
            'kruskal_greedy_edge_selection_with_union_find',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['kruskal_mst', 'prim_mst', 'dijkstra', 'bfs_traversal', 'dynamic_programming'],
          accepted_answers: ['kruskal_mst'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'need_minimum_cost_to_connect_all',
            'greedy_pick_lightest_edge',
            'union_find_prevents_cycles',
            'select_n_minus_1_edges',
            'need_shortest_path_between_two_nodes',
          ],
          accepted_answers: ['need_minimum_cost_to_connect_all', 'greedy_pick_lightest_edge', 'union_find_prevents_cycles', 'select_n_minus_1_edges'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['edge_sorting', 'union_find_cycle_detection', 'prim_alternative', 'greedy_correctness', 'cut_property'],
          accepted_answers: ['edge_sorting', 'union_find_cycle_detection', 'prim_alternative'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['edge_list_sorted', 'union_find', 'priority_queue', 'adjacency_list', 'visited_array'],
          accepted_answers: ['edge_list_sorted', 'union_find'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'sort_edges_by_weight',
            'iterate_edges_union_if_no_cycle',
            'stop_at_n_minus_1_edges',
            'prim_start_from_node_expand',
            'bfs_minimum_edge',
          ],
          accepted_answers: ['sort_edges_by_weight', 'iterate_edges_union_if_no_cycle', 'stop_at_n_minus_1_edges'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_edges', label: '모든 간선을 (가중치, u, v) 형태로 저장' },
          { id: 'sort_edges', label: '간선을 가중치 오름차순으로 정렬' },
          { id: 'init_uf', label: 'Union-Find 초기화 (N개 노드)' },
          { id: 'iterate', label: '정렬된 간선을 순회' },
          { id: 'cycle_check', label: 'find(u) != find(v)이면 union하고 비용 누적' },
          { id: 'early_stop', label: 'N-1개 간선이 선택되면 종료' },
          { id: 'output', label: '총 MST 비용 출력' },
        ],
        correct_order: ['read_edges', 'sort_edges', 'init_uf', 'iterate', 'cycle_check', 'early_stop', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'same_weight_edges_order_irrelevant',
          'disconnected_graph_no_spanning_tree',
          'mst_has_exactly_n_minus_1_edges',
          'self_loops_should_be_ignored',
          'parallel_edges_pick_lightest',
          'union_find_path_compression_and_rank',
        ],
        required_answers: ['mst_has_exactly_n_minus_1_edges', 'union_find_path_compression_and_rank'],
        recommended_answers: ['disconnected_graph_no_spanning_tree', 'parallel_edges_pick_lightest'],
        optional_answers: ['same_weight_edges_order_irrelevant', 'self_loops_should_be_ignored'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(MlogM)', 'O(N*M)', 'O(N^2)', 'O(M*alpha(N))'],
          accepted_answers: ['O(MlogM)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(N+M)', 'O(N)', 'O(N^2)', 'O(M)'],
          accepted_answers: ['O(N+M)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'sorting_edges_dominates_mlogm',
            'union_find_operations_nearly_constant',
            'store_all_edges_and_uf_array',
            'no_adjacency_matrix_needed',
          ],
          accepted_answers: ['sorting_edges_dominates_mlogm', 'union_find_operations_nearly_constant', 'store_all_edges_and_uf_array'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'kruskal_union_find',
        label: 'Kruskal + Union-Find로 최소 신장 트리 구성',
        pattern_analysis_answer: 'kruskal_mst',
        required_strategy_tags: ['sort_edges_by_weight', 'iterate_edges_union_if_no_cycle', 'stop_at_n_minus_1_edges'],
      },
    ],

    common_mistakes: [
      {
        tag: 'no_cycle_check',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'not_includes', value: 'iterate_edges_union_if_no_cycle' },
        ],
        feedback: '사이클 체크 없이 간선을 추가하면 트리가 아닌 그래프가 됩니다. Union-Find의 find로 같은 집합인지 확인 후 union해야 합니다.',
      },
      {
        tag: 'no_path_compression',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'union_find_path_compression_and_rank' },
        ],
        feedback: 'Union-Find에서 경로 압축과 랭크 최적화를 하지 않으면 최악의 경우 O(N)이 되어 전체 시간복잡도가 O(M*N)으로 증가합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'Kruskal은 "가장 가벼운 간선부터 사이클을 만들지 않으면 선택"하는 그리디 알고리즘이다. Union-Find로 사이클 판별이 핵심이다.',
      mentor_hint: 'Kruskal은 간선 중심(간선 정렬), Prim은 노드 중심(min-heap)이다. 간선이 적으면 Kruskal, 노드가 적고 간선이 많으면 Prim이 유리하다.',
      pattern_trigger: '"모든 노드를 최소 비용으로 연결" 또는 "신장 트리"가 보이면 → Kruskal(또는 Prim) MST를 떠올려라.',
      why_it_works: 'Cut Property에 의해 어떤 컷을 횡단하는 가장 가벼운 간선은 반드시 MST에 포함된다. 가중치 순으로 선택하면 이 성질이 자동으로 만족된다.',
    },
  },
];
