/* ==========================================
   FLOATING HEARTS
========================================== */

const heartsContainer = document.querySelector(".hearts-container");

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (20 + Math.random() * 40) + "px";

    heart.style.animationDuration = (6 + Math.random() * 8) + "s";

    heart.style.opacity = Math.random();

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 15000);

}

setInterval(createHeart, 350);


/* ==========================================
   SPARKLES
========================================== */

const sparkleContainer = document.querySelector(".sparkles");

function createSparkle() {

    const sparkle = document.createElement("div");

    sparkle.classList.add("sparkle");

    sparkle.style.left = Math.random() * window.innerWidth + "px";

    sparkle.style.top = Math.random() * window.innerHeight + "px";

    sparkle.style.animationDuration = (2 + Math.random() * 3) + "s";

    sparkleContainer.appendChild(sparkle);

    setTimeout(() => {

        sparkle.remove();

    }, 5000);

}

setInterval(createSparkle, 250);


/* ==========================================
   PHOTO FADE IN
========================================== */

const photoCards = document.querySelectorAll(".photo-card");

const photoObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.25

});

photoCards.forEach(card => {

    photoObserver.observe(card);

});


/* ==========================================
   HEART EXPLOSION ON CLICK
========================================== */

document.addEventListener("click", function (e) {

    for (let i = 0; i < 12; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "❤️";

        heart.style.position = "fixed";

        heart.style.left = e.clientX + "px";

        heart.style.top = e.clientY + "px";

        heart.style.pointerEvents = "none";

        heart.style.fontSize = (16 + Math.random() * 20) + "px";

        heart.style.zIndex = "9999";

        heart.style.transition = "all 1.2s ease-out";

        document.body.appendChild(heart);

        const x = (Math.random() - 0.5) * 300;
        const y = (Math.random() - 0.5) * 300;

        requestAnimationFrame(() => {

            heart.style.transform =
                `translate(${x}px, ${y}px) scale(0) rotate(${Math.random() * 720}deg)`;

            heart.style.opacity = "0";

        });

        setTimeout(() => {

            heart.remove();

        }, 1200);

    }

});


/* ==========================================
   HERO HEART PULSE
========================================== */

const heroHeart = document.querySelector(".hero-heart");

setInterval(() => {

    heroHeart.animate([

        {
            transform: "scale(1)"
        },

        {
            transform: "scale(1.35)"
        },

        {
            transform: "scale(1)"
        }

    ], {

        duration: 1000

    });

}, 1800);


/* ==========================================
   GLOW TITLE
========================================== */

const title = document.querySelector(".main-title span");

let glow = true;

setInterval(() => {

    if (glow) {

        title.style.color = "#ffffff";

        title.style.textShadow =
            "0 0 20px #fff,0 0 40px #ff1744";

    }

    else {

        title.style.color = "#ffe4ec";

        title.style.textShadow =
            "0 0 10px white";

    }

    glow = !glow;

}, 1200);


/* ==========================================
   PARALLAX HERO
========================================== */

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    hero.style.backgroundPositionY =
        window.scrollY * 0.4 + "px";

});

/* ==========================================
   MUSIC BUTTON
========================================== */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {

    if (!music) return;

    if (isPlaying) {

        music.pause();
        musicBtn.innerHTML = "🎵";

    } else {

        music.play().catch(() => {});
        musicBtn.innerHTML = "⏸️";

    }

    isPlaying = !isPlaying;

});


/* ==========================================
   SCROLL TO TOP BUTTON
========================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

});


/* ==========================================
   LETTER FADE-UP ON SCROLL
========================================== */

const letterParagraphs = document.querySelectorAll(".message p");

const letterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "all 1s ease";

        }

    });

}, {

    threshold: 0.2

});

letterParagraphs.forEach(p => {

    letterObserver.observe(p);

});


/* ==========================================
   FLOATING LOVE QUOTES
========================================== */

const quotes = [

    "❤️ I Love You ❤️",
    "💕 Forever Together 💕",
    "💖 My Favourite Person 💖",
    "🌹 You Are My Happiness 🌹",
    "💞 Happy Birthday 💞"

];

function floatingQuote() {

    const quote = document.createElement("div");

    quote.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];

    quote.style.position = "fixed";

    quote.style.left = Math.random() * 80 + "vw";

    quote.style.top = "100vh";

    quote.style.fontSize = "22px";

    quote.style.fontWeight = "600";

    quote.style.color = "white";

    quote.style.pointerEvents = "none";

    quote.style.zIndex = "999";

    quote.style.transition = "transform 8s linear, opacity 8s linear";

    document.body.appendChild(quote);

    requestAnimationFrame(() => {

        quote.style.transform = "translateY(-120vh)";
        quote.style.opacity = "0";

    });

    setTimeout(() => {

        quote.remove();

    }, 8000);

}

setInterval(floatingQuote, 5000);


/* ==========================================
   AUTO HEART BURST
========================================== */

function heartBurst() {

    for (let i = 0; i < 25; i++) {

        const heart = document.createElement("div");

        heart.innerHTML = "❤️";

        heart.style.position = "fixed";

        heart.style.left = "50%";

        heart.style.top = "50%";

        heart.style.fontSize = (18 + Math.random() * 25) + "px";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "9999";

        document.body.appendChild(heart);

        const angle = Math.random() * Math.PI * 2;
        const distance = 120 + Math.random() * 250;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        heart.animate([

            {

                transform: "translate(0,0) scale(1)",
                opacity: 1

            },

            {

                transform: `translate(${x}px,${y}px) scale(0)`,
                opacity: 0

            }

        ], {

            duration: 1800,
            easing: "ease-out"

        });

        setTimeout(() => {

            heart.remove();

        }, 1800);

    }

}

setTimeout(heartBurst, 1200);


/* ==========================================
   HERO BUTTON RIPPLE
========================================== */

const loveBtn = document.querySelector(".btn-love");

loveBtn.addEventListener("mouseenter", () => {

    loveBtn.animate([

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

        duration: 500

    });

});


/* ==========================================
   PHOTO HOVER EFFECT
========================================== */

photoCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "scale(1.05) rotate(1deg)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ==========================================
   PAGE LOAD ANIMATION
========================================== */

window.addEventListener("load", () => {

    document.body.animate(

        [

            {

                opacity: 0

            },

            {

                opacity: 1

            }

        ],

        {

            duration: 1200,
            fill: "forwards"

        }

    );

});


/* ==========================================
   TYPEWRITER SUBTITLE
========================================== */

const subtitle = document.querySelector(".subtitle");

const originalText = subtitle.textContent;

subtitle.textContent = "";

let index = 0;

function typeWriter() {

    if (index < originalText.length) {

        subtitle.textContent += originalText.charAt(index);

        index++;

        setTimeout(typeWriter, 45);

    }

}

typeWriter();


/* ==========================================
   TITLE BLINK HEART
========================================== */

setInterval(() => {

    document.title = "❤️ Happy Birthday ❤️";

    setTimeout(() => {

        document.title = "Happy Birthday My Puna Kutty ❤️";

    }, 700);

}, 2000);


/* ==========================================
   FINISHED
========================================== */

console.log("❤️ Birthday Website Loaded Successfully ❤️");