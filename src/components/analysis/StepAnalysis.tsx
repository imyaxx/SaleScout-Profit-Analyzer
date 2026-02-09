/**
 * Шаг 3 — Результат анализа.
 * Собирает данные из KaspiAnalysis, строит график прибыли,
 * FOMO-блок, симулятор цен и рейтинг продавцов.
 */
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { KaspiAnalysis } from '../../types';
import { LoadingState, ErrorState } from '../ui/States';
import ProfitChart from './ProfitChart';
import FomoBlock from './FomoBlock';
import PositionRanking from './PositionRanking';
import PriceSimulator from './PriceSimulator';
import ErrorBoundary from '../ui/ErrorBoundary';
import { buildMiniRating, computeSimulatedUser } from '../../lib/miniSellerRanking';
import { DEMO_ANALYSIS_DATA } from '../../constants/demo';
import {
  FORECAST_DAYS,
  MARGIN_FRACTION,
  SALESCOUT_BOOST,
  CURRENT_GROWTH_RATE,
  OPTIMIZED_GROWTH_RATE,
  PROFIT_RANGE,
  FOMO_DAYS,
} from '../../constants/analysis';
import { styles, animations } from './StepAnalysis.styles';

interface StepAnalysisProps {
  analysis: KaspiAnalysis | null;
  isLoading: boolean;
  error: string | null;
  shopName: string;
  onRetry: () => void;
  onNext: () => void;
  onBack: () => void;
}

const toNumber = (value: number | null | undefined, fallback = 0) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
};

const safeString = (value: string | undefined | null, fallback: string) => String(value ?? fallback);

