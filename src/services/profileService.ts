/**
 * Profile/Settings — Supabase queries
 */

import { supabase } from '@/src/lib/supabase';
import { getCurrentUserId } from './trainingService';

export interface ProfileData {
  userId: string;
  displayName: string | null;
  avatarUrl: string | null;
  dailyGoal: number;
  isPremium: boolean;
  email: string | null;
}

/**
 * 프로필 조회
 */
export async function fetchProfile(): Promise<ProfileData> {
  const userId = await getCurrentUserId();

  // 프로필 + auth 이메일 병렬 조회
  const [profileRes, sessionRes] = await Promise.all([
    supabase
      .from('profiles')
      .select('user_id, display_name, avatar_url, daily_goal, is_premium')
      .eq('user_id', userId)
      .maybeSingle(),
    supabase.auth.getSession(),
  ]);

  if (profileRes.error) throw new Error(profileRes.error.message);

  const profile = profileRes.data;
  const email = sessionRes.data.session?.user?.email ?? null;

  return {
    userId,
    displayName: profile?.display_name ?? null,
    avatarUrl: profile?.avatar_url ?? null,
    dailyGoal: profile?.daily_goal ?? 1,
    isPremium: profile?.is_premium ?? false,
    email,
  };
}

/**
 * Daily Goal 업데이트
 */
export async function updateDailyGoal(goal: number): Promise<void> {
  const userId = await getCurrentUserId();
  const { error } = await supabase
    .from('profiles')
    .update({ daily_goal: goal })
    .eq('user_id', userId);

  if (error) throw new Error(`Update daily goal failed: ${error.message}`);
}

/**
 * 프로필 업데이트 (displayName, avatarUrl)
 */
export async function updateProfile(updates: {
  displayName?: string;
  avatarUrl?: string;
}): Promise<void> {
  const userId = await getCurrentUserId();
  const payload: Record<string, any> = {};
  if (updates.displayName !== undefined) payload.display_name = updates.displayName;
  if (updates.avatarUrl !== undefined) payload.avatar_url = updates.avatarUrl;

  const { error } = await supabase
    .from('profiles')
    .update(payload)
    .eq('user_id', userId);

  if (error) throw new Error(`Update profile failed: ${error.message}`);
}

/**
 * 로그아웃
 */
export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(`Sign out failed: ${error.message}`);
}
