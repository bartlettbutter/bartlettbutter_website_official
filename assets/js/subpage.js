// ============================================
// Bartlett Butter — Subpage JS
// Progressive enhancements for the `default` layout (marketing / support /
// privacy pages). Kept in an external file so the markup carries no inline
// execution path, which keeps a strict Content Security Policy adoptable.
// ============================================

(function () {
  'use strict';

  // --- In-page table of contents ---
  // Build a jump-link TOC from the h2 headings on long-form support/privacy
  // pages, giving visitors wayfinding instead of a long uninterrupted scroll.
  // Only rendered when there are enough sections to make it worthwhile.
  function buildTableOfContents() {
    var body = document.querySelector('.content-body[data-toc="true"]');
    if (!body) return;

    var headings = Array.prototype.slice.call(body.querySelectorAll('h2'));
    if (headings.length < 3) return;

    var slugify = function (text) {
      return text.toLowerCase().trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    };

    var used = {};
    var nav = document.createElement('nav');
    nav.className = 'page-toc';
    nav.setAttribute('aria-label', 'On this page');

    var label = document.createElement('p');
    label.className = 'page-toc-label';
    label.textContent = 'On this page';
    nav.appendChild(label);

    var list = document.createElement('ul');

    headings.forEach(function (heading) {
      var id = heading.id;
      if (!id) {
        id = slugify(heading.textContent) || 'section';
        if (used[id] != null) {
          used[id] += 1;
          id = id + '-' + used[id];
        } else {
          used[id] = 0;
        }
        heading.id = id;
      }

      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = '#' + id;
      link.textContent = heading.textContent;
      item.appendChild(link);
      list.appendChild(item);
    });

    nav.appendChild(list);

    // Insert after the first heading (the page's intro h1) if present,
    // otherwise at the top of the content.
    var firstHeading = body.querySelector('h1');
    if (firstHeading && firstHeading.nextSibling) {
      firstHeading.parentNode.insertBefore(nav, firstHeading.nextSibling);
    } else {
      body.insertBefore(nav, body.firstChild);
    }
  }

  // --- Responsive table wrappers ---
  // Wrap wide content tables so they can scroll horizontally on small screens,
  // and show a scroll hint only while there is more content off-screen.
  function enhanceTables() {
    document.querySelectorAll('.content-body table').forEach(function (table) {
      var wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);

      var hint = document.createElement('p');
      hint.className = 'table-hint';
      hint.textContent = 'Scroll horizontally to see more →';
      wrapper.parentNode.insertBefore(hint, wrapper.nextSibling);

      var updateCue = function () {
        var overflowing = wrapper.scrollWidth > wrapper.clientWidth + 1;
        var atEnd = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 1;
        hint.classList.toggle('is-visible', overflowing && !atEnd);
      };

      wrapper.addEventListener('scroll', updateCue, { passive: true });
      window.addEventListener('resize', updateCue, { passive: true });
      updateCue();
    });
  }

  // --- Store badges ---
  // Marketing pages author a single "Download on the App Store" badge in
  // markdown. Our apps are not on Google Play yet, so we left-align that badge
  // and place a Google Play badge beside it that, when clicked, reveals a
  // localized "development in progress" note instead of navigating anywhere.
  var IN_PROGRESS = {
    en: 'Development in progress',
    ar: 'قيد التطوير',
    de: 'In Entwicklung',
    es: 'En desarrollo',
    fr: 'En cours de développement',
    hi: 'विकास जारी है',
    it: 'In fase di sviluppo',
    ja: '開発中',
    ko: '개발 진행 중',
    nl: 'In ontwikkeling',
    pt: 'Em desenvolvimento',
    ru: 'В разработке',
    tr: 'Geliştirme aşamasında',
    'zh-Hans': '开发中',
    'zh-Hant': '開發中'
  };

  function enhanceStoreBadges() {
    var body = document.querySelector('.content-body');
    if (!body) return;

    // Scope to the actual badge image so plain-text "App Store" links elsewhere
    // are never touched.
    var badgeImg = body.querySelector('a img[src*="download-on-the-app-store"]');
    if (!badgeImg) return;

    var appLink = badgeImg.closest('a');
    if (!appLink) return;

    var lang = document.documentElement.lang || 'en';
    var message = IN_PROGRESS[lang] || IN_PROGRESS.en;

    // Wrap the App Store badge in a flex row and move it inside.
    var row = document.createElement('div');
    row.className = 'store-badges';
    appLink.parentNode.insertBefore(row, appLink);
    row.appendChild(appLink);

    // Google Play badge (a button — it shows a message, it doesn't navigate).
    var playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'store-badge-play';
    playBtn.setAttribute('aria-label', 'Get it on Google Play — ' + message);

    var playImg = document.createElement('img');
    playImg.src = '/assets/badges/get-it-on-google-play.svg';
    playImg.alt = 'Get it on Google Play';
    playImg.width = 168;
    playImg.height = 48;
    playBtn.appendChild(playImg);
    row.appendChild(playBtn);

    // The note, hidden until the Play badge is clicked.
    var note = document.createElement('span');
    note.className = 'store-badge-note';
    note.setAttribute('role', 'status');
    note.textContent = message;
    row.appendChild(note);

    var hideTimer;
    playBtn.addEventListener('click', function () {
      note.classList.add('is-visible');
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(function () {
        note.classList.remove('is-visible');
      }, 3200);
    });
  }

  function init() {
    buildTableOfContents();
    enhanceTables();
    enhanceStoreBadges();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
