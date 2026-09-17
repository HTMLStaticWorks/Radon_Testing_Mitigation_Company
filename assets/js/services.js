/**
 * RADENZA - Interactive Building Cross-Section & Hotspot Explainer
 */

document.addEventListener('DOMContentLoaded', () => {
  initBuildingHotspots();
  initServiceTabs();
});

function initBuildingHotspots() {
  const hotspotBtns = document.querySelectorAll('.hotspot-button');
  const tooltipBox = document.getElementById('hotspotTooltipBox');

  if (!hotspotBtns.length || !tooltipBox) return;

  const tooltipTitle = tooltipBox.querySelector('.hotspot-tooltip-title');
  const tooltipDesc = tooltipBox.querySelector('.hotspot-tooltip-desc');

  hotspotBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');

      // Deactivate all other buttons
      hotspotBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tooltipTitle.textContent = title;
      tooltipDesc.textContent = desc;

      // Position tooltip near the button
      const rect = btn.getBoundingClientRect();
      const containerRect = btn.closest('.building-interactive-container').getBoundingClientRect();

      let leftPos = rect.left - containerRect.left + 35;
      let topPos = rect.top - containerRect.top - 20;

      // Ensure tooltip doesn't overflow right
      if (leftPos + 260 > containerRect.width) {
        leftPos = rect.left - containerRect.left - 270;
      }

      tooltipBox.style.left = `${leftPos}px`;
      tooltipBox.style.top = `${topPos}px`;
      tooltipBox.classList.add('active');
    });
  });

  // Close tooltip when clicking outside
  document.addEventListener('click', () => {
    hotspotBtns.forEach(b => b.classList.remove('active'));
    tooltipBox.classList.remove('active');
  });
}

function initServiceTabs() {
  const tabBtns = document.querySelectorAll('.service-tab-btn');
  const tabContents = document.querySelectorAll('.service-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-service-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}
