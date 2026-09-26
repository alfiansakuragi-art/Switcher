import type { MarginCalculatorOptions } from './marginCalculator.js';
import { type RoundingMode } from './roundIDR.js';
export interface MarkupCalculatorOptions extends MarginCalculatorOptions {
    roundUnit?: number | string;
    roundMode?: RoundingMode;
}
export interface MarkupPriceDetails {
    sellingPrice: number;
    profit: number;
    totalCost: number;
    markupPercent: number;
    marginPercent: number;
}
export interface MarkupDetails {
    profit: number;
    markupPercent: number;
    marginPercent: number;
    totalCost: number;
    status: 'profit' | 'loss' | 'breakEven';
}
export declare function calculateMarkupPrice(costPrice: number | string, markupPercent: number | string, options?: MarkupCalculatorOptions): MarkupPriceDetails;
export declare function calculateMarkupDetails(sellingPrice: number | string, costPrice: number | string, options?: MarginCalculatorOptions): MarkupDetails;
//# sourceMappingURL=markupCalculator.d.ts.map