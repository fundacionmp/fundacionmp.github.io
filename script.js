document.documentElement.classList.add('js');

document.addEventListener("DOMContentLoaded", () => {
    
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    const closeMenu = () => {
        navLinks.classList.remove('active');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.setAttribute('aria-label', 'Abrir menú');
    };

    mobileBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('active');
        mobileBtn.setAttribute('aria-expanded', String(isOpen));
        mobileBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 1100) closeMenu();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
            mobileBtn.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (navLinks.classList.contains('active') && !navbar.contains(event.target)) closeMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1100) closeMenu();
    });

    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', 
        threshold: 0.15 
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) fadeElements.forEach(element => element.classList.add('visible'));
    else fadeElements.forEach(element => fadeObserver.observe(element));

    const counters = document.querySelectorAll('.counter');
    const speed = 100;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const statsSection = document.querySelector('.hero-stats');
    
    if(statsSection) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    const removeElfsightBadge = () => {
        document
          .querySelectorAll('a[href*="elfsight.com/instagram-feed-instashow/"]')
          .forEach((link) => link.remove());
    };

    removeElfsightBadge();

    const widgetRoot = document.querySelector('.instagram-embed');
    if (widgetRoot) {
        const observer = new MutationObserver(() => removeElfsightBadge());
        observer.observe(widgetRoot, { childList: true, subtree: true });
    }

    const emailForm = document.getElementById('email-contact-form');

    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const telefono = document.getElementById('telefono').value;
            const motivo = document.getElementById('motivo').value;
            const mensaje = document.getElementById('mensaje').value;

            const destinatario = "fundacionmaggiepaul@gmail.com";
            const asunto = encodeURIComponent(`Nuevo mensaje de contacto web: ${motivo} - ${nombre}`);
            
            const cuerpo = encodeURIComponent(
                `Nombre completo: ${nombre}\n` +
                `Correo electrónico: ${email}\n` +
                `Teléfono: ${telefono || 'No proporcionado'}\n` +
                `Motivo del mensaje: ${motivo}\n\n` +
                `Mensaje:\n${mensaje}`
            );

            window.location.href = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;
        });
    }
});
