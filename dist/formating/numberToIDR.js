"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberToIDR = numberToIDR;
const toFiniteNumber_js_1 = require("../internal/toFiniteNumber.js");
function numberToIDR(value, options = {}) {
    const { withCents = true, prefix = 'Rp. ', thousandsSeparator = '.', decimalSeparator = ',', } = options;
    const number = (0, toFiniteNumber_js_1.toFiniteNumber)(value, 'value');
    const fractionDigits = withCents ? 2 : 0;
    const rounded = new Intl.NumberFormat('en-US', {
        useGrouping: false,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
    }).format(Math.abs(number));
    const [integerPart, decimalPart] = rounded.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, () => thousandsSeparator);
    const formattedValue = withCents
        ? `${formattedInteger}${decimalSeparator}${decimalPart}`
        : formattedInteger;
    return `${number < 0 ? '-' : ''}${prefix}${formattedValue}`;
}
exports.default = numberToIDR;
//# sourceMappingURL=numberToIDR.js.map