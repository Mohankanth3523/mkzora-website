// File: assets/js/utils.js

'use strict';

/* ==========================
   Debounce
========================== */

function debounce(callback, delay = 250) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

/* ==========================
   Throttle
========================== */

function throttle(callback, limit = 200) {

    let waiting = false;

    return (...args) => {

        if (waiting) {

            return;

        }

        callback(...args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, limit);

    };

}

/* ==========================
   Smooth Scroll
========================== */

function smoothScrollTo(target) {

    if (!target) {

        return;

    }

    target.scrollIntoView({

        behavior: 'smooth',

        block: 'start'

    });

}

/* ==========================
   Element Visibility
========================== */

function isElementVisible(element) {

    if (!element) {

        return false;

    }

    const rect = element.getBoundingClientRect();

    return (

        rect.top < window.innerHeight &&

        rect.bottom > 0

    );

}

/* ==========================
   Unique ID
========================== */

function uniqueId(prefix = 'id') {

    return `${prefix}-${crypto.randomUUID()}`;

}

/* ==========================
   Query Helpers
========================== */

function $(selector, scope = document) {

    return scope.querySelector(selector);

}

function $$(selector, scope = document) {

    return [...scope.querySelectorAll(selector)];

}

/* ==========================
   Class Helpers
========================== */

function addClass(element, className) {

    if (element) {

        element.classList.add(className);

    }

}

function removeClass(element, className) {

    if (element) {

        element.classList.remove(className);

    }

}

function toggleClass(element, className) {

    if (element) {

        element.classList.toggle(className);

    }

}

/* ==========================
   Export
========================== */

window.AppUtils = {

    debounce,

    throttle,

    smoothScrollTo,

    isElementVisible,

    uniqueId,

    $,

    $$,

    addClass,

    removeClass,

    toggleClass

};