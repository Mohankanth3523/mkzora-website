/* ===================================
   OPEN INVITATION
=================================== */

const openBtn =
document.getElementById("openInvitation");

const openingScreen =
document.getElementById("opening-screen");

if(openBtn){

openBtn.addEventListener(
"click",
()=>{

openingScreen.style.transition =
"all 1.5s ease";

openingScreen.style.opacity = "0";

openingScreen.style.visibility =
"hidden";

document.body.style.overflowY =
"auto";

});
}

/* ===================================
   COUNTDOWN TIMER
=================================== */

const weddingDate =
new Date(
"July 12, 2026 11:30:00"
).getTime();

function updateCountdown(){

const now =
new Date().getTime();

const distance =
weddingDate - now;

if(distance <= 0){

document.getElementById("days").innerHTML = "0";
document.getElementById("hours").innerHTML = "0";
document.getElementById("minutes").innerHTML = "0";
document.getElementById("seconds").innerHTML = "0";

return;
}

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

document.getElementById("days").innerHTML =
days;

document.getElementById("hours").innerHTML =
hours;

document.getElementById("minutes").innerHTML =
minutes;

document.getElementById("seconds").innerHTML =
seconds;

}

setInterval(
updateCountdown,
1000
);

updateCountdown();

/* ===================================
   SCROLL REVEAL
=================================== */

const reveals =
document.querySelectorAll(".reveal");

function revealElements(){

reveals.forEach(element=>{

const windowHeight =
window.innerHeight;

const top =
element.getBoundingClientRect().top;

if(top < windowHeight - 100){

element.classList.add("active");

}

});

}

window.addEventListener(
"scroll",
revealElements
);

revealElements();

/* ===================================
   PARALLAX EFFECT
=================================== */

const hero =
document.querySelector(".hero");

if(window.innerWidth > 768){

document.addEventListener(
"mousemove",
(e)=>{

const x =
(e.clientX /
window.innerWidth)
- 0.5;

const y =
(e.clientY /
window.innerHeight)
- 0.5;

hero.style.transform =
`translate(${x*10}px,
${y*10}px)`;

});

}

/* ===================================
   FLOATING PARTICLES
=================================== */

const particles =
document.querySelector(".particles");

for(let i=0;i<40;i++){

const dot =
document.createElement("span");

dot.classList.add("particle");

dot.style.left =
Math.random()*100+"%";

dot.style.top =
Math.random()*100+"%";

dot.style.animationDuration =
(5 + Math.random()*10)+"s";

dot.style.animationDelay =
Math.random()*5+"s";

particles.appendChild(dot);

}

/* ===================================
   PARTICLE CSS
=================================== */

const style =
document.createElement("style");

style.innerHTML = `

.particle{

position:absolute;

width:4px;
height:4px;

background:#d4af37;

border-radius:50%;

box-shadow:
0 0 10px #d4af37;

animation:
particleFloat linear infinite;

}

@keyframes particleFloat{

0%{

transform:
translateY(0);

opacity:0;

}

50%{

opacity:1;

}

100%{

transform:
translateY(-250px);

opacity:0;

}

}

`;

document.head.appendChild(style);

/* ===================================
   HERO TITLE SHIMMER
=================================== */

const heroTitle =
document.querySelector(
".hero-title"
);

if(heroTitle){

setInterval(()=>{

heroTitle.animate(

[
{
opacity:.8
},
{
opacity:1
},
{
opacity:.8
}
],

{
duration:2500
}

);

},2500);

}

/* ===================================
   TIMELINE HOVER EFFECT
=================================== */

const timelineCards =
document.querySelectorAll(
".timeline-content"
);

timelineCards.forEach(card=>{

card.addEventListener(
"mouseenter",
()=>{

card.style.transform =
"translateY(-10px) scale(1.02)";

});

card.addEventListener(
"mouseleave",
()=>{

card.style.transform =
"translateY(0) scale(1)";

});

});

/* ===================================
   SMOOTH SCROLL
=================================== */

