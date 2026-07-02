/**
 * ==========================================================
 * Mugavari Tuition Centre
 * Utility Library
 * ==========================================================
 * Shared helper functions used across the application.
 * Dependencies: None
 * ==========================================================
 */

"use strict";

const Utils = (() => {

    /* ======================================================
       DOM Selection
    ====================================================== */

    const $ = (selector, scope = document) =>
        scope.querySelector(selector);

    const $$ = (selector, scope = document) =>
        [...scope.querySelectorAll(selector)];

    /* ======================================================
       Element Creation
    ====================================================== */

    function createElement(tag, className = "") {

        const element = document.createElement(tag);

        if (className) {

            element.className = className;

        }

        return element;

    }

    /* ======================================================
       Template Clone
    ====================================================== */

    function cloneTemplate(templateId) {

        const template =
            document.getElementById(templateId);

        if (!template) {

            console.error(
                `Template not found: ${templateId}`
            );

            return null;

        }

        return template.content.cloneNode(true);

    }

    /* ======================================================
       Text Helpers
    ====================================================== */

    function setText(element, value = "") {

        if (!element) return;

        element.textContent = value;

    }

    function setHTML(element, value = "") {

        if (!element) return;

        element.innerHTML = value;

    }

    /* ======================================================
       Attribute Helpers
    ====================================================== */

    function setAttribute(element, attribute, value) {

        if (!element) return;

        if (value === null || value === undefined) {

            element.removeAttribute(attribute);

            return;

        }

        element.setAttribute(attribute, value);

    }

    function removeAttribute(element, attribute) {

        if (!element) return;

        element.removeAttribute(attribute);

    }

    /* ======================================================
       Dataset Helpers
    ====================================================== */

    function setData(element, key, value) {

        if (!element) return;

        element.dataset[key] = value;

    }

    function getData(element, key) {

        if (!element) return null;

        return element.dataset[key] ?? null;

    }

    /* ======================================================
       Image Helpers
    ====================================================== */

    function setImage(element, src = "", alt = "") {

        if (!element) return;

        element.src = src;

        element.alt = alt;

    }

    /* ======================================================
       Class Helpers
    ====================================================== */

    function addClass(element, ...classNames) {

        if (!element) return;

        element.classList.add(...classNames);

    }

    function removeClass(element, ...classNames) {

        if (!element) return;

        element.classList.remove(...classNames);

    }

    function toggleClass(element, className, force) {

        if (!element) return;

        element.classList.toggle(className, force);

    }

    function hasClass(element, className) {

        if (!element) return false;

        return element.classList.contains(className);

    }

    /* ======================================================
       Visibility Helpers
    ====================================================== */

    function show(element) {

        if (!element) return;

        element.hidden = false;

    }

    function hide(element) {

        if (!element) return;

        element.hidden = true;

    }

    /* ======================================================
       DOM Helpers
    ====================================================== */

    function clearElement(element) {

        if (!element) return;

        element.replaceChildren();

    }

    /* ======================================================
       Event Helpers
    ====================================================== */

    function on(element, event, handler, options = false) {

        if (!element) return;

        element.addEventListener(

            event,

            handler,

            options

        );

    }

    function off(element, event, handler, options = false) {

        if (!element) return;

        element.removeEventListener(

            event,

            handler,

            options

        );

    }

    function once(element, event, handler) {

        if (!element) return;

        element.addEventListener(

            event,

            handler,

            {

                once: true

            }

        );

    }

    /* ======================================================
       Debounce
    ====================================================== */

    function debounce(callback, delay = 300) {

        let timeout;

        return (...args) => {

            clearTimeout(timeout);

            timeout = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    }

    /* ======================================================
       Throttle
    ====================================================== */

    function throttle(callback, delay = 300) {

        let waiting = false;

        return (...args) => {

            if (waiting) return;

            callback(...args);

            waiting = true;

            setTimeout(() => {

                waiting = false;

            }, delay);

        };

    }

    /* ======================================================
       Scroll Helpers
    ====================================================== */

    function scrollToElement(

        element,

        behavior = "smooth"

    ) {

        if (!element) return;

        element.scrollIntoView({

            behavior,

            block: "start"

        });

    }

    function scrollToTop(

        behavior = "smooth"

    ) {

        window.scrollTo({

            top: 0,

            behavior

        });

    }

    /* ======================================================
       Type Helpers
    ====================================================== */

    function isElement(value) {

        return value instanceof Element;

    }

    function isObject(value) {

        return value !== null &&
            typeof value === "object" &&
            !Array.isArray(value);

    }

    function isEmpty(value) {

        if (value === null || value === undefined) {

            return true;

        }

        if (typeof value === "string") {

            return value.trim() === "";

        }

        if (Array.isArray(value)) {

            return value.length === 0;

        }

        if (isObject(value)) {

            return Object.keys(value).length === 0;

        }

        return false;

    }

    /* ======================================================
       ID Generator
    ====================================================== */

    function uniqueId(prefix = "id") {

        return `${prefix}-${crypto.randomUUID()}`;

    }

    /* ======================================================
       URL Helpers
    ====================================================== */

    function getCurrentPage() {

        const path = window.location.pathname;

        const page = path.split("/").pop();

        return page || "index.html";

    }

    function isCurrentPage(page) {

        return getCurrentPage() === page;

    }

    /* ======================================================
       Animation Helpers
    ====================================================== */

    function wait(milliseconds = 0) {

        return new Promise(resolve => {

            setTimeout(resolve, milliseconds);

        });

    }

    function nextFrame() {

        return new Promise(resolve => {

            requestAnimationFrame(resolve);

        });

    }

    /* ======================================================
       Safe JSON Helper
    ====================================================== */

    function deepClone(value) {

        return structuredClone(value);

    }

    /* ======================================================
       Logger
    ====================================================== */

    function log(message, data = null) {

        console.log(

            `[MKTC] ${message}`,

            data ?? ""

        );

    }

    function warn(message, data = null) {

        console.warn(

            `[MKTC] ${message}`,

            data ?? ""

        );

    }

    function error(message, data = null) {

        console.error(

            `[MKTC] ${message}`,

            data ?? ""

        );

    }

    /* ======================================================
       Public API
    ====================================================== */

    return {

        // DOM

        $,
        $$,

        createElement,
        cloneTemplate,

        clearElement,

        // Content

        setText,
        setHTML,

        // Attributes

        setAttribute,
        removeAttribute,
        setData,
        getData,

        // Images

        setImage,

        // Classes

        addClass,
        removeClass,
        toggleClass,
        hasClass,

        // Visibility

        show,
        hide,

        // Events

        on,
        off,
        once,

        // Performance

        debounce,
        throttle,

        // Scroll

        scrollToElement,
        scrollToTop,

        // Type

        isElement,
        isObject,
        isEmpty,

        // Utility

        uniqueId,
        deepClone,
        wait,
        nextFrame,

        // URL

        getCurrentPage,
        isCurrentPage,

        // Logger

        log,
        warn,
        error

    };

})();