import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AnimatedNumber from '@/shared/ui/AnimatedNumber';
import { formatMoney, cn } from '@/shared/lib/utils';
import { CHART, CHART_COLORS } from '@/shared/constants/chart';
import s from './ProfitChart.module.css';

const animations = {
  currentLine: {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1.2, ease: 'easeInOut' },
  },
  optimizedLine: {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1.4, ease: 'easeInOut', delay: 0.1 },
  },
  pulse: {
    animate: { scale: [1, 1.2, 1] },
    transition: { duration: 1.6, repeat: Infinity },
  },
};

function buildPath(values, maxValue) {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * (CHART.WIDTH - CHART.PADDING * 2) + CHART.PADDING;
      const y =
        CHART.HEIGHT - CHART.PADDING - (value / maxValue) * (CHART.HEIGHT - CHART.PADDING * 2);
      return `${x},${y}`;
    })
    .join(' ');
}

export default function ProfitChart({ currentSeries, optimizedSeries }) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(currentSeries.length - 1);

  const maxValue = useMemo(() => {
    const max = Math.max(...currentSeries, ...optimizedSeries);
    return max * CHART.MAX_VALUE_HEADROOM;
  }, [currentSeries, optimizedSeries]);

  const currentPoints = useMemo(
    () => buildPath(currentSeries, maxValue),
    [currentSeries, maxValue],
  );
  const optimizedPoints = useMemo(
    () => buildPath(optimizedSeries, maxValue),
    [optimizedSeries, maxValue],
  );

  const activeCurrent = currentSeries[activeIndex] ?? currentSeries[currentSeries.length - 1];
  const activeOptimized =
    optimizedSeries[activeIndex] ?? optimizedSeries[optimizedSeries.length - 1];

  const pointsIndexes = useMemo(() => {
    const indexes = [];
    for (let i = 0; i < currentSeries.length; i += CHART.POINT_STEP) {
      indexes.push(i);
    }
    if (!indexes.includes(currentSeries.length - 1)) {
      indexes.push(currentSeries.length - 1);
    }
    return indexes;
  }, [currentSeries.length]);

  const badges = t('analysis.profitChart.badges', { returnObjects: true });
  const badgeList = Array.isArray(badges) ? badges : [];

  return (
    <div className={s.root}>
      <div className={s.header}>
        <div>
          <p className={s.kicker}>{t('analysis.profitChart.kicker')}</p>
          <h3 className={s.title}>{t('analysis.profitChart.title')}</h3>
        </div>
        <div className={s.statsRow}>
          <div className={s.statCardCurrent}>
            <p className={cn(s.statLabel, s.statLabelCurrent)}>
              {t('analysis.profitChart.current')}
            </p>
            <p className={cn(s.statValue, s.statValueCurrent)}>
              <AnimatedNumber value={activeCurrent} format={formatMoney} />
            </p>
          </div>
          <div className={s.statCardOptimized}>
            <p className={cn(s.statLabel, s.statLabelOptimized)}>
              {t('analysis.profitChart.withSalescout')}
            </p>
            <p className={cn(s.statValue, s.statValueOptimized)}>
              <AnimatedNumber value={activeOptimized} format={formatMoney} />
            </p>
          </div>
        </div>
      </div>

      <div className={s.chartWrap}>
        <svg viewBox={`0 0 ${CHART.WIDTH} ${CHART.HEIGHT}`} className={s.svg}>
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
            const cx =
              (index / (currentSeries.length - 1)) * (CHART.WIDTH - CHART.PADDING * 2) +
              CHART.PADDING;
            const currentY =
              CHART.HEIGHT -
              CHART.PADDING -
              (currentSeries[index] / maxValue) * (CHART.HEIGHT - CHART.PADDING * 2);
            const optimizedY =
              CHART.HEIGHT -
              CHART.PADDING -
              (optimizedSeries[index] / maxValue) * (CHART.HEIGHT - CHART.PADDING * 2);

            return (
              <g key={index}>
                <motion.circle
                  cx={cx}
                  cy={currentY}
                  r={CHART.CURRENT_DOT_RADIUS}
                  fill={CHART_COLORS.currentDot}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                />
                <motion.circle
                  cx={cx}
                  cy={optimizedY}
                  r={CHART.OPTIMIZED_DOT_RADIUS}
                  fill={CHART_COLORS.optimizedDot}
                  className={s.cursorPointer}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.03 }}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              </g>
            );
          })}

          <motion.circle
            cx={
              (activeIndex / (currentSeries.length - 1)) * (CHART.WIDTH - CHART.PADDING * 2) +
              CHART.PADDING
            }
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

        <div className={s.axisRow}>
          <span>{t('analysis.profitChart.day', { day: 0 })}</span>
          <span>{t('analysis.profitChart.day', { day: 30 })}</span>
        </div>
      </div>

      <div className={s.badgeRow}>
        {badgeList.map((item) => (
          <span key={item} className={s.badge}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
