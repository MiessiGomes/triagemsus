import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Divider, Surface } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TriageCard } from '../components/result/TriageCard';
import { GuidanceList } from '../components/result/GuidanceList';
import { FindUnitButton } from '../components/result/FindUnitButton';
import { S } from '../constants/strings';
import { useTriageStore } from '../store/triageStore';

export default function Resultado() {
  const { result, reset } = useTriageStore();

  if (!result) {
    router.replace('/onboarding');
    return null;
  }

  const handleRedo = () => {
    reset();
    router.replace('/onboarding');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="headlineSmall" style={styles.pageTitle}>{S.result_title}</Text>

        <TriageCard level={result.level} />

        <FindUnitButton level={result.level} />

        <Divider />

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>{S.result_reasoning_title}</Text>
          <Text variant="bodyMedium" style={styles.reasoning}>{result.reasoning}</Text>
        </View>

        <Divider />

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>{S.result_guidance_title}</Text>
          <GuidanceList items={result.guidance} />
        </View>

        <Surface style={styles.disclaimerBox} elevation={0}>
          <Text variant="bodySmall" style={styles.disclaimerText}>
            {S.result_disclaimer}
          </Text>
        </Surface>

        <Button
          mode="outlined"
          onPress={handleRedo}
          style={styles.redoButton}
          contentStyle={styles.buttonContent}
          icon="refresh"
        >
          {S.result_redo}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { padding: 24, gap: 20, paddingBottom: 48 },
  pageTitle: { fontWeight: 'bold', color: '#212121' },
  section: { gap: 12 },
  sectionTitle: { fontWeight: '600', color: '#212121' },
  reasoning: { color: '#424242', lineHeight: 22 },
  disclaimerBox: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
  },
  disclaimerText: {
    color: '#E65100',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  redoButton: {
    borderRadius: 12,
    marginTop: 4,
  },
  buttonContent: { height: 52 },
});
