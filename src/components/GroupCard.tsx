import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { F } from '../constants/Typography';
import { C } from '../constants/Tokens';
import type { Group } from '../constants/DummyData';

const fmt = (n: number) => `₹${Math.abs(n).toLocaleString('en-IN')}`;

interface Props { group: Group; onPress: () => void; thumbnail?: ImageSourcePropType; }

export const GroupCard: React.FC<Props> = ({ group, onPress, thumbnail }) => {
  const settled = group.yourBalance === 0;
  const isPos   = group.yourBalance > 0;
  return (
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.75}>
      <View style={s.iconWrap}>
        {thumbnail
          ? <Image source={thumbnail} style={s.thumb} />
          : <View style={s.emojiBox}><Text style={s.emoji}>{group.emoji}</Text></View>
        }
      </View>
      <View style={s.info}>
        <Text style={s.name}    numberOfLines={1}>{group.name}</Text>
        <Text style={s.activity}numberOfLines={1}>{group.lastActivity}</Text>
      </View>
      {settled
        ? <View style={s.pill}><Text style={s.pillTxt}>Settled</Text></View>
        : (
          <View style={s.balCol}>
            <Text style={[s.balLbl, { color: isPos ? C.success : C.danger }]}>{isPos ? 'owed' : 'owe'}</Text>
            <Text style={[s.balAmt, { color: isPos ? C.success : C.danger }]}>{fmt(group.yourBalance)}</Text>
          </View>
        )
      }
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  card:    { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderRadius: 20, padding: 14, gap: 12, borderWidth: 1, borderColor: C.border },
  iconWrap:{ width: 46, height: 46, borderRadius: 13, overflow: 'hidden' },
  thumb:   { width: 46, height: 46, borderRadius: 13 },
  emojiBox:{ width: 46, height: 46, borderRadius: 13, backgroundColor: C.card2, alignItems: 'center', justifyContent: 'center' },
  emoji:   { fontSize: 22 },
  info:    { flex: 1 },
  name:    { fontSize: 15, fontFamily: F.semibold, color: C.text, marginBottom: 3 },
  activity:{ fontSize: 12, fontFamily: F.regular,  color: C.textMuted },
  balCol:  { alignItems: 'flex-end', gap: 2 },
  balLbl:  { fontSize: 11, fontFamily: F.medium },
  balAmt:  { fontSize: 16, fontFamily: F.bold },
  pill:    { backgroundColor: C.card2, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: C.border2 },
  pillTxt: { fontSize: 12, fontFamily: F.medium, color: C.textMuted },
});
