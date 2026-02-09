/**
 * Корневой компонент приложения.
 * Содержит навбар с переключателем языка (RU / KZ / EN)
 * и рендерит основную страницу анализа.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import AiProfitAnalyzerPage from './pages/AiProfitAnalyzerPage';
import { styles } from './App.styles';

const App: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ru', label: 'RU' },
    { code: 'kk', label: 'KZ' },
    { code: 'en', label: 'EN' }
  ];

  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.logoWrap}>
            <div className={styles.logoIcon}>
              <span className={styles.logoLetter}>S</span>
            </div>
            <span className={styles.logoText}>SaleScout</span>
          </div>

          <div className={styles.langWrap}>
            <div className={styles.langGroup}>
              {languages.map((language) => {
                const isActive = i18n.language === language.code;
                return (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => i18n.changeLanguage(language.code)}
                    aria-pressed={isActive}
                    className={styles.langBtn(isActive)}
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
};

export default App;
