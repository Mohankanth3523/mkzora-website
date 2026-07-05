// File: assets/js/accordion.js

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    initializeAccordion();

});

function initializeAccordion() {

    const accordions = document.querySelectorAll('.accordion');

    if (!accordions.length) {

        return;

    }

    accordions.forEach(accordion => {

        const items =
            accordion.querySelectorAll('details');

        items.forEach(item => {

            item.addEventListener('toggle', () => {

                if (!item.open) {

                    return;

                }

                items.forEach(other => {

                    if (other !== item) {

                        other.open = false;

                    }

                });

            });

        });

    });

}