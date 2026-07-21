/**
 * =====================================================
 * Mugavari Tuition Centre
 * FAQ Module
 * =====================================================
 */

"use strict";

const FAQ = (() => {

    let faqData = null;

    let faqContainer = null;

    /* =====================================================
       Initialize
    ===================================================== */

    function initialize() {

        faqData = window.AppData.faq;

        faqContainer = Utils.$("#faq-container");

        if (!faqData || !faqContainer) {

            return;

        }

        renderSection();

        renderFAQItems();

        bindEvents();

    }

    /* =====================================================
       Section Content
    ===================================================== */

    function renderSection() {

        Utils.setText(

            Utils.$("[data-faq-section-badge]"),

            faqData.section.badge

        );

        Utils.setText(

            Utils.$("[data-faq-section-title]"),

            faqData.section.title

        );

        Utils.setText(

            Utils.$("[data-faq-section-description]"),

            faqData.section.description

        );

    }

    /* =====================================================
       FAQ Items
    ===================================================== */

    function renderFAQItems() {

        Utils.clearElement(faqContainer);

        const items = [...faqData.faq]

            .sort((a, b) => a.displayOrder - b.displayOrder);

        items.forEach((item, index) => {

            const article = createFAQItem(item, index);

            faqContainer.appendChild(article);

        });

    }

    /* =====================================================
       Create Item
    ===================================================== */

    function createFAQItem(item, index) {

        const article = Utils.createElement("article", "faq-item");

        article.dataset.faqItem = "";

        const heading = Utils.createElement("h3", "faq-heading");

        const button = Utils.createElement("button", "faq-question");

        button.type = "button";

        button.dataset.faqToggle = "";

        button.setAttribute("aria-expanded", "false");

        button.setAttribute("aria-controls", `faq-answer-${index}`);

        button.id = `faq-question-${index}`;

        const question = Utils.createElement("span", "faq-question-text");

        question.textContent = item.question;

        const icon = Utils.createElement("span", "faq-icon");

        icon.innerHTML = "+";

        button.append(question, icon);

        heading.appendChild(button);

        const answer = Utils.createElement("div", "faq-answer");

        answer.id = `faq-answer-${index}`;

        answer.hidden = true;

        answer.setAttribute("role", "region");

        answer.setAttribute(

            "aria-labelledby",

            `faq-question-${index}`

        );

        const content = Utils.createElement(

            "div",

            "faq-answer-content"

        );

        content.textContent = item.answer;

        answer.appendChild(content);

        article.append(heading, answer);

        return article;

    }

    /* =====================================================
       Events
    ===================================================== */

    function bindEvents() {

        faqContainer.addEventListener(

            "click",

            event => {

                const button = event.target.closest(

                    "[data-faq-toggle]"

                );

                if (!button) return;

                toggleItem(button);

            }

        );

        faqContainer.addEventListener(

            "keydown",

            event => {

                if (

                    event.key === "Enter" ||

                    event.key === " "

                ) {

                    const button = event.target.closest(

                        "[data-faq-toggle]"

                    );

                    if (!button) return;

                    event.preventDefault();

                    toggleItem(button);

                }

            }

        );

    }

    /* =====================================================
       Toggle
    ===================================================== */

    function toggleItem(button) {

        const expanded =

            button.getAttribute("aria-expanded") === "true";

        const answer = Utils.$(

            `#${button.getAttribute("aria-controls")}`

        );

        button.setAttribute(

            "aria-expanded",

            !expanded

        );

        answer.hidden = expanded;

    }

    /* =====================================================
       Public API
    ===================================================== */

    return {

        initialize

    };

})();