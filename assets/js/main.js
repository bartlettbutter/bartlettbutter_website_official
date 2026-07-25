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
    const setMenu = (open) => {
      hamburger.classList.toggle('is-open', open);
      navLinks.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      // Lock body scroll while the mobile menu is open
      document.body.style.overflow = open ? 'hidden' : '';
    };

    const isOpen = () => hamburger.classList.contains('is-open');

    hamburger.addEventListener('click', () => setMenu(!isOpen()));

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => setMenu(false));
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        setMenu(false);
        hamburger.focus();
      }
    });

    // Close when clicking outside the nav
    document.addEventListener('click', (e) => {
      if (isOpen() && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        setMenu(false);
      }
    });
  }

  // --- Navbar shadow on scroll ---
  const nav = document.querySelector('.nav');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('is-scrolled', window.pageYOffset > 50);
    }, { passive: true });
  }

});
