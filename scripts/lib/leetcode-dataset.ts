/**
 * LeetCode 공개 JSON 데이터셋 fetcher
 *
 * 출처: https://github.com/nicksylin/leetcode-daily
 *       (또는 로컬 JSON 파일 직접 사용)
 *
 * 포함: 문제 번호, 제목, 설명(description), 제약조건, 난이도, 태그, 예시 코드
 *
 * 사용법:
 *   const problems = await fetchLeetcodeDataset();
 *   const p = findBySlug(problems, 'two-sum');
 */

export interface LCProblem {
  id: number;
  title: string;
  slug: string;             // 'two-sum', 'valid-parentheses', ...
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;      // 마크다운 or 플레인 텍스트
  constraints: string | null;
  tags: string[];
  solutionCode?: string;    // 예시 코드 스니펫 (Python or TypeScript)
  examples?: string[];
}

/**
 * GitHub raw URL에서 LeetCode JSON 데이터셋을 fetch합니다.
 *
 * 권장 데이터셋 저장소:
 *   - https://github.com/doocs/leetcode  (솔루션 코드 다수 언어)
 *   - Kaggle "LeetCode All Problems" 데이터셋을 로컬에 저장 후 사용
 *
 * datasetUrl 예시:
 *   'https://raw.githubusercontent.com/{owner}/{repo}/main/problems.json'
 */
export async function fetchLeetcodeDataset(datasetUrl: string): Promise<LCProblem[]> {
  const res = await fetch(datasetUrl);
  if (!res.ok) throw new Error(`Failed to fetch LeetCode dataset: ${res.status} ${datasetUrl}`);
  const raw = await res.json();

  // 데이터셋마다 스키마가 다를 수 있으므로 normalize
  return normalizeDataset(raw);
}

/** 로컬 JSON 파일에서 로드 (bundle 방식) */
export function loadLocalDataset(jsonPath: string): LCProblem[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const raw = require(jsonPath);
  return normalizeDataset(raw);
}

export function findBySlug(problems: LCProblem[], slug: string): LCProblem | undefined {
  return problems.find((p) => p.slug === slug);
}

export function findById(problems: LCProblem[], id: number): LCProblem | undefined {
  return problems.find((p) => p.id === id);
}

// ─────────────────────────────────────────────
// Normalizer — 데이터셋 스키마 차이 흡수
// ─────────────────────────────────────────────

function normalizeDataset(raw: unknown): LCProblem[] {
  if (!Array.isArray(raw)) throw new Error('Dataset must be a JSON array');

  return raw.map((item: Record<string, unknown>) => ({
    id: Number(item.id ?? item.questionId ?? item.frontend_id ?? 0),
    title: String(item.title ?? item.name ?? ''),
    slug: String(item.slug ?? item.titleSlug ?? item.title_slug ?? toSlug(String(item.title ?? ''))),
    difficulty: normalizeDifficulty(String(item.difficulty ?? 'Medium')),
    description: String(item.description ?? item.content ?? item.body ?? ''),
    constraints: item.constraints ? String(item.constraints) : null,
    tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
    solutionCode: item.solution_code
      ? String(item.solution_code)
      : item.python_solution
      ? String(item.python_solution)
      : undefined,
    examples: Array.isArray(item.examples) ? item.examples.map(String) : undefined,
  }));
}

function normalizeDifficulty(d: string): 'Easy' | 'Medium' | 'Hard' {
  const lower = d.toLowerCase();
  if (lower === 'easy') return 'Easy';
  if (lower === 'hard') return 'Hard';
  return 'Medium';
}

function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** LeetCode difficulty → 우리 시스템 difficulty */
export function mapLCDifficulty(d: 'Easy' | 'Medium' | 'Hard'): 'easy' | 'medium' | 'hard' {
  return d.toLowerCase() as 'easy' | 'medium' | 'hard';
}
