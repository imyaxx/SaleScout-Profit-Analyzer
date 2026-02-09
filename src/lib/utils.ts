
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
  const locale = 'ru-RU';

  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true
  }).format(amount) + ` ${currency}`;
}
