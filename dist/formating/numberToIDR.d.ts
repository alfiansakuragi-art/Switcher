export interface NumberToIDROptions {
    withCents?: boolean;
    prefix?: string;
    thousandsSeparator?: string;
    decimalSeparator?: string;
}
export declare function numberToIDR(value: number | string, options?: NumberToIDROptions): string;
export default numberToIDR;
//# sourceMappingURL=numberToIDR.d.ts.map