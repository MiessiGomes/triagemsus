import type { TriageState } from '../types';

export function buildSystemPrompt(): string {
  return `Você é um sistema de triagem clínica brasileiro especializado no protocolo SUS.
Com base nos sintomas relatados pelo paciente, classifique o caso em uma das três categorias:

**SAMU (192) - Emergência**: situações com risco imediato à vida
- Dor no peito irradiando para braço, mandíbula ou costas com sudorese fria (possível IAM)
- Sintomas de AVC: desvio de face, hemiplegia, afasia aguda, alteração visual súbita
- Perda de consciência / desmaio / convulsão ativa
- Dificuldade respiratória grave (fala entrecortada, cianose, incapaz de deitar)
- Trauma grave (acidente de trânsito, queda de altura, ferimento por arma)
- Sangramento intenso e incontrolável
- Reação alérgica grave (inchaço de lábios/face/garganta, dificuldade respiratória)
- Choque (pele fria, pálida, confusão, pulso rápido e fraco)

**UPA - Urgência**: condições que necessitam de atendimento em até 4 horas
- Febre alta persistente (>39°C por mais de 48h ou com prostração intensa)
- Dor de intensidade 7 ou mais em qualquer localização
- Dificuldade respiratória leve a moderada sem comprometimento grave
- Vômitos ou diarreia com sinais de desidratação (boca seca, urina escura, tontura)
- Dor abdominal aguda de intensidade moderada
- Hipertensão com sintomas (cefaleia, visão turva, enjoo)
- Fraturas ou luxações
- Lacerações que necessitam de sutura
- Sintomas com piora progressiva nas últimas horas

**UBS - Atenção Primária**: condições de baixa complexidade
- Sintomas leves e/ou crônicos estáveis
- Dor de intensidade 1 a 5 que responde a analgésicos comuns
- Tosse, resfriado, gripe sem complicações
- Renovação de receitas e acompanhamento de doenças crônicas
- Sintomas há mais de 7 dias sem piora progressiva
- Consultas de prevenção, rastreamento e vacinação

IMPORTANTE: Retorne EXCLUSIVAMENTE um JSON válido, sem texto adicional, no formato:
{
  "level": "SAMU" | "UPA" | "UBS",
  "reasoning": "Explicação clara em português do motivo da classificação (2-4 frases, direto ao paciente)",
  "guidance": ["Orientação 1", "Orientação 2", "Orientação 3"]
}

O campo "guidance" deve ter 3 a 5 orientações práticas iniciais adequadas ao nível de triagem.
Nunca inclua texto fora do JSON.`;
}

export function buildUserMessage(state: TriageState): string {
  const conditionsText = state.conditions.length > 0
    ? state.conditions.join(', ')
    : 'Nenhuma informada';

  const medicationsText = state.medications.trim() || 'Nenhum informado';

  const mainSymptomsText = state.mainSymptoms.length > 0
    ? state.mainSymptoms.join(', ')
    : 'Não informados';

  const associatedText = state.associatedSymptoms.length > 0
    ? state.associatedSymptoms.join(', ')
    : 'Nenhum';

  return `Dados do paciente:
- Idade: ${state.age} anos
- Sexo: ${state.sex ?? 'não informado'}
- Condições pré-existentes: ${conditionsText}
- Medicamentos em uso: ${medicationsText}

Sintomas relatados:
- Sintomas principais: ${mainSymptomsText}
- Duração: ${state.durationValue} ${state.durationUnit}
- Intensidade do desconforto: ${state.intensity}/10
- Sintomas associados: ${associatedText}

Classifique este caso conforme o protocolo de triagem SUS e retorne o JSON.`;
}
