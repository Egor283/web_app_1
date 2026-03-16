// Эффект параллакса для звезд
document.addEventListener('mousemove', (e) => {
    const stars = document.querySelector('.stars');
    const speed = 0.05;
    const x = (window.innerWidth / 2 - e.pageX) * speed;
    const y = (window.innerHeight / 2 - e.pageY) * speed;
    stars.style.transform = `translate(${x}px, ${y}px)`;
});

// Случайные мемные факты
const marsFacts = [
    "🍎 Яблони на Марсе будут цвести через 500 лет!",
    "🎟️ Билет на Марс стоит как 1000 айфонов",
    "👽 Марсиане существуют, просто они стесняются",
    "🚀 Илон Маск уже собирает чемодан",
    "🌡️ На Марсе холоднее, чем в холодильнике твоей бывшей",
    "💨 Атмосфера Марса на 96% состоит из CO2 - идеально для газировки!"
];

function showRandomFact() {
    const factIndex = Math.floor(Math.random() * marsFacts.length);
    const factDiv = document.createElement('div');
    factDiv.className = 'mars-card';
    factDiv.style.position = 'fixed';
    factDiv.style.bottom = '20px';
    factDiv.style.right = '20px';
    factDiv.style.maxWidth = '300px';
    factDiv.style.zIndex = '1000';
    factDiv.style.animation = 'slideIn 0.5s ease';
    factDiv.innerHTML = `
        <h4 style="color: #FF5722;">🎲 Марсо-факт дня:</h4>
        <p>${marsFacts[factIndex]}</p>
        <button onclick="this.parentElement.remove()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: #fff; cursor: pointer;">✖</button>
    `;
    document.body.appendChild(factDiv);

    setTimeout(() => {
        if (factDiv.parentElement) factDiv.remove();
    }, 10000);
}

// Показываем случайный факт каждые 30 секунд
setInterval(showRandomFact, 30000);

// Эффект набора текста для заголовка
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    typeWriter();
}

// Добавляем анимацию для карточек при скролле
const cards = document.querySelectorAll('.mars-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

// CSS анимация
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);