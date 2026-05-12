/**
 * Profile — Minimal, just what matters
 */
import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar, Alert, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { F } from '../../src/constants/Typography';
import { C } from '../../src/constants/Tokens';
import { CURRENT_USER } from '../../src/constants/DummyData';

const AVATAR = { uri: 'https://api.dicebear.com/7.x/adventurer/png?seed=ArjunSharma&size=120' };

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline' as const,           label: 'Edit Profile' },
      { icon: 'flash-outline' as const,            label: 'UPI ID',           value: CURRENT_USER.upiId },
      { icon: 'notifications-outline' as const,    label: 'Notifications' },
    ],
  },
  {
    title: 'More',
    items: [
      { icon: 'help-circle-outline' as const,      label: 'Help & Support' },
      { icon: 'star-outline' as const,             label: 'Rate SplitKaro' },
      { icon: 'information-circle-outline' as const, label: 'About',        value: 'v1.0.0' },
    ],
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={s.header}>
        <Text style={s.title}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Identity block */}
        <View style={s.identity}>
          <Image source={AVATAR} style={s.avatar} />
          <View style={s.identityText}>
            <Text style={s.name}>{CURRENT_USER.name}</Text>
            <Text style={s.phone}>{CURRENT_USER.phone}</Text>
          </View>
          <TouchableOpacity style={s.editBtn}>
            <Ionicons name="pencil-outline" size={15} color={C.textDim} />
          </TouchableOpacity>
        </View>

        {/* UPI pill */}
        <View style={s.upiRow}>
          <Ionicons name="flash" size={13} color={C.lavender} />
          <Text style={s.upiTxt}>{CURRENT_USER.upiId}</Text>
          <Text style={s.upiTag}>UPI</Text>
        </View>

        {/* Divider */}
        <View style={s.div} />

        {/* Menu sections */}
        {MENU_SECTIONS.map(section => (
          <View key={section.title} style={s.section}>
            <Text style={s.sectionTitle}>{section.title}</Text>
            <View style={s.menuBlock}>
              {section.items.map((item, i) => (
                <TouchableOpacity
                  key={item.label}
                  style={[s.menuRow, i < section.items.length - 1 && s.menuRowBorder]}
                  activeOpacity={0.72}
                >
                  <Ionicons name={item.icon} size={16} color={C.textDim} />
                  <Text style={s.menuLabel}>{item.label}</Text>
                  {item.value && <Text style={s.menuValue}>{item.value}</Text>}
                  <Ionicons name="chevron-forward" size={14} color={C.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity
          style={s.logoutBtn}
          onPress={() =>
            Alert.alert('Log Out', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/login') },
            ])
          }
        >
          <Ionicons name="log-out-outline" size={16} color={C.danger} />
          <Text style={s.logoutTxt}>Log Out</Text>
        </TouchableOpacity>

        {/* Developer Info */}
        <View style={s.devCard}>
          <Image source={require('../../assets/images/icon.png')} style={s.devLogo} />
          <View style={s.devInfo}>
            <Text style={s.devTitle}>Developed by</Text>
            <Text style={s.devName}>krrxsh</Text>
          </View>
          <View style={s.devIg}>
            <Ionicons name="logo-instagram" size={14} color={C.lavender} />
            <Text style={s.devIgTxt}>@krrxxsh</Text>
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20 },
  title:  { fontSize: 28, fontFamily: F.bold, color: C.text },
  scroll: {},

  // Identity
  identity: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingHorizontal: 24, marginBottom: 14,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: `${C.purple}40` },
  identityText: { flex: 1 },
  name:  { fontSize: 18, fontFamily: F.bold, color: C.text, marginBottom: 2 },
  phone: { fontSize: 13, fontFamily: F.regular, color: C.textMuted },
  editBtn:{
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: C.card, borderWidth: 1, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },

  // UPI
  upiRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginHorizontal: 24, marginBottom: 24,
  },
  upiTxt: { fontSize: 13, fontFamily: F.medium, color: C.lavender, flex: 1 },
  upiTag: { fontSize: 10, fontFamily: F.bold, color: C.purple, letterSpacing: 0.5 },

  div: { height: 1, backgroundColor: C.border, marginHorizontal: 24, marginBottom: 28 },

  // Menu
  section:    { marginBottom: 24, paddingHorizontal: 16 },
  sectionTitle:{ fontSize: 12, fontFamily: F.bold, color: C.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10, paddingLeft: 4 },
  menuBlock:  { borderRadius: 18, backgroundColor: C.card, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  menuRow:    { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14 },
  menuRowBorder:{ borderBottomWidth: 1, borderBottomColor: C.border },
  menuLabel:  { flex: 1, fontSize: 14, fontFamily: F.medium, color: C.text },
  menuValue:  { fontSize: 12, fontFamily: F.regular, color: C.textMuted, marginRight: 4 },

  // Logout
  logoutBtn:  { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, paddingVertical: 14, marginHorizontal: 16, borderRadius: 16, backgroundColor: `${C.danger}0E`, borderWidth: 1, borderColor: `${C.danger}20`, marginBottom: 32 },
  logoutTxt:  { fontSize: 14, fontFamily: F.semibold, color: C.danger },

  // Developer Card
  devCard: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 24, alignSelf: 'center', opacity: 0.8 },
  devLogo: { width: 40, height: 40, borderRadius: 12 },
  devInfo: { flex: 1 },
  devTitle:{ fontSize: 11, fontFamily: F.medium, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  devName: { fontSize: 15, fontFamily: F.bold, color: C.text },
  devIg:   { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: `${C.purple}20`, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  devIgTxt:{ fontSize: 12, fontFamily: F.semibold, color: C.lavender },
});
