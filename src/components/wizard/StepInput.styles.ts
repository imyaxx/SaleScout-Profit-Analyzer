import { shared } from '../../styles/shared';
import { cn } from '../../lib/utils';

export const styles = {
  root: cn(shared.card, shared.cardPadding),
  headerRow: 'flex items-center justify-between mb-4 sm:mb-6',
  title: shared.pageTitle,
  subtitle: 'text-gray-500 text-sm sm:text-base mt-1',
  btnBackDesktop: shared.btnBackDesktop,
  grid: 'grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 sm:gap-6',
  footer: 'flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-6 sm:mt-8',
  btnBackMobile: shared.btnBackMobile,
  btnSubmit: cn(shared.btnPrimary, 'w-full sm:w-auto px-8 py-3.5 flex items-center justify-center gap-2 active:scale-95'),
};
