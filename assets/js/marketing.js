// ============================================
// Bartlett Butter — Marketing JS
// Scroll-reveal for per-app marketing sections. Loaded only on marketing
// pages. Purely a progressive enhancement: elements are authored hidden via
// the `.reveal` class and shown here; if this script never runs (or the CSS
// reduced-motion rule applies) the content is still fully visible.
// ============================================

(function () {
  'use strict';

  function init() {
    var targets = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!targets.length) return;

    var prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No IntersectionObserver or reduced motion: leave targets in their default
    // visible state and never hide them. The CSS only hides .reveal under the
    // .js-reveal class we add below, so doing nothing here is the safe path.
    if (prefersReduced || !('IntersectionObserver' in window)) {
      return;
    }

    // Confirmed we can animate: now it is safe to hide the targets via CSS.
    document.documentElement.classList.add('js-reveal');

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  // --- Hero gallery: continuous marquee ------------------------------------
  // On larger desktop screens, progressively enhance the authored screenshot
  // strip into a slow left-to-right marquee. The original strip stays in the
  // DOM as the accessible fallback and is what smaller screens continue to use.
  function initGalleryMarquee() {
    var marquees = Array.prototype.slice.call(
      document.querySelectorAll('.hero-gallery-marquee')
    );
    if (!marquees.length) return;

    var finePointer = window.matchMedia &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || prefersReduced) return;

    var syncLoopWidths = [];

    function readGapValue(el) {
      var styles = window.getComputedStyle(el);
      var candidates = [styles.gap, styles.columnGap];
      var i;

      for (i = 0; i < candidates.length; i += 1) {
        var parsed = parseFloat(candidates[i]);
        if (!isNaN(parsed)) return parsed;
      }

      return 0;
    }

    function buildGroup(sourceImages) {
      var group = document.createElement('div');
      group.className = 'hero-gallery-marquee-group';

      sourceImages.forEach(function (sourceImg) {
        var frame = document.createElement('figure');
        var clone = sourceImg.cloneNode(false);

        frame.className = 'hero-gallery-frame';
        clone.alt = '';
        clone.loading = 'eager';
        clone.decoding = 'async';
        frame.appendChild(clone);
        group.appendChild(frame);
      });

      return group;
    }

    function buildMarquee(marquee) {
      var section = marquee.closest('.hero-gallery');
      var fallbackTrack = section &&
        section.querySelector('.hero-gallery-track--fallback');
      var sourceImages = fallbackTrack
        ? Array.prototype.slice.call(fallbackTrack.querySelectorAll('img'))
        : [];
      if (!sourceImages.length) return false;

      var inner = document.createElement('div');
      var groupA = buildGroup(sourceImages);
      var groupB = buildGroup(sourceImages);

      marquee.innerHTML = '';
      inner.className = 'hero-gallery-marquee-inner';
      inner.appendChild(groupA);
      inner.appendChild(groupB);
      marquee.appendChild(inner);

      function syncLoopWidth() {
        var gap = readGapValue(inner);
        marquee.style.setProperty(
          '--hero-gallery-loop-width',
          (groupA.getBoundingClientRect().width + gap) + 'px'
        );
      }

      syncLoopWidth();
      syncLoopWidths.push(syncLoopWidth);
      return true;
    }

    var activeMarquees = marquees.filter(buildMarquee);
    if (!activeMarquees.length) return;

    document.documentElement.classList.add('js-gallery-marquee');

    function syncAllLoopWidths() {
      syncLoopWidths.forEach(function (syncLoopWidth) {
        syncLoopWidth();
      });
    }

    window.addEventListener('resize', syncAllLoopWidths);
    window.addEventListener('load', syncAllLoopWidths);
    window.requestAnimationFrame(syncAllLoopWidths);
  }

  // --- Headline tails ------------------------------------------------------
  // CSS `text-wrap: balance` evens out wrapped display headings, but can still
  // leave a two-word second line. Keep the last three words of each heading
  // on one line so a wrapped heading always ends with at least three words.
  // Skipped for short headings (a 1+3 split looks worse than 2+2) and
  // headings with inline markup. A tail is never wider than the heading
  // (narrow phones, long words), so nothing ever overflows.
  var HEADLINE_SELECTOR = '.app-page h1, .app-page h2.marketing-section-title, ' +
    '.app-page .marketing-cta-panel h2, .app-page .marketing-cta-panel h3';
  var TAIL_WORDS = 3;
  var MIN_WORDS = 5;

  function initHeadlineTails() {
    var headings = Array.prototype.slice.call(document.querySelectorAll(HEADLINE_SELECTOR))
      .filter(function (el) { return el.childElementCount === 0; })
      .map(function (el) { return { el: el, text: el.textContent.trim() }; })
      .filter(function (h) { return h.text.split(/\s+/).length >= MIN_WORDS; });
    if (!headings.length) return;

    // Try three words first, then fall back to two so a heading that is too
    // narrow for three still avoids ending on a lone word.
    function apply() {
      headings.forEach(function (h) {
        var words = h.text.split(/\s+/);
        var count;
        for (count = TAIL_WORDS; count >= 2; count -= 1) {
          var tail = document.createElement('span');
          tail.className = 'headline-tail';
          tail.textContent = words.slice(-count).join(' ');
          h.el.textContent = words.slice(0, -count).join(' ') + ' ';
          h.el.appendChild(tail);
          if (tail.getBoundingClientRect().width <= h.el.clientWidth) return;
        }
        h.el.textContent = h.text;
      });
    }

    var lastWidth = window.innerWidth;
    window.addEventListener('resize', function () {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      apply();
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
    apply();
  }

  function boot() {
    init();
    initGalleryMarquee();
    initHeadlineTails();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
