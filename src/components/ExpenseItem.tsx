/**
 * ExpenseItem — Premium dark UI, Montserrat
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { F } from '../constants/Typography';
import type { Expense } from '../constants/DummyData';
import { CURRENT_USER } from '../constants/DummyData';

const CARD2   = '#13131A';
const BORDER  = '#1E1E2E';
const LAVENDER= '#C4B5FD';
const TEXT    = '#F1F1F6';
const MUTED   = '#6B7280';
const DIM     = '#374151';

const ICONS: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
  Food:      'fast-food-outline',
  Fuel:      'car-outline',
  Hotel:     'bed-outline',
  Transport: 'train-outline',
  Misc:      'grid-outline',
};
const COLORS: Record<string, string> = {
  Food:      '#F59E0B',
  Fuel:      '#F97316',
  Hotel:     '#3B82F6',
  Transport: '#8B5CF6',
  Misc:      '#94A3B8',
};

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

interface Props { expense: Expense }

export const ExpenseItem: React.FC<Props> = ({ expense }) => {
  const isYours     = expense.paidBy.id === CURRENT_USER.id;
  const yourShare   = Math.round(expense.amount / (expense.participants.length || 1));
  const accentColor = COLORS[expense.category] ?? '#94A3B8';
  const iconName    = ICONS[expense.category]  ?? 'grid-outline';

  return (
    <View style={s.card}>
      {/* Category icon */}
      <View style={[s.iconBox, { backgroundColor: `${accentColor}18` }]}>
        <Ionicons name={iconName} size={18} color={accentColor} />
      </View>

      {/* Description + meta */}
      <View style={s.middle}>
        <Text style={s.desc} numberOfLines={1}>{expense.description}</Text>
        <Text style={s.meta} numberOfLines={1}>
          <Text style={{ color: isYours ? LAVENDER : MUTED }}>
            {isYours ? 'You' : expense.paidBy.name.split(' ')[0]}
          </Text>
          {' '}paid · {expense.participants.length} people
        </Text>
        <Text style={s.date}>{expense.date}</Text>
      </View>

      {/* Amount + share */}
      <View style={s.right}>
        <Text style={s.amount}>{fmt(expense.amount)}</Text>
        <Text style={s.share}>Your: {fmt(yourShare)}</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: CARD2, borderRadius: 18,
    padding: 14, gap: 12,
    borderWidth: 1, borderColor: BORDER,
  },
  iconBox: {
    width: 42, height: 42, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  middle:  { flex: 1, gap: 3 },
  desc:    { fontSize: 14, fontFamily: F.semibold, color: TEXT },
  meta:    { fontSize: 12, fontFamily: F.regular,  color: MUTED },
  date:    { fontSize: 11, fontFamily: F.regular,  color: DIM, marginTop: 1 },
  right:   { alignItems: 'flex-end', gap: 3 },
  amount:  { fontSize: 14, fontFamily: F.bold,    color: TEXT },
  share:   { fontSize: 11, fontFamily: F.regular, color: MUTED },
});
