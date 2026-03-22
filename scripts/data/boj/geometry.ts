import type { ProblemSeed } from '../problems';

export const BOJ_GEOMETRY: ProblemSeed[] = [
  // ──────────────────────────────────────────────────────
  // BOJ 1002 — 터렛
  // ──────────────────────────────────────────────────────
  {
    id: 'b001002-boj',
    title: '터렛',
    description:
      '조규현과 백승환은 터렛에 위치해 있다. 조규현의 좌표가 (x1, y1)이고 백승환의 좌표가 (x2, y2)일 때, 조규현이 레이더로 측정한 류재명과의 거리가 r1이고, 백승환이 측정한 거리가 r2이다.\n\n류재명이 있을 수 있는 좌표의 수를 구하시오.',
    constraints:
      '테스트 케이스 수 T <= 100\n-10,000 <= x1, y1, x2, y2 <= 10,000\n1 <= r1, r2 <= 10,000',
    difficulty: 'easy',
    concept_tags: ['geometry', 'math'],
    secondary_concept_tags: ['circle'],
    intent_description: '두 원의 교점 개수를 구하는 기하학 문제로, 원의 위치 관계를 거리와 반지름으로 분류할 수 있는지 확인.',
    key_observation: '두 원의 중심 거리 d와 반지름 r1, r2의 관계에 따라 교점 수가 결정된다: 0, 1, 2, 무한대.',
    wrong_approaches: [
      '실수 좌표를 직접 계산하여 교점 구하기 -- 정밀도 문제 및 오버킬',
      '거리를 sqrt로 구해서 비교 -- 부동소수점 오차 발생',
    ],
    live_coding_flow: {
      firstObservation:
        '(x1,y1)을 중심으로 반지름 r1인 원과 (x2,y2)를 중심으로 반지름 r2인 원의 교점 수를 구하는 문제다. 두 원의 중심 간 거리 d에 따라 교점이 0, 1, 2, 무한대(일치) 중 하나이다.',
      approachCandidates: [
        '원의 교점 공식으로 직접 좌표 계산',
        '거리와 반지름 관계로 경우의 수 분류 (추천)',
      ],
      whyThisApproach:
        'd^2 = (x2-x1)^2 + (y2-y1)^2를 구한 뒤, d와 r1+r2, |r1-r2|를 비교하여 분류한다. sqrt를 쓰지 않고 제곱 상태로 비교하면 정밀도 문제가 없다.',
      wrongApproaches: [
        'sqrt(d)로 실수 비교하면 부동소수점 오차로 경계 케이스 판정 실패',
        '교점 좌표를 직접 구하는 것은 불필요하게 복잡하고 정밀도 문제 발생',
      ],
      dataStructures: ['정수 변수: d^2, (r1+r2)^2, (r1-r2)^2'],
      timeComplexity: 'O(T) (각 케이스 O(1))',
      pitfalls: [
        '두 원이 완전히 일치하는 경우 (d=0, r1=r2): 답은 -1(무한)',
        'd^2 비교 시 오버플로우: 좌표 최대 20000 차이 -> d^2 최대 8*10^8 -> int 범위 내지만 long이 안전',
        '외접/내접(교점 1개) 케이스를 정확히 처리: d^2 == (r1+r2)^2 또는 d^2 == (r1-r2)^2',
        'd=0이지만 r1 != r2인 경우: 동심원으로 교점 0개',
      ],
      interviewExplanation:
        '"두 원의 교점 수를 구하는 문제입니다. d^2 = (x2-x1)^2 + (y2-y1)^2를 계산하고, sqrt 없이 제곱 상태로 비교합니다. d=0이고 r1=r2면 원이 일치하여 무한대(-1), d > r1+r2 또는 d < |r1-r2|면 0개, d = r1+r2 또는 d = |r1-r2|면 1개, 나머지는 2개입니다. 각 케이스 O(1)입니다."',
    },
    source: { platform: 'boj' as any, id: 1002 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 1004 — 어린 왕자
  // ──────────────────────────────────────────────────────
  {
    id: 'b001004-boj',
    title: '어린 왕자',
    description:
      '어린 왕자는 시작점에서 도착점으로 이동하려 한다. 도중에 행성계가 있는데, 각 행성계는 원형이다.\n\n행성계의 경계를 최소 횟수로 진입/이탈하면서 시작점에서 도착점까지 이동해야 한다.\n\n이때 행성계 경계를 지나는 최소 횟수를 구하시오. 시작점과 도착점은 어떤 행성계의 경계 위에 있지 않다.',
    constraints:
      '테스트 케이스 수 T\n행성계 수 N <= 50\n좌표: -1000 ~ 1000\n반지름: 1 ~ 1000\n시작점/도착점은 경계 위에 없음',
    difficulty: 'easy',
    concept_tags: ['geometry', 'math'],
    secondary_concept_tags: ['circle'],
    intent_description: '기하 문제에서 핵심 관찰을 통해 불필요한 계산을 줄이고, 원 안에 포함되는지만 판별하면 되는지 파악할 수 있는지 확인.',
    key_observation: '시작점만 포함하거나 도착점만 포함하는 원만 반드시 경계를 넘어야 한다. 둘 다 포함하거나 둘 다 포함하지 않는 원은 우회 가능.',
    wrong_approaches: [
      '최단 경로를 기하학적으로 계산 -- 오버킬, 불필요',
      '원끼리의 교점을 구하여 경로 탐색 -- 너무 복잡',
    ],
    live_coding_flow: {
      firstObservation:
        '직선 경로가 아니라 "경계를 넘는 최소 횟수"가 핵심이다. 시작점과 도착점이 한 원에 대해 같은 쪽(둘 다 안 또는 둘 다 밖)이면 그 원의 경계를 안 넘어도 된다. 한쪽만 원 안에 있으면 반드시 1번 넘어야 한다.',
      approachCandidates: [
        '기하 경로 탐색: 원들 사이의 최단 경로 계산',
        '단순 카운팅: 각 원에 대해 시작/도착 포함 여부 XOR (추천)',
      ],
      whyThisApproach:
        '각 원에 대해 시작점이 원 안에 있는지, 도착점이 원 안에 있는지 확인한다. 둘 중 하나만 안에 있으면 카운트 +1. 이것이 경계를 넘는 최소 횟수다.',
      wrongApproaches: [
        '실제 경로를 계산하려 하면 원들의 교차를 모두 처리해야 해서 불필요하게 복잡',
        '시작점과 도착점 모두 포함하는 원도 세면 안 됨 -- 원 안에서 이동하므로 경계를 안 넘음',
      ],
      dataStructures: ['카운터 변수'],
      timeComplexity: 'O(N) per test case',
      pitfalls: [
        '점이 원 안에 있는지 판별: (x-cx)^2 + (y-cy)^2 < r^2 (경계 위는 없다고 보장됨)',
        'XOR 조건: 시작점과 도착점 중 정확히 하나만 원 안에 있을 때만 카운트',
        '부동소수점 없이 정수 제곱 비교로 처리 가능',
      ],
      interviewExplanation:
        '"각 행성계(원)에 대해 시작점과 도착점이 원 내부에 있는지 판별합니다. 둘 다 안에 있거나 둘 다 밖에 있으면 경계를 넘을 필요가 없고, 하나만 안에 있으면 반드시 1번 넘어야 합니다. 이 횟수의 합이 답입니다. 점이 원 안에 있는지는 (x-cx)^2 + (y-cy)^2 < r^2로 판별합니다. 시간복잡도 O(N)입니다."',
    },
    source: { platform: 'boj' as any, id: 1004 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 2162 — 선분 그룹
  // ──────────────────────────────────────────────────────
  {
    id: 'b002162-boj',
    title: '선분 그룹',
    description:
      'N개의 선분들이 2차원 평면상에 주어져 있다. 두 선분이 서로 만나면(교차하거나 한 점에서 접하면) 같은 그룹에 속한다.\n\n그룹의 수와 가장 큰 그룹에 속하는 선분의 수를 구하시오.',
    constraints:
      '1 <= N <= 3,000\n좌표: -1,000,000 ~ 1,000,000 정수',
    difficulty: 'hard',
    concept_tags: ['geometry', 'union-find'],
    secondary_concept_tags: ['ccw', 'line-segment-intersection'],
    intent_description: 'CCW(외적)를 이용한 선분 교차 판정과 Union-Find를 결합하여 연결 컴포넌트를 구할 수 있는지 확인.',
    key_observation: '모든 선분 쌍에 대해 교차 여부를 판정하고, 교차하는 쌍을 Union-Find로 합치면 그룹을 구할 수 있다.',
    wrong_approaches: [
      'DFS/BFS로 그룹핑 -- 가능하지만 Union-Find가 더 깔끔',
      '직선의 교점을 직접 계산 -- 평행/겹침 등 예외가 복잡',
      'CCW 없이 기울기로 교차 판정 -- 수직선 등 예외 처리 어려움',
    ],
    live_coding_flow: {
      firstObservation:
        'N개의 선분에서 교차하는 것들을 같은 그룹으로 묶어야 한다. 모든 쌍 O(N^2)에 대해 교차 여부를 판정하고 Union-Find로 합치면 된다. 교차 판정은 CCW를 사용한다.',
      approachCandidates: [
        '모든 쌍 교차 판정 + Union-Find O(N^2)',
        '스윕 라인 + 이벤트 정렬 O(N log N) -- 구현 복잡',
      ],
      whyThisApproach:
        'N <= 3000이므로 O(N^2) = 9 * 10^6으로 충분하다. 모든 쌍에 대해 CCW 기반 선분 교차 판정을 하고, 교차하면 Union-Find로 합친다.',
      wrongApproaches: [
        '직선의 기울기와 절편으로 교점을 구하면 수직선, 평행선, 겹치는 선분 등 예외가 매우 많음',
        '부동소수점 교점 계산은 정밀도 문제 발생',
      ],
      dataStructures: ['Union-Find (path compression + union by rank)', 'CCW 함수'],
      timeComplexity: 'O(N^2 * alpha(N)) ~ O(N^2)',
      pitfalls: [
        'CCW가 0인 경우(일직선): 선분이 겹치는지 추가 판정 필요 -- 좌표 범위 체크',
        '선분 끝점에서 접하는 경우도 교차로 처리해야 함',
        '좌표가 -10^6 ~ 10^6이므로 CCW 계산 시 long long 필요 (최대 4 * 10^12)',
        'Union-Find에서 그룹 크기 관리: 각 루트에 size 배열 유지',
      ],
      interviewExplanation:
        '"모든 선분 쌍에 대해 CCW 기반으로 교차 여부를 판정합니다. CCW(A,B,C) * CCW(A,B,D) <= 0이고 CCW(C,D,A) * CCW(C,D,B) <= 0이면 교차합니다. CCW가 모두 0이면 일직선인 경우이므로 좌표 범위가 겹치는지 추가 확인합니다. 교차하는 쌍은 Union-Find로 합치고, 최종적으로 그룹 수와 최대 그룹 크기를 구합니다. 시간복잡도 O(N^2)이며, N <= 3000이므로 충분합니다."',
    },
    source: { platform: 'boj' as any, id: 2162 },
  },

  // ──────────────────────────────────────────────────────
  // BOJ 11758 — CCW
  // ──────────────────────────────────────────────────────
  {
    id: 'b011758-boj',
    title: 'CCW',
    description:
      '2차원 좌표 평면 위에 있는 세 점 P1, P2, P3가 주어졌을 때, 이 세 점의 방향성을 구하시오.\n\nP1 -> P2 -> P3 순서로 이동할 때 반시계 방향이면 1, 시계 방향이면 -1, 일직선이면 0을 출력한다.',
    constraints:
      '-10,000 <= x1, y1, x2, y2, x3, y3 <= 10,000\n세 점은 서로 다른 점',
    difficulty: 'easy',
    concept_tags: ['geometry', 'math'],
    secondary_concept_tags: ['cross-product'],
    intent_description: '외적(cross product)을 이용한 CCW 판정의 기본 원리를 이해하고 구현할 수 있는지 확인.',
    key_observation: '벡터 P1P2와 P1P3의 외적(cross product) 부호로 방향성을 판정한다.',
    wrong_approaches: [
      '각도를 직접 계산 -- atan2 사용 시 정밀도 문제',
      '기울기 비교 -- 수직선 예외 처리 필요',
    ],
    live_coding_flow: {
      firstObservation:
        '세 점의 방향성은 외적으로 판별한다. 벡터 P1P2 = (x2-x1, y2-y1), 벡터 P1P3 = (x3-x1, y3-y1)의 외적 값의 부호가 방향을 결정한다.',
      approachCandidates: [
        '외적(cross product): (x2-x1)*(y3-y1) - (y2-y1)*(x3-x1)의 부호 판정',
        '각도 계산: atan2 사용 -- 정밀도 이슈',
      ],
      whyThisApproach:
        '외적 값 = (x2-x1)*(y3-y1) - (y2-y1)*(x3-x1). 양수면 반시계(CCW), 음수면 시계(CW), 0이면 일직선. 정수 연산만으로 정확히 판별 가능.',
      wrongApproaches: [
        'atan2로 각도를 구하면 부동소수점 오차로 일직선 판정이 어려움',
        '기울기 비교는 수직선(x값 같을 때) 예외 처리가 필요하고 실수 오차 발생',
      ],
      dataStructures: ['정수 변수 하나 (외적 값)'],
      timeComplexity: 'O(1)',
      pitfalls: [
        '좌표가 -10000 ~ 10000이므로 차이는 최대 20000, 곱은 최대 4*10^8 -> int 범위 내지만 안전하게 long 사용',
        '외적 값이 0인 경우를 정확히 처리 (일직선)',
        '부호만 판별하면 되므로 절댓값은 불필요',
      ],
      interviewExplanation:
        '"외적(cross product)을 사용합니다. 벡터 P1P2와 P1P3의 외적 값 = (x2-x1)*(y3-y1) - (y2-y1)*(x3-x1)을 계산합니다. 양수면 반시계 방향(1), 음수면 시계 방향(-1), 0이면 일직선(0)입니다. 정수 연산만 사용하므로 오차가 없고, O(1)에 해결됩니다. 이 CCW 판정은 선분 교차, 볼록 껍질 등 다양한 기하 문제의 기본 빌딩 블록입니다."',
    },
    source: { platform: 'boj' as any, id: 11758 },
  },
];
