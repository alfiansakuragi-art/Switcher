import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateDiscount,
  calculateMargin,
  calculateMarginDetails,
  calculateMarkupDetails,
  calculateMarkupPrice,
  calculatePPN,
  calculateSellingPrice,
  calculateTax,
  formatDateID,
  numberToIDR,
  numberToWordsIDR,
  parseIDR,
  roundIDR,
} from '../dist/index.js';

test('numberToIDR formats Rupiah and rounds at the requested precision', () => {
  assert.equal(numberToIDR(150000), 'Rp. 150.000,00');
  assert.equal(numberToIDR(-25000), '-Rp. 25.000,00');
  assert.equal(numberToIDR(1.005), 'Rp. 1,01');
  assert.equal(numberToIDR(125000.75, { withCents: false }), 'Rp. 125.001');
  assert.equal(
    numberToIDR(1250000, {
      prefix: 'IDR ',
      thousandsSeparator: ',',
      decimalSeparator: '.',
    }),
    'IDR 1,250,000.00',
  );
});

test('numberToIDR rejects malformed and non-finite input', () => {
  for (const value of ['', '12abc', 'Rp. 1.000', 'Infinity', Infinity, NaN]) {
    assert.throws(() => numberToIDR(value), TypeError);
  }
});

test('parseIDR accepts standard Rupiah notation', () => {
  assert.equal(parseIDR('Rp. 1.250.000,50'), 1250000.5);
  assert.equal(parseIDR('-Rp. 25.000,00'), -25000);
  assert.equal(parseIDR('125000'), 125000);
  assert.equal(parseIDR('Rp 1.250,5'), 1250.5);
  assert.equal(parseIDR(numberToIDR(125000.25)), 125000.25);
});

test('parseIDR rejects ambiguous or malformed notation', () => {
  for (const value of ['1.00', '1,000.50', 'Rp. 12abc', 'Rp. 1.000,123', '']) {
    assert.throws(() => parseIDR(value), TypeError);
  }
});

test('calculateMarginDetails returns reusable numbers and keeps legacy output', () => {
  assert.deepEqual(calculateMarginDetails(150000, 100000, {
    tax: 5000,
    operationalCost: 10000,
    otherCost: 5000,
  }), {
    profit: 30000,
    marginPercent: 20,
    totalCost: 120000,
    status: 'profit',
  });
  assert.equal(calculateMargin(100000, 80000), 'profit profit: 20000,\nmargin: 20.00%');
  assert.equal(calculateMargin(50000, 70000), 'unprofit profit: -20000,\nmargin: -40.00%');
  assert.equal(calculateMarginDetails(50000, 50000).status, 'breakEven');
});

test('margin calculation rejects invalid prices and overflow', () => {
  assert.throws(() => calculateMarginDetails(0, 100), RangeError);
  assert.throws(() => calculateMarginDetails(-100, 50), RangeError);
  assert.throws(() => calculateMarginDetails('', 50), TypeError);
  assert.throws(() => calculateMarginDetails(100, Infinity), TypeError);
  assert.throws(() => calculateMarginDetails(100, 50, { tax: Infinity }), TypeError);
  assert.throws(() => calculateMarginDetails(100, Number.MAX_VALUE, {
    tax: Number.MAX_VALUE,
  }), RangeError);
});

test('calculateSellingPrice includes costs and reaches the target margin', () => {
  const price = calculateSellingPrice(100000, 20, {
    tax: 5000,
    operationalCost: 10000,
    otherCost: 5000,
  });

  assert.equal(price, 150000);
  assert.equal(calculateMarginDetails(price, 100000, {
    tax: 5000,
    operationalCost: 10000,
    otherCost: 5000,
  }).marginPercent, 20);
  assert.equal(calculateSellingPrice(100000, 0), 100000);
});

test('calculateSellingPrice rejects impossible targets', () => {
  assert.throws(() => calculateSellingPrice(100, 100), RangeError);
  assert.throws(() => calculateSellingPrice(100, -1), RangeError);
  assert.throws(() => calculateSellingPrice(0, 20), RangeError);
  assert.throws(() => calculateSellingPrice(100, 'abc'), TypeError);
  assert.throws(() => calculateSellingPrice(Number.MAX_VALUE, 99), RangeError);
});

