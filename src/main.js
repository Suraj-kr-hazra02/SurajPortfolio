/* ========================================
   Portfolio — Premium Main JavaScript
   ======================================== */
import * as THREE from 'three';
import Lenis from 'lenis';

// ---- DATA ----
const SKILLS = [
  { name: 'Python', icon: '🐍', level: 88 },
  { name: 'C', icon: '⚙️', level: 72 },
  { name: 'HTML', icon: '🧱', level: 82 },
  { name: 'CSS', icon: '🎨', level: 78 },
  { name: 'JavaScript', icon: '⚡', level: 68 },
  { name: 'VS Code', icon: '🖥️', level: 90 },
  { name: 'AI/ML', icon: '🤖', level: 65 },
  { name: 'Git & GitHub', icon: '🐙', level: 75 },
  { name: 'Problem Solving', icon: '🧩', level: 70 },
];

const PROJECTS = [
  {
    title: 'Suraj Portfolio',
    description: 'A premium personal portfolio website built with Vite, Three.js, and Lenis smooth scroll. Features a cinematic loader, 3D hero background, interactive particle system, live GitHub stats, and dark/light themes.',
    tags: ['CSS', 'JavaScript', 'Vite', 'Three.js'],
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    github: 'https://github.com/Suraj-kr-hazra02/SurajPortfolio',
    live: 'https://suraj-portfolio-kappa-six.vercel.app',
  },
  {
    title: 'Python Calculator',
    description: 'A clean, functional calculator built with Python. A foundational project demonstrating core Python programming logic, user input handling, and arithmetic operations.',
    tags: ['Python'],
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&h=400&fit=crop',
    github: 'https://github.com/Suraj-kr-hazra02/Calculator',
    live: null,
  },
  {
    title: 'Voice Test App',
    description: 'A Python-based voice recognition test project exploring speech-to-text capabilities. Demonstrates audio input handling and real-world Python scripting for interactive applications.',
    tags: ['Python', 'Speech Recognition'],
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=400&fit=crop',
    github: 'https://github.com/Suraj-kr-hazra02/voice_test',
    live: null,
  },
  {
    title: 'Python Practice Repo',
    description: 'A collection of Python scripts and exercises covering core programming concepts, algorithms, and problem-solving patterns as part of ongoing learning in AI/ML development.',
    tags: ['Python', 'Algorithms'],
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&h=400&fit=crop',
    github: 'https://github.com/Suraj-kr-hazra02/python',
    live: null,
  },
];

const EXPERIENCE = [
  {
    title: 'B.Tech in AI & ML',
    company: 'Brainware University',
    date: '2024 — 2028',
    description: ['Barasat, West Bengal', 'Pursuing Computer Science Engineering with Artificial Intelligence & Machine Learning specialization'],
  },
  {
    title: '12th (Higher Secondary)',
    company: 'Belda Gangadhar Academy',
    date: '2023 — 2024',
    description: ['Belda, Paschim Medinipur', 'Completed Higher Secondary Education'],
  },
  {
    title: '10th (Secondary Education)',
    company: 'Belda Gangadhar Academy',
    date: '2021 — 2022',
    description: ['Belda, Paschim Medinipur', 'Completed Secondary Education'],
  },
  {
    title: 'Academic & Technical Activities',
    company: 'Extracurricular',
    date: 'Ongoing',
    description: ['Attended various technical seminars and workshops.', 'Participated in AI Prompt Engineering competitions.'],
  },
];

const CERTIFICATES = [
  { icon: '🏆', title: 'AI Prompt Engineering', issuer: 'Workshop Certificate', date: '2024' },
  { icon: '🎓', title: 'Python Programming', issuer: 'Online Certification', date: '2024' },
  { icon: '📜', title: 'Data Structures & Algorithms', issuer: 'Academic Achievement', date: '2024' },
  { icon: '🤖', title: 'Introduction to Machine Learning', issuer: 'Online Course', date: '2025' },
];

const TYPED_STRINGS = [
  'BTech CSE Student',
  'Python Developer',
  'AI/ML Learner',
  'Problem Solver',
  'Tech Explorer',
];

