/**
 * ==========================================================
 * Mugavari Tuition Centre
 * Loader Module
 * ==========================================================
 * Responsibilities
 * ----------------------------------------------------------
 * • Load HTML Components
 * • Load HTML Templates
 * • Load JSON Data
 * • Cache Resources
 * • Provide Common Loading APIs
 *
 * Dependencies
 * ----------------------------------------------------------
 * • utils.js
 * ==========================================================
 */

"use strict";

const Loader = (() => {

    /* ======================================================
       Resource Cache
    ====================================================== */

    const cache = {

        html: new Map(),

        templates: new Map(),

        json: new Map()

    };

    /* ======================================================
       Fetch Text
    ====================================================== */

    async function fetchText(url) {

        try {

            const response = await fetch(url, {

                cache: "no-cache"

            });

            if (!response.ok) {

                throw new Error(

                    `Unable to load: ${url}`

                );

            }

            return await response.text();

        }

        catch (error) {

            Utils.error(

                "HTML Load Error",

                error

            );

            throw error;

        }

    }

    /* ======================================================
       Fetch JSON
    ====================================================== */

    async function fetchJSON(url) {

        try {

            const response = await fetch(url, {

                cache: "no-cache"

            });

            if (!response.ok) {

                throw new Error(

                    `Unable to load: ${url}`

                );

            }

            return await response.json();

        }

        catch (error) {

            Utils.error(

                "JSON Load Error",

                error

            );

            throw error;

        }

    }

    /* ======================================================
       Cache Helpers
    ====================================================== */

    function setCache(type, key, value) {

        cache[type].set(

            key,

            value

        );

    }

    function getCache(type, key) {

        return cache[type].get(key);

    }

    function hasCache(type, key) {

        return cache[type].has(key);

    }

    /* ======================================================
       Load Layout Component
    ====================================================== */

    async function loadComponent(targetId, filePath) {

        if (!targetId || !filePath) {

            return;

        }

        if (hasCache("html", filePath)) {

            const container = Utils.$(`#${targetId}`);

            if (container) {

                container.innerHTML = getCache(

                    "html",

                    filePath

                );

            }

            return;

        }

        const html = await fetchText(filePath);

        setCache(

            "html",

            filePath,

            html

        );

        const container = Utils.$(`#${targetId}`);

        if (!container) {

            Utils.warn(

                `Container not found: ${targetId}`

            );

            return;

        }

        container.innerHTML = html;

    }

    /* ======================================================
       Load HTML Template
    ====================================================== */

    async function loadTemplate(filePath) {

        if (!filePath) {

            return;

        }

        if (hasCache("templates", filePath)) {

            return;

        }

        const html = await fetchText(filePath);

        const wrapper = document.createElement("div");

        wrapper.innerHTML = html;

        wrapper.querySelectorAll("template").forEach(template => {

            document.body.appendChild(template);

        });

        setCache(

            "templates",

            filePath,

            true

        );

    }

    /* ======================================================
       Load Layout Components
    ====================================================== */

    async function loadLayoutComponents(components) {

        await Promise.all(

            components.map(component =>

                loadComponent(

                    component.target,

                    component.path

                )

            )

        );

    }

    /* ======================================================
       Load Template Components
    ====================================================== */

    async function loadTemplateComponents(templates) {

        await Promise.all(

            templates.map(template =>

                loadTemplate(template)

            )

        );

    }

    /* ======================================================
       Load JSON Files
    ====================================================== */

    async function loadJSONFiles(files) {

        const data = {};

        await Promise.all(

            Object.entries(files).map(

                async ([key, path]) => {

                    const json = await fetchJSON(path);

                    setCache(

                        "json",

                        key,

                        json

                    );

                    data[key] = json;

                }

            )

        );

        return data;

    }

    /* ======================================================
       Initialize Loader
    ====================================================== */

    async function initialize(config) {

        try {

            if (config.layouts) {

                await loadLayoutComponents(

                    config.layouts

                );

            }

            if (config.templates) {

                await loadTemplateComponents(

                    config.templates

                );

            }

            if (config.data) {

                window.AppData =

                    await loadJSONFiles(

                        config.data

                    );

            }

            Utils.log(

                "Loader initialized successfully."

            );

        }

        catch (error) {

            Utils.error(

                "Loader initialization failed.",

                error

            );

            throw error;

        }

    }

    /* ======================================================
       Public API
    ====================================================== */

    return {

        initialize,

        fetchText,

        fetchJSON,

        loadComponent,

        loadTemplate,

        loadLayoutComponents,

        loadTemplateComponents,

        loadJSONFiles,

        getCache,

        hasCache

    };

})();