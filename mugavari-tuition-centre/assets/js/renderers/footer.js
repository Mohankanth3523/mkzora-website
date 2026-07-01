/**
 * ==========================================================
 * FOOTER RENDERER
 * File: assets/js/renderers/footer.js
 * ==========================================================
 */

"use strict";

const FooterRenderer = (() => {

    /* ======================================================
       STATE
    ====================================================== */

    let footerData = {};
    let siteData = {};
    let navigationData = [];
    let coursesData = [];
    let contactData = {};
    let socialData = [];

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
                "Footer Renderer Initialized."
            );

        }

        catch (error) {

            Utils.error(
                "Footer Renderer Error",
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

        footerData =
            siteConfig?.footer || {};

        siteData =
            siteConfig?.site || {};

        navigationData =
            Loader.getJSON("navigation") || [];

        const courses =
            Loader.getJSON("courses");

        coursesData =
            courses?.courses || [];

        contactData =
            Loader.getJSON("contact") || {};

        socialData =
            Loader.getJSON("socialLinks") || [];

    }

    /* ======================================================
       CACHE ELEMENTS
    ====================================================== */

    function cacheElements() {

        elements.logo =
            Utils.$("[data-footer-logo]");

        elements.description =
            Utils.$("[data-footer-description]");

        elements.navigationTitle =
            Utils.$("[data-navigation-title]");

        elements.navigation =
            Utils.$("[data-footer-navigation]");

        elements.courseTitle =
            Utils.$("[data-course-title]");

        elements.courses =
            Utils.$("[data-footer-courses]");

        elements.contactHeading =
            Utils.$("[data-contact-heading]");

        elements.address =
            Utils.$("[data-footer-address]");

        elements.phone =
            Utils.$("[data-footer-phone]");

        elements.phoneLink =
            Utils.$("[data-footer-phone-link]");

        elements.email =
            Utils.$("[data-footer-email]");

        elements.emailLink =
            Utils.$("[data-footer-email-link]");

        elements.social =
            Utils.$("[data-footer-social]");

        elements.copyright =
            Utils.$("[data-footer-copyright]");

        elements.developerLabel =
            Utils.$("[data-developed-label]");

        elements.developerName =
            Utils.$("[data-developed-name]");

        elements.developerLink =
            Utils.$("[data-developed-link]");

        elements.backToTop =
            document.getElementById(
                "back-to-top"
            );

    }

    /* ======================================================
       RENDER
    ====================================================== */

    function render() {

        renderBrand();

        renderFooterTitles();

        renderDeveloper();

        renderCopyright();

    }

    /* ======================================================
       BRAND
    ====================================================== */

    function renderBrand() {

        if (elements.logo) {

            elements.logo.src =
                siteData?.branding?.footer ||
                siteData?.branding?.logo ||
                "";

            elements.logo.alt =
                siteData.name || "";

        }

        Utils.setText(

            elements.description,

            footerData.description || ""

        );

    }

    /* ======================================================
       FOOTER TITLES
    ====================================================== */

    function renderFooterTitles() {

        Utils.setText(

            elements.navigationTitle,

            footerData.navigationTitle || ""

        );

        Utils.setText(

            elements.courseTitle,

            footerData.courseTitle || ""

        );

        Utils.setText(

            elements.contactHeading,

            footerData.contactTitle || ""

        );

    }
        /* ======================================================
       NAVIGATION LINKS
    ====================================================== */

    function renderNavigation() {

        if (!elements.navigation) {

            return;

        }

        elements.navigation.innerHTML = "";

        navigationData.forEach(item => {

            const listItem =
                Utils.createElement(
                    "li",
                    "footer-link-item"
                );

            const link =
                Utils.createElement(
                    "a",
                    "footer-link"
                );

            Utils.setText(
                link,
                item.title || ""
            );

            Utils.setAttribute(
                link,
                "href",
                item.url || "#"
            );

            listItem.appendChild(link);

            elements.navigation.appendChild(
                listItem
            );

        });

    }

    /* ======================================================
       COURSES
    ====================================================== */

    function renderCourses() {

        if (!elements.courses) {

            return;

        }

        elements.courses.innerHTML = "";

        coursesData.forEach(course => {

            const listItem =
                Utils.createElement(
                    "li",
                    "footer-link-item"
                );

            const link =
                Utils.createElement(
                    "a",
                    "footer-link"
                );

            Utils.setText(
                link,
                course.title || ""
            );

            Utils.setAttribute(
                link,
                "href",
                course.buttons?.details?.url || "#"
            );

            listItem.appendChild(link);

            elements.courses.appendChild(
                listItem
            );

        });

    }

    /* ======================================================
       CONTACT INFORMATION
    ====================================================== */

    function renderContact() {

        Utils.setText(
            elements.address,
            contactData.address || ""
        );

        Utils.setText(
            elements.phone,
            contactData.phone || ""
        );

        Utils.setText(
            elements.email,
            contactData.email || ""
        );

        Utils.setAttribute(
            elements.phoneLink,
            "href",
            contactData.phone
                ? `tel:${contactData.phone}`
                : "#"
        );

        Utils.setAttribute(
            elements.emailLink,
            "href",
            contactData.email
                ? `mailto:${contactData.email}`
                : "#"
        );

    }

    /* ======================================================
       SOCIAL LINKS
    ====================================================== */

    function renderSocialLinks() {

        if (!elements.social) {

            return;

        }

        elements.social.innerHTML = "";

        socialData.forEach(item => {

            const link =
                Utils.createElement(
                    "a",
                    "footer-social-link"
                );

            Utils.setAttribute(
                link,
                "href",
                item.url || "#"
            );

            Utils.setAttribute(
                link,
                "target",
                "_blank"
            );

            Utils.setAttribute(
                link,
                "rel",
                "noopener noreferrer"
            );

            Utils.setAttribute(
                link,
                "aria-label",
                item.name || "Social Link"
            );

            Utils.setText(
                link,
                item.name || ""
            );

            elements.social.appendChild(
                link
            );

        });

    }
        /* ======================================================
       DEVELOPER
    ====================================================== */

    function renderDeveloper() {

        const developer =
            footerData.developer || {};

        Utils.setText(

            elements.developerLabel,

            developer.label || ""

        );

        Utils.setText(

            elements.developerName,

            developer.name || ""

        );

        Utils.setAttribute(

            elements.developerLink,

            "href",

            developer.url || "#"

        );

    }

    /* ======================================================
       COPYRIGHT
    ====================================================== */

    function renderCopyright() {

        Utils.setText(

            elements.copyright,

            footerData.copyright || ""

        );

    }

    /* ======================================================
       BACK TO TOP
    ====================================================== */

    function initializeBackToTop() {

        if (!elements.backToTop) {

            return;

        }

        elements.backToTop.addEventListener(

            "click",

            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }

        );

    }

    /* ======================================================
       REFRESH
    ====================================================== */

    function refresh() {

        loadData();

        render();

        renderNavigation();

        renderCourses();

        renderContact();

        renderSocialLinks();

    }

    /* ======================================================
       DESTROY
    ====================================================== */

    function destroy() {

        if (elements.navigation) {

            elements.navigation.innerHTML = "";

        }

        if (elements.courses) {

            elements.courses.innerHTML = "";

        }

        if (elements.social) {

            elements.social.innerHTML = "";

        }

        footerData = {};

        siteData = {};

        navigationData = [];

        coursesData = [];

        contactData = {};

        socialData = [];

    }

    /* ======================================================
       INITIAL RENDER
    ====================================================== */

    const originalRender = render;

    render = function () {

        originalRender();

        renderNavigation();

        renderCourses();

        renderContact();

        renderSocialLinks();

        initializeBackToTop();

    };

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        initialize,

        refresh,

        destroy

    };

})();