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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
