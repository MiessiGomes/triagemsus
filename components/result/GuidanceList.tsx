import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  items: string[];
}

export function GuidanceList({ items }: Props) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.row}>
          <MaterialCommunityIcons name="check-circle-outline" size={20} color="#1976D2" style={styles.icon} />
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  icon: {
    marginTop: 2,
    flexShrink: 0,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
    color: '#212121',
  },
});
