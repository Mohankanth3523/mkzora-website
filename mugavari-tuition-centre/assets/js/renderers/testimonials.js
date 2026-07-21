/**
 * ==========================================================
 * TESTIMONIALS RENDERER
 * File: assets/js/renderers/testimonials.js
 * ==========================================================
 */

"use strict";

const TestimonialsRenderer = (() => {

    /* ======================================================
       STATE
    ====================================================== */

    let sectionData = {};
    let testimonials = [];

    const elements = {};

    /* ======================================================
       INITIALIZE
    ====================================================== */

    function initialize() {

        try {

            loadData();

            cacheElements();

            render();

            Utils.log(
                "Testimonials Renderer Initialized."
            );

        }

        catch (error) {

            Utils.error(
                "Testimonials Renderer Error",
                error
            );

        }

    }

    /* ======================================================
       LOAD DATA
    ====================================================== */

    function loadData() {

        const data =
            Loader.getJSON("testimonials");

        if (!data) {

            Utils.warn(
                "testimonials.json not found."
            );

            return;

        }

        sectionData =
            data.section || {};

        testimonials =
            Array.isArray(data.testimonials)
                ? data.testimonials
                : [];

    }

    /* ======================================================
       CACHE ELEMENTS
    ====================================================== */

    function cacheElements() {

        elements.badge =
            Utils.$("[data-testimonials-badge]");

        elements.title =
            Utils.$("[data-testimonials-title]");

        elements.description =
            Utils.$("[data-testimonials-description]");

        elements.container =
            Utils.$("[data-testimonials-container]");

        elements.template =
            document.getElementById(
                "testimonial-card-template"
            );

    }

    /* ======================================================
       RENDER
    ====================================================== */

    function render() {

        renderSection();

        renderTestimonials();

    }

    /* ======================================================
       SECTION
    ====================================================== */

    function renderSection() {

        Utils.setText(
            elements.badge,
            sectionData.badge || ""
        );

        Utils.setText(
            elements.title,
            sectionData.title || ""
        );

        Utils.setText(
            elements.description,
            sectionData.description || ""
        );

    }

    /* ======================================================
       TESTIMONIALS
    ====================================================== */

    function renderTestimonials() {

        if (
            !elements.container ||
            !elements.template
        ) {

            Utils.warn(
                "Testimonials container or template missing."
            );

            return;

        }

        elements.container.innerHTML = "";

        testimonials.forEach(item => {

            const fragment =
                createTestimonial(item);

            elements.container.appendChild(
                fragment
            );

        });

    }

    /* ======================================================
       CREATE TESTIMONIAL CARD
    ====================================================== */

    function createTestimonial(item) {

        const fragment =
            elements.template.content.cloneNode(true);

        const image =
            fragment.querySelector(
                "[data-testimonial-image]"
            );

        const badge =
            fragment.querySelector(
                "[data-testimonial-badge]"
            );

        const name =
            fragment.querySelector(
                "[data-testimonial-name]"
            );

        const role =
            fragment.querySelector(
                "[data-testimonial-role]"
            );

        const message =
            fragment.querySelector(
                "[data-testimonial-message]"
            );

        const course =
            fragment.querySelector(
                "[data-testimonial-course]"
            );

        const batch =
            fragment.querySelector(
                "[data-testimonial-batch]"
            );

        const year =
            fragment.querySelector(
                "[data-testimonial-year]"
            );

        const rating =
            fragment.querySelector(
                "[data-testimonial-rating]"
            );

        /* ---------- Image ---------- */

        if (image) {

            image.src =
                item.image?.photo || "";

            image.alt =
                item.image?.alt || item.name || "";

        }

        /* ---------- Text Fields ---------- */

        if (badge) badge.textContent = item.badge || "";
        if (name) name.textContent = item.name || "";
        if (role) role.textContent = item.role || "";
        if (message) message.textContent = item.message || "";
        if (course) course.textContent = item.course || "";
        if (batch) batch.textContent = item.batch || "";
        if (year) year.textContent = item.year || "";

        /* ---------- Rating ---------- */

        if (rating) {

            rating.innerHTML = "";

            const stars =
                Math.max(0, Math.min(5, item.rating || 0));

            for (let i = 1; i <= 5; i++) {

                const star =
                    document.createElement("span");

                star.textContent =
                    i <= stars ? "★" : "☆";

                star.className =
                    i <= stars
                        ? "star filled"
                        : "star";

                rating.appendChild(star);

            }

        }

        return fragment;

    }

    /* ======================================================
       REFRESH
    ====================================================== */

    function refresh() {

        loadData();

        render();

    }

    /* ======================================================
       DESTROY
    ====================================================== */

    function destroy() {

        if (elements.container) {

            elements.container.innerHTML = "";

        }

        sectionData = {};

        testimonials = [];

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        initialize,

        refresh,

        destroy

    };

})();