/**
 * RADENZA - Navigation & Mobile Drawer Manager
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  highlightActiveNavLink();
});

function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerOverlay = document.getElementById('mobileDrawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  if (!hamburgerBtn || !drawerOverlay) return;

  function openDrawer() {
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    if (drawerCloseBtn) drawerCloseBtn.focus();
  }

  function closeDrawer() {
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.focus();
  }

  hamburgerBtn.addEventListener('click', openDrawer);

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  // Close when clicking outside drawer
  drawerOverlay.addEventListener('click', (e) => {
    if (e.target === drawerOverlay) {
      closeDrawer();
    }
  });

  // Close when clicking any drawer nav link
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerOverlay.classList.contains('active')) {
      closeDrawer();
    }
  });
}

function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}
