import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedNumber from '@/shared/ui/AnimatedNumber';
import { formatMoney } from '@/shared/lib/utils';
import s from './FomoBlock.module.css';

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.15 },
};

export default function FomoBlock({ value }) {
  const { t } = useTranslation();

  return (
    <motion.div {...fadeIn} className={s.root}>
      <p className={s.kicker}>{t('analysis.fomo.kicker')}</p>
      <h4 className={s.title}>{t('analysis.fomo.title')}</h4>
      <p className={s.subtitle}>
        {t('analysis.fomo.subtitle')}{' '}
        <span className={s.value}>
          <AnimatedNumber value={value} format={(val) => `+${formatMoney(val)}`} />
        </span>
      </p>
    </motion.div>
  );
}
