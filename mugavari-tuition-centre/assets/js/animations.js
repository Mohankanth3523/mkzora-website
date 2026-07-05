// File: assets/js/animations.js

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    initializeScrollAnimations();

});

function initializeScrollAnimations() {

    const animatedElements = document.querySelectorAll(
        '.feature-card,' +
        '.course-card,' +
        '.faculty-card,' +
        '.material-card,' +
        '.formula-card,' +
        '.assessment-card,' +
        '.success-card,' +
        '.testimonial-card,' +
        '.stat-card,' +
        '.timeline-item,' +
        '.section-header'
    );

    if (!animatedElements.length) {

        return;

    }

    animatedElements.forEach(element => {

        element.classList.add('fade-in');

    });

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {

                    return;

                }

                entry.target.classList.add('visible');

                observer.unobserve(entry.target);

            });

        },

        {

            root: null,

            threshold: 0.15,

            rootMargin: '0px 0px -60px 0px'

        }

    );

    animatedElements.forEach(element => {

        observer.observe(element);

    });

}

function revealElement(element) {

    if (!element) {

        return;

    }

    element.classList.add('visible');

}

function hideElement(element) {

    if (!element) {

        return;

    }

    element.classList.remove('visible');

}