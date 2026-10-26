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
  document.querySelectorAll('.reveal, .wipe, .split, .tile').forEach(function (el) { io.observe(el); });

  /* hero lines play on load */
  requestAnimationFrame(function () {
    document.querySelectorAll('.hero .split, .hero .wipe, .page-head .split').forEach(function (el) { el.classList.add('is-in'); });
  });

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
