import type { ProblemSeed } from '../problems';

export const BOJ_SORTING: ProblemSeed[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1377 — 버블 소트
  // ──────────────────────────────────────────────────────
  {
    id: 'b001377-boj',
    title: '버블 소트',
    description:
      '버블 소트 알고리즘을 다음과 같이 구현했다.\n\nbool changed = false;\nfor (int i=1; i<=N+1; i++) {\n    changed = false;\n    for (int j=1; j<=N-i; j++) {\n        if (A[j] > A[j+1]) {\n            changed = true;\n            swap(A[j], A[j+1]);\n        }\n    }\n    if (changed == false) {\n        cout << i << endl;\n        break;\n    }\n}\n\n위 코드에서 출력되는 i의 값을 구하시오.\n즉, 버블 소트에서 더 이상 교환이 일어나지 않는 첫 번째 패스 번호를 구한다.',
    constraints:
      '1 <= N <= 500,000',
    difficulty: 'hard',
    concept_tags: ['sorting', 'array'],
    secondary_concept_tags: ['index-tracking'],
    intent_description: '버블 소트의 특성을 분석하여 실제 시뮬레이션 없이 O(N log N)에 답을 구할 수 있는지 확인.',
    key_observation: '버블 소트의 각 패스에서 원소는 왼쪽으로 최대 1칸만 이동한다. 따라서 답은 max(정렬 전 인덱스 - 정렬 후 인덱스) + 1이다.',
    wrong_approaches: [
      '실제 버블 소트 시뮬레이션 O(N^2) — N=500000이면 시간 초과',
      '단순히 역전 수(inversion count)만으로는 패스 횟수를 바로 구할 수 없음',
    ],
    live_coding_flow: {
      firstObservation:
        '버블 소트를 O(N^2)으로 직접 시뮬레이션하면 시간 초과. 핵심 성질: 한 패스에서 각 원소는 왼쪽으로 최대 1칸 이동한다.',
      approachCandidates: [
        '버블 소트 시뮬레이션: O(N^2) — 시간 초과',
        '정렬 전후 인덱스 비교: O(N log N)',
      ],
      whyThisApproach:
        '(값, 원래인덱스) 쌍으로 정렬. 각 원소에 대해 (원래 인덱스 - 정렬 후 인덱스)의 최댓값이 왼쪽 이동 최대 거리. 답 = 이 최댓값 + 1.',
      wrongApproaches: [
        '직접 시뮬레이션은 O(N^2)으로 시간 초과',
        '오른쪽 이동 거리를 구하는 실수 — 왼쪽 이동 거리가 패스 수를 결정',
      ],
      dataStructures: ['(값, 원래인덱스) 쌍 배열'],
      timeComplexity: 'O(N log N)',
      pitfalls: [
        '같은 값이 여러 개일 때 안정 정렬을 사용하거나 원래 인덱스로 추가 정렬',
        '왼쪽 이동 거리가 음수인 경우(오른쪽으로 이동한 경우)는 0으로 처리',
        '답에 +1을 빠뜨리면 오답 — 마지막으로 교환이 없는 패스를 포함',
      ],
      interviewExplanation:
        '"버블 소트에서 한 패스당 원소는 왼쪽으로 최대 1칸 이동합니다. 따라서 어떤 원소가 왼쪽으로 k칸 이동해야 한다면 최소 k번의 패스가 필요합니다. (값, 원래 인덱스)로 정렬한 뒤 max(원래 인덱스 - 정렬 후 인덱스)를 구하고 +1하면 답입니다. O(N log N)입니다."',
    },
    source: { platform: 'boj' as any, id: 1377 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1427 — 소트인사이드
  // ──────────────────────────────────────────────────────
  {
    id: 'b001427-boj',
    title: '소트인사이드',
    description:
      '배열을 정렬하는 것은 쉽다. 수가 주어지면, 그 수의 각 자릿수를 내림차순으로 정렬해 보자.\n\n첫째 줄에 정렬하고자 하는 수 N이 주어진다. N은 1,000,000,000보다 작거나 같은 자연수이다.',
    constraints:
      '1 <= N <= 1,000,000,000',
    difficulty: 'easy',
    concept_tags: ['sorting', 'string'],
    secondary_concept_tags: [],
    intent_description: '숫자의 각 자릿수를 분리하고 내림차순 정렬하는 기초 문제.',
    key_observation: '숫자를 문자열로 변환하여 각 자릿수를 배열에 저장한 뒤 내림차순 정렬.',
    wrong_approaches: [
      '숫자 연산(나누기, 나머지)으로 자릿수 분리 — 가능하지만 문자열 변환이 더 간단',
    ],
    live_coding_flow: {
      firstObservation:
        '수의 각 자릿수를 분리하여 내림차순으로 정렬하면 된다. 문자열로 변환하면 자릿수 분리가 쉽다.',
      approachCandidates: [
        '문자열 변환 → 각 문자 배열 → 내림차순 정렬 → 결합',
        '나머지 연산으로 자릿수 분리 → 정렬',
        '카운팅 정렬: 0~9 카운트 → 9부터 출력',
      ],
      whyThisApproach:
        '문자열로 변환 후 각 문자를 배열에 넣고 내림차순 정렬. 최대 10자리이므로 어떤 정렬이든 상수 시간.',
      wrongApproaches: [
        '자릿수 분리 없이 숫자를 직접 정렬하려는 시도 — 의미 없음',
      ],
      dataStructures: ['문자 배열 또는 정수 배열 (최대 10개)'],
      timeComplexity: 'O(d log d) (d는 자릿수, 최대 10)',
      pitfalls: [
        '내림차순 정렬: 비교 함수를 반대로 설정하거나 정렬 후 reverse',
        '출력 시 배열을 다시 문자열로 결합',
      ],
      interviewExplanation:
        '"숫자를 문자열로 변환하고 각 자릿수를 배열에 넣습니다. 내림차순 정렬 후 결합하여 출력합니다. 최대 10자리이므로 정렬은 상수 시간입니다."',
    },
    source: { platform: 'boj' as any, id: 1427 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1517 — 버블 소트 (역전의 수)
  // ──────────────────────────────────────────────────────
  {
    id: 'b001517-boj',
    title: '버블 소트',
    description:
      'N개의 수로 이루어진 수열이 있다. 이 수열에 대해 버블 소트를 수행할 때, swap이 총 몇 번 발생하는지 구하는 프로그램을 작성하시오.\n\n버블 소트는 인접한 두 원소를 비교하여 순서가 잘못되어 있으면 교환하는 정렬 알고리즘이다.',
    constraints:
      '1 <= N <= 500,000',
    difficulty: 'hard',
    concept_tags: ['merge-sort', 'divide-and-conquer'],
    secondary_concept_tags: ['inversion-count', 'segment-tree', 'bit'],
    intent_description: '버블 소트의 교환 횟수가 역전 쌍(inversion)의 수와 같다는 성질을 이용하여 O(N log N)에 구할 수 있는지 확인.',
    key_observation: '버블 소트의 swap 횟수 = 배열의 역전 쌍 수. 역전 쌍은 병합 정렬의 merge 단계에서 O(N log N)에 셀 수 있다.',
    wrong_approaches: [
      '실제 버블 소트 시뮬레이션 O(N^2) — 시간 초과',
      '단순 이중 반복문으로 역전 쌍 카운트 O(N^2)',
    ],
    live_coding_flow: {
      firstObservation:
        '버블 소트의 교환 횟수 = i < j이고 A[i] > A[j]인 쌍의 수(역전 쌍). 이를 효율적으로 세야 한다.',
      approachCandidates: [
        '병합 정렬 변형: merge 시 역전 쌍 카운트 O(N log N)',
        'BIT/세그먼트 트리: 각 원소 삽입 시 이전 원소 중 큰 것의 수 카운트 O(N log N)',
        '브루트포스: 이중 반복문 O(N^2) — 시간 초과',
      ],
      whyThisApproach:
        '병합 정렬의 merge 단계에서 오른쪽 배열 원소가 왼쪽보다 먼저 결과에 들어가면, 왼쪽에 남은 원소 수만큼 역전 쌍이 추가된다. 정렬 과정에서 자연스럽게 카운트.',
      wrongApproaches: [
        '버블 소트 직접 시뮬레이션은 O(N^2)으로 N=500000에서 시간 초과',
        '역전 쌍 수가 int 범위를 초과할 수 있으므로 long 타입 필수',
      ],
      dataStructures: ['병합 정렬용 임시 배열'],
      timeComplexity: 'O(N log N)',
      pitfalls: [
        '역전 쌍 수가 최대 N*(N-1)/2 ≈ 1.25*10^11 → long 타입 사용 필수',
        'merge 시 왼쪽 포인터가 이동할 때는 카운트 증가 없음, 오른쪽 포인터가 이동할 때만 증가',
        '같은 값에 대해 swap하지 않으므로 A[left] <= A[right]일 때 왼쪽 우선',
      ],
      interviewExplanation:
        '"버블 소트의 swap 횟수는 역전 쌍의 수와 같습니다. 병합 정렬의 merge 단계에서 오른쪽 원소가 왼쪽 원소보다 먼저 선택될 때, 왼쪽에 남은 원소 수만큼 역전 쌍을 추가합니다. O(N log N)이며 결과는 long 타입으로 관리합니다."',
    },
    source: { platform: 'boj' as any, id: 1517 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2750 — 수 정렬하기
  // ──────────────────────────────────────────────────────
  {
    id: 'b002750-boj',
    title: '수 정렬하기',
    description:
      'N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오.',
    constraints:
      '1 <= N <= 1,000\n|수| <= 1,000\n수는 중복되지 않는다.',
    difficulty: 'easy',
    concept_tags: ['sorting'],
    secondary_concept_tags: [],
    intent_description: 'O(N^2) 정렬 알고리즘(선택, 삽입, 버블 정렬)을 직접 구현할 수 있는지 확인하는 기초 문제.',
    key_observation: 'N <= 1000이므로 O(N^2) 정렬도 충분. 기본 정렬 알고리즘 구현 연습에 적합.',
    wrong_approaches: [
      '정렬 알고리즘의 경계 조건 실수 — off-by-one 에러',
    ],
    live_coding_flow: {
      firstObservation:
        'N이 최대 1000이므로 O(N^2) 정렬도 시간 내에 동작한다. 선택 정렬, 삽입 정렬 등을 직접 구현해볼 수 있다.',
      approachCandidates: [
        '선택 정렬: 최솟값을 찾아 앞으로 이동 O(N^2)',
        '삽입 정렬: 각 원소를 적절한 위치에 삽입 O(N^2)',
        '버블 정렬: 인접 원소 비교 교환 O(N^2)',
        '내장 sort 함수: O(N log N)',
      ],
      whyThisApproach:
        'N이 작으므로 어떤 정렬이든 가능. 면접에서는 기본 O(N^2) 정렬을 직접 구현하는 연습이 중요.',
      wrongApproaches: [
        '반복문 범위 설정 실수 — i < N vs i <= N',
      ],
      dataStructures: ['배열'],
      timeComplexity: 'O(N^2) 또는 O(N log N)',
      pitfalls: [
        '선택 정렬: 최솟값 인덱스를 기억하고 swap — 값 복사 실수 주의',
        '삽입 정렬: 뒤에서부터 비교하며 시프트',
        '중복이 없다고 명시되어 있지만 등호 처리는 습관적으로 포함 권장',
      ],
      interviewExplanation:
        '"N이 1000 이하이므로 O(N^2) 정렬로 충분합니다. 선택 정렬로 구현하면: 각 위치에서 나머지 중 최솟값을 찾아 swap합니다. 내장 정렬을 쓰면 O(N log N)이지만, 면접에서는 기본 정렬 구현을 보여주는 것이 좋습니다."',
    },
    source: { platform: 'boj' as any, id: 2750 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2751 — 수 정렬하기 2
  // ──────────────────────────────────────────────────────
  {
    id: 'b002751-boj',
    title: '수 정렬하기 2',
    description:
      'N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오.',
    constraints:
      '1 <= N <= 1,000,000\n|수| <= 1,000,000\n수는 중복되지 않는다.',
    difficulty: 'easy',
    concept_tags: ['sorting'],
    secondary_concept_tags: ['merge-sort', 'heap-sort'],
    intent_description: 'N이 크므로 O(N log N) 정렬 알고리즘을 사용해야 하는 문제. 병합 정렬 또는 내장 정렬 활용.',
    key_observation: 'N = 10^6이므로 O(N^2) 정렬은 시간 초과. O(N log N) 보장 정렬(병합, 힙) 또는 내장 sort 사용.',
    wrong_approaches: [
      '버블/선택/삽입 정렬 O(N^2) — N=10^6에서 시간 초과',
      '퀵소트 최악 O(N^2) — 특정 입력에서 시간 초과 가능',
    ],
    live_coding_flow: {
      firstObservation:
        'N이 최대 100만이므로 O(N^2) 정렬은 불가능. O(N log N) 보장 알고리즘이 필요.',
      approachCandidates: [
        '병합 정렬: O(N log N) 보장',
        '힙 정렬: O(N log N) 보장',
        '퀵소트: 평균 O(N log N), 최악 O(N^2)',
        '내장 sort: 언어별 O(N log N)',
      ],
      whyThisApproach:
        '병합 정렬은 항상 O(N log N)을 보장하며 안정 정렬이다. 실무에서는 내장 sort를 사용하지만 면접에서는 병합 정렬 구현을 요구할 수 있다.',
      wrongApproaches: [
        'O(N^2) 정렬은 시간 초과',
        '퀵소트는 최악의 경우 O(N^2) — 피벗 선택 전략이 중요',
      ],
      dataStructures: ['배열', '(병합 정렬 시) 임시 배열'],
      timeComplexity: 'O(N log N)',
      pitfalls: [
        '빠른 I/O 필수: N=10^6에서 느린 I/O는 TLE 원인',
        '병합 정렬 구현 시 임시 배열의 메모리 할당 위치 — 매번 새로 할당하면 느림',
        '퀵소트 사용 시 랜덤 피벗 또는 median-of-three 전략 적용',
      ],
      interviewExplanation:
        '"N이 100만이므로 O(N log N) 정렬이 필요합니다. 병합 정렬을 사용하면 항상 O(N log N)을 보장합니다. 배열을 반으로 나누어 재귀 정렬 후 merge합니다. 빠른 I/O를 사용하여 입출력 병목을 방지합니다."',
    },
    source: { platform: 'boj' as any, id: 2751 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 10989 — 수 정렬하기 3
  // ──────────────────────────────────────────────────────
  {
    id: 'b010989-boj',
    title: '수 정렬하기 3',
    description:
      'N개의 수가 주어졌을 때, 이를 오름차순으로 정렬하는 프로그램을 작성하시오.',
    constraints:
      '1 <= N <= 10,000,000\n1 <= 수 <= 10,000',
    difficulty: 'easy',
    concept_tags: ['counting-sort', 'sorting'],
    secondary_concept_tags: [],
    intent_description: '값의 범위가 작고 N이 매우 클 때 카운팅 정렬을 적용하여 O(N+K)에 해결할 수 있는지 확인.',
    key_observation: '수의 범위가 1~10000으로 작고 N이 최대 10^7. 카운팅 정렬로 O(N+K), K=10000.',
    wrong_approaches: [
      '비교 기반 정렬 O(N log N) — N=10^7이면 메모리와 시간 모두 빡빡',
      '모든 수를 배열에 저장 후 정렬 — 메모리 초과 가능(Java 등)',
    ],
    live_coding_flow: {
      firstObservation:
        'N이 최대 1000만, 값 범위는 1~10000. 비교 정렬 O(N log N)도 빡빡하고, 카운팅 정렬이 최적.',
      approachCandidates: [
        '카운팅 정렬: cnt[v]에 빈도 저장 후 순서대로 출력 O(N+K)',
        '내장 sort: O(N log N) — 가능하지만 메모리/시간 여유 적음',
      ],
      whyThisApproach:
        '값 범위 K=10000이 작으므로 크기 10001의 카운트 배열만 있으면 된다. 입력을 읽으며 카운트하고, 1부터 10000까지 카운트만큼 출력.',
      wrongApproaches: [
        'N개의 수를 모두 배열에 저장하면 메모리 초과 위험 (언어에 따라)',
        '퀵소트 등 비교 정렬은 상수가 크면 시간 초과',
      ],
      dataStructures: ['카운트 배열 cnt[10001]'],
      timeComplexity: 'O(N + K), K = 10000',
      pitfalls: [
        '메모리 제한이 빡빡(8MB 등): 수를 배열에 저장하지 말고 카운트만',
        '빠른 I/O 필수: N=10^7에서 느린 I/O는 TLE',
        '출력량이 매우 많으므로 StringBuilder 또는 BufferedWriter 사용',
      ],
      interviewExplanation:
        '"값 범위가 1~10000으로 작으므로 카운팅 정렬을 사용합니다. 크기 10001의 배열에 각 값의 빈도를 저장하고, 1부터 순서대로 빈도만큼 출력합니다. O(N+K)이며 메모리도 최소화됩니다."',
    },
    source: { platform: 'boj' as any, id: 10989 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11004 — K번째 수
  // ──────────────────────────────────────────────────────
  {
    id: 'b011004-boj',
    title: 'K번째 수',
    description:
      '수 N개 A1, A2, ..., AN이 주어진다. A를 오름차순 정렬했을 때, 앞에서부터 K번째에 있는 수를 구하는 프로그램을 작성하시오.',
    constraints:
      '1 <= N <= 5,000,000\n1 <= K <= N\n|A[i]| <= 10^9',
    difficulty: 'medium',
    concept_tags: ['sorting', 'quick-select'],
    secondary_concept_tags: ['divide-and-conquer'],
    intent_description: '전체 정렬 없이 K번째 원소를 평균 O(N)에 찾는 퀵 셀렉트 또는 O(N log N) 정렬 후 인덱싱으로 해결.',
    key_observation: '정렬 후 K번째 원소를 출력하면 O(N log N). 퀵 셀렉트를 쓰면 평균 O(N)이지만 구현이 복잡.',
    wrong_approaches: [
      'O(N^2) 정렬 — N=5*10^6에서 시간 초과',
      '퀵 셀렉트의 최악 O(N^2) — 피벗 전략 미흡',
    ],
    live_coding_flow: {
      firstObservation:
        'K번째로 작은 수를 찾아야 한다. 가장 단순한 방법은 정렬 후 A[K-1] 출력.',
      approachCandidates: [
        '정렬 후 인덱싱: O(N log N)',
        '퀵 셀렉트: 평균 O(N), 최악 O(N^2)',
        'Introselect: 최악 O(N) 보장 (구현 복잡)',
      ],
      whyThisApproach:
        '실전에서는 내장 정렬 O(N log N)이 가장 안전. 퀵 셀렉트는 평균 O(N)이지만 최악을 피하려면 랜덤 피벗 필수.',
      wrongApproaches: [
        'O(N^2) 정렬은 시간 초과',
        '퀵 셀렉트에서 피벗을 항상 첫 원소로 잡으면 정렬된 입력에서 O(N^2)',
      ],
      dataStructures: ['배열'],
      timeComplexity: 'O(N log N) (정렬) 또는 평균 O(N) (퀵 셀렉트)',
      pitfalls: [
        'N=5*10^6이므로 빠른 I/O 필수',
        '퀵 셀렉트 구현 시 파티션 결과에 따라 재귀 방향 결정',
        'K가 1-indexed인지 0-indexed인지 확인',
      ],
      interviewExplanation:
        '"가장 안전한 방법은 O(N log N) 정렬 후 K번째 원소를 출력하는 것입니다. 최적화하려면 퀵 셀렉트를 사용하여 평균 O(N)에 K번째 원소를 찾을 수 있습니다. 피벗을 랜덤으로 선택하여 최악의 경우를 방지합니다."',
    },
    source: { platform: 'boj' as any, id: 11004 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11399 — ATM
  // ──────────────────────────────────────────────────────
  {
    id: 'b011399-boj',
    title: 'ATM',
    description:
      '인하은행에는 ATM이 1대밖에 없다. N명의 사람이 줄을 서 있고, i번째 사람이 돈을 인출하는 데 걸리는 시간은 Pi분이다.\n\n각 사람이 돈을 인출하는 데 필요한 시간의 합의 최솟값을 구하는 프로그램을 작성하시오.\n예를 들어 [3, 1, 4, 3, 2]이면 순서를 [1, 2, 3, 3, 4]로 바꾸면 1+(1+2)+(1+2+3)+(1+2+3+3)+(1+2+3+3+4) = 32가 최소이다.',
    constraints:
      '1 <= N <= 1,000\n1 <= Pi <= 1,000',
    difficulty: 'easy',
    concept_tags: ['sorting', 'greedy'],
    secondary_concept_tags: ['prefix-sum'],
    intent_description: '대기 시간 최소화를 위해 작업 시간이 짧은 순으로 정렬하는 그리디 전략(SJF)을 적용하는 문제.',
    key_observation: '인출 시간이 짧은 사람부터 먼저 처리하면 전체 대기 시간의 합이 최소. SJF(Shortest Job First) 원리.',
    wrong_approaches: [
      '입력 순서 그대로 처리 — 최적이 아님',
      '가장 긴 작업부터 처리 — 대기 시간이 극대화되어 최악',
    ],
    live_coding_flow: {
      firstObservation:
        'i번째 사람의 대기 시간은 앞 사람들의 처리 시간 합. 처리 시간이 짧은 사람이 앞에 올수록 전체 합이 줄어든다.',
      approachCandidates: [
        '그리디: 오름차순 정렬 후 누적합 계산',
        '모든 순열 탐색: O(N!) — 불가',
      ],
      whyThisApproach:
        '오름차순 정렬하면 각 사람의 대기 시간이 최소화된다. i번째 사람의 실제 소요 시간은 P[1]+...+P[i]. 이 누적합의 합이 답.',
      wrongApproaches: [
        '정렬하지 않고 그냥 합산하면 최솟값이 아님',
        '내림차순 정렬은 긴 작업이 앞에 와서 대기 시간이 커짐',
      ],
      dataStructures: ['정렬된 배열'],
      timeComplexity: 'O(N log N)',
      pitfalls: [
        '누적합의 합 계산: 이중 반복이 아닌 단일 반복으로도 가능 — sum += P[i] * (N - i)',
        '정렬 후 누적합 배열을 만들고 다시 합산하거나, 가중치 공식 사용',
      ],
      interviewExplanation:
        '"처리 시간이 짧은 사람을 먼저 배치하면 전체 대기 시간이 최소입니다(SJF 원리). 오름차순 정렬 후 누적합을 구하면 됩니다. P[i]는 (N-i)명에게 영향을 미치므로 답 = sum(P[i] * (N-i))로도 계산 가능합니다. O(N log N)입니다."',
    },
    source: { platform: 'boj' as any, id: 11399 },
  },
];
