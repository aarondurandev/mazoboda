// 🎯 Variables generales
const targetDate = new Date("2026-08-08T00:00:00").getTime();
const fecha = document.getElementById('fecha');
const countdownElement = document.getElementById("temporizador");
const buttons = document.querySelectorAll('.menu-btn');
const sections = document.querySelectorAll('.content > section, #hero');
const viewMoreBtn = document.querySelector('.scroll-down-btn');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const inicioSection = document.getElementById('inicio');

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
            if (target.id === "hero") {
                document.querySelector(".wrapper").scrollIntoView({ behavior: 'smooth', block: 'start' })
                updateActiveButton(button.dataset.target);
                return;
            }
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


function updateDebugInfo() {
    const info = `
        Viewport: ${window.innerWidth} x ${window.innerHeight}<br>Pixel Ratio: ${window.devicePixelRatio}
    `;
    document.getElementById('debug-info').innerHTML = info;
}

// Inicializar
updateDebugInfo();

window.addEventListener('resize', () => {
    updateDebugInfo();
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

// Aviso cookies
document.getElementById("aceptarCookies").addEventListener('click', () => {
    document.getElementById("avisoCookies").style.display = "none";
    localStorage.setItem("cookiesAceptadas", "true");
});
if (localStorage.getItem("cookiesAceptadas") === "true") {
    document.getElementById("avisoCookies").style.display = "none";
}
// Detectar orientación
window.matchMedia("(orientation: landscape)").addEventListener("change", e => {
    const landscape = e.matches;
    if (landscape) {

    } else {

    }
});
