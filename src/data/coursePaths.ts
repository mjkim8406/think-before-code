/**
 * 코스 정의 — 10단계 순차 학습 경로
 *
 * 프로그래머스 고득점 Kit 기반 전통적 알고리즘 학습 순서:
 *
 *   Hash → Stack/Queue → Sort → Brute Force → DFS/BFS
 *     → Binary Search → Heap → Greedy → DP → Graph
 *
 * 각 주제는 4단계 레벨:
 *   beginner → basic → intermediate → advanced
 *
 * 한 주제의 advanced를 마치면 다음 주제의 beginner로 넘어간다.
 * 총 40개 코스 노드.
 *
 * courseTopic과 DB category는 별도 개념:
 *   - courseTopic: 학습 경로 주제 (10개)
 *   - dbCategory: DB problems 테이블의 category (라이브러리 필터용)
 *   - dbTags: 추가 필터링용 태그
 */

// ─── 타입 ─────────────────────────────────────────────────────

export type CourseLevel = 'beginner' | 'basic' | 'intermediate' | 'advanced';

export const COURSE_LEVEL_LABELS: Record<CourseLevel, string> = {
  beginner: '입문',
  basic: '기초',
  intermediate: '중급',
  advanced: '실전',
};

export type CourseTopic =
  | 'hash'
  | 'stack-queue'
  | 'sort'
  | 'brute-force'
  | 'dfs-bfs'
  | 'binary-search'
  | 'heap'
  | 'greedy'
  | 'dp'
  | 'graph';

export interface CourseNode {
  id: string;
  topic: CourseTopic;
  level: CourseLevel;
  title: string;
  description: string;
  goals: string[];
  /** 이 코스 완료 후 다음 코스 id */
  next?: string;
}

// ─── 주제 메타 ────────────────────────────────────────────────

export interface TopicMeta {
  id: CourseTopic;
  order: number;
  label: string;
  emoji: string;
  description: string;
  /** DB problems 테이블의 category */
  dbCategory: string;
  /** 추가 필터링용 태그 (OR 조건) */
  dbTags?: string[];
  nextTopic?: CourseTopic;
}

export const MAIN_PATH: TopicMeta[] = [
  {
    id: 'hash',
    order: 0,
    label: 'Hash',
    emoji: '#️⃣',
    description: 'Key-Value로 데이터를 빠르게 찾는 기본기',
    dbCategory: 'data-structures',
    dbTags: ['hash-map'],
    nextTopic: 'stack-queue',
  },
  {
    id: 'stack-queue',
    order: 1,
    label: 'Stack/Queue',
    emoji: '📚',
    description: 'LIFO와 FIFO — DFS/BFS의 기반 자료구조',
    dbCategory: 'data-structures',
    dbTags: ['stack', 'queue'],
    nextTopic: 'sort',
  },
  {
    id: 'sort',
    order: 2,
    label: 'Sort',
    emoji: '🔢',
    description: '정렬로 문제를 효율적으로 풀고 복잡도 감각을 키운다',
    dbCategory: 'sorting',
    nextTopic: 'brute-force',
  },
  {
    id: 'brute-force',
    order: 3,
    label: 'Brute Force',
    emoji: '💪',
    description: '모든 경우를 시도하는 완전탐색과 백트래킹',
    dbCategory: 'combinatorics',
    dbTags: ['backtracking', 'recursion'],
    nextTopic: 'dfs-bfs',
  },
  {
    id: 'dfs-bfs',
    order: 4,
    label: 'DFS/BFS',
    emoji: '🔍',
    description: '깊이/너비 우선 탐색으로 그래프와 격자를 탐험한다',
    dbCategory: 'graph',
    dbTags: ['dfs', 'bfs'],
    nextTopic: 'binary-search',
  },
  {
    id: 'binary-search',
    order: 5,
    label: 'Binary Search',
    emoji: '🎯',
    description: '정렬된 데이터에서 답을 반씩 좁혀가는 효율적 탐색',
    dbCategory: 'search',
    dbTags: ['binary-search'],
    nextTopic: 'heap',
  },
  {
    id: 'heap',
    order: 6,
    label: 'Heap',
    emoji: '⛰️',
    description: '우선순위 큐 — Greedy와 다익스트라의 핵심 도구',
    dbCategory: 'data-structures',
    dbTags: ['heap'],
    nextTopic: 'greedy',
  },
  {
    id: 'greedy',
    order: 7,
    label: 'Greedy',
    emoji: '🏃',
    description: '부분 최적이 전체 최적이 되는 탐욕적 선택',
    dbCategory: 'greedy',
    nextTopic: 'dp',
  },
  {
    id: 'dp',
    order: 8,
    label: 'DP',
    emoji: '📊',
    description: '불필요한 계산을 줄여 효율적으로 최적해를 찾는다',
    dbCategory: 'dp',
    nextTopic: 'graph',
  },
  {
    id: 'graph',
    order: 9,
    label: 'Graph',
    emoji: '🕸️',
    description: '다익스트라, 위상정렬, MST 등 고급 그래프 알고리즘',
    dbCategory: 'graph',
    dbTags: ['topological-sort', 'union-find'],
  },
];

