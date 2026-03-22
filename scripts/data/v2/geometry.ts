import type { ProblemV2 } from '../types';

export const GEOMETRY_V2: ProblemV2[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1002 — 터렛
  // ──────────────────────────────────────────────────────
  {
    id: 'b001002-boj',
    title: '터렛',
    difficulty: 'easy',
    domain: 'circle_intersection',
    summary: '두 원의 중심 거리와 반지름 관계로 교점 개수를 분류하는 기하학 문제',
    tags: ['geometry', 'math', 'circle'],
    input_type: 'coordinates_and_radii',
    output_type: 'single_value',
    constraints: {
      multiple_test_cases: true,
      coordinate_range_20000: true,
      radius_range_10000: true,
      input_size_hint: 'T <= 100, -10000 <= x,y <= 10000, 1 <= r <= 10000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['intersection_count', 'intersection_coordinates', 'boolean_existence', 'minimum_distance', 'single_value'],
          accepted_answers: ['intersection_count'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'two_circles_defined_by_center_and_radius',
            'multiple_test_cases',
            'coordinates_and_radii',
            'sorted_data',
            'single_integer',
          ],
          accepted_answers: ['two_circles_defined_by_center_and_radius', 'multiple_test_cases', 'coordinates_and_radii'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_intersection_points_of_two_circles',
            'classify_circle_position_relationship',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['circle_position_classification', 'coordinate_geometry', 'distance_comparison', 'trigonometry', 'sweep_line', 'brute_force'],
          accepted_answers: ['circle_position_classification'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'distance_and_radii_determine_intersection',
            'case_analysis_by_distance',
            'no_need_for_exact_coordinates',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['distance_and_radii_determine_intersection', 'case_analysis_by_distance', 'no_need_for_exact_coordinates'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['squared_distance_comparison', 'avoid_floating_point', 'edge_case_enumeration', 'memoization', 'two_pointer'],
          accepted_answers: ['squared_distance_comparison', 'avoid_floating_point', 'edge_case_enumeration'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['integer_variables', 'array', 'map', 'set', 'priority_queue'],
          accepted_answers: ['integer_variables'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'compute_d_squared',
            'compare_with_sum_and_diff_of_radii_squared',
            'classify_into_0_1_2_inf',
            'use_sqrt_for_distance',
            'compute_exact_intersection_coordinates',
          ],
          accepted_answers: ['compute_d_squared', 'compare_with_sum_and_diff_of_radii_squared', 'classify_into_0_1_2_inf'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'compute_d2', label: 'd^2 = (x2-x1)^2 + (y2-y1)^2 계산' },
          { id: 'check_coincide', label: 'd=0이고 r1=r2이면 -1(무한) 출력' },
          { id: 'check_concentric', label: 'd=0이고 r1!=r2이면 0 출력' },
          { id: 'check_external', label: 'd^2 > (r1+r2)^2이면 0 출력 (외부 분리)' },
          { id: 'check_internal', label: 'd^2 < (r1-r2)^2이면 0 출력 (내부 포함)' },
          { id: 'check_tangent', label: 'd^2 == (r1+r2)^2 또는 d^2 == (r1-r2)^2이면 1 출력' },
          { id: 'output_two', label: '나머지 경우 2 출력' },
        ],
        correct_order: ['compute_d2', 'check_coincide', 'check_concentric', 'check_external', 'check_internal', 'check_tangent', 'output_two'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'coincident_circles_infinite_points',
          'concentric_different_radii_zero_points',
          'avoid_sqrt_use_squared_comparison',
          'external_tangent_one_point',
          'internal_tangent_one_point',
          'overflow_in_squared_distance',
        ],
        required_answers: ['coincident_circles_infinite_points', 'concentric_different_radii_zero_points', 'avoid_sqrt_use_squared_comparison'],
        recommended_answers: ['external_tangent_one_point', 'internal_tangent_one_point'],
        optional_answers: ['overflow_in_squared_distance'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(T)', 'O(T*N)', 'O(T*logN)', 'O(1)'],
          accepted_answers: ['O(T)'],
        },
        space: {
          type: 'single_select',
          question: '적절한 공간복잡도는?',
          options: ['O(1)', 'O(T)', 'O(N)'],
          accepted_answers: ['O(1)'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는?',
          options: [
            'each_test_case_O1',
            'no_auxiliary_structure',
            'only_integer_comparisons',
            'need_to_store_all_results',
          ],
          accepted_answers: ['each_test_case_O1', 'no_auxiliary_structure', 'only_integer_comparisons'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'squared_distance_classification',
        label: 'd^2와 (r1+r2)^2, (r1-r2)^2 비교로 경우 분류',
        pattern_analysis_answer: 'circle_position_classification',
        required_strategy_tags: ['compute_d_squared', 'compare_with_sum_and_diff_of_radii_squared', 'classify_into_0_1_2_inf'],
      },
    ],

    common_mistakes: [
      {
        tag: 'use_sqrt',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'use_sqrt_for_distance' },
        ],
        feedback:
          'sqrt를 사용하면 부동소수점 오차로 외접/내접 경계 판정이 실패할 수 있습니다. d^2와 (r1+r2)^2, (r1-r2)^2을 정수 상태로 비교하세요.',
      },
      {
        tag: 'miss_coincident',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'coincident_circles_infinite_points' },
        ],
        feedback:
          'd=0이고 r1=r2인 경우 두 원이 완전히 일치하여 교점이 무한개(-1)입니다. 이 케이스를 놓치면 오답입니다.',
      },
      {
        tag: 'miss_concentric',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'concentric_different_radii_zero_points' },
        ],
        feedback:
          'd=0이지만 r1!=r2인 경우 동심원으로 교점이 0개입니다. 일치 케이스와 구분하여 처리해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: 'd^2 = (x2-x1)^2 + (y2-y1)^2를 계산하고, sqrt 없이 제곱 상태로 (r1+r2)^2, (r1-r2)^2과 비교하여 교점 수를 분류한다.',
      mentor_hint: 'sqrt를 쓰지 않는 것이 핵심이다. 정수 제곱 비교만으로 모든 경우를 정확히 판별할 수 있다.',
      pattern_trigger: '"두 원의 교점 수" 또는 "두 원의 위치 관계"가 보이면 → d^2와 반지름 합/차의 제곱 비교를 떠올려라.',
      why_it_works: '두 원의 교점 수는 중심 거리와 반지름의 합/차 관계로 완전히 결정된다. 제곱 비교로 부동소수점 오차를 완전히 제거할 수 있다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1004 — 어린 왕자
  // ──────────────────────────────────────────────────────
  {
    id: 'b001004-boj',
    title: '어린 왕자',
    difficulty: 'easy',
    domain: 'point_in_circle',
    summary: '시작점 또는 도착점 중 하나만 포함하는 원의 개수를 세는 기하학 문제',
    tags: ['geometry', 'math', 'circle'],
    input_type: 'coordinates_and_circles',
    output_type: 'single_value',
    constraints: {
      multiple_test_cases: true,
      max_circles_50: true,
      coordinate_range_1000: true,
      points_not_on_boundary: true,
      input_size_hint: 'N <= 50, -1000 <= x,y <= 1000, 1 <= r <= 1000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['minimum_boundary_crossings', 'shortest_path_length', 'boolean_existence', 'count', 'single_value'],
          accepted_answers: ['minimum_boundary_crossings'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'start_and_end_points',
            'multiple_circles_as_boundaries',
            'points_never_on_boundary',
            'sorted_data',
            'graph_edges',
          ],
          accepted_answers: ['start_and_end_points', 'multiple_circles_as_boundaries', 'points_never_on_boundary'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'count_circles_containing_exactly_one_endpoint',
            'minimum_boundary_crossings_via_xor_containment',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['containment_xor_counting', 'shortest_path', 'sweep_line', 'bfs_on_regions', 'brute_force', 'greedy'],
          accepted_answers: ['containment_xor_counting'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'only_circles_containing_one_endpoint_matter',
            'both_inside_or_both_outside_no_crossing',
            'no_need_for_actual_path',
            'need_shortest_path',
            'overlapping_subproblems',
          ],
          accepted_answers: ['only_circles_containing_one_endpoint_matter', 'both_inside_or_both_outside_no_crossing', 'no_need_for_actual_path'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['point_in_circle_test', 'squared_distance_comparison', 'simple_counting', 'memoization', 'two_pointer'],
          accepted_answers: ['point_in_circle_test', 'squared_distance_comparison', 'simple_counting'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['counter_variable', 'array', 'set', 'queue', 'graph'],
          accepted_answers: ['counter_variable'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'check_point_in_circle_for_each',
            'xor_containment_increment_counter',
            'squared_distance_no_sqrt',
            'compute_actual_path',
            'bfs_between_regions',
          ],
          accepted_answers: ['check_point_in_circle_for_each', 'xor_containment_increment_counter', 'squared_distance_no_sqrt'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_points', label: '시작점 (x1,y1)과 도착점 (x2,y2) 읽기' },
          { id: 'init_counter', label: '카운터 0으로 초기화' },
          { id: 'loop_circles', label: '각 원 (cx, cy, r)에 대해 반복' },
          { id: 'check_containment', label: '시작점과 도착점이 원 내부인지 각각 판별' },
          { id: 'xor_count', label: '둘 중 하나만 내부이면 카운터 +1' },
          { id: 'output', label: '카운터 출력' },
        ],
        correct_order: ['read_points', 'init_counter', 'loop_circles', 'check_containment', 'xor_count', 'output'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'xor_not_and_both_inside_no_crossing',
          'squared_comparison_no_sqrt',
          'boundary_excluded_by_problem',
          'circles_may_overlap_each_other',
          'N_equals_0_answer_is_0',
          'start_equals_end_answer_is_0',
        ],
        required_answers: ['xor_not_and_both_inside_no_crossing', 'squared_comparison_no_sqrt', 'boundary_excluded_by_problem'],
        recommended_answers: ['circles_may_overlap_each_other'],
        optional_answers: ['N_equals_0_answer_is_0', 'start_equals_end_answer_is_0'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N)', 'O(N^2)', 'O(NlogN)', 'O(1)'],
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
            'single_pass_over_circles',
            'constant_work_per_circle',
            'no_auxiliary_structure',
            'need_to_store_all_circles',
          ],
          accepted_answers: ['single_pass_over_circles', 'constant_work_per_circle', 'no_auxiliary_structure'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'xor_containment_counting',
        label: '각 원에 대해 시작/도착 포함 XOR로 카운팅',
        pattern_analysis_answer: 'containment_xor_counting',
        required_strategy_tags: ['check_point_in_circle_for_each', 'xor_containment_increment_counter', 'squared_distance_no_sqrt'],
      },
    ],

    common_mistakes: [
      {
        tag: 'count_both_inside',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'xor_not_and_both_inside_no_crossing' },
        ],
        feedback:
          '시작점과 도착점이 모두 원 안에 있으면 그 원의 경계를 넘을 필요가 없습니다. XOR 조건(둘 중 하나만 내부)으로 카운트해야 합니다.',
      },
      {
        tag: 'use_sqrt',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'squared_comparison_no_sqrt' },
        ],
        feedback:
          '점이 원 내부인지 판별할 때 (x-cx)^2 + (y-cy)^2 < r^2으로 정수 비교하면 됩니다. sqrt를 쓸 필요가 없고 정밀도 문제를 피할 수 있습니다.',
      },
      {
        tag: 'compute_actual_path',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'compute_actual_path' },
        ],
        feedback:
          '실제 경로를 계산할 필요가 없습니다. 경계를 넘는 최소 횟수는 시작/도착 중 하나만 포함하는 원의 수와 같습니다.',
      },
    ],

    review_notes: {
      core_takeaway: '각 원에 대해 시작점과 도착점의 포함 여부를 XOR로 판별하면 경계를 넘는 최소 횟수를 구할 수 있다.',
      mentor_hint: '기하 문제에서 "최소 횟수"가 나오면 실제 경로를 구하기 전에 핵심 관찰로 단순화할 수 있는지 먼저 생각하라.',
      pattern_trigger: '"원형 경계를 최소 횟수로 넘어야 한다"가 보이면 → 각 원에 대해 두 점의 포함 관계 XOR 카운팅을 떠올려라.',
      why_it_works: '두 점이 원의 같은 쪽에 있으면 경계를 넘지 않아도 되고, 다른 쪽이면 반드시 1번 넘어야 한다. 이 XOR 관계가 최소 횟수를 결정한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2162 — 선분 그룹
  // ──────────────────────────────────────────────────────
  {
    id: 'b002162-boj',
    title: '선분 그룹',
    difficulty: 'hard',
    domain: 'line_segment_intersection',
    summary: 'CCW 기반 선분 교차 판정과 Union-Find를 결합하여 선분 그룹을 구하는 문제',
    tags: ['geometry', 'union-find', 'ccw', 'line-segment-intersection'],
    input_type: 'line_segments',
    output_type: 'group_count_and_max_size',
    constraints: {
      coordinate_range_million: true,
      requires_long_long_for_ccw: true,
      input_size_hint: 'N <= 3000, -10^6 <= x,y <= 10^6',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['group_count_and_max_size', 'boolean_existence', 'single_value', 'traversal_order', 'minimum_steps'],
          accepted_answers: ['group_count_and_max_size'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'line_segments_in_2d_plane',
            'intersection_defines_same_group',
            'transitive_grouping',
            'sorted_data',
            'graph_edges',
          ],
          accepted_answers: ['line_segments_in_2d_plane', 'intersection_defines_same_group', 'transitive_grouping'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'group_segments_by_intersection_using_union_find',
            'count_connected_components_of_intersecting_segments',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['ccw_intersection_union_find', 'sweep_line', 'brute_force_geometry', 'dfs_on_segments', 'coordinate_compression', 'divide_and_conquer'],
          accepted_answers: ['ccw_intersection_union_find'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'pairwise_intersection_check_needed',
            'grouping_requires_union_find',
            'ccw_handles_all_segment_cases',
            'N_small_enough_for_O_N2',
            'need_shortest_path',
          ],
          accepted_answers: ['pairwise_intersection_check_needed', 'grouping_requires_union_find', 'ccw_handles_all_segment_cases', 'N_small_enough_for_O_N2'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['cross_product_sign', 'collinear_overlap_check', 'path_compression', 'union_by_rank', 'adjacency_list'],
          accepted_answers: ['cross_product_sign', 'collinear_overlap_check', 'path_compression', 'union_by_rank'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['union_find_with_size', 'segment_array', 'adjacency_list', 'priority_queue', 'stack'],
          accepted_answers: ['union_find_with_size', 'segment_array'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'all_pairs_intersection_check',
            'ccw_based_segment_intersection',
            'union_on_intersection',
            'track_group_size_in_union_find',
            'sweep_line_with_events',
          ],
          accepted_answers: ['all_pairs_intersection_check', 'ccw_based_segment_intersection', 'union_on_intersection', 'track_group_size_in_union_find'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_segments', label: 'N개의 선분 좌표 입력' },
          { id: 'init_uf', label: 'Union-Find 초기화 (parent, size 배열)' },
          { id: 'loop_pairs', label: '모든 선분 쌍 (i, j)에 대해 반복' },
          { id: 'check_intersect', label: 'CCW 기반 선분 교차 판정' },
          { id: 'union', label: '교차하면 Union(i, j) 수행' },
          { id: 'count_groups', label: '서로 다른 루트 수 = 그룹 수, 최대 size = 최대 그룹 크기' },
        ],
        correct_order: ['read_segments', 'init_uf', 'loop_pairs', 'check_intersect', 'union', 'count_groups'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'collinear_overlap_requires_range_check',
          'endpoint_touching_counts_as_intersection',
          'long_long_needed_for_ccw_product',
          'ccw_zero_both_sides_collinear_case',
          'single_segment_is_one_group',
          'all_segments_parallel_N_groups',
        ],
        required_answers: ['collinear_overlap_requires_range_check', 'endpoint_touching_counts_as_intersection', 'long_long_needed_for_ccw_product'],
        recommended_answers: ['ccw_zero_both_sides_collinear_case'],
        optional_answers: ['single_segment_is_one_group', 'all_segments_parallel_N_groups'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(N^2)', 'O(NlogN)', 'O(N^2logN)', 'O(N^3)'],
          accepted_answers: ['O(N^2)'],
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
            'all_pairs_is_N_choose_2',
            'intersection_check_is_O1',
            'union_find_nearly_O1_amortized',
            'segment_storage_O_N',
            'N_is_3000_so_N2_is_9M',
          ],
          accepted_answers: ['all_pairs_is_N_choose_2', 'intersection_check_is_O1', 'union_find_nearly_O1_amortized', 'segment_storage_O_N'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'ccw_all_pairs_union_find',
        label: 'CCW 교차 판정 + 모든 쌍 O(N^2) + Union-Find',
        pattern_analysis_answer: 'ccw_intersection_union_find',
        required_strategy_tags: ['all_pairs_intersection_check', 'ccw_based_segment_intersection', 'union_on_intersection', 'track_group_size_in_union_find'],
      },
    ],

    common_mistakes: [
      {
        tag: 'miss_collinear',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'collinear_overlap_requires_range_check' },
        ],
        feedback:
          'CCW가 모두 0인 경우(일직선) 선분이 겹치는지 좌표 범위를 추가로 확인해야 합니다. 이 처리를 빠뜨리면 일직선상에서 겹치는 선분을 놓칩니다.',
      },
      {
        tag: 'miss_endpoint_touch',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'endpoint_touching_counts_as_intersection' },
        ],
        feedback:
          '선분 끝점에서 접하는 경우도 교차로 처리해야 합니다. CCW 곱이 0인 경우를 포함(<=)하여 판정하세요.',
      },
      {
        tag: 'overflow_ccw',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'long_long_needed_for_ccw_product' },
        ],
        feedback:
          '좌표가 -10^6 ~ 10^6이므로 CCW 계산 시 곱이 최대 4*10^12에 달합니다. int 범위를 초과하므로 long long을 사용해야 합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '모든 선분 쌍에 대해 CCW 기반 교차 판정 후 Union-Find로 그룹핑. 일직선 겹침과 끝점 접촉을 놓치지 않는 것이 핵심.',
      mentor_hint: 'CCW 교차 판정에서 가장 흔한 실수는 collinear 케이스이다. CCW가 모두 0이면 좌표 범위 겹침을 별도로 확인해야 한다.',
      pattern_trigger: '"선분들의 교차 관계로 그룹을 만들어라"가 보이면 → CCW 교차 판정 + Union-Find 조합을 떠올려라.',
      why_it_works: 'N <= 3000이므로 O(N^2)으로 모든 쌍을 검사해도 9*10^6 연산으로 충분하다. CCW는 정수 연산만으로 모든 교차 케이스를 정확히 판별한다.',
    },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11758 — CCW
  // ──────────────────────────────────────────────────────
  {
    id: 'b011758-boj',
    title: 'CCW',
    difficulty: 'easy',
    domain: 'cross_product',
    summary: '세 점의 방향성을 외적(cross product)으로 판정하는 기본 기하학 문제',
    tags: ['geometry', 'math', 'cross-product'],
    input_type: 'three_points',
    output_type: 'direction_sign',
    constraints: {
      coordinate_range_10000: true,
      three_distinct_points: true,
      input_size_hint: '-10000 <= x,y <= 10000',
    },

    training_flow: {
      reading: {
        goal_type: {
          type: 'single_select',
          question: '이 문제에서 구해야 하는 것은 무엇인가?',
          options: ['direction_sign', 'angle_value', 'boolean_existence', 'count', 'single_value'],
          accepted_answers: ['direction_sign'],
        },
        input_summary: {
          type: 'multi_select',
          question: '입력의 성격은 무엇인가?',
          options: [
            'three_2d_points',
            'determine_ccw_cw_collinear',
            'integer_coordinates',
            'sorted_data',
            'graph_edges',
          ],
          accepted_answers: ['three_2d_points', 'determine_ccw_cw_collinear', 'integer_coordinates'],
        },
        one_line_summary: {
          type: 'tag_select',
          question: '이 문제를 한 문장으로 요약하면?',
          accepted_answers: [
            'determine_orientation_of_three_points_using_cross_product',
            'basic_ccw_implementation',
          ],
        },
      },

      pattern_analysis: {
        primary_pattern: {
          type: 'single_select',
          question: '가장 적절한 핵심 패턴은 무엇인가?',
          options: ['cross_product_sign', 'angle_computation', 'slope_comparison', 'dot_product', 'distance_comparison', 'brute_force'],
          accepted_answers: ['cross_product_sign'],
        },
        reason_tags: {
          type: 'multi_select',
          question: '그렇게 판단한 이유는 무엇인가?',
          options: [
            'cross_product_sign_determines_orientation',
            'integer_arithmetic_no_precision_issue',
            'O1_computation',
            'building_block_for_advanced_geometry',
            'need_shortest_path',
          ],
          accepted_answers: ['cross_product_sign_determines_orientation', 'integer_arithmetic_no_precision_issue', 'O1_computation'],
        },
        secondary_patterns: {
          type: 'multi_select',
          question: '보조적으로 연관된 패턴은?',
          options: ['vector_subtraction', 'sign_function', 'avoid_floating_point', 'memoization', 'two_pointer'],
          accepted_answers: ['vector_subtraction', 'sign_function', 'avoid_floating_point'],
        },
      },

      strategy_design: {
        data_structures: {
          type: 'multi_select',
          question: '사용할 자료구조는?',
          options: ['integer_variables', 'array', 'vector_class', 'matrix', 'stack'],
          accepted_answers: ['integer_variables'],
        },
        approach_tags: {
          type: 'multi_select',
          question: '핵심 접근 방식은?',
          options: [
            'compute_cross_product_of_two_vectors',
            'return_sign_of_cross_product',
            'use_atan2_for_angle',
            'compare_slopes',
          ],
          accepted_answers: ['compute_cross_product_of_two_vectors', 'return_sign_of_cross_product'],
        },
      },

      solution_flow: {
        type: 'ordered_steps',
        question: '올바른 알고리즘 절차를 순서대로 배치하세요.',
        steps_catalog: [
          { id: 'read_points', label: '세 점 P1, P2, P3 좌표 입력' },
          { id: 'compute_vectors', label: '벡터 P1P2 = (x2-x1, y2-y1), P1P3 = (x3-x1, y3-y1) 계산' },
          { id: 'compute_cross', label: '외적 = (x2-x1)*(y3-y1) - (y2-y1)*(x3-x1) 계산' },
          { id: 'output_sign', label: '양수이면 1, 음수이면 -1, 0이면 0 출력' },
        ],
        correct_order: ['read_points', 'compute_vectors', 'compute_cross', 'output_sign'],
      },

      edge_cases: {
        type: 'multi_select',
        question: '이 문제에서 고려해야 할 예외/주의 사항은?',
        options: [
          'collinear_case_cross_product_zero',
          'integer_arithmetic_sufficient',
          'no_need_for_absolute_value',
          'overflow_possible_with_large_coordinates',
          'points_are_distinct',
        ],
        required_answers: ['collinear_case_cross_product_zero', 'integer_arithmetic_sufficient', 'no_need_for_absolute_value'],
        recommended_answers: ['overflow_possible_with_large_coordinates'],
        optional_answers: ['points_are_distinct'],
      },

      complexity: {
        time: {
          type: 'single_select',
          question: '적절한 시간복잡도는?',
          options: ['O(1)', 'O(N)', 'O(NlogN)', 'O(N^2)'],
          accepted_answers: ['O(1)'],
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
            'fixed_number_of_arithmetic_operations',
            'no_loops_or_recursion',
            'only_stores_coordinates_and_result',
            'need_to_iterate_over_input',
          ],
          accepted_answers: ['fixed_number_of_arithmetic_operations', 'no_loops_or_recursion', 'only_stores_coordinates_and_result'],
        },
      },
    },

    accepted_strategies: [
      {
        strategy_id: 'cross_product_sign',
        label: '외적(cross product) 부호로 방향성 판정',
        pattern_analysis_answer: 'cross_product_sign',
        required_strategy_tags: ['compute_cross_product_of_two_vectors', 'return_sign_of_cross_product'],
      },
    ],

    common_mistakes: [
      {
        tag: 'use_atan2',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'use_atan2_for_angle' },
        ],
        feedback:
          'atan2로 각도를 계산하면 부동소수점 오차로 일직선(0) 판정이 어렵습니다. 외적은 정수 연산만으로 정확히 판별할 수 있습니다.',
      },
      {
        tag: 'use_slope',
        conditions: [
          { step: 'strategy_design', field: 'approach_tags', operator: 'includes', value: 'compare_slopes' },
        ],
        feedback:
          '기울기 비교는 수직선(x값이 같은 경우) 예외 처리가 필요하고 실수 나눗셈으로 오차가 발생합니다. 외적을 사용하세요.',
      },
      {
        tag: 'miss_collinear',
        conditions: [
          { step: 'edge_cases', field: 'selected_options', operator: 'not_includes', value: 'collinear_case_cross_product_zero' },
        ],
        feedback:
          '외적 값이 정확히 0인 경우를 별도로 처리해야 합니다. 이 경우 세 점이 일직선 위에 있으므로 0을 출력합니다.',
      },
    ],

    review_notes: {
      core_takeaway: '외적 = (x2-x1)*(y3-y1) - (y2-y1)*(x3-x1). 양수면 반시계(1), 음수면 시계(-1), 0이면 일직선(0).',
      mentor_hint: 'CCW는 선분 교차, 볼록 껍질 등 모든 기하 문제의 기본 빌딩 블록이다. 이 공식을 확실히 외워두자.',
      pattern_trigger: '"세 점의 방향성" 또는 "반시계/시계 판별"이 보이면 → 외적(cross product) 부호를 떠올려라.',
      why_it_works: '외적은 두 벡터가 이루는 평행사변형의 부호 있는 넓이이다. 양수면 P3가 P1P2의 왼쪽(반시계), 음수면 오른쪽(시계), 0이면 일직선이다.',
    },
  },
];
