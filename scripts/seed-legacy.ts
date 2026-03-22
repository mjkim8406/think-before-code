/**
 * Supabase 시딩 스크립트
 *
 * 실행: npm run seed
 *
 * - scripts/data/problems.ts 에서 큐레이션된 문제를 읽어 Supabase에 upsert
 * - id를 기준으로 upsert하므로 중복 실행 안전 (ON CONFLICT DO UPDATE)
 * - 서비스 롤 키를 사용해 RLS 우회
 */

import { createHash } from 'node:crypto';
import { supabaseAdmin } from './lib/supabase-admin.js';
import { CURATED_PROBLEMS, type ProblemSeed } from './data/problems.js';

/** 문자열 id → 결정론적 UUID v4 형식 (같은 id → 항상 같은 UUID) */
function toUuid(id: string): string {
  const hash = createHash('sha256').update(id).digest('hex');
  // UUID v4 형식: 8-4-4-4-12
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    '4' + hash.slice(13, 16),          // version 4
    ((parseInt(hash[16], 16) & 0x3) | 0x8).toString(16) + hash.slice(17, 20), // variant
    hash.slice(20, 32),
  ].join('-');
}

async function seed() {
  console.log(`\n🌱  Seeding ${CURATED_PROBLEMS.length} problems...\n`);

  // source 필드 제거, id를 유효한 UUID로 변환
  const rows = CURATED_PROBLEMS.map(({ source: _source, id, ...rest }: ProblemSeed) => ({
    id: toUuid(id),
    ...rest,
  }));

  const { data, error } = await supabaseAdmin
    .from('problems')
    .upsert(rows, { onConflict: 'id' })
    .select('id, title, difficulty');

  if (error) {
    console.error('❌  Seed failed:', error.message);
    console.error('    Details:', error.details);
    process.exit(1);
  }

  console.log('✅  Seeded:');
  data?.forEach((p) => {
    const tag = p.difficulty === 'easy' ? '🟢' : p.difficulty === 'medium' ? '🟡' : '🔴';
    console.log(`    ${tag}  ${p.title}  (${p.id})`);
  });

  console.log(`\n🎉  Done. ${data?.length ?? 0} problems in Supabase.\n`);
}

seed().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
