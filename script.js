// ==========================================
// Smooth Scrolling for Anchor Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
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

// ==========================================
// Earnings Calculator Logic
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const hoursInput = document.getElementById('hours-input');
    const daysInput = document.getElementById('days-input');
    const hoursValue = document.getElementById('hours-value');
    const daysValue = document.getElementById('days-value');
    const estimatedEarnings = document.getElementById('estimated-earnings');

    if (!hoursInput || !daysInput || !estimatedEarnings) return;

    const calculateEarnings = () => {
        const hours = parseFloat(hoursInput.value);
        const days = parseInt(daysInput.value);

        // Update display values
        hoursValue.textContent = `${hours} hour${hours !== 1 ? 's' : ''}`;
        daysValue.textContent = `${days} day${days !== 1 ? 's' : ''}`;

        // Calculation logic (estimated average hourly rate across platforms ~$5-15)
        const minHourlyRate = 4;
        const maxHourlyRate = 12;

        const weeklyHours = hours * days;
        const monthlyHours = weeklyHours * 4.33; // Average weeks in a month

        const minMonthly = Math.round(monthlyHours * minHourlyRate);
        const maxMonthly = Math.round(monthlyHours * maxHourlyRate);

        estimatedEarnings.textContent = `$${minMonthly} - $${maxMonthly}`;

        // Add animation class
        estimatedEarnings.classList.remove('pulse');
        void estimatedEarnings.offsetWidth; // Trigger reflow
        estimatedEarnings.classList.add('pulse');
    };

    hoursInput.addEventListener('input', calculateEarnings);
    daysInput.addEventListener('input', calculateEarnings);

    // Initial calculation
    calculateEarnings();
});

// Add pulse animation for calculator result
const calcStyle = document.createElement('style');
calcStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    .pulse {
        animation: pulse 0.3s ease-in-out;
    }
`;
document.head.appendChild(calcStyle);

// ==========================================
// Platform Filtering & Search Logic
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('platform-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const platformCards = document.querySelectorAll('.platform-card');

    if (!searchInput || !filterButtons.length) return;

    // Helper to check if a card matches the category
    const matchesCategory = (card, category) => {
        if (category === 'all') return true;

        // Get feature tags text
        const features = Array.from(card.querySelectorAll('.feature-tag'))
            .map(tag => tag.textContent.toLowerCase());

        // Check if any feature includes the category name (e.g. "surveys", "videos")
        return features.some(feature => feature.includes(category));
    };

    // Helper to check if a card matches search text
    const matchesSearch = (card, searchText) => {
        if (!searchText) return true;

        const name = card.querySelector('.platform-name').textContent.toLowerCase();
        const description = card.querySelector('.platform-description').textContent.toLowerCase();

        return name.includes(searchText) || description.includes(searchText);
    };

    const filterPlatforms = () => {
        const searchText = searchInput.value.toLowerCase();
        const activeBtn = document.querySelector('.filter-btn.active');
        const category = activeBtn ? activeBtn.dataset.filter : 'all';

        platformCards.forEach(card => {
            const isVisible = matchesCategory(card, category) && matchesSearch(card, searchText);

            if (isVisible) {
                card.style.display = 'block';
                // Re-trigger animation
                card.style.animation = 'none';
                card.offsetHeight; /* trigger reflow */
                card.style.animation = null;
            } else {
                card.style.display = 'none';
            }
        });
    };

    // Event Listeners
    searchInput.addEventListener('input', filterPlatforms);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            filterPlatforms();
        });
    });
});

// ==========================================
// FAQ Accordion Logic
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            // Toggle active class
            item.classList.toggle('active');

            // Toggle max-height for smooth animation
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }

            // Close other items (optional, for accordion behavior)
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');

                    if (otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherAnswer.style.maxHeight = 0;
                    }
                }
            });
        });
    });
});

// ==========================================
// Newsletter Form Submission
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletter-form');
    const successMsg = document.getElementById('newsletter-success');

    if (form && successMsg) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate API call
            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Subscribing...';
            btn.disabled = true;

            setTimeout(() => {
                form.style.display = 'none';
                successMsg.style.display = 'block';
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
