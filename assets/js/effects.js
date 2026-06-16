const root = document.documentElement;
const tiltCards = document.querySelectorAll('[data-tilt]');
const magneticItems = document.querySelectorAll('.button, .shot, .card');
const revealItems = document.querySelectorAll('[data-reveal]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let currentX = targetX;
let currentY = targetY;
let rafId = null;

function updatePointer(event) {
  targetX = event.clientX;
  targetY = event.clientY;

  if (!rafId) {
    rafId = requestAnimationFrame(animatePointer);
  }
}

function animatePointer() {
  currentX += (targetX - currentX) * 0.18;
  currentY += (targetY - currentY) * 0.18;

  root.style.setProperty('--mx', `${currentX}px`);
  root.style.setProperty('--my', `${currentY}px`);

  tiltCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardX = (currentX - rect.left) / rect.width - 0.5;
    const cardY = (currentY - rect.top) / rect.height - 0.5;
    const rotateY = cardX * 18;
    const rotateX = cardY * -18;
    card.style.setProperty('--tilt-x', `${rotateX}deg`);
    card.style.setProperty('--tilt-y', `${rotateY}deg`);
    card.style.setProperty('--shine-x', `${(cardX + 0.5) * 100}%`);
    card.style.setProperty('--shine-y', `${(cardY + 0.5) * 100}%`);
  });

  if (Math.abs(targetX - currentX) > 0.2 || Math.abs(targetY - currentY) > 0.2) {
    rafId = requestAnimationFrame(animatePointer);
  } else {
    rafId = null;
  }
}

function attachMagnetism() {
  magneticItems.forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      item.style.setProperty('--magnet-x', `${x * 0.08}px`);
      item.style.setProperty('--magnet-y', `${y * 0.08}px`);
    });

    item.addEventListener('pointerleave', () => {
      item.style.setProperty('--magnet-x', '0px');
      item.style.setProperty('--magnet-y', '0px');
    });
  });
}

function buildLightParticles() {
  const layer = document.querySelector('.light-particles');
  if (!layer) return;

  Array.from({ length: 18 }).forEach((_, index) => {
    const particle = document.createElement('span');
    particle.style.setProperty('--delay', `${index * -0.7}s`);
    particle.style.setProperty('--size', `${6 + (index % 5) * 5}px`);
    particle.style.setProperty('--left', `${(index * 13) % 100}%`);
    layer.appendChild(particle);
  });
}

function attachRevealObserver() {
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealItems.forEach((item) => observer.observe(item));
}

if (!reducedMotion) {
  window.addEventListener('pointermove', updatePointer, { passive: true });
  attachMagnetism();
  buildLightParticles();
  attachRevealObserver();

  tiltCards.forEach((card) => {
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--shine-x', '50%');
      card.style.setProperty('--shine-y', '50%');
    });
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
