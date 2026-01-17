// Modern JavaScript for Op De Kop Website
// Carousel Management
class ModernCarousel {
    constructor(selector) {
        this.carousel = document.querySelector(selector);
        if (!this.carousel) return;
        
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.currentSlide = 0;
        this.autoplayInterval = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        // Set up event listeners
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousSlide());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support
        this.setupTouchEvents();
        
        // Keyboard support
        this.setupKeyboardEvents();
        
        // Auto-play
        this.startAutoplay();
        
        // Pause autoplay on hover
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Update initial state
        this.updateCarousel();
        this.updateIndicators();
    }
    
    setupTouchEvents() {
        let startX = 0;
        let isDragging = false;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoplay();
        }, { passive: true });
        
        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        }, { passive: false });
        
        this.carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            const threshold = 50; // Minimum swipe distance
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
            
            this.startAutoplay();
        }, { passive: true });
    }
    
    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextSlide();
            }
        });
    }
    
    nextSlide() {
        if (this.isAnimating) return;
        this.currentSlide = (this.currentSlide + 1) % this.items.length;
        this.updateCarousel();
    }
    
    previousSlide() {
        if (this.isAnimating) return;
        this.currentSlide = (this.currentSlide - 1 + this.items.length) % this.items.length;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        this.isAnimating = true;
        const translateX = -this.currentSlide * 100;
        this.carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        this.updateIndicators();
        
        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, 700);
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoplay() {
        this.pauseAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Mobile Menu Management
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('mobile-menu-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.body = document.body;
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.menuToggle || !this.mobileMenu) return;
        
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.menuToggle.contains(e.target) && !this.mobileMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
        
        // Close menu on link click
        this.mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }
    
    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }
    
    openMenu() {
        this.isOpen = true;
        this.mobileMenu.classList.remove('hidden');
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.body.style.overflow = 'hidden';
        
        // Animate menu appearance
        setTimeout(() => {
            this.mobileMenu.style.opacity = '1';
            this.mobileMenu.style.transform = 'translateY(0)';
        }, 10);
    }
    
    closeMenu() {
        this.isOpen = false;
        this.mobileMenu.style.opacity = '0';
        this.mobileMenu.style.transform = 'translateY(-10px)';
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.body.style.overflow = '';
        
        setTimeout(() => {
            this.mobileMenu.classList.add('hidden');
        }, 300);
    }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate in
    document.querySelectorAll('.feature-card, .card, .content-list').forEach(el => {
        observer.observe(el);
    });
}

// Map Initialization (existing functionality)
function initMap() {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;
    
    const zoomLevel = 14;
    const mapConfig = {
        minZoom: 10,
        maxZoom: 16,
    };

    const center = {
        lat: 52.095805,
        lon: 5.1093,
    };

    const pijlstaart = {
        lat: 52.095805,
        lon: 5.1093,
        options: {
            title: "Amsterdamsestraatweg 3",
        },
    };

    const map = L.map("map", mapConfig).setView(
        [center.lat, center.lon],
        zoomLevel
    );
    
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const placeMarker = location => {
        L.marker([location.lat, location.lon], location.options)
            .addTo(map)
            .bindPopup(location.options.title)
            .on("click", event => {
                map.setView(event.target.getLatLng(), zoomLevel);
            });
    };

    placeMarker(pijlstaart);
}

// Enhanced Form Interactions
function initFormEnhancements() {
    // Add floating labels and better validation
    document.querySelectorAll('input, textarea, select').forEach(input => {
        // Enhanced focus states
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('field-focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('field-focused');
        });
        
        // Real-time validation feedback
        input.addEventListener('input', () => {
            if (input.validity.valid) {
                input.classList.remove('invalid');
                input.classList.add('valid');
            } else {
                input.classList.remove('valid');
                input.classList.add('invalid');
            }
        });
    });
}

// Performance Monitoring
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'font';
    preloadLink.type = 'font/woff2';
    preloadLink.crossOrigin = 'anonymous';
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    new ModernCarousel('#carousel-items');
    new MobileMenu();
    
    // Initialize features
    initSmoothScroll();
    initScrollAnimations();
    initFormEnhancements();
    initPerformanceOptimizations();
    
    // Initialize map if element exists
    setTimeout(initMap, 100);
});

// Handle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Trigger any resize-dependent updates
        window.dispatchEvent(new CustomEvent('optimizedResize'));
    }, 250);
});

// Export for potential external use
window.OpDeKop = {
    ModernCarousel,
    MobileMenu,
    initMap,
    initSmoothScroll,
    initScrollAnimations
};