test('calculateDiscount returns the discount and final price', () => {
  assert.deepEqual(calculateDiscount(200000, 25), {
    discountAmount: 50000,
    finalPrice: 150000,
  });
  assert.deepEqual(calculateDiscount(200000, 100), {
    discountAmount: 200000,
    finalPrice: 0,
  });
  assert.deepEqual(calculateDiscount(200000, 0), {
    discountAmount: 0,
    finalPrice: 200000,
  });
});

test('calculateDiscount rejects invalid price and percentage', () => {
  assert.throws(() => calculateDiscount(-1, 10), RangeError);
  assert.throws(() => calculateDiscount(100, -1), RangeError);
  assert.throws(() => calculateDiscount(100, 101), RangeError);
  assert.throws(() => calculateDiscount('12abc', 10), TypeError);
  assert.throws(() => calculateDiscount(100, Infinity), TypeError);
});

test('roundIDR rounds to specified Rupiah units with various modes', () => {
  assert.equal(roundIDR(15420), 15400);
  assert.equal(roundIDR(15460), 15500);
  assert.equal(roundIDR(15420, { unit: 100, mode: 'up' }), 15500);
  assert.equal(roundIDR(15480, { unit: 100, mode: 'down' }), 15400);
  assert.equal(roundIDR(15230, { unit: 500, mode: 'nearest' }), 15000);
  assert.equal(roundIDR(15260, { unit: 500, mode: 'nearest' }), 15500);
  assert.equal(roundIDR(15100, { unit: 500, mode: 'up' }), 15500);
  assert.equal(roundIDR(15900, { unit: 1000, mode: 'down' }), 15000);
});

test('roundIDR rejects invalid unit or mode', () => {
  assert.throws(() => roundIDR(1000, { unit: 0 }), RangeError);
  assert.throws(() => roundIDR(1000, { unit: -100 }), RangeError);
  assert.throws(() => roundIDR(1000, { mode: 'invalid' }), TypeError);
  assert.throws(() => roundIDR('abc'), TypeError);
});

test('calculateSellingPrice supports optional Rupiah rounding', () => {
  const unrounded = calculateSellingPrice(100000, 15);
  assert.ok(unrounded > 117647 && unrounded < 117648);

  const roundedNearest = calculateSellingPrice(100000, 15, { roundUnit: 500, roundMode: 'nearest' });
  assert.equal(roundedNearest, 117500);

  const roundedUp = calculateSellingPrice(100000, 15, { roundUnit: 500, roundMode: 'up' });
  assert.equal(roundedUp, 118000);
});

test('calculateTax and calculatePPN handle exclusive and inclusive tax calculations', () => {
  const exclusive = calculateTax(100000);
  assert.deepEqual(exclusive, {
    netAmount: 100000,
    taxAmount: 11000,
    totalAmount: 111000,
    rate: 11,
    inclusive: false,
  });

  const inclusive = calculatePPN(111000, { inclusive: true });
  assert.deepEqual(inclusive, {
    netAmount: 100000,
    taxAmount: 11000,
    totalAmount: 111000,
    rate: 11,
    inclusive: true,
  });

  const ppn12 = calculateTax(100000, { rate: 12 });
  assert.equal(ppn12.taxAmount, 12000);
  assert.equal(ppn12.totalAmount, 112000);
});

test('calculateTax rejects negative or non-finite inputs', () => {
  assert.throws(() => calculateTax(-100), RangeError);
  assert.throws(() => calculateTax(100, { rate: -5 }), RangeError);
  assert.throws(() => calculateTax('abc'), TypeError);
  assert.throws(() => calculateTax(100, { rate: 'abc' }), TypeError);
});

test('calculateMarkupPrice calculates price and margin from markup percentage', () => {
  const result = calculateMarkupPrice(100000, 25, {
    tax: 5000,
    operationalCost: 10000,
    otherCost: 5000,
  });
  assert.equal(result.totalCost, 120000);
  assert.equal(result.sellingPrice, 150000);
  assert.equal(result.profit, 30000);
  assert.equal(result.markupPercent, 25);
  assert.equal(result.marginPercent, 20);

  const rounded = calculateMarkupPrice(100000, 15.3, { roundUnit: 1000, roundMode: 'up' });
  assert.equal(rounded.sellingPrice, 116000);
});

