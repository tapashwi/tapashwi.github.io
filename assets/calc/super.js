/*
 * Super guarantee (SG) for 2025-26: 12% of ordinary time earnings, from 1 July 2025.
 * Concessional (before-tax) contributions cap 2025-26: $30,000, which includes employer SG.
 * Source: ATO key super rates and thresholds. Ignores the maximum contribution base and
 * carry-forward of unused cap amounts.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else (root.CE = root.CE || {}).superGuarantee = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var SG_RATE = 0.12;
  var CONCESSIONAL_CAP = 30000;
  function amt(v, name) {
    var n = Number(v);
    if (!isFinite(n) || n < 0) throw new RangeError(name + ' must be 0 or more');
    return n;
  }
  function r2(n) { return Math.round(n * 100) / 100; }
  function calc(opts) {
    var salary = amt(opts.salary, 'Salary');
    var sacrifice = amt(opts.salarySacrifice || 0, 'Salary sacrifice');
    var sg = salary * SG_RATE;
    var concessional = sg + sacrifice;
    return {
      employerSG: r2(sg),
      perFortnight: r2(sg / 26),
      concessionalTotal: r2(concessional),
      capRemaining: r2(CONCESSIONAL_CAP - concessional),
      overCap: concessional > CONCESSIONAL_CAP,
    };
  }
  // Salary (excluding super) from a package quoted "including super".
  function fromPackage(pkg) {
    return r2(amt(pkg, 'Package') / (1 + SG_RATE));
  }
  return { SG_RATE: SG_RATE, CONCESSIONAL_CAP: CONCESSIONAL_CAP, calc: calc, fromPackage: fromPackage };
});
