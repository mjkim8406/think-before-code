import type { ProblemSeed } from '../problems';

export const BOJ_TREE: ProblemSeed[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1068 — 트리
  // ──────────────────────────────────────────────────────
  {
    id: 'b001068-boj',
    title: '트리',
    description:
      '트리에서 리프 노드의 수를 구하는 문제이다.\n\n트리가 주어지고, 그 트리에서 노드 하나를 지울 때, 남은 트리에서 리프 노드의 수를 구하시오.\n\n노드를 지우면 그 노드와 그 노드의 모든 자손 노드가 트리에서 제거된다.',
    constraints:
      '1 <= N <= 50\n-1 <= parent[i] <= N-1\n루트 노드의 부모는 -1\n지울 노드 번호: 0 <= d < N',
    difficulty: 'medium',
    concept_tags: ['tree', 'dfs'],
    secondary_concept_tags: ['graph', 'recursion'],
    intent_description: '트리 구조에서 노드 삭제 후 리프 노드를 올바르게 카운팅할 수 있는지 확인하는 문제.',
    key_observation: '삭제 노드의 서브트리를 통째로 제거한 뒤 DFS로 리프를 세되, 삭제로 인해 부모가 새 리프가 되는 경우를 처리해야 한다.',
    wrong_approaches: [
      '삭제 노드만 제거하고 자손은 남기는 실수',
      '삭제 노드의 부모가 리프가 되는 경우를 처리하지 않음',
      '루트 노드를 삭제하는 경우 리프 수가 0임을 놓침',
    ],
    live_coding_flow: {
      firstObservation:
        '부모 배열이 주어지므로 인접 리스트를 구성할 수 있다. 삭제 노드의 서브트리 전체를 제거해야 한다.',
      approachCandidates: [
        'DFS/BFS로 삭제 노드의 서브트리를 먼저 마킹 후 리프 카운팅',
        'DFS 중 삭제 노드를 만나면 해당 서브트리 탐색을 중단',
        '부모 배열에서 직접 삭제 후 리프 판별',
      ],
      whyThisApproach:
        'DFS로 루트부터 탐색하되, 삭제 노드를 만나면 탐색을 중단하는 것이 가장 깔끔하다. 별도 마킹 불필요.',
      wrongApproaches: [
        '삭제 노드만 제거하면 자손 노드가 고아가 되어 오답',
        '리프 판별 시 자식이 없는 노드만 세면 삭제로 자식이 모두 사라진 노드를 놓침',
      ],
      dataStructures: ['인접 리스트 (부모 → 자식)', 'visited 배열 또는 삭제 플래그'],
      timeComplexity: 'O(N)',
      pitfalls: [
        '루트 노드가 삭제되는 경우 답은 0',
        '삭제 노드가 유일한 자식인 경우 부모가 새로운 리프가 됨',
        '루트 노드의 부모가 -1인 것을 인접 리스트 구성 시 처리',
      ],
      interviewExplanation:
        '"부모 배열로 인접 리스트를 구성합니다. 루트부터 DFS로 탐색하되 삭제 대상 노드를 만나면 탐색을 중단합니다. 자식이 없는(또는 모든 자식이 삭제된) 노드를 리프로 카운팅합니다. O(N)에 해결됩니다."',
    },
    source: { platform: 'boj' as any, id: 1068 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1991 — 트리 순회
  // ──────────────────────────────────────────────────────
  {
    id: 'b001991-boj',
    title: '트리 순회',
    description:
      '이진 트리를 입력받아 전위 순회(preorder), 중위 순회(inorder), 후위 순회(postorder)한 결과를 출력하는 프로그램을 작성하시오.\n\n각 노드는 알파벳 대문자로 표현되며 항상 A가 루트이다. 자식이 없는 경우 .으로 표시한다.',
    constraints:
      '1 <= N <= 26\n노드 이름: A ~ Z\n자식이 없으면 .\nA가 항상 루트',
    difficulty: 'easy',
    concept_tags: ['tree', 'recursion'],
    secondary_concept_tags: ['dfs'],
    intent_description: '이진 트리의 세 가지 순회(전위, 중위, 후위)를 재귀로 정확히 구현할 수 있는지 확인하는 문제.',
    key_observation: '전위(루트-왼-오), 중위(왼-루트-오), 후위(왼-오-루트) 순서만 바꿔서 재귀 호출하면 된다.',
    wrong_approaches: [
      '순회 순서를 혼동하여 출력 순서를 틀림',
      '자식이 없는 경우(.)를 null 처리하지 않아 무한 재귀',
    ],
    live_coding_flow: {
      firstObservation:
        '이진 트리가 주어지고 세 가지 순회 결과를 출력해야 한다. 각 노드의 왼쪽/오른쪽 자식을 저장하면 재귀로 간단히 해결된다.',
      approachCandidates: [
        '재귀: 노드별 (왼쪽, 오른쪽) 자식을 맵에 저장하고 순회 함수 호출',
        '반복: 스택을 이용한 반복 순회 — 구현 복잡',
      ],
      whyThisApproach:
        '노드가 최대 26개이므로 재귀 깊이가 문제되지 않는다. HashMap<char, (left, right)>에 저장하고 세 함수를 각각 호출.',
      wrongApproaches: [
        '전위/중위/후위 순서를 헷갈리면 출력이 틀림',
        '입력에서 .을 null로 처리하지 않으면 존재하지 않는 자식을 탐색',
      ],
      dataStructures: ['HashMap<노드, (왼쪽자식, 오른쪽자식)>'],
      timeComplexity: 'O(N)',
      pitfalls: [
        '자식이 .인 경우 null/빈 값으로 처리해야 함',
        '출력 시 개행 처리: 각 순회 결과를 별도 줄에 출력',
        '루트가 항상 A임을 활용해 순회 시작점 결정',
      ],
      interviewExplanation:
        '"각 노드의 왼쪽/오른쪽 자식을 맵에 저장합니다. 전위는 현재-왼-오, 중위는 왼-현재-오, 후위는 왼-오-현재 순서로 재귀 호출합니다. 자식이 .이면 null로 처리하여 재귀를 종료합니다. O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 1991 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 10868 — 최솟값
  // ──────────────────────────────────────────────────────
  {
    id: 'b010868-boj',
    title: '최솟값',
    description:
      'N개의 정수가 주어지고 M개의 쿼리가 주어진다. 각 쿼리는 구간 [a, b]가 주어지며, a번째부터 b번째 정수 중 최솟값을 출력하시오.',
    constraints:
      '1 <= N, M <= 100,000\n1 <= 정수 <= 1,000,000,000\n1 <= a <= b <= N',
    difficulty: 'medium',
    concept_tags: ['segment-tree', 'tree'],
    secondary_concept_tags: ['sparse-table', 'divide-and-conquer'],
    intent_description: '세그먼트 트리를 이용한 구간 최솟값 쿼리(RMQ)를 정확히 구현할 수 있는지 확인하는 문제.',
    key_observation: 'N, M이 최대 10만이므로 매 쿼리마다 선형 탐색하면 TLE. 세그먼트 트리로 O(log N)에 구간 최솟값을 구해야 한다.',
    wrong_approaches: [
      '매 쿼리마다 구간을 순회하는 O(NM) 풀이 — 시간 초과',
      '세그먼트 트리 구현 시 인덱스 범위 오류',
      '업데이트가 없으므로 Sparse Table도 가능하지만 세그먼트 트리가 범용적',
    ],
    live_coding_flow: {
      firstObservation:
        '구간 최솟값을 M번 질의해야 한다. N, M <= 10^5이므로 전처리가 필요하다.',
      approachCandidates: [
        '브루트포스: 매 쿼리 O(N) → O(NM) = 10^10 TLE',
        '세그먼트 트리: 빌드 O(N), 쿼리 O(log N) → 총 O(N + M log N)',
        'Sparse Table: 빌드 O(N log N), 쿼리 O(1) — 업데이트 없을 때 최적',
      ],
      whyThisApproach:
        '세그먼트 트리로 빌드 O(N), 각 쿼리 O(log N). 업데이트가 추가되어도 대응 가능한 범용 구조.',
      wrongApproaches: [
        '브루트포스 O(NM)은 10^10으로 시간 초과',
        '정렬하면 원래 인덱스 순서가 깨져 구간 쿼리 불가',
      ],
      dataStructures: ['세그먼트 트리 배열 (크기 4N)'],
      timeComplexity: 'O(N + M log N)',
      pitfalls: [
        '세그먼트 트리 배열 크기: 4*N으로 넉넉하게 잡아야 함',
        '1-indexed vs 0-indexed 혼동 주의',
        '리프 노드 초기값을 INF로 설정하지 않으면 최솟값 계산 오류',
        '쿼리 범위가 완전히 벗어나면 INF 반환',
      ],
      interviewExplanation:
        '"세그먼트 트리를 구축합니다. 각 노드가 담당 구간의 최솟값을 저장합니다. 빌드는 O(N), 쿼리는 구간을 분할하며 O(log N)에 최솟값을 구합니다. 총 시간복잡도 O(N + M log N)입니다."',
    },
    source: { platform: 'boj' as any, id: 10868 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11437 — LCA
  // ──────────────────────────────────────────────────────
  {
    id: 'b011437-boj',
    title: 'LCA',
    description:
      'N개의 노드로 이루어진 트리가 주어진다. 트리의 각 노드는 1부터 N까지 번호가 매겨져 있으며 루트는 1번이다.\n\nM개의 쿼리가 주어진다. 각 쿼리마다 두 노드의 가장 가까운 공통 조상(LCA)을 구하시오.',
    constraints:
      '2 <= N <= 50,000\n1 <= M <= 10,000\n트리의 루트: 1번 노드',
    difficulty: 'medium',
    concept_tags: ['tree', 'lca'],
    secondary_concept_tags: ['dfs', 'bfs'],
    intent_description: 'LCA(최소 공통 조상) 알고리즘의 기본 구현을 할 수 있는지 확인하는 문제.',
    key_observation: '두 노드의 깊이를 맞춘 뒤 동시에 올라가면 만나는 지점이 LCA. 나이브하게 한 칸씩 올려도 N, M이 작아서 통과.',
    wrong_approaches: [
      '한쪽만 올리고 다른 쪽은 고정하는 실수',
      '깊이를 맞추지 않고 바로 비교하면 LCA를 놓침',
      'N이 크면 나이브 O(N)으로 TLE — 이 문제는 N이 작아서 가능',
    ],
    live_coding_flow: {
      firstObservation:
        'LCA를 구하려면 두 노드의 깊이를 맞추고 함께 올라가야 한다. N <= 50,000이므로 나이브 방식도 가능하다.',
      approachCandidates: [
        '나이브: 깊이 맞추고 한 칸씩 올리기 — 쿼리당 O(N)',
        'Binary Lifting: 전처리 O(N log N), 쿼리 O(log N)',
        'Euler Tour + Sparse Table: 전처리 O(N log N), 쿼리 O(1)',
      ],
      whyThisApproach:
        'N, M이 작으므로 나이브 방식으로 충분하다. BFS로 깊이와 부모를 구한 뒤, 쿼리마다 깊이를 맞추고 한 칸씩 올린다.',
      wrongApproaches: [
        '깊이를 맞추지 않으면 한쪽이 먼저 루트에 도달하여 오답',
        '방문 배열 없이 BFS를 하면 무한 루프',
      ],
      dataStructures: ['parent 배열', 'depth 배열', '인접 리스트'],
      timeComplexity: 'O(N + M*N) — 나이브, O(N log N + M log N) — Binary Lifting',
      pitfalls: [
        '루트(1번)의 깊이를 0으로 설정하고 BFS로 깊이 계산',
        '두 노드가 같아질 때까지 올리기 — while (a != b)',
        '깊이가 같은데 노드가 다르면 둘 다 한 칸씩 올림',
      ],
      interviewExplanation:
        '"BFS로 각 노드의 깊이와 부모를 구합니다. LCA 쿼리 시 깊이가 깊은 쪽을 먼저 올려 깊이를 맞춘 뒤, 두 노드가 같아질 때까지 동시에 부모로 올립니다. N이 작으므로 쿼리당 O(N)이어도 충분합니다."',
    },
    source: { platform: 'boj' as any, id: 11437 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11438 — LCA 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b011438-boj',
    title: 'LCA 2',
    description:
      'N개의 노드로 이루어진 트리가 주어진다. 트리의 각 노드는 1부터 N까지 번호가 매겨져 있으며 루트는 1번이다.\n\nM개의 쿼리가 주어지고, 각 쿼리마다 두 노드의 가장 가까운 공통 조상(LCA)을 구하시오.\n\nBOJ 11437의 강화 버전으로 N, M이 더 크다.',
    constraints:
      '2 <= N <= 100,000\n1 <= M <= 100,000\n트리의 루트: 1번 노드',
    difficulty: 'hard',
    concept_tags: ['tree', 'lca', 'sparse-table'],
    secondary_concept_tags: ['dfs', 'binary-lifting'],
    intent_description: 'Binary Lifting을 이용한 O(log N) LCA 알고리즘을 구현할 수 있는지 확인하는 문제.',
    key_observation: 'N, M <= 10^5이므로 나이브 LCA는 TLE. parent[v][k] = v의 2^k번째 조상을 전처리하면 쿼리당 O(log N).',
    wrong_approaches: [
      '나이브 LCA O(N)은 최악 10^10으로 시간 초과',
      'Binary Lifting 테이블 크기를 잘못 잡으면 배열 초과',
      '깊이 맞추기에서 2의 거듭제곱 점프를 올바르게 수행하지 못함',
    ],
    live_coding_flow: {
      firstObservation:
        'N, M이 10^5이므로 쿼리당 O(N)이면 TLE. 2^k번째 조상을 전처리하는 Binary Lifting이 필요하다.',
      approachCandidates: [
        '나이브 LCA: 쿼리당 O(N) — TLE',
        'Binary Lifting: 전처리 O(N log N), 쿼리 O(log N)',
        'Euler Tour + Sparse Table RMQ: 전처리 O(N log N), 쿼리 O(1)',
      ],
      whyThisApproach:
        'Binary Lifting이 구현이 직관적이고 범용적이다. parent[v][k] = parent[parent[v][k-1]][k-1]로 DP 테이블을 채운다.',
      wrongApproaches: [
        '나이브 방식은 N=10^5, M=10^5일 때 최악 10^10 연산으로 TLE',
        'log 테이블의 크기 LOG를 ceil(log2(N))으로 잡지 않으면 오류',
      ],
      dataStructures: ['parent[N][LOG] 배열', 'depth 배열', '인접 리스트'],
      timeComplexity: 'O(N log N + M log N)',
      pitfalls: [
        'LOG = 17 (2^17 > 100,000) 정도로 설정',
        'DFS/BFS로 depth와 parent[v][0]을 먼저 구한 뒤 DP 테이블 채우기',
        '깊이 맞추기: 깊이 차이를 이진수로 분해하여 2^k씩 점프',
        '깊이를 맞춘 후 같은 노드면 바로 반환 — 이 체크를 빠뜨리면 오답',
        'LCA 찾기: 큰 k부터 시작해 parent[a][k] != parent[b][k]이면 점프',
      ],
      interviewExplanation:
        '"Binary Lifting으로 해결합니다. parent[v][k]를 v의 2^k번째 조상으로 전처리합니다. LCA 쿼리 시 깊이 차이를 이진수 분해하여 빠르게 깊이를 맞추고, 큰 k부터 조상이 다른 경우 함께 점프합니다. 전처리 O(N log N), 쿼리 O(log N)입니다."',
    },
    source: { platform: 'boj' as any, id: 11438 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11505 — 구간 곱 구하기
  // ──────────────────────────────────────────────────────
  {
    id: 'b011505-boj',
    title: '구간 곱 구하기',
    description:
      'N개의 수가 주어지고 다음 두 가지 연산을 수행하는 프로그램을 작성하시오.\n\n1. i번째 수를 v로 변경\n2. 구간 [a, b]의 모든 수의 곱을 1,000,000,007로 나눈 나머지를 출력\n\nM개의 변경, K개의 곱 쿼리가 주어진다.',
    constraints:
      '1 <= N <= 1,000,000\n1 <= M <= 10,000\n1 <= K <= 10,000\n0 <= 수 <= 1,000,000',
    difficulty: 'hard',
    concept_tags: ['segment-tree', 'tree'],
    secondary_concept_tags: ['math', 'modular-arithmetic'],
    intent_description: '세그먼트 트리에서 구간 곱과 포인트 업데이트를 모듈러 연산과 함께 구현할 수 있는지 확인하는 문제.',
    key_observation: '세그먼트 트리의 각 노드에 구간 곱을 저장하고, 업데이트와 쿼리를 O(log N)에 수행. 곱이므로 항등원은 1이고 MOD 연산 필수.',
    wrong_approaches: [
      '구간 합 세그먼트 트리와 혼동하여 항등원을 0으로 설정',
      'MOD 연산을 빠뜨려 오버플로우 발생',
      '값이 0인 경우 처리를 놓침 — 곱이 0이 되는 구간',
    ],
    live_coding_flow: {
      firstObservation:
        '포인트 업데이트 + 구간 곱 쿼리. N이 100만이므로 세그먼트 트리가 필요하다.',
      approachCandidates: [
        '브루트포스: 매 쿼리 O(N) → O(NK) TLE',
        '세그먼트 트리: 업데이트 O(log N), 쿼리 O(log N)',
        '펜윅 트리: 곱에는 역원 문제로 부적합 (0이 포함될 수 있음)',
      ],
      whyThisApproach:
        '세그먼트 트리에서 노드 값을 구간 곱으로 저장. 합 대신 곱, 항등원을 0 대신 1로 변경하면 된다.',
      wrongApproaches: [
        '펜윅 트리로 곱을 처리하려면 모듈러 역원이 필요한데 값이 0이면 역원이 없음',
        'MOD를 안 하면 long long 범위도 초과',
      ],
      dataStructures: ['세그먼트 트리 배열 (크기 4N)'],
      timeComplexity: 'O((M + K) log N)',
      pitfalls: [
        '항등원: 곱의 항등원은 1 (합이면 0)',
        'MOD = 1,000,000,007로 모든 곱셈 후 나머지 연산',
        '값이 0인 원소가 있으면 그 구간의 곱은 0 — 자연스럽게 처리됨',
        '업데이트 시 리프부터 루트까지 부모 노드 갱신',
      ],
      interviewExplanation:
        '"세그먼트 트리를 구축하되 각 노드에 구간 곱을 MOD로 저장합니다. 포인트 업데이트는 리프를 바꾸고 부모를 갱신, 구간 쿼리는 분할하며 곱을 MOD로 합칩니다. 업데이트와 쿼리 모두 O(log N)이고, 총 O((M+K) log N)입니다."',
    },
    source: { platform: 'boj' as any, id: 11505 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11725 — 트리의 부모 찾기
  // ──────────────────────────────────────────────────────
  {
    id: 'b011725-boj',
    title: '트리의 부모 찾기',
    description:
      '루트 없는 트리가 주어진다. 이때 트리의 루트를 1이라고 정했을 때, 각 노드의 부모를 구하는 프로그램을 작성하시오.\n\nN개의 노드로 이루어진 트리가 주어지고, 간선 정보가 주어진다. 2번 노드부터 N번 노드까지 각 노드의 부모 노드 번호를 출력하시오.',
    constraints:
      '2 <= N <= 100,000\n간선: N-1개',
    difficulty: 'easy',
    concept_tags: ['tree', 'bfs'],
    secondary_concept_tags: ['dfs', 'graph'],
    intent_description: '트리를 그래프로 표현하고 루트부터 BFS/DFS로 부모를 결정할 수 있는지 확인하는 문제.',
    key_observation: '트리는 사이클이 없는 연결 그래프. 루트(1번)부터 BFS/DFS로 탐색하면 처음 방문하는 경로의 이전 노드가 부모.',
    wrong_approaches: [
      '간선 입력 순서가 부모-자식 순서라고 가정하는 실수',
      '방문 체크를 하지 않으면 무한 루프',
    ],
    live_coding_flow: {
      firstObservation:
        '간선만 주어지고 방향은 없다. 루트(1번)에서 BFS/DFS를 시작하면 탐색 순서에 따라 부모가 결정된다.',
      approachCandidates: [
        'BFS: 루트부터 레벨 순으로 탐색하며 부모 기록',
        'DFS: 루트부터 재귀/스택 탐색하며 부모 기록',
      ],
      whyThisApproach:
        'BFS가 직관적. 큐에서 꺼낸 노드의 인접 노드 중 방문하지 않은 것의 부모를 현재 노드로 설정.',
      wrongApproaches: [
        '간선의 첫 번째 노드가 항상 부모라고 가정 — 입력 순서는 무관',
        '인접 리스트 대신 인접 행렬을 쓰면 N=10^5에서 메모리 초과',
      ],
      dataStructures: ['인접 리스트', 'parent 배열', 'BFS 큐 또는 DFS 스택'],
      timeComplexity: 'O(N)',
      pitfalls: [
        '양방향 간선이므로 인접 리스트에 양쪽 추가',
        'visited 체크로 부모 방향으로 역방향 탐색 방지',
        '출력이 2번부터 N번까지 순서대로',
      ],
      interviewExplanation:
        '"인접 리스트를 구성하고 1번 노드부터 BFS를 수행합니다. 큐에서 꺼낸 노드의 인접 노드 중 미방문인 것의 부모를 현재 노드로 기록합니다. 2번부터 N번까지 부모를 출력합니다. O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 11725 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 14425 — 문자열 집합
  // ──────────────────────────────────────────────────────
  {
    id: 'b014425-boj',
    title: '문자열 집합',
    description:
      'N개의 문자열로 이루어진 집합 S가 주어진다. 이후 M개의 문자열이 주어질 때, 이 문자열 중 집합 S에 포함되어 있는 문자열의 수를 구하시오.',
    constraints:
      '1 <= N, M <= 10,000\n문자열 길이: 1 이상 500 이하\n알파벳 소문자로만 구성',
    difficulty: 'easy',
    concept_tags: ['trie', 'tree'],
    secondary_concept_tags: ['hash-map', 'string'],
    intent_description: '트라이(Trie) 또는 해시 기반 집합으로 문자열 존재 여부를 효율적으로 판별할 수 있는지 확인하는 문제.',
    key_observation: 'Set/HashSet에 N개 문자열을 저장하고 M개를 조회하면 간단하지만, 트라이로 구현하면 문자열 구조를 활용한 효율적 탐색이 가능하다.',
    wrong_approaches: [
      '매번 N개 전체를 순회하며 비교 — O(NM * L) TLE 위험',
      '정렬 후 이분 탐색 — 가능하지만 트라이보다 비효율적',
    ],
    live_coding_flow: {
      firstObservation:
        '집합 S에 속하는지 M번 판별해야 한다. HashSet이면 O(1) 조회, 트라이면 O(L) 조회.',
      approachCandidates: [
        'HashSet: 삽입 O(NL), 조회 O(ML) — 가장 간단',
        'Trie: 삽입 O(NL), 조회 O(ML) — 문자열 특화 구조 연습에 적합',
        '정렬 + 이분 탐색: O((N+M) * L * log N)',
      ],
      whyThisApproach:
        'HashSet이 가장 간결하지만, 면접에서는 Trie 구현 능력을 보여줄 수 있는 좋은 기회. 노드마다 자식 배열(26칸)을 두고 끝 표시.',
      wrongApproaches: [
        '브루트포스 문자열 비교는 O(NML)로 최악 2.5 * 10^10 — TLE',
        '해시 충돌을 고려하지 않으면 오답 가능성 (실전에서는 드묾)',
      ],
      dataStructures: ['Trie (각 노드: children[26], isEnd)', 'HashSet'],
      timeComplexity: 'O((N + M) * L), L = 문자열 최대 길이',
      pitfalls: [
        '트라이 구현 시 메모리: 최대 N * L = 5,000,000 노드',
        'isEnd 플래그를 설정하지 않으면 접두사만 매칭되어 오답',
        'HashSet 풀이 시 입출력 속도가 중요 — BufferedReader 사용 권장',
      ],
      interviewExplanation:
        '"트라이를 구축하여 N개 문자열을 삽입합니다. 각 노드는 26개의 자식 포인터와 끝 표시를 갖습니다. M개 문자열을 트라이에서 탐색하여 끝 표시가 있으면 카운트합니다. 또는 HashSet으로 O(1) 조회도 가능합니다."',
    },
    source: { platform: 'boj' as any, id: 14425 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2042 — 구간 합 구하기
  // ──────────────────────────────────────────────────────
  {
    id: 'b002042-boj',
    title: '구간 합 구하기',
    description:
      'N개의 수가 주어지고 다음 두 가지 연산을 수행하는 프로그램을 작성하시오.\n\n1. i번째 수를 v로 변경\n2. 구간 [a, b]의 합을 구하여 출력\n\nM개의 변경과 K개의 합 쿼리가 주어진다.',
    constraints:
      '1 <= N <= 1,000,000\n1 <= M <= 10,000\n1 <= K <= 10,000\n-2^63 <= 수 <= 2^63 - 1',
    difficulty: 'medium',
    concept_tags: ['segment-tree', 'tree'],
    secondary_concept_tags: ['fenwick-tree', 'prefix-sum'],
    intent_description: '세그먼트 트리 또는 펜윅 트리를 이용한 포인트 업데이트 + 구간 합 쿼리를 구현할 수 있는지 확인하는 문제.',
    key_observation: 'N이 100만이고 업데이트가 있으므로 단순 누적합은 불가. 세그먼트 트리로 업데이트 O(log N), 쿼리 O(log N).',
    wrong_approaches: [
      '누적합 배열: 업데이트마다 O(N) 재계산 필요 — TLE',
      '매 쿼리 구간 순회 O(N) — TLE',
    ],
    live_coding_flow: {
      firstObservation:
        '포인트 업데이트와 구간 합을 반복 처리해야 한다. 단순 배열이나 누적합으로는 업데이트가 비효율적.',
      approachCandidates: [
        '세그먼트 트리: 빌드 O(N), 업데이트/쿼리 O(log N)',
        '펜윅 트리(BIT): 같은 복잡도, 구현이 더 간결',
        '누적합: 업데이트 O(N)으로 비효율',
      ],
      whyThisApproach:
        '세그먼트 트리가 가장 범용적이다. 구간 합, 최솟값, 최댓값 등 다양한 쿼리에 적용 가능.',
      wrongApproaches: [
        '누적합은 업데이트마다 O(N) 재구축 필요 — O(NM) TLE',
        '값의 범위가 long long이므로 int로 처리하면 오버플로우',
      ],
      dataStructures: ['세그먼트 트리 배열 (크기 4N)', '또는 펜윅 트리 배열 (크기 N+1)'],
      timeComplexity: 'O(N + (M + K) log N)',
      pitfalls: [
        '값의 범위가 매우 크므로 long long(64비트) 사용 필수',
        '세그먼트 트리 크기를 4*N으로 잡기',
        '업데이트 시 "값을 v로 변경"이므로 차이를 계산하여 반영하거나 직접 덮어쓰기',
        '1-indexed 입력을 0-indexed 배열에 매핑할 때 주의',
      ],
      interviewExplanation:
        '"세그먼트 트리를 빌드하여 각 노드에 구간 합을 저장합니다. 포인트 업데이트는 리프를 변경하고 조상을 갱신하며 O(log N), 구간 합 쿼리도 구간을 분할하며 O(log N)입니다. 총 O(N + (M+K) log N)입니다."',
    },
    source: { platform: 'boj' as any, id: 2042 },
  },
];
