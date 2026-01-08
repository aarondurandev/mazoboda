const targetDate = new Date("2026-08-08T00:00:00").getTime();
const countdownElement = document.querySelector("#inicio .temporizador");

function calcularCuentaAtras() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        clearInterval(interval);
        countdownElement.innerHTML = "¡Hoy es el día!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
const interval = setInterval(calcularCuentaAtras, 1000);

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});
navMenu.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show')) {
        navMenu.classList.toggle('show');
    }
})
const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
};

scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
calcularCuentaAtras();

/*const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
})
document.querySelectorAll('[data-animate="true"]').forEach(el => {
    observer.observe(el)
});*/

/*const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  });
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
*/


/*const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.modal-close');

document.querySelectorAll('.gallery-item').forEach(img => {
  img.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modalImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});*/
const tabLinks = document.querySelectorAll(".tab-link");
const tabPanels = document.querySelectorAll(".tab-panel");

function handleTabClick(e) {
  const target = e.currentTarget.dataset.tab;
  const isMobile = window.innerWidth <= 768;

  tabLinks.forEach(btn => btn.classList.remove("active"));
  e.currentTarget.classList.add("active");

  if (!isMobile) {
    tabPanels.forEach(panel => {
      panel.classList.remove("active");
      if (panel.id === target) panel.classList.add("active");
    });
  } else {
    const panel = document.getElementById(target);
    const isOpen = e.currentTarget.classList.contains("active");
    panel.classList.toggle("active", !isOpen);
  }
}

tabLinks.forEach(btn => btn.addEventListener("click", handleTabClick));