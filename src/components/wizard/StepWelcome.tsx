import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StepWelcomeProps {
  onNext: () => void;
}

const StepWelcome: React.FC<StepWelcomeProps> = ({ onNext }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-5 sm:p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6"
          >
            <Sparkles size={14} />
            {t('welcome.badge')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 mb-3 sm:mb-4"
          >
            {t('welcome.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base sm:text-lg md:text-xl mb-6 sm:mb-8"
          >
            {t('welcome.subtitle')}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-semibold inline-flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 w-full sm:w-auto justify-center"
          >
            {t('welcome.cta')}
            <ArrowRight size={18} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-3xl border border-gray-100 p-5 sm:p-8 overflow-hidden sm:overflow-visible"
        >
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-100 rounded-3xl blur-2xl" />
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {t('welcome.card.tag')}
              </span>
              <span className="text-xs text-gray-400">{t('welcome.card.time')}</span>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-sm font-semibold text-gray-900">{t('welcome.card.currentPosition')}</p>
                <p className="text-xl sm:text-2xl font-black text-gray-900 mt-1">#7</p>
              </div>
              <div className="p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-sm font-semibold text-gray-900">{t('welcome.card.priceToTop')}</p>
                <p className="text-xl sm:text-2xl font-black text-blue-600 mt-1">−3 409 ₸</p>
              </div>
              <div className="p-3 sm:p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-sm font-semibold text-gray-900">{t('welcome.card.ai')}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {t('welcome.card.aiDesc')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StepWelcome;
