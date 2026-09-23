/* Australian GST at 10%: add it to a price, or extract it from a GST-inclusive price (÷ 11). */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else (root.CE = root.CE || {}).gst = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var RATE = 0.1;
  function amt(v) {
    var n = Number(v);
    if (!isFinite(n) || n < 0) throw new RangeError('Enter an amount of 0 or more');
    return n;
  }
  function r2(n) { return Math.round(n * 100) / 100; }
  return {
    RATE: RATE,
    add: function (exclusive) {
      var ex = amt(exclusive);
      return { exclusive: r2(ex), gst: r2(ex * RATE), inclusive: r2(ex * (1 + RATE)) };
    },
    remove: function (inclusive) {
      var inc = amt(inclusive);
      var gst = inc / 11; // GST is 1/11 of a GST-inclusive price
      return { exclusive: r2(inc - gst), gst: r2(gst), inclusive: r2(inc) };
    },
  };
});
