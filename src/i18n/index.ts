/**
 * i18n configuration — multi-language support.
 * Languages: ru (Russian), kk (Kazakh), en (English).
 * Selected language is persisted in localStorage.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ru } from './locales/ru';
import { kk } from './locales/kk';
import { en } from './locales/en';

const resources = { ru, kk, en };

const supportedLanguages = ['ru', 'kk', 'en'] as const;
const storageKey = 'salescout-lang';

/** Determines initial language: from localStorage or ru by default */
const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'ru';
  const saved = window.localStorage.getItem(storageKey);
  if (saved && supportedLanguages.includes(saved as (typeof supportedLanguages)[number])) {
    return saved;
  }
  return 'ru';
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'ru',
  supportedLngs: [...supportedLanguages],
  interpolation: {
    escapeValue: false
  }
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language;
}

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(storageKey, lng);
  }
});

export const languageOptions = supportedLanguages;
export default i18n;
