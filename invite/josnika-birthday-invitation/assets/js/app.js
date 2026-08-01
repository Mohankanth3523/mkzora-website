(function () {
  // Canvas Floating Particles
  function initParticles() {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const colors = ["#FFD700", "#FF69B4", "#8A2BE2", "#00F5D4", "#FF4500", "#FFE600"];
    const particleCount = Math.min(60, Math.floor(width / 20));

    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 6 + 3,
      type: Math.random() > 0.6 ? "confetti" : Math.random() > 0.3 ? "star" : "balloon",
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.7 + 0.3,
      speedY: Math.random() * -0.8 - 0.3,
      speedX: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      widthRatio: Math.random() * 0.6 + 0.4,
    }));

    function drawStar(x, y, r, color) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * r, -Math.sin(((18 + i * 72) * Math.PI) / 180) * r);
        ctx.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * (r / 2), -Math.sin(((54 + i * 72) * Math.PI) / 180) * (r / 2));
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    function drawBalloon(x, y, r, color) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.ellipse(0, 0, r * 0.8, r * 1.1, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, r * 1.1);
      ctx.quadraticCurveTo(r * 0.3, r * 1.8, 0, r * 2.5);
      ctx.strokeStyle = "rgba(150, 150, 150, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.type === "star") {
          drawStar(p.x, p.y, p.size, p.color);
        } else if (p.type === "balloon") {
          drawBalloon(p.x, p.y, p.size * 1.5, p.color);
        } else {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, (-p.size * p.widthRatio) / 2, p.size * 1.5, p.size * p.widthRatio);
        }
        ctx.restore();
      });

      requestAnimationFrame(render);
    }

    render();
  }

  // Confetti helper
  window.triggerConfetti = function () {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#FFD700", "#FF1493", "#00BFFF", "#FF4500", "#9370DB"],
      });
    }
  };

  // Entrance Screen Logic
  function initEntrance() {
    const enterBtn = document.getElementById("enter-btn");
    const loadingScreen = document.getElementById("loading-screen");

    if (enterBtn && loadingScreen) {
      enterBtn.addEventListener("click", () => {
        window.triggerConfetti();
        if (window.BirthdayMusic) window.BirthdayMusic.play();

        loadingScreen.classList.add("opacity-0", "pointer-events-none", "scale-110");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 800);
      });
    }
  }

  // Gallery Lightbox Logic
  function initGallery() {
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("lightbox-close");

    document.querySelectorAll(".gallery-card").forEach((card) => {
      card.addEventListener("click", () => {
        const url = card.getAttribute("data-url");
        const title = card.getAttribute("data-title");
        const caption = card.getAttribute("data-caption");

        if (lightboxImg) lightboxImg.src = url;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxCaption) lightboxCaption.textContent = caption;

        if (lightbox) {
          lightbox.classList.remove("hidden");
          lightbox.classList.add("flex");
        }
      });
    });

    if (closeBtn && lightbox) {
      closeBtn.addEventListener("click", () => {
        lightbox.classList.add("hidden");
        lightbox.classList.remove("flex");
      });

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          lightbox.classList.add("hidden");
          lightbox.classList.remove("flex");
        }
      });
    }
  }

  // Share Modal Logic
  function initShareModal() {
    const openBtn = document.getElementById("open-share-btn");
    const closeBtn = document.getElementById("close-share-btn");
    const modal = document.getElementById("share-modal");
    const copyBtn = document.getElementById("copy-link-btn");
    const copyText = document.getElementById("copy-link-text");

    if (openBtn && modal) {
      openBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
      });
    }

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.add("hidden");
          modal.classList.remove("flex");
        }
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(window.location.href);
        if (copyText) copyText.textContent = "Link Copied!";
        setTimeout(() => {
          if (copyText) copyText.textContent = "Copy Invitation Link";
        }, 2000);
      });
    }

    // Set WhatsApp link dynamically
    const whatsappBtn = document.getElementById("whatsapp-share-btn");
    if (whatsappBtn) {
      const msg = encodeURIComponent(
        `✨ You are warmly invited to celebrate Joshnika Sasha's 1st Birthday! ✨\n\n📅 Date: 09 August 2026\n🕒 Time: 1:00 PM\n📍 Venue: Skating Hall\n\nView Invitation here:\n${window.location.href}`
      );
      whatsappBtn.href = `https://api.whatsapp.com/send?text=${msg}`;
    }

    // Set QR code src dynamically
    const qrImg = document.getElementById("share-qr-img");
    if (qrImg) {
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        window.location.href
      )}`;
    }
  }

  // Scroll to Top Logic
  function initScrollToTop() {
    const backToTopBtn = document.getElementById("back-to-top-btn");
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }

  // Initialize all features on DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    initParticles();
    initEntrance();
    initGallery();
    initShareModal();
    initScrollToTop();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
})();