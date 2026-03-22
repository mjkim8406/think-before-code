export const CONCEPT_TAGS = [
  'array',
  'string',
  'hash-map',
  'two-pointer',
  'sliding-window',
  'binary-search',
  'stack',
  'queue',
  'linked-list',
  'tree',
  'binary-tree',
  'bst',
  'heap',
  'graph',
  'bfs',
  'dfs',
  'dynamic-programming',
  'greedy',
  'backtracking',
  'sorting',
  'divide-and-conquer',
  'bit-manipulation',
  'math',
  'recursion',
  'trie',
  'union-find',
  'topological-sort',
  'prefix-sum',
  'monotonic-stack',
  'interval',
] as const;

export type ConceptTag = (typeof CONCEPT_TAGS)[number];

export const CONCEPT_TAG_LABELS: Record<ConceptTag, string> = {
  'array': '배열',
  'string': '문자열',
  'hash-map': '해시맵',
  'two-pointer': '투 포인터',
  'sliding-window': '슬라이딩 윈도우',
  'binary-search': '이분 탐색',
  'stack': '스택',
  'queue': '큐',
  'linked-list': '연결 리스트',
  'tree': '트리',
  'binary-tree': '이진 트리',
  'bst': '이진 탐색 트리',
  'heap': '힙',
  'graph': '그래프',
  'bfs': 'BFS',
  'dfs': 'DFS',
  'dynamic-programming': '동적 프로그래밍',
  'greedy': '그리디',
  'backtracking': '백트래킹',
  'sorting': '정렬',
  'divide-and-conquer': '분할 정복',
  'bit-manipulation': '비트 연산',
  'math': '수학',
  'recursion': '재귀',
  'trie': '트라이',
  'union-find': '유니온 파인드',
  'topological-sort': '위상 정렬',
  'prefix-sum': '누적합',
  'monotonic-stack': '단조 스택',
  'interval': '구간',
};

export const COMPLEXITY_OPTIONS = [
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n log n)',
  'O(n^2)',
  'O(n^3)',
  'O(2^n)',
  'O(n!)',
] as const;

export const DIFFICULTY_LABELS = {
  easy: '쉬움',
  medium: '보통',
  hard: '어려움',
} as const;

export const COLORS = {
  // Core — green-800 primary, green-500 accent
  primary: '#14532D',
  primaryDim: 'rgba(20, 83, 45, 0.08)',
  primaryBorder: 'rgba(20, 83, 45, 0.20)',
  primaryLight: '#22C55E',
  // CTA — deep green button
  cta: '#14532D',
  ctaText: '#FFFFFF',
  // Backgrounds — sand palette
  background: '#FAFAF8',
  surface: '#FFFFFF',
  surfaceElevated: '#F5F5F0',
  surfaceBorder: '#E8E8E0',
  surfaceBorderStrong: '#D4D4C8',
  // Text — sand tones
  text: '#2C2C24',
  textSecondary: '#5C5C4F',
  textTertiary: '#8A8A7A',
  // Green shades
  green50: '#F0FDF4',
  green100: '#DCFCE7',
  green400: '#4ADE80',
  green500: '#22C55E',
  green800: '#14532D',
  green900: '#0D3B1E',
  // Sand shades
  sand50: '#FAFAF8',
  sand100: '#F5F5F0',
  sand200: '#E8E8E0',
  sand300: '#D4D4C8',
  // Figma design tokens
  figmaDarkGreen: '#012d1d',       // Performance 헤더, 다크 카드 bg
  figmaLogoGreen: '#064e3b',       // 로고 컬러
  figmaSubtext: '#586062',         // 공통 서브텍스트
  figmaBodyText: '#414844',        // 보조 텍스트
  figmaEasyBg: '#c1ecd4',          // Easy 배지 배경, 트렌딩 배지
  figmaEasyText: '#274e3d',        // Easy 배지 텍스트
  figmaMediumBg: '#f2e8cf',        // Medium 배지 배경
  figmaMediumText: '#8b5e3c',      // Medium 배지 텍스트
  figmaHardBg: '#ffdad8',          // Hard 배지 배경
  figmaHardText: '#673a39',        // Hard 배지 텍스트
  figmaDangerBg: '#ffdad6',        // Logout/Delete 배경
  figmaDanger: '#ba1a1a',          // Logout/Delete 텍스트/아이콘
  figmaProgressFill: '#86af99',    // Progress bar fill
  figmaVersion: '#717973',         // 앱 버전 텍스트
  figmaIconBgGray: '#dae1e3',      // Notifications 아이콘 배경
  figmaIconBgLight: '#eeeeee',     // App Version 아이콘 배경
  // Semantic
  success: '#14532D',
  successDim: 'rgba(20, 83, 45, 0.08)',
  warning: '#F59E0B',
  warningDim: 'rgba(245, 158, 11, 0.10)',
  error: '#EF4444',
  errorDim: 'rgba(239, 68, 68, 0.08)',
  // Utility
  white: '#FFFFFF',
  // Legacy aliases
  accent: '#14532D',
  accentLight: '#22C55E',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const FONT_SIZE = {
  xs: 10,
  sm: 11,
  body: 12,
  md: 13,
  lg: 14,
  xl: 17,
  xxl: 22,
  title: 32,
  hero: 72,
} as const;

export const RADIUS = {
  xs: 2,
  sm: 6,
  md: 8,
  lg: 14,
  xl: 16,
  xxl: 20,
  full: 50,
} as const;

// Font family constants — maps to expo-google-fonts Inter variants
// In RN, each weight is a separate font family name
export const FONTS = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extraBold: 'Inter_800ExtraBold',
  black: 'Inter_900Black',
  mono: 'SpaceMono',
} as const;
