// ─── PRELOADER ───
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.preloader')?.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }, 1500);
});

// ─── CUSTOM CURSOR ───
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
if (cursor && follower) {
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  (function animateCursor() {
    fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
    follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
    requestAnimationFrame(animateCursor);
  })();
  document.querySelectorAll('a, button, .project-card, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('active'); follower.style.transform = 'translate(-50%,-50%) scale(1.5)'; });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); follower.style.transform = 'translate(-50%,-50%) scale(1)'; });
  });
}

// ─── NAVBAR SCROLL ───
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) { nav?.classList.add('scrolled'); }
  else { nav?.classList.remove('scrolled'); }
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
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  els.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;
    if (top < trigger) {
      setTimeout(() => el.classList.add('active'), i * 50);
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ─── COUNTER ANIMATION ───
function animateCounters() {
  document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
    if (counter.dataset.animated) return;
    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      counter.dataset.animated = 'true';
      const target = parseInt(counter.dataset.count);
      const suffix = counter.dataset.suffix || '';
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        counter.textContent = Math.floor(current) + suffix;
      }, 25);
    }
  });
}
window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ─── SMOOTH SCROLL FOR ANCHOR LINKS ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ─── PARALLAX EFFECT ───
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelectorAll('.hero-bg img, .page-header .hero-bg img').forEach(img => {
    img.style.transform = `scale(1.1) translateY(${scrolled * 0.15}px)`;
  });
});

// ─── ACTIVE NAV LINK ───
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── PROJECT FILTER (for projects page) ───
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card[data-category]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
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
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    btn.textContent = 'SENDING...';
    setTimeout(() => {
      btn.textContent = 'MESSAGE SENT ✓';
      btn.style.borderColor = '#4CAF50'; btn.style.color = '#4CAF50';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'SEND MESSAGE';
        btn.style.borderColor = ''; btn.style.color = '';
      }, 3000);
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

// ─── IMAGE LAZY LOAD ───
if ('IntersectionObserver' in window) {
  const imgObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
        imgObs.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => imgObs.observe(img));
}
