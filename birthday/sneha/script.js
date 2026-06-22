/* ==========================================
   TYPEWRITER EFFECT
========================================== */

const textLines = [
    "இன்று ஒரு சாதாரண நாள் அல்ல...",
    "இது எங்கள் அன்புக்குரிய தோழியின் பிறந்தநாள்...",
    "இன்று அவளின் புன்னகை இன்னும் அழகாக இருக்க வேண்டிய நாள்..."
];

const typewriter = document.getElementById("typewriter");

let lineIndex = 0;
let charIndex = 0;

function typeEffect() {

    if (!typewriter) return;

    if (lineIndex < textLines.length) {

        if (charIndex < textLines[lineIndex].length) {

            typewriter.innerHTML +=
                textLines[lineIndex].charAt(charIndex);

            charIndex++;

            setTimeout(typeEffect, 70);

        } else {

            typewriter.innerHTML += "<br><br>";

            lineIndex++;
            charIndex = 0;

            setTimeout(typeEffect, 1000);
        }
    }
}

window.addEventListener("load", () => {

    setTimeout(() => {
        typeEffect();
    }, 1000);

});


/* ==========================================
   COUNTER ANIMATION
========================================== */

const counter = document.getElementById("ageCounter");

function animateCounter(target) {

    if (!counter) return;

    let count = 0;

    const speed = 50;

    const update = () => {

        if (count <= target) {

            counter.innerText = count;

            count++;

            setTimeout(update, speed);
        }
    };

    update();
}

/* Change age here */
animateCounter(24);


/* ==========================================
   GIFT BOX SURPRISE
========================================== */

const giftBox =
    document.getElementById("giftBox");

const surpriseMessage =
    document.getElementById("surpriseMessage");

if (giftBox) {

    giftBox.addEventListener("click", () => {

        giftBox.style.transform =
            "scale(1.2) rotate(15deg)";

        setTimeout(() => {

            surpriseMessage.classList.add("show");

        }, 500);

    });

}


/* ==========================================
   BACKGROUND MUSIC
========================================== */

const bgMusic =
    document.getElementById("bgMusic");

let musicStarted = false;

function startMusic() {

    if (!musicStarted && bgMusic) {

        bgMusic.play();

        musicStarted = true;
    }
}

document.addEventListener(
    "click",
    startMusic
);

document.addEventListener(
    "touchstart",
    startMusic
);


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements =
    document.querySelectorAll(
        ".wish-card,.gallery-card,.photo-glow,.counter-box"
    );

const revealObserver =
    new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    }, {
        threshold: 0.2
    });

revealElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(50px)";

    element.style.transition =
        "all 1s ease";

    revealObserver.observe(element);

});


/* ==========================================
   JASMINE FLOWER RAIN
========================================== */

const flowerContainer =
    document.getElementById("flowers");

function createFlower() {

    if (!flowerContainer) return;

    const flower =
        document.createElement("div");

    flower.innerHTML = "🌼";

    flower.style.position = "fixed";

    flower.style.left =
        Math.random() * 100 + "vw";

    flower.style.top = "-30px";

    flower.style.fontSize =
        Math.random() * 15 + 15 + "px";

    flower.style.opacity = ".8";

    flower.style.zIndex = "999";

    flower.style.pointerEvents = "none";

    flower.style.transition =
        "transform linear";

    flowerContainer.appendChild(flower);

    const duration =
        Math.random() * 5000 + 5000;

    flower.animate(
        [
            {
                transform:
                    "translateY(0px) rotate(0deg)"
            },
            {
                transform:
                    `translateY(${window.innerHeight + 100}px) rotate(360deg)`
            }
        ],
        {
            duration: duration
        }
    );

    setTimeout(() => {

        flower.remove();

    }, duration);

}

setInterval(createFlower, 700);
/* ==========================================
   FLOATING GOLDEN PARTICLES
========================================== */

function createGoldenParticle() {

    const particle =
        document.createElement("div");

    particle.style.position = "fixed";

    particle.style.width = "4px";
    particle.style.height = "4px";

    particle.style.borderRadius = "50%";

    particle.style.background = "#FFD700";

    particle.style.boxShadow =
        "0 0 10px gold";

    particle.style.left =
        Math.random() * window.innerWidth + "px";

    particle.style.top =
        window.innerHeight + "px";

    particle.style.pointerEvents = "none";

    particle.style.zIndex = "5";

    document.body.appendChild(particle);

    const duration =
        Math.random() * 5000 + 4000;

    particle.animate(
        [
            {
                transform:
                    "translateY(0px)",
                opacity: 1
            },
            {
                transform:
                    `translateY(-${window.innerHeight + 200}px)`,
                opacity: 0
            }
        ],
        {
            duration: duration
        }
    );

    setTimeout(() => {
        particle.remove();
    }, duration);
}

setInterval(createGoldenParticle, 300);


