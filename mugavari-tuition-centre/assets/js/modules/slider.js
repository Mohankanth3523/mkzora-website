/**
 * ==========================================================
 * SLIDER MODULE (Advanced)
 * File: assets/js/modules/slider.js
 * ==========================================================
 * Features:
 * - Touch / swipe support
 * - Auto-play slider
 * - Navigation arrows
 * - Responsive slide movement
 * - Loop support
 * ==========================================================
 */

"use strict";

const Slider = (() => {

    /* ======================================================
       STATE
    ====================================================== */

    const sliders = new Map();

    const defaults = {
        autoplay: true,
        interval: 4000,
        loop: true
    };

    /* ======================================================
       INITIALIZE
    ====================================================== */

    function initialize() {

        try {

            const elements =
                document.querySelectorAll(
                    "[data-slider]"
                );

            elements.forEach(
                initSlider
            );

            Utils.log(
                "Slider initialized."
            );

        } catch (error) {

            Utils.error(
                "Slider Error",
                error
            );

        }

    }

    /* ======================================================
       INIT SINGLE SLIDER
    ====================================================== */

    function initSlider(
        slider
    ) {

        const config = {
            autoplay:
                slider.dataset.autoplay === "true"
                || defaults.autoplay,

            interval:
                parseInt(
                    slider.dataset.interval
                ) || defaults.interval,

            loop:
                slider.dataset.loop === "true"
                || defaults.loop
        };

        const track =
            slider.querySelector(
                "[data-slider-track]"
            );

        const slides =
            slider.querySelectorAll(
                "[data-slide]"
            );

        const nextBtn =
            slider.querySelector(
                "[data-slider-next]"
            );

        const prevBtn =
            slider.querySelector(
                "[data-slider-prev]"
            );

        let index = 0;
        let timer = null;

        function update() {

            track.style.transform =
                `translateX(-${index * 100}%)`;

        }

        function next() {

            if (index < slides.length - 1) {

                index++;

            } else if (config.loop) {

                index = 0;

            }

            update();

        }

        function prev() {

            if (index > 0) {

                index--;

            } else if (config.loop) {

                index = slides.length - 1;

            }

            update();

        }

        function startAutoplay() {

            if (!config.autoplay) return;

            timer =
                setInterval(
                    next,
                    config.interval
                );

        }

        function stopAutoplay() {

            if (timer) {

                clearInterval(timer);

            }

        }

        /* ---------------- EVENTS ---------------- */

        if (nextBtn) {

            nextBtn.addEventListener(
                "click",
                next
            );

        }

        if (prevBtn) {

            prevBtn.addEventListener(
                "click",
                prev
            );

        }

        slider.addEventListener(
            "mouseenter",
            stopAutoplay
        );

        slider.addEventListener(
            "mouseleave",
            startAutoplay
        );

        /* Touch Support */

        let startX = 0;

        slider.addEventListener(
            "touchstart",
            (e) => {

                startX =
                    e.touches[0].clientX;

            }
        );

        slider.addEventListener(
            "touchend",
            (e) => {

                const endX =
                    e.changedTouches[0].clientX;

                if (startX - endX > 50) {

                    next();

                } else if (
                    endX - startX > 50
                ) {

                    prev();

                }

            }
        );

        /* Start autoplay */

        startAutoplay();

        sliders.set(
            slider,
            {
                next,
                prev,
                stopAutoplay,
                startAutoplay
            }
        );

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        initialize

    };

})();