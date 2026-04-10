import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons, Divider, HelperText } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ConditionsChecklist } from '../components/ui/ConditionsChecklist';
import { S } from '../constants/strings';
import { CONDITIONS } from '../constants/conditions';
import { useTriageStore } from '../store/triageStore';
import { patientSchema } from '../lib/validation';
import type { Sexo } from '../types';

export default function DadosPaciente() {
  const { age, sex, conditions, medications, setPatientData } = useTriageStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleCondition = (item: string) => {
    const updated = conditions.includes(item)
      ? conditions.filter((c) => c !== item)
      : [...conditions, item];
    setPatientData({ conditions: updated });
  };

  const handleNext = () => {
    const result = patientSchema.safeParse({ age, sex });
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((e) => {
        const key = String(e.path[0]);
        errs[key] = e.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    router.push('/sintomas/principais');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior="padding" style={styles.kav}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Text variant="headlineSmall" style={styles.title}>
            {S.patient_title}
          </Text>

          <View style={styles.section}>
            <TextInput
              label={S.patient_age_label}
              placeholder={S.patient_age_placeholder}
              value={age}
              onChangeText={(v) => setPatientData({ age: v })}
              keyboardType="numeric"
              mode="outlined"
              error={!!errors.age}
            />
            {errors.age ? <HelperText type="error">{errors.age}</HelperText> : null}
          </View>

          <View style={styles.section}>
            <Text variant="labelLarge" style={styles.sectionLabel}>
              {S.patient_sex_label}
            </Text>
            <SegmentedButtons
              value={sex ?? ''}
              onValueChange={(v) => setPatientData({ sex: v as Sexo })}
              buttons={[
                { value: 'masculino', label: S.patient_sex_m },
                { value: 'feminino', label: S.patient_sex_f },
                { value: 'outro', label: S.patient_sex_o },
              ]}
            />
            {errors.sex ? <HelperText type="error">{errors.sex}</HelperText> : null}
          </View>

          <Divider />

          <View style={styles.section}>
            <Text variant="labelLarge" style={styles.sectionLabel}>
              {S.patient_conditions_label}
            </Text>
            <ConditionsChecklist
              options={CONDITIONS}
              selected={conditions}
              onToggle={toggleCondition}
            />
          </View>

          <Divider />

          <View style={styles.section}>
            <TextInput
              label={S.patient_medications_label}
              placeholder={S.patient_medications_placeholder}
              value={medications}
              onChangeText={(v) => setPatientData({ medications: v })}
              mode="outlined"
              multiline
              numberOfLines={3}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleNext}
            style={styles.button}
            contentStyle={styles.buttonContent}
            icon="arrow-right"
          >
            {S.patient_next}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FAFAFA' },
  kav: { flex: 1 },
  content: { padding: 24, gap: 16, paddingBottom: 80 },
  title: { fontWeight: 'bold', color: '#212121', marginBottom: 8 },
  section: { gap: 8 },
  sectionLabel: { color: '#424242', marginBottom: 4 },
  button: { borderRadius: 12, marginTop: 8 },
  buttonContent: { height: 52, flexDirection: 'row-reverse' },
});
