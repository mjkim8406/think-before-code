/**
 * Notification service — Local push notifications for daily reminders
 *
 * expo-notifications는 Expo Go SDK 53+에서 remote notification이 제거됨.
 * Development build에서만 동작. Expo Go에서는 graceful fallback.
 */

let Notifications: typeof import('expo-notifications') | null = null;

async function getNotifications() {
  if (!Notifications) {
    try {
      Notifications = await import('expo-notifications');
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldShowBanner: true,
          shouldShowList: true,
        }),
      });
    } catch {
      return null;
    }
  }
  return Notifications;
}

/**
 * 알림 권한 요청
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const N = await getNotifications();
  if (!N) return false;

  const { status: existingStatus } = await N.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await N.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

/**
 * Daily Goal 리마인더 스케줄 등록
 * @param hour 알림 시각 (0~23)
 * @param minute 알림 분 (0~59)
 */
export async function scheduleDailyReminder(hour: number, minute: number): Promise<string | null> {
  const granted = await requestNotificationPermission();
  if (!granted) return null;

  const N = await getNotifications();
  if (!N) return null;

  await cancelDailyReminder();

  const id = await N.scheduleNotificationAsync({
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

  return id;
}

/**
 * Daily 리마인더 취소
 */
export async function cancelDailyReminder(): Promise<void> {
  const N = await getNotifications();
  if (!N) return;
  await N.cancelAllScheduledNotificationsAsync();
}

/**
 * 현재 예약된 알림 목록 확인
 */
export async function getScheduledNotifications() {
  const N = await getNotifications();
  if (!N) return [];
  return N.getAllScheduledNotificationsAsync();
}
