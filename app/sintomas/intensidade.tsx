import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IntensitySlider } from '../../components/ui/IntensitySlider';
import { S } from '../../constants/strings';
import { useTriageStore } from '../../store/triageStore';

export default function Intensidade() {
  const { intensity, setSymptomsData } = useTriageStore();

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>{S.intensity_title}</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>{S.intensity_subtitle}</Text>

        <View style={styles.sliderContainer}>
          <IntensitySlider
            value={intensity}
            onChange={(v) => setSymptomsData({ intensity: v })}
          />
        </View>

        <Button
          mode="contained"
          onPress={() => router.push('/sintomas/associados')}
          style={styles.button}
          contentStyle={styles.buttonContent}
          icon="arrow-right"
        >
          {S.intensity_next}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { flex: 1, padding: 24, gap: 24 },
  title: { fontWeight: 'bold', color: '#212121' },
  subtitle: { color: '#616161' },
  sliderContainer: { flex: 1, justifyContent: 'center' },
  button: { borderRadius: 12 },
  buttonContent: { height: 52, flexDirection: 'row-reverse' },
});
