import { toFiniteNumber } from '../internal/toFiniteNumber.js';

export interface NumberToIDROptions {
  withCents?: boolean;
  prefix?: string;
  thousandsSeparator?: string;
  decimalSeparator?: string;
}

export function numberToIDR(
  value: number | string,
  options: NumberToIDROptions = {},
): string {
  const {
    withCents = true,
    prefix = 'Rp. ',
    thousandsSeparator = '.',
    decimalSeparator = ',',
  } = options;

  const number = toFiniteNumber(value, 'value');
  const fractionDigits = withCents ? 2 : 0;
  const rounded = new Intl.NumberFormat('en-US', {
    useGrouping: false,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(Math.abs(number));
  const [integerPart, decimalPart] = rounded.split('.');
  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    () => thousandsSeparator,
  );
  const formattedValue = withCents
    ? `${formattedInteger}${decimalSeparator}${decimalPart}`
    : formattedInteger;

  return `${number < 0 ? '-' : ''}${prefix}${formattedValue}`;
}

export default numberToIDR;
