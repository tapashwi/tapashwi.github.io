var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  var r = CE.superGuarantee.calc({ salary: $('sal').value.replace(/[$,\s]/g, '') || 0, salarySacrifice: $('ss').value.replace(/[$,\s]/g, '') || 0 });
  $('sg').textContent = CE.money(r.employerSG);
  $('fn').textContent = CE.money(r.perFortnight);
  $('tot').textContent = CE.money(r.concessionalTotal);
  $('room').textContent = r.overCap ? 'Over by ' + CE.money(-r.capRemaining) : CE.money(r.capRemaining);
  $('warn').textContent = r.overCap ? 'Over the cap: the excess is added to your taxable income and taxed at your marginal rate, less a 15% offset. Unused cap from earlier years may cover it if your super balance was under $500,000.' : '';
}, $('err'));
