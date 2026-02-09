import { shared } from '../../styles/shared';
import { cn } from '../../lib/utils';

export const styles = {
  root: 'bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-14 sm:top-16 md:top-20 z-40',
  inner: cn(shared.container, 'py-2.5 sm:py-4'),
  row: 'flex items-center',
  stepGroup: 'flex items-center gap-2 sm:gap-3 flex-shrink-0',
  circle: (isCompleted: boolean, isActive: boolean) =>
    cn(
      'w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border',
      isCompleted && 'bg-green-500 border-green-500 text-white',
      isActive && 'bg-blue-600 border-blue-600 text-white',
      !isCompleted && !isActive && 'bg-white border-gray-200 text-gray-400'
    ),
  label: (isCompleted: boolean, isActive: boolean) =>
    cn(
      'text-sm font-semibold hidden sm:inline',
      isCompleted && 'text-green-600',
      isActive && 'text-gray-900',
      !isCompleted && !isActive && 'text-gray-400'
    ),
  connector: (isCompleted: boolean) =>
    cn('h-[2px] w-full', isCompleted ? 'bg-green-500' : 'bg-gray-200'),
  connectorWrap: 'flex-1 mx-1.5 sm:mx-3',
};
