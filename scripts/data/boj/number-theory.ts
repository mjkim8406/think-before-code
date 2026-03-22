import type { ProblemSeed } from '../problems';

export const BOJ_NUMBER_THEORY: ProblemSeed[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1929 — 소수 구하기
  // ──────────────────────────────────────────────────────
  {
    id: 'b001929-boj',
    title: '소수 구하기',
    description:
      'M이상 N이하의 소수를 모두 구하는 프로그램을 작성하시오.',
    constraints:
      '1 <= M <= N <= 1,000,000',
    difficulty: 'easy',
    concept_tags: ['number-theory', 'sieve'],
    secondary_concept_tags: ['math'],
    intent_description: '에라토스테네스의 체를 구현하여 범위 내 소수를 효율적으로 구할 수 있는지 확인.',
    key_observation: '에라토스테네스의 체로 1~N까지의 소수를 O(N log log N)에 구한 뒤 M 이상만 출력하면 된다.',
    wrong_approaches: [
      '각 수마다 2부터 n-1까지 나눠보기 -- O(N * N)으로 시간 초과',
      '각 수마다 sqrt(n)까지 나눠보기 -- O(N * sqrt(N))으로 가능하지만 체보다 느림',
    ],
    live_coding_flow: {
      firstObservation:
        '범위가 최대 100만이므로 에라토스테네스의 체로 전처리하면 효율적이다. 체는 O(N log log N)으로 거의 선형이다.',
      approachCandidates: [
        '각 수마다 소수 판별: O(N * sqrt(N))',
        '에라토스테네스의 체: O(N log log N) (추천)',
      ],
      whyThisApproach:
        '체를 사용하면 boolean 배열 하나로 1~N까지의 소수 여부를 모두 판별할 수 있다. 2부터 시작하여 소수의 배수를 제거하는 방식이다.',
      wrongApproaches: [
        '단순 반복 나눗셈은 N=10^6에서 너무 느림',
        '1을 소수로 포함하면 오답',
      ],
      dataStructures: ['boolean 배열 isPrime[N+1]'],
      timeComplexity: 'O(N log log N)',
      pitfalls: [
        '0과 1은 소수가 아님 -- isPrime[0] = isPrime[1] = false',
        'i*i가 int 범위를 초과할 수 있으므로 long으로 비교하거나 i <= sqrt(N)으로 체크',
        '체에서 i의 배수를 지울 때 i*i부터 시작하면 최적화 가능 (i*2, i*3, ...는 이미 처리됨)',
      ],
      interviewExplanation:
        '"에라토스테네스의 체를 사용합니다. 크기 N+1인 boolean 배열을 true로 초기화하고, 2부터 sqrt(N)까지 순회하며 소수의 배수를 false로 표시합니다. 그 후 M부터 N까지 true인 인덱스를 출력합니다. 시간복잡도 O(N log log N), 공간 O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 1929 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1934 — 최소공배수
  // ──────────────────────────────────────────────────────
  {
    id: 'b001934-boj',
    title: '최소공배수',
    description:
      '두 자연수 A와 B가 주어졌을 때, A와 B의 최소공배수를 구하는 프로그램을 작성하시오.',
    constraints:
      '테스트 케이스 수 T <= 1000\n1 <= A, B <= 45,000',
    difficulty: 'easy',
    concept_tags: ['number-theory', 'math'],
    secondary_concept_tags: ['gcd', 'euclidean-algorithm'],
    intent_description: '유클리드 호제법으로 GCD를 구하고, LCM = A * B / GCD 공식을 적용할 수 있는지 확인.',
    key_observation: 'LCM(A, B) = A * B / GCD(A, B). GCD는 유클리드 호제법으로 O(log(min(A,B)))에 구할 수 있다.',
    wrong_approaches: [
      'A의 배수를 하나씩 늘려가며 B로 나눠지는지 확인 -- O(B)로 비효율',
      '소인수분해로 LCM 구하기 -- 가능하지만 불필요하게 복잡',
    ],
    live_coding_flow: {
      firstObservation:
        'LCM(A, B) = A * B / GCD(A, B)이다. GCD를 구하면 LCM은 바로 계산된다. GCD는 유클리드 호제법(gcd(a, b) = gcd(b, a%b))으로 효율적으로 구할 수 있다.',
      approachCandidates: [
        'A의 배수 열거: O(B)',
        '유클리드 호제법 + LCM 공식: O(log(min(A,B)))',
      ],
      whyThisApproach:
        '유클리드 호제법은 O(log(min(A,B)))으로 매우 빠르다. gcd(a, 0) = a를 기저 조건으로, gcd(a, b) = gcd(b, a % b)를 반복하면 된다.',
      wrongApproaches: [
        '배수 열거는 A, B가 서로소일 때 최대 O(min(A,B))번 반복',
        '소인수분해는 구현이 복잡하고 불필요',
      ],
      dataStructures: ['없음 (재귀 또는 반복문)'],
      timeComplexity: 'O(T * log(min(A,B)))',
      pitfalls: [
        'A * B가 int 범위를 초과할 수 있음: 45000 * 45000 = 2 * 10^9 -> int 경계. long 사용 권장',
        'A * B / GCD에서 나눗셈을 먼저 하면 오버플로우 방지: A / GCD * B',
        'GCD(0, n) = n 처리 확인',
      ],
      interviewExplanation:
        '"유클리드 호제법으로 GCD를 구한 뒤 LCM = A / GCD * B로 계산합니다. 유클리드 호제법은 gcd(a, b) = gcd(b, a%b)를 b가 0이 될 때까지 반복하며, O(log(min(A,B)))입니다. 오버플로우 방지를 위해 A/GCD를 먼저 계산합니다."',
    },
    source: { platform: 'boj' as any, id: 1934 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1850 — 최대공약수
  // ──────────────────────────────────────────────────────
  {
    id: 'b001850-boj',
    title: '최대공약수',
    description:
      '모든 자리가 1로만 이루어져있는 두 자연수 A와 B가 주어진다. 이때 A와 B의 최대공약수를 구하시오.\n\n예를 들어 A가 111이고 B가 11이면 GCD는 1이다. A가 111111이고 B가 1111이면 GCD는 11이다.\n\nA, B는 1이 연속된 횟수로 주어진다.',
    constraints:
      '1 <= A, B <= 2^63 - 1 (unsigned 64-bit)',
    difficulty: 'easy',
    concept_tags: ['number-theory', 'math'],
    secondary_concept_tags: ['gcd', 'euclidean-algorithm'],
    intent_description: 'R(n) = 111...1 (n개)에 대해 GCD(R(a), R(b)) = R(GCD(a, b))라는 수학적 성질을 발견할 수 있는지 확인.',
    key_observation: '1이 n개인 수를 R(n)이라 하면, GCD(R(a), R(b)) = R(GCD(a, b)). 따라서 두 수의 1의 개수에 대해 GCD를 구하면 답이다.',
    wrong_approaches: [
      '실제로 큰 수를 만들어서 GCD 계산 -- 수가 2^63자리까지 가능하므로 불가',
      '문자열로 큰 수 처리 -- 불필요하게 복잡',
    ],
    live_coding_flow: {
      firstObservation:
        '1이 a개인 수와 1이 b개인 수의 GCD를 구해야 한다. R(n) = (10^n - 1) / 9이므로 직접 계산은 불가능하다. 핵심 성질: GCD(R(a), R(b)) = R(GCD(a, b)).',
      approachCandidates: [
        '직접 큰 수 GCD 계산 -- 불가능 (수가 너무 큼)',
        'GCD(R(a), R(b)) = R(GCD(a, b)) 성질 이용 (추천)',
      ],
      whyThisApproach:
        'a와 b의 GCD를 유클리드 호제법으로 구한 뒤, 그 수만큼 1을 출력하면 된다. 증명: R(a) = R(b) * 10^(a-b) + R(a-b) (a > b)이므로 유클리드 호제법과 동일한 구조.',
      wrongApproaches: [
        'R(a)를 실제로 구하려 하면 2^63자리 수가 되어 메모리와 시간 모두 불가',
        '소인수분해는 수가 너무 커서 불가',
      ],
      dataStructures: ['long long 변수 2개'],
      timeComplexity: 'O(log(min(A,B)))',
      pitfalls: [
        'A, B가 unsigned 64-bit이므로 언어에 따라 unsigned long long 또는 BigInteger 사용',
        '출력 시 GCD(a,b)개의 1을 출력해야 함 -- GCD가 매우 클 수 있으므로 반복 출력 또는 StringBuilder 사용',
        'GCD 함수에서 0 처리: gcd(n, 0) = n',
      ],
      interviewExplanation:
        '"1이 n개인 수 R(n)에 대해 GCD(R(a), R(b)) = R(GCD(a, b))라는 성질을 이용합니다. 유클리드 호제법으로 a와 b의 GCD g를 구한 뒤 1을 g번 출력하면 됩니다. 시간복잡도는 유클리드 호제법의 O(log(min(A,B)))이며, 출력은 O(g)입니다."',
    },
    source: { platform: 'boj' as any, id: 1850 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1456 — 거의 소수
  // ──────────────────────────────────────────────────────
  {
    id: 'b001456-boj',
    title: '거의 소수',
    description:
      '어떤 수가 "거의 소수"이면, 그 수는 소수의 N제곱(N >= 2) 꼴이다. 예를 들어 4 = 2^2, 8 = 2^3, 9 = 3^2, 25 = 5^2, 27 = 3^3 등이 거의 소수이다.\n\nA이상 B이하인 수 중에서 거의 소수가 몇 개인지 구하시오.',
    constraints:
      '1 <= A <= B <= 10^14',
    difficulty: 'medium',
    concept_tags: ['number-theory', 'sieve'],
    secondary_concept_tags: ['math'],
    intent_description: 'B <= 10^14이므로 소수 p에 대해 p^2 <= B를 만족하는 p <= sqrt(B) = 10^7까지 체로 구하고, 각 소수의 거듭제곱을 카운트할 수 있는지 확인.',
    key_observation: 'p^2 <= B를 만족하는 소수 p만 고려하면 된다. p <= sqrt(10^14) = 10^7이므로 에라토스테네스의 체로 구할 수 있다.',
    wrong_approaches: [
      'A부터 B까지 모든 수를 소인수분해 -- B가 10^14이므로 불가',
      '모든 소수를 10^14까지 구하기 -- 메모리 초과',
    ],
    live_coding_flow: {
      firstObservation:
        '거의 소수 = p^k (k >= 2, p는 소수). p^2 <= B이므로 p <= sqrt(B) ~ 10^7. 에라토스테네스의 체로 10^7 이하의 소수를 구한 뒤, 각 소수 p에 대해 p^2, p^3, ... 중 [A, B] 범위에 있는 수를 카운트한다.',
      approachCandidates: [
        '범위 내 모든 수를 소인수분해: O((B-A) * sqrt(B)) -- 불가',
        '체 + 소수 거듭제곱 열거: O(sqrt(B) log log sqrt(B)) (추천)',
      ],
      whyThisApproach:
        'sqrt(B) = 10^7까지의 소수를 체로 구하고, 각 소수 p에 대해 p*p, p*p*p, ...을 계산하여 [A, B] 범위에 있으면 카운트를 증가시킨다.',
      wrongApproaches: [
        'B까지의 소수를 모두 구하면 메모리 초과',
        '각 수를 소인수분해하면 시간 초과',
      ],
      dataStructures: ['에라토스테네스의 체 (sqrt(B) 크기)', '카운터'],
      timeComplexity: 'O(sqrt(B) * log(log(sqrt(B)))) + O(소수 개수 * log_p(B))',
      pitfalls: [
        'p^k 계산 시 오버플로우: p*p가 long long 범위를 초과할 수 있으므로 곱하기 전에 B/p >= current 체크',
        '체의 크기가 10^7이므로 메모리 주의 (약 10MB)',
        'A = 1일 때 1은 거의 소수가 아님',
        'p^k를 long long으로 관리하고, 곱셈 오버플로우를 방지하기 위해 나눗셈으로 상한 체크',
      ],
      interviewExplanation:
        '"sqrt(B) = 10^7까지의 소수를 에라토스테네스의 체로 구합니다. 각 소수 p에 대해 cur = p*p에서 시작하여 cur이 B 이하인 동안 [A, B] 범위에 있으면 카운트하고, cur *= p로 갱신합니다. 오버플로우 방지를 위해 cur <= B/p를 확인한 후 곱합니다. 시간복잡도는 체 구성 O(sqrt(B) log log sqrt(B))가 지배적입니다."',
    },
    source: { platform: 'boj' as any, id: 1456 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1747 — 소수&팰린드롬
  // ──────────────────────────────────────────────────────
  {
    id: 'b001747-boj',
    title: '소수&팰린드롬',
    description:
      '어떤 수와 그 수의 숫자 순서를 뒤집은 수가 일치하는 수를 팰린드롬이라 부른다. 예를 들어 79197과 324423 등이 팰린드롬 수이다.\n\nN 이상인 수 중에서 소수이면서 팰린드롬인 수 중 가장 작은 수를 구하시오.',
    constraints:
      '1 <= N <= 1,000,000',
    difficulty: 'easy',
    concept_tags: ['number-theory', 'sieve', 'string'],
    secondary_concept_tags: ['palindrome', 'math'],
    intent_description: '에라토스테네스의 체 + 팰린드롬 판별을 결합하여 조건을 만족하는 수를 찾을 수 있는지 확인.',
    key_observation: 'N이 최대 100만이지만, 100만 이상의 팰린드롬 소수가 있을 수 있으므로 체의 범위를 넉넉히(약 200만) 잡아야 한다.',
    wrong_approaches: [
      'N부터 하나씩 소수/팰린드롬 판별 -- 가능하지만 체를 안 쓰면 느림',
      '체 범위를 N까지만 잡기 -- 답이 N보다 클 수 있음',
    ],
    live_coding_flow: {
      firstObservation:
        'N이상의 가장 작은 소수이면서 팰린드롬인 수를 찾아야 한다. 에라토스테네스의 체로 소수를 구하고, N부터 순회하며 소수이면서 팰린드롬인 첫 번째 수를 반환한다.',
      approachCandidates: [
        '에라토스테네스의 체 + 팰린드롬 체크: 넉넉한 범위로 체 구성',
        'N부터 하나씩 소수 판별(sqrt) + 팰린드롬 체크: 가능하지만 느림',
      ],
      whyThisApproach:
        '체를 약 200만(또는 그 이상)까지 구한 뒤 N부터 순서대로 isPrime[i]이면서 팰린드롬인지 확인한다. 첫 번째 발견 시 출력.',
      wrongApproaches: [
        '체 범위를 N까지만 잡으면 답이 N 초과일 때 찾을 수 없음',
        '팰린드롬만 먼저 열거하고 소수 판별하는 방법은 팰린드롬 생성이 복잡',
      ],
      dataStructures: ['에라토스테네스의 체', '문자열(팰린드롬 판별)'],
      timeComplexity: 'O(MAX * log(log(MAX))) (MAX ~ 2,000,000)',
      pitfalls: [
        '체 범위: N이 100만이면 답이 1003001(7자리 팰린드롬 소수)일 수 있으므로 200만 이상으로 잡아야 함',
        '1은 소수가 아님',
        '팰린드롬 판별: 문자열로 변환 후 뒤집어 비교하거나, 수학적으로 뒤집어서 비교',
      ],
      interviewExplanation:
        '"에라토스테네스의 체를 약 200만까지 구합니다. N부터 순회하며 isPrime[i]가 true이고 팰린드롬인 첫 번째 수를 찾아 출력합니다. 팰린드롬 판별은 수를 문자열로 변환하여 역순과 비교합니다. 시간복잡도는 체 구성 O(MAX log log MAX)이 지배적이며 MAX는 약 200만입니다."',
    },
    source: { platform: 'boj' as any, id: 1747 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11689 — GCD(n, k) = 1
  // ──────────────────────────────────────────────────────
  {
    id: 'b011689-boj',
    title: 'GCD(n, k) = 1',
    description:
      '자연수 n이 주어졌을 때, 1부터 n까지의 수 중에서 n과 서로소인 수의 개수를 구하시오.\n\n즉, 오일러 피 함수 phi(n)을 구하시오.',
    constraints:
      '1 <= n <= 10^12',
    difficulty: 'medium',
    concept_tags: ['number-theory', 'euler-totient'],
    secondary_concept_tags: ['math', 'prime-factorization'],
    intent_description: '오일러 피 함수의 공식 phi(n) = n * product((1 - 1/p) for p | n)을 소인수분해로 구현할 수 있는지 확인.',
    key_observation: 'phi(n) = n * product((p-1)/p) for all prime p dividing n. n을 소인수분해하면 O(sqrt(n))에 구할 수 있다.',
    wrong_approaches: [
      '1부터 n까지 모든 수에 대해 GCD 계산 -- O(n log n)으로 n=10^12에서 불가',
      '에라토스테네스의 체 -- n이 10^12이므로 메모리 불가',
    ],
    live_coding_flow: {
      firstObservation:
        'phi(n) = n에서 n의 각 소인수 p에 대해 (1 - 1/p)를 곱한 값이다. n을 소인수분해하려면 2부터 sqrt(n)까지 나눠보면 된다. sqrt(10^12) = 10^6이므로 충분히 빠르다.',
      approachCandidates: [
        '브루트포스: 1~n까지 GCD 체크 O(n log n) -- 불가',
        '소인수분해 후 오일러 피 공식 O(sqrt(n)) (추천)',
      ],
      whyThisApproach:
        'n을 2부터 sqrt(n)까지 나누며 소인수를 찾는다. 각 소인수 p를 찾으면 result = result / p * (p - 1)을 적용한다. sqrt(n) 이후 n > 1이면 n 자체가 소인수이다.',
      wrongApproaches: [
        '직접 GCD를 n번 계산하면 10^12번 연산으로 시간 초과',
        '체를 10^12까지 구하면 메모리 초과',
      ],
      dataStructures: ['long long 변수: result'],
      timeComplexity: 'O(sqrt(n))',
      pitfalls: [
        'n이 10^12이므로 반드시 long long 사용',
        'result = result / p * (p - 1) 순서: 나눗셈을 먼저 해야 오버플로우 방지 (result는 항상 p로 나누어 떨어짐)',
        'sqrt(n) 이후 n > 1이면 남은 n이 소인수 -> result = result / n * (n - 1) 적용 잊지 말기',
        'n = 1일 때 phi(1) = 1',
      ],
      interviewExplanation:
        '"오일러 피 함수를 소인수분해로 구합니다. result = n으로 시작하고, 2부터 sqrt(n)까지 n을 나누며 소인수 p를 찾습니다. 소인수를 찾으면 result = result / p * (p - 1)을 적용하고, n에서 p를 모두 나눕니다. 순회 후 n > 1이면 남은 n도 소인수이므로 같은 처리를 합니다. 시간복잡도 O(sqrt(n))이며 n이 10^12이어도 10^6번 순회로 해결됩니다."',
    },
    source: { platform: 'boj' as any, id: 11689 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1016 — 제곱 ㄴㄴ 수
  // ──────────────────────────────────────────────────────
  {
    id: 'b001016-boj',
    title: '제곱 ㄴㄴ 수',
    description:
      '어떤 정수가 1보다 큰 완전제곱수로 나누어지지 않을 때, 그 수를 제곱ㄴㄴ수(squarefree number)라 한다.\n\nmin 이상 max 이하의 수 중에서 제곱ㄴㄴ수의 개수를 구하시오.',
    constraints:
      '1 <= min <= max <= 10^12\nmax - min <= 1,000,000',
    difficulty: 'hard',
    concept_tags: ['number-theory', 'sieve'],
    secondary_concept_tags: ['math', 'range-sieve'],
    intent_description: '범위 체(range sieve)를 이용하여 [min, max] 구간에서 소수의 제곱의 배수를 제거할 수 있는지 확인.',
    key_observation: 'p^2 <= max인 소수 p(p <= 10^6)에 대해 [min, max] 범위에서 p^2의 배수를 모두 표시하면 squarefree가 아닌 수를 찾을 수 있다.',
    wrong_approaches: [
      'min부터 max까지 각 수를 소인수분해 -- O(범위 * sqrt(max))로 느림',
      '일반 에라토스테네스 체를 10^12까지 구하기 -- 메모리 초과',
    ],
    live_coding_flow: {
      firstObservation:
        'max - min <= 10^6이므로 크기 10^6의 배열로 [min, max] 범위만 관리할 수 있다. p^2 <= max인 소수 p에 대해 범위 내 p^2의 배수를 표시하는 "범위 체" 기법을 사용한다.',
      approachCandidates: [
        '각 수 소인수분해: O(범위 * sqrt(max)) -- 느림',
        '범위 체(range sieve): O(sqrt(max) + 범위) (추천)',
      ],
      whyThisApproach:
        'sqrt(max) = 10^6까지의 소수를 에라토스테네스의 체로 구한다. 각 소수 p에 대해 p^2의 배수 중 [min, max] 범위에 있는 것들을 표시한다. 표시되지 않은 수가 제곱ㄴㄴ수다.',
      wrongApproaches: [
        '에라토스테네스 체를 10^12까지 구하면 메모리 ~10^12 byte 필요',
        '각 수를 개별 소인수분해하면 10^6 * 10^6 = 10^12 연산',
      ],
      dataStructures: ['소수 체 (sqrt(max) 크기)', 'boolean 배열 (max - min + 1 크기)'],
      timeComplexity: 'O(sqrt(max) * log(log(sqrt(max))) + (max - min))',
      pitfalls: [
        'p^2의 배수 시작점 계산: ceil(min / p^2) * p^2. 정수로 계산하려면 (min + p^2 - 1) / p^2 * p^2',
        'min이 1일 때 1은 제곱ㄴㄴ수임 (1보다 큰 완전제곱수로 나누어지지 않음)',
        '배열 인덱스: arr[x - min]으로 오프셋 관리',
        'p^2이 long long 범위이므로 오버플로우 주의',
      ],
      interviewExplanation:
        '"범위 체(range sieve)를 사용합니다. sqrt(max) = 10^6까지의 소수를 체로 구합니다. 각 소수 p에 대해 p^2의 배수 중 [min, max] 범위에 있는 수를 boolean 배열에 표시합니다. 시작점은 ceil(min / p^2) * p^2로 계산합니다. 표시되지 않은 수의 개수가 제곱ㄴㄴ수의 수입니다. 시간복잡도 O(sqrt(max) log log sqrt(max) + (max - min))입니다."',
    },
    source: { platform: 'boj' as any, id: 1016 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 21568 — Ax+By=C
  // ──────────────────────────────────────────────────────
  {
    id: 'b021568-boj',
    title: 'Ax+By=C',
    description:
      'A, B, C가 주어졌을 때, Ax + By = C를 만족하는 정수 x, y를 구하시오.\n\n해가 없으면 -1을 출력하고, 해가 있으면 아무 정수 해 하나를 출력하시오.',
    constraints:
      '-1,000,000,000 <= A, B, C <= 1,000,000,000\nA, B가 동시에 0이 아님',
    difficulty: 'medium',
    concept_tags: ['number-theory', 'extended-gcd'],
    secondary_concept_tags: ['math', 'euclidean-algorithm'],
    intent_description: '확장 유클리드 호제법(Extended GCD)을 구현하여 일차 디오판토스 방정식의 해를 구할 수 있는지 확인.',
    key_observation: 'Ax + By = C의 정수 해가 존재할 조건: GCD(A, B) | C. 확장 유클리드로 Ax + By = GCD(A, B)의 해를 구한 뒤 C/GCD를 곱한다.',
    wrong_approaches: [
      'x를 -10^9~10^9까지 순회하며 y가 정수인지 확인 -- O(N)으로 시간 초과 가능',
      '연립방정식으로 풀기 -- 정수 해 보장 안 됨',
    ],
    live_coding_flow: {
      firstObservation:
        '일차 디오판토스 방정식 Ax + By = C이다. 해가 존재하려면 GCD(A, B) | C이어야 한다. 확장 유클리드 호제법으로 Ax0 + By0 = g(= GCD(A, B))을 만족하는 (x0, y0)을 구한 뒤, x = x0 * (C/g), y = y0 * (C/g)가 답이다.',
      approachCandidates: [
        'x 열거: 범위가 넓으면 불가',
        '확장 유클리드 호제법: O(log(min(|A|, |B|))) (추천)',
      ],
      whyThisApproach:
        '확장 유클리드 호제법은 gcd(a, b) = a*x + b*y를 만족하는 (x, y)를 재귀적으로 구한다. 기저: gcd(a, 0) = a -> x=1, y=0. 재귀 단계에서 gcd(b, a%b)의 해 (x1, y1)을 이용해 x = y1, y = x1 - (a/b)*y1.',
      wrongApproaches: [
        '단순 열거는 범위가 최대 2*10^9이므로 시간 초과',
        '실수 나눗셈으로 y를 구하면 정수 판별 시 부동소수점 오차 발생',
      ],
      dataStructures: ['재귀 함수 (또는 반복문)'],
      timeComplexity: 'O(log(min(|A|, |B|)))',
      pitfalls: [
        'A 또는 B가 0인 경우 별도 처리: A=0이면 By=C -> C%B==0이면 y=C/B, x는 아무 값',
        'A 또는 B가 음수인 경우: GCD는 절댓값으로 구하고, 부호 보정',
        'C/g를 곱할 때 오버플로우: long long 사용',
        'GCD(A, B)가 C를 나누지 않으면 해 없음 -> -1 출력',
      ],
      interviewExplanation:
        '"확장 유클리드 호제법으로 풀이합니다. 먼저 g = GCD(|A|, |B|)를 구합니다. C가 g로 나누어지지 않으면 해가 없어 -1을 출력합니다. 나누어지면 확장 유클리드로 Ax0 + By0 = g를 만족하는 (x0, y0)을 구하고, x = x0 * (C/g), y = y0 * (C/g)를 출력합니다. 시간복잡도는 O(log(min(|A|, |B|)))입니다."',
    },
    source: { platform: 'boj' as any, id: 21568 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1033 — 칵테일
  // ──────────────────────────────────────────────────────
  {
    id: 'b001033-boj',
    title: '칵테일',
    description:
      'N개의 재료로 칵테일을 만들려고 한다. N-1개의 비율 조건이 주어진다. 각 조건은 "a번 재료와 b번 재료의 질량비가 p:q"라는 뜻이다.\n\n모든 조건을 만족하면서 모든 재료의 질량이 정수이고, 그 합이 최소가 되게 하라.',
    constraints:
      '2 <= N <= 10\n비율 조건: N-1개\n비율 p, q: 1 이상 정수\n조건들은 모든 재료가 연결되도록 주어짐',
    difficulty: 'hard',
    concept_tags: ['number-theory', 'graph', 'tree'],
    secondary_concept_tags: ['gcd', 'lcm', 'dfs'],
    intent_description: '비율 조건이 트리 구조를 이루고 있음을 파악하고, DFS로 비율을 전파한 뒤 LCM으로 정수화할 수 있는지 확인.',
    key_observation: 'N-1개의 비율 조건이 N개 노드를 연결하므로 트리 구조다. 한 노드의 값을 1로 놓고 DFS로 비율을 전파한 뒤, 모든 값을 정수로 만들기 위해 분모의 LCM을 곱하고 GCD로 나눈다.',
    wrong_approaches: [
      '연립방정식을 실수로 풀기 -- 정수 해 보장 안 됨',
      '각 비율 조건을 독립적으로 처리 -- 전이적 관계를 무시',
    ],
    live_coding_flow: {
      firstObservation:
        'N-1개의 비율 조건이 N개 재료를 연결하므로 트리(연결 그래프)이다. 한 노드를 기준으로 DFS/BFS하며 각 재료의 상대적 비율을 분수로 계산할 수 있다.',
      approachCandidates: [
        '연립방정식 (실수) -- 정수 해 보장 어려움',
        'DFS + 분수 비율 전파 + LCM 정수화 (추천)',
      ],
      whyThisApproach:
        '0번 재료를 임의 값(예: 1)으로 놓고 DFS로 각 재료의 비율을 분수(분자/분모)로 구한다. 모든 분모의 LCM을 구하여 곱하면 모든 값이 정수가 된다. 마지막으로 모든 값의 GCD로 나누면 최소 합이 된다.',
      wrongApproaches: [
        '실수로 비율을 구하면 정밀도 문제로 정수화가 어려움',
        '각 비율을 독립적으로 처리하면 a:b=1:2, b:c=3:4에서 b의 값이 일치하지 않을 수 있음',
      ],
      dataStructures: ['인접 리스트 (트리)', '분수 배열 (분자/분모)', 'GCD/LCM 함수'],
      timeComplexity: 'O(N^2) (N <= 10이므로 상수)',
      pitfalls: [
        '비율 전파 시 방향 주의: a:b = p:q이면 a = p, b = q가 아니라 b = a * q / p',
        '분수 연산 시 항상 GCD로 약분하여 오버플로우 방지',
        '최종 GCD로 나누어 최소 합을 만드는 것을 잊지 말기',
        'LCM 계산 시 오버플로우: N이 작으므로 long long이면 충분',
        '양방향 간선: a->b 비율이 p:q이면 b->a 비율은 q:p',
      ],
      interviewExplanation:
        '"비율 조건이 트리를 형성합니다. 0번 노드의 값을 모든 분모의 LCM으로 초기화하는 대신, 먼저 0번을 1로 놓고 DFS로 각 노드의 비율을 분수로 구합니다. 모든 분모의 LCM을 구해 곱하면 정수가 됩니다. 마지막으로 모든 값의 GCD로 나누어 최소화합니다. N <= 10이므로 효율성은 중요하지 않고, 정확한 분수 관리가 핵심입니다."',
    },
    source: { platform: 'boj' as any, id: 1033 },
  },
];
