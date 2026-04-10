export type Sexo = 'masculino' | 'feminino' | 'outro';
export type TriageLevel = 'SAMU' | 'UPA' | 'UBS';
export type DurationUnit = 'horas' | 'dias' | 'semanas';

export interface PatientData {
  age: string;
  sex: Sexo | null;
  conditions: string[];
  medications: string;
}

export interface SymptomsData {
  mainSymptoms: string[];
  durationValue: string;
  durationUnit: DurationUnit;
  intensity: number;
  associatedSymptoms: string[];
}

export interface TriageResult {
  level: TriageLevel;
  reasoning: string;
  guidance: string[];
}

export interface TriageState extends PatientData, SymptomsData {
  result: TriageResult | null;
  isLoading: boolean;
  error: string | null;
}
