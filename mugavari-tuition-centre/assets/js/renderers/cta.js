/**
 * ==========================================================
 * Mugavari Tuition Centre
 * CTA Renderer
 * ==========================================================
 * Responsibilities
 * ----------------------------------------------------------
 * • Render CTA Section
 * • Render CTA Buttons
 * • Render CTA Features
 *
 * Dependencies
 * ----------------------------------------------------------
 * utils.js
 * loader.js
 * ==========================================================
 */

"use strict";

const CTARenderer = (() => {

    let cta = null;

    /* ======================================================
       Initialize
    ====================================================== */

    function initialize() {

        try {

            const siteConfig =
                Loader.getJSON("siteConfig");

            if (!siteConfig || !siteConfig.cta) {

                Utils.warn(
                    "CTA configuration not found."
                );

                return;

            }

            cta = siteConfig.cta;

            renderContent();
            renderButtons();
            renderFeatures();

            Utils.log(
                "CTA renderer initialized."
            );

        }

        catch (error) {

            Utils.error(
                "CTA Renderer Error",
                error
            );

        }

    }

    /* ======================================================
       Render Content
    ====================================================== */

    function renderContent() {

        Utils.setText(
            Utils.$("[data-cta-badge]"),
            cta.badge || ""
        );

        Utils.setText(
            Utils.$("[data-cta-title]"),
            cta.title || ""
        );

        Utils.setText(
            Utils.$("[data-cta-description]"),
            cta.description || ""
        );

    }

    /* ======================================================
       Render Buttons
    ====================================================== */

    function renderButtons() {

        const primary =
            cta.primaryButton || {};

        const secondary =
            cta.secondaryButton || {};

        Utils.setText(
            Utils.$("[data-cta-primary-text]"),
            primary.text || ""
        );

        Utils.setText(
            Utils.$("[data-cta-secondary-text]"),
            secondary.text || ""
        );

        Utils.setAttribute(
            Utils.$("[data-cta-primary-link]"),
            "href",
            primary.link || "#"
        );

        Utils.setAttribute(
            Utils.$("[data-cta-secondary-link]"),
            "href",
            secondary.link || "#"
        );

    }

    /* ======================================================
       Render Features
    ====================================================== */

    function renderFeatures() {

        const container =
            Utils.$("[data-cta-features]");

        if (!container) return;

        container.innerHTML = "";

        if (!Array.isArray(cta.features)) {

            return;

        }

        cta.features.forEach(feature => {

            const item =
                Utils.createElement(
                    "li",
                    "cta-feature-item"
                );

            Utils.setText(
                item,
                feature
            );

            container.appendChild(item);

        });

    }

    /* ======================================================
       Public API
    ====================================================== */

    return {

        initialize

    };

})();