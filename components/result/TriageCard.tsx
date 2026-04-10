import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TRIAGE_COLORS, TRIAGE_ICONS } from '../../constants/triageColors';
import { S } from '../../constants/strings';
import type { TriageLevel } from '../../types';

const LABELS: Record<TriageLevel, string> = {
  SAMU: S.result_samu_label,
  UPA: S.result_upa_label,
  UBS: S.result_ubs_label,
};

interface Props {
  level: TriageLevel;
}

export function TriageCard({ level }: Props) {
  const colors = TRIAGE_COLORS[level];
  const icon = TRIAGE_ICONS[level];

  return (
    <View style={[styles.card, { backgroundColor: colors.background }]}>
      <MaterialCommunityIcons name={icon as any} size={48} color={colors.text} />
      <Text style={[styles.label, { color: colors.text }]}>{LABELS[level]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
