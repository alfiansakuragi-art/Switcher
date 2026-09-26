import { calculateTotalCost } from './costs.js';
import type { MarginCalculatorOptions } from './marginCalculator.js';
import { roundIDR, type RoundingMode } from './roundIDR.js';
import { toFiniteNumber } from '../internal/toFiniteNumber.js';

export interface SellingPriceOptions extends MarginCalculatorOptions {
  roundUnit?: number | string;
  roundMode?: RoundingMode;
}

export function calculateSellingPrice(
  costPrice: number | string,
  targetMarginPercent: number | string,
  options: SellingPriceOptions = {},
): number {
  const targetMargin = toFiniteNumber(targetMarginPercent, 'targetMarginPercent');

  if (targetMargin < 0 || targetMargin >= 100) {
    throw new RangeError('targetMarginPercent must be at least 0 and below 100');
  }

  const totalCost = calculateTotalCost(costPrice, options);

  if (totalCost <= 0) {
    throw new RangeError('totalCost must be greater than zero');
  }

  let sellingPrice = totalCost / (1 - targetMargin / 100);

  if (!Number.isFinite(sellingPrice)) {
    throw new RangeError('sellingPrice result must be finite');
  }

  if (options.roundUnit !== undefined) {
    sellingPrice = roundIDR(sellingPrice, {
      unit: options.roundUnit,
      mode: options.roundMode,
    });
  }

  return sellingPrice;
}
