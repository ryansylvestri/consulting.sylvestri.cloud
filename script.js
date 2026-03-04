const nav = document.getElementById('nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        const spans = navToggle.querySelectorAll('span');
        const isOpen = navMenu.classList.contains('active');

        if (isOpen) {
            spans[0].style.transform = 'translateY(6px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');

        const spans = navToggle?.querySelectorAll('span');
        if (spans) {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
});

window.addEventListener('scroll', () => {
    if (!nav) return;
    if (window.scrollY > 28) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = target.offsetTop - navHeight + 1;

        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    });
});

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.14,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el, index) => {
        el.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
        observer.observe(el);
    });
} else {
    revealElements.forEach((el) => el.classList.add('visible'));
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu?.classList.contains('active')) {
        navMenu.classList.remove('active');

        const spans = navToggle?.querySelectorAll('span');
        if (spans) {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    }
});

const yearNode = document.getElementById('year');
if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}
