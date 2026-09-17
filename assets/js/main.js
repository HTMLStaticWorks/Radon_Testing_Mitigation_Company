/**
 * RADENZA - Main JavaScript Engine
 * Theme Switching, RTL Support, Scroll Animations, Global Particle Canvas
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initScrollAnimations();
  initParticleCanvas();
  initBackToTop();
  initPFESimulator();
  initTestimonialFilter();
  initRadonCalculator();
  initBenchmarkMatrix();
});

/* Theme Switcher (Light / Dark) */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('radenza_theme') || 'light';
  
  applyTheme(savedTheme);
  
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('radenza_theme', newTheme);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcons = document.querySelectorAll('.theme-icon');
  themeIcons.forEach(icon => {
    if (theme === 'dark') {
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    } else {
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  });
}

/* LTR / RTL Direction Switcher */
function initRTL() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('radenza_dir') || 'ltr';
  
  applyDir(savedDir);
  
  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      applyDir(newDir);
      localStorage.setItem('radenza_dir', newDir);
    });
  });
}

function applyDir(dir) {
  document.documentElement.setAttribute('dir', dir);
  const rtlLabels = document.querySelectorAll('.rtl-label');
  rtlLabels.forEach(label => {
    label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* Scroll Reveal Animations */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Trigger proportional cost bars animation if present
        if (entry.target.classList.contains('cost-factor-row')) {
          const fill = entry.target.querySelector('.cost-factor-bar-fill');
          if (fill && fill.dataset.width) {
            fill.style.width = fill.dataset.width;
          }
        }
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.reveal-on-scroll, .stage-card, .timeline-step-item, .pricing-card, .cost-factor-row');
  animateElements.forEach(el => observer.observe(el));
}

/* Subtle Airflow Canvas Particle System */
function initParticleCanvas() {
  const canvas = document.getElementById('airflowCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.parentElement.offsetWidth;
  let height = canvas.height = canvas.parentElement.offsetHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const particles = [];
  const particleCount = 28;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.8 + 0.3);
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -10) this.reset();
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(57, 122, 120, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* Back To Top Scroll Handler */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Interactive PFE Sub-Slab Vacuum Simulator */
function initPFESimulator() {
  const modeBtns = document.querySelectorAll('.pfe-mode-btn');
  if (!modeBtns.length) return;

  const vacuumVal = document.getElementById('pfeVacuumVal');
  const airflowVal = document.getElementById('pfeAirflowVal');
  const reductionVal = document.getElementById('pfeReductionVal');
  const statusBadge = document.getElementById('pfeStatusBadge');

  const aura = document.getElementById('pfeVacuumAura');
  const flowLines = document.getElementById('pfeFlowLines');

  const probeAVal = document.getElementById('probeAVal');
  const pitVal = document.getElementById('pitVal');
  const probeBVal = document.getElementById('probeBVal');

  const modes = {
    passive: {
      vacuum: '0.000',
      airflow: '0',
      reduction: '0%',
      probeA: '0.000 in. W.C.',
      pit: '0.000 in. W.C.',
      probeB: '0.000 in. W.C.',
      badgeText: 'PASSTHROUGH INACTIVE',
      badgeBg: 'rgba(220,53,69,0.2)',
      badgeColor: '#ff6b6b',
      auraRadius: '0',
      auraOpacity: '0',
      flowOpacity: '0',
      activeFlow: false
    },
    single: {
      vacuum: '-0.085',
      airflow: '125',
      reduction: '92.4%',
      probeA: '-0.012 in. W.C.',
      pit: '-0.085 in. W.C.',
      probeB: '-0.009 in. W.C.',
      badgeText: 'ACTIVE SUB-SLAB VACUUM',
      badgeBg: 'rgba(57,122,120,0.3)',
      badgeColor: 'var(--brand-teal)',
      auraRadius: '70',
      auraOpacity: '0.7',
      flowOpacity: '1',
      activeFlow: true
    },
    dual: {
      vacuum: '-0.185',
      airflow: '240',
      reduction: '99.1%',
      probeA: '-0.038 in. W.C.',
      pit: '-0.185 in. W.C.',
      probeB: '-0.041 in. W.C.',
      badgeText: 'HIGH-PERFORMANCE DUAL FIELD',
      badgeBg: 'rgba(230,161,0,0.2)',
      badgeColor: 'var(--brand-amber)',
      auraRadius: '130',
      auraOpacity: '1',
      flowOpacity: '1',
      activeFlow: true
    }
  };

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const modeKey = btn.dataset.mode;
      const data = modes[modeKey];
      if (!data) return;

      if (vacuumVal) vacuumVal.textContent = data.vacuum;
      if (airflowVal) airflowVal.textContent = data.airflow;
      if (reductionVal) reductionVal.textContent = data.reduction;

      if (probeAVal) probeAVal.textContent = data.probeA;
      if (pitVal) pitVal.textContent = data.pit;
      if (probeBVal) probeBVal.textContent = data.probeB;

      if (statusBadge) {
        statusBadge.textContent = data.badgeText;
        statusBadge.style.background = data.badgeBg;
        statusBadge.style.color = data.badgeColor;
      }

      if (aura) {
        aura.setAttribute('r', data.auraRadius);
        aura.style.opacity = data.auraOpacity;
      }

      if (flowLines) {
        flowLines.style.opacity = data.flowOpacity;
        if (data.activeFlow) {
          flowLines.classList.add('pfe-flow-active');
        } else {
          flowLines.classList.remove('pfe-flow-active');
        }
      }
    });
  });
}

