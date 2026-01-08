// 🎯 Variables generales
const targetDate = new Date("2026-08-08T00:00:00").getTime();
const fecha = document.getElementById('fecha');
const countdownElement = document.getElementById("temporizador");
const buttons = document.querySelectorAll('.menu-btn');
const sections = document.querySelectorAll('.content > section, #hero');
const viewMoreBtn = document.querySelector('.view-more');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const inicioSection = document.getElementById('inicio');
const heroDiv = document.getElementById('hero');
const heroBlur = heroDiv?.querySelector('.hero-blur');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const images = document.querySelectorAll('.masonry img');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let observer;
let heroTimer = null;


let lastSecond = null;

function updateCountdown(timestamp) {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
        countdownElement.textContent = "¡Hoy es el día!";
        return; // No más actualizaciones
    }

    const currentSecond = Math.floor(now / 1000);
    if (currentSecond !== lastSecond) {
        lastSecond = currentSecond;

        const days = Math.floor(distance / 86400000);
        const hours = Math.floor((distance % 86400000) / 3600000);
        const minutes = Math.floor((distance % 3600000) / 60000);
        const seconds = Math.floor((distance % 60000) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    requestAnimationFrame(updateCountdown);
}
requestAnimationFrame(updateCountdown);

// 🎯 Botones de menú
const updateActiveButton = (targetId) => {
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === targetId);
    });
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const target = document.getElementById(button.dataset.target);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            updateActiveButton(button.dataset.target);
        }
    });
});

function initObserver() {
    // Si ya había uno, desconectar antes de crear uno nuevo
    if (observer) observer.disconnect();

    observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            // TODO: si la navegación está abierta, no cambiar color
            /*if (id === 'hero') {
                if (entry.isIntersecting) {
                    hamburger.style.backgroundColor = 'white';
                    hamburger.style.color = '#333';
                } else {
                    // hamburger.style.backgroundColor = '#555';
                    // hamburger.style.color = 'white';
                }
            }*/
            if (entry.isIntersecting) {
                updateActiveButton(id);
            }
        });
    }, {
        root: null,
        threshold: 0.4
    });

    // Volver a observar las secciones actuales
    sections.forEach(section => {
        observer.observe(section);
    });
}
initObserver();

// 🎯 Botón "ver más"
viewMoreBtn?.addEventListener('click', () => {
    document.getElementById('horario')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// 🎯 Menú hamburguesa
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    if (navMenu.classList.contains('active')) {
        hamburger.style.fontSize = '1.2rem';
    } else {
        hamburger.style.fontSize = '1.5rem';
    }
});

navMenu?.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.style.fontSize = '1.5rem';
    }
});

// 🎯 Mover temporizador al hero en móvil
function moveTimerToHero() {
    const isMobile = window.innerWidth <= 1024;
    if (inicioSection && heroBlur) {
        if (isMobile && !heroTimer) {
            heroTimer = document.createElement('div');
            heroTimer.classList.add('hero-timer');
            while (inicioSection.firstChild) {
                heroTimer.appendChild(inicioSection.firstChild);
            }
            heroBlur.appendChild(heroTimer);
            fecha.innerText = '8/8/26';
            // inicioSection.style.display = 'none';
            initObserver();
        } else if (!isMobile && heroTimer) {
            while (heroTimer.firstChild) {
                inicioSection.appendChild(heroTimer.firstChild);
            }
            heroTimer.remove();
            heroTimer = null;
            fecha.innerText = '8 agosto 2026';
            // inicioSection.style.display = '';
            initObserver();
        }
    }
}
//moveTimerToHero();

// Lightbox
let currentIndex = 0;

function showImage(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.style.display = 'flex';
    document.body.classList.add('no-scroll');
}

images.forEach((img, index) => {
    img.addEventListener('click', () => {
        showImage(index);
    });
});
let startX = 0;
let endX = 0;

lightbox.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchmove', e => {
    endX = e.touches[0].clientX;
});
lightbox.addEventListener('touchend', () => {
    const threshold = 50; // px
    const diff = endX - startX;

    if (Math.abs(diff) > threshold) {
        if (diff < 0) {
            currentIndex = (currentIndex + 1) % images.length;
        } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
        showImage(currentIndex);
    }
});
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.classList.remove('no-scroll');

});

function updateDebugInfo() {
    const info = `
        Viewport: ${window.innerWidth} x ${window.innerHeight}<br>Pixel Ratio: ${window.devicePixelRatio}
    `;
    document.getElementById('debug-info').innerHTML = info;
}

// Inicializar
updateDebugInfo();

window.addEventListener('resize', () => {
    moveTimerToHero();
    updateDebugInfo();
});

document.querySelector('.scroll-down-btn').addEventListener('click', () => {
    document.querySelector('#horario').scrollIntoView({
        behavior: 'smooth'
    });
});

document.querySelectorAll(".button").forEach(button => {
    button.addEventListener('click', event => {
        switch (button.id) {
            case 'verUbicacion':
                open("https://maps.app.goo.gl/wiTzGSZzjJq1Q4Ub9");
                break;
            case 'verTransporte':
                open("https://www.rome2rio.com/es/map/Vigo/El-Jard%C3%ADn-de-los-Helechos-Serman-Gondomar-Espa%C3%B1a");
                break;
        }
    });
})

// Detectar orientación
window.matchMedia("(orientation: landscape)").addEventListener("change", e => {
    const landscape = e.matches;
    if (landscape) {

    } else {

    }
});
