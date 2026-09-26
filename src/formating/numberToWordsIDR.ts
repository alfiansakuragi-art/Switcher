import { toFiniteNumber } from '../internal/toFiniteNumber.js';

export type TextCase = 'sentencecase' | 'lowercase' | 'uppercase' | 'titlecase';

export interface NumberToWordsOptions {
  suffix?: string;
  prefix?: string;
  caseType?: TextCase;
}

const ONES = [
  'nol',
  'satu',
  'dua',
  'tiga',
  'empat',
  'lima',
  'enam',
  'tujuh',
  'delapan',
  'sembilan',
  'sepuluh',
  'sebelas',
];

function spellInteger(n: number): string {
  if (n < 12) {
    return ONES[n];
  }
  if (n < 20) {
    return `${ONES[n - 10]} belas`;
  }
  if (n < 100) {
    const tens = Math.floor(n / 10);
    const remainder = n % 10;
    return `${ONES[tens]} puluh${remainder ? ` ${ONES[remainder]}` : ''}`;
  }
  if (n < 200) {
    const remainder = n - 100;
    return `seratus${remainder ? ` ${spellInteger(remainder)}` : ''}`;
  }
  if (n < 1000) {
    const hundreds = Math.floor(n / 100);
    const remainder = n % 100;
    return `${ONES[hundreds]} ratus${remainder ? ` ${spellInteger(remainder)}` : ''}`;
  }
  if (n < 2000) {
    const remainder = n - 1000;
    return `seribu${remainder ? ` ${spellInteger(remainder)}` : ''}`;
  }
  if (n < 1000000) {
    const thousands = Math.floor(n / 1000);
    const remainder = n % 1000;
    return `${spellInteger(thousands)} ribu${remainder ? ` ${spellInteger(remainder)}` : ''}`;
  }
  if (n < 1000000000) {
    const millions = Math.floor(n / 1000000);
    const remainder = n % 1000000;
    return `${spellInteger(millions)} juta${remainder ? ` ${spellInteger(remainder)}` : ''}`;
  }
  if (n < 1000000000000) {
    const billions = Math.floor(n / 1000000000);
    const remainder = n % 1000000000;
    return `${spellInteger(billions)} miliar${remainder ? ` ${spellInteger(remainder)}` : ''}`;
  }
  if (n < 1000000000000000) {
    const trillions = Math.floor(n / 1000000000000);
    const remainder = n % 1000000000000;
    return `${spellInteger(trillions)} triliun${remainder ? ` ${spellInteger(remainder)}` : ''}`;
  }

  throw new RangeError('value exceeds maximum supported number (up to 999 triliun)');
}

function applyCase(text: string, caseType: TextCase): string {
  switch (caseType) {
    case 'lowercase':
      return text.toLowerCase();
    case 'uppercase':
      return text.toUpperCase();
    case 'titlecase':
      return text
        .toLowerCase()
        .split(' ')
        .map(word => (word ? word[0].toUpperCase() + word.slice(1) : ''))
        .join(' ');
    case 'sentencecase':
    default:
      return text.length > 0 ? text[0].toUpperCase() + text.slice(1) : text;
  }
}

export function numberToWordsIDR(
  value: number | string,
  options: NumberToWordsOptions = {},
): string {
  const number = toFiniteNumber(value, 'value');

  if (Math.abs(number) > Number.MAX_SAFE_INTEGER) {
    throw new RangeError('value exceeds safe integer limit');
  }

  const {
    suffix = 'rupiah',
    prefix = '',
    caseType = 'sentencecase',
  } = options;

  const isNegative = number < 0;
  const absNum = Math.abs(number);
  const intPart = Math.floor(absNum);

  let words = spellInteger(intPart);

  const numStr = String(absNum);
  if (numStr.includes('.')) {
    const decStr = numStr.split('.')[1];
    if (decStr && Number(decStr) > 0) {
      const decWords = decStr
        .split('')
        .map(digit => ONES[Number(digit)])
        .join(' ');
      words = `${words} koma ${decWords}`;
    }
  }

  if (isNegative) {
    words = `minus ${words}`;
  }

  if (suffix && suffix.trim().length > 0) {
    words = `${words} ${suffix.trim()}`;
  }

  let formatted = applyCase(words.trim(), caseType);

  if (prefix && prefix.trim().length > 0) {
    formatted = `${prefix.trim()} ${formatted}`;
  }

  return formatted;
}

export default numberToWordsIDR;
