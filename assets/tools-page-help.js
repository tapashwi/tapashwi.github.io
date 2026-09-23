var $ = function (id) { return document.getElementById(id); };
var v = function (id) { return $(id).value.replace(/[$,\s]/g, '') || 0; };
CE.bind($('f'), function () {
  var ri = CE.help.repaymentIncome({ taxable: v('ti'), fringeBenefits: v('rfb'), reportableSuper: v('rs'), investmentLosses: v('nil') });
  var rep = CE.help.repayment(ri);
  $('rep').textContent = CE.money(rep);
  $('ri').textContent = CE.money(ri);
  $('sh').textContent = ri > 0 ? CE.pct(rep / ri) : '0%';
}, $('err'));
