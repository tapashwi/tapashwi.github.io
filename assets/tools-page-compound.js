var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  var r = CE.compound.project({ principal: $('p').value || 0, monthly: $('m').value || 0, ratePct: $('r').value || 0,
    years: $('y').value, compoundsPerYear: $('n').value });
  $('fb').textContent = CE.money(r.finalBalance);
  $('tc').textContent = CE.money(r.totalContributed);
  $('ti').textContent = CE.money(r.totalInterest);
  $('rows').innerHTML = r.schedule.map(function (row) {
    return '<tr><td>' + row.year + '</td><td>' + CE.money(row.contributed) + '</td><td>' + CE.money(row.interest) +
      '</td><td>' + CE.money(row.balance) + '</td></tr>';
  }).join('');
}, $('err'));
