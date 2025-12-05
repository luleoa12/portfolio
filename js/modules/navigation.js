export function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function setNavOpen(isOpen) {
        if (isOpen) {
            navMenu.classList.add('active');
            hamburger.classList.add('active');
            document.body.classList.add('nav-open');
            hamburger.setAttribute('aria-expanded', 'true');
        } else {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            setNavOpen(!navMenu.classList.contains('active'));
        });
        
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setNavOpen(!navMenu.classList.contains('active'));
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setNavOpen(false);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const href = this.getAttribute('href');
                let yOffset = -70;
                if (href === '#achievements') {
                    yOffset = -100;
                }
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}
