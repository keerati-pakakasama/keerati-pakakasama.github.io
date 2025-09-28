// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    initMobileNavigation();
    
    // Smooth Scrolling for Internal Links
    initSmoothScrolling();
    
    // Form Handling
    initFormHandling();
    
    // Intersection Observer for Animations
    initScrollAnimations();
    
    // Active Navigation Highlighting
    initActiveNavigation();
    
    // Button Interactions
    initButtonInteractions();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '☰';
    mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Add toggle button to navigation
    nav.appendChild(mobileToggle);
    
    // Toggle menu visibility
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('nav-menu-open');
        mobileToggle.innerHTML = navMenu.classList.contains('nav-menu-open') ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
            navMenu.classList.remove('nav-menu-open');
            mobileToggle.innerHTML = '☰';
        }
    });
    
    // Close menu when clicking on a link
    navMenu.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            navMenu.classList.remove('nav-menu-open');
            mobileToggle.innerHTML = '☰';
        }
    });
}

// Smooth Scrolling for Internal Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const submitButton = this.querySelector('.newsletter-button');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate form submission
                submitButton.textContent = 'Subscribing...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    submitButton.textContent = 'Subscribed!';
                    submitButton.style.background = '#10b981';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitButton.textContent = 'Subscribe';
                        submitButton.style.background = '';
                        submitButton.disabled = false;
                    }, 2000);
                }, 1000);
            } else {
                showFormError(emailInput, 'Please enter a valid email address');
            }
        });
    }
}

// Email Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Form Error
function showFormError(input, message) {
    input.style.borderColor = '#ef4444';
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.5rem';
    
    input.parentNode.appendChild(errorElement);
    
    // Remove error styling after 3 seconds
    setTimeout(() => {
        input.style.borderColor = '';
        if (errorElement.parentNode) {
            errorElement.remove();
        }
    }, 3000);
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .insight-card, .about-text, .about-visual');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Active Navigation Highlighting
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Button Interactions
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.hero-button, .cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle specific button actions
            if (this.classList.contains('hero-button')) {
                // Scroll to data engineering section or about page
                const targetSection = document.querySelector('.data-engineering') || document.querySelector('.about-content');
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Navigate to about page if not on home page
                    window.location.href = 'about.html';
                }
            } else if (this.classList.contains('cta-button')) {
                // Simulate consultation scheduling
                this.textContent = 'Scheduling...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = 'Request Sent!';
                    this.style.background = 'rgba(16, 185, 129, 0.3)';
                    this.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                    
                    setTimeout(() => {
                        this.textContent = 'Schedule a Consultation';
                        this.style.background = '';
                        this.style.borderColor = '';
                        this.disabled = false;
                    }, 3000);
                }, 1000);
            }
        });
    });
}

// Utility Functions

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add scroll-based header styling
window.addEventListener('scroll', throttle(function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}, 100));

// Add CSS for mobile navigation and animations
const additionalStyles = `
    .mobile-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #1e293b;
    }
    
    .header-scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @media (max-width: 768px) {
        .mobile-toggle {
            display: block;
        }
        
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-menu li {
            margin: 0.5rem 0;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

