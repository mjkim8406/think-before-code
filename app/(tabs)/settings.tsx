import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  Modal,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS } from '@/src/lib/constants';
import { useProfileData } from '@/src/hooks/useProfileData';
import { useDailyGoal } from '@/src/hooks/useDailyGoal';
import { signOut, updateProfile } from '@/src/services/profileService';
import { isAnonymousUser, signInWithApple, signInWithGoogle } from '@/src/services/authService';
import { scheduleDailyReminder, cancelDailyReminder } from '@/src/services/notificationService';

// ─── Logo (다른 탭과 동일) ──────────────────────────────────────────────
const _logoChar = { fontSize: 26, fontFamily: FONTS.black, letterSpacing: -1, lineHeight: 30, marginRight: -2 } as const;
function LogoIcon() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={[_logoChar, { color: COLORS.green800 }]}>&lt;</Text>
      <Text style={[_logoChar, { color: COLORS.green600 }]}>&gt;</Text>
      <Text style={[_logoChar, { color: COLORS.green500 }]}>&gt;</Text>
      <Text style={[_logoChar, { color: COLORS.green400 }]}>&gt;</Text>
    </View>
  );
}

// ─── Setting Item ───────────────────────────────────────────────────────
type SettingItemProps = {
  iconName: React.ComponentProps<typeof Feather>['name'];
  iconBg: string;
  title: string;
  subtitle: string;
  rightContent?: React.ReactNode;
  destructive?: boolean;
  onPress?: () => void;
};

function SettingItem({
  iconName, iconBg, title, subtitle, rightContent, destructive = false, onPress,
}: SettingItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.settingItem, { opacity: pressed ? 0.7 : 1 }]}
    >
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Feather name={iconName} size={20} color={destructive ? '#ba1a1a' : '#1a1c1c'} />
      </View>
      <View style={styles.settingTextGroup}>
        <Text style={[styles.settingTitle, destructive && { color: '#ba1a1a' }]}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      {rightContent && <View style={styles.settingRight}>{rightContent}</View>}
    </Pressable>
  );
}

// ─── Goal Modal ─────────────────────────────────────────────────────────
function GoalModal({ visible, value, onChange, onClose }: {
  visible: boolean; value: number; onChange: (v: number) => void; onClose: () => void;
}) {
  const min = 1, max = 10;
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.modalTitle}>Daily Goal</Text>
          <Text style={styles.modalDesc}>하루 목표 문제 수를 설정하세요</Text>
          <View style={styles.stepper}>
            <Pressable
              onPress={() => value > min && onChange(value - 1)}
              style={[styles.stepperBtn, value <= min && styles.stepperBtnDisabled]}
            >
              <Feather name="minus" size={18} color={value <= min ? COLORS.sand300 : COLORS.green800} />
            </Pressable>
            <Text style={styles.stepperValue}>{value}</Text>
            <Pressable
              onPress={() => value < max && onChange(value + 1)}
              style={[styles.stepperBtn, value >= max && styles.stepperBtnDisabled]}
            >
              <Feather name="plus" size={18} color={value >= max ? COLORS.sand300 : COLORS.green800} />
            </Pressable>
          </View>
          <Text style={styles.stepperUnit}>문제 / 일</Text>
          <Pressable style={styles.modalDoneBtn} onPress={onClose}>
            <Text style={styles.modalDoneBtnText}>완료</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Notification Modal ────────────────────────────────────────────────
