/**
 * 큐레이션된 문제 데이터
 *
 * 구조:
 * - description, constraints: LeetCode 공개 문제 텍스트 (또는 직접 작성)
 * - conceptTags, difficulty: Codeforces 태그 매핑 또는 직접 분류
 * - live_coding_flow: 핵심 — 관리자가 직접 작성하는 "모범 사고 흐름"
 *
 * 새 문제 추가 방법:
 * 1. `npm run fetch:codeforces` 실행 → 템플릿 출력
 * 2. 아래 배열에 붙여넣고 live_coding_flow 직접 작성
 * 3. `npm run seed` 실행
 */

import { BOJ_PROBLEMS } from './boj';

export interface ProblemSeed {
  id: string;               // UUID (고정) — upsert 기준
  title: string;
  description: string;
  constraints: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  concept_tags: string[];
  secondary_concept_tags: string[];
  intent_description: string;
  key_observation: string;
  wrong_approaches: string[];
  live_coding_flow: {
    firstObservation: string;
    approachCandidates: string[];
    whyThisApproach: string;
    wrongApproaches: string[];
    dataStructures: string[];
    timeComplexity: string;
    pitfalls: string[];
    interviewExplanation: string;
  };
  // 출처 (시딩 추적용, DB에는 저장 안 함)
  source?: { platform: 'leetcode' | 'codeforces'; id: string | number };
}

