var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  var v = $('amt').value.replace(/[$,\s]/g, '') || 0;
  var r = $('mode').value === 'add' ? CE.gst.add(v) : CE.gst.remove(v);
  $('g').textContent = CE.money(r.gst);
  $('ex').textContent = CE.money(r.exclusive);
  $('inc').textContent = CE.money(r.inclusive);
}, $('err'));
