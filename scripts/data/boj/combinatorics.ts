import type { ProblemSeed } from '../problems';

export const BOJ_COMBINATORICS: ProblemSeed[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1010 — 다리 놓기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001010-boj',
    title: '다리 놓기',
    description:
      '재원이는 한 도시의 서쪽과 동쪽에 있는 사이트들을 다리로 연결하려고 한다. 서쪽에 N개, 동쪽에 M개의 사이트가 있을 때 (N <= M), 서쪽의 N개 사이트를 동쪽의 M개 사이트 중 N개에 각각 연결해야 한다. 다리끼리 겹치면 안 되므로, 연결 순서가 자동으로 결정된다. 가능한 다리 건설 경우의 수를 구하시오.',
    constraints:
      '테스트 케이스 T (1 <= T <= 30)\n0 < N <= M < 30',
    difficulty: 'easy',
    concept_tags: ['combinatorics', 'math'],
    secondary_concept_tags: ['dynamic-programming'],
    intent_description: '조합(Combination) 공식 C(M, N)을 도출하고 구현할 수 있는지 확인하는 문제.',
    key_observation: '다리가 겹치지 않으려면 동쪽 사이트를 오름차순으로 선택해야 하므로, 결국 M개 중 N개를 고르는 조합 C(M, N)이다.',
    wrong_approaches: [
      '순열로 계산 — 순서가 이미 고정되므로 조합이 맞음',
      '재귀로 C(M, N) 계산 시 메모이제이션 없이 구현 — 중복 연산으로 느림',
    ],
    live_coding_flow: {
      firstObservation:
        '다리가 교차하지 않는다는 조건은 동쪽 사이트를 오름차순으로 선택하는 것과 동치다. 즉 M개 중 N개를 선택하는 조합 문제다.',
      approachCandidates: [
        'C(M, N) = M! / (N! * (M-N)!) 직접 계산',
        '파스칼 삼각형 DP: C(n, r) = C(n-1, r-1) + C(n-1, r)',
        '재귀 + 메모이제이션으로 조합 계산',
      ],
      whyThisApproach:
        '파스칼 삼각형 DP가 가장 안전하다. 팩토리얼 직접 계산은 오버플로우 위험이 있고, DP는 정수 범위 내에서 정확하게 계산 가능하다.',
      wrongApproaches: [
        '팩토리얼을 직접 계산하면 30!이 long long 범위를 초과 — 나눗셈 순서를 잘못하면 오버플로우',
        '순열 P(M, N)을 구하면 순서를 고려한 값이므로 오답',
      ],
      dataStructures: ['2D DP 테이블 dp[n][r] = C(n, r)'],
      timeComplexity: 'O(M * N)',
      pitfalls: [
        'C(n, 0) = C(n, n) = 1 기저 조건 설정',
        'M, N 범위가 30 미만이라 int로 충분하지만, 곱셈 과정에서 임시 오버플로우 주의',
        '테스트 케이스마다 초기화하거나, 한 번에 DP 테이블 전체를 미리 구축',
      ],
      interviewExplanation:
        '"다리가 교차하지 않으려면 동쪽 사이트를 오름차순으로 골라야 합니다. 이는 M개 중 N개를 선택하는 조합 C(M, N)입니다. 파스칼 삼각형 점화식 C(n, r) = C(n-1, r-1) + C(n-1, r)로 DP 테이블을 채우면 O(M*N)에 구할 수 있습니다."',
    },
    source: { platform: 'boj' as any, id: 1010 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11050 — 이항 계수 1
  // ──────────────────────────────────────────────────────
  {
    id: 'b011050-boj',
    title: '이항 계수 1',
    description:
      '자연수 N과 정수 K가 주어졌을 때, 이항 계수 C(N, K)를 구하시오.',
    constraints:
      '1 <= N <= 10\n0 <= K <= N',
    difficulty: 'easy',
    concept_tags: ['combinatorics', 'math'],
    secondary_concept_tags: [],
    intent_description: '이항 계수의 정의와 기본 계산 방법을 알고 있는지 확인하는 문제.',
    key_observation: 'N이 최대 10으로 매우 작으므로 팩토리얼 직접 계산, 파스칼 삼각형, 재귀 등 어떤 방법이든 가능하다.',
    wrong_approaches: [
      'K > N인 경우 처리 누락 — 문제 조건상 K <= N이지만 방어적으로 체크하는 것이 좋음',
      '오버플로우 걱정 — N <= 10이므로 10! = 3628800, int로 충분',
    ],
    live_coding_flow: {
      firstObservation:
        'N이 최대 10이므로 어떤 방법이든 시간 내에 해결 가능하다. 가장 직관적인 방법을 사용하면 된다.',
      approachCandidates: [
        '팩토리얼 공식: N! / (K! * (N-K)!)',
        '파스칼 삼각형 DP',
        '반복문으로 C(N, K) = N*(N-1)*...*(N-K+1) / K!',
      ],
      whyThisApproach:
        'N이 10 이하이므로 팩토리얼을 직접 계산해도 오버플로우 없이 안전하다. 가장 간단한 공식을 사용한다.',
      wrongApproaches: [
        '불필요하게 복잡한 모듈러 연산 도입 — 이 문제에서는 필요 없음',
        '큰 수 처리 라이브러리 사용 — 과도한 구현',
      ],
      dataStructures: ['팩토리얼 함수 또는 반복문'],
      timeComplexity: 'O(N)',
      pitfalls: [
        '정수 나눗셈 순서: 분자를 먼저 계산하고 분모로 나누면 정확히 나눠 떨어짐',
        'K = 0인 경우 C(N, 0) = 1 처리',
      ],
      interviewExplanation:
        '"N이 최대 10이므로 팩토리얼을 직접 계산해 C(N, K) = N! / (K! * (N-K)!)로 구합니다. 오버플로우 걱정 없이 O(N)에 해결됩니다."',
    },
    source: { platform: 'boj' as any, id: 11050 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11051 — 이항 계수 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b011051-boj',
    title: '이항 계수 2',
    description:
      '자연수 N과 정수 K가 주어졌을 때, 이항 계수 C(N, K)를 10007로 나눈 나머지를 구하시오.',
    constraints:
      '1 <= N <= 1000\n0 <= K <= N',
    difficulty: 'easy',
    concept_tags: ['combinatorics', 'math', 'dynamic-programming'],
    secondary_concept_tags: ['modular-arithmetic'],
    intent_description: '파스칼 삼각형 DP와 모듈러 연산을 조합해 이항 계수를 구할 수 있는지 확인하는 문제.',
    key_observation: 'N이 최대 1000이므로 팩토리얼 직접 계산은 오버플로우 위험. 파스칼 삼각형 점화식에 모듈러를 적용하면 안전하다.',
    wrong_approaches: [
      '팩토리얼을 직접 계산 후 나눗셈 — 모듈러 나눗셈은 곱셈 역원이 필요해 복잡',
      '모듈러 없이 파스칼 삼각형 — 중간값이 매우 커짐',
    ],
    live_coding_flow: {
      firstObservation:
        'N이 최대 1000이라 C(1000, 500)은 매우 큰 수. 모듈러 연산이 필요하다. 파스칼 삼각형 점화식은 덧셈만 사용하므로 모듈러 적용이 쉽다.',
      approachCandidates: [
        '파스칼 삼각형 DP + 모듈러: C(n, r) = (C(n-1, r-1) + C(n-1, r)) % MOD',
        '팩토리얼 + 모듈러 역원 (페르마 소정리): N!/(K!(N-K)!) mod p',
        '루카스 정리 — 이 범위에서는 불필요',
      ],
      whyThisApproach:
        '파스칼 삼각형 DP가 가장 직관적이고 구현이 간단하다. 점화식이 덧셈이므로 매 단계 mod를 취하면 된다.',
      wrongApproaches: [
        '팩토리얼 직접 나눗셈은 모듈러 환경에서 부정확 — 곱셈 역원 필요',
        '모듈러를 마지막에만 적용 — 중간 과정에서 오버플로우 발생',
      ],
      dataStructures: ['2D 배열 dp[1001][1001] 또는 1D 배열로 공간 최적화'],
      timeComplexity: 'O(N * K)',
      pitfalls: [
        '기저 조건: dp[i][0] = dp[i][i] = 1',
        '매 덧셈마다 mod 연산 적용',
        '1D 배열 최적화 시 역순으로 갱신해야 이전 행 값을 덮어쓰지 않음',
      ],
      interviewExplanation:
        '"파스칼 삼각형 점화식 C(n, r) = C(n-1, r-1) + C(n-1, r)을 사용합니다. 각 단계에서 10007로 나눈 나머지를 저장하면 오버플로우 없이 O(N*K)에 해결됩니다."',
    },
    source: { platform: 'boj' as any, id: 11051 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1256 — 사전
  // ──────────────────────────────────────────────────────
  {
    id: 'b001256-boj',
    title: '사전',
    description:
      '\'a\'와 \'z\'로만 이루어진 문자열 중, \'a\'를 N개, \'z\'를 M개 사용하여 만들 수 있는 모든 문자열을 사전순으로 나열했을 때, K번째 문자열을 구하시오. 사전에 수록된 문자열의 수가 K보다 작으면 -1을 출력한다.',
    constraints:
      '1 <= N, M <= 100\n1 <= K <= 1,000,000,000',
    difficulty: 'medium',
    concept_tags: ['combinatorics', 'math'],
    secondary_concept_tags: ['dynamic-programming', 'greedy'],
    intent_description: '조합론적 순서(combinatorial number system)를 이해하고, K번째 사전순 문자열을 직접 구성할 수 있는지 확인하는 문제.',
    key_observation: '현재 위치에 \'a\'를 놓으면 뒤에 남은 문자들로 만들 수 있는 문자열 수는 C(남은 a + 남은 z - 1, 남은 z)이다. 이 값이 K 이상이면 \'a\'를 놓고, 아니면 K에서 빼고 \'z\'를 놓는다.',
    wrong_approaches: [
      '모든 문자열을 생성 후 K번째 선택 — C(200, 100)은 천문학적 수',
      'K를 이진수로 변환 — 조합 구조와 이진 구조는 다름',
    ],
    live_coding_flow: {
      firstObservation:
        '총 (N+M)! / (N! * M!) = C(N+M, N)개의 문자열이 존재한다. 앞에서부터 한 글자씩 결정하되, 현재 \'a\'를 놓았을 때 남는 경우의 수와 K를 비교하며 그리디하게 선택한다.',
      approachCandidates: [
        '그리디 + 조합: 각 위치에서 \'a\'를 놓았을 때의 경우의 수로 K 비교',
        '전체 생성 후 정렬 — 불가능한 수준의 크기',
      ],
      whyThisApproach:
        '각 위치에서 \'a\'를 놓으면 나머지 위치의 경우의 수는 C(남은 길이 - 1, 남은 z)이다. 이 값이 K 이상이면 \'a\', 아니면 K에서 빼고 \'z\'를 선택한다.',
      wrongApproaches: [
        '전체 문자열 생성은 C(200, 100)개로 물리적으로 불가능',
        'C(N+M, N)의 정확한 값 계산 시 오버플로우 — K의 최댓값 10^9로 클램핑 필요',
      ],
      dataStructures: ['2D 조합 테이블 C[n][r]'],
      timeComplexity: 'O(N + M)',
      pitfalls: [
        'C(N+M, N)이 10^9를 초과하면 K보다 크다고 판단하고 진행 — 오버플로우 방지를 위해 min(C값, 10^9+1)로 클램핑',
        'N = 0 또는 M = 0인 경우 한 가지 문자열만 존재',
        '총 경우의 수 < K이면 -1 출력',
      ],
      interviewExplanation:
        '"앞에서부터 한 글자씩 결정합니다. 현재 위치에 \'a\'를 놓으면 남은 문자들로 만들 수 있는 경우의 수 cnt = C(남은 a + 남은 z - 1, 남은 z)를 구합니다. cnt >= K이면 \'a\'를 놓고, 아니면 K -= cnt 후 \'z\'를 놓습니다. 조합 테이블은 파스칼 삼각형으로 O((N+M)^2)에 전처리합니다."',
    },
    source: { platform: 'boj' as any, id: 1256 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1722 — 순열의 순서
  // ──────────────────────────────────────────────────────
  {
    id: 'b001722-boj',
    title: '순열의 순서',
    description:
      '1부터 N까지의 수로 이루어진 순열이 사전순으로 나열되어 있다. 두 가지 질문에 답하시오:\n1) K가 주어지면 K번째 순열을 구하시오.\n2) 순열이 주어지면 그것이 몇 번째 순열인지 구하시오.',
    constraints:
      '1 <= N <= 20\n소문제 1: 1 <= K <= N!\n소문제 2: 유효한 순열이 주어짐',
    difficulty: 'medium',
    concept_tags: ['combinatorics', 'math'],
    secondary_concept_tags: ['greedy'],
    intent_description: '팩토리얼 수 체계(factoradic)를 이해하고, 순열의 순서를 계산하거나 K번째 순열을 복원할 수 있는지 확인하는 문제.',
    key_observation: '첫 번째 위치에 i번째로 작은 수를 놓으면 그 앞에 i * (N-1)!개의 순열이 있다. 이를 반복하면 K번째 순열을 구성하거나, 주어진 순열의 순서를 계산할 수 있다.',
    wrong_approaches: [
      '모든 순열 생성 후 K번째 선택 — 20! ≈ 2.4 * 10^18로 불가능',
      'next_permutation을 K번 호출 — 시간 초과',
    ],
    live_coding_flow: {
      firstObservation:
        'N자리 순열에서 첫 자리를 고정하면 나머지 (N-1)!개의 순열이 존재한다. K를 (N-1)!로 나누면 첫 자리를 결정할 수 있고, 나머지로 다음 자리를 재귀적으로 결정한다.',
      approachCandidates: [
        '팩토리얼 수 체계: K를 (N-1)!, (N-2)!, ... 로 나누며 각 자리 결정',
        '모든 순열 생성 — N=20에서 불가능',
        'next_permutation 반복 — 최대 20!번 불가능',
      ],
      whyThisApproach:
        '팩토리얼 수 체계를 사용하면 O(N^2)에 K번째 순열을 직접 구성할 수 있다. 역방향도 동일한 원리로 순서를 계산한다.',
      wrongApproaches: [
        '순열 전체 생성은 20! ≈ 2.4 * 10^18 — 물리적으로 불가능',
        'next_permutation은 K가 최대 N!이므로 시간 초과',
      ],
      dataStructures: ['팩토리얼 배열 fact[0..20]', '사용 가능한 숫자 리스트'],
      timeComplexity: 'O(N^2)',
      pitfalls: [
        'K를 0-indexed로 변환: K -= 1 후 계산',
        '20! ≈ 2.4 * 10^18 → long long 필수',
        '사용한 숫자를 리스트에서 제거할 때 인덱스 관리 주의',
      ],
      interviewExplanation:
        '"K번째 순열 구하기: K를 0-indexed로 바꾼 후, 남은 수 목록에서 K / (남은 수 - 1)! 번째 수를 선택하고, K %= (남은 수 - 1)!로 갱신합니다. 순서 구하기: 각 위치에서 현재 수보다 작은 미사용 수의 개수 * (남은 자리)!을 합산합니다. O(N^2)입니다."',
    },
    source: { platform: 'boj' as any, id: 1722 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1947 — 선물 전달
  // ──────────────────────────────────────────────────────
  {
    id: 'b001947-boj',
    title: '선물 전달',
    description:
      'N명이 선물 교환을 한다. 각 사람은 정확히 한 명에게 선물을 주고 한 명에게서 받되, 자기 자신에게는 줄 수 없다. 가능한 선물 전달 방법의 수를 1,000,000,000으로 나눈 나머지를 구하시오.',
    constraints:
      '1 <= N <= 1,000,000',
    difficulty: 'medium',
    concept_tags: ['combinatorics', 'math'],
    secondary_concept_tags: ['dynamic-programming'],
    intent_description: '완전 순열(교란, Derangement)의 점화식을 알고 모듈러 환경에서 계산할 수 있는지 확인하는 문제.',
    key_observation: '자기 자신에게 선물을 줄 수 없는 순열 = 교란(Derangement). D(n) = (n-1) * (D(n-1) + D(n-2)).',
    wrong_approaches: [
      '전체 순열 N!에서 자기 자신을 포함하는 경우를 단순 빼기 — 포함-배제 없이는 정확하지 않음',
      '재귀만으로 D(10^6) 계산 — 스택 오버플로우',
    ],
    live_coding_flow: {
      firstObservation:
        '이 문제는 교란(Derangement) 수를 구하는 문제다. 모든 원소가 자기 위치에 오지 않는 순열의 수이다.',
      approachCandidates: [
        '교란 점화식: D(n) = (n-1) * (D(n-1) + D(n-2))',
        '포함-배제 원리: D(n) = N! * sum((-1)^k / k!)',
        '점화식을 반복문으로 O(N) 계산',
      ],
      whyThisApproach:
        '점화식 D(n) = (n-1) * (D(n-1) + D(n-2))을 반복문으로 계산하면 O(N) 시간, O(1) 공간으로 해결 가능하다.',
      wrongApproaches: [
        'N!을 먼저 구하고 빼는 방식은 포함-배제가 필요해 구현이 복잡',
        '재귀는 N=10^6에서 스택 오버플로우',
      ],
      dataStructures: ['변수 2개: D(n-1), D(n-2)를 롤링'],
      timeComplexity: 'O(N)',
      pitfalls: [
        'D(1) = 0, D(2) = 1 기저 조건',
        '(n-1) * (D(n-1) + D(n-2))에서 곱셈 오버플로우 — long long 사용 후 mod',
        'N = 1이면 답 0, N = 2이면 답 1 — 엣지 케이스 확인',
      ],
      interviewExplanation:
        '"교란(Derangement) 문제입니다. 점화식 D(n) = (n-1) * (D(n-1) + D(n-2))을 사용합니다. D(1) = 0, D(2) = 1에서 시작해 반복문으로 N까지 계산하면 O(N)입니다. 각 단계에서 10^9으로 모듈러를 적용합니다."',
    },
    source: { platform: 'boj' as any, id: 1947 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2775 — 부녀회장이 될테야
  // ──────────────────────────────────────────────────────
  {
    id: 'b002775-boj',
    title: '부녀회장이 될테야',
    description:
      '아파트에 거주하는 사람의 수를 구한다. 이 아파트에는 0층부터 시작하여 각 층에 1호부터 N호까지 있다. 0층의 i호에는 i명이 살고 있다. 각 층의 a호에는 자기 아래층의 1호부터 a호까지 사는 사람 수의 합만큼 사람이 산다. k층 n호에 사는 사람의 수를 구하시오.',
    constraints:
      '테스트 케이스 T\n1 <= k <= 14\n1 <= n <= 14',
    difficulty: 'easy',
    concept_tags: ['combinatorics', 'dynamic-programming'],
    secondary_concept_tags: ['math'],
    intent_description: '2차원 누적합 패턴의 DP를 세울 수 있는지, 또는 조합론적 해석(C(k+n-1, n-1))을 도출할 수 있는지 확인하는 문제.',
    key_observation: 'f(k, n) = sum(f(k-1, 1) ... f(k-1, n)). 이를 전개하면 f(k, n) = C(k+n-1, n-1) = C(k+n-1, k)임을 알 수 있다.',
    wrong_approaches: [
      '재귀만 사용 — k, n이 작아서 통과하지만 최적은 아님',
      '점화식 없이 수학적 패턴만 관찰 — 정확한 공식 도출 실패 가능',
    ],
    live_coding_flow: {
      firstObservation:
        '0층의 i호에는 i명이 살고, k층 n호에는 (k-1)층 1~n호 합이다. 2차원 테이블을 채우는 DP 문제다.',
      approachCandidates: [
        '2D DP 테이블: dp[k][n] = sum(dp[k-1][1..n])',
        '누적합 활용: dp[k][n] = dp[k][n-1] + dp[k-1][n]',
        '조합론: f(k, n) = C(k+n-1, k)',
      ],
      whyThisApproach:
        '누적합 관계를 이용하면 dp[k][n] = dp[k][n-1] + dp[k-1][n]으로 O(1)에 각 칸을 채울 수 있다. 또는 C(k+n-1, k)로 직접 계산해도 된다.',
      wrongApproaches: [
        '매번 1~n까지 합을 구하면 O(k * n^2) — 비효율적 (이 문제에서는 통과하지만)',
        '0층 기저를 1부터 시작하지 않으면 오답',
      ],
      dataStructures: ['2D 배열 dp[15][15]'],
      timeComplexity: 'O(k * n)',
      pitfalls: [
        '0층 초기화: dp[0][i] = i',
        '호수는 1부터 시작 — 0호는 없음',
        '테스트 케이스마다 새로 계산하거나, 전체 테이블을 한 번만 구축',
      ],
      interviewExplanation:
        '"0층의 i호에 i명이 살고, 각 층은 아래층의 누적합입니다. dp[k][n] = dp[k][n-1] + dp[k-1][n]으로 채우면 O(k*n)입니다. 수학적으로는 C(k+n-1, k)와 같습니다."',
    },
    source: { platform: 'boj' as any, id: 2775 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 13251 — 조약돌 꺼내기
  // ──────────────────────────────────────────────────────
  {
    id: 'b013251-boj',
    title: '조약돌 꺼내기',
    description:
      'M가지 색상의 조약돌이 주머니에 들어 있다. 각 색상별 개수가 주어진다. 주머니에서 K개의 조약돌을 뽑을 때, K개가 모두 같은 색일 확률을 구하시오.',
    constraints:
      '1 <= M <= 50\n각 색상 개수 합 <= 1000\n1 <= K <= 각 색상 개수 합',
    difficulty: 'easy',
    concept_tags: ['combinatorics', 'math', 'probability'],
    secondary_concept_tags: [],
    intent_description: '확률의 기본 계산과 조합을 활용하여 조건부 확률 문제를 풀 수 있는지 확인하는 문제.',
    key_observation: '각 색상 i에 대해 C(count_i, K) / C(total, K)를 합산하면 된다. 또는 분자/분모를 하나씩 곱하며 실수 확률로 직접 계산할 수 있다.',
    wrong_approaches: [
      'C(1000, K)를 정수로 정확히 계산하려면 큰 수 처리 필요 — 실수로 확률을 직접 계산하는 것이 간편',
      '복원 추출로 계산 — 비복원 추출임에 주의',
    ],
    live_coding_flow: {
      firstObservation:
        '모두 같은 색일 확률 = 각 색상 i에 대해 "i색 K개를 모두 고를 확률"의 합이다. 사건들이 상호 배타적이므로 단순 합산이 가능하다.',
      approachCandidates: [
        '조합으로 계산: sum(C(count_i, K)) / C(total, K)',
        '확률 직접 곱: 각 색상 i에 대해 (count_i/total) * ((count_i-1)/(total-1)) * ... K번',
      ],
      whyThisApproach:
        '실수 확률을 직접 곱하는 방식이 구현이 간단하고 큰 수 처리가 필요 없다. 각 색상별로 K번 곱한 후 합산한다.',
      wrongApproaches: [
        '조합을 정수로 계산하면 C(1000, 500) 같은 큰 수 발생',
        '복원 추출로 계산하면 오답 — 한 번 뽑으면 돌려놓지 않음',
      ],
      dataStructures: ['double 변수로 확률 누적'],
      timeComplexity: 'O(M * K)',
      pitfalls: [
        'count_i < K인 색상은 확률 0 — 건너뛰기',
        '부동소수점 정밀도: 곱셈 순서에 따라 오차 발생 가능하지만, 이 범위에서는 double로 충분',
        '출력 포맷: 소수점 이하 충분한 자릿수',
      ],
      interviewExplanation:
        '"각 색상별로 K개 모두 그 색일 확률을 구해 합산합니다. i색 확률은 (c_i / total) * ((c_i-1) / (total-1)) * ... K번입니다. 사건이 상호 배타적이므로 단순 합산하면 됩니다. O(M*K)입니다."',
    },
    source: { platform: 'boj' as any, id: 13251 },
  },
];
