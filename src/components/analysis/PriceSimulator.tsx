/**
 * Симулятор цен — показывает новую цену, позицию, прогноз прибыли
 * и карточку лидера рынка. Визуально отображает разницу до ТОП-1.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, ArrowDownRight, ArrowUpRight, Trophy, Store } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedNumber from '../ui/AnimatedNumber';
import { formatMoney } from '../../lib/utils';
import { styles, animations } from './PriceSimulator.styles';

interface PriceSimulatorProps {
  basePrice: number;
  simulatedPrice: number;
  leaderPrice: number;
  leaderShop: string;
  position: number;
  priceToTop1: number;
  profitLow: number;
  profitHigh: number;
}

const PriceSimulator: React.FC<PriceSimulatorProps> = ({
  basePrice,
  simulatedPrice,
  leaderPrice,
  leaderShop,
  position,
  priceToTop1,
  profitLow,
  profitHigh
}) => {
  const { t } = useTranslation();
  const delta = simulatedPrice - basePrice;
  const isTop1 = position === 1;

  return (
    <div className={styles.root}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.kicker}>{t('analysis.simulator.kicker')}</p>
          <h3 className={styles.title}>{t('analysis.simulator.title')}</h3>
        </div>
        <div className={styles.headerIcon}>
          <TrendingDown size={18} />
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.metricCard}>
          <p className={styles.metricLabel}>{t('analysis.simulator.newPrice')}</p>
          <p className={styles.metricValue}>
            <AnimatedNumber value={simulatedPrice} format={formatMoney} />
          </p>
          <div
            className={
              delta < 0 ? styles.deltaGreen : delta > 0 ? styles.deltaRed : styles.deltaNeutral
            }
          >
            {delta < 0 ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
            {delta < 0 ? t('analysis.simulator.decrease') : delta > 0 ? t('analysis.simulator.increase') : t('analysis.simulator.noChange')}{' '}
            {t('analysis.simulator.relative')}
          </div>
        </div>

        <div className={styles.metricCard}>
          <p className={styles.metricLabel}>{t('analysis.simulator.position')}</p>
          <p className={styles.metricValue}>#{position}</p>
          <div className={styles.positionHint(isTop1)}>
            {isTop1
              ? t('analysis.simulator.top1')
              : t('analysis.simulator.toTop1', { price: formatMoney(Math.max(priceToTop1, 0)) })}
          </div>
        </div>

        <div className={styles.profitCard}>
          <p className={styles.metricLabel}>{t('analysis.simulator.profit')}</p>
          <p className={styles.metricValue}>
            <AnimatedNumber value={profitLow} format={formatMoney} /> –{' '}
            <AnimatedNumber value={profitHigh} format={formatMoney} />
          </p>
          <p className={styles.profitModel}>
            {t('analysis.simulator.model')}
          </p>
        </div>

        {/* Market Leader Card */}
        <motion.div {...animations.leaderFadeIn} className={styles.leaderCard}>
          <div className={styles.leaderInner}>
            <div className={styles.leaderHeaderRow}>
              <div className={styles.leaderIcon}>
                <Store size={16} />
              </div>
              <div className={styles.leaderName}>
                <p className={styles.leaderLabel}>
                  {t('analysis.simulator.leaderTitle')}
                </p>
                <p className={styles.leaderShopName}>
                  {leaderShop}
                </p>
              </div>
            </div>

            <div className={styles.leaderFooter}>
              <div>
                <p className={styles.leaderPriceLabel}>
                  {t('analysis.simulator.leaderPriceLabel')}
                </p>
                <p className={styles.leaderPriceValue}>
                  <AnimatedNumber value={leaderPrice} format={formatMoney} />
                </p>
              </div>

              {isTop1 ? (
                <motion.div {...animations.scaleIn(0.5)} className={styles.badgeTop1}>
                  <Trophy size={12} />
                  {t('analysis.simulator.top1')}
                </motion.div>
              ) : (
                <motion.div {...animations.scaleIn(0.5)} className={styles.badgeGap}>
                  <ArrowDownRight size={12} />
                  <AnimatedNumber value={Math.max(priceToTop1, 0)} format={(v) => `−${formatMoney(v)}`} />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PriceSimulator;
