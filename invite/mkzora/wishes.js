/*==================================================
MKZORA Luxury Wedding
wishes.js
Guest Wishes - Local Storage
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("wishForm");
    const wishList = document.getElementById("wishList");

    if (!form || !wishList) return;

    const STORAGE_KEY = "mkzoraWeddingWishes";

    /*=================================
    LOAD WISHES
    =================================*/

    loadWishes();

    /*=================================
    SUBMIT
    =================================*/

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const nameInput =
            form.querySelector("input");

        const messageInput =
            form.querySelector("textarea");

        const name =
            nameInput.value.trim();

        const message =
            messageInput.value.trim();

        if (!name || !message) return;

        const wish = {

            id: Date.now(),

            name,

            message,

            time: new Date().toLocaleString()

        };

        const wishes = getWishes();

        wishes.unshift(wish);

        saveWishes(wishes);

        addWishCard(wish, true);

        form.reset();

    });

    /*=================================
    GET
    =================================*/

    function getWishes() {

        return JSON.parse(

            localStorage.getItem(STORAGE_KEY)

        ) || [];

    }

    /*=================================
    SAVE
    =================================*/

    function saveWishes(wishes) {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(wishes)

        );

    }

    /*=================================
    LOAD
    =================================*/

    function loadWishes() {

        wishList.innerHTML = "";

        getWishes().forEach(wish => {

            addWishCard(wish);

        });

    }

    /*=================================
    CARD
    =================================*/

    function addWishCard(wish, animate = false) {

        const card =
            document.createElement("div");

        card.className = "wish-card";

        if (animate)

            card.classList.add("new");

        card.innerHTML = `

            <div class="wish-header">

                <div class="wish-avatar">

                    ${wish.name.charAt(0).toUpperCase()}

                </div>

                <div>

                    <h3>${escapeHtml(wish.name)}</h3>

                    <span>${wish.time}</span>

                </div>

            </div>

            <p>

                ${escapeHtml(wish.message)}

            </p>

        `;

        wishList.prepend(card);

        card.scrollIntoView({

            behavior: "smooth",

            block: "nearest"

        });

    }

    /*=================================
    ESCAPE HTML
    =================================*/

    function escapeHtml(text) {

        const div =

            document.createElement("div");

        div.innerText = text;

        return div.innerHTML;

    }

});
const clearBtn = document.getElementById("clearWishes");

if (clearBtn) {

    clearBtn.addEventListener("click", () => {

        if (confirm("Delete all wishes?")) {

            localStorage.removeItem("mkzoraWeddingWishes");

            wishList.innerHTML = "";

        }

    });

}