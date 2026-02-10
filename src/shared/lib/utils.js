export function cn(...inputs) {
  return inputs
    .filter(Boolean)
    .map((item) => {
      if (typeof item === 'object' && item !== null) {
        return Object.entries(item)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return item;
    })
    .join(' ');
}

export function formatMoney(amount, currency = '₸') {
  return (
    new Intl.NumberFormat('ru-RU', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    }).format(amount) + ` ${currency}`
  );
}
