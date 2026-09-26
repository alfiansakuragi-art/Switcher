export interface TaxCalculatorOptions {
    rate?: number | string;
    inclusive?: boolean;
}
export interface TaxDetails {
    netAmount: number;
    taxAmount: number;
    totalAmount: number;
    rate: number;
    inclusive: boolean;
}
export declare function calculateTax(amount: number | string, options?: TaxCalculatorOptions): TaxDetails;
export declare const calculatePPN: typeof calculateTax;
//# sourceMappingURL=taxCalculator.d.ts.map