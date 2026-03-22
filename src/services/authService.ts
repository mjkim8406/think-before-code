/**
 * Auth service — Google/Apple social login + anonymous auth
 */

import { supabase } from '@/src/lib/supabase';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { Platform } from 'react-native';

/**
 * Apple 로그인 (iOS only)
 */
export async function signInWithApple() {
  const nonce = Crypto.randomUUID();
  const hashedNonce = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    nonce,
  );

  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  });

  if (!credential.identityToken) {
    throw new Error('Apple Sign-In failed: no identity token');
  }

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'apple',
    token: credential.identityToken,
    nonce,
  });

  if (error) throw new Error(`Apple login failed: ${error.message}`);
  return data;
}

/**
 * Google 로그인
 */
export async function signInWithGoogle() {
  const redirectUrl = makeRedirectUri();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw new Error(`Google login failed: ${error.message}`);
  if (!data.url) throw new Error('No OAuth URL returned');

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
  if (result.type !== 'success') {
    throw new Error('Google sign-in was cancelled');
  }

  // Extract tokens from the URL hash
  const url = (result as WebBrowser.WebBrowserAuthSessionResult & { url: string }).url;
  const params = new URLSearchParams(url.split('#')[1]);
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');

  if (accessToken && refreshToken) {
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    if (sessionError) throw new Error(`Session set failed: ${sessionError.message}`);
  }
}

/**
 * 익명 로그인
 */
export async function signInAnonymously() {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw new Error(`Anonymous login failed: ${error.message}`);
  return data;
}

/**
 * 익명 계정에 소셜 계정 연동
 */
export async function linkAppleIdentity() {
  const nonce = Crypto.randomUUID();
  const hashedNonce = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    nonce,
  );

  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
    nonce: hashedNonce,
  });

  if (!credential.identityToken) {
    throw new Error('Apple Sign-In failed: no identity token');
  }

  // linkIdentity is available for linking anonymous to social
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'apple',
    token: credential.identityToken,
    nonce,
  });

  if (error) throw new Error(`Apple link failed: ${error.message}`);
  return data;
}

/**
 * 현재 유저가 익명 계정인지 확인
 */
export async function isAnonymousUser(): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user?.is_anonymous === true;
}

/**
 * Auth 상태 변경 구독
 */
export function onAuthStateChange(callback: (session: any) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
}
