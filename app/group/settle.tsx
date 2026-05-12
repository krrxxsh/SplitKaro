/**
 * Settlement — Minimal, floating pill action bar
 */
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, StatusBar, Linking, Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { F } from '../../src/constants/Typography';
import { C } from '../../src/constants/Tokens';
import { GROUPS, SETTLEMENTS, type Settlement } from '../../src/constants/DummyData';

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const UPI_APPS = [
  { key: 'gpay',    label: 'GPay',    icon: '🔵', color: '#1A73E8' },
  { key: 'phonepe', label: 'PhonePe', icon: '🟣', color: '#5F259F' },
  { key: 'paytm',   label: 'Paytm',   icon: '🔷', color: '#00B9F1' },
];

function openUPI(app: string, amount: number, upiId: string) {
  const upiUrl = `upi://pay?pa=${upiId}&am=${amount}&cu=INR&tn=SplitKaro`;
  Linking.openURL(upiUrl).catch(() =>
    Alert.alert('App not found', `Please install ${app} to pay directly.`)
  );
}

function SettlementCard({
  settlement, settled, onMark,
}: { settlement: Settlement; settled: boolean; onMark: () => void }) {
  return (
    <View style={[c.card, settled && c.cardSettled]}>

      {/* From → To */}
      <View style={c.arrowRow}>
        <View style={c.person}>
          <View style={c.avt}><Text style={c.avtTxt}>{settlement.from.avatar}</Text></View>
          <Text style={c.name} numberOfLines={1}>{settlement.from.name.split(' ')[0]}</Text>
        </View>

        <View style={c.arrowWrap}>
          <Text style={c.amt}>{fmt(settlement.amount)}</Text>
          <View style={c.arrowLine} />
          <Ionicons name="caret-forward" size={10} color={C.textMuted} style={c.arrowHead} />
        </View>

        <View style={c.person}>
          <View style={c.avt}><Text style={c.avtTxt}>{settlement.to.avatar}</Text></View>
          <Text style={c.name} numberOfLines={1}>{settlement.to.name.split(' ')[0]}</Text>
        </View>
      </View>

      {/* Actions */}
      {settled ? (
        <View style={c.settledTag}>
          <Ionicons name="checkmark-circle" size={16} color={C.success} />
          <Text style={c.settledTxt}>Settled on {settlement.date}</Text>
        </View>
      ) : (
        <View style={c.actionRow}>
          <TouchableOpacity style={c.markBtn} onPress={onMark}>
            <Ionicons name="checkmark" size={14} color={C.text} />
            <Text style={c.markTxt}>Mark Paid</Text>
          </TouchableOpacity>

          <View style={c.upiRow}>
            {UPI_APPS.map(app => (
              <TouchableOpacity
                key={app.key}
                style={c.upiBtn}
                onPress={() => openUPI(app.label, settlement.amount, settlement.to.upiId || 'test@upi')}
              >
                <Text style={c.upiIcon}>{app.icon}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const c = StyleSheet.create({
  card: { backgroundColor: C.card, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: C.border },
  cardSettled: { opacity: 0.6, backgroundColor: C.bg },
  arrowRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  person: { alignItems: 'center', width: 60, gap: 6 },
  avt: { width: 44, height: 44, borderRadius: 22, backgroundColor: C.purple, alignItems: 'center', justifyContent: 'center' },
  avtTxt: { fontSize: 15, fontFamily: F.bold, color: '#fff' },
  name: { fontSize: 12, fontFamily: F.medium, color: C.text, textAlign: 'center' },
  arrowWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, position: 'relative' },
  amt: { fontSize: 16, fontFamily: F.bold, color: C.text, marginBottom: 4 },
  arrowLine: { height: 2, backgroundColor: C.border2, width: '100%', borderRadius: 1 },
  arrowHead: { position: 'absolute', right: 4, bottom: -4 },
  actionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  markBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.card2, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, borderWidth: 1, borderColor: C.border },
  markTxt: { fontSize: 13, fontFamily: F.semibold, color: C.text },
  upiRow: { flexDirection: 'row', gap: 8 },
  upiBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.card2, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  upiIcon: { fontSize: 16 },
  settledTag: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: C.successBg, paddingVertical: 10, borderRadius: 100 },
  settledTxt: { fontSize: 13, fontFamily: F.semibold, color: C.success },
});

export default function SettleScreen() {
  const { bottom } = useSafeAreaInsets();
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const group = GROUPS.find(g => g.id === groupId) ?? GROUPS[0];
  const [localSetts, setLocalSetts] = useState<Settlement[]>(
    SETTLEMENTS.filter(s => s.groupId === group.id)
  );

  const markSettled = (id: string) => {
    setLocalSetts(prev => prev.map(s => s.id === id ? { ...s, settled: true } : s));
  };

  const allSettled = localSetts.every(s => s.settled);

  return (
    <SafeAreaView style={s.safe} edges={['top','left','right']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.closeBtn}>
          <Ionicons name="close" size={19} color={C.text} />
        </TouchableOpacity>
        <Text style={s.title}>Settle Up</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {allSettled && localSetts.length > 0 ? (
          <View style={s.allSettledBox}>
            <Text style={{ fontSize: 50, marginBottom: 10 }}>🎉</Text>
            <Text style={s.allSettledTitle}>You're all settled up!</Text>
            <Text style={s.allSettledDesc}>No pending balances in this group.</Text>
          </View>
        ) : localSetts.length === 0 ? (
          <View style={s.allSettledBox}>
            <Text style={{ fontSize: 50, marginBottom: 10 }}>🙌</Text>
            <Text style={s.allSettledTitle}>Nothing to settle</Text>
            <Text style={s.allSettledDesc}>Balances are clear.</Text>
          </View>
        ) : (
          <View style={s.list}>
            {localSetts.map(st => (
              <SettlementCard
                key={st.id}
                settlement={st}
                settled={st.settled}
                onMark={() => markSettled(st.id)}
              />
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating pill action bar */}
      <View style={[s.barShadow, { bottom: Math.max(bottom + 12, 20) }]}>
        <View style={s.clipContainer}>
          <BlurView 
            intensity={80} 
            tint="dark" 
            experimentalBlurMethod="dimezisBlurView"
            style={StyleSheet.absoluteFill} 
          />
          <View style={s.contentRow}>
            <TouchableOpacity style={s.doneBtn} onPress={() => router.back()}>
              <Text style={s.doneTxt}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: C.bg },
  header:{
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  closeBtn:{ width: 36, height: 36, borderRadius: 18, backgroundColor: C.card, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  title:   { fontSize: 17, fontFamily: F.bold, color: C.text },
  scroll:  { paddingHorizontal: 20, paddingTop: 20 },

  list: { gap: 12 },

  allSettledBox: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  allSettledTitle: { fontSize: 20, fontFamily: F.bold, color: C.text, marginBottom: 6 },
  allSettledDesc:  { fontSize: 14, fontFamily: F.regular, color: C.textMuted },

  // Floating pill — liquid glass
  barShadow: {
    position: 'absolute', left: 32, right: 32, height: 68,
    borderRadius: 34,
    shadowColor: '#000', shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6, shadowRadius: 24, elevation: 8,
  },
  clipContainer: {
    flex: 1, borderRadius: 34, overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  contentRow: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    padding: 8, gap: 8,
  },
  doneBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    height: '100%', borderRadius: 30, backgroundColor: C.purple, overflow: 'hidden',
  },
  doneTxt: { fontSize: 14, fontFamily: F.semibold, color: '#fff' },
});
