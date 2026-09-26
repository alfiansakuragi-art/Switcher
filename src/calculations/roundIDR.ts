import { toFiniteNumber } from '../internal/toFiniteNumber.js';

export type RoundingMode = 'nearest' | 'up' | 'down';

export interface RoundIDROptions {
  unit?: number | string;
  mode?: RoundingMode;
}

export function roundIDR(
  value: number | string,
  options: RoundIDROptions = {},
): number {
  const number = toFiniteNumber(value, 'value');
  const { unit = 100, mode = 'nearest' } = options;
  const unitNum = toFiniteNumber(unit, 'unit');

  if (unitNum <= 0) {
    throw new RangeError('unit must be greater than zero');
  }

  let factor: number;
  if (mode === 'up') {
    factor = Math.ceil(number / unitNum);
  } else if (mode === 'down') {
    factor = Math.floor(number / unitNum);
  } else if (mode === 'nearest') {
    factor = Math.round(number / unitNum);
  } else {
    throw new TypeError(`invalid rounding mode: ${mode}`);
  }

  const result = factor * unitNum;
  return Number(result.toFixed(6));
}

export default roundIDR;
