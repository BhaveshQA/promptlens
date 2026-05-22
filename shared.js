(function () {
  'use strict';

  const COOKIE_KEY = 'promptlens_cookie_consent';

  function getToast() {
    let el = document.getElementById('site-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'site-toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
      document.body.appendChild(el);
    }
    return el;
  }

  function showToast(message, duration) {
    const toast = getToast();
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(function () {
      toast.classList.remove('show');
    }, duration || 2800);
  }

  window.PromptLens = { showToast: showToast };

  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    window.matchMedia('(min-width: 769px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  function initCookieBanner() {
    if (localStorage.getItem(COOKIE_KEY)) return;

    const banner = document.createElement('div');
    banner.className = 'cookie-banner is-visible';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML =
      '<div class="cookie-inner">' +
      '<p>We use cookies for analytics and advertising (Google AdSense). See our <a href="privacy-policy.html">Privacy Policy</a>.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="cookie-btn" data-action="decline">Essential only</button>' +
      '<button type="button" class="cookie-btn cookie-btn--accept" data-action="accept">Accept all</button>' +
      '</div></div>';

    document.body.appendChild(banner);

    banner.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      localStorage.setItem(COOKIE_KEY, btn.dataset.action);
      banner.classList.remove('is-visible');
      banner.remove();
    });
  }

  function initNewsletterForms() {
    document.querySelectorAll('[data-newsletter]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        if (form.hasAttribute('data-static-form')) return;
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input || !input.value.trim() || !input.checkValidity()) {
          input && input.reportValidity();
          return;
        }
        showToast('Thanks! Your signup was received.');
        form.reset();
      });
    });
  }

  function initComingSoonLinks() {
    document.querySelectorAll('[data-coming-soon]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        showToast('This article is coming soon.');
      });
    });
  }

  function initCopyBlocks() {
    document.querySelectorAll('[data-copy-target]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = document.querySelector(btn.getAttribute('data-copy-target'));
        const label = btn.querySelector('.copy-label') || btn;
        const original = label.textContent;
        if (!target) return;

        copyText(target.textContent.trim())
          .then(function () {
            label.textContent = 'Copied!';
            btn.classList.add('copied');
            showToast('Prompt copied to clipboard');
            window.setTimeout(function () {
              label.textContent = original;
              btn.classList.remove('copied');
            }, 2000);
          })
          .catch(function () {
            showToast('Copy failed — please select and copy manually');
          });
      });
    });
  }

  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      if (form.hasAttribute('data-static-form')) return;
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.setAttribute('hidden', '');
      const success = document.getElementById('successMsg');
      if (success) {
        success.removeAttribute('hidden');
        success.classList.add('is-visible');
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    } finally {
      document.body.removeChild(ta);
    }
  }

  window.copyPrompt = function (id, btn) {
    const el = document.getElementById(id);
    if (!el || !btn) return;

    const text = el.textContent.trim();
    const label = btn.querySelector('.copy-label');
    const origLabel = label ? label.textContent : 'Copy';

    copyText(text)
      .then(function () {
        btn.classList.add('copied');
        if (label) label.textContent = 'Copied!';
        showToast('Prompt copied to clipboard');
        window.setTimeout(function () {
          btn.classList.remove('copied');
          if (label) label.textContent = origLabel;
        }, 2000);
      })
      .catch(function () {
        showToast('Copy failed — please select and copy manually');
      });
  };

  window.filterTag = function (tag) {
    const input = document.getElementById('searchInput');
    if (input) {
      input.value = tag;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  function initSearch() {
    const input = document.getElementById('searchInput');
    const empty = document.getElementById('searchEmpty');
    if (!input) return;

    input.addEventListener('input', function () {
      const query = input.value.toLowerCase().trim();
      let visible = 0;

      document.querySelectorAll('.prompt-card[data-tags]').forEach(function (card) {
        const text = card.textContent.toLowerCase();
        const tags = (card.dataset.tags || '').toLowerCase();
        const match = !query || text.includes(query) || tags.includes(query);
        card.classList.toggle('is-hidden', !match);
        if (match) visible++;
      });

      if (empty) {
        empty.classList.toggle('is-visible', query.length > 0 && visible === 0);
        empty.hidden = !(query.length > 0 && visible === 0);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initCookieBanner();
    initNewsletterForms();
    initComingSoonLinks();
    initCopyBlocks();
    initContactForm();
    initSearch();
  });
})();
