import { shared } from '../../styles/shared';
import { cn } from '../../lib/utils';

export const styles = {
  root: cn(shared.sectionCard, 'p-4 sm:p-6 md:p-8 shadow-xl shadow-blue-900/5'),
  header: 'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6',
  kicker: shared.kicker,
  title: 'text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-1',
  statsRow: 'flex flex-wrap gap-2 sm:gap-4',
  statCardCurrent: 'bg-gray-50 border border-gray-100 rounded-2xl px-3 sm:px-4 py-2 sm:py-3',
  statCardOptimized: 'bg-blue-50 border border-blue-100 rounded-2xl px-3 sm:px-4 py-2 sm:py-3',
  statLabel: 'text-[10px] sm:text-xs font-semibold uppercase whitespace-nowrap',
  statLabelCurrent: 'text-gray-400',
  statLabelOptimized: 'text-blue-500',
  statValue: 'text-base sm:text-lg font-bold',
  statValueCurrent: 'text-gray-700',
  statValueOptimized: 'text-blue-700',
  chartWrap: 'relative',
  svg: 'w-full h-[180px] sm:h-[220px] md:h-[260px]',
  axisRow: 'flex items-center justify-between text-xs text-gray-400 px-2 -mt-2',
  badgeRow: 'mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3 text-xs text-gray-500',
  badge: 'px-3 py-1 rounded-full border border-gray-100 bg-gray-50 text-gray-500',
};

export const animations = {
  currentLine: {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1.2, ease: 'easeInOut' },
  },
  optimizedLine: {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1.4, ease: 'easeInOut', delay: 0.1 },
  },
  pulse: {
    animate: { scale: [1, 1.2, 1] as number[] },
    transition: { duration: 1.6, repeat: Infinity },
  },
} as const;
