/*==================================================
MKZORA Luxury Wedding Reception
main.js - Part 4.1
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=================================
    AOS
    =================================*/

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 80,
            easing: "ease-in-out"
        });
    }

    /*=================================
    LOADER
    =================================*/

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";

        }, 1800);

    });

    /*=================================
    MUSIC
    =================================*/

    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicBtn");

    let playing = false;

    function playMusic() {

        music.play().then(() => {

            playing = true;

            musicBtn.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        }).catch(() => {

            console.log("Music requires user interaction.");

        });

    }

    function pauseMusic() {

        music.pause();

        playing = false;

        musicBtn.innerHTML =
            '<i class="fa-solid fa-music"></i>';

    }

    musicBtn.addEventListener("click", () => {

        if (playing) {

            pauseMusic();

        } else {

            playMusic();

        }

    });

    /*=================================
    AUTO PLAY AFTER FIRST TOUCH
    =================================*/

    document.body.addEventListener("click", () => {

        if (!playing) {

            playMusic();

        }

    }, { once: true });

    /*=================================
    SCROLL PROGRESS BAR
    =================================*/

    const progressBar =
        document.getElementById("progressBar");

    window.addEventListener("scroll", () => {

        const scrollTop =
            document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (scrollTop / height) * 100;

        progressBar.style.width =
            progress + "%";

    });

    /*=================================
    SMOOTH BUTTON SCROLL
    =================================*/

    document.querySelectorAll('a[href^="#"]')

        .forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                e.preventDefault();

                const target =
                    document.querySelector(
                        this.getAttribute("href")
                    );

                if (target) {

                    target.scrollIntoView({

                        behavior: "smooth"

                    });

                }

            });

        });

    /*=================================
    COUNTDOWN
    =================================*/

    const targetDate =
        new Date("June 28, 2026 11:00:00").getTime();

    function countdown() {

        const now =
            new Date().getTime();

        const distance =
            targetDate - now;

        if (distance < 0) {

            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";

            return;

        }

        const days =
            Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60))
                /
                (1000 * 60)
            );

        const seconds =
            Math.floor(
                (distance %
                    (1000 * 60))
                /
                1000
            );

        document.getElementById("days").textContent =
            String(days).padStart(2, "0");

        document.getElementById("hours").textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes").textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds").textContent =
            String(seconds).padStart(2, "0");

    }

    countdown();

    setInterval(countdown, 1000);

    /*=================================
    SCROLL ANIMATION
    =================================*/

    const cards = document.querySelectorAll(

        ".detail-card, .family-card, .timeline-item, .time-box"

    );

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {

            threshold: .15

        }

    );

    cards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(50px)";

        card.style.transition =
            ".7s ease";

        observer.observe(card);

    });

    /*=================================
    COPY INVITATION LINK
    =================================*/

    const copyBtn =
        document.querySelector(".fa-link");

    if (copyBtn) {

        copyBtn.parentElement.addEventListener(

            "click",

            function (e) {

                e.preventDefault();

                navigator.clipboard.writeText(

                    window.location.href

                );

                alert("Invitation link copied.");

            }

        );

    }

    /*=================================
    BACK TO TOP
    =================================*/

    const topBtn =
        document.createElement("button");

    topBtn.id = "topBtn";

    topBtn.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(topBtn);

    topBtn.style.cssText = `

position:fixed;
right:20px;
bottom:90px;
width:52px;
height:52px;
border:none;
border-radius:50%;
background:#D4AF37;
color:#fff;
font-size:18px;
cursor:pointer;
display:none;
z-index:999;
box-shadow:0 10px 30px rgba(212,175,55,.35);

`;

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

});