const normalizeShopKey = (value: string | undefined | null) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/["«»''`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const StepAnalysis: React.FC<StepAnalysisProps> = ({ analysis, isLoading, error, shopName, onRetry, onNext, onBack }) => {
  const { t, i18n } = useTranslation();
  const unknownSeller = t('analysis.unknownSeller');

  const viewState = isLoading ? 'loading' : error ? 'error' : analysis ? 'success' : 'idle';
  const effectiveAnalysis = analysis ?? DEMO_ANALYSIS_DATA;

  const leaderPrice = toNumber(effectiveAnalysis.leaderPrice, 0);
  const basePrice = toNumber(effectiveAnalysis.myShopPrice ?? leaderPrice, leaderPrice);
  const basePosition = toNumber(effectiveAnalysis.myShopPosition ?? 1, 1);
  const priceToTop1 = basePrice - leaderPrice;

  const chartData = useMemo(() => {
    const base = Math.max(basePrice, leaderPrice);
    const baseline = Math.round(base * MARGIN_FRACTION);

    const currentSeries = Array.from({ length: FORECAST_DAYS }, (_, day) => {
      const growth = 1 + day * CURRENT_GROWTH_RATE;
      return Math.round(baseline * growth);
    });

    const optimizedSeries = Array.from({ length: FORECAST_DAYS }, (_, day) => {
      const growth = 1 + day * OPTIMIZED_GROWTH_RATE;
      return Math.round(baseline * SALESCOUT_BOOST * growth);
    });

    return { currentSeries, optimizedSeries };
  }, [basePrice, leaderPrice]);

  const profitLow = useMemo(() => Math.round(chartData.optimizedSeries[30] * PROFIT_RANGE.low), [chartData]);
  const profitHigh = useMemo(() => Math.round(chartData.optimizedSeries[30] * PROFIT_RANGE.high), [chartData]);
  const fomoValue = Math.max(0, chartData.optimizedSeries[FOMO_DAYS] - chartData.currentSeries[FOMO_DAYS]);

  const top5Sellers = useMemo(() => {
    const offers = Array.isArray(effectiveAnalysis.offers) ? effectiveAnalysis.offers : [];
    const sorted = offers
      .map((offer) => ({
        name: safeString(offer.name, unknownSeller),
        price: toNumber(offer.price, 0),
        rating: offer.rating ?? null,
        reviewCount: offer.reviewCount ?? null
      }))
      .filter((offer) => offer.name && offer.price > 0)
      .sort((a, b) => a.price - b.price);

    const seen = new Set<string>();
    const top: { rank: number; name: string; price: number; rating: number | null; reviewCount: number | null }[] = [];
    for (const offer of sorted) {
      const key = normalizeShopKey(offer.name);
      if (!key) continue;
      if (seen.has(key)) continue;
      seen.add(key);
      top.push({
        rank: top.length + 1,
        name: offer.name,
        price: offer.price,
        rating: offer.rating,
        reviewCount: offer.reviewCount
      });
      if (top.length >= 5) break;
    }
    return top;
  }, [effectiveAnalysis.offers, i18n.language, unknownSeller]);

  const userShopBase = useMemo(() => {
    if (!effectiveAnalysis.myShopFound) return null;
    const rank = effectiveAnalysis.myShopPosition;
    const price = effectiveAnalysis.myShopPrice;
    if (!Number.isFinite(Number(rank)) || !Number.isFinite(Number(price))) return null;

    const normalizedTarget = normalizeShopKey(shopName);
    const offers = Array.isArray(effectiveAnalysis.offers) ? effectiveAnalysis.offers : [];
    const matched = normalizedTarget
      ? offers.find(
          (offer) => normalizeShopKey(safeString(offer.name, unknownSeller)) === normalizedTarget
        )
      : null;

    const matchedName = matched ? safeString(matched.name, unknownSeller) : safeString(shopName, unknownSeller);
    return {
      rankBase: Number(rank),
      priceBase: Number(price),
      name: matchedName,
      rating: matched?.rating ?? null,
      reviewCount: matched?.reviewCount ?? null
    };
  }, [
    effectiveAnalysis.myShopFound,
    effectiveAnalysis.myShopPosition,
    effectiveAnalysis.myShopPrice,
    effectiveAnalysis.offers,
    shopName,
    i18n.language,
    unknownSeller
  ]);

  const baseComputedUser = useMemo(
    () => computeSimulatedUser(userShopBase, 0),
    [userShopBase]
  );

  const rankingRenderList = useMemo(
    () =>
      buildMiniRating(top5Sellers, baseComputedUser, shopName, {
        userTitle: t('analysis.ranking.yourShop')
      }),
    [top5Sellers, baseComputedUser, shopName, i18n.language, t]
  );

  if (viewState === 'loading') {
    return <LoadingState />;
  }

  if (viewState === 'error') {
    return (
      <div className={styles.errorWrap}>
        <button onClick={onBack} className={styles.btnBackDesktop}>
          <ArrowLeft size={16} />
          {t('input.back')}
        </button>
        <ErrorState message={error ?? t('analysis.error')} onRetry={onRetry} />
        <button onClick={onBack} className={styles.btnBackMobile}>
          <ArrowLeft size={16} />
          {t('input.back')}
        </button>
      </div>
    );
  }

  const dateLocale =
    i18n.language === 'kk' ? 'kk-KZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU';
  const formattedDate = new Date().toLocaleDateString(dateLocale);

  return (
    <ErrorBoundary onRetry={onRetry}>
      <motion.div {...animations.fadeUp} className={styles.root}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>
            {t('analysis.title')}
            <span className={styles.dateLabel}>{t('analysis.date', { date: formattedDate })}</span>
          </h2>
          <div className={styles.headerActions}>
            <button onClick={onBack} className={styles.btnBackDesktop}>
              <ArrowLeft size={16} />
              {t('input.back')}
            </button>
            <button onClick={onNext} className={styles.ctaBtn}>
              {t('analysis.cta')}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <motion.div {...animations.section(0.05)}>
          <ProfitChart currentSeries={chartData.currentSeries} optimizedSeries={chartData.optimizedSeries} />
        </motion.div>

        <motion.div {...animations.section(0.1)}>
          <FomoBlock value={fomoValue} />
        </motion.div>

        <div className={styles.grid}>
          <motion.div {...animations.section(0.15)} className={styles.gridItemFull}>
            <PriceSimulator
              basePrice={basePrice}
              simulatedPrice={basePrice}
              leaderPrice={leaderPrice}
              leaderShop={safeString(effectiveAnalysis.leaderShop, t('analysis.unknownSeller'))}
              position={basePosition}
              priceToTop1={priceToTop1}
              profitLow={profitLow}
              profitHigh={profitHigh}
            />
          </motion.div>

          <div className={styles.gridItemFull}>
            <motion.div {...animations.section(0.2)} className={styles.gridItemFull}>
              <PositionRanking renderList={rankingRenderList} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </ErrorBoundary>
  );
};

export default StepAnalysis;
