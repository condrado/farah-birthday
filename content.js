window.GAME_CONTENT = {
  labels: {
    guide: "GUÍA DEL JUEGO",
    openGuide: "Abrir guía y recordatorios",
    minimizeGuide: "Minimizar guía",
    introKicker: "AVENTURA DE CUMPLEAÑOS",
    startRoute: "Empezar recorrido",
    stop: "PARADA",
    test: "PRUEBA",
    of: "DE",
    missionRule: "REGLA DE LA MISIÓN",
    closeTest: "Cerrar prueba",
    acknowledge: "¡Entendido!",
    openTest: "Abrir prueba de",
    openTests: "Abrir pruebas de"
  },
  intro: {
    title: "¡A por las siete pruebas!",
    description: "Seis paradas por Madrid, siete pruebas y todo el equipo en una aventura de Dragon Ball.",
    reminders: [
      "Desplázate hacia arriba para avanzar. Goku se queda fijo mientras se mueve el camino.",
      "Toca el pin o el cartel de una parada para leer su prueba. La carretera no es interactiva.",
      "En Plaza Mayor hay dos pruebas: Blind test y Cuadro colectivo.",
      "Mantened al grupo junto y cruzad las calles con atención."
    ]
  },
  stops: [
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
  ]
};