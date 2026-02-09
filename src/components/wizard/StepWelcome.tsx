/**
 * Шаг 1 — Приветственный экран с демо-карточками (позиция, цена, AI).
 * Кнопка «Начать анализ» переводит на ввод данных.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { styles, animations } from './StepWelcome.styles';

interface StepWelcomeProps {
  onNext: () => void;
}

const StepWelcome: React.FC<StepWelcomeProps> = ({ onNext }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <div>
          <motion.div {...animations.badge} className={styles.badge}>
            <Sparkles size={14} />
            {t('welcome.badge')}
          </motion.div>
          <motion.h1 {...animations.title} className={styles.title}>
            {t('welcome.title')}
          </motion.h1>
          <motion.p {...animations.subtitle} className={styles.subtitle}>
            {t('welcome.subtitle')}
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className={styles.ctaBtn}
          >
            {t('welcome.cta')}
            <ArrowRight size={18} />
          </motion.button>
        </div>

        <motion.div {...animations.demoCard} className={styles.demoCard}>
          <div className={styles.demoBlur} />
          <div className={styles.demoStack}>
            <div className={styles.demoHeader}>
              <span className={styles.demoTag}>
                {t('welcome.card.tag')}
              </span>
              <span className={styles.demoTime}>{t('welcome.card.time')}</span>
            </div>
            <div className={styles.demoItems}>
              <div className={styles.demoItem}>
                <p className={styles.demoItemLabel}>{t('welcome.card.currentPosition')}</p>
                <p className={styles.demoItemValue}>#7</p>
              </div>
              <div className={styles.demoItem}>
                <p className={styles.demoItemLabel}>{t('welcome.card.priceToTop')}</p>
                <p className={styles.demoItemValueBlue}>−3 409 ₸</p>
              </div>
              <div className={styles.demoItem}>
                <p className={styles.demoItemLabel}>{t('welcome.card.ai')}</p>
                <p className={styles.demoItemDesc}>
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
