import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { openNearestUnit, callSamu } from '../../lib/locationService';
import { S } from '../../constants/strings';
import { TRIAGE_COLORS } from '../../constants/triageColors';
import type { TriageLevel } from '../../types';

interface Props {
  level: TriageLevel;
}

export function FindUnitButton({ level }: Props) {
  const [loading, setLoading] = useState(false);
  const colors = TRIAGE_COLORS[level];
  const isSamu = level === 'SAMU';

  const handlePress = async () => {
    setLoading(true);
    try {
      if (isSamu) {
        await callSamu();
      } else {
        await openNearestUnit(level);
      }
    } catch {
      Alert.alert('Erro', S.error_location);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      mode="contained"
      onPress={handlePress}
      loading={loading}
      disabled={loading}
      icon={isSamu ? 'phone' : 'map-marker'}
      style={[styles.button, { backgroundColor: colors.background }]}
      contentStyle={styles.content}
      labelStyle={styles.label}
    >
      {isSamu ? S.result_call_samu : S.result_find_unit}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
  },
  content: {
    height: 52,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
});
