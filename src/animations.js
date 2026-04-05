/* ========================================
   Portfolio — Premium GSAP Animation Module
   ======================================== */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Performance: check for reduced motion preference ──
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// ── Performance: check mobile ──
const isMobile = window.matchMedia('(max-width: 768px)').matches;

// ─────────────────────────────────────────
// MAIN EXPORT — called once after loader hides
// ─────────────────────────────────────────
export function initAnimations(lenis) {
  if (prefersReduced) return; // Respect user preference

  initScrollProgress();
  initLenisGSAPSync(lenis);
  initBackgroundOrbs();
  initHeroCinematic();
  initScrollReveal();
  initParallax();
  initProjectCardHover();
  initMagneticButtons();
  initGSAPCursor();
}

// ─────────────────────────────────────────
// 1. SCROLL PROGRESS BAR
// ─────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    transformOrigin: 'left center',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });
}

// ─────────────────────────────────────────
// 2. LENIS + GSAP TICKER SYNC
// ─────────────────────────────────────────
function initLenisGSAPSync(lenis) {
  if (!lenis) return;
  // Sync Lenis with GSAP's RAF for perfect animation alignment
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0); // Prevent GSAP from catching up after tab switch
  // Wire ScrollTrigger to Lenis scroll events
  lenis.on('scroll', ScrollTrigger.update);
}

// ─────────────────────────────────────────
// 3. BACKGROUND ORBS (ambient glow)
// ─────────────────────────────────────────
function initBackgroundOrbs() {
  const orbs = document.querySelectorAll('.bg-orb');
  orbs.forEach((orb, i) => {
    gsap.to(orb, {
      x: `${(i % 2 === 0 ? 1 : -1) * (30 + i * 15)}`,
      y: `${20 + i * 10}`,
      duration: 8 + i * 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  });
}

// ─────────────────────────────────────────
// 4. HERO CINEMATIC ENTRANCE
// ─────────────────────────────────────────
function initHeroCinematic() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

  // --- Letter-by-letter name reveal ---
  const heroName = document.getElementById('heroName');
  if (heroName) {
    // Walk child nodes: split text nodes into chars, keep element nodes intact
    const originalNodes = Array.from(heroName.childNodes);
    heroName.innerHTML = '';

    const charEls = [];

    originalNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        // Split text into words, each word into chars
        const words = node.textContent.trim().split(/\s+/);
        words.forEach((word, wi) => {
          if (!word) return;
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word';
          wordSpan.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;margin-right:0.25em;';

          word.split('').forEach(ch => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.style.cssText = 'display:inline-block;will-change:transform;';
            charSpan.textContent = ch;
            wordSpan.appendChild(charSpan);
            charEls.push(charSpan);
          });

          heroName.appendChild(wordSpan);
        });

      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Wrap element (e.g. .highlight span) as a whole animated word
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        wordSpan.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom;';
        // Clone the original element and wrap it
        node.style.cssText = (node.style.cssText || '') + 'display:inline-block;will-change:transform;';
        wordSpan.appendChild(node.cloneNode(true));
        heroName.appendChild(wordSpan);
        charEls.push(wordSpan.firstChild);
      }
    });

    if (charEls.length) {
      tl.fromTo(charEls,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1, stagger: 0.03, ease: 'expo.out' },
        0
      );
    }
  }

  // --- Greeting line ---
  const greeting = document.getElementById('heroGreeting');
  if (greeting) {
    tl.fromTo(greeting,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.1
    );
  }

  // --- Title wrapper ---
  const titleWrapper = document.querySelector('.hero-title-wrapper');
  if (titleWrapper) {
    tl.fromTo(titleWrapper,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.5
    );
  }

  // --- Description ---
  const desc = document.querySelector('.hero-description');
  if (desc) {
    tl.fromTo(desc,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      0.65
    );
  }

  // --- CTA buttons ---
  const cta = document.querySelector('.hero-cta');
  if (cta) {
    tl.fromTo(cta,
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7 },
      0.8
    );
  }

  // --- Stats ---
  const stats = document.querySelector('.hero-stats');
  if (stats) {
    tl.fromTo(stats,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      0.9
    );
  }

  // --- Hero visual (slide from right) ---
  const visual = document.querySelector('.hero-visual');
  if (visual) {
    tl.fromTo(visual,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'expo.out' },
      0.2
    );
  }
}

