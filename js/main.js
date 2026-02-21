// 🎯 Variables generales
const targetDate = new Date(2026, 7, 8, 0, 0, 0).getTime();
const countdownElement = document.getElementById("temporizador");
const buttons = document.querySelectorAll('.menu-btn');
const content = document.querySelector(".content");
const sections = Array.from(document.querySelectorAll('.content > section'));
const viewMoreBtn = document.querySelector('.scroll-down-btn');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
let ticking = false;

// let observer;
let heroTimer = null;


let lastSecond = null;

function updateCountdown(timestamp) {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
        countdownElement.textContent = "¡Hoy es el día!";
        return;
    }

    const currentSecond = Math.floor(now / 1000);
    if (currentSecond !== lastSecond) {
        lastSecond = currentSecond;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    requestAnimationFrame(updateCountdown);
}
requestAnimationFrame(updateCountdown);

function updateActiveButton(targetId) {
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


function getCurrentSection() {
    const isMobile = window.innerWidth <= 1024;
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    let current = sections[0].id;

    // Only consider hero if on mobile
    if (isMobile) {
        if (scrollY < 50) return 'hero';
    }

    // Check all sections
    const viewportCenter = scrollY + viewportHeight / 2;

    for (let section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (viewportCenter >= sectionTop && viewportCenter < sectionBottom) {
            current = section.id;
        }
    }

    return current;
}
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
    }
}

function updateScroll() {
    const currentSection = getCurrentSection();
    updateActiveButton(currentSection);
    ticking = false;
}

function onScroll() {
    requestTick();
}
function onResize() {
    requestTick();
}

function initScrollHandler() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    updateActiveButton(getCurrentSection());
}

initScrollHandler();

viewMoreBtn?.addEventListener('click', () => {
    document.getElementById('horario')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

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

document.querySelectorAll("button").forEach(button => {
    button.addEventListener('click', event => {
        switch (button.id) {
            case 'verUbicacion':
                open("https://maps.app.goo.gl/wiTzGSZzjJq1Q4Ub9");
                break;
            case 'verTransporte':
                open("https://www.rome2rio.com/es/map/Vigo/El-Jard%C3%ADn-de-los-Helechos-Serman-Gondomar-Espa%C3%B1a");
                break;
            case 'verAlbum':
                open("https://photos.app.goo.gl/BQBjwgaZSzjsT7379");
                break;
            case 'aceptarCookies':
                localStorage.setItem("cookiesAceptadas", "true");
                cargarFormularioGoogle();
                break;
        }
    });
})

document.getElementById("revocarConsentimiento").addEventListener('click', () => {
    localStorage.removeItem("cookiesAceptadas");
    window.location.reload();
})
if (localStorage.getItem("cookiesAceptadas") === "true") {
    cargarFormularioGoogle()
}
function cargarFormularioGoogle() {
    document.getElementById("avisoCookies").style.display = "none";

    const iframeForm = document.createElement('iframe');
    iframeForm.src = "https://docs.google.com/forms/d/e/1FAIpQLSf3y2I2MVfQzvHPHgLZ5HuApURPoN6ph0c1n3VdBprmHShoKA/viewform?embedded=true";
    iframeForm.frameBorder = 0;
    iframeForm.id = "googleForm";
    document.querySelector("#rsvp .section-contenido").appendChild(iframeForm);
    document.querySelector("#googleForm").style.display = "block";
    document.getElementById("revocarConsentimiento").style.display = "block";

}
// Detectar orientación
window.matchMedia("(orientation: landscape)").addEventListener("change", e => {
    const landscape = e.matches;
    if (landscape) {

    } else {

    }
});
