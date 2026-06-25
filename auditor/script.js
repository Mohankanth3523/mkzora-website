/*======================================
SMOOTH SCROLL
======================================*/

const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*======================================
STICKY HEADER EFFECT
======================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";

    }else{

        header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";

    }

});


/*======================================
CONTACT FORM VALIDATION
======================================*/

const form = document.getElementById("contactForm");

if(form){

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const message = document.getElementById("message").value.trim();

    if(name === ""){

        alert("Please enter your name.");

        return;

    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!email.match(emailPattern)){

        alert("Please enter a valid email.");

        return;

    }

    const phonePattern = /^[0-9]{10}$/;

    if(!phone.match(phonePattern)){

        alert("Please enter a valid 10-digit mobile number.");

        return;

    }

    if(message.length < 10){

        alert("Please enter a meaningful message.");

        return;

    }

    alert("Thank you! Your message has been submitted successfully.");

    form.reset();

});

}


/*======================================
ANIMATED COUNTERS
======================================*/

const counters = document.querySelectorAll(".stat-card h2");

const animateCounter = (counter) => {

    const target = parseInt(counter.innerText);

    let count = 0;

    const speed = target / 80;

    const updateCounter = () => {

        count += speed;

        if(count < target){

            counter.innerText = Math.ceil(count) + "+";

            requestAnimationFrame(updateCounter);

        }else{

            if(counter.innerText.includes("%")){

                counter.innerText = target + "%";

            }else{

                counter.innerText = target + "+";

            }

        }

    };

    updateCounter();

};

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            animateCounter(entry.target);

            observer.unobserve(entry.target);

        }

    });

});

counters.forEach(counter => {

    observer.observe(counter);

});


/*======================================
BACK TO TOP BUTTON
======================================*/

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.pageYOffset > 300){

        topBtn.style.display = "flex";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


/*======================================
ACTIVE NAV LINK
======================================*/

const sections = document.querySelectorAll("section");
const menuLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if(pageYOffset >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    menuLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});