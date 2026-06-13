/* ============================================================
   PROJECTS — данные проектов, галерея-модалка и сетка.
   Общий файл: используется на index.html (слайдер «Наши проекты»)
   и на projects.html (полная галерея). Данные — в одном месте.
   ============================================================ */
(function () {
  'use strict';

  /* ─── ДАННЫЕ ПРОЕКТОВ ───
     cover   — фото для плитки/слайда (без расширения, грузится .webp/.png)
     gallery — массив фото для листания в модалке (без расширения)
     plans   — 2D-планы по этажам
  */
  var PROJECTS = [
    {
      badge: 'Проект №1',
      title: 'Одноэтажный коттедж в Крыму',
      short: 'Одноэтажный дом с панорамными окнами и открытой террасой.',
      desc: 'Уютный одноэтажный дом с панорамными окнами и открытой террасой. Продуманная планировка объединяет гостиную и кухню в единое светлое пространство. Строительство под ключ — от проекта до финальной отделки.',
      cover: 'assets/img/Image1-000',
      gallery: ['assets/img/Image1-000'],
      plans: [
        { label: '1 этаж', src: 'assets/img/plan1-floor1-project1.webp' },
        { label: '2 этаж', src: 'assets/img/plan1-floor2-project1.webp' }
      ],
      specs: [
        ['Площадь', '120 м²'],
        ['Этажность', '1 этаж'],
        ['Материал', 'Газобетон'],
        ['Срок строительства', '5 месяцев'],
        ['Расположение', 'Крым']
      ]
    },
    {
      badge: 'Проект №2',
      title: 'Коттедж в пригороде Симферополя',
      short: 'Современный загородный дом с чистыми геометрическими формами.',
      desc: 'Современный загородный дом с чистыми геометрическими формами. Большие застеклённые фасады обеспечивают естественное освещение во всех комнатах. Реализован под ключ с авторским надзором.',
      cover: 'assets/img/Image20',
      gallery: ['assets/img/Image20'],
      plans: [
        { label: '1 этаж', src: 'assets/img/plan1-floor1-project2.webp' },
        { label: '2 этаж', src: 'assets/img/plan1-floor2-project2.webp' }
      ],
      specs: [
        ['Площадь', '145 м²'],
        ['Этажность', '2 этажа'],
        ['Материал', 'Кирпич'],
        ['Срок строительства', '7 месяцев'],
        ['Расположение', 'Симферополь']
      ]
    },
    {
      badge: 'Проект №3',
      title: 'Двухэтажный дом в Крыму',
      short: 'Просторный двухэтажный коттедж с эксплуатируемой кровлей и гаражом.',
      desc: 'Просторный двухэтажный коттедж с эксплуатируемой кровлей и встроенным гаражом. Нижний этаж — общественные зоны, верхний — спальни с собственными санузлами. Выполнен в стиле современного минимализма.',
      cover: 'assets/img/Image32-000',
      gallery: ['assets/img/Image32-000'],
      plans: [
        { label: 'План', src: 'assets/img/plan1-project3.webp' }
      ],
      specs: [
        ['Площадь', '210 м²'],
        ['Этажность', '2 этажа'],
        ['Материал', 'Монолит + газобетон'],
        ['Срок строительства', '9 месяцев'],
        ['Расположение', 'Крым']
      ]
    },
    {
      badge: 'Проект №4',
      title: 'Коттедж в Бахчисарайском районе',
      short: 'Дом с видом на горы, фундамент на сваях под сложный рельеф.',
      desc: 'Дом в окружении природного ландшафта с видом на горы. Фундамент на сваях адаптирован под сложный рельеф участка. Архитектура вписана в природное окружение — натуральные отделочные материалы снаружи и внутри.',
      cover: 'assets/img/Image15',
      gallery: ['assets/img/Image15'],
      plans: [
        { label: '1 этаж', src: 'assets/img/plan1-floor1-project4.webp' },
        { label: '2 этаж', src: 'assets/img/plan1-floor2-project4.webp' }
      ],
      specs: [
        ['Площадь', '160 м²'],
        ['Этажность', '1.5 этажа'],
        ['Материал', 'Газобетон + дерево'],
        ['Срок строительства', '6 месяцев'],
        ['Расположение', 'Бахчисарайский район']
      ]
    },
    {
      /* TODO: заменить название/описание/характеристики на реальные */
      badge: 'Проект №5',
      tag: 'Строится',
      title: 'Современный двухэтажный дом',
      short: 'Объект в процессе строительства — двухэтажный дом с панорамным остеклением.',
      desc: 'Двухэтажный дом с панорамным остеклением и просторной террасой. Объект сейчас в активной фазе строительства — подробное описание и характеристики появятся позже.',
      cover: 'assets/img/project5/01',
      gallery: [
        'assets/img/project5/01',
        'assets/img/project5/02',
        'assets/img/project5/03',
        'assets/img/project5/04'
      ],
      plans: [],
      specs: [
        ['Статус', 'В процессе строительства'],
        ['Этажность', '2 этажа'],
        ['Площадь', '— м²'],
        ['Материал', '—'],
        ['Расположение', 'Крым']
      ]
    },
    {
      badge: 'Проект №6',
      title: 'Коттедж в Крыму',
      short: 'Двухэтажный дом с современной отделкой и благоустроенной территорией.',
      desc: 'Двухэтажный коттедж с современной отделкой фасада и благоустроенной придомовой территорией. Проект реализован под ключ — от земляных работ до финишной отделки.',
      cover: 'assets/img/project6/project6-1st',
      gallery: [
        'assets/img/project6/project6-1st',
        'assets/img/project6/project6-2st',
        'assets/img/project6/project6-3st',
        'assets/img/project6/project6-4st'
      ],
      plans: [
        { label: '1 этаж', src: 'assets/img/project6/2dplan1.webp' },
        { label: '2 этаж', src: 'assets/img/project6/2dplan2.webp' }
      ],
      specs: [
        ['Этажность', '2 этажа'],
        ['Площадь', '— м²'],
        ['Материал', '—'],
        ['Расположение', 'Крым']
      ]
    },
    {
      badge: 'Проект №7',
      title: 'Загородный дом',
      short: 'Просторный загородный дом с индивидуальным проектом планировки.',
      desc: 'Загородный дом, построенный по индивидуальному проекту. Рациональная планировка, качественные материалы и строгий авторский надзор на всех этапах строительства.',
      cover: 'assets/img/project7/project7-1st',
      gallery: [
        'assets/img/project7/project7-1st'
      ],
      plans: [
        { label: '1 этаж', src: 'assets/img/project7/2dplan1.webp' },
        { label: '2 этаж', src: 'assets/img/project7/2dplan2.webp' }
      ],
      specs: [
        ['Этажность', '2 этажа'],
        ['Площадь', '— м²'],
        ['Материал', '—'],
        ['Расположение', 'Крым']
      ]
    },
    {
      badge: 'Проект №8',
      title: 'Частный коттедж',
      short: 'Частный коттедж с современной архитектурой и продуманной планировкой.',
      desc: 'Частный коттедж с современной архитектурой. Строительство выполнено с применением качественных материалов и соблюдением всех строительных норм.',
      cover: 'assets/img/project8/project8-1st',
      gallery: [
        'assets/img/project8/project8-1st'
      ],
      plans: [
        { label: 'План', src: 'assets/img/project8/2dplan1.webp' }
      ],
      specs: [
        ['Этажность', '2 этажа'],
        ['Площадь', '— м²'],
        ['Материал', '—'],
        ['Расположение', 'Крым']
      ]
    },
    {
      badge: 'Проект №9',
      title: 'Дом в Крыму',
      short: 'Жилой дом с авторским проектом и индивидуальной отделкой.',
      desc: 'Жилой дом в Крыму с авторским архитектурным проектом. Индивидуальная отделка, грамотное зонирование и полный цикл строительства под ключ.',
      cover: 'assets/img/project9/project9-1st',
      gallery: [
        'assets/img/project9/project9-1st'
      ],
      plans: [
        { label: '1 этаж', src: 'assets/img/project9/2dplan1.webp' }
      ],
      specs: [
        ['Этажность', '2 этажа'],
        ['Площадь', '— м²'],
        ['Материал', '—'],
        ['Расположение', 'Крым']
      ]
    },
    {
      badge: 'Проект №10',
      title: 'Коттедж под ключ',
      short: 'Коттедж с современным фасадом и функциональным интерьером.',
      desc: 'Коттедж под ключ с современным фасадом и функциональным интерьером. Проектирование и строительство силами собственной бригады компании.',
      cover: 'assets/img/project10/project10-1st',
      gallery: [
        'assets/img/project10/project10-1st'
      ],
      plans: [
        { label: '1 этаж', src: 'assets/img/project10/2dplan1.webp' },
        { label: '2 этаж', src: 'assets/img/project10/2dplan2.webp' }
      ],
      specs: [
        ['Этажность', '—'],
        ['Площадь', '— м²'],
        ['Материал', '—'],
        ['Расположение', 'Крым']
      ]
    }
  ];

  function imgSrc(base) { return base + '.webp'; }

  /* ─── СЕТКА ПРОЕКТОВ (только на projects.html) ─── */
  var grid = document.getElementById('projectsGrid');
  if (grid) {
    PROJECTS.forEach(function (p, i) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'proj-card';
      card.setAttribute('data-project', i);
      card.setAttribute('aria-label', p.badge + ': ' + p.title);

      var media = document.createElement('div');
      media.className = 'proj-card__media';
      var im = document.createElement('img');
      im.src = imgSrc(p.cover);
      im.alt = p.title;
      im.loading = i < 4 ? 'eager' : 'lazy';
      im.decoding = 'async';
      if (i === 0) im.setAttribute('fetchpriority', 'high');
      media.appendChild(im);
      if (p.tag) {
        var tg = document.createElement('span');
        tg.className = 'proj-card__tag';
        tg.textContent = p.tag;
        media.appendChild(tg);
      }

      var body = document.createElement('div');
      body.className = 'proj-card__body';
      body.innerHTML =
        '<h3 class="proj-card__title"></h3>' +
        '<p class="proj-card__desc"></p>' +
        '<span class="proj-card__more">Смотреть проект ' +
        '<svg width="14" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true"><path d="M1 5h14M10 1l5 4-5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
      body.querySelector('.proj-card__title').textContent = p.title;
      body.querySelector('.proj-card__desc').textContent = p.short || '';

      card.appendChild(media);
      card.appendChild(body);
      card.addEventListener('click', function () { openModal(i); });
      grid.appendChild(card);
    });
  }

  /* ─── МОДАЛКА ПРОЕКТА (на обеих страницах) ─── */
  var modal = document.getElementById('projectModal');
  if (!modal) return; // нет модалки на странице — дальше нечего делать

  var backdrop = modal.querySelector('.pmodal__backdrop');
  var pmodalTrack = document.getElementById('pmodalTrack');
  var pmodalBadge = document.getElementById('pmodalBadge');
  var pmodalStatus = document.getElementById('pmodalStatus');
  var pmodalTitle = document.getElementById('pmodalTitle');
  var pmodalDesc = document.getElementById('pmodalDesc');
  var pmodalSpecs = document.getElementById('pmodalSpecs');
  var pmodalPlanBtn = document.getElementById('pmodalPlanBtn');
  var pmodalClose = document.getElementById('pmodalClose');
  var galPrev = document.getElementById('pmodalGalPrev');
  var galNext = document.getElementById('pmodalGalNext');
  var galCounter = document.getElementById('pmodalGalCounter');

  var planOverlay = document.getElementById('planOverlay');
  var planImg = document.getElementById('planImg');
  var planPlaceholder = document.getElementById('planPlaceholder');
  var planClose = document.getElementById('planClose');

  var currentPlans = [];
  var currentGallery = [];
  var galIdx = 0;

  /* строим трек из img-элементов, как в хиро */
  function buildTrack(gallery, altText) {
    pmodalTrack.innerHTML = '';
    pmodalTrack.style.transition = 'none';
    pmodalTrack.style.transform = 'translateX(0)';
    gallery.forEach(function (base, idx) {
      var img = document.createElement('img');
      img.className = 'pmodal__img';
      img.src = imgSrc(base);
      img.alt = altText || '';
      img.decoding = 'async';
      if (idx === 0) img.setAttribute('fetchpriority', 'high');
      pmodalTrack.appendChild(img);
    });
  }

  function showPhoto(i) {
    if (!currentGallery.length) return;
    galIdx = (i + currentGallery.length) % currentGallery.length;
    /* включаем transition только когда уже есть слайды (не при первом открытии) */
    pmodalTrack.style.transition = 'transform .7s cubic-bezier(.4,0,.2,1)';
    pmodalTrack.style.transform = 'translateX(-' + (galIdx * 100) + '%)';
    var multi = currentGallery.length > 1;
    if (galCounter) {
      galCounter.textContent = (galIdx + 1) + ' / ' + currentGallery.length;
      galCounter.style.display = multi ? '' : 'none';
    }
    if (galPrev) galPrev.style.display = multi ? '' : 'none';
    if (galNext) galNext.style.display = multi ? '' : 'none';
  }

  function openModal(idx) {
    var p = PROJECTS[idx];
    if (!p) return;
    currentGallery = (p.gallery && p.gallery.length) ? p.gallery : [p.cover];
    buildTrack(currentGallery, p.title);
    showPhoto(0);
    pmodalBadge.textContent = p.badge;
    if (pmodalStatus) {
      pmodalStatus.textContent = p.tag || '';
      pmodalStatus.style.display = p.tag ? '' : 'none';
    }
    pmodalTitle.textContent = p.title;
    pmodalDesc.textContent = p.desc;
    pmodalSpecs.innerHTML = '';
    p.specs.forEach(function (s) {
      var li = document.createElement('li');
      var s1 = document.createElement('span');
      var s2 = document.createElement('span');
      s1.textContent = s[0];
      s2.textContent = s[1];
      li.appendChild(s1);
      li.appendChild(s2);
      pmodalSpecs.appendChild(li);
    });
    currentPlans = p.plans || [];

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  window.openProjectModal = openModal;

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    closePlan();
  }

  function openPlan(floorIdx) {
    if (typeof floorIdx !== 'number') floorIdx = 0;
    var planTabsEl = document.getElementById('planTabs');

    planTabsEl.innerHTML = '';
    if (currentPlans.length > 1) {
      currentPlans.forEach(function (pl, i) {
        var btn = document.createElement('button');
        btn.textContent = pl.label;
        btn.className = 'plan-tab' + (i === floorIdx ? ' is-active' : '');
        btn.addEventListener('click', function () { openPlan(i); });
        planTabsEl.appendChild(btn);
      });
      planTabsEl.style.display = 'flex';
    } else {
      planTabsEl.style.display = 'none';
    }

    var current = currentPlans[floorIdx];
    if (current && current.src) {
      planImg.src = current.src;
      planImg.style.display = 'block';
      planPlaceholder.style.display = 'none';
    } else {
      planImg.src = '';
      planImg.style.display = 'none';
      planPlaceholder.style.display = 'flex';
    }

    if (!planOverlay.classList.contains('is-open')) {
      planOverlay.classList.add('is-open');
    }
  }

  function closePlan() {
    planOverlay.classList.remove('is-open');
  }

  if (galPrev) galPrev.addEventListener('click', function (e) { e.stopPropagation(); showPhoto(galIdx - 1); });
  if (galNext) galNext.addEventListener('click', function (e) { e.stopPropagation(); showPhoto(galIdx + 1); });

  /* Клик по слайду на главной */
  document.querySelectorAll('.slide-clickable').forEach(function (slide) {
    slide.addEventListener('click', function () {
      openModal(parseInt(slide.getAttribute('data-project'), 10));
    });
  });

  pmodalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  pmodalPlanBtn.addEventListener('click', function () { openPlan(0); });
  planClose.addEventListener('click', closePlan);
  planOverlay.querySelector('.plan-overlay__backdrop').addEventListener('click', closePlan);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (planOverlay.classList.contains('is-open')) { closePlan(); }
      else if (modal.classList.contains('is-open')) { closeModal(); }
    } else if (modal.classList.contains('is-open') && !planOverlay.classList.contains('is-open')) {
      if (e.key === 'ArrowLeft') { showPhoto(galIdx - 1); }
      else if (e.key === 'ArrowRight') { showPhoto(galIdx + 1); }
    }
  });

  var ctaBtn = document.getElementById('pmodalCta');
  if (ctaBtn) ctaBtn.addEventListener('click', closeModal);
})();
