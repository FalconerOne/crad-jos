/**
 * CRAD-JOS — Diagnostic Services
 * Luminous Ambience & Interactive Dynamic Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCardSpotlights();
  initServiceFilter();
  initScrollTop();
  initHeaderScroll();
  initMobileNav();
  initModal();
  initSmoothScroll();
});

/**
 * 1. Multi-Spectrum Photons (Purple, Cyan & Lavender)
 * Enhanced with glowing aura shadows
 */
function initParticles() {
  const container = document.getElementById('particle-container');
  if (!container) return;

  const count = 28;
  const colors = [
    { bg: 'rgba(168, 85, 247, 0.65)', shadow: 'rgba(168, 85, 247, 0.8)' },
    { bg: 'rgba(6, 182, 212, 0.60)', shadow: 'rgba(6, 182, 212, 0.75)' },
    { bg: 'rgba(192, 132, 252, 0.55)', shadow: 'rgba(192, 132, 252, 0.7)' },
    { bg: 'rgba(16, 185, 129, 0.50)', shadow: 'rgba(16, 185, 129, 0.65)' }
  ];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'lp-particle';

    const left = (i * 3.7 + 2) % 96;
    const top = (i * 5.9 + 6) % 88;
    const delay = (i * 0.22).toFixed(2);
    const duration = 3.5 + (i % 4);
    const size = i % 4 === 0 ? 4 : i % 4 === 1 ? 3 : 2;
    const colorObj = colors[i % colors.length];

    p.style.left = `${left}%`;
    p.style.top = `${top}%`;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.backgroundColor = colorObj.bg;
    p.style.boxShadow = `0 0 ${size * 3}px ${colorObj.shadow}`;
    p.style.animation = `float-particle ${duration}s ease-in-out ${delay}s infinite`;

    container.appendChild(p);
  }
}

/**
 * 2. Interactive Cursor-Tracking Spotlight for Glass Cards
 * Dynamically binds --mouse-x and --mouse-y on mousemove
 */
function initCardSpotlights() {
  const cards = document.querySelectorAll('.glow-card, .facility-card, .feature-box');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 3. Service Category Filter
 * Filters between 'all', 'imaging', and 'lab' with smooth scaling
 */
function initServiceFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.glow-card[data-category]');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 4. Scroll to Top Floating Button
 */
function initScrollTop() {
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 5. Header Dynamic Styling on Scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.7)';
      header.style.borderBottomColor = 'rgba(192, 132, 252, 0.35)';
    } else {
      header.style.boxShadow = 'none';
      header.style.borderBottomColor = 'rgba(168, 85, 247, 0.18)';
    }
  }, { passive: true });
}

/**
 * 6. Mobile Navigation Drawer
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const panel = document.getElementById('mobile-nav-panel');
  const backdrop = document.getElementById('mobile-nav-backdrop');

  if (!toggleBtn || !panel) return;

  function openMenu() {
    panel.classList.add('open');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    panel.classList.remove('open');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (panel.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  panel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * 7. Quick Inquiry / Appointment Modal
 */
function initModal() {
  const modal = document.getElementById('inquiry-modal');
  const openBtns = document.querySelectorAll('[data-open-modal]');
  const closeBtn = document.getElementById('modal-close');
  const form = document.getElementById('inquiry-form');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preselectService = btn.getAttribute('data-service-name');
      if (preselectService && form) {
        const select = form.querySelector('#service-select');
        if (select) select.value = preselectService;
      }
      modal.classList.add('active');
    });
  });

  // Seamless whole-card tap delegation for mobile/tablet ergonomics
  const serviceCards = document.querySelectorAll('.glow-card[data-category]');
  serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-action-link')) return;
      const actionLink = card.querySelector('.card-action-link');
      if (actionLink) {
        actionLink.click();
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending Request...';

      setTimeout(() => {
        submitBtn.innerHTML = '✓ Inquiry Sent Successfully!';
        submitBtn.style.background = 'linear-gradient(135deg, #059669, #10B981)';

        setTimeout(() => {
          modal.classList.remove('active');
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
        }, 1400);
      }, 700);
    });
  }
}

/**
 * 8. Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