// ─── 코스 노드 정의 (40개) ───────────────────────────────────

export const COURSE_NODES: CourseNode[] = [
  // ══ 1. Hash ═════════════════════════════════════════════
  {
    id: 'hash-beginner',
    topic: 'hash',
    level: 'beginner',
    title: 'Hash 입문',
    description: '해시맵의 기본 개념과 O(1) 탐색 원리',
    goals: [
      '해시맵이 왜 빠른지 이해한다',
      '해시맵으로 중복 체크를 한다',
      'Two Sum을 해시맵으로 해결한다',
    ],
    next: 'hash-basic',
  },
  {
    id: 'hash-basic',
    topic: 'hash',
    level: 'basic',
    title: 'Hash 기초',
    description: '빈도수 세기, 아나그램, 교집합',
    goals: [
      '빈도수 맵을 활용한 비교를 한다',
      '문자열 해시 패턴을 익힌다',
    ],
    next: 'hash-intermediate',
  },
  {
    id: 'hash-intermediate',
    topic: 'hash',
    level: 'intermediate',
    title: 'Hash 중급',
    description: '슬라이딩 윈도우 + 해시, 누적합 + 해시',
    goals: [
      '해시맵과 다른 기법을 조합한다',
      'subarray sum 패턴을 해결한다',
    ],
    next: 'hash-advanced',
  },
  {
    id: 'hash-advanced',
    topic: 'hash',
    level: 'advanced',
    title: 'Hash 실전',
    description: '해시 충돌 이해, 커스텀 해시, 해시 기반 설계',
    goals: [
      '해시 기반 자료구조를 설계한다',
      'Hash를 마스터하고 Stack/Queue로 넘어간다',
    ],
    next: 'stack-queue-beginner',
  },

  // ══ 2. Stack/Queue ══════════════════════════════════════
  {
    id: 'stack-queue-beginner',
    topic: 'stack-queue',
    level: 'beginner',
    title: 'Stack/Queue 입문',
    description: 'LIFO/FIFO 개념과 기본 연산',
    goals: [
      '스택과 큐의 차이를 이해한다',
      '괄호 매칭 문제를 스택으로 해결한다',
    ],
    next: 'stack-queue-basic',
  },
  {
    id: 'stack-queue-basic',
    topic: 'stack-queue',
    level: 'basic',
    title: 'Stack/Queue 기초',
    description: '기능개발, 프린터 큐, 후위표기식',
    goals: [
      '큐로 시뮬레이션 문제를 해결한다',
      '스택으로 수식 처리를 한다',
    ],
    next: 'stack-queue-intermediate',
  },
  {
    id: 'stack-queue-intermediate',
    topic: 'stack-queue',
    level: 'intermediate',
    title: 'Stack/Queue 중급',
    description: '단조 스택, 덱(Deque), 슬라이딩 윈도우 최대/최소',
    goals: [
      '단조 스택으로 Next Greater Element를 해결한다',
      '덱으로 슬라이딩 윈도우 최대값을 구한다',
    ],
    next: 'stack-queue-advanced',
  },
  {
    id: 'stack-queue-advanced',
    topic: 'stack-queue',
    level: 'advanced',
    title: 'Stack/Queue 실전',
    description: '히스토그램 최대 넓이, 복잡한 시뮬레이션',
    goals: [
      '스택/큐를 마스터하고 Sort로 넘어간다',
      '복합 자료구조 문제를 해결한다',
    ],
    next: 'sort-beginner',
  },

  // ══ 3. Sort ═════════════════════════════════════════════
  {
    id: 'sort-beginner',
    topic: 'sort',
    level: 'beginner',
    title: 'Sort 입문',
    description: '기본 정렬 알고리즘과 시간복잡도',
    goals: [
      'O(n²) vs O(n log n) 차이를 이해한다',
      '커스텀 비교 함수를 작성한다',
    ],
    next: 'sort-basic',
  },
  {
    id: 'sort-basic',
    topic: 'sort',
    level: 'basic',
    title: 'Sort 기초',
    description: 'K번째 수, 가장 큰 수, 좌표 압축',
    goals: [
      '정렬 기준 설계로 문제를 해결한다',
      '좌표 압축 기법을 이해한다',
    ],
    next: 'sort-intermediate',
  },
  {
    id: 'sort-intermediate',
    topic: 'sort',
    level: 'intermediate',
    title: 'Sort 중급',
    description: '다중 기준 정렬, 정렬 + 이분탐색, 인버전 카운트',
    goals: [
      '정렬 후 탐색 패턴을 활용한다',
      '다중 키 정렬을 설계한다',
    ],
    next: 'sort-advanced',
  },
  {
    id: 'sort-advanced',
    topic: 'sort',
    level: 'advanced',
    title: 'Sort 실전',
    description: '병합 정렬 응용, 안정 정렬 활용, 카운팅 소트',
    goals: [
      'Sort를 마스터하고 Brute Force로 넘어간다',
      '정렬 기반 고급 문제를 해결한다',
    ],
    next: 'brute-force-beginner',
  },

  // ══ 4. Brute Force (완전탐색) ═══════════════════════════
  {
    id: 'brute-force-beginner',
    topic: 'brute-force',
    level: 'beginner',
    title: '완전탐색 입문',
    description: '모든 경우를 시도하는 기본 전략',
    goals: [
      '반복문으로 모든 조합을 시도한다',
      '재귀의 기본 구조를 이해한다',
    ],
    next: 'brute-force-basic',
  },
  {
    id: 'brute-force-basic',
    topic: 'brute-force',
    level: 'basic',
    title: '완전탐색 기초',
    description: '순열/조합 생성, 부분집합',
    goals: [
      '재귀로 순열과 조합을 생성한다',
      '모든 부분집합을 탐색한다',
    ],
    next: 'brute-force-intermediate',
  },
  {
    id: 'brute-force-intermediate',
    topic: 'brute-force',
    level: 'intermediate',
    title: '완전탐색 중급',
    description: '백트래킹, 가지치기(pruning)',
    goals: [
      'N-Queens 류 문제를 백트래킹으로 해결한다',
      '가지치기로 탐색 공간을 줄인다',
    ],
    next: 'brute-force-advanced',
  },
  {
    id: 'brute-force-advanced',
    topic: 'brute-force',
    level: 'advanced',
    title: '완전탐색 실전',
    description: '비트마스크 완전탐색, 최적화 백트래킹',
    goals: [
      '완전탐색을 마스터하고 DFS/BFS로 넘어간다',
      '비트마스크로 상태를 표현한다',
    ],
    next: 'dfs-bfs-beginner',
  },

  // ══ 5. DFS/BFS ══════════════════════════════════════════
  {
    id: 'dfs-bfs-beginner',
    topic: 'dfs-bfs',
    level: 'beginner',
    title: 'DFS/BFS 입문',
    description: '그래프 표현과 기본 탐색',
    goals: [
      '인접 리스트로 그래프를 표현한다',
      'DFS/BFS로 모든 노드를 방문한다',
      'visited 배열의 역할을 이해한다',
    ],
    next: 'dfs-bfs-basic',
  },
  {
    id: 'dfs-bfs-basic',
    topic: 'dfs-bfs',
    level: 'basic',
    title: 'DFS/BFS 기초',
    description: '연결 요소, 섬 개수, BFS 최단거리',
    goals: [
      '격자에서 flood fill을 구현한다',
      'BFS로 가중치 없는 최단거리를 구한다',
    ],
    next: 'dfs-bfs-intermediate',
  },
  {
    id: 'dfs-bfs-intermediate',
    topic: 'dfs-bfs',
    level: 'intermediate',
    title: 'DFS/BFS 중급',
    description: 'multi-source BFS, 상태 공간 탐색, 이분 그래프',
    goals: [
      '여러 시작점에서 동시에 BFS를 수행한다',
      '상태를 확장한 BFS를 설계한다',
    ],
    next: 'dfs-bfs-advanced',
  },
  {
    id: 'dfs-bfs-advanced',
    topic: 'dfs-bfs',
    level: 'advanced',
    title: 'DFS/BFS 실전',
    description: '사이클 탐지, 경로 복원, 양방향 BFS',
    goals: [
      'DFS/BFS를 마스터하고 Binary Search로 넘어간다',
      '복합 그래프 탐색 문제를 해결한다',
    ],
    next: 'binary-search-beginner',
  },

  // ══ 6. Binary Search ════════════════════════════════════
  {
    id: 'binary-search-beginner',
    topic: 'binary-search',
    level: 'beginner',
    title: 'Binary Search 입문',
    description: '이분 탐색의 원리와 기본 구현',
    goals: [
      '이분 탐색이 왜 O(log n)인지 이해한다',
      'lower/upper bound를 구현한다',
    ],
    next: 'binary-search-basic',
  },
  {
    id: 'binary-search-basic',
    topic: 'binary-search',
    level: 'basic',
    title: 'Binary Search 기초',
    description: '정렬 배열 탐색, 파라메트릭 서치 입문',
    goals: [
      '답을 이분탐색하는 패턴을 익힌다',
      '조건 만족하는 최솟값/최댓값을 찾는다',
    ],
    next: 'binary-search-intermediate',
  },
  {
    id: 'binary-search-intermediate',
    topic: 'binary-search',
    level: 'intermediate',
    title: 'Binary Search 중급',
    description: '입국심사, 징검다리 등 파라메트릭 서치',
    goals: [
      '실수 범위 이분탐색을 구현한다',
      '복합 조건 이분탐색을 설계한다',
    ],
    next: 'binary-search-advanced',
  },
  {
    id: 'binary-search-advanced',
    topic: 'binary-search',
    level: 'advanced',
    title: 'Binary Search 실전',
    description: '이분 탐색 + 그리디/DP 결합',
    goals: [
      'Binary Search를 마스터하고 Heap으로 넘어간다',
      '실전 파라메트릭 서치를 독립적으로 설계한다',
    ],
    next: 'heap-beginner',
  },

  // ══ 7. Heap ═════════════════════════════════════════════
  {
    id: 'heap-beginner',
    topic: 'heap',
    level: 'beginner',
    title: 'Heap 입문',
    description: '힙의 구조와 우선순위 큐 기본',
    goals: [
      '최대힙/최소힙의 차이를 이해한다',
      '우선순위 큐로 최솟값을 빠르게 꺼낸다',
    ],
    next: 'heap-basic',
  },
  {
    id: 'heap-basic',
    topic: 'heap',
    level: 'basic',
    title: 'Heap 기초',
    description: 'Top-K 문제, 더 맵게, 디스크 컨트롤러',
    goals: [
      '힙으로 Top-K 문제를 해결한다',
      '이벤트 기반 시뮬레이션에 힙을 활용한다',
    ],
    next: 'heap-intermediate',
  },
  {
    id: 'heap-intermediate',
    topic: 'heap',
    level: 'intermediate',
    title: 'Heap 중급',
    description: '이중 우선순위 큐, 중앙값 유지, 힙 정렬',
    goals: [
      '두 개의 힙으로 중앙값을 관리한다',
      '복합 힙 문제를 해결한다',
    ],
    next: 'heap-advanced',
  },
  {
    id: 'heap-advanced',
    topic: 'heap',
    level: 'advanced',
    title: 'Heap 실전',
    description: '힙 + 그리디 조합, 커스텀 비교 힙',
    goals: [
      'Heap을 마스터하고 Greedy로 넘어간다',
      '힙 기반 최적화 문제를 설계한다',
    ],
    next: 'greedy-beginner',
  },

  // ══ 8. Greedy ═══════════════════════════════════════════
  {
    id: 'greedy-beginner',
    topic: 'greedy',
    level: 'beginner',
    title: 'Greedy 입문',
    description: '탐욕법의 기본 개념과 간단한 선택',
    goals: [
      '그리디 알고리즘이 무엇인지 이해한다',
      '정렬 후 선택하는 패턴을 익힌다',
      '그리디가 최적해를 보장하는 조건을 안다',
    ],
    next: 'greedy-basic',
  },
  {
    id: 'greedy-basic',
    topic: 'greedy',
    level: 'basic',
    title: 'Greedy 기초',
    description: '활동 선택, 회의실 배정, 점프 게임',
    goals: [
      '구간 스케줄링 문제를 그리디로 해결한다',
      '그리디 선택 속성을 판별한다',
    ],
    next: 'greedy-intermediate',
  },
  {
    id: 'greedy-intermediate',
    topic: 'greedy',
    level: 'intermediate',
    title: 'Greedy 중급',
    description: '그리디 + 정렬/힙, 구간 합치기, 작업 스케줄링',
    goals: [
      '그리디 + 자료구조 결합을 활용한다',
      '그리디 정당성 증명을 시도한다',
    ],
    next: 'greedy-advanced',
  },
  {
    id: 'greedy-advanced',
    topic: 'greedy',
    level: 'advanced',
    title: 'Greedy 실전',
    description: '그리디 vs DP 경계, 복합 그리디',
    goals: [
      'Greedy를 마스터하고 DP로 넘어간다',
      '그리디 vs DP 판단 기준을 세운다',
    ],
    next: 'dp-beginner',
  },

  // ══ 9. DP ═══════════════════════════════════════════════
  {
    id: 'dp-beginner',
    topic: 'dp',
    level: 'beginner',
    title: 'DP 입문',
    description: '점화식 세우기와 메모이제이션 기초',
    goals: [
      '재귀 → 메모이제이션 → 바텀업 변환을 이해한다',
      '간단한 1차원 DP를 작성할 수 있다',
    ],
    next: 'dp-basic',
  },
  {
    id: 'dp-basic',
    topic: 'dp',
    level: 'basic',
    title: 'DP 기초',
    description: '동전 교환, 최소 비용, 격자 경로',
    goals: [
      '상태 정의와 전이 함수를 명확히 설계한다',
      '2차원 DP 테이블을 구성한다',
    ],
    next: 'dp-intermediate',
  },
  {
    id: 'dp-intermediate',
    topic: 'dp',
    level: 'intermediate',
    title: 'DP 중급',
    description: 'Knapsack, LIS, LCS 등 고전 DP',
    goals: [
      '배낭 문제 변형을 해결한다',
      'LIS/LCS 패턴을 인식하고 구현한다',
    ],
    next: 'dp-advanced',
  },
  {
    id: 'dp-advanced',
    topic: 'dp',
    level: 'advanced',
    title: 'DP 실전',
    description: '비트마스크 DP, 구간 DP, 트리 DP',
    goals: [
      'DP를 마스터하고 Graph로 넘어간다',
      '고급 상태 압축 기법을 활용한다',
    ],
    next: 'graph-beginner',
  },

  // ══ 10. Graph ═══════════════════════════════════════════
  {
    id: 'graph-beginner',
    topic: 'graph',
    level: 'beginner',
    title: 'Graph 입문',
    description: '가중치 그래프와 최단경로 개념',
    goals: [
      '가중치 그래프를 표현한다',
      '다익스트라의 원리를 이해한다',
    ],
    next: 'graph-basic',
  },
  {
    id: 'graph-basic',
    topic: 'graph',
    level: 'basic',
    title: 'Graph 기초',
    description: '다익스트라, 위상 정렬',
    goals: [
      '다익스트라로 최단경로를 구한다',
      '위상 정렬로 의존 관계를 처리한다',
    ],
    next: 'graph-intermediate',
  },
  {
    id: 'graph-intermediate',
    topic: 'graph',
    level: 'intermediate',
    title: 'Graph 중급',
    description: 'Union-Find, MST(크루스칼), 벨만-포드',
    goals: [
      'Union-Find로 집합 관리를 한다',
      '최소 신장 트리를 구한다',
    ],
    next: 'graph-advanced',
  },
  {
    id: 'graph-advanced',
    topic: 'graph',
    level: 'advanced',
    title: 'Graph 실전',
    description: '플로이드-워셜, 네트워크 플로우, 복합 그래프',
    goals: [
      '전체 코스 완주! 🎉',
      '모든 쌍 최단거리를 구한다',
      '실전 수준 그래프 문제를 독립적으로 해결한다',
    ],
  },
];

