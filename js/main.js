// ─── INSTANT PRELOADER DISMISSAL ───
function dismissPreloader() {
  const preloader = document.querySelector('.preloader');
  if (preloader && !preloader.classList.contains('hidden')) {
    preloader.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(dismissPreloader, 150));
} else {
  setTimeout(dismissPreloader, 100);
}
setTimeout(dismissPreloader, 350);
window.addEventListener('load', dismissPreloader);

// ─── NAVBAR SCROLL (PASSIVE + rAF) ───
const nav = document.querySelector('.nav');
let navTicking = false;
window.addEventListener('scroll', () => {
  if (!navTicking) {
    requestAnimationFrame(() => {
      if (window.scrollY > 50) nav?.classList.add('scrolled');
      else nav?.classList.remove('scrolled');
      navTicking = false;
    });
    navTicking = true;
  }
}, { passive: true });

// ─── HAMBURGER MENU ───
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
}

// ─── SCROLL REVEAL (IntersectionObserver) ───
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });
} else {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => el.classList.add('active'));
}

// ─── COUNTER ANIMATION (IntersectionObserver) ───
function animateCounter(counter) {
  if (counter.dataset.animated) return;
  counter.dataset.animated = 'true';
  const target = parseInt(counter.dataset.count, 10);
  const suffix = counter.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(ease * target);
    counter.textContent = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      counter.textContent = target + suffix;
    }
  }
  requestAnimationFrame(step);
}

if ('IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.stat-number[data-count]').forEach(el => {
    counterObserver.observe(el);
  });
}

// ─── SMOOTH ANCHOR SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#' || !href) return;
    const t = document.querySelector(href);
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── ACTIVE NAV LINK ───
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) link.classList.add('active');
});

// ─── PROJECT FILTER ───
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card[data-category]').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
      } else {
        card.style.opacity = '0'; card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  });
});

// ─── CONTACT FORM ───
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    if (!btn) return;
    btn.textContent = 'SENDING...';
    setTimeout(() => {
      btn.textContent = 'MESSAGE SENT ✓';
      btn.style.background = '#2d6a4f';
      contactForm.reset();
      setTimeout(() => { btn.textContent = 'SEND MESSAGE'; btn.style.background = ''; }, 3000);
    }, 800);
  });
}

// ─── TESTIMONIAL SLIDER ───
const slides = document.querySelectorAll('.testimonial-slide');
let currentSlide = 0;
function showSlide(n) {
  slides.forEach(s => { s.style.opacity = '0'; s.style.display = 'none'; });
  if (slides[n]) { slides[n].style.display = 'block'; setTimeout(() => { slides[n].style.opacity = '1'; }, 50); }
}
if (slides.length > 1) {
  showSlide(0);
  setInterval(() => { currentSlide = (currentSlide + 1) % slides.length; showSlide(currentSlide); }, 5000);
}

// ─── INTERACTIVE HERO DIVISION SWITCHER ───
(function () {
  const heroBtns = document.querySelectorAll('.hero-div-btn[data-division]');
  const heroBgLayers = document.querySelectorAll('.hero-bg-layer[data-division]');
  const heroTextBlocks = document.querySelectorAll('.hero-text-block[data-division]');

  if (!heroBtns.length) return;

  function switchDivision(divisionName) {
    heroBgLayers.forEach(layer => {
      if (layer.dataset.division === divisionName) {
        layer.classList.add('active');
      } else {
        layer.classList.remove('active');
      }
    });
    heroTextBlocks.forEach(block => {
      if (block.dataset.division === divisionName) {
        block.classList.add('active');
      } else {
        block.classList.remove('active');
      }
    });
    heroBtns.forEach(btn => {
      if (btn.dataset.division === divisionName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  heroBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      switchDivision(btn.dataset.division);
    });
    btn.addEventListener('touchstart', () => {
      switchDivision(btn.dataset.division);
    }, { passive: true });
  });

  const heroNav = document.querySelector('.hero-division-nav');
  if (heroNav) {
    heroNav.addEventListener('mouseleave', () => {
      switchDivision('default');
      heroBtns.forEach(btn => btn.classList.remove('active'));
    });
  }
})();
