// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Auto-update copyright year
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
    
    // Dark mode toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle-icon');
    const themeText = document.querySelector('.theme-toggle-text');
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme);
    updateHeroTitle(savedTheme);
    
    function updateThemeToggle(theme) {
        if (theme === 'dark') {
            themeText.textContent = 'good morning!';
        } else {
            themeText.textContent = 'feeling sleepy?';
        }
    }
    
    function updateHeroTitle(theme) {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            if (theme === 'dark') {
                heroTitle.textContent = 'Moonlight-powered app development';
            } else {
                heroTitle.textContent = 'Sunshine-powered app development';
            }
        }
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggle(newTheme);
        updateHeroTitle(newTheme);
        updateHeaderOnScroll(); // Update header colors immediately
    });
    // Handle smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background opacity on scroll
    const header = document.querySelector('.header');
    
    function updateHeaderOnScroll() {
        const scrollY = window.scrollY;
        const opacity = Math.min(scrollY / 100, 1);
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            if (scrollY > 50) {
                header.style.background = `rgba(15, 15, 15, ${0.8 + (opacity * 0.2)})`;
                header.style.borderBottomColor = `rgba(64, 64, 64, ${opacity})`;
            } else {
                header.style.background = 'rgba(15, 15, 15, 0.8)';
                header.style.borderBottomColor = 'rgba(64, 64, 64, 0.5)';
            }
        } else {
            if (scrollY > 50) {
                header.style.background = `rgba(250, 250, 250, ${0.8 + (opacity * 0.2)})`;
                header.style.borderBottomColor = `rgba(229, 229, 231, ${opacity})`;
            } else {
                header.style.background = 'rgba(250, 250, 250, 0.8)';
                header.style.borderBottomColor = 'rgba(229, 229, 231, 0.5)';
            }
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll(); // Set initial header colors based on theme
    
    // Intersection Observer for fade-in animations
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
    
    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.feature, .service-card, .section-title, .section-subtitle');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            // Ensure button has relative positioning
            const originalPosition = this.style.position;
            if (!originalPosition || originalPosition === 'static') {
                this.style.position = 'relative';
            }
            this.style.overflow = 'hidden';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Floating cards parallax effect
    const floatingCards = document.querySelectorAll('.card');
    
    function updateCardsParallax() {
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('.hero');
        const heroRect = heroSection.getBoundingClientRect();
        
        if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
            floatingCards.forEach((card, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = scrollY * speed;
                card.style.transform = `translateY(${yPos}px)`;
            });
        }
    }
    
    window.addEventListener('scroll', updateCardsParallax);
    

});

// CSS animations for JavaScript effects
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
