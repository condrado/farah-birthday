const languageContent = window.GAME_CONTENT;
const LANGUAGE_STORAGE_KEY = "farah-birthday-language";
const INTRO_DISMISSED_STORAGE_KEY = "farah-birthday-intro-dismissed";
let currentLanguage = languageContent[sessionStorage.getItem(LANGUAGE_STORAGE_KEY)] ? sessionStorage.getItem(LANGUAGE_STORAGE_KEY) : "es";
let content = languageContent[currentLanguage];
let stops = content.stops;
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
const INTRO_ANIMATION_DURATION = 420;
let previousScrollY = window.scrollY;
let distanceSinceFrame = 0;
let currentSpriteFrame = 0;
let introTransitioning = false;

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
  document.documentElement.lang = currentLanguage;
  document.title = content.pageTitle;
  document.querySelector("#document-description").content = content.pageDescription;
  document.querySelector("#game-logo").alt = content.logoAlt;
  document.querySelector("#page-title-text").textContent = content.pageTitle;
  document.querySelector("#game-world").setAttribute("aria-label", content.routeLabel);
  document.querySelector("#intro-label").textContent = content.labels.guide;
  document.querySelector("#intro-kicker").textContent = content.labels.introKicker;
  setRichText(document.querySelector("#intro-title"), content.intro.title);
  setRichText(document.querySelector("#intro-description"), content.intro.description);
  document.querySelector("#intro-start-label").textContent = content.labels.startRoute;
  document.querySelector("#intro-close").setAttribute("aria-label", content.labels.minimizeGuide);
  introReopen.setAttribute("aria-label", content.labels.openGuide);
  introReopen.title = content.labels.openGuide;
  introReminders.replaceChildren(...content.intro.reminders.map((reminder, index) => {
    const item = document.createElement("li");
    const number = document.createElement("span");
    const text = document.createElement("p");
    number.textContent = String(index + 1).padStart(2, "0");
    setRichText(text, reminder);
    item.append(number, text);
    return item;
  }));
  document.querySelector("#dialog-rule-label").textContent = content.labels.missionRule;
  document.querySelector("#dialog-close").setAttribute("aria-label", content.labels.closeTest);
  document.querySelector("#dialog-done-label").textContent = content.labels.acknowledge;
  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.textContent = content.labels.switchLanguage;
    button.setAttribute("aria-label", content.labels.switchLanguageAria);
  });
}

function setRichText(element, text) {
  const template = document.createElement("template");
  template.innerHTML = text;

  const appendNode = (node, parent) => {
    if (node.nodeType === Node.TEXT_NODE) {
      parent.append(document.createTextNode(node.textContent));
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.tagName === "BR") {
      parent.append(document.createElement("br"));
      return;
    }

    const isBold = node.tagName === "B" || node.tagName === "STRONG";
    let childParent = parent;

    if (isBold) {
      childParent = document.createElement(node.tagName.toLowerCase());
      parent.append(childParent);
    } else if (node.tagName === "A") {
      const href = node.getAttribute("href");
      try {
        const url = new URL(href, document.baseURI);
        if (href && ["http:", "https:"].includes(url.protocol)) {
          childParent = document.createElement("a");
          childParent.href = url.href;
          if (node.getAttribute("target") === "_blank") {
            childParent.target = "_blank";
            childParent.rel = "noopener noreferrer";
          }
          parent.append(childParent);
        }
      } catch {
        childParent = parent;
      }
    }

    node.childNodes.forEach((child) => appendNode(child, childParent));
  };

  const fragment = document.createDocumentFragment();
  template.content.childNodes.forEach((node) => appendNode(node, fragment));
  element.replaceChildren(fragment);
}

function openStopTests(stopIndex) {
  showTest(stopIndex, 0);
}

function renderTestDialog(stopIndex, testIndex) {
  const stop = stops[stopIndex];
  const test = stop.tests[testIndex];
  const totalTests = stops.reduce((total, item) => total + item.tests.length, 0);
  document.querySelector("#dialog-stop-label").textContent = `${content.labels.stop} ${String(stopIndex + 1).padStart(2, "0")} · ${stop.name.toUpperCase()}`;
  document.querySelector("#dialog-index").textContent = `${content.labels.test} ${String(getTestNumber(stopIndex, testIndex)).padStart(2, "0")} ${content.labels.of} ${String(totalTests).padStart(2, "0")}`;
  setRichText(document.querySelector("#dialog-title"), test.name);
  setRichText(document.querySelector("#dialog-description"), test.description);
  setRichText(document.querySelector("#dialog-rule-text"), test.rule);

  const illustration = document.querySelector("#dialog-illustration");
  illustration.hidden = !test.illustration;
  if (test.illustration) {
    illustration.src = test.illustration.src;
    illustration.alt = test.illustration.alt;
  } else {
    illustration.removeAttribute("src");
    illustration.alt = "";
  }

  const mapButton = document.querySelector("#dialog-map-button");
  mapButton.setAttribute("aria-label", content.labels.openMap);
  document.querySelector("#dialog-map-label").textContent = content.labels.mapLabel;
  try {
    const address = new URL(test.address, document.baseURI);
    mapButton.hidden = !["http:", "https:"].includes(address.protocol);
    mapButton.href = address.href;
  } catch {
    mapButton.removeAttribute("href");
    mapButton.hidden = true;
  }
}

