import type { MarginCalculatorOptions } from './marginCalculator.js';
import { type RoundingMode } from './roundIDR.js';
export interface SellingPriceOptions extends MarginCalculatorOptions {
    roundUnit?: number | string;
    roundMode?: RoundingMode;
}
export declare function calculateSellingPrice(costPrice: number | string, targetMarginPercent: number | string, options?: SellingPriceOptions): number;
//# sourceMappingURL=sellingPriceCalculator.d.ts.map