const GITHUB_USERNAME = 'Suraj-kr-hazra02';

const LANG_COLORS = {
  Python: '#3572A5', JavaScript: '#f1e05a', HTML: '#e34c26', CSS: '#563d7c',
  Java: '#b07219', C: '#555555', 'C++': '#f34b7d', TypeScript: '#2b7489',
  Shell: '#89e051', Jupyter: '#DA5B0B', null: '#8b8b8b',
};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loading');

  // Start loading
  initLoader();
  initLenis();
  initThreeScene();
  initParticles();
  initTypedEffect();
  initNavigation();
  initScrollAnimations();
  initCustomCursor();
  initThemeToggle();
  renderSkills();
  renderProjects();
  renderTimeline();
  renderCertificates();
  animateStats();
  initContactForm();
  initCertTilt();
  fetchGitHubData();
});

// ========================================
// 🎬 CINEMATIC LOADING SCREEN
// ========================================
function initLoader() {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 90) progress = 90;
    bar.style.width = progress + '%';
  }, 200);

  window.addEventListener('load', () => {
    clearInterval(interval);
    bar.style.width = '100%';
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      // Trigger hero animations after loader is gone
      document.querySelectorAll('.hero .fade-up, .hero .fade-left, .hero .fade-right, .hero .fade-scale').forEach(el => {
        el.classList.add('visible');
      });
    }, 600);
  });
}

// ========================================
// 🌀 LENIS SMOOTH SCROLL
// ========================================
let lenis;
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// ========================================
// 🔮 THREE.JS 3D HERO SCENE
// ========================================
function initThreeScene() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Wireframe Geometries
  const material = new THREE.MeshBasicMaterial({
    color: 0x6c63ff,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });

  const material2 = new THREE.MeshBasicMaterial({
    color: 0x00d4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.06,
  });

  const shapes = [];

  const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(4, 1), material);
  ico.position.set(-12, 5, -5);
  scene.add(ico);
  shapes.push(ico);

  const torus = new THREE.Mesh(new THREE.TorusGeometry(3, 0.8, 12, 40), material2);
  torus.position.set(14, -4, -8);
  scene.add(torus);
  shapes.push(torus);

  const octa = new THREE.Mesh(new THREE.OctahedronGeometry(3, 0), material);
  octa.position.set(8, 8, -12);
  scene.add(octa);
  shapes.push(octa);

  const dodeca = new THREE.Mesh(new THREE.DodecahedronGeometry(2.5, 0), material2);
  dodeca.position.set(-10, -8, -6);
  scene.add(dodeca);
  shapes.push(dodeca);

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    requestAnimationFrame(animate);

    shapes.forEach((mesh, i) => {
      mesh.rotation.x += 0.002 + i * 0.001;
      mesh.rotation.y += 0.003 + i * 0.001;
    });

    // Subtle parallax based on mouse
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ========================================
// 🌊 INTERACTIVE PARTICLE SYSTEM
// ========================================
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 70;
  let mouseX = -9999, mouseY = -9999;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.baseSpeedX = (Math.random() - 0.5) * 0.4;
      this.baseSpeedY = (Math.random() - 0.5) * 0.4;
      this.speedX = this.baseSpeedX;
      this.speedY = this.baseSpeedY;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() > 0.5 ? 245 : 190; // purple or cyan
    }
    update() {
      // Mouse repulsion
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 150;
        this.speedX += (dx / dist) * force * 0.5;
        this.speedY += (dy / dist) * force * 0.5;
      }

      // Dampen back to base speed
      this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
      this.speedY += (this.baseSpeedY - this.speedY) * 0.05;

      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108, 99, 255, ${0.06 * (1 - dist / 140)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
}

