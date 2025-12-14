export function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenuClose = document.querySelector('.nav-menu-close');
    let scrollPosition = 0;

    function setNavOpen(isOpen) {
        if (isOpen) {
            scrollPosition = window.pageYOffset;
            
            navMenu.classList.add('active');
            hamburger.classList.add('active');
            document.body.classList.add('nav-open');
            hamburger.setAttribute('aria-expanded', 'true');
            
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';
        } else {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('nav-open');
            hamburger.setAttribute('aria-expanded', 'false');
            
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            
            if (window.innerWidth <= 768) {
                const html = document.documentElement;
                const originalScrollBehavior = html.style.scrollBehavior;
                html.style.scrollBehavior = 'auto';
                
                window.scrollTo(0, scrollPosition);
                
                setTimeout(() => {
                    html.style.scrollBehavior = originalScrollBehavior;
                }, 10);
            } else {
                window.scrollTo(0, scrollPosition);
            }
        }
    }

    function handleResize() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            setNavOpen(false);
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

    if (navMenuClose) {
        navMenuClose.addEventListener('click', () => {
            setNavOpen(false);
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setNavOpen(false);
        });
    });

    window.addEventListener('resize', handleResize);

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

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}
