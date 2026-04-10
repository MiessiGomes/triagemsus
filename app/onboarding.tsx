import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { S } from '../constants/strings';
import { useTriageStore } from '../store/triageStore';

export default function Onboarding() {
  const reset = useTriageStore((s) => s.reset);

  const handleContinue = () => {
    reset();
    router.push('/dados-paciente');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <MaterialCommunityIcons name="heart-pulse" size={72} color="#1976D2" />
          <Text variant="headlineMedium" style={styles.title}>
            {S.onboarding_title}
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            {S.onboarding_subtitle}
          </Text>
        </View>

        <Surface style={styles.disclaimer} elevation={1}>
          <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#E65100" style={styles.alertIcon} />
          <Text variant="bodyMedium" style={styles.disclaimerText}>
            {S.onboarding_disclaimer}
          </Text>
        </Surface>

        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          icon="arrow-right"
        >
          {S.onboarding_button}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    padding: 24,
    gap: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#1976D2',
  },
  subtitle: {
    color: '#616161',
    textAlign: 'center',
  },
  disclaimer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
    backgroundColor: '#FFF8E1',
  },
  alertIcon: {
    alignSelf: 'flex-start',
  },
  disclaimerText: {
    color: '#5D4037',
    lineHeight: 22,
  },
  button: {
    borderRadius: 12,
    marginTop: 8,
  },
  buttonContent: {
    height: 52,
    flexDirection: 'row-reverse',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});
