/*=========================================================
    Baby Shower Invitation Website
    script.js
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    createBalloons();
    createStars();
    createSparkles();
    createConfetti();

});

/*=========================================================
    Helpers
=========================================================*/

function random(min, max) {

    return Math.random() * (max - min) + min;

}

/*=========================================================
    Floating Balloons
=========================================================*/

function createBalloons() {

    const container = document.querySelector(".floating-elements");

    if (!container) return;

    const colors = [
        "#ffd6e8",
        "#d7f1ff",
        "#e8dcff",
        "#fff6c8"
    ];

    for (let i = 0; i < 12; i++) {

        const balloon = document.createElement("div");

        balloon.className = "balloon";

        balloon.innerHTML = "🎈";

        balloon.style.left = random(0, 100) + "%";

        balloon.style.fontSize = random(30, 60) + "px";

        balloon.style.animationDuration = random(12, 25) + "s";

        balloon.style.animationDelay = random(0, 10) + "s";

        balloon.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(balloon);

    }

}

/*=========================================================
    Stars
=========================================================*/

function createStars() {

    const container = document.querySelector(".floating-elements");

    if (!container) return;

    for (let i = 0; i < 35; i++) {

        const star = document.createElement("div");

        star.className = "star";

        star.innerHTML = "✨";

        star.style.left = random(0, 100) + "%";

        star.style.top = random(0, 100) + "%";

        star.style.fontSize = random(10, 24) + "px";

        star.style.animationDelay = random(0, 5) + "s";

        container.appendChild(star);

    }

}

/*=========================================================
    Sparkles
=========================================================*/

function createSparkles() {

    const container = document.querySelector(".floating-elements");

    if (!container) return;

    for (let i = 0; i < 20; i++) {

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.style.left = random(0, 100) + "%";

        sparkle.style.top = random(0, 100) + "%";

        sparkle.style.animationDelay = random(0, 4) + "s";

        sparkle.style.animationDuration = random(2, 5) + "s";

        container.appendChild(sparkle);

    }

}

/*=========================================================
    Confetti
=========================================================*/

function createConfetti() {

    const container = document.querySelector(".floating-elements");

    if (!container) return;

    const colors = [
        "#ffd6e8",
        "#d7f1ff",
        "#e8dcff",
        "#fff6c8",
        "#ffffff"
    ];

    for (let i = 0; i < 40; i++) {

        const confetti = document.createElement("div");

        confetti.className = "confetti";

        confetti.style.left = random(0, 100) + "%";

        confetti.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.animationDuration =
            random(8, 18) + "s";

        confetti.style.animationDelay =
            random(0, 12) + "s";

        container.appendChild(confetti);

    }

}
/*=========================================================
    Scroll Reveal Animation
=========================================================*/

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(
    ".hero, .parent-card, .detail, .message-card, .footer"
).forEach(element => {

    if (
        element.classList.contains("parent-card")
    ) {

        element.classList.add("fade-up");

    } else if (
        element.classList.contains("detail")
    ) {

        element.classList.add("zoom-in");

    } else if (
        element.classList.contains("message-card")
    ) {

        element.classList.add("fade-up");

    } else {

        element.classList.add("fade-up");

    }

    observer.observe(element);

});


/*=========================================================
    Music Toggle
=========================================================*/

const musicButton = document.getElementById("musicToggle");
const music = document.getElementById("bgMusic");

if (musicButton && music) {

    let playing = false;

    music.volume = 0.4;

    musicButton.addEventListener("click", () => {

        if (playing) {

            music.pause();

            musicButton.innerHTML = "♪";

            musicButton.classList.remove("playing");

        } else {

            music.play();

            musicButton.innerHTML = "❚❚";

            musicButton.classList.add("playing");

        }

        playing = !playing;

    });

}


/*=========================================================
    Hero Floating Effect
=========================================================*/

const heroImage = document.querySelector(".hero-illustration img");

if (heroImage) {

    document.addEventListener("mousemove", (e) => {

        const x = (e.clientX / window.innerWidth - 0.5) * 16;

        const y = (e.clientY / window.innerHeight - 0.5) * 16;

        heroImage.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}


/*=========================================================
    Smooth Scroll (Anchor Links)
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: "smooth"

        });

    });

});


/*=========================================================
    Card Hover Glow
=========================================================*/

document.querySelectorAll(
    ".parent-card, .detail, .message-card"
).forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/*=========================================================
    Music Button Pulse
=========================================================*/

if (musicButton) {

    setInterval(() => {

        if (!musicButton.classList.contains("playing")) {

            musicButton.animate([

                {

                    transform: "scale(1)"

                },

                {

                    transform: "scale(1.08)"

                },

                {

                    transform: "scale(1)"

                }

            ], {

                duration: 1500

            });

        }

    }, 3000);

}


/*=========================================================
    Performance
=========================================================*/

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/*=========================================================
    Console
=========================================================*/

console.log(

`🎉 Baby Shower Invitation
Designed by MKZORA`

);