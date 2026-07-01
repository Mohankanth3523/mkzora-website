/**
 * ==========================================================
 * Mugavari Tuition Centre
 * Main Application Entry
 * ==========================================================
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Load HTML Components
 * • Load HTML Templates
 * • Load JSON Data
 * • Initialize Renderers
 * • Initialize Modules
 *
 * Dependencies
 * ----------------------------------------------------------
 * utils.js
 * loader.js
 * hero.js
 * cta.js
 * courses.js
 * faculty.js
 * contact.js
 * footer.js
 * faq.js
 * testimonials.js
 * navigation.js
 * forms.js
 * lazyload.js
 * accessibility.js
 * ==========================================================
 */

"use strict";

/* ==========================================================
   APPLICATION CONFIGURATION
========================================================== */

const AppConfig = {

    /* ======================================================
       Layout Components
    ====================================================== */

    layouts: [

        {
            target: "header-container",
            path: "components/layout/header.html"
        },

        {
            target: "navigation-container",
            path: "components/layout/navigation.html"
        },

        {
            target: "breadcrumb-container",
            path: "components/layout/breadcrumb.html"
        },

        {
            target: "hero-container",
            path: "components/layout/hero.html"
        },

        {
            target: "cta-container",
            path: "components/layout/cta.html"
        },

        {
            target: "contact-form-container",
            path: "components/layout/contact-form.html"
        },

        {
            target: "course-enquiry-form-container",
            path: "components/layout/course-enquiry-form.html"
        },

        {
            target: "google-map-container",
            path: "components/layout/google-map.html"
        },

        {
            target: "footer-container",
            path: "components/layout/footer.html"
        }

    ],

    /* ======================================================
       Template Components
    ====================================================== */

    templates: [

        "components/templates/course-card.html",

        "components/templates/faculty-card.html",

        "components/templates/testimonial-card.html",

        "components/templates/faq-item.html"

    ],

    /* ======================================================
       JSON Data
    ====================================================== */

    data: {

        siteConfig:
            "data/site-config.json",

        navigation:
            "data/navigation.json",

        courses:
            "data/courses.json",

        faculty:
            "data/faculty.json",

        testimonials:
            "data/testimonials.json",

        faq:
            "data/faq.json",

        contact:
            "data/contact.json",

        socialLinks:
            "data/social-links.json",

        seo:
            "data/seo.json"

    }

};

/* ==========================================================
   APPLICATION STARTUP
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeApplication

);

async function initializeApplication() {

    try {

        Utils.log(

            "Application starting..."

        );

        await Loader.initialize(

            AppConfig

        );

        /* ==============================================
           Initialize Renderers
        ============================================== */

        HeroRenderer.initialize();

        CTARenderer.initialize();

        CourseRenderer.initialize();

        FacultyRenderer.initialize();

        ContactRenderer.initialize();

        FooterRenderer.initialize();

        FAQRenderer.initialize();

        TestimonialsRenderer.initialize();

        /* ==============================================
           Initialize Modules
        ============================================== */

        Navigation.initialize();

        Forms.initialize();

        LazyLoad.initialize();

        Accessibility.initialize();

        /* ==============================================
           Application Ready
        ============================================== */

        Utils.log(

            "Application initialized successfully."

        );

    }

    catch (error) {

        Utils.error(

            "Application startup failed.",

            error

        );

    }

}