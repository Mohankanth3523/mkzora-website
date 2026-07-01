/**
 * ==========================================================
 * CONTACT FORM RENDERER
 * File: assets/js/renderers/contact.js
 * ==========================================================
 */

"use strict";

const ContactRenderer = (() => {

    /* ======================================================
       STATE
    ====================================================== */

    let formData = {};

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
                "Contact Renderer Initialized."
            );

        }

        catch (error) {

            Utils.error(
                "Contact Renderer Error",
                error
            );

        }

    }

    /* ======================================================
       LOAD DATA
    ====================================================== */

    function loadData() {

        const siteConfig =
            Loader.getJSON("siteConfig");

        if (!siteConfig) {

            Utils.warn(
                "site-config.json not found."
            );

            return;

        }

        formData =
            siteConfig.contactForm || {};

    }

    /* ======================================================
       CACHE ELEMENTS
    ====================================================== */

    function cacheElements() {

        /* ---------- Section ---------- */

        elements.badge =
            Utils.$("[data-form-badge]");

        elements.title =
            Utils.$("[data-form-title]");

        elements.description =
            Utils.$("[data-form-description]");

        /* ---------- Labels ---------- */

        elements.labelFullName =
            Utils.$("[data-label-full-name]");

        elements.labelStudentName =
            Utils.$("[data-label-student-name]");

        elements.labelPhone =
            Utils.$("[data-label-phone]");

        elements.labelEmail =
            Utils.$("[data-label-email]");

        elements.labelClass =
            Utils.$("[data-label-class]");

        elements.labelSubject =
            Utils.$("[data-label-subject]");

        elements.labelMessage =
            Utils.$("[data-label-message]");

        /* ---------- Inputs ---------- */

        elements.fullName =
            document.getElementById(
                "full-name"
            );

        elements.studentName =
            document.getElementById(
                "student-name"
            );

        elements.phone =
            document.getElementById(
                "phone"
            );

        elements.email =
            document.getElementById(
                "email"
            );

        elements.studentClass =
            Utils.$("[data-select-class]");

        elements.subject =
            Utils.$("[data-select-subject]");

        elements.message =
            document.getElementById(
                "message"
            );

        /* ---------- Consent ---------- */

        elements.consent =
            Utils.$("[data-consent-text]");

        /* ---------- Buttons ---------- */

        elements.submitText =
            Utils.$("[data-submit-text]");

        elements.resetText =
            Utils.$("[data-reset-text]");

    }

    /* ======================================================
       RENDER
    ====================================================== */

    function render() {

        renderSection();

        renderLabels();

        renderPlaceholders();

        renderButtons();

        renderConsent();

        renderSelectOptions();

    }

    /* ======================================================
       SECTION
    ====================================================== */

    function renderSection() {

        Utils.setText(

            elements.badge,

            formData.badge || ""

        );

        Utils.setText(

            elements.title,

            formData.title || ""

        );

        Utils.setText(

            elements.description,

            formData.description || ""

        );

    }
        /* ======================================================
       RENDER LABELS
    ====================================================== */

    function renderLabels() {

        const labels =
            formData.labels || {};

        Utils.setText(
            elements.labelFullName,
            labels.fullName || ""
        );

        Utils.setText(
            elements.labelStudentName,
            labels.studentName || ""
        );

        Utils.setText(
            elements.labelPhone,
            labels.phone || ""
        );

        Utils.setText(
            elements.labelEmail,
            labels.email || ""
        );

        Utils.setText(
            elements.labelClass,
            labels.studentClass || ""
        );

        Utils.setText(
            elements.labelSubject,
            labels.subject || ""
        );

        Utils.setText(
            elements.labelMessage,
            labels.message || ""
        );

    }

    /* ======================================================
       RENDER PLACEHOLDERS
    ====================================================== */

    function renderPlaceholders() {

        const placeholders =
            formData.placeholders || {};

        if (elements.fullName) {

            Utils.setAttribute(
                elements.fullName,
                "placeholder",
                placeholders.fullName || ""
            );

        }

        if (elements.studentName) {

            Utils.setAttribute(
                elements.studentName,
                "placeholder",
                placeholders.studentName || ""
            );

        }

        if (elements.phone) {

            Utils.setAttribute(
                elements.phone,
                "placeholder",
                placeholders.phone || ""
            );

        }

        if (elements.email) {

            Utils.setAttribute(
                elements.email,
                "placeholder",
                placeholders.email || ""
            );

        }

        if (elements.message) {

            Utils.setAttribute(
                elements.message,
                "placeholder",
                placeholders.message || ""
            );

        }

    }

    /* ======================================================
       RENDER BUTTONS
    ====================================================== */

    function renderButtons() {

        const buttons =
            formData.buttons || {};

        Utils.setText(
            elements.submitText,
            buttons.submit || ""
        );

        Utils.setText(
            elements.resetText,
            buttons.reset || ""
        );

    }

    /* ======================================================
       RENDER CONSENT
    ====================================================== */

    function renderConsent() {

        Utils.setText(
            elements.consent,
            formData.consent || ""
        );

    }

    /* ======================================================
       RENDER SELECT OPTIONS
    ====================================================== */

    function renderSelectOptions() {

        renderClassOptions();

        renderSubjectOptions();

    }

    function renderClassOptions() {

        if (!elements.studentClass) {

            return;

        }

        elements.studentClass.innerHTML = "";

        const classes =
            formData.classOptions || [];

        classes.forEach(item => {

            const option =
                document.createElement(
                    "option"
                );

            option.value = item.value;

            option.textContent =
                item.label;

            elements.studentClass.appendChild(
                option
            );

        });

    }

    function renderSubjectOptions() {

        if (!elements.subject) {

            return;

        }

        elements.subject.innerHTML = "";

        const subjects =
            formData.subjectOptions || [];

        subjects.forEach(item => {

            const option =
                document.createElement(
                    "option"
                );

            option.value = item.value;

            option.textContent =
                item.label;

            elements.subject.appendChild(
                option
            );

        });

    }
        /* ======================================================
       REFRESH
    ====================================================== */

    function refresh() {

        loadData();

        render();

    }

    /* ======================================================
       RESET FORM
    ====================================================== */

    function resetForm() {

        const form =
            document.getElementById(
                "contact-form"
            );

        if (form) {

            form.reset();

        }

    }

    /* ======================================================
       DESTROY
    ====================================================== */

    function destroy() {

        resetForm();

        formData = {};

        Object.keys(elements).forEach(key => {

            elements[key] = null;

        });

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        initialize,

        refresh,

        resetForm,

        destroy

    };

})();