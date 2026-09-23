/* Percentage arithmetic: X% of Y, X is what % of Y, and % change from A to B. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else (root.CE = root.CE || {}).percent = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function n(v) {
    var x = Number(v);
    if (!isFinite(x)) throw new RangeError('Enter a number');
    return x;
  }

  return {
    of: function (pct, value) {
      return (n(pct) / 100) * n(value);
    },
    whatPercent: function (part, whole) {
      if (n(whole) === 0) throw new RangeError('The whole cannot be 0');
      return (n(part) / n(whole)) * 100;
    },
    change: function (from, to) {
      if (n(from) === 0) throw new RangeError('The starting value cannot be 0');
      return ((n(to) - n(from)) / Math.abs(n(from))) * 100;
    },
  };
});
