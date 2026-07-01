/**
 * ==========================================================
 * LAZY LOAD MODULE
 * File: assets/js/lazyload.js
 * ==========================================================
 * Features:
 * - Image lazy loading using IntersectionObserver
 * - Fallback support for older browsers
 * - Data-src replacement system
 * ==========================================================
 */

"use strict";

const LazyLoad = (() => {

    /* ======================================================
       CONFIG
    ====================================================== */

    const selector = "[data-lazy]";

    let observer = null;

    /* ======================================================
       INITIALIZE
    ====================================================== */

    function initialize() {

        try {

            const images =
                document.querySelectorAll(
                    selector
                );

            if (
                "IntersectionObserver" in window
            ) {

                observer =
                    new IntersectionObserver(
                        handleIntersect,
                        {
                            root: null,
                            threshold: 0.1
                        }
                    );

                images.forEach(img => {

                    observer.observe(img);

                });

            } else {

                // Fallback: load all images immediately

                images.forEach(loadImage);

            }

            Utils.log(
                "LazyLoad initialized."
            );

        } catch (error) {

            Utils.error(
                "LazyLoad Error",
                error
            );

        }

    }

    /* ======================================================
       INTERSECTION HANDLER
    ====================================================== */

    function handleIntersect(
        entries,
        observerInstance
    ) {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const img =
                    entry.target;

                loadImage(img);

                observerInstance.unobserve(
                    img
                );

            }

        });

    }

    /* ======================================================
       LOAD IMAGE
    ====================================================== */

    function loadImage(img) {

        const src =
            img.getAttribute(
                "data-src"
            );

        if (!src) return;

        img.src = src;

        img.removeAttribute(
            "data-src"
        );

        img.classList.add(
            "loaded"
        );

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        initialize

    };

})();