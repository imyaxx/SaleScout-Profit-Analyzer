import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, ArrowDownRight, ArrowUpRight } from 'lucide-react';
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
  const delta = simulatedPrice - basePrice;
  const isTop1 = priceToTop1 <= 0;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase font-semibold text-gray-400">Симулятор цены</p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">А если снизить цену?</h3>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <TrendingDown size={18} />
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 md:p-5 mb-6">
        <div className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-3">
          <span>Снижение цены</span>
          <span className="text-blue-600">{percent === 0 ? '0%' : `−${percent.toFixed(1)}%`}</span>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={percent}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
          <span>0%</span>
          <span>−5%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-gray-100 bg-white">
          <p className="text-xs uppercase text-gray-400 font-semibold">Новая цена</p>
          <p className="text-lg font-bold text-gray-900 mt-1">
            <AnimatedNumber value={simulatedPrice} format={formatMoney} />
          </p>
          <div
            className={cn(
              'text-xs mt-2 flex items-center gap-1',
              delta < 0 ? 'text-green-600' : delta > 0 ? 'text-red-500' : 'text-gray-400'
            )}
          >
            {delta < 0 ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
            {delta < 0 ? 'Снижение' : delta > 0 ? 'Рост' : 'Без изменений'} относительно текущей цены
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 bg-white">
          <p className="text-xs uppercase text-gray-400 font-semibold">Позиция</p>
          <p className="text-lg font-bold text-gray-900 mt-1">#{position}</p>
          <div className={cn('text-xs mt-2', isTop1 ? 'text-green-600' : 'text-blue-600')}>
            {isTop1 ? 'Вы в ТОП-1' : `До ТОП-1: ${formatMoney(Math.max(priceToTop1, 0))}`}
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-gray-100 bg-white sm:col-span-2">
          <p className="text-xs uppercase text-gray-400 font-semibold">Прогноз прибыли</p>
          <p className="text-lg font-bold text-gray-900 mt-1">
            <AnimatedNumber value={profitLow} format={formatMoney} /> –{' '}
            <AnimatedNumber value={profitHigh} format={formatMoney} />
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Модель учитывает спрос и положение в выдаче при изменении цены
          </p>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        Лидер рынка сейчас: {formatMoney(leaderPrice)}
      </div>
    </div>
  );
};

export default PriceSimulator;
