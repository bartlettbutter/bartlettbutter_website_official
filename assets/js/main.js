// ============================================
// Bartlett Butter — Main JS
// Design System: Showcasy (adapted)
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll-triggered fade-in animations ---
  // Content is visible by default (see style.css). We only opt into the
  // hidden/animated state once we've confirmed IntersectionObserver exists,
  // by adding `.js-anim` to the root. If JS is blocked or errors, content
  // simply stays visible.
  const fadeElements = document.querySelectorAll('.fade-in');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (fadeElements.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    document.documentElement.classList.add('js-anim');

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    fadeElements.forEach((el, index) => {
      // Stagger animation delay
      el.style.transitionDelay = `${index % 4 * 80}ms`;
      fadeObserver.observe(el);
    });
  }

  // --- Dock-style app launch animation ---
  const workCards = document.querySelectorAll('.work-card[href]');
  const canAnimateDockLaunch = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const launchDurationMs = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--dock-launch-duration')
  ) || 560;

  if (workCards.length && !prefersReducedMotion && canAnimateDockLaunch) {
    workCards.forEach(card => {
      const launchIcon = card.querySelector('.work-card-icon');

      if (!launchIcon) return;

      card.addEventListener('click', (e) => {
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          card.target === '_blank' ||
          card.hasAttribute('download') ||
          card.classList.contains('is-jumping')
        ) {
          return;
        }

        e.preventDefault();
        card.classList.add('is-jumping');

        const navigate = () => {
          window.location.assign(card.href);
        };

        const fallbackTimer = window.setTimeout(navigate, launchDurationMs + 120);

        launchIcon.addEventListener('animationend', () => {
          window.clearTimeout(fallbackTimer);
          navigate();
        }, { once: true });
      });
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navEl = document.querySelector('.nav');
        const navHeight = navEl ? navEl.offsetHeight : 0;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Move keyboard focus to the target so anchor/skip-link navigation
        // works for keyboard and screen-reader users, not just visually.
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1');
        }
        target.focus({ preventScroll: true });
      }
    });
  });

  // --- Mobile hamburger menu ---
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    const menuLinks = Array.from(navLinks.querySelectorAll('.nav-link'));

    const setMenu = (open) => {
      hamburger.classList.toggle('is-open', open);
      navLinks.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      // Lock body scroll while the mobile menu is open
      document.body.style.overflow = open ? 'hidden' : '';

      // Move focus into the menu when opening so keyboard and screen-reader
      // users land on the first link instead of being stranded behind the
      // toggle. On close, focus returns to the hamburger (handled by callers).
      if (open && menuLinks.length) {
        menuLinks[0].focus();
      }
    };

    const isOpen = () => hamburger.classList.contains('is-open');

    hamburger.addEventListener('click', () => setMenu(!isOpen()));

    menuLinks.forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (!isOpen()) return;

      // Close on Escape and return focus to the toggle.
      if (e.key === 'Escape') {
        setMenu(false);
        hamburger.focus();
        return;
      }

      // Trap Tab within the open menu (hamburger + links) so focus doesn't
      // drift to page content hidden behind the overlay.
      if (e.key === 'Tab') {
        const focusables = [hamburger].concat(menuLinks);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Close when clicking outside the nav
    document.addEventListener('click', (e) => {
      if (isOpen() && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        setMenu(false);
      }
    });
  }

  // --- Footer copyright year ---
  // Set from JS (in an external file) rather than an inline document.write(),
  // so the markup carries no inline execution path. The template ships a
  // sensible fallback year in case JS is unavailable.
  document.querySelectorAll('[data-current-year]').forEach(el => {
    el.textContent = String(new Date().getFullYear());
  });

  // --- Navbar shadow on scroll ---
  const nav = document.querySelector('.nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('is-scrolled', window.pageYOffset > 50);
    }, { passive: true });
  }

  // --- Scrollspy: highlight the nav link for the section in view ---
  // Maps each in-page nav link to its target section, then keeps the most
  // prominent visible section marked active so users keep their orientation.
  const spyLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  const spyTargets = spyLinks
    .map(link => {
      const id = link.getAttribute('href').slice(1);
      const section = id ? document.getElementById(id) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (spyTargets.length && 'IntersectionObserver' in window) {
    const visibility = new Map();

    const setActive = () => {
      let current = null;
      let currentRatio = -1;
      let currentTopDistance = Number.POSITIVE_INFINITY;

      spyTargets.forEach(({ section }) => {
        const state = visibility.get(section);
        if (!state || !state.isIntersecting) return;

        const topDistance = Math.abs(state.top);

        if (
          state.ratio > currentRatio ||
          (Math.abs(state.ratio - currentRatio) < 0.02 && topDistance < currentTopDistance)
        ) {
          current = section;
          currentRatio = state.ratio;
          currentTopDistance = topDistance;
        }
      });

      spyTargets.forEach(({ link, section }) => {
        link.classList.toggle('is-active', section === current);
      });
    };

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        visibility.set(entry.target, {
          isIntersecting: entry.isIntersecting,
          ratio: entry.intersectionRatio,
          top: entry.boundingClientRect.top
        });
      });
      setActive();
    }, {
      // Track multiple visibility levels so nested anchors like `#about`
      // can overtake their parent section once they become the dominant block
      // in view, rather than always losing to the earlier section start.
      rootMargin: '-35% 0px -35% 0px',
      threshold: [0, 0.15, 0.35, 0.55, 0.75]
    });

    spyTargets.forEach(({ section }) => spyObserver.observe(section));
  }

});
