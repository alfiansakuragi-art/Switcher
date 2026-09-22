"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateMargin = calculateMargin;
function calculateMargin(sellingPrice, costPrice, options = {}) {
    const { tax = 0, otherCost = 0, operationalCost = 0, } = options;
    const numbSellingPrice = Number(sellingPrice);
    const numbCostPrice = Number(costPrice);
    const numbOtherCost = Number(otherCost);
    const numbTax = Number(tax);
    const numbOperationalCost = Number(operationalCost);
    if (Number.isNaN(numbSellingPrice) ||
        Number.isNaN(numbCostPrice)) {
        throw new Error("sellingPrice and costPrice must be numbers");
    }
    if (Number.isNaN(numbOperationalCost) ||
        Number.isNaN(numbOtherCost) ||
        Number.isNaN(numbTax)) {
        throw new Error("Options must be numeric");
    }
    if (numbSellingPrice === 0) {
        throw new Error("sellingPrice cannot be zero");
    }
    const totalCost = numbCostPrice +
        numbOperationalCost +
        numbOtherCost +
        numbTax;
    const profit = numbSellingPrice - totalCost;
    const margin = (profit / numbSellingPrice) * 100;
    const status = profit > 0
        ? "profit"
        : profit < 0
            ? "unprofit"
            : "breakEven";
    return `${status} profit: ${profit},\nmargin: ${margin.toFixed(2)}%`;
}
//# sourceMappingURL=marginCalculator.js.map