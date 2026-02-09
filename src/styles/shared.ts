/**
 * Shared Tailwind class-string constants.
 * Reused across multiple components' .styles.ts files.
 */
export const shared = {
  // ── Cards ──────────────────────────────────────────
  card: 'bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5',
  cardPadding: 'p-4 sm:p-6 md:p-8',
  cardPaddingLarge: 'p-5 sm:p-8 md:p-12',
  sectionCard: 'bg-white rounded-3xl border border-gray-100 shadow-sm',

  // ── Inputs ─────────────────────────────────────────
  inputBase: 'w-full pl-12 pr-4 py-3.5 bg-gray-50 border rounded-2xl focus:bg-white transition-all outline-none',
  inputNormal: 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50',
  inputError: 'border-red-300 ring-2 ring-red-50',
  inputIcon: 'absolute left-4 top-1/2 -translate-y-1/2 text-gray-400',
  inputIconTextarea: 'absolute left-4 top-4 text-gray-400',

  // ── Buttons ────────────────────────────────────────
  btnPrimary: 'bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200',
  btnPrimaryPadding: 'px-6 sm:px-8 py-3 sm:py-3.5',
  btnBackDesktop: 'hidden sm:inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 font-medium transition-colors',
  btnBackMobile: 'sm:hidden w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 hover:bg-gray-50',
  btnDisabled: 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed',

  // ── Typography ─────────────────────────────────────
  kicker: 'text-xs uppercase font-semibold text-gray-400',
  sectionTitle: 'text-lg sm:text-xl font-bold text-gray-900 mt-1',
  pageTitle: 'text-xl sm:text-2xl md:text-3xl font-bold text-gray-900',
  label: 'text-sm font-medium text-gray-700 ml-1',
  fieldError: 'text-xs text-red-500 ml-1',

  // ── Layout ─────────────────────────────────────────
  container: 'max-w-[1280px] mx-auto px-4',
} as const;
