export const S = {
  // Onboarding
  onboarding_title: 'TriageSUS',
  onboarding_subtitle: 'Orientação de Triagem Clínica',
  onboarding_disclaimer: `Este aplicativo é uma ferramenta de orientação e apoio à decisão. Ele NÃO substitui a avaliação médica presencial.\n\nAs recomendações geradas são baseadas nos sintomas relatados e não constituem diagnóstico médico.\n\nEm caso de dúvida, sempre procure um profissional de saúde.`,
  onboarding_button: 'Entendi e quero continuar',

  // Dados do paciente
  patient_title: 'Seus dados',
  patient_age_label: 'Idade (anos)',
  patient_age_placeholder: 'Ex: 35',
  patient_sex_label: 'Sexo',
  patient_sex_m: 'Masculino',
  patient_sex_f: 'Feminino',
  patient_sex_o: 'Outro',
  patient_conditions_label: 'Doenças pré-existentes',
  patient_medications_label: 'Medicamentos em uso',
  patient_medications_placeholder: 'Ex: Losartana 50mg, Metformina 850mg',
  patient_next: 'Próximo',

  // Sintomas principais
  symptoms_title: 'Sintomas principais',
  symptoms_subtitle: 'Selecione todos que você está sentindo agora',
  symptoms_next: 'Próximo',

  // Duração
  duration_title: 'Há quanto tempo?',
  duration_subtitle: 'Há quanto tempo você está com esses sintomas?',
  duration_value_placeholder: 'Ex: 2',
  duration_unit_label: 'Unidade',
  duration_next: 'Próximo',

  // Intensidade
  intensity_title: 'Intensidade',
  intensity_subtitle: 'Qual a intensidade do seu desconforto / dor?',
  intensity_low: 'Leve',
  intensity_mid: 'Moderada',
  intensity_high: 'Intensa',
  intensity_next: 'Próximo',

  // Sintomas associados
  associated_title: 'Sintomas associados',
  associated_subtitle: 'Você está sentindo algum destes sintomas adicionais?',
  associated_none: 'Nenhum dos acima',
  associated_analyze: 'Analisar sintomas',

  // Resultado
  result_title: 'Resultado da triagem',
  result_samu_label: 'SAMU — Emergência',
  result_upa_label: 'UPA — Urgência',
  result_ubs_label: 'UBS — Atenção Primária',
  result_reasoning_title: 'Por que essa indicação?',
  result_guidance_title: 'O que fazer agora',
  result_find_unit: 'Encontrar unidade próxima',
  result_call_samu: 'Ligar para o SAMU (192)',
  result_redo: 'Fazer nova triagem',
  result_disclaimer: 'Esta orientação não substitui avaliação médica.',

  // Erros
  error_connection: 'Não foi possível conectar ao servidor. Verifique se o Ollama está rodando na sua rede local.',
  error_generic: 'Ocorreu um erro. Tente novamente.',
  error_location: 'Não foi possível obter sua localização. Permita o acesso e tente novamente.',

  // Loading
  loading_analyzing: 'Analisando seus sintomas...',
};
