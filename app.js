const stops = [
  {
    name: "Puerta del Sol",
    tests: [
      {
        name: "Quién es quién",
        description: "Poned a prueba vuestra memoria: cada persona recibe pistas sobre alguien del grupo y tendrá que descubrir de quién se trata.",
        rule: "No se puede decir el nombre. Ganáis un punto por cada identidad acertada."
      }
    ]
  },
  {
    name: "Plaza de Callao",
    tests: [
      {
        name: "Photo challenge",
        description: "Recibid una lista de fotos que el equipo debe recrear por la zona. Buscad el encuadre, repartid los papeles y guardad la prueba.",
        rule: "Completad todas las fotos antes de seguir a la próxima parada."
      }
    ]
  },
  {
    name: "Plaza de España",
    tests: [
      {
        name: "Reconstruir la frase",
        description: "Las palabras de una frase se han mezclado. Ordenadlas en equipo para descubrir el mensaje secreto.",
        rule: "Cada persona solo puede mover una palabra por turno."
      }
    ]
  },
  {
    name: "Templo de Debod",
    tests: [
      {
        name: "Encuentra la Bola",
        description: "Una Bola de Dragón se ha escondido cerca. Seguid las pistas y explorad con atención, sin salir de las zonas permitidas.",
        rule: "No hace falta mover ni tocar nada del entorno para encontrarla."
      }
    ]
  },
  {
    name: "Plaza de Oriente",
    tests: [
      {
        name: "Danza fusión",
        description: "En parejas, sincronizad los movimientos de la danza fusión. La coordinación importa más que la coreografía perfecta.",
        rule: "El equipo decide si la fusión ha salido bien. ¡A la cuenta de tres!"
      }
    ]
  },
  {
    name: "Plaza Mayor",
    tests: [
      {
        name: "Blind test",
        description: "Escuchad unos segundos de música y adivinad la canción, la serie o el personaje al que pertenece.",
        rule: "Decid la respuesta antes de que termine el fragmento. Un punto por acierto."
      },
      {
        name: "Cuadro colectivo",
        description: "Cada persona añade un detalle al mismo dibujo. Al final, el grupo tendrá una ilustración hecha entre todos.",
        rule: "Por turnos, cada participante dibuja una parte sin borrar las anteriores."
      }
    ]
  }
];

const routeStops = document.querySelector("#route-stops");
const routeAvatar = document.querySelector("#route-avatar");
const testDialog = document.querySelector("#test-dialog");
const dialogClose = document.querySelector("#dialog-close");
const dialogDone = document.querySelector("#dialog-done");
const SPRITE_FRAME_COUNT = 6;
const SCROLL_PER_FRAME = 24;
let previousScrollY = window.scrollY;
let distanceSinceFrame = 0;
let currentSpriteFrame = 0;

function renderStops() {
  routeStops.innerHTML = stops.map((stop, index) => {
    const testNames = stop.tests.map((test) => test.name).join(" + ");
    const marker = String(index + 1).padStart(2, "0");
    return `
      <div class="route-stop">
        <button class="stop-marker" type="button" data-open-stop="${index}" aria-label="Abrir prueba${stop.tests.length > 1 ? "s" : ""} de ${stop.name}"><span>${marker}</span></button>
        <button class="stop-copy" type="button" data-open-stop="${index}" aria-label="Abrir prueba${stop.tests.length > 1 ? "s" : ""} de ${stop.name}">
          <span class="stop-meta">PARADA ${String(index + 1).padStart(2, "0")}</span>
          <span class="stop-name">${stop.name}</span>
          <span class="stop-tests">${testNames}</span>
        </button>
      </div>`;
  }).join("");

  routeStops.querySelectorAll("[data-open-stop]").forEach((button) => {
    button.addEventListener("click", () => openStopTests(Number(button.dataset.openStop)));
  });
}

function openStopTests(stopIndex) {
  showTest(stopIndex, 0);
}

function showTest(stopIndex, testIndex) {
  const stop = stops[stopIndex];
  const test = stop.tests[testIndex];
  document.querySelector("#dialog-stop-label").textContent = `PARADA ${String(stopIndex + 1).padStart(2, "0")} · ${stop.name.toUpperCase()}`;
  document.querySelector("#dialog-index").textContent = `PRUEBA ${String(getTestNumber(stopIndex, testIndex)).padStart(2, "0")} DE 07`;
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
  if (framesToAdvance === 0) return;

  currentSpriteFrame = (currentSpriteFrame + framesToAdvance) % SPRITE_FRAME_COUNT;
  distanceSinceFrame %= SCROLL_PER_FRAME;
  routeAvatar.style.backgroundPositionX = `${currentSpriteFrame * 20}%`;
}

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

renderStops();
window.addEventListener("scroll", updateGokuSprite, { passive: true });
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.addEventListener("load", () => {
  window.scrollTo(0, document.documentElement.scrollHeight);
}, { once: true });