/**
 * RADENZA - Open Knowledge Hub & Live FAQ Filter System
 */

document.addEventListener('DOMContentLoaded', () => {
  initOpenFAQSearchAndFilter();
});

function initOpenFAQSearchAndFilter() {
  const searchInput = document.getElementById('faqSearchInput');
  const filterPills = document.querySelectorAll('.faq-filter-pill');
  const faqCards = document.querySelectorAll('.faq-open-card, .faq-featured-card');
  const faqCategorySections = document.querySelectorAll('.faq-category-section');

  if (!searchInput && filterPills.length === 0) return;

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      filterCards(query, getActiveCategory());
    });
  }

  // Category Pill Filter Handler
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const category = pill.getAttribute('data-category');
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
      filterCards(query, category);
    });
  });

  function getActiveCategory() {
    const activePill = document.querySelector('.faq-filter-pill.active');
    return activePill ? activePill.getAttribute('data-category') : 'all';
  }

  function filterCards(query, category) {
    faqCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || 'all';
      const cardText = card.textContent.toLowerCase();

      const matchesCategory = (category === 'all' || cardCategory === category);
      const matchesQuery = (query === '' || cardText.includes(query));

      if (matchesCategory && matchesQuery) {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });

    // Hide section headers if all cards in that section are hidden
    faqCategorySections.forEach(section => {
      const visibleCards = section.querySelectorAll('.faq-open-card[style*="display: flex"], .faq-open-card:not([style*="display: none"])');
      if (visibleCards.length === 0 && (query !== '' || category !== 'all')) {
        section.style.display = 'none';
      } else {
        section.style.display = 'block';
      }
    });
  }
}
