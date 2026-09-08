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

  // --- Hero gallery: pointer-driven auto-scroll -----------------------------
  // On desktop the mockup strip holds more frames than fit. Rather than make
  // visitors find and drag the scrollbar, scroll the strip automatically as the
  // pointer moves across it: hovering near the right edge glides the row right,
  // near the left edge glides it left, and the speed eases up toward the edges.
  // Progressive enhancement — without JS the strip is still a normal scroller.
  function initGalleryAutoScroll() {
    var tracks = Array.prototype.slice.call(
      document.querySelectorAll('.hero-gallery-track')
    );
    if (!tracks.length) return;

    // Only for devices with a fine pointer that can actually hover (mouse /
    // trackpad), and never under reduced-motion. Touch devices keep native
    // swipe scrolling.
    var finePointer = window.matchMedia &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || prefersReduced) return;

    tracks.forEach(function (track) {
      var pointerX = null;   // last known pointer x within the track (px)
      var rafId = null;

      // Dead zone in the middle where the strip holds still; the outer
      // fraction on each side is the active "glide" region.
      var EDGE_ZONE = 0.28;  // 28% of width on each side reacts to the pointer
      var MAX_SPEED = 14;    // px per frame at the very edge

      function step() {
        // Nothing to scroll, or pointer left the track: stop the loop.
        var maxScroll = track.scrollWidth - track.clientWidth;
        if (pointerX === null || maxScroll <= 0) {
          rafId = null;
          return;
        }

        var width = track.clientWidth;
        var ratio = pointerX / width;               // 0 (left) .. 1 (right)
        var speed = 0;

        if (ratio < EDGE_ZONE) {
          // Left region: scroll left. Intensity grows toward the left edge.
          var leftIntensity = (EDGE_ZONE - ratio) / EDGE_ZONE;
          speed = -MAX_SPEED * leftIntensity;
        } else if (ratio > 1 - EDGE_ZONE) {
          // Right region: scroll right. Intensity grows toward the right edge.
          var rightIntensity = (ratio - (1 - EDGE_ZONE)) / EDGE_ZONE;
          speed = MAX_SPEED * rightIntensity;
        }

        if (speed !== 0) {
          track.scrollLeft += speed;
        }
        rafId = window.requestAnimationFrame(step);
      }

      function start() {
        if (rafId === null) {
          rafId = window.requestAnimationFrame(step);
        }
      }

      track.addEventListener('pointermove', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        var rect = track.getBoundingClientRect();
        pointerX = e.clientX - rect.left;
        start();
      });

      track.addEventListener('pointerleave', function () {
        pointerX = null;   // step() sees this and halts the loop
      });
    });
  }

  function boot() {
    init();
    initGalleryAutoScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
