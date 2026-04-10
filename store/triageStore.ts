import { create } from 'zustand';
import type { TriageState, TriageResult, PatientData, SymptomsData } from '../types';

interface TriageActions {
  setPatientData: (data: Partial<PatientData>) => void;
  setSymptomsData: (data: Partial<SymptomsData>) => void;
  setResult: (result: TriageResult | null) => void;
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
  reset: () => void;
}

const initialState: TriageState = {
  age: '',
  sex: null,
  conditions: [],
  medications: '',
  mainSymptoms: [],
  durationValue: '',
  durationUnit: 'horas',
  intensity: 5,
  associatedSymptoms: [],
  result: null,
  isLoading: false,
  error: null,
};

export const useTriageStore = create<TriageState & TriageActions>((set) => ({
  ...initialState,
  setPatientData: (data) => set((s) => ({ ...s, ...data })),
  setSymptomsData: (data) => set((s) => ({ ...s, ...data })),
  setResult: (result) => set({ result }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
