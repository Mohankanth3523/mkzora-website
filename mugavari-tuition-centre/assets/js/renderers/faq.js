/**
 * ==========================================================
 * FAQ RENDERER
 * File: assets/js/renderers/faq.js
 * ==========================================================
 */

"use strict";

const FAQRenderer = (() => {

    /* ======================================================
       STATE
    ====================================================== */

    let sectionData = {};
    let faqItems = [];

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
                "FAQ Renderer Initialized."
            );

        }

        catch (error) {

            Utils.error(
                "FAQ Renderer Error",
                error
            );

        }

    }

    /* ======================================================
       LOAD DATA
    ====================================================== */

    function loadData() {

        const data =
            Loader.getJSON("faq");

        if (!data) {

            Utils.warn(
                "faq.json not found."
            );

            return;

        }

        sectionData =
            data.section || {};

        faqItems =
            Array.isArray(data.faq)
                ? data.faq
                : [];

    }

    /* ======================================================
       CACHE ELEMENTS
    ====================================================== */

    function cacheElements() {

        elements.badge =
            Utils.$("[data-faq-badge]");

        elements.title =
            Utils.$("[data-faq-title]");

        elements.description =
            Utils.$("[data-faq-description]");

        elements.container =
            Utils.$("[data-faq-container]");

        elements.template =
            document.getElementById(
                "faq-item-template"
            );

    }

    /* ======================================================
       RENDER
    ====================================================== */

    function render() {

        renderSection();

        renderFAQItems();

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
       FAQ ITEMS
    ====================================================== */

    function renderFAQItems() {

        if (
            !elements.container ||
            !elements.template
        ) {

            Utils.warn(
                "FAQ container or template missing."
            );

            return;

        }

        elements.container.innerHTML = "";

        faqItems
            .sort((a, b) =>
                a.displayOrder - b.displayOrder
            )
            .forEach((item, index) => {

                const fragment =
                    createFAQItem(
                        item,
                        index
                    );

                elements.container.appendChild(
                    fragment
                );

            });

    }

    /* ======================================================
       CREATE FAQ ITEM
    ====================================================== */

    function createFAQItem(
        item,
        index
    ) {

        const fragment =
            elements.template.content.cloneNode(
                true
            );

        const toggle =
            fragment.querySelector(
                "[data-faq-toggle]"
            );

        const question =
            fragment.querySelector(
                "[data-faq-question]"
            );

        const answer =
            fragment.querySelector(
                "[data-faq-answer]"
            );

        const answerWrapper =
            fragment.querySelector(
                ".faq-answer"
            );

        const questionId =
            `faq-question-${index}`;

        const answerId =
            `faq-answer-${index}`;

        if (toggle) {

            toggle.id =
                questionId;

            toggle.setAttribute(
                "aria-controls",
                answerId
            );

        }

        if (answerWrapper) {

            answerWrapper.id =
                answerId;

            answerWrapper.setAttribute(
                "aria-labelledby",
                questionId
            );

        }

        Utils.setText(
            question,
            item.question || ""
        );

        Utils.setText(
            answer,
            item.answer || ""
        );

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

        faqItems = [];

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