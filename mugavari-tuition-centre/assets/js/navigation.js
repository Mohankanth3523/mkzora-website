// File: assets/js/navigation.js

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    initializeNavigation();

});

function initializeNavigation() {

    const header = document.querySelector('.site-header');

    const menu = document.getElementById('primary-navigation');

    const toggle = document.getElementById('mobile-menu-toggle');

    if (!menu || !toggle) {

        return;

    }

    toggle.addEventListener('click', () => {

        const expanded =
            toggle.getAttribute('aria-expanded') === 'true';

        toggle.setAttribute(
            'aria-expanded',
            String(!expanded)
        );

        menu.classList.toggle('active');

        document.body.classList.toggle('menu-open');

    });

    menu.querySelectorAll('a').forEach(link => {

        link.addEventListener('click', () => {

            menu.classList.remove('active');

            document.body.classList.remove('menu-open');

            toggle.setAttribute(
                'aria-expanded',
                'false'
            );

        });

    });

    document.addEventListener('keydown', event => {

        if (event.key !== 'Escape') {

            return;

        }

        menu.classList.remove('active');

        document.body.classList.remove('menu-open');

        toggle.setAttribute(
            'aria-expanded',
            'false'
        );

    });

    window.addEventListener('scroll', () => {

        if (!header) {

            return;

        }

        if (window.scrollY > 20) {

            header.classList.add('scrolled');

        } else {

            header.classList.remove('scrolled');

        }

    });

}

document.querySelectorAll(".dropdown-toggle").forEach(button=>{

    button.addEventListener("click",()=>{

        if(window.innerWidth<=768){

            button.parentElement.classList.toggle("open");

        }

    });

});