/* Convert pay between hourly, daily, weekly, fortnightly, monthly and annual. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else (root.CE = root.CE || {}).pay = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var PERIODS = ['hourly', 'daily', 'weekly', 'fortnightly', 'monthly', 'annual'];
  function num(v, name, min, max) {
    var n = Number(v);
    if (!isFinite(n) || n < min || n > max) throw new RangeError(name + ' must be between ' + min + ' and ' + max);
    return n;
  }
  function convert(opts) {
    var amount = num(opts.amount, 'Amount', 0, 1e9);
    var hours = num(opts.hoursPerWeek == null ? 38 : opts.hoursPerWeek, 'Hours per week', 1, 100);
    var days = num(opts.daysPerWeek == null ? 5 : opts.daysPerWeek, 'Days per week', 1, 7);
    var weeks = num(opts.weeksPerYear == null ? 52 : opts.weeksPerYear, 'Weeks per year', 1, 53);
    if (PERIODS.indexOf(opts.period) < 0) throw new RangeError('Unknown pay period');
    var perYear = { hourly: hours * weeks, daily: days * weeks, weekly: weeks, fortnightly: weeks / 2, monthly: 12, annual: 1 };
    var annual = amount * perYear[opts.period];
    var out = {};
    PERIODS.forEach(function (p) { out[p] = annual / perYear[p]; });
    return out;
  }
  return { PERIODS: PERIODS, convert: convert };
});
