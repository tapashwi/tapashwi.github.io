// Shared helpers for tool pages: number formatting and optional AdSense wiring.
(function () {
  'use strict';
  var CE = (window.CE = window.CE || {});

  CE.money = function (n, currency) {
    return new Intl.NumberFormat('en-AU', { style: 'currency', currency: currency || 'AUD', maximumFractionDigits: 2 }).format(n);
  };
  CE.number = function (n, digits) {
    return new Intl.NumberFormat('en-AU', { maximumFractionDigits: digits == null ? 2 : digits }).format(n);
  };
  CE.pct = function (fraction, digits) {
    return CE.number(fraction * 100, digits == null ? 1 : digits) + '%';
  };
  CE.minutes = function (m) {
    if (m < 1) return Math.max(1, Math.round(m * 60)) + ' sec';
    var whole = Math.floor(m);
    var sec = Math.round((m - whole) * 60);
    return whole + ' min' + (sec ? ' ' + sec + ' sec' : '');
  };
  // Run fn on every input change; show a RangeError's message instead of a result.
  CE.bind = function (form, fn, errEl) {
    function run() {
      try {
        errEl.textContent = '';
        fn();
      } catch (e) {
        if (!(e instanceof RangeError)) throw e;
        errEl.textContent = e.message;
      }
    }
    form.addEventListener('input', run);
    form.addEventListener('submit', function (e) { e.preventDefault(); run(); });
    run();
  };

  // AdSense: only when a client ID and slot are configured (see site-config.js).
  var cfg = window.CE_CONFIG || {};
  if (cfg.adsenseClient) {
    var s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + cfg.adsenseClient;
    document.head.appendChild(s);
    document.querySelectorAll('.ad[data-slot]').forEach(function (el) {
      var slot = (cfg.adSlots || {})[el.getAttribute('data-slot')];
      if (!slot) return;
      el.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="' + cfg.adsenseClient +
        '" data-ad-slot="' + slot + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }
})();
