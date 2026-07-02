/**
 * ==========================================================
 * Mugavari Tuition Centre
 * Forms Module
 * ==========================================================
 * Responsibilities
 * ----------------------------------------------------------
 * • Bind form submission handlers
 * • Integrate with Validation module
 * • Handle form reset
 * • Prevent double submission
 *
 * Dependencies
 * ----------------------------------------------------------
 * • utils.js
 * • modules/validation.js
 * ==========================================================
 */

"use strict";

const Forms = (() => {

    /* ======================================================
       STATE
    ====================================================== */

    const forms = [];

    /* ======================================================
       INITIALIZE
    ====================================================== */

    function initialize() {

        try {

            const allForms =
                document.querySelectorAll(
                    "form[data-validate]"
                );

            allForms.forEach(form => {

                bindForm(form);

                forms.push(form);

            });

            Utils.log(
                "Forms initialized."
            );

        } catch (error) {

            Utils.error(
                "Forms Error",
                error
            );

        }

    }

    /* ======================================================
       BIND FORM
    ====================================================== */

    function bindForm(form) {

        form.addEventListener(

            "submit",

            handleSubmit

        );

        /* Live validation on blur */

        const inputs =
            form.querySelectorAll(
                "input, textarea, select"
            );

        inputs.forEach(input => {

            input.addEventListener(

                "blur",

                () => {

                    if (
                        typeof Validation !== "undefined"
                    ) {

                        const error =
                            Validation.validateField(
                                input,
                                getFieldRules(input)
                            );

                        if (error) {

                            Validation.showError(
                                input,
                                error
                            );

                        } else {

                            Validation.clearError(
                                input
                            );

                        }

                    }

                }

            );

        });

    }

    /* ======================================================
       GET FIELD RULES
    ====================================================== */

    function getFieldRules(input) {

        const rules = {};

        if (input.required) {
            rules.required = true;
        }

        if (input.type === "email") {
            rules.email = true;
        }

        if (input.type === "tel") {
            rules.phone = true;
        }

        if (input.minLength > 0) {
            rules.minLength = input.minLength;
        }

        if (input.maxLength > 0 && input.maxLength < 524288) {
            rules.maxLength = input.maxLength;
        }

        return rules;

    }

    /* ======================================================
       HANDLE SUBMIT
    ====================================================== */

    function handleSubmit(event) {

        event.preventDefault();

        const form = event.target;

        /* Prevent double submission */

        const submitBtn =
            form.querySelector(
                "button[type='submit']"
            );

        if (submitBtn && submitBtn.disabled) {
            return;
        }

        /* Validate if Validation module is available */

        if (typeof Validation !== "undefined") {

            const schema = buildSchema(form);

            const isValid =
                Validation.validateForm(
                    form,
                    schema
                );

            if (!isValid) {
                return;
            }

        }

        /* Disable submit button */

        if (submitBtn) {
            submitBtn.disabled = true;
        }

        Utils.log(
            "Form submitted.",
            new FormData(form)
        );

        /* Re-enable after delay (simulated) */

        setTimeout(() => {

            if (submitBtn) {
                submitBtn.disabled = false;
            }

        }, 2000);

    }

    /* ======================================================
       BUILD SCHEMA
    ====================================================== */

    function buildSchema(form) {

        const schema = {};

        const inputs =
            form.querySelectorAll(
                "input, textarea, select"
            );

        inputs.forEach(input => {

            if (input.name) {

                schema[input.name] =
                    getFieldRules(input);

            }

        });

        return schema;

    }

    /* ======================================================
       PUBLIC API
    ====================================================== */

    return {

        initialize

    };

})();
