/* =====================================================
   REVATHI MAKEOVERZ & BOUTIQUE
   PREMIUM BRIDAL SHOWROOM WEBSITE

   FILE : script.js
   PART : 3A
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenuBtn =
document.querySelector(".mobile-menu-btn");

const navbar =
document.querySelector(".navbar");

if(mobileMenuBtn){

    mobileMenuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}


/* =====================================================
   STICKY HEADER EFFECT
===================================================== */

const header =
document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 100){

        header.classList.add("scrolled");

    }

    else{

        header.classList.remove("scrolled");

    }

});


/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const revealElements =
document.querySelectorAll(
".service-card, .package-card, .why-card, .gallery-item, .testimonial-card"
);

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const position =
        element.getBoundingClientRect().top;

        const screenPosition =
        window.innerHeight - 100;

        if(position < screenPosition){

            element.classList.add("fade-up");
            element.classList.add("active");

        }

    });

};

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();


/* =====================================================
   HERO COUNTER ANIMATION
===================================================== */

const counters =
document.querySelectorAll(
".stat-box h3"
);

const animateCounter = () => {

    counters.forEach(counter => {

        const targetText =
        counter.innerText;

        const target =
        parseInt(
        targetText.replace(/\D/g,'')
        );

        if(isNaN(target))
        return;

        let current = 0;

        const increment =
        target / 100;

        const updateCounter = () => {

            current += increment;

            if(current < target){

                counter.innerText =
                Math.floor(current) + "+";

                requestAnimationFrame(
                updateCounter
                );

            }

            else{

                counter.innerText =
                targetText;

            }

        };

        updateCounter();

    });

};

let counterStarted = false;

window.addEventListener("scroll", () => {

    const heroStats =
    document.querySelector(".hero-stats");

    if(!heroStats) return;

    const position =
    heroStats.getBoundingClientRect().top;

    if(position < window.innerHeight &&
       !counterStarted){

        animateCounter();

        counterStarted = true;

    }

});


/* =====================================================
   PRODUCT LOADING
===================================================== */

const productContainer =
document.getElementById(
"product-container"
);

let allProducts = [];

async function loadProducts(){

    try{

        const response =
        await fetch("products.json");

        const products =
        await response.json();

        allProducts = products;

        displayProducts(products);

    }

    catch(error){

        console.error(
        "Product loading error:",
        error
        );

    }

}

loadProducts();


/* =====================================================
   DISPLAY PRODUCTS
===================================================== */

function displayProducts(products){

    if(!productContainer)
    return;

    productContainer.innerHTML = "";

    products.forEach(product => {

        const card =
        document.createElement("div");

        card.className =
        "product-card";

        card.setAttribute(
        "data-category",
        product.category
        );

        card.innerHTML = `

        <div class="product-image">

            <span class="product-badge">

                Premium

            </span>

            <div class="product-overlay"></div>

            <img
            src="${product.image}"
            alt="${product.name}">

        </div>

        <div class="product-content">

            <span class="product-category">

                ${product.category}

            </span>

            <h3>

                ${product.name}

            </h3>

            <p class="product-description">

                ${product.description}

            </p>

            <div class="product-price">

                ${product.price}

            </div>

            <div class="product-actions">

                <a
                href="https://wa.me/919999999999?text=Hello Revathi, I am interested in ${product.name}"
                class="product-btn whatsapp">

                WhatsApp

                </a>

                <a
                href="#contact"
                class="product-btn view">

                Details

                </a>

            </div>

        </div>

        `;

        productContainer.appendChild(card);

    });

}


/* =====================================================
   PRODUCT FILTERING
===================================================== */

const filterButtons =
document.querySelectorAll(
".filter-btn"
);

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove(
            "active"
            );

        });

        button.classList.add(
        "active"
        );

        const category =
        button.dataset.filter;

        if(category === "all"){

            displayProducts(
            allProducts
            );

            return;
        }

        const filteredProducts =
        allProducts.filter(product => {

            return (
            product.category ===
            category
            );

        });

        displayProducts(
        filteredProducts
        );

    });

});


/* =====================================================
   SMOOTH SCROLL NAVIGATION
===================================================== */