test('calculateMarkupDetails calculates markup and margin status from prices', () => {
  const profitCase = calculateMarkupDetails(150000, 100000, { operationalCost: 20000 });
  assert.equal(profitCase.totalCost, 120000);
  assert.equal(profitCase.profit, 30000);
  assert.equal(profitCase.markupPercent, 25);
  assert.equal(profitCase.marginPercent, 20);
  assert.equal(profitCase.status, 'profit');

  const lossCase = calculateMarkupDetails(80000, 100000);
  assert.equal(lossCase.profit, -20000);
  assert.equal(lossCase.markupPercent, -20);
  assert.equal(lossCase.status, 'loss');

  const breakEvenCase = calculateMarkupDetails(100000, 100000);
  assert.equal(breakEvenCase.status, 'breakEven');
});

test('calculateMarkup rejects invalid inputs', () => {
  assert.throws(() => calculateMarkupPrice(-100, 20), RangeError);
  assert.throws(() => calculateMarkupPrice(100, -10), RangeError);
  assert.throws(() => calculateMarkupDetails(0, 100), RangeError);
  assert.throws(() => calculateMarkupDetails(100, 0), RangeError);
});

test('numberToWordsIDR converts numbers into Indonesian words correctly', () => {
  assert.equal(numberToWordsIDR(0), 'Nol rupiah');
  assert.equal(numberToWordsIDR(1), 'Satu rupiah');
  assert.equal(numberToWordsIDR(11), 'Sebelas rupiah');
  assert.equal(numberToWordsIDR(17), 'Tujuh belas rupiah');
  assert.equal(numberToWordsIDR(25), 'Dua puluh lima rupiah');
  assert.equal(numberToWordsIDR(100), 'Seratus rupiah');
  assert.equal(numberToWordsIDR(105), 'Seratus lima rupiah');
  assert.equal(numberToWordsIDR(150), 'Seratus lima puluh rupiah');
  assert.equal(numberToWordsIDR(1000), 'Seribu rupiah');
  assert.equal(numberToWordsIDR(1500), 'Seribu lima ratus rupiah');
  assert.equal(numberToWordsIDR(2000), 'Dua ribu rupiah');
  assert.equal(numberToWordsIDR(150000), 'Seratus lima puluh ribu rupiah');
  assert.equal(numberToWordsIDR(1001000), 'Satu juta seribu rupiah');
  assert.equal(numberToWordsIDR(2500000), 'Dua juta lima ratus ribu rupiah');
  assert.equal(numberToWordsIDR(1000000000), 'Satu miliar rupiah');
  assert.equal(numberToWordsIDR(1000000000000), 'Satu triliun rupiah');
  assert.equal(numberToWordsIDR(-25000), 'Minus dua puluh lima ribu rupiah');
  assert.equal(numberToWordsIDR(150.5), 'Seratus lima puluh koma lima rupiah');
});

test('numberToWordsIDR supports custom casing and suffix options', () => {
  assert.equal(
    numberToWordsIDR(150000, { caseType: 'lowercase' }),
    'seratus lima puluh ribu rupiah',
  );
  assert.equal(
    numberToWordsIDR(150000, { caseType: 'uppercase' }),
    'SERATUS LIMA PULUH RIBU RUPIAH',
  );
  assert.equal(
    numberToWordsIDR(150000, { caseType: 'titlecase' }),
    'Seratus Lima Puluh Ribu Rupiah',
  );
  assert.equal(
    numberToWordsIDR(150000, { suffix: '' }),
    'Seratus lima puluh ribu',
  );
  assert.equal(
    numberToWordsIDR(150000, { prefix: 'Terbilang:' }),
    'Terbilang: Seratus lima puluh ribu rupiah',
  );
});

test('numberToWordsIDR rejects non-finite or excessive values', () => {
  assert.throws(() => numberToWordsIDR('abc'), TypeError);
  assert.throws(() => numberToWordsIDR(Infinity), TypeError);
  assert.throws(() => numberToWordsIDR(1e16), RangeError);
});

test('formatDateID formats dates in Indonesian locale', () => {
  const date = new Date(2026, 8, 26);

  assert.equal(formatDateID(date), '26 September 2026');
  assert.equal(formatDateID(date, { preset: 'full' }), 'Sabtu, 26 September 2026');
  assert.equal(formatDateID('2026-09-26', { preset: 'short' }), '26/09/26');
  assert.equal(formatDateID(date.getTime()), '26 September 2026');

  assert.throws(() => formatDateID('not-a-date'), TypeError);
  assert.throws(() => formatDateID(''), TypeError);
  assert.throws(() => formatDateID(Infinity), TypeError);
  assert.throws(() => formatDateID(new Date('invalid')), TypeError);
});