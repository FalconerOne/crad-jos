/**
 * CRAD-JOS — Diagnostic Services
 * Main Application Logic & Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initServiceFilter();
  initScrollTop();
  initHeaderScroll();
  initMobileNav();
  initModal();
  initSmoothScroll();
});

/**
 * 1. Floating Particles Generator for Hero
 * Recreates the purple/violet particle cosmos from original specs
 */
function initParticles() {
  const container = document.getElementById('particle-container');
  if (!container) return;

  const count = 24;
  const colors = [
    'rgba(168, 85, 247, 0.55)',
    'rgba(139, 92, 246, 0.50)',
    'rgba(233, 213, 255, 0.40)'
  ];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'lp-particle';

    const left = (i * 4.1 + 2) % 96;
    const top = (i * 6.2 + 8) % 88;
    const delay = (i * 0.28).toFixed(2);
    const duration = 3 + (i % 5);
    const size = i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 2;
    const color = colors[i % 3];

    p.style.left = `${left}%`;
    p.style.top = `${top}%`;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.backgroundColor = color;
    p.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    p.style.animation = `float-particle ${duration}s ease-in-out ${delay}s infinite`;

    container.appendChild(p);
  }
}

/**
 * 2. Service Category Filter
 * Filters between 'all', 'imaging', and 'lab'
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
          card.style.transform = 'scale(0.95)';
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
 * 3. Scroll to Top Floating Button
 */
function initScrollTop() {
  const scrollBtn = document.getElementById('scroll-top-btn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
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
 * 4. Header Shadow on Scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6)';
      header.style.borderBottomColor = 'rgba(168, 85, 247, 0.2)';
    } else {
      header.style.boxShadow = 'none';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.05)';
    }
  }, { passive: true });
}

/**
 * 5. Mobile Navigation
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const panel = document.getElementById('mobile-nav-panel');

  if (!toggleBtn || !panel) return;

  toggleBtn.addEventListener('click', () => {
    panel.classList.toggle('open');
  });

  // Close when clicking mobile links
  panel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      panel.classList.remove('open');
    });
  });
}

/**
 * 6. Quick Inquiry / Appointment Modal
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

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Form Submission
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
 * 7. Smooth Scroll for in-page anchors
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
