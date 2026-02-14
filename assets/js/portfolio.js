/**
 * Portfolio 2026 - Kumar Shaikat Bala
 * Nav, scroll, back-to-top, contact form (GitHub Pages compatible)
 */
(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  const contactForm = document.getElementById('contactForm');
  const yearEl = document.getElementById('year');

  // Current year in footer
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle + body scroll lock
  if (navToggle && navMenu) {
    var icon = navToggle.querySelector('i');
    function closeMenu() {
      navMenu.classList.remove('is-open');
      document.body.classList.remove('mobile-nav-open');
      if (icon) {
        icon.classList.add('bi-list');
        icon.classList.remove('bi-x');
      }
      navToggle.setAttribute('aria-expanded', 'false');
    }
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      document.body.classList.toggle('mobile-nav-open', isOpen);
      if (icon) {
        icon.classList.toggle('bi-list', !isOpen);
        icon.classList.toggle('bi-x', isOpen);
      }
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) closeMenu();
    });
    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 992px)').matches && navMenu.classList.contains('is-open')) closeMenu();
    });
  }

  // Active nav link on scroll
  function setActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;
    let current = 'hero';
    sections.forEach(function (section) {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) current = section.getAttribute('id');
    });
    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === '#' + current) link.classList.add('active');
      else link.classList.remove('active');
    });
  }
  window.addEventListener('scroll', setActiveNav);
  window.addEventListener('load', setActiveNav);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Back to top visibility
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
  }

  // Contact form – Formspree or mailto fallback (GitHub Pages compatible)
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      var action = this.getAttribute('action') || '';
      if (action.indexOf('YOUR_FORM_ID') !== -1) {
        e.preventDefault();
        var name = (document.getElementById('name') && document.getElementById('name').value) || '';
        var email = (document.getElementById('email') && document.getElementById('email').value) || '';
        var subject = (document.getElementById('subject') && document.getElementById('subject').value) || '';
        var message = (document.getElementById('message') && document.getElementById('message').value) || '';
        var mailto = 'mailto:kumarshaikatbala@gmail.com?subject=' + encodeURIComponent(subject || 'Portfolio contact from ' + name) + '&body=' + encodeURIComponent('From: ' + name + ' <' + email + '>\n\n' + message);
        window.location.href = mailto;
      }
    });
  }

  // AOS init
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 600, offset: 80, once: true });
  }
})();
