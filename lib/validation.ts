import { z } from 'zod';

export const patientSchema = z.object({
  age: z
    .string()
    .min(1, 'Idade é obrigatória')
    .refine((v) => {
      const n = Number(v);
      return Number.isInteger(n) && n >= 0 && n <= 120;
    }, 'Idade deve ser entre 0 e 120 anos'),
  sex: z.enum(['masculino', 'feminino', 'outro'], {
    error: 'Selecione o sexo',
  }),
});

export const mainSymptomsSchema = z.object({
  mainSymptoms: z.array(z.string()).min(1, 'Selecione ao menos um sintoma'),
});

export const durationSchema = z.object({
  durationValue: z
    .string()
    .min(1, 'Informe a duração')
    .refine((v) => {
      const n = Number(v);
      return n > 0 && n <= 999;
    }, 'Duração deve ser um número positivo'),
  durationUnit: z.enum(['horas', 'dias', 'semanas']),
});
