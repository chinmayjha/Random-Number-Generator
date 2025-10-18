// Global fallback function for hamburger menu - defined first
function toggleMobileMenuFallback() {
  console.log('Global fallback function called');
  const hamburger = document.querySelector('#hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    const isActive = hamburger.classList.contains('active');
    
    if (isActive) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    } else {
      hamburger.classList.add('active');
      navMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    }
    
    console.log('Menu toggled via fallback:', isActive ? 'closed' : 'opened');
  }
}

// Make it globally available immediately
window.toggleMobileMenuFallback = toggleMobileMenuFallback;

// Modern Random Number Generator JavaScript
// Enhanced functionality with better UX and error handling

class RandomNumberGenerator {
  constructor() {
    this.initializeElements();
    this.attachEventListeners();
    this.initializeCopyright();
  }

  initializeElements() {
    this.maxNumberInput = document.getElementById('maxNumber');
    this.errorMessage = document.getElementById('errorMessage');
    this.generateButton = document.querySelector('.generate-btn');
    this.resultContainer = document.getElementById('resultContainer');
    this.resultNumber = document.getElementById('resultNumber');
    this.copyButton = document.getElementById('copyBtn');
    this.hamburger = document.getElementById('hamburger-menu');
    this.navMenu = document.querySelector('.nav-menu');
    
    // Check if critical elements exist
    if (!this.maxNumberInput || !this.generateButton) {
      console.error('Critical elements not found!');
    }
    
    console.log('Elements initialized:', {
      hamburger: !!this.hamburger,
      navMenu: !!this.navMenu,
      maxInput: !!this.maxNumberInput,
      generateBtn: !!this.generateButton
    });
  }

