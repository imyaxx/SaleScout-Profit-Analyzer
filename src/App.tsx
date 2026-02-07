
import React from 'react';
import { useTranslation } from 'react-i18next';
import AiProfitAnalyzerPage from './pages/AiProfitAnalyzerPage';

const App: React.FC = () => {
  const { i18n } = useTranslation();
  const languages = [
    { code: 'ru', label: 'RU' },
    { code: 'kk', label: 'KZ' },
    { code: 'en', label: 'EN' }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Fake Navigation Bar for Context */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 h-14 sm:h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg sm:text-xl leading-none">S</span>
            </div>
            <span className="font-black text-lg sm:text-xl tracking-tight hidden sm:inline">SaleScout</span>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-0.5 sm:gap-1 bg-gray-50 border border-gray-200 rounded-xl p-1">
              {languages.map((language) => {
                const isActive = i18n.language === language.code;
                return (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => i18n.changeLanguage(language.code)}
                    aria-pressed={isActive}
                    className={[
                      'px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors min-w-[36px]',
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-blue-600'
                    ].join(' ')}
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
