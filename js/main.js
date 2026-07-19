(function () {
  'use strict';

  var scene = document.getElementById('scene');
  var triggers = document.querySelectorAll('[data-target]');
  var closeButtons = document.querySelectorAll('[data-close]');
  var panels = {};

  document.querySelectorAll('.panel').forEach(function (panel) {
    panels[panel.dataset.panel] = panel;
  });

  var activePanel = null;
  var activeTrigger = null;
  var isAnimating = false;

  function setOriginVars(el, panel) {
    var rect = el.getBoundingClientRect();
    var vw = window.innerWidth;
    var vh = window.innerHeight;

    var scaleX = rect.width / vw;
    var scaleY = rect.height / vh;
    var translateX = rect.left + rect.width / 2 - vw / 2;
    var translateY = rect.top + rect.height / 2 - vh / 2;

    panel.style.setProperty('--sx', Math.max(scaleX, 0.001));
    panel.style.setProperty('--sy', Math.max(scaleY, 0.001));
    panel.style.setProperty('--tx', translateX + 'px');
    panel.style.setProperty('--ty', translateY + 'px');
  }

  function openPanel(name, trigger) {
    var panel = panels[name];
    if (!panel || isAnimating) return;

    isAnimating = true;
    activePanel = panel;
    activeTrigger = trigger;

    setOriginVars(trigger, panel);
    panel.classList.add('active');

    // Force layout so the browser registers the start transform
    // before we animate to the open state.
    // eslint-disable-next-line no-unused-expressions
    panel.offsetHeight;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        panel.classList.add('open');
        scene.classList.add('receding');
      });
    });

    var onEnd = function (e) {
      if (e.target !== panel) return;
      panel.removeEventListener('transitionend', onEnd);
      isAnimating = false;
      var closeBtn = panel.querySelector('.panel-close');
      if (closeBtn) closeBtn.focus();
    };
    panel.addEventListener('transitionend', onEnd);

    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    if (!activePanel || isAnimating) return;

    isAnimating = true;
    var panel = activePanel;
    var trigger = activeTrigger;

    panel.classList.remove('open');
    scene.classList.remove('receding');

    var onEnd = function (e) {
      if (e.target !== panel) return;
      panel.removeEventListener('transitionend', onEnd);
      panel.classList.remove('active');
      panel.style.removeProperty('--sx');
      panel.style.removeProperty('--sy');
      panel.style.removeProperty('--tx');
      panel.style.removeProperty('--ty');
      isAnimating = false;
      if (trigger) trigger.focus();
    };
    panel.addEventListener('transitionend', onEnd);

    activePanel = null;
    activeTrigger = null;
  }

  triggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openPanel(trigger.dataset.target, trigger);
    });
  });

  closeButtons.forEach(function (btn) {
    btn.addEventListener('click', closePanel);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && activePanel) {
      closePanel();
    }
  });
})();
