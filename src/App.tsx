
import React from 'react';
import AiProfitAnalyzerPage from './pages/AiProfitAnalyzerPage';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] selection:bg-blue-100 selection:text-blue-900">
      {/* Fake Navigation Bar for Context */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl leading-none">S</span>
            </div>
            <span className="font-black text-xl tracking-tight hidden sm:inline">SaleScout</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
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
