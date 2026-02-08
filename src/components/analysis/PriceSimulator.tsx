import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, ArrowDownRight, ArrowUpRight, Trophy, Store } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedNumber from '../ui/AnimatedNumber';
import { cn, formatMoney } from '../../lib/utils';

interface PriceSimulatorProps {
  percent: number;
  onChange: (value: number) => void;
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
  percent,
  onChange,
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
    <div className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-6 md:p-8 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <p className="text-xs uppercase font-semibold text-gray-400">{t('analysis.simulator.kicker')}</p>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">{t('analysis.simulator.title')}</h3>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
          <TrendingDown size={18} />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6">
        <div className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-3">
          <span>{t('analysis.simulator.drop')}</span>
          <span className="text-blue-600">{percent === 0 ? '0%' : `−${percent.toFixed(1)}%`}</span>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={percent}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-blue-600 h-2"
        />
        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
          <span>0%</span>
          <span>−5%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="p-3 sm:p-4 rounded-2xl border border-gray-100 bg-white">
          <p className="text-[10px] sm:text-xs uppercase text-gray-400 font-semibold">{t('analysis.simulator.newPrice')}</p>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
            <AnimatedNumber value={simulatedPrice} format={formatMoney} />
          </p>
          <div
            className={cn(
              'text-xs mt-2 flex items-center gap-1',
              delta < 0 ? 'text-green-600' : delta > 0 ? 'text-red-500' : 'text-gray-400'
            )}
          >
            {delta < 0 ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
            {delta < 0 ? t('analysis.simulator.decrease') : delta > 0 ? t('analysis.simulator.increase') : t('analysis.simulator.noChange')}{' '}
            {t('analysis.simulator.relative')}
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl border border-gray-100 bg-white">
          <p className="text-[10px] sm:text-xs uppercase text-gray-400 font-semibold">{t('analysis.simulator.position')}</p>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">#{position}</p>
          <div className={cn('text-[10px] sm:text-xs mt-2', isTop1 ? 'text-green-600' : 'text-blue-600')}>
            {isTop1
              ? t('analysis.simulator.top1')
              : t('analysis.simulator.toTop1', { price: formatMoney(Math.max(priceToTop1, 0)) })}
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-2xl border border-gray-100 bg-white col-span-2">
          <p className="text-[10px] sm:text-xs uppercase text-gray-400 font-semibold">{t('analysis.simulator.profit')}</p>
          <p className="text-base sm:text-lg font-bold text-gray-900 mt-1">
            <AnimatedNumber value={profitLow} format={formatMoney} /> –{' '}
            <AnimatedNumber value={profitHigh} format={formatMoney} />
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {t('analysis.simulator.model')}
          </p>
        </div>
      </div>

      {/* Market Leader Card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-3 sm:mt-4"
      >
        <div className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
          {/* Header: icon + title */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Store size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs uppercase font-semibold text-gray-400 tracking-wider">
                {t('analysis.simulator.leaderTitle')}
              </p>
              <p className="text-sm sm:text-base font-bold text-gray-900 truncate">
                {leaderShop}
              </p>
            </div>
          </div>

          {/* Price + delta */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-400 font-medium">
                {t('analysis.simulator.leaderPriceLabel')}
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">
                <AnimatedNumber value={leaderPrice} format={formatMoney} />
              </p>
            </div>

            {isTop1 ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-500 text-white text-xs font-semibold shadow-lg shadow-green-200/50"
              >
                <Trophy size={12} />
                {t('analysis.simulator.top1')}
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-lg shadow-blue-200/50"
              >
                <ArrowDownRight size={12} />
                <AnimatedNumber value={Math.max(priceToTop1, 0)} format={(v) => `−${formatMoney(v)}`} />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PriceSimulator;
