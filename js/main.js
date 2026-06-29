(function () {
    'use strict';

    // Nav scroll state
    const nav = document.querySelector('.c-nav');
    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile hamburger
    const hamburger = document.querySelector('.c-nav__hamburger');
    const navLinks = document.querySelector('.c-nav__links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', String(open));
        });
        // Close on link click
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id], div[id="hero"]');
    const navAnchors = document.querySelectorAll('.c-nav__link a');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAnchors.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => observer.observe(s));

    // Fade-in on scroll
    const fadeEls = document.querySelectorAll('.c-section, .c-timeline__item, .c-card, .c-lang__item, .c-engagements__item, .c-certs__item, .c-stats__item');
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -60px 0px' });
    fadeEls.forEach(el => fadeObserver.observe(el));

    // Language bar widths (set via data attribute for CSS transition)
    document.querySelectorAll('.c-lang__bar').forEach(bar => {
        bar.style.width = bar.dataset.width || '0%';
    });
})();
