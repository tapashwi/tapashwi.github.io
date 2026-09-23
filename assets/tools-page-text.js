var $ = function (id) { return document.getElementById(id); };
CE.bind($('f'), function () {
  var r = CE.text.analyse($('t').value);
  $('w').textContent = CE.number(r.words, 0);
  $('c').textContent = CE.number(r.characters, 0);
  $('cn').textContent = CE.number(r.charactersNoSpaces, 0);
  $('s').textContent = CE.number(r.sentences, 0);
  $('pa').textContent = CE.number(r.paragraphs, 0);
  $('rt').textContent = r.words ? CE.minutes(r.readingMinutes) : '–';
  $('st').textContent = r.words ? CE.minutes(r.speakingMinutes) : '–';
}, $('err'));
