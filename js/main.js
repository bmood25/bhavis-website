(function () {
  'use strict';

  /* Melting wavy hero title */
  var waveTargets = document.querySelectorAll('.wavy-text');

  waveTargets.forEach(function (el) {
    var text = el.textContent;
    el.setAttribute('aria-label', text);
    el.innerHTML = '';

    text.split('').forEach(function (char, i) {
      var span = document.createElement('span');
      span.className = 'letter' + (char === ' ' ? ' is-space' : '');
      span.style.setProperty('--i', i);
      span.setAttribute('aria-hidden', 'true');
      span.textContent = char === ' ' ? ' ' : char;
      el.appendChild(span);
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
})();
