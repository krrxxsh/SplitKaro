import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { F } from '../../src/constants/Typography';
import { C } from '../../src/constants/Tokens';
import { GROUPS, EXPENSES, type Expense } from '../../src/constants/DummyData';

const fmt = (n: number) => `₹${Math.abs(n).toLocaleString('en-IN')}`;

const CAT: Record<string, { icon: React.ComponentProps<typeof Ionicons>['name']; color: string }> = {
  Food:      { icon: 'fast-food-outline', color: C.amber   },
  Fuel:      { icon: 'car-outline',       color: C.orange  },
  Hotel:     { icon: 'bed-outline',       color: '#3B82F6' },
  Transport: { icon: 'train-outline',     color: C.purple  },
  Misc:      { icon: 'grid-outline',      color: C.textDim },
};

function ExpenseRow({ e }: { e: Expense }) {
  const cfg = CAT[e.category] ?? CAT.Misc;
  const per = Math.round(e.amount / (e.participants.length || 1));
  return (
    <View style={ex.card}>
      <View style={[ex.icon, { backgroundColor: `${cfg.color}18` }]}>
        <Ionicons name={cfg.icon} size={17} color={cfg.color} />
      </View>
      <View style={ex.info}>
        <Text style={ex.desc} numberOfLines={1}>{e.description}</Text>
        <Text style={ex.sub}>Paid by {e.paidBy.name.split(' ')[0]} · {e.date}</Text>
      </View>
      <View style={ex.right}>
        <Text style={ex.amt}>{fmt(e.amount)}</Text>
        <Text style={ex.per}>{fmt(per)}/person</Text>
      </View>
    </View>
  );
}
const ex = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: C.card, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: C.border },
  icon: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  info: { flex: 1 },
  desc: { fontSize: 14, fontFamily: F.semibold, color: C.text },
  sub:  { fontSize: 11, fontFamily: F.regular,  color: C.textMuted, marginTop: 3 },
  right:{ alignItems: 'flex-end', gap: 2 },
  amt:  { fontSize: 15, fontFamily: F.bold,    color: C.text },
  per:  { fontSize: 11, fontFamily: F.regular, color: C.textMuted },
});

export default function GroupDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bottom } = useSafeAreaInsets();
  const group = GROUPS.find(g => g.id === id) ?? GROUPS[0];
  const expenses = EXPENSES.filter(e => e.groupId === group.id);
  const isPos = group.yourBalance >= 0;
  const settled = group.yourBalance === 0;

  return (
    <SafeAreaView style={s.safe} edges={['top','left','right']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={19} color={C.text} />
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerEmoji}>{group.emoji}</Text>
          <Text style={s.headerTitle} numberOfLines={1}>{group.name}</Text>
        </View>
        <TouchableOpacity style={s.moreBtn}>
          <Ionicons name="ellipsis-vertical" size={18} color={C.textDim} />
        </TouchableOpacity>
      </View>

      {/* Summary */}
      <View style={s.summaryCard}>
        <View style={s.membersRow}>
          {group.members.map(m => (
            <View key={m.id} style={s.memberChip}>
              <Text style={s.memberInitial}>{m.avatar}</Text>
            </View>
          ))}
        </View>
        <View style={s.statsRow}>
          <View style={s.stat}>
            <Text style={s.statLbl}>Total Spent</Text>
            <Text style={s.statVal}>{fmt(group.totalSpent)}</Text>
          </View>
          <View style={s.statDiv} />
          <View style={s.stat}>
            <Text style={s.statLbl}>{settled ? 'Status' : isPos ? 'You are owed' : 'You owe'}</Text>
            <Text style={[s.statVal, { color: settled ? C.textDim : isPos ? C.success : C.danger }]}>
              {settled ? 'Settled ✓' : fmt(group.yourBalance)}
            </Text>
          </View>
          <View style={s.statDiv} />
          <View style={s.stat}>
            <Text style={s.statLbl}>Expenses</Text>
            <Text style={s.statVal}>{expenses.length}</Text>
          </View>
        </View>
      </View>

      <Text style={s.listLabel}>EXPENSES</Text>

      <FlatList
        data={expenses} keyExtractor={e => e.id}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => <ExpenseRow e={item} />}
        ListEmptyComponent={
          <View style={s.empty}>
            <Text style={{ fontSize: 42 }}>💸</Text>
            <Text style={s.emptyTitle}>No expenses yet</Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

      <View style={[s.barShadow, { bottom: Math.max(bottom + 12, 20) }]}>
        <View style={s.clipContainer}>
          <BlurView 
            intensity={80} 
            tint="dark" 
            experimentalBlurMethod="dimezisBlurView"
            style={StyleSheet.absoluteFill} 
          />
          <View style={s.contentRow}>
            <TouchableOpacity style={s.addBtn} onPress={() => router.push({ pathname: '/group/add-expense', params: { groupId: group.id } })}>
              <Ionicons name="add-circle-outline" size={18} color="#fff" />
              <Text style={s.addBtnTxt}>Add Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.settleBtn} onPress={() => router.push({ pathname: '/group/settle', params: { groupId: group.id } })}>
              <Ionicons name="checkmark-circle-outline" size={18} color={C.lavender} />
              <Text style={s.settleBtnTxt}>Settle Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header:{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, gap: 10 },
  backBtn:{ width: 36, height: 36, borderRadius: 18, backgroundColor: C.card, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  headerCenter:{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerEmoji:{ fontSize: 20 },
  headerTitle:{ fontSize: 18, fontFamily: F.bold, color: C.text, flex: 1 },
  moreBtn:{ width: 36, height: 36, borderRadius: 18, backgroundColor: C.card, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  summaryCard:{
    backgroundColor: C.card, borderRadius: 24, marginHorizontal: 16, marginBottom: 16, padding: 16,
    borderWidth: 1, borderColor: C.border,
    shadowColor: C.purple, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.12, shadowRadius: 16, elevation: 6,
  },
  membersRow: { flexDirection: 'row', gap: 6, marginBottom: 14, flexWrap: 'wrap' },
  memberChip: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.card2, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border2 },
  memberInitial:{ fontSize: 10, fontFamily: F.bold, color: C.lavender },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  stat:     { flex: 1, alignItems: 'center', gap: 4 },
  statLbl:  { fontSize: 11, fontFamily: F.medium, color: C.textMuted },
  statVal:  { fontSize: 17, fontFamily: F.bold,   color: C.text },
  statDiv:  { width: 1, height: 32, backgroundColor: C.border },
  listLabel:{ fontSize: 10, fontFamily: F.bold, color: C.textMuted, letterSpacing: 1.5, paddingHorizontal: 16, marginBottom: 10 },
  list:     { paddingHorizontal: 16 },
  empty:    { alignItems: 'center', paddingVertical: 50, gap: 8 },
  emptyTitle:{ fontSize: 17, fontFamily: F.bold, color: C.text },
  // Floating action pill — liquid glass
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
  addBtn: {
    flex: 1.2, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6, height: '100%',
    borderRadius: 30, backgroundColor: C.purple, overflow: 'hidden',
  },
  addBtnTxt:   { fontSize: 13, fontFamily: F.bold, color: '#fff' },
  settleBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6, height: '100%',
    borderRadius: 30, backgroundColor: `${C.purple}20`, overflow: 'hidden',
  },
  settleBtnTxt:{ fontSize: 14, fontFamily: F.semibold, color: C.lavender },
});
