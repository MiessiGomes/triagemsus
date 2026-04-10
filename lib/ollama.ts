import { z } from 'zod';
import { buildSystemPrompt, buildUserMessage } from './triagePrompt';
import type { TriageState, TriageResult } from '../types';

const OLLAMA_URL = process.env.EXPO_PUBLIC_OLLAMA_URL;
const MODEL = process.env.EXPO_PUBLIC_OLLAMA_MODEL ?? 'llama3.1:8b';

const TriageResultSchema = z.object({
  level: z.enum(['SAMU', 'UPA', 'UBS']),
  reasoning: z.string().min(1),
  guidance: z.array(z.string()).min(1).max(6),
});

export async function performTriage(state: TriageState): Promise<TriageResult> {
  if (!OLLAMA_URL) {
    throw new Error('EXPO_PUBLIC_OLLAMA_URL não configurado no .env.local');
  }

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      format: 'json',
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: buildUserMessage(state) },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama retornou erro ${response.status}`);
  }

  const data = await response.json();
  const content = data?.message?.content;

  if (!content) {
    throw new Error('Resposta inválida do Ollama');
  }

  const parsed = JSON.parse(content);
  return TriageResultSchema.parse(parsed);
}
