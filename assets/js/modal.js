/**
 * RADENZA - Universal Modal Dialog System
 */

document.addEventListener('DOMContentLoaded', () => {
  initModals();
});

function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
  const modalOverlays = document.querySelectorAll('.modal-overlay');

  let activeModal = null;
  let previousActiveElement = null;

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    previousActiveElement = document.activeElement;
    activeModal = modal;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus close button or first input
    const closeBtn = modal.querySelector('.modal-close-btn');
    const firstInput = modal.querySelector('input, select, textarea, button');
    if (closeBtn) {
      closeBtn.focus();
    } else if (firstInput) {
      firstInput.focus();
    }
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    activeModal = null;
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  }

  // Bind trigger buttons
  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-modal-target');
      openModal(targetId);
    });
  });

  // Bind close buttons
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  // Close when clicking outside dialog content
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // ESC key handler for active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      closeModal(activeModal);
    }
  });

  // Modal Form Submission Handlers
  const modalForms = document.querySelectorAll('.modal-form');
  modalForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = form.closest('.modal-overlay');
      
      // Display inline success message or modal switch
      const formBody = form.querySelector('.modal-form-body') || form;
      formBody.innerHTML = `
        <div class="text-center" style="padding: 2rem 1rem;">
          <div style="width: 56px; height: 56px; border-radius: 50%; background-color: var(--brand-teal-subtle); color: var(--brand-teal); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 style="margin-bottom: 0.5rem; color: var(--text-main);">Request Received</h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem;">
            Thank you. Your demonstration request has been recorded locally. In a live deployment, our certified technical team will contact you to confirm property specifications.
          </p>
          <button class="btn btn-primary modal-close-trigger" style="width: 100%;">Done</button>
        </div>
      `;

      const doneBtn = formBody.querySelector('.modal-close-trigger');
      if (doneBtn) {
        doneBtn.addEventListener('click', () => closeModal(modal));
      }
    });
  });
}