  attachEventListeners() {
    // Input validation with better error handling
    if (this.maxNumberInput) {
      this.maxNumberInput.addEventListener('input', (e) => this.validateInput(e));
      this.maxNumberInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.generateRandomNumber();
        }
      });
      
      // Mobile-specific events
      this.maxNumberInput.addEventListener('focus', () => {
        // Prevent zoom on mobile
        this.maxNumberInput.setAttribute('data-focused', 'true');
      });
      
      this.maxNumberInput.addEventListener('blur', () => {
        this.maxNumberInput.removeAttribute('data-focused');
      });
    }

    // Generate button with improved feedback
    if (this.generateButton) {
      this.generateButton.addEventListener('click', () => this.generateRandomNumber());
      
      // Add touch feedback for mobile
      this.generateButton.addEventListener('touchstart', () => {
        this.generateButton.style.transform = 'scale(0.98)';
      });
      
      this.generateButton.addEventListener('touchend', () => {
        setTimeout(() => {
          this.generateButton.style.transform = '';
        }, 150);
      });
    }

    // Copy functionality with better error handling
    if (this.copyButton) {
      this.copyButton.addEventListener('click', () => this.copyResult());
    }

    // Enhanced mobile menu toggle
    if (this.hamburger && this.navMenu) {
      console.log('Hamburger and nav menu found, adding enhanced listeners');
      
      // Primary click handler
      this.hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMobileMenu();
      });
      
      // Touch handlers for better mobile response
      this.hamburger.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.hamburger.style.transform = 'scale(0.9)';
      }, { passive: false });
      
      this.hamburger.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.hamburger.style.transform = '';
        this.toggleMobileMenu();
      }, { passive: false });
      
    } else {
      console.log('Hamburger or nav menu not found in class!');
    }

    // Enhanced nav link handling
    this.setupNavLinks();

    // Enhanced outside click detection
    this.setupOutsideClick();

    // Smooth scrolling for navigation links
    this.setupSmoothScrolling();
    
    // Keyboard accessibility
    this.setupKeyboardNavigation();
  }
  
  setupNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        if (this.navMenu && this.navMenu.classList.contains('active')) {
          this.closeMobileMenu();
        }
      });
      
      // Add touch feedback
      link.addEventListener('touchstart', () => {
        link.style.transform = 'scale(0.98)';
      });
      
      link.addEventListener('touchend', () => {
        setTimeout(() => {
          link.style.transform = '';
        }, 150);
      });
    });
  }
  
  setupOutsideClick() {
    document.addEventListener('click', (e) => {
      if (this.navMenu && this.navMenu.classList.contains('active') && 
          this.hamburger && !this.navMenu.contains(e.target) && 
          !this.hamburger.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }
  
  setupSmoothScrolling() {
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  setupKeyboardNavigation() {
    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navMenu && this.navMenu.classList.contains('active')) {
        this.closeMobileMenu();
      }
      
      // Enter key on hamburger
      if (e.key === 'Enter' && e.target === this.hamburger) {
        e.preventDefault();
        this.toggleMobileMenu();
      }
    });
    
    // Make hamburger focusable
    if (this.hamburger) {
      this.hamburger.setAttribute('tabindex', '0');
      this.hamburger.setAttribute('role', 'button');
      this.hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    }
  }

  validateInput(event) {
    const value = parseInt(event.target.value);
    const input = event.target;
    
    if (isNaN(value) || value < 1 || value > 999 || event.target.value === '') {
      input.classList.add('error');
      this.errorMessage.classList.add('show');
      return false;
    } else {
      input.classList.remove('error');
      this.errorMessage.classList.remove('show');
      return true;
    }
  }

  generateRandomNumber() {
    const maxValue = parseInt(this.maxNumberInput.value);
    
    // Validate input before generating
    if (!this.validateInput({ target: this.maxNumberInput })) {
      // Shake the input to draw attention
      this.maxNumberInput.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        this.maxNumberInput.style.animation = '';
      }, 500);
      return;
    }

    // Add loading state
    this.generateButton.classList.add('loading');
    this.generateButton.disabled = true;

    // Simulate brief loading for better UX
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * maxValue) + 1;
      
      // Update result
      this.resultNumber.textContent = randomNumber;
      this.resultContainer.classList.add('show');
      
      // Remove loading state
      this.generateButton.classList.remove('loading');
      this.generateButton.disabled = false;

      // Add success animation
      this.resultNumber.style.animation = 'none';
      setTimeout(() => {
        this.resultNumber.style.animation = 'numberAppear 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      }, 10);

    }, 300); // Brief delay for better perceived performance
  }

  async copyResult() {
    const result = this.resultNumber.textContent;
    
    try {
      await navigator.clipboard.writeText(result);
      
      // Visual feedback
      const originalText = this.copyButton.innerHTML;
      this.copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
      this.copyButton.classList.add('copied');
      
      setTimeout(() => {
        this.copyButton.innerHTML = originalText;
        this.copyButton.classList.remove('copied');
      }, 2000);
      
    } catch (err) {
      // Fallback for older browsers
      this.fallbackCopy(result);
    }
  }

  fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      
      // Visual feedback
      const originalText = this.copyButton.innerHTML;
      this.copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
      this.copyButton.classList.add('copied');
      
      setTimeout(() => {
        this.copyButton.innerHTML = originalText;
        this.copyButton.classList.remove('copied');
      }, 2000);
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
    
    document.body.removeChild(textArea);
  }

  toggleMobileMenu() {
    console.log('Class method: Hamburger clicked!');
    
    if (!this.hamburger || !this.navMenu) {
      console.log('Elements not found, falling back to global function');
      toggleMobileMenuFallback();
      return;
    }
    
    const isActive = this.hamburger.classList.contains('active');
    
    if (isActive) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
    
    console.log('Class method: Menu is now:', isActive ? 'closed' : 'open');
  }
  
  openMobileMenu() {
    if (!this.hamburger || !this.navMenu) return;
    
    this.hamburger.classList.add('active');
    this.navMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
    
    // Update aria attributes for accessibility
    this.hamburger.setAttribute('aria-expanded', 'true');
    this.navMenu.setAttribute('aria-hidden', 'false');
    
    // Focus management
    this.navMenu.querySelector('.nav-link')?.focus();
  }

  closeMobileMenu() {
    if (!this.hamburger || !this.navMenu) return;
    
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
    
    // Update aria attributes for accessibility
    this.hamburger.setAttribute('aria-expanded', 'false');
    this.navMenu.setAttribute('aria-hidden', 'true');
    
    console.log('Menu closed via class method');
  }

  handleOutsideClick(event) {
    // Don't close if clicking on the hamburger or nav menu
    if (!this.hamburger.contains(event.target) && !this.navMenu.contains(event.target)) {
      this.closeMobileMenu();
    }
  }

  initializeCopyright() {
    const copyright = document.getElementById("copyright");
    if (copyright) {
      copyright.textContent = `Copyright © ${new Date().getFullYear()}`;
    }
  }
}

