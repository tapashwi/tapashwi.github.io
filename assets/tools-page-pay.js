var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  var r = CE.pay.convert({ amount: $('amt').value.replace(/[$,\s]/g, '') || 0, period: $('per').value,
    hoursPerWeek: $('hrs').value, daysPerWeek: $('dys').value });
  CE.pay.PERIODS.forEach(function (p) { $(p).textContent = CE.money(r[p]); });
}, $('err'));
