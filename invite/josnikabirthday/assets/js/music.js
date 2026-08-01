/**
 * BirthdayMusic — Background Music Controller
 * =============================================
 * Manages background music playback for Joshnika Sasha's birthday invitation.
 *
 * Audio source : assets/audio.mp4 (local file)
 * Volume       : 40% (0.4)
 * Looping      : Enabled (continuous playback)
 *
 * Playback starts only after the user's first interaction (click on the
 * "Open Royal Invitation" button) to comply with browser autoplay policies.
 * The music toggle and mute buttons in the top-right corner allow the user
 * to pause/resume and mute/unmute at any time.
 */
window.BirthdayMusic = (function () {
  /** @type {HTMLAudioElement|null} */
  let audio = null;

  /** Tracks whether the music is currently playing */
  let isPlaying = false;

  /** Tracks whether the music is currently muted */
  let isMuted = false;

  /* ── Audio Source ── */
  const AUDIO_SRC = "assets/audio.mp4";

  /**
   * Initialise the audio element and bind UI event listeners.
   * Called once on DOMContentLoaded and lazily before first play.
   */
  function init() {
    audio = new Audio(AUDIO_SRC);
    audio.loop = true;        // Loop continuously
    audio.volume = 0.4;       // 40% volume
    audio.preload = "auto";   // Hint the browser to buffer early

    /* Gracefully handle load errors */
    audio.onerror = function () {
      console.warn("BirthdayMusic: Unable to load audio from", AUDIO_SRC);
    };

    /* Bind play/pause toggle button */
    const playBtn = document.getElementById("music-toggle-btn");
    if (playBtn) playBtn.addEventListener("click", togglePlay);

    /* Bind mute/unmute button */
    const muteBtn = document.getElementById("music-mute-btn");
    if (muteBtn) muteBtn.addEventListener("click", toggleMute);
  }

  /**
   * Start (or resume) music playback.
   * Silently catches autoplay-blocked errors so the page is never disrupted.
   */
  function play() {
    if (!audio) init();
    audio.play()
      .then(() => {
        isPlaying = true;
        updateUI();
      })
      .catch((err) => {
        console.log("BirthdayMusic: Autoplay blocked, waiting for user interaction.", err.message);
      });
  }

  /**
   * Pause music playback.
   */
  function pause() {
    if (audio) {
      audio.pause();
      isPlaying = false;
      updateUI();
    }
  }

  /**
   * Toggle between play and pause.
   */
  function togglePlay() {
    if (!audio) init();
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  /**
   * Toggle mute / unmute and update the volume icon accordingly.
   */
  function toggleMute() {
    if (!audio) return;
    isMuted = !isMuted;
    audio.muted = isMuted;

    /* Swap the Lucide icon between volume-2 (unmuted) and volume-x (muted) */
    const muteIcon = document.getElementById("mute-icon");
    if (muteIcon) {
      muteIcon.setAttribute("data-lucide", isMuted ? "volume-x" : "volume-2");
      if (window.lucide) window.lucide.createIcons();
    }
  }

  /**
   * Synchronise the play/pause icon and equalizer-bar animations
   * with the current playback state.
   */
  function updateUI() {
    /* Swap the Lucide icon between pause (playing) and play (paused) */
    const playIcon = document.getElementById("play-icon");
    if (playIcon) {
      playIcon.setAttribute("data-lucide", isPlaying ? "pause" : "play");
      if (window.lucide) window.lucide.createIcons();
    }

    /* Animate / stop the equalizer bars */
    const bars = document.querySelectorAll(".eq-bar");
    bars.forEach((bar, idx) => {
      if (isPlaying) {
        bar.classList.add(`animate-bar-${idx + 1}`);
      } else {
        bar.classList.remove(`animate-bar-${idx + 1}`);
      }
    });
  }

  /* Initialise as soon as the DOM is ready */
  document.addEventListener("DOMContentLoaded", init);

  /* Expose public API for app.js (and the entrance-screen button) */
  return {
    play,
    pause,
    togglePlay,
    toggleMute
  };
})();