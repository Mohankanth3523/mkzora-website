/* =====================================================
   Component Loader
===================================================== */

async function loadComponent(id, file) {

    try {

        const response = await fetch(file);

        if (!response.ok) {

            throw new Error(`Unable to load ${file}`);

        }

        const html = await response.text();

        document.getElementById(id).innerHTML = html;

    } catch (error) {

        console.error(error);

    }

}

/* =====================================================
   Header
===================================================== */

loadComponent("header", "components/header.html").then(() => {

    /* ---------------------------------------------
       Active Navigation
    --------------------------------------------- */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-menu a").forEach(link => {

        const href = link.getAttribute("href");

        if (href === currentPage) {

            link.setAttribute("aria-current", "page");

        }

    });

    /* ---------------------------------------------
       Mobile Menu
    --------------------------------------------- */

    const toggle = document.getElementById("mobile-menu-toggle");

    const menu = document.getElementById("primary-navigation");

    if (toggle && menu) {

        toggle.addEventListener("click", () => {

            menu.classList.toggle("active");

            const expanded =
                toggle.getAttribute("aria-expanded") === "true";

            toggle.setAttribute("aria-expanded", !expanded);

        });

    }

    /* ---------------------------------------------
       Navigation Dropdown
    --------------------------------------------- */

    document.querySelectorAll(".dropdown-toggle").forEach(button => {

        button.addEventListener("click", () => {

            const parent = button.parentElement;

            parent.classList.toggle("open");

        });

    });

    // Sticky header shadow
    const header = document.querySelector(".site-header");

    window.addEventListener("scroll", () => {

        header.classList.toggle("scrolled", window.scrollY > 10);

    });

});


/* =====================================================
   Footer
===================================================== */

loadComponent("footer", "components/footer.html");