/**
 * RADENZA - Multi-Step Booking Form Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initBookingWizard();
});

function initBookingWizard() {
  const wizardForm = document.getElementById('bookingWizardForm');
  if (!wizardForm) return;

  const stepNodes = document.querySelectorAll('.wizard-step-node');
  const stepPanels = document.querySelectorAll('.wizard-step-panel');
  const prevBtn = document.getElementById('wizardPrevBtn');
  const nextBtn = document.getElementById('wizardNextBtn');
  const submitBtn = document.getElementById('wizardSubmitBtn');

  let currentStep = 1;
  const totalSteps = stepPanels.length;

  function updateStepUI() {
    stepPanels.forEach((panel, idx) => {
      if (idx + 1 === currentStep) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    stepNodes.forEach((node, idx) => {
      const stepNum = idx + 1;
      if (stepNum === currentStep) {
        node.classList.add('active');
        node.classList.remove('completed');
      } else if (stepNum < currentStep) {
        node.classList.remove('active');
        node.classList.add('completed');
      } else {
        node.classList.remove('active', 'completed');
      }
    });

    // Toggle Action Buttons
    if (currentStep === 1) {
      prevBtn.style.visibility = 'hidden';
    } else {
      prevBtn.style.visibility = 'visible';
    }

    if (currentStep === totalSteps) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-flex';
    } else {
      nextBtn.style.display = 'inline-flex';
      submitBtn.style.display = 'none';
    }
  }

  function validateCurrentStep() {
    const activePanel = document.querySelector(`.wizard-step-panel[data-step="${currentStep}"]`);
    if (!activePanel) return true;

    const inputs = activePanel.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('form-error');
        showFieldError(input, 'This field is required');
      } else if (input.type === 'email' && !validateEmail(input.value)) {
        isValid = false;
        input.classList.add('form-error');
        showFieldError(input, 'Please enter a valid email address');
      } else if (input.type === 'tel' && !validatePhone(input.value)) {
        isValid = false;
        input.classList.add('form-error');
        showFieldError(input, 'Please enter a valid phone number');
      } else {
        input.classList.remove('form-error');
        removeFieldError(input);
      }
    });

    return isValid;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^[\d\s\-\+\(\)]{7,20}$/.test(phone);
  }

  function showFieldError(input, msg) {
    let errEl = input.nextElementSibling;
    if (!errEl || !errEl.classList.contains('error-msg')) {
      errEl = document.createElement('span');
      errEl.className = 'error-msg';
      errEl.style.color = '#E53935';
      errEl.style.fontSize = '0.75rem';
      errEl.style.marginTop = '0.25rem';
      errEl.style.display = 'block';
      input.parentNode.appendChild(errEl);
    }
    errEl.textContent = msg;
  }

  function removeFieldError(input) {
    const errEl = input.nextElementSibling;
    if (errEl && errEl.classList.contains('error-msg')) {
      errEl.remove();
    }
  }

  nextBtn.addEventListener('click', () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        currentStep++;
        updateStepUI();
      }
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateStepUI();
    }
  });

  wizardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      // Trigger Success Modal Overlay
      const successModal = document.getElementById('bookingSuccessModal');
      if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });
}
