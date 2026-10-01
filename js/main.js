// ─── PRELOADER ───
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.preloader')?.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 1200);
});

// ─── NAVBAR SCROLL ───
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) nav?.classList.add('scrolled');
  else nav?.classList.remove('scrolled');
});

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

// ─── SCROLL REVEAL ───
function revealOnScroll() {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.88) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ─── COUNTER ANIMATION ───
function animateCounters() {
  document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
    if (counter.dataset.animated) return;
    if (counter.getBoundingClientRect().top < window.innerHeight * 0.9) {
      counter.dataset.animated = 'true';
      const target = parseInt(counter.dataset.count);
      const suffix = counter.dataset.suffix || '';
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        counter.textContent = Math.floor(current) + suffix;
      }, 30);
    }
  });
}
window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ─── SMOOTH ANCHOR SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(anchor.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    btn.textContent = 'SENDING...';
    setTimeout(() => {
      btn.textContent = 'MESSAGE SENT ✓';
      btn.style.background = '#2d6a4f';
      contactForm.reset();
      setTimeout(() => { btn.textContent = 'SEND MESSAGE'; btn.style.background = ''; }, 3000);
    }, 1500);
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
    // Switch background layers
    heroBgLayers.forEach(layer => {
      if (layer.dataset.division === divisionName) {
        layer.classList.add('active');
      } else {
        layer.classList.remove('active');
      }
    });
    // Switch text blocks
    heroTextBlocks.forEach(block => {
      if (block.dataset.division === divisionName) {
        block.classList.add('active');
      } else {
        block.classList.remove('active');
      }
    });
    // Switch button active state
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

  // Revert to default when mouse leaves the entire nav area
  const heroNav = document.querySelector('.hero-division-nav');
  if (heroNav) {
    heroNav.addEventListener('mouseleave', () => {
      switchDivision('default');
      heroBtns.forEach(btn => btn.classList.remove('active'));
    });
  }
})();
