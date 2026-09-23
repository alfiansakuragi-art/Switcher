import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateDiscount,
  calculateMargin,
  calculateMarginDetails,
  calculateSellingPrice,
  numberToIDR,
  parseIDR,
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
