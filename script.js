const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionPage = document.getElementById('questionPage');
const successPage = document.getElementById('successPage');

let initialized = false;

function initButton() {
    if (initialized) return;
    initialized = true;

    // Wstawiamy niewidoczny placeholder o tym samym rozmiarze co noBtn
    // żeby yesBtn nie przesuwał się po tym jak noBtn wypada z flow
    const placeholder = document.createElement('div');
    placeholder.style.width  = noBtn.offsetWidth  + 'px';
    placeholder.style.height = noBtn.offsetHeight + 'px';
    placeholder.style.flexShrink = '0';
    noBtn.parentNode.insertBefore(placeholder, noBtn);

    // Pobieramy aktualną pozycję przycisku na ekranie
    const rect = noBtn.getBoundingClientRect();

    // Ustawiamy fixed BEZ transition, dokładnie w tym samym miejscu
    noBtn.style.transition = 'none';
    noBtn.style.position = 'fixed';
    noBtn.style.left = rect.left + 'px';
    noBtn.style.top  = rect.top  + 'px';
    noBtn.style.transform = 'none';

    // Wymuszamy reflow żeby przeglądarka "zapamiętała" nową pozycję przed transition
    noBtn.getBoundingClientRect();

    // Dopiero teraz włączamy transition
    noBtn.style.transition = 'left 0.3s ease, top 0.3s ease';
}

// Funkcja do przesunięcia przycisku "No" w losowe miejsce
function moveButton() {
    initButton();

    const maxX = window.innerWidth - noBtn.offsetWidth - 10;
    const maxY = window.innerHeight - noBtn.offsetHeight - 10;

    noBtn.style.left = (Math.random() * maxX) + 'px';
    noBtn.style.top  = (Math.random() * maxY) + 'px';
}

// Event listener na najechanie myszką
noBtn.addEventListener('mouseenter', moveButton);

// Event listener na dotknięcie (mobile)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

// Przycisk "Yes"
yesBtn.addEventListener('click', () => {
    questionPage.style.display = 'none';
    successPage.style.display = 'block';
    createConfetti();
});

// Funkcja do tworzenia konfetti
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const hearts = ['❤️', '🩷', '💜', '💙', '💛', '🧡', '💗', '💖', '💝'];
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];

            // Losowa pozycja pozioma w %
            const leftPercent = Math.random() * 100;
            confetti.style.left = leftPercent + '%';

            // Kluczowa poprawka: startujemy zawsze od góry ekranu (fixed top: -20px)
            confetti.style.top = '-20px';

            // Losowy rozmiar serduszka
            const size = (Math.random() * 20 + 16) + 'px';
            confetti.style.fontSize = size;
            confetti.style.animationDelay = (Math.random() * 3) + 's';
            confetti.style.animationDuration = (Math.random() * 4 + 5) + 's';

            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 12000);
        }, i * 30);
    }
}