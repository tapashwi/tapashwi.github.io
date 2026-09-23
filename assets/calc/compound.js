/*
 * Compound growth with regular monthly contributions (added at the end of each month).
 * The nominal annual rate is compounded n times a year; it is converted to the equivalent
 * monthly rate so contributions and compounding line up: (1 + r/n)^(n/12) - 1.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else (root.CE = root.CE || {}).compound = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function num(v, name, min, max) {
    var n = Number(v);
    if (!isFinite(n) || n < min || n > max) throw new RangeError(name + ' must be between ' + min + ' and ' + max);
    return n;
  }

  function project(opts) {
    var principal = num(opts.principal, 'Starting amount', 0, 1e12);
    var monthly = num(opts.monthly || 0, 'Monthly contribution', 0, 1e9);
    var rate = num(opts.ratePct, 'Interest rate', -50, 100) / 100;
    var years = Math.round(num(opts.years, 'Years', 1, 100));
    var n = num(opts.compoundsPerYear || 12, 'Compounding periods', 1, 365);
    var monthlyRate = Math.pow(1 + rate / n, n / 12) - 1;

    var balance = principal;
    var contributed = principal;
    var schedule = [];
    for (var y = 1; y <= years; y++) {
      for (var m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyRate) + monthly;
        contributed += monthly;
      }
      schedule.push({ year: y, balance: balance, contributed: contributed, interest: balance - contributed });
    }
    return { finalBalance: balance, totalContributed: contributed, totalInterest: balance - contributed, monthlyRate: monthlyRate, schedule: schedule };
  }

  return { project: project };
});
