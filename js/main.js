/* =====================================================
   Dad's Corner - JavaScript
   ===================================================== */

(function () {
  'use strict';

  /* ---- Mobile Nav Toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open', !expanded);
    });

    // Close nav when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });
  }

  /* ---- Active nav link ---- */
  (function setActiveLink() {
    const links = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }());

  /* ---- Contact Form ---- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('.form-submit');
      const success = document.getElementById('form-success');
      const originalText = btn.textContent;

      // Client-side validation: highlight empty required fields
      let valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = '#e53e3e';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Validate email format
      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value.trim())) {
          emailField.style.borderColor = '#e53e3e';
          return;
        }
      }

      btn.textContent = 'Sending…';
      btn.disabled = true;

      function showSuccess() {
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
        if (success) {
          success.style.display = 'block';
          setTimeout(function () { success.style.display = 'none'; }, 6000);
        }
      }

      function showError(msg) {
        btn.textContent = originalText;
        btn.disabled = false;
        var err = document.getElementById('form-error');
        if (!err) {
          err = document.createElement('p');
          err.id = 'form-error';
          err.setAttribute('role', 'alert');
          err.style.cssText = 'color:#e53e3e;margin-top:.75rem;font-size:.9rem;';
          form.appendChild(err);
        }
        err.textContent = msg || 'Something went wrong. Please try again.';
      }

      // Use Netlify Forms AJAX submission when the form has data-netlify attribute.
      // Falls back to a simulated success on plain static hosts (e.g. GitHub Pages).
      if (form.getAttribute('data-netlify') === 'true') {
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString()
        })
          .then(function (res) {
            if (res.ok) {
              showSuccess();
            } else {
              showError('Submission failed (status ' + res.status + '). Please try again.');
            }
          })
          .catch(function () {
            showError('Could not reach the server. Please check your connection and try again.');
          });
      } else {
        // Static host fallback – show success after a brief delay
        setTimeout(showSuccess, 800);
      }
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Fade-in on scroll ---- */
  if ('IntersectionObserver' in window) {
    const style = document.createElement('style');
    style.textContent = '.fade-in{opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease}.fade-in.visible{opacity:1;transform:none}';
    document.head.appendChild(style);

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.card, .post-card').forEach(function (el) {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }
}());
