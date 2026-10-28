(function () {
  'use strict';
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const navLinks = Array.from(document.querySelectorAll('.nav-link, .nav-cta'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function closeMenu() {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
      nav.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('menu-open', !isOpen);
    });
    navLinks.forEach(function (link) { link.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 880) closeMenu(); });
  }

  function updateHeader() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 12);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Reveal elements when they enter the viewport.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  // Keep the navigation state in sync with the section currently being viewed.
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const currentId = entry.target.id;
        document.querySelectorAll('.nav-link').forEach(function (link) {
          const active = link.getAttribute('href') === '#' + currentId;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-30% 0px -58% 0px', threshold: 0 });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  // Auto-update the copyright year.
  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  // Show a friendly status before the form is submitted to contact.php.
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        return;
      }
      const submit = form.querySelector('button[type="submit"]');
      const label = submit && submit.querySelector('.submit-label');
      if (submit && label) {
        submit.disabled = true;
        label.textContent = 'Enviando…';
      }
      if (feedback) {
        feedback.classList.remove('is-error');
        feedback.textContent = 'Enviando tu solicitud…';
      }
      // The actual delivery is handled server-side by contact.php.
    });
  }

  // If contact.php redirects back with a status query, make the result visible.
  const params = new URLSearchParams(window.location.search);
  if (feedback && params.get('contacto') === 'enviado') {
    feedback.classList.remove('is-error');
    feedback.textContent = '¡Gracias! Tu solicitud fue enviada. Nos pondremos en contacto contigo pronto.';
    document.getElementById('contacto')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  } else if (feedback && params.get('contacto') === 'error') {
    feedback.classList.add('is-error');
    feedback.textContent = 'No se pudo enviar el mensaje. Inténtalo de nuevo o comunícate directamente con la empresa.';
    document.getElementById('contacto')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  } else if (feedback && params.get('contacto') === 'config') {
    feedback.classList.add('is-error');
    feedback.textContent = 'El formulario necesita que se configure el correo de destino en contact.php antes de recibir mensajes.';
    document.getElementById('contacto')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }
})();
