// Get elements
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const celebration = document.getElementById('celebration');

// Initialize No button position next to Yes button
function initializeNoButton() {
  const yesRect = yesBtn.getBoundingClientRect();
  noBtn.style.left = `${yesRect.right + 32}px`;
  noBtn.style.top = `${yesRect.top}px`;
}

// Function to move the No button away from cursor (DRAMATICALLY)
function moveNoButtonFromPoint(x, y) {
  const btnRect = noBtn.getBoundingClientRect();
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  // Calculate direction away from cursor
  const dx = btnCenterX - x;
  const dy = btnCenterY - y;
  const distance = Math.hypot(dx, dy) || 1;

  // MUCH more dramatic flee distance
  const step = 250;
  const newX = btnRect.left + (dx / distance) * step;
  const newY = btnRect.top + (dy / distance) * step;

  // Constrain to window bounds with padding
  const padding = 20;
  const maxX = window.innerWidth - btnRect.width - padding;
  const maxY = window.innerHeight - btnRect.height - padding;

  const clampedX = Math.min(Math.max(newX, padding), maxX);
  const clampedY = Math.min(Math.max(newY, padding), maxY);

  noBtn.style.left = `${clampedX}px`;
  noBtn.style.top = `${clampedY}px`;
}

// Track mouse/pointer movement across entire window (works on desktop and mobile)
document.addEventListener('pointermove', (e) => {
  const btnRect = noBtn.getBoundingClientRect();
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;
  const dx = e.clientX - btnCenterX;
  const dy = e.clientY - btnCenterY;
  const distance = Math.hypot(dx, dy);
  const triggerRadius = 200; // MUCH larger trigger radius - button flees earlier!

  if (distance < triggerRadius) {
    moveNoButtonFromPoint(e.clientX, e.clientY);
  }
});

// Move button on click attempt
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  moveNoButtonFromPoint(e.clientX, e.clientY);
});

// Mobile touch support
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  if (touch) {
    moveNoButtonFromPoint(touch.clientX, touch.clientY);
  }
});

// Show celebration when Yes is clicked
yesBtn.addEventListener('click', () => {
  celebration.classList.remove('hidden');
});

// Initialize on load and resize
initializeNoButton();
window.addEventListener('resize', initializeNoButton);
