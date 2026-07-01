/**
 * ==========================================================
 * VALIDATION MODULE
 * File: assets/js/modules/validation.js
 * ==========================================================
 * Features:
 * - Required field validation
 * - Email validation
 * - Phone validation
 * - Min/max length checks
 * - Error message handling
 * ==========================================================
 */

"use strict";

const Validation = (() => {

    /* ======================================================
       RULES
    ====================================================== */

    const patterns = {

        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

        phone: /^[0-9]{10}$/

    };

    /* ======================================================
       VALIDATE FIELD
    ====================================================== */

    function validateField(
        input,
        rules = {}
    ) {

        const value =
            input.value.trim();

        const name =
            input.name;

        let error =
            "";

        /* REQUIRED */

        if (
            rules.required &&
            !value
        ) {

            return `${name} is required`;

        }

        /* EMAIL */

        if (
            rules.email &&
            value &&
            !patterns.email.test(
                value
            )
        ) {

            return "Invalid email format";

        }

        /* PHONE */

        if (
            rules.phone &&
            value &&
            !patterns.phone.test(
                value
            )
        ) {

            return "Invalid phone number";

        }

        /* MIN LENGTH */

        if (
            rules.minLength &&
            value.length <
            rules.minLength
        ) {

            return `Minimum ${rules.minLength} characters required`;

        }

        /* MAX LENGTH */

        if (
            rules.maxLength &&
            value.length >
            rules.maxLength
        ) {

            return `Maximum ${rules.maxLength} characters allowed`;

        }

        return error;

    }

    /* ======================================================
       SHOW ERROR
    ====================================================== */

    function showError(
        input,
        message
    ) {

        const errorElement =
            input.parentElement.querySelector(
                ".form-error"
            );

        if (errorElement) {

            errorElement.textContent =
                message;

        }

        input.classList.add(
            "error"
        );

    }

    /* ======================================================
       CLEAR ERROR
    ====================================================== */

    function clearError(
        input
    ) {

        const errorElement =
            input.parentElement.querySelector(
                ".form-error"
            );

        if (errorElement) {

            errorElement.textContent =
                "";

        }

        input.classList.remove(
            "error"
        );

    }

    /* ======================================================
       VALIDATE FORM
    ====================================================== */

    function validateForm(
        form,
        schema = {}
    ) {

        let isValid =
            true;

        const inputs =
            form.querySelectorAll(
                "input, textarea, select"
            );

        inputs.forEach(input => {

            const rules =
                schema[input.name] ||
                {};

            const error =
                validateField(
                    input,
                    rules
                );

            if (error) {

                isValid = false;

                showError(
                    input,
                    error
                );

            } else {

                clearError(
                    input
                );

            }

        });

        return isValid;

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        validateField,
        validateForm,
        showError,
        clearError

    };

})();