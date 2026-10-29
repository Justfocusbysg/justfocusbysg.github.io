/* Just Focus by SG — interactions & animations */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

  window.observeReveal = function (el) { io.observe(el); };

  function start() {
    document.querySelectorAll('.reveal, .wipe, .split, .tile').forEach(function (el) { io.observe(el); });
    /* hero lines play as soon as the page is shown */
    requestAnimationFrame(function () {
      document.querySelectorAll('.hero .split, .hero .wipe, .page-head .split').forEach(function (el) { el.classList.add('is-in'); });
    });
  }

  /* ---------- Intro: the logo signs itself, then the curtain lifts ----------
     Played once per visit (session); later pages open straight away. */
  var loader = document.querySelector('.loader');
  var seen = false;
  try { seen = sessionStorage.getItem('jf-intro') === '1'; } catch (e) {}
  if (!loader || seen) {
    if (loader) loader.remove();
    start();
  } else {
    root.classList.add('is-loading');
    try { sessionStorage.setItem('jf-intro', '1'); } catch (e) {}
    var minTime = reduce ? 500 : 1500;
    var t0 = Date.now();
    var done = false;
    var finish = function () {
      if (done) return;
      done = true;
      var wait = Math.max(0, minTime - (Date.now() - t0));
      setTimeout(function () {
        loader.classList.add('is-done');
        root.classList.remove('is-loading');
        setTimeout(start, reduce ? 0 : 350);
        setTimeout(function () { loader.remove(); }, 1200);
      }, wait);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish);
    setTimeout(finish, 3500); /* never hold the page longer than this */
  }

  /* ---------- Header: solid after scroll, hides when scrolling down ---------- */
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.progress');
  var lastY = window.scrollY;
  var parallax = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle('is-solid', y > 40);
      header.classList.toggle('is-hidden', y > 400 && y > lastY && !root.classList.contains('menu-open'));
    }
    lastY = y;
    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    }
    if (!reduce) {
      var vh = window.innerHeight;
      parallax.forEach(function (img) {
        var box = img.parentElement.getBoundingClientRect();
        if (box.bottom < 0 || box.top > vh) return;
        var speed = parseFloat(img.dataset.parallax) || 0.12;
        var progress = (box.top + box.height / 2 - vh / 2) / vh; // -1 .. 1
        img.style.transform = 'translate3d(0,' + (progress * speed * -100).toFixed(2) + 'px,0)';
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Light / dark mode ---------- */
  var toggle = document.querySelector('.theme-toggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function syncToggle() {
    var light = root.dataset.theme === 'light';
    if (toggle) {
      toggle.setAttribute('aria-pressed', light ? 'true' : 'false');
      toggle.setAttribute('aria-label', light ? 'Activer le mode sombre' : 'Activer le mode clair');
    }
    if (themeMeta) themeMeta.setAttribute('content', light ? '#F4F2EE' : '#0E0E0E');
  }
  syncToggle();
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'light' ? 'dark' : 'light';
      var apply = function () {
        root.dataset.theme = next;
        try { localStorage.setItem('jf-theme', next); } catch (e) {}
        syncToggle();
      };
      if (document.startViewTransition && !reduce) {
        var b = toggle.getBoundingClientRect();
        root.style.setProperty('--vt-x', (b.left + b.width / 2) + 'px');
        root.style.setProperty('--vt-y', (b.top + b.height / 2) + 'px');
        document.startViewTransition(apply);
      } else {
        apply();
      }
    });
  }

  /* ---------- Mood: turquoise / bleu nuit ---------- */
  var mood = document.querySelector('.mood-toggle');
  function syncMood() {
    var nuit = root.dataset.mood === 'nuit';
    mood.setAttribute('aria-pressed', nuit ? 'true' : 'false');
    mood.setAttribute('aria-label', nuit ? 'Ambiance turquoise' : 'Ambiance bleu nuit');
  }
  if (mood) {
    syncMood();
    mood.addEventListener('click', function () {
      var next = root.dataset.mood === 'nuit' ? 'turquoise' : 'nuit';
      var apply = function () {
        if (next === 'nuit') root.dataset.mood = 'nuit';
        else delete root.dataset.mood;
        try { localStorage.setItem('jf-mood', next); } catch (e) {}
        syncMood();
      };
      if (document.startViewTransition && !reduce) {
        var b = mood.getBoundingClientRect();
        root.style.setProperty('--vt-x', (b.left + b.width / 2) + 'px');
        root.style.setProperty('--vt-y', (b.top + b.height / 2) + 'px');
        document.startViewTransition(apply);
      } else {
        apply();
      }
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = root.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        root.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Count-up stats ---------- */
  var cio = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      cio.unobserve(e.target);
      var el = e.target;
      var end = parseInt(el.dataset.count, 10);
      var suffix = el.dataset.suffix || '';
      if (reduce) { el.textContent = end + suffix; return; }
      var t0 = null;
      function step(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / 1600, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(function (el) { cio.observe(el); });

  /* ---------- Contact form → pre-filled email ---------- */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var subject = 'Projet — ' + d.get('type') + ' — ' + d.get('nom');
      var body =
        'Bonjour Steven,\n\n' + d.get('message') +
        '\n\nType de projet : ' + d.get('type') +
        '\nDate / période : ' + (d.get('date') || 'à définir') +
        '\n\n' + d.get('nom') + '\n' + d.get('email');
      window.location.href = 'mailto:sg.justfocuson@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
