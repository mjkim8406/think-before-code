/**
 * Supabase 시딩 스크립트
 *
 * 실행: npm run seed
 *
 * - scripts/data/v2/ 에서 ProblemV2 데이터를 읽어 problems 테이블에 upsert
 * - text id 사용 (UUID 변환 불필요)
 * - 중복 실행 안전 (ON CONFLICT DO UPDATE)
 * - 서비스 롤 키로 RLS 우회
 *
 * 옵션:
 *   --dry-run    DB에 쓰지 않고 검증만 수행
 *   --category   특정 카테고리만 시딩 (예: --category greedy)
 *   --validate   데이터 무결성 검증 모드
 */

import { supabaseAdmin } from './lib/supabase-admin.js';
import {
  ALL_PROBLEMS_V2,
  GREEDY_V2,
  DP_V2,
  COMBINATORICS_V2,
  DATA_STRUCTURES_V2,
  SORTING_V2,
  SEARCH_V2,
  NUMBER_THEORY_V2,
  TREE_V2,
  GEOMETRY_V2,
  GRAPH_V2,
  COURSE_DATA_STRUCTURES,
  COURSE_GRAPH,
  COURSE_DP,
  COURSE_GREEDY,
} from './data/v2/index.js';
import type { ProblemV2 } from './data/types.js';

// ── CLI Args ──────────────────────────────────────────────────
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isValidate = args.includes('--validate');
const categoryFlag = args.find((a) => a.startsWith('--category'));
const categoryName = categoryFlag ? args[args.indexOf(categoryFlag) + 1] : null;

// ── 카테고리 맵 ──────────────────────────────────────────────
const CATEGORY_MAP: Record<string, ProblemV2[]> = {
  greedy: [...GREEDY_V2, ...COURSE_GREEDY],
  dp: [...DP_V2, ...COURSE_DP],
  combinatorics: COMBINATORICS_V2,
  'data-structures': [...DATA_STRUCTURES_V2, ...COURSE_DATA_STRUCTURES],
  sorting: SORTING_V2,
  search: SEARCH_V2,
  'number-theory': NUMBER_THEORY_V2,
  tree: TREE_V2,
  geometry: GEOMETRY_V2,
  graph: [...GRAPH_V2, ...COURSE_GRAPH],
};

// ── 데이터 검증 ──────────────────────────────────────────────
interface ValidationError {
  problemId: string;
  field: string;
  message: string;
}

