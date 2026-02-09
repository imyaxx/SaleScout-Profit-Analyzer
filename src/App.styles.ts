import { shared } from './styles/shared';
import { cn } from './lib/utils';

export const styles = {
  root: 'min-h-screen bg-[#F9FAFB] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden',
  nav: 'sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100',
  navInner: cn(shared.container, 'h-14 sm:h-16 md:h-20 flex items-center justify-between'),
  logoWrap: 'flex items-center gap-2',
  logoIcon: 'w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center',
  logoLetter: 'text-white font-black text-lg sm:text-xl leading-none',
  logoText: 'font-black text-lg sm:text-xl tracking-tight hidden sm:inline',
  langWrap: 'flex items-center',
  langGroup: 'flex items-center gap-0.5 sm:gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1',
  langBtn: (isActive: boolean) =>
    cn(
      'px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors min-w-[36px]',
      isActive
        ? 'bg-blue-600 text-white shadow-sm'
        : 'text-gray-600 hover:text-blue-600'
    ),
};
