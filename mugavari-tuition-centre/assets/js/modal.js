// File: assets/js/modal.js

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    initializeModal();

});

function initializeModal() {

    const modalTriggers =
        document.querySelectorAll('[data-modal-target]');

    if (!modalTriggers.length) {

        return;

    }

    modalTriggers.forEach(trigger => {

        trigger.addEventListener('click', () => {

            const selector =
                trigger.dataset.modalTarget;

            const modal =
                document.querySelector(selector);

            if (!modal) {

                return;

            }

            openModal(modal);

        });

    });

    document.querySelectorAll('[data-modal-close]')
        .forEach(button => {

            button.addEventListener('click', () => {

                const modal =
                    button.closest('.modal');

                closeModal(modal);

            });

        });

    document.addEventListener('click', event => {

        const modal =
            event.target.closest('.modal');

        if (
            modal &&
            event.target === modal
        ) {

            closeModal(modal);

        }

    });

    document.addEventListener('keydown', event => {

        if (event.key !== 'Escape') {

            return;

        }

        document.querySelectorAll('.modal.is-open')
            .forEach(closeModal);

    });

}

function openModal(modal) {

    modal.hidden = false;

    modal.classList.add('is-open');

    document.body.classList.add('menu-open');

    const focusable =
        modal.querySelector(
            'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        );

    if (focusable) {

        focusable.focus();

    }

}

function closeModal(modal) {

    if (!modal) {

        return;

    }

    modal.classList.remove('is-open');

    modal.hidden = true;

    document.body.classList.remove('menu-open');

}