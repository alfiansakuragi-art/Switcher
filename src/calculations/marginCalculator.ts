import { calculateTotalCost } from './costs.js';
import { toFiniteNumber } from '../internal/toFiniteNumber.js';

export interface MarginCalculatorOptions {
  tax?: number;
  otherCost?: number;
  operationalCost?: number;
}

export interface MarginDetails {
  profit: number;
  marginPercent: number;
  totalCost: number;
  status: 'profit' | 'loss' | 'breakEven';
}

export function calculateMarginDetails(
  sellingPrice: string | number,
  costPrice: string | number,
  options: MarginCalculatorOptions = {},
): MarginDetails {
  const price = toFiniteNumber(sellingPrice, 'sellingPrice');

  if (price <= 0) {
    throw new RangeError('sellingPrice must be greater than zero');
  }

  const totalCost = calculateTotalCost(costPrice, options);
  const profit = price - totalCost;
  const marginPercent = (profit / price) * 100;

  if (!Number.isFinite(profit) || !Number.isFinite(marginPercent)) {
    throw new RangeError('margin result must be finite');
  }

  const status = profit > 0 ? 'profit' : profit < 0 ? 'loss' : 'breakEven';

  return { profit, marginPercent, totalCost, status };
}

export function calculateMargin(
  sellingPrice: string | number,
  costPrice: string | number,
  options: MarginCalculatorOptions = {},
): string {
  const { profit, marginPercent, status } = calculateMarginDetails(
    sellingPrice,
    costPrice,
    options,
  );
  const legacyStatus = status === 'loss' ? 'unprofit' : status;

  return `${legacyStatus} profit: ${profit},\nmargin: ${marginPercent.toFixed(2)}%`;
}
