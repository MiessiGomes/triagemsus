import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymptomsChipGrid } from '../../components/ui/SymptomsChipGrid';
import { S } from '../../constants/strings';
import { MAIN_SYMPTOMS } from '../../constants/symptoms';
import { useTriageStore } from '../../store/triageStore';

export default function Principais() {
  const { mainSymptoms, setSymptomsData } = useTriageStore();
  const [error, setError] = useState('');

  const toggle = (item: string) => {
    const updated = mainSymptoms.includes(item)
      ? mainSymptoms.filter((s) => s !== item)
      : [...mainSymptoms, item];
    setSymptomsData({ mainSymptoms: updated });
  };

  const handleNext = () => {
    if (mainSymptoms.length === 0) {
      setError('Selecione ao menos um sintoma');
      return;
    }
    setError('');
    router.push('/sintomas/duracao');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="headlineSmall" style={styles.title}>{S.symptoms_title}</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>{S.symptoms_subtitle}</Text>

        <SymptomsChipGrid
          options={MAIN_SYMPTOMS}
          selected={mainSymptoms}
          onToggle={toggle}
        />

        {error ? <HelperText type="error">{error}</HelperText> : null}

        <Button
          mode="contained"
          onPress={handleNext}
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon="arrow-right"
        >
          {S.symptoms_next}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { padding: 24, gap: 20, paddingBottom: 40 },
  title: { fontWeight: 'bold', color: '#212121' },
  subtitle: { color: '#616161' },
  button: { borderRadius: 12, marginTop: 8 },
  buttonContent: { height: 52, flexDirection: 'row-reverse' },
});
