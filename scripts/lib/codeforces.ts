/**
 * Codeforces API wrapper
 *
 * 제공: 문제 이름, 태그, 난이도(rating), contestId, index
 * 미제공: 문제 본문 (HTML만 존재, API 없음)
 *
 * Docs: https://codeforces.com/apiHelp
 */

export interface CFProblem {
  contestId: number;
  index: string;      // 'A', 'B', 'C', ...
  name: string;
  type: 'PROGRAMMING' | 'QUESTION';
  rating?: number;
  tags: string[];
}

interface CFProblemSetResponse {
  status: 'OK' | 'FAILED';
  result: {
    problems: CFProblem[];
    problemStatistics: { contestId: number; index: string; solvedCount: number }[];
  };
}

/** Codeforces 전체 문제 목록 fetch (태그 필터 가능) */
export async function fetchCFProblems(tags?: string[]): Promise<CFProblem[]> {
  const url = new URL('https://codeforces.com/api/problemset.problems');
  if (tags?.length) url.searchParams.set('tags', tags.join(';'));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Codeforces API error: ${res.status}`);

  const data: CFProblemSetResponse = await res.json();
  if (data.status !== 'OK') throw new Error('Codeforces API returned FAILED');

  return data.result.problems;
}

/** Codeforces problem URL 생성 */
export function cfProblemUrl(contestId: number, index: string): string {
  return `https://codeforces.com/problemset/problem/${contestId}/${index}`;
}

// ─────────────────────────────────────────────
// Tag mapping: Codeforces → our CONCEPT_TAGS
// ─────────────────────────────────────────────

const CF_TAG_MAP: Record<string, string> = {
  'dp': 'dynamic-programming',
  'dynamic programming': 'dynamic-programming',
  'greedy': 'greedy',
  'graphs': 'graph',
  'graph matchings': 'graph',
  'trees': 'tree',
  'binary search': 'binary-search',
  'two pointers': 'two-pointer',
  'strings': 'string',
  'string suffix structures': 'trie',
  'sorting': 'sorting',
  'data structures': 'array',
  'arrays': 'array',
  'bitmasks': 'bit-manipulation',
  'math': 'math',
  'number theory': 'math',
  'combinatorics': 'math',
  'brute force': 'backtracking',
  'dfs and similar': 'dfs',
  'bfs': 'bfs',
  'shortest paths': 'bfs',
  'divide and conquer': 'divide-and-conquer',
  'hashing': 'hash-map',
  'prefix sums': 'prefix-sum',
  'stack': 'stack',
  'queue': 'queue',
  'linked list': 'linked-list',
  'interval tree': 'interval',
  'disjoint sets': 'union-find',
  'dsu': 'union-find',
  'topological sort': 'topological-sort',
  'monotonic stack': 'monotonic-stack',
  'sliding window': 'sliding-window',
  'segment tree': 'tree',
  'heap': 'heap',
  'trie': 'trie',
  'recursion': 'recursion',
  'backtracking': 'backtracking',
};

/** Codeforces 태그 → 우리 시스템 concept_tags 변환 */
export function mapCFTags(cfTags: string[]): { primary: string[]; secondary: string[] } {
  const mapped = cfTags
    .map((t) => CF_TAG_MAP[t.toLowerCase()])
    .filter(Boolean) as string[];

  const unique = [...new Set(mapped)];
  return {
    primary: unique.slice(0, 2),
    secondary: unique.slice(2),
  };
}

/** Codeforces rating → difficulty 변환 */
export function mapCFRating(rating?: number): 'easy' | 'medium' | 'hard' {
  if (!rating) return 'medium';
  if (rating < 1300) return 'easy';
  if (rating < 1900) return 'medium';
  return 'hard';
}