// ─────────────────────────────────────────
// 5. SCROLL REVEAL (replaces IntersectionObserver)
// ─────────────────────────────────────────
function initScrollReveal() {
  // Generic fade-up for section tags, titles, lines
  gsap.utils.toArray('.section-tag, .section-line').forEach(el => {
    gsap.fromTo(el,
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  });

  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  });

  // About text paragraphs
  gsap.utils.toArray('.about-text p').forEach((el, i) => {
    gsap.fromTo(el,
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  });

  // About detail items — stagger
  const detailItems = document.querySelectorAll('.detail-item');
  if (detailItems.length) {
    gsap.fromTo(detailItems,
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: detailItems[0], start: 'top 85%', once: true },
      }
    );
  }

  // About cards — slide from right, staggered
  gsap.utils.toArray('.about-card').forEach((card, i) => {
    gsap.fromTo(card,
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, delay: i * 0.12, ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 85%', once: true },
      }
    );
  });

  // Skill cards — stagger grid
  const skillCards = document.querySelectorAll('.skill-card');
  if (skillCards.length) {
    gsap.fromTo(skillCards,
      { y: 30, opacity: 0, scale: 0.92 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: { amount: 0.5, from: 'start' },
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '#skillsGrid', start: 'top 80%', once: true },
      }
    );
  }

  // Skill bars — animate fill after cards appear
  const skillFills = document.querySelectorAll('.skill-level-fill');
  if (skillFills.length) {
    skillFills.forEach(fill => {
      const level = fill.dataset.level || 0;
      gsap.fromTo(fill,
        { width: '0%' },
        {
          width: `${level}%`, duration: 1.4, ease: 'power3.out',
          scrollTrigger: { trigger: fill, start: 'top 85%', once: true },
        }
      );
    });
  }

  // Project cards
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length) {
    gsap.fromTo(projectCards,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'expo.out',
        scrollTrigger: { trigger: '#projectsGrid', start: 'top 80%', once: true },
      }
    );
  }

  // GitHub stat cards
  const ghStatCards = document.querySelectorAll('.gh-stat-card');
  if (ghStatCards.length) {
    gsap.fromTo(ghStatCards,
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '#githubLiveStats', start: 'top 80%', once: true },
      }
    );
  }

  // Chart cards
  gsap.utils.toArray('.github-chart-card').forEach((card, i) => {
    gsap.fromTo(card,
      { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 80%', once: true },
      }
    );
  });

  // Timeline items — alternating slide
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.fromTo(item,
      { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: item, start: 'top 85%', once: true },
      }
    );
  });

  // Certificate cards
  const certCards = document.querySelectorAll('.cert-card');
  if (certCards.length) {
    gsap.fromTo(certCards,
      { y: 40, opacity: 0, rotateX: 15 },
      {
        y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: '#certsGrid', start: 'top 80%', once: true },
      }
    );
  }

  // Contact section
  const contactInfo = document.querySelector('.contact-info');
  const contactForm = document.querySelector('.contact-form');
  if (contactInfo) {
    gsap.fromTo(contactInfo,
      { x: -50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: contactInfo, start: 'top 80%', once: true },
      }
    );
  }
  if (contactForm) {
    gsap.fromTo(contactForm,
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: contactForm, start: 'top 80%', once: true },
      }
    );
  }

  // Contact link items
  gsap.utils.toArray('.contact-link-item').forEach((item, i) => {
    gsap.fromTo(item,
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      }
    );
  });

  // Subsection title
  gsap.utils.toArray('.subsection-title').forEach(el => {
    gsap.fromTo(el,
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  });
}

