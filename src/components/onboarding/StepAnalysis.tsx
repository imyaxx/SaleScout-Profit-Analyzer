import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { KaspiAnalysis } from '../../types';
import { LoadingState, ErrorState } from '../ai-profit/States';
import ProfitChart from './analysis/ProfitChart';
import FomoBlock from './analysis/FomoBlock';
import PositionRanking, { PositionItem } from './analysis/PositionRanking';
import PriceSimulator from './analysis/PriceSimulator';
import ConfidenceMeter from './analysis/ConfidenceMeter';
import AnalysisTimer from './analysis/AnalysisTimer';
import ErrorBoundary from './analysis/ErrorBoundary';

interface StepAnalysisProps {
  analysis: KaspiAnalysis | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  onNext: () => void;
}

const demoAnalysisData: KaspiAnalysis = {
  productId: 'demo',
  leaderShop: 'Gadget One',
  leaderPrice: 739474,
  myShopFound: true,
  myShopPrice: 742883,
  myShopPosition: 7,
  priceToTop1: 3409,
  offers: [
    { name: 'Gadget One', price: 739474 },
    { name: 'Kaspi Pro', price: 741120 },
    { name: 'Smart Devices', price: 742200 },
    { name: 'Top Seller', price: 742500 },
    { name: 'Ваш магазин', price: 742883 }
  ]
};

const toNumber = (value: number | null | undefined, fallback = 0) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
};

const safeString = (value: string | undefined | null, fallback = 'Неизвестный продавец') =>
  String(value ?? fallback);

const StepAnalysis: React.FC<StepAnalysisProps> = ({ analysis, isLoading, error, onRetry, onNext }) => {
  const [priceDropPercent, setPriceDropPercent] = useState(0);

  const viewState = isLoading ? 'loading' : error ? 'error' : analysis ? 'success' : 'idle';
  const effectiveAnalysis = analysis ?? demoAnalysisData;

  const leaderPrice = toNumber(effectiveAnalysis.leaderPrice, 0);
  const basePrice = toNumber(effectiveAnalysis.myShopPrice ?? leaderPrice, leaderPrice);
  const basePosition = toNumber(effectiveAnalysis.myShopPosition ?? 1, 1);

  const simulatedPrice = Math.max(0, Math.round(basePrice * (1 - priceDropPercent / 100)));
  const priceToTop1 = simulatedPrice - leaderPrice;

  const simulatedPosition = useMemo(() => {
    const maxGain = Math.min(5, Math.max(basePosition - 1, 0));
    const improvement = Math.round((priceDropPercent / 5) * maxGain);
    return Math.max(1, basePosition - improvement);
  }, [basePosition, priceDropPercent]);

  const chartData = useMemo(() => {
    const days = 31;
    const base = Math.max(basePrice, leaderPrice);
    const baseline = Math.round(base * 0.26);
    const salescoutBoost = 1.15 + (priceDropPercent / 5) * 0.18;

    const currentSeries = Array.from({ length: days }, (_, day) => {
      const growth = 1 + day * 0.014;
      return Math.round(baseline * growth);
    });

    const optimizedSeries = Array.from({ length: days }, (_, day) => {
      const growth = 1 + day * 0.022;
      return Math.round(baseline * salescoutBoost * growth);
    });

    return { currentSeries, optimizedSeries };
  }, [basePrice, leaderPrice, priceDropPercent]);

  const profitLow = useMemo(() => Math.round(chartData.optimizedSeries[30] * 0.92), [chartData]);
  const profitHigh = useMemo(() => Math.round(chartData.optimizedSeries[30] * 1.12), [chartData]);
  const fomoValue = Math.max(0, chartData.optimizedSeries[7] - chartData.currentSeries[7]);

  const rankingItems = useMemo(() => {
    const offers = Array.isArray(effectiveAnalysis.offers) ? effectiveAnalysis.offers : [];
    const sorted = offers
      .map((offer, index) => ({
        id: `offer-${index}-${offer.name}`,
        name: safeString(offer.name),
        price: toNumber(offer.price, 0)
      }))
      .sort((a, b) => a.price - b.price);

    const userItem: PositionItem = {
      id: 'my-shop',
      name: 'Ваш магазин',
      price: simulatedPrice,
      isUser: true
    };

    let baseList = sorted.slice(0, 4);
    const hasUser = baseList.some(
      (item) => safeString(item.name).toLowerCase() === userItem.name.toLowerCase()
    );

    if (!hasUser) {
      baseList = [...baseList, userItem];
    }

    baseList.sort((a, b) => a.price - b.price);

    if (baseList.length > 5) {
      const withoutUser = baseList.filter((item) => item.id !== 'my-shop');
      baseList = [...withoutUser.slice(0, 4), userItem];
      baseList.sort((a, b) => a.price - b.price);
    }

    const leaderId = baseList[0]?.id;

    return baseList.map((item) => ({
      ...item,
      isLeader: item.id === leaderId
    }));
  }, [effectiveAnalysis.offers, simulatedPrice]);

  if (viewState === 'loading') {
    return <LoadingState />;
  }

  if (viewState === 'error') {
    return <ErrorState message={error ?? 'Ошибка анализа'} onRetry={onRetry} />;
  }

  return (
    <ErrorBoundary onRetry={onRetry}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-10"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            Результат анализа по товару
            <span className="text-sm font-normal text-gray-400">
              / {new Date().toLocaleDateString('ru-RU')}
            </span>
          </h2>
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
          >
            Перейти к заявке
            <ArrowRight size={16} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <ProfitChart currentSeries={chartData.currentSeries} optimizedSeries={chartData.optimizedSeries} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FomoBlock value={fomoValue} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <PriceSimulator
              percent={priceDropPercent}
              onChange={setPriceDropPercent}
              basePrice={basePrice}
              simulatedPrice={simulatedPrice}
              leaderPrice={leaderPrice}
              position={simulatedPosition}
              priceToTop1={priceToTop1}
              profitLow={profitLow}
              profitHigh={profitHigh}
            />
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PositionRanking items={rankingItems} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <ConfidenceMeter value={87} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnalysisTimer />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </ErrorBoundary>
  );
};

export default StepAnalysis;
