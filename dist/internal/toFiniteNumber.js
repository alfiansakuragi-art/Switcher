"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFiniteNumber = toFiniteNumber;
const DECIMAL_NUMBER = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;
function toFiniteNumber(value, name) {
    if (typeof value === 'string' && !DECIMAL_NUMBER.test(value.trim())) {
        throw new TypeError(`${name} must be a finite number`);
    }
    const number = typeof value === 'string' ? Number(value.trim()) : value;
    if (!Number.isFinite(number)) {
        throw new TypeError(`${name} must be a finite number`);
    }
    return number;
}
//# sourceMappingURL=toFiniteNumber.js.map