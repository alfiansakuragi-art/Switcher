export type RoundingMode = 'nearest' | 'up' | 'down';
export interface RoundIDROptions {
    unit?: number | string;
    mode?: RoundingMode;
}
export declare function roundIDR(value: number | string, options?: RoundIDROptions): number;
export default roundIDR;
//# sourceMappingURL=roundIDR.d.ts.map