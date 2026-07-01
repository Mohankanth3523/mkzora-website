/**
 * ==========================================================
 * ACCESSIBILITY MODULE
 * File: assets/js/accessibility.js
 * ==========================================================
 * Features:
 * - Keyboard navigation improvements
 * - Focus outline management
 * - Escape key global handler
 * - Reduced motion support
 * - ARIA helpers
 * ==========================================================
 */

"use strict";

const Accessibility = (() => {

    /* ======================================================
       STATE
    ====================================================== */

    let reducedMotion = false;

    /* ======================================================
       INITIALIZE
    ====================================================== */

    function initialize() {

        try {

            detectReducedMotion();

            bindGlobalEvents();

            Utils.log(
                "Accessibility initialized."
            );

        } catch (error) {

            Utils.error(
                "Accessibility Error",
                error
            );

        }

    }

    /* ======================================================
       DETECT REDUCED MOTION
    ====================================================== */

    function detectReducedMotion() {

        const mediaQuery =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );

        reducedMotion =
            mediaQuery.matches;

        if (reducedMotion) {

            document.documentElement.classList.add(
                "reduce-motion"
            );

        }

    }

    /* ======================================================
       GLOBAL EVENTS
    ====================================================== */

    function bindGlobalEvents() {

        document.addEventListener(
            "keydown",
            handleKeyboard
        );

        document.addEventListener(
            "mousedown",
            handleMouse
        );

    }

    /* ======================================================
       KEYBOARD HANDLER
    ====================================================== */

    function handleKeyboard(e) {

        /* ESC KEY GLOBAL BEHAVIOR */

        if (e.key === "Escape") {

            document.dispatchEvent(
                new CustomEvent(
                    "app:escape"
                )
            );

        }

        /* TAB FOCUS INDICATOR */

        if (e.key === "Tab") {

            document.body.classList.add(
                "keyboard-nav"
            );

        }

    }

    /* ======================================================
       MOUSE HANDLER
    ====================================================== */

    function handleMouse() {

        document.body.classList.remove(
            "keyboard-nav"
        );

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        initialize,
        isReducedMotion: () =>
            reducedMotion

    };

})();