/* Testimonials Category Filter */
function initTestimonialFilter() {
  const filterBtns = document.querySelectorAll('.testimonial-tab-btn');
  const cards = document.querySelectorAll('.testimonial-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* Home 2: Radon Mitigation Sizing & Energy Calculator */
function initRadonCalculator() {
  const slider = document.getElementById('calcSqFtSlider');
  const typeBtns = document.querySelectorAll('.calc-type-btn');
  if (!slider || !typeBtns.length) return;

  const sqFtVal = document.getElementById('calcSqFtVal');
  const pitsVal = document.getElementById('calcPitsVal');
  const cfmVal = document.getElementById('calcCfmVal');
  const fanVal = document.getElementById('calcFanVal');
  const costVal = document.getElementById('calcCostVal');

  let currentType = 'basement';

  function updateCalc() {
    const sqft = parseInt(slider.value, 10);
    if (sqFtVal) sqFtVal.textContent = sqft.toLocaleString() + ' Sq Ft';

    let pits = 1;
    let cfm = Math.round(sqft * 0.055);
    let fan = 'Radenza Silent-EC 200';
    let baseCost = (sqft * 0.0014).toFixed(2);

    if (currentType === 'crawlspace') {
      cfm = Math.round(sqft * 0.07);
      fan = 'Radenza High-Flow Vent-300';
      baseCost = (sqft * 0.0018).toFixed(2);
      pits = Math.max(1, Math.ceil(sqft / 3000));
    } else if (currentType === 'slab') {
      cfm = Math.round(sqft * 0.045);
      fan = 'Radenza Silent-EC 150';
      baseCost = (sqft * 0.0012).toFixed(2);
      pits = Math.max(1, Math.ceil(sqft / 4500));
    } else if (currentType === 'commercial') {
      pits = Math.max(2, Math.ceil(sqft / 3000));
      cfm = Math.round(sqft * 0.08);
      fan = 'Radenza Commercial Dual-Pit Pro 500';
      baseCost = (sqft * 0.0022).toFixed(2);
    } else {
      pits = Math.max(1, Math.ceil(sqft / 4000));
    }

    if (pitsVal) pitsVal.textContent = pits + (pits > 1 ? ' Pits' : ' Pit');
    if (cfmVal) cfmVal.textContent = cfm + ' CFM';
    if (fanVal) fanVal.textContent = fan;
    if (costVal) costVal.textContent = '$' + baseCost + ' / mo';
  }

  slider.addEventListener('input', updateCalc);
  slider.addEventListener('change', updateCalc);

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.dataset.type;
      updateCalc();
    });
  });

  updateCalc();
}

