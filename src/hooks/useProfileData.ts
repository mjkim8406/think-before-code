/**
 * Profile/Settings data hook
 */

import { useState, useEffect, useCallback } from 'react';
import {
  fetchProfile,
  type ProfileData,
} from '@/src/services/profileService';

interface ProfileHook {
  profile: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useProfileData(): ProfileHook {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (silent = false) => {
    try {
      if (!silent) setIsLoading(true);
      setError(null);
      const data = await fetchProfile();
      setProfile(data);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load profile');
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const refresh = useCallback(() => load(true), [load]);

  return { profile, isLoading, error, refresh };
}
