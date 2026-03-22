/**
 * Codeforces 문제 발굴 유틸
 *
 * 실행: npm run fetch:codeforces
 * 옵션 (환경변수):
 *   CF_TAGS=dp,greedy          특정 태그만 필터 (세미콜론 구분)
 *   CF_MIN_RATING=800
 *   CF_MAX_RATING=1600
 *   CF_LIMIT=20                출력할 문제 수 (기본 10)
 *
 * 출력: scripts/data/problems.ts에 바로 붙여넣을 수 있는 템플릿
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { fetchCFProblems, mapCFTags, mapCFRating, cfProblemUrl } from './lib/codeforces.js';

const CF_TAGS = process.env.CF_TAGS?.split(',') ?? [];
const CF_MIN_RATING = Number(process.env.CF_MIN_RATING ?? 800);
const CF_MAX_RATING = Number(process.env.CF_MAX_RATING ?? 1600);
const CF_LIMIT = Number(process.env.CF_LIMIT ?? 10);

async function main() {
  console.log('📡  Fetching Codeforces problems...');
  if (CF_TAGS.length) console.log(`    Tags: ${CF_TAGS.join(', ')}`);
  console.log(`    Rating: ${CF_MIN_RATING} ~ ${CF_MAX_RATING}\n`);

  const all = await fetchCFProblems(CF_TAGS.length ? CF_TAGS : undefined);

  const filtered = all
    .filter((p) => {
      if (!p.rating) return false;
      return p.rating >= CF_MIN_RATING && p.rating <= CF_MAX_RATING;
    })
    .slice(0, CF_LIMIT);

  if (filtered.length === 0) {
    console.log('No problems found with the given filters.');
    return;
  }

  console.log(`Found ${filtered.length} problems. Template output:\n`);
  console.log('// ─────── 아래를 scripts/data/problems.ts 에 붙여넣고 live_coding_flow 채우기 ───────\n');

  filtered.forEach((p, i) => {
    const { primary, secondary } = mapCFTags(p.tags);
    const difficulty = mapCFRating(p.rating);
    const url = cfProblemUrl(p.contestId, p.index);

    // UUID는 순서 기반 임시 값 — 실제 사용 시 변경 권장
    const uuidSuffix = String(Date.now()).slice(-12).padStart(12, '0').replace(/(\d{4})/g, '$1-').slice(0, -1);
    const id = `c${String(i).padStart(7, '0')}-${uuidSuffix}`;

    console.log(`  // CF ${p.contestId}${p.index} — ${p.name} (${p.rating ?? '?'}) — ${url}`);
    console.log(`  {`);
    console.log(`    id: '${id}',`);
    console.log(`    title: '${p.name}',`);
    console.log(`    description: '// TODO: 문제 본문 직접 작성 (API 미제공)',`);
    console.log(`    constraints: null,`);
    console.log(`    difficulty: '${difficulty}',`);
    console.log(`    concept_tags: ${JSON.stringify(primary)},`);
    console.log(`    secondary_concept_tags: ${JSON.stringify(secondary)},`);
    console.log(`    intent_description: '// TODO',`);
    console.log(`    key_observation: '// TODO',`);
    console.log(`    wrong_approaches: [],`);
    console.log(`    live_coding_flow: {`);
    console.log(`      firstObservation: '// TODO',`);
    console.log(`      approachCandidates: [],`);
    console.log(`      whyThisApproach: '// TODO',`);
    console.log(`      wrongApproaches: [],`);
    console.log(`      dataStructures: [],`);
    console.log(`      timeComplexity: '// TODO',`);
    console.log(`      pitfalls: [],`);
    console.log(`      interviewExplanation: '// TODO',`);
    console.log(`    },`);
    console.log(`    source: { platform: 'codeforces', id: '${p.contestId}${p.index}' },`);
    console.log(`  },\n`);
  });
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
