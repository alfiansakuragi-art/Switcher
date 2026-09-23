"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalCost = calculateTotalCost;
const toFiniteNumber_js_1 = require("../internal/toFiniteNumber.js");
function calculateTotalCost(costPrice, options) {
    const totalCost = (0, toFiniteNumber_js_1.toFiniteNumber)(costPrice, 'costPrice') +
        (0, toFiniteNumber_js_1.toFiniteNumber)(options.tax ?? 0, 'tax') +
        (0, toFiniteNumber_js_1.toFiniteNumber)(options.operationalCost ?? 0, 'operationalCost') +
        (0, toFiniteNumber_js_1.toFiniteNumber)(options.otherCost ?? 0, 'otherCost');
    if (!Number.isFinite(totalCost)) {
        throw new RangeError('totalCost must be finite');
    }
    return totalCost;
}
//# sourceMappingURL=costs.js.map