function validateProblem(p: ProblemV2): ValidationError[] {
  const errors: ValidationError[] = [];
  const e = (field: string, msg: string) => errors.push({ problemId: p.id, field, message: msg });

  // 기본 필드
  if (!p.id) e('id', 'id가 비어있음');
  if (!p.title) e('title', 'title이 비어있음');
  if (!p.summary) e('summary', 'summary가 비어있음');
  if (!p.tags || p.tags.length === 0) e('tags', 'tags가 비어있음');
  if (!['easy', 'medium', 'hard'].includes(p.difficulty)) e('difficulty', `잘못된 난이도: ${p.difficulty}`);

  // training_flow 존재 여부
  const tf = p.training_flow;
  if (!tf) {
    e('training_flow', 'training_flow가 없음');
    return errors;
  }

  // 각 단계 존재 검증
  const requiredSteps = ['reading', 'pattern_analysis', 'strategy_design', 'solution_flow', 'edge_cases', 'complexity'];
  for (const step of requiredSteps) {
    if (!(step in tf)) {
      e(`training_flow.${step}`, `${step} 단계가 없음`);
    }
  }

  // reading 상세 검증
  if (tf.reading) {
    if (!tf.reading.goal_type?.accepted_answers?.length) {
      e('reading.goal_type', 'accepted_answers가 비어있음');
    }
    if (!tf.reading.input_summary?.accepted_answers?.length) {
      e('reading.input_summary', 'accepted_answers가 비어있음');
    }
    if (!tf.reading.one_line_summary?.accepted_answers?.length) {
      e('reading.one_line_summary', 'accepted_answers가 비어있음');
    }
  }

  // solution_flow 검증
  if (tf.solution_flow) {
    const sf = tf.solution_flow;
    if (!sf.steps_catalog || sf.steps_catalog.length === 0) {
      e('solution_flow.steps_catalog', 'steps_catalog가 비어있음');
    }
    if (!sf.correct_order || sf.correct_order.length === 0) {
      e('solution_flow.correct_order', 'correct_order가 비어있음');
    }
    // steps_catalog의 id와 correct_order 일치 검증
    if (sf.steps_catalog && sf.correct_order) {
      const catalogIds = new Set(sf.steps_catalog.map((s: { id: string }) => s.id));
      const orderIds = new Set(sf.correct_order);
      for (const oid of sf.correct_order) {
        if (!catalogIds.has(oid)) {
          e('solution_flow', `correct_order의 "${oid}"가 steps_catalog에 없음`);
        }
      }
      // steps_catalog에만 있고 correct_order에 없는 것은 distractor(함정 스텝)이므로 허용
      // for (const cid of Array.from(catalogIds)) {
      //   if (!orderIds.has(cid)) {
      //     // distractor step — 정상
      //   }
      // }
    }
  }

  // edge_cases 3-tier 검증
  if (tf.edge_cases) {
    const ec = tf.edge_cases;
    if (!ec.required_answers || ec.required_answers.length === 0) {
      e('edge_cases.required_answers', 'required_answers가 비어있음');
    }
    // 모든 answer가 options에 포함되는지
    if (ec.options) {
      const opts = new Set(ec.options);
      const allAnswers = [
        ...(ec.required_answers || []),
        ...(ec.recommended_answers || []),
        ...(ec.optional_answers || []),
      ];
      for (const ans of allAnswers) {
        if (!opts.has(ans)) {
          e('edge_cases', `"${ans}"가 options에 없음`);
        }
      }
    }
  }

  // common_mistakes 검증
  if (p.common_mistakes) {
    for (const cm of p.common_mistakes) {
      if (!cm.conditions || cm.conditions.length === 0) {
        e(`common_mistakes.${cm.tag}`, 'conditions가 비어있음 (v1의 trigger 형식?)');
      }
      if (!cm.feedback) {
        e(`common_mistakes.${cm.tag}`, 'feedback이 비어있음');
      }
    }
  }

  // accepted_strategies 검증
  if (p.accepted_strategies) {
    for (const as_ of p.accepted_strategies) {
      if (!as_.required_strategy_tags || as_.required_strategy_tags.length === 0) {
        e(`accepted_strategies.${as_.strategy_id}`, 'required_strategy_tags가 비어있음');
      }
    }
  }

  // review_notes 검증
  if (p.review_notes) {
    if (!p.review_notes.pattern_trigger) e('review_notes', 'pattern_trigger가 없음');
    if (!p.review_notes.why_it_works) e('review_notes', 'why_it_works가 없음');
  }

  return errors;
}

// ── 문제 ID → 카테고리 매핑 빌드 ────────────────────────────
const ID_TO_CATEGORY = new Map<string, string>();
for (const [catName, catProblems] of Object.entries(CATEGORY_MAP)) {
  for (const p of catProblems) {
    ID_TO_CATEGORY.set(p.id, catName);
  }
}

// ── ProblemV2 → DB row 변환 ──────────────────────────────────
// ── difficulty → course_level 기본 매핑 ──────────────────────
function defaultCourseLevel(difficulty: string): string {
  if (difficulty === 'easy') return 'beginner';
  if (difficulty === 'hard') return 'intermediate';
  return 'basic';
}

