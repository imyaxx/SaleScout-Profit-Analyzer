import { shared } from '../../styles/shared';
import { cn } from '../../lib/utils';

export const styles = {
  root: cn(shared.sectionCard, 'p-4 sm:p-6 md:p-8 h-full flex flex-col'),
  headerRow: 'flex items-center justify-between mb-4 sm:mb-6',
  kicker: shared.kicker,
  title: shared.sectionTitle,
  headerIcon: 'w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0',
  grid: 'grid grid-cols-2 gap-3 sm:gap-4 flex-1',
  metricCard: 'p-3 sm:p-4 rounded-2xl border border-gray-100 bg-white flex flex-col justify-center',
  metricLabel: 'text-[10px] sm:text-xs uppercase text-gray-400 font-semibold',
  metricValue: 'text-base sm:text-lg font-bold text-gray-900 mt-1',
  deltaGreen: 'text-xs mt-2 flex items-center gap-1 text-green-600',
  deltaRed: 'text-xs mt-2 flex items-center gap-1 text-red-500',
  deltaNeutral: 'text-xs mt-2 flex items-center gap-1 text-gray-400',
  positionHint: (isTop1: boolean) =>
    cn('text-[10px] sm:text-xs mt-2', isTop1 ? 'text-green-600' : 'text-blue-600'),
  profitCard: 'p-3 sm:p-4 rounded-2xl border border-gray-100 bg-white col-span-2 flex flex-col justify-center',
  profitModel: 'text-xs text-gray-400 mt-2',
  leaderCard: 'col-span-2',
  leaderInner: 'rounded-2xl border border-gray-100 bg-white p-4 sm:p-5',
  leaderHeaderRow: 'flex items-center gap-3 mb-3',
  leaderIcon: 'w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0',
  leaderName: 'flex-1 min-w-0',
  leaderLabel: 'text-[10px] sm:text-xs uppercase font-semibold text-gray-400 tracking-wider',
  leaderShopName: 'text-sm sm:text-base font-bold text-gray-900 truncate',
  leaderFooter: 'flex items-end justify-between',
  leaderPriceLabel: 'text-xs text-gray-400 font-medium',
  leaderPriceValue: 'text-lg sm:text-xl font-bold text-gray-900',
  badgeTop1: 'flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-500 text-white text-xs font-semibold shadow-lg shadow-green-200/50',
  badgeGap: 'flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-lg shadow-blue-200/50',
};

export const animations = {
  scaleIn: (delay: number) => ({
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { delay, type: 'spring' as const, stiffness: 200 },
  }),
  leaderFadeIn: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.3 },
  },
};
