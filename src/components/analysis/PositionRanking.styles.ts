import { shared } from '../../styles/shared';
import { cn } from '../../lib/utils';

export const styles = {
  root: cn(shared.sectionCard, 'p-4 sm:p-6 md:p-8 h-full flex flex-col'),
  headerRow: 'flex items-center gap-3 mb-4 sm:mb-6',
  logoWrap: 'w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0',
  logoImg: 'w-full h-full object-cover',
  kicker: shared.kicker,
  title: cn(shared.sectionTitle, 'drop-shadow-sm'),
  phoneWrap: 'relative mx-auto max-w-[280px] flex-1 flex items-center',
  phoneBg: 'w-full h-auto select-none pointer-events-none',
  overlay: 'absolute inset-0',
  listContainer: 'w-full overflow-hidden flex flex-col',
  listContainerPadding: {
    paddingTop: '58%',
    paddingBottom: '14%',
    paddingLeft: '8%',
    paddingRight: '8%',
  } as React.CSSProperties,
  listScroll: 'space-y-1 overflow-y-auto flex-1 scrollbar-none',
  sellerRow: (isHighlighted: boolean) =>
    cn(
      'px-2 py-1.5 rounded-lg border',
      isHighlighted ? 'border-red-200 bg-red-50/80' : 'border-gray-100 bg-white/90'
    ),
  sellerNameRow: 'flex items-center justify-between gap-1',
  sellerNameWrap: 'min-w-0 flex-1',
  sellerName: (isHighlighted: boolean) =>
    cn(
      'text-[10px] font-semibold truncate leading-tight',
      isHighlighted ? 'text-red-600' : 'text-gray-900'
    ),
  sellerSubtitle: 'text-[9px] text-red-400 truncate leading-tight',
  selectBtn: 'px-1.5 py-px text-[8px] font-medium rounded bg-blue-500 text-white whitespace-nowrap flex-shrink-0',
  metaRow: 'flex items-center justify-between mt-0.5',
  metaLeft: 'flex items-center gap-1',
  ratingBadge: 'flex items-center gap-0.5 text-[9px] text-gray-500 font-medium bg-gray-100 rounded px-0.5',
  starIcon: 'fill-green-500 text-green-500',
  reviewCount: 'text-[9px] text-gray-400',
  price: (isHighlighted: boolean) =>
    cn(
      'text-[10px] font-bold whitespace-nowrap',
      isHighlighted ? 'text-red-600' : 'text-gray-900'
    ),
};

export const EASE_STANDARD: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const animations = {
  layoutTransition: {
    layout: {
      type: 'tween' as const,
      duration: 1.2,
      ease: EASE_STANDARD,
    },
    opacity: { duration: 0.5, ease: EASE_STANDARD },
    y: { duration: 0.5, ease: EASE_STANDARD },
  },
  priceTween: {
    type: 'tween' as const,
    duration: 1.0,
    ease: EASE_STANDARD,
  },
  sellerItem: {
    initial: { opacity: 0, y: 4 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 4 },
  },
};
