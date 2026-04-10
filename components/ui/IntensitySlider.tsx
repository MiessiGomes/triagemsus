import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';

interface Props {
  value: number;
  onChange: (v: number) => void;
}

function getColor(value: number): string {
  if (value <= 3) return '#2E7D32';
  if (value <= 6) return '#E65100';
  return '#C62828';
}

function getLabel(value: number): string {
  if (value <= 3) return 'Leve';
  if (value <= 6) return 'Moderada';
  return 'Intensa';
}

export function IntensitySlider({ value, onChange }: Props) {
  const color = getColor(value);

  return (
    <View style={styles.container}>
      <View style={[styles.valueBadge, { backgroundColor: color }]}>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.valueLabel}>{getLabel(value)}</Text>
      </View>
      <Slider
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={color}
        maximumTrackTintColor="#E0E0E0"
        thumbTintColor={color}
        style={styles.slider}
      />
      <View style={styles.labels}>
        <Text variant="labelSmall" style={styles.labelText}>1 — Sem dor</Text>
        <Text variant="labelSmall" style={styles.labelText}>10 — Dor máxima</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  valueBadge: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    minWidth: 120,
  },
  valueText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 56,
  },
  valueLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    color: '#757575',
  },
});
