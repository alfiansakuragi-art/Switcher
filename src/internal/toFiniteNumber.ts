const DECIMAL_NUMBER = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;

export function toFiniteNumber(value: number | string, name: string): number {
  if (typeof value === 'string' && !DECIMAL_NUMBER.test(value.trim())) {
    throw new TypeError(`${name} must be a finite number`);
  }

  const number = typeof value === 'string' ? Number(value.trim()) : value;

  if (!Number.isFinite(number)) {
    throw new TypeError(`${name} must be a finite number`);
  }

  return number;
}
