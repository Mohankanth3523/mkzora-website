/**
 * ==========================================================
 * Mugavari Tuition Centre
 * Hero Renderer
 * ==========================================================
 * Responsibilities
 * ----------------------------------------------------------
 * • Render Hero Section
 * • Render Hero Buttons
 * • Render Hero Highlights
 * • Render Hero Statistics
 * • Render Hero Image
 *
 * Dependencies
 * ----------------------------------------------------------
 * utils.js
 * loader.js
 * ==========================================================
 */

"use strict";

const HeroRenderer = (() => {

    let heroData = null;

    /* ======================================================
       Initialize
    ====================================================== */

    function initialize() {

        try {

            const siteConfig =
                Loader.getJSON("siteConfig");

            if (!siteConfig || !siteConfig.hero) {

                Utils.warn(
                    "Hero configuration not found."
                );

                return;

            }

            heroData = siteConfig.hero;

            renderContent();
            renderButtons();
            renderImage();
            renderHighlights();
            renderStatistics();

            Utils.log(
                "Hero renderer initialized."
            );

        }

        catch (error) {

            Utils.error(
                "Hero Renderer Error",
                error
            );

        }

    }

    /* ======================================================
       Render Text Content
    ====================================================== */

    function renderContent() {

        Utils.setText(
            Utils.$("[data-hero-tag]"),
            heroData.badge || ""
        );

        Utils.setText(
            Utils.$("[data-hero-title]"),
            heroData.title || ""
        );

        Utils.setText(
            Utils.$("[data-hero-description]"),
            heroData.description || ""
        );

    }

    /* ======================================================
       Render Buttons
    ====================================================== */

    function renderButtons() {

        const primary =
            heroData.primaryButton || {};

        const secondary =
            heroData.secondaryButton || {};

        Utils.setText(
            Utils.$("[data-primary-button-text]"),
            primary.text || ""
        );

        Utils.setText(
            Utils.$("[data-secondary-button-text]"),
            secondary.text || ""
        );

        Utils.setAttribute(
            Utils.$("[data-primary-button-link]"),
            "href",
            primary.link || "#"
        );

        Utils.setAttribute(
            Utils.$("[data-secondary-button-link]"),
            "href",
            secondary.link || "#"
        );

    }

    /* ======================================================
       Render Image
    ====================================================== */

    function renderImage() {

        const image =
            heroData.image || {};

        const img =
            Utils.$("[data-hero-image]");

        const webp =
            Utils.$("[data-hero-image-webp]");

        if (webp) {

            Utils.setAttribute(
                webp,
                "srcset",
                image.webp || ""
            );

        }

        if (img) {

            Utils.setImage(

                img,

                image.fallback || "",

                image.alt || ""

            );

        }

    }

    /* ======================================================
       Render Highlights
    ====================================================== */

    function renderHighlights() {

        const container =
            Utils.$("#hero-highlights");

        if (!container) return;

        container.innerHTML = "";

        if (!Array.isArray(heroData.highlights)) {

            return;

        }

        heroData.highlights.forEach(item => {

            const li =
                Utils.createElement("li");

            li.className =
                "hero-highlight-item";

            li.textContent = item;

            container.appendChild(li);

        });

    }

    /* ======================================================
       Render Statistics
    ====================================================== */

    function renderStatistics() {

        const grid =
            Utils.$("#hero-stats-grid");

        if (!grid) return;

        grid.innerHTML = "";

        if (!Array.isArray(heroData.statistics)) {

            return;

        }

        heroData.statistics.forEach(stat => {

            const card =
                Utils.createElement(
                    "div",
                    "hero-stat-card"
                );

            const number =
                Utils.createElement(
                    "h3",
                    "hero-stat-number"
                );

            const label =
                Utils.createElement(
                    "p",
                    "hero-stat-label"
                );

            Utils.setText(
                number,
                stat.number || ""
            );

            Utils.setText(
                label,
                stat.label || ""
            );

            card.appendChild(number);
            card.appendChild(label);

            grid.appendChild(card);

        });

    }

    /* ======================================================
       Public API
    ====================================================== */

    return {

        initialize

    };

})();