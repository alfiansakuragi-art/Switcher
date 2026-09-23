import type { MarginCalculatorOptions } from './marginCalculator.js';
import { toFiniteNumber } from '../internal/toFiniteNumber.js';

export function calculateTotalCost(
  costPrice: number | string,
  options: MarginCalculatorOptions,
): number {
  const totalCost =
    toFiniteNumber(costPrice, 'costPrice') +
    toFiniteNumber(options.tax ?? 0, 'tax') +
    toFiniteNumber(options.operationalCost ?? 0, 'operationalCost') +
    toFiniteNumber(options.otherCost ?? 0, 'otherCost');

  if (!Number.isFinite(totalCost)) {
    throw new RangeError('totalCost must be finite');
  }

  return totalCost;
}
