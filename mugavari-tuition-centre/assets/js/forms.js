// File: assets/js/forms.js

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    initializeForms();

});

function initializeForms() {

    const forms = document.querySelectorAll('form');

    if (!forms.length) {

        return;

    }

    forms.forEach(form => {

        form.addEventListener('submit', event => {

            event.preventDefault();

            if (validateForm(form)) {

                showSuccess(form);

            }

        });

    });

}

function validateForm(form) {

    let valid = true;

    const requiredFields =
        form.querySelectorAll('[required]');

    requiredFields.forEach(field => {

        clearError(field);

        const value = field.value.trim();

        if (!value) {

            showError(
                field,
                'This field is required.'
            );

            valid = false;

            return;

        }

        if (
            field.type === 'email' &&
            !isValidEmail(value)
        ) {

            showError(
                field,
                'Please enter a valid email address.'
            );

            valid = false;

        }

        if (
            field.type === 'tel' &&
            !isValidPhone(value)
        ) {

            showError(
                field,
                'Please enter a valid phone number.'
            );

            valid = false;

        }

    });

    return valid;

}

function showError(field, message) {

    field.setAttribute(
        'aria-invalid',
        'true'
    );

    let error =
        field.parentElement.querySelector('.form-error');

    if (!error) {

        error = document.createElement('small');

        error.className = 'form-error';

        field.parentElement.appendChild(error);

    }

    error.textContent = message;

}

function clearError(field) {

    field.removeAttribute('aria-invalid');

    const error =
        field.parentElement.querySelector('.form-error');

    if (error) {

        error.remove();

    }

}

function showSuccess(form) {

    form.reset();

    alert(
        'Your enquiry has been submitted successfully.'
    );

}

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

function isValidPhone(phone) {

    return /^[0-9+\-\s()]{10,15}$/.test(phone);

}