// ─── 유틸리티 ─────────────────────────────────────────────────

/** 주제 + 레벨로 코스 노드 찾기 */
export function getCourseNode(topic: CourseTopic, level: CourseLevel): CourseNode | undefined {
  return COURSE_NODES.find((n) => n.topic === topic && n.level === level);
}

/** 주제의 모든 코스 노드 (레벨 순) */
export function getCoursesByTopic(topic: CourseTopic): CourseNode[] {
  const order: CourseLevel[] = ['beginner', 'basic', 'intermediate', 'advanced'];
  return COURSE_NODES
    .filter((n) => n.topic === topic)
    .sort((a, b) => order.indexOf(a.level) - order.indexOf(b.level));
}

/** 주제 메타 찾기 */
export function getTopicMeta(topic: CourseTopic): TopicMeta | undefined {
  return MAIN_PATH.find((t) => t.id === topic);
}

/** 다음 레벨 반환 */
export function getNextLevel(level: CourseLevel): CourseLevel | null {
  const order: CourseLevel[] = ['beginner', 'basic', 'intermediate', 'advanced'];
  const idx = order.indexOf(level);
  return idx < order.length - 1 ? order[idx + 1] : null;
}

/** 레벨 → 숫자 */
export function levelToNumber(level: CourseLevel): number {
  return { beginner: 0, basic: 1, intermediate: 2, advanced: 3 }[level];
}

