const root = document.documentElement;
const tiltCards = document.querySelectorAll('[data-tilt]');

window.addEventListener('pointermove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  root.style.setProperty('--mx', `${x}px`);
  root.style.setProperty('--my', `${y}px`);

  tiltCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const rotateY = ((x - rect.left) / rect.width - 0.5) * 16;
    const rotateX = ((y - rect.top) / rect.height - 0.5) * -16;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});

tiltCards.forEach((card) => {
  card.addEventListener('pointerleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
});
