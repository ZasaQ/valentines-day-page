const noBtn        = document.getElementById('noBtn');
const yesBtn       = document.getElementById('yesBtn');
const questionPage = document.getElementById('questionPage');
const successPage  = document.getElementById('successPage');

/* ─── "No" button — runs away from the cursor ───────────────────────────── */

let initialized = false;

function initButton() {
    if (initialized) return;
    initialized = true;

    // Insert an invisible placeholder to keep the flex layout stable
    // once noBtn is pulled out of the document flow
    const placeholder = document.createElement('div');
    placeholder.style.width      = noBtn.offsetWidth  + 'px';
    placeholder.style.height     = noBtn.offsetHeight + 'px';
    placeholder.style.flexShrink = '0';
    noBtn.parentNode.insertBefore(placeholder, noBtn);

    // Switch to position:fixed at the exact same screen location — no transition yet,
    // so the browser registers a clean starting point before any animation begins
    const rect = noBtn.getBoundingClientRect();
    noBtn.style.transition = 'none';
    noBtn.style.position   = 'fixed';
    noBtn.style.left       = rect.left + 'px';
    noBtn.style.top        = rect.top  + 'px';
    noBtn.style.transform  = 'none';

    noBtn.getBoundingClientRect(); // force reflow to commit the starting position

    noBtn.style.transition = 'left 0.3s ease, top 0.3s ease';

    // Adding the listener asynchronously prevents the current mouseenter event
    // from immediately firing moveButton — which would always produce the same
    // first destination and make the button appear to snap rather than slide
    setTimeout(() => {
        noBtn.addEventListener('mouseenter', moveButton);
    }, 0);
}

function moveButton() {
    const maxX = window.innerWidth  - noBtn.offsetWidth  - 10;
    const maxY = window.innerHeight - noBtn.offsetHeight - 10;

    noBtn.style.left = (Math.random() * maxX) + 'px';
    noBtn.style.top  = (Math.random() * maxY) + 'px';
}

// First hover only initializes — does not move the button
noBtn.addEventListener('mouseenter', initButton, { once: true });

// Mobile: tap moves the button to a random position
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

/* ─── "Yes" button ───────────────────────────────────────────────────────── */

yesBtn.addEventListener('click', () => {
    questionPage.style.display = 'none';
    successPage.style.display  = 'block';
    createConfetti();
});

/* ─── Confetti ───────────────────────────────────────────────────────────── */

function createConfetti() {
    const hearts = ['❤️', '🩷', '💜', '💙', '💛', '🧡', '💗', '💖', '💝'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className   = 'confetti';
            el.innerHTML   = hearts[Math.floor(Math.random() * hearts.length)];
            el.style.left  = (Math.random() * 100) + '%';
            el.style.top   = '-20px';
            el.style.fontSize          = (Math.random() * 20 + 16) + 'px';
            el.style.animationDelay    = (Math.random() * 3) + 's';
            el.style.animationDuration = (Math.random() * 4 + 5) + 's';

            document.body.appendChild(el);
            setTimeout(() => el.remove(), 12000);
        }, i * 30);
    }
}