// ─────────────────────────────────────────
// 6. PARALLAX
// ─────────────────────────────────────────
function initParallax() {
  if (isMobile) return; // Skip on mobile

  // Hero image parallax
  const heroImage = document.querySelector('.hero-image-wrapper');
  if (heroImage) {
    gsap.to(heroImage, {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }

  // Background orbs parallax at different depths
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');
  if (orb1) gsap.to(orb1, { y: 120, ease: 'none', scrollTrigger: { scrub: 2.5, start: 'top top', end: 'bottom bottom' } });
  if (orb2) gsap.to(orb2, { y: -80, ease: 'none', scrollTrigger: { scrub: 2, start: 'top top', end: 'bottom bottom' } });
  if (orb3) gsap.to(orb3, { y: 60, ease: 'none', scrollTrigger: { scrub: 3, start: 'top top', end: 'bottom bottom' } });

  // Section background parallax depths
  gsap.utils.toArray('.section-alt').forEach(section => {
    gsap.fromTo(section,
      { backgroundPosition: '50% 0%' },
      {
        backgroundPosition: '50% 30%',
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
      }
    );
  });
}

// ─────────────────────────────────────────
// 7. PROJECT CARD HOVER (GSAP-powered)
// ─────────────────────────────────────────
function initProjectCardHover() {
  document.querySelectorAll('.project-card').forEach(card => {
    const img = card.querySelector('.project-image');
    const overlay = card.querySelector('.project-overlay');
    const content = card.querySelector('.project-content');
    const title = card.querySelector('.project-title');

    const enterAnim = gsap.timeline({ paused: true });

    if (img) enterAnim.to(img, { scale: 1.08, duration: 0.5, ease: 'power2.out' }, 0);
    if (overlay) enterAnim.to(overlay, { opacity: 1, duration: 0.4 }, 0);
    if (content) enterAnim.to(content, { y: -6, duration: 0.4, ease: 'power2.out' }, 0);
    if (title) enterAnim.to(title, { color: 'var(--accent-primary)', duration: 0.3 }, 0);

    // 3D tilt on mouse move
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(card, {
        rotateY: x * 5,
        rotateX: -y * 5,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
        transformOrigin: 'center center',
      });
    });

    card.addEventListener('mouseenter', () => enterAnim.play());
    card.addEventListener('mouseleave', () => {
      enterAnim.reverse();
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ─────────────────────────────────────────
// 8. MAGNETIC BUTTONS
// ─────────────────────────────────────────
function initMagneticButtons() {
  if (isMobile) return; // Skip on touch devices

  document.querySelectorAll('.btn, .nav-logo, .footer-social-link, .project-link').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      gsap.to(btn, {
        x: dx, y: dy,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0, y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto',
      });
    });
  });
}

// ─────────────────────────────────────────
// 9. GSAP-POWERED CUSTOM CURSOR
// ─────────────────────────────────────────
export function initGSAPCursor() {
  if (isMobile || 'ontouchstart' in window) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  document.body.style.cursor = 'none';

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    gsap.to(dot, {
      x: mouseX,
      y: mouseY,
      duration: 0.08,
      ease: 'none',
      overwrite: 'auto',
    });

    // Ring follows with smooth lag
    gsap.to(ring, {
      x: mouseX,
      y: mouseY,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  });

  // Hover expand effect
  const hoverEls = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .cert-card, .contact-link-item, .nav-link, .theme-toggle');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(dot, { scale: 2, background: 'var(--accent-secondary)', duration: 0.3 });
      gsap.to(ring, { scale: 1.6, borderColor: 'var(--accent-secondary)', opacity: 0.4, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(dot, { scale: 1, background: 'var(--accent-primary)', duration: 0.3 });
      gsap.to(ring, { scale: 1, borderColor: 'var(--accent-primary)', opacity: 0.5, duration: 0.3 });
    });
  });

  // Hide on mouse out of window
  document.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 }));
  document.addEventListener('mouseenter', () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 }));
}

// ─────────────────────────────────────────
// UTILITY: Re-init project cards after dynamic render
// ─────────────────────────────────────────
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
  initProjectCardHover();

  // Animate dynamically rendered cards
  const dynamicCards = document.querySelectorAll('#githubReposGrid .project-card');
  if (dynamicCards.length) {
    gsap.fromTo(dynamicCards,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'expo.out',
      }
    );
  }
  const certCards = document.querySelectorAll('.cert-card');
  if (certCards.length) {
    gsap.fromTo(certCards,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.2)',
      }
    );
  }
  const skillCards = document.querySelectorAll('.skill-card');
  if (skillCards.length) {
    gsap.fromTo(skillCards,
      { y: 20, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(1.2)',
      }
    );
  }
}
