/**
 * Create Group — Minimal, floating pill action bar
 */
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, StatusBar,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { F } from '../../src/constants/Typography';
import { C } from '../../src/constants/Tokens';
import type { GroupType } from '../../src/constants/DummyData';

const TYPES: { type: GroupType; emoji: string; label: string }[] = [
  { type: 'Trip',   emoji: '✈️', label: 'Trip'   },
  { type: 'Home',   emoji: '🏠', label: 'Home'   },
  { type: 'Couple', emoji: '💑', label: 'Couple' },
  { type: 'Event',  emoji: '🎉', label: 'Event'  },
  { type: 'Other',  emoji: '📦', label: 'Other'  },
];

const CONTACTS = [
  { id: 'u2', name: 'Rahul Verma', avatar: 'RV', phone: '+91 98765 43210' },
  { id: 'u3', name: 'Priya Sharma', avatar: 'PS', phone: '+91 98765 43211' },
  { id: 'u4', name: 'Aman Gupta', avatar: 'AG', phone: '+91 98765 43212' },
  { id: 'u5', name: 'Sneha Patel', avatar: 'SP', phone: '+91 98765 43213' },
  { id: 'u6', name: 'Krish Iyer', avatar: 'KI', phone: '+91 98765 43214' },
];

export default function CreateGroupScreen() {
  const { bottom } = useSafeAreaInsets();
  const [name,        setName]   = useState('');
  const [type,        setType]   = useState<GroupType>('Trip');
  const [members,     setMembers]= useState<string[]>([]);

  const toggleMember = (id: string) => {
    if (members.includes(id)) {
      setMembers(members.filter(m => m !== id));
    } else {
      setMembers([...members, id]);
    }
  };

  const canCreate = name.trim().length > 0;

  return (
    <SafeAreaView style={s.safe} edges={['top','left','right']}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        {/* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.closeBtn}>
            <Ionicons name="close" size={19} color={C.text} />
          </TouchableOpacity>
          <Text style={s.title}>New Group</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          <Text style={s.label}>Name</Text>
          <TextInput
            style={s.input}
            placeholder="e.g. Goa Trip 2025"
            placeholderTextColor={C.textMuted}
            value={name}
            onChangeText={setName}
            returnKeyType="done"
          />

          <Text style={s.label}>Type</Text>
          <View style={s.typeRow}>
            {TYPES.map(({ type: t, emoji, label }) => {
              const sel = type === t;
              return (
                <TouchableOpacity
                  key={t}
                  style={[s.typeChip, sel && s.typeChipSel]}
                  onPress={() => setType(t)}
                >
                  <Text style={s.typeEmoji}>{emoji}</Text>
                  <Text style={[s.typeLabel, sel && s.typeLabelSel]}>{label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={s.label}>Add from Contacts</Text>
          <View style={s.contactList}>
            {CONTACTS.map(c => {
              const sel = members.includes(c.id);
              return (
                <TouchableOpacity
                  key={c.id}
                  style={[s.contactRow, sel && s.contactRowSel]}
                  onPress={() => toggleMember(c.id)}
                  activeOpacity={0.7}
                >
                  <View style={s.contactAvt}><Text style={s.contactAvtTxt}>{c.avatar}</Text></View>
                  <View style={s.contactInfo}>
                    <Text style={s.contactName}>{c.name}</Text>
                    <Text style={s.contactPhone}>{c.phone}</Text>
                  </View>
                  <View style={[s.contactCheck, sel && s.contactCheckSel]}>
                    {sel && <Ionicons name="checkmark" size={12} color="#fff" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

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
              <TouchableOpacity style={s.cancelBtn} onPress={() => router.back()}>
                <Text style={s.cancelTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.createBtn, !canCreate && { opacity: 0.35 }]}
                onPress={() => { if (canCreate) router.back(); }}
                disabled={!canCreate}
              >
                <Text style={s.createTxt}>Create Group</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: C.bg },
  header:{
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  closeBtn:{
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: C.card, borderWidth: 1, borderColor: C.border,
    alignItems: 'center', justifyContent: 'center',
  },
  title: { fontSize: 17, fontFamily: F.bold, color: C.text },
  scroll:{ paddingHorizontal: 20, paddingTop: 22 },

  label: { fontSize: 11, fontFamily: F.bold, color: C.textMuted, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10, marginTop: 20 },
  input: {
    backgroundColor: C.card, borderRadius: 14,
    borderWidth: 1, borderColor: C.border,
    paddingHorizontal: 14, paddingVertical: 14,
    fontSize: 15, fontFamily: F.regular, color: C.text, marginBottom: 4,
  },

  typeRow:    { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeChip:   { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: C.card, borderRadius: 100, paddingHorizontal: 14, paddingVertical: 9, borderWidth: 1.5, borderColor: C.border },
  typeChipSel:{ backgroundColor: `${C.purple}15`, borderColor: C.purple },
  typeEmoji:  { fontSize: 14 },
  typeLabel:  { fontSize: 13, fontFamily: F.medium, color: C.textMuted },
  typeLabelSel:{ color: C.lavender, fontFamily: F.semibold },

  contactList: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, overflow: 'hidden' },
  contactRow:  { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border },
  contactRowSel: { backgroundColor: `${C.purple}08` },
  contactAvt:  { width: 38, height: 38, borderRadius: 19, backgroundColor: C.purple, alignItems: 'center', justifyContent: 'center' },
  contactAvtTxt:{ fontSize: 13, fontFamily: F.bold, color: '#fff' },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 15, fontFamily: F.bold, color: C.text, marginBottom: 2 },
  contactPhone:{ fontSize: 13, fontFamily: F.regular, color: C.textMuted },
  contactCheck:{ width: 22, height: 22, borderRadius: 8, borderWidth: 1.5, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
  contactCheckSel: { backgroundColor: C.purple, borderColor: C.purple },

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
  cancelBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    height: '100%', borderRadius: 30, backgroundColor: '#1C1C24', overflow: 'hidden',
  },
  cancelTxt:   { fontSize: 13, fontFamily: F.bold, color: C.textDim },
  createBtn: {
    flex: 1.5, alignItems: 'center', justifyContent: 'center',
    height: '100%', borderRadius: 30, backgroundColor: C.purple, overflow: 'hidden',
  },
  createTxt:   { fontSize: 14, fontFamily: F.semibold, color: '#fff' },
});
