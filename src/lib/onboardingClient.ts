/**
 * API-клиент фронтенда.
 * analyzeKaspi — POST /api/analyze (запуск анализа товара)
 * submitLead  — POST /api/lead    (отправка заявки)
 */
import i18next from 'i18next';
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
    const message = data?.message || i18next.t('errors.analyzeFailed');
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
    const message = data?.message || i18next.t('errors.leadFailed');
    throw new Error(message);
  }

  return response.json();
}
