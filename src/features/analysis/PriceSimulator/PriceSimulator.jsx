import { motion } from 'framer-motion';
import { TrendingDown, ArrowDownRight, ArrowUpRight, Trophy, Store } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedNumber from '@/shared/ui/AnimatedNumber';
import { formatMoney, cn } from '@/shared/lib/utils';
import s from './PriceSimulator.module.css';

const animations = {
  scaleIn: (delay) => ({
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { delay, type: 'spring', stiffness: 200 },
  }),
  leaderFadeIn: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.3 },
  },
};

export default function PriceSimulator({
  basePrice,
  simulatedPrice,
  leaderPrice,
  leaderShop,
  position,
  priceToTop1,
  profitLow,
  profitHigh,
}) {
  const { t } = useTranslation();
  const delta = simulatedPrice - basePrice;
  const isTop1 = position === 1;

  return (
    <div className={s.root}>
      <div className={s.headerRow}>
        <div>
          <p className={s.kicker}>{t('analysis.simulator.kicker')}</p>
          <h3 className={s.title}>{t('analysis.simulator.title')}</h3>
        </div>
        <div className={s.headerIcon}>
          <TrendingDown size={18} />
        </div>
      </div>

      <div className={s.grid}>
        <div className={s.metricCard}>
          <p className={s.metricLabel}>{t('analysis.simulator.newPrice')}</p>
          <p className={s.metricValue}>
            <AnimatedNumber value={simulatedPrice} format={formatMoney} />
          </p>
          <div className={delta < 0 ? s.deltaGreen : delta > 0 ? s.deltaRed : s.deltaNeutral}>
            {delta < 0 ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
            {delta < 0
              ? t('analysis.simulator.decrease')
              : delta > 0
                ? t('analysis.simulator.increase')
                : t('analysis.simulator.noChange')}{' '}
            {t('analysis.simulator.relative')}
          </div>
        </div>

        <div className={s.metricCard}>
          <p className={s.metricLabel}>{t('analysis.simulator.position')}</p>
          <p className={s.metricValue}>#{position}</p>
          <div className={cn(s.positionHint, isTop1 && s.positionHintTop1)}>
            {isTop1
              ? t('analysis.simulator.top1')
              : t('analysis.simulator.toTop1', { price: formatMoney(Math.max(priceToTop1, 0)) })}
          </div>
        </div>

        <div className={s.profitCard}>
          <p className={s.metricLabel}>{t('analysis.simulator.profit')}</p>
          <p className={s.metricValue}>
            <AnimatedNumber value={profitLow} format={formatMoney} /> –{' '}
            <AnimatedNumber value={profitHigh} format={formatMoney} />
          </p>
          <p className={s.profitModel}>{t('analysis.simulator.model')}</p>
        </div>

        <motion.div {...animations.leaderFadeIn} className={s.leaderCard}>
          <div className={s.leaderInner}>
            <div className={s.leaderHeaderRow}>
              <div className={s.leaderIcon}>
                <Store size={16} />
              </div>
              <div className={s.leaderName}>
                <p className={s.leaderLabel}>{t('analysis.simulator.leaderTitle')}</p>
                <p className={s.leaderShopName}>{leaderShop}</p>
              </div>
            </div>

            <div className={s.leaderFooter}>
              <div>
                <p className={s.leaderPriceLabel}>{t('analysis.simulator.leaderPriceLabel')}</p>
                <p className={s.leaderPriceValue}>
                  <AnimatedNumber value={leaderPrice} format={formatMoney} />
                </p>
              </div>

              {isTop1 ? (
                <motion.div {...animations.scaleIn(0.5)} className={s.badgeTop1}>
                  <Trophy size={12} />
                  {t('analysis.simulator.top1')}
                </motion.div>
              ) : (
                <motion.div {...animations.scaleIn(0.5)} className={s.badgeGap}>
                  <ArrowDownRight size={12} />
                  <AnimatedNumber
                    value={Math.max(priceToTop1, 0)}
                    format={(v) => `−${formatMoney(v)}`}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
