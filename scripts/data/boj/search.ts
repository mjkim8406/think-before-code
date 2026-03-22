import type { ProblemSeed } from '../problems';

export const BOJ_SEARCH: ProblemSeed[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1260 — DFS와 BFS
  // ──────────────────────────────────────────────────────
  {
    id: 'b001260-boj',
    title: 'DFS와 BFS',
    description:
      '그래프를 DFS로 탐색한 결과와 BFS로 탐색한 결과를 출력하는 프로그램을 작성하시오.\n\n정점 번호가 작은 것부터 먼저 방문하며, 시작 정점은 V이다.\n\nN개의 정점과 M개의 간선으로 이루어진 무방향 그래프가 주어진다.',
    constraints:
      '1 <= N <= 1,000\n1 <= M <= 10,000\n1 <= V <= N',
    difficulty: 'easy',
    concept_tags: ['dfs', 'bfs', 'graph'],
    secondary_concept_tags: ['recursion', 'queue'],
    intent_description: 'DFS와 BFS의 기본 구현을 정확하게 할 수 있는지 확인하는 문제.',
    key_observation: 'DFS는 재귀/스택, BFS는 큐를 사용한다. 정점 번호가 작은 것부터 방문해야 하므로 인접 리스트를 정렬해야 한다.',
    wrong_approaches: [
      '인접 리스트를 정렬하지 않아 방문 순서가 틀림',
      'visited 배열을 DFS와 BFS 사이에 초기화하지 않음',
    ],
    live_coding_flow: {
      firstObservation:
        'DFS와 BFS 모두 구현하되, 정점 번호가 작은 것부터 방문해야 한다. 인접 리스트를 정렬해두면 자연스럽게 해결.',
      approachCandidates: [
        'DFS: 재귀로 구현 — 간결',
        'DFS: 스택으로 구현 — 재귀 깊이 제한 회피',
        'BFS: 큐로 구현 — 표준',
      ],
      whyThisApproach:
        '재귀 DFS + 큐 BFS가 가장 표준적. N <= 1,000이므로 재귀 깊이 문제없음. 인접 리스트를 오름차순 정렬.',
      wrongApproaches: [
        '인접 행렬 사용 시 N=1,000이면 10^6 공간 — 가능하지만 비효율',
        'BFS에서 큐에 넣을 때 visited 체크를 하지 않으면 중복 방문',
      ],
      dataStructures: ['인접 리스트 (정렬)', 'visited 배열', 'DFS: 재귀/스택', 'BFS: 큐'],
      timeComplexity: 'O(N + M)',
      pitfalls: [
        '인접 리스트의 각 리스트를 오름차순 정렬하여 작은 번호부터 방문',
        'DFS와 BFS 사이에 visited 배열 초기화 필수',
        'BFS에서 큐에 넣는 시점에 visited 체크 — pop 시점에 하면 중복 큐 삽입',
        '연결되지 않은 정점이 있을 수 있으나 시작 정점에서 도달 가능한 것만 출력',
      ],
      interviewExplanation:
        '"인접 리스트를 구성하고 각 리스트를 정렬합니다. DFS는 재귀로 현재 정점을 출력하고 인접 정점을 순서대로 방문합니다. BFS는 큐에 시작 정점을 넣고, 큐에서 꺼내며 미방문 인접 정점을 큐에 추가합니다. 두 탐색 모두 O(N+M)입니다."',
    },
    source: { platform: 'boj' as any, id: 1260 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1300 — K번째 수
  // ──────────────────────────────────────────────────────
  {
    id: 'b001300-boj',
    title: 'K번째 수',
    description:
      'N*N 크기의 배열 A가 있다. A[i][j] = i * j이다. 이 배열의 모든 원소를 일차원 배열 B에 넣고 오름차순 정렬했을 때, B[K]를 구하시오.\n\n(배열의 인덱스는 1부터 시작)',
    constraints:
      '1 <= N <= 100,000\n1 <= K <= min(10^9, N^2)',
    difficulty: 'medium',
    concept_tags: ['binary-search'],
    secondary_concept_tags: ['math'],
    intent_description: '답에 대한 이분 탐색(Parametric Search)을 적용할 수 있는지 확인하는 문제.',
    key_observation: '값 x 이하의 원소 개수를 O(N)에 셀 수 있다. i번째 행에서 x 이하인 원소는 min(x/i, N)개. 이를 이용해 답을 이분 탐색.',
    wrong_approaches: [
      'N^2개를 실제로 생성하여 정렬 — N=10^5이면 10^10개로 메모리/시간 초과',
      '이분 탐색 범위를 잘못 설정하면 답을 놓침',
    ],
    live_coding_flow: {
      firstObservation:
        'N^2이 최대 10^10이므로 배열을 직접 만들 수 없다. "x 이하의 원소가 K개 이상인 최소 x"를 이분 탐색으로 찾자.',
      approachCandidates: [
        '배열 생성 + 정렬: O(N^2 log N^2) — 불가능',
        '답에 대한 이분 탐색: O(N log(N^2))',
      ],
      whyThisApproach:
        'x 이하의 원소 개수 f(x) = sum(min(x/i, N)) for i=1..N. f(x) >= K인 최소 x를 이분 탐색. f(x)는 단조 증가하므로 이분 탐색 적용 가능.',
      wrongApproaches: [
        '배열을 실제 생성하면 N=10^5일 때 10^10개 — 메모리/시간 초과',
        'x/i를 floor로 계산하지 않으면 카운트 오류',
      ],
      dataStructures: ['이분 탐색 변수: lo, hi, mid'],
      timeComplexity: 'O(N log(N^2)) = O(N log N)',
      pitfalls: [
        '이분 탐색 범위: lo=1, hi=K (K번째 수는 K를 초과할 수 없음, 1*K <= K이므로)',
        'x/i 계산 시 정수 나눗셈 사용 및 min(x/i, N) 처리',
        '같은 값이 여러 개일 수 있으므로 lower bound로 찾기',
        'K가 N^2보다 클 수 없다는 조건 확인',
      ],
      interviewExplanation:
        '"답 x에 대해 이분 탐색합니다. x 이하의 원소 개수를 f(x) = sum(min(x/i, N))으로 O(N)에 계산합니다. f(x) >= K인 최소 x를 찾으면 그것이 B[K]입니다. 시간복잡도 O(N log N)입니다."',
    },
    source: { platform: 'boj' as any, id: 1300 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1920 — 수 찾기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001920-boj',
    title: '수 찾기',
    description:
      'N개의 정수 A[1], ..., A[N]이 주어져 있을 때, 이 안에 X라는 정수가 존재하는지 알아내는 프로그램을 작성하시오.\n\nM개의 수가 주어지면 각각이 A에 존재하는지 출력하시오.',
    constraints:
      '1 <= N <= 100,000\n1 <= M <= 100,000\n-2^31 <= 각 정수 <= 2^31 - 1',
    difficulty: 'easy',
    concept_tags: ['binary-search', 'sorting'],
    secondary_concept_tags: ['hash-map'],
    intent_description: '정렬 후 이분 탐색으로 존재 여부를 O(log N)에 판별할 수 있는지 확인하는 문제.',
    key_observation: 'A를 정렬하면 이분 탐색으로 각 쿼리를 O(log N)에 처리. 또는 HashSet으로 O(1) 조회.',
    wrong_approaches: [
      '매 쿼리마다 선형 탐색 O(NM) — 10^10으로 TLE',
      '정렬하지 않고 이분 탐색 시도 — 오답',
    ],
    live_coding_flow: {
      firstObservation:
        'M번의 존재 여부 쿼리. N, M = 10^5이므로 O(NM)은 TLE. 정렬 + 이분 탐색 또는 HashSet.',
      approachCandidates: [
        '정렬 + 이분 탐색: O(N log N + M log N)',
        'HashSet: O(N + M)',
        '브루트포스: O(NM) — TLE',
      ],
      whyThisApproach:
        '이분 탐색 연습이 목적이라면 정렬 후 이분 탐색. 실전에서는 HashSet이 더 간단.',
      wrongApproaches: [
        '매 쿼리 선형 탐색 O(NM) = 10^10 TLE',
        '정렬 안 하고 이분 탐색하면 올바른 결과를 보장하지 못함',
      ],
      dataStructures: ['정렬된 배열 + 이분 탐색', 'HashSet'],
      timeComplexity: 'O(N log N + M log N)',
      pitfalls: [
        '이분 탐색 경계 조건: while (lo <= hi)에서 lo = mid+1, hi = mid-1',
        '값의 범위가 int 범위이므로 mid 계산 시 오버플로우 주의 (lo + (hi - lo) / 2)',
        '입출력 속도가 중요: BufferedReader/StringBuilder 사용',
      ],
      interviewExplanation:
        '"배열 A를 정렬한 뒤 각 쿼리에 대해 이분 탐색으로 존재 여부를 O(log N)에 판별합니다. 전체 시간복잡도는 정렬 O(N log N) + 쿼리 O(M log N)입니다. 또는 HashSet을 사용하면 O(N + M)으로도 가능합니다."',
    },
    source: { platform: 'boj' as any, id: 1920 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2023 — 신기한 소수
  // ──────────────────────────────────────────────────────
  {
    id: 'b002023-boj',
    title: '신기한 소수',
    description:
      '수의 자릿수를 왼쪽부터 하나씩 늘려가며 모든 단계에서 소수인 수를 "신기한 소수"라 한다.\n\n예를 들어 7331은 7, 73, 733, 7331 모두 소수이므로 신기한 소수이다.\n\nN자리 신기한 소수를 모두 구하시오. (오름차순 출력)',
    constraints:
      '1 <= N <= 8',
    difficulty: 'medium',
    concept_tags: ['dfs', 'backtracking'],
    secondary_concept_tags: ['math', 'prime'],
    intent_description: 'DFS/백트래킹으로 조건을 만족하는 수를 생성하며 가지치기할 수 있는지 확인하는 문제.',
    key_observation: '왼쪽부터 한 자리씩 늘리면서 소수인지 체크하면 가지치기가 자연스럽게 이루어진다. 한 자리 소수(2,3,5,7)부터 시작.',
    wrong_approaches: [
      '모든 N자리 수를 생성 후 각각 모든 접두사 소수 체크 — 비효율',
      '에라토스테네스의 체로 전체를 구하면 N=8일 때 10^8까지 필요 — 메모리 과다',
    ],
    live_coding_flow: {
      firstObservation:
        '한 자리 소수(2,3,5,7)에서 시작하여 뒤에 숫자를 하나씩 붙이면서 소수가 유지되는지 DFS로 탐색.',
      approachCandidates: [
        'DFS + 가지치기: 소수가 아니면 더 이상 확장하지 않음',
        '브루트포스: 모든 N자리 수 생성 후 검증 — 비효율',
        '에라토스테네스: N=8이면 10^8까지 체 필요 — 메모리 과다',
      ],
      whyThisApproach:
        'DFS로 자릿수를 한 개씩 늘리면서 소수 체크. 소수가 아니면 즉시 가지치기하여 탐색 공간이 크게 줄어든다.',
      wrongApproaches: [
        '모든 N자리 수를 나열하면 10^8개까지 가능 — 너무 많음',
        '짝수를 뒤에 붙이면 2의 배수이므로 절대 소수가 안 됨 (2 제외) — 1,3,5,7,9만 시도 가능',
      ],
      dataStructures: ['DFS 재귀 호출 스택'],
      timeComplexity: 'O(4 * 5^(N-1) * sqrt(10^N)) — 가지치기로 실제 훨씬 적음',
      pitfalls: [
        '소수 판별: sqrt(n)까지 나눠보는 O(sqrt(n)) 방식 사용',
        '시작점은 한 자리 소수 2, 3, 5, 7',
        '뒤에 붙이는 숫자: 짝수는 2의 배수이므로 홀수만 시도 (첫 자리 2 제외)',
        'N=1인 경우 2, 3, 5, 7을 그대로 출력',
      ],
      interviewExplanation:
        '"한 자리 소수(2,3,5,7)에서 DFS를 시작합니다. 현재 수에 0~9를 붙여 새 수를 만들고 소수인지 체크합니다. 소수가 아니면 가지치기, 소수이고 N자리이면 출력합니다. 가지치기 덕분에 탐색 공간이 매우 작습니다."',
    },
    source: { platform: 'boj' as any, id: 2023 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2178 — 미로 탐색
  // ──────────────────────────────────────────────────────
  {
    id: 'b002178-boj',
    title: '미로 탐색',
    description:
      'N*M 크기의 미로가 주어진다. 1은 이동 가능, 0은 이동 불가이다.\n\n(1,1)에서 출발하여 (N,M)까지 이동할 때, 지나야 하는 최소 칸 수를 구하시오.\n\n시작 위치와 도착 위치도 칸 수에 포함한다.',
    constraints:
      '2 <= N, M <= 100\n시작과 도착은 항상 1',
    difficulty: 'easy',
    concept_tags: ['bfs', 'graph'],
    secondary_concept_tags: ['shortest-path'],
    intent_description: 'BFS를 이용한 최단 경로 탐색을 격자(grid)에서 구현할 수 있는지 확인하는 문제.',
    key_observation: '가중치가 없는(동일 비용) 격자에서 최단 거리는 BFS로 구한다. (1,1)에서 BFS 시작하여 (N,M)에 도달할 때의 거리.',
    wrong_approaches: [
      'DFS로 최단 거리를 구하면 모든 경로를 탐색해야 하므로 비효율적이고 오답 가능',
      '방문 체크를 하지 않으면 무한 루프',
    ],
    live_coding_flow: {
      firstObservation:
        '모든 간선의 가중치가 1인 격자에서 최단 경로 → BFS. (1,1)에서 시작하여 (N,M)까지의 최소 이동 칸 수.',
      approachCandidates: [
        'BFS: 최단 거리 보장, O(NM)',
        'DFS: 최단 거리를 보장하지 않아 모든 경로 탐색 필요 — 비효율',
        'Dijkstra: 모든 가중치가 1이므로 BFS로 충분',
      ],
      whyThisApproach:
        'BFS는 가중치 없는 그래프에서 최단 거리를 보장한다. 큐에서 꺼낼 때가 해당 셀까지의 최단 거리.',
      wrongApproaches: [
        'DFS는 최단 경로를 보장하지 않음 — 먼저 찾은 경로가 최단이 아닐 수 있음',
        'visited 체크 없이 BFS하면 같은 셀을 반복 방문하여 무한 루프',
      ],
      dataStructures: ['BFS 큐 (좌표 + 거리)', '방향 벡터 dx, dy', 'visited 또는 distance 배열'],
      timeComplexity: 'O(N * M)',
      pitfalls: [
        '시작 칸도 칸 수에 포함하므로 초기 거리를 1로 설정',
        '방향 벡터: (0,1), (0,-1), (1,0), (-1,0)으로 상하좌우 이동',
        '격자 범위 체크: 0 <= nr < N, 0 <= nc < M',
        '입력이 공백 없이 붙어있으므로 문자열로 읽어서 한 글자씩 파싱',
      ],
      interviewExplanation:
        '"(1,1)에서 BFS를 시작합니다. 큐에 시작 좌표와 거리 1을 넣고, 상하좌우로 이동 가능한 칸을 큐에 추가하며 거리를 1씩 증가시킵니다. (N,M)에 도달하면 그 거리를 출력합니다. O(NM)입니다."',
    },
    source: { platform: 'boj' as any, id: 2178 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2343 — 기타 레슨
  // ──────────────────────────────────────────────────────
  {
    id: 'b002343-boj',
    title: '기타 레슨',
    description:
      'N개의 강의가 순서대로 있고 각 강의의 길이가 주어진다. 이 강의들을 M개의 블루레이에 녹화하려 한다.\n\n강의 순서는 바꿀 수 없으며, 각 블루레이의 크기는 모두 같다. 블루레이의 크기가 최소가 되도록 하는 값을 구하시오.\n\n즉, 연속된 강의들을 M개 그룹으로 나눌 때 각 그룹 합의 최댓값을 최소화하시오.',
    constraints:
      '1 <= N <= 100,000\n1 <= M <= N\n강의 길이: 1 이상 10,000 이하',
    difficulty: 'medium',
    concept_tags: ['binary-search', 'parametric-search'],
    secondary_concept_tags: ['greedy'],
    intent_description: '파라메트릭 서치(답에 대한 이분 탐색)를 적용하여 최적화 문제를 결정 문제로 변환할 수 있는지 확인.',
    key_observation: '블루레이 크기 x가 주어졌을 때, 필요한 블루레이 수를 그리디하게 O(N)으로 계산할 수 있다. 이를 이분 탐색.',
    wrong_approaches: [
      '모든 가능한 크기를 시도 — O(합계 * N) TLE',
      'DP로 풀면 O(NM) — N, M이 크면 비효율',
      '이분 탐색의 하한을 0으로 설정하면 가장 긴 강의를 담지 못함',
    ],
    live_coding_flow: {
      firstObservation:
        '"최솟값을 구하라" + "결정 문제(크기 x로 M개 이내에 담을 수 있는가)가 단조성을 가짐" → 파라메트릭 서치.',
      approachCandidates: [
        '파라메트릭 서치: 답에 대해 이분 탐색, 검증 O(N) → 총 O(N log S)',
        'DP: O(NM) — M이 크면 비효율',
        '브루트포스: 모든 분할 시도 — 조합 폭발',
      ],
      whyThisApproach:
        '크기 x로 강의를 순서대로 담을 때 필요한 블루레이 수 f(x)는 x가 커질수록 감소(단조). f(x) <= M인 최소 x를 이분 탐색.',
      wrongApproaches: [
        '이분 탐색 범위의 하한을 0으로 하면 가장 긴 강의를 한 장에 못 담음',
        '그리디 검증 시 현재 블루레이에 넣을 수 없으면 새 블루레이를 시작해야 함을 빠뜨림',
      ],
      dataStructures: ['이분 탐색 변수: lo, hi, mid'],
      timeComplexity: 'O(N log S), S = 강의 길이 합',
      pitfalls: [
        '이분 탐색 범위: lo = max(강의 길이), hi = sum(강의 길이)',
        'lo를 max 값으로 해야 어떤 강의도 한 블루레이에 담을 수 있음',
        '그리디 검증: 순서대로 현재 블루레이에 추가하다 초과하면 새 블루레이 시작',
        '블루레이 수가 M 이하이면 크기를 줄여보고, 초과하면 키우기',
      ],
      interviewExplanation:
        '"블루레이 크기 x에 대해 이분 탐색합니다. 검증: 강의를 순서대로 현재 디스크에 담다가 합이 x를 초과하면 새 디스크를 시작, 필요한 디스크 수가 M 이하인지 확인합니다. lo = max(강의), hi = sum(강의)로 설정하여 O(N log S)에 해결합니다."',
    },
    source: { platform: 'boj' as any, id: 2343 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11724 — 연결 요소의 개수
  // ──────────────────────────────────────────────────────
  {
    id: 'b011724-boj',
    title: '연결 요소의 개수',
    description:
      '방향 없는 그래프가 주어졌을 때, 연결 요소(Connected Component)의 개수를 구하는 프로그램을 작성하시오.\n\nN개의 정점과 M개의 간선이 주어진다.',
    constraints:
      '1 <= N <= 1,000\n0 <= M <= N*(N-1)/2',
    difficulty: 'easy',
    concept_tags: ['dfs', 'bfs', 'graph'],
    secondary_concept_tags: ['union-find'],
    intent_description: 'DFS/BFS로 연결 요소를 카운팅하는 기본 그래프 탐색을 구현할 수 있는지 확인.',
    key_observation: '모든 정점을 순회하며, 미방문 정점에서 DFS/BFS를 시작할 때마다 연결 요소 개수를 1 증가.',
    wrong_approaches: [
      '간선 수로 연결 요소를 추론하려는 시도 — 오답',
      '방문 체크를 하지 않으면 같은 컴포넌트를 중복 카운트',
    ],
    live_coding_flow: {
      firstObservation:
        '연결 요소 = 미방문 정점에서 DFS/BFS를 시작하는 횟수. 모든 정점을 순회하며 미방문이면 탐색 시작 + 카운트.',
      approachCandidates: [
        'DFS: 각 미방문 정점에서 DFS 시작',
        'BFS: 각 미방문 정점에서 BFS 시작',
        'Union-Find: 간선마다 union 후 루트 수 카운트',
      ],
      whyThisApproach:
        'DFS가 가장 간결. 1번부터 N번까지 순회하며 미방문이면 DFS로 연결된 모든 정점을 방문 처리하고 카운터 증가.',
      wrongApproaches: [
        '간선이 없는 고립된 정점도 하나의 연결 요소 — 간선 기준으로만 세면 놓침',
        '인접 행렬을 쓰면 O(N^2) 공간 — N=1,000이면 가능하지만 인접 리스트가 효율적',
      ],
      dataStructures: ['인접 리스트', 'visited 배열'],
      timeComplexity: 'O(N + M)',
      pitfalls: [
        '간선이 0개인 경우: 모든 정점이 각각 연결 요소 → 답 = N',
        '1번부터 N번까지 모든 정점을 확인해야 함 (일부만 확인하면 고립 정점 누락)',
        '양방향 간선이므로 인접 리스트에 양쪽 추가',
      ],
      interviewExplanation:
        '"1번부터 N번까지 정점을 순회합니다. 미방문 정점을 만나면 카운터를 증가시키고 DFS로 연결된 모든 정점을 방문 처리합니다. 순회가 끝나면 카운터 값이 연결 요소의 수입니다. O(N+M)입니다."',
    },
    source: { platform: 'boj' as any, id: 11724 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 13023 — ABCDE
  // ──────────────────────────────────────────────────────
  {
    id: 'b013023-boj',
    title: 'ABCDE',
    description:
      'N명의 사람과 M개의 친구 관계가 주어진다.\n\nA-B-C-D-E 형태의 관계, 즉 길이 4의 경로(5명이 순서대로 친구)가 존재하는지 판별하시오.\n\n존재하면 1, 아니면 0을 출력한다.',
    constraints:
      '5 <= N <= 2,000\n1 <= M <= 5,000',
    difficulty: 'medium',
    concept_tags: ['dfs', 'backtracking', 'graph'],
    secondary_concept_tags: [],
    intent_description: 'DFS + 백트래킹으로 길이 4의 경로가 존재하는지 판별할 수 있는지 확인하는 문제.',
    key_observation: '모든 정점에서 DFS를 시작하여 깊이 5(5개 노드)에 도달하면 경로가 존재. 방문 배열을 백트래킹으로 복원.',
    wrong_approaches: [
      '5중 반복문으로 모든 경우를 확인 — 구현 복잡하고 간선 체크 필요',
      'BFS로는 경로 백트래킹이 어려움',
      '방문 배열을 복원하지 않으면 다른 경로를 탐색하지 못함',
    ],
    live_coding_flow: {
      firstObservation:
        '길이 4의 단순 경로(5개 노드)가 존재하는지 판별. 모든 정점에서 DFS로 깊이 5까지 탐색하면 된다.',
      approachCandidates: [
        'DFS + 백트래킹: 모든 시작점에서 DFS, 깊이 5 도달 시 true',
        '5중 반복문 + 간선 존재 확인: O(N^5)에 가까워 비효율',
      ],
      whyThisApproach:
        'DFS로 깊이를 추적하며 탐색. depth == 5이면 true. 백트래킹으로 visited를 복원하여 다른 경로도 시도.',
      wrongApproaches: [
        '방문 배열을 복원하지 않으면 한 번 방문한 노드를 다시 사용하지 못해 경로를 놓침',
        'BFS는 깊이별 탐색이므로 특정 길이의 경로 추적에 부적합',
      ],
      dataStructures: ['인접 리스트', 'visited 배열 (백트래킹)'],
      timeComplexity: 'O(N * N!) — 실제로는 깊이 5 제한으로 O(N * M)에 가까움',
      pitfalls: [
        '깊이 5에 도달하면 즉시 true 반환하여 불필요한 탐색 방지',
        'visited[v] = true → DFS(v) → visited[v] = false 백트래킹 패턴',
        '모든 시작점에서 DFS를 해야 함 — 하나의 시작점만으로는 부족',
        '경로 내 같은 노드 재방문 방지를 위한 visited 필수',
      ],
      interviewExplanation:
        '"모든 정점에서 DFS를 시작합니다. 방문 깊이가 5에 도달하면 길이 4의 경로가 존재하므로 1을 출력합니다. DFS 탐색 중 visited 배열을 백트래킹하여 다른 경로도 탐색합니다. 깊이 제한이 5이므로 효율적입니다."',
    },
    source: { platform: 'boj' as any, id: 13023 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1167 — 트리의 지름
  // ──────────────────────────────────────────────────────
  {
    id: 'b001167-boj',
    title: '트리의 지름',
    description:
      '트리의 지름이란 트리에서 가장 먼 두 노드 사이의 거리를 말한다.\n\nV개의 노드로 이루어진 트리가 주어질 때, 트리의 지름을 구하시오.\n\n각 간선에는 가중치가 있다.',
    constraints:
      '2 <= V <= 100,000\n간선 가중치: 양의 정수',
    difficulty: 'medium',
    concept_tags: ['dfs', 'bfs', 'tree'],
    secondary_concept_tags: ['graph'],
    intent_description: '트리의 지름을 BFS/DFS 2회로 구하는 알고리즘을 이해하고 구현할 수 있는지 확인하는 문제.',
    key_observation: '임의의 노드에서 가장 먼 노드 u를 찾고, u에서 가장 먼 노드 v를 찾으면 u-v 거리가 트리의 지름이다. BFS/DFS 2회로 해결.',
    wrong_approaches: [
      '모든 쌍의 거리를 구하는 O(V^2) — TLE',
      'BFS를 1회만 수행하여 가장 먼 거리를 답으로 — 시작점이 지름의 끝이 아닐 수 있음',
      '가중치를 무시하고 간선 개수만 세면 오답',
    ],
    live_coding_flow: {
      firstObservation:
        '트리에서 가장 먼 두 노드 사이 거리. 모든 쌍을 구하면 O(V^2). 하지만 트리의 성질을 이용하면 BFS 2회로 O(V)에 가능.',
      approachCandidates: [
        '모든 쌍 BFS: O(V^2) — TLE',
        'BFS 2회: 임의 노드 → 최원점 u → u에서 최원점 v, dist(u,v) = 지름. O(V)',
        'DFS 2회: 동일 로직, 재귀 구현',
      ],
      whyThisApproach:
        '트리에서 임의의 노드에서 가장 먼 노드는 반드시 지름의 한 끝점이다 (증명 가능). 따라서 BFS 2회로 지름을 구할 수 있다.',
      wrongApproaches: [
        'BFS 1회만 하면 시작점이 지름의 끝점이 아닐 수 있어 오답',
        '가중치를 간선 수로 세면 실제 거리와 다름',
        '모든 쌍 O(V^2)는 V=10^5에서 TLE',
      ],
      dataStructures: ['인접 리스트 (가중치 포함)', 'distance 배열', 'BFS 큐 또는 DFS 스택'],
      timeComplexity: 'O(V)',
      pitfalls: [
        '가중치가 있는 간선이므로 인접 리스트에 (노드, 가중치) 쌍으로 저장',
        '입력 형식: 각 줄의 끝이 -1로 표시되므로 파싱에 주의',
        '첫 BFS에서 가장 먼 노드를 찾을 때 distance 배열을 초기화',
        '두 번째 BFS 전에 distance 배열을 다시 초기화',
      ],
      interviewExplanation:
        '"아무 노드에서 BFS로 가장 먼 노드 u를 찾습니다. 다시 u에서 BFS로 가장 먼 노드 v를 찾으면, dist(u, v)가 트리의 지름입니다. 트리의 성질상 첫 BFS의 최원점은 반드시 지름의 한 끝점입니다. BFS 2회로 O(V)에 해결됩니다."',
    },
    source: { platform: 'boj' as any, id: 1167 },
  },
];
