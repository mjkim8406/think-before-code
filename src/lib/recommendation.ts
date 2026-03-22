/**
 * 추천 엔진
 *
 * 10단계 순차 코스 경로 기반 추천 (프로그래머스 고득점 Kit):
 *   Hash → Stack/Queue → Sort → Brute Force → DFS/BFS
 *     → Binary Search → Heap → Greedy → DP → Graph
 *
 * 추천 로직:
 *   1. 코스 경로에서 현재 위치 파악
 *   2. 현재 주제 내 레벨 판단 (점수 기반)
 *   3. 약한 step이 있으면 해당 주제 보강
 *   4. 레벨업 가능하면 다음 레벨/주제 추천
 *   5. 추천 이유를 한국어로 생성
 *
 * 주의: DB category와 course topic은 N:1 관계
 *   - data-structures → hash, stack-queue, heap
 *   - graph → dfs-bfs, graph
 *   - combinatorics → brute-force
 *   - sorting → sort
 *   - search → binary-search
 */

import type { CourseLevel, CourseTopic } from '@/src/data/coursePaths';
import {
  COURSE_NODES,
  MAIN_PATH,
  getCourseNode,
  getNextLevel,
  getTopicMeta,
  COURSE_LEVEL_LABELS,
} from '@/src/data/coursePaths';
import type {
  SkillSummary,
  PatternAnalysis,
  SessionHistoryRow,
} from './skill-analysis';
import { scoreToLevel, LEVEL_LABELS } from './skill-analysis';

// ─── 타입 ─────────────────────────────────────────────────────

export interface Recommendation {
  kind: 'problem' | 'course';
  /** 코스 주제 */
  topic: CourseTopic;
  /** 추천 레벨 */
  level: CourseLevel;
  /** 제목 */
  title: string;
  /** 설명 */
  description: string;
  /** 추천 이유 (한국어) */
  reason: string;
  /** 코스 노드 ID */
  courseId?: string;
  /** DB 카테고리 (라이브러리 필터 연동용) */
  dbCategory: string;
  /** 추천 우선순위 (낮을수록 먼저) */
  priority: number;
}

export interface RecommendationResult {
  /** 메인 추천 (가장 중요한 1개) */
  primary: Recommendation;
  /** 추가 추천 목록 */
  secondary: Recommendation[];
  /** 전체 실력 요약 한 줄 */
  summaryMessage: string;
  /** 코스 경로 상 현재 위치 요약 */
  courseProgress: {
    currentTopic: CourseTopic;
    currentLevel: CourseLevel;
    /** 전체 40노드 중 완료 추정치 */
    completedEstimate: number;
  };
}

// ─── Step 라벨 ────────────────────────────────────────────────

const STEP_LABELS: Record<string, string> = {
  reading: '문제 읽기',
  pattern_analysis: '패턴 분석',
  strategy_design: '전략 설계',
  solution_flow: '풀이 흐름',
  edge_cases: '예외 처리',
  complexity: '복잡도 분석',
};

// ─── DB category → topic 매핑 ─────────────────────────────────
// 하나의 DB category가 여러 course topic에 매핑될 수 있음
// (data-structures → hash, stack-queue, heap / graph → dfs-bfs, graph)

function dbCategoryToTopics(dbCategory: string): CourseTopic[] {
  const map: Record<string, CourseTopic[]> = {
    'data-structures': ['hash', 'stack-queue', 'heap'],
    'graph': ['dfs-bfs', 'graph'],
    'combinatorics': ['brute-force'],
    'sorting': ['sort'],
    'search': ['binary-search'],
    'greedy': ['greedy'],
    'dp': ['dp'],
  };
  return map[dbCategory] ?? [];
}

/** 하위 호환: 단일 topic 반환 (첫 번째 매칭) */
function dbCategoryToTopic(dbCategory: string): CourseTopic | null {
  const topics = dbCategoryToTopics(dbCategory);
  return topics[0] ?? null;
}

/** topic의 label */
function getTopicLabel(topic: CourseTopic): string {
  return getTopicMeta(topic)?.label ?? topic;
}

// ─── 메인 추천 함수 ──────────────────────────────────────────

