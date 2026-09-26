"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundIDR = roundIDR;
const toFiniteNumber_js_1 = require("../internal/toFiniteNumber.js");
function roundIDR(value, options = {}) {
    const number = (0, toFiniteNumber_js_1.toFiniteNumber)(value, 'value');
    const { unit = 100, mode = 'nearest' } = options;
    const unitNum = (0, toFiniteNumber_js_1.toFiniteNumber)(unit, 'unit');
    if (unitNum <= 0) {
        throw new RangeError('unit must be greater than zero');
    }
    let factor;
    if (mode === 'up') {
        factor = Math.ceil(number / unitNum);
    }
    else if (mode === 'down') {
        factor = Math.floor(number / unitNum);
    }
    else if (mode === 'nearest') {
        factor = Math.round(number / unitNum);
    }
    else {
        throw new TypeError(`invalid rounding mode: ${mode}`);
    }
    const result = factor * unitNum;
    return Number(result.toFixed(6));
}
exports.default = roundIDR;
//# sourceMappingURL=roundIDR.js.map