/* Home 2: Public Health Benchmark Matrix */
function initBenchmarkMatrix() {
  const pills = document.querySelectorAll('.benchmark-pill');
  if (!pills.length) return;

  const badge = document.getElementById('bmCategoryBadge');
  const title = document.getElementById('bmTitle');
  const desc = document.getElementById('bmDesc');
  const actionText = document.getElementById('bmActionText');
  const protocolText = document.getElementById('bmProtocolText');
  const exposureText = document.getElementById('bmExposureText');
  const checklist = document.getElementById('bmChecklist');

  const dataMap = {
    outdoor: {
      badge: 'OUTDOOR AMBIENT AIR',
      badgeBg: 'rgba(43,138,62,0.15)',
      badgeColor: '#2b8a3e',
      title: 'Typical Outdoor Environment (0.4 pCi/L)',
      desc: 'Natural open-air dilution maintains outdoor radon at minimal background concentrations across most geographical regions.',
      action: 'No action required.',
      protocol: 'Baseline Ambient Measurement',
      exposure: 'Negligible Exposure (0.4 pCi/L)',
      exposureColor: '#2b8a3e',
      items: [
        '<span style="color: #2b8a3e; font-weight: bold;">✓</span> Routine screening every 2 years',
        '<span style="color: #2b8a3e; font-weight: bold;">✓</span> Standard structural ventilation adequate'
      ]
    },
    who: {
      badge: 'WHO RECOMMENDED TARGET',
      badgeBg: 'rgba(57,122,120,0.15)',
      badgeColor: 'var(--brand-teal)',
      title: 'World Health Organization Benchmark (2.7 pCi/L)',
      desc: 'WHO recommends national reference levels of 2.7 pCi/L (100 Bq/m³) to minimize long-term health risks for residential occupants.',
      action: 'Consider mitigation if easily achievable.',
      protocol: 'Continuous CRM Verification',
      exposure: 'Low Reference Exposure (2.7 pCi/L)',
      exposureColor: 'var(--brand-teal)',
      items: [
        '<span style="color: var(--brand-teal); font-weight: bold;">✓</span> WHO reference target achieved',
        '<span style="color: var(--brand-teal); font-weight: bold;">✓</span> Optional CRM continuous monitor verification'
      ]
    },
    epa: {
      badge: 'EPA ACTION LEVEL THRESHOLD',
      badgeBg: 'rgba(230,161,0,0.15)',
      badgeColor: 'var(--brand-amber)',
      title: 'EPA Action Level Target (4.0 pCi/L)',
      desc: 'The US EPA recommends active mitigation for any residential or commercial structure measuring at or above 4.0 pCi/L.',
      action: 'Active mitigation recommended.',
      protocol: 'Sub-Slab Active Depressurization (SSD)',
      exposure: 'Action Threshold (~200 Pack-Yr Risk)',
      exposureColor: 'var(--brand-amber)',
      items: [
        '<span style="color: var(--brand-amber); font-weight: bold;">⚠️</span> EPA active mitigation recommended',
        '<span style="color: var(--brand-amber); font-weight: bold;">✓</span> Active sub-slab depressurization system'
      ]
    },
    elevated: {
      badge: 'ELEVATED CONCENTRATION',
      badgeBg: 'rgba(217,72,15,0.15)',
      badgeColor: '#d9480f',
      title: 'Elevated Risk Level (10.0 pCi/L)',
      desc: 'Concentrations at 10 pCi/L carry significantly elevated health exposure. Timely active depressurization installation is strongly advised.',
      action: 'Prompt mitigation within 30 days.',
      protocol: 'Multi-Point Suction System & PFE Diagnostic',
      exposure: 'Elevated Priority Risk (10.0 pCi/L)',
      exposureColor: '#d9480f',
      items: [
        '<span style="color: #d9480f; font-weight: bold;">⚠️</span> Prompt installation within 30 days',
        '<span style="color: #d9480f; font-weight: bold;">✓</span> PFE diagnostic testing & sealed suction pits'
      ]
    },
    critical: {
      badge: 'CRITICAL PRIORITY LEVEL',
      badgeBg: 'rgba(201,42,42,0.15)',
      badgeColor: '#c92a2a',
      title: 'Critical High Risk Level (20.0+ pCi/L)',
      desc: 'Extreme soil gas passthrough requiring immediate engineering intervention, continuous diagnostic logging, and sealed high-capacity SSD installation.',
      action: 'Immediate mitigation & ventilation priority.',
      protocol: 'High-Performance Dual-Pit SSD Installation',
      exposure: 'Critical Risk Level (20.0+ pCi/L)',
      exposureColor: '#c92a2a',
      items: [
        '<span style="color: #c92a2a; font-weight: bold;">🚨</span> Immediate engineering intervention required',
        '<span style="color: #c92a2a; font-weight: bold;">✓</span> High-performance dual-pit SSD fan stack'
      ]
    }
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const level = pill.dataset.level;
      const data = dataMap[level];
      if (!data) return;

      if (badge) {
        badge.textContent = data.badge;
        badge.style.background = data.badgeBg;
        badge.style.color = data.badgeColor;
      }
      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.desc;
      if (actionText) actionText.textContent = data.action;
      if (protocolText) protocolText.textContent = data.protocol;

      if (exposureText) {
        exposureText.textContent = data.exposure;
        exposureText.style.color = data.exposureColor;
      }

      if (checklist && data.items) {
        checklist.innerHTML = data.items.map(item => `<li style="display: flex; gap: 0.5rem; align-items: center;">${item}</li>`).join('');
      }
    });
  });
}



