import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

interface Props {
  options: string[];
  selected: string[];
  onToggle: (item: string) => void;
}

export function ConditionsChecklist({ options, selected, onToggle }: Props) {
  return (
    <View style={styles.container}>
      {options.map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={selected.includes(item) ? 'checked' : 'unchecked'}
          onPress={() => onToggle(item)}
          labelStyle={styles.label}
          style={styles.item}
          position="leading"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  item: {
    paddingVertical: 4,
  },
  label: {
    fontSize: 15,
  },
});
