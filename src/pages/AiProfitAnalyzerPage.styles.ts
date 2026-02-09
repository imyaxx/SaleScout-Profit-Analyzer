import { shared } from '../styles/shared';
import { cn } from '../lib/utils';

export const styles = {
  root: 'min-h-screen',
  content: cn(shared.container, 'pt-6 sm:pt-10 pb-10 md:py-16'),
  footer: 'mt-8 sm:mt-12 md:mt-20 pt-8 sm:pt-12 border-t border-gray-100 text-center px-4',
  footerText: 'text-sm text-gray-400',
};

export const animations = {
  stepTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
} as const;
