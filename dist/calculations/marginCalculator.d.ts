export interface MarginCalculatorOptions {
    tax?: number;
    otherCost?: number;
    operationalCost?: number;
}
export interface MarginDetails {
    profit: number;
    marginPercent: number;
    totalCost: number;
    status: 'profit' | 'loss' | 'breakEven';
}
export declare function calculateMarginDetails(sellingPrice: string | number, costPrice: string | number, options?: MarginCalculatorOptions): MarginDetails;
export declare function calculateMargin(sellingPrice: string | number, costPrice: string | number, options?: MarginCalculatorOptions): string;
//# sourceMappingURL=marginCalculator.d.ts.map