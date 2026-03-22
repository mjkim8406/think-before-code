/**
 * Login Screen — Social login + guest continue
 */

import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '@/src/lib/constants';
import {
  signInWithApple,
  signInWithGoogle,
  signInAnonymously,
} from '@/src/services/authService';

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(method: 'apple' | 'google' | 'anonymous') {
    try {
      setLoading(method);
      setError(null);

      if (method === 'apple') {
        await signInWithApple();
      } else if (method === 'google') {
        await signInWithGoogle();
      } else {
        await signInAnonymously();
      }
      // Auth state change listener in _layout.tsx handles navigation
    } catch (err: any) {
      setError(err.message ?? 'Login failed');
    } finally {
      setLoading(null);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logoRow}>
            <Text style={[styles.logoCh, { color: COLORS.green800 }]}>&lt;</Text>
            <Text style={[styles.logoCh, { color: COLORS.green600 }]}>&gt;</Text>
            <Text style={[styles.logoCh, { color: COLORS.green500 }]}>&gt;</Text>
            <Text style={[styles.logoCh, { color: COLORS.green400 }]}>&gt;</Text>
          </View>
          <Text style={styles.heroTitle}>
            Think<Text style={styles.heroDot}>.</Text>
          </Text>
          <Text style={styles.heroSubtitle}>before you code</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          코딩테스트 사고력 훈련{'\n'}문제를 읽고, 분석하고, 설계하세요.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          {Platform.OS === 'ios' && (
            <Pressable
              style={({ pressed }) => [styles.socialBtn, styles.appleBtn, pressed && { opacity: 0.85 }]}
              onPress={() => handleLogin('apple')}
              disabled={loading !== null}
            >
              {loading === 'apple' ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Ionicons name="logo-apple" size={20} color="#fff" />
                  <Text style={[styles.socialBtnText, { color: '#fff' }]}>Apple로 계속하기</Text>
                </>
              )}
            </Pressable>
          )}

          <Pressable
            style={({ pressed }) => [styles.socialBtn, styles.googleBtn, pressed && { opacity: 0.85 }]}
            onPress={() => handleLogin('google')}
            disabled={loading !== null}
          >
            {loading === 'google' ? (
              <ActivityIndicator size="small" color={COLORS.text} />
            ) : (
              <>
                <Ionicons name="logo-google" size={18} color={COLORS.text} />
                <Text style={styles.socialBtnText}>Google로 계속하기</Text>
              </>
            )}
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>또는</Text>
            <View style={styles.dividerLine} />
          </View>

          <Pressable
            style={({ pressed }) => [styles.guestBtn, pressed && { opacity: 0.85 }]}
            onPress={() => handleLogin('anonymous')}
            disabled={loading !== null}
          >
            {loading === 'anonymous' ? (
              <ActivityIndicator size="small" color={COLORS.green800} />
            ) : (
              <Text style={styles.guestBtnText}>게스트로 시작하기</Text>
            )}
          </Pressable>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <Text style={styles.footer}>
          게스트 계정은 앱 삭제 시 데이터가 유실됩니다.{'\n'}
          소셜 로그인으로 데이터를 안전하게 보관하세요.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoCh: {
    fontSize: 32,
    fontFamily: FONTS.black,
    letterSpacing: -1,
    marginRight: -2,
  },
  heroTitle: {
    fontSize: 64,
    fontFamily: FONTS.black,
    color: COLORS.green800,
    letterSpacing: -3,
    lineHeight: 64,
  },
  heroDot: {
    color: COLORS.green500,
  },
  heroSubtitle: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    color: COLORS.figmaSubtext,
    letterSpacing: -0.5,
    marginTop: 4,
  },
  description: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonGroup: {
    gap: 12,
    marginBottom: 24,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 52,
    borderRadius: 14,
  },
  appleBtn: {
    backgroundColor: '#000',
  },
  googleBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  socialBtnText: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.text,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.sand200,
  },
  dividerText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.figmaSubtext,
  },
  guestBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.green50,
    borderWidth: 1,
    borderColor: COLORS.green100,
  },
  guestBtnText: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    color: COLORS.green800,
  },
  error: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 12,
  },
  footer: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.figmaSubtext,
    textAlign: 'center',
    lineHeight: 18,
  },
});
