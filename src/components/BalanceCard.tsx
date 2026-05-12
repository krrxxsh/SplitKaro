import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { F } from '../constants/Typography';
import { C } from '../constants/Tokens';

const fmt = (n: number) => `₹${Math.abs(n).toLocaleString('en-IN')}`;

interface Props { totalBalance: number; totalOwed: number; totalYouOwe: number; }

export const BalanceCard: React.FC<Props> = ({ totalBalance, totalOwed, totalYouOwe }) => {
  const isPos = totalBalance >= 0;
  return (
    <View style={s.glow}>
      <View style={s.card}>
        <Text style={s.label}>TOTAL BALANCE</Text>
        <Text style={s.headline}>{isPos ? 'You are owed' : 'You owe'}</Text>
        <Text style={s.amount}>{fmt(totalBalance)}</Text>
        <View style={s.pills}>
          {totalOwed > 0 && (
            <View style={s.pillGreen}>
              <View style={[s.dot, { backgroundColor: C.success }]} />
              <Text style={s.greenTxt}>Owed {fmt(totalOwed)}</Text>
            </View>
          )}
          {totalYouOwe > 0 && (
            <View style={s.pillRed}>
              <View style={[s.dot, { backgroundColor: C.danger }]} />
              <Text style={s.redTxt}>Owe {fmt(totalYouOwe)}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  glow: {
    marginHorizontal: 16, marginTop: 8, borderRadius: 28,
    shadowColor: C.purple, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45, shadowRadius: 28, elevation: 18,
  },
  card: {
    borderRadius: 28, padding: 24,
    backgroundColor: '#0C0C0C',
    borderWidth: 1, borderColor: '#1A1A1A',
  },
  label:    { fontSize: 10, fontFamily: F.bold, color: C.textMuted, letterSpacing: 2, marginBottom: 10 },
  headline: { fontSize: 16, fontFamily: F.medium, color: C.textDim, marginBottom: 4 },
  amount:   { fontSize: 44, fontFamily: F.extrabold, color: C.text, letterSpacing: -2.5, marginBottom: 20, lineHeight: 50 },
  pills:    { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  pillGreen:{ flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: C.successBg, borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8 },
  greenTxt: { fontSize: 13, fontFamily: F.semibold, color: C.success },
  pillRed:  { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: C.dangerBg, borderRadius: 100, paddingHorizontal: 14, paddingVertical: 8 },
  redTxt:   { fontSize: 13, fontFamily: F.semibold, color: C.danger },
  dot:      { width: 7, height: 7, borderRadius: 100 },
});
