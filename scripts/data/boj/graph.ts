import type { ProblemSeed } from '../problems';

export const BOJ_GRAPH: ProblemSeed[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1043 — 거짓말
  // ──────────────────────────────────────────────────────
  {
    id: 'b001043-boj',
    title: '거짓말',
    description:
      '지민이는 파티에서 과장된 이야기를 하고 싶어한다. 하지만 진실을 아는 사람이 있는 파티에서는 거짓말을 할 수 없다. 진실을 아는 사람과 같은 파티에 참석한 적이 있는 사람도 진실을 알게 된다.\n\nN명의 사람과 M개의 파티 정보가 주어질 때, 지민이가 과장된 이야기를 할 수 있는 파티의 최대 수를 구하시오.',
    constraints:
      '1 <= N <= 50\n1 <= M <= 50\n각 파티에 참석하는 사람 수는 1 이상 50 이하',
    difficulty: 'medium',
    concept_tags: ['union-find', 'graph'],
    secondary_concept_tags: ['bfs', 'set'],
    intent_description:
      'Union-Find를 사용하여 진실을 아는 그룹이 전파되는 과정을 모델링할 수 있는지 확인하는 문제.',
    key_observation:
      '같은 파티에 참석한 사람들은 하나의 그룹으로 묶이고, 진실을 아는 사람이 속한 그룹의 파티에서는 거짓말을 할 수 없다.',
    wrong_approaches: [
      '단순히 진실을 아는 사람이 직접 참석한 파티만 제외 — 전파를 고려하지 않음',
      '파티 순서대로 처리 — 순서와 무관하게 전파됨',
    ],
    live_coding_flow: {
      firstObservation:
        '진실을 아는 사람과 같은 파티에 있었던 사람도 진실을 알게 되므로, 이 관계는 전이적(transitive)이다. 즉, 같은 파티에 속한 사람들을 하나의 집합으로 묶어야 한다.',
      approachCandidates: [
        'Union-Find: 같은 파티의 사람들을 union하고, 진실을 아는 사람과 같은 집합인지 확인 O(M * alpha(N))',
        'BFS/DFS: 사람-파티 이분 그래프를 만들어 진실 전파 O(N + M)',
        '브루트포스: 진실 전파를 반복 — 수렴할 때까지 O(M^2 * N)',
      ],
      whyThisApproach:
        'Union-Find가 가장 직관적이다. 같은 파티에 속한 사람을 union하고, 각 파티에 대해 참석자 중 진실을 아는 그룹과 같은 집합에 속한 사람이 있는지 확인하면 된다.',
      wrongApproaches: [
        '진실을 아는 사람이 직접 참석한 파티만 제외하면 간접 전파를 놓침',
        '파티를 순서대로 한 번만 순회하면 나중 파티에서 전파된 정보가 이전 파티에 반영되지 않음',
      ],
      dataStructures: ['Union-Find (Disjoint Set)', '파티별 참석자 리스트'],
      timeComplexity: 'O(M * N * alpha(N))',
      pitfalls: [
        '진실을 아는 사람이 0명인 경우 — 모든 파티에서 거짓말 가능',
        '같은 파티의 모든 사람을 서로 union해야 함 — 첫 번째 사람과만 union하면 충분',
        'union 후에 find로 진실 그룹 확인 시 경로 압축이 필요',
      ],
      interviewExplanation:
        '"같은 파티에 참석한 사람들을 Union-Find로 하나의 집합으로 묶습니다. 그 다음 각 파티에 대해, 참석자 중 진실을 아는 사람과 같은 집합에 속한 사람이 있는지 find로 확인합니다. 없으면 그 파티에서 과장된 이야기가 가능합니다. 시간복잡도는 거의 O(N * M)입니다."',
    },
    source: { platform: 'boj' as any, id: 1043 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1197 — 최소 스패닝 트리
  // ──────────────────────────────────────────────────────
  {
    id: 'b001197-boj',
    title: '최소 스패닝 트리',
    description:
      '그래프가 주어졌을 때, 그 그래프의 최소 스패닝 트리(MST)를 구하시오.\n\n최소 스패닝 트리란 주어진 그래프의 모든 정점을 연결하는 부분 그래프 중에서 그 가중치의 합이 최소인 트리를 말한다.',
    constraints:
      '1 <= V <= 10,000\n1 <= E <= 100,000\n간선의 가중치 절댓값은 1,000,000 이하',
    difficulty: 'medium',
    concept_tags: ['mst', 'union-find'],
    secondary_concept_tags: ['greedy', 'sorting', 'priority-queue'],
    intent_description:
      'Kruskal 또는 Prim 알고리즘으로 최소 스패닝 트리를 구할 수 있는지 확인하는 문제.',
    key_observation:
      '간선을 가중치 순으로 정렬한 뒤, 사이클을 만들지 않는 간선만 선택하면 MST가 된다 (Kruskal).',
    wrong_approaches: [
      '단순 DFS/BFS로 트리 구성 — 최소 가중치 보장 불가',
      '모든 부분 집합 탐색 — 지수 시간',
    ],
    live_coding_flow: {
      firstObservation:
        'V개의 정점을 연결하려면 정확히 V-1개의 간선이 필요하다. 가중치 합을 최소로 하려면 작은 간선부터 선택하되 사이클은 피해야 한다.',
      approachCandidates: [
        'Kruskal: 간선 정렬 + Union-Find로 사이클 판별 O(E log E)',
        'Prim: 우선순위 큐로 인접 정점 중 최소 가중치 선택 O(E log V)',
        '브루트포스: 모든 스패닝 트리 열거 — 지수 시간',
      ],
      whyThisApproach:
        'Kruskal이 구현이 간단하다. 간선을 정렬하고 Union-Find로 사이클 여부만 판단하면 된다. E <= 100,000이므로 정렬 시간도 충분하다.',
      wrongApproaches: [
        'DFS 트리는 가중치를 고려하지 않아 최소가 아닐 수 있음',
        '가중치가 음수인 간선이 있을 수 있으므로 양수만 가정하면 안 됨',
      ],
      dataStructures: [
        '간선 리스트 (정렬용)',
        'Union-Find (사이클 판별)',
      ],
      timeComplexity: 'O(E log E)',
      pitfalls: [
        '가중치가 음수일 수 있음 — 절댓값이 아닌 실제 값으로 정렬',
        'V-1개 간선을 선택하면 조기 종료 가능',
        'Union-Find에서 rank/size 기반 합치기와 경로 압축을 적용해야 효율적',
      ],
      interviewExplanation:
        '"Kruskal 알고리즘을 사용합니다. 모든 간선을 가중치 기준으로 오름차순 정렬한 뒤, Union-Find를 이용해 사이클을 형성하지 않는 간선만 선택합니다. V-1개의 간선을 선택하면 MST가 완성됩니다. 시간복잡도는 정렬이 지배적이므로 O(E log E)입니다."',
    },
    source: { platform: 'boj' as any, id: 1197 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1219 — 오민식의 고민
  // ──────────────────────────────────────────────────────
  {
    id: 'b001219-boj',
    title: '오민식의 고민',
    description:
      '오민식은 시작 도시에서 도착 도시까지 여행하면서 돈을 벌고 싶다. 각 도시에서는 일정 금액을 벌 수 있고, 도시 간 이동에는 교통비가 든다.\n\n시작 도시에서 도착 도시까지 이동하면서 벌 수 있는 돈의 최댓값을 구하시오. 도착할 수 없으면 "gg", 무한히 돈을 벌 수 있으면 "Gee"를 출력한다.',
    constraints:
      '1 <= N <= 100 (도시 수)\n0 <= M <= 100,000 (교통수단 수)\n도시에서 버는 돈과 교통비는 1,000,000 이하',
    difficulty: 'hard',
    concept_tags: ['bellman-ford', 'graph'],
    secondary_concept_tags: ['shortest-path', 'negative-cycle'],
    intent_description:
      '벨만-포드 알고리즘을 변형하여 최장 경로 및 양의 사이클(무한 이득) 검출을 수행할 수 있는지 확인하는 문제.',
    key_observation:
      '최대 수익 문제를 "비용 = 교통비 - 도착 도시 수입"으로 변환하면 최단 경로 문제가 된다. 음의 사이클이 도착점에 영향을 주면 무한 이득이다.',
    wrong_approaches: [
      'Dijkstra 사용 — 음의 간선이 있어 사용 불가',
      '벨만-포드에서 N-1번 반복 후 사이클 검출만 하고, 그 사이클이 도착점에 도달 가능한지 확인하지 않음',
    ],
    live_coding_flow: {
      firstObservation:
        '각 간선의 비용을 "교통비 - 도착 도시 수입"으로 설정하면 최소 비용(= 최대 이익) 경로를 구하는 문제가 된다. 음의 간선이 존재하므로 Dijkstra는 불가능하고 벨만-포드를 써야 한다.',
      approachCandidates: [
        '벨만-포드 변형: 최장 경로 + 양의 사이클 검출 O(V * E)',
        'SPFA: 벨만-포드 최적화 버전',
        'DFS + 메모이제이션: 사이클 처리가 복잡',
      ],
      whyThisApproach:
        '벨만-포드는 음의 간선을 처리할 수 있고, N번째 반복에서 여전히 갱신되는 정점이 도착점에 영향을 줄 수 있는지 확인하면 무한 이득을 판별할 수 있다.',
      wrongApproaches: [
        'Dijkstra는 음의 간선에서 동작하지 않음',
        'N-1번 반복 후 단순히 사이클 존재 여부만 확인하면, 도착점에 영향을 주지 않는 사이클도 "Gee"로 판정하는 오류',
      ],
      dataStructures: ['간선 리스트', '거리 배열 dist[]'],
      timeComplexity: 'O(V * E)',
      pitfalls: [
        '양의 사이클이 도착점까지 도달 가능한지 반드시 확인해야 함 — BFS/DFS로 전파',
        '시작 도시의 수입도 포함해야 함',
        '도착 불가능한 경우("gg")와 무한 이득("Gee")을 구분해야 함',
        'dist 초기값을 -INF로 설정 (최대화 문제)',
      ],
      interviewExplanation:
        '"간선 비용을 교통비 - 도착 도시 수입으로 설정하고 벨만-포드를 실행합니다. N-1번 반복으로 최단 거리를 구한 뒤, N번째 반복에서 갱신되는 정점이 있으면 음의 사이클입니다. 이 사이클에서 도착점까지 도달 가능한지 BFS로 확인하여 Gee를 판별하고, 시작점에서 도착점까지 경로가 없으면 gg를 출력합니다."',
    },
    source: { platform: 'boj' as any, id: 1219 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1325 — 효율적인 해킹
  // ──────────────────────────────────────────────────────
  {
    id: 'b001325-boj',
    title: '효율적인 해킹',
    description:
      'N개의 컴퓨터로 이루어진 네트워크에서, A가 B를 신뢰하면 B를 해킹하면 A도 해킹할 수 있다.\n\n한 번에 가장 많은 컴퓨터를 해킹할 수 있는 컴퓨터의 번호를 오름차순으로 출력하시오.',
    constraints:
      '1 <= N <= 10,000\n1 <= M <= 100,000',
    difficulty: 'medium',
    concept_tags: ['bfs', 'graph'],
    secondary_concept_tags: ['dfs'],
    intent_description:
      '방향 그래프에서 각 정점을 시작으로 BFS/DFS를 수행하여 도달 가능한 정점 수를 구하는 문제.',
    key_observation:
      '"A가 B를 신뢰한다"는 B → A 방향의 해킹 전파를 의미한다. 역방향 그래프에서 각 노드의 도달 가능 정점 수를 구하면 된다.',
    wrong_approaches: [
      '신뢰 관계를 양방향으로 처리 — 방향 그래프임',
      '한 번의 BFS로 해결하려고 시도 — 각 시작점마다 별도 탐색 필요',
    ],
    live_coding_flow: {
      firstObservation:
        '"A가 B를 신뢰"하면 B를 해킹할 때 A도 해킹된다. 즉 B → A 방향으로 해킹이 전파된다. 역방향 그래프를 만들고 각 노드에서 BFS하여 도달 가능 수를 세면 된다.',
      approachCandidates: [
        'BFS/DFS: 각 노드에서 탐색, 도달 가능 정점 수 카운트 O(N * (N + M))',
        '역방향 그래프 + 각 노드 BFS O(N * (N + M))',
      ],
      whyThisApproach:
        'N이 최대 10,000이고 M이 100,000이므로, 각 노드에서 BFS를 수행해도 총 O(N * (N + M)) = 약 10^9이지만 BFS의 상수가 작아 시간 내에 통과 가능하다.',
      wrongApproaches: [
        '방향을 반대로 설정하면 해킹 전파 방향이 달라져 오답',
        '진입 차수(in-degree)만으로 판단 — 간접 전파를 고려하지 못함',
      ],
      dataStructures: ['인접 리스트', 'visited 배열', 'Queue (BFS용)'],
      timeComplexity: 'O(N * (N + M))',
      pitfalls: [
        '신뢰 관계의 방향을 정확히 이해해야 함 — A가 B를 신뢰하면 B→A',
        '가장 많이 해킹할 수 있는 컴퓨터가 여러 대일 수 있음 — 모두 출력',
        '오름차순 출력 주의',
      ],
      interviewExplanation:
        '"신뢰 관계를 역방향 간선으로 저장합니다. 각 컴퓨터를 시작점으로 BFS를 수행하여 해킹할 수 있는 컴퓨터 수를 셉니다. 최댓값을 가진 컴퓨터 번호를 오름차순으로 출력합니다. 시간복잡도는 O(N * (N + M))입니다."',
    },
    source: { platform: 'boj' as any, id: 1325 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1389 — 케빈 베이컨의 6단계 법칙
  // ──────────────────────────────────────────────────────
  {
    id: 'b001389-boj',
    title: '케빈 베이컨의 6단계 법칙',
    description:
      'BOJ 유저의 수 N과 친구 관계 M이 주어졌을 때, 케빈 베이컨의 수가 가장 작은 사람을 구하시오.\n\n케빈 베이컨의 수란, 모든 사람과의 관계를 거치는 최소 단계 수의 합이다. 예를 들어 1-3의 최소 단계가 2이고 1-4의 최소 단계가 3이면 1의 케빈 베이컨 수에는 2+3+...이 더해진다.',
    constraints:
      '2 <= N <= 100\n1 <= M <= 5,000',
    difficulty: 'easy',
    concept_tags: ['bfs', 'shortest-path'],
    secondary_concept_tags: ['floyd-warshall', 'graph'],
    intent_description:
      'BFS 또는 플로이드-워셜로 모든 쌍 최단 거리를 구하고 합이 최소인 정점을 찾는 문제.',
    key_observation:
      'N이 작으므로(100 이하) 각 정점에서 BFS를 돌리거나, 플로이드-워셜로 모든 쌍 최단 거리를 한 번에 구할 수 있다.',
    wrong_approaches: [
      'DFS로 최단 거리 구하기 — BFS가 아니면 최단 보장 불가',
      '친구 수(degree)가 가장 많은 사람 선택 — 직접 친구만 고려하므로 오답',
    ],
    live_coding_flow: {
      firstObservation:
        '모든 사람 쌍 사이의 최단 거리를 구해야 한다. N <= 100이므로 O(N^3) 플로이드-워셜이나 O(N * (N + M)) BFS 모두 가능하다.',
      approachCandidates: [
        '플로이드-워셜: O(N^3) = 10^6으로 충분',
        'BFS N번: 각 정점에서 BFS O(N * (N + M))',
      ],
      whyThisApproach:
        '플로이드-워셜이 구현이 간단하고, N=100이면 100^3 = 10^6으로 시간 여유가 충분하다.',
      wrongApproaches: [
        'DFS는 가중치 없는 그래프에서도 최단 거리를 보장하지 않음',
        '직접 연결된 친구 수(degree)로 판단하면 간접 관계를 무시하게 됨',
      ],
      dataStructures: ['2D 거리 배열 dist[N][N]'],
      timeComplexity: 'O(N^3)',
      pitfalls: [
        'dist 배열 초기화: 자기 자신은 0, 나머지는 INF',
        '케빈 베이컨 수가 같으면 번호가 가장 작은 사람 출력',
        '양방향 간선임을 주의',
      ],
      interviewExplanation:
        '"N이 100 이하로 작으므로 플로이드-워셜을 사용합니다. dist[i][j]를 모든 쌍에 대해 구한 뒤, 각 사람의 케빈 베이컨 수(dist[i][1] + dist[i][2] + ... + dist[i][N])를 계산하고 최솟값을 가진 사람을 출력합니다. O(N^3)으로 충분합니다."',
    },
    source: { platform: 'boj' as any, id: 1389 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1414 — 불우이웃돕기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001414-boj',
    title: '불우이웃돕기',
    description:
      '다솜이는 N대의 컴퓨터를 가지고 있고, 각 컴퓨터 사이에는 랜선이 연결되어 있다. 모든 컴퓨터가 연결된 상태를 유지하면서 기부할 수 있는 랜선 길이의 최댓값을 구하시오.\n\n모든 컴퓨터를 연결할 수 없으면 -1을 출력한다.',
    constraints:
      '1 <= N <= 50\n랜선 길이는 0 이상 (소문자 a-z: 1-26, 대문자 A-Z: 27-52, 0은 연결 없음)',
    difficulty: 'medium',
    concept_tags: ['mst', 'union-find'],
    secondary_concept_tags: ['greedy', 'graph'],
    intent_description:
      'MST를 구한 뒤, 전체 랜선 길이 합에서 MST 가중치를 빼면 기부 가능한 최대 길이를 얻을 수 있음을 파악하는 문제.',
    key_observation:
      '모든 컴퓨터를 연결하는 데 필요한 최소 랜선 = MST. 기부 가능 랜선 = 전체 랜선 합 - MST 가중치.',
    wrong_approaches: [
      '가장 긴 랜선부터 제거 — 연결성이 깨질 수 있음',
      '입력 형식(알파벳 → 숫자 변환)을 잘못 처리',
    ],
    live_coding_flow: {
      firstObservation:
        '모든 컴퓨터가 연결된 상태를 유지하면서 최대한 많이 기부하려면, 연결에 필요한 최소한의 랜선만 남기면 된다. 이것이 바로 MST이다.',
      approachCandidates: [
        'Kruskal MST + (전체 합 - MST) 계산',
        'Prim MST + (전체 합 - MST) 계산',
      ],
      whyThisApproach:
        'N <= 50으로 작아 어떤 MST 알고리즘이든 충분하다. Kruskal이 구현이 간단하다.',
      wrongApproaches: [
        '최대 스패닝 트리를 구해 기부하면 연결이 안 될 수 있음 — 최소 스패닝 트리를 남겨야 함',
        '자기 자신으로의 간선(대각선)을 무시해야 하는데 포함시키면 오답',
      ],
      dataStructures: ['Union-Find', '간선 리스트'],
      timeComplexity: 'O(N^2 log N)',
      pitfalls: [
        '입력 변환: 소문자 → 1~26, 대문자 → 27~52, 0 → 연결 없음',
        '인접 행렬의 대각선(자기 자신)은 간선이 아님 — 기부 가능 랜선에는 포함',
        '그래프가 연결되지 않으면 -1 출력',
      ],
      interviewExplanation:
        '"입력을 파싱하여 간선 리스트를 만들고, Kruskal로 MST를 구합니다. 전체 랜선 길이 합에서 MST 가중치를 빼면 기부 가능한 최대 길이입니다. MST로 N-1개 간선을 선택하지 못하면 모든 컴퓨터를 연결할 수 없으므로 -1을 출력합니다."',
    },
    source: { platform: 'boj' as any, id: 1414 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1516 — 게임 개발
  // ──────────────────────────────────────────────────────
  {
    id: 'b001516-boj',
    title: '게임 개발',
    description:
      'N개의 건물이 있고, 각 건물을 짓는 데 걸리는 시간이 주어진다. 어떤 건물을 짓기 위해서는 먼저 지어야 하는 건물들이 있을 수 있다. 여러 건물을 동시에 지을 수 있을 때, 각 건물이 완성되는 최소 시간을 구하시오.',
    constraints:
      '1 <= N <= 500\n각 건물의 건설 시간은 100,000 이하',
    difficulty: 'medium',
    concept_tags: ['topological-sort', 'dp'],
    secondary_concept_tags: ['dag', 'bfs', 'graph'],
    intent_description:
      '위상 정렬과 DP를 결합하여 DAG에서 각 노드의 최소 완성 시간을 구할 수 있는지 확인하는 문제.',
    key_observation:
      '각 건물의 완성 시간 = 자신의 건설 시간 + 선행 건물들의 완성 시간 중 최댓값. 위상 정렬 순서로 DP를 적용하면 된다.',
    wrong_approaches: [
      '선행 건물 시간의 합 — 동시 건설 가능하므로 합이 아닌 최댓값',
      '역방향 DFS — 사이클 없는 DAG이므로 가능하지만 위상 정렬이 더 직관적',
    ],
    live_coding_flow: {
      firstObservation:
        '건물 간 선행 관계가 DAG를 형성한다. 동시 건설이 가능하므로, 각 건물의 시작 시점은 선행 건물 중 가장 늦게 완성되는 시점이다.',
      approachCandidates: [
        '위상 정렬 + DP: BFS로 위상 정렬하며 완성 시간 갱신 O(N + M)',
        'DFS + 메모이제이션: 역방향으로 재귀 O(N + M)',
      ],
      whyThisApproach:
        'BFS 기반 위상 정렬(Kahn 알고리즘)이 직관적이다. 진입 차수가 0인 노드부터 시작하여, 인접 노드의 완성 시간을 갱신한다.',
      wrongApproaches: [
        '선행 건물 시간의 "합"으로 계산하면 병렬 건설을 무시하게 됨',
        '단순 BFS 레벨 순회로 시간 계산하면 개별 건설 시간 차이를 반영 못함',
      ],
      dataStructures: [
        '인접 리스트 + 진입 차수 배열',
        'DP 배열 result[i]: 건물 i의 최소 완성 시간',
        'Queue (BFS 위상 정렬)',
      ],
      timeComplexity: 'O(N + M)',
      pitfalls: [
        'result[i] = build_time[i] + max(result[선행 건물들])로 갱신',
        '선행 건물이 없는 건물의 완성 시간 = 자신의 건설 시간',
        '동시 건설 가능이므로 합이 아닌 max를 사용해야 함',
      ],
      interviewExplanation:
        '"위상 정렬을 BFS로 수행합니다. 진입 차수 0인 건물부터 큐에 넣고, 각 건물을 처리할 때 인접 건물의 완성 시간을 max(현재값, 현재 건물 완성 시간) + 인접 건물 건설 시간으로 갱신합니다. 모든 건물에 대해 최소 완성 시간을 구할 수 있으며 O(N + M)입니다."',
    },
    source: { platform: 'boj' as any, id: 1516 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1707 — 이분 그래프
  // ──────────────────────────────────────────────────────
  {
    id: 'b001707-boj',
    title: '이분 그래프',
    description:
      '그래프가 주어졌을 때, 이 그래프가 이분 그래프인지 판별하시오.\n\n이분 그래프란, 그래프의 정점을 두 그룹으로 나누어 같은 그룹 내의 정점끼리는 간선이 없도록 할 수 있는 그래프이다.',
    constraints:
      '1 <= K <= 5 (테스트 케이스)\n1 <= V <= 20,000\n1 <= E <= 200,000',
    difficulty: 'medium',
    concept_tags: ['bfs', 'bipartite', 'graph'],
    secondary_concept_tags: ['dfs', 'coloring'],
    intent_description:
      'BFS/DFS로 2-색 칠하기(coloring)를 수행하여 이분 그래프 여부를 판별할 수 있는지 확인하는 문제.',
    key_observation:
      '이분 그래프는 2-색 칠하기가 가능한 그래프와 동치이다. BFS로 인접한 정점에 다른 색을 칠하다가 충돌이 발생하면 이분 그래프가 아니다.',
    wrong_approaches: [
      'DFS로 홀수 길이 사이클 탐지 — 구현이 복잡하고 비연결 그래프 처리 어려움',
      '정점 degree로 판별 — degree와 이분 그래프는 무관',
    ],
    live_coding_flow: {
      firstObservation:
        '이분 그래프 = 2-색 칠하기 가능. 임의의 정점에 색 0을 칠하고, 인접 정점에 색 1을 칠하는 방식으로 BFS를 수행하다가 이미 같은 색이 칠해진 인접 정점을 만나면 이분 그래프가 아니다.',
      approachCandidates: [
        'BFS 2-색 칠하기: O(V + E)',
        'DFS 2-색 칠하기: O(V + E)',
        'Union-Find: 인접 정점을 반대 그룹으로 union — 복잡',
      ],
      whyThisApproach:
        'BFS가 가장 직관적이다. 레벨별로 번갈아 색을 칠하고, 충돌을 체크하면 된다.',
      wrongApproaches: [
        '연결 요소가 여러 개일 수 있는데 하나만 검사하면 오답',
        '방문하지 않은 정점을 무시하면 비연결 그래프에서 실패',
      ],
      dataStructures: ['인접 리스트', 'color 배열 (-1: 미방문, 0/1: 색)', 'Queue (BFS)'],
      timeComplexity: 'O(V + E)',
      pitfalls: [
        '비연결 그래프: 모든 연결 요소에 대해 BFS 수행 필요',
        '테스트 케이스마다 데이터 초기화 필수',
        'color 배열을 visited 용도로도 사용 (미방문 = -1)',
      ],
      interviewExplanation:
        '"BFS로 2-색 칠하기를 수행합니다. 시작 정점에 색 0을 칠하고, 인접 정점에 반대 색을 칠합니다. 이미 색이 칠해진 인접 정점이 같은 색이면 이분 그래프가 아닙니다. 비연결 그래프를 위해 모든 미방문 정점에서 BFS를 시작합니다. O(V + E)입니다."',
    },
    source: { platform: 'boj' as any, id: 1707 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1717 — 집합의 표현
  // ──────────────────────────────────────────────────────
  {
    id: 'b001717-boj',
    title: '집합의 표현',
    description:
      '초기에 n+1개의 집합 {0}, {1}, {2}, ..., {n}이 있다. 합집합 연산과 두 원소가 같은 집합에 포함되어 있는지를 확인하는 연산을 수행하시오.',
    constraints:
      '1 <= n <= 1,000,000\n1 <= m <= 100,000',
    difficulty: 'medium',
    concept_tags: ['union-find'],
    secondary_concept_tags: ['disjoint-set'],
    intent_description:
      'Union-Find 자료구조를 경로 압축과 랭크 기반 합치기로 효율적으로 구현할 수 있는지 확인하는 문제.',
    key_observation:
      '전형적인 Union-Find 문제. 경로 압축(path compression)과 랭크 기반 합치기(union by rank)를 적용해야 시간 내에 통과한다.',
    wrong_approaches: [
      '배열로 집합 관리 — union 시 O(n)으로 시간 초과',
      '경로 압축 없는 Union-Find — 트리가 편향되어 느림',
    ],
    live_coding_flow: {
      firstObservation:
        '집합의 합치기(union)와 같은 집합 확인(find)을 효율적으로 수행해야 한다. Union-Find(Disjoint Set Union)가 최적의 자료구조이다.',
      approachCandidates: [
        'Union-Find (경로 압축 + 랭크 합치기): O(alpha(n)) per query',
        '배열 기반 집합 관리: union O(n) — 시간 초과',
      ],
      whyThisApproach:
        'Union-Find는 거의 O(1)에 union과 find를 수행한다. 경로 압축과 랭크 기반 합치기를 모두 적용하면 아커만 역함수 alpha(n) 시간이다.',
      wrongApproaches: [
        '단순 배열 교체(union 시 한 집합의 모든 원소 변경)는 O(n)으로 m번 반복하면 O(nm) — 시간 초과',
        '경로 압축만 적용하고 랭크 합치기를 안 하면 최악의 경우 느려질 수 있음',
      ],
      dataStructures: ['parent 배열', 'rank(또는 size) 배열'],
      timeComplexity: 'O(m * alpha(n)) (거의 O(m))',
      pitfalls: [
        '0번 원소도 포함 — 배열 크기를 n+1로 설정',
        'find 함수에서 재귀 깊이 주의 — 반복문으로 구현하거나 경로 압축 필수',
        '출력: 같은 집합이면 YES, 아니면 NO',
      ],
      interviewExplanation:
        '"Union-Find를 구현합니다. parent 배열과 rank 배열을 초기화하고, find에서 경로 압축을, union에서 랭크 기반 합치기를 적용합니다. 0번 연산이면 union, 1번 연산이면 find로 같은 루트인지 확인하여 YES/NO를 출력합니다. 쿼리당 거의 O(1)입니다."',
    },
    source: { platform: 'boj' as any, id: 1717 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1753 — 최단경로
  // ──────────────────────────────────────────────────────
  {
    id: 'b001753-boj',
    title: '최단경로',
    description:
      '방향 그래프가 주어지면 주어진 시작점에서 다른 모든 정점으로의 최단 경로를 구하시오.\n\n단, 모든 간선의 가중치는 10 이하의 자연수이다.',
    constraints:
      '1 <= V <= 20,000\n1 <= E <= 300,000\n간선 가중치: 1 이상 10 이하',
    difficulty: 'medium',
    concept_tags: ['dijkstra', 'shortest-path'],
    secondary_concept_tags: ['priority-queue', 'graph'],
    intent_description:
      '다익스트라 알고리즘을 우선순위 큐로 효율적으로 구현할 수 있는지 확인하는 문제.',
    key_observation:
      '양의 가중치만 존재하므로 다익스트라 알고리즘을 사용한다. 우선순위 큐(min-heap)로 O((V + E) log V)에 해결 가능.',
    wrong_approaches: [
      '벨만-포드 사용 — 정확하지만 O(VE)로 시간 초과 가능',
      '방문 체크 없는 다익스트라 — 같은 정점을 반복 처리하여 느림',
    ],
    live_coding_flow: {
      firstObservation:
        '단일 시작점에서 모든 정점까지의 최단 거리를 구하는 전형적인 다익스트라 문제. 간선 가중치가 모두 양수이므로 다익스트라가 적합하다.',
      approachCandidates: [
        '다익스트라 + 우선순위 큐: O((V + E) log V)',
        '벨만-포드: O(V * E) — 300,000 * 20,000 = 6 * 10^9 → 시간 초과',
        '다익스트라 (배열): O(V^2) — V=20,000이면 4 * 10^8 → 아슬아슬',
      ],
      whyThisApproach:
        '우선순위 큐를 사용한 다익스트라가 O((V + E) log V)로 가장 효율적이다. V=20,000, E=300,000이면 약 10^6 수준.',
      wrongApproaches: [
        '벨만-포드는 V * E = 6 * 10^9으로 시간 초과',
        '우선순위 큐 없이 매번 최소 거리 정점을 선형 탐색하면 O(V^2)로 느림',
      ],
      dataStructures: [
        '인접 리스트',
        '우선순위 큐 (min-heap)',
        'dist 배열',
      ],
      timeComplexity: 'O((V + E) log V)',
      pitfalls: [
        '같은 정점이 큐에 여러 번 들어갈 수 있음 — dist[v]보다 큰 값이 나오면 스킵',
        '도달 불가능한 정점은 INF 출력',
        '시작점의 거리는 0으로 초기화',
      ],
      interviewExplanation:
        '"우선순위 큐(min-heap)를 사용한 다익스트라를 구현합니다. 시작점의 거리를 0으로 설정하고 큐에 넣습니다. 큐에서 최소 거리 정점을 꺼내 인접 정점의 거리를 갱신합니다. 이미 확정된 거리보다 큰 값이 큐에서 나오면 무시합니다. O((V + E) log V)입니다."',
    },
    source: { platform: 'boj' as any, id: 1753 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1854 — K번째 최단경로
  // ──────────────────────────────────────────────────────
  {
    id: 'b001854-boj',
    title: 'K번째 최단경로',
    description:
      'N개의 도시와 M개의 도로가 있다. 1번 도시에서 다른 모든 도시로의 K번째 최단경로의 길이를 구하시오.\n\n같은 도시를 여러 번 방문하는 경로도 허용한다.',
    constraints:
      '1 <= N <= 1,000\n0 <= M <= 2,000,000\n1 <= K <= 100\n간선 가중치: 1 이상 1,000 이하',
    difficulty: 'hard',
    concept_tags: ['dijkstra', 'priority-queue'],
    secondary_concept_tags: ['shortest-path', 'heap'],
    intent_description:
      '다익스트라를 변형하여 각 정점에 대해 K개의 최단 거리를 유지하는 방법을 적용할 수 있는지 확인하는 문제.',
    key_observation:
      '각 정점마다 max-heap(크기 K)을 유지하여 K번째까지의 최단 거리를 관리한다. 새 거리가 현재 K번째보다 작으면 힙에 추가한다.',
    wrong_approaches: [
      '일반 다익스트라로 최단 경로를 구한 뒤 제거하고 반복 — K번 반복하면 시간 초과',
      'BFS/DFS로 모든 경로 열거 — 지수 시간',
    ],
    live_coding_flow: {
      firstObservation:
        '각 정점에 대해 K번째로 짧은 경로를 구해야 한다. 일반 다익스트라는 최단 경로 하나만 구하지만, 각 정점마다 K개의 후보를 유지하도록 확장할 수 있다.',
      approachCandidates: [
        '다익스트라 변형: 각 정점에 max-heap(크기 K) 유지 O(M * K * log K)',
        'Yen\'s K-shortest paths: 구현 복잡',
        '반복적 다익스트라: K번 반복 — 비효율적',
      ],
      whyThisApproach:
        '각 정점마다 크기 K의 max-heap을 유지하는 변형 다익스트라가 간단하고 효율적이다. 힙의 top이 K번째 최단 거리가 된다.',
      wrongApproaches: [
        '방문 체크를 하면 K번째 경로를 찾을 수 없음 — 같은 정점을 여러 번 방문 허용',
        '최단 경로 하나만 구하는 일반 다익스트라를 K번 반복하면 매우 비효율적',
      ],
      dataStructures: [
        '전역 min-heap (다익스트라 큐)',
        '각 정점별 max-heap (크기 K) — K번째 최단 거리 관리',
      ],
      timeComplexity: 'O(M * K * log K)',
      pitfalls: [
        '각 정점의 max-heap 크기가 K 미만이면 아직 K개의 경로를 찾지 못한 것 — 무조건 추가',
        '크기가 K이면 top과 비교하여 더 작을 때만 교체',
        '같은 도시를 여러 번 방문하는 경로도 유효함을 명심',
        'K번째 경로가 없으면 -1 출력',
      ],
      interviewExplanation:
        '"다익스트라를 변형하여, 각 정점마다 크기 K의 max-heap을 유지합니다. 시작점에서 확장할 때, 인접 정점의 max-heap이 K 미만이면 무조건 추가하고, K개이면 top보다 작을 때만 교체합니다. 모든 처리 후 각 정점 heap의 top이 K번째 최단 거리입니다. 크기가 K 미만이면 -1을 출력합니다."',
    },
    source: { platform: 'boj' as any, id: 1854 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1916 — 최소비용 구하기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001916-boj',
    title: '최소비용 구하기',
    description:
      'N개의 도시와 M개의 버스가 있다. A번째 도시에서 B번째 도시까지 가는 데 드는 최소비용을 구하시오.\n\n버스 비용은 0보다 크거나 같고, 100,000보다 작은 정수이다.',
    constraints:
      '1 <= N <= 1,000\n1 <= M <= 100,000\n0 <= 버스 비용 < 100,000',
    difficulty: 'medium',
    concept_tags: ['dijkstra', 'shortest-path'],
    secondary_concept_tags: ['priority-queue', 'graph'],
    intent_description:
      '다익스트라 알고리즘의 기본 구현을 정확하게 할 수 있는지 확인하는 문제.',
    key_observation:
      '양의 가중치를 가진 방향 그래프에서 단일 출발점 최단 경로 → 다익스트라.',
    wrong_approaches: [
      'BFS 사용 — 가중치가 다르므로 최단 보장 불가',
      '같은 출발-도착 쌍에 여러 버스가 있을 수 있는데 하나만 저장',
    ],
    live_coding_flow: {
      firstObservation:
        'A에서 B까지의 최소 비용을 구하는 전형적인 최단 경로 문제. 간선 가중치가 0 이상이므로 다익스트라를 사용한다.',
      approachCandidates: [
        '다익스트라 + 우선순위 큐: O((N + M) log N)',
        '벨만-포드: O(N * M) — N=1,000, M=100,000이면 10^8으로 아슬아슬',
      ],
      whyThisApproach:
        '양의 가중치이므로 다익스트라가 적합하고, 우선순위 큐를 쓰면 효율적이다.',
      wrongApproaches: [
        '가중치 없는 BFS는 간선 비용이 다를 때 최단 거리를 보장하지 않음',
        '같은 (출발, 도착) 쌍에 여러 간선이 있을 수 있으므로 모두 저장해야 함',
      ],
      dataStructures: ['인접 리스트', '우선순위 큐 (min-heap)', 'dist 배열'],
      timeComplexity: 'O((N + M) log N)',
      pitfalls: [
        '같은 출발-도착 쌍에 여러 버스가 있을 수 있음 — 인접 리스트에 모두 추가',
        '비용이 0인 간선 존재 가능',
        '시작점과 도착점이 같은 경우는 입력에 없다고 가정하지 말 것',
      ],
      interviewExplanation:
        '"우선순위 큐를 사용한 다익스트라입니다. 시작 도시에서 dist[start] = 0으로 시작하여, 큐에서 최소 비용 정점을 꺼내 인접 정점을 갱신합니다. dist[도착 도시]가 답입니다. O((N + M) log N)입니다."',
    },
    source: { platform: 'boj' as any, id: 1916 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1948 — 임계경로
  // ──────────────────────────────────────────────────────
  {
    id: 'b001948-boj',
    title: '임계경로',
    description:
      'N개의 도시와 도시 간 도로가 있다. 모든 사람이 1번 도시(출발)에서 N번 도시(도착)까지 가는 가장 긴 경로의 길이와, 그 경로에 포함되는 도로의 수를 구하시오.\n\n1분도 쉬지 않고 달려야 하는 도로의 수를 구해야 한다.',
    constraints:
      '1 <= N <= 10,000\n1 <= M <= 100,000',
    difficulty: 'hard',
    concept_tags: ['topological-sort', 'critical-path'],
    secondary_concept_tags: ['dag', 'dp', 'graph'],
    intent_description:
      'DAG에서 최장 경로(임계경로)를 구하고, 임계경로에 속하는 간선의 수를 역추적하여 구할 수 있는지 확인하는 문제.',
    key_observation:
      '위상 정렬로 각 정점까지의 최장 거리를 구한 뒤, 역방향으로 추적하여 "가장 긴 경로에 속하는 간선" = dist[u] + w(u,v) == dist[v]인 간선을 센다.',
    wrong_approaches: [
      'DFS로 모든 경로 탐색 — 지수 시간',
      '최장 거리만 구하고 임계 간선 수를 구하지 않음',
    ],
    live_coding_flow: {
      firstObservation:
        'DAG에서 최장 경로를 구하는 문제. 위상 정렬 순서로 DP를 적용하면 각 정점까지의 최장 거리를 O(N + M)에 구할 수 있다.',
      approachCandidates: [
        '위상 정렬 + DP(최장 거리) + 역추적(임계 간선 카운트) O(N + M)',
        'DFS 전수 탐색: 지수 시간',
      ],
      whyThisApproach:
        '위상 정렬로 최장 거리를 구한 뒤, N번 도시에서 역방향 BFS로 dist[u] + w == dist[v]인 간선만 따라가면 임계 간선을 셀 수 있다.',
      wrongApproaches: [
        '모든 경로를 DFS로 탐색하면 경로 수가 지수적으로 증가',
        '최장 경로만 구하고 간선 수를 구하지 않으면 불완전한 답',
      ],
      dataStructures: [
        '인접 리스트 (정방향 + 역방향)',
        '진입 차수 배열',
        'dist 배열 (최장 거리)',
        'visited 배열 (역추적용)',
      ],
      timeComplexity: 'O(N + M)',
      pitfalls: [
        '역추적 시 같은 간선을 중복 카운트하지 않도록 visited 처리',
        '임계 간선 조건: dist[u] + w(u,v) == dist[v] AND dist[v]에서 도착점까지도 최장 경로에 속하는 경우',
        '역방향 그래프를 별도로 저장해야 역추적이 효율적',
      ],
      interviewExplanation:
        '"먼저 위상 정렬로 1번에서 각 도시까지의 최장 거리를 구합니다. 그 다음 N번 도시에서 역방향 BFS를 수행하며, dist[u] + w == dist[v]인 간선을 임계 간선으로 셉니다. 중복 방문을 방지하기 위해 visited를 사용합니다. 전체 시간복잡도는 O(N + M)입니다."',
    },
    source: { platform: 'boj' as any, id: 1948 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1976 — 여행 가자
  // ──────────────────────────────────────────────────────
  {
    id: 'b001976-boj',
    title: '여행 가자',
    description:
      'N개의 도시와 도시 간 연결 정보가 주어진다. 여행 계획에 속한 도시들을 순서대로 방문할 수 있는지 판별하시오.\n\n같은 도시를 여러 번 방문하는 것도 가능하다.',
    constraints:
      '1 <= N <= 200\n1 <= M(여행 도시 수) <= 1,000',
    difficulty: 'medium',
    concept_tags: ['union-find', 'graph'],
    secondary_concept_tags: ['bfs', 'connectivity'],
    intent_description:
      '여행 경로의 모든 도시가 같은 연결 요소에 속하는지 Union-Find로 판별할 수 있는지 확인하는 문제.',
    key_observation:
      '여행 계획의 모든 도시가 같은 연결 요소에 속하면 어떤 순서로든 방문 가능하다. 경로의 순서는 중요하지 않다.',
    wrong_approaches: [
      '실제 경로를 찾으려고 시도 — 연결 여부만 확인하면 충분',
      '인접한 도시 쌍만 확인 — 간접 연결도 고려해야 함',
    ],
    live_coding_flow: {
      firstObservation:
        '핵심 관찰: 같은 연결 요소 안에 있으면 어떤 두 도시든 이동 가능하다. 따라서 여행 계획의 모든 도시가 같은 연결 요소에 속하는지만 확인하면 된다.',
      approachCandidates: [
        'Union-Find: 연결된 도시를 union하고 여행 도시들의 find 비교 O(N^2 * alpha(N))',
        'BFS/DFS: 한 도시에서 시작하여 다른 도시에 도달 가능한지 확인 O(N^2)',
        '플로이드-워셜: 모든 쌍 연결 여부 O(N^3)',
      ],
      whyThisApproach:
        'Union-Find가 가장 간결하다. N^2개의 간선 정보를 읽으면서 union하고, 여행 도시들의 루트가 모두 같은지 확인하면 끝.',
      wrongApproaches: [
        '순서대로 인접한 도시 쌍의 직접 연결만 확인하면 간접 경로를 놓침',
        '경로를 실제로 구성하려고 하면 불필요하게 복잡해짐',
      ],
      dataStructures: ['Union-Find'],
      timeComplexity: 'O(N^2 * alpha(N))',
      pitfalls: [
        '인접 행렬 입력: i와 j가 연결되어 있으면 union(i, j)',
        '여행 도시가 1개일 때도 YES',
        '도시 번호가 1부터 시작하는지 0부터인지 확인',
      ],
      interviewExplanation:
        '"Union-Find를 사용합니다. 인접 행렬을 읽으면서 연결된 도시 쌍을 union합니다. 여행 계획의 모든 도시에 대해 find를 호출하여 루트가 모두 같으면 YES, 아니면 NO를 출력합니다. 같은 연결 요소 안에서는 어떤 경로든 이동 가능하기 때문입니다."',
    },
    source: { platform: 'boj' as any, id: 1976 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2251 — 물통
  // ──────────────────────────────────────────────────────
  {
    id: 'b002251-boj',
    title: '물통',
    description:
      '각각 부피가 A, B, C(리터)인 세 개의 물통이 있다. 처음에 A, B 물통은 비어 있고, C 물통만 가득 차 있다.\n\n물을 옮기는 과정에서 A 물통이 비어 있을 때 C 물통에 담겨있을 수 있는 물의 양을 모두 구하시오.',
    constraints:
      '1 <= A, B, C <= 200',
    difficulty: 'medium',
    concept_tags: ['bfs', 'graph'],
    secondary_concept_tags: ['state-space-search', 'simulation'],
    intent_description:
      '상태 공간 탐색(BFS)을 활용하여 물통 문제의 모든 가능한 상태를 탐색할 수 있는지 확인하는 문제.',
    key_observation:
      '상태를 (A의 물 양, B의 물 양)으로 정의하면 C의 물 양은 자동으로 결정된다. BFS로 모든 도달 가능한 상태를 탐색한다.',
    wrong_approaches: [
      '수학적으로 해를 구하려는 시도 — 상태 탐색이 더 확실',
      '물을 옮기는 6가지 경우를 빠뜨림',
    ],
    live_coding_flow: {
      firstObservation:
        '상태를 (a, b)로 정의하면 c = C - a - b로 결정된다. 각 상태에서 6가지 물 옮기기(A→B, A→C, B→A, B→C, C→A, C→B)가 가능하다. BFS로 모든 상태를 탐색할 수 있다.',
      approachCandidates: [
        'BFS 상태 탐색: 상태 수 최대 200 * 200 = 40,000 O(A * B)',
        'DFS: 가능하지만 BFS가 더 자연스러움',
      ],
      whyThisApproach:
        '상태 공간이 최대 40,000으로 매우 작아 BFS로 완전 탐색이 가능하다.',
      wrongApproaches: [
        'Greedy하게 물을 옮기면 모든 상태를 탐색하지 못함',
        '물 옮기기 시 넘치는 양 처리를 빠뜨리면 오답',
      ],
      dataStructures: [
        'Queue (BFS)',
        'visited[A+1][B+1] 배열',
        '결과 저장용 Set 또는 배열',
      ],
      timeComplexity: 'O(A * B)',
      pitfalls: [
        '물 옮기기: X→Y로 옮길 때, min(X의 현재량, Y의 남은 용량)만큼 이동',
        '6가지 경우를 모두 처리해야 함',
        'A가 0일 때 C의 값을 수집하여 오름차순 출력',
      ],
      interviewExplanation:
        '"상태를 (a, b)로 정의하고 c = C - a - b로 계산합니다. 초기 상태 (0, 0)에서 BFS를 시작하여, 6가지 물 옮기기를 시도합니다. 방문하지 않은 새 상태면 큐에 추가합니다. a == 0인 상태에서 c 값을 수집하여 오름차순 출력합니다. 상태 공간이 최대 40,000이므로 충분히 빠릅니다."',
    },
    source: { platform: 'boj' as any, id: 2251 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2252 — 줄 세우기
  // ──────────────────────────────────────────────────────
  {
    id: 'b002252-boj',
    title: '줄 세우기',
    description:
      'N명의 학생들을 키 순서대로 줄을 세우려고 한다. 일부 학생들의 키를 비교한 결과가 주어질 때, 줄을 세운 결과를 출력하시오.\n\n답이 여러 가지인 경우 아무거나 출력한다.',
    constraints:
      '1 <= N <= 32,000\n1 <= M <= 100,000',
    difficulty: 'medium',
    concept_tags: ['topological-sort'],
    secondary_concept_tags: ['dag', 'bfs', 'graph'],
    intent_description:
      '위상 정렬(Topological Sort)을 BFS(Kahn) 또는 DFS로 구현할 수 있는지 확인하는 문제.',
    key_observation:
      '학생 간 키 비교가 방향 간선을 형성하는 DAG이다. 위상 정렬로 순서를 결정하면 된다.',
    wrong_approaches: [
      '단순 정렬 — 비교 결과가 전체 순서를 결정하지 않을 수 있음',
      'DFS 방문 순서를 그대로 출력 — 역순(후위 순서의 역)이 위상 정렬',
    ],
    live_coding_flow: {
      firstObservation:
        'A가 B 앞에 서야 한다는 조건은 A → B 간선으로 표현된다. 이 방향 그래프에서 위상 정렬을 수행하면 유효한 줄 세우기 순서를 얻는다.',
      approachCandidates: [
        'Kahn 알고리즘 (BFS 위상 정렬): 진입 차수 0인 노드부터 큐에 넣기 O(N + M)',
        'DFS 위상 정렬: 후위 순서의 역순 O(N + M)',
      ],
      whyThisApproach:
        'Kahn 알고리즘이 직관적이다. 진입 차수가 0인 학생(앞에 서야 할 사람이 없는 학생)부터 차례로 뽑으면 된다.',
      wrongApproaches: [
        'DFS 방문 순서를 그대로 출력하면 위상 정렬이 아님 — 후위 순서의 역순이어야 함',
        '비교 결과를 무시하고 번호 순서대로 출력하면 오답',
      ],
      dataStructures: [
        '인접 리스트',
        '진입 차수 배열 in_degree[]',
        'Queue (BFS)',
      ],
      timeComplexity: 'O(N + M)',
      pitfalls: [
        '답이 유일하지 않음 — 아무 유효한 위상 정렬이나 출력',
        '사이클은 없다고 보장됨 (DAG)',
        '진입 차수 0인 노드가 여러 개면 어떤 것을 먼저 뽑아도 무관',
      ],
      interviewExplanation:
        '"Kahn 알고리즘으로 위상 정렬을 수행합니다. 모든 간선의 진입 차수를 계산한 뒤, 진입 차수가 0인 학생을 큐에 넣습니다. 큐에서 꺼낸 학생을 결과에 추가하고, 인접 학생의 진입 차수를 감소시킵니다. 0이 되면 큐에 추가합니다. 큐가 빌 때까지 반복하면 위상 정렬 순서를 얻습니다."',
    },
    source: { platform: 'boj' as any, id: 2252 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11403 — 경로 찾기
  // ──────────────────────────────────────────────────────
  {
    id: 'b011403-boj',
    title: '경로 찾기',
    description:
      'N개의 정점으로 이루어진 방향 그래프가 주어질 때, 모든 정점 쌍 (i, j)에 대해 i에서 j로 가는 경로가 존재하는지 구하시오.',
    constraints:
      '1 <= N <= 100',
    difficulty: 'easy',
    concept_tags: ['floyd-warshall', 'graph'],
    secondary_concept_tags: ['bfs', 'dfs', 'transitive-closure'],
    intent_description:
      '플로이드-워셜의 전이적 폐포(transitive closure) 변형을 적용하거나, 각 정점에서 BFS/DFS를 수행할 수 있는지 확인하는 문제.',
    key_observation:
      '플로이드-워셜에서 가중치 대신 도달 가능 여부(boolean)로 변형하면 된다. dist[i][j] = dist[i][j] OR (dist[i][k] AND dist[k][j]).',
    wrong_approaches: [
      '인접 행렬을 그대로 출력 — 간접 경로를 고려하지 않음',
      '자기 자신으로 돌아오는 경로를 무시',
    ],
    live_coding_flow: {
      firstObservation:
        '모든 정점 쌍의 도달 가능 여부를 구하는 전이적 폐포 문제. N <= 100이므로 O(N^3)이 가능하다.',
      approachCandidates: [
        '플로이드-워셜 변형: boolean 전이적 폐포 O(N^3)',
        'BFS N번: 각 정점에서 탐색 O(N * (N + E))',
      ],
      whyThisApproach:
        '플로이드-워셜 변형이 코드가 가장 간결하다. 삼중 루프에서 dist[i][j] |= (dist[i][k] & dist[k][j])만 하면 된다.',
      wrongApproaches: [
        '인접 행렬만 출력하면 길이 2 이상의 경로를 놓침',
        '무방향 그래프로 처리하면 방향을 무시하게 됨',
      ],
      dataStructures: ['2D boolean 배열 reach[N][N]'],
      timeComplexity: 'O(N^3)',
      pitfalls: [
        '자기 자신으로의 경로도 존재할 수 있음 (사이클)',
        '플로이드-워셜의 k 루프가 가장 바깥에 있어야 함',
        '0-indexed vs 1-indexed 주의',
      ],
      interviewExplanation:
        '"플로이드-워셜을 boolean 버전으로 변형합니다. reach[i][j] = reach[i][j] OR (reach[i][k] AND reach[k][j])를 N^3으로 계산합니다. N=100이면 10^6으로 충분합니다. 자기 자신으로의 경로(사이클)도 정상 처리됩니다."',
    },
    source: { platform: 'boj' as any, id: 11403 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11404 — 플로이드
  // ──────────────────────────────────────────────────────
  {
    id: 'b011404-boj',
    title: '플로이드',
    description:
      'N개의 도시와 M개의 버스가 있다. 모든 도시 쌍 (A, B)에 대해 A에서 B로 가는 최소 비용을 구하시오.\n\n경로가 없는 경우 0을 출력한다.',
    constraints:
      '1 <= N <= 100\n1 <= M <= 100,000\n버스 비용: 1 이상 100,000 이하',
    difficulty: 'medium',
    concept_tags: ['floyd-warshall', 'shortest-path'],
    secondary_concept_tags: ['graph', 'dp'],
    intent_description:
      '플로이드-워셜 알고리즘을 정확하게 구현할 수 있는지 확인하는 문제.',
    key_observation:
      '모든 쌍 최단 거리를 구하는 전형적인 플로이드-워셜 문제. N <= 100이므로 O(N^3) = 10^6으로 충분.',
    wrong_approaches: [
      '각 정점에서 다익스트라 N번 — 가능하지만 플로이드-워셜이 더 간결',
      'k 루프를 안쪽에 배치하면 잘못된 결과',
    ],
    live_coding_flow: {
      firstObservation:
        '모든 정점 쌍의 최단 거리를 구해야 하고, N <= 100이므로 플로이드-워셜의 O(N^3)이 적합하다.',
      approachCandidates: [
        '플로이드-워셜: O(N^3) = 10^6',
        '다익스트라 N번: O(N * (N + M) log N)',
      ],
      whyThisApproach:
        '플로이드-워셜이 가장 간결하고, N=100에서 매우 빠르다.',
      wrongApproaches: [
        'k 루프가 가장 바깥에 있지 않으면 중간 정점을 통한 경로를 놓침',
        '같은 경로에 여러 버스가 있을 때 최솟값만 저장해야 하는데 덮어쓰면 오답',
      ],
      dataStructures: ['2D 거리 배열 dist[N][N]'],
      timeComplexity: 'O(N^3)',
      pitfalls: [
        '같은 (출발, 도착) 쌍에 여러 버스 → 최소 비용만 저장',
        'dist 초기화: 자기 자신 0, 나머지 INF',
        'INF + INF 오버플로 주의 — 갱신 조건에서 dist[i][k] != INF 체크',
        '경로가 없으면 0 출력 (INF를 0으로 변환)',
      ],
      interviewExplanation:
        '"플로이드-워셜 알고리즘을 적용합니다. dist[i][j]를 초기화한 후, 삼중 루프에서 dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])를 계산합니다. k 루프가 가장 바깥에 위치해야 합니다. 같은 경로에 여러 버스가 있으면 최솟값만 저장합니다."',
    },
    source: { platform: 'boj' as any, id: 11404 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11657 — 타임머신
  // ──────────────────────────────────────────────────────
  {
    id: 'b011657-boj',
    title: '타임머신',
    description:
      'N개의 도시와 M개의 버스가 있다. 1번 도시에서 나머지 도시로 가는 최단 시간을 구하시오.\n\n시간이 음수인 간선이 존재할 수 있다. 시간을 무한히 오래 전으로 되돌릴 수 있다면(음의 사이클) -1을 출력하시오.',
    constraints:
      '1 <= N <= 500\n1 <= M <= 6,000\n간선 가중치: -10,000 이상 10,000 이하',
    difficulty: 'medium',
    concept_tags: ['bellman-ford', 'shortest-path'],
    secondary_concept_tags: ['negative-cycle', 'graph'],
    intent_description:
      '벨만-포드 알고리즘으로 음의 가중치가 있는 그래프에서 최단 경로를 구하고, 음의 사이클을 검출할 수 있는지 확인하는 문제.',
    key_observation:
      '음의 간선이 있으므로 다익스트라 불가. 벨만-포드로 N-1번 완화 후, N번째에 갱신이 발생하면 음의 사이클 존재.',
    wrong_approaches: [
      'Dijkstra 사용 — 음의 가중치에서 동작하지 않음',
      '음의 사이클 존재만 확인하고 도달 가능 여부를 확인하지 않음',
    ],
    live_coding_flow: {
      firstObservation:
        '음수 가중치가 있으므로 벨만-포드를 써야 한다. N-1번 반복으로 최단 거리를 구하고, N번째 반복에서 갱신이 발생하면 음의 사이클이 존재한다.',
      approachCandidates: [
        '벨만-포드: O(V * E) = 500 * 6,000 = 3 * 10^6',
        'SPFA: 벨만-포드 최적화 — 평균 빠르지만 최악 동일',
      ],
      whyThisApproach:
        '벨만-포드가 음의 간선과 음의 사이클을 모두 처리하는 표준 알고리즘이다. V * E = 3 * 10^6으로 시간 여유가 있다.',
      wrongApproaches: [
        'Dijkstra는 음의 간선에서 잘못된 결과를 낼 수 있음',
        '음의 사이클이 1번 도시에서 도달 불가능한 곳에 있으면 무시해야 하는데, 이 문제에서는 전체 사이클 존재 시 -1 출력',
      ],
      dataStructures: ['간선 리스트', 'dist 배열'],
      timeComplexity: 'O(V * E)',
      pitfalls: [
        'dist 배열을 long long으로 선언 — 음수 누적 시 int 범위 초과 가능',
        '출발점(1번)에서 도달 불가능한 정점은 -1이 아닌 특별한 값 출력',
        '음의 사이클이 존재하면 전체 출력 대신 첫 줄에 -1만 출력',
      ],
      interviewExplanation:
        '"벨만-포드 알고리즘을 사용합니다. 1번 도시에서 시작하여 N-1번 모든 간선을 완화합니다. N번째 반복에서 갱신이 발생하면 음의 사이클이 존재하므로 -1을 출력합니다. 그렇지 않으면 각 도시까지의 최단 시간을 출력합니다. O(V * E)입니다."',
    },
    source: { platform: 'boj' as any, id: 11657 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 17472 — 다리 만들기 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b017472-boj',
    title: '다리 만들기 2',
    description:
      'N x M 지도에 여러 개의 섬이 있다. 모든 섬을 연결하는 다리를 놓으려고 한다.\n\n다리는 직선(가로 또는 세로)으로만 놓을 수 있고, 길이가 2 이상이어야 한다. 모든 섬을 연결하는 다리 길이의 최솟값을 구하시오. 불가능하면 -1을 출력한다.',
    constraints:
      '1 <= N, M <= 10\n2 <= 섬의 개수 <= 6',
    difficulty: 'hard',
    concept_tags: ['bfs', 'mst', 'implementation'],
    secondary_concept_tags: ['union-find', 'brute-force', 'graph'],
    intent_description:
      'BFS로 섬을 라벨링하고, 가능한 다리를 열거한 뒤, MST로 모든 섬을 최소 비용으로 연결하는 복합 문제를 해결할 수 있는지 확인하는 문제.',
    key_observation:
      '1) BFS로 섬 번호 부여 2) 각 육지 칸에서 4방향으로 직선 탐색하여 가능한 다리 열거 3) 다리를 간선으로 하여 Kruskal MST.',
    wrong_approaches: [
      '대각선 다리를 허용 — 직선(가로/세로)만 가능',
      '길이 1인 다리를 포함 — 길이 2 이상만 유효',
      '모든 섬 쌍 사이에 다리를 하나만 고려 — 여러 위치에서 다리가 가능',
    ],
    live_coding_flow: {
      firstObservation:
        '이 문제는 3단계로 나뉜다: 1) 섬 라벨링 2) 가능한 다리(간선) 열거 3) MST. 각 단계를 독립적으로 구현하면 된다.',
      approachCandidates: [
        'BFS 라벨링 + 직선 탐색 + Kruskal MST',
        'BFS 라벨링 + 직선 탐색 + Prim MST',
      ],
      whyThisApproach:
        '지도 크기가 작고(10x10) 섬 수가 최대 6개이므로, 모든 가능한 다리를 브루트포스로 열거해도 충분하다. MST는 Kruskal이 간결하다.',
      wrongApproaches: [
        '다리가 꺾일 수 있다고 가정하면 오답 — 직선만 허용',
        '길이 1인 다리를 포함하면 오답',
        '같은 섬 내 칸을 연결하는 다리를 만드는 실수',
      ],
      dataStructures: [
        '2D 지도 배열 (섬 라벨)',
        '간선 리스트 (다리 후보)',
        'Union-Find (MST용)',
      ],
      timeComplexity: 'O(N * M * max(N, M) + E log E)',
      pitfalls: [
        '다리는 바다 위로만 놓을 수 있고, 중간에 육지가 있으면 안 됨',
        '같은 섬 쌍 사이에 여러 다리 후보가 있을 수 있음 — 모두 간선에 추가',
        '모든 섬을 연결할 수 없으면 -1',
        '다리 길이는 2 이상 — 인접한 섬 사이에는 다리를 놓을 수 없음',
      ],
      interviewExplanation:
        '"3단계로 풉니다. 1) BFS로 섬에 번호를 부여합니다. 2) 각 육지 칸에서 4방향으로 직선 탐색하여 다른 섬에 도달하면 다리 후보로 저장합니다(길이 2 이상만). 3) 다리 후보를 간선으로 하여 Kruskal MST를 구합니다. MST로 모든 섬을 연결하지 못하면 -1을 출력합니다."',
    },
    source: { platform: 'boj' as any, id: 17472 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 18352 — 특정 거리의 도시 찾기
  // ──────────────────────────────────────────────────────
  {
    id: 'b018352-boj',
    title: '특정 거리의 도시 찾기',
    description:
      '어떤 나라에 N개의 도시와 M개의 단방향 도로가 있다. 모든 도로의 거리는 1이다.\n\n특정 도시 X에서 출발하여 최단 거리가 정확히 K인 모든 도시의 번호를 오름차순으로 출력하시오. 해당하는 도시가 없으면 -1을 출력하시오.',
    constraints:
      '2 <= N <= 300,000\n1 <= M <= 1,000,000\n1 <= K <= 300,000\n1 <= X <= N',
    difficulty: 'easy',
    concept_tags: ['bfs', 'shortest-path'],
    secondary_concept_tags: ['graph'],
    intent_description:
      '가중치가 1인 그래프에서 BFS가 최단 거리를 보장함을 이해하고 구현할 수 있는지 확인하는 문제.',
    key_observation:
      '모든 간선의 가중치가 1이므로, BFS의 레벨이 곧 최단 거리이다. X에서 BFS를 수행하고 거리가 K인 정점을 수집하면 된다.',
    wrong_approaches: [
      'DFS 사용 — 최단 거리를 보장하지 않음',
      'Dijkstra 사용 — 가능하지만 불필요하게 복잡',
    ],
    live_coding_flow: {
      firstObservation:
        '간선 가중치가 모두 1이므로 BFS가 최단 거리를 보장한다. X에서 BFS를 수행하면 각 정점까지의 최단 거리를 O(N + M)에 구할 수 있다.',
      approachCandidates: [
        'BFS: X에서 시작, 거리 K인 정점 수집 O(N + M)',
        'Dijkstra: O((N + M) log N) — 오버킬',
      ],
      whyThisApproach:
        '가중치가 1인 그래프에서 BFS는 최적의 선택이다. 간단하고 효율적이며 O(N + M).',
      wrongApproaches: [
        'DFS는 최단 거리를 구하지 못하므로 거리 K를 정확히 판별 불가',
        '매 정점마다 별도 탐색을 하면 O(N * (N + M))으로 시간 초과',
      ],
      dataStructures: ['인접 리스트', 'dist 배열 (또는 visited + level)', 'Queue (BFS)'],
      timeComplexity: 'O(N + M)',
      pitfalls: [
        'N과 M이 크므로(300,000, 1,000,000) 인접 행렬 불가 — 인접 리스트 사용',
        '결과가 없으면 -1 출력',
        '오름차순 출력 — 정렬 필요하거나, 순서대로 순회하면 자연스럽게 정렬',
      ],
      interviewExplanation:
        '"X에서 BFS를 수행하여 각 도시까지의 최단 거리를 구합니다. 모든 간선 가중치가 1이므로 BFS의 레벨이 최단 거리입니다. 거리가 정확히 K인 도시를 수집하여 오름차순 출력합니다. 없으면 -1을 출력합니다. O(N + M)입니다."',
    },
    source: { platform: 'boj' as any, id: 18352 },
  },
];
