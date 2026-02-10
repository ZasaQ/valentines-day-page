const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionPage = document.getElementById('questionPage');
const successPage = document.getElementById('successPage');

// Funkcja do przesunięcia przycisku "No" w losowe miejsce
function moveButton() {
    // Losowe pozycje w obrębie viewport
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transform = 'none';
    noBtn.style.transition = 'all 0.3s ease';
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
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#ffd700', '#00f2fe'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}