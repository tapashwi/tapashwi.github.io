/*
 * Compulsory HELP/study loan repayment, 2025-26 marginal system (ATO):
 *   $0 – $67,000             nil
 *   $67,001 – $125,000       15c per $1 over $67,000
 *   $125,001 – $179,285      $8,700 + 17c per $1 over $125,000
 *   $179,286 and over        10% of total repayment income
 * Repayment income = taxable income + reportable fringe benefits + reportable super
 * contributions + net investment losses + exempt foreign employment income.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else (root.CE = root.CE || {}).help = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  function amt(v, name) {
    var n = Number(v);
    if (!isFinite(n) || n < 0) throw new RangeError(name + ' must be 0 or more');
    return n;
  }
  function r2(n) { return Math.round(n * 100) / 100; }
  function repaymentIncome(parts) {
    return amt(parts.taxable, 'Taxable income') + amt(parts.fringeBenefits || 0, 'Reportable fringe benefits') +
      amt(parts.reportableSuper || 0, 'Reportable super') + amt(parts.investmentLosses || 0, 'Net investment losses');
  }
  function repayment(income) {
    var ri = Math.floor(amt(income, 'Repayment income'));
    if (ri <= 67000) return 0;
    if (ri <= 125000) return r2((ri - 67000) * 0.15);
    if (ri <= 179285) return r2(8700 + (ri - 125000) * 0.17);
    return r2(ri * 0.1);
  }
  return { repaymentIncome: repaymentIncome, repayment: repayment };
});
