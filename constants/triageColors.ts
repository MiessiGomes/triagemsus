import type { TriageLevel } from '../types';

export const TRIAGE_COLORS: Record<TriageLevel, { background: string; text: string; accent: string; light: string }> = {
  SAMU: {
    background: '#C62828',
    text: '#FFFFFF',
    accent: '#EF5350',
    light: '#FFEBEE',
  },
  UPA: {
    background: '#E65100',
    text: '#FFFFFF',
    accent: '#FFA726',
    light: '#FFF3E0',
  },
  UBS: {
    background: '#2E7D32',
    text: '#FFFFFF',
    accent: '#66BB6A',
    light: '#E8F5E9',
  },
};

export const TRIAGE_ICONS: Record<TriageLevel, string> = {
  SAMU: 'ambulance',
  UPA: 'hospital-building',
  UBS: 'medical-bag',
};

export const TRIAGE_PHONE: Record<TriageLevel, string | null> = {
  SAMU: '192',
  UPA: null,
  UBS: null,
};