function toDbRow(p: ProblemV2) {
  return {
    id: p.id,
    title: p.title,
    difficulty: p.difficulty,
    domain: p.domain,
    summary: p.summary,
    tags: p.tags,
    category: ID_TO_CATEGORY.get(p.id) ?? 'uncategorized',
    course_level: (p as any).course_level ?? defaultCourseLevel(p.difficulty),
    input_type: p.input_type,
    output_type: p.output_type,
    constraints: p.constraints,
    training_flow: p.training_flow,
    accepted_strategies: p.accepted_strategies,
    common_mistakes: p.common_mistakes,
    review_notes: p.review_notes,
    is_active: true,
  };
}

// ── 메인 ─────────────────────────────────────────────────────
async function seedV2() {
  // 시딩 대상 결정
  let problems: ProblemV2[];
  if (categoryName) {
    const cat = CATEGORY_MAP[categoryName];
    if (!cat) {
      console.error(`❌  Unknown category: ${categoryName}`);
      console.error(`    Available: ${Object.keys(CATEGORY_MAP).join(', ')}`);
      process.exit(1);
    }
    problems = cat;
    console.log(`\n📦  Category: ${categoryName} (${problems.length} problems)`);
  } else {
    problems = ALL_PROBLEMS_V2;
    console.log(`\n📦  All categories (${problems.length} problems)`);
  }

  // 1) 검증
  console.log('\n🔍  Validating...');
  let totalErrors = 0;
  for (const p of problems) {
    const errors = validateProblem(p);
    if (errors.length > 0) {
      totalErrors += errors.length;
      console.log(`\n  ⚠️  ${p.id} (${p.title}):`);
      for (const err of errors) {
        console.log(`      - [${err.field}] ${err.message}`);
      }
    }
  }

  if (totalErrors > 0) {
    console.log(`\n❌  ${totalErrors} validation error(s) found.`);
    if (!isDryRun && !isValidate) {
      console.log('    Fix errors or use --dry-run to skip DB write.\n');
      process.exit(1);
    }
  } else {
    console.log(`  ✅  All ${problems.length} problems passed validation.`);
  }

  // 요약 출력
  console.log('\n📊  Summary:');
  const byDiff = { easy: 0, medium: 0, hard: 0 };
  const byDomain = new Map<string, number>();
  for (const p of problems) {
    byDiff[p.difficulty]++;
    byDomain.set(p.domain, (byDomain.get(p.domain) || 0) + 1);
  }
  console.log(`    🟢 Easy: ${byDiff.easy}  🟡 Medium: ${byDiff.medium}  🔴 Hard: ${byDiff.hard}`);
  console.log(`    Domains: ${Array.from(byDomain.entries()).map(([d, n]) => `${d}(${n})`).join(', ')}`);

  // dry-run / validate 모드면 여기서 끝
  if (isDryRun || isValidate) {
    console.log('\n🏁  Dry run complete. No DB changes.\n');
    return;
  }

  // 2) DB upsert (배치)
  console.log('\n🌱  Seeding to Supabase...');
  const rows = problems.map(toDbRow);

  // Supabase는 한 번에 많은 행을 넣을 수 있지만 안전하게 50개씩 배치
  const BATCH_SIZE = 50;
  let seeded = 0;

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);

    const { data, error } = await supabaseAdmin
      .from('problems')
      .upsert(batch, { onConflict: 'id' })
      .select('id, title, difficulty');

    if (error) {
      console.error(`\n❌  Batch ${Math.floor(i / BATCH_SIZE) + 1} failed:`, error.message);
      console.error('    Details:', error.details);
      console.error('    Hint:', error.hint);
      process.exit(1);
    }

    seeded += data?.length ?? 0;

    // 진행 표시
    for (const p of data ?? []) {
      const tag = p.difficulty === 'easy' ? '🟢' : p.difficulty === 'medium' ? '🟡' : '🔴';
      console.log(`    ${tag}  ${p.title}  (${p.id})`);
    }
  }

  console.log(`\n🎉  Done. ${seeded} problems seeded to problems.\n`);
}

seedV2().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