document.querySelectorAll(
'nav a[href^="#"]'
)

.forEach(link => {

    link.addEventListener(
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

    }

    );

});


/* =====================================================
   CURRENT YEAR FOOTER
===================================================== */

const yearElement =
document.querySelector(
".current-year"
);

if(yearElement){

    yearElement.innerText =
    new Date().getFullYear();

}


/* =====================================================
   PAGE LOADER REMOVE
===================================================== */

window.addEventListener("load", () => {

    document.body.classList.add(
    "loaded"
    );

});


/* =====================================================
   END OF STEP 3A
===================================================== */
/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryImages =
document.querySelectorAll(
".gallery-item img"
);

const lightbox =
document.createElement("div");

lightbox.id = "lightbox";

lightbox.innerHTML = `

    <span id="close-lightbox">
        &times;
    </span>

    <img id="lightbox-image">

`;

document.body.appendChild(
lightbox
);

galleryImages.forEach(image => {

    image.addEventListener(
    "click",

    () => {

        lightbox.style.display =
        "flex";

        document.getElementById(
        "lightbox-image"
        ).src = image.src;

    }

    );

});

document
.getElementById(
"close-lightbox"
)

.addEventListener(
"click",

() => {

    lightbox.style.display =
    "none";

}

);

lightbox.addEventListener(
"click",

(e) => {

    if(e.target === lightbox){

        lightbox.style.display =
        "none";

    }

}

);


/* =====================================================
   TESTIMONIAL AUTO SLIDER
===================================================== */

const testimonialCards =
document.querySelectorAll(
".testimonial-card"
);

let testimonialIndex = 0;

function rotateTestimonials(){

    if(testimonialCards.length === 0)
    return;

    testimonialCards.forEach(card => {

        card.style.display =
        "none";

    });

    testimonialCards[
    testimonialIndex
    ].style.display = "block";

    testimonialIndex++;

    if(
        testimonialIndex >=
        testimonialCards.length
    ){

        testimonialIndex = 0;

    }

}

if(testimonialCards.length > 0){

    rotateTestimonials();

    setInterval(
    rotateTestimonials,
    5000
    );

}


/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */

const contactForm =
document.getElementById(
"contactForm"
);

if(contactForm){

contactForm.addEventListener(

"submit",

function(event){

event.preventDefault();

const name =
this.querySelector(
'input[type="text"]'
).value.trim();

const phone =
this.querySelector(
'input[type="tel"]'
).value.trim();

const date =
this.querySelector(
'input[type="date"]'
).value;

const service =
this.querySelector(
'select'
).value;

if(name.length < 3){

alert(
"Enter valid name"
);

return;

}

if(phone.length < 10){

alert(
"Enter valid mobile number"
);

return;

}

if(service ===
"Select Service"){

alert(
"Please choose a service"
);

return;

}

sendWhatsAppInquiry(
name,
phone,
date,
service
);

}

);

}


/* =====================================================
   WHATSAPP APPOINTMENT MESSAGE
===================================================== */

function sendWhatsAppInquiry(

name,
phone,
date,
service

){

const message =

`Hello Revathi,

I would like to book an appointment.

Name: ${name}

Phone: ${phone}

Event Date: ${date}

Service: ${service}

Please share package details.`;

const encodedMessage =
encodeURIComponent(
message
);

const whatsappURL =

`https://wa.me/919999999999?text=${encodedMessage}`;

window.open(
whatsappURL,
"_blank"
);

}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
document.querySelectorAll(
"section"
);

const navLinks =
document.querySelectorAll(
".navbar a"
);

window.addEventListener(

"scroll",

() => {

let current = "";

sections.forEach(section => {

const sectionTop =
section.offsetTop - 150;

const sectionHeight =
section.clientHeight;

if(

window.scrollY >=
sectionTop

){

current =
section.getAttribute("id");

}

});

navLinks.forEach(link => {

link.classList.remove(
"active"
);

if(

link.getAttribute("href")
=== "#" + current

){

link.classList.add(
"active"
);

}

});

}

);


/* =====================================================
   BACK TO TOP BUTTON
===================================================== */

const backToTop =
document.createElement("button");

