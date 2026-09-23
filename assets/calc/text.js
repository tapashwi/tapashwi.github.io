/*
 * Word, character and sentence counts, plus reading and speaking time.
 * Reading speed 238 wpm: Brysbaert (2019) meta-analysis of silent reading of English
 * non-fiction. Speaking speed 150 wpm: a common presentation pace.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else (root.CE = root.CE || {}).text = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var READ_WPM = 238;
  var SPEAK_WPM = 150;

  function analyse(input) {
    var s = String(input == null ? '' : input);
    var trimmed = s.trim();
    var words = trimmed ? trimmed.split(/\s+/).filter(function (w) { return /[\p{L}\p{N}]/u.test(w); }).length : 0;
    var sentences = trimmed ? (trimmed.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || []).filter(function (x) { return /[\p{L}\p{N}]/u.test(x); }).length : 0;
    var paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter(function (p) { return p.trim(); }).length : 0;
    return {
      words: words,
      characters: Array.from(s).length,
      charactersNoSpaces: Array.from(s.replace(/\s/g, '')).length,
      sentences: sentences,
      paragraphs: paragraphs,
      readingMinutes: words / READ_WPM,
      speakingMinutes: words / SPEAK_WPM,
    };
  }

  return { READ_WPM: READ_WPM, SPEAK_WPM: SPEAK_WPM, analyse: analyse };
});
