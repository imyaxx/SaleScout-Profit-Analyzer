import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface StepWelcomeProps {
  onNext: () => void;
}

const StepWelcome: React.FC<StepWelcomeProps> = ({ onNext }) => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles size={14} />
            AI Анализ SaleScout
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-gray-900 mb-4"
          >
            Давайте проанализируем прибыль вашего магазина
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl mb-8"
          >
            Узнайте за 30 секунд, как выйти в ТОП-1 на Kaspi
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-semibold inline-flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Начать анализ
            <ArrowRight size={18} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-3xl border border-gray-100 p-8"
        >
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-100 rounded-3xl blur-2xl" />
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Короткий путь к ТОП-1
              </span>
              <span className="text-xs text-gray-400">~30 сек</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-sm font-semibold text-gray-900">Текущая позиция</p>
                <p className="text-2xl font-black text-gray-900 mt-1">#7</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-sm font-semibold text-gray-900">Цена до ТОП-1</p>
                <p className="text-2xl font-black text-blue-600 mt-1">−3 409 ₸</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-sm font-semibold text-gray-900">Рекомендации AI</p>
                <p className="text-sm text-gray-500 mt-1">
                  Оптимизируйте цену и описание — рост продаж до 15%
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
