// File: assets/js/gallery.js

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    initializeGallery();

});

function initializeGallery() {

    const galleryItems = document.querySelectorAll('[data-gallery-item]');

    const modal = document.getElementById('gallery-modal');

    if (!galleryItems.length || !modal) {

        return;

    }

    const modalImage = modal.querySelector('img');

    const modalCaption = modal.querySelector('[data-gallery-caption]');

    const closeButton = modal.querySelector('[data-gallery-close]');

    galleryItems.forEach(item => {

        item.addEventListener('click', () => {

            const image =
                item.querySelector('img');

            if (!image) {

                return;

            }

            modalImage.src = image.src;

            modalImage.alt = image.alt;

            modalCaption.textContent =
                image.alt;

            modal.hidden = false;

            document.body.classList.add('menu-open');

            closeButton.focus();

        });

    });

    closeButton.addEventListener('click', closeGallery);

    modal.addEventListener('click', event => {

        if (event.target === modal) {

            closeGallery();

        }

    });

    document.addEventListener('keydown', event => {

        if (event.key === 'Escape' && !modal.hidden) {

            closeGallery();

        }

    });

    function closeGallery() {

        modal.hidden = true;

        document.body.classList.remove('menu-open');

    }

}