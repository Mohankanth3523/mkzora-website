/* =====================================================
   Testimonials Swiper
===================================================== */

const testimonialSwiper = new Swiper(".testimonialSwiper", {

    loop: true,

    speed: 700,

    grabCursor: true,

    watchOverflow: true,

    observer: true,

    observeParents: true,

    autoplay: {

        delay: 3500,

        disableOnInteraction: false,

        pauseOnMouseEnter: true,

    },

    spaceBetween: 30,

    pagination: {

        el: ".testimonialSwiper .swiper-pagination",

        clickable: true,

    },

    breakpoints: {

        0: {

            slidesPerView: 1,

            spaceBetween: 20,

        },

        768: {

            slidesPerView: 2,

            spaceBetween: 24,

        },

        1200: {

            slidesPerView: 2,

            spaceBetween: 30,

        }

    }

});