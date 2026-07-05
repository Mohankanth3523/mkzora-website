// File: assets/js/lazyload.js

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    initializeLazyLoading();

});

function initializeLazyLoading() {

    const lazyImages = document.querySelectorAll(
        'img[loading="lazy"]'
    );

    if (!lazyImages.length) {

        return;

    }

    if (!('IntersectionObserver' in window)) {

        lazyImages.forEach(image => {

            loadImage(image);

        });

        return;

    }

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {

                    return;

                }

                const image = entry.target;

                loadImage(image);

                observer.unobserve(image);

            });

        },

        {

            root: null,

            rootMargin: '200px',

            threshold: 0

        }

    );

    lazyImages.forEach(image => {

        observer.observe(image);

    });

}

function loadImage(image) {

    if (!image) {

        return;

    }

    const source = image.dataset.src;

    const sourceSet = image.dataset.srcset;

    if (source) {

        image.src = source;

    }

    if (sourceSet) {

        image.srcset = sourceSet;

    }

    image.classList.add('loaded');

}

window.addEventListener('load', () => {

    document.documentElement.classList.add('page-loaded');

});