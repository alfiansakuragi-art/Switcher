export type DateInput = Date | string | number;
export type FormatDateIDPreset = 'short' | 'medium' | 'long' | 'full' | 'time' | 'datetime';
export interface FormatDateIDOptions {
    preset?: FormatDateIDPreset;
    dateStyle?: Intl.DateTimeFormatOptions['dateStyle'];
    timeStyle?: Intl.DateTimeFormatOptions['timeStyle'];
    timeZone?: string;
}
export declare function formatDateID(input: DateInput, options?: FormatDateIDOptions): string;
export default formatDateID;
//# sourceMappingURL=formatDateID.d.ts.map