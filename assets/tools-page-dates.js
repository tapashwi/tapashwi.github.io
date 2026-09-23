var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  var r = CE.dates.between($('a').value, $('b').value, { inclusive: $('inc').checked });
  $('d').textContent = CE.number(r.days, 0);
  $('wk').textContent = r.weeks + ' w ' + r.remainderDays + ' d';
  $('wd').textContent = CE.number(r.weekdays, 0);
}, $('err'));
