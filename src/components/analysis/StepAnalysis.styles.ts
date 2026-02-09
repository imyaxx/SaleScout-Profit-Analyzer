import { shared } from '../../styles/shared';

export const styles = {
  root: 'space-y-6 sm:space-y-10',
  headerRow: 'flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 border-b border-gray-100 pb-4 sm:pb-6',
  title: 'text-xl sm:text-2xl font-bold flex flex-wrap items-center gap-2 sm:gap-3 gap-y-1',
  dateLabel: 'text-xs sm:text-sm font-normal text-gray-400',
  ctaBtn: 'flex items-center gap-2 px-5 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1D4ED8] transition-colors shadow-lg shadow-blue-200 w-full sm:w-auto justify-center',
  grid: 'grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 sm:gap-8',
  gridItemFull: 'h-full',
  errorWrap: 'space-y-4',
  headerActions: 'flex items-center gap-3',
  btnBackDesktop: shared.btnBackDesktop,
  btnBackMobile: shared.btnBackMobile,
};

export const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  },
  section: (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay },
  }),
};
