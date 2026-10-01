/**
 * CONTENT.JS - Datos e Identidad Real de Río Tercero
 * Capital Nacional del Deportista (Ley Nacional Nº 27.380 / 27.396)
 *
 * Estética Editorial Deportiva de Alto Rendimiento
 * Telemetría, Fichas Coleccionables y Clubes Formadores Verificables.
 */

// Colección Estructurada conforme a interfaz Deportista
window.DEPORTISTAS_DATA = [
  {
    id: '1',
    nombre: 'Pablo Prigioni',
    disciplina: 'Básquetbol',
    clubOrigen: 'Club Sportivo 9 de Julio',
    logroPrincipal: 'Bronce Olímpico Pekín 2008 · Ex NBA',
    categoria: 'Olímpico / Élite',
    dorsal: '09',
    imagenUrl: 'assets/prigioni.jpg',
    destacado: true,
    descripcion: 'Base titular de la Generación Dorada y medallista olímpico de bronce en Pekín 2008. Disputó 4 temporadas en la NBA (Knicks, Rockets, Clippers) y actualmente es entrenador jefe de la Selección Argentina.'
  },
  {
    id: '2',
    nombre: 'José María López',
    disciplina: 'Automovilismo',
    clubOrigen: 'Kartódromo Río Tercero',
    logroPrincipal: '5x Campeón Mundial FIA (WTCC & WEC)',
    categoria: 'Mundial',
    dorsal: '37',
    imagenUrl: 'assets/pechito.jpg',
    destacado: true,
    descripcion: 'Pentacampeón mundial de la FIA (tricampeón WTCC y bicampeón WEC) y ganador absoluto de las 24 Horas de Le Mans con Toyota Gazoo Racing.'
  },
  {
    id: '3',
    nombre: 'Andrea Berrino',
    disciplina: 'Natación',
    clubOrigen: 'C.A. Río Tercero',
    logroPrincipal: 'Plusmarquista Sudamericana 50m y 100m Espalda',
    categoria: 'Internacional',
    dorsal: '04',
    imagenUrl: 'assets/andrea_berrino.jpg',
    descripcion: 'Plusmarquista sudamericana en 50m y 100m espalda, medallista panamericana en Lima 2019 y máxima referente histórica de la natación argentina.'
  },
  {
    id: '4',
    nombre: 'Catalina Primo',
    disciplina: 'Fútbol',
    clubOrigen: 'Club Sportivo 9 de Julio',
    logroPrincipal: 'Selección Nacional Mayor / River Plate',
    categoria: 'Profesional',
    dorsal: '11',
    imagenUrl: 'assets/catalina_primo.png',
    descripcion: 'Delantera internacional de la Selección Argentina con destacadas etapas en River Plate y UAI Urquiza, campeona de Primera División y participante de Copa Libertadores.'
  },
  {
    id: '5',
    nombre: 'Ivano Falchetti',
    disciplina: 'Tiro',
    clubOrigen: 'Tiro Federal Río Tercero',
    logroPrincipal: 'Representante Internacional y Nacional',
    categoria: 'Nacional',
    dorsal: '01',
    imagenUrl: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Destacado tirador deportivo de precisión de nivel nacional e internacional en fosa y hélice, laureado representante del Tiro Federal Río Tercero.'
  },
  {
    id: '6',
    nombre: 'Claudio "Piojo" López',
    disciplina: 'Fútbol',
    clubOrigen: 'C.A. Río Tercero / 9 de Julio',
    logroPrincipal: 'Plata Olímpica Atlanta 96 · Copas del Mundo 98 y 02',
    categoria: 'Olímpico / Mundial',
    dorsal: '07',
    imagenUrl: 'assets/piojo.png',
    descripcion: 'Medallista de plata en los Juegos Olímpicos de Atlanta 1996 y dos veces mundialista (Francia 1998 y Corea-Japón 2002). Ídolo histórico en Valencia CF, Lazio y Racing Club.'
  },
  {
    id: '7',
    nombre: 'Gustavo Fernández',
    disciplina: 'Tenis',
    clubOrigen: 'Club Sportivo 9 de Julio',
    logroPrincipal: '5x Campeón Grand Slam · Ex N° 1 Mundial',
    categoria: 'Grand Slam / Élite',
    dorsal: '01',
    imagenUrl: 'assets/gustavo.jpg',
    descripcion: 'Cinco veces campeón individual de Grand Slam (Roland Garros, Wimbledon y Abierto de Australia) y ex número 1 del mundo en tenis adaptado.'
  },
  {
    id: '8',
    nombre: 'Ivanna Madruga',
    disciplina: 'Tenis',
    clubOrigen: 'Club Atlético Río Tercero',
    logroPrincipal: 'Top 15 WTA · Cuartos Roland Garros 1980',
    categoria: 'Pionera Grand Slam',
    dorsal: '14',
    imagenUrl: 'assets/ivanna.jpg',
    descripcion: 'Pionera del tenis sudamericano que alcanzó el puesto 14 del ranking mundial WTA, cuartofinalista individual en Roland Garros 1980 y finalista en el US Open.'
  },
  {
    id: '9',
    nombre: 'Rocío Comba',
    disciplina: 'Atletismo',
    clubOrigen: 'Polideportivo / Fábrica Militar',
    logroPrincipal: 'Triple Olímpica (08, 12, 16) · Finalista Mundial',
    categoria: 'Triple Olímpica',
    dorsal: '08',
    imagenUrl: 'assets/comba.jpg',
    descripcion: 'Histórica lanzadora de disco con tres participaciones olímpicas consecutivas (Pekín 2008, Londres 2012 y Río 2016) y finalista en el Campeonato Mundial de Moscú 2013.'
  },
  {
    id: '10',
    nombre: 'Oscar Galíndez',
    disciplina: 'Atletismo',
    clubOrigen: 'Polideportivo Municipal',
    logroPrincipal: 'Olímpico Sydney 2000 · Campeón Mundial Duatlón',
    categoria: 'Olímpico / Ironman',
    dorsal: '22',
    imagenUrl: 'https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=800&q=80',
    descripcion: 'Leyenda del triatlón latinoamericano, representante olímpico en Sydney 2000, campeón mundial de duatlón y múltiple vencedor del circuito Ironman.'
  }
];