// Add CSS for shake animation
const shakeCSS = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// Add the CSS to the document
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing...');
  
  // Initialize the main class
  const rngInstance = new RandomNumberGenerator();
  window.rngInstance = rngInstance;
  
  // Additional fallback event listener
  const hamburgerFallback = document.querySelector('.hamburger');
  const navMenuFallback = document.querySelector('.nav-menu');
  
  if (hamburgerFallback && navMenuFallback) {
    console.log('Adding additional fallback listeners');
    
    // Remove existing onclick to avoid conflicts
    hamburgerFallback.removeAttribute('onclick');
    
    hamburgerFallback.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Additional fallback clicked');
      toggleMobileMenuFallback();
    });
    
    hamburgerFallback.addEventListener('touchstart', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Touch fallback clicked');
      toggleMobileMenuFallback();
    }, { passive: false });
  }
});

// Legacy function support (if needed for compatibility)
window.generateRandomNumber = function() {
  if (window.rngInstance) {
    window.rngInstance.generateRandomNumber();
  }
};

window.copyResult = function() {
  if (window.rngInstance) {
    window.rngInstance.copyResult();
  }
};

window.toggleMobileMenu = function() {
  if (window.rngInstance) {
    window.rngInstance.toggleMobileMenu();
  } else {
    toggleMobileMenuFallback();
  }
};

// Developer Modal Functionality
class DeveloperModal {
  constructor() {
    this.initializeElements();
    this.attachEventListeners();
  }

  initializeElements() {
    this.developerBtn = document.getElementById('developerInfoBtn');
    this.developerModal = document.getElementById('developerModal');
    this.developerOverlay = document.getElementById('developerOverlay');
    this.closeBtn = document.getElementById('closeDeveloperBtn');
  }

  attachEventListeners() {
    if (this.developerBtn) {
      this.developerBtn.addEventListener('click', () => this.openModal());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.developerOverlay) {
      this.developerOverlay.addEventListener('click', () => this.closeModal());
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.developerModal && this.developerModal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  openModal() {
    if (this.developerModal && this.developerOverlay) {
      this.developerModal.style.display = 'block';
      this.developerOverlay.style.display = 'block';
      
      // Trigger reflow
      void this.developerModal.offsetWidth;
      
      this.developerModal.classList.add('active');
      this.developerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    if (this.developerModal && this.developerOverlay) {
      this.developerModal.classList.remove('active');
      this.developerOverlay.classList.remove('active');
      document.body.style.overflow = '';
      
      // Hide after transition
      setTimeout(() => {
        if (this.developerModal && !this.developerModal.classList.contains('active')) {
          this.developerModal.style.display = 'none';
          this.developerOverlay.style.display = 'none';
        }
      }, 400);
    }
  }
}

// Initialize developer modal
document.addEventListener('DOMContentLoaded', () => {
  const developerModal = new DeveloperModal();
  window.developerModal = developerModal;
});