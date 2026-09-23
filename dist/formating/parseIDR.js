"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIDR = parseIDR;
const IDR_AMOUNT = /^(-)?(?:Rp\.?\s*)?((?:\d{1,3}(?:\.\d{3})+|\d+)(?:,\d{1,2})?)$/i;
function parseIDR(value) {
    if (typeof value !== 'string') {
        throw new TypeError('value must be a Rupiah string');
    }
    const match = IDR_AMOUNT.exec(value.trim());
    if (!match) {
        throw new TypeError('value must use Indonesian Rupiah notation');
    }
    const [, negative, amount] = match;
    const number = Number(amount.replaceAll('.', '').replace(',', '.'));
    if (!Number.isFinite(number)) {
        throw new TypeError('value must be a finite Rupiah amount');
    }
    return negative ? -number : number;
}
//# sourceMappingURL=parseIDR.js.map