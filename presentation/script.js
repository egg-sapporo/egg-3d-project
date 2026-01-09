/**
 * 3D Printer Presentation - Main Script
 * Handles scroll animations, progress bar, and interactions
 */

// ========================================
// DOM Elements
// ========================================
const progressBar = document.getElementById('progressBar');
const animatedElements = document.querySelectorAll('.animate-on-scroll');

// ========================================
// Progress Bar
// ========================================
function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate scroll percentage
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    // Update progress bar width
    progressBar.style.width = `${scrollPercentage}%`;
}

// ========================================
// Scroll Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
animatedElements.forEach(element => {
    observer.observe(element);
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80; // Navigation height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Event Listeners
// ========================================
window.addEventListener('scroll', () => {
    // Throttle scroll events for better performance
    requestAnimationFrame(() => {
        updateProgressBar();
    });
});

// ========================================
// Initialize on DOM Load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initial progress bar update
    updateProgressBar();
    
    // Add entrance animation to hero
    const hero = document.querySelector('.hero-content');
    if (hero) {
        setTimeout(() => {
            hero.classList.add('is-visible');
        }, 100);
    }
    
    console.log('3D Printer Presentation initialized ✨');
});

// ========================================
// Performance Optimization
// ========================================
// Add will-change property to animated elements on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    document.body.style.willChange = 'scroll-position';
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.body.style.willChange = 'auto';
    }, 200);
}, { passive: true });
