"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiscount = calculateDiscount;
const toFiniteNumber_js_1 = require("../internal/toFiniteNumber.js");
function calculateDiscount(originalPrice, discountPercent) {
    const price = (0, toFiniteNumber_js_1.toFiniteNumber)(originalPrice, 'originalPrice');
    const percent = (0, toFiniteNumber_js_1.toFiniteNumber)(discountPercent, 'discountPercent');
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
//# sourceMappingURL=discountCalculator.js.map