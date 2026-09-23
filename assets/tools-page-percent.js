var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  $('ra').textContent = CE.number(CE.percent.of($('a1').value, $('a2').value), 4);
  $('rb').textContent = CE.number(CE.percent.whatPercent($('b1').value, $('b2').value), 4) + '%';
  var c = CE.percent.change($('c1').value, $('c2').value);
  $('rc').textContent = (c > 0 ? '+' : '') + CE.number(c, 4) + '%';
}, $('err'));
