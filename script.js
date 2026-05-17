document.addEventListener('DOMContentLoaded', () => {

    // ── Cursor Glow ──────────────────────────────────────
    const glow = document.getElementById('cursorGlow');
    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // ── Mobile Nav ───────────────────────────────────────
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    burger?.addEventListener('click', () => navLinks.classList.toggle('open'));

    // Close mobile nav on link click
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('open'));
    });

    // ── Navbar Scroll Shrink ──────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.style.borderBottomColor = 'rgba(255,255,255,0.06)';
        } else {
            navbar.style.borderBottomColor = 'rgba(255,255,255,0.08)';
        }
    });

    // ── Smooth Active Nav Highlight ───────────────────────
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-item');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.style.color = 'var(--neon-blue)';
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));

    // ── Scroll Reveal Animations ──────────────────────────
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // ── Project card tilt on hover ────────────────────────
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotateX = ((y - cy) / cy) * -6;
            const rotateY = ((x - cx) / cx) * 6;
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ── Contact Form ──────────────────────────────────────
    const form = document.querySelector('.contact-form');
    form?.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #00ff87, #00f3ff)';
        setTimeout(() => {
            btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            btn.style.background = '';
            form.reset();
        }, 3000);
    });

});
