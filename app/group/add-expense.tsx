/**
 * Add Expense — Practical Fintech "Giant Numpad" Flow
 */
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { F } from '../../src/constants/Typography';
import { C } from '../../src/constants/Tokens';
import {
  GROUPS, CURRENT_USER,
  type SplitType, type ExpenseCategory, type User,
} from '../../src/constants/DummyData';

const SPLIT_TYPES: SplitType[]      = ['Equal','Exact','%'];
const CATEGORIES: ExpenseCategory[] = ['Food','Fuel','Hotel','Transport','Misc'];
const CAT_EMOJI: Record<ExpenseCategory, string> = {
  Food: '🍔', Fuel: '⛽', Hotel: '🏨', Transport: '🚗', Misc: '📦',
};

// Custom Numpad
function Numpad({ onType, onDel }: { onType: (d: string) => void, onDel: () => void }) {
  const keys = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['.','0','DEL']
  ];
  return (
    <View style={pad.wrapper}>
      {keys.map((row, r) => (
        <View key={r} style={pad.row}>
          {row.map(k => (
            <TouchableOpacity
              key={k} style={pad.btn} activeOpacity={0.6}
              onPress={() => k === 'DEL' ? onDel() : onType(k)}
            >
              {k === 'DEL' ? <Ionicons name="backspace-outline" size={28} color={C.text} /> : <Text style={pad.txt}>{k}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
const pad = StyleSheet.create({
  wrapper: { width: '100%', maxWidth: 400, alignSelf: 'center', marginVertical: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  btn: { flex: 1, height: 60, alignItems: 'center', justifyContent: 'center' },
  txt: { fontSize: 28, fontFamily: F.medium, color: C.text },
});


export default function AddExpenseScreen() {
  const { bottom } = useSafeAreaInsets();
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const group = GROUPS.find(g => g.id === groupId) ?? GROUPS[0];

  const [amtStr,       setAmtStr]   = useState('0');
  const [description,  setDesc]     = useState('');
  const [splitBetween, setSplit]    = useState<string[]>(group.members.map(m => m.id));
  const [splitType,    setSplitType]= useState<SplitType>('Equal');
  const [category,     setCategory] = useState<ExpenseCategory>('Food');

  const handleType = (digit: string) => {
    if (amtStr === '0' && digit !== '.') setAmtStr(digit);
    else if (digit === '.' && amtStr.includes('.')) return;
    else setAmtStr(prev => (prev + digit).slice(0, 9));
  };
  const handleDel = () => {
    setAmtStr(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const parsed = parseFloat(amtStr) || 0;
  const isValid = parsed > 0 && splitBetween.length > 0;

  const toggle = (uid: string) => setSplit(p => p.includes(uid) ? p.filter(id => id !== uid) : [...p, uid]);

  return (
    <SafeAreaView style={s.safe} edges={['top','left','right']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.closeBtn}>
          <Ionicons name="close" size={24} color={C.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.saveBtn, !isValid && { opacity: 0.3 }]}
          onPress={() => { if (isValid) router.back(); }}
          disabled={!isValid}
        >
          <Text style={s.saveTxt}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} bounces={false}>

        {/* Amount hero - Tabular Lining implicitly by font or size */}
        <View style={s.amountBlock}>
          <Text style={s.rupee}>₹</Text>
          <Text style={[s.amountDisplay, amtStr === '0' && { color: C.textDim }]}>
            {amtStr}
          </Text>
        </View>

        {/* Description - seamless input */}
        <TextInput
          style={s.descInput}
          placeholder="What's this for?"
          placeholderTextColor={C.textMuted}
          value={description}
          onChangeText={setDesc}
          returnKeyType="done"
        />

        {/* Numpad */}
        <Numpad onType={handleType} onDel={handleDel} />

        <View style={s.divider} />

        {/* Quick Config - Category & Split */}
        <Text style={s.label}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.chipScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity key={cat} style={[s.chip, category === cat && s.chipSel]} onPress={() => setCategory(cat)}>
              <Text style={s.chipEmoji}>{CAT_EMOJI[cat]}</Text>
              <Text style={[s.chipTxt, category === cat && s.chipTxtSel]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={s.splitHeader}>
          <Text style={s.label}>Split Between</Text>
          <View style={s.segRow}>
            {SPLIT_TYPES.map(t => (
              <TouchableOpacity key={t} style={[s.seg, splitType === t && s.segActive]} onPress={() => setSplitType(t as SplitType)}>
                <Text style={[s.segTxt, splitType === t && s.segTxtActive]}>{t === 'Percentage' ? '%' : t}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={s.memberList}>
          {group.members.map(m => {
            const sel   = splitBetween.includes(m.id);
            const share = splitBetween.length > 0 ? `₹${Math.round(parsed / splitBetween.length).toLocaleString('en-IN')}` : '—';
            return (
              <TouchableOpacity key={m.id} style={[s.memberRow, sel && s.memberRowSel]} onPress={() => toggle(m.id)} activeOpacity={0.7}>
                <View style={[s.check, sel && s.checkSel]}>
                  {sel && <Ionicons name="checkmark" size={11} color="#fff" />}
                </View>
                <View style={s.dropAvt}><Text style={s.dropAvtTxt}>{m.avatar}</Text></View>
                <Text style={s.memberName}>{m.name.split(' ')[0]}</Text>
                {sel && splitType === 'Equal' && parsed > 0 && <Text style={s.share}>{share}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: Math.max(bottom, 20) + 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: C.bg },
  header:{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  closeBtn:{ width: 40, height: 40, borderRadius: 20, backgroundColor: C.card, alignItems: 'center', justifyContent: 'center' },
  saveBtn: { backgroundColor: C.purple, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  saveTxt: { fontSize: 14, fontFamily: F.bold, color: '#fff' },
  scroll:  { paddingHorizontal: 20 },

  amountBlock: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20 },
  rupee:       { fontSize: 36, fontFamily: F.medium, color: C.textDim, paddingBottom: 8, marginRight: 4 },
  amountDisplay: { fontSize: 64, fontFamily: F.bold, color: C.text, letterSpacing: -2 },
  
  descInput:   { backgroundColor: '#0E0E12', borderRadius: 16, paddingHorizontal: 20, paddingVertical: 16, fontSize: 16, fontFamily: F.medium, color: C.text, textAlign: 'center', marginHorizontal: 20, marginBottom: 10 },

  divider: { height: 1, backgroundColor: C.border, marginVertical: 20 },

  label: { fontSize: 13, fontFamily: F.bold, color: C.textMuted, marginBottom: 12 },
  chipScroll: { gap: 10, paddingBottom: 20 },
  chip:    { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, backgroundColor: C.card, borderWidth: 1, borderColor: C.border },
  chipSel: { backgroundColor: `${C.purple}15`, borderColor: C.purple },
  chipEmoji:{ fontSize: 15 },
  chipTxt: { fontSize: 14, fontFamily: F.medium, color: C.textMuted },
  chipTxtSel:{ color: C.lavender, fontFamily: F.semibold },

  splitHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  segRow:    { flexDirection: 'row', backgroundColor: C.card, borderRadius: 100, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  seg:       { paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center' },
  segActive: { backgroundColor: C.purple },
  segTxt:    { fontSize: 12, fontFamily: F.semibold, color: C.textMuted },
  segTxtActive:{ color: '#fff' },

  memberList:{ gap: 8 },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, backgroundColor: C.card, borderWidth: 1, borderColor: C.border },
  memberRowSel:{ borderColor: C.purple, backgroundColor: `${C.purple}05` },
  check:     { width: 22, height: 22, borderRadius: 7, borderWidth: 1.5, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  checkSel:  { backgroundColor: C.purple, borderColor: C.purple },
  dropAvt:   { width: 32, height: 32, borderRadius: 16, backgroundColor: C.textDim, alignItems: 'center', justifyContent: 'center' },
  dropAvtTxt:{ fontSize: 11, fontFamily: F.bold, color: '#fff' },
  memberName:{ flex: 1, fontSize: 15, fontFamily: F.medium, color: C.text },
  share:     { fontSize: 14, fontFamily: F.bold, color: C.lavender },
});
