// Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-animation';
    loadingScreen.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loadingScreen);

    // Hide loading screen after 1.5 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});

// Particle System
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    animate() {
        this.particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                particle.style.top = '-10px';
                particle.style.left = Math.random() * 100 + '%';
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particles
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
    new ParticleSystem(particlesContainer);
}

// Smooth Scrolling for Navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation scroll effect
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Animated Counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = Date.now();
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (target - start) * easeOutQuart);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    updateCounter();
}

// Product Filtering System
class ProductFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.productCards = document.querySelectorAll('.product-card');
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });
    }

    handleFilterClick(button) {
        // Remove active class from all buttons
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter products
        this.filterProducts(filterValue);
    }

    filterProducts(filterValue) {
        this.productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.style.display = 'block';
                card.classList.remove('hidden');
                // Add animation
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.5s ease';
                }, 100);
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });
    }
}

// Initialize product filter
document.addEventListener('DOMContentLoaded', () => {
    new ProductFilter();
});

// Accordion Functionality
class AccordionManager {
    constructor() {
        this.accordionItems = document.querySelectorAll('.accordion-item');
        this.init();
    }

    init() {
        this.accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => {
                this.toggleAccordion(item);
            });
        });
    }

    toggleAccordion(item) {
        const isActive = item.classList.contains('active');
        
        // Close all accordion items
        this.accordionItems.forEach(accordionItem => {
            accordionItem.classList.remove('active');
        });
        
        // If the clicked item wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Initialize accordion
document.addEventListener('DOMContentLoaded', () => {
    new AccordionManager();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate stats when visible
            if (entry.target.classList.contains('hero-stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    animateCounter(stat, target);
                });
            }
            
            // Stagger animation for cards
            if (entry.target.classList.contains('products-grid') || 
                entry.target.classList.contains('industries-grid') || 
                entry.target.classList.contains('features-grid')) {
                const cards = entry.target.children;
                Array.from(cards).forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.hero-stats, .products-grid, .industries-grid, .features-grid, .about-content, .section-header').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Parallax Effect
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

window.addEventListener('scroll', parallaxEffect);

// Interactive Product Cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// Product Modal Functionality
const modal = document.getElementById('product-modal');
const modalCloseBtn = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-product-title');
const modalDescription = document.getElementById('modal-product-description');
const modalFeatures = document.getElementById('modal-product-features');
const modalImage = document.getElementById('modal-product-image');

document.querySelectorAll('.product-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        // Get product details
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        const features = card.querySelectorAll('.feature-tag');
        const imageSrc = card.querySelector('.product-image img').src;

        // Set modal content
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = imageSrc;
        modalImage.alt = title;

        // Clear previous features
        modalFeatures.innerHTML = '';
        features.forEach(feature => {
            const span = document.createElement('span');
            span.className = 'feature-tag';
            span.textContent = feature.textContent;
            modalFeatures.appendChild(span);
        });

        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
});

// Close modal on close button click
modalCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal on clicking outside modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Magnetic Effect for Buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Glitch Effect for Logo
function glitchEffect() {
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.style.animation = 'glitch 0.3s ease-in-out';
        setTimeout(() => {
            logo.style.animation = '';
        }, 300);
    }
}

// Add glitch effect every 10 seconds
setInterval(glitchEffect, 10000);

// Add glitch animation to CSS
const glitchStyles = `
@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = glitchStyles;
document.head.appendChild(styleSheet);

// 3D Tilt Effect for Cards
function tiltEffect(element) {
    element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
}

// Apply tilt effect to feature cards
document.querySelectorAll('.feature-card, .industry-card').forEach(card => {
    tiltEffect(card);
});

// Floating Animation for Icons
function floatAnimation() {
    const icons = document.querySelectorAll('.product-icon, .industry-icon, .feature-icon');
    
    icons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });
}

// Initialize floating animation
floatAnimation();

// Cursor Trail Effect
class CursorTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });
        
        this.animate();
    }
    
    addTrailPoint(x, y) {
        const point = document.createElement('div');
        point.className = 'cursor-trail';
        point.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(point);
        this.trail.push(point);
        
        if (this.trail.length > this.maxTrailLength) {
            const oldPoint = this.trail.shift();
            oldPoint.remove();
        }
    }
    
    animate() {
        this.trail.forEach((point, index) => {
            const age = index / this.trail.length;
            point.style.opacity = age;
            point.style.transform = `translate(-50%, -50%) scale(${age})`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor trail
// new CursorTrail();

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ffd700, #4299e1);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Dynamic Background Colors
function dynamicBackground() {
    const sections = document.querySelectorAll('section');
    const colors = [
        'linear-gradient(135deg, #1a365d 0%, #2d5a8a 100%)',
        'linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%)',
        'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
        'linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%)',
        'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)'
    ];
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                document.body.style.background = colors[index] || colors[0];
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Initialize dynamic background
// dynamicBackground();

// Smooth reveal animations
function smoothReveal() {
    const elements = document.querySelectorAll('h1, h2, h3, p, .btn, .product-card, .industry-card, .feature-card');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Auto-play animations on load
window.addEventListener('load', () => {
    setTimeout(smoothReveal, 1500);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy(0, 100);
    } else if (e.key === 'ArrowUp') {
        window.scrollBy(0, -100);
    }
});

// Easter Egg - Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg effect
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Add rainbow animation
const rainbowStyles = `
@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    25% { filter: hue-rotate(90deg); }
    50% { filter: hue-rotate(180deg); }
    75% { filter: hue-rotate(270deg); }
    100% { filter: hue-rotate(360deg); }
}
`;

const rainbowStyleSheet = document.createElement('style');
rainbowStyleSheet.textContent = rainbowStyles;
document.head.appendChild(rainbowStyleSheet);

// Performance monitoring
function monitorPerformance() {
    const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'paint') {
                console.log(`${entry.name}: ${entry.startTime}ms`);
            }
        });
    });
    
    observer.observe({ entryTypes: ['paint'] });
}

// Initialize performance monitoring
monitorPerformance();

// Comparison Table Hover Effects
document.querySelectorAll('.comparison-row').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.zIndex = '10';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
    });
});

// Hexagon Stats Animation
document.querySelectorAll('.stat-hexagon').forEach(hexagon => {
    hexagon.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease-in-out';
    });
    
    hexagon.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// Timeline Dots Interactive Effect
document.querySelectorAll('.timeline-dot').forEach(dot => {
    dot.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(-50%) scale(1.5)';
        this.style.backgroundColor = '#ffd700';
    });
    
    dot.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(-50%) scale(1)';
        this.style.backgroundColor = '#4299e1';
    });
});

// Process Steps Animation
document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        const stepNumber = this.querySelector('.step-number');
        stepNumber.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffed4a 100%)';
    });
    
    step.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        const stepNumber = this.querySelector('.step-number');
        stepNumber.style.background = 'linear-gradient(135deg, #4299e1 0%, #63b3ed 100%)';
    });
});

// Cleanup function
window.addEventListener('beforeunload', () => {
    // Clean up any timers or listeners
    document.querySelectorAll('.particle').forEach(particle => {
        particle.remove();
    });
});

console.log('🚀 Gaurav Electromech - Enhanced website with unique sections loaded successfully!');