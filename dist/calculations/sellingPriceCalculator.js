"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSellingPrice = calculateSellingPrice;
const costs_js_1 = require("./costs.js");
const toFiniteNumber_js_1 = require("../internal/toFiniteNumber.js");
function calculateSellingPrice(costPrice, targetMarginPercent, options = {}) {
    const targetMargin = (0, toFiniteNumber_js_1.toFiniteNumber)(targetMarginPercent, 'targetMarginPercent');
    if (targetMargin < 0 || targetMargin >= 100) {
        throw new RangeError('targetMarginPercent must be at least 0 and below 100');
    }
    const totalCost = (0, costs_js_1.calculateTotalCost)(costPrice, options);
    if (totalCost <= 0) {
        throw new RangeError('totalCost must be greater than zero');
    }
    const sellingPrice = totalCost / (1 - targetMargin / 100);
    if (!Number.isFinite(sellingPrice)) {
        throw new RangeError('sellingPrice result must be finite');
    }
    return sellingPrice;
}
//# sourceMappingURL=sellingPriceCalculator.js.map