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

  // --- Hero gallery: pointer-direction flip deck ----------------------------
  // On desktop, paired screenshots flip forward/back as the mouse moves across
  // the gallery. Moving right reveals the back faces; moving left rotates the
  // cards back to the fronts. Without this enhancement, the fallback strip
  // above remains visible and fully usable.
  function initGalleryFlipDeck() {
    var tracks = Array.prototype.slice.call(
      document.querySelectorAll('.hero-gallery-flip-track')
    );
    if (!tracks.length) return;

    var finePointer = window.matchMedia &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || prefersReduced) return;

    function buildFace(img, faceClassName) {
      var face = document.createElement('div');
      var clone = img.cloneNode(false);

      face.className = faceClassName;
      clone.alt = '';
      face.appendChild(clone);
      return face;
    }

    function buildTrack(track) {
      var section = track.closest('.hero-gallery');
      var fallbackTrack = section &&
        section.querySelector('.hero-gallery-track--fallback');
      var sourceImages = fallbackTrack
        ? Array.prototype.slice.call(fallbackTrack.querySelectorAll('img'))
        : [];
      if (!sourceImages.length) return false;

      var columns = Math.ceil(sourceImages.length / 2);
      track.innerHTML = '';
      track.style.setProperty('--hero-gallery-columns', columns);

      sourceImages.slice(0, columns).forEach(function (frontImg, index) {
        var backImg = sourceImages[index + columns] || frontImg;
        var frame = document.createElement('figure');
        var shell = document.createElement('div');

        frame.className = 'hero-gallery-frame hero-gallery-frame--flip reveal';
        frame.setAttribute('aria-label', (frontImg.alt || 'App screenshot') + ' / ' + (backImg.alt || 'App screenshot'));
        frame.style.setProperty('--hero-gallery-stagger', (index * 45) + 'ms');

        shell.className = 'hero-gallery-card-shell';
        shell.appendChild(buildFace(frontImg, 'hero-gallery-card-face hero-gallery-card-face--front'));
        shell.appendChild(buildFace(backImg, 'hero-gallery-card-face hero-gallery-card-face--back'));
        frame.appendChild(shell);
        track.appendChild(frame);
      });

      return true;
    }

    var interactiveTracks = tracks.filter(buildTrack);
    if (!interactiveTracks.length) return;

    document.documentElement.classList.add('js-gallery-flip');

    interactiveTracks.forEach(function (track) {
      var lastPointerX = null;
      var directionTravel = 0;
      var rafId = null;
      var targetTiltX = 0;
      var targetTiltY = 0;
      var currentTiltX = 0;
      var currentTiltY = 0;

      function render() {
        currentTiltX += (targetTiltX - currentTiltX) * 0.16;
        currentTiltY += (targetTiltY - currentTiltY) * 0.16;

        track.style.setProperty('--hero-gallery-tilt-x', currentTiltX.toFixed(2) + 'deg');
        track.style.setProperty('--hero-gallery-tilt-y', currentTiltY.toFixed(2) + 'deg');

        var shouldContinue =
          Math.abs(targetTiltX - currentTiltX) > 0.08 ||
          Math.abs(targetTiltY - currentTiltY) > 0.08;

        if (shouldContinue) {
          rafId = window.requestAnimationFrame(render);
        } else {
          rafId = null;
        }
      }

      function requestRender() {
        if (rafId === null) {
          rafId = window.requestAnimationFrame(render);
        }
      }

      function updateTilt(e) {
        var rect = track.getBoundingClientRect();
        var ratioX = (e.clientX - rect.left) / rect.width;
        var ratioY = (e.clientY - rect.top) / rect.height;

        targetTiltX = (ratioX - 0.5) * 10;
        targetTiltY = (0.5 - ratioY) * 8;
        requestRender();

        return e.clientX - rect.left;
      }

      track.addEventListener('pointerenter', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        lastPointerX = updateTilt(e);
        directionTravel = 0;
      });

      track.addEventListener('pointermove', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;

        var localPointerX = updateTilt(e);
        if (lastPointerX !== null) {
          var deltaX = localPointerX - lastPointerX;
          if (Math.abs(deltaX) >= 2) {
            if (directionTravel === 0 || directionTravel * deltaX > 0) {
              directionTravel += deltaX;
            } else {
              directionTravel = deltaX;
            }
          }

          if (Math.abs(directionTravel) >= 28) {
            track.classList.toggle('is-flipped-forward', directionTravel > 0);
            directionTravel = 0;
          }
        }
        lastPointerX = localPointerX;
      });

      track.addEventListener('pointerleave', function () {
        lastPointerX = null;
        directionTravel = 0;
        targetTiltX = 0;
        targetTiltY = 0;
        requestRender();
      });
    });
  }

  function boot() {
    init();
    initGalleryFlipDeck();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
