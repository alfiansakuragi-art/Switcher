export interface MarginCalculatorOptions {
    tax?: number;
    otherCost?: number;
    operationalCost?: number;
}
export declare function calculateMargin(sellingPrice: string | number, costPrice: string | number, options?: MarginCalculatorOptions): string;
//# sourceMappingURL=marginCalculator.d.ts.map