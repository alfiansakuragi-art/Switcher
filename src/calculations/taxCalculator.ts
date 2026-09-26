import { toFiniteNumber } from '../internal/toFiniteNumber.js';

export interface TaxCalculatorOptions {
  rate?: number | string;
  inclusive?: boolean;
}

export interface TaxDetails {
  netAmount: number;
  taxAmount: number;
  totalAmount: number;
  rate: number;
  inclusive: boolean;
}

function cleanFloatingPoint(val: number): number {
  return Number(val.toFixed(6));
}

export function calculateTax(
  amount: number | string,
  options: TaxCalculatorOptions = {},
): TaxDetails {
  const value = toFiniteNumber(amount, 'amount');

  if (value < 0) {
    throw new RangeError('amount must be at least zero');
  }

  const { rate = 11, inclusive = false } = options;
  const taxRate = toFiniteNumber(rate, 'rate');

  if (taxRate < 0) {
    throw new RangeError('rate must be at least zero');
  }

  let netAmount: number;
  let taxAmount: number;
  let totalAmount: number;

  if (inclusive) {
    totalAmount = value;
    netAmount = cleanFloatingPoint(totalAmount / (1 + taxRate / 100));
    taxAmount = cleanFloatingPoint(totalAmount - netAmount);
  } else {
    netAmount = value;
    taxAmount = cleanFloatingPoint(netAmount * (taxRate / 100));
    totalAmount = cleanFloatingPoint(netAmount + taxAmount);
  }

  if (
    !Number.isFinite(netAmount) ||
    !Number.isFinite(taxAmount) ||
    !Number.isFinite(totalAmount)
  ) {
    throw new RangeError('tax calculation result must be finite');
  }

  return {
    netAmount,
    taxAmount,
    totalAmount,
    rate: taxRate,
    inclusive: Boolean(inclusive),
  };
}

export const calculatePPN = calculateTax;