backToTop.id =
"backToTop";

backToTop.innerHTML =
'<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(
backToTop
);

window.addEventListener(

"scroll",

() => {

if(window.scrollY > 500){

backToTop.style.opacity =
"1";

backToTop.style.visibility =
"visible";

}

else{

backToTop.style.opacity =
"0";

backToTop.style.visibility =
"hidden";

}

}

);

backToTop.addEventListener(

"click",

() => {

window.scrollTo({

top:0,

behavior:"smooth"

});

}

);


/* =====================================================
   LAZY LOADING IMAGES
===================================================== */

const lazyImages =
document.querySelectorAll(
"img"
);

const imageObserver =
new IntersectionObserver(

(entries, observer) => {

entries.forEach(entry => {

if(entry.isIntersecting){

const image =
entry.target;

image.classList.add(
"loaded"
);

observer.unobserve(
image
);

}

});

}

);

lazyImages.forEach(image => {

imageObserver.observe(
image
);

});


/* =====================================================
   PREMIUM PRELOADER
===================================================== */

const preloader =
document.createElement("div");

preloader.id =
"preloader";

preloader.innerHTML =

`

<div class="loader-logo">

Revathi

</div>

`;

document.body.prepend(
preloader
);

window.addEventListener(

"load",

() => {

setTimeout(() => {

preloader.classList.add(
"hide"
);

}, 1200);

}

);


/* =====================================================
   PACKAGE CARD HOVER EFFECT
===================================================== */

const packageCards =
document.querySelectorAll(
".package-card"
);

packageCards.forEach(card => {

card.addEventListener(

"mouseenter",

() => {

card.style.transform =
"translateY(-12px)";

}

);

card.addEventListener(

"mouseleave",

() => {

card.style.transform =
"translateY(0)";

}

);

});


/* =====================================================
   PRODUCT SEARCH
===================================================== */

const searchBox =
document.getElementById(
"productSearch"
);

if(searchBox){

searchBox.addEventListener(

"keyup",

function(){

const searchText =
this.value.toLowerCase();

const filtered =
allProducts.filter(

product =>

product.name
.toLowerCase()

.includes(searchText)

);

displayProducts(
filtered
);

}

);

}


/* =====================================================
   END OF STEP 3B
===================================================== */
/* =====================================================
   PRODUCT QUICK VIEW MODAL
===================================================== */

const quickViewModal =
document.createElement("div");

quickViewModal.id =
"quickViewModal";

quickViewModal.innerHTML = `

<div class="quick-view-wrapper">

    <span class="close-modal">

        &times;

    </span>

    <div id="quickViewContent">

    </div>

</div>

`;

document.body.appendChild(
quickViewModal
);


/* =====================================================
   OPEN PRODUCT MODAL
===================================================== */

function openProductModal(product){

document.getElementById(
"quickViewContent"
).innerHTML = `

<div class="modal-product">

    <div class="modal-image">

        <img
        src="${product.image}"
        alt="${product.name}">

    </div>

    <div class="modal-details">

        <span>

            ${product.category}

        </span>

        <h2>

            ${product.name}

        </h2>

        <div class="modal-price">

            ${product.price}

        </div>

        <p>

            ${product.description}

        </p>

        <a
        href="https://wa.me/919999999999?text=I am interested in ${product.name}"
        class="btn btn-gold">

        WhatsApp Inquiry

        </a>

    </div>

</div>

`;

quickViewModal.classList.add(
"show"
);

}


/* =====================================================
   CLOSE PRODUCT MODAL
===================================================== */

document.addEventListener(

"click",

(event)=>{

if(

event.target.classList.contains(
"close-modal"
)

){

quickViewModal.classList.remove(
"show"
);

}

}

);


/* =====================================================
   CLOSE MODAL OUTSIDE CLICK
===================================================== */

quickViewModal.addEventListener(

"click",

(event)=>{

if(
event.target === quickViewModal
){

quickViewModal.classList.remove(
"show"
);

}

}

);


/* =====================================================
   MOBILE GALLERY SWIPE
===================================================== */

let touchStartX = 0;
let touchEndX = 0;

const gallery =
document.querySelector(
".gallery-grid"
);

