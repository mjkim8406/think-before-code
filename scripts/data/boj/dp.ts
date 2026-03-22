import type { ProblemSeed } from '../problems';

export const BOJ_DP: ProblemSeed[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1463 — 1로 만들기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001463-boj',
    title: '1로 만들기',
    description:
      '정수 X에 사용할 수 있는 연산은 다음 세 가지이다.\n1) X가 3으로 나누어 떨어지면 3으로 나눈다.\n2) X가 2로 나누어 떨어지면 2로 나눈다.\n3) 1을 뺀다.\n정수 N이 주어졌을 때, 위 연산을 사용하여 1을 만들 수 있는 최소 연산 횟수를 구하시오.',
    constraints:
      '1 <= N <= 10^6',
    difficulty: 'easy',
    concept_tags: ['dynamic-programming'],
    secondary_concept_tags: ['bfs', 'greedy'],
    intent_description: '기본적인 바텀업 DP 또는 BFS로 최소 연산 횟수를 구할 수 있는지 확인하는 문제.',
    key_observation: 'dp[i] = i를 1로 만드는 최소 연산 수. dp[i] = min(dp[i-1], dp[i/2](if i%2==0), dp[i/3](if i%3==0)) + 1.',
    wrong_approaches: [
      '그리디: 무조건 나누기를 우선 — 10에서 그리디는 10→5→4→2→1 (4번)이지만, 10→9→3→1 (3번)이 최적',
      '재귀만 사용 — 메모이제이션 없이는 중복 연산 폭발',
    ],
    live_coding_flow: {
      firstObservation:
        '각 수에서 가능한 연산이 3가지이므로, 작은 수부터 최소 연산 수를 채워나가는 DP가 자연스럽다.',
      approachCandidates: [
        '바텀업 DP: dp[1] = 0에서 시작, dp[i]를 세 연산의 역연산으로 계산',
        'BFS: 1에서 시작해 N까지 최단거리',
        '탑다운 메모이제이션',
      ],
      whyThisApproach:
        '바텀업 DP가 가장 직관적이다. dp[1] = 0이고, i = 2부터 N까지 dp[i] = dp[i-1] + 1을 기본으로 하고, 2나 3으로 나누어 떨어지면 해당 값과 비교해 최솟값을 취한다.',
      wrongApproaches: [
        '그리디(큰 수부터 가능한 한 나누기)는 반례가 존재: 10 → 9 → 3 → 1이 최적이지만 그리디는 10 → 5 → 4 → 2 → 1',
        '재귀 without 메모이제이션은 O(3^log(N)) 급 중복 호출',
      ],
      dataStructures: ['1D 배열 dp[N+1]'],
      timeComplexity: 'O(N)',
      pitfalls: [
        'dp[1] = 0 기저 조건',
        '나누기 연산 가능 여부를 먼저 체크',
        'N = 1이면 즉시 0 출력',
      ],
      interviewExplanation:
        '"dp[1] = 0에서 시작해, dp[i] = min(dp[i-1], dp[i/2] if 2로 나누어 떨어짐, dp[i/3] if 3으로 나누어 떨어짐) + 1로 채웁니다. O(N) 시간, O(N) 공간입니다."',
    },
    source: { platform: 'boj' as any, id: 1463 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2747 — 피보나치 수
  // ──────────────────────────────────────────────────────
  {
    id: 'b002747-boj',
    title: '피보나치 수',
    description:
      '피보나치 수는 0과 1로 시작하며, 다음 피보나치 수는 바로 앞의 두 피보나치 수의 합이다. 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ... n이 주어졌을 때, n번째 피보나치 수를 구하시오.',
    constraints:
      '0 <= n <= 45',
    difficulty: 'easy',
    concept_tags: ['dynamic-programming', 'math'],
    secondary_concept_tags: ['recursion'],
    intent_description: '재귀의 중복 연산 문제를 인식하고 반복문 또는 메모이제이션으로 해결할 수 있는지 확인하는 문제.',
    key_observation: 'fib(n) = fib(n-1) + fib(n-2). 재귀는 O(2^n)이지만, 이전 두 값만 유지하면 O(n)으로 해결 가능.',
    wrong_approaches: [
      '단순 재귀: fib(45)에서 2^45번 호출 — 시간 초과',
      '배열을 46개 선언 안 하고 변수 2개만 사용할 때 초기값 실수',
    ],
    live_coding_flow: {
      firstObservation:
        '피보나치 수열의 정의가 점화식 자체이므로 DP로 바로 연결된다. 이전 두 값만 필요하므로 공간을 O(1)로 줄일 수 있다.',
      approachCandidates: [
        '단순 재귀: O(2^n) — 시간 초과',
        '메모이제이션: O(n) 시간, O(n) 공간',
        '반복문 + 변수 2개: O(n) 시간, O(1) 공간',
      ],
      whyThisApproach:
        '변수 두 개(prev, curr)만 유지하며 n번 순회하면 O(n) 시간, O(1) 공간으로 가장 효율적이다.',
      wrongApproaches: [
        '순수 재귀는 지수 시간으로 n=45에서 수십 초 소요',
        '배열 없이 변수만 사용할 때 swap 순서 실수',
      ],
      dataStructures: ['변수 2개: prev, curr'],
      timeComplexity: 'O(n)',
      pitfalls: [
        'fib(0) = 0, fib(1) = 1 기저 조건',
        'n = 0인 경우 바로 0 출력',
        'int 범위: fib(45) = 1,134,903,170으로 int(32bit) 범위 내',
      ],
      interviewExplanation:
        '"prev = 0, curr = 1로 시작해 n번 반복하며 (prev, curr) = (curr, prev + curr)로 갱신합니다. O(n) 시간, O(1) 공간입니다."',
    },
    source: { platform: 'boj' as any, id: 2747 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 10844 — 쉬운 계단 수
  // ──────────────────────────────────────────────────────
  {
    id: 'b010844-boj',
    title: '쉬운 계단 수',
    description:
      '인접한 모든 자릿수의 차이가 1인 수를 계단 수라 한다. 예를 들어 45656은 계단 수이다. N이 주어질 때, 길이가 N인 계단 수가 총 몇 개인지 구하시오. (0으로 시작하는 수는 계단 수가 아니다.) 답을 1,000,000,000으로 나눈 나머지를 출력한다.',
    constraints:
      '1 <= N <= 100',
    difficulty: 'medium',
    concept_tags: ['dynamic-programming'],
    secondary_concept_tags: ['math'],
    intent_description: '자릿수 DP(digit DP)의 기본 패턴을 이해하고 상태를 정의할 수 있는지 확인하는 문제.',
    key_observation: 'dp[길이][마지막 자릿수] = 해당 상태의 계단 수 개수. 마지막 자릿수가 0이면 다음은 1만, 9이면 8만 가능하다.',
    wrong_approaches: [
      '마지막 자릿수를 추적하지 않고 전체 개수만 세기 — 인접 자릿수 조건 확인 불가',
      '0으로 시작하는 수를 포함하는 실수',
    ],
    live_coding_flow: {
      firstObservation:
        '계단 수의 다음 자릿수는 현재 자릿수 +-1이므로, 마지막 자릿수를 상태로 가져야 한다.',
      approachCandidates: [
        '2D DP: dp[i][j] = 길이 i이고 마지막 자릿수가 j인 계단 수의 개수',
        '브루트포스: 길이 N인 모든 수 확인 — N=100이면 불가능',
      ],
      whyThisApproach:
        'dp[i][j] = dp[i-1][j-1] + dp[i-1][j+1] (경계 처리 필요). 길이 1일 때 dp[1][1..9] = 1로 초기화하고 N까지 채운다.',
      wrongApproaches: [
        '자릿수가 0일 때 -1인 경우, 9일 때 +1인 경우를 처리하지 않으면 범위 초과',
        '0으로 시작하는 수를 세면 오답',
      ],
      dataStructures: ['2D 배열 dp[101][10] 또는 1D 배열 10칸 롤링'],
      timeComplexity: 'O(N * 10)',
      pitfalls: [
        'j = 0: dp[i][0] = dp[i-1][1]만 가능',
        'j = 9: dp[i][9] = dp[i-1][8]만 가능',
        '초기값: dp[1][0] = 0 (0으로 시작 불가), dp[1][1..9] = 1',
        '매 덧셈마다 mod 적용',
      ],
      interviewExplanation:
        '"dp[i][j]를 길이 i이고 마지막 자릿수가 j인 계단 수의 개수로 정의합니다. dp[i][j] = dp[i-1][j-1] + dp[i-1][j+1]이며, j=0일 때는 dp[i-1][1]만, j=9일 때는 dp[i-1][8]만 더합니다. 답은 dp[N][0..9]의 합을 10^9로 나눈 나머지입니다."',
    },
    source: { platform: 'boj' as any, id: 10844 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11726 — 2×n 타일링
  // ──────────────────────────────────────────────────────
  {
    id: 'b011726-boj',
    title: '2xn 타일링',
    description:
      '2xn 크기의 직사각형을 1x2, 2x1 타일로 채우는 방법의 수를 구하시오. 답을 10007로 나눈 나머지를 출력한다.',
    constraints:
      '1 <= n <= 1000',
    difficulty: 'easy',
    concept_tags: ['dynamic-programming'],
    secondary_concept_tags: ['math'],
    intent_description: '기본적인 1차원 DP 점화식을 세울 수 있는지 확인하는 문제. 피보나치 구조와의 연결성을 파악하는지도 확인.',
    key_observation: 'dp[n] = dp[n-1] + dp[n-2]. 맨 오른쪽에 세로 타일 1개를 놓거나, 가로 타일 2개를 놓는 두 가지 경우.',
    wrong_approaches: [
      '가로 타일 1개만 놓는 경우를 세는 실수 — 가로 타일은 반드시 2개가 한 쌍',
      '중복 카운팅: 같은 배치를 다른 순서로 세기',
    ],
    live_coding_flow: {
      firstObservation:
        '2xn 직사각형의 맨 오른쪽 열을 채우는 방법은 (1) 2x1 세로 타일 1개 → 나머지 2x(n-1), (2) 1x2 가로 타일 2개 → 나머지 2x(n-2) 두 가지.',
      approachCandidates: [
        'DP: dp[n] = dp[n-1] + dp[n-2]',
        '행렬 거듭제곱: O(log n) — 이 문제에서는 불필요',
      ],
      whyThisApproach:
        '점화식이 피보나치와 동일하므로 변수 2개로 O(n) 시간, O(1) 공간에 해결 가능하다.',
      wrongApproaches: [
        '가로 타일을 1개만 놓을 수 있다고 생각하면 오답 — 2x1 공간에 가로 타일 1개만으로는 빈 칸이 남음',
        '점화식에서 dp[n-3] 등 불필요한 항을 추가',
      ],
      dataStructures: ['변수 2개 또는 배열'],
      timeComplexity: 'O(n)',
      pitfalls: [
        'dp[1] = 1, dp[2] = 2 기저 조건',
        '매 단계 mod 10007 적용',
        'n = 1인 경우 즉시 1 출력',
      ],
      interviewExplanation:
        '"맨 오른쪽에 세로 타일 1개 또는 가로 타일 2개를 놓는 두 경우로 나뉘므로 dp[n] = dp[n-1] + dp[n-2]입니다. 피보나치와 동일한 구조로, O(n)에 해결됩니다."',
    },
    source: { platform: 'boj' as any, id: 11726 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2193 — 이친수
  // ──────────────────────────────────────────────────────
  {
    id: 'b002193-boj',
    title: '이친수',
    description:
      '0과 1로만 이루어진 수를 이진수라 한다. 이진수 중 다음 조건을 만족하는 수를 이친수라 한다.\n1) 이친수는 0으로 시작하지 않는다.\n2) 이친수에서는 1이 두 번 연속으로 나타나지 않는다.\nN이 주어졌을 때, N자리 이친수의 개수를 구하시오.',
    constraints:
      '1 <= N <= 90',
    difficulty: 'easy',
    concept_tags: ['dynamic-programming'],
    secondary_concept_tags: ['math'],
    intent_description: '마지막 자릿수에 따른 상태 분리 DP를 세울 수 있는지 확인하는 문제.',
    key_observation: 'dp[i][0] = dp[i-1][0] + dp[i-1][1], dp[i][1] = dp[i-1][0]. 마지막이 0이면 다음에 0 또는 1, 마지막이 1이면 다음에 0만 가능.',
    wrong_approaches: [
      '단순히 2^N에서 연속 1 포함하는 수를 빼기 — 포함-배제가 복잡',
      '마지막 자릿수 상태를 추적하지 않으면 연속 1 조건 확인 불가',
    ],
    live_coding_flow: {
      firstObservation:
        '1이 연속으로 나오지 않으므로, 마지막 자릿수가 0인지 1인지에 따라 다음에 올 수 있는 수가 결정된다.',
      approachCandidates: [
        '2D DP: dp[길이][마지막 비트]',
        '피보나치 관찰: 상태를 합치면 f(n) = f(n-1) + f(n-2)',
        '브루트포스: 모든 N자리 이진수 확인 — 2^90 불가능',
      ],
      whyThisApproach:
        'dp[i][0] + dp[i][1]을 합치면 f(n) = f(n-1) + f(n-2) 피보나치와 같다. 변수 2개로 O(n)에 해결 가능.',
      wrongApproaches: [
        '마지막 비트를 구분하지 않으면 "10"에서 "1"을 붙여 "101"은 가능하지만 "11"은 불가능한 것을 처리할 수 없음',
        '0으로 시작하는 경우를 포함하면 오답',
      ],
      dataStructures: ['변수 2개: zero_end, one_end'],
      timeComplexity: 'O(N)',
      pitfalls: [
        '초기값: dp[1][1] = 1, dp[1][0] = 0 (0으로 시작 불가)',
        'N = 90일 때 f(90)은 약 2.88 * 10^18 — long long 필수',
        '피보나치 연결을 모르면 2D 배열로도 충분',
      ],
      interviewExplanation:
        '"마지막 비트가 0이면 다음에 0 또는 1, 1이면 다음에 0만 가능합니다. dp[i][0] = dp[i-1][0] + dp[i-1][1], dp[i][1] = dp[i-1][0]이고, 합치면 피보나치와 동일합니다. O(N)에 해결됩니다."',
    },
    source: { platform: 'boj' as any, id: 2193 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1915 — 가장 큰 정사각형
  // ──────────────────────────────────────────────────────
  {
    id: 'b001915-boj',
    title: '가장 큰 정사각형',
    description:
      'n x m 크기의 0, 1로 이루어진 배열이 주어진다. 이 배열에서 1로만 이루어진 가장 큰 정사각형의 넓이를 구하시오.',
    constraints:
      '1 <= n, m <= 1000',
    difficulty: 'medium',
    concept_tags: ['dynamic-programming'],
    secondary_concept_tags: ['array'],
    intent_description: '2D DP에서 dp[i][j] = (i,j)를 오른쪽 아래 꼭짓점으로 하는 최대 정사각형 변의 길이라는 상태를 정의할 수 있는지 확인하는 문제.',
    key_observation: 'dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 (grid[i][j] == 1일 때). 세 방향의 최솟값이 확장 가능한 한 변의 길이를 결정한다.',
    wrong_approaches: [
      '모든 가능한 정사각형을 열거: O(n^2 * m^2 * min(n,m)) — 매우 느림',
      '가장 큰 직사각형을 구하는 히스토그램 방법 — 정사각형 조건에 맞지 않음',
    ],
    live_coding_flow: {
      firstObservation:
        '(i, j)를 오른쪽 아래 꼭짓점으로 하는 최대 정사각형의 한 변 길이는, 위, 왼쪽, 왼쪽 위 대각선 세 위치의 값 중 최솟값 + 1이다.',
      approachCandidates: [
        '2D DP: dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1',
        '브루트포스: 모든 위치에서 모든 크기 확인 O(n * m * min(n,m)^2)',
      ],
      whyThisApproach:
        '핵심 관찰: 한 변 k인 정사각형이 존재하려면 위, 왼쪽, 대각선에 각각 k-1 이상의 정사각형이 있어야 한다. 이를 DP로 표현하면 O(n*m).',
      wrongApproaches: [
        '행/열 연속 1의 개수만으로는 정사각형을 판별할 수 없음',
        'dp 갱신 시 min이 아닌 max를 사용하면 오답',
      ],
      dataStructures: ['2D 배열 dp[n][m]'],
      timeComplexity: 'O(n * m)',
      pitfalls: [
        '첫 행, 첫 열은 grid 값 그대로 초기화',
        'grid[i][j] == 0이면 dp[i][j] = 0',
        '답은 dp의 최댓값의 제곱 (넓이)',
        '입력이 문자열로 주어질 수 있으므로 파싱 주의',
      ],
      interviewExplanation:
        '"dp[i][j]를 (i,j)가 오른쪽 아래 꼭짓점인 최대 정사각형의 한 변 길이로 정의합니다. grid[i][j] = 1이면 dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1입니다. 전체 dp의 최댓값을 제곱하면 답입니다. O(n*m)입니다."',
    },
    source: { platform: 'boj' as any, id: 1915 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 9252 — LCS 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b009252-boj',
    title: 'LCS 2',
    description:
      '두 문자열이 주어졌을 때, 두 문자열의 LCS(최장 공통 부분 수열)의 길이와 실제 LCS를 구하시오.',
    constraints:
      '두 문자열의 길이는 각각 최대 1000\n문자열은 알파벳 대문자로만 구성',
    difficulty: 'medium',
    concept_tags: ['dynamic-programming', 'string'],
    secondary_concept_tags: [],
    intent_description: '고전적인 LCS DP를 구현하고, 역추적(backtracking)으로 실제 부분 수열을 복원할 수 있는지 확인하는 문제.',
    key_observation: 'dp[i][j] = A[1..i]와 B[1..j]의 LCS 길이. A[i] == B[j]면 dp[i-1][j-1] + 1, 아니면 max(dp[i-1][j], dp[i][j-1]). 역추적으로 실제 문자열 복원.',
    wrong_approaches: [
      '한 문자열의 모든 부분 수열을 생성하여 비교 — 2^1000 불가능',
      'LCS 길이만 구하고 역추적을 구현하지 못함',
    ],
    live_coding_flow: {
      firstObservation:
        '두 문자열의 LCS는 전형적인 2D DP 문제다. 길이뿐 아니라 실제 문자열도 구해야 하므로 역추적이 필요하다.',
      approachCandidates: [
        '2D DP + 역추적: O(n*m) 시간, O(n*m) 공간',
        '공간 최적화: 1D 배열로 길이만 구하되, 역추적 불가',
      ],
      whyThisApproach:
        '전체 dp 테이블을 채운 후 dp[n][m]에서 시작해 대각선(같은 문자), 위 또는 왼쪽으로 이동하며 LCS를 역순으로 구성한다.',
      wrongApproaches: [
        '공간 최적화하면 역추적이 불가능하므로 전체 테이블 유지 필수',
        '역추적 시 방향을 잘못 선택하면 LCS가 아닌 문자열 생성',
      ],
      dataStructures: ['2D 배열 dp[n+1][m+1]', '역추적용 스택 또는 문자열 뒤집기'],
      timeComplexity: 'O(n * m)',
      pitfalls: [
        'dp 테이블의 0행, 0열은 0으로 초기화 (빈 문자열)',
        '역추적: A[i] == B[j]면 해당 문자를 기록하고 대각선 이동, 아니면 dp[i-1][j]와 dp[i][j-1] 중 큰 쪽으로 이동',
        'LCS 길이가 0이면 빈 줄 출력 처리',
      ],
      interviewExplanation:
        '"dp[i][j]를 A의 처음 i글자와 B의 처음 j글자의 LCS 길이로 정의합니다. A[i] == B[j]면 dp[i-1][j-1]+1, 아니면 max(dp[i-1][j], dp[i][j-1])입니다. dp를 모두 채운 후 (n,m)에서 역추적하여 실제 LCS를 복원합니다. O(n*m)입니다."',
    },
    source: { platform: 'boj' as any, id: 9252 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 14003 — 가장 긴 증가하는 부분 수열 5
  // ──────────────────────────────────────────────────────
  {
    id: 'b014003-boj',
    title: '가장 긴 증가하는 부분 수열 5',
    description:
      '수열 A가 주어졌을 때, 가장 긴 증가하는 부분 수열(LIS)의 길이와 실제 수열을 구하시오.',
    constraints:
      '1 <= N <= 1,000,000\n-1,000,000,000 <= A[i] <= 1,000,000,000',
    difficulty: 'hard',
    concept_tags: ['dynamic-programming', 'binary-search'],
    secondary_concept_tags: ['greedy'],
    intent_description: 'O(N log N) LIS 알고리즘을 구현하고, 역추적으로 실제 부분 수열을 복원할 수 있는지 확인하는 문제.',
    key_observation: 'tails 배열에서 이분 탐색으로 LIS 길이를 O(N log N)에 구한다. 각 원소가 tails의 몇 번째 위치에 들어갔는지 기록하면 역추적으로 실제 수열을 복원 가능.',
    wrong_approaches: [
      'O(N^2) DP: N = 10^6에서 시간 초과',
      'tails 배열 자체가 LIS라고 착각 — tails는 "각 길이별 최소 마지막 원소"이지 실제 LIS가 아님',
    ],
    live_coding_flow: {
      firstObservation:
        'N이 최대 10^6이므로 O(N^2) DP는 불가능하다. O(N log N) LIS 알고리즘이 필요하며, 실제 수열도 구해야 하므로 역추적 정보를 저장해야 한다.',
      approachCandidates: [
        'O(N^2) DP: dp[i] = A[i]를 마지막으로 하는 LIS 길이 — 시간 초과',
        'O(N log N) tails + 이분 탐색: 길이만 구할 수 있음',
        'O(N log N) tails + 위치 기록 + 역추적: 실제 수열 복원 가능',
      ],
      whyThisApproach:
        'tails 배열을 유지하며 각 원소를 이분 탐색으로 삽입한다. 각 원소가 몇 번째 위치(= LIS에서의 순서)에 들어갔는지 기록하고, 역순으로 가장 큰 위치부터 모으면 실제 LIS를 복원할 수 있다.',
      wrongApproaches: [
        'tails 배열 자체를 LIS로 출력하면 오답 — tails[i]는 길이 (i+1)인 IS의 최소 마지막 원소일 뿐',
        'O(N^2) DP는 N=10^6에서 10^12 연산으로 시간 초과',
      ],
      dataStructures: ['tails 배열', '각 원소의 LIS 위치 기록 배열 pos[]'],
      timeComplexity: 'O(N log N)',
      pitfalls: [
        'lower_bound로 "같은 값" 처리: 순증가이므로 같은 값은 대체해야 함',
        '역추적: pos 배열을 뒤에서부터 순회하며 가장 큰 길이 값을 찾아 역순 구성',
        '값 범위가 -10^9 ~ 10^9이므로 좌표 압축은 불필요하지만 자료형 주의',
      ],
      interviewExplanation:
        '"O(N log N) LIS를 구현합니다. tails 배열에서 lower_bound로 현재 원소의 위치를 찾아 갱신하고, 각 원소가 몇 번째 위치에 들어갔는지 pos 배열에 기록합니다. 최종 LIS 길이는 tails의 크기이고, pos를 뒤에서부터 역추적하여 실제 수열을 복원합니다."',
    },
    source: { platform: 'boj' as any, id: 14003 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 14501 — 퇴사
  // ──────────────────────────────────────────────────────
  {
    id: 'b014501-boj',
    title: '퇴사',
    description:
      '상담원으로 일하는 백준이는 퇴사까지 N일이 남았다. 각 날짜에 잡힌 상담은 기간 T[i]일이 걸리고 수익은 P[i]이다. 상담이 기간 내에 끝나지 않으면 할 수 없다. N+1일에 퇴사하므로 상담이 N+1일 이후에 끝나면 그 상담은 할 수 없다. 최대 수익을 구하시오.',
    constraints:
      '1 <= N <= 15\n1 <= T[i] <= 5\n1 <= P[i] <= 1000',
    difficulty: 'easy',
    concept_tags: ['dynamic-programming'],
    secondary_concept_tags: ['brute-force', 'greedy'],
    intent_description: 'N이 작아 완전 탐색도 가능하지만, DP로도 깔끔하게 풀 수 있는지 확인하는 문제.',
    key_observation: 'dp[i] = i일부터 마지막 날까지의 최대 수익. 뒤에서부터 dp[i] = max(dp[i+1], P[i] + dp[i + T[i]]) (i + T[i] <= N+1일 때).',
    wrong_approaches: [
      '앞에서부터 그리디로 수익 높은 것 선택 — 기간이 겹쳐 최적이 아닐 수 있음',
      '기간이 N을 넘는 상담을 처리하지 않으면 오답',
    ],
    live_coding_flow: {
      firstObservation:
        'N이 15 이하이므로 2^15 = 32768로 완전 탐색도 가능하다. DP로 풀면 O(N)으로 더 깔끔하다.',
      approachCandidates: [
        '완전 탐색: 각 날 상담 수행/미수행 2^N가지',
        '역방향 DP: dp[i] = i일부터의 최대 수익',
        '순방향 DP: dp[i] = i일까지의 최대 수익',
      ],
      whyThisApproach:
        '역방향 DP가 직관적이다. dp[N+1] = 0에서 시작해 dp[i]를 역순으로 채운다. i일 상담 수행 가능하면 P[i] + dp[i+T[i]]와 dp[i+1] 중 큰 값.',
      wrongApproaches: [
        '그리디로 매일 가능한 최대 수익 상담을 선택 — 짧은 기간 여러 상담이 더 이득일 수 있음',
        '상담 기간이 N일을 넘는 경우(i + T[i] > N+1) 상담 불가능 처리 누락',
      ],
      dataStructures: ['1D 배열 dp[N+2]'],
      timeComplexity: 'O(N)',
      pitfalls: [
        'i + T[i] > N + 1이면 해당 상담 수행 불가 — dp[i] = dp[i+1]',
        'dp[N+1] = 0 기저 조건',
        '뒤에서부터 채우므로 for i = N downto 1',
      ],
      interviewExplanation:
        '"dp[i]를 i일부터의 최대 수익으로 정의합니다. dp[N+1] = 0에서 시작해 역순으로 채웁니다. i일 상담이 기간 내 끝나면 dp[i] = max(dp[i+1], P[i] + dp[i+T[i]]), 아니면 dp[i] = dp[i+1]입니다. O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 14501 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 13398 — 연속합 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b013398-boj',
    title: '연속합 2',
    description:
      'n개의 정수로 이루어진 수열에서 연속된 몇 개의 수를 선택하여 합을 최대로 하려 한다. 단, 수를 하나 제거할 수 있다. (제거하지 않아도 된다.) 수열에서 수를 하나 제거하는 경우와 하지 않는 경우 모두 고려하여 최대 연속합을 구하시오.',
    constraints:
      '1 <= n <= 100,000\n-1000 <= 각 원소 <= 1000',
    difficulty: 'medium',
    concept_tags: ['dynamic-programming'],
    secondary_concept_tags: ['array'],
    intent_description: '기본 Kadane 알고리즘을 확장하여 "하나 제거" 상태를 추가한 DP를 설계할 수 있는지 확인하는 문제.',
    key_observation: 'dp[i][0] = i까지 제거 안 한 최대 연속합, dp[i][1] = i까지 하나 제거한 최대 연속합. dp[i][1] = max(dp[i-1][1] + a[i], dp[i-1][0]) — 이전에 제거했고 현재를 포함, 또는 현재를 제거.',
    wrong_approaches: [
      '각 원소를 하나씩 제거하고 Kadane 적용: O(n^2) — 시간 초과 위험',
      '가장 작은 음수를 제거하면 된다는 그리디 — 연속합의 위치를 고려하지 못함',
    ],
    live_coding_flow: {
      firstObservation:
        '기본 Kadane에 "하나 제거" 상태를 추가한다. 각 위치에서 (1) 제거를 아직 안 한 상태, (2) 이미 하나 제거한 상태 두 가지를 관리한다.',
      approachCandidates: [
        '상태 확장 DP: dp[i][0], dp[i][1] — O(n)',
        '각 원소 제거 후 Kadane: O(n^2)',
        '왼쪽 최대합 + 오른쪽 최대합: prefix/suffix max — O(n)',
      ],
      whyThisApproach:
        '상태 확장 DP가 가장 깔끔하다. dp[i][0] = max(a[i], dp[i-1][0] + a[i]). dp[i][1] = max(dp[i-1][0], dp[i-1][1] + a[i]). dp[i-1][0]은 "현재 a[i]를 제거"를 의미한다.',
      wrongApproaches: [
        '모든 원소를 하나씩 제거하며 Kadane는 O(n^2)로 n=10^5에서 느림',
        '가장 작은 음수 하나를 제거하는 그리디는 "연속 구간" 조건을 위반할 수 있음',
      ],
      dataStructures: ['변수 4개: no_del, with_del (이전 행만 유지)'],
      timeComplexity: 'O(n)',
      pitfalls: [
        '모든 원소가 음수인 경우: 제거하지 않고 가장 큰 음수 하나를 선택',
        'dp[i][1]에서 dp[i-1][0]은 "a[i]를 건너뛴다"는 의미 — a[i]는 포함되지 않지만 부분 수열은 연속',
        '답은 모든 dp[i][0], dp[i][1] 중 최댓값',
      ],
      interviewExplanation:
        '"Kadane를 확장합니다. dp[i][0]은 제거 없이 i까지 최대 연속합, dp[i][1]은 하나를 제거하고 i까지의 최대 연속합입니다. dp[i][1] = max(dp[i-1][0], dp[i-1][1] + a[i])로, 현재를 제거하거나 이전에 이미 제거한 상태를 이어갑니다. O(n)입니다."',
    },
    source: { platform: 'boj' as any, id: 13398 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11049 — 행렬 곱셈 순서
  // ──────────────────────────────────────────────────────
  {
    id: 'b011049-boj',
    title: '행렬 곱셈 순서',
    description:
      '크기가 N x M인 행렬 A와 M x K인 행렬 B를 곱하는 데 N x M x K번의 연산이 필요하다. 행렬 N개를 곱하는 순서에 따라 총 연산 횟수가 달라진다. 행렬 N개의 크기가 주어졌을 때, 모든 행렬을 곱하는 데 필요한 연산 횟수의 최솟값을 구하시오.',
    constraints:
      '1 <= N <= 500\n행렬의 행과 열의 크기는 1 이상 500 이하',
    difficulty: 'hard',
    concept_tags: ['dynamic-programming'],
    secondary_concept_tags: ['interval-dp'],
    intent_description: '구간 DP(interval DP)의 전형적 문제인 행렬 체인 곱셈을 구현할 수 있는지 확인하는 문제.',
    key_observation: 'dp[i][j] = 행렬 i~j를 곱하는 최소 비용. dp[i][j] = min over k of (dp[i][k] + dp[k+1][j] + r[i]*c[k]*c[j]). 구간 길이를 점점 늘려가며 채운다.',
    wrong_approaches: [
      '왼쪽부터 순서대로 곱하기 — 순서에 따라 결과가 크게 달라질 수 있음',
      '그리디: 가장 작은 행렬부터 곱하기 — 최적 보장 안 됨',
    ],
    live_coding_flow: {
      firstObservation:
        '행렬 곱셈은 결합법칙이 성립하므로 순서를 바꿀 수 있다. 어디서 분할하느냐에 따라 비용이 달라지므로, 모든 분할점을 시도하는 구간 DP가 필요하다.',
      approachCandidates: [
        '구간 DP: dp[i][j] = min(dp[i][k] + dp[k+1][j] + cost) for all k',
        '브루트포스: 카탈란 수 C(n-1)가지 순서 — 지수적 증가',
      ],
      whyThisApproach:
        '구간 DP의 전형적 패턴이다. 구간 길이 2부터 N까지 순회하며, 각 구간에서 모든 분할점을 시도해 최솟값을 구한다.',
      wrongApproaches: [
        '순서대로 곱하면 최적이 아님: ((AB)C) vs (A(BC))에서 큰 차이 발생 가능',
        '그리디로 작은 행렬 우선 곱하기 — 반례 존재',
      ],
      dataStructures: ['2D 배열 dp[N][N]', '행렬 크기 배열 r[], c[]'],
      timeComplexity: 'O(N^3)',
      pitfalls: [
        'dp[i][i] = 0 (단일 행렬은 곱셈 불필요)',
        '구간 길이가 작은 것부터 채워야 부분 문제가 먼저 계산됨',
        '비용 계산: r[i] * c[k] * c[j] (행렬 i의 행 수 * 분할점 행렬의 열 수 * 행렬 j의 열 수)',
        'N = 500이면 500^3 = 1.25 * 10^8 — 제한 시간 확인 필요',
      ],
      interviewExplanation:
        '"구간 DP를 사용합니다. dp[i][j]는 행렬 i~j를 곱하는 최소 연산 수입니다. 모든 분할점 k에 대해 dp[i][j] = min(dp[i][k] + dp[k+1][j] + r[i]*c[k]*c[j])를 계산합니다. 구간 길이 2부터 N까지 순회하므로 O(N^3)입니다."',
    },
    source: { platform: 'boj' as any, id: 11049 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2342 — Dance Dance Revolution
  // ──────────────────────────────────────────────────────
  {
    id: 'b002342-boj',
    title: 'Dance Dance Revolution',
    description:
      'DDR 게임에서 발판은 가운데(0), 위(1), 왼쪽(2), 아래(3), 오른쪽(4)의 5개 위치가 있다. 두 발이 같은 위치에 올 수 없으며, 이동에는 힘이 든다.\n- 가운데에서 다른 위치: 2\n- 인접 위치로 이동: 3\n- 반대편 위치로 이동: 4\n- 같은 위치에서 다시 누르기: 1\n명령 수열이 주어졌을 때, 두 발의 최소 총 이동 비용을 구하시오.',
    constraints:
      '명령의 수는 최대 100,000\n각 명령은 1, 2, 3, 4 중 하나',
    difficulty: 'hard',
    concept_tags: ['dynamic-programming'],
    secondary_concept_tags: [],
    intent_description: '3차원 DP 상태 (현재 명령 인덱스, 왼발 위치, 오른발 위치)를 정의하고, 전이를 올바르게 구현할 수 있는지 확인하는 문제.',
    key_observation: 'dp[i][l][r] = i번째 명령까지 처리했을 때 왼발이 l, 오른발이 r에 있을 때의 최소 비용. 각 명령에서 왼발 또는 오른발을 해당 위치로 이동.',
    wrong_approaches: [
      '그리디: 항상 가까운 발을 이동 — 미래 명령까지 고려하지 못해 최적이 아님',
      '두 발 위치를 추적하지 않으면 상태 정의 불가',
    ],
    live_coding_flow: {
      firstObservation:
        '각 명령에서 왼발 또는 오른발 중 하나를 해당 위치로 이동해야 한다. 두 발의 현재 위치가 상태이므로 3D DP가 필요하다.',
      approachCandidates: [
        '3D DP: dp[i][l][r] — 상태 공간 100000 * 5 * 5 = 2,500,000',
        '메모이제이션 + 재귀',
        '그리디 — 최적이 아님',
      ],
      whyThisApproach:
        'dp[i][l][r]에서 다음 명령 target에 대해 dp[i+1][target][r] = min(dp[i][l][r] + cost(l, target))과 dp[i+1][l][target] = min(dp[i][l][r] + cost(r, target))로 전이. 상태 수가 충분히 작다.',
      wrongApproaches: [
        '가까운 발을 이동하는 그리디: 나중 명령까지 고려하면 먼 발을 먼저 보내는 게 이득일 수 있음',
        '한 발만 추적하고 다른 발 위치를 무시 — 상태 부족',
      ],
      dataStructures: ['2D 배열 dp[5][5] (현재 명령에서만 사용하므로 롤링 가능)'],
      timeComplexity: 'O(N * 25)',
      pitfalls: [
        '비용 함수 구현: 같은 위치 1, 가운데↔다른 위치 2, 인접 3, 반대 4',
        '인접/반대 판단: |a - b| == 2이면 반대, 그 외 인접',
        '두 발이 같은 위치에 올 수 없는 조건 — dp 전이 시 l != r 체크 (단, 가운데 0은 초기 위치이므로 둘 다 0에서 시작 가능)',
        '초기 상태: dp[0][0] = 0, 나머지 INF',
      ],
      interviewExplanation:
        '"dp[l][r]을 현재 왼발 l, 오른발 r일 때의 최소 비용으로 정의합니다. 각 명령에서 왼발 또는 오른발을 목표 위치로 이동하는 두 전이를 고려합니다. 상태 수는 5*5=25이고 명령 N개를 처리하므로 O(25N)입니다."',
    },
    source: { platform: 'boj' as any, id: 2342 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2098 — 외판원 순회
  // ──────────────────────────────────────────────────────
  {
    id: 'b002098-boj',
    title: '외판원 순회',
    description:
      '1번부터 N번까지의 도시가 있고, 도시 간 이동 비용이 주어진다. 한 도시에서 출발해 모든 도시를 정확히 한 번씩 방문하고 다시 출발 도시로 돌아오는 최소 비용을 구하시오. 이동 불가능한 경우 비용은 0으로 주어진다.',
    constraints:
      '2 <= N <= 16\n비용은 1,000,000 이하 양수 또는 0(이동 불가)',
    difficulty: 'hard',
    concept_tags: ['dynamic-programming', 'bitmask'],
    secondary_concept_tags: ['graph'],
    intent_description: '비트마스크 DP로 외판원 순회 문제(TSP)를 해결할 수 있는지 확인하는 문제.',
    key_observation: 'dp[visited][current] = visited 집합을 방문하고 현재 current에 있을 때의 최소 비용. visited를 비트마스크로 표현하면 상태 수는 2^N * N.',
    wrong_approaches: [
      '완전 탐색: N! = 20조(16!) — 시간 초과',
      '그리디: 가장 가까운 도시부터 방문 — 최적 보장 안 됨',
      '비트마스크 없이 방문 여부를 배열로 관리 — 상태 표현이 비효율적',
    ],
    live_coding_flow: {
      firstObservation:
        'N이 최대 16이므로 2^16 * 16 = 약 100만 상태. 비트마스크 DP로 해결 가능하다.',
      approachCandidates: [
        '비트마스크 DP: dp[mask][i] — O(2^N * N^2)',
        '완전 탐색: O(N!) — 16!은 약 2 * 10^13으로 불가능',
        '그리디 (최근접 이웃): 근사 해만 제공',
      ],
      whyThisApproach:
        'dp[mask][i] = mask에 포함된 도시들을 방문하고 현재 i에 있을 때의 최소 비용. 전이: 미방문 도시 j에 대해 dp[mask | (1<<j)][j] = min(dp[mask][i] + cost[i][j]).',
      wrongApproaches: [
        '브루트포스 순열 탐색은 16!에서 시간 초과',
        '최근접 이웃 휴리스틱은 최적이 아님',
        '시작 도시를 모든 경우에 시도 — 어느 도시에서 시작해도 순회 비용은 같으므로 0번 도시로 고정 가능',
      ],
      dataStructures: ['2D 배열 dp[1 << N][N]', '비용 행렬 cost[N][N]'],
      timeComplexity: 'O(2^N * N^2)',
      pitfalls: [
        '시작 도시로 돌아오는 비용 포함: 최종 답은 min(dp[(1<<N)-1][i] + cost[i][start])',
        'cost[i][j] == 0은 이동 불가 — 전이 시 건너뛰기',
        'dp 초기값을 INF로 설정하고, dp[1<<start][start] = 0으로 시작',
        '순회가 불가능한 경우 처리 (모든 상태가 INF인 경우)',
      ],
      interviewExplanation:
        '"비트마스크 DP를 사용합니다. dp[mask][i]는 mask에 해당하는 도시들을 방문하고 i에 있을 때의 최소 비용입니다. 미방문 도시 j에 대해 dp[mask|(1<<j)][j]를 갱신합니다. 최종 답은 모든 도시 방문 후 시작점으로 돌아오는 비용의 최솟값입니다. O(2^N * N^2)입니다."',
    },
    source: { platform: 'boj' as any, id: 2098 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1328 — 고층 빌딩
  // ──────────────────────────────────────────────────────
  {
    id: 'b001328-boj',
    title: '고층 빌딩',
    description:
      '1부터 N까지 높이가 서로 다른 빌딩 N개가 일렬로 서 있다. 왼쪽에서 보면 L개가 보이고, 오른쪽에서 보면 R개가 보이는 빌딩 배치의 수를 구하시오. 높이가 같거나 더 높은 빌딩이 앞에 있으면 뒤의 빌딩은 보이지 않는다. 답을 1,000,000,007로 나눈 나머지를 출력한다.',
    constraints:
      '1 <= N <= 100\n1 <= L, R <= N',
    difficulty: 'hard',
    concept_tags: ['dynamic-programming', 'combinatorics'],
    secondary_concept_tags: ['math'],
    intent_description: '가장 작은 빌딩부터 삽입하는 방식으로 DP 상태를 정의하는 발상을 할 수 있는지 확인하는 고난도 조합 DP 문제.',
    key_observation: '가장 작은 빌딩(높이 1)부터 하나씩 삽입한다. 높이 1 빌딩은 어디에 넣어도 다른 빌딩에 가려진다. dp[n][l][r] = n개 빌딩, 왼쪽에서 l개, 오른쪽에서 r개 보이는 배치 수.',
    wrong_approaches: [
      '가장 큰 빌딩부터 배치 — 어디에 놓느냐에 따라 양쪽 시야가 복잡하게 변함',
      '순열 전체를 생성하여 카운팅 — N!은 100!로 불가능',
      '왼쪽과 오른쪽을 독립적으로 계산 — 상호 의존적이므로 분리 불가',
    ],
    live_coding_flow: {
      firstObservation:
        '가장 작은 빌딩부터 삽입하면 기존 빌딩에 가려지므로 시야에 영향을 주지 않는다. 새 빌딩을 어디에 삽입하느냐에 따라 상태가 전이된다.',
      approachCandidates: [
        '3D DP: dp[n][l][r] — 가장 작은 빌딩부터 삽입',
        '브루트포스: 모든 순열 확인 — N=100에서 불가능',
      ],
      whyThisApproach:
        'n번째로 작은 빌딩(높이 n)을 삽입할 때:\n- 맨 왼쪽에 삽입: 가장 작은 빌딩이므로 왼쪽에서 새로 보임 → dp[n-1][l-1][r]\n- 맨 오른쪽에 삽입: 오른쪽에서 새로 보임 → dp[n-1][l][r-1]\n- 그 외 위치(n-2곳): 양쪽 모두에서 가려짐 → (n-2) * dp[n-1][l][r]',
      wrongApproaches: [
        '큰 빌딩부터 배치하면 작은 빌딩이 보이는지 판단이 어려움',
        '양쪽 시야를 독립적으로 계산하면 가운데 빌딩들의 상호 영향을 놓침',
      ],
      dataStructures: ['3D 배열 dp[101][101][101] — 공간이 약 10^6'],
      timeComplexity: 'O(N^2 * L * R) 또는 O(N * L * R)',
      pitfalls: [
        '기저 조건: dp[1][1][1] = 1 (빌딩 1개는 양쪽에서 1개씩 보임)',
        '삽입 위치의 개수: 맨 왼쪽 1곳, 맨 오른쪽 1곳, 나머지 (n-2)곳',
        '점화식: dp[n][l][r] = dp[n-1][l-1][r] + dp[n-1][l][r-1] + (n-2) * dp[n-1][l][r]',
        '모듈러 연산 주의: (n-2) * dp 값에서 오버플로우 가능',
      ],
      interviewExplanation:
        '"가장 작은 빌딩부터 삽입합니다. 높이 1 빌딩은 어디에 넣어도 가려지므로 기존 시야에 영향이 없습니다. n번째 빌딩을 맨 왼쪽에 넣으면 왼쪽 보이는 수 +1, 맨 오른쪽이면 오른쪽 +1, 나머지 (n-2)곳이면 변화 없습니다. dp[n][l][r] = dp[n-1][l-1][r] + dp[n-1][l][r-1] + (n-2)*dp[n-1][l][r]입니다."',
    },
    source: { platform: 'boj' as any, id: 1328 },
  },
];
