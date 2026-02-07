import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface AnalysisTimerProps {
  initialSeconds?: number;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const AnalysisTimer: React.FC<AnalysisTimerProps> = ({ initialSeconds = 7 * 60 + 32 }) => {
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 bg-white border border-gray-100 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-sm"
    >
      <Clock size={16} className="text-blue-500 flex-shrink-0" />
      <span>
        {t('analysis.timer.prefix')}{' '}
        <span className="font-semibold text-gray-900">{formatTime(seconds)}</span>
      </span>
    </motion.div>
  );
};

export default AnalysisTimer;
