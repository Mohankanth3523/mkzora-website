/**
 * =====================================================
 * Mugavari Tuition Centre
 * Testimonials Module
 * =====================================================
 */

"use strict";

const Testimonials = (() => {

    let testimonialsData = null;

    let section = null;

    let container = null;

    /* =====================================================
       Initialize
    ===================================================== */

    function initialize() {

        testimonialsData = window.AppData.testimonials;

        section = testimonialsData.section;

        container = Utils.$("#testimonials-container");

        if (!container || !testimonialsData) {

            return;

        }

        renderSection();

        renderTestimonials();

        initializeSlider();

    }

    /* =====================================================
       Section
    ===================================================== */

    function renderSection() {

        Utils.setText(

            Utils.$("[data-testimonials-badge]"),

            section.badge

        );

        Utils.setText(

            Utils.$("[data-testimonials-title]"),

            section.title

        );

        Utils.setText(

            Utils.$("[data-testimonials-description]"),

            section.description

        );

    }

    /* =====================================================
       Testimonials
    ===================================================== */

    function renderTestimonials() {

        Utils.clearElement(container);

        testimonialsData.testimonials.forEach(testimonial => {

            const card = createCard(testimonial);

            container.appendChild(card);

        });

    }

    /* =====================================================
       Card
    ===================================================== */

    function createCard(data) {

        const template = document
            .getElementById("testimonial-card-template")
            .content
            .cloneNode(true);

        Utils.setImage(

            template.querySelector("[data-testimonial-image]"),

            data.image.photo,

            data.image.alt

        );

        Utils.setText(

            template.querySelector("[data-testimonial-badge]"),

            data.badge

        );

        Utils.setText(

            template.querySelector("[data-testimonial-name]"),

            data.name

        );

        Utils.setText(

            template.querySelector("[data-testimonial-role]"),

            data.role

        );

        Utils.setText(

            template.querySelector("[data-testimonial-course]"),

            data.course

        );

        Utils.setText(

            template.querySelector("[data-testimonial-batch]"),

            data.batch

        );

        Utils.setText(

            template.querySelector("[data-testimonial-year]"),

            data.year

        );

        Utils.setText(

            template.querySelector("[data-testimonial-message]"),

            data.message

        );

        renderRating(

            template.querySelector("[data-testimonial-rating]"),

            data.rating

        );

        return template;

    }

    /* =====================================================
       Rating
    ===================================================== */

    function renderRating(container, rating) {

        Utils.clearElement(container);

        for (let i = 0; i < rating; i++) {

            const star = Utils.createElement(

                "span",

                "testimonial-star"

            );

            star.textContent = "★";

            container.appendChild(star);

        }

    }

    /* =====================================================
       Slider
    ===================================================== */

    function initializeSlider() {

        /*
            Future Enhancement

            - Auto Play

            - Previous

            - Next

            - Swipe

            - Infinite Loop
        */

    }

    /* =====================================================
       Public API
    ===================================================== */

    return {

        initialize

    };

})();