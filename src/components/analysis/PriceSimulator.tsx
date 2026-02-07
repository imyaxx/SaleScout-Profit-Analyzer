import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedNumber from '../ui/AnimatedNumber';
import { cn, formatMoney } from '../../lib/utils';

interface PriceSimulatorProps {
  percent: number;
  onChange: (value: number) => void;
  basePrice: number;
  simulatedPrice: number;
  leaderPrice: number;
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
  position,
  priceToTop1,
  profitLow,
  profitHigh
}) => {
  const { t } = useTranslation();
  const delta = simulatedPrice - basePrice;
  const isTop1 = priceToTop1 <= 0;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-6 md:p-8 shadow-sm">
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

      <div className="mt-4 text-xs text-gray-400">
        {t('analysis.simulator.leader', { price: formatMoney(leaderPrice) })}
      </div>
    </div>
  );
};

export default PriceSimulator;
