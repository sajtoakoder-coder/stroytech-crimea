  // ─── GOOGLE SHEETS — вставь сюда URL своего Apps Script ───
  const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbww9d11Dk7rQEtfPOGQOMlOiKz152ERq-W-p6AEqVdCR28xiwWR4iu8xj9ylTej5_ObyQ/exec';

  // ─── REDUCED MOTION ───
  const REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── MOBILE MENU ───
  const burger     = document.querySelector('.nav-burger');
  const navModal   = document.getElementById('navModal');
  const modalClose = document.getElementById('navModalClose');

  let _scrollY = 0;
  function openMenu() {
    _scrollY = window.scrollY;
    navModal.classList.add('open');
    navModal.setAttribute('aria-hidden', 'false');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow   = 'hidden';
    document.body.style.position   = 'fixed';
    document.body.style.top        = '-' + _scrollY + 'px';
    document.body.style.width      = '100%';
  }
  function closeMenu() {
    navModal.classList.remove('open');
    navModal.setAttribute('aria-hidden', 'true');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow   = '';
    document.body.style.position   = '';
    document.body.style.top        = '';
    document.body.style.width      = '';
    window.scrollTo(0, _scrollY);
  }

  burger.addEventListener('click', () =>
    navModal.classList.contains('open') ? closeMenu() : openMenu()
  );
  modalClose.addEventListener('click', closeMenu);
  navModal.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navModal.classList.contains('open')) closeMenu();
  });

  // ─── THEME ───
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const saved = (function(){try{return localStorage.getItem('theme');}catch(e){return null;}})() || 'dark';
  html.setAttribute('data-theme', saved);
  themeToggle.setAttribute('aria-pressed', saved === 'light' ? 'true' : 'false');
  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    themeToggle.setAttribute('aria-pressed', next === 'light' ? 'true' : 'false');
    try{localStorage.setItem('theme',next);}catch(e){}
  });

  // NAV
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // INTERSECTION OBSERVER
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.stat-item').forEach((el, i) => { el.dataset.delay = i * 110; observer.observe(el); });
  document.querySelectorAll('.service-item').forEach((el, i) => { el.dataset.delay = i * 70; observer.observe(el); });
  document.querySelectorAll('.catalog-item').forEach((el, i) => { el.dataset.delay = i * 70; observer.observe(el); });
  document.querySelectorAll('.process-step').forEach((el, i) => { el.dataset.delay = i * 90; observer.observe(el); });
  document.querySelectorAll('.why-feature').forEach((el, i) => { el.dataset.delay = i * 90; observer.observe(el); });
  document.querySelectorAll('.why-visual').forEach(el => observer.observe(el));
  document.querySelectorAll('.review-item').forEach((el, i) => { el.dataset.delay = i * 90; observer.observe(el); });
  document.querySelectorAll('.rental-card').forEach((el, i) => { el.dataset.delay = i * 80; observer.observe(el); });

  // COUNTER
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    el.style.opacity = '1';
    if (REDUCED_MOTION) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1600;
    const start = performance.now();
    function update(now) {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target) + suffix;
      if (t < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  // FIX: was `new IntersectionObserver(...).observe(...)` — statsObs was never declared
  // causing ReferenceError: statsObs is not defined inside the callback
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num[data-count]').forEach(animateCount);
        statsObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  statsObs.observe(document.getElementById('stats'));

  // SLIDER
  (function() {
    const track    = document.getElementById('sliderTrack');
    const dotsWrap = document.getElementById('sliderDots');
    const progress = document.getElementById('sliderProgress');
    const slides   = track ? track.querySelectorAll('.slide') : [];
    const total    = slides.length;
    let current    = 0;
    let timer      = null;

    // Генерируем точки
    if (dotsWrap && total) {
      slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'slider-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Фото ' + (i + 1));
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
      });
    }

    function goTo(n) {
      current = (n + total) % total;
      if (track) track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dotsWrap && dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
      resetTimer();
    }

    function resetTimer() {
      clearInterval(timer);
      if (REDUCED_MOTION) return; // уважаем настройки пользователя
      if (progress) {
        progress.style.animation = 'none';
        progress.offsetHeight; // reflow
        progress.style.animation = 'sliderProgress 5s linear';
      }
      timer = setInterval(() => goTo(current + 1), 5000);
    }

    // кнопки прев/некст без inline-onclick
    const btnPrev = document.getElementById('sliderPrev');
    const btnNext = document.getElementById('sliderNext');
    if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
    if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));

    // Свайп пальцем / мышью
    if (track) {
      let startX = 0;
      track.addEventListener('pointerdown', e => { startX = e.clientX; });
      track.addEventListener('pointerup',   e => {
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 40) dx < 0 ? goTo(current + 1) : goTo(current - 1);
      });
    }

    // Пауза автоплея при наведении и фокусе (a11y)
    const sliderEl = document.getElementById('heroSlider');
    if (sliderEl && total) {
      const pause = () => clearInterval(timer);
      sliderEl.addEventListener('mouseenter', pause);
      sliderEl.addEventListener('mouseleave', resetTimer);
      sliderEl.addEventListener('focusin', pause);
      sliderEl.addEventListener('focusout', resetTimer);
    }

    if (total) resetTimer();
  })();

  // ─── CUSTOM SELECT (с клавиатурной навигацией) ───
  function closeAllSelects(exceptCs) {
    document.querySelectorAll('[data-cs]').forEach(cs => {
      if (cs === exceptCs) return;
      const tr = cs.querySelector('[data-cs-trigger]');
      const dd = cs.querySelector('[data-cs-dropdown]');
      if (!tr || !dd) return;
      dd.classList.remove('open');
      tr.classList.remove('open');
      tr.setAttribute('aria-expanded', 'false');
    });
  }

  document.querySelectorAll('[data-cs]').forEach(cs => {
    const trigger  = cs.querySelector('[data-cs-trigger]');
    const dropdown = cs.querySelector('[data-cs-dropdown]');
    if (!trigger || !dropdown) return;
    const label    = trigger.querySelector('span');
    const options  = Array.from(dropdown.querySelectorAll('.cs-option'));
    const targetId = cs.dataset.csTarget;
    const hidden   = targetId ? document.getElementById(targetId) : null;
    let activeIdx  = -1;

    function open() {
      closeAllSelects(cs);
      dropdown.classList.add('open');
      trigger.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      activeIdx = Math.max(0, options.findIndex(o => o.classList.contains('selected')));
      focusOption(activeIdx);
    }
    function close(focusBack) {
      dropdown.classList.remove('open');
      trigger.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      if (focusBack) trigger.focus();
    }
    function focusOption(idx) {
      if (idx < 0 || idx >= options.length) return;
      activeIdx = idx;
      options.forEach((o, i) => o.classList.toggle('active', i === idx));
      options[idx].scrollIntoView({ block: 'nearest' });
    }
    function pick(opt) {
      if (!opt) return;
      const val = opt.dataset.value;
      if (label) label.textContent = val;
      trigger.classList.add('filled');
      options.forEach(o => o.classList.remove('selected', 'active'));
      opt.classList.add('selected');
      cs.dataset.value = val;
      if (hidden) hidden.value = val;
      close(true);
    }

    trigger.addEventListener('click', e => {
      e.stopPropagation();
      dropdown.classList.contains('open') ? close(false) : open();
    });

    trigger.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!dropdown.classList.contains('open')) open();
        else focusOption(Math.min(options.length - 1, activeIdx + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!dropdown.classList.contains('open')) open();
        else focusOption(Math.max(0, activeIdx - 1));
      } else if (e.key === 'Escape') {
        close(true);
      } else if (e.key === 'Tab') {
        close(false);
      }
    });

    dropdown.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); focusOption(Math.min(options.length - 1, activeIdx + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); focusOption(Math.max(0, activeIdx - 1)); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(options[activeIdx]); }
      else if (e.key === 'Escape') { close(true); }
    });

    options.forEach((opt, i) => {
      opt.addEventListener('click', () => pick(opt));
      opt.addEventListener('mouseenter', () => focusOption(i));
    });
  });

  document.addEventListener('click', () => closeAllSelects(null));

  // ─── FORM (submit handler с валидацией, loading state и fetch placeholder) ───
  const PHONE_RE = /^\+?[0-9\s()\-]{10,18}$/;

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const errorBox  = document.getElementById('formError');
    const submitBtn = document.getElementById('submitBtn');
    const successEl = document.getElementById('formSuccess');

    function showError(msg) {
      if (!errorBox) return;
      errorBox.textContent = msg;
      errorBox.classList.add('show');
    }
    function clearError() {
      if (!errorBox) return;
      errorBox.textContent = '';
      errorBox.classList.remove('show');
    }
    function setLoading(on) {
      if (!submitBtn) return;
      submitBtn.disabled = on;
      submitBtn.setAttribute('aria-busy', on ? 'true' : 'false');
      const lbl = submitBtn.querySelector('.btn-label');
      if (lbl) lbl.textContent = on ? 'Отправляем…' : 'Отправить заявку';
    }

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      clearError();

      const nameInput = document.getElementById('fieldName');
      const telInput  = document.getElementById('fieldPhone');
      const honeypot  = contactForm.querySelector('input[name="website"]');

      // honeypot — боты заполняют все поля, живые люди — нет
      if (honeypot && honeypot.value.trim()) {
        // тихо выводим в success, ничего не отправляя
        contactForm.style.display = 'none';
        successEl && successEl.classList.add('show');
        return;
      }

      // Rate limit: не чаще раза в 30 секунд с одного браузера
      const lastSent = parseInt(sessionStorage.getItem('_ls') || '0');
      if (Date.now() - lastSent < 30000) {
        showError('Заявка уже отправлена. Подождите 30 секунд перед повторной отправкой.');
        return;
      }

      let valid = true;
      [nameInput, telInput].forEach(el => {
        if (!el) return;
        el.classList.remove('error');
        if (!el.value.trim()) { el.classList.add('error'); valid = false; }
      });
      if (telInput && telInput.value.trim() && !PHONE_RE.test(telInput.value.trim())) {
        telInput.classList.add('error');
        valid = false;
      }
      // Лимит длины полей
      if (nameInput && nameInput.value.trim().length > 100) {
        nameInput.classList.add('error'); valid = false;
      }

      if (!valid) {
        showError('Заполните имя и корректный телефон (от 10 цифр).');
        return;
      }

      const consentInput = document.getElementById('fieldConsent');
      if (consentInput && !consentInput.checked) {
        consentInput.classList.add('error');
        showError('Подтвердите согласие на обработку персональных данных.');
        return;
      }

      // Turnstile: берём токен если есть, но не блокируем отправку
      const tsToken = document.querySelector('[name="cf-turnstile-response"]')?.value || '';
      if (!tsToken) {
        console.warn('[Form] Turnstile-токен отсутствует, отправляем без него');
      }

      const fd = new FormData(contactForm);
      const raw = Object.fromEntries(fd.entries());
      // Обрезаем длинные поля и убираем лишние пробелы
      const payload = {
        name:    (raw.name    || '').trim().slice(0, 100),
        phone:   (raw.phone   || '').trim().slice(0, 20),
        service: (raw.service || '').slice(0, 100),
        budget:  (raw.budget  || '').slice(0, 50),
        city:    (raw.city    || '').trim().slice(0, 100),
        message: (raw.message || '').trim().slice(0, 1000),
        ts:      tsToken,
      };

      console.log('[Form] Отправляем в таблицу:', { name: payload.name, phone: payload.phone, city: payload.city });
      setLoading(true);
      try {
        await fetch(SHEETS_URL + '?' + new URLSearchParams(payload).toString(), {
          mode: 'no-cors',
        });
        console.log('[Form] fetch завершён (no-cors, ответ не виден)');

        sessionStorage.setItem('_ls', Date.now().toString());
        if (window.turnstile) window.turnstile.reset();
        contactForm.style.transition = 'opacity .3s';
        contactForm.style.opacity = '0';
        setTimeout(() => {
          contactForm.style.display = 'none';
          successEl && successEl.classList.add('show');
        }, 300);
      } catch (err) {
        console.error('Form submit failed:', err);
        showError('Не удалось отправить заявку. Проверьте интернет и попробуйте ещё раз, или позвоните напрямую: +7 (978) 000-00-00.');
      } finally {
        setLoading(false);
      }
    });

    // Снимаем .error при вводе
    contactForm.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('input', () => el.classList.remove('error'));
    });
  }

  // Динамический год в футере
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ============================================================
   PROJECT MODAL
   ============================================================ */
