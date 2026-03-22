import type { Problem, UserWeakConcept, UserStreak } from '@/src/types';
import type { ConceptTag } from '@/src/lib/constants';

export const SAMPLE_PROBLEM: Problem = {
  id: '1',
  title: '두 수의 합 (Two Sum)',
  description:
    '정수 배열 nums와 정수 target이 주어질 때, 합이 target이 되는 두 수의 인덱스를 반환하세요.\n\n각 입력에는 정확히 하나의 해가 있으며, 같은 요소를 두 번 사용할 수 없습니다.\n\n답은 어떤 순서로든 반환할 수 있습니다.',
  constraints:
    '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\n정확히 하나의 답이 존재합니다.',
  difficulty: 'easy',
  conceptTags: ['hash-map', 'array'],
  secondaryConceptTags: ['two-pointer', 'sorting'],
  intentDescription:
    '해시맵을 사용해 O(n) 시간에 보수(complement)를 찾을 수 있는지 확인하는 문제입니다.',
  keyObservation:
    'target - nums[i]의 값이 이전에 등장했는지 빠르게 확인해야 합니다. 이를 위해 해시맵이 필요합니다.',
  wrongApproaches: [
    '이중 반복문으로 모든 쌍을 확인 (O(n^2) - 비효율적)',
    '정렬 후 투 포인터 (인덱스가 바뀌므로 추가 처리 필요)',
  ],
  liveCodingFlow: {
    firstObservation:
      '두 수의 합이 target이 되어야 하므로, 한 수를 고정하면 나머지 수는 target - nums[i]로 결정됩니다.',
    approachCandidates: [
      '브루트포스: 이중 반복문 O(n^2)',
      '해시맵: 한 번 순회하며 보수 확인 O(n)',
      '정렬 + 투 포인터: O(n log n) (인덱스 관리 필요)',
    ],
    whyThisApproach:
      '해시맵을 사용하면 한 번의 순회로 각 원소의 보수가 이전에 나왔는지 O(1)에 확인할 수 있습니다.',
    wrongApproaches: [
      '브루트포스는 n이 10^4이므로 가능하지만 비효율적',
      '정렬하면 원래 인덱스를 잃어버려서 추가 처리 필요',
    ],
    dataStructures: ['HashMap (보수 -> 인덱스 매핑)'],
    timeComplexity: 'O(n)',
    pitfalls: [
      '같은 인덱스를 두 번 사용하지 않도록 주의',
      '해시맵에 현재 원소를 넣기 전에 보수를 먼저 확인해야 함',
    ],
    interviewExplanation:
      '"먼저 brute force로 O(n^2) 풀이를 생각할 수 있지만, 해시맵을 쓰면 O(n)으로 개선됩니다. 배열을 순회하면서 각 원소에 대해 target - nums[i]가 해시맵에 있는지 확인하고, 없으면 현재 값과 인덱스를 저장합니다. 있으면 그 인덱스와 현재 인덱스를 반환합니다."',
  },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

export const SAMPLE_STREAK: UserStreak = {
  userId: '1',
  currentStreak: 3,
  longestStreak: 7,
  lastTrainedDate: '2026-03-17',
};

export const SAMPLE_WEAK_CONCEPTS: UserWeakConcept[] = [
  {
    id: '1',
    userId: '1',
    conceptTag: 'dynamic-programming',
    missCount: 5,
    lastMissedAt: '2026-03-15T00:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    conceptTag: 'graph',
    missCount: 3,
    lastMissedAt: '2026-03-14T00:00:00Z',
  },
  {
    id: '3',
    userId: '1',
    conceptTag: 'binary-search',
    missCount: 2,
    lastMissedAt: '2026-03-10T00:00:00Z',
  },
];

// Stats screen sample data
export const SAMPLE_STATS_SUMMARY = {
  totalSolved: 42,
  accuracyRate: 71,
  totalStudyDays: 28,
};

export const SAMPLE_CONCEPT_MASTERY: { tag: ConceptTag; solved: number; correct: number }[] = [
  { tag: 'hash-map', solved: 8, correct: 7 },
  { tag: 'array', solved: 10, correct: 8 },
  { tag: 'stack', solved: 6, correct: 5 },
  { tag: 'two-pointer', solved: 4, correct: 3 },
  { tag: 'binary-search', solved: 5, correct: 2 },
  { tag: 'dynamic-programming', solved: 7, correct: 2 },
  { tag: 'graph', solved: 4, correct: 1 },
  { tag: 'greedy', solved: 3, correct: 2 },
  { tag: 'dfs', solved: 3, correct: 2 },
  { tag: 'bfs', solved: 2, correct: 1 },
];

export const SAMPLE_MONTHLY_ACTIVITY: { week: string; count: number }[] = [
  { week: '1주차', count: 22 },
  { week: '2주차', count: 28 },
  { week: '3주차', count: 42 },
  { week: '4주차', count: 35 },
  { week: '5주차', count: 25 },
];

export const SAMPLE_DIFFICULTY_DISTRIBUTION = {
  easy: { count: 24, percent: 57 },
  medium: { count: 12, percent: 28 },
  hard: { count: 6, percent: 15 },
};

// Settings screen sample data
export const SAMPLE_USER_PROFILE = {
  initials: 'MJ',
  name: 'Minji Kim',
  email: 'minji.kim@example.com',
};

// Library screen sample data
export interface LibraryProblem {
  id: string;
  number: string;
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  description: string;
  tags: string[];
}

export const SAMPLE_LIBRARY_PROBLEMS: LibraryProblem[] = [
  {
    id: '1',
    number: '#001',
    difficulty: 'easy',
    title: 'Two Sum Variations',
    description: 'Given an array of integers nums and integer target, return indices of the two numbers such that they add up to target.',
    tags: ['Hash Table', 'Array'],
  },
  {
    id: '2',
    number: '#042',
    difficulty: 'medium',
    title: 'Trapping Rain Water',
    description: 'Given n non-negative integers representing elevation map, compute how much water it can trap after raining.',
    tags: ['Two Pointers', 'Stack', 'DP'],
  },
  {
    id: '3',
    number: '#124',
    difficulty: 'hard',
    title: 'Binary Tree Maximum Path Sum',
    description: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes must have an edge connecting them.',
    tags: ['Trees', 'DFS'],
  },
];
