window.BirthdayMusic = (function () {
  let audio = null;
  let isPlaying = false;
  let isMuted = false;

  const PRIMARY_AUDIO = "assets/music/birthday.mp3";
  const FALLBACK_AUDIO = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=happy-birthday-to-you-piano-version-20412.mp3";

  function init() {
    audio = new Audio(PRIMARY_AUDIO);
    audio.loop = true;
    audio.volume = 0.3;

    audio.onerror = function () {
      if (audio.src !== FALLBACK_AUDIO) {
        audio.src = FALLBACK_AUDIO;
        audio.load();
      }
    };

    const playBtn = document.getElementById("music-toggle-btn");
    const muteBtn = document.getElementById("music-mute-btn");

    if (playBtn) playBtn.addEventListener("click", togglePlay);
    if (muteBtn) muteBtn.addEventListener("click", toggleMute);
  }

  function play() {
    if (!audio) init();
    audio.play()
      .then(() => {
        isPlaying = true;
        updateUI();
      })
      .catch((err) => {
        console.log("Autoplay blocked, waiting for user click.");
      });
  }

  function pause() {
    if (audio) {
      audio.pause();
      isPlaying = false;
      updateUI();
    }
  }

  function togglePlay() {
    if (!audio) init();
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function toggleMute() {
    if (!audio) return;
    isMuted = !isMuted;
    audio.muted = isMuted;
    const muteIcon = document.getElementById("mute-icon");
    if (muteIcon) {
      muteIcon.setAttribute("data-lucide", isMuted ? "volume-x" : "volume-2");
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function updateUI() {
    const playIcon = document.getElementById("play-icon");
    const bars = document.querySelectorAll(".eq-bar");

    if (playIcon) {
      playIcon.setAttribute("data-lucide", isPlaying ? "pause" : "play");
      if (window.lucide) window.lucide.createIcons();
    }

    bars.forEach((bar, idx) => {
      if (isPlaying) {
        bar.classList.add(`animate-bar-${idx + 1}`);
      } else {
        bar.classList.remove(`animate-bar-${idx + 1}`);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);

  return {
    play,
    pause,
    togglePlay,
    toggleMute
  };
})();