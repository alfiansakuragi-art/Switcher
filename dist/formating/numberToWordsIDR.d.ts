export type TextCase = 'sentencecase' | 'lowercase' | 'uppercase' | 'titlecase';
export interface NumberToWordsOptions {
    suffix?: string;
    prefix?: string;
    caseType?: TextCase;
}
export declare function numberToWordsIDR(value: number | string, options?: NumberToWordsOptions): string;
export default numberToWordsIDR;
//# sourceMappingURL=numberToWordsIDR.d.ts.map