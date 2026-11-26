/* Galerie Travaux : filtres + lightbox (même ordre que la version d'origine)
   Chaque ligne : [fichier, largeur, hauteur, catégorie, description] */
(function () {
  var CATS = {
    sport: 'Sport',
    marques: 'Marques & contenus',
    events: 'Événements & mariages',
    lieux: 'Entreprises & lieux'
  };
  var ALL = [
    ['fa61a51db096ecbefcd030748038e471', 1600, 2000, 'sport', "Volleyeur de l'équipe de France en pleine attaque sous les projecteurs"],
    ['52bb8f680ba6b6553d6959bc06f5a78e', 2061, 2576, 'events', 'Chanteur bras ouverts face au public, lumière rouge'],
    ['db853a11a38537f7fb8f2dd2dfd264ef', 1500, 2000, 'marques', 'Trois handballeurs en tenue Asics assis en tribune'],
    ['5acfdce693c6361ab72d2ea5ecdb4258', 1500, 2000, 'sport', 'Dunk au cercle pendant un match de basket'],
    ['5033c51128407c2e663e8a90ccf0c3f3', 2061, 2576, 'events', 'Jeunes mariés franchissant une vieille porte en bois'],
    ['6ff06ac35aac1b1010ce158f2cff8e52', 1500, 2000, 'sport', 'Joueur de Strasbourg concentré sous les projecteurs'],
    ['8b88750466cf9cb44133cc83e8456e37', 1500, 2000, 'lieux', 'Glaçons versés dans un verre sur le comptoir du bar'],
    ['7d80bee8c6d6257522353164c7cfdd1a', 1500, 2000, 'lieux', 'Chambre du gîte Du côté de chez Anne, poutres et lumière ambrée'],
    ['159834a5de1a80d2cc5be42e02ac87d5', 1600, 2000, 'sport', "Handballeur de l'équipe de France en suspension devant le public"],
    ['326ec947d92868f4a910a201ab078bde', 1600, 2000, 'marques', 'Handballeur en t-shirt Asics, ballon en main'],
    ['9b2f1b146f4668bef56385677c4a5349', 1600, 2000, 'events', 'Artiste sur scène entre deux jets de fumée'],
    ['b4fe690d12c6b96364f781dec57505b7', 1600, 2000, 'sport', 'Joueuse de handball qui crie sa joie après un but'],
    ['2d72309b3013cf3bee024542c8afbd2a', 1600, 2000, 'sport', 'Deux volleyeurs brésiliens au contre'],
    ['668f0959202bf460e3d12d720c8354e5', 1500, 2000, 'events', 'Couple de mariés au coucher du soleil'],
    ['f83b26f44e9653c8b8f44fb4d78a02b4', 1600, 2000, 'marques', 'Joueur assis dans un couloir, baskets mises en valeur'],
    ['5b1d4c2045d39e67a73d01b95d5c82db', 1500, 2000, 'marques', 'Shooting merchandising de la SIG Strasbourg sur le parquet'],
    ['d3b5702279170243c02f9f284d6ccaa6', 1500, 2000, 'lieux', 'Cocktail mousseux caramélisé servi sur un plateau en bois'],
    ['ffe1bfa3abe8f5d7f9ba629bcfff3846', 1500, 2000, 'events', 'Préparatifs de la mariée, robe suspendue à la fenêtre'],
    ['dd8127c6f116dbdb3a5f797b37cf7601', 1500, 2000, 'lieux', 'Fauteuil près des fenêtres dans une chambre du gîte'],
    ['31685fde394669b1716b2375303ef1c4', 1500, 2000, 'marques', 'Joueur en t-shirt #GoSIG, ballon sous le bras'],
    ['ec40b3bc8c4b55f6afd0d92b112ed1c9', 2576, 1717, 'sport', 'Joueur de Strasbourg en Basketball Champions League'],
    ['485bd44bda3f1cc01faef57210b8fb7b', 1500, 2000, 'sport', 'Handballeur de Montpellier qui célèbre un but'],
    ['d210c05556850e175987373b27f57d51', 1500, 2000, 'events', 'Baiser des mariés en noir et blanc'],
    ['011bd836bb41b4987b1bf0a519dc61a8', 1500, 2000, 'lieux', 'Coin fauteuil baigné de lumière douce'],
    ['71e219370c6dc00f9561fc19fdc69f75', 1600, 2000, 'sport', "Handballeur de l'équipe de France plongeant pour tirer"],
    ['9ba370926e56220a5bb4cc750e8dd7b4', 1500, 2000, 'marques', 'Maillot de handball posé sur une voiture ancienne'],
    ['817348026ccc8fa1554c94ff0ec8ea7e', 1500, 2000, 'sport', 'Handballeur de dos, numéro 13, face aux projecteurs'],
    ['117e8595a0a186a48ef649aa29f2364f', 1500, 2000, 'lieux', 'Club sandwich et potatoes, une main qui en pioche une'],
    ['227015191b4fb4705f217ee175f8d7ac', 1500, 2000, 'events', 'Mariée qui lève son bouquet sous les pétales'],
    ['f848c85dcb3536f5aae19f5b9c1a2706', 1600, 2000, 'sport', 'Volleyeuse en pleine attaque'],
    ['fca915f0b09f3efffd2c811939c434d3', 1500, 2000, 'sport', 'Dunk spectaculaire face à la défense de Strasbourg'],
    ['be00f20cf9cbd999430b09f277ac7624', 1500, 2000, 'lieux', 'Chambre lumineuse avec tête de lit sculptée'],
    ['e7e5a9b5e95b70696e80fbab3de5e316', 1500, 2000, 'sport', 'Volleyeuses qui célèbrent un point'],
    ['49b5c19444b77c38efd4e6c7450c33dd', 1500, 2000, 'marques', 'Maillot suspendu sur des planches de bois brut'],
    ['e49c161bb04772633736fc2e81914ebf', 1500, 2000, 'events', 'Réception de mariage sous une verrière illuminée'],
    ['a1a1439b060e9ec3a05818648e17da04', 1500, 2000, 'marques', 'Maillot du MOC Molsheim et son sponsor en gros plan'],
    ['4947e1bd3be8a2fbb71b4f16ceaa125a', 1333, 2000, 'lieux', "Cartes d'accueil du gîte Du côté de chez Anne"],
    ['632e5eba3568247d6b0afe66bf4a9b24', 1500, 2000, 'events', 'Table de mariage dressée en plein air'],
    ['01b64961894c70ccedb326b89005889b', 1500, 2000, 'marques', 'Joueur de la SIG posé devant le portant de merchandising'],
    ['2c3ff92124d97744a8e67707858efd79', 1500, 2000, 'events', "Service du champagne au vin d'honneur"],
    ['ab92fa19f0ad5a34ae632e4aca2015d2', 1500, 2000, 'lieux', 'Vin blanc, guacamole et carte du restaurant sur une table sombre'],
    ['bcb671c2aa9b62cc6271d562c0c7c9d7', 1500, 2000, 'lieux', 'Chambre lumineuse aux tons roses'],
    ['d75c8226a8f3821cb8121abca6c14a49', 1500, 2000, 'events', "Cadeaux d'invités : tasses fleuries et étiquettes"],
    ['df9a7b3749ff412ad7a7851334a455e0', 1600, 2000, 'events', 'Silhouette à contre-jour sur scène'],
    ['2d7c30103371220a06ea7942425e769b', 1500, 2000, 'marques', 'Maillot de la SIG Strasbourg suspendu sous le panier, shooting merch'],
    ['39559180bdf02cc246ae2806a0525c9c', 1600, 2000, 'sport', 'Volleyeuse qui plonge pour sauver le ballon'],
    ['66863a564d53333e627ca00255a40487', 1600, 2000, 'events', 'Mariés dans une rue de centre-ville'],
    ['dd5d7530e59d74425250aeb7b58460d5', 1600, 2000, 'sport', 'Volleyeur français au sol après une défense'],
    ['592de052024894bb93f790b992a396f2', 2000, 1500, 'events', 'Mariés à contre-jour au soleil couchant']
  ];

  var gallery = document.getElementById('gallery');
  var filtersEl = document.getElementById('filters');
  var filter = 'all';
  var visible = [];

  /* tiles */
  var tiles = ALL.map(function (r, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'tile';
    b.dataset.cat = r[3];
    b.setAttribute('aria-label', 'Agrandir : ' + r[2]);
    var base = 'assets/img/web/' + r[0];
    b.innerHTML = '<img src="' + base + '-800.webp" srcset="' + base + '-800.webp 800w, ' + base + '-1600.webp 1600w" sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" alt="" width="' + r[1] + '" height="' + r[2] + '" loading="lazy" decoding="async"><span>' + CATS[r[3]] + '</span>';
    b.querySelector('img').alt = r[4];
    b.querySelector('img').style.aspectRatio = r[1] + ' / ' + r[2];
    b.addEventListener('click', function () { open(visible.indexOf(i)); });
    gallery.appendChild(b);
    return b;
  });

  /* filters */
  var defs = [['all', 'Tous']].concat(Object.keys(CATS).map(function (k) { return [k, CATS[k]]; }));
  var chips = defs.map(function (d) {
    var c = document.createElement('button');
    c.type = 'button';
    c.className = 'chip';
    var n = d[0] === 'all' ? ALL.length : ALL.filter(function (r) { return r[3] === d[0]; }).length;
    c.innerHTML = d[1] + ' <small>' + n + '</small>';
    c.addEventListener('click', function () { apply(d[0], true); });
    filtersEl.appendChild(c);
    return { key: d[0], el: c };
  });

  function apply(key, fromClick) {
    filter = CATS[key] ? key : 'all';
    chips.forEach(function (c) { c.el.setAttribute('aria-pressed', c.key === filter ? 'true' : 'false'); });
    visible = [];
    var k = 0;
    tiles.forEach(function (t, i) {
      var show = filter === 'all' || ALL[i][3] === filter;
      t.classList.toggle('is-hidden', !show);
      if (show) {
        visible.push(i);
        if (fromClick) {
          /* replay the entrance, staggered */
          t.classList.remove('is-in');
          t.style.transitionDelay = Math.min(k, 12) * 0.05 + 's';
          (function (el) { setTimeout(function () { el.classList.add('is-in'); }, 30); })(t);
          k++;
        }
      }
    });
    if (fromClick) history.replaceState(null, '', filter === 'all' ? location.pathname : '#' + filter);
  }
  apply(location.hash.slice(1), false);

  /* lightbox */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCount = document.getElementById('lb-count');
  var current = -1;
  var lastFocus = null;

  function show(pos) {
    var n = visible.length;
    current = (pos + n) % n;
    var r = ALL[visible[current]];
    lbImg.classList.remove('is-ready');
    lbImg.onload = function () { lbImg.classList.add('is-ready'); };
    lbImg.src = 'assets/img/web/' + r[0] + '-1600.webp';
    lbImg.alt = r[4];
    if (lbImg.complete) lbImg.classList.add('is-ready');
    lbCount.innerHTML = '<b>' + CATS[r[3]] + '</b> · ' + (current + 1) + ' / ' + n;
  }
  function open(pos) {
    lastFocus = document.activeElement;
    show(pos);
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('lb-close').focus();
  }
  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.getElementById('lb-prev').addEventListener('click', function () { show(current - 1); });
  document.getElementById('lb-next').addEventListener('click', function () { show(current + 1); });
  document.getElementById('lb-close').addEventListener('click', close);
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.tagName === 'FIGURE') close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  /* swipe on phone */
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
