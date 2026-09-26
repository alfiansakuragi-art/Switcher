import { calculateTotalCost } from './costs.js';
import type { MarginCalculatorOptions } from './marginCalculator.js';
import { roundIDR, type RoundingMode } from './roundIDR.js';
import { toFiniteNumber } from '../internal/toFiniteNumber.js';

export interface MarkupCalculatorOptions extends MarginCalculatorOptions {
  roundUnit?: number | string;
  roundMode?: RoundingMode;
}

export interface MarkupPriceDetails {
  sellingPrice: number;
  profit: number;
  totalCost: number;
  markupPercent: number;
  marginPercent: number;
}

export interface MarkupDetails {
  profit: number;
  markupPercent: number;
  marginPercent: number;
  totalCost: number;
  status: 'profit' | 'loss' | 'breakEven';
}

export function calculateMarkupPrice(
  costPrice: number | string,
  markupPercent: number | string,
  options: MarkupCalculatorOptions = {},
): MarkupPriceDetails {
  const markup = toFiniteNumber(markupPercent, 'markupPercent');

  if (markup < 0) {
    throw new RangeError('markupPercent must be at least zero');
  }

  const totalCost = calculateTotalCost(costPrice, options);

  if (totalCost <= 0) {
    throw new RangeError('totalCost must be greater than zero');
  }

  let sellingPrice = totalCost * (1 + markup / 100);

  if (options.roundUnit !== undefined) {
    sellingPrice = roundIDR(sellingPrice, {
      unit: options.roundUnit,
      mode: options.roundMode,
    });
  }

  const profit = sellingPrice - totalCost;
  const marginPercent = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  if (
    !Number.isFinite(sellingPrice) ||
    !Number.isFinite(profit) ||
    !Number.isFinite(marginPercent)
  ) {
    throw new RangeError('markup calculation result must be finite');
  }

  return {
    sellingPrice: Number(sellingPrice.toFixed(6)),
    profit: Number(profit.toFixed(6)),
    totalCost,
    markupPercent: markup,
    marginPercent: Number(marginPercent.toFixed(6)),
  };
}

export function calculateMarkupDetails(
  sellingPrice: number | string,
  costPrice: number | string,
  options: MarginCalculatorOptions = {},
): MarkupDetails {
  const price = toFiniteNumber(sellingPrice, 'sellingPrice');

  if (price <= 0) {
    throw new RangeError('sellingPrice must be greater than zero');
  }

  const totalCost = calculateTotalCost(costPrice, options);

  if (totalCost <= 0) {
    throw new RangeError('totalCost must be greater than zero');
  }

  const profit = price - totalCost;
  const markupPercent = (profit / totalCost) * 100;
  const marginPercent = (profit / price) * 100;

  if (!Number.isFinite(profit) || !Number.isFinite(markupPercent)) {
    throw new RangeError('markup result must be finite');
  }

  const status = profit > 0 ? 'profit' : profit < 0 ? 'loss' : 'breakEven';

  return {
    profit: Number(profit.toFixed(6)),
    markupPercent: Number(markupPercent.toFixed(6)),
    marginPercent: Number(marginPercent.toFixed(6)),
    totalCost,
    status,
  };
}
