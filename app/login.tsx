/**
 * Login Screen — Premium dark, CRED-inspired
 */
import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, StatusBar, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { F } from '../src/constants/Typography';
import { C } from '../src/constants/Tokens';

const LOGO = { uri: 'https://api.dicebear.com/7.x/shapes/png?seed=SplitKaro&size=120&backgroundColor=transparent' };

export default function LoginScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top','bottom','left','right']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Top glow */}
      <View style={s.glowBg} pointerEvents="none" />

      <View style={s.content}>
        {/* Logo */}
        <View style={s.logoWrap}>
          <View style={s.logoCircle}>
            <Image source={require('../assets/images/icon.png')} style={s.logoImg} />
          </View>
          <Text style={s.logoText}>SplitKaro</Text>
          <Text style={s.tagline}>Split smarter. Settle faster.</Text>
        </View>

        {/* Auth buttons */}
        <View style={s.buttons}>
          <TouchableOpacity style={s.googleBtn} activeOpacity={0.82}>
            <View style={s.googleIcon}>
              <Text style={s.googleG}>G</Text>
            </View>
            <Text style={s.googleTxt}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.phoneBtn} activeOpacity={0.82}>
            <Ionicons name="call-outline" size={17} color={C.lavender} />
            <Text style={s.phoneTxt}>Continue with Phone</Text>
          </TouchableOpacity>

          <View style={s.dividerRow}>
            <View style={s.divLine} />
            <Text style={s.divTxt}>or</Text>
            <View style={s.divLine} />
          </View>

          <TouchableOpacity style={s.guestBtn} onPress={() => router.replace('/(tabs)/')} activeOpacity={0.75}>
            <Text style={s.guestTxt}>Continue as Guest →</Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <Text style={s.terms}>
          By continuing you agree to our{' '}
          <Text style={{ color: C.lavender }}>Terms</Text> and{' '}
          <Text style={{ color: C.lavender }}>Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  glowBg: {
    position: 'absolute', top: -120, alignSelf: 'center',
    width: 400, height: 400, borderRadius: 200,
    backgroundColor: C.purple, opacity: 0.08,
  },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between', paddingBottom: 24, paddingTop: 40 },

  logoWrap: { alignItems: 'center', gap: 12 },
  logoCircle: {
    width: 90, height: 90, borderRadius: 26,
    backgroundColor: `${C.purple}20`,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: `${C.purple}40`,
    shadowColor: C.purple, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5, shadowRadius: 24, elevation: 12,
    overflow: 'hidden',
  },
  logoImg: { width: '100%', height: '100%' },
  logoText:  { fontSize: 36, fontFamily: F.extrabold, color: C.text, letterSpacing: -1.5, marginTop: 4 },
  tagline:   { fontSize: 15, fontFamily: F.regular, color: C.textDim, letterSpacing: 0.2 },

  buttons: { gap: 12 },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', borderRadius: 16,
    paddingVertical: 16, paddingHorizontal: 20,
  },
  googleIcon: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#4285F4', alignItems: 'center', justifyContent: 'center' },
  googleG:  { fontSize: 12, fontFamily: F.bold, color: '#fff' },
  googleTxt:{ fontSize: 15, fontFamily: F.semibold, color: '#111', flex: 1, textAlign: 'center', marginRight: 36 },

  phoneBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.card, borderRadius: 16,
    paddingVertical: 16, paddingHorizontal: 20,
    borderWidth: 1, borderColor: C.border,
  },
  phoneTxt: { fontSize: 15, fontFamily: F.semibold, color: C.lavender, flex: 1, textAlign: 'center', marginRight: 29 },

  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  divLine: { flex: 1, height: 1, backgroundColor: C.border },
  divTxt:  { fontSize: 12, fontFamily: F.regular, color: C.textMuted },

  guestBtn: { paddingVertical: 12, alignItems: 'center' },
  guestTxt: { fontSize: 14, fontFamily: F.medium, color: C.textDim },

  terms: { fontSize: 11, fontFamily: F.regular, color: C.textMuted, textAlign: 'center', lineHeight: 18 },
});
