// ============================================
// Bartlett Butter — Subpage JS
// Progressive enhancements for the `default` layout (marketing / support /
// privacy pages). Kept in an external file so the markup carries no inline
// execution path, which keeps a strict Content Security Policy adoptable.
// ============================================

(function () {
  'use strict';

  var body = document.body;
  var onThisPage = (body && body.getAttribute('data-ui-on-this-page')) || 'On this page';
  var scrollTable = (body && body.getAttribute('data-ui-scroll-table')) || 'Scroll horizontally to see more →';
  var developmentInProgress = (body && body.getAttribute('data-ui-development-in-progress')) || 'Development in progress';
  var googlePlayComingSoon = (body && body.getAttribute('data-ui-google-play-coming-soon')) || ('Get it on Google Play — ' + developmentInProgress);
  var appStoreComingSoon = (body && body.getAttribute('data-ui-app-store-coming-soon')) || ('Download on the App Store — ' + developmentInProgress);

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
    nav.setAttribute('aria-label', onThisPage);

    var label = document.createElement('p');
    label.className = 'page-toc-label';
    label.textContent = onThisPage;
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
      hint.textContent = scrollTable;
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
  //
  // An app that is not yet on the App Store either marks its badge anchor with
  // `data-store-upcoming` (recommended) or points it at a placeholder store URL
  // ending in `id0000000000`. In that case the App Store badge is treated the
  // same way as the Google Play one: a non-navigating button that reveals an
  // "App Store — development in progress" note on click.
  function enhanceStoreBadges() {
    var body = document.querySelector('.content-body');
    if (!body) return;

    // Scope to the actual badge image so plain-text "App Store" links elsewhere
    // are never touched. The wrapper may be a live link or an upcoming anchor.
    var badgeImg = body.querySelector('a img[src*="download-on-the-app-store"]');
    if (!badgeImg) return;

    var appLink = badgeImg.closest('a');
    if (!appLink) return;

    // Is the App Store listing live yet? Not if the author flagged it upcoming
    // or left the placeholder id in the href.
    var appHref = appLink.getAttribute('href') || '';
    var appStoreUpcoming = appLink.hasAttribute('data-store-upcoming') ||
      appHref.indexOf('id0000000000') !== -1;

    // Wrap the App Store badge in a flex row and move it inside.
    var row = document.createElement('div');
    row.className = 'store-badges';
    appLink.parentNode.insertBefore(row, appLink);

    // A small helper that reveals a status note for ~3.2s, shared by any
    // "coming soon" badge in the row.
    var hideTimer;
    function flashNote(note) {
      note.classList.add('is-visible');
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(function () {
        note.classList.remove('is-visible');
      }, 3200);
    }

    // Build the two badges first so they always sit side by side in the row,
    // then append a single shared "development in progress" note after both.
    // The note is `flex-basis: 100%` in the hero (see marketing.css), so it
    // sits on its own line below the badges rather than between them. Both
    // "coming soon" badges reveal this one shared note when clicked.
    if (appStoreUpcoming) {
      // Replace the App Store anchor with a non-navigating button carrying the
      // same badge image, so a dead placeholder link is never clickable.
      var appBtn = document.createElement('button');
      appBtn.type = 'button';
      appBtn.className = 'store-badge-play';
      appBtn.setAttribute('aria-label', appStoreComingSoon);
      appBtn.appendChild(badgeImg);
      row.appendChild(appBtn);

      // The original anchor is now empty; drop it.
      if (appLink.parentNode) appLink.parentNode.removeChild(appLink);
    } else {
      // Live listing: keep the App Store anchor as a real link.
      row.appendChild(appLink);
    }

    // Google Play badge (a button — it shows a message, it doesn't navigate).
    var playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'store-badge-play';
    playBtn.setAttribute('aria-label', googlePlayComingSoon);

    var playImg = document.createElement('img');
    playImg.src = '/assets/badges/get-it-on-google-play.svg';
    playImg.alt = 'Get it on Google Play';
    playImg.width = 168;
    playImg.height = 48;
    playBtn.appendChild(playImg);
    row.appendChild(playBtn);

    // One shared note after both badges, so the badges stay on a single row and
    // every "coming soon" badge flashes the same message.
    var note = document.createElement('span');
    note.className = 'store-badge-note';
    note.setAttribute('role', 'status');
    note.textContent = developmentInProgress;
    row.appendChild(note);

    playBtn.addEventListener('click', function () { flashNote(note); });
    if (appStoreUpcoming) {
      appBtn.addEventListener('click', function () { flashNote(note); });
    }
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
