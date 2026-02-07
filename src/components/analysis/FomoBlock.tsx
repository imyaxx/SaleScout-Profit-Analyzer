import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedNumber from '../ui/AnimatedNumber';
import { formatMoney } from '../../lib/utils';

interface FomoBlockProps {
  value: number;
}

const FomoBlock: React.FC<FomoBlockProps> = ({ value }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl shadow-blue-200"
    >
      <p className="text-xs sm:text-sm text-blue-100 uppercase tracking-wide font-semibold mb-1 sm:mb-2">
        {t('analysis.fomo.kicker')}
      </p>
      <h4 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">
        {t('analysis.fomo.title')}
      </h4>
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">
        {t('analysis.fomo.subtitle')}{' '}
        <span className="text-white">
          <AnimatedNumber value={value} format={(val) => `+${formatMoney(val)}`} />
        </span>
      </p>
    </motion.div>
  );
};

export default FomoBlock;
