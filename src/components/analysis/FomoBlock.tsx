/**
 * FOMO-блок — «Если бы вы начали 7 дней назад, вы бы заработали +X ₸».
 * Мотивирует пользователя показывая упущенную выгоду.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedNumber from '../ui/AnimatedNumber';
import { formatMoney } from '../../lib/utils';
import { styles, animations } from './FomoBlock.styles';

interface FomoBlockProps {
  value: number;
}

const FomoBlock: React.FC<FomoBlockProps> = ({ value }) => {
  const { t } = useTranslation();

  return (
    <motion.div {...animations.fadeIn} className={styles.root}>
      <p className={styles.kicker}>
        {t('analysis.fomo.kicker')}
      </p>
      <h4 className={styles.title}>
        {t('analysis.fomo.title')}
      </h4>
      <p className={styles.subtitle}>
        {t('analysis.fomo.subtitle')}{' '}
        <span className={styles.value}>
          <AnimatedNumber value={value} format={(val) => `+${formatMoney(val)}`} />
        </span>
      </p>
    </motion.div>
  );
};

export default FomoBlock;
