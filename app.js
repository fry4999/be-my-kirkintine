const CONFIG = {
  from: "Diego",
  to: "Katelyn",
  kirkDay: "2026-09-10",
};

const sky = document.getElementById("sky");
const openSeal = document.getElementById("open-seal");
const sceneSeal = document.getElementById("scene-seal");
const sceneLetter = document.getElementById("scene-letter");
const sceneYes = document.getElementById("scene-yes");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const actions = document.getElementById("actions");
const countdown = document.getElementById("countdown");

document.querySelectorAll("[data-from]").forEach((el) => {
  el.textContent = CONFIG.from;
});
document.querySelectorAll("[data-to]").forEach((el) => {
  el.textContent = CONFIG.to;
});

function seedStars() {
  const count = window.matchMedia("(max-width: 600px)").matches ? 48 : 90;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    const size = Math.random() * 2.2 + 0.6;
    star.style.width = `${size + 5}px`;
    star.style.height = `${size + 5}px`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${2.8 + Math.random() * 3}s`;
    frag.appendChild(star);
  }
  sky.appendChild(frag);
}

function setCountdown() {
  const target = new Date(`${CONFIG.kirkDay}T00:00:00`);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfKirk = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const days = Math.round((startOfKirk - startOfToday) / 86400000);

  if (days > 1) countdown.textContent = `${days} days out`;
  else if (days === 1) countdown.textContent = "Tomorrow is Kirk Day";
  else if (days === 0) countdown.textContent = "Kirk Day. Now.";
  else countdown.textContent = "Kirk Day, on the record";
}

function showScene(next) {
  [sceneSeal, sceneLetter, sceneYes].forEach((scene) => {
    const active = scene === next;
    scene.hidden = !active;
    scene.toggleAttribute("inert", !active);
    scene.setAttribute("aria-hidden", active ? "false" : "true");
    scene.classList.toggle("is-active", active);
  });
}

const ytFrame = document.getElementById("yt-frame");
const ANTHEM_ID = "I0RC2Z-V1I0";
const ANTHEM_START = 45;

function startAnthem() {
  if (ytFrame.querySelector("iframe")) return;
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube-nocookie.com/embed/${ANTHEM_ID}?autoplay=1&start=${ANTHEM_START}&rel=0&modestbranding=1`;
  iframe.allow = "autoplay; encrypted-media";
  iframe.title = "We Are Charlie Kirk";
  ytFrame.appendChild(iframe);
}

openSeal.addEventListener("click", () => {
  showScene(sceneLetter);
});

function dodgeNo() {
  const bounds = actions.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  const pad = 8;
  const maxX = Math.max(pad, bounds.width - btn.width - pad);
  const maxY = Math.max(pad, bounds.height - btn.height - pad);
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  noBtn.classList.add("is-dodging");
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

let dodges = 0;
const noCopy = ["Prove me wrong", "Sit down", "Nice try", "Overruled", "Katelyn…"];

function handleNo(event) {
  event.preventDefault();
  dodges += 1;
  noBtn.textContent = noCopy[Math.min(dodges, noCopy.length - 1)];
  dodgeNo();
}

noBtn.addEventListener("mouseenter", handleNo);
noBtn.addEventListener("click", handleNo);
noBtn.addEventListener("touchstart", handleNo, { passive: false });

function burst() {
  const colors = ["#bf0a30", "#002868", "#f4f1ea", "#d4c48a"];
  for (let i = 0; i < 46; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = `${2.4 + Math.random() * 2.2}s`;
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    document.body.appendChild(piece);
    window.setTimeout(() => piece.remove(), 5200);
  }
}

yesBtn.addEventListener("click", () => {
  startAnthem();
  burst();
  showScene(sceneYes);
});

seedStars();
setCountdown();
