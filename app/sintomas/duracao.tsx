import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, HelperText, SegmentedButtons } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { S } from '../../constants/strings';
import { useTriageStore } from '../../store/triageStore';
import { durationSchema } from '../../lib/validation';
import type { DurationUnit } from '../../types';

export default function Duracao() {
  const { durationValue, durationUnit, setSymptomsData } = useTriageStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const result = durationSchema.safeParse({ durationValue, durationUnit });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((e) => {
        errs[String(e.path[0])] = e.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    router.push('/sintomas/intensidade');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.kav}>
        <View style={styles.content}>
          <Text variant="headlineSmall" style={styles.title}>{S.duration_title}</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>{S.duration_subtitle}</Text>

          <TextInput
            label={S.duration_value_placeholder}
            value={durationValue}
            onChangeText={(v) => setSymptomsData({ durationValue: v })}
            keyboardType="numeric"
            mode="outlined"
            error={!!errors.durationValue}
          />
          {errors.durationValue ? <HelperText type="error">{errors.durationValue}</HelperText> : null}

          <Text variant="labelLarge" style={styles.unitLabel}>{S.duration_unit_label}</Text>
          <SegmentedButtons
            value={durationUnit}
            onValueChange={(v) => setSymptomsData({ durationUnit: v as DurationUnit })}
            buttons={[
              { value: 'horas', label: 'Horas' },
              { value: 'dias', label: 'Dias' },
              { value: 'semanas', label: 'Semanas' },
            ]}
          />

          <Button
            mode="contained"
            onPress={handleNext}
            style={styles.button}
            contentStyle={styles.buttonContent}
            icon="arrow-right"
          >
            {S.duration_next}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  kav: { flex: 1 },
  content: { flex: 1, padding: 24, gap: 16 },
  title: { fontWeight: 'bold', color: '#212121' },
  subtitle: { color: '#616161' },
  unitLabel: { color: '#424242', marginTop: 8 },
  button: { borderRadius: 12, marginTop: 'auto' as any },
  buttonContent: { height: 52, flexDirection: 'row-reverse' },
});