if(gallery){

gallery.addEventListener(

"touchstart",

(event)=>{

touchStartX =
event.changedTouches[0].screenX;

}

);

gallery.addEventListener(

"touchend",

(event)=>{

touchEndX =
event.changedTouches[0].screenX;

handleGallerySwipe();

}

);

}

function handleGallerySwipe(){

if(
touchEndX <
touchStartX - 50
){

console.log(
"Swipe Left"
);

}

if(
touchEndX >
touchStartX + 50
){

console.log(
"Swipe Right"
);

}

}


/* =====================================================
   TESTIMONIAL BUTTON CONTROLS
===================================================== */

const testimonialContainer =
document.querySelector(
".testimonial-slider"
);

const prevButton =
document.createElement(
"button"
);

const nextButton =
document.createElement(
"button"
);

prevButton.innerHTML =
"❮";

nextButton.innerHTML =
"❯";

prevButton.className =
"testimonial-prev";

nextButton.className =
"testimonial-next";

if(testimonialContainer){

testimonialContainer.appendChild(
prevButton
);

testimonialContainer.appendChild(
nextButton
);

}

prevButton.addEventListener(

"click",

()=>{

testimonialIndex--;

if(testimonialIndex < 0){

testimonialIndex =
testimonialCards.length - 1;

}

rotateTestimonials();

}

);

nextButton.addEventListener(

"click",

()=>{

testimonialIndex++;

if(

testimonialIndex >=
testimonialCards.length

){

testimonialIndex = 0;

}

rotateTestimonials();

}

);


/* =====================================================
   INTERSECTION OBSERVER
===================================================== */

const animatedElements =
document.querySelectorAll(

".service-card,\
.package-card,\
.product-card,\
.gallery-item,\
.why-card"

);

const animationObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"active"
);

}

});

},

{
threshold:0.15
}

);

animatedElements.forEach(
element=>{

animationObserver.observe(
element
);

}
);


/* =====================================================
   HEADER HIDE ON SCROLL DOWN
===================================================== */

let lastScrollTop = 0;

window.addEventListener(

"scroll",

()=>{

let currentScroll =
window.pageYOffset;

if(

currentScroll >
lastScrollTop &&
currentScroll > 200

){

header.style.top =
"-100px";

}

else{

header.style.top =
"0";

}

lastScrollTop =
currentScroll;

}

);


/* =====================================================
   PERFORMANCE OPTIMIZATION
===================================================== */

let resizeTimer;

window.addEventListener(

"resize",

()=>{

clearTimeout(
resizeTimer
);

resizeTimer =
setTimeout(()=>{

console.log(
"Resize Completed"
);

},300);

}

);


/* =====================================================
   PARALLAX HERO EFFECT
===================================================== */

window.addEventListener(

"scroll",

()=>{

const hero =
document.querySelector(
".hero"
);

if(hero){

hero.style.backgroundPositionY =

window.pageYOffset *
0.4 + "px";

}

}

);


/* =====================================================
   PRODUCT SORTING
===================================================== */

function sortProducts(type){

let sortedProducts =
[...allProducts];

if(type === "low"){

sortedProducts.sort(

(a,b)=>

parseInt(
a.price.replace(/\D/g,'')
)

-

parseInt(
b.price.replace(/\D/g,'')
)

);

}

if(type === "high"){

sortedProducts.sort(

(a,b)=>

parseInt(
b.price.replace(/\D/g,'')
)

-

parseInt(
a.price.replace(/\D/g,'')
)

);

}

displayProducts(
sortedProducts
);

}


/* =====================================================
   ESC KEY CLOSE MODAL
===================================================== */

document.addEventListener(

"keydown",

(event)=>{

if(

event.key === "Escape"

){

quickViewModal.classList.remove(
"show"
);

}

}

);


/* =====================================================
   WHATSAPP FLOAT ANIMATION
===================================================== */

setInterval(()=>{

const whatsapp =
document.querySelector(
".whatsapp-float"
);

if(whatsapp){

whatsapp.classList.toggle(
"pulse"
);

}

},2000);


/* =====================================================
   END OF STEP 3C
===================================================== */