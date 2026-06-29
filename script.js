// Curry Chiropractic — interactions

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  links.classList.toggle('open');
  toggle.classList.toggle('open');
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
  })
);

// Sticky nav shadow on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Scroll reveal
const io = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Accessibility widget ----------
(function () {
  var root = document.documentElement;
  var TOGGLES = {
    contrast: 'a11y-contrast',
    links: 'a11y-links',
    readable: 'a11y-readable',
    motion: 'a11y-motion',
    cursor: 'a11y-cursor'
  };

  var state = {};
  try { state = JSON.parse(localStorage.getItem('a11y') || '{}'); } catch (e) { state = {}; }
  function save() { try { localStorage.setItem('a11y', JSON.stringify(state)); } catch (e) {} }

  function apply() {
    Object.keys(TOGGLES).forEach(function (k) { root.classList.toggle(TOGGLES[k], !!state[k]); });
    root.classList.remove('a11y-text-1', 'a11y-text-2', 'a11y-text-3');
    if (state.text) root.classList.add('a11y-text-' + state.text);
  }
  apply();

  // Options shown in the panel
  var OPTS = [
    { key: 'text',     ic: '🔠', label: 'Bigger Text', cycle: true },
    { key: 'contrast', ic: '◐',  label: 'High Contrast' },
    { key: 'links',    ic: '🔗', label: 'Highlight Links' },
    { key: 'readable', ic: '📖', label: 'Readable Font' },
    { key: 'motion',   ic: '⏸️', label: 'Pause Motion' },
    { key: 'cursor',   ic: '➚',  label: 'Big Cursor' }
  ];

  // Build button + panel
  var btn = document.createElement('button');
  btn.className = 'a11y-btn';
  btn.setAttribute('aria-label', 'Accessibility options');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'a11yPanel');
  btn.innerHTML = '♿'; // ♿

  var panel = document.createElement('div');
  panel.className = 'a11y-panel';
  panel.id = 'a11yPanel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Accessibility options');

  var html = '<button class="a11y-close" aria-label="Close accessibility menu">×</button>'
           + '<h2>♿ Accessibility</h2>'
           + '<p class="a11y-sub">Adjust the site to your needs. Settings are saved.</p>'
           + '<div class="a11y-grid">';
  OPTS.forEach(function (o) {
    html += '<button class="a11y-opt" type="button" data-key="' + o.key + '" aria-pressed="false">'
          + '<span class="ic" aria-hidden="true">' + o.ic + '</span><span class="lbl">' + o.label + '</span></button>';
  });
  html += '<button class="a11y-reset" type="button">Reset all</button></div>';
  panel.innerHTML = html;

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  function syncUI() {
    panel.querySelectorAll('.a11y-opt').forEach(function (el) {
      var k = el.getAttribute('data-key');
      var on = k === 'text' ? !!state.text : !!state[k];
      el.classList.toggle('active', on);
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      var lbl = el.querySelector('.lbl');
      if (k === 'text') lbl.textContent = state.text ? 'Bigger Text (' + state.text + '/3)' : 'Bigger Text';
    });
  }
  syncUI();

  function openPanel() { panel.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
  function closePanel() { panel.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }

  btn.addEventListener('click', function () {
    panel.classList.contains('open') ? closePanel() : openPanel();
  });
  panel.querySelector('.a11y-close').addEventListener('click', closePanel);

  panel.querySelectorAll('.a11y-opt').forEach(function (el) {
    el.addEventListener('click', function () {
      var k = el.getAttribute('data-key');
      if (k === 'text') {
        state.text = ((state.text || 0) + 1) % 4; // 0 -> 1 -> 2 -> 3 -> 0
      } else {
        state[k] = !state[k];
      }
      apply(); save(); syncUI();
    });
  });

  panel.querySelector('.a11y-reset').addEventListener('click', function () {
    state = {};
    root.className = root.className.replace(/\ba11y-[\w-]+/g, '').trim();
    save(); syncUI();
  });

  // Close on Escape or outside click
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(); });
  document.addEventListener('click', function (e) {
    if (panel.classList.contains('open') && !panel.contains(e.target) && e.target !== btn) closePanel();
  });
})();
