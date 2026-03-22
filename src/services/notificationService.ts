/**
 * Notification service — Local push notifications for daily reminders
 *
 * expo-notifications는 Expo Go SDK 53+에서 완전히 제거됨.
 * Development build에서만 동작.
 * Expo Go에서는 모든 함수가 조용히 no-op 처리됨.
 */

import Constants from 'expo-constants';

// Expo Go 환경 감지 — 여기서는 알림이 동작하지 않음
const isExpoGo = Constants.appOwnership === 'expo';

// Development build에서만 실제 모듈 로드
let N: any = null;

function init() {
  if (N || isExpoGo) return;
  try {
    N = require('expo-notifications');
    N.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  } catch {
    // dev build에서도 실패할 수 있음
    N = null;
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  init();
  if (!N) return false;
  try {
    const { status: existing } = await N.getPermissionsAsync();
    if (existing === 'granted') return true;
    const { status } = await N.requestPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

export async function scheduleDailyReminder(hour: number, minute: number): Promise<string | null> {
  init();
  if (!N) return null;
  try {
    const granted = await requestNotificationPermission();
    if (!granted) return null;
    await cancelDailyReminder();
    return await N.scheduleNotificationAsync({
      content: {
        title: '오늘의 문제가 기다리고 있어요!',
        body: '사고력 훈련을 시작해보세요.',
        sound: true,
      },
      trigger: {
        type: N.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  } catch {
    return null;
  }
}

export async function cancelDailyReminder(): Promise<void> {
  init();
  if (!N) return;
  try {
    await N.cancelAllScheduledNotificationsAsync();
  } catch {}
}

export async function getScheduledNotifications() {
  init();
  if (!N) return [];
  try {
    return await N.getAllScheduledNotificationsAsync();
  } catch {
    return [];
  }
}
