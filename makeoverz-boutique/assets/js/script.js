/* =====================================================
   REVATHI MAKEOVERZ
   GLOBAL JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const menuBtn =
            document.querySelector(
                ".mobile-menu-btn"
            );

        const navbar =
            document.querySelector(
                ".navbar"
            );

        if (menuBtn && navbar) {

            menuBtn.addEventListener(
                "click",
                () => {

                    navbar.classList.toggle(
                        "active"
                    );

                }
            );

        }

    }
);


/* =====================================================
   STICKY HEADER SHADOW
===================================================== */

window.addEventListener(
    "scroll",
    () => {

        const header =
            document.querySelector(
                ".header"
            );

        if (!header) return;

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 10px 30px rgba(0,0,0,.10)";

        } else {

            header.style.boxShadow =
                "0 2px 20px rgba(0,0,0,.05)";

        }

    }
);


/* =====================================================
   FADE UP ANIMATION
===================================================== */

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );

document
.querySelectorAll(
    ".fade-up"
)
.forEach(
    item => {

        observer.observe(item);

    }
);


/* =====================================================
   IMAGE LAZY LOADING
===================================================== */

const images =
    document.querySelectorAll(
        "img"
    );

images.forEach(image => {

    image.loading = "lazy";

});


/* =====================================================
   PRODUCT CARD HOVER EFFECT
===================================================== */

document
.querySelectorAll(
    ".product-card"
)
.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.transform =
                "translateY(-10px)";

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "translateY(0px)";

        }
    );

});


/* =====================================================
   ACTIVE NAVIGATION LINK
===================================================== */

const currentPage =
    window.location.pathname
    .split("/")
    .pop();

document
.querySelectorAll(
    ".navbar a"
)
.forEach(link => {

    const href =
        link.getAttribute(
            "href"
        );

    if (
        href === currentPage
    ) {

        link.style.color =
            "#c8a96b";

    }

});


/* =====================================================
   BACK TO TOP BUTTON
===================================================== */

const backToTop =
    document.createElement(
        "button"
    );

backToTop.innerHTML =
    "↑";

backToTop.className =
    "back-to-top";

document.body.appendChild(
    backToTop
);

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            backToTop.style.display =
                "flex";

        } else {

            backToTop.style.display =
                "none";

        }

    }
);

backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior:
                "smooth"

        });

    }
);


/* =====================================================
   SIMPLE GALLERY LIGHTBOX
===================================================== */

document
.querySelectorAll(
    ".gallery-item img"
)
.forEach(img => {

    img.addEventListener(
        "click",
        () => {

            const overlay =
                document.createElement(
                    "div"
                );

            overlay.className =
                "lightbox-overlay";

            overlay.innerHTML = `

                <div class="lightbox">

                    <img
                        src="${img.src}"
                        alt="Gallery">

                </div>

            `;

            document.body.appendChild(
                overlay
            );

            overlay.addEventListener(
                "click",
                () => {

                    overlay.remove();

                }
            );

        }
    );

});

const filterBtns =
document.querySelectorAll('.filter-btn');

const sections =
document.querySelectorAll('.gallery-section');

filterBtns.forEach(btn => {

    btn.addEventListener('click', () => {

        filterBtns.forEach(b =>
            b.classList.remove('active')
        );

        btn.classList.add('active');

        const filter =
        btn.dataset.filter;

        sections.forEach(section => {

            if(filter === 'all'){

                section.style.display =
                'block';

            }

            else if(
                section.classList.contains(
                filter + '-section'
                )
            ){

                section.style.display =
                'block';

            }

            else{

                section.style.display =
                'none';

            }

        });

    });

});
/* ==========================================
   TESTIMONIAL SLIDER
========================================== */

const testimonialCards =
document.querySelectorAll(
'.testimonial-card'
);

const prevBtn =
document.querySelector(
'.testimonial-btn.prev'
);

const nextBtn =
document.querySelector(
'.testimonial-btn.next'
);

let currentSlide = 0;

function showSlide(index){

    testimonialCards.forEach(card => {

        card.classList.remove('active');

    });

    testimonialCards[index]
    .classList.add('active');

}

if(testimonialCards.length > 0){

    showSlide(currentSlide);

}

nextBtn?.addEventListener(
'click',
() => {

    currentSlide++;

    if(
        currentSlide >=
        testimonialCards.length
    ){

        currentSlide = 0;

    }

    showSlide(currentSlide);

});

prevBtn?.addEventListener(
'click',
() => {

    currentSlide--;

    if(currentSlide < 0){

        currentSlide =
        testimonialCards.length - 1;

    }

    showSlide(currentSlide);

});
/* =====================================================
   WHATSAPP PRODUCT INQUIRY
===================================================== */

document
.querySelectorAll(
    ".enquiry-btn"
)
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const product =
                button.dataset.product;

            const whatsappURL =

                `https://wa.me/919999999999?text=Hi, I'm interested in ${product}`;

            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

});


/* =====================================================
   PERFORMANCE
===================================================== */

console.log(

    "Revathi Makeoverz Loaded Successfully"

);