/*==================================================
MKZORA Luxury Wedding
Gallery (Single Image)
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const galleryImage = document.querySelector(".gallery-img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeBtn = document.getElementById("closeLightbox");

    if (!galleryImage || !lightbox || !lightboxImage) return;

    /*=========================
      OPEN LIGHTBOX
    =========================*/

    galleryImage.addEventListener("click", () => {

        lightboxImage.src = galleryImage.src;
        lightbox.style.display = "flex";

        setTimeout(() => {

            lightbox.classList.add("show");

        }, 20);

        document.body.style.overflow = "hidden";

    });

    /*=========================
      CLOSE LIGHTBOX
    =========================*/

    function closeLightbox() {

        lightbox.classList.remove("show");

        setTimeout(() => {

            lightbox.style.display = "none";

        }, 300);

        document.body.style.overflow = "auto";

    }

    closeBtn.addEventListener("click", closeLightbox);

    /*=========================
      CLICK OUTSIDE TO CLOSE
    =========================*/

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            closeLightbox();

        }

    });

    /*=========================
      ESC TO CLOSE
    =========================*/

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            closeLightbox();

        }

    });

    /*=========================
      DOUBLE CLICK TO ZOOM
    =========================*/

    let zoom = false;

    lightboxImage.addEventListener("dblclick", () => {

        zoom = !zoom;

        if (zoom) {

            lightboxImage.style.transform = "scale(2)";
            lightboxImage.style.cursor = "zoom-out";

        } else {

            lightboxImage.style.transform = "scale(1)";
            lightboxImage.style.cursor = "zoom-in";

        }

    });

});