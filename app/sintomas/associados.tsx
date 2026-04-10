import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SymptomsChipGrid } from '../../components/ui/SymptomsChipGrid';
import { LoadingOverlay } from '../../components/LoadingOverlay';
import { S } from '../../constants/strings';
import { ASSOCIATED_SYMPTOMS } from '../../constants/symptoms';
import { useTriageStore } from '../../store/triageStore';
import { performTriage } from '../../lib/ollama';

export default function Associados() {
  const store = useTriageStore();
  const { associatedSymptoms, isLoading, setSymptomsData, setResult, setLoading, setError } = store;

  const toggle = (item: string) => {
    const updated = associatedSymptoms.includes(item)
      ? associatedSymptoms.filter((s) => s !== item)
      : [...associatedSymptoms, item];
    setSymptomsData({ associatedSymptoms: updated });
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = useTriageStore.getState();
      const result = await performTriage(snapshot);
      setResult(result);
      router.push('/resultado');
    } catch (e: any) {
      const msg = e?.message?.includes('EXPO_PUBLIC_OLLAMA_URL')
        ? 'Configure o endereço do Ollama no arquivo .env.local'
        : S.error_connection;
      setError(msg);
      Alert.alert('Erro na triagem', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <LoadingOverlay visible={isLoading} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="headlineSmall" style={styles.title}>{S.associated_title}</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>{S.associated_subtitle}</Text>

        <SymptomsChipGrid
          options={ASSOCIATED_SYMPTOMS}
          selected={associatedSymptoms}
          onToggle={toggle}
        />

        <Button
          mode="contained"
          onPress={handleAnalyze}
          disabled={isLoading}
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon="stethoscope"
        >
          {S.associated_analyze}
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
  buttonContent: { height: 52 },
});
