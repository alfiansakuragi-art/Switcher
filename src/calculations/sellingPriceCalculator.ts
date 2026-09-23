import { calculateTotalCost } from './costs.js';
import type { MarginCalculatorOptions } from './marginCalculator.js';
import { toFiniteNumber } from '../internal/toFiniteNumber.js';

export function calculateSellingPrice(
  costPrice: number | string,
  targetMarginPercent: number | string,
  options: MarginCalculatorOptions = {},
): number {
  const targetMargin = toFiniteNumber(targetMarginPercent, 'targetMarginPercent');

  if (targetMargin < 0 || targetMargin >= 100) {
    throw new RangeError('targetMarginPercent must be at least 0 and below 100');
  }

  const totalCost = calculateTotalCost(costPrice, options);

  if (totalCost <= 0) {
    throw new RangeError('totalCost must be greater than zero');
  }

  const sellingPrice = totalCost / (1 - targetMargin / 100);

  if (!Number.isFinite(sellingPrice)) {
    throw new RangeError('sellingPrice result must be finite');
  }

  return sellingPrice;
}