document
.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor=>{

anchor.addEventListener(
"click",
function(e){

e.preventDefault();

const target =
document.querySelector(
this.getAttribute("href")
);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/* ===================================
   MOBILE PERFORMANCE
=================================== */

if(window.innerWidth < 768){

const roses =
document.querySelectorAll(
".rose"
);

roses.forEach(rose=>{

rose.style.animationDuration =
"18s";

});

}

/* ===================================
   CINEMATIC PAGE LOAD
=================================== */

window.addEventListener(
"load",
()=>{

document.body.animate(

[
{
opacity:0
},
{
opacity:1
}
],

{
duration:1800,
fill:"forwards"
}

);

});
/* ===================================
   LUXURY DOOR OPENING
=================================== */

const leftDoor =
document.querySelector(".left-door");

const rightDoor =
document.querySelector(".right-door");

if(openBtn){

openBtn.addEventListener("click",()=>{

leftDoor.style.transform =
"translateX(-100%)";

rightDoor.style.transform =
"translateX(100%)";

setTimeout(()=>{

leftDoor.style.display="none";
rightDoor.style.display="none";

},2000);

});

}

/* ===================================
   GOLDEN CURSOR
=================================== */

const cursor =
document.getElementById("cursor-glow");

document.addEventListener(
"mousemove",
(e)=>{

cursor.style.left =
e.clientX+"px";

cursor.style.top =
e.clientY+"px";

}
);

/* ===================================
   SCROLL PROGRESS BAR
=================================== */

window.addEventListener(
"scroll",
()=>{

const winScroll =
document.documentElement.scrollTop;

const height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const scrolled =
(winScroll / height) * 100;

document.getElementById(
"scroll-progress"
).style.width =
scrolled + "%";

}
);

/* ===================================
   MUSIC CONTROL
=================================== */

const music =
document.getElementById("bgMusic");

const musicBtn =
document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener(
"click",
()=>{

if(musicPlaying){

music.pause();

musicBtn.innerHTML = "🎵";

}else{

music.play();

musicBtn.innerHTML = "⏸";

}

musicPlaying =
!musicPlaying;

}
);

/* ===================================
   AUTO PLAY MUSIC
=================================== 

if(openBtn){

openBtn.addEventListener(
"click",
()=>{

setTimeout(()=>{

music.play();

musicPlaying = true;

musicBtn.innerHTML = "⏸";

},1200);

});

} */

/* ===================================
   CONFETTI BURST
=================================== */

function launchConfetti(){

const container =
document.getElementById(
"confetti-container"
);

for(let i=0;i<120;i++){

const confetti =
document.createElement("span");

confetti.classList.add(
"confetti"
);

confetti.style.left =
Math.random()*100+"vw";

confetti.style.animationDelay =
Math.random()*3+"s";

confetti.style.background =
Math.random() > .5
?
"#d4af37"
:
"#ffffff";

container.appendChild(
confetti
);

setTimeout(()=>{

confetti.remove();

},5000);

}

}

if(openBtn){

openBtn.addEventListener(
"click",
launchConfetti
);

}

/* ===================================
   PREMIUM TEXT REVEAL
=================================== */

const premiumText =
document.querySelectorAll(
".section-heading h2,.quote-box h2"
);

premiumText.forEach(text=>{

const original =
text.innerText;

text.innerHTML = "";

original.split("").forEach(
(letter,index)=>{

const span =
document.createElement(
"span"
);

span.innerText =
letter;

span.style.opacity = "0";

span.style.transition =
".5s";

span.style.transitionDelay =
(index * 0.04) + "s";

text.appendChild(span);

}
);

});

function revealLetters(){

premiumText.forEach(text=>{

const top =
text.getBoundingClientRect().top;

if(top < window.innerHeight-100){

text.querySelectorAll(
"span"
).forEach(letter=>{

letter.style.opacity =
"1";

});

}

});

}

window.addEventListener(
"scroll",
revealLetters
);

revealLetters();

/* ===================================
   DYNAMIC ROSE PETALS
=================================== */

function createRose(){

const rose =
document.createElement("div");

rose.innerHTML = "🌹";

rose.style.position =
"fixed";

rose.style.left =
Math.random()*100+"vw";

rose.style.top =
"-50px";

rose.style.fontSize =
(Math.random()*15+20)+"px";

rose.style.zIndex =
"1";

rose.style.pointerEvents =
"none";

rose.style.transition =
"linear";

document.body.appendChild(
rose
);

const duration =
Math.random()*6000+7000;

rose.animate(

[
{
transform:
"translateY(-50px) rotate(0deg)"
},
{
transform:
`translateY(${window.innerHeight+100}px)
rotate(360deg)`
}
],

{
duration:duration
}

);

setTimeout(()=>{

rose.remove();

},duration);

}

setInterval(
createRose,
1500
);

/* ===================================
   PARALLAX DEPTH
=================================== */

const heroContent =
document.querySelector(
".hero-content"
);

if(window.innerWidth > 768){

document.addEventListener(
"mousemove",
(e)=>{

const x =
(e.clientX -
window.innerWidth/2)
/ 50;

const y =
(e.clientY -
window.innerHeight/2)
/ 50;

heroContent.style.transform =
`translate(${x}px,${y}px)`;

}
);

}

/* ===================================
   CINEMATIC SECTION FADE
=================================== */

const sections =
document.querySelectorAll(
"section"
);

const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate(

[
{
opacity:0,
filter:"blur(10px)"
},
{
opacity:1,
filter:"blur(0px)"
}
],

{
duration:1200,
fill:"forwards"
}

);

}

});

},
{
threshold:.2
}

);

sections.forEach(section=>{

observer.observe(section);

});

/* ==========================================
   MOBILE NAV ACTIVE PAGE
========================================== */

const currentPage =
window.location.pathname.split("/").pop();

document
.querySelectorAll(".mobile-bottom-nav a")
.forEach(link => {

    const href =
    link.getAttribute("href");

    if(
        href === currentPage ||
        href === "./" + currentPage
    ){

        link.classList.add("active");

    }

});