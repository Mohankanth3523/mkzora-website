/*==================================================
MKZORA Luxury Wedding
particles.js
Floating Gold Particles
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("particles");

    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 35 : 70;

    for (let i = 0; i < particleCount; i++) {

        const p = document.createElement("span");

        p.className = "gold-particle";

        const size = Math.random() * 6 + 2;

        p.style.width = size + "px";
        p.style.height = size + "px";

        p.style.left = Math.random() * 100 + "%";

        p.style.top = Math.random() * 100 + "%";

        const duration = 12 + Math.random() * 18;

        const delay = Math.random() * 20;

        p.style.animationDuration = duration + "s";

        p.style.animationDelay = delay + "s";

        const opacity = .2 + Math.random() * .8;

        p.style.opacity = opacity;

        container.appendChild(p);

    }

});