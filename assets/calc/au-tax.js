/*
 * Australian resident income tax, FY2025-26 (1 July 2025 - 30 June 2026).
 * Sources: ATO resident tax rates 2025-26; ATO low income tax offset; ATO Medicare levy
 * reduction for low-income earners (singles thresholds $28,011 / $35,013).
 * Excludes: Medicare levy surcharge, HELP repayments, SAPTO, family thresholds.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else (root.CE = root.CE || {}).auTax = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var BRACKETS = [
    { from: 0, to: 18200, rate: 0 },
    { from: 18200, to: 45000, rate: 0.16 },
    { from: 45000, to: 135000, rate: 0.3 },
    { from: 135000, to: 190000, rate: 0.37 },
    { from: 190000, to: Infinity, rate: 0.45 },
  ];
  var MEDICARE = { rate: 0.02, lower: 28011, upper: 35013, shadeIn: 0.1 };

  function check(income) {
    var n = Number(income);
    if (!isFinite(n) || n < 0) throw new RangeError('Income must be a number of 0 or more');
    return Math.floor(n); // the ATO works on whole dollars of taxable income
  }

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function incomeTax(income) {
    var ti = check(income);
    var tax = 0;
    for (var i = 0; i < BRACKETS.length; i++) {
      var b = BRACKETS[i];
      if (ti > b.from) tax += (Math.min(ti, b.to) - b.from) * b.rate;
    }
    return round2(tax);
  }

  function lito(income) {
    var ti = check(income);
    var offset;
    if (ti <= 37500) offset = 700;
    else if (ti <= 45000) offset = 700 - 0.05 * (ti - 37500);
    else if (ti <= 66667) offset = 325 - 0.015 * (ti - 45000);
    else offset = 0;
    return round2(Math.max(0, offset));
  }

  function medicareLevy(income) {
    var ti = check(income);
    if (ti <= MEDICARE.lower) return 0;
    var full = ti * MEDICARE.rate;
    if (ti <= MEDICARE.upper) return round2(Math.min(full, (ti - MEDICARE.lower) * MEDICARE.shadeIn));
    return round2(full);
  }

  function marginalRate(income) {
    var ti = check(income);
    for (var i = BRACKETS.length - 1; i >= 0; i--) if (ti > BRACKETS[i].from) return BRACKETS[i].rate;
    return 0;
  }

  function summary(income) {
    var ti = check(income);
    var gross = incomeTax(ti);
    var offset = Math.min(lito(ti), gross); // a non-refundable offset can only reduce tax to zero
    var net = round2(gross - offset);
    var levy = medicareLevy(ti);
    var total = round2(net + levy);
    return {
      taxableIncome: ti,
      incomeTax: gross,
      lito: round2(offset),
      taxAfterOffsets: net,
      medicareLevy: levy,
      totalTax: total,
      takeHome: round2(ti - total),
      averageRate: ti > 0 ? total / ti : 0,
      marginalRate: marginalRate(ti) + (ti > MEDICARE.upper ? MEDICARE.rate : 0),
    };
  }

  return { BRACKETS: BRACKETS, incomeTax: incomeTax, lito: lito, medicareLevy: medicareLevy, marginalRate: marginalRate, summary: summary };
});
