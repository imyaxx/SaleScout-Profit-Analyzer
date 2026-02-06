import React from 'react';
import { motion } from 'framer-motion';

interface ConfidenceMeterProps {
  value: number;
}

const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ value }) => {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase font-semibold text-gray-400">Confidence meter</p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">Точность прогноза</h3>
        </div>
        <span className="text-xs text-gray-400">AI scoring</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r={radius} stroke="#EEF2F7" strokeWidth="10" fill="none" />
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#2563EB"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{value}%</span>
            <span className="text-xs text-gray-400">confidence</span>
          </div>
        </div>
        <div className="text-sm text-gray-500 leading-relaxed">
          Основано на данных Kaspi и истории категории. Чем больше данных, тем точнее прогноз.
        </div>
      </div>
    </div>
  );
};

export default ConfidenceMeter;
