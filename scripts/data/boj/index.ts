import type { ProblemSeed } from '../problems';
import { BOJ_DATA_STRUCTURES } from './data-structures';
import { BOJ_SORTING } from './sorting';
import { BOJ_GREEDY } from './greedy';
import { BOJ_GEOMETRY } from './geometry';
import { BOJ_NUMBER_THEORY } from './number-theory';
import { BOJ_COMBINATORICS } from './combinatorics';
import { BOJ_DP } from './dp';
import { BOJ_GRAPH } from './graph';
import { BOJ_TREE } from './tree';
import { BOJ_SEARCH } from './search';

export const BOJ_PROBLEMS: ProblemSeed[] = [
  ...BOJ_DATA_STRUCTURES,
  ...BOJ_SORTING,
  ...BOJ_GREEDY,
  ...BOJ_GEOMETRY,
  ...BOJ_NUMBER_THEORY,
  ...BOJ_COMBINATORICS,
  ...BOJ_DP,
  ...BOJ_GRAPH,
  ...BOJ_TREE,
  ...BOJ_SEARCH,
];
