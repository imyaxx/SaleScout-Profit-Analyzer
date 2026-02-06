import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedNumber from '../ui/AnimatedNumber';
import { formatMoney, cn } from '../../lib/utils';

interface ProfitChartProps {
  currentSeries: number[];
  optimizedSeries: number[];
}

const CHART_WIDTH = 640;
const CHART_HEIGHT = 260;
const PADDING = 24;

function buildPath(values: number[], maxValue: number) {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * (CHART_WIDTH - PADDING * 2) + PADDING;
      const y = CHART_HEIGHT - PADDING - (value / maxValue) * (CHART_HEIGHT - PADDING * 2);
      return `${x},${y}`;
    })
    .join(' ');
}

const ProfitChart: React.FC<ProfitChartProps> = ({ currentSeries, optimizedSeries }) => {
  const [activeIndex, setActiveIndex] = useState(currentSeries.length - 1);
  const maxValue = useMemo(() => {
    const max = Math.max(...currentSeries, ...optimizedSeries);
    return max * 1.1;
  }, [currentSeries, optimizedSeries]);

  const currentPoints = useMemo(() => buildPath(currentSeries, maxValue), [currentSeries, maxValue]);
  const optimizedPoints = useMemo(() => buildPath(optimizedSeries, maxValue), [optimizedSeries, maxValue]);

  const activeCurrent = currentSeries[activeIndex] ?? currentSeries[currentSeries.length - 1];
  const activeOptimized = optimizedSeries[activeIndex] ?? optimizedSeries[optimizedSeries.length - 1];

  const pointsIndexes = useMemo(() => {
    const indexes: number[] = [];
    const step = 5;
    for (let i = 0; i < currentSeries.length; i += step) {
      indexes.push(i);
    }
    if (!indexes.includes(currentSeries.length - 1)) {
      indexes.push(currentSeries.length - 1);
    }
    return indexes;
  }, [currentSeries.length]);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xl shadow-blue-900/5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs uppercase font-semibold text-gray-400">Прогноз прибыли на 30 дней</p>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
            Рост продаж с интерактивной стратегией
          </h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
            <p className="text-xs text-gray-400 font-semibold uppercase">Текущая стратегия</p>
            <p className="text-lg font-bold text-gray-700">
              <AnimatedNumber value={activeCurrent} format={formatMoney} />
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3">
            <p className="text-xs text-blue-500 font-semibold uppercase">С SaleScout</p>
            <p className="text-lg font-bold text-blue-700">
              <AnimatedNumber value={activeOptimized} format={formatMoney} />
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="w-full h-[260px]"
        >
          <defs>
            <linearGradient id="salescoutLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <g>
            {[0.25, 0.5, 0.75, 1].map((ratio, idx) => (
              <line
                key={idx}
                x1={PADDING}
                x2={CHART_WIDTH - PADDING}
                y1={CHART_HEIGHT - PADDING - ratio * (CHART_HEIGHT - PADDING * 2)}
                y2={CHART_HEIGHT - PADDING - ratio * (CHART_HEIGHT - PADDING * 2)}
                stroke="#EEF2F7"
                strokeWidth="1"
              />
            ))}
          </g>

          <motion.polyline
            points={currentPoints}
            fill="none"
            stroke="#C7CCD8"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
          <motion.polyline
            points={optimizedPoints}
            fill="none"
            stroke="url(#salescoutLine)"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.1 }}
          />

          {pointsIndexes.map((index) => {
            const currentX = (index / (currentSeries.length - 1)) * (CHART_WIDTH - PADDING * 2) + PADDING;
            const currentY = CHART_HEIGHT - PADDING - (currentSeries[index] / maxValue) * (CHART_HEIGHT - PADDING * 2);
            const optimizedY = CHART_HEIGHT - PADDING - (optimizedSeries[index] / maxValue) * (CHART_HEIGHT - PADDING * 2);

            return (
              <g key={index}>
                <motion.circle
                  cx={currentX}
                  cy={currentY}
                  r={4}
                  fill="#C7CCD8"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                />
                <motion.circle
                  cx={currentX}
                  cy={optimizedY}
                  r={6}
                  fill="#2563EB"
                  className="cursor-pointer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.03 }}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              </g>
            );
          })}

          <motion.circle
            cx={(activeIndex / (currentSeries.length - 1)) * (CHART_WIDTH - PADDING * 2) + PADDING}
            cy={
              CHART_HEIGHT -
              PADDING -
              (optimizedSeries[activeIndex] / maxValue) * (CHART_HEIGHT - PADDING * 2)
            }
            r={10}
            fill="rgba(37, 99, 235, 0.2)"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </svg>

        <div className="flex items-center justify-between text-xs text-gray-400 px-2 -mt-2">
          <span>День 0</span>
          <span>День 30</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 text-xs text-gray-500">
        {['График адаптируется под изменения цены в реальном времени', 'Сценарий учитывает динамику Kaspi'].map(
          (item) => (
            <span
              key={item}
              className={cn(
                'px-3 py-1 rounded-full border border-gray-100 bg-gray-50',
                'text-gray-500'
              )}
            >
              {item}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default ProfitChart;
