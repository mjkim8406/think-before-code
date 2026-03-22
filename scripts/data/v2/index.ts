/**
 * v2 문제 데이터 배럴 파일
 *
 * 새 카테고리 추가 시:
 * 1. scripts/data/v2/<category>.ts 파일 생성
 * 2. 여기서 import + ALL_PROBLEMS_V2에 spread
 */

import type { ProblemV2 } from '../types';
import { GREEDY_V2 } from './greedy';
import { DP_V2 } from './dp';
import { COMBINATORICS_V2 } from './combinatorics';
import { DATA_STRUCTURES_V2 } from './data-structures';
import { SORTING_V2 } from './sorting';
import { SEARCH_V2 } from './search';
import { NUMBER_THEORY_V2 } from './number-theory';
import { TREE_V2 } from './tree';
import { GEOMETRY_V2 } from './geometry';
import { GRAPH_V2 } from './graph';

// ── 카테고리별 export (개별 시딩 시 사용) ───────────────────
export { GREEDY_V2 } from './greedy';
export { DP_V2 } from './dp';
export { COMBINATORICS_V2 } from './combinatorics';
export { DATA_STRUCTURES_V2 } from './data-structures';
export { SORTING_V2 } from './sorting';
export { SEARCH_V2 } from './search';
export { NUMBER_THEORY_V2 } from './number-theory';
export { TREE_V2 } from './tree';
export { GEOMETRY_V2 } from './geometry';
export { GRAPH_V2 } from './graph';

// ── 전체 통합 (시딩 시 사용) ────────────────────────────────
export const ALL_PROBLEMS_V2: ProblemV2[] = [
  ...GREEDY_V2,
  ...DP_V2,
  ...COMBINATORICS_V2,
  ...DATA_STRUCTURES_V2,
  ...SORTING_V2,
  ...SEARCH_V2,
  ...NUMBER_THEORY_V2,
  ...TREE_V2,
  ...GEOMETRY_V2,
  ...GRAPH_V2,
];

// 중복 ID 검증
const ids = ALL_PROBLEMS_V2.map((p) => p.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length > 0) {
  throw new Error(`Duplicate problem IDs found: ${dupes.join(', ')}`);
}
