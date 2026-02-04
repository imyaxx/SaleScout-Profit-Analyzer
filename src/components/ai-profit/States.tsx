
import React from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Target, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Onboarding: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: "Найдите товар",
      desc: "Скопируйте ссылку на любой товар из маркетплейса"
    },
    {
      icon: Target,
      title: "Укажите магазин",
      desc: "Введите название вашего магазина для сравнения"
    },
    {
      icon: TrendingUp,
      title: "Получите анализ",
      desc: "Искусственный интеллект рассчитает вашу выгоду и даст советы"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
      {steps.map((step, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <step.icon size={24} />
          </div>
          <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export const LoadingState: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 bg-gray-200 rounded-2xl"></div>
        <div className="h-64 bg-gray-200 rounded-2xl"></div>
      </div>
      <div className="h-96 bg-gray-200 rounded-2xl"></div>
    </div>
  );
};

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>
      <h3 className="text-xl font-bold mb-2">Упс, что-то пошло не так</h3>
      <p className="text-gray-500 mb-8 max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
      >
        <RefreshCw size={18} />
        Попробовать снова
      </button>
    </motion.div>
  );
};
