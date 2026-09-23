var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  var raw = $('income').value.replace(/[$,\s]/g, '');
  var s = CE.auTax.summary(raw === '' ? 0 : raw);
  $('take').textContent = CE.money(s.takeHome);
  $('total').textContent = CE.money(s.totalTax);
  $('avg').textContent = CE.pct(s.averageRate);
  $('marg').textContent = CE.pct(s.marginalRate, 0);
  $('t1').textContent = CE.money(s.incomeTax);
  $('t2').textContent = '−' + CE.money(s.lito);
  $('t3').textContent = CE.money(s.taxAfterOffsets);
  $('t4').textContent = CE.money(s.medicareLevy);
  $('t5').textContent = CE.money(s.totalTax);
  $('fn').textContent = CE.money(s.takeHome / 26);
}, $('err'));
