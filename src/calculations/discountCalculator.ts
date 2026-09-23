import { toFiniteNumber } from '../internal/toFiniteNumber.js';

export interface DiscountDetails {
  discountAmount: number;
  finalPrice: number;
}

export function calculateDiscount(
  originalPrice: number | string,
  discountPercent: number | string,
): DiscountDetails {
  const price = toFiniteNumber(originalPrice, 'originalPrice');
  const percent = toFiniteNumber(discountPercent, 'discountPercent');

  if (price < 0) {
    throw new RangeError('originalPrice must be at least zero');
  }

  if (percent < 0 || percent > 100) {
    throw new RangeError('discountPercent must be between 0 and 100');
  }

  const discountAmount = price * (percent / 100);
  const finalPrice = price - discountAmount;

  return { discountAmount, finalPrice };
}
