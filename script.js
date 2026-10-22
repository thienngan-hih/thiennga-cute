const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
const musicIcon = document.getElementById("music-icon");
const musicLabel = document.getElementById("music-label");
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.setAttribute("aria-pressed", "true");
      musicIcon.textContent = "♫";
      musicLabel.textContent = "Tắt nhạc";
      showToast("Nhạc đã bật — chúc cậu có một buổi sáng dịu dàng ♡");
    } catch (error) {
      showToast("Thêm tệp nhạc vào assets/music.mp3 để bật nhạc nha ♡");
    }
  } else {
    music.pause();
    musicToggle.setAttribute("aria-pressed", "false");
    musicIcon.textContent = "♫";
    musicLabel.textContent = "Bật nhạc";
    showToast("Đã tắt nhạc. Tận hưởng chút yên bình nhé ☁");
  }
});

const secretButton = document.getElementById("secret-button");
const secretMessage = document.getElementById("secret-message");
secretButton.addEventListener("click", () => {
  const isOpening = secretMessage.hidden;
  secretMessage.hidden = !isOpening;
  secretButton.setAttribute("aria-expanded", String(isOpening));
  secretButton.querySelector(".envelope").textContent = isOpening ? "💌" : "✉️";
  secretButton.querySelector(".envelope-label").textContent = isOpening ? "thư dành cho cậu ♡" : "đóng thư lại";
});

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString("vi-VN", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  });
  document.getElementById("date").textContent = now.toLocaleDateString("vi-VN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });
}
updateClock();
setInterval(updateClock, 1000);

// A light sprinkle of stars; respects reduced-motion preferences.
const sparkleLayer = document.getElementById("sparkle-layer");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion) {
  const symbols = ["✧", "✦", "·", "♡"];
  for (let i = 0; i < 24; i++) {
    const star = document.createElement("span");
    star.className = "sparkle";
    star.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${2 + Math.random() * 3}s`;
    star.style.fontSize = `${8 + Math.random() * 10}px`;
    sparkleLayer.appendChild(star);
  }
}
// ✨ Bling bling khi nhấn chuột
document.addEventListener("click", function (event) {
  const symbols = ["✦", "✧", "✨", "♡", "⋆", "💗"];
  const amount = 9;

  for (let i = 0; i < amount; i++) {
    const sparkle = document.createElement("span");

    sparkle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    sparkle.style.position = "fixed";
    sparkle.style.left = event.clientX + "px";
    sparkle.style.top = event.clientY + "px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "99999";
    sparkle.style.color = "#f3a6c8";
    sparkle.style.fontSize = 12 + Math.random() * 15 + "px";
    sparkle.style.transform = "translate(-50%, -50%)";
    sparkle.style.transition =
      "transform 800ms ease-out, opacity 800ms ease-out";

    document.body.appendChild(sparkle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 35 + Math.random() * 65;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      sparkle.style.transform =
        `translate(${x}px, ${y}px) rotate(${Math.random() * 180}deg)`;
      sparkle.style.opacity = "0";
    });

    setTimeout(() => sparkle.remove(), 850);
  }
});
