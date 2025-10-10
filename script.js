// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializeTypewriter();
    initializeParallax();
    initializeRotatingTitle();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.transform = hamburger.classList.contains('active') 
                ? `rotate(${index === 1 ? 0 : index === 0 ? 45 : -45}deg) ${index === 1 ? 'scaleX(0)' : 'translateY(' + (index === 0 ? '6px' : '-6px') + ')'}`
                : 'none';
        });
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
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

    // Active navigation link highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section, .hero');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for multiple elements
                if (entry.target.classList.contains('stagger')) {
                    const children = entry.target.querySelectorAll('.stagger-item');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.section');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animate skill tags with stagger effect
    const skillsSection = document.querySelector('#skills');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillsSection.classList.add('stagger');
    skillTags.forEach(tag => {
        tag.classList.add('stagger-item', 'fade-in');
    });

    // Animate certification items
    const certificationItems = document.querySelectorAll('.certification-item');
    certificationItems.forEach(item => {
        item.classList.add('fade-in');
        observer.observe(item);
    });
}

// Typewriter effect for hero section
function initializeTypewriter() {
    // Skip typewriter for now to avoid conflicts with rotating title
    return;
}

// Parallax effect for floating elements
function initializeParallax() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            element.style.transform = `translateY(${parallax * speed}px)`;
        });
    });
}

// Smooth reveal animations for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add interactive effects to skill tags
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        // Add click effect
        tag.addEventListener('click', () => {
            tag.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tag.style.transform = 'translateY(-3px)';
            }, 150);
        });
        
        // Add random hover delay for more organic feel
        tag.addEventListener('mouseenter', () => {
            const randomDelay = Math.random() * 100;
            setTimeout(() => {
                tag.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
            }, randomDelay);
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.boxShadow = '';
        });
    });
});

// Add glitch effect to hero name on hover
document.addEventListener('DOMContentLoaded', () => {
    const heroName = document.querySelector('.hero-name');
    let glitchTimeout;
    
    heroName.addEventListener('mouseenter', () => {
        let glitchCount = 0;
        const maxGlitches = 5;
        
        function glitch() {
            if (glitchCount < maxGlitches) {
                heroName.style.textShadow = `
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff0000,
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ff00,
                    ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #0000ff,
                    0 0 20px var(--neon-cyan-glow)
                `;
                glitchCount++;
                glitchTimeout = setTimeout(glitch, 100);
            } else {
                heroName.style.textShadow = 'var(--text-glow)';
            }
        }
        
        glitch();
    });
    
    heroName.addEventListener('mouseleave', () => {
        clearTimeout(glitchTimeout);
        heroName.style.textShadow = 'var(--text-glow)';
    });
});

// Add particle system background
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--neon-blue);
            border-radius: 50%;
            box-shadow: 0 0 6px var(--neon-cyan-glow);
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
        `;
        
        particleContainer.appendChild(particle);
    }
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% { transform: translateY(100vh) translateX(0px); }
            100% { transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Rotating title functionality
function initializeRotatingTitle() {
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        const rotatingTitle = document.getElementById('rotating-title');
        
        if (!rotatingTitle) {
            console.log('Rotating title element not found');
            return;
        }
        
        const titles = [
            'Software Developer',
            'Frontend Developer', 
            'Backend Developer',
            'Full Stack Developer'
        ];
        let currentIndex = 0;
        
        function changeTitle() {
            const element = document.getElementById('rotating-title');
            if (!element) return;
            
            // Fade out
            element.style.opacity = '0';
            element.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                const elementCheck = document.getElementById('rotating-title');
                if (!elementCheck) return;
                
                // Change text
                currentIndex = (currentIndex + 1) % titles.length;
                elementCheck.textContent = titles[currentIndex];
                
                // Fade in
                elementCheck.style.opacity = '1';
                elementCheck.style.transform = 'translateY(0)';
            }, 500);
        }
        
        // Start rotation after 2 seconds, then every 3 seconds
        setTimeout(() => {
            changeTitle(); // First change
            setInterval(changeTitle, 3000); // Subsequent changes
        }, 2000);
        
    }, 100); // Small delay to ensure DOM is ready
}

// Add performance optimization for scroll events
let ticking = false;

function updateScrollAnimations() {
    revealOnScroll();
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Add loading screen
document.addEventListener('DOMContentLoaded', () => {
    // Create loading screen
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-text">MD Gufran</div>
            <div class="loader-bar">
                <div class="loader-progress"></div>
            </div>
        </div>
    `;
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--primary-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease-out;
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader-content {
            text-align: center;
        }
        .loader-text {
            font-family: 'Poppins', sans-serif;
            font-size: 2rem;
            color: var(--neon-blue);
            text-shadow: var(--text-glow);
            margin-bottom: 2rem;
            animation: pulse 2s ease-in-out infinite;
        }
        .loader-bar {
            width: 300px;
            height: 4px;
            background: var(--secondary-bg);
            border-radius: 2px;
            overflow: hidden;
        }
        .loader-progress {
            height: 100%;
            background: linear-gradient(90deg, var(--neon-blue), var(--light-gray));
            border-radius: 2px;
            animation: loading 3s ease-in-out;
            box-shadow: 0 0 10px var(--neon-cyan-glow);
        }
        @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
        @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);
    
    // Remove loading screen after 3 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
            loaderStyle.remove();
        }, 500);
    }, 3000);
});
      
