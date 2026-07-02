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
       Layout Components (data-component targets)
    ====================================================== */

    layouts: [

        {
            target: "header",
            path: "components/layout/header.html"
        },

        {
            target: "navigation",
            path: "components/layout/navigation.html"
        },

        {
            target: "breadcrumb",
            path: "components/layout/breadcrumb.html"
        },

        {
            target: "hero",
            path: "components/layout/hero.html"
        },

        {
            target: "cta",
            path: "components/layout/cta.html"
        },

        {
            target: "contact-form",
            path: "components/layout/contact-form.html"
        },

        {
            target: "course-enquiry-form",
            path: "components/layout/course-enquiry-form.html"
        },

        {
            target: "google-map",
            path: "components/layout/google-map.html"
        },

        {
            target: "footer",
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
   SAFE INITIALIZER
   Wraps each module init in try-catch so missing modules
   on sub-pages don't crash the entire bootstrap.
========================================================== */

function safeInit(name, fn) {

    try {

        if (typeof fn === "function") {

            fn();

        }

    } catch (error) {

        Utils.warn(

            `${name} skipped: ${error.message}`

        );

    }

}

/* ==========================================================
   APPLICATION STARTUP
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeApplication

);

async function initializeApplication() {

    try {

        if (window.MKTCBootstrapStarted) {

            Utils.warn(

                "Application bootstrap already started."

            );

            return;

        }

        window.MKTCBootstrapStarted = true;

        Utils.log(

            "Application starting..."

        );

        await Loader.initialize(

            AppConfig

        );

        /* ==============================================
           Initialize Renderers
        ============================================== */

        safeInit("HeroRenderer", () => {
            if (typeof HeroRenderer !== "undefined") {
                HeroRenderer.initialize();
            }
        });

        safeInit("CTARenderer", () => {
            if (typeof CTARenderer !== "undefined") {
                CTARenderer.initialize();
            }
        });

        safeInit("CoursesRenderer", () => {
            if (typeof CoursesRenderer !== "undefined") {
                CoursesRenderer.initialize();
            }
        });

        safeInit("FacultyRenderer", () => {
            if (typeof FacultyRenderer !== "undefined") {
                FacultyRenderer.initialize();
            }
        });

        safeInit("ContactRenderer", () => {
            if (typeof ContactRenderer !== "undefined") {
                ContactRenderer.initialize();
            }
        });

        safeInit("FooterRenderer", () => {
            if (typeof FooterRenderer !== "undefined") {
                FooterRenderer.initialize();
            }
        });

        safeInit("FAQRenderer", () => {
            if (typeof FAQRenderer !== "undefined") {
                FAQRenderer.initialize();
            }
        });

        safeInit("TestimonialsRenderer", () => {
            if (typeof TestimonialsRenderer !== "undefined") {
                TestimonialsRenderer.initialize();
            }
        });

        /* ==============================================
           Initialize Modules
        ============================================== */

        safeInit("Navigation", () => {
            if (typeof Navigation !== "undefined") {
                Navigation.initialize();
            }
        });

        safeInit("Forms", () => {
            if (typeof Forms !== "undefined") {
                Forms.initialize();
            }
        });

        safeInit("LazyLoad", () => {
            if (typeof LazyLoad !== "undefined") {
                LazyLoad.initialize();
            }
        });

        safeInit("Accessibility", () => {
            if (typeof Accessibility !== "undefined") {
                Accessibility.initialize();
            }
        });

        safeInit("Accordion", () => {
            if (typeof Accordion !== "undefined") {
                Accordion.initialize();
            }
        });

        safeInit("Modal", () => {
            if (typeof Modal !== "undefined") {
                Modal.initialize();
            }
        });

        safeInit("Slider", () => {
            if (typeof Slider !== "undefined") {
                Slider.initialize();
            }
        });

        /* ==============================================
           Application Ready
        ============================================== */

        window.MKTCBootstrapReady = true;

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
