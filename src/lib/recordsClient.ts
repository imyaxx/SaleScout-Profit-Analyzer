const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export interface RecordPayload {
  productUrl: string;
  shopName: string;
}

export interface RecordResponse {
  id: string;
  leaderPrice: number;
  myPrice: number;
  position?: number;
  offers?: { name: string; price: number }[];
  createdAt: string;
}

export async function saveRecord(payload: RecordPayload): Promise<RecordResponse> {
  const response = await fetch(`${API_URL}/api/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const message = data?.message || 'Не удалось сохранить данные';
    throw new Error(message);
  }

  return response.json();
}
