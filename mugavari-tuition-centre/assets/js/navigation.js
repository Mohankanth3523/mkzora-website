/**
 * =====================================================
 * Mugavari Tuition Centre
 * Navigation Module
 * =====================================================
 */

"use strict";

const Navigation = (() => {

    let navigationData = null;

    let desktopNavigation = null;

    let mobileNavigation = null;

    let menuToggle = null;

    let menuClose = null;

    let menuBackdrop = null;

    let mobileMenu = null;

    /* =====================================================
       Initialize
    ===================================================== */

    function initialize() {

        navigationData = window.AppData.navigation;

        if (!navigationData) {

            console.error("Navigation data unavailable.");

            return;

        }

        cacheDOM();

        renderDesktopNavigation();

        renderMobileNavigation();

        renderCTAButtons();

        setActiveNavigation();

        bindEvents();

    }

    /* =====================================================
       Cache DOM
    ===================================================== */

    function cacheDOM() {

        desktopNavigation = Utils.$("#desktop-navigation");

        mobileNavigation = Utils.$("#mobile-navigation-list");

        menuToggle = Utils.$("#mobile-menu-toggle");

        menuClose = Utils.$("#mobile-menu-close");

        menuBackdrop = Utils.$("#mobile-menu-backdrop");

        mobileMenu = Utils.$("#mobile-navigation");

    }

    /* =====================================================
       Desktop Navigation
    ===================================================== */

    function renderDesktopNavigation() {

        if (!desktopNavigation) return;

        Utils.clearElement(desktopNavigation);

        navigationData.navigation.desktop.forEach(item => {

            const li = Utils.createElement("li", "nav-item");

            const link = Utils.createElement("a", "nav-link");

            link.href = item.url;

            link.target = item.target;

            link.textContent = item.title;

            li.appendChild(link);

            desktopNavigation.appendChild(li);

        });

    }

    /* =====================================================
       Mobile Navigation
    ===================================================== */

    function renderMobileNavigation() {

        if (!mobileNavigation) return;

        Utils.clearElement(mobileNavigation);

        navigationData.navigation.mobile.forEach(item => {

            const li = Utils.createElement("li", "mobile-nav-item");

            const link = Utils.createElement("a", "mobile-nav-link");

            link.href = item.url;

            link.target = item.target;

            link.textContent = item.title;

            li.appendChild(link);

            mobileNavigation.appendChild(li);

        });

    }

    /* =====================================================
       CTA Buttons
    ===================================================== */

    function renderCTAButtons() {

        const desktopCTA = Utils.$("[data-cta-link]");

        const desktopText = Utils.$("[data-cta-text]");

        const mobileCTA = Utils.$("[data-mobile-cta-link]");

        const mobileText = Utils.$("[data-mobile-cta-text]");

        if (desktopCTA) {

            desktopCTA.href = navigationData.navigation.headerButton.url;

        }

        if (desktopText) {

            desktopText.textContent =
                navigationData.navigation.headerButton.text;

        }

        if (mobileCTA) {

            mobileCTA.href = navigationData.navigation.mobileButton.url;

        }

        if (mobileText) {

            mobileText.textContent =
                navigationData.navigation.mobileButton.text;

        }

    }

    /* =====================================================
       Active Navigation
    ===================================================== */

    function setActiveNavigation() {

        const currentPage =
            window.location.pathname.split("/").pop() ||
            "index.html";

        Utils.$$(".nav-link").forEach(link => {

            if (link.getAttribute("href") === currentPage) {

                link.classList.add("active");

                link.setAttribute("aria-current", "page");

            }

        });

        Utils.$$(".mobile-nav-link").forEach(link => {

            if (link.getAttribute("href") === currentPage) {

                link.classList.add("active");

                link.setAttribute("aria-current", "page");

            }

        });

    }

    /* =====================================================
       Events
    ===================================================== */

    function bindEvents() {

        if (menuToggle) {

            menuToggle.addEventListener(

                "click",

                openMenu

            );

        }

        if (menuClose) {

            menuClose.addEventListener(

                "click",

                closeMenu

            );

        }

        if (menuBackdrop) {

            menuBackdrop.addEventListener(

                "click",

                closeMenu

            );

        }

        document.addEventListener(

            "keydown",

            event => {

                if (event.key === "Escape") {

                    closeMenu();

                }

            }

        );

    }

    /* =====================================================
       Open Menu
    ===================================================== */

    function openMenu() {

        mobileMenu.classList.add("is-open");

        menuBackdrop.hidden = false;

        menuToggle.setAttribute(

            "aria-expanded",

            "true"

        );

    }

    /* =====================================================
       Close Menu
    ===================================================== */

    function closeMenu() {

        mobileMenu.classList.remove("is-open");

        menuBackdrop.hidden = true;

        menuToggle.setAttribute(

            "aria-expanded",

            "false"

        );

    }

    /* =====================================================
       Public API
    ===================================================== */

    return {

        initialize

    };

})();