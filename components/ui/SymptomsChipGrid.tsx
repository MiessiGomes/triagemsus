import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

interface Props {
  options: string[];
  selected: string[];
  onToggle: (item: string) => void;
}

export function SymptomsChipGrid({ options, selected, onToggle }: Props) {
  return (
    <View style={styles.grid}>
      {options.map((item) => {
        const isSelected = selected.includes(item);
        return (
          <Chip
            key={item}
            selected={isSelected}
            onPress={() => onToggle(item)}
            style={[styles.chip, isSelected && styles.chipSelected]}
            textStyle={isSelected ? styles.chipTextSelected : undefined}
            showSelectedCheck={false}
          >
            {item}
          </Chip>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#F5F5F5',
  },
  chipSelected: {
    backgroundColor: '#1565C0',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});
