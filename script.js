// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const open = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ===== SCROLL TO TOP =====
const scrollBtn = document.getElementById('scrollTop');

if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  });

  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== CONTACT FORM =====
const form  = document.getElementById('contactForm');
const toast = document.getElementById('toast');

if (form) {
  // Required fields for custom validation
  const requiredFields = form.querySelectorAll('[required]');

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    form.querySelectorAll('.field-error').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

    requiredFields.forEach(field => {
      const value = field.value.trim();
      const empty = value === '';
      const invalidEmail = field.type === 'email' && value !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (empty || invalidEmail) {
        valid = false;
        field.classList.add('input-error');
        const msg = document.createElement('span');
        msg.className = 'field-error';
        msg.setAttribute('role', 'alert');
        msg.textContent = empty
          ? 'This field is required.'
          : 'Please enter a valid email address.';
        field.insertAdjacentElement('afterend', msg);
      }
    });

    if (!valid) return;

    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
    form.reset();
  });

  // Clear error styling on input
  requiredFields.forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('input-error');
      const err = field.nextElementSibling;
      if (err && err.classList.contains('field-error')) err.remove();
    });
  });
}