// ========================================
// TYPED EFFECT
// ========================================
function initTypedEffect() {
  const el = document.getElementById('typedText');
  let stringIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = TYPED_STRINGS[stringIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === current.length) { delay = 2000; isDeleting = true; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; stringIndex = (stringIndex + 1) % TYPED_STRINGS.length; delay = 500; }
    setTimeout(type, delay);
  }
  type();
}

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  const sections = document.querySelectorAll('.section, .hero');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          item.classList.toggle('active', item.dataset.section === id);
        });
      }
    });
  }, { root: null, rootMargin: '-40% 0px -60% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      toggle.classList.remove('open');
      links.classList.remove('open');
      const target = document.querySelector(item.getAttribute('href'));
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -60 });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Smooth scroll for other anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.classList.contains('nav-link')) return;
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -60 });
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ========================================
// 🎞️ DIRECTIONAL SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
  // Skip hero — it's triggered after loader
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Observe directional elements
  document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-scale, .animate-in').forEach(el => {
    if (!el.closest('.hero')) {
      observer.observe(el);
    }
  });

  // Auto-add animations to dynamic elements
  const autoAnimateSelector = '.skill-card, .project-card, .timeline-item, .about-card, .contact-link-item, .section-header, .about-text, .contact-form, .cert-card, .gh-stat-card, .github-chart-card';
  document.querySelectorAll(autoAnimateSelector).forEach((el, i) => {
    if (!el.classList.contains('fade-up') && !el.classList.contains('fade-left') && !el.classList.contains('fade-right')) {
      el.classList.add('fade-up');
      if (i % 3 === 0) el.classList.add('delay-1');
      else if (i % 3 === 1) el.classList.add('delay-2');
    }
    observer.observe(el);
  });
}

// ========================================
// 🖱️ CUSTOM MAGNETIC CURSOR
// ========================================
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // Hide on touch devices
  if ('ontouchstart' in window) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Magnetic hover effect
  const hoverElements = 'a, button, .btn, .project-card, .skill-card, .cert-card, .contact-link-item, .nav-link, .theme-toggle';
  document.querySelectorAll(hoverElements).forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    });
  });

  // Hide default cursor
  document.body.style.cursor = 'none';
  document.querySelectorAll('a, button').forEach(el => { el.style.cursor = 'none'; });
}

// ========================================
// 🌙☀️ DARK / LIGHT MODE
// ========================================
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load saved theme
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ========================================
// RENDER SKILLS
// ========================================
function renderSkills() {
  const grid = document.getElementById('skillsGrid');
  grid.innerHTML = SKILLS.map(skill => `
    <div class="skill-card">
      <span class="skill-icon">${skill.icon}</span>
      <span class="skill-name">${skill.name}</span>
      <div class="skill-level">
        <div class="skill-level-fill" data-level="${skill.level}"></div>
      </div>
    </div>
  `).join('');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-level-fill');
        if (fill) setTimeout(() => { fill.style.width = fill.dataset.level + '%'; }, 200);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));
}

// ========================================
// RENDER PROJECTS
// ========================================
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map(project => `
    <div class="project-card">
      <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy" />
      <div class="project-content">
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-links">
          <a href="${project.github}" class="project-link" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Code
          </a>
          ${project.live ? `<a href="${project.live}" class="project-link" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            Live
          </a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// ========================================
// RENDER TIMELINE
// ========================================
function renderTimeline() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = EXPERIENCE.map(exp => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <span class="timeline-date">${exp.date}</span>
      <div class="timeline-card">
        <h3 class="timeline-title">${exp.title}</h3>
        <span class="timeline-company">${exp.company}</span>
        <ul class="timeline-description">
          ${exp.description.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

// ========================================
// 📜 CERTIFICATES
// ========================================
function renderCertificates() {
  const grid = document.getElementById('certsGrid');
  grid.innerHTML = CERTIFICATES.map(cert => `
    <div class="cert-card" data-tilt>
      <div class="cert-icon">${cert.icon}</div>
      <h3 class="cert-title">${cert.title}</h3>
      <p class="cert-issuer">${cert.issuer}</p>
      <span class="cert-date">${cert.date}</span>
    </div>
  `).join('');
}

function initCertTilt() {
  // Delay to ensure cards are rendered
  setTimeout(() => {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }, 500);
}

// ========================================
// ANIMATE STATS
// ========================================
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { el.textContent = target; clearInterval(timer); }
          else { el.textContent = Math.floor(current); }
        }, 40);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(num => observer.observe(num));
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('formSubmit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Message Sent! ✓</span>';
    btn.style.background = 'linear-gradient(135deg, #00c853, #00d4ff)';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ========================================
// 📊 LIVE GITHUB DATA, REPO CARDS, DONUT CHART
// ========================================
async function fetchGitHubData() {
  try {
    // Fetch user data + repos in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=10`),
    ]);

    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error');

    const user = await userRes.json();
    const repos = await reposRes.json();

    // --- Live Stats ---
    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

    animateValue('ghRepoCount', user.public_repos);
    animateValue('ghStarCount', totalStars);
    animateValue('ghForkCount', totalForks);
    animateValue('ghFollowers', user.followers);

    // --- Repo Cards ---
    renderGitHubRepos(repos.filter(r => !r.fork).slice(0, 6));

    // --- Language Donut Chart ---
    renderLanguageDonut(repos);

  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    document.getElementById('githubReposGrid').innerHTML = '<div style="text-align:center;width:100%;color:#ff5555;grid-column:1/-1;">Failed to load GitHub data.</div>';
  }
}