export function recommendNext(
  summary: SkillSummary,
  recentSessions: SessionHistoryRow[],
): RecommendationResult {
  const recommendations: Recommendation[] = [];

  // 주제별 실력 매핑 (DB category → 여러 topic에 동일 점수 적용)
  const topicScores = new Map<CourseTopic, PatternAnalysis>();
  for (const p of summary.patterns) {
    const topics = dbCategoryToTopics(p.category);
    for (const topic of topics) {
      if (!topicScores.has(topic)) {
        topicScores.set(topic, p);
      }
    }
  }

  // 코스 경로 순서대로 현재 위치 파악
  let currentTopic: CourseTopic = 'hash';
  let currentLevel: CourseLevel = 'beginner';
  let completedEstimate = 0;

  const MIN_PROBLEMS_TO_ADVANCE = 3;
  const MIN_SCORE_TO_ADVANCE = 70;

  for (const topicMeta of MAIN_PATH) {
    const analysis = topicScores.get(topicMeta.id);
    if (!analysis || analysis.attempts === 0) {
      // 이 주제를 아직 안 풀었으면 여기가 현재 위치
      currentTopic = topicMeta.id;
      currentLevel = 'beginner';
      break;
    }

    const level = analysis.level;
    const levelNum = { beginner: 1, basic: 2, intermediate: 3, advanced: 4 }[level];
    const mastered = analysis.attempts >= MIN_PROBLEMS_TO_ADVANCE && analysis.score >= MIN_SCORE_TO_ADVANCE;

    if (!mastered) {
      // 최소 3문제 + 평균 70점 이상이어야 다음 토픽으로 넘어감
      currentTopic = topicMeta.id;
      currentLevel = level;
      completedEstimate += Math.max(0, levelNum - 1);
      break;
    }

    // 이 주제 마스터 완료 → 다음 주제로
    completedEstimate += 4;
    if (!topicMeta.nextTopic) {
      // 마지막 주제까지 마스터
      currentTopic = topicMeta.id;
      currentLevel = 'advanced';
    }
  }

  // ── 규칙 1: 코스 경로 기반 다음 코스 ─────────────────
  const courseNode = getCourseNode(currentTopic, currentLevel);
  const topicLabel = getTopicLabel(currentTopic);
  const topicAnalysis = topicScores.get(currentTopic);

  if (courseNode) {
    let reason: string;
    const topicMeta = getTopicMeta(currentTopic);
    const topicIdx = topicMeta?.order ?? 0;

    if (!topicAnalysis || topicAnalysis.attempts === 0) {
      if (topicIdx === 0) {
        reason = `알고리즘 학습의 첫 단계! ${topicLabel}부터 시작해요. 해시맵은 모든 알고리즘의 기본 도구입니다.`;
      } else {
        const prevTopic = MAIN_PATH[topicIdx - 1];
        reason = `${prevTopic?.label ?? '이전 주제'}를 마치고 ${topicLabel}로 넘어갈 차례예요!`;
      }
    } else {
      const weakStepNames = (topicAnalysis.weakSteps ?? [])
        .map((s) => STEP_LABELS[s])
        .filter(Boolean);

      if (weakStepNames.length > 0) {
        reason = `${topicLabel} 평균 ${topicAnalysis.averageScore}점. ${weakStepNames.join(', ')}이 약해서 ${COURSE_LEVEL_LABELS[currentLevel]} 코스를 추천합니다.`;
      } else {
        reason = `${topicLabel} ${COURSE_LEVEL_LABELS[currentLevel]} 단계를 진행 중이에요. 평균 ${topicAnalysis.averageScore}점!`;
      }
    }

    recommendations.push({
      kind: 'course',
      topic: currentTopic,
      level: currentLevel,
      title: courseNode.title,
      description: courseNode.description,
      reason,
      courseId: courseNode.id,
      dbCategory: topicMeta?.dbCategory ?? currentTopic,
      priority: 1,
    });
  }

  // ── 규칙 2: 현재 주제 내 레벨업 가능 ──────────────────
  if (topicAnalysis && topicAnalysis.score >= 80 && topicAnalysis.attempts >= 3) {
    const nextLv = getNextLevel(currentLevel);
    if (nextLv) {
      const nextNode = getCourseNode(currentTopic, nextLv);
      if (nextNode) {
        recommendations.push({
          kind: 'course',
          topic: currentTopic,
          level: nextLv,
          title: `${topicLabel} 레벨업!`,
          description: nextNode.description,
          reason: `${topicLabel} ${LEVEL_LABELS[currentLevel]} 단계를 마스터했어요! ${COURSE_LEVEL_LABELS[nextLv]}으로 올라가세요.`,
          courseId: nextNode.id,
          dbCategory: getTopicMeta(currentTopic)?.dbCategory ?? currentTopic,
          priority: 2,
        });
      }
    } else {
      // advanced까지 마스터 → 다음 주제
      const topicMeta = getTopicMeta(currentTopic);
      if (topicMeta?.nextTopic) {
        const nextTopicNode = getCourseNode(topicMeta.nextTopic, 'beginner');
        const nextTopicMeta = getTopicMeta(topicMeta.nextTopic);
        if (nextTopicNode && nextTopicMeta) {
          recommendations.push({
            kind: 'course',
            topic: topicMeta.nextTopic,
            level: 'beginner',
            title: `${nextTopicMeta.label} 시작!`,
            description: nextTopicNode.description,
            reason: `${topicLabel}을 완전히 마스터했어요! 🎉 다음 주제 ${nextTopicMeta.label}로 넘어가세요.`,
            courseId: nextTopicNode.id,
            dbCategory: nextTopicMeta.dbCategory,
            priority: 2,
          });
        }
      }
    }
  }

  // ── 규칙 3: 최근 실패한 유형 재도전 ──────────────────
  const recentFail = findRecentFailure(recentSessions);
  if (recentFail) {
    const failTopic = dbCategoryToTopic(recentFail.category);
    if (failTopic) {
      const failLabel = getTopicLabel(failTopic);
      const failMeta = getTopicMeta(failTopic);
      recommendations.push({
        kind: 'problem',
        topic: failTopic,
        level: scoreToLevel(recentFail.total_score),
        title: `${failLabel} 재도전`,
        description: `최근 어려웠던 ${failLabel} 문제에 다시 도전`,
        reason: `최근 ${failLabel} 문제에서 ${recentFail.total_score}점이었어요. 한 번 더 풀면 확실히 잡힙니다!`,
        dbCategory: failMeta?.dbCategory ?? recentFail.category,
        priority: 3,
      });
    }
  }

  // ── 규칙 4: Step 약점 보완 ────────────────────────────
  const weakStep = summary.stepWeaknesses.find((s) => s.averageScore < 50);
  if (weakStep && courseNode) {
    const stepLabel = STEP_LABELS[weakStep.step] ?? weakStep.step;
    recommendations.push({
      kind: 'course',
      topic: currentTopic,
      level: currentLevel,
      title: `${stepLabel} 집중 훈련`,
      description: `${topicLabel} 문제에서 ${stepLabel} 능력을 키우는 코스`,
      reason: `${stepLabel} 평균 ${weakStep.averageScore}점으로 자주 실수해요. 현재 코스에서 집중 연습해보세요.`,
      courseId: courseNode.id,
      dbCategory: getTopicMeta(currentTopic)?.dbCategory ?? currentTopic,
      priority: 4,
    });
  }

  // 우선순위 정렬 + 중복 제거
  recommendations.sort((a, b) => a.priority - b.priority);
  const seen = new Set<string>();
  const unique = recommendations.filter((r) => {
    const key = `${r.topic}-${r.level}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // 기본 추천 (데이터가 없을 때)
  const fallback: Recommendation = {
    kind: 'course',
    topic: 'hash',
    level: 'beginner',
    title: 'Hash 입문',
    description: '해시맵의 기본 개념부터 시작하세요. 모든 알고리즘의 기본 도구입니다!',
    reason: '아직 학습 데이터가 없어요. 알고리즘의 첫 단계인 Hash부터 시작해보세요!',
    courseId: 'hash-beginner',
    dbCategory: 'data-structures',
    priority: 99,
  };

  return {
    primary: unique[0] ?? fallback,
    secondary: unique.slice(1, 4),
    summaryMessage: buildSummaryMessage(summary),
    courseProgress: {
      currentTopic,
      currentLevel,
      completedEstimate: Math.min(completedEstimate, 40),
    },
  };
}

// ─── 내부 유틸리티 ────────────────────────────────────────────

/** 최근 세션에서 실패한 것 찾기 (60점 미만) */
function findRecentFailure(sessions: SessionHistoryRow[]): SessionHistoryRow | null {
  const sorted = [...sessions].sort((a, b) =>
    b.completed_at.localeCompare(a.completed_at),
  );
  return sorted.find((s) => s.total_score < 60) ?? null;
}

/** 전체 요약 메시지 생성 */
function buildSummaryMessage(summary: SkillSummary): string {
  if (summary.totalAttempts === 0) {
    return '아직 문제를 풀지 않았어요. Hash 입문부터 시작해볼까요?';
  }

  const parts: string[] = [];

  // 강점
  if (summary.strongestCategory) {
    const topic = dbCategoryToTopicLabel(summary.strongestCategory);
    const strongest = summary.patterns[summary.patterns.length - 1];
    if (topic && strongest && strongest.score >= 70) {
      parts.push(`${topic}은 안정적이에요`);
    }
  }

  // 약점
  if (summary.weakestCategory) {
    const topic = dbCategoryToTopicLabel(summary.weakestCategory);
    const weakest = summary.patterns[0];
    if (topic && weakest && weakest.score < 60) {
      parts.push(`${topic}에 집중하면 좋겠어요`);
    }
  }

  // Step 약점
  const worstStep = summary.stepWeaknesses[0];
  if (worstStep && worstStep.averageScore < 50) {
    const stepLabel = STEP_LABELS[worstStep.step] ?? worstStep.step;
    parts.push(`${stepLabel}을 더 연습해보세요`);
  }

  if (parts.length === 0) {
    return `전체 평균 ${summary.overallScore}점, ${summary.totalAttempts}문제를 풀었어요. 꾸준히 잘하고 있어요!`;
  }

  return parts.join('. ') + '.';
}

function dbCategoryToTopicLabel(dbCategory: string): string | null {
  const map: Record<string, string> = {
    'data-structures': '자료구조',
    'graph': '그래프',
    'combinatorics': '완전탐색',
    'sorting': '정렬',
    'search': '탐색',
    'greedy': 'Greedy',
    'dp': 'DP',
  };
  return map[dbCategory] ?? null;
}
