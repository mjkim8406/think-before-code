/**
 * Platform-safe storage wrapper
 *
 * @react-native-async-storage/async-storage 의 web 빌드가
 * 모듈 로드 시점에 window.localStorage에 접근해서
 * SSR/Node 환경에서 "window is not defined" 에러 발생.
 *
 * 이 래퍼는 런타임에 안전하게 AsyncStorage를 로드하고,
 * window가 없는 환경에서는 in-memory fallback을 사용한다.
 */

import { Platform } from 'react-native';

interface StorageAdapter {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

// In-memory fallback (SSR / test 환경)
const memoryStore = new Map<string, string>();
const memoryStorage: StorageAdapter = {
  getItem: async (key) => memoryStore.get(key) ?? null,
  setItem: async (key, value) => { memoryStore.set(key, value); },
  removeItem: async (key) => { memoryStore.delete(key); },
};

let _storage: StorageAdapter | null = null;

/**
 * 안전하게 storage 인스턴스를 가져온다.
 * Native → AsyncStorage, Web (window 있음) → AsyncStorage, 그 외 → memory
 */
export function getStorage(): StorageAdapter {
  if (_storage) return _storage;

  try {
    if (Platform.OS !== 'web' || typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      _storage = AsyncStorage;
      return _storage!;
    }
  } catch {
    // fallback
  }

  _storage = memoryStorage;
  return _storage;
}

/** Supabase auth storage용 어댑터 */
export const safeStorage: StorageAdapter = {
  getItem: (key) => getStorage().getItem(key),
  setItem: (key, value) => getStorage().setItem(key, value),
  removeItem: (key) => getStorage().removeItem(key),
};
