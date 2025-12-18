// Modern Portfolio Interactions & Animations
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initScrollAnimations();
    initInteractiveElements();
    initThemeToggle();
    initParallaxEffect();
});

// Create Stars Field
function initStars() {
    const bg = document.querySelector('.animated-bg');
    const starCount = 80;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Randomly choose dot or rhombus
        const isRhombus = Math.random() > 0.6;
        if (isRhombus) {
            star.classList.add('star-rhombus');
        } else {
            star.classList.add('star-dot');
        }
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random opacity between 0.3 and 0.8
        star.style.opacity = Math.random() * 0.5 + 0.3;
        
        // Store initial top position for parallax
        star.dataset.initialTop = parseFloat(star.style.top);
        
        bg.appendChild(star);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation potential
    document.querySelectorAll('.skill-card, .project-card, .contact-link').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Navigation Links
    document.querySelectorAll('.nav-link, a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Update active nav
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });

    // Project Cards Hover Effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    let isDark = true;

    toggle.addEventListener('click', () => {
        isDark = !isDark;
        
        if (isDark) {
            // Dark theme
            document.documentElement.style.setProperty('--bg-darker', '#0f0f0f');
            document.documentElement.style.setProperty('--bg-dark', '#1a1a1a');
            document.documentElement.style.setProperty('--text-main', '#ffffff');
            document.documentElement.style.setProperty('--text-dim', '#999999');
            document.documentElement.style.setProperty('--text-dimmer', '#666666');
            document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.03)');
            document.documentElement.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.08)');
            document.body.classList.remove('light-theme');
            toggle.textContent = '◑';
        } else {
            // Light theme with red and black
            document.documentElement.style.setProperty('--bg-darker', '#ffffff');
            document.documentElement.style.setProperty('--bg-dark', '#f8f8f8');
            document.documentElement.style.setProperty('--text-main', '#1a1a1a');
            document.documentElement.style.setProperty('--text-dim', '#333333');
            document.documentElement.style.setProperty('--text-dimmer', '#666666');
            document.documentElement.style.setProperty('--glass-bg', 'rgba(220, 38, 38, 0.05)');
            document.documentElement.style.setProperty('--glass-border', 'rgba(220, 38, 38, 0.2)');
            document.body.classList.add('light-theme');
            toggle.textContent = '◐';
        }
    });
}

// Parallax Effect on Scroll
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Move stars with parallax
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            const initialTop = parseFloat(star.dataset.initialTop);
            const parallaxOffset = scrollTop * (0.2 + (index % 3) * 0.1);
            const newTop = initialTop + (parallaxOffset / window.innerHeight) * 5;
            star.style.transform = `translateY(${parallaxOffset * 0.3}px)`;
        });

        // Update active nav link
        updateActiveNav();
    });
}

// Update Active Navigation
function updateActiveNav() {
    const sections = document.querySelectorAll('main[id], section[id]');
    const scrollPos = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// Add CSS animation for active nav
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--glow-red);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Ensure CSS variable for header height is set so fixed header doesn't overlap content
function updateHeaderHeightVar() {
    const header = document.querySelector('header');
    if (!header) return;
    const h = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', h + 'px');
}

window.addEventListener('load', updateHeaderHeightVar);
window.addEventListener('resize', updateHeaderHeightVar);
// call once now in case DOMContentLoaded already fired
updateHeaderHeightVar();