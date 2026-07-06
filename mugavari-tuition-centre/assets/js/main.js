// File: assets/js/main.js

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    initializeApplication();

});

function initializeApplication() {

    initializeCurrentYear();

    initializeSmoothScroll();

    initializeCounters();

    initializeRevealAnimations();

    initializeBackToTop();

}

function initializeCurrentYear() {

    const yearElements = document.querySelectorAll('[data-current-year]');

    const currentYear = new Date().getFullYear();

    yearElements.forEach(element => {

        element.textContent = currentYear;

    });

}

function initializeSmoothScroll() {

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {

        link.addEventListener('click', event => {

            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') {

                return;

            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {

                return;

            }

            event.preventDefault();

            targetElement.scrollIntoView({

                behavior: 'smooth',
                block: 'start'

            });

        });

    });

}

function initializeCounters() {

    const counters = document.querySelectorAll('.stat-number');

    if (!counters.length) {

        return;

    }

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {

                return;

            }

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

function animateCounter(element) {

    const target = Number(
    element.dataset.target || element.dataset.count || 0
);

    const duration = 1800;

    const start = performance.now();

    function update(time) {

        const progress = Math.min((time - start) / duration, 1);

        const value = Math.floor(progress * target);

        element.textContent = value + '+';

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}

function initializeRevealAnimations() {

    const revealItems = document.querySelectorAll('.fade-in');

    if (!revealItems.length) {

        return;

    }

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');

            }

        });

    }, {

        threshold: 0.15

    });

    revealItems.forEach(item => {

        observer.observe(item);

    });

}

function initializeBackToTop() {

    const button = document.querySelector('[href="#hero"]');

    if (!button) {

        return;

    }

    button.addEventListener('click', event => {

        event.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        });

    });

}