export const CURATED_PROBLEMS: ProblemSeed[] = [
  // ──────────────────────────────────────────────────────
  // 1. Two Sum — LeetCode #1
  // ──────────────────────────────────────────────────────
  {
    id: 'a0000000-000000000001',
    title: '두 수의 합 (Two Sum)',
    description:
      '정수 배열 nums와 정수 target이 주어질 때, 합이 target이 되는 두 수의 인덱스를 반환하세요.\n\n각 입력에는 정확히 하나의 해가 있으며, 같은 요소를 두 번 사용할 수 없습니다.\n\n답은 어떤 순서로든 반환할 수 있습니다.',
    constraints:
      '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\n정확히 하나의 답이 존재합니다.',
    difficulty: 'easy',
    concept_tags: ['hash-map', 'array'],
    secondary_concept_tags: ['two-pointer', 'sorting'],
    intent_description: '해시맵으로 O(n) 시간에 보수(complement)를 찾을 수 있는지 확인하는 문제.',
    key_observation: 'target - nums[i]가 이전에 등장했는지 O(1)에 확인하려면 해시맵이 필요하다.',
    wrong_approaches: [
      '이중 반복문으로 모든 쌍 확인 — O(n²)',
      '정렬 후 투 포인터 — 원래 인덱스를 잃음',
    ],
    live_coding_flow: {
      firstObservation:
        '두 수의 합이 target이 되어야 하므로, 한 수를 고정하면 나머지는 target - nums[i]로 결정된다.',
      approachCandidates: [
        '브루트포스: 이중 반복문 O(n²)',
        '해시맵: 한 번 순회하며 보수 확인 O(n)',
        '정렬 + 투 포인터: O(n log n) — 인덱스 관리 복잡',
      ],
      whyThisApproach:
        '해시맵을 쓰면 배열을 한 번만 순회하면서 각 원소의 보수를 O(1)에 조회할 수 있다.',
      wrongApproaches: [
        '이중 반복문은 n=10^4이면 10^8 — 시간 초과 위험',
        '정렬하면 원본 인덱스 손실 — 별도 저장 필요하여 복잡',
      ],
      dataStructures: ['HashMap<값 → 인덱스>'],
      timeComplexity: 'O(n)',
      pitfalls: [
        '같은 인덱스를 두 번 사용하지 않도록: 해시맵에 넣기 전 보수를 먼저 조회',
        '해시맵 키를 인덱스가 아닌 값으로 저장해야 O(1) 조회 가능',
      ],
      interviewExplanation:
        '"배열을 순회하면서 각 원소에 대해 target - nums[i]가 해시맵에 있는지 확인합니다. 없으면 현재 값과 인덱스를 저장하고, 있으면 해당 인덱스와 현재 인덱스를 반환합니다. 시간복잡도 O(n), 공간복잡도 O(n)입니다."',
    },
    source: { platform: 'leetcode', id: 1 },
  },

  // ──────────────────────────────────────────────────────
  // 2. Valid Parentheses — LeetCode #20
  // ──────────────────────────────────────────────────────
  {
    id: 'a0000000-000000000002',
    title: '유효한 괄호 (Valid Parentheses)',
    description:
      "여는 괄호 '(', '{', '['와 닫는 괄호 ')', '}', ']'로만 이루어진 문자열 s가 주어질 때, 문자열이 유효한지 판별하세요.\n\n유효한 문자열:\n1. 여는 괄호는 같은 종류의 닫는 괄호로 닫혀야 합니다.\n2. 여는 괄호는 올바른 순서로 닫혀야 합니다.\n3. 모든 닫는 괄호는 대응하는 여는 괄호가 있어야 합니다.",
    constraints:
      "1 <= s.length <= 10^4\ns는 '()', '[]', '{}' 문자로만 구성됩니다.",
    difficulty: 'easy',
    concept_tags: ['stack', 'string'],
    secondary_concept_tags: ['hash-map'],
    intent_description: '스택을 사용해 LIFO 특성으로 괄호 짝을 올바르게 매칭할 수 있는지 확인.',
    key_observation: '가장 최근에 열린 괄호가 먼저 닫혀야 한다 → LIFO → 스택.',
    wrong_approaches: [
      '단순 카운터 — 종류별 구분 불가',
      '정규식 반복 제거 — O(n²)',
    ],
    live_coding_flow: {
      firstObservation:
        '괄호가 올바르게 중첩되려면 가장 최근에 열린 것이 먼저 닫혀야 한다. 이는 LIFO(후입선출) 구조다.',
      approachCandidates: [
        '스택: 여는 괄호 push, 닫는 괄호에서 pop 후 매칭 확인 O(n)',
        '재귀적 제거: 쌍을 찾아 반복 제거 O(n²)',
        '카운터: 종류 구분 불가 — 오답',
      ],
      whyThisApproach:
        '스택에 여는 괄호를 쌓고, 닫는 괄호를 만나면 top이 대응하는 여는 괄호인지 확인. 단순하고 O(n).',
      wrongApproaches: [
        '"(" 카운터만 쓰면 "(]" 같은 케이스를 구분 못함',
        '정규식으로 "()" 반복 제거는 중첩이 깊으면 O(n²)',
      ],
      dataStructures: ['Stack<char>'],
      timeComplexity: 'O(n)',
      pitfalls: [
        '빈 스택에서 pop 시도: 닫는 괄호가 나왔는데 스택이 비어있으면 false',
        '순회 후 스택이 비어있는지 확인 필수 — 열린 괄호가 남아있으면 false',
      ],
      interviewExplanation:
        '"스택을 사용합니다. 여는 괄호는 push, 닫는 괄호는 스택 top과 매칭을 확인합니다. 스택이 비어있거나 매칭 실패면 false, 순회 후 스택이 비어있으면 true입니다. O(n)으로 해결됩니다."',
    },
    source: { platform: 'leetcode', id: 20 },
  },

  // ──────────────────────────────────────────────────────
  // 3. Maximum Subarray (Kadane) — LeetCode #53
  // ──────────────────────────────────────────────────────
  {
    id: 'a0000000-000000000003',
    title: '최대 부분 배열 합 (Maximum Subarray)',
    description:
      '정수 배열 nums가 주어질 때, 합이 최대인 연속 부분 배열을 찾고 그 합을 반환하세요.\n\n부분 배열은 배열에서 연속적인 부분입니다.',
    constraints: '1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4',
    difficulty: 'medium',
    concept_tags: ['dynamic-programming', 'array'],
    secondary_concept_tags: ['divide-and-conquer', 'prefix-sum'],
    intent_description: 'Kadane 알고리즘(DP)으로 O(n)에 최대 부분합을 구할 수 있는지 확인.',
    key_observation: '각 위치에서 "이전 합에 현재를 더하기" vs "현재부터 새로 시작하기" 중 큰 값을 선택.',
    wrong_approaches: [
      '모든 부분 배열 열거 O(n²)',
      '음수 원소를 무조건 제외하는 그리디 — 오답',
    ],
    live_coding_flow: {
      firstObservation:
        '연속 부분 배열이므로 각 위치에서 "이전 부분합을 이어갈지, 현재부터 새로 시작할지" 결정해야 한다.',
      approachCandidates: [
        '브루트포스: 모든 시작·끝 쌍 O(n²)',
        'Kadane 알고리즘: 각 위치에서 max(nums[i], prev+nums[i]) O(n)',
        '분할 정복: O(n log n) — 구현 복잡, 이점 없음',
      ],
      whyThisApproach:
        'Kadane: dp[i] = max(nums[i], dp[i-1] + nums[i]). 이전 합이 음수면 버리고 현재부터 시작하는 게 이득.',
      wrongApproaches: [
        '음수가 있어도 전체 합에 기여할 수 있으므로 무조건 제외 불가',
        '브루트포스는 O(n²) — 10^5에서 시간 초과',
      ],
      dataStructures: ['변수 2개: currentMax, globalMax'],
      timeComplexity: 'O(n)',
      pitfalls: [
        '모든 원소가 음수인 경우: 초기값을 0이 아닌 nums[0]으로 설정',
        '빈 배열 처리 (문제 조건에 따라)',
      ],
      interviewExplanation:
        '"Kadane 알고리즘을 사용합니다. currentMax = max(nums[i], currentMax + nums[i])를 유지하며 globalMax를 갱신합니다. 이전 합이 음수면 버리고 현재 원소부터 시작하는 것이 항상 이득입니다. O(n), O(1)로 해결됩니다."',
    },
    source: { platform: 'leetcode', id: 53 },
  },

  // ──────────────────────────────────────────────────────
  // 4. Climbing Stairs — LeetCode #70
  // ──────────────────────────────────────────────────────
  {
    id: 'a0000000-000000000004',
    title: '계단 오르기 (Climbing Stairs)',
    description:
      'n계단을 오르는 방법의 수를 구하세요.\n\n한 번에 1계단 또는 2계단을 오를 수 있습니다.',
    constraints: '1 <= n <= 45',
    difficulty: 'easy',
    concept_tags: ['dynamic-programming', 'recursion'],
    secondary_concept_tags: ['math'],
    intent_description: '피보나치 수열이 DP와 동일한 구조임을 파악하고 O(n) 풀이를 도출할 수 있는지 확인.',
    key_observation: 'f(n) = f(n-1) + f(n-2). n번째 계단에 오는 방법 = (n-1)에서 1칸) + (n-2에서 2칸).',
    wrong_approaches: [
      '재귀 브루트포스 — 중복 연산 O(2^n)',
      '경우의 수를 직접 나열 — n이 커지면 불가',
    ],
    live_coding_flow: {
      firstObservation:
        'n번째 계단에 도달하는 방법은 (n-1번째에서 1칸 오르기) + (n-2번째에서 2칸 오르기)의 합이다.',
      approachCandidates: [
        '재귀: f(n) = f(n-1) + f(n-2) — 중복 연산 O(2^n)',
        '메모이제이션: O(n) 시간, O(n) 공간',
        '바텀업 DP: O(n) 시간, O(1) 공간 (변수 2개만 유지)',
      ],
      whyThisApproach:
        '피보나치 구조임을 파악하면 변수 2개로 이전 값만 유지하는 O(1) 공간 풀이가 가능하다.',
      wrongApproaches: [
        '순수 재귀는 f(45) 계산 시 2^45번 호출 — 시간 초과',
        '메모이제이션은 정답이지만 O(n) 추가 공간 낭비',
      ],
      dataStructures: ['변수 2개 (prev, curr)'],
      timeComplexity: 'O(n)',
      pitfalls: [
        'n=1, n=2 엣지 케이스 처리',
        '피보나치임을 바로 인식하지 못하고 복잡한 DP 테이블 구성 위험',
      ],
      interviewExplanation:
        '"이 문제는 피보나치와 동일한 구조입니다. f(n) = f(n-1) + f(n-2)로, 변수 두 개만 유지하며 n번 순회하면 O(n) 시간, O(1) 공간으로 해결됩니다."',
    },
    source: { platform: 'leetcode', id: 70 },
  },

  // ──────────────────────────────────────────────────────
  // 5. Binary Search — LeetCode #704
  // ──────────────────────────────────────────────────────
  {
    id: 'a0000000-000000000005',
    title: '이분 탐색 (Binary Search)',
    description:
      '오름차순으로 정렬된 정수 배열 nums와 정수 target이 주어질 때, target의 인덱스를 반환하세요. target이 없으면 -1을 반환합니다.',
    constraints:
      '1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nums의 모든 원소는 유일합니다.\nums는 오름차순으로 정렬되어 있습니다.',
    difficulty: 'easy',
    concept_tags: ['binary-search', 'array'],
    secondary_concept_tags: [],
    intent_description: '정렬된 배열에서 이분 탐색의 기본 구현을 정확히 할 수 있는지 확인.',
    key_observation: '정렬되어 있으므로 중앙값 비교로 탐색 범위를 절반씩 줄일 수 있다.',
    wrong_approaches: [
      '선형 탐색 O(n) — 정렬 조건을 활용하지 못함',
      'left+right 오버플로우 없이 mid 계산 실패',
    ],
    live_coding_flow: {
      firstObservation:
        '배열이 정렬되어 있다는 조건 → 탐색 범위를 반씩 줄일 수 있다 → 이분 탐색.',
      approachCandidates: [
        '선형 탐색 O(n)',
        '이분 탐색 O(log n)',
      ],
      whyThisApproach:
        '정렬된 배열에서 중앙값이 target보다 크면 오른쪽 절반, 작으면 왼쪽 절반을 버릴 수 있다.',
      wrongApproaches: [
        '선형 탐색은 정렬 조건을 무시 — O(n)',
        'mid = (left + right) / 2는 오버플로우 위험 — left + (right - left) / 2 권장',
      ],
      dataStructures: ['포인터 2개: left, right'],
      timeComplexity: 'O(log n)',
      pitfalls: [
        'while (left <= right) vs while (left < right) 경계 조건 혼동',
        'mid 계산 시 정수 오버플로우: left + (right - left) / 2',
        '루프 종료 후 target 미발견 시 -1 반환 누락',
      ],
      interviewExplanation:
        '"left, right 포인터를 배열 양 끝으로 설정하고 mid = left + (right-left)/2로 중앙값을 구합니다. nums[mid] == target이면 반환, 작으면 left = mid+1, 크면 right = mid-1. O(log n)에 해결됩니다."',
    },
    source: { platform: 'leetcode', id: 704 },
  },

  // ──────────────────────────────────────────────────────
  // 6. Best Time to Buy and Sell Stock — LeetCode #121
  // ──────────────────────────────────────────────────────
  {
    id: 'a0000000-000000000006',
    title: '주식 사고팔기 (Best Time to Buy and Sell Stock)',
    description:
      '배열 prices가 주어지고 prices[i]는 i번째 날의 주가입니다.\n\n이익을 최대화하려면 어느 날 사고 어느 날 팔아야 하는지 계산해 최대 이익을 반환하세요.\n\n이익을 낼 수 없으면 0을 반환합니다.',
    constraints:
      '1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4',
    difficulty: 'easy',
    concept_tags: ['array', 'sliding-window'],
    secondary_concept_tags: ['dynamic-programming'],
    intent_description: '순회하면서 최솟값을 갱신하며 현재 이익을 계산하는 O(n) 그리디를 도출할 수 있는지 확인.',
    key_observation: '파는 날 기준 → 그 이전 최저가에 산다. 최저가를 유지하며 순회하면 O(n).',
    wrong_approaches: [
      '모든 (사는 날, 파는 날) 쌍 확인 O(n²)',
      '정렬 후 최솟값/최댓값 사용 — 사는 날이 파는 날보다 앞이어야 하는 조건 위반',
    ],
    live_coding_flow: {
      firstObservation:
        '파는 날은 항상 사는 날보다 뒤여야 한다. 파는 날을 기준으로 이전까지의 최솟값을 유지하면 된다.',
      approachCandidates: [
        '브루트포스: 모든 쌍 O(n²)',
        '그리디: minPrice를 유지하며 한 번 순회 O(n)',
        '슬라이딩 윈도우 관점: left=사는날, right=파는날으로 확장',
      ],
      whyThisApproach:
        '순회하면서 minPrice를 갱신하고, 현재 가격 - minPrice가 최대 이익 후보. O(n) 단일 패스.',
      wrongApproaches: [
        'min/max를 각각 구하면 min이 max 이후에 올 수 있어 오답',
        '브루트포스 O(n²)는 n=10^5에서 시간 초과',
      ],
      dataStructures: ['변수 2개: minPrice, maxProfit'],
      timeComplexity: 'O(n)',
      pitfalls: [
        '파는 날 < 사는 날 케이스: 오른쪽에서 왼쪽으로 파는 게 불가능하므로 minPrice는 현재 인덱스까지만',
        '이익이 0 미만이면 0 반환 — max(0, price - minPrice)',
      ],
      interviewExplanation:
        '"minPrice를 양의 무한대로 초기화하고 배열을 한 번 순회합니다. 현재 가격이 minPrice보다 작으면 갱신, 크면 현재 가격 - minPrice와 maxProfit 중 큰 값을 maxProfit으로 갱신합니다. O(n)입니다."',
    },
    source: { platform: 'leetcode', id: 121 },
  },

  // ──────────────────────────────────────────────────────
  // 7. Number of Islands — LeetCode #200
  // ──────────────────────────────────────────────────────
  {
    id: 'a0000000-000000000007',
    title: '섬의 수 (Number of Islands)',
    description:
      "'1'(땅)과 '0'(물)로 이루어진 2D 격자 grid가 주어질 때 섬의 수를 반환하세요.\n\n섬은 물로 둘러싸여 있으며, 수평 또는 수직으로 인접한 땅들을 연결하여 형성됩니다.\n\n격자의 네 가장자리는 물로 둘러싸여 있다고 가정합니다.",
    constraints:
      'm == grid.length\nn == grid[i].length\n1 <= m, n <= 300\ngrid[i][j]는 "0" 또는 "1"입니다.',
    difficulty: 'medium',
    concept_tags: ['dfs', 'bfs', 'graph'],
    secondary_concept_tags: ['union-find'],
    intent_description: 'DFS/BFS로 연결 컴포넌트를 탐색하는 기본 그래프 패턴을 적용할 수 있는지 확인.',
    key_observation: '각 "1"에서 DFS/BFS로 연결된 육지 전체를 방문 처리 → 탐색 횟수 = 섬의 수.',
    wrong_approaches: [
      '단순히 "1"의 개수를 세면 연결된 땅을 중복 카운트',
      '방향 벡터 없이 if문으로 상하좌우를 각각 처리 — 코드 중복',
    ],
    live_coding_flow: {
      firstObservation:
        '"섬"은 연결된 "1"들의 집합. 처음 보는 "1"마다 DFS/BFS로 연결된 전체를 방문 처리하면 탐색 횟수가 곧 섬의 수.',
      approachCandidates: [
        'DFS: 재귀로 상하좌우 탐색, 방문한 셀을 "0"으로 표시',
        'BFS: 큐로 동일하게 탐색',
        'Union-Find: 각 "1"을 노드로 연결',
      ],
      whyThisApproach:
        'DFS가 구현이 가장 간결. 방문한 셀을 "0"으로 덮어쓰면 별도 visited 배열 불필요.',
      wrongApproaches: [
        '"1"의 수만 세면 연결된 땅 하나를 여러 섬으로 카운트',
        'Union-Find는 정확하지만 구현이 복잡하고 이점 없음',
      ],
      dataStructures: ['방향 벡터 [(0,1),(0,-1),(1,0),(-1,0)]', '(선택) visited 배열 또는 원본 수정'],
      timeComplexity: 'O(m × n)',
      pitfalls: [
        '격자 범위 이탈 체크: 0 <= r < m, 0 <= c < n',
        '재귀 깊이: m=n=300이면 최대 90000 스택 프레임 — 반복 DFS 또는 BFS 권장',
        '입력 수정이 허용되지 않는 경우 별도 visited 배열 사용',
      ],
      interviewExplanation:
        '"격자를 순회하다 "1"을 만나면 카운터를 증가하고 DFS로 연결된 모든 육지를 "0"으로 표시합니다. 전체 시간복잡도는 O(m×n)이며, 모든 셀을 최대 한 번씩 방문합니다."',
    },
    source: { platform: 'leetcode', id: 200 },
  },

  // ──────────────────────────────────────────────────────
  // 8. Merge Intervals — LeetCode #56
  // ──────────────────────────────────────────────────────
  {
    id: 'a0000000-000000000008',
    title: '구간 합치기 (Merge Intervals)',
    description:
      '구간 배열 intervals가 주어질 때 겹치는 모든 구간을 합치고 결과를 반환하세요.\n\nintervals[i] = [start_i, end_i]',
    constraints:
      '1 <= intervals.length <= 10^4\nintervals[i].length == 2\n0 <= start_i <= end_i <= 10^4',
    difficulty: 'medium',
    concept_tags: ['sorting', 'interval', 'array'],
    secondary_concept_tags: [],
    intent_description: '정렬 후 선형 순회로 겹치는 구간을 O(n log n)에 병합할 수 있는지 확인.',
    key_observation: '시작점 기준 정렬 후 순회 — 현재 구간의 start가 이전 end 이하면 겹침.',
    wrong_approaches: [
      '정렬 없이 모든 쌍 비교 O(n²)',
      '각 구간을 배열로 펼쳐서 체크 — 값 범위가 크면 비효율',
    ],
    live_coding_flow: {
      firstObservation:
        '구간을 시작점 기준으로 정렬하면, 겹치는 구간은 반드시 인접하게 된다.',
      approachCandidates: [
        '브루트포스: 모든 쌍 비교 O(n²)',
        '정렬 후 선형 탐색: O(n log n)',
      ],
      whyThisApproach:
        '시작점 정렬 → 순회하며 merged[-1].end와 현재 start 비교. 겹치면 end 갱신, 안 겹치면 새 구간 추가.',
      wrongApproaches: [
        '정렬 없이 합치면 멀리 떨어진 구간이 나중에 나온 구간과 겹칠 수 있어 놓침',
        '값을 배열로 펼치면 end가 10^4라도 공간 낭비',
      ],
      dataStructures: ['결과 배열 merged'],
      timeComplexity: 'O(n log n)',
      pitfalls: [
        'merged가 비어있을 때 처음 구간 추가 처리',
        'end 갱신 시 max(merged[-1].end, current.end) — 완전히 포함된 케이스',
      ],
      interviewExplanation:
        '"구간을 시작점 기준으로 정렬합니다. 결과 배열의 마지막 end와 현재 start를 비교해 겹치면 end를 max로 갱신, 안 겹치면 결과에 추가합니다. O(n log n)입니다."',
    },
    source: { platform: 'leetcode', id: 56 },
  },

  // CF 2193E — Product Queries (1300) — https://codeforces.com/problemset/problem/2193/E
  {
    id: 'c0000000-7738-4369-2785',
    title: 'Product Queries',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'medium',
    concept_tags: ["dynamic-programming","math"],
    secondary_concept_tags: ["bfs"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2193E' },
  },

  // CF 2190B1 — Sub-RBS (Easy Version) (1400) — https://codeforces.com/problemset/problem/2190/B1
  {
    id: 'c0000001-7738-4369-2785',
    title: 'Sub-RBS (Easy Version)',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'medium',
    concept_tags: ["math","dynamic-programming"],
    secondary_concept_tags: ["greedy","string","two-pointer"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2190B1' },
  },

  // CF 2184C — Huge Pile (1100) — https://codeforces.com/problemset/problem/2184/C
  {
    id: 'c0000002-7738-4369-2785',
    title: 'Huge Pile',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'easy',
    concept_tags: ["binary-search","dfs"],
    secondary_concept_tags: ["dynamic-programming","graph","math"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2184C' },
  },

  // CF 2182C — Production of Snowmen (1200) — https://codeforces.com/problemset/problem/2182/C
  {
    id: 'c0000003-7738-4369-2785',
    title: 'Production of Snowmen',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'easy',
    concept_tags: ["backtracking","math"],
    secondary_concept_tags: ["dynamic-programming"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2182C' },
  },

  // CF 2178C — First or Second (1200) — https://codeforces.com/problemset/problem/2178/C
  {
    id: 'c0000004-7738-4369-2785',
    title: 'First or Second',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'easy',
    concept_tags: ["dynamic-programming","greedy"],
    secondary_concept_tags: [],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2178C' },
  },

  // CF 2173B — Niko's Tactical Cards (1100) — https://codeforces.com/problemset/problem/2173/B
  {
    id: 'c0000005-7738-4369-2785',
    title: 'Niko\'s Tactical Cards',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'easy',
    concept_tags: ["dynamic-programming","greedy"],
    secondary_concept_tags: ["math"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2173B' },
  },

  // CF 2171D — Rae Taylor and Trees (easy version) (1400) — https://codeforces.com/problemset/problem/2171/D
  {
    id: 'c0000006-7738-4369-2786',
    title: 'Rae Taylor and Trees (easy version)',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'medium',
    concept_tags: ["binary-search","array"],
    secondary_concept_tags: ["dynamic-programming","union-find","greedy","tree"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2171D' },
  },

  // CF 2169C — Range Operation (1300) — https://codeforces.com/problemset/problem/2169/C
  {
    id: 'c0000007-7738-4369-2786',
    title: 'Range Operation',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'medium',
    concept_tags: ["dynamic-programming","greedy"],
    secondary_concept_tags: ["math","two-pointer"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2169C' },
  },

  // CF 2158C — Annoying Game (1400) — https://codeforces.com/problemset/problem/2158/C
  {
    id: 'c0000008-7738-4369-2786',
    title: 'Annoying Game',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'medium',
    concept_tags: ["dynamic-programming","greedy"],
    secondary_concept_tags: [],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2158C' },
  },

  // CF 2144C — Non-Descending Arrays (1300) — https://codeforces.com/problemset/problem/2144/C
  {
    id: 'c0000009-7738-4369-2786',
    title: 'Non-Descending Arrays',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'medium',
    concept_tags: ["math","dynamic-programming"],
    secondary_concept_tags: [],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2144C' },
  },

  // CF 2135A — Against the Difference (1200) — https://codeforces.com/problemset/problem/2135/A
  {
    id: 'c0000010-7738-4369-2786',
    title: 'Against the Difference',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'easy',
    concept_tags: ["array","dynamic-programming"],
    secondary_concept_tags: [],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2135A' },
  },

  // CF 2129A — Double Perspective (1300) — https://codeforces.com/problemset/problem/2129/A
  {
    id: 'c0000011-7738-4369-2786',
    title: 'Double Perspective',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'medium',
    concept_tags: ["dynamic-programming","union-find"],
    secondary_concept_tags: ["graph","greedy"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2129A' },
  },

  // CF 2114E — Kirei Attacks the Estate (1400) — https://codeforces.com/problemset/problem/2114/E
  {
    id: 'c0000012-7738-4369-2786',
    title: 'Kirei Attacks the Estate',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'medium',
    concept_tags: ["dfs","dynamic-programming"],
    secondary_concept_tags: ["greedy","tree"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2114E' },
  },

  // CF 2114C — Need More Arrays (1000) — https://codeforces.com/problemset/problem/2114/C
  {
    id: 'c0000013-7738-4369-2786',
    title: 'Need More Arrays',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'easy',
    concept_tags: ["dynamic-programming","greedy"],
    secondary_concept_tags: [],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2114C' },
  },

  // CF 2111B — Fibonacci Cubes (1100) — https://codeforces.com/problemset/problem/2111/B
  {
    id: 'c0000014-7738-4369-2787',
    title: 'Fibonacci Cubes',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'easy',
    concept_tags: ["backtracking","dynamic-programming"],
    secondary_concept_tags: ["math"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2111B' },
  },

  // CF 2104B — Move to the End (1000) — https://codeforces.com/problemset/problem/2104/B
  {
    id: 'c0000015-7738-4369-2787',
    title: 'Move to the End',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'easy',
    concept_tags: ["backtracking","array"],
    secondary_concept_tags: ["dynamic-programming","greedy"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2104B' },
  },

  // CF 2090B — Pushing Balls (1000) — https://codeforces.com/problemset/problem/2090/B
  {
    id: 'c0000016-7738-4369-2787',
    title: 'Pushing Balls',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'easy',
    concept_tags: ["backtracking","dynamic-programming"],
    secondary_concept_tags: [],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2090B' },
  },

  // CF 2086C — Disappearing Permutation (1300) — https://codeforces.com/problemset/problem/2086/C
  {
    id: 'c0000017-7738-4369-2787',
    title: 'Disappearing Permutation',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'medium',
    concept_tags: ["dfs","dynamic-programming"],
    secondary_concept_tags: ["union-find","graph","greedy"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2086C' },
  },

  // CF 2067B — Two Large Bags (1200) — https://codeforces.com/problemset/problem/2067/B
  {
    id: 'c0000018-7738-4369-2787',
    title: 'Two Large Bags',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'easy',
    concept_tags: ["backtracking","dynamic-programming"],
    secondary_concept_tags: ["greedy"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2067B' },
  },

  // CF 2065C1 — Skibidus and Fanum Tax (easy version) (1100) — https://codeforces.com/problemset/problem/2065/C1
  {
    id: 'c0000019-7738-4369-2787',
    title: 'Skibidus and Fanum Tax (easy version)',
    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',
    constraints: null,
    difficulty: 'easy',
    concept_tags: ["binary-search","dynamic-programming"],
    secondary_concept_tags: ["greedy"],
    intent_description: '// TODO',
    key_observation: '// TODO',
    wrong_approaches: [],
    live_coding_flow: {
      firstObservation: '// TODO',
      approachCandidates: [],
      whyThisApproach: '// TODO',
      wrongApproaches: [],
      dataStructures: [],
      timeComplexity: '// TODO',
      pitfalls: [],
      interviewExplanation: '// TODO',
    },
    source: { platform: 'codeforces', id: '2065C1' },
  },

  // ──────────────────────────────────────────────────────
  // BOJ (백준) — 101 problems across 10 categories
  // ──────────────────────────────────────────────────────
  ...BOJ_PROBLEMS,
];
