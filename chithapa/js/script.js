/*==================================================
        PREMIUM LANDING PAGE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================================
        PRELOADER
    ==============================================*/

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        if (preloader) {

            preloader.style.opacity = "0";

            preloader.style.visibility = "hidden";

            setTimeout(() => {

                preloader.remove();

            }, 500);

        }

    });


    /*==============================================
        STICKY NAVBAR
    ==============================================*/

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(11,31,77,.95)";

            navbar.style.boxShadow =
                "0 15px 35px rgba(0,0,0,.18)";

        }

        else {

            navbar.style.background =
                "rgba(11,31,77,.82)";

            navbar.style.boxShadow = "none";

        }

    });


   /*==============================================
        MOBILE MENU
==============================================*/

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        menuBtn.querySelector("i").classList.toggle("fa-bars");
        menuBtn.querySelector("i").classList.toggle("fa-xmark");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuBtn.querySelector("i").classList.remove("fa-xmark");
            menuBtn.querySelector("i").classList.add("fa-bars");

        });

    });

}


    /*==============================================
        SMOOTH SCROLL
    ==============================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(

                this.getAttribute("href")

            );

            if (!target) return;

            e.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 75,

                behavior: "smooth"

            });

        });

    });


    /*==============================================
        ACTIVE NAVIGATION
    ==============================================*/

    const sections = document.querySelectorAll("section[id]");

    const navItems = document.querySelectorAll(".nav-links a");

    function activeNav() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 140;

            if (window.scrollY >= top) {

                current = section.id;

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (

                link.getAttribute("href") === "#" + current

            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", activeNav);

    activeNav();


    /*==============================================
        SCROLL PROGRESS BAR
    ==============================================*/

    const progress = document.createElement("div");

    progress.id = "scrollProgress";

    document.body.appendChild(progress);

    Object.assign(progress.style, {

        position: "fixed",

        top: "0",

        left: "0",

        width: "0%",

        height: "4px",

        background: "#0057FF",

        zIndex: "99999"

    });

    window.addEventListener("scroll", () => {

        const totalHeight =

            document.documentElement.scrollHeight -

            window.innerHeight;

        const progressWidth =

            (window.scrollY / totalHeight) * 100;

        progress.style.width = progressWidth + "%";

    });

});
/*==================================================
        PART 2 : PREMIUM ANIMATIONS
==================================================*/


/*==============================================
        SCROLL REVEAL
==============================================*/

const revealElements = document.querySelectorAll(

    ".section-heading,\
    .stat-card,\
    .service-card,\
    .about-image,\
    .about-content,\
    .mini-card,\
    .feature-item,\
    .why-item,\
    .why-card,\
    .timeline-item,\
    .branch-card,\
    .review-card,\
    .contact-card,\
    .contact-form,\
    .faq-item"

);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {

        threshold:0.15

    }

);

revealElements.forEach(item=>{

    item.style.opacity="0";

    item.style.transform="translateY(60px)";

    item.style.transition="all .8s ease";

    revealObserver.observe(item);

});


/*==============================================
        COUNTER ANIMATION
==============================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter = entry.target;

const target = +counter.dataset.target;

let current = 0;

const increment = Math.ceil(target / 120);

const updateCounter = ()=>{

if(current < target){

current += increment;

counter.innerText = current;

requestAnimationFrame(updateCounter);

}

else{

counter.innerText = target;

}

};

updateCounter();

counterObserver.unobserve(counter);

}

});

},

{

threshold:.6

}

);

counters.forEach(counter=>{

counterObserver.observe(counter);

});


/*==============================================
        HERO FLOATING CARD
==============================================*/

const heroCard = document.querySelector(".delivery-card");

if(heroCard){

let direction = 1;

setInterval(()=>{

heroCard.style.transform =

`translateY(${direction * 10}px)`;

direction *= -1;

},2500);

}


/*==============================================
        PARALLAX HERO BLOBS
==============================================*/

const blobs = document.querySelectorAll(".blob");

window.addEventListener("mousemove",(e)=>{

const x = e.clientX / window.innerWidth;

const y = e.clientY / window.innerHeight;

blobs.forEach((blob,index)=>{

const speed = (index+1)*18;

blob.style.transform=

`translate(${x*speed}px,${y*speed}px)`;

});

});


