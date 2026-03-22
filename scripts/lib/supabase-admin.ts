/**
 * Supabase admin client (서비스 롤 키)
 *
 * RLS를 우회하여 직접 INSERT/UPSERT 가능.
 * 스크립트 전용 — 앱 코드에서는 절대 사용 금지.
 *
 * 필요 환경변수 (.env.local):
 *   SUPABASE_URL=https://xxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ...
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error(
    'Missing env vars: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local'
  );
}

export const supabaseAdmin = createClient(url, key, {
  auth: { persistSession: false },
});