function showTest(stopIndex, testIndex) {
  renderTestDialog(stopIndex, testIndex);
  testDialog.dataset.stopIndex = String(stopIndex);
  testDialog.dataset.testIndex = String(testIndex);
  testDialog.showModal();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === "es" ? "fr" : "es";
  content = languageContent[currentLanguage];
  stops = content.stops;
  sessionStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  renderContent();
  renderStops();
  updateStopCopyScales();

  if (testDialog.open) {
    renderTestDialog(Number(testDialog.dataset.stopIndex), Number(testDialog.dataset.testIndex));
  }
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
  if (introDialog.open || introTransitioning) return;

  const animateFromCapsule = !introReopen.hidden;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const capsuleRect = introReopen.getBoundingClientRect();
  if (animateFromCapsule && !reduceMotion) introDialog.classList.add("intro-dialog--opening");
  introReopen.hidden = true;
  introDialog.showModal();

  if (!animateFromCapsule || reduceMotion) return;

  const geometry = getIntroCapsuleGeometry(capsuleRect);
  introDialog.classList.remove("intro-dialog--opening");
  const collapsedTransform = `scale(${geometry.scaleX}, ${geometry.scaleY})`;
  introDialog.style.transformOrigin = geometry.transformOrigin;
  introDialog.style.transform = collapsedTransform;
  introDialog.style.opacity = "0";
  animateIntroDialog([
    { transform: collapsedTransform, opacity: 0 },
    { transform: "scale(1, 1)", opacity: 1 },
  ]);
}

function minimizeIntroDialog() {
  if (!introDialog.open || introTransitioning) return;

  sessionStorage.setItem(INTRO_DISMISSED_STORAGE_KEY, "true");
  introReopen.hidden = false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    introDialog.close();
    return;
  }

  introDialog.classList.add("intro-dialog--minimizing");
  const geometry = getIntroCapsuleGeometry(introReopen.getBoundingClientRect());
  introDialog.style.transformOrigin = geometry.transformOrigin;
  const collapsedTransform = `scale(${geometry.scaleX}, ${geometry.scaleY})`;
  animateIntroDialog([
    { transform: "scale(1, 1)", opacity: 1 },
    { transform: collapsedTransform, opacity: 0 },
  ], () => introDialog.close());
}

function getIntroCapsuleGeometry(capsuleRect) {
  const dialogRect = introDialog.getBoundingClientRect();
  const capsuleCenterX = capsuleRect.left + capsuleRect.width / 2;
  const capsuleCenterY = capsuleRect.top + capsuleRect.height / 2;

  return {
    transformOrigin: `${capsuleCenterX - dialogRect.left}px ${capsuleCenterY - dialogRect.top}px`,
    scaleX: capsuleRect.width / dialogRect.width,
    scaleY: capsuleRect.height / dialogRect.height,
  };
}

function animateIntroDialog(keyframes, onFinish = () => {}) {
  introTransitioning = true;
  const animation = introDialog.animate(keyframes, {
    duration: INTRO_ANIMATION_DURATION,
    easing: "cubic-bezier(.2, .8, .2, 1)",
  });

  const reset = () => {
    introDialog.style.removeProperty("transform-origin");
    introDialog.style.removeProperty("transform");
    introDialog.style.removeProperty("opacity");
    introDialog.classList.remove("intro-dialog--opening", "intro-dialog--minimizing");
    animation.cancel();
    introTransitioning = false;
  };

  void animation.finished.then(() => {
    onFinish();
    reset();
  }, reset);
}

introDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  minimizeIntroDialog();
});
introDialog.addEventListener("click", (event) => {
  if (event.target === introDialog) minimizeIntroDialog();
});
document.querySelector("#intro-close").addEventListener("click", minimizeIntroDialog);
document.querySelector("#intro-start").addEventListener("click", minimizeIntroDialog);
introReopen.addEventListener("click", showIntroDialog);
document.querySelectorAll("[data-language-toggle]").forEach((button) => {
  button.addEventListener("click", toggleLanguage);
});

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
  if (sessionStorage.getItem(INTRO_DISMISSED_STORAGE_KEY) === "true") {
    introReopen.hidden = false;
  } else {
    showIntroDialog();
  }
}, { once: true });