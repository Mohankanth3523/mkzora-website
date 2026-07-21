/**
 * ==========================================================
 * FACULTY RENDERER
 * File: assets/js/renderers/faculty.js
 * ==========================================================
 */

"use strict";

const FacultyRenderer = (() => {

    /* ======================================================
       STATE
    ====================================================== */

    let sectionData = {};
    let faculty = [];

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
                "Faculty Renderer Initialized."
            );

        }

        catch (error) {

            Utils.error(
                "Faculty Renderer Error",
                error
            );

        }

    }

    /* ======================================================
       LOAD DATA
    ====================================================== */

    function loadData() {

        const data =
            Loader.getJSON("faculty");

        if (!data) {

            Utils.warn(
                "faculty.json not found."
            );

            return;

        }

        sectionData =
            data.section || {};

        faculty =
            Array.isArray(data.faculty)
                ? data.faculty
                : [];

    }

    /* ======================================================
       CACHE ELEMENTS
    ====================================================== */

    function cacheElements() {

        elements.badge =
            Utils.$("[data-faculty-badge]");

        elements.title =
            Utils.$("[data-faculty-title]");

        elements.description =
            Utils.$("[data-faculty-description]");

        elements.grid =
            Utils.$("[data-faculty-grid]");

        elements.template =
            document.getElementById(
                "faculty-card-template"
            );

    }

    /* ======================================================
       RENDER
    ====================================================== */

    function render() {

        renderSection();

        renderFacultyCards();

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
       FACULTY CARDS
    ====================================================== */

    function renderFacultyCards() {

        if (
            !elements.grid ||
            !elements.template
        ) {

            Utils.warn(
                "Faculty template or grid missing."
            );

            return;

        }

        elements.grid.innerHTML = "";

        faculty.forEach(member => {

            const card =
                createFacultyCard(member);

            if (card) {

                elements.grid.appendChild(
                    card
                );

            }

        });

    }

    /* ======================================================
       CREATE CARD
    ====================================================== */

    function createFacultyCard(member) {

        const fragment =
            elements.template.content.cloneNode(true);

        renderImage(fragment, member);

        renderContent(fragment, member);

        renderInformation(fragment, member);

        renderExpertise(fragment, member);

        renderSocialLinks(fragment, member);

        renderButtons(fragment, member);

        return fragment;

    }
        /* ======================================================
       RENDER IMAGE
    ====================================================== */

    function renderImage(fragment, member) {

        const image =
            fragment.querySelector(
                "[data-faculty-image]"
            );

        const badge =
            fragment.querySelector(
                "[data-faculty-badge]"
            );

        if (image) {

            image.src =
                member.image?.photo || "";

            image.alt =
                member.image?.alt || "";

        }

        if (badge) {

            badge.textContent =
                member.badge || "";

        }

    }

    /* ======================================================
       RENDER CONTENT
    ====================================================== */

    function renderContent(fragment, member) {

        const department =
            fragment.querySelector(
                "[data-faculty-department]"
            );

        const name =
            fragment.querySelector(
                "[data-faculty-name]"
            );

        const designation =
            fragment.querySelector(
                "[data-faculty-designation]"
            );

        const description =
            fragment.querySelector(
                "[data-faculty-description]"
            );

        if (department) {

            department.textContent =
                member.department || "";

        }

        if (name) {

            name.textContent =
                member.name || "";

        }

        if (designation) {

            designation.textContent =
                member.designation || "";

        }

        if (description) {

            description.textContent =
                member.description || "";

        }

    }

    /* ======================================================
       RENDER INFORMATION
    ====================================================== */

    function renderInformation(fragment, member) {

        const experience =
            fragment.querySelector(
                "[data-faculty-experience]"
            );

        const qualification =
            fragment.querySelector(
                "[data-faculty-qualification]"
            );

        const subject =
            fragment.querySelector(
                "[data-faculty-subject]"
            );

        if (experience) {

            experience.textContent =
                member.experience || "";

        }

        if (qualification) {

            qualification.textContent =
                member.qualification || "";

        }

        if (subject) {

            subject.textContent =
                member.subject || "";

        }

    }

    /* ======================================================
       RENDER EXPERTISE
    ====================================================== */

    function renderExpertise(fragment, member) {

        const container =
            fragment.querySelector(
                "[data-faculty-expertise]"
            );

        if (!container) return;

        container.innerHTML = "";

        if (!Array.isArray(member.expertise)) {

            return;

        }

        member.expertise.forEach(item => {

            if (!item) return;

            const element =
                Utils.createElement(
                    "span",
                    "faculty-expertise-item"
                );

            Utils.setText(
                element,
                item
            );

            container.appendChild(
                element
            );

        });

    }

    /* ======================================================
       RENDER SOCIAL LINKS
    ====================================================== */

    function renderSocialLinks(fragment, member) {

        const container =
            fragment.querySelector(
                "[data-faculty-social-links]"
            );

        if (!container) return;

        container.innerHTML = "";

        const links =
            member.socialLinks || {};

        Object.entries(links).forEach(([name, url]) => {

            if (!url) return;

            const link =
                Utils.createElement(
                    "a",
                    "faculty-social-link"
                );

            link.href = url;

            link.target = "_blank";

            link.rel =
                "noopener noreferrer";

            Utils.setText(
                link,
                name.charAt(0).toUpperCase() +
                name.slice(1)
            );

            container.appendChild(
                link
            );

        });

    }
        /* ======================================================
       RENDER BUTTONS
    ====================================================== */

    function renderButtons(fragment, member) {

        const profileLink =
            fragment.querySelector(
                "[data-profile-link]"
            );

        const profileText =
            fragment.querySelector(
                "[data-profile-text]"
            );

        const contactLink =
            fragment.querySelector(
                "[data-contact-link]"
            );

        const contactText =
            fragment.querySelector(
                "[data-contact-text]"
            );

        const profile =
            member.buttons?.profile || {};

        const contact =
            member.buttons?.contact || {};

        if (profileText) {

            Utils.setText(
                profileText,
                profile.text || ""
            );

        }

        if (profileLink) {

            Utils.setAttribute(
                profileLink,
                "href",
                profile.url || "#"
            );

        }

        if (contactText) {

            Utils.setText(
                contactText,
                contact.text || ""
            );

        }

        if (contactLink) {

            Utils.setAttribute(
                contactLink,
                "href",
                contact.url || "#"
            );

        }

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

        if (elements.grid) {

            elements.grid.innerHTML = "";

        }

        sectionData = {};

        faculty = [];

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