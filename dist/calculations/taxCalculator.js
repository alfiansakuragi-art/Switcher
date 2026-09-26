"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePPN = void 0;
exports.calculateTax = calculateTax;
const toFiniteNumber_js_1 = require("../internal/toFiniteNumber.js");
function cleanFloatingPoint(val) {
    return Number(val.toFixed(6));
}
function calculateTax(amount, options = {}) {
    const value = (0, toFiniteNumber_js_1.toFiniteNumber)(amount, 'amount');
    if (value < 0) {
        throw new RangeError('amount must be at least zero');
    }
    const { rate = 11, inclusive = false } = options;
    const taxRate = (0, toFiniteNumber_js_1.toFiniteNumber)(rate, 'rate');
    if (taxRate < 0) {
        throw new RangeError('rate must be at least zero');
    }
    let netAmount;
    let taxAmount;
    let totalAmount;
    if (inclusive) {
        totalAmount = value;
        netAmount = cleanFloatingPoint(totalAmount / (1 + taxRate / 100));
        taxAmount = cleanFloatingPoint(totalAmount - netAmount);
    }
    else {
        netAmount = value;
        taxAmount = cleanFloatingPoint(netAmount * (taxRate / 100));
        totalAmount = cleanFloatingPoint(netAmount + taxAmount);
    }
    if (!Number.isFinite(netAmount) ||
        !Number.isFinite(taxAmount) ||
        !Number.isFinite(totalAmount)) {
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
exports.calculatePPN = calculateTax;
//# sourceMappingURL=taxCalculator.js.map