/*==================================================
MKZORA Luxury Wedding
fireflies.js
Luxury Golden Fireflies
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const container = document.body;

    const COUNT = window.innerWidth < 768 ? 12 : 22;

    for (let i = 0; i < COUNT; i++) {

        createFirefly();

    }

    function createFirefly() {

        const firefly = document.createElement("div");

        firefly.className = "firefly";

        const size = Math.random() * 6 + 3;

        firefly.style.width = size + "px";
        firefly.style.height = size + "px";

        resetPosition(firefly);

        firefly.style.animationDuration =
            (8 + Math.random() * 12) + "s";

        firefly.style.animationDelay =
            (Math.random() * 5) + "s";

        firefly.style.opacity =
            0.3 + Math.random() * 0.7;

        container.appendChild(firefly);

        animateFirefly(firefly);

    }

    function resetPosition(el){

        el.style.left =
            Math.random() * window.innerWidth + "px";

        el.style.top =
            Math.random() * window.innerHeight + "px";

    }

    function animateFirefly(el){

        function move(){

            const x =
                Math.random() * window.innerWidth;

            const y =
                Math.random() * window.innerHeight;

            const scale =
                0.8 + Math.random() * 1.4;

            const duration =
                3000 + Math.random() * 5000;

            el.animate([

                {
                    transform:`translate(0,0) scale(${scale})`
                },

                {
                    transform:
                    `translate(${x-el.offsetLeft}px,
                    ${y-el.offsetTop}px)
                    scale(${scale})`
                }

            ],{

                duration:duration,

                easing:"ease-in-out",

                fill:"forwards"

            }).onfinish=()=>{

                el.style.left=x+"px";
                el.style.top=y+"px";

                move();

            };

        }

        move();

    }

});