const target = document.querySelector(this.getAttribute('href'));
if (target) {
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
    });
});

// ==========================================
// Intersection Observer for Scroll Animations
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all platform cards and step cards
document.addEventListener('DOMContentLoaded', () => {
    const platformCards = document.querySelectorAll('.platform-card');
    const stepCards = document.querySelectorAll('.step-card');

    platformCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    stepCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
});

// ==========================================
// Click Tracking for Platform CTAs
// ==========================================
const trackClick = (platform, url) => {
    // Log click event (can be extended to send to analytics)
    console.log(`User clicked on ${platform} - ${url}`);

    // You can add analytics tracking here
    // Example: gtag('event', 'platform_click', { platform: platform });
};

// Add click tracking to all platform CTAs
document.addEventListener('DOMContentLoaded', () => {
    const platformCTAs = document.querySelectorAll('.platform-cta');

    platformCTAs.forEach(cta => {
        cta.addEventListener('click', (e) => {
            const platformCard = cta.closest('.platform-card');
            const platform = platformCard.dataset.platform;
            const url = cta.href;
            trackClick(platform, url);
        });
    });
});

// ==========================================
// Dynamic Card Hover Effects
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const platformCards = document.querySelectorAll('.platform-card');

    platformCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ==========================================
// Parallax Effect for Hero Orbs
// ==========================================
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==========================================
// Performance Optimization: Lazy Loading
// ==========================================
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('.lazy');

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.remove('lazy');
                lazyObserver.unobserve(element);
            }
        });
    });

    lazyElements.forEach(element => lazyObserver.observe(element));
}

// ==========================================
// Add Ripple Effect to Buttons
// ==========================================
const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');

    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }

    button.appendChild(ripple);
};

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cta-button, .platform-cta');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });
});

// Add ripple animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// Scroll Progress Indicator
// ==========================================
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        indicator.style.width = `${scrolled}%`;
    });
};

document.addEventListener('DOMContentLoaded', createScrollIndicator);

// ==========================================
// Console Message
// ==========================================
console.log('%cEasyBucks 💰', 'color: #8B5CF6; font-size: 24px; font-weight: bold;');
console.log('%cStart earning money online today!', 'color: #EC4899; font-size: 14px;');
