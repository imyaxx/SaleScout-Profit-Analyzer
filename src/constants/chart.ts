/**
 * SVG chart layout and rendering constants.
 */
export const CHART = {
  WIDTH: 640,
  HEIGHT: 260,
  PADDING: 24,
  POINT_STEP: 5,
  CURRENT_DOT_RADIUS: 4,
  OPTIMIZED_DOT_RADIUS: 6,
  ACTIVE_PULSE_RADIUS: 10,
  GRID_LINES: [0.25, 0.5, 0.75, 1] as readonly number[],
  MAX_VALUE_HEADROOM: 1.1,
  CURRENT_STROKE_WIDTH: 3,
  OPTIMIZED_STROKE_WIDTH: 4,
} as const;

export const CHART_COLORS = {
  gridLine: '#EEF2F7',
  currentLine: '#C7CCD8',
  currentDot: '#C7CCD8',
  optimizedDot: '#2563EB',
  activePulse: 'rgba(37, 99, 235, 0.2)',
  gradientStart: '#2563EB',
  gradientEnd: '#4F46E5',
} as const;
