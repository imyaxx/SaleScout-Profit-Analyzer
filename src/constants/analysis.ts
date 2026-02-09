/**
 * Analysis calculation constants.
 */

/** Number of days in forecast (0..30 = 31 points) */
export const FORECAST_DAYS = 31;

/** Margin as fraction of base price for baseline profit */
export const MARGIN_FRACTION = 0.26;

/** SaleScout boost multiplier for optimized series */
export const SALESCOUT_BOOST = 1.15;

/** Daily growth rate — current strategy */
export const CURRENT_GROWTH_RATE = 0.014;

/** Daily growth rate — with SaleScout */
export const OPTIMIZED_GROWTH_RATE = 0.022;

/** Profit range multipliers (low/high) */
export const PROFIT_RANGE = { low: 0.92, high: 1.12 } as const;

/** Days used for FOMO "missed profit" calculation */
export const FOMO_DAYS = 7;
