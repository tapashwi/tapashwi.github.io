/* Days between two calendar dates, computed in UTC so daylight-saving changes cannot shift the count. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else (root.CE = root.CE || {}).dates = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var DAY = 86400000;

  function parse(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso));
    if (!m) throw new RangeError('Use a date in YYYY-MM-DD form');
    var t = Date.UTC(+m[1], +m[2] - 1, +m[3]);
    var d = new Date(t);
    if (d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) throw new RangeError('That date does not exist');
    return t;
  }

  function between(startIso, endIso, opts) {
    var a = parse(startIso);
    var b = parse(endIso);
    var sign = b >= a ? 1 : -1;
    var lo = Math.min(a, b);
    var hi = Math.max(a, b);
    var inclusive = !!(opts && opts.inclusive);
    var days = Math.round((hi - lo) / DAY) + (inclusive ? 1 : 0);
    var weekdays = 0;
    var span = Math.round((hi - lo) / DAY) + (inclusive ? 1 : 0);
    for (var i = 0; i < span; i++) {
      var dow = new Date(lo + i * DAY).getUTCDay();
      if (dow !== 0 && dow !== 6) weekdays++;
    }
    return { days: days * sign, weekdays: weekdays * sign, weeks: Math.floor(days / 7), remainderDays: days % 7 };
  }

  return { parse: parse, between: between };
});
