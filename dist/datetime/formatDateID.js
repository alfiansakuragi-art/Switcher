"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateID = formatDateID;
const PRESET_MAP = {
    short: { dateStyle: 'short' },
    medium: { dateStyle: 'medium' },
    long: { dateStyle: 'long' },
    full: { dateStyle: 'full' },
    time: { timeStyle: 'short' },
    datetime: { dateStyle: 'long', timeStyle: 'short' },
};
function toDate(input) {
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
function formatDateID(input, options = {}) {
    const date = toDate(input);
    const { preset = 'long', dateStyle, timeStyle, timeZone } = options;
    const intlOptions = dateStyle || timeStyle
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
exports.default = formatDateID;
//# sourceMappingURL=formatDateID.js.map