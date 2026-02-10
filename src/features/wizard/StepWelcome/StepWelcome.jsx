import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import s from './StepWelcome.module.css';

const animations = {
  badge: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  },
  title: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.1 },
  },
  subtitle: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2 },
  },
  demoCard: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay: 0.25 },
  },
};

export default function StepWelcome({ onNext }) {
  const { t } = useTranslation();

  return (
    <div className={s.root}>
      <div className={s.grid}>
        <div>
          <motion.div {...animations.badge} className={s.badge}>
            <Sparkles size={14} />
            {t('welcome.badge')}
          </motion.div>
          <motion.h1 {...animations.title} className={s.title}>
            {t('welcome.title')}
          </motion.h1>
          <motion.p {...animations.subtitle} className={s.subtitle}>
            {t('welcome.subtitle')}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className={s.ctaBtn}
          >
            {t('welcome.cta')}
            <ArrowRight size={18} />
          </motion.button>
        </div>

        <motion.div {...animations.demoCard} className={s.demoCard}>
          <div className={s.demoBlur} />
          <div className={s.demoStack}>
            <div className={s.demoHeader}>
              <span className={s.demoTag}>{t('welcome.card.tag')}</span>
              <span className={s.demoTime}>{t('welcome.card.time')}</span>
            </div>
            <div className={s.demoItems}>
              <div className={s.demoItem}>
                <p className={s.demoItemLabel}>{t('welcome.card.currentPosition')}</p>
                <p className={s.demoItemValue}>#7</p>
              </div>
              <div className={s.demoItem}>
                <p className={s.demoItemLabel}>{t('welcome.card.priceToTop')}</p>
                <p className={s.demoItemValueBlue}>−3 409 ₸</p>
              </div>
              <div className={s.demoItem}>
                <p className={s.demoItemLabel}>{t('welcome.card.ai')}</p>
                <p className={s.demoItemDesc}>{t('welcome.card.aiDesc')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
