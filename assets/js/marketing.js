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

  function boot() {
    init();
    initGalleryMarquee();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