function animateValue(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const increment = Math.max(1, Math.floor(target / 30));
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { el.textContent = target; clearInterval(timer); }
    else { el.textContent = current; }
  }, 50);
}

function renderGitHubRepos(repos) {
  const grid = document.getElementById('githubReposGrid');
  if (!grid || repos.length === 0) {
    if (grid) grid.innerHTML = '<div style="text-align:center;width:100%;color:var(--text-secondary);grid-column:1/-1;">No repositories found.</div>';
    return;
  }

  grid.innerHTML = repos.map(repo => `
    <div class="project-card fade-up visible">
      <div class="project-content" style="height:100%;display:flex;flex-direction:column;">
        <div class="project-tags">
          ${repo.language ? `<span class="project-tag"><span class="lang-dot" style="background:${LANG_COLORS[repo.language] || '#8b8b8b'}"></span>${repo.language}</span>` : ''}
          <span class="project-tag">⭐ ${repo.stargazers_count}</span>
          <span class="project-tag">🔀 ${repo.forks_count}</span>
        </div>
        <h3 class="project-title" style="margin-top:10px;">
          <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
        </h3>
        <p class="project-description" style="flex-grow:1;">${repo.description || 'No description provided.'}</p>
        <div class="project-links" style="margin-top:auto;padding-top:20px;">
          <a href="${repo.html_url}" class="project-link" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            View Code
          </a>
          ${repo.homepage ? `<a href="${repo.homepage}" class="project-link" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
            Live Demo
          </a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

// ========================================
// 🥧 LANGUAGE DONUT CHART (Custom SVG)
// ========================================
function renderLanguageDonut(repos) {
  const svg = document.getElementById('langDonut');
  const legend = document.getElementById('donutLegend');
  if (!svg || !legend) return;

  // Count language bytes (approx by repo count per language)
  const langCount = {};
  repos.forEach(repo => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });

  const total = Object.values(langCount).reduce((s, v) => s + v, 0);
  if (total === 0) {
    svg.innerHTML = '<text x="100" y="105" text-anchor="middle" fill="var(--text-secondary)" font-size="12">No data</text>';
    return;
  }

  const entries = Object.entries(langCount).sort((a, b) => b[1] - a[1]);
  const cx = 100, cy = 100, r = 70, strokeWidth = 20;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  svg.innerHTML = '';
  legend.innerHTML = '';

  entries.forEach(([lang, count]) => {
    const pct = count / total;
    const dashLength = pct * circumference;
    const color = LANG_COLORS[lang] || '#8b8b8b';

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', color);
    circle.setAttribute('stroke-width', strokeWidth);
    circle.setAttribute('stroke-dasharray', `${dashLength} ${circumference - dashLength}`);
    circle.setAttribute('stroke-dashoffset', -offset);
    circle.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
    circle.style.transition = 'stroke-dasharray 1s ease, stroke-dashoffset 1s ease';

    svg.appendChild(circle);
    offset += dashLength;

    // Legend item
    legend.innerHTML += `
      <div class="donut-legend-item">
        <span class="donut-legend-dot" style="background:${color}"></span>
        ${lang} (${Math.round(pct * 100)}%)
      </div>
    `;
  });
}
