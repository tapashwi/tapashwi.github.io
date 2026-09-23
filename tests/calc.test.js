// Run: node --test tests/
const test = require('node:test');
const assert = require('node:assert/strict');
const tax = require('../assets/calc/au-tax.js');
const { project } = require('../assets/calc/compound.js');
const pct = require('../assets/calc/percent.js');
const { analyse } = require('../assets/calc/text.js');
const dates = require('../assets/calc/dates.js');

const near = (a, b, tol = 0.011) => assert.ok(Math.abs(a - b) <= tol, `${a} is not within ${tol} of ${b}`);

test('AU tax FY2025-26: bracket edges', () => {
  assert.equal(tax.incomeTax(18200), 0);
  assert.equal(tax.incomeTax(45000), 4288);
  assert.equal(tax.incomeTax(135000), 31288);
  assert.equal(tax.incomeTax(190000), 51638);
  assert.equal(tax.incomeTax(200000), 56138);
});

test('AU tax: worked example matches the owner\'s FY2025-26 return figures', () => {
  const s = tax.summary(65771);
  near(s.incomeTax, 10519.3);
  near(s.lito, 13.44);
  assert.equal(s.medicareLevy, 1315.42);
  assert.equal(s.marginalRate, 0.32);
});

test('AU tax: LITO and the effective tax-free threshold of $22,575', () => {
  assert.equal(tax.lito(37500), 700);
  assert.equal(tax.lito(45000), 325);
  assert.equal(tax.lito(66667), 0);
  assert.equal(tax.summary(22575).taxAfterOffsets, 0);
  assert.equal(tax.summary(10000).taxAfterOffsets, 0); // offset never makes tax negative
});

test('AU tax: Medicare levy low-income shade-in', () => {
  assert.equal(tax.medicareLevy(28011), 0);
  near(tax.medicareLevy(30000), 198.9);
  near(tax.medicareLevy(35013), 700.2, 0.1);
  assert.equal(tax.medicareLevy(100000), 2000);
});

test('AU tax: rejects bad input', () => {
  assert.throws(() => tax.summary(-1), RangeError);
  assert.throws(() => tax.summary('abc'), RangeError);
});

test('compound: annual compounding matches the closed form', () => {
  const r = project({ principal: 10000, monthly: 0, ratePct: 5, years: 10, compoundsPerYear: 1 });
  near(r.finalBalance, 10000 * Math.pow(1.05, 10));
});

test('compound: zero rate is plain saving; schedule has one row per year', () => {
  const r = project({ principal: 0, monthly: 100, ratePct: 0, years: 10 });
  near(r.finalBalance, 12000);
  assert.equal(r.schedule.length, 10);
  near(r.totalInterest, 0);
  assert.throws(() => project({ principal: 1, ratePct: 5, years: 0 }), RangeError);
});

test('percent: of, what percent, change', () => {
  assert.equal(pct.of(15, 200), 30);
  assert.equal(pct.whatPercent(30, 200), 15);
  assert.equal(pct.change(80, 100), 25);
  assert.equal(pct.change(-50, -25), 50);
  assert.throws(() => pct.change(0, 5), RangeError);
});

test('text: counts and reading time', () => {
  const r = analyse('Hello world. This is a test!\n\nSecond paragraph here');
  assert.equal(r.words, 9);
  assert.equal(r.sentences, 3);
  assert.equal(r.paragraphs, 2);
  assert.equal(analyse('').words, 0);
  near(analyse(Array(238).fill('word').join(' ')).readingMinutes, 1);
});

test('dates: Medicare levy exemption day counts (277 and 222)', () => {
  assert.equal(dates.between('2025-07-01', '2026-04-04').days, 277);
  assert.equal(dates.between('2025-07-01', '2026-02-07', { inclusive: true }).days, 222);
});

test('dates: leap years, direction, weekdays, validation', () => {
  assert.equal(dates.between('2024-02-28', '2024-03-01').days, 2);
  assert.equal(dates.between('2026-03-01', '2026-02-28').days, -1);
  assert.equal(dates.between('2026-09-21', '2026-09-28').weekdays, 5);
  assert.throws(() => dates.parse('2025-02-30'), RangeError);
  assert.throws(() => dates.parse('30/02/2025'), RangeError);
});

const gst = require('../assets/calc/gst.js');
const sup = require('../assets/calc/super.js');
const help = require('../assets/calc/help.js');
const pay = require('../assets/calc/pay.js');

test('GST: add 10% and extract 1/11', () => {
  assert.deepEqual(gst.add(100), { exclusive: 100, gst: 10, inclusive: 110 });
  assert.deepEqual(gst.remove(110), { exclusive: 100, gst: 10, inclusive: 110 });
  assert.equal(gst.remove(99).gst, 9); // not 9.90: removing GST is not "minus 10%"
  assert.throws(() => gst.add(-1), RangeError);
});

test('super: 12% SG and the $30,000 concessional cap', () => {
  const r = sup.calc({ salary: 100000, salarySacrifice: 10000 });
  assert.equal(r.employerSG, 12000);
  assert.equal(r.concessionalTotal, 22000);
  assert.equal(r.capRemaining, 8000);
  assert.equal(r.overCap, false);
  assert.equal(sup.calc({ salary: 200000, salarySacrifice: 7000 }).overCap, true);
  assert.equal(sup.fromPackage(112000), 100000);
});

test('HELP 2025-26 marginal repayments, continuous at the band edges', () => {
  assert.equal(help.repayment(67000), 0);
  assert.equal(help.repayment(80000), 1950);
  assert.equal(help.repayment(125000), 8700);
  near(help.repayment(179285), 17928.45);
  near(help.repayment(179286), 17928.6);
  assert.equal(help.repayment(200000), 20000);
  assert.equal(help.repaymentIncome({ taxable: 65771, fringeBenefits: 29990 }), 95761);
});

test('pay conversion round-trips', () => {
  const r = pay.convert({ amount: 1000, period: 'weekly' });
  near(r.annual, 52000);
  near(r.hourly, 1000 / 38);
  near(r.fortnightly, 2000);
  near(pay.convert({ amount: r.hourly, period: 'hourly' }).weekly, 1000);
  assert.throws(() => pay.convert({ amount: 1, period: 'yearly' }), RangeError);
});
