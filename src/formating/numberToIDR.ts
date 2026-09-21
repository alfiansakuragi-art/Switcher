export interface NumberToIDROptions {
    withCents?: boolean;
    prefix?: string;
    thousandsSeparator?: string;
    decimalSeparator?: string;
}

export function numberToIDR(
    value: number | string,
    options: NumberToIDROptions = {}
): string {
    const {
        withCents = true,
        prefix = 'Rp. ',
        thousandsSeparator = '.',
        decimalSeparator = ',',
    } = options;

    const num = typeof value === 'string' ? parseFloat(value) : value;

    // VALIDASI USER YG SUKA INPUT CSAKNDANSKDNAKNSDKSANDLKANSD
    if (isNaN(num)) {
        throw new TypeError(`Invalid number provided to numberToIDR: ${value}`);
    }
    //Simpan negative value ke IsNegative
    const isNegative = num < 0;

    //kalo negatif.. convert ke positif dulu
    const absNum = Math.abs(num);

    //dua 0 dibelakang koma (dibulatin)
    //untuk => 125.000 => 125.000.00 dan 125.333 => 125.333.33
    const fixed = absNum.toFixed(2);

    //array Intpart mendefinisikan integer part 125.000
    //dan array decPart mendefinisikan desimal 00

    //di restructur menjadi array
    const [intPart, decPart] = fixed.split('.');

    //REGEX => separator setiap 3 angka
    //\B => boundary non-word => memastikan tidak memisahkan angka yang berdempetan (misal 111)
    //(?=(\d{3})+(?!\d)) => positive lookahead => mencari posisi dimana ada kelipatan 3 digit angka
    //(\d{3}) => 3 digit angka
    //+ => kelipatan 3
    //(?!\d) => negative lookahead => memastikan tidak ada digit angka setelah kelipatan 3
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

    //kondisional untuk menambahkan desimal
    const formattedValue = withCents
        ? `${formattedInt}${decimalSeparator}${decPart}`
        : formattedInt;

    return `${isNegative ? '-' : ''}${prefix}${formattedValue}`;
}

export default numberToIDR;
