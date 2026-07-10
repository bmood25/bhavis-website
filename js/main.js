(function () {
  'use strict';

  /* Theme toggle: respects saved preference, then system preference */
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var themeIcon = themeToggle.querySelector('.theme-icon');
  var THEME_KEY = 'bhavi-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeIcon.innerHTML = theme === 'dark' ? '&#9789;' : '&#9788;';
  }

  var savedTheme = localStorage.getItem(THEME_KEY);
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  themeToggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* Mobile nav toggle */
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  /* Footer year */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