/** 숫자 → 레벨 */
export function numberToLevel(n: number): CourseLevel {
  return (['beginner', 'basic', 'intermediate', 'advanced'] as CourseLevel[])[
    Math.max(0, Math.min(3, n))
  ];
}

/** 코스 전체 진행률 (0~1) */
export function overallProgress(completedNodeIds: string[]): number {
  const total = COURSE_NODES.length; // 40
  const done = COURSE_NODES.filter((n) => completedNodeIds.includes(n.id)).length;
  return total > 0 ? done / total : 0;
}

/** 다음 해야 할 코스 노드 (순서대로 첫 번째 미완료) */
export function getNextCourseNode(completedNodeIds: string[]): CourseNode | null {
  const completed = new Set(completedNodeIds);
  for (const node of COURSE_NODES) {
    if (!completed.has(node.id)) return node;
  }
  return null;
}

/**
 * 문제의 category + tags로 코스 주제를 결정한다.
 * 같은 DB category를 공유하는 주제들을 tags로 구분한다.
 * (e.g. data-structures → hash / stack-queue / heap)
 */
export function problemToCourseTopic(
  category: string,
  tags: string[] = [],
): CourseTopic | null {
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  switch (category) {
    case 'data-structures': {
      if (tagSet.has('heap') || tagSet.has('priority_queue') || tagSet.has('priority-queue'))
        return 'heap';
      if (tagSet.has('stack') || tagSet.has('queue') || tagSet.has('deque'))
        return 'stack-queue';
      // default: hash (hash-map, set, map, or generic data-structures)
      return 'hash';
    }
    case 'graph': {
      if (
        tagSet.has('topological-sort') ||
        tagSet.has('topological_sort') ||
        tagSet.has('union-find') ||
        tagSet.has('union_find') ||
        tagSet.has('dijkstra') ||
        tagSet.has('mst') ||
        tagSet.has('floyd-warshall') ||
        tagSet.has('bellman-ford')
      )
        return 'graph';
      // default: dfs-bfs
      return 'dfs-bfs';
    }
    case 'sorting':
      return 'sort';
    case 'combinatorics':
      return 'brute-force';
    case 'search':
      return 'binary-search';
    case 'greedy':
      return 'greedy';
    case 'dp':
      return 'dp';
    default:
      return null;
  }
}

/** 코스 주제 라벨 맵 (라이브러리 카테고리 탭용) */
export const COURSE_TOPIC_LABELS: Record<string, string> = {
  hash: 'Hash',
  'stack-queue': 'Stack/Queue',
  sort: 'Sort',
  'brute-force': 'Brute Force',
  'dfs-bfs': 'DFS/BFS',
  'binary-search': 'Binary Search',
  heap: 'Heap',
  greedy: 'Greedy',
  dp: 'DP',
  graph: 'Graph',
};
