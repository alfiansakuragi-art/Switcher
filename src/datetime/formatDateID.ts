export type DateInput = Date | string | number;

export type FormatDateIDPreset =
  | 'short'
  | 'medium'
  | 'long'
  | 'full'
  | 'time'
  | 'datetime';

export interface FormatDateIDOptions {
  preset?: FormatDateIDPreset;
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle'];
  timeStyle?: Intl.DateTimeFormatOptions['timeStyle'];
  timeZone?: string;
}

const PRESET_MAP: Record<FormatDateIDPreset, Intl.DateTimeFormatOptions> = {
  short: { dateStyle: 'short' },
  medium: { dateStyle: 'medium' },
  long: { dateStyle: 'long' },
  full: { dateStyle: 'full' },
  time: { timeStyle: 'short' },
  datetime: { dateStyle: 'long', timeStyle: 'short' },
};

function toDate(input: DateInput): Date {
  if (input instanceof Date) {
    if (isNaN(input.getTime())) {
      throw new TypeError('input is an invalid Date object');
    }
    return input;
  }

  if (typeof input === 'number') {
    if (!Number.isFinite(input)) {
      throw new TypeError('input timestamp must be a finite number');
    }
    return new Date(input);
  }

  if (typeof input === 'string') {
    if (input.trim() === '') {
      throw new TypeError('input string must not be empty');
    }
    const parsed = new Date(input);
    if (isNaN(parsed.getTime())) {
      throw new TypeError('input string is not a valid date');
    }
    return parsed;
  }

  throw new TypeError('input must be a Date, number timestamp, or date string');
}

export function formatDateID(
  input: DateInput,
  options: FormatDateIDOptions = {},
): string {
  const date = toDate(input);
  const { preset = 'long', dateStyle, timeStyle, timeZone } = options;

  const intlOptions: Intl.DateTimeFormatOptions =
    dateStyle || timeStyle
      ? {
          ...(dateStyle ? { dateStyle } : {}),
          ...(timeStyle ? { timeStyle } : {}),
          ...(timeZone ? { timeZone } : {}),
        }
      : {
          ...PRESET_MAP[preset],
          ...(timeZone ? { timeZone } : {}),
        };

  return new Intl.DateTimeFormat('id-ID', intlOptions).format(date);
}

export default formatDateID;