/*==================================================
MKZORA Luxury Wedding
petals.js
Floating Rose Petals
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const container = document.body;

    const PETAL_COUNT = window.innerWidth < 768 ? 18 : 35;

    const colors = [
        "#ffd6dc",
        "#ffc1cc",
        "#f8b4c4",
        "#f7a7b7",
        "#ffe5ec"
    ];

    function createPetal() {

        const petal = document.createElement("div");

        petal.className = "rose-petal";

        const size = Math.random() * 18 + 12;

        petal.style.width = size + "px";
        petal.style.height = size * 1.4 + "px";

        petal.style.left = Math.random() * 100 + "vw";

        petal.style.top = "-50px";

        petal.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        petal.style.opacity =
            0.5 + Math.random() * 0.5;

        petal.style.borderRadius =
            "60% 40% 70% 30%";

        const duration =
            10 + Math.random() * 8;

        petal.style.animationDuration =
            duration + "s";

        petal.style.animationDelay =
            Math.random() * 3 + "s";

        petal.style.transform =
            `rotate(${Math.random()*360}deg)`;

        container.appendChild(petal);

        petal.addEventListener("animationend", () => {

            petal.remove();

            createPetal();

        });

    }

    for(let i=0;i<PETAL_COUNT;i++){

        setTimeout(createPetal,i*350);

    }

});