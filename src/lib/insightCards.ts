/**
 * Insight Cards — 알고리즘/개념 설명 카드 데이터
 * Home 화면에서 오늘의 문제 태그에 맞는 카드를 보여줌
 */

export interface InsightCard {
  tag: string;           // 매칭할 태그 (problem.tags 또는 category)
  title: string;
  desc: string;
  emoji: string;
}

export const INSIGHT_CARDS: InsightCard[] = [
  // ── Brute Force / 완전탐색 ──
  {
    tag: 'brute-force',
    title: 'Brute Force란?',
    desc: '가능한 모든 경우의 수를 하나씩 확인하는 방법이에요. 효율은 낮지만 정확성이 보장되고, 최적화의 출발점이 됩니다.',
    emoji: '🔍',
  },
  // ── DP ──
  {
    tag: 'dynamic-programming',
    title: 'Dynamic Programming',
    desc: '큰 문제를 작은 하위 문제로 나누고, 이미 계산한 결과를 저장해서 반복 계산을 피하는 기법이에요.',
    emoji: '📦',
  },
  {
    tag: 'dp',
    title: 'DP: 메모이제이션 vs 타뷸레이션',
    desc: 'Top-down(재귀+캐싱)과 Bottom-up(반복문+테이블) 두 가지 접근이 있어요. 둘 다 핵심은 "중복 계산 제거"입니다.',
    emoji: '🧠',
  },
  // ── Greedy ──
  {
    tag: 'greedy',
    title: 'Greedy Algorithm',
    desc: '매 순간 가장 좋아보이는 선택을 하는 전략이에요. 항상 최적해를 보장하진 않지만, 증명 가능한 경우 매우 효율적입니다.',
    emoji: '🎯',
  },
  // ── Graph ──
  {
    tag: 'graph',
    title: 'Graph 기초',
    desc: '노드(정점)와 간선으로 이루어진 자료구조예요. 네트워크, 경로 탐색, 의존성 관계 등을 표현할 수 있습니다.',
    emoji: '🕸️',
  },
  {
    tag: 'bfs',
    title: 'BFS: 너비 우선 탐색',
    desc: '큐를 사용해 가까운 노드부터 탐색해요. 최단 경로를 찾을 때 자주 쓰이며, 레벨 단위로 탐색합니다.',
    emoji: '🌊',
  },
  {
    tag: 'dfs',
    title: 'DFS: 깊이 우선 탐색',
    desc: '스택(또는 재귀)으로 한 방향을 끝까지 탐색한 뒤 되돌아와요. 경로 탐색, 사이클 감지 등에 유용합니다.',
    emoji: '🏊',
  },
  // ── Tree ──
  {
    tag: 'tree',
    title: 'Tree 자료구조',
    desc: '사이클이 없는 연결 그래프예요. 계층 구조를 표현하며, 이진 트리·힙·트라이 등 다양한 변형이 있습니다.',
    emoji: '🌳',
  },
  // ── Binary Search ──
  {
    tag: 'binary-search',
    title: 'Binary Search',
    desc: '정렬된 데이터에서 중간값과 비교해 탐색 범위를 절반씩 줄여요. O(log n)의 효율로 매우 빠릅니다.',
    emoji: '🔪',
  },
  // ── Sorting ──
  {
    tag: 'sorting',
    title: 'Sorting 알고리즘',
    desc: '데이터를 특정 순서로 정렬하는 기법이에요. 문제의 80%는 정렬 후 더 쉽게 풀립니다.',
    emoji: '📊',
  },
  // ── Stack / Queue ──
  {
    tag: 'stack',
    title: 'Stack & Queue',
    desc: 'Stack은 LIFO(후입선출), Queue는 FIFO(선입선출). 괄호 매칭, 히스토리 관리, 작업 스케줄링의 기본입니다.',
    emoji: '📚',
  },
  // ── Two Pointer ──
  {
    tag: 'two-pointer',
    title: 'Two Pointer 기법',
    desc: '배열의 양 끝 또는 같은 방향에서 두 포인터를 이동시키며 답을 찾아요. O(n²)을 O(n)으로 줄일 수 있습니다.',
    emoji: '👆',
  },
  // ── String ──
  {
    tag: 'string',
    title: 'String 처리',
    desc: '문자열 패턴 매칭, 파싱, 변환 등의 기법이에요. KMP, Rabin-Karp 같은 알고리즘으로 효율적으로 처리합니다.',
    emoji: '🔤',
  },
  // ── Number Theory ──
  {
    tag: 'number-theory',
    title: 'Number Theory',
    desc: '소수, GCD, 모듈러 연산 등 수학적 성질을 활용하는 기법이에요. 암호학의 기초이기도 합니다.',
    emoji: '🔢',
  },
  {
    tag: 'math',
    title: '수학적 사고',
    desc: '패턴을 수식으로 표현하면 코드가 간결해져요. 점화식, 조합론, 확률 등이 문제 풀이의 열쇠가 됩니다.',
    emoji: '🧮',
  },
  // ── Combinatorics ──
  {
    tag: 'combinatorics',
    title: 'Combinatorics',
    desc: '경우의 수를 세는 기법이에요. 순열, 조합, 이항 계수 등을 활용해 효율적으로 계산합니다.',
    emoji: '🎲',
  },
  // ── Simulation ──
  {
    tag: 'simulation',
    title: 'Simulation',
    desc: '문제에서 설명한 과정을 그대로 코드로 구현하는 방식이에요. 복잡한 규칙도 단계별로 따라가면 풀 수 있습니다.',
    emoji: '🎮',
  },
  // ── Implementation ──
  {
    tag: 'implementation',
    title: 'Implementation',
    desc: '알고리즘보다 구현력이 핵심인 문제예요. 조건 분기, 인덱스 관리, 예외 처리를 꼼꼼히 다뤄야 합니다.',
    emoji: '⚙️',
  },
  // ── Sliding Window ──
  {
    tag: 'sliding-window',
    title: 'Sliding Window',
    desc: '고정 또는 가변 크기의 구간을 밀며 최적값을 찾아요. 부분합, 최대/최소 구간 문제에 강력합니다.',
    emoji: '🪟',
  },
  // ── Backtracking ──
  {
    tag: 'backtracking',
    title: 'Backtracking',
    desc: '가능한 선택지를 탐색하다 조건에 맞지 않으면 되돌아가요. 브루트포스의 최적화 버전입니다.',
    emoji: '↩️',
  },
  // ── Divide and Conquer ──
  {
    tag: 'divide-and-conquer',
    title: 'Divide & Conquer',
    desc: '문제를 반으로 나누고, 각각 해결한 뒤 합쳐요. 병합정렬, 퀵정렬, 거듭제곱 분할 등에 사용됩니다.',
    emoji: '✂️',
  },
];

/**
 * 오늘의 문제 태그에 맞는 인사이트 카드 반환
 * 매칭되는 게 없으면 날짜 기반으로 랜덤 카드 반환
 */
export function getInsightForTags(tags: string[], category?: string): InsightCard {
  // 1) 태그 매칭
  for (const tag of tags) {
    const card = INSIGHT_CARDS.find((c) => c.tag === tag);
    if (card) return card;
  }

  // 2) 카테고리 매칭
  if (category) {
    const card = INSIGHT_CARDS.find((c) => c.tag === category);
    if (card) return card;
  }

  // 3) 날짜 기반 로테이션 (매일 다른 카드)
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return INSIGHT_CARDS[dayOfYear % INSIGHT_CARDS.length];
}