/*==============================================
        CARD HOVER TILT
==============================================*/

const cards = document.querySelectorAll(

".service-card,.branch-card,.review-card,.why-card"

);

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect = card.getBoundingClientRect();

const x = e.clientX - rect.left;

const y = e.clientY - rect.top;

const rotateX =

((y/rect.height)-0.5)*8;

const rotateY =

((x/rect.width)-0.5)*-8;

card.style.transform=

`perspective(900px)
 rotateX(${rotateX}deg)
 rotateY(${rotateY}deg)
 translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});


/*==============================================
        HERO BUTTON RIPPLE
==============================================*/

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("click",function(e){

const ripple=document.createElement("span");

const size=Math.max(

this.clientWidth,

this.clientHeight

);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=

e.offsetX-size/2+"px";

ripple.style.top=

e.offsetY-size/2+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});


/*==============================================
        STAGGER ANIMATION
==============================================*/

document.querySelectorAll(

".services-grid,\
 .stats-grid,\
 .branches-grid,\
 .reviews-grid"

).forEach(grid=>{

const children=[...grid.children];

children.forEach((card,index)=>{

card.style.transitionDelay=

(index*120)+"ms";

});

});


console.log("Part 2 Loaded");
/*==================================================
        PART 3 : INTERACTIONS & FINISHING TOUCHES
==================================================*/


/*==============================================
        FAQ ACCORDION
==============================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    if (!question) return;

    question.addEventListener("click", () => {

        faqItems.forEach(other => {

            if (other !== item) {

                other.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});


/*==============================================
        BACK TO TOP
==============================================*/

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/*==============================================
        FLOATING BUTTON PULSE
==============================================*/

const floatingButtons = document.querySelectorAll(

    ".floating-whatsapp,.floating-call"

);

floatingButtons.forEach(btn => {

    setInterval(() => {

        btn.animate(

            [

                {

                    transform: "scale(1)"

                },

                {

                    transform: "scale(1.08)"

                },

                {

                    transform: "scale(1)"

                }

            ],

            {

                duration: 1200,

                easing: "ease-in-out"

            }

        );

    }, 4000);

});


/*==============================================
        ACTIVE INPUT EFFECT
==============================================*/

const formFields = document.querySelectorAll(

    "input, textarea, select"

);

formFields.forEach(field => {

    field.addEventListener("focus", () => {

        field.parentElement.classList.add("active");

    });

    field.addEventListener("blur", () => {

        if (field.value.trim() === "") {

            field.parentElement.classList.remove("active");

        }

    });

});


/*==============================================
        SIMPLE HERO PARALLAX
==============================================*/

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (!hero) return;

    const offset = window.scrollY * 0.3;

    hero.style.backgroundPosition = `center ${offset}px`;

});


/*==============================================
        LAZY IMAGE FADE-IN
==============================================*/

const images = document.querySelectorAll("img");

const imageObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "scale(1)";

                imageObserver.unobserve(entry.target);

            }

        });

    },

    {

        threshold: 0.2

    }

);

images.forEach(img => {

    img.style.opacity = "0";

    img.style.transform = "scale(.96)";

    img.style.transition = ".7s ease";

    imageObserver.observe(img);

});


/*==============================================
        CARD SHADOW ON SCROLL
==============================================*/

const animatedCards = document.querySelectorAll(

    ".service-card,.branch-card,.review-card,.why-card,.stat-card"

);

window.addEventListener("scroll", () => {

    animatedCards.forEach(card => {

        const rect = card.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100) {

            card.style.boxShadow =

                "0 25px 50px rgba(0,87,255,.12)";

        }

    });

});


/*==============================================
        COPY EMAIL (OPTIONAL)
==============================================*/

const emailElement = document.querySelector(

    ".contact-card:nth-child(3) p"

);

if (emailElement) {

    emailElement.style.cursor = "pointer";

    emailElement.title = "Click to copy";

    emailElement.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(

                emailElement.textContent.trim()

            );

            alert("Email copied to clipboard!");

        } catch (err) {

            console.log("Copy failed");

        }

    });

}


/*==============================================
        CONSOLE MESSAGE
==============================================*/

console.log("%cPremium Landing Page Ready 🚀",

    "color:#0057FF;font-size:16px;font-weight:bold;"
);