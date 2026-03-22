import type { ProblemSeed } from '../problems';

export const BOJ_DATA_STRUCTURES: ProblemSeed[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1253 — 좋다
  // ──────────────────────────────────────────────────────
  {
    id: 'b001253-boj',
    title: '좋다',
    description:
      'N개의 수 중에서 어떤 수가 다른 두 수의 합으로 나타낼 수 있다면 그 수를 "좋다(GOOD)"고 한다.\nN개의 수가 주어지면 그 중에서 좋은 수의 개수를 구하는 프로그램을 작성하라.\n\n수의 위치가 다르면 값이 같아도 다른 수이다.',
    constraints:
      '1 <= N <= 2,000\n|A[i]| <= 1,000,000,000',
    difficulty: 'medium',
    concept_tags: ['two-pointer', 'sorting'],
    secondary_concept_tags: ['hash-map', 'array'],
    intent_description: '정렬 후 투 포인터를 활용하여 특정 수가 배열 내 다른 두 수의 합으로 표현 가능한지 판별하는 문제.',
    key_observation: '배열을 정렬한 뒤, 각 수에 대해 투 포인터로 양 끝에서 좁혀가며 합이 되는 쌍을 O(N)에 찾을 수 있다.',
    wrong_approaches: [
      '삼중 반복문 O(N^3) — N=2000이면 8*10^9으로 시간 초과',
      '자기 자신을 두 수 중 하나로 사용하는 실수 — 인덱스가 다른 두 수여야 함',
    ],
    live_coding_flow: {
      firstObservation:
        '각 수 A[k]에 대해 A[i] + A[j] = A[k] (i != k, j != k)인 쌍이 존재하는지 확인해야 한다. 정렬하면 투 포인터를 쓸 수 있다.',
      approachCandidates: [
        '브루트포스: 삼중 반복문 O(N^3)',
        '정렬 + 투 포인터: 각 수마다 O(N) 탐색 → 전체 O(N^2)',
        '해시맵: 모든 쌍의 합을 저장 O(N^2) 공간',
      ],
      whyThisApproach:
        '정렬 후 각 타겟 A[k]에 대해 left=0, right=N-1로 투 포인터 탐색. 자기 자신 인덱스를 건너뛰며 합이 타겟과 같은 쌍을 찾는다. O(N^2).',
      wrongApproaches: [
        '자기 자신을 포함하여 합을 구성하면 오답 — left==k면 left++, right==k면 right--로 건너뛰어야 함',
        '0이 여러 개일 때 0+0=0 케이스를 놓치기 쉬움',
      ],
      dataStructures: ['정렬된 배열', '투 포인터 (left, right)'],
      timeComplexity: 'O(N^2)',
      pitfalls: [
        '자기 자신을 두 수 중 하나로 사용하지 않도록 인덱스 비교 필수',
        '같은 값이 여러 개 있을 때 처리: 값이 아닌 인덱스로 구분해야 함',
        '음수가 포함되므로 투 포인터의 이동 방향 주의',
      ],
      interviewExplanation:
        '"배열을 정렬한 뒤, 각 원소 A[k]를 타겟으로 설정하고 투 포인터로 A[i]+A[j]=A[k]인 쌍을 찾습니다. left와 right가 k와 같으면 건너뜁니다. 전체 O(N^2)이며 N<=2000이므로 충분합니다."',
    },
    source: { platform: 'boj' as any, id: 1253 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1546 — 평균
  // ──────────────────────────────────────────────────────
  {
    id: 'b001546-boj',
    title: '평균',
    description:
      '세준이는 기말고사를 망쳤다. 그래서 점수를 조작하려 한다.\n먼저 가장 높은 점수를 M이라 하면, 모든 점수를 점수/M*100으로 바꾼다.\n예를 들어 점수가 40, 80, 60이면 M=80이므로 50, 100, 75가 된다.\n\nN개의 시험 점수가 주어졌을 때, 조작된 점수의 새로운 평균을 구하는 프로그램을 작성하시오.',
    constraints:
      '1 <= N <= 1,000\n0 <= 점수 <= 10,000\n적어도 하나의 점수는 0보다 크다.',
    difficulty: 'easy',
    concept_tags: ['array', 'math'],
    secondary_concept_tags: [],
    intent_description: '배열의 최댓값을 구하고 간단한 수식을 적용하여 평균을 계산하는 기초 구현 문제.',
    key_observation: '새 평균 = (원래 합 / M) * 100 / N. 배열을 순회하며 합과 최댓값을 동시에 구할 수 있다.',
    wrong_approaches: [
      '정수 나눗셈으로 소수점 이하를 잃는 실수',
      '각 점수를 먼저 정수로 변환하고 평균을 구하면 정밀도 손실',
    ],
    live_coding_flow: {
      firstObservation:
        '모든 점수를 (점수/M)*100으로 변환한 후 평균을 구하면 된다. 합과 최댓값을 한 번 순회로 구할 수 있다.',
      approachCandidates: [
        '한 번 순회: 합과 최댓값을 동시에 구하고 수식 적용 O(N)',
        '정렬 후 마지막 원소가 최댓값: O(N log N) — 불필요',
      ],
      whyThisApproach:
        '수식 정리: 새 평균 = sum / M * 100 / N. 한 번 순회로 sum과 M을 구하면 O(N)에 해결.',
      wrongApproaches: [
        '정수 나눗셈을 사용하면 소수점이 잘림 — 실수형(double)을 사용해야 함',
        '각 점수를 개별 변환 후 합산해도 되지만 수식을 한 번에 정리하는 것이 깔끔',
      ],
      dataStructures: ['변수: sum, max'],
      timeComplexity: 'O(N)',
      pitfalls: [
        '실수형 출력: 소수점 아래 충분한 자릿수 출력 필요',
        '모든 점수가 0인 경우는 제약 조건상 불가하지만 M=0 예외 처리 고려',
      ],
      interviewExplanation:
        '"배열을 한 번 순회하여 합(sum)과 최댓값(M)을 구합니다. 새 평균은 sum/M*100/N으로 계산합니다. 정수 나눗셈 대신 실수형을 사용하여 정밀도를 보장합니다. O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 1546 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1874 — 스택 수열
  // ──────────────────────────────────────────────────────
  {
    id: 'b001874-boj',
    title: '스택 수열',
    description:
      '1부터 n까지의 수를 스택에 넣었다가 뽑아 늘어놓으면 하나의 수열을 만들 수 있다.\n스택에 push하는 순서는 반드시 오름차순을 지키도록 한다.\n\n임의의 수열이 주어졌을 때 스택을 이용해 그 수열을 만들 수 있는지 확인하고, 만들 수 있다면 push와 pop 연산 순서를 출력하라.\n불가능할 경우 "NO"를 출력한다.',
    constraints:
      '1 <= n <= 100,000',
    difficulty: 'medium',
    concept_tags: ['stack'],
    secondary_concept_tags: ['simulation'],
    intent_description: '스택의 LIFO 특성을 시뮬레이션하여 주어진 수열을 생성할 수 있는지 판단하는 문제.',
    key_observation: '1부터 순서대로 push하며, 현재 만들어야 할 수가 스택 top에 있으면 pop한다. top이 만들어야 할 수보다 크면 불가능.',
    wrong_approaches: [
      '무작정 정렬하거나 큐를 사용 — 스택의 LIFO 특성을 반영하지 못함',
      '이미 push한 수를 다시 push하려는 실수',
    ],
    live_coding_flow: {
      firstObservation:
        '1부터 n까지 순서대로만 push 가능하고, pop으로 원하는 수열을 만들어야 한다. 현재 필요한 수가 스택 top에 올 때까지 push하고, top이 일치하면 pop.',
      approachCandidates: [
        '시뮬레이션: 스택에 1부터 차례로 push, 타겟과 top 일치 시 pop O(N)',
      ],
      whyThisApproach:
        '다음으로 출력해야 할 수를 기준으로, 아직 push하지 않은 수를 순서대로 push한다. top이 타겟과 같으면 pop. top이 타겟보다 크면 NO.',
      wrongApproaches: [
        '스택 대신 배열 인덱스로만 추적하면 LIFO 조건을 정확히 검증할 수 없음',
        'pop할 때 타겟과 비교하지 않고 무조건 pop하면 순서가 틀림',
      ],
      dataStructures: ['Stack<number>', '결과 배열 (push/pop 기록)'],
      timeComplexity: 'O(N)',
      pitfalls: [
        '스택 top이 현재 타겟보다 큰 경우 즉시 NO 판정',
        'push 카운터를 별도 관리: 이미 push한 수를 다시 push하지 않도록',
        '출력량이 많으므로 StringBuilder 등을 사용해 출력 최적화',
      ],
      interviewExplanation:
        '"1부터 n까지 순서대로 push하며, 스택 top이 현재 만들어야 할 수와 같으면 pop합니다. top이 타겟보다 크면 해당 수열은 만들 수 없으므로 NO를 출력합니다. 모든 수를 최대 한 번 push, 한 번 pop하므로 O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 1874 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1940 — 주몽
  // ──────────────────────────────────────────────────────
  {
    id: 'b001940-boj',
    title: '주몽',
    description:
      '주몽은 갑옷을 만드는 재료를 가지고 있다. 두 재료의 고유 번호의 합이 M이 되면 갑옷을 만들 수 있다.\n재료의 개수 N과 갑옷을 만들 수 있는 번호의 합 M이 주어질 때, 갑옷을 만들 수 있는 재료 쌍의 수를 구하는 프로그램을 작성하시오.',
    constraints:
      '1 <= N <= 15,000\n1 <= M <= 10,000,000\n1 <= 재료의 고유 번호 <= 100,000',
    difficulty: 'easy',
    concept_tags: ['two-pointer', 'sorting'],
    secondary_concept_tags: ['hash-map'],
    intent_description: '정렬 후 투 포인터로 합이 M인 쌍의 수를 O(N log N)에 구할 수 있는지 확인.',
    key_observation: '정렬 후 left=0, right=N-1에서 시작. 합이 M이면 카운트 증가 후 양쪽 이동, 합이 작으면 left++, 크면 right--.',
    wrong_approaches: [
      '이중 반복문 O(N^2) — N=15000이면 2.25*10^8으로 느림',
      '중복 쌍 카운트 — 각 쌍은 한 번만 세야 함',
    ],
    live_coding_flow: {
      firstObservation:
        '두 수의 합이 M인 쌍을 찾는 Two Sum 변형. 정렬 후 투 포인터로 효율적으로 탐색 가능.',
      approachCandidates: [
        '브루트포스: 이중 반복문 O(N^2)',
        '정렬 + 투 포인터: O(N log N)',
        '해시셋: O(N) — 중복 처리 주의',
      ],
      whyThisApproach:
        '정렬 O(N log N) 후 투 포인터 O(N). 합이 M보다 작으면 left 증가, 크면 right 감소, 같으면 카운트 증가 후 양쪽 이동.',
      wrongApproaches: [
        '이중 반복문은 N=15000에서 시간 초과 가능',
        '해시셋 사용 시 같은 쌍을 두 번 세지 않도록 주의 필요',
      ],
      dataStructures: ['정렬된 배열', '투 포인터 (left, right)'],
      timeComplexity: 'O(N log N)',
      pitfalls: [
        '같은 재료를 두 번 사용할 수 없음 — left < right 조건 유지',
        '합이 M인 쌍을 찾으면 left와 right 모두 이동해야 다음 쌍 탐색 가능',
      ],
      interviewExplanation:
        '"배열을 정렬한 뒤 양쪽 끝에서 투 포인터로 합을 비교합니다. 합이 M보다 작으면 left++, 크면 right--, 같으면 카운트를 증가하고 양쪽 포인터를 이동합니다. O(N log N)입니다."',
    },
    source: { platform: 'boj' as any, id: 1940 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2018 — 수들의 합 5
  // ──────────────────────────────────────────────────────
  {
    id: 'b002018-boj',
    title: '수들의 합 5',
    description:
      '어떠한 자연수 N이 있을 때, 연속된 자연수의 합으로 N을 나타낼 수 있는 경우의 수를 구하는 프로그램을 작성하시오.\n예를 들어 15 = 1+2+3+4+5 = 4+5+6 = 7+8 = 15 이므로 4가지이다.',
    constraints:
      '1 <= N <= 10,000,000',
    difficulty: 'easy',
    concept_tags: ['two-pointer'],
    secondary_concept_tags: ['math', 'prefix-sum'],
    intent_description: '연속된 자연수의 부분합 문제를 투 포인터로 O(N)에 해결할 수 있는지 확인.',
    key_observation: 'start=1, end=1로 시작. 현재 합이 N보다 작으면 end 확장, 크면 start 축소, 같으면 카운트 증가.',
    wrong_approaches: [
      '이중 반복문으로 모든 시작점과 끝점 탐색 O(N^2)',
      '수학 공식만으로 접근 시 구현이 복잡해질 수 있음',
    ],
    live_coding_flow: {
      firstObservation:
        '연속된 자연수의 합 → 슬라이딩 윈도우/투 포인터. start와 end를 이동하며 구간합을 유지.',
      approachCandidates: [
        '투 포인터: start, end를 이동하며 구간합 관리 O(N)',
        '수학: N의 약수를 이용한 공식 O(sqrt(N))',
        '브루트포스: 모든 시작점에서 합 계산 O(N^2)',
      ],
      whyThisApproach:
        '투 포인터로 구간합을 유지하면서 이동. sum < N이면 end++하고 sum에 end 추가, sum > N이면 sum에서 start 제거 후 start++. O(N).',
      wrongApproaches: [
        'N=10^7에서 O(N^2)는 시간 초과',
        'end를 N까지 올리면 이미 합이 충분한데도 계속 탐색 — 비효율',
      ],
      dataStructures: ['변수: start, end, sum, count'],
      timeComplexity: 'O(N)',
      pitfalls: [
        'N 자체도 연속된 자연수 1개의 합이므로 카운트에 포함',
        'start > end가 되지 않도록 관리 — start <= end 유지',
        'end가 N을 초과하면 종료',
      ],
      interviewExplanation:
        '"start=1, end=1, sum=1로 시작합니다. sum이 N보다 작으면 end를 증가시키고 sum에 더하고, N보다 크면 sum에서 start를 빼고 start를 증가시킵니다. sum이 N과 같으면 카운트를 증가시키고 end를 확장합니다. O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 2018 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2164 — 카드2
  // ──────────────────────────────────────────────────────
  {
    id: 'b002164-boj',
    title: '카드2',
    description:
      'N장의 카드가 있다. 각 카드에는 1부터 N까지의 번호가 적혀 있으며, 1번 카드가 제일 위에, N번 카드가 제일 아래인 상태로 놓여 있다.\n\n다음 동작을 카드가 한 장 남을 때까지 반복한다:\n1. 제일 위에 있는 카드를 바닥에 버린다.\n2. 그 다음 제일 위에 있는 카드를 제일 아래로 옮긴다.\n\n마지막에 남는 카드 번호를 구하시오.',
    constraints:
      '1 <= N <= 500,000',
    difficulty: 'easy',
    concept_tags: ['queue'],
    secondary_concept_tags: ['simulation'],
    intent_description: '큐의 기본 연산(front 제거, back 삽입)으로 시뮬레이션하여 FIFO 자료구조를 활용하는 문제.',
    key_observation: '큐에 1~N을 넣고, dequeue(버리기) → front를 dequeue 후 enqueue(뒤로 옮기기)를 반복. 큐 크기가 1이면 종료.',
    wrong_approaches: [
      '배열로 시뮬레이션 시 앞에서 제거가 O(N) — 전체 O(N^2)',
      '스택 사용 — FIFO가 아닌 LIFO이므로 순서가 달라짐',
    ],
    live_coding_flow: {
      firstObservation:
        '앞에서 빼고 뒤로 넣는 동작 → FIFO → 큐. 큐에 1~N을 넣고 규칙대로 시뮬레이션.',
      approachCandidates: [
        '큐 시뮬레이션: O(N)',
        '수학 공식: 2의 거듭제곱 관련 패턴 O(1)',
        '배열 시뮬레이션: 앞에서 제거 O(N) → 전체 O(N^2)',
      ],
      whyThisApproach:
        '큐를 사용하면 dequeue, enqueue 모두 O(1)이므로 전체 O(N). 구현이 직관적이고 실수가 적다.',
      wrongApproaches: [
        '배열 앞에서 shift 연산은 O(N)이므로 전체 O(N^2)',
        '스택은 LIFO라 문제의 규칙과 맞지 않음',
      ],
      dataStructures: ['Queue<number>'],
      timeComplexity: 'O(N)',
      pitfalls: [
        'N=1인 경우 바로 1 출력 — 반복 없이 종료',
        '언어별 큐 구현: JavaScript는 shift O(N)이므로 연결 리스트 기반 큐 권장',
      ],
      interviewExplanation:
        '"큐에 1부터 N까지 넣습니다. 카드가 1장 남을 때까지 dequeue(버리기), dequeue 후 enqueue(뒤로 보내기)를 반복합니다. 큐의 각 연산이 O(1)이므로 전체 O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 2164 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 10986 — 나머지 합
  // ──────────────────────────────────────────────────────
  {
    id: 'b010986-boj',
    title: '나머지 합',
    description:
      'N개의 수 A1, A2, ..., AN이 주어졌을 때, 연속된 부분 구간의 합이 M으로 나누어떨어지는 구간의 개수를 구하는 프로그램을 작성하시오.\n즉, Ai + ... + Aj (i <= j)의 합이 M으로 나누어떨어지는 (i, j) 쌍의 수를 구한다.',
    constraints:
      '1 <= N <= 1,000,000\n2 <= M <= 1,000\n0 <= A[i] <= 10^9',
    difficulty: 'hard',
    concept_tags: ['prefix-sum', 'math'],
    secondary_concept_tags: ['counting', 'modular-arithmetic'],
    intent_description: '누적합의 나머지 성질을 이용하여 구간합이 M의 배수인 쌍의 수를 O(N)에 구할 수 있는지 확인.',
    key_observation: 'prefix[j] % M == prefix[i] % M이면 구간 [i+1, j]의 합은 M의 배수. 나머지가 같은 누적합 쌍의 수를 세면 된다.',
    wrong_approaches: [
      '이중 반복문으로 모든 구간합 계산 O(N^2) — N=10^6에서 시간 초과',
      '나머지 카운팅 없이 누적합만 사용하면 여전히 O(N^2)',
    ],
    live_coding_flow: {
      firstObservation:
        '구간합 S[i..j] = prefix[j] - prefix[i-1]. S[i..j] % M == 0 ↔ prefix[j] % M == prefix[i-1] % M. 나머지가 같은 쌍을 세면 된다.',
      approachCandidates: [
        '브루트포스: 모든 구간 확인 O(N^2)',
        '누적합 + 나머지 카운팅: O(N)',
      ],
      whyThisApproach:
        '누적합 배열의 각 원소를 M으로 나눈 나머지를 구하고, 나머지별 카운트 배열 cnt[r]를 유지. cnt[r]에서 2개를 고르는 조합 수 C(cnt[r], 2)의 합이 답.',
      wrongApproaches: [
        '누적합을 구해도 모든 쌍을 비교하면 O(N^2)',
        '나머지가 0인 경우만 세면 prefix[0]=0인 것을 놓침',
      ],
      dataStructures: ['누적합 배열 prefix[]', '나머지 카운트 배열 cnt[0..M-1]'],
      timeComplexity: 'O(N)',
      pitfalls: [
        'prefix[0] = 0도 카운트에 포함해야 함 — 구간이 인덱스 1부터 시작하는 경우',
        '결과가 int 범위를 초과할 수 있음 — long 타입 사용 필수',
        '누적합 자체도 오버플로우 가능 — 나머지를 누적 과정에서 바로 적용',
      ],
      interviewExplanation:
        '"누적합 prefix[i]를 구하면서 prefix[i] % M의 나머지를 카운트합니다. prefix[0]=0을 초기값으로 포함합니다. 나머지가 r인 누적합이 cnt[r]개라면, 그 중 2개를 고르면 구간합이 M의 배수입니다. 답은 모든 r에 대해 cnt[r]*(cnt[r]-1)/2의 합입니다. O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 10986 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11003 — 최솟값 찾기
  // ──────────────────────────────────────────────────────
  {
    id: 'b011003-boj',
    title: '최솟값 찾기',
    description:
      'N개의 수 A1, A2, ..., AN과 L이 주어진다.\n각 i에 대해 Di = min(A[i-L+1], ..., A[i])를 구하는 프로그램을 작성하시오.\n단, i <= 0인 A[i]는 무시한다.',
    constraints:
      '1 <= L <= N <= 5,000,000\n|A[i]| <= 10^9',
    difficulty: 'hard',
    concept_tags: ['deque', 'sliding-window'],
    secondary_concept_tags: ['monotone-queue'],
    intent_description: '슬라이딩 윈도우 최솟값을 모노톤 덱으로 O(N)에 구할 수 있는지 확인.',
    key_observation: '덱에 인덱스를 저장하며, 새 원소보다 큰 값은 뒤에서 제거(모노톤 유지). 윈도우를 벗어난 front는 제거. 덱 front가 항상 최솟값.',
    wrong_approaches: [
      '매번 윈도우 내 min 탐색 O(NL) — N=5*10^6, L이 크면 시간 초과',
      '세그먼트 트리 O(N log N) — 가능하지만 모노톤 덱이 더 효율적',
    ],
    live_coding_flow: {
      firstObservation:
        '크기 L의 슬라이딩 윈도우에서 최솟값을 매번 구해야 한다. 윈도우가 한 칸 이동할 때 원소 하나가 들어오고 하나가 나간다.',
      approachCandidates: [
        '브루트포스: 매 위치마다 L개 비교 O(NL)',
        '모노톤 덱: 감소하지 않는 덱 유지 O(N)',
        '세그먼트 트리: O(N log N)',
      ],
      whyThisApproach:
        '덱에 인덱스를 저장하고, 새 원소 A[i]보다 큰 값들을 뒤에서 모두 제거(이후 절대 최솟값이 될 수 없으므로). front가 윈도우를 벗어나면 제거. 덱 front가 현재 윈도우의 최솟값.',
      wrongApproaches: [
        'O(NL)은 N=5*10^6일 때 시간 초과',
        '세그먼트 트리는 구현이 복잡하고 상수가 큼',
      ],
      dataStructures: ['Deque<(index, value)> — 모노톤 덱'],
      timeComplexity: 'O(N)',
      pitfalls: [
        '입출력 양이 매우 많으므로 빠른 I/O 필수 (BufferedReader, sys.stdin 등)',
        '덱에 값이 아닌 인덱스를 저장해야 윈도우 범위 판단 가능',
        'i-L+1 <= 0인 초기 구간 처리: 윈도우 시작이 1 미만이면 1로 클램프',
      ],
      interviewExplanation:
        '"모노톤 덱을 사용합니다. 각 원소를 순회하며 덱 뒤에서 현재 값보다 큰 원소를 제거하고 현재 인덱스를 추가합니다. 덱 front가 윈도우(i-L+1)보다 앞이면 제거합니다. 덱 front의 값이 현재 윈도우의 최솟값입니다. 각 원소가 덱에 최대 한 번 삽입/삭제되므로 O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 11003 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11286 — 절댓값 힙
  // ──────────────────────────────────────────────────────
  {
    id: 'b011286-boj',
    title: '절댓값 힙',
    description:
      '절댓값 힙은 다음과 같은 연산을 지원하는 자료구조이다.\n\n1. 배열에 정수 x (x != 0)를 넣는다.\n2. 배열에서 절댓값이 가장 작은 값을 출력하고 그 값을 배열에서 제거한다. 절댓값이 같은 경우 원래 값이 더 작은 수를 출력한다.\n\nx가 0이면 2번 연산, 아니면 1번 연산을 수행한다.\n배열이 비어 있는데 2번 연산을 수행하면 0을 출력한다.',
    constraints:
      '1 <= N <= 100,000\n|x| <= 2^31 - 1',
    difficulty: 'medium',
    concept_tags: ['priority-queue', 'heap'],
    secondary_concept_tags: [],
    intent_description: '우선순위 큐의 비교 함수를 커스터마이징하여 절댓값 기준으로 정렬하는 문제.',
    key_observation: '비교 기준을 (|a|, a) 순서로 설정한 최소 힙을 사용하면 조건을 정확히 충족한다.',
    wrong_approaches: [
      '절댓값으로만 비교 — 절댓값이 같을 때 원래 값이 작은 것 우선 조건 놓침',
      '매번 전체 배열에서 최솟값 탐색 O(N) — 시간 초과',
    ],
    live_coding_flow: {
      firstObservation:
        '삽입과 최솟값 추출을 반복하므로 힙(우선순위 큐)이 적합. 비교 기준만 커스텀하면 된다.',
      approachCandidates: [
        '커스텀 비교 힙: (|x|, x) 기준 최소 힙 O(N log N)',
        '정렬된 배열: 삽입 O(N), 추출 O(1) — 삽입이 느림',
        '매번 선형 탐색: O(N^2)',
      ],
      whyThisApproach:
        '최소 힙에서 비교 함수를 (|a| < |b|) || (|a| == |b| && a < b)로 정의하면 삽입/추출 모두 O(log N).',
      wrongApproaches: [
        '절댓값만 비교하면 -1과 1 중 어느 것을 먼저 출력할지 결정 불가',
        '배열 정렬은 삽입마다 O(N)이 걸려 비효율적',
      ],
      dataStructures: ['MinHeap (비교 기준: 절댓값 → 원래 값)'],
      timeComplexity: 'O(N log N)',
      pitfalls: [
        '절댓값이 같을 때 음수가 양수보다 먼저 나와야 함',
        '빈 힙에서 추출 시 0 출력 — 예외 처리 필수',
        '언어별 힙 구현: Java는 PriorityQueue에 Comparator, Python은 (abs(x), x) 튜플 활용',
      ],
      interviewExplanation:
        '"우선순위 큐를 사용하되 비교 기준을 (절댓값, 원래 값) 순으로 설정합니다. x가 0이면 힙에서 추출(비었으면 0 출력), 아니면 삽입합니다. 삽입/추출 모두 O(log N)이므로 전체 O(N log N)입니다."',
    },
    source: { platform: 'boj' as any, id: 11286 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11659 — 구간 합 구하기 4
  // ──────────────────────────────────────────────────────
  {
    id: 'b011659-boj',
    title: '구간 합 구하기 4',
    description:
      '수 N개가 주어졌을 때, i번째 수부터 j번째 수까지 합을 구하는 프로그램을 작성하시오.\n\n첫째 줄에 수의 개수 N과 합을 구해야 하는 횟수 M이 주어진다.\n둘째 줄에 N개의 수가 주어진다.\n셋째 줄부터 M개의 줄에 합을 구해야 하는 구간 i와 j가 주어진다.',
    constraints:
      '1 <= N <= 100,000\n1 <= M <= 100,000\n1 <= i <= j <= N\n|수| <= 1,000',
    difficulty: 'easy',
    concept_tags: ['prefix-sum', 'array'],
    secondary_concept_tags: [],
    intent_description: '누적합(prefix sum) 배열을 미리 구성하여 각 구간 합 쿼리를 O(1)에 응답하는 기본 패턴을 확인.',
    key_observation: 'prefix[k] = A[1]+...+A[k]로 정의하면 구간합 S[i..j] = prefix[j] - prefix[i-1].',
    wrong_approaches: [
      '매 쿼리마다 i~j 합산 O(N) — M개 쿼리시 O(NM) 시간 초과',
    ],
    live_coding_flow: {
      firstObservation:
        'M번의 구간 합 쿼리가 주어지므로, 매번 O(N)으로 합산하면 O(NM). 누적합으로 전처리하면 각 쿼리 O(1).',
      approachCandidates: [
        '브루트포스: 매 쿼리 O(N) → 전체 O(NM)',
        '누적합: 전처리 O(N), 쿼리 O(1) → 전체 O(N+M)',
      ],
      whyThisApproach:
        'prefix[0]=0, prefix[k]=prefix[k-1]+A[k]로 한 번 전처리. 쿼리마다 prefix[j]-prefix[i-1]로 O(1) 응답.',
      wrongApproaches: [
        '쿼리마다 반복문으로 합산하면 N=M=100000일 때 10^10 연산 — 시간 초과',
      ],
      dataStructures: ['누적합 배열 prefix[0..N]'],
      timeComplexity: 'O(N + M)',
      pitfalls: [
        'prefix[0] = 0으로 초기화하여 i=1일 때도 정상 동작하도록',
        '1-indexed vs 0-indexed 혼동 주의',
        '입출력이 많으므로 빠른 I/O 사용',
      ],
      interviewExplanation:
        '"누적합 배열을 미리 구성합니다. prefix[k]는 A[1]부터 A[k]까지의 합입니다. 구간 [i, j]의 합은 prefix[j] - prefix[i-1]로 O(1)에 구합니다. 전처리 O(N), 쿼리 O(1)이므로 전체 O(N+M)입니다."',
    },
    source: { platform: 'boj' as any, id: 11659 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11660 — 구간 합 구하기 5
  // ──────────────────────────────────────────────────────
  {
    id: 'b011660-boj',
    title: '구간 합 구하기 5',
    description:
      'N x N 표에 수가 채워져 있다. (x1, y1)부터 (x2, y2)까지 합을 구하는 프로그램을 작성하시오.\n(x, y)는 x행 y열을 의미한다.\n\nN x N개의 수와 M개의 쿼리가 주어진다.',
    constraints:
      '1 <= N <= 1,024\n1 <= M <= 100,000\n|표에 채워진 수| <= 1,000',
    difficulty: 'medium',
    concept_tags: ['prefix-sum', '2d-array'],
    secondary_concept_tags: ['inclusion-exclusion'],
    intent_description: '2차원 누적합과 포함-배제 원리를 사용하여 2D 구간 합 쿼리를 O(1)에 응답할 수 있는지 확인.',
    key_observation: '2D prefix sum: prefix[i][j] = 왼쪽 위 (1,1)부터 (i,j)까지 합. 쿼리 = prefix[x2][y2] - prefix[x1-1][y2] - prefix[x2][y1-1] + prefix[x1-1][y1-1].',
    wrong_approaches: [
      '매 쿼리마다 2중 반복문으로 합산 O(N^2) — M*N^2 시간 초과',
      '1차원 누적합만 적용하면 한 방향만 최적화됨',
    ],
    live_coding_flow: {
      firstObservation:
        '2차원 배열에서 사각형 영역의 합을 여러 번 구해야 한다. 1차원 누적합을 2차원으로 확장.',
      approachCandidates: [
        '브루트포스: 매 쿼리 O(N^2) → O(MN^2)',
        '2D 누적합: 전처리 O(N^2), 쿼리 O(1) → O(N^2 + M)',
        '행별 1D 누적합: 쿼리 O(N) → O(MN)',
      ],
      whyThisApproach:
        '포함-배제 원리로 2D 누적합 구성. prefix[i][j] = A[i][j] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]. 쿼리도 같은 원리로 O(1).',
      wrongApproaches: [
        '1D 누적합만 적용하면 쿼리당 O(N)으로 부분 최적화',
        '포함-배제에서 중복 영역 빼기/더하기를 빼먹으면 오답',
      ],
      dataStructures: ['2D 누적합 배열 prefix[N+1][N+1]'],
      timeComplexity: 'O(N^2 + M)',
      pitfalls: [
        '포함-배제 공식에서 빼기/더하기 순서 실수 — 그림으로 확인 권장',
        '0행, 0열을 0으로 패딩하여 경계 처리 단순화',
        '인덱스가 1-based인 점 주의',
      ],
      interviewExplanation:
        '"2D 누적합을 구성합니다. prefix[i][j]는 (1,1)부터 (i,j)까지의 합입니다. 포함-배제 원리로 전처리하고, 쿼리마다 prefix[x2][y2] - prefix[x1-1][y2] - prefix[x2][y1-1] + prefix[x1-1][y1-1]로 O(1)에 답합니다. 전처리 O(N^2), 쿼리 O(1)입니다."',
    },
    source: { platform: 'boj' as any, id: 11660 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11720 — 숫자의 합
  // ──────────────────────────────────────────────────────
  {
    id: 'b011720-boj',
    title: '숫자의 합',
    description:
      'N개의 숫자가 공백 없이 쓰여 있다. 이 숫자를 모두 합해서 출력하는 프로그램을 작성하시오.\n\n첫째 줄에 숫자의 개수 N이, 둘째 줄에 숫자 N개가 공백 없이 주어진다.',
    constraints:
      '1 <= N <= 100\n각 숫자는 0~9',
    difficulty: 'easy',
    concept_tags: ['string', 'array'],
    secondary_concept_tags: [],
    intent_description: '문자열의 각 문자를 정수로 변환하여 합산하는 기초 구현 문제.',
    key_observation: '문자열을 한 글자씩 순회하며 각 문자에서 문자 "0"을 빼면(또는 parseInt) 정수로 변환할 수 있다.',
    wrong_approaches: [
      '전체 문자열을 하나의 숫자로 변환 시도 — 100자리 수는 일반 정수형 범위를 초과',
      'split 구분자를 잘못 지정하여 파싱 실패',
    ],
    live_coding_flow: {
      firstObservation:
        '공백 없이 이어진 숫자 문자열에서 각 자릿수를 추출하여 합산하면 된다.',
      approachCandidates: [
        '문자열 순회: 각 문자를 숫자로 변환 후 합산 O(N)',
      ],
      whyThisApproach:
        '문자열을 한 글자씩 순회하며 각 문자를 정수로 변환(char - "0" 또는 parseInt)하고 합산. O(N).',
      wrongApproaches: [
        '전체를 정수로 변환하면 100자리 수는 오버플로우',
        '공백 기준 split은 공백이 없으므로 동작하지 않음',
      ],
      dataStructures: ['변수: sum'],
      timeComplexity: 'O(N)',
      pitfalls: [
        'N과 실제 문자열 길이가 다를 수 있으므로 N만큼만 처리',
        '문자 "0"의 ASCII 코드를 빼서 정수 변환: char.charCodeAt(0) - 48',
      ],
      interviewExplanation:
        '"문자열을 한 글자씩 순회하며 각 문자를 숫자로 변환하고 합산합니다. 100자리까지이므로 합은 최대 900으로 int 범위 내입니다. O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 11720 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 12891 — DNA 비밀번호
  // ──────────────────────────────────────────────────────
  {
    id: 'b012891-boj',
    title: 'DNA 비밀번호',
    description:
      '임의의 DNA 문자열에서 부분 문자열을 비밀번호로 사용하려 한다.\nDNA 문자열은 A, C, G, T로만 구성되며, 비밀번호로 사용할 부분 문자열의 길이와 각 문자의 최소 개수 조건이 주어진다.\n\nDNA 문자열과 부분 문자열 길이 P, 각 문자(A, C, G, T)의 최소 개수가 주어졌을 때, 조건을 만족하는 비밀번호 종류의 수를 구하시오.',
    constraints:
      '1 <= P <= |DNA 문자열| <= 1,000,000\n0 <= 각 문자의 최소 개수',
    difficulty: 'medium',
    concept_tags: ['sliding-window', 'string'],
    secondary_concept_tags: ['hash-map', 'counting'],
    intent_description: '고정 크기 슬라이딩 윈도우로 문자 빈도를 유지하며 조건을 체크하는 문제.',
    key_observation: '길이 P의 윈도우를 한 칸씩 이동하며 들어오는 문자는 카운트 증가, 나가는 문자는 감소. 4개 문자의 카운트가 모두 최소 조건 이상이면 유효.',
    wrong_approaches: [
      '매 윈도우마다 P개 문자를 다시 세면 O(NP) — 시간 초과',
      '윈도우 이동 시 카운트 갱신을 빼먹는 실수',
    ],
    live_coding_flow: {
      firstObservation:
        '고정 길이 P의 부분 문자열에서 각 문자의 빈도를 확인해야 한다. 윈도우를 슬라이드하면서 빈도를 O(1)에 갱신 가능.',
      approachCandidates: [
        '브루트포스: 모든 부분 문자열에서 문자 세기 O(NP)',
        '슬라이딩 윈도우: 빈도 배열 유지 O(N)',
      ],
      whyThisApproach:
        '초기 윈도우 [0, P-1]의 빈도를 세고, 한 칸 이동할 때마다 나가는 문자 빈도 감소, 들어오는 문자 빈도 증가. 조건 체크는 O(1)(문자 4종).',
      wrongApproaches: [
        '매번 P개를 순회하면 O(NP) — N=10^6에서 비효율',
        '빈도 감소를 빼먹으면 오답',
      ],
      dataStructures: ['빈도 배열 cnt[4] (A, C, G, T)', '슬라이딩 윈도우 (left, right)'],
      timeComplexity: 'O(N)',
      pitfalls: [
        '초기 윈도우 구성 시 P개를 먼저 세고, 이후 슬라이드 시작',
        '최소 조건이 0인 문자는 항상 만족 — 별도 처리 불필요',
        '유효한 윈도우 수를 세는 것이므로 조건 만족 시 카운트 증가',
      ],
      interviewExplanation:
        '"크기 P의 슬라이딩 윈도우를 유지하면서 A, C, G, T의 빈도 배열을 갱신합니다. 윈도우를 오른쪽으로 한 칸 이동할 때 들어오는 문자 빈도를 증가, 나가는 문자 빈도를 감소시킵니다. 4개 문자 모두 최소 조건 이상이면 카운트합니다. O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 12891 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 17298 — 오큰수
  // ──────────────────────────────────────────────────────
  {
    id: 'b017298-boj',
    title: '오큰수',
    description:
      '크기가 N인 수열 A가 있다. 각 원소 A[i]에 대해 오큰수 NGE(i)를 구하려 한다.\nA[i]의 오큰수는 오른쪽에 있으면서 A[i]보다 큰 수 중 가장 왼쪽에 있는 수를 의미한다.\n그러한 수가 없으면 오큰수는 -1이다.\n\n예를 들어 A = [3, 5, 2, 7]이면 NGE(1)=5, NGE(2)=7, NGE(3)=7, NGE(4)=-1이다.',
    constraints:
      '1 <= N <= 1,000,000\n1 <= A[i] <= 1,000,000',
    difficulty: 'medium',
    concept_tags: ['stack', 'monotone-stack'],
    secondary_concept_tags: ['array'],
    intent_description: '모노톤 스택을 활용하여 각 원소의 오른쪽에서 처음 나타나는 더 큰 수를 O(N)에 구할 수 있는지 확인.',
    key_observation: '스택에 아직 오큰수를 찾지 못한 원소의 인덱스를 유지. 새 원소가 스택 top보다 크면, 해당 top의 오큰수가 결정된다.',
    wrong_approaches: [
      '각 원소마다 오른쪽을 순회 O(N^2) — N=10^6에서 시간 초과',
      '스택 대신 큐를 사용 — 가장 최근 원소부터 해결해야 하므로 LIFO 필요',
    ],
    live_coding_flow: {
      firstObservation:
        '각 원소의 오른쪽에서 가장 가까운 큰 수를 찾아야 한다. 왼쪽에서 오른쪽으로 순회하며 "아직 답을 못 찾은" 원소를 관리하면 효율적.',
      approachCandidates: [
        '브루트포스: 각 원소마다 오른쪽 스캔 O(N^2)',
        '모노톤 스택: 감소하는 스택 유지 O(N)',
      ],
      whyThisApproach:
        '스택에 인덱스를 넣으며 순회. 현재 원소 A[i]가 stack.top()의 값보다 크면, stack.top()의 오큰수는 A[i]. 이를 스택이 비거나 top이 A[i] 이상이 될 때까지 반복 후 i를 push.',
      wrongApproaches: [
        '오른쪽에서 왼쪽으로 순회해도 되지만 왼쪽→오른쪽이 더 직관적',
        '큐를 사용하면 FIFO라 가장 안쪽 원소를 먼저 처리할 수 없음',
      ],
      dataStructures: ['Stack<index> — 모노톤 감소 스택', '결과 배열 NGE[N]'],
      timeComplexity: 'O(N)',
      pitfalls: [
        '순회 종료 후 스택에 남은 인덱스는 오큰수가 없으므로 -1로 설정',
        '스택에 값이 아닌 인덱스를 저장해야 결과 배열에 올바르게 기록 가능',
        '출력이 N개이므로 빠른 I/O 사용',
      ],
      interviewExplanation:
        '"모노톤 스택을 사용합니다. 왼쪽에서 오른쪽으로 순회하며 스택에 인덱스를 유지합니다. 현재 A[i]가 stack top의 값보다 크면, top을 pop하고 그 인덱스의 오큰수를 A[i]로 설정합니다. 각 원소가 스택에 최대 한 번 push, 한 번 pop되므로 O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 17298 },
  },
];
