window.GAME_CONTENT = {
  es: {
    pageTitle: "La ruta de las siete pruebas",
    pageDescription: "Guía interactiva de una aventura de cumpleaños por Madrid.",
    logoAlt: "Logo de Farah y las bolas de dragón",
    routeLabel: "Recorrido por las paradas",
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
      openTests: "Abrir pruebas de",
      openMap: "Abrir en Google Maps",
      mapLabel: "Ubicación",
      switchLanguage: "Français",
      switchLanguageAria: "Cambiar a francés"
    },
    intro: {
      title: "¡A por las siete bolas de dragón!",
      description: "Seis paradas por Madrid, siete pruebas y todos juntos en una aventura de Dragon Ball.",
      reminders: [
        "Para descubrir cada parada en esta web, mueve a Goku por el camino hacia el norte.",
        "Toca cada una de las paradas para leer el detalle de esa parada.",
        "Esta guía estará disponible durante todo el recorrido en la parte inferior derecha, en el icono de la cápsula <strong>«info»</strong>.",
        "No olvides traer unas <strong>gafas de sol</strong>.",
        "Comenzamos en <strong>Café Mies</strong>, en <a href='https://maps.google.com/?cid=16979313154604772280' target='_blank'><strong>Av. del General Perón, 4, Tetuán, 28020 Madrid</strong></a>, a las <strong>16:00</strong>."
      ]
    },
    stops: [
      {
        name: "Café Mies",
        tests: [
          {
            name: "Quién es quién",
            address: "https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+Mies%2C+Av.+del+General+Per%C3%B3n%2C+4%2C+Madrid",
            description: "Se mostrarán fotos de bebé de los asistentes a la fiesta. El objetivo de Farah es identificar correctamente a qué amigo o familiar corresponde cada imagen.",
            rule: "Deberá acertar al menos 6 para superar la prueba y conseguir la primera Bola de Dragón"
          }
        ]
      },
      {
        name: "Parque Perón",
        tests: [
          {
            name: "Reto fotográfico",
            address: "https://maps.google.com/?cid=1124523401195225107",
            description: "Farah se convierte en la fotógrafa del evento. El objetivo es conseguir seis fotografías que cumplan con la lista de peticiones en un tiempo límite de cuatro minutos, utilizando a los invitados como modelos.",
            rule: "Obtendrá la segunda Bola de Dragón si consigue tomar al menos 4 de las 6 fotos solicitadas dentro del tiempo límite.<br>Lista de peticiones:<br>- Una máquina infernal<br>- La oficina de Garaje de Ideas<br>- Una pasarela de moda<br>- Un coro de niños<br>- Una selva tropical<br>- Un concierto con pogo<br>- Un grupo de palomas que ha visto un trozo de pan<br>- Una cena romántica en un restaurante de cinco estrellas<br>- Tres velas fundidas"
          }
        ]
      },
      {
        name: "Esquina de la Calle San Germán",
        tests: [
          {
            name: "Reconstruir la frase",
            address: "https://maps.google.com/?cid=7236403782645840986",
            description: "Sin previo aviso, los cómplices se pondrán gafas de sol y comenzarán a repetir únicamente una palabra clave asignada (ya sea en bucle o cada vez que Farah les dirija la palabra). El objetivo de Farah es descifrar qué está ocurriendo y descubrir la frase oculta.",
            rule: "Obtendrá la tercera Bola de Dragón en cuanto se descubra la frase oculta.<br><br><strong>Instrucciones para los cómplices:</strong><br>En completo silencio, pónganse las gafas de sol al mismo tiempo. A partir de ese momento, está prohibido hablar con normalidad: repitan únicamente la palabra que se les haya asignado, en bucle o cada vez que Farah les pregunte algo."
          }
        ]
      },
      {
        name: "Parque de Monos",
        tests: [
          {
            name: "Encuentra la Bola",
            address: "https://maps.google.com/?cid=7599943738742930448",
            description: "Hay una bola oculta en la zona del parque de monos.",
            rule: "El objetivo de Farah es rastrear la zona y encontrarla para superar la prueba. Puede pedir ayuda si lo necesita."
          }
        ]
      },
      {
        name: "Parque Sahagún",
        tests: [
          {
            name: "Danza fusión",
            address: "https://maps.google.com/?cid=6906512151522153031",
            description: "Una prueba de creatividad y coordinación por parejas en la que los invitados inventan su propio baile sincronizado, que será evaluado por un jurado de honor.",
            rule: "Instrucciones:<br><br>- Farah debe organizar a todos los invitados en parejas (incluida ella misma) y reservar a Mariana (su madre) para un papel especial.<br><br>- Cada pareja debe crear y ensayar una mini «danza de fusión» de entre 4 y 5 segundos. Mariana actuará como jurado oficial y elegirá a la pareja con la mejor coreografía.<br><br>- Una vez anunciado el equipo ganador, todos los asistentes deben aprender y bailar juntos la coreografía ganadora."
          }
        ]
      },
      {
        name: "Casa Martín",
        tests: [
          {
            name: "Blind test",
            address: "https://maps.google.com/?cid=5046164161605831220",
            description: "Una prueba de agudeza musical y oído fino donde los invitados pondrán a prueba la memoria sonora de Farah tarareando temas conocidos.",
            rule: "Los invitados irán pasando uno por uno para tararear una canción sin usar palabras ni sonidos instrumentales.<br><br>El objetivo de Farah es identificar y adivinar el nombre del tema (o el artista) que interpreta cada participante.<br><br>Conseguirá la Bola de Dragón si adivina 6 de las 12 canciones."
          }
        ]
      },
      {
        name: "Casa Martín",
        tests: [
          {
            name: "Cuadro colectivo",
            address: "https://maps.google.com/?cid=5046164161605831220",
            description: "Una prueba artística y de observación en la que los invitados pondrán a prueba su talento dibujándose unos a otros, para culminar en un duelo de retratos muy especial.",
            rule: "Farah asigna qué invitado dibujará a quién, asegurando que ella y Mariana (su madre) queden emparejadas para retratarse mutuamente.<br><br>Cada participante debe realizar el retrato de la persona que le tocó en su papel o libreta.<br><br>Al finalizar, se exhibirán todos los dibujos y se revelará el resultado de cada retrato."
          }
        ]
      }
    ]
  },
  fr: {
    pageTitle: "Le parcours des sept épreuves",
    pageDescription: "Guide interactif d'une aventure d'anniversaire à Madrid.",
    logoAlt: "Logo de Farah et des Dragon Balls",
    routeLabel: "Parcours des étapes",
    labels: {
      guide: "GUIDE DU JEU",
      openGuide: "Ouvrir le guide et les rappels",
      minimizeGuide: "Réduire le guide",
      introKicker: "AVENTURE D'ANNIVERSAIRE",
      startRoute: "Commencer le parcours",
      stop: "ÉTAPE",
      test: "ÉPREUVE",
      of: "SUR",
      missionRule: "RÈGLE DE LA MISSION",
      closeTest: "Fermer l'épreuve",
      acknowledge: "Compris !",
      openTest: "Ouvrir l'épreuve de",
      openTests: "Ouvrir les épreuves de",
      openMap: "Ouvrir dans Google Maps",
      mapLabel: "Localisation",
      switchLanguage: "Español",
      switchLanguageAria: "Passer en espagnol"
    },
    intro: {
      title: "En route pour les sept Dragon Balls !",
      description: "Six étapes à Madrid, sept épreuves et une aventure Dragon Ball à vivre tous ensemble.",
      reminders: [
        "Pour découvrir chaque étape sur ce site, faites avancer Goku vers le nord le long du chemin.",
        "Touchez chaque étape pour lire les détails de l'épreuve.",
        "Ce guide restera disponible pendant tout le parcours, en bas à droite, via l'icône de la capsule <strong>« info »</strong>.",
        "N'oubliez pas vos <strong>lunettes de soleil</strong>.",
        "Nous commencerons au <strong>Café Mies</strong>, au <a href='https://maps.google.com/?cid=16979313154604772280' target='_blank'><strong>4, avenue du Général Perón, Tetuán, 28020 Madrid</strong></a>, à <strong>16 h</strong>."
      ]
    },
    stops: [
      {
        name: "Café Mies",
        tests: [
          {
            name: "Qui est qui ?",
            address: "https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+Mies%2C+Av.+del+General+Per%C3%B3n%2C+4%2C+Madrid",
            description: "Des photos de bébé des personnes présentes à la fête seront montrées. Farah devra retrouver à quel ami ou membre de sa famille correspond chaque photo.",
            rule: "Elle devra en reconnaître au moins 6 pour réussir l'épreuve et obtenir la première Dragon Ball."
          }
        ]
      },
      {
        name: "Parque Perón",
        tests: [
          {
            name: "Défi photo",
            address: "https://maps.google.com/?cid=1124523401195225107",
            description: "Farah devient la photographe de l'événement. Elle doit prendre six photos correspondant à la liste de demandes en quatre minutes, en utilisant les invités comme modèles.",
            rule: "Farah obtiendra la deuxième Dragon Ball si elle réussit à prendre au moins 4 des 6 photos demandées dans le temps imparti.<br>Liste de demandes :<br>- Une machine infernale<br>- Les bureaux de Garaje de Ideas<br>- Un défilé de mode<br>- Une chorale d'enfants<br>- Une forêt tropicale<br>- Un concert avec pogo<br>- Un groupe de pigeons qui a repéré un morceau de pain<br>- Un dîner romantique dans un restaurant cinq étoiles<br>- Trois bougies fondues"
          }
        ]
      },
      {
        name: "Esquina de la Calle San Germán",
        tests: [
          {
            name: "Reconstituer la phrase",
            address: "https://maps.google.com/?cid=7236403782645840986",
            description: "Sans prévenir, les complices mettront leurs lunettes de soleil et commenceront à répéter uniquement le mot-clé qui leur a été attribué, soit en boucle, soit chaque fois que Farah leur adressera la parole. Farah devra comprendre ce qui se passe et découvrir la phrase cachée.",
            rule: "Farah obtiendra la troisième Dragon Ball dès que la phrase cachée sera découverte.<br><br><strong>Instructions pour les complices :</strong><br>En silence complet, mettez vos lunettes de soleil en même temps. À partir de ce moment, il est interdit de parler normalement : répétez uniquement le mot qui vous a été attribué, en boucle ou chaque fois que Farah vous pose une question."
          }
        ]
      },
      {
        name: "Parque de Monos",
        tests: [
          {
            name: "Trouver la boule",
            address: "https://maps.google.com/?cid=7599943738742930448",
            description: "Une boule est cachée dans la zone du Parque de Monos.",
            rule: "Farah doit explorer la zone et trouver la boule pour réussir l'épreuve. Elle peut demander de l'aide si nécessaire."
          }
        ]
      },
      {
        name: "Parque Sahagún",
        tests: [
          {
            name: "Danse fusion",
            address: "https://maps.google.com/?cid=6906512151522153031",
            description: "Une épreuve de créativité et de coordination en duo, où les invités inventent leur propre danse synchronisée, évaluée par un jury d'honneur.",
            rule: "Instructions :<br><br>- Farah doit répartir tous les invités en binômes (elle comprise) et réserver un rôle spécial à Mariana (sa mère).<br><br>- Chaque binôme doit créer et répéter une mini « danse de la fusion » de 4 à 5 secondes. Mariana fera office de juge et choisira le binôme ayant la meilleure chorégraphie.<br><br>- Une fois l'équipe gagnante annoncée, tous les participants devront apprendre et danser ensemble la chorégraphie gagnante."
          }
        ]
      },
      {
        name: "Casa Martín",
        tests: [
          {
            name: "Blind test musical",
            address: "https://maps.google.com/?cid=5046164161605831220",
            description: "Une épreuve d'acuité musicale et d'oreille fine : les invités fredonnent des airs connus pour mettre à l'épreuve la mémoire musicale de Farah.",
            rule: "Les invités passeront un par un pour fredonner une chanson, sans paroles ni sons instrumentaux.<br><br>Farah devra reconnaître et deviner le titre ou l'artiste interprété par chaque personne.<br><br>Elle obtiendra la Dragon Ball si elle devine 6 des 12 chansons."
          }
        ]
      },
      {
        name: "Casa Martín",
        tests: [
          {
            name: "Dessin collectif",
            address: "https://maps.google.com/?cid=5046164161605831220",
            description: "Une épreuve artistique et d'observation où les invités mettront leur talent à l'épreuve en se dessinant les uns les autres, avant un duel de portraits très spécial.",
            rule: "Farah désigne qui dessinera qui, en veillant à ce qu'elle et Mariana (sa mère) soient associées pour se dessiner mutuellement.<br><br>Chaque personne doit dessiner le portrait de la personne qui lui a été attribuée, sur une feuille ou dans un carnet.<br><br>À la fin, tous les dessins seront exposés et le résultat de chaque portrait sera révélé."
          }
        ]
      }
    ]
  }
};