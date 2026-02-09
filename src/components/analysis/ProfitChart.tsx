/**
 * Интерактивный SVG-график прибыли за 30 дней.
 * Две линии: текущая стратегия (серая) и с SaleScout (синяя).
 * Hover по точкам показывает значения в карточках сверху.
 */
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedNumber from '../ui/AnimatedNumber';
import { formatMoney, cn } from '../../lib/utils';
import { CHART, CHART_COLORS } from '../../constants/chart';
import { styles, animations } from './ProfitChart.styles';

interface ProfitChartProps {
  currentSeries: number[];
  optimizedSeries: number[];
}

function buildPath(values: number[], maxValue: number) {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * (CHART.WIDTH - CHART.PADDING * 2) + CHART.PADDING;
      const y = CHART.HEIGHT - CHART.PADDING - (value / maxValue) * (CHART.HEIGHT - CHART.PADDING * 2);
      return `${x},${y}`;
    })
    .join(' ');
}

const ProfitChart: React.FC<ProfitChartProps> = ({ currentSeries, optimizedSeries }) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(currentSeries.length - 1);
  const maxValue = useMemo(() => {
    const max = Math.max(...currentSeries, ...optimizedSeries);
    return max * CHART.MAX_VALUE_HEADROOM;
  }, [currentSeries, optimizedSeries]);

  const currentPoints = useMemo(() => buildPath(currentSeries, maxValue), [currentSeries, maxValue]);
  const optimizedPoints = useMemo(() => buildPath(optimizedSeries, maxValue), [optimizedSeries, maxValue]);

  const activeCurrent = currentSeries[activeIndex] ?? currentSeries[currentSeries.length - 1];
  const activeOptimized = optimizedSeries[activeIndex] ?? optimizedSeries[optimizedSeries.length - 1];

  const pointsIndexes = useMemo(() => {
    const indexes: number[] = [];
    for (let i = 0; i < currentSeries.length; i += CHART.POINT_STEP) {
      indexes.push(i);
    }
    if (!indexes.includes(currentSeries.length - 1)) {
      indexes.push(currentSeries.length - 1);
    }
    return indexes;
  }, [currentSeries.length]);

  const badges = t('analysis.profitChart.badges', { returnObjects: true });
  const badgeList = Array.isArray(badges) ? (badges as string[]) : [];

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>{t('analysis.profitChart.kicker')}</p>
          <h3 className={styles.title}>
            {t('analysis.profitChart.title')}
          </h3>
        </div>
        <div className={styles.statsRow}>
          <div className={styles.statCardCurrent}>
            <p className={cn(styles.statLabel, styles.statLabelCurrent)}>{t('analysis.profitChart.current')}</p>
            <p className={cn(styles.statValue, styles.statValueCurrent)}>
              <AnimatedNumber value={activeCurrent} format={formatMoney} />
            </p>
          </div>
          <div className={styles.statCardOptimized}>
            <p className={cn(styles.statLabel, styles.statLabelOptimized)}>{t('analysis.profitChart.withSalescout')}</p>
            <p className={cn(styles.statValue, styles.statValueOptimized)}>
              <AnimatedNumber value={activeOptimized} format={formatMoney} />
            </p>
          </div>
        </div>
      </div>

      <div className={styles.chartWrap}>
        <svg
          viewBox={`0 0 ${CHART.WIDTH} ${CHART.HEIGHT}`}
          className={styles.svg}
        >
          <defs>
            <linearGradient id="salescoutLine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.gradientStart} />
              <stop offset="100%" stopColor={CHART_COLORS.gradientEnd} />
            </linearGradient>
          </defs>
          <g>
            {CHART.GRID_LINES.map((ratio, idx) => (
              <line
                key={idx}
                x1={CHART.PADDING}
                x2={CHART.WIDTH - CHART.PADDING}
                y1={CHART.HEIGHT - CHART.PADDING - ratio * (CHART.HEIGHT - CHART.PADDING * 2)}
                y2={CHART.HEIGHT - CHART.PADDING - ratio * (CHART.HEIGHT - CHART.PADDING * 2)}
                stroke={CHART_COLORS.gridLine}
                strokeWidth="1"
              />
            ))}
          </g>

          <motion.polyline
            points={currentPoints}
            fill="none"
            stroke={CHART_COLORS.currentLine}
            strokeWidth={CHART.CURRENT_STROKE_WIDTH}
            strokeLinejoin="round"
            strokeLinecap="round"
            {...animations.currentLine}
          />
          <motion.polyline
            points={optimizedPoints}
            fill="none"
            stroke="url(#salescoutLine)"
            strokeWidth={CHART.OPTIMIZED_STROKE_WIDTH}
            strokeLinejoin="round"
            strokeLinecap="round"
            {...animations.optimizedLine}
          />

          {pointsIndexes.map((index) => {
            const currentX = (index / (currentSeries.length - 1)) * (CHART.WIDTH - CHART.PADDING * 2) + CHART.PADDING;
            const currentY = CHART.HEIGHT - CHART.PADDING - (currentSeries[index] / maxValue) * (CHART.HEIGHT - CHART.PADDING * 2);
            const optimizedY = CHART.HEIGHT - CHART.PADDING - (optimizedSeries[index] / maxValue) * (CHART.HEIGHT - CHART.PADDING * 2);

            return (
              <g key={index}>
                <motion.circle
                  cx={currentX}
                  cy={currentY}
                  r={CHART.CURRENT_DOT_RADIUS}
                  fill={CHART_COLORS.currentDot}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                />
                <motion.circle
                  cx={currentX}
                  cy={optimizedY}
                  r={CHART.OPTIMIZED_DOT_RADIUS}
                  fill={CHART_COLORS.optimizedDot}
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
            cx={(activeIndex / (currentSeries.length - 1)) * (CHART.WIDTH - CHART.PADDING * 2) + CHART.PADDING}
            cy={
              CHART.HEIGHT -
              CHART.PADDING -
              (optimizedSeries[activeIndex] / maxValue) * (CHART.HEIGHT - CHART.PADDING * 2)
            }
            r={CHART.ACTIVE_PULSE_RADIUS}
            fill={CHART_COLORS.activePulse}
            {...animations.pulse}
          />
        </svg>

        <div className={styles.axisRow}>
          <span>{t('analysis.profitChart.day', { day: 0 })}</span>
          <span>{t('analysis.profitChart.day', { day: 30 })}</span>
        </div>
      </div>

      <div className={styles.badgeRow}>
        {badgeList.map((item) => (
          <span key={item} className={styles.badge}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfitChart;
