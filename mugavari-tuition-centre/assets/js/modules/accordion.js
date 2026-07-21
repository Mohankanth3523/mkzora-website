/**
 * ==========================================================
 * ACCORDION MODULE (Advanced)
 * File: assets/js/modules/accordion.js
 * ==========================================================
 * Features:
 * - Multi accordion support
 * - Single-open or multi-open mode
 * - Smooth animation (height-based)
 * - Accessibility support (ARIA)
 * - Keyboard support
 * ==========================================================
 */

"use strict";

const Accordion = (() => {

    /* ======================================================
       CONFIG
    ====================================================== */

    let allowMultiple = false;

    const selectors = {
        item: "[data-accordion-item]",
        trigger: "[data-accordion-trigger]",
        content: "[data-accordion-content]"
    };

    /* ======================================================
       INITIALIZE
    ====================================================== */

    function initialize(options = {}) {

        try {

            allowMultiple =
                options.allowMultiple || false;

            bindEvents();

            Utils.log(
                "Accordion initialized."
            );

        } catch (error) {

            Utils.error(
                "Accordion Error",
                error
            );

        }

    }

    /* ======================================================
       BIND EVENTS
    ====================================================== */

    function bindEvents() {

        const triggers =
            document.querySelectorAll(
                selectors.trigger
            );

        triggers.forEach(trigger => {

            trigger.addEventListener(
                "click",
                handleToggle
            );

            trigger.addEventListener(
                "keydown",
                handleKeyboard
            );

        });

    }

    /* ======================================================
       TOGGLE HANDLER
    ====================================================== */

    function handleToggle(e) {

        const trigger =
            e.currentTarget;

        const item =
            trigger.closest(selectors.item);

        const content =
            item.querySelector(selectors.content);

        const isOpen =
            item.classList.contains("active");

        if (!allowMultiple) {

            closeAll();

        }

        if (isOpen) {

            close(item, content, trigger);

        } else {

            open(item, content, trigger);

        }

    }

    /* ======================================================
       OPEN
    ====================================================== */

    function open(item, content, trigger) {

        item.classList.add("active");

        trigger.setAttribute(
            "aria-expanded",
            "true"
        );

        content.style.height =
            content.scrollHeight + "px";

        content.setAttribute(
            "aria-hidden",
            "false"
        );

        setTimeout(() => {

            content.style.height = "auto";

        }, 300);

    }

    /* ======================================================
       CLOSE
    ====================================================== */

    function close(item, content, trigger) {

        item.classList.remove("active");

        trigger.setAttribute(
            "aria-expanded",
            "false"
        );

        content.style.height =
            content.scrollHeight + "px";

        requestAnimationFrame(() => {

            content.style.height = "0px";

        });

        content.setAttribute(
            "aria-hidden",
            "true"
        );

    }

    /* ======================================================
       CLOSE ALL
    ====================================================== */

    function closeAll() {

        const items =
            document.querySelectorAll(
                selectors.item
            );

        items.forEach(item => {

            const content =
                item.querySelector(
                    selectors.content
                );

            const trigger =
                item.querySelector(
                    selectors.trigger
                );

            if (item.classList.contains("active")) {

                close(item, content, trigger);

            }

        });

    }

    /* ======================================================
       KEYBOARD SUPPORT
    ====================================================== */

    function handleKeyboard(e) {

        if (e.key === "Enter" ||
            e.key === " ") {

            e.preventDefault();

            handleToggle(e);

        }

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        initialize,

        closeAll

    };

})();