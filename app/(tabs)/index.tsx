/**
 * Home — Minimal fintech dashboard
 * Balance → Quick actions → 3 recent items. That's it.
 */
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { F } from '../../src/constants/Typography';
import { C } from '../../src/constants/Tokens';
import {
  ACTIVITY, CURRENT_USER, GROUPS, getTotalBalance, getTotalOwed, getTotalYouOwe,
} from '../../src/constants/DummyData';

const fmt = (n: number) => `₹${Math.abs(n).toLocaleString('en-IN')}`;
const AVATAR = { uri: 'https://api.dicebear.com/7.x/adventurer/png?seed=ArjunSharma&size=120' };

const ACTIONS = [
  { icon: 'add-circle-outline' as const,        label: 'Add\nExpense', onPress: () => router.push('/group/create') },
  { icon: 'people-outline' as const,            label: 'New\nGroup',   onPress: () => router.push('/group/create') },
  { icon: 'checkmark-circle-outline' as const,  label: 'Settle\nUp',   onPress: () => router.push('/(tabs)/groups') },
];

export default function HomeScreen() {
  const balance = getTotalBalance();
  const owed    = getTotalOwed();
  const owe     = getTotalYouOwe();
  const isPos   = balance >= 0;
  const recent  = ACTIVITY.slice(0, 3);
  const pending = GROUPS.filter(g => g.yourBalance < 0).slice(0, 2);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning 👋';
    if (hour < 17) return 'Good afternoon ☀️';
    return 'Good evening 🌙';
  };

  return (
    <SafeAreaView style={s.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scroll}
        bounces={false}
      >
        {/* ── Header ── */}
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>{getGreeting()}</Text>
            <Text style={s.name}>{CURRENT_USER.name.split(' ')[0]}</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
            <Image source={AVATAR} style={s.avatar} />
          </TouchableOpacity>
        </View>

        {/* ── Balance hero ── */}
        <View style={s.balanceSection}>
          <Text style={s.balLabel}>
            {isPos ? 'you are owed' : 'you owe'}
          </Text>
          <Text style={s.balAmount}>{fmt(balance)}</Text>

          <View style={s.pillRow}>
            {owed > 0 && (
              <View style={s.pillGreen}>
                <View style={[s.dot, { backgroundColor: C.success }]} />
                <Text style={s.pillGreenTxt}>{fmt(owed)} owed</Text>
              </View>
            )}
            {owe > 0 && (
              <View style={s.pillRed}>
                <View style={[s.dot, { backgroundColor: C.danger }]} />
                <Text style={s.pillRedTxt}>{fmt(owe)} owe</Text>
              </View>
            )}
          </View>
        </View>

        {/* ── Divider ── */}
        <View style={s.divider} />

        {/* ── Quick actions ── */}
        <View style={s.actionsRow}>
          {ACTIONS.map(({ icon, label, onPress }) => (
            <TouchableOpacity key={label} style={s.action} onPress={onPress} activeOpacity={0.72}>
              <View style={s.actionIcon}>
                <Ionicons name={icon} size={22} color={C.purple} />
              </View>
              <Text style={s.actionLabel}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Quick Settle ── */}
        {pending.length > 0 && (
          <View style={s.sectionBlock}>
            <Text style={s.sectionHeader}>Action required</Text>
            {pending.map(g => (
              <View key={g.id} style={s.pendingCard}>
                <View style={s.pendingIcon}><Text style={{fontSize: 20}}>{g.emoji}</Text></View>
                <View style={s.pendingInfo}>
                  <Text style={s.pendingName}>{g.name}</Text>
                  <Text style={s.pendingSub}>You owe <Text style={{color: C.text, fontFamily: F.bold}}>{fmt(g.yourBalance)}</Text></Text>
                </View>
                <TouchableOpacity style={s.payBtn} onPress={() => router.push({ pathname: '/group/settle', params: { groupId: g.id } })}>
                  <Text style={s.payBtnTxt}>Pay</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* ── Recent ── */}
        <View style={s.recentHeader}>
          <Text style={s.recentTitle}>Recent</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/activity')}>
            <Text style={s.recentLink}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={s.recentList}>
          {recent.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              style={[s.recentItem, i < recent.length - 1 && s.recentItemBorder]}
              onPress={() => router.push(`/group/${item.groupId}`)}
              activeOpacity={0.72}
            >
              <View style={s.recentDot} />
              <View style={s.recentContent}>
                <Text style={s.recentDesc} numberOfLines={1}>{item.description}</Text>
                <Text style={s.recentMeta}>{item.groupName} · {item.date}</Text>
              </View>
              {item.amount != null && (
                <Text style={s.recentAmt}>{fmt(item.amount)}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.bg },
  scroll: { paddingTop: 4 },

  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24, paddingTop: 8, paddingBottom: 32,
  },
  greeting: { fontSize: 13, fontFamily: F.regular, color: C.textMuted, marginBottom: 2 },
  name:     { fontSize: 24, fontFamily: F.bold, color: C.text },
  avatar:   {
    width: 42, height: 42, borderRadius: 21,
    borderWidth: 2, borderColor: `${C.purple}50`,
  },

  // Balance hero — minimal, no card
  balanceSection: {
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  balLabel: {
    fontSize: 14, fontFamily: F.regular,
    color: C.textDim, marginBottom: 6, letterSpacing: 0.2,
  },
  balAmount: {
    fontSize: 52, fontFamily: F.extrabold,
    color: C.text, letterSpacing: -3, lineHeight: 58,
    marginBottom: 18,
  },
  pillRow:  { flexDirection: 'row', gap: 8 },
  pillGreen:{
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: C.successBg, borderRadius: 100,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  pillGreenTxt: { fontSize: 12, fontFamily: F.semibold, color: C.success },
  pillRed:{
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: C.dangerBg, borderRadius: 100,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  pillRedTxt: { fontSize: 12, fontFamily: F.semibold, color: C.danger },
  dot: { width: 6, height: 6, borderRadius: 3 },

  divider: { height: 1, backgroundColor: C.border, marginHorizontal: 24, marginBottom: 28 },

  // Quick actions
  actionsRow: {
    flexDirection: 'row', paddingHorizontal: 24,
    marginBottom: 36, gap: 12,
  },
  action: { flex: 1, alignItems: 'center', gap: 10 },
  actionIcon: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: `${C.purple}12`,
    borderWidth: 1, borderColor: `${C.purple}20`,
    alignItems: 'center', justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 11, fontFamily: F.medium,
    color: C.textDim, textAlign: 'center', lineHeight: 15,
  },

  // Quick Settle
  sectionBlock: { marginHorizontal: 24, marginBottom: 36 },
  sectionHeader: { fontSize: 13, fontFamily: F.bold, color: C.danger, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 },
  pendingCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.card, borderRadius: 16, padding: 12,
    borderWidth: 1, borderColor: C.border, marginBottom: 8,
  },
  pendingIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: C.card2, alignItems: 'center', justifyContent: 'center' },
  pendingInfo: { flex: 1 },
  pendingName: { fontSize: 14, fontFamily: F.bold, color: C.text, marginBottom: 2 },
  pendingSub:  { fontSize: 13, fontFamily: F.medium, color: C.danger },
  payBtn:      { backgroundColor: C.purple, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 100 },
  payBtnTxt:   { fontSize: 13, fontFamily: F.bold, color: '#fff' },

  // Recent
  recentHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 24, marginBottom: 4,
  },
  recentTitle: { fontSize: 17, fontFamily: F.bold, color: C.text },
  recentLink:  { fontSize: 13, fontFamily: F.medium, color: C.lavender },

  recentList: {
    marginHorizontal: 16,
    backgroundColor: C.card,
    borderRadius: 20,
    borderWidth: 1, borderColor: C.border,
    overflow: 'hidden',
  },
  recentItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 15, gap: 12,
  },
  recentItemBorder: {
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  recentDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: C.purple, flexShrink: 0,
  },
  recentContent: { flex: 1 },
  recentDesc: { fontSize: 14, fontFamily: F.medium, color: C.text, marginBottom: 2 },
  recentMeta: { fontSize: 12, fontFamily: F.regular, color: C.textMuted },
  recentAmt:  { fontSize: 14, fontFamily: F.bold, color: C.text },
});
