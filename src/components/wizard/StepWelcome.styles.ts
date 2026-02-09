import { shared } from '../../styles/shared';
import { cn } from '../../lib/utils';

export const styles = {
  root: cn(shared.card, shared.cardPaddingLarge),
  grid: 'grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 items-center',
  badge: 'inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6',
  title: 'text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 mb-3 sm:mb-4',
  subtitle: 'text-gray-500 text-base sm:text-lg md:text-xl mb-6 sm:mb-8',
  ctaBtn: cn(shared.btnPrimary, shared.btnPrimaryPadding, 'inline-flex items-center gap-2 w-full sm:w-auto justify-center'),
  demoCard: 'relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-3xl border border-gray-100 p-5 sm:p-8 overflow-hidden sm:overflow-visible',
  demoBlur: 'absolute -top-6 -right-6 w-20 h-20 bg-blue-100 rounded-3xl blur-2xl',
  demoStack: 'space-y-4 sm:space-y-6',
  demoHeader: 'flex items-center justify-between',
  demoTag: 'text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full',
  demoTime: 'text-xs text-gray-400',
  demoItems: 'space-y-3 sm:space-y-4',
  demoItem: 'p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-sm',
  demoItemLabel: 'text-sm font-semibold text-gray-900',
  demoItemValue: 'text-xl sm:text-2xl font-black text-gray-900 mt-1',
  demoItemValueBlue: 'text-xl sm:text-2xl font-black text-blue-600 mt-1',
  demoItemDesc: 'text-sm text-gray-500 mt-1',
};

export const animations = {
  badge: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  },
  title: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.1 },
  },
  subtitle: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2 },
  },
  demoCard: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay: 0.25 },
  },
};