window.DISCIPLINAS = ['TODOS', 'BÁSQUETBOL', 'AUTOMOVILISMO', 'NATACIÓN', 'FÚTBOL', 'TIRO', 'TENIS', 'ATLETISMO'];

window.SITE_CONTENT = {
  // Identidad Institucional
  institution: {
    city: "Río Tercero",
    province: "Córdoba",
    country: "Argentina",
    title: "Capital Nacional del Deportista",
    subtitle: "Directorio Oficial & Archivo de Rendimiento Atlético",
    lawDeclaration: "Ley Nacional 27.380 / 27.396 · Capital Nacional del Deportista",
    leadText: "Río Tercero es una ciudad de 50.000 habitantes a orillas del Ctalamochita donde cada barrio creció con un club, un potrero o una pista. Aquí surgieron medallistas olímpicos, tricampeones mundiales de la FIA y reyes de Grand Slam.",
    authorCredit: "Presentación para el Área de Deportes y Juventud de Río Tercero",
    academicCredit: "Archivo Editorial de Rendimiento · Edición 2026"
  },

  // Métricas Clave de Telemetría Cívica
  metrics: [
    {
      value: "5",
      unit: "Atletas",
      label: "En Juegos Olímpicos",
      context: "Pekín, Londres, Río, Sydney, Atlanta",
      code: "MET-01"
    },
    {
      value: "8+",
      unit: "Títulos",
      label: "Campeonatos del Mundo",
      context: "WTCC, WEC Le Mans, Tenis Grand Slam, Duatlón",
      code: "MET-02"
    },
    {
      value: "12",
      unit: "Clubes",
      label: "Instituciones con Infraestructura",
      context: "Básquet, fútbol, tenis, bochas, atletismo",
      code: "MET-03"
    },
    {
      value: "27.396",
      unit: "Ley Nac.",
      label: "Sancionada por el Congreso",
      context: "Reconocimiento patrimonial unánime (2017)",
      code: "MET-04"
    }
  ],

  // Directorio de Fichas Atléticas Coleccionables (Trading Cards)
  athletes: [
    {
      id: "prigioni",
      name: "Pablo Prigioni",
      dorsal: "09",
      discipline: "Básquetbol",
      disciplineKey: "basquetbol",
      badge: "BÁSQUETBOL · MEDALLA OLÍMPICA & NBA",
      club: "Club Sportivo 9 de Julio",
      palmares: "Bronce Pekín 2008",
      category: "Base / DT Selección",
      period: "NBA Knicks · Rockets · Clippers",
      photo: "assets/prigioni.jpg",
      isHeroBento: true,
      bio: "Nacido en Río Tercero y formado en el parquet del 'Patriota' (Sportivo 9 de Julio). Miembro de la Generación Dorada, medallista de bronce en los Juegos Olímpicos de Pekín 2008. Disputó cuatro temporadas en la NBA y en 2022 asumió como director técnico de la Selección Argentina masculina mayor.",
      telemetry: [
        { label: "Palmarés", val: "Bronce Pekín 2008" },
        { label: "Posición", val: "Base Armador" },
        { label: "Club Origen", val: "Sportivo 9 de Julio" }
      ]
    },
    {
      id: "pechito",
      name: "José María 'Pechito' López",
      dorsal: "37",
      discipline: "Automovilismo",
      disciplineKey: "automovilismo",
      badge: "AUTOMOVILISMO · FIA MUNDIAL",
      club: "Pistas y Kartódromos de Río 3",
      palmares: "3x WTCC · Le Mans 24h",
      category: "Piloto Oficial FIA WEC",
      period: "Activo Internacional",
      photo: "assets/pechito.jpg",
      isHeroBento: false,
      bio: "Tricampeón del Mundo del Campeonato Mundial de Turismos (WTCC) con Citroën de forma consecutiva (2014, 2015, 2016). Bicampeón del Campeonato Mundial de Resistencia (WEC) con Toyota Gazoo Racing y ganador de la general en las legendarias 24 Horas de Le Mans 2021.",
      telemetry: [
        { label: "Mundiales", val: "3x WTCC / 2x WEC" },
        { label: "Hito Máximo", val: "Ganador Le Mans 24h" },
        { label: "Escudería", val: "Toyota Gazoo / Akkodis" }
      ]
    },
    {
      id: "piojo",
      name: "Claudio 'Piojo' López",
      dorsal: "07",
      discipline: "Fútbol",
      disciplineKey: "futbol",
      badge: "FÚTBOL · SELECCIÓN ARGENTINA",
      club: "Club Atlético Río Tercero / 9 de Julio",
      palmares: "Plata Olímpica Atlanta 96",
      category: "Delantero Extremo",
      period: "Mundiales 1998 y 2002",
      photo: "assets/piojo.png",
      isHeroBento: false,
      bio: "Delantero supersónico formado en las canchas de baby fútbol de Río Tercero. Subcampeón olímpico en Atlanta 1996, titular con la Selección Argentina en las Copas del Mundo de Francia 1998 y Corea-Japón 2002. Campeón en Racing Club, Valencia CF (doble finalista de Champions) y Lazio.",
      telemetry: [
        { label: "Selección", val: "Subcampeón Olímpico" },
        { label: "Copas Mundiales", val: "Francia 98 · Corea 02" },
        { label: "Club Origen", val: "CART / 9 de Julio" }
      ]
    },
    {
      id: "gustavo",
      name: "Gustavo Fernández",
      dorsal: "01",
      discipline: "Tenis",
      disciplineKey: "tenis",
      badge: "TENIS ADAPTADO · 5x GRAND SLAM",
      club: "Polvo de Ladrillo Río Tercero",
      palmares: "5 Grand Slams Singles",
      category: "Singlista N° 1 Mundial",
      period: "Activo Circuito ITF",
      photo: "assets/gustavo.jpg",
      isHeroBento: false,
      bio: "Uno de los máximos tenistas adaptados de la historia. Campeón de 5 torneos de Grand Slam en individuales (Roland Garros 2016, 2019; Abierto de Australia 2017, 2019; Wimbledon 2019) y 3 en dobles. Abanderado de la delegación argentina en los Juegos Paralímpicos de Río 2016.",
      telemetry: [
        { label: "Grand Slams", val: "Roland Garros · Wimbledon · Aus" },
        { label: "Ranking", val: "Ex N° 1 del Mundo" },
        { label: "Distinción", val: "Premio Olimpia de Oro" }
      ]
    },
    {
      id: "berrino",
      name: "Andrea Berrino",
      dorsal: "04",
      discipline: "Natación",
      disciplineKey: "natacion",
      badge: "NATACIÓN · PANAMERICANA & RÉCORD",
      club: "Natatorios de Río Tercero",
      palmares: "Medalla Panamericana Lima 2019",
      category: "Espaldista / Estilos",
      period: "Selección Nacional CADDA",
      photo: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80",
      isHeroBento: false,
      bio: "Especialista en pruebas de espalda y relevos. Múltiple récord nacional en los 50m y 100m espalda, con participaciones en Campeonatos Mundiales de Natación en piscina corta y larga. Medallista de bronce en los Juegos Panamericanos de Lima 2019 y campeona sudamericana.",
      telemetry: [
        { label: "Récord Nac.", val: "50m y 100m Espalda" },
        { label: "Panamericanos", val: "Bronce Lima 2019" },
        { label: "Disciplina", val: "Natación de Élite" }
      ]
    },
    {
      id: "galindez",
      name: "Oscar Galíndez",
      dorsal: "22",
      discipline: "Triatlón",
      disciplineKey: "atletismo",
      badge: "TRIATLÓN · OLÍMPICO & IRONMAN",
      club: "Polideportivo Municipal Río Tercero",
      palmares: "Olímpico Sydney 2000",
      category: "Fondista / Triatleta",
      period: "Campeón Mundial Duatlón",
      photo: "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=crop&w=800&q=80",
      isHeroBento: false,
      bio: "Pionero del triatlón y fondismo sudamericano. Representó a Argentina en el debut olímpico de la disciplina en Sydney 2000. Fue campeón mundial de duatlón (1995), subcampeón mundial de Ironman 70.3 (2007) y múltiple vencedor del Ironman Brasil con base de entrenamiento en Río Tercero.",
      telemetry: [
        { label: "JJ.OO.", val: "Sydney 2000" },
        { label: "Ironman 70.3", val: "Subcampeón Mundial" },
        { label: "Entrenamiento", val: "Polideportivo Municipal" }
      ]
    },
    {
      id: "ivanna",
      name: "Ivanna Madruga",
      dorsal: "14",
      discipline: "Tenis",
      disciplineKey: "tenis",
      badge: "TENIS · CUARTOS ROLAND GARROS",
      club: "Club Atlético Río Tercero",
      palmares: "Top 15 Mundial WTA",
      category: "Singlista / Pionera",
      period: "Cuartos Roland Garros 1980",
      photo: "assets/ivanna.jpg",
      isHeroBento: false,
      bio: "Pionera indiscutida del tenis femenino profesional en Sudamérica. Alcanzó los cuartos de final de Roland Garros en 1980 y la final de dobles del US Open junto a Christiane Jolissaint. Lideró al equipo argentino de Fed Cup y abrió la huella de las mujeres en el polvo de ladrillo internacional.",
      telemetry: [
        { label: "Roland Garros", val: "Cuartofinalista 1980" },
        { label: "Ranking WTA", val: "N° 14 del Mundo" },
        { label: "Club Origen", val: "Club Atlético Río Tercero" }
      ]
    },
    {
      id: "comba",
      name: "Rocío Comba",
      dorsal: "08",
      discipline: "Atletismo",
      disciplineKey: "atletismo",
      badge: "ATLETISMO · TRIPLE OLÍMPICA",
      club: "Polideportivo Municipal / Fábrica Militar",
      palmares: "3x Juegos Olímpicos",
      category: "Lanzamiento de Disco",
      period: "Beijing 08 · Londres 12 · Río 16",
      photo: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=80",
      isHeroBento: false,
      bio: "Una de las atletas de campo más regulares de la historia nacional. Compitió en tres ediciones consecutivas de los Juegos Olímpicos (Beijing 2008, Londres 2012 y Río 2016). En 2013 alcanzó la final del Campeonato Mundial de Atletismo en Moscú, finalizando entre las 12 mejores del planeta.",
      telemetry: [
        { label: "JJ.OO.", val: "3 Ediciones (2008-2016)" },
        { label: "Mundial Moscú", val: "Finalista N° 12 Mundial" },
        { label: "Especialidad", val: "Disco (Récord 62.74m)" }
      ]
    }
  ],

  // Categorías de Filtro
  filterCategories: [
    { key: "todos", label: "TODOS LOS ATLETAS", count: 8 },
    { key: "basquetbol", label: "BÁSQUETBOL", count: 1 },
    { key: "automovilismo", label: "AUTOMOVILISMO", count: 1 },
    { key: "futbol", label: "FÚTBOL", count: 1 },
    { key: "tenis", label: "TENIS", count: 2 },
    { key: "natacion", label: "NATACIÓN", count: 1 },
    { key: "atletismo", label: "ATLETISMO & TRIATLÓN", count: 2 }
  ],

  // Manifiesto con datos reales
  manifesto: {
    title: "Una cancha en cada barrio. Un campeón en cada generación.",
    text: "En 2017 el Congreso de la Nación consagró a Río Tercero como la Capital Nacional del Deportista mediante la Ley 27.380 / 27.396. No se trató de una designación protocolar: fue la ratificación estadística de una comunidad obrera que produjo abanderados olímpicos, monarcas de la FIA y vencedores de Grand Slam gracias a una trama inquebrantable de clubes barriales.",
    quote: "“Acá el deporte nunca fue un lujo ni un pasatiempo: fue la escuela de carácter donde aprendimos a competir contra los mejores del mundo.”"
  },

  // Clubes Locales Reales Verificables
  clubs: [
    {
      name: "Club Sportivo 9 de Julio",
      acronym: "9 DE JULIO",
      founded: "Fundado en 1927",
      focus: "Básquetbol · Fútbol · Gimnasia Artística",
      description: "Institución albiceleste formadora de Pablo Prigioni. Compitió en la Liga Nacional de Básquetbol (máxima categoría nacional) y sostiene divisiones formativas en todas las edades.",
      crest: "assets/escudo_9dejulio.png",
      colors: "Celeste y Blanco",
      athleteOrigin: "Pablo Prigioni, Claudio López"
    },
    {
      name: "Club Atlético Río Tercero",
      acronym: "CART",
      founded: "Fundado en 1928",
      focus: "Fútbol · Tenis · Básquetbol · Bochas",
      description: "Histórico bastión del deporte riotercerense. Cuna de los primeros pasos de Claudio 'Piojo' López e Ivanna Madruga. Canchas de polvo de ladrillo y predio polideportivo céntrico.",
      crest: "assets/escudo_cart.jpg",
      colors: "Azul y Blanco",
      athleteOrigin: "Claudio López, Ivanna Madruga"
    },
    {
      name: "Club Central Argentino",
      acronym: "CENTRAL",
      founded: "Tradición Ferroviaria",
      focus: "Fútbol Infantil · Bochas · Eventos Barriales",
      description: "Raíz obrera y contención social para cientos de familias de la zona este. Baluarte en ligas regionales infantiles y torneos provinciales de bochas.",
      crest: "",
      colors: "Rojo y Blanco",
      athleteOrigin: "Formativas Infantiles"
    },
    {
      name: "Polideportivo Municipal 'Marciano Melo'",
      acronym: "POLI MUNI",
      founded: "Infraestructura Pública",
      focus: "Pista de Atletismo · Piletas · Deporte Adaptado",
      description: "El mayor complejo deportivo abierto de la ciudad. Espacio de entrenamiento diario de Oscar Galíndez y Rocío Comba, con pistas homologadas y escuelas de iniciación.",
      crest: "",
      colors: "Institucional",
      athleteOrigin: "Oscar Galíndez, Rocío Comba"
    }
  ],

  // Línea de Tiempo Cronológica
  timeline: [
    {
      period: "1920 - 1940",
      title: "Fundación de los Clubes Ferroviarios y Obreros",
      text: "Con el trazado del ferrocarril y las industrias químicas nacen el Club Atlético Río Tercero y Sportivo 9 de Julio, creando los primeros tablones y canchas de fútbol."
    },
    {
      period: "1980",
      title: "Ivanna Madruga impacta en Roland Garros",
      text: "La tenista riotercerense alcanza los cuartos de final en París y la final de dobles en el US Open, alcanzando el puesto 14 del ranking mundial WTA."
    },
    {
      period: "1996 - 2002",
      title: "Claudio López: Plata Olímpica y Doble Mundialista",
      text: "El 'Piojo' logra la medalla de plata en Atlanta 1996 y disputa las Copas del Mundo de Francia 1998 y Corea-Japón 2002 como delantero titular de la Selección."
    },
    {
      period: "2008",
      title: "Pablo Prigioni: Bronce Olímpico con la Generación Dorada",
      text: "El base formado en 9 de Julio se sube al podio en Pekín 2008 y consolida su paso histórico a la NBA (New York Knicks, Rockets y Clippers)."
    },
    {
      period: "2014 - 2021",
      title: "Títulos Mundiales: 'Pechito' López y Gustavo Fernández",
      text: "José María López se corona tricampeón mundial WTCC y gana las 24 Horas de Le Mans. 'Gusti' Fernández conquista 5 títulos de Grand Slam en tenis adaptado."
    },
    {
      period: "2017 - Presente",
      title: "Ley Nacional 27.380 / 27.396: Capital Nacional del Deportista",
      text: "El Congreso de la Nación consagra por ley nacional el estatus de la ciudad. Se proyecta un centro de alto rendimiento y archivo histórico deportivo."
    }
  ],

  // Propuestas Concretas para la Municipalidad
  proposals: [
    {
      code: "01",
      title: "Plan Iluminar el Potrero: LED en Playones Barriales",
      detail: "Instalación de luminaria LED y tableros antivandálicos en los 14 playones municipales para extender la práctica deportiva comunitaria nocturna.",
      target: "Infraestructura Comunitaria"
    },
    {
      code: "02",
      title: "Beca de Movilidad 'Río Tercero Compite'",
      detail: "Fondo de financiamiento municipal de boletos y viáticos para atletas federados juveniles que clasifican a torneos provinciales y nacionales.",
      target: "Apoyo al Atleta Federado"
    },
    {
      code: "03",
      title: "Reactivación de las Olimpiadas Escolares de Río 3",
      detail: "Torneos interescolares de atletismo, vóley y básquetbol con sedes rotativas entre los clubes locales para detección temprana de talentos.",
      target: "Desarrollo Educativo"
    },
    {
      code: "04",
      title: "Unidad Móvil de Telemetría y Salud Deportiva",
      detail: "Evaluaciones cardiológicas, ergometrías y controles nutricionales gratuitos para chicos de 8 a 17 años en clubes barriales.",
      target: "Salud y Prevención"
    }
  ]
};