/* ==========================================
   FLOATING HEARTS
========================================== */

function createHeart() {

    const heart =
        document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.bottom = "-50px";

    heart.style.fontSize =
        Math.random() * 15 + 20 + "px";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "10";

    document.body.appendChild(heart);

    const duration =
        Math.random() * 4000 + 4000;

    heart.animate(
        [
            {
                transform:
                    "translateY(0px)",
                opacity: 1
            },
            {
                transform:
                    "translateY(-100vh)",
                opacity: 0
            }
        ],
        {
            duration: duration
        }
    );

    setTimeout(() => {
        heart.remove();
    }, duration);
}

setInterval(createHeart, 2500);


/* ==========================================
   PHOTO PARALLAX EFFECT
========================================== */

window.addEventListener("mousemove", (e) => {

    const photo =
        document.querySelector(".photo-glow");

    if (!photo) return;

    const x =
        (window.innerWidth / 2 - e.clientX) / 40;

    const y =
        (window.innerHeight / 2 - e.clientY) / 40;

    photo.style.transform =
        `rotateY(${x}deg) rotateX(${y}deg)`;
});


/* ==========================================
   GIFT BURST EFFECT
========================================== */

if (giftBox) {

    giftBox.addEventListener("click", () => {

        for (let i = 0; i < 30; i++) {

            const burst =
                document.createElement("div");

            burst.innerHTML = "✨";

            burst.style.position = "fixed";

            const rect =
                giftBox.getBoundingClientRect();

            burst.style.left =
                rect.left + rect.width / 2 + "px";

            burst.style.top =
                rect.top + rect.height / 2 + "px";

            burst.style.fontSize = "20px";

            burst.style.pointerEvents = "none";

            document.body.appendChild(burst);

            const x =
                (Math.random() - 0.5) * 500;

            const y =
                (Math.random() - 0.5) * 500;

            burst.animate(
                [
                    {
                        transform:
                            "translate(0,0)",
                        opacity: 1
                    },
                    {
                        transform:
                            `translate(${x}px,${y}px)`,
                        opacity: 0
                    }
                ],
                {
                    duration: 1500
                }
            );

            setTimeout(() => {
                burst.remove();
            }, 1500);
        }
    });
}


/* ==========================================
   FIREWORKS ON FINAL SECTION
========================================== */

const finalSection =
    document.querySelector(".final-section");

let fireworksStarted = false;

function createFirework() {

    for (let i = 0; i < 40; i++) {

        const spark =
            document.createElement("div");

        spark.style.position = "fixed";

        spark.style.width = "6px";
        spark.style.height = "6px";

        spark.style.borderRadius = "50%";

        spark.style.background =
            ["#FFD700",
             "#FF69B4",
             "#FFFFFF",
             "#FFB703"]
            [Math.floor(Math.random() * 4)];

        spark.style.left =
            Math.random() * window.innerWidth + "px";

        spark.style.top =
            Math.random() * window.innerHeight + "px";

        spark.style.zIndex = "999";

        document.body.appendChild(spark);

        const x =
            (Math.random() - .5) * 500;

        const y =
            (Math.random() - .5) * 500;

        spark.animate(
            [
                {
                    transform:
                        "translate(0,0)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(${x}px,${y}px)`,
                    opacity: 0
                }
            ],
            {
                duration: 2000
            }
        );

        setTimeout(() => {
            spark.remove();
        }, 2000);
    }
}

const finalObserver =
    new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (
                entry.isIntersecting &&
                !fireworksStarted
            ) {

                fireworksStarted = true;

                createFirework();

                setInterval(
                    createFirework,
                    3000
                );
            }

        });

    }, {
        threshold: 0.5
    });

if (finalSection) {

    finalObserver.observe(finalSection);

}


/* ==========================================
   PREMIUM SCROLL EFFECT
========================================== */

window.addEventListener("scroll", () => {

    const scrollY =
        window.scrollY;

    document.querySelectorAll(
        ".gallery-card"
    ).forEach((card, index) => {

        const speed =
            (index + 1) * 0.03;

        card.style.transform =
            `translateY(${scrollY * speed}px)`;
    });

});


/* ==========================================
   CINEMATIC FADE SECTIONS
========================================== */

const sections =
    document.querySelectorAll("section");

const sectionObserver =
    new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.animate(
                    [
                        {
                            opacity: 0,
                            transform:
                                "translateY(60px)"
                        },
                        {
                            opacity: 1,
                            transform:
                                "translateY(0px)"
                        }
                    ],
                    {
                        duration: 1200,
                        fill: "forwards"
                    }
                );
            }

        });

    }, {
        threshold: 0.15
    });

sections.forEach((section) => {

    section.style.opacity = "0";

    sectionObserver.observe(section);

});


/* ==========================================
   MOBILE OPTIMIZATION
========================================== */

if (window.innerWidth < 768) {

    setInterval(createGoldenParticle, 800);

}