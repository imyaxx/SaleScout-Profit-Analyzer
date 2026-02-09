export const styles = {
  // Loading skeleton
  loadingRoot: 'space-y-6 sm:space-y-8 animate-pulse py-6 sm:py-8',
  skeletonGrid: 'grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6',
  skeletonCard: 'h-24 sm:h-32 bg-gray-200 rounded-2xl',
  skeletonTwoCol: 'grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8',
  skeletonHalf: 'h-48 sm:h-64 bg-gray-200 rounded-2xl',
  skeletonFull: 'h-64 sm:h-96 bg-gray-200 rounded-2xl',

  // Error state
  errorRoot: 'flex flex-col items-center justify-center py-12 sm:py-20 px-4 text-center',
  errorIcon: 'w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6',
  errorTitle: 'text-xl font-bold mb-2',
  errorMessage: 'text-gray-500 mb-8 max-w-md',
  retryBtn: 'flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200',
};

export const animations = {
  errorFadeIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
} as const;
