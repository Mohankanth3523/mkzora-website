/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        document.getElementById("loader").style.opacity = "0";

        setTimeout(() => {
            document.getElementById("loader").style.display = "none";
        }, 800);

    }, 1500);

});

/* ==========================================
   MUSIC TOGGLE
========================================== */

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

let musicPlaying = false;

musicBtn.addEventListener("click", () => {

    if (!musicPlaying) {

        bgMusic.play();

        musicBtn.innerHTML =
            '<i class="fas fa-pause"></i>';

        musicPlaying = true;

    } else {

        bgMusic.pause();

        musicBtn.innerHTML =
            '<i class="fas fa-music"></i>';

        musicPlaying = false;
    }

});

/* ==========================================
   OPEN INVITATION BUTTON
========================================== */
const openBtn =
document.getElementById("openInvite");

const invitationContent =
document.getElementById("invitationContent");

openBtn.addEventListener("click",()=>{

    invitationContent.classList.add("show");

    invitationContent.scrollIntoView({
        behavior:"smooth"
    });

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements =
document.querySelectorAll(".reveal");

function revealOnScroll(){

    revealElements.forEach(el=>{

        const top =
        el.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            el.classList.add("active");

        }

    });

}

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();

/* ==========================================
   COUNTDOWN TIMER
========================================== */

const targetDate =
new Date(
"July 05, 2026 11:00:00"
).getTime();

function updateCountdown(){

    const now =
    new Date().getTime();

    const distance =
    targetDate - now;

    const days =
    Math.floor(
    distance /
    (1000*60*60*24)
    );

    const hours =
    Math.floor(
    (distance %
    (1000*60*60*24))
    /
    (1000*60*60)
    );

    const minutes =
    Math.floor(
    (distance %
    (1000*60*60))
    /
    (1000*60)
    );

    const seconds =
    Math.floor(
    (distance %
    (1000*60))
    /
    1000
    );

    const d =
    document.getElementById("days");

    const h =
    document.getElementById("hours");

    const m =
    document.getElementById("minutes");

    const s =
    document.getElementById("seconds");

    if(d) d.innerText = days;
    if(h) h.innerText = hours;
    if(m) m.innerText = minutes;
    if(s) s.innerText = seconds;

    if(distance <= 0){

        clearInterval(timer);

        startFireworks();

    }

}

const timer =
setInterval(
updateCountdown,
1000
);

updateCountdown();

/* ==========================================
   BLESSINGS ROTATOR
========================================== */

const blessings = [

"Every child is a blessing.",

"May Joshnika Sasha be blessed with happiness, health and prosperity.",

"May love and joy always surround her.",

"May her life shine with success and blessings.",

"May divine grace guide her forever."

];

let blessingIndex = 0;

const blessingText =
document.getElementById(
"blessingText"
);

if(blessingText){

setInterval(()=>{

    blessingIndex++;

    if(blessingIndex >= blessings.length){
        blessingIndex = 0;
    }

    blessingText.style.opacity = 0;

    setTimeout(()=>{

        blessingText.innerText =
        blessings[blessingIndex];

        blessingText.style.opacity = 1;

    },400);

},4000);

}

/* ==========================================
   GALLERY AUTO SLIDER
========================================== */

const slides =
document.querySelectorAll(".slide");

let currentSlide = 0;

if(slides.length){

setInterval(()=>{

slides[currentSlide]
.classList.remove("active");

currentSlide++;

if(currentSlide >= slides.length){
currentSlide = 0;
}

slides[currentSlide]
.classList.add("active");

},5000);

}

/* ==========================================
   MEMORY TREE
========================================== */

const leaves =
document.querySelectorAll(".leaf");

const wishBox =
document.getElementById("wishBox");

leaves.forEach(leaf=>{

leaf.addEventListener("click",()=>{

const msg =
leaf.dataset.message;

wishBox.innerHTML =
"🌸 " + msg + " 🌸";

});

});

/* ==========================================
   GOLD PARTICLES
========================================== */

const particleContainer =
document.getElementById("particles");

if(particleContainer){

for(let i=0;i<80;i++){

const particle =
document.createElement("span");

particle.classList.add(
"particle"
);

particle.style.left =
Math.random()*100 + "%";

particle.style.animationDuration =
5 + Math.random()*10 + "s";

particle.style.animationDelay =
Math.random()*5 + "s";

particle.style.opacity =
Math.random();

particleContainer.appendChild(
particle
);

}

}

/* ==========================================
   CONFETTI
========================================== */

function createConfetti(){

const canvas =
document.getElementById(
"confettiCanvas"
);

if(!canvas) return;

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

const confetti = [];

for(let i=0;i<150;i++){

confetti.push({

x:
Math.random()*canvas.width,

y:
Math.random()*canvas.height
- canvas.height,

r:
Math.random()*8+3,

d:
Math.random()*50

});

}

let angle = 0;

function draw(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

angle += 0.01;

for(let i=0;i<confetti.length;i++){

const c = confetti[i];

ctx.beginPath();

ctx.arc(
c.x,
c.y,
c.r,
0,
Math.PI*2
);

ctx.fillStyle =
`hsl(${Math.random()*360},
100%,60%)`;

ctx.fill();

c.y += 3;

c.x += Math.sin(angle);

if(c.y >
canvas.height){

c.y = -10;

}

}

requestAnimationFrame(draw);

}

draw();

setTimeout(()=>{

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

},5000);

}

/* ==========================================
   FIREWORKS
========================================== */

function startFireworks(){

const canvas =
document.getElementById(
"fireworksCanvas"
);

if(!canvas) return;

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

const particles = [];

for(let i=0;i<250;i++){

particles.push({

x:
canvas.width/2,

y:
canvas.height/2,

dx:
(Math.random()-0.5)*12,

dy:
(Math.random()-0.5)*12,

life:100

});

}

function animate(){

ctx.fillStyle =
"rgba(0,0,0,0.15)";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

particles.forEach(p=>{

ctx.beginPath();

ctx.arc(
p.x,
p.y,
3,
0,
Math.PI*2
);

ctx.fillStyle =
`hsl(${Math.random()*360},
100%,60%)`;

ctx.fill();

p.x += p.dx;

p.y += p.dy;

p.life--;

});

requestAnimationFrame(
animate
);

}

animate();

}

/* ==========================================
   PARALLAX HERO
========================================== */

window.addEventListener(
"scroll",
()=>{

const hero =
document.querySelector(".hero");

if(hero){

const offset =
window.pageYOffset;

hero.style.backgroundPositionY =
offset * 0.4 + "px";

}

});

/* ==========================================
   LETTER REVEAL ANIMATION
========================================== */

const nameElement =
document.getElementById(
"nameReveal"
);

if(nameElement){

const text =
nameElement.innerText;

nameElement.innerHTML = "";

[...text].forEach(
(letter,index)=>{

const span =
document.createElement("span");

span.innerText = letter;

span.style.opacity = 0;

span.style.display =
"inline-block";

span.style.transition =
"0.5s";

nameElement.appendChild(
span
);

setTimeout(()=>{

span.style.opacity = 1;

span.style.transform =
"translateY(0px)";

}, index * 100);

});

}

/* ==========================================
   FLOATING PETALS
========================================== */

for(let i=0;i<8;i++){

const petal =
document.createElement("div");

petal.innerHTML = "🌸";

petal.style.position =
"fixed";

petal.style.left =
Math.random()*100+"%";

petal.style.top =
"-50px";

petal.style.fontSize =
20 + Math.random()*20+"px";

petal.style.pointerEvents =
"none";

petal.style.zIndex = "1";

document.body.appendChild(
petal
);

let speed =
1 + Math.random()*2;

function fall(){

let top =
parseFloat(
petal.style.top
);

top += speed;

petal.style.top =
top+"px";

if(top >
window.innerHeight+50){

petal.style.top =
"-50px";

petal.style.left =
Math.random()*100+"%";

}

requestAnimationFrame(
fall
);

}

fall();

}
/* ==========================================
   FLOATING GOLDEN BUBBLES
========================================== */

for(let i=0;i<10;i++){

    const bubble =
    document.createElement("div");

    bubble.classList.add("bubble");

    const size =
    Math.random()*50 + 20;

    bubble.style.width =
    size + "px";

    bubble.style.height =
    size + "px";

    bubble.style.left =
    Math.random()*100 + "%";

    bubble.style.animationDuration =
    (8 + Math.random()*8) + "s";

    bubble.style.animationDelay =
    Math.random()*5 + "s";

    document.body.appendChild(bubble);

}