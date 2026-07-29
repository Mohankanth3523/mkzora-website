/* ==========================================================================
   Wedding Invitation — Irfan & Farhana
   Application JavaScript
   ========================================================================== */

/* ---------- Configuration ---------- */
/**
 * Path to the background music file.
 * Change this constant if the MP3 filename differs.
 */
const MUSIC_SRC = 'assets/music/wedding.mp3';

/* ==========================================================================
   Music Player
   --------------------------------------------------------------------------
   - Plays/pauses via the floating button (#music-toggle).
   - Auto-starts when the user clicks "Open Invitation" (satisfies browser
     autoplay policy because it happens inside a user-gesture handler).
   - If the user manually pauses, the auto-start is disabled so the music
     stays paused even after openInvitation() fires.
   ========================================================================== */

const music    = document.getElementById('bgMusic');
let   isPlaying    = false;   // true while audio is actually playing
let   userPaused   = false;   // true once the user explicitly pauses

const musicBtn  = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');

/**
 * Start playback and update the toggle button UI.
 * Wrapped in try/catch to handle browsers that reject play() promises
 * (e.g. if no audio file is found or autoplay is still blocked).
 */
async function startMusic() {
    try {
        await music.play();
        isPlaying = true;
        musicIcon.innerText = 'pause';
        musicBtn.classList.add('bg-primary-container', 'text-on-primary-container');
    } catch (err) {
        console.warn('Music playback failed:', err);
    }
}

/**
 * Pause playback and update the toggle button UI.
 */
function stopMusic() {
    music.pause();
    isPlaying = false;
    musicIcon.innerText = 'music_note';
    musicBtn.classList.remove('bg-primary-container', 'text-on-primary-container');
}

/* --- Floating button click handler --- */
musicBtn.addEventListener('click', async () => {
    if (!isPlaying) {
        userPaused = false;   // user is explicitly requesting playback
        await startMusic();
    } else {
        userPaused = true;    // user is explicitly pausing
        stopMusic();
    }
});

/* ==========================================================================
   Splash Screen → Open Invitation
   --------------------------------------------------------------------------
   Fades out the splash overlay, reveals the top bar, and auto-starts the
   background music (only if the user hasn't already paused it).
   ========================================================================== */

function openInvitation() {
    const splash = document.getElementById('splash');
    splash.style.opacity = '0';
    splash.style.pointerEvents = 'none';
    document.body.classList.remove('overflow-hidden');

    /* Auto-start music on first interaction — respects autoplay policy
       because this runs inside the onclick handler (user gesture). */
    if (!userPaused && !isPlaying) {
        startMusic();
    }
}

/* ---------- Scroll Reveal (Intersection Observer) ---------- */
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---------- Countdown Timer ---------- */
const targetDate = new Date('August 30, 2026 12:15:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById('days').innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ---------- Initial Page Load ---------- */
window.onload = () => {
    document.body.classList.add('overflow-hidden');
};
