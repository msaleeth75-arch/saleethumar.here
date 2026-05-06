document.addEventListener('DOMContentLoaded', () => {
    // Cursor Glow Effect
    const cursor = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.padding = '1rem 5%';
            nav.style.background = 'rgba(10, 10, 12, 0.95)';
        } else {
            nav.style.padding = '1.5rem 5%';
            nav.style.background = 'rgba(10, 10, 12, 0.8)';
        }
    });

    // Mobile Menu Toggle (Simplified)
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    // Apply reveal to sections and cards
    document.querySelectorAll('.section, .project-card, .stat-card, .tech-item').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            
            // Simple visual feedback
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'SIGNAL SENT...';
            submitBtn.style.background = '#bc13fe';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Thanks ${name}! Your signal has been transmitted.`);
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Smooth Scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Add CSS for Reveal animation dynamically
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .reveal-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--bg-color);
        padding: 2rem;
        border-bottom: 1px solid var(--neon-cyan);
    }
`;
document.head.appendChild(style);
