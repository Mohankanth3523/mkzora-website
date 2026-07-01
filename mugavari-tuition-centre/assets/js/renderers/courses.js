/**
 * ==========================================================
 * Mugavari Tuition Centre
 * Courses Renderer
 * ==========================================================
 * Responsibilities
 * ----------------------------------------------------------
 * • Load Courses JSON
 * • Render Courses Section
 * • Render Course Cards
 * • Populate Course Features
 * • Render Course Action Buttons
 *
 * Dependencies
 * ----------------------------------------------------------
 * utils.js
 * loader.js
 *
 * Data Source
 * ----------------------------------------------------------
 * /data/courses.json
 * ==========================================================
 */

"use strict";

const CoursesRenderer = (() => {

    /* ======================================================
       State
    ====================================================== */

    let sectionData = {};
    let courses = [];

    const elements = {};

    /* ======================================================
       Initialize
    ====================================================== */

    function initialize() {

        try {

            loadData();

            cacheElements();

            render();

            Utils.log(
                "Courses Renderer initialized."
            );

        }

        catch (error) {

            Utils.error(
                "Courses Renderer Error",
                error
            );

        }

    }

    /* ======================================================
       Load JSON
    ====================================================== */

    function loadData() {

        const data =
            Loader.getJSON("courses");

        if (!data) {

            Utils.warn(
                "courses.json not found."
            );

            return;

        }

        sectionData =
            data.section || {};

        courses =
            Array.isArray(data.courses)
                ? data.courses
                : [];

    }

    /* ======================================================
       Cache DOM Elements
    ====================================================== */

    function cacheElements() {

        elements.badge =
            Utils.$("[data-courses-badge]");

        elements.title =
            Utils.$("[data-courses-title]");

        elements.description =
            Utils.$("[data-courses-description]");

        elements.grid =
            Utils.$("[data-courses-grid]");

        elements.template =
            document.getElementById(
                "course-card-template"
            );

    }

    /* ======================================================
       Render
    ====================================================== */

    function render() {

        renderSection();

        renderCards();

    }

    /* ======================================================
       Render Section
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
       Render Course Cards
    ====================================================== */

    function renderCards() {

        if (!elements.grid) {

            Utils.warn(
                "Courses grid container not found."
            );

            return;

        }

        if (!elements.template) {

            Utils.warn(
                "Course card template not found."
            );

            return;

        }

        elements.grid.innerHTML = "";

        if (!courses.length) {

            Utils.warn(
                "No courses available."
            );

            return;

        }

        courses.forEach(course => {

            const card =
                createCourseCard(course);

            if (card) {

                elements.grid.appendChild(card);

            }

        });

    }

    /* ======================================================
       Create Course Card
    ====================================================== */

    function createCourseCard(course) {

        const fragment =
            elements.template.content.cloneNode(true);

        renderImage(fragment, course);

        renderContent(fragment, course);

        renderMeta(fragment, course);

        renderFeatures(fragment, course);

        renderButtons(fragment, course);

        return fragment;

    }

    /* ======================================================
       Render Course Image
    ====================================================== */

    function renderImage(fragment, course) {

        const image =
            fragment.querySelector(
                "[data-course-image]"
            );

        const badge =
            fragment.querySelector(
                "[data-course-badge]"
            );

        if (image) {

            image.src =
                course.image?.thumbnail || "";

            image.alt =
                course.image?.alt || "";

        }

        if (badge) {

            badge.textContent =
                course.badge || "";

        }

    }

    /* ======================================================
       Render Course Content
    ====================================================== */

    function renderContent(fragment, course) {

        const category =
            fragment.querySelector(
                "[data-course-category]"
            );

        const title =
            fragment.querySelector(
                "[data-course-title]"
            );

        const description =
            fragment.querySelector(
                "[data-course-description]"
            );

        if (category) {

            category.textContent =
                course.category || "";

        }

        if (title) {

            title.textContent =
                course.title || "";

        }

        if (description) {

            description.textContent =
                course.description || "";

        }

    }

    /* ======================================================
       Render Course Meta
    ====================================================== */

    function renderMeta(fragment, course) {

        const className =
            fragment.querySelector(
                "[data-course-class]"
            );

        const subject =
            fragment.querySelector(
                "[data-course-subject]"
            );

        const duration =
            fragment.querySelector(
                "[data-course-duration]"
            );

        if (className) {

            className.textContent =
                course.class || "";

        }

        if (subject) {

            subject.textContent =
                course.subject || "";

        }

        if (duration) {

            duration.textContent =
                course.duration || "";

        }

    }
        /* ======================================================
       Render Features
    ====================================================== */

    function renderFeatures(fragment, course) {

        const container =
            fragment.querySelector(
                "[data-course-features]"
            );

        if (!container) return;

        container.innerHTML = "";

        if (!Array.isArray(course.features)) {

            return;

        }

        course.features.forEach(feature => {

            if (!feature) return;

            const item =
                Utils.createElement(
                    "li",
                    "course-feature-item"
                );

            Utils.setText(
                item,
                feature
            );

            container.appendChild(item);

        });

    }

    /* ======================================================
       Render Buttons
    ====================================================== */

    function renderButtons(fragment, course) {

        const detailsLink =
            fragment.querySelector(
                "[data-course-details-link]"
            );

        const detailsText =
            fragment.querySelector(
                "[data-course-details-text]"
            );

        const enquiryLink =
            fragment.querySelector(
                "[data-course-enquiry-link]"
            );

        const enquiryText =
            fragment.querySelector(
                "[data-course-enquiry-text]"
            );

        const details =
            course.buttons?.details || {};

        const enquiry =
            course.buttons?.enquiry || {};

        if (detailsText) {

            Utils.setText(
                detailsText,
                details.text || ""
            );

        }

        if (detailsLink) {

            Utils.setAttribute(
                detailsLink,
                "href",
                details.url || "#"
            );

        }

        if (enquiryText) {

            Utils.setText(
                enquiryText,
                enquiry.text || ""
            );

        }

        if (enquiryLink) {

            Utils.setAttribute(
                enquiryLink,
                "href",
                enquiry.url || "#"
            );

        }

    }

    /* ======================================================
       Refresh
    ====================================================== */

    function refresh() {

        loadData();

        render();

    }

    /* ======================================================
       Destroy
    ====================================================== */

    function destroy() {

        if (elements.grid) {

            elements.grid.innerHTML = "";

        }

    }

    /* ======================================================
       Public API
    ====================================================== */

    return {

        initialize,

        refresh,

        destroy

    };

})();