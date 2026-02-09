import { shared } from '../../styles/shared';
import { cn } from '../../lib/utils';

export const styles = {
  // Success screen
  successRoot: cn(shared.card, shared.cardPaddingLarge, 'text-center'),
  successIcon: 'w-14 h-14 sm:w-16 sm:h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6',
  successTitle: cn(shared.pageTitle, 'mb-2 sm:mb-3'),
  successBody: 'text-gray-500 text-sm sm:text-base mb-6 sm:mb-8',
  successBtn: cn(shared.btnPrimary, shared.btnPrimaryPadding, 'inline-flex items-center justify-center gap-2 w-full sm:w-auto'),

  // Form
  formRoot: cn(shared.card, shared.cardPadding),
  headerRow: 'flex items-center justify-between mb-4 sm:mb-6',
  title: shared.pageTitle,
  subtitle: 'text-gray-500 text-sm sm:text-base mt-1',
  btnBackDesktop: shared.btnBackDesktop,
  grid: 'grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6',
  textareaWrap: 'mt-4 sm:mt-6',
  serverError: 'text-sm text-red-500 mt-4',
  footer: 'flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8',
  btnBackMobile: shared.btnBackMobile,
  btnSubmit: (isDisabled: boolean) =>
    cn(
      'w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg',
      isDisabled ? shared.btnDisabled : cn(shared.btnPrimary)
    ),
};

export const animations = {
  successFadeIn: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  },
  formFadeIn: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
  },
};
