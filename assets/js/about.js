/**
 * RADENZA - About Page Interactive Engine
 * Stakeholder Tabs, FAQ Accordion, Animated Metric Counters
 */

document.addEventListener('DOMContentLoaded', () => {
  initStakeholderTabs();
  initAboutAccordion();
  initMetricCounters();
});

/**
 * Stakeholder Value Matrix Tabs
 */
function initStakeholderTabs() {
  const tabBtns = document.querySelectorAll('.stakeholder-tab-btn');
  const panels = document.querySelectorAll('.stakeholder-panel');

  if (!tabBtns.length || !panels.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-target');

      // Update button states
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panel visibility
      panels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', 'true');
        }
      });
    });
  });
}

/**
 * About FAQ Accordion
 */
function initAboutAccordion() {
  const accordionHeaders = document.querySelectorAll('.about-accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parentItem = header.closest('.about-accordion-item');
      const isOpen = parentItem.classList.contains('active');

      // Close all other accordions for clean single disclosure
      document.querySelectorAll('.about-accordion-item').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('active');
          const h = item.querySelector('.about-accordion-header');
          if (h) h.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current accordion
      if (isOpen) {
        parentItem.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
      } else {
        parentItem.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Animated Metric Counters
 */
function initMetricCounters() {
  const counterEls = document.querySelectorAll('.metric-counter-anim');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseFloat(el.getAttribute('data-target') || '0');
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = (targetValue * easeOut).toFixed(decimals);

          el.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${targetValue.toFixed(decimals)}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterEls.forEach(el => observer.observe(el));
}
