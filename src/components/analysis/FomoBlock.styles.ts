export const styles = {
  root: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl shadow-blue-200',
  kicker: 'text-xs sm:text-sm text-blue-100 uppercase tracking-wide font-semibold mb-1 sm:mb-2',
  title: 'text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2',
  subtitle: 'text-lg sm:text-xl md:text-2xl font-semibold',
  value: 'text-white',
};

export const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.15 },
  },
} as const;
