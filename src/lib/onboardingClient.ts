import { AnalyzeRequest, KaspiAnalysis, LeadPayload } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export async function analyzeKaspi(payload: AnalyzeRequest): Promise<KaspiAnalysis> {
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message = data?.message || 'Не удалось выполнить анализ';
    throw new Error(message);
  }

  return response.json();
}

export async function submitLead(payload: LeadPayload): Promise<{ id: string; createdAt: string }> {
  const response = await fetch(`${API_URL}/api/lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message = data?.message || 'Не удалось отправить заявку';
    throw new Error(message);
  }

  return response.json();
}