(function () {
  var PROJECTS = [
    {
      badge: 'Проект №1',
      title: 'Одноэтажный коттедж в Крыму',
      desc: 'Уютный одноэтажный дом с панорамными окнами и открытой террасой. Продуманная планировка объединяет гостиную и кухню в единое светлое пространство. Строительство под ключ — от проекта до финальной отделки.',
      img: 'assets/img/Image1-000',
      plans: [
        { label: '1 этаж', src: 'assets/img/plan1-floor1-project1.png' },
        { label: '2 этаж', src: 'assets/img/plan1-floor2-project1.png' },
      ],
      specs: [
        ['Площадь', '120 м²'],
        ['Этажность', '1 этаж'],
        ['Материал', 'Газобетон'],
        ['Срок строительства', '5 месяцев'],
        ['Расположение', 'Крым'],
      ]
    },
    {
      badge: 'Проект №2',
      title: 'Коттедж в пригороде Симферополя',
      desc: 'Современный загородный дом с чистыми геометрическими формами. Большие застеклённые фасады обеспечивают естественное освещение во всех комнатах. Реализован под ключ с авторским надзором.',
      img: 'assets/img/Image20',
      plans: [
        { label: '1 этаж', src: 'assets/img/plan1-floor1-project2.png' },
        { label: '2 этаж', src: 'assets/img/plan1-floor2-project2.png' },
      ],
      specs: [
        ['Площадь', '145 м²'],
        ['Этажность', '2 этажа'],
        ['Материал', 'Кирпич'],
        ['Срок строительства', '7 месяцев'],
        ['Расположение', 'Симферополь'],
      ]
    },
    {
      badge: 'Проект №3',
      title: 'Двухэтажный дом в Крыму',
      desc: 'Просторный двухэтажный коттедж с эксплуатируемой кровлей и встроенным гаражом. Нижний этаж — общественные зоны, верхний — спальни с собственными санузлами. Выполнен в стиле современного минимализма.',
      img: 'assets/img/Image32-000',
      plans: [
        { label: 'План', src: 'assets/img/plan1-project3.png' },
      ],
      specs: [
        ['Площадь', '210 м²'],
        ['Этажность', '2 этажа'],
        ['Материал', 'Монолит + газобетон'],
        ['Срок строительства', '9 месяцев'],
        ['Расположение', 'Крым'],
      ]
    },
    {
      badge: 'Проект №4',
      title: 'Коттедж в Бахчисарайском районе',
      desc: 'Дом в окружении природного ландшафта с видом на горы. Фундамент на сваях адаптирован под сложный рельеф участка. Архитектура вписана в природное окружение — натуральные отделочные материалы снаружи и внутри.',
      img: 'assets/img/Image15',
      plans: [
        { label: '1 этаж', src: 'assets/img/plan1-floor1-project4.png' },
        { label: '2 этаж', src: 'assets/img/plan1-floor2-project4.png' },
      ],
      specs: [
        ['Площадь', '160 м²'],
        ['Этажность', '1.5 этажа'],
        ['Материал', 'Газобетон + дерево'],
        ['Срок строительства', '6 месяцев'],
        ['Расположение', 'Бахчисарайский район'],
      ]
    }
  ];

  var modal = document.getElementById('projectModal');
  var backdrop = modal.querySelector('.pmodal__backdrop');
  var pmodalImg = document.getElementById('pmodalImg');
  var pmodalBadge = document.getElementById('pmodalBadge');
  var pmodalTitle = document.getElementById('pmodalTitle');
  var pmodalDesc = document.getElementById('pmodalDesc');
  var pmodalSpecs = document.getElementById('pmodalSpecs');
  var pmodalPlanBtn = document.getElementById('pmodalPlanBtn');
  var pmodalClose = document.getElementById('pmodalClose');

  var planOverlay = document.getElementById('planOverlay');
  var planImg = document.getElementById('planImg');
  var planPlaceholder = document.getElementById('planPlaceholder');
  var planClose = document.getElementById('planClose');

  var currentPlans = [];

  function openModal(idx) {
    var p = PROJECTS[idx];
    if (!p) return;

    var supportsWebP = document.createElement('canvas').toDataURL('image/webp').indexOf('webp') > -1;
    pmodalImg.src = supportsWebP ? p.img + '.webp' : p.img + '.png';
    pmodalImg.alt = p.title;
    pmodalBadge.textContent = p.badge;
    pmodalTitle.textContent = p.title;
    pmodalDesc.textContent = p.desc;
    pmodalSpecs.innerHTML = '';
    p.specs.forEach(function(s) {
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

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    closePlan();
  }

  function openPlan(floorIdx) {
    floorIdx = floorIdx || 0;
    var planTabsEl = document.getElementById('planTabs');
    var planTitle  = document.getElementById('planFloorTitle');

    /* Строим переключатель этажей */
    planTabsEl.innerHTML = '';
    if (currentPlans.length > 1) {
      currentPlans.forEach(function(pl, i) {
        var btn = document.createElement('button');
        btn.textContent = pl.label;
        btn.className = 'plan-tab' + (i === floorIdx ? ' is-active' : '');
        btn.addEventListener('click', function() { openPlan(i); });
        planTabsEl.appendChild(btn);
      });
      planTabsEl.style.display = 'flex';
    } else {
      planTabsEl.style.display = 'none';
    }

    var current = currentPlans[floorIdx];
    if (planTitle) planTitle.textContent = current ? current.label : '';

    if (current && current.src) {
      planImg.src = current.src;
      planImg.style.display = 'block';
      planPlaceholder.style.display = 'none';
    } else {
      planImg.src = '';
      planImg.style.display = 'none';
      planPlaceholder.style.display = 'flex';
    }
    planOverlay.classList.add('is-open');
  }

  function closePlan() {
    planOverlay.classList.remove('is-open');
  }

  /* Клик по слайду */
  document.querySelectorAll('.slide-clickable').forEach(function(slide) {
    slide.addEventListener('click', function() {
      var idx = parseInt(slide.getAttribute('data-project'), 10);
      openModal(idx);
    });
  });

  pmodalClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  pmodalPlanBtn.addEventListener('click', openPlan);
  planClose.addEventListener('click', closePlan);
  planOverlay.querySelector('.plan-overlay__backdrop').addEventListener('click', closePlan);

  /* Закрыть по Escape */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (planOverlay.classList.contains('is-open')) { closePlan(); }
      else if (modal.classList.contains('is-open')) { closeModal(); }
    }
  });

  /* Закрыть модалку при клике на CTA */
  document.getElementById('pmodalCta').addEventListener('click', closeModal);
})();
