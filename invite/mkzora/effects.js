/*==================================================
MKZORA Luxury Wedding
effects.js
Premium Visual Effects
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================
    HERO PARALLAX
    =====================================*/

    const hero = document.querySelector(".hero");

    window.addEventListener("scroll", () => {

        if (!hero) return;

        const y = window.scrollY;

        hero.style.backgroundPosition =
            `center ${y * 0.35}px`;

    });

    /*=====================================
    FLOATING CARDS
    =====================================*/

    document.querySelectorAll(

        ".couple-card,.invite-card,.detail-card,.family-card,.venue-card"

    ).forEach((card, index) => {

        card.animate([

            {
                transform: "translateY(0px)"
            },

            {
                transform: "translateY(-10px)"
            },

            {
                transform: "translateY(0px)"
            }

        ], {

            duration: 3500 + index * 300,

            iterations: Infinity,

            easing: "ease-in-out"

        });

    });

    /*=====================================
    CURSOR GLOW
    =====================================*/

    const glow = document.createElement("div");

    glow.id = "cursorGlow";

    document.body.appendChild(glow);

    document.addEventListener("mousemove", e => {

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    });

    /*=====================================
    BUTTON RIPPLE
    =====================================*/

    document.querySelectorAll(".gold-btn")

    .forEach(button => {

        button.addEventListener("click", e => {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = button.getBoundingClientRect();

            ripple.style.left =
                e.clientX - rect.left + "px";

            ripple.style.top =
                e.clientY - rect.top + "px";

            button.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 700);

        });

    });

    /*=====================================
    TYPEWRITER
    =====================================*/

    const title = document.querySelector(".hero h3");

    if (title) {

        const text = title.innerText;

        title.innerHTML = "";

        let i = 0;

        const typing = setInterval(() => {

            title.innerHTML += text.charAt(i);

            i++;

            if (i >= text.length)

                clearInterval(typing);

        }, 70);

    }

    /*=====================================
    HEARTS ON CLICK
    =====================================*/

    document.addEventListener("click", e => {

        const heart = document.createElement("div");

        heart.className = "click-heart";

        heart.innerHTML = "❤";

        heart.style.left = e.pageX + "px";

        heart.style.top = e.pageY + "px";

        document.body.appendChild(heart);

        setTimeout(() => {

            heart.remove();

        }, 1500);

    });

    /*=====================================
    IMAGE HOVER ZOOM
    =====================================*/

    document.querySelectorAll("img")

    .forEach(img => {

        img.addEventListener("mouseenter", () => {

            img.style.transform = "scale(1.05)";

        });

        img.addEventListener("mouseleave", () => {

            img.style.transform = "scale(1)";

        });

    });

    /*=====================================
    RANDOM SPARKLE
    =====================================*/

    setInterval(() => {

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.style.left =
            Math.random() * window.innerWidth + "px";

        sparkle.style.top =
            Math.random() * window.innerHeight + "px";

        document.body.appendChild(sparkle);

        setTimeout(() => {

            sparkle.remove();

        }, 2500);

    }, 300);

});