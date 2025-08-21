// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(37, 99, 235, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(37, 99, 235, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.timeline-item, .skill-category, .project-card, .detail-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contact form handling
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);

            const email = this.querySelector('input[name="email"]').value;
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            fetch(this.getAttribute('action'), {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(() => {
                showNotification('Thank you! Your message has been sent.', 'success');
                this.reset();
            })
            .catch(() => {
                showNotification('Sorry, something went wrong. Please try again later.', 'error');
            });
        });
    }

    // Skills animation on hover
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Timeline items animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-item h3');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + '+';
            }, 30);
        });
    }
    
    // Trigger stats animation when hero section is visible
    const heroSection = document.querySelector('.hero-section');
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroSection);

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = navbarCollapse.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        // Visitor counter: try CountAPI first; if unreachable, fall back to image badge
        const counterEl = document.getElementById('visitorCount');
        if (counterEl) {
            const namespace = 'vivekanand27.github.io';
            const key = 'MyProfile_visitors';
            const lastHitKey = 'visitor_last_hit';
            const ONE_DAY_MS = 24 * 60 * 60 * 1000;
            let updatedViaCountAPI = false;

            function useImageCounterFallback() {
                const encodedUrl = encodeURIComponent(window.location.origin + window.location.pathname);
                const img = document.createElement('img');
                img.src = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${encodedUrl}&count_bg=%232563EB&title_bg=%232563EB&title=&edge_flat=false`;
                img.alt = 'visitors';
                img.style.verticalAlign = 'middle';
                img.style.height = '20px';
                counterEl.innerHTML = '';
                counterEl.appendChild(img);
            }

            function safeSet(value) {
                updatedViaCountAPI = true;
                counterEl.textContent = Number(value).toLocaleString();
            }

            // Read current value
            fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
                .then(r => r.ok ? r.json() : Promise.reject(r))
                .then(d => { if (typeof d.value !== 'undefined') { safeSet(d.value); } })
                .catch(() => {});

            // Increment at most once per 24 hours (per browser)
            const lastHit = parseInt(localStorage.getItem(lastHitKey) || '0', 10);
            const now = Date.now();
            if (!Number.isFinite(lastHit) || now - lastHit >= ONE_DAY_MS) {
                fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
                    .then(r => r.ok ? r.json() : Promise.reject(r))
                    .then(d => {
                        if (typeof d.value !== 'undefined') { safeSet(d.value); }
                        localStorage.setItem(lastHitKey, String(now));
                    })
                    .catch(() => {});
            }

            // If CountAPI didn't update in time, show fallback badge
            setTimeout(() => { if (!updatedViaCountAPI) { useImageCounterFallback(); } }, 2500);
        }
    });
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .nav-link.active {
        color: white !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body.loaded .hero-content > * {
        animation-play-state: running;
    }
    
    body:not(.loaded) .hero-content > * {
        animation-play-state: paused;
    }
`;

document.head.appendChild(notificationStyles);

// Add scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
    this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
});

// Add CSS variables to :root for scroll to top button
const scrollToTopStyles = document.createElement('style');
scrollToTopStyles.textContent = `
    :root {
        --primary-color: #2563eb;
    }
    
    .scroll-to-top:hover {
        background: #1d4ed8;
    }
`;

document.head.appendChild(scrollToTopStyles); 