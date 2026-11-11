const content = window.GAME_CONTENT;
const stops = content.stops;
const routeStops = document.querySelector("#route-stops");
const routeAvatar = document.querySelector("#route-avatar");
const testDialog = document.querySelector("#test-dialog");
const introDialog = document.querySelector("#intro-dialog");
const introReopen = document.querySelector("#intro-reopen");
const introReminders = document.querySelector("#intro-reminders");
const dialogClose = document.querySelector("#dialog-close");
const dialogDone = document.querySelector("#dialog-done");
const SPRITE_FRAME_COUNT = 6;
const SCROLL_PER_FRAME = 24;
const STOP_COPY_FADE_DISTANCE = 220;
let previousScrollY = window.scrollY;
let distanceSinceFrame = 0;
let currentSpriteFrame = 0;

function renderStops() {
  routeStops.innerHTML = stops.map((stop, index) => {
    const testNames = stop.tests.map((test) => test.name).join(" + ");
    const marker = String(index + 1).padStart(2, "0");
    const openLabel = stop.tests.length > 1 ? content.labels.openTests : content.labels.openTest;
    return `
      <div class="route-stop">
        <button class="stop-marker" type="button" data-open-stop="${index}" aria-label="${openLabel} ${stop.name}"><span>${marker}</span></button>
        <button class="stop-copy" type="button" data-open-stop="${index}" aria-label="${openLabel} ${stop.name}">
          <span class="stop-meta">${content.labels.stop} ${String(index + 1).padStart(2, "0")}</span>
          <span class="stop-name">${stop.name}</span>
          <span class="stop-tests">${testNames}</span>
        </button>
      </div>`;
  }).join("");

  routeStops.querySelectorAll("[data-open-stop]").forEach((button) => {
    button.addEventListener("click", () => openStopTests(Number(button.dataset.openStop)));
  });
}

function renderContent() {
  document.querySelector("#intro-label").textContent = content.labels.guide;
  document.querySelector("#intro-kicker").textContent = content.labels.introKicker;
  document.querySelector("#intro-title").textContent = content.intro.title;
  document.querySelector("#intro-description").textContent = content.intro.description;
  document.querySelector("#intro-start-label").textContent = content.labels.startRoute;
  document.querySelector("#intro-close").setAttribute("aria-label", content.labels.minimizeGuide);
  introReopen.setAttribute("aria-label", content.labels.openGuide);
  introReopen.title = content.labels.openGuide;
  introReminders.innerHTML = content.intro.reminders.map((reminder, index) => `
    <li><span>${String(index + 1).padStart(2, "0")}</span><p>${reminder}</p></li>
  `).join("");
  document.querySelector("#dialog-rule-label").textContent = content.labels.missionRule;
  document.querySelector("#dialog-close").setAttribute("aria-label", content.labels.closeTest);
  document.querySelector("#dialog-done-label").textContent = content.labels.acknowledge;
}

function openStopTests(stopIndex) {
  showTest(stopIndex, 0);
}

function showTest(stopIndex, testIndex) {
  const stop = stops[stopIndex];
  const test = stop.tests[testIndex];
  const totalTests = stops.reduce((total, item) => total + item.tests.length, 0);
  document.querySelector("#dialog-stop-label").textContent = `${content.labels.stop} ${String(stopIndex + 1).padStart(2, "0")} · ${stop.name.toUpperCase()}`;
  document.querySelector("#dialog-index").textContent = `${content.labels.test} ${String(getTestNumber(stopIndex, testIndex)).padStart(2, "0")} ${content.labels.of} ${String(totalTests).padStart(2, "0")}`;
  document.querySelector("#dialog-title").textContent = test.name;
  document.querySelector("#dialog-description").textContent = test.description;
  document.querySelector("#dialog-rule-text").textContent = test.rule;
  testDialog.dataset.stopIndex = String(stopIndex);
  testDialog.dataset.testIndex = String(testIndex);
  testDialog.showModal();
}

function getTestNumber(stopIndex, testIndex) {
  return stops.slice(0, stopIndex).reduce((total, stop) => total + stop.tests.length, 0) + testIndex + 1;
}

function updateGokuSprite() {
  const currentScrollY = window.scrollY;
  distanceSinceFrame += Math.abs(currentScrollY - previousScrollY);
  previousScrollY = currentScrollY;

  const framesToAdvance = Math.floor(distanceSinceFrame / SCROLL_PER_FRAME);
  if (framesToAdvance > 0) {
    currentSpriteFrame = (currentSpriteFrame + framesToAdvance) % SPRITE_FRAME_COUNT;
    distanceSinceFrame %= SCROLL_PER_FRAME;
    routeAvatar.style.backgroundPositionX = `${currentSpriteFrame * 20}%`;
  }

  updateStopCopyScales();
}

function updateStopCopyScales() {
  const avatarRect = routeAvatar.getBoundingClientRect();
  const avatarCenterY = avatarRect.top + avatarRect.height / 2;
  const cards = [...routeStops.querySelectorAll(".stop-copy")].map((card) => {
    const rect = card.getBoundingClientRect();
    const cardCenterY = rect.top + rect.height / 2;
    const scale = Math.min(1, Math.abs(avatarCenterY - cardCenterY) / STOP_COPY_FADE_DISTANCE);
    return { card, scale };
  });

  cards.forEach(({ card, scale }) => {
    card.style.setProperty("--approach-scale", scale.toFixed(3));
    card.style.setProperty("--approach-opacity", scale.toFixed(3));
    card.style.pointerEvents = scale < 0.15 ? "none" : "";
  });
}

function showIntroDialog() {
  introReopen.hidden = true;
  introDialog.showModal();
}

function minimizeIntroDialog() {
  introDialog.close();
  introReopen.hidden = false;
}

introDialog.addEventListener("cancel", () => {
  introReopen.hidden = false;
});
introDialog.addEventListener("click", (event) => {
  if (event.target === introDialog) minimizeIntroDialog();
});
document.querySelector("#intro-close").addEventListener("click", minimizeIntroDialog);
document.querySelector("#intro-start").addEventListener("click", minimizeIntroDialog);
introReopen.addEventListener("click", showIntroDialog);

dialogClose.addEventListener("click", () => testDialog.close());
dialogDone.addEventListener("click", () => {
  const stopIndex = Number(testDialog.dataset.stopIndex);
  const testIndex = Number(testDialog.dataset.testIndex);
  const nextTestIndex = testIndex + 1;
  if (nextTestIndex < stops[stopIndex].tests.length) {
    showTest(stopIndex, nextTestIndex);
  } else {
    testDialog.close();
  }
});

testDialog.addEventListener("click", (event) => {
  if (event.target === testDialog) testDialog.close();
});

renderContent();
renderStops();
updateStopCopyScales();
window.addEventListener("scroll", updateGokuSprite, { passive: true });
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.addEventListener("load", () => {
  window.scrollTo(0, document.documentElement.scrollHeight);
  showIntroDialog();
}, { once: true });