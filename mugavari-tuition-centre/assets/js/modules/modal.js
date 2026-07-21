/**
 * ==========================================================
 * MODAL MODULE (Advanced)
 * File: assets/js/modules/modal.js
 * ==========================================================
 * Features:
 * - Open / Close modal system
 * - Overlay click close
 * - ESC key close
 * - Focus management (basic accessibility)
 * - Body scroll lock
 * ==========================================================
 */

"use strict";

const Modal = (() => {

    /* ======================================================
       STATE
    ====================================================== */

    let activeModal = null;

    const selectors = {
        modal: "[data-modal]",
        open: "[data-modal-open]",
        close: "[data-modal-close]",
        overlay: "[data-modal-overlay]"
    };

    const classes = {
        active: "active",
        noScroll: "no-scroll"
    };

    /* ======================================================
       INITIALIZE
    ====================================================== */

    function initialize() {

        try {

            bindEvents();

            Utils.log(
                "Modal initialized."
            );

        } catch (error) {

            Utils.error(
                "Modal Error",
                error
            );

        }

    }

    /* ======================================================
       EVENTS
    ====================================================== */

    function bindEvents() {

        document.addEventListener(
            "click",
            handleClick
        );

        document.addEventListener(
            "keydown",
            handleKeydown
        );

    }

    /* ======================================================
       CLICK HANDLER
    ====================================================== */

    function handleClick(e) {

        const openBtn =
            e.target.closest(
                selectors.open
            );

        const closeBtn =
            e.target.closest(
                selectors.close
            );

        const overlay =
            e.target.closest(
                selectors.overlay
            );

        if (openBtn) {

            e.preventDefault();

            openModal(
                openBtn.getAttribute(
                    "data-modal-open"
                )
            );

        }

        if (closeBtn || overlay) {

            closeModal();

        }

    }

    /* ======================================================
       KEYBOARD HANDLER
    ====================================================== */

    function handleKeydown(e) {

        if (e.key === "Escape") {

            closeModal();

        }

    }

    /* ======================================================
       OPEN MODAL
    ====================================================== */

    function openModal(id) {

        const modal =
            document.querySelector(
                `${selectors.modal}[data-modal="${id}"]`
            );

        if (!modal) return;

        activeModal = modal;

        modal.classList.add(
            classes.active
        );

        document.body.classList.add(
            classes.noScroll
        );

        // Focus first focusable element
        const focusable =
            modal.querySelector(
                "button, input, textarea, select, a"
            );

        if (focusable) {

            focusable.focus();

        }

    }

    /* ======================================================
       CLOSE MODAL
    ====================================================== */

    function closeModal() {

        if (!activeModal) return;

        activeModal.classList.remove(
            classes.active
        );

        document.body.classList.remove(
            classes.noScroll
        );

        activeModal = null;

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        initialize,
        open: openModal,
        close: closeModal

    };

})();