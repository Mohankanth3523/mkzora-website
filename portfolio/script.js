// ==========================
// SCROLL REVEAL ANIMATION
// ==========================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    reveals.forEach((item) => {

        const windowHeight = window.innerHeight;

        const revealTop =
            item.getBoundingClientRect().top;

        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();


// ==========================
// PARALLAX EFFECT
// PROJECT 2 IMAGE
// ==========================

const parallax =
    document.querySelector(".parallax-image img");

window.addEventListener("scroll", () => {

    if (!parallax) return;

    const scrollY = window.pageYOffset;

    parallax.style.transform =
        `translateY(${scrollY * 0.08}px) scale(1.05)`;

});


// ==========================
// CURSOR GLOW EFFECT
// ==========================

const glow =
    document.createElement("div");

glow.classList.add("cursor-glow");

document.body.appendChild(glow);

document.addEventListener(
    "mousemove",
    (e) => {

        glow.style.left =
            e.clientX + "px";

        glow.style.top =
            e.clientY + "px";

    }
);


// ==========================
// GALLERY LIGHTBOX
// ==========================

const galleryImages =
    document.querySelectorAll(".gallery img");

galleryImages.forEach((img) => {

    img.addEventListener(
        "click",
        () => {

            const overlay =
                document.createElement("div");

            overlay.classList.add("lightbox");

            overlay.innerHTML = `

                <img src="${img.src}">
                <span class="close-lightbox">×</span>

            `;

            document.body.appendChild(
                overlay
            );

            overlay.addEventListener(
                "click",
                () => {

                    overlay.remove();

                }
            );

        }
    );

});


// ==========================
// HERO FLOATING EFFECT
// ==========================

const heroCard =
    document.querySelector(".glass-card");

if (heroCard) {

    document.addEventListener(
        "mousemove",
        (e) => {

            const x =
                (window.innerWidth / 2 -
                    e.pageX) / 40;

            const y =
                (window.innerHeight / 2 -
                    e.pageY) / 40;

            heroCard.style.transform =

                `rotateY(${x}deg)
                 rotateX(${-y}deg)
                 scale(1.02)`;

        }
    );

    document.addEventListener(
        "mouseleave",
        () => {

            heroCard.style.transform =
                "rotateY(0deg) rotateX(0deg)";

        }
    );
}


// ==========================
// NUMBER COUNTER
// ==========================

const counters =
    document.querySelectorAll(".counter");

counters.forEach((counter) => {

    counter.innerText = "0";

    const updateCounter = () => {

        const target =
            +counter.getAttribute(
                "data-target"
            );

        const current =
            +counter.innerText;

        const increment =
            target / 80;

        if (current < target) {

            counter.innerText =
                Math.ceil(
                    current + increment
                );

            setTimeout(
                updateCounter,
                25
            );

        } else {

            counter.innerText =
                target;

        }

    };

    updateCounter();

});


// ==========================
// SMOOTH NAVIGATION
// ==========================

document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {

        anchor.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                document
                    .querySelector(
                        this.getAttribute(
                            "href"
                        )
                    )
                    .scrollIntoView({

                        behavior: "smooth"

                    });

            }
        );

    });


// ==========================
// RANDOM FLOATING ICONS
// ==========================

const floatingIcons =
    document.querySelectorAll(
        ".floating-icon"
    );

floatingIcons.forEach((icon, index) => {

    setInterval(() => {

        const moveX =
            Math.random() * 20 - 10;

        const moveY =
            Math.random() * 20 - 10;

        icon.style.transform =

            `translate(${moveX}px,
                       ${moveY}px)`;

    }, 2500 + index * 500);

});


// ==========================
// PAGE LOADER
// ==========================

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);