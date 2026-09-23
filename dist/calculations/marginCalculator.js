"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMarginDetails = calculateMarginDetails;
exports.calculateMargin = calculateMargin;
const costs_js_1 = require("./costs.js");
const toFiniteNumber_js_1 = require("../internal/toFiniteNumber.js");
function calculateMarginDetails(sellingPrice, costPrice, options = {}) {
    const price = (0, toFiniteNumber_js_1.toFiniteNumber)(sellingPrice, 'sellingPrice');
    if (price <= 0) {
        throw new RangeError('sellingPrice must be greater than zero');
    }
    const totalCost = (0, costs_js_1.calculateTotalCost)(costPrice, options);
    const profit = price - totalCost;
    const marginPercent = (profit / price) * 100;
    if (!Number.isFinite(profit) || !Number.isFinite(marginPercent)) {
        throw new RangeError('margin result must be finite');
    }
    const status = profit > 0 ? 'profit' : profit < 0 ? 'loss' : 'breakEven';
    return { profit, marginPercent, totalCost, status };
}
function calculateMargin(sellingPrice, costPrice, options = {}) {
    const { profit, marginPercent, status } = calculateMarginDetails(sellingPrice, costPrice, options);
    const legacyStatus = status === 'loss' ? 'unprofit' : status;
    return `${legacyStatus} profit: ${profit},\nmargin: ${marginPercent.toFixed(2)}%`;
}
//# sourceMappingURL=marginCalculator.js.map