function NotifModal({ visible, hour, minute, onChangeHour, onChangeMinute, onClose }: {
  visible: boolean; hour: number; minute: number;
  onChangeHour: (h: number) => void; onChangeMinute: (m: number) => void; onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.modalTitle}>알림 시간</Text>
          <Text style={styles.modalDesc}>매일 학습 알림을 받을 시간을 설정하세요</Text>
          <View style={styles.timePicker}>
            <View style={styles.timeColumn}>
              <Pressable onPress={() => onChangeHour((hour + 1) % 24)} hitSlop={10} style={styles.timeArrow}>
                <Feather name="chevron-up" size={22} color={COLORS.figmaSubtext} />
              </Pressable>
              <Text style={styles.timeValue}>{String(hour).padStart(2, '0')}</Text>
              <Pressable onPress={() => onChangeHour((hour + 23) % 24)} hitSlop={10} style={styles.timeArrow}>
                <Feather name="chevron-down" size={22} color={COLORS.figmaSubtext} />
              </Pressable>
            </View>
            <Text style={styles.timeColon}>:</Text>
            <View style={styles.timeColumn}>
              <Pressable onPress={() => onChangeMinute((minute + 10) % 60)} hitSlop={10} style={styles.timeArrow}>
                <Feather name="chevron-up" size={22} color={COLORS.figmaSubtext} />
              </Pressable>
              <Text style={styles.timeValue}>{String(minute).padStart(2, '0')}</Text>
              <Pressable onPress={() => onChangeMinute((minute + 50) % 60)} hitSlop={10} style={styles.timeArrow}>
                <Feather name="chevron-down" size={22} color={COLORS.figmaSubtext} />
              </Pressable>
            </View>
          </View>
          <Pressable style={styles.modalDoneBtn} onPress={onClose}>
            <Text style={styles.modalDoneBtnText}>완료</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Main Screen ────────────────────────────────────────────────────────
export default function SettingsScreen() {
  const { profile, isLoading, refresh } = useProfileData();
  const { goal: localGoal, enabled: goalEnabled, updateGoal, updateEnabled: setGoalEnabled } = useDailyGoal();
  const [isAnon, setIsAnon] = React.useState(false);
  const [notifHour, setNotifHour] = React.useState(9);
  const [notifMinute, setNotifMinute] = React.useState(0);
  const [notifEnabled, setNotifEnabled] = React.useState(true);
  const [showGoalModal, setShowGoalModal] = React.useState(false);
  const [showNotifModal, setShowNotifModal] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      refresh();
      isAnonymousUser().then(setIsAnon).catch(() => {});
    }, [])
  );

  function handleEditName() {
    Alert.prompt?.(
      '닉네임 변경',
      '새 닉네임을 입력하세요',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '저장',
          onPress: (name: string | undefined) => {
            if (name?.trim()) {
              updateProfile({ displayName: name.trim() }).then(refresh);
            }
          },
        },
      ],
      'plain-text',
      profile?.displayName ?? '',
    );
  }

  function handleLinkAccount() {
    const buttons: any[] = [];
    if (Platform.OS === 'ios') {
      buttons.push({
        text: 'Apple로 연동',
        onPress: () => signInWithApple().then(refresh).catch((e: any) => Alert.alert('오류', e.message)),
      });
    }
    buttons.push({
      text: 'Google로 연동',
      onPress: () => signInWithGoogle().then(refresh).catch((e: any) => Alert.alert('오류', e.message)),
    });
    buttons.push({ text: '취소', style: 'cancel' });
    Alert.alert('계정 연동', '소셜 계정을 연동하면 앱 삭제 후에도 데이터가 보존됩니다.', buttons);
  }

  function handleGoalToggle(val: boolean) {
    setGoalEnabled(val);
  }

  function handleGoalChange(goal: number) {
    updateGoal(goal);
  }

  function handleGoalModalClose() {
    setShowGoalModal(false);
  }

  function handleNotifToggle(val: boolean) {
    setNotifEnabled(val);
    if (val) {
      scheduleDailyReminder(notifHour, notifMinute).catch(() => {});
    } else {
      cancelDailyReminder().catch(() => {});
    }
  }

  function handleNotifHourChange(h: number) {
    setNotifHour(h);
  }

  function handleNotifMinuteChange(m: number) {
    setNotifMinute(m);
  }

  function handleNotifModalClose() {
    setShowNotifModal(false);
    scheduleDailyReminder(notifHour, notifMinute).catch(() => {});
  }

  function handleLogout() {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: () => signOut() },
    ]);
  }

  const initials = profile?.displayName
    ? profile.displayName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';
  const displayName = profile?.displayName ?? 'Anonymous User';
  const email = profile?.email ?? 'anonymous@think.app';

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]} edges={['top']}>
        <ActivityIndicator size="large" color={COLORS.green800} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Nav — 다른 탭과 동일 */}
        <View style={styles.nav}>
          <LogoIcon />
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            {profile?.avatarUrl ? (
              <Image source={{ uri: profile.avatarUrl }} style={styles.navAvatarImg} />
            ) : (
              <View style={styles.navAvatar}>
                <Text style={styles.navAvatarText}>{initials}</Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings.</Text>
        </View>

        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {profile?.avatarUrl ? (
              <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Pressable onPress={handleEditName} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.profileName}>{displayName}</Text>
              <Feather name="edit-2" size={14} color={COLORS.figmaSubtext} />
            </Pressable>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>
        </View>

        {/* Link Account Banner */}
        {isAnon && (
          <Pressable style={styles.linkBanner} onPress={handleLinkAccount}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.green800} />
            <View style={{ flex: 1 }}>
              <Text style={styles.linkBannerTitle}>계정 연동하기</Text>
              <Text style={styles.linkBannerDesc}>소셜 로그인으로 데이터를 안전하게 보관하세요</Text>
            </View>
            <Feather name="chevron-right" size={16} color={COLORS.green800} />
          </Pressable>
        )}

        {/* STUDY Group */}
        <Text style={styles.groupLabel}>STUDY</Text>
        <View style={styles.groupCard}>
          {/* Daily Goal — Toggle + Modal */}
          <View style={styles.settingItem}>
            <View style={[styles.iconBox, { backgroundColor: '#c1ecd4' }]}>
              <Feather name="target" size={20} color="#1a1c1c" />
            </View>
            <Pressable
              style={styles.settingTextGroup}
              onPress={() => goalEnabled && setShowGoalModal(true)}
            >
              <Text style={styles.settingTitle}>Daily Goal</Text>
              <Text style={styles.settingSubtitle}>
                {goalEnabled ? `하루 ${localGoal}문제` : '꺼짐'}
              </Text>
            </Pressable>
            <Switch
              value={goalEnabled}
              onValueChange={handleGoalToggle}
              trackColor={{ false: COLORS.sand200, true: COLORS.green800 }}
              thumbColor="#fff"
            />
          </View>

          {/* Notification — Toggle + Modal */}
          <View style={styles.settingItem}>
            <View style={[styles.iconBox, { backgroundColor: '#dae1e3' }]}>
              <Feather name="bell" size={20} color="#1a1c1c" />
            </View>
            <Pressable
              style={styles.settingTextGroup}
              onPress={() => notifEnabled && setShowNotifModal(true)}
            >
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingSubtitle}>
                {notifEnabled ? `매일 ${String(notifHour).padStart(2, '0')}:${String(notifMinute).padStart(2, '0')}` : '꺼짐'}
              </Text>
            </Pressable>
            <Switch
              value={notifEnabled}
              onValueChange={handleNotifToggle}
              trackColor={{ false: COLORS.sand200, true: COLORS.green800 }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Modals */}
        <GoalModal
          visible={showGoalModal}
          value={localGoal}
          onChange={handleGoalChange}
          onClose={handleGoalModalClose}
        />
        <NotifModal
          visible={showNotifModal}
          hour={notifHour}
          minute={notifMinute}
          onChangeHour={handleNotifHourChange}
          onChangeMinute={handleNotifMinuteChange}
          onClose={handleNotifModalClose}
        />

        {/* APP Group */}
        <Text style={styles.groupLabel}>APP</Text>
        <View style={styles.groupCard}>
          <SettingItem
            iconName="smartphone"
            iconBg="#eeeeee"
            title="App Version"
            subtitle="Check for updates"
            rightContent={<Text style={styles.versionText}>v1.0.0</Text>}
          />
          <SettingItem
            iconName="mail"
            iconBg="#eeeeee"
            title="Send Feedback"
            subtitle="Help us improve Think."
            rightContent={<Feather name="chevron-right" size={12} color="#586062" />}
          />
        </View>

        {/* ACCOUNT Group */}
        <Text style={styles.groupLabel}>ACCOUNT</Text>
        <View style={styles.groupCard}>
          <SettingItem
            iconName="log-out"
            iconBg="rgba(255, 218, 214, 0.5)"
            title="Logout"
            subtitle="Sign out of your account"
            destructive
            onPress={handleLogout}
          />
          <SettingItem
            iconName="trash-2"
            iconBg="rgba(186, 26, 26, 0.1)"
            title="Delete Account"
            subtitle="Permanently remove your data"
            destructive
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { paddingBottom: 40 },

  // Nav — 다른 탭과 동일
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 4,
  },
  navAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.green800, alignItems: 'center', justifyContent: 'center',
  },
  navAvatarImg: { width: 40, height: 40, borderRadius: 20 },
  navAvatarText: { fontSize: 14, fontFamily: FONTS.bold, color: COLORS.white },

  // Header — 다른 탭과 동일
  header: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16 },
  headerTitle: { fontFamily: FONTS.black, fontSize: 36, letterSpacing: -1, lineHeight: 40, color: COLORS.figmaDarkGreen },

  // Profile
  profileSection: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 8, paddingBottom: 24, gap: 20,
  },
  avatarContainer: {},
  avatar: { width: 72, height: 72, borderRadius: 24 },
  avatarFallback: {
    width: 72, height: 72, borderRadius: 24,
    backgroundColor: '#1b4332', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontFamily: FONTS.black, fontSize: 24, lineHeight: 28, color: '#ffffff' },
  profileInfo: { flex: 1 },
  profileName: { fontFamily: FONTS.bold, fontSize: 22, letterSpacing: -0.5, lineHeight: 28, color: '#1a1c1c' },
  profileEmail: { fontFamily: FONTS.medium, fontSize: 14, lineHeight: 20, color: '#586062', marginTop: 2 },

  // Link Banner
  linkBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginHorizontal: 24, marginBottom: 8, padding: 16,
    backgroundColor: COLORS.green50, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.green100,
  },
  linkBannerTitle: { fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.green800 },
  linkBannerDesc: { fontFamily: FONTS.regular, fontSize: 12, color: COLORS.figmaSubtext, marginTop: 1 },

  // Groups
  groupLabel: {
    fontFamily: FONTS.bold, fontSize: 10, letterSpacing: 2, lineHeight: 15,
    color: 'rgba(88, 96, 98, 0.6)', paddingHorizontal: 32, marginBottom: 16, marginTop: 16,
  },
  groupCard: {
    marginHorizontal: 24, backgroundColor: '#ffffff',
    borderRadius: 24, overflow: 'hidden', marginBottom: 32,
  },

  // Setting Items
  settingItem: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 20,
  },
  iconBox: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  settingTextGroup: { flex: 1, marginLeft: 20 },
  settingTitle: { fontFamily: FONTS.bold, fontSize: 16, lineHeight: 24, color: '#1a1c1c' },
  settingSubtitle: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 20, color: '#586062' },
  settingRight: { alignItems: 'flex-end' },

  valueRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  versionText: { fontFamily: 'SpaceMono', fontWeight: '700', fontSize: 14, lineHeight: 20, color: '#717973' },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', alignItems: 'center',
  },
  modalContent: {
    width: 300, backgroundColor: '#fff', borderRadius: 24,
    padding: 28, alignItems: 'center',
  },
  modalTitle: {
    fontFamily: FONTS.bold, fontSize: 20, color: '#1a1c1c', marginBottom: 4,
  },
  modalDesc: {
    fontFamily: FONTS.regular, fontSize: 14, color: COLORS.figmaSubtext, marginBottom: 28,
  },
  modalDoneBtn: {
    marginTop: 28, width: '100%', height: 48, borderRadius: 14,
    backgroundColor: COLORS.green800, alignItems: 'center', justifyContent: 'center',
  },
  modalDoneBtnText: {
    fontFamily: FONTS.bold, fontSize: 16, color: '#fff',
  },

  // Stepper (in modal)
  stepper: {
    flexDirection: 'row', alignItems: 'center', gap: 20,
  },
  stepperBtn: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: COLORS.sand100, borderWidth: 1, borderColor: COLORS.sand200,
    alignItems: 'center', justifyContent: 'center',
  },
  stepperBtnDisabled: { opacity: 0.4 },
  stepperValue: {
    fontFamily: FONTS.black, fontSize: 36, lineHeight: 42,
    color: COLORS.figmaDarkGreen, minWidth: 40, textAlign: 'center',
  },
  stepperUnit: {
    fontFamily: FONTS.medium, fontSize: 13, color: COLORS.figmaSubtext, marginTop: 8,
  },

  // Time Picker (in modal)
  timePicker: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  timeColumn: {
    alignItems: 'center', gap: 4,
  },
  timeArrow: {
    padding: 4,
  },
  timeValue: {
    fontFamily: FONTS.black, fontSize: 36, lineHeight: 42,
    color: COLORS.figmaDarkGreen, minWidth: 52, textAlign: 'center',
  },
  timeColon: {
    fontFamily: FONTS.black, fontSize: 36, lineHeight: 42,
    color: COLORS.figmaDarkGreen, marginHorizontal: 2, marginTop: 4,
  },
});
