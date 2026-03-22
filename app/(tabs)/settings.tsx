import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS } from '@/src/lib/constants';
import { useProfileData } from '@/src/hooks/useProfileData';
import { signOut, updateDailyGoal, updateProfile } from '@/src/services/profileService';
import { isAnonymousUser, signInWithApple, signInWithGoogle } from '@/src/services/authService';
import { scheduleDailyReminder, cancelDailyReminder } from '@/src/services/notificationService';

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
  iconName,
  iconBg,
  title,
  subtitle,
  rightContent,
  destructive = false,
  onPress,
}: SettingItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingItem,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Feather
          name={iconName}
          size={20}
          color={destructive ? '#ba1a1a' : '#1a1c1c'}
        />
      </View>
      <View style={styles.settingTextGroup}>
        <Text style={[styles.settingTitle, destructive && { color: '#ba1a1a' }]}>
          {title}
        </Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      {rightContent && (
        <View style={styles.settingRight}>{rightContent}</View>
      )}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const { profile, isLoading, error, refresh } = useProfileData();
  const [isAnon, setIsAnon] = React.useState(false);
  const [notifHour, setNotifHour] = React.useState(9);
  const [notifMinute, setNotifMinute] = React.useState(0);

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

  function handleNotificationTime() {
    const options = [
      { text: '7:00 AM', hour: 7 },
      { text: '8:00 AM', hour: 8 },
      { text: '9:00 AM', hour: 9 },
      { text: '12:00 PM', hour: 12 },
      { text: '8:00 PM', hour: 20 },
      { text: '끄기', hour: -1 },
    ];

    Alert.alert('알림 시간', '매일 알림 받을 시간을 선택하세요', [
      ...options.map((opt) => ({
        text: opt.text,
        onPress: () => {
          if (opt.hour === -1) {
            cancelDailyReminder();
            setNotifHour(-1);
          } else {
            scheduleDailyReminder(opt.hour, 0);
            setNotifHour(opt.hour);
            setNotifMinute(0);
          }
        },
      })),
      { text: '취소', style: 'cancel' as const },
    ]);
  }

  // 이니셜 계산
  const initials = profile?.displayName
    ? profile.displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  const displayName = profile?.displayName ?? 'Anonymous User';
  const email = profile?.email ?? 'anonymous@think.app';
  const dailyGoal = profile?.dailyGoal ?? 1;

  function handleDailyGoalPress() {
    Alert.alert('Daily Goal', '하루 목표 문제 수를 선택하세요', [
      { text: '1 problem', onPress: () => updateDailyGoal(1).then(refresh) },
      { text: '2 problems', onPress: () => updateDailyGoal(2).then(refresh) },
      { text: '3 problems', onPress: () => updateDailyGoal(3).then(refresh) },
      { text: '5 problems', onPress: () => updateDailyGoal(5).then(refresh) },
      { text: '취소', style: 'cancel' },
    ]);
  }

  function handleLogout() {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '로그아웃',
        style: 'destructive',
        onPress: () => signOut(),
      },
    ]);
  }

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
        {/* Header: logo */}
        <View style={styles.topHeader}>
          <View style={styles.logoRow}>
            <Text style={styles.logoBracket}>&lt;</Text>
            <Text style={styles.logoArrows}>&gt;&gt;</Text>
            <Text style={styles.logoText}> Think.</Text>
          </View>
        </View>

        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Pressable onPress={handleEditName} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.profileName}>{displayName}</Text>
              <Feather name="edit-2" size={14} color={COLORS.figmaSubtext} />
            </Pressable>
            <Text style={styles.profileEmail}>{email}</Text>
            {profile?.isPremium && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>Premium Member</Text>
              </View>
            )}
          </View>
        </View>

        {/* Link Account Banner (for anonymous users) */}
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
          <SettingItem
            iconName="target"
            iconBg="#c1ecd4"
            title="Daily Goal"
            subtitle="Keep your streak alive"
            onPress={handleDailyGoalPress}
            rightContent={
              <View style={styles.valueRow}>
                <Text style={styles.valueText}>{`${dailyGoal}\nproblem${dailyGoal > 1 ? 's' : ''}`}</Text>
                <Feather name="chevron-right" size={12} color="#586062" />
              </View>
            }
          />
          <SettingItem
            iconName="bell"
            iconBg="#dae1e3"
            title="Notifications"
            subtitle="Daily reminder time"
            onPress={handleNotificationTime}
            rightContent={
              <View style={styles.valueRow}>
                <Text style={styles.valueTextSingle}>
                  {notifHour === -1
                    ? 'Off'
                    : `${notifHour > 12 ? notifHour - 12 : notifHour}:${String(notifMinute).padStart(2, '0')} ${notifHour >= 12 ? 'PM' : 'AM'}`}
                </Text>
                <Feather name="chevron-right" size={12} color="#586062" />
              </View>
            }
          />
        </View>

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

  topHeader: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 4 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoBracket: { fontSize: 24, fontFamily: FONTS.black, color: COLORS.green800, letterSpacing: -1, lineHeight: 28 },
  logoArrows: { fontSize: 24, fontFamily: FONTS.black, color: COLORS.green500, letterSpacing: -2, lineHeight: 28 },
  logoText: { fontSize: 24, fontFamily: FONTS.black, color: COLORS.figmaDarkGreen, letterSpacing: -1, lineHeight: 28 },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 32,
  },
  avatarContainer: { position: 'relative' },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: '#1b4332',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: FONTS.black, fontSize: 30, lineHeight: 36, color: '#ffffff' },
  editBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 32,
    height: 32,
    borderRadius: 9999,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  profileInfo: { flex: 1 },
  profileName: { fontFamily: FONTS.bold, fontSize: 30, letterSpacing: -0.75, lineHeight: 36, color: '#1a1c1c' },
  profileEmail: { fontFamily: FONTS.medium, fontSize: 16, lineHeight: 24, color: '#586062', marginTop: 0 },
  premiumBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#c1ecd4',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 16,
  },
  premiumText: { fontFamily: FONTS.bold, fontSize: 10, letterSpacing: 1, lineHeight: 15, color: '#274e3d' },

  linkBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 24,
    marginBottom: 8,
    padding: 16,
    backgroundColor: COLORS.green50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.green100,
  },
  linkBannerTitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: COLORS.green800,
  },
  linkBannerDesc: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: COLORS.figmaSubtext,
    marginTop: 1,
  },

  groupLabel: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    letterSpacing: 2,
    lineHeight: 15,
    color: 'rgba(88, 96, 98, 0.6)',
    paddingHorizontal: 32,
    marginBottom: 16,
    marginTop: 16,
  },
  groupCard: {
    marginHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 32,
  },

  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTextGroup: { flex: 1, marginLeft: 20 },
  settingTitle: { fontFamily: FONTS.bold, fontSize: 16, lineHeight: 24, color: '#1a1c1c' },
  settingSubtitle: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 20, color: '#586062' },
  settingRight: { alignItems: 'flex-end' },

  valueRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  valueText: { fontFamily: FONTS.bold, fontSize: 14, lineHeight: 20, color: '#012d1d', textAlign: 'right' },
  valueTextSingle: { fontFamily: FONTS.bold, fontSize: 14, lineHeight: 20, color: '#414844' },
  versionText: { fontFamily: 'SpaceMono', fontWeight: '700', fontSize: 14, lineHeight: 20, color: '#717973' },
});
