import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import s from './States.module.css';

const errorFadeIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
};

export function LoadingState() {
  return (
    <div className={s.loadingRoot}>
      <div className={s.skeletonGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={s.skeletonCard} />
        ))}
      </div>
      <div className={s.skeletonTwoCol}>
        <div className={s.skeletonHalf} />
        <div className={s.skeletonHalf} />
      </div>
      <div className={s.skeletonFull} />
    </div>
  );
}

export function ErrorState({ message, onRetry }) {
  const { t } = useTranslation();

  return (
    <motion.div {...errorFadeIn} className={s.errorRoot}>
      <div className={s.errorIcon}>
        <AlertCircle size={32} />
      </div>
      <h3 className={s.errorTitle}>{t('errors.genericTitle')}</h3>
      <p className={s.errorMessage}>{message}</p>
      <button onClick={onRetry} className={s.retryBtn}>
        <RefreshCw size={18} />
        {t('errors.retry')}
      </button>
    </motion.div>
  );
}
