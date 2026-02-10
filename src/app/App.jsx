import { useTranslation } from 'react-i18next';
import AiProfitAnalyzerPage from '@/pages/AiProfitAnalyzerPage';
import { cn } from '@/shared/lib/utils';
import s from './App.module.css';

const languages = [
  { code: 'ru', label: 'RU' },
  { code: 'kk', label: 'KZ' },
  { code: 'en', label: 'EN' },
];

export default function App() {
  const { i18n } = useTranslation();

  return (
    <div className={s.root}>
      <nav className={s.nav}>
        <div className={s.navInner}>
          <div className={s.logoWrap}>
            <div className={s.logoIcon}>
              <span className={s.logoLetter}>S</span>
            </div>
            <span className={s.logoText}>SaleScout</span>
          </div>

          <div className={s.langWrap}>
            <div className={s.langGroup}>
              {languages.map((language) => {
                const isActive = i18n.language === language.code;
                return (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => i18n.changeLanguage(language.code)}
                    aria-pressed={isActive}
                    className={cn(s.langBtn, isActive && s.langBtnActive)}
                  >
                    {language.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <AiProfitAnalyzerPage />
      </main>
    </div>
  );
}
