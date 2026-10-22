// ===== Floating Hearts - minimal =====
function createHearts(container, count = 8) {
  const emojis = ['❤️', '🩷', '💕'];
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (0.6 + Math.random() * 0.8) + 'rem';
    heart.style.animationDuration = (8 + Math.random() * 10) + 's';
    heart.style.animationDelay = (Math.random() * 8) + 's';
    container.appendChild(heart);
  }
}

// ===== Stars - removed for clean look =====
function createStars(container, count = 0) {
  container.innerHTML = '';
}

// ===== Photo preview =====
function initPhotoSlots() {
  const slots = document.querySelectorAll('.photo-slot');
  slots.forEach(slot => {
    const input = slot.querySelector('input[type="file"]');
    if (!input) return;
    input.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        let img = slot.querySelector('img.preview');
        if (!img) {
          img = document.createElement('img');
          img.classList.add('preview');
          slot.appendChild(img);
          slot.querySelector('.placeholder-icon') && (slot.querySelector('.placeholder-icon').style.display = 'none');
          slot.querySelector('.placeholder-text') && (slot.querySelector('.placeholder-text').style.display = 'none');
        }
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  });
}

// ===== Staggered animation for love blocks =====
function staggerBlocks() {
  const blocks = document.querySelectorAll('.love-text-block');
  blocks.forEach((b, i) => {
    b.style.animationDelay = (i * 0.15) + 's';
  });
}

// ===== Init on DOM ready =====
document.addEventListener('DOMContentLoaded', () => {
  const heartsContainer = document.querySelector('.hearts-container');
  if (heartsContainer) createHearts(heartsContainer);

  const starsContainer = document.querySelector('.stars');
  if (starsContainer) createStars(starsContainer);

  staggerBlocks();
  initPhotoSlots();

  // Confetti on surprise page
  if (document.body.dataset.page === 'surprise') {
    setTimeout(launchConfetti, 400);
  }
});

// ===== Simple Confetti =====
function launchConfetti() {
  const colors = ['#ff6b9d', '#ffd200', '#c44dff', '#00d2ff', '#ff6b6b', '#7fff6b'];
  const total = 120;
  for (let i = 0; i < total; i++) {
    const conf = document.createElement('div');
    conf.style.cssText = `
      position: fixed;
      top: -10px;
      left: ${Math.random() * 100}vw;
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events: none;
      z-index: 9999;
      opacity: 1;
      animation: confettiFall ${2 + Math.random() * 3}s ${Math.random() * 2}s linear forwards;
    `;
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 6000);
  }

  // inject keyframes once
  if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
      @keyframes confettiFall {
        0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}
