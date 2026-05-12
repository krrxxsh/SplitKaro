/**
 * UPIButton — Premium dark UI, Montserrat
 * Deep-links to GPay / PhonePe / Paytm via upi:// intent
 */
import React from 'react';
import {
  TouchableOpacity, Text, View,
  StyleSheet, Linking, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { F } from '../constants/Typography';

type UPIApp = 'gpay' | 'phonepe' | 'paytm';

interface Props {
  app: UPIApp;
  amount: number;
  upiId?: string;
  onPress?: () => void;
}

const BORDER = '#1E1E2E';
const TEXT   = '#F1F1F6';
const MUTED  = '#6B7280';

const CONFIG: Record<UPIApp, { label: string; color: string; bg: string; emoji: string }> = {
  gpay:    { label: 'Google Pay', color: '#4285F4', bg: '#0D1B2E', emoji: '🔵' },
  phonepe: { label: 'PhonePe',    color: '#7C3AED', bg: '#140D20', emoji: '🟣' },
  paytm:   { label: 'Paytm',      color: '#00BAF2', bg: '#071620', emoji: '🔷' },
};

export const UPIButton: React.FC<Props> = ({ app, amount, upiId, onPress }) => {
  const cfg = CONFIG[app];

  const handle = () => {
    if (onPress) { onPress(); return; }
    if (!upiId) return;
    const url = `upi://pay?pa=${upiId}&am=${amount}&cu=INR&tn=SplitKaro`;
    Linking.openURL(url).catch(() =>
      Alert.alert('App not found', `Please install ${cfg.label} to pay directly.`)
    );
  };

  return (
    <TouchableOpacity
      style={[s.btn, { backgroundColor: cfg.bg, borderColor: `${cfg.color}40` }]}
      onPress={handle}
      activeOpacity={0.78}
      accessibilityLabel={`Pay via ${cfg.label}`}
    >
      {/* Brand dot */}
      <View style={[s.brandCircle, { backgroundColor: `${cfg.color}25` }]}>
        <Text style={s.brandEmoji}>{cfg.emoji}</Text>
      </View>

      <View style={s.textCol}>
        <Text style={s.appLabel}>{cfg.label}</Text>
        <Text style={s.amtLabel}>Pay ₹{amount.toLocaleString('en-IN')}</Text>
      </View>

      <Ionicons name="arrow-forward-circle-outline" size={20} color={cfg.color} />
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  btn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderRadius: 16,
    borderWidth: 1,
  },
  brandCircle: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  brandEmoji: { fontSize: 18 },
  textCol:    { flex: 1 },
  appLabel:   { fontSize: 14, fontFamily: F.semibold, color: TEXT },
  amtLabel:   { fontSize: 12, fontFamily: F.regular,  color: MUTED, marginTop: 2 },
});
