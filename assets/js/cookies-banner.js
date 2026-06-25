/**
 * Баннер согласия на cookie — 152-ФЗ / GDPR-совместимый
 * Загружает аналитические скрипты ТОЛЬКО после явного согласия пользователя.
 * Хранит выбор в localStorage на 365 дней.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'cookie_consent';
  var EXPIRY_DAYS = 365;

  /* ── Проверить сохранённый выбор ── */
  function getSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (Date.now() > obj.expires) { localStorage.removeItem(STORAGE_KEY); return null; }
      return obj.value; // 'all' | 'necessary'
    } catch (e) { return null; }
  }

  function save(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        value: value,
        expires: Date.now() + EXPIRY_DAYS * 86400 * 1000
      }));
    } catch (e) {}
  }

  /* ── Применить выбор ── */
  function applyConsent(value) {
    save(value);
    if (value === 'all') {
      /* Здесь добавить загрузку аналитики при появлении (Яндекс.Метрика, GTM и т.д.) */
      /* Пример: loadYandexMetrika(XXXXXXXX); */
    }
  }

  /* ── Скрыть баннер ── */
  function hideBanner(banner) {
    banner.style.transition = 'opacity .3s, transform .3s';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(20px)';
    setTimeout(function () { banner.remove(); }, 400);
  }

  /* ── Создать и показать баннер ── */
  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-label', 'Согласие на использование файлов cookie');
    banner.innerHTML = [
      '<div class="cb-inner">',
        '<div class="cb-text">',
          '<strong>Этот сайт использует файлы cookie.</strong> ',
          'Мы используем технические cookie для корректной работы сайта (тема оформления). ',
          'С вашего согласия — также аналитические. ',
          'Подробнее в <a href="cookies.html" target="_blank" rel="noopener">политике cookie</a> ',
          'и <a href="privacy.html" target="_blank" rel="noopener">политике конфиденциальности</a>.',
        '</div>',
        '<div class="cb-actions">',
          '<button type="button" id="cb-necessary" class="cb-btn cb-btn--outline">Только необходимые</button>',
          '<button type="button" id="cb-accept-all" class="cb-btn cb-btn--primary">Принять все</button>',
        '</div>',
      '</div>'
    ].join('');

    /* Стили встроены в JS чтобы не зависеть от загрузки CSS */
    var style = document.createElement('style');
    style.textContent = [
      '#cookie-banner{',
        'position:fixed;bottom:0;left:0;right:0;z-index:99999;',
        'background:var(--surface);',
        'border-top:1px solid var(--border);',
        'padding:16px 20px;',
        'box-shadow:0 -4px 24px rgba(0,0,0,.25);',
        'font-family:inherit;',
      '}',
      '#cookie-banner .cb-inner{',
        'max-width:1100px;margin:0 auto;',
        'display:flex;align-items:center;gap:20px;flex-wrap:wrap;',
      '}',
      '#cookie-banner .cb-text{',
        'flex:1 1 300px;',
        'font-size:13px;line-height:1.5;',
        'color:var(--muted);',
      '}',
      '#cookie-banner .cb-text a{color:var(--amber);text-decoration:underline;}',
      '#cookie-banner .cb-text strong{color:var(--text);}',
      '#cookie-banner .cb-actions{display:flex;gap:10px;flex-shrink:0;}',
      '#cookie-banner .cb-btn{',
        'padding:10px 18px;border-radius:4px;font-size:13px;font-weight:600;',
        'cursor:pointer;border:1px solid transparent;transition:opacity .2s;',
        'white-space:nowrap;font-family:inherit;',
      '}',
      '#cookie-banner .cb-btn--primary{',
        'background:var(--amber);color:var(--bg);border-color:var(--amber);',
      '}',
      '#cookie-banner .cb-btn--outline{',
        'background:transparent;',
        'color:var(--muted);',
        'border-color:var(--border);',
      '}',
      '#cookie-banner .cb-btn:hover{opacity:.85;}',
    ].join('');
    document.head.appendChild(style);

    document.body.appendChild(banner);

    document.getElementById('cb-accept-all').addEventListener('click', function () {
      applyConsent('all');
      hideBanner(banner);
    });

    document.getElementById('cb-necessary').addEventListener('click', function () {
      applyConsent('necessary');
      hideBanner(banner);
    });
  }

  /* ── Инициализация ── */
  function init() {
    var saved = getSaved();
    if (saved) {
      /* Уже есть выбор — применить без баннера */
      applyConsent(saved);
      return;
    }
    /* Первый визит — показать баннер, НЕ загружать сторонние скрипты */
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }

  init();
})();
