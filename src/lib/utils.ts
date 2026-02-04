
/**
 * Combines tailwind classes conditionally
 */
export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return inputs
    .filter(Boolean)
    .map((item) => {
      if (typeof item === 'object' && item !== null) {
        return Object.entries(item)
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return item;
    })
    .join(' ');
}

/**
 * Formats numbers into currency strings (KZT)
 */
export function formatMoney(amount: number, currency: string = '₸'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ` ${currency}`;
}

/**
 * Downloads a JSON file
 */
export function downloadJson(data: any, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}
