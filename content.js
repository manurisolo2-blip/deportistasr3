/**
 * CONTENT.JS - Datos e Identidad Real de Río Tercero
 * Capital Nacional del Deportista (Ley Nacional N.º 27.378)
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
    logroPrincipal: 'Bronce Pekín 2008 · Ex NBA · DT Selección',
    categoria: 'Olímpico / NBA',
    dorsal: '09',
    imagenUrl: 'assets/prigioni.jpg',
    destacado: true,
    descripcion: 'Formado en Club Sportivo 9 de Julio. Bronce Olímpico Pekín 2008, 4 temporadas en NBA (Knicks, Rockets, Clippers), multicampeón con Baskonia (ACB/EuroLiga), actual DT de la Selección Argentina de Básquetbol masculina mayor.',
    telemetria: [
      { label: 'PALMARÉS', val: 'Bronce Pekín 08' },
      { label: 'TRAYECTORIA', val: '4 Temporadas NBA' },
      { label: 'ROL ACTUAL', val: 'DT Selección Mayor' }
    ]
  },
  {
    id: '2',
    nombre: 'José María «Pechito» López',
    disciplina: 'Automovilismo',
    clubOrigen: 'Kartódromos de Río 3',
    logroPrincipal: '3x WTCC · Ganador 24h Le Mans · WEC',
    categoria: 'Mundial FIA',
    dorsal: '37',
    imagenUrl: 'assets/pechito.jpg',
    destacado: true,
    descripcion: 'Iniciado en los kartódromos de Río 3. Tricampeón Mundial WTCC (2014, 2015, 2016), Campeón Mundial de Resistencia WEC con Toyota Gazoo Racing, ganador de las 24 Horas de Le Mans (2021), múltiple campeón TC2000 y Top Race V6.',
    telemetria: [
      { label: 'PALMARÉS', val: '3x WTCC · 2x WEC' },
      { label: 'HITO MÁXIMO', val: '24h Le Mans 2021' },
      { label: 'NACIONAL', val: 'TC2000 · Top Race' }
    ]
  },
  {
    id: '3',
    nombre: 'Claudio «Piojo» López',
    disciplina: 'Fútbol',
    clubOrigen: 'C.A. Río Tercero / Sportivo 9 de Julio',
    logroPrincipal: 'Plata Atlanta 1996 · 2x Mundialista (98, 02)',
    categoria: 'Olímpico / Mundial',
    dorsal: '07',
    imagenUrl: 'assets/piojo_hd.jpg',
    descripcion: 'Formado en C.A. Río Tercero y Sportivo 9 de Julio. Plata Olímpica Atlanta 1996, doble mundialista (Francia 1998 y Corea-Japón 2002), campeón con Racing Club, Valencia CF (doble finalista Champions), Lazio y América.',
    telemetria: [
      { label: 'PALMARÉS', val: 'Plata Atlanta 96' },
      { label: 'MUNDIALES', val: 'Francia 98 · Corea 02' },
      { label: 'EUROPA', val: 'Valencia · Lazio' }
    ]
  },
  {
    id: '4',
    nombre: 'Gustavo Fernández',
    disciplina: 'Tenis',
    clubOrigen: 'Polvo de ladrillo / 9 de Julio',
    logroPrincipal: '5x Grand Slams Singles · Ex N° 1 Mundial',
    categoria: 'Grand Slam / Élite',
    dorsal: '01',
    imagenUrl: 'assets/gustavo_hd.jpg',
    descripcion: 'Formado en polvo de ladrillo de Río Tercero y Sportivo 9 de Julio. 5 Grand Slams singles (Roland Garros 2016, 2019; Abierto de Australia 2017, 2019; Wimbledon 2019) y 3 en dobles, ex N° 1 del ranking mundial ITF, abanderado paralímpico Río 2016.',
    telemetria: [
      { label: 'GRAND SLAMS', val: '5 Singles · 3 Dobles' },
      { label: 'RANKING', val: 'Ex N° 1 Mundial ITF' },
      { label: 'BANDERA', val: 'Abanderado Río 16' }
    ]
  },
  {
    id: '5',
    nombre: 'Oscar Galíndez',
    disciplina: 'Atletismo',
    clubOrigen: 'Polideportivo Municipal Río Tercero',
    logroPrincipal: 'Oro Panamericano 95, 03 · Olímpico Sydney 00',
    categoria: 'Olímpico / Ironman',
    dorsal: '22',
    imagenUrl: 'assets/oscar_galindez.jpg',
    descripcion: 'Formado en el Polideportivo Municipal Río Tercero. Oro en Juegos Panamericanos (Mar del Plata 1995, Santo Domingo 2003), 10 veces Campeón Argentino de Triatlón, triunfos Ironman, Rombo de Oro, Olímpico Sydney 2000, Campeón Mundial de Duatlón (1995).',
    telemetria: [
      { label: 'PANAMERICANOS', val: 'Oro 1995 · Oro 2003' },
      { label: 'IRONMAN', val: 'Múltiple Campeón' },
      { label: 'OLÍMPICO', val: 'Sydney 2000' }
    ]
  },
  {
    id: '6',
    nombre: 'Rocío Comba',
    disciplina: 'Atletismo',
    clubOrigen: 'Polideportivo Municipal / Fábrica Militar',
    logroPrincipal: 'Triple Olímpica (08, 12, 16) · Finalista Moscú 13',
    categoria: 'Triple Olímpica',
    dorsal: '08',
    imagenUrl: 'assets/comba.jpg',
    descripcion: 'Formada en Polideportivo Municipal y Fábrica Militar. Triple representante olímpica (Pekín 2008, Londres 2012, Río 2016), finalista en Campeonato Mundial de Moscú 2013, campeona sudamericana e iberoamericana, actual conductora del área deportiva municipal de Río Tercero.',
    telemetria: [
      { label: 'JUEGOS OLÍMPICOS', val: '08 · 12 · 16 (Triple)' },
      { label: 'MUNDIAL', val: 'Finalista Moscú 13' },
      { label: 'GESTIÓN', val: 'Sec. Deportes Río 3' }
    ]
  },
  {
    id: '7',
    nombre: 'Ivanna Madruga',
    disciplina: 'Tenis',
    clubOrigen: 'Club Atlético Río Tercero',
    logroPrincipal: 'N° 14 WTA · Cuartos Roland Garros 1980',
    categoria: 'Pionera Grand Slam',
    dorsal: '14',
    imagenUrl: 'assets/ivanna_hd.jpg',
    descripcion: 'Formada en Club Atlético Río Tercero. Cuartos de final singles en Roland Garros 1980, finalista de dobles en US Open, N° 14 del ranking mundial WTA, capitana de Fed Cup, pionera del tenis sudamericano.',
    telemetria: [
      { label: 'ROLAND GARROS', val: 'Cuartos 1980' },
      { label: 'US OPEN', val: 'Finalista Dobles' },
      { label: 'WTA RANKING', val: 'N° 14 del Mundo' }
    ]
  },
  {
    id: '8',
    nombre: 'Catalina Primo',
    disciplina: 'Fútbol',
    clubOrigen: 'Club Sportivo 9 de Julio',
    logroPrincipal: 'Selección Argentina Mayor · River Plate',
    categoria: 'Profesional AFA',
    dorsal: '11',
    imagenUrl: 'assets/catalina_primo.png',
    descripcion: 'Formada en Club Sportivo 9 de Julio. Delantera de River Plate e integrante de la Selección Argentina de Fútbol Femenino mayor, campeona de Primera División y participante de Copa Libertadores.',
    telemetria: [
      { label: 'SELECCIÓN', val: 'Selección Mayor AFA' },
      { label: 'CLUB ACTUAL', val: 'River Plate' },
      { label: 'TORNEOS', val: 'Copa Libertadores' }
    ]
  },
  {
    id: '9',
    nombre: 'Andrea Berrino',
    disciplina: 'Natación',
    clubOrigen: 'C.A. Río Tercero / Natatorios de Río 3',
    logroPrincipal: 'Plusmarquista Sudamericana · Bronce Lima 2019',
    categoria: 'Panamericana / Récord',
    dorsal: '04',
    imagenUrl: 'assets/andrea_berrino.jpg',
    descripcion: 'Formada en C.A. Río Tercero y natatorios de Río Tercero. Plusmarquista sudamericana en 50m y 100m espalda, medalla de bronce panamericana en Lima 2019, múltiple mundialista de natación.',
    telemetria: [
      { label: 'RÉCORD', val: 'Plusmarquista Sudam.' },
      { label: 'PANAMERICANO', val: 'Bronce Lima 2019' },
      { label: 'ESPECIALIDAD', val: '50m y 100m Espalda' }
    ]
  },
  {
    id: '10',
    nombre: 'Ivano Falchetti',
    disciplina: 'Tiro',
    clubOrigen: 'Tiro Federal Río Tercero',
    logroPrincipal: 'Representante Internacional y Nacional',
    categoria: 'Tiro de Precisión',
    dorsal: '01',
    imagenUrl: 'assets/ivano_falchetti.jpg',
    descripcion: 'Formado en Tiro Federal Río Tercero. Destacado tirador deportivo de precisión de nivel nacional e internacional en fosa y hélice, laureado representante del Tiro Federal Río Tercero.',
    telemetria: [
      { label: 'DISCIPLINA', val: 'Fosa Olímpica / Hélice' },
      { label: 'NIVEL', val: 'Nacional e Internacional' },
      { label: 'INSTITUCIÓN', val: 'Tiro Federal Río 3' }
    ]
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
    lawDeclaration: "Ley Nacional N.º 27.378 · Capital Nacional del Deportista",
    leadText: "Río Tercero fue declarada Capital Nacional del Deportista por la Ley Nacional N.º 27.378, sancionada y promulgada a finales de 2017 por el Congreso de la Nación Argentina. Conmemora anualmente cada 16 de noviembre el Día del Deportista y durante octubre y noviembre celebra la Semana del Deporte y Fiesta de la Capital Nacional del Deportista, operando como dispositivo de reparación simbólica y cohesión social comunitaria tras los sucesos industriales de 1995.",
    sportsDay: "16 de Noviembre · Día del Deportista",
    sportsWeek: "Octubre / Noviembre · Semana del Deporte y Fiesta de la Capital Nacional del Deportista",
    symbolicReparation: "Dispositivo de reparación simbólica y cohesión social comunitaria tras los sucesos industriales de 1995",
    authorCredit: "Presentación para el Área de Deportes y Juventud de Río Tercero",
    academicCredit: "Archivo Editorial de Rendimiento · Edición 2026 · Ley Nacional N.º 27.378"
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
      value: "6",
      unit: "Clubes",
      label: "Instituciones Federadas",
      context: "CART, 9 de Julio, CDI, Casino, Vecinos Unidos, RTRC",
      code: "MET-03"
    },
    {
      value: "27.378",
      unit: "Ley Nac.",
      label: "Congreso de la Nación",
      context: "Capital Nacional del Deportista (Promulgada 2017)",
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
      bio: "Formado en Club Sportivo 9 de Julio. Bronce Olímpico Pekín 2008, 4 temporadas en NBA (Knicks, Rockets, Clippers), multicampeón con Baskonia (ACB/EuroLiga), actual DT de la Selección Argentina de Básquetbol masculina mayor.",
      telemetry: [
        { label: "Palmarés", val: "Bronce Pekín 2008" },
        { label: "Trayectoria", val: "4 Temporadas NBA" },
        { label: "Rol Actual", val: "DT Selección Mayor" }
      ]
    },
    {
      id: "pechito",
      name: "José María «Pechito» López",
      dorsal: "37",
      discipline: "Automovilismo",
      disciplineKey: "automovilismo",
      badge: "AUTOMOVILISMO · FIA MUNDIAL",
      club: "Kartódromos de Río 3",
      palmares: "3x WTCC · Le Mans 24h",
      category: "Piloto Oficial FIA WEC",
      period: "Activo Internacional",
      photo: "assets/pechito.jpg",
      isHeroBento: false,
      bio: "Iniciado en los kartódromos de Río 3. Tricampeón Mundial WTCC (2014, 2015, 2016), Campeón Mundial de Resistencia WEC con Toyota Gazoo Racing, ganador de las 24 Horas de Le Mans (2021), múltiple campeón TC2000 y Top Race V6.",
      telemetry: [
        { label: "Mundiales", val: "3x WTCC / 2x WEC" },
        { label: "Hito Máximo", val: "Ganador Le Mans 24h" },
        { label: "Nacional", val: "TC2000 · Top Race" }
      ]
    },
    {
      id: "piojo",
      name: "Claudio «Piojo» López",
      dorsal: "07",
      discipline: "Fútbol",
      disciplineKey: "futbol",
      badge: "FÚTBOL · SELECCIÓN ARGENTINA",
      club: "C.A. Río Tercero / Sportivo 9 de Julio",
      palmares: "Plata Olímpica Atlanta 96",
      category: "Delantero Extremo",
      period: "Mundiales 1998 y 2002",
      photo: "assets/piojo_hd.jpg",
      isHeroBento: false,
      bio: "Formado en C.A. Río Tercero y Sportivo 9 de Julio. Plata Olímpica Atlanta 1996, doble mundialista (Francia 1998 y Corea-Japón 2002), campeón con Racing Club, Valencia CF (doble finalista Champions), Lazio y América.",
      telemetry: [
        { label: "Selección", val: "Plata Atlanta 1996" },
        { label: "Copas Mundiales", val: "Francia 98 · Corea 02" },
        { label: "Clubes", val: "Racing · Valencia · Lazio" }
      ]
    },
    {
      id: "gustavo",
      name: "Gustavo Fernández",
      dorsal: "01",
      discipline: "Tenis",
      disciplineKey: "tenis",
      badge: "TENIS ADAPTADO · 5x GRAND SLAM",
      club: "Polvo de ladrillo / 9 de Julio",
      palmares: "5 Grand Slams Singles",
      category: "Singlista N° 1 Mundial",
      period: "Activo Circuito ITF",
      photo: "assets/gustavo_hd.jpg",
      isHeroBento: false,
      bio: "Formado en polvo de ladrillo de Río Tercero y Sportivo 9 de Julio. 5 Grand Slams singles (Roland Garros 2016, 2019; Abierto de Australia 2017, 2019; Wimbledon 2019) y 3 en dobles, ex N° 1 del ranking mundial ITF, abanderado paralímpico Río 2016.",
      telemetry: [
        { label: "Grand Slams", val: "5x Singles · 3x Dobles" },
        { label: "Ranking", val: "Ex N° 1 del Mundo ITF" },
        { label: "Paralímpicos", val: "Abanderado Río 2016" }
      ]
    },
    {
      id: "galindez",
      name: "Oscar Galíndez",
      dorsal: "22",
      discipline: "Atletismo",
      disciplineKey: "atletismo",
      badge: "TRIATLÓN · OLÍMPICO & IRONMAN",
      club: "Polideportivo Municipal Río Tercero",
      palmares: "Olímpico Sydney 2000",
      category: "Fondista / Triatleta",
      period: "Campeón Mundial Duatlón",
      photo: "assets/oscar_galindez.jpg",
      isHeroBento: false,
      bio: "Formado en el Polideportivo Municipal Río Tercero. Oro en Juegos Panamericanos (Mar del Plata 1995, Santo Domingo 2003), 10 veces Campeón Argentino de Triatlón, triunfos Ironman, Rombo de Oro, Olímpico Sydney 2000, Campeón Mundial de Duatlón (1995).",
      telemetry: [
        { label: "Panamericanos", val: "Oro MdP 95 / Sto Dgo 03" },
        { label: "JJ.OO.", val: "Sydney 2000" },
        { label: "Mundial", val: "Camp. Mundial Duatlón 95" }
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
      photo: "assets/comba.jpg",
      isHeroBento: false,
      bio: "Formada en Polideportivo Municipal y Fábrica Militar. Triple representante olímpica (Pekín 2008, Londres 2012, Río 2016), finalista en Campeonato Mundial de Moscú 2013, campeona sudamericana e iberoamericana, actual conductora del área deportiva municipal de Río Tercero.",
      telemetry: [
        { label: "JJ.OO.", val: "Pekín 08 · Londres 12 · Río 16" },
        { label: "Mundial", val: "Finalista Moscú 2013" },
        { label: "Gestión", val: "Área Deportes Municipal" }
      ]
    },
    {
      id: "ivanna",
      name: "Ivanna Madruga",
      dorsal: "14",
      discipline: "Tenis",
      disciplineKey: "tenis",
      badge: "TENIS · TOP 15 MUNDIAL",
      club: "Club Atlético Río Tercero",
      palmares: "Top 15 Mundial WTA",
      category: "Singlista / Pionera",
      period: "Cuartos Roland Garros 1980",
      photo: "assets/ivanna_hd.jpg",
      isHeroBento: false,
      bio: "Formada en Club Atlético Río Tercero. Cuartos de final singles en Roland Garros 1980, finalista de dobles en US Open, N° 14 del ranking mundial WTA, capitana de Fed Cup, pionera del tenis sudamericano.",
      telemetry: [
        { label: "Grand Slam", val: "Cuartos Roland Garros 80" },
        { label: "Ranking WTA", val: "N° 14 del Mundo" },
        { label: "Dobles", val: "Finalista US Open" }
      ]
    },
    {
      id: "primo",
      name: "Catalina Primo",
      dorsal: "11",
      discipline: "Fútbol",
      disciplineKey: "futbol",
      badge: "FÚTBOL · SELECCIÓN MAYOR",
      club: "Club Sportivo 9 de Julio",
      palmares: "Selección Nacional Mayor / River Plate",
      category: "Profesional AFA",
      period: "Primera División AFA",
      photo: "assets/catalina_primo.png",
      isHeroBento: false,
      bio: "Formada en Club Sportivo 9 de Julio. Delantera de River Plate e integrante de la Selección Argentina de Fútbol Femenino mayor, campeona de Primera División y participante de Copa Libertadores.",
      telemetry: [
        { label: "Selección", val: "Selección Argentina Mayor" },
        { label: "Club", val: "River Plate / 1ª Div." },
        { label: "Torneo", val: "Copa Libertadores" }
      ]
    },
    {
      id: "berrino",
      name: "Andrea Berrino",
      dorsal: "04",
      discipline: "Natación",
      disciplineKey: "natacion",
      badge: "NATACIÓN · PANAMERICANA & RÉCORD",
      club: "C.A. Río Tercero / Natatorios de Río 3",
      palmares: "Medalla Panamericana Lima 2019",
      category: "Espaldista / Estilos",
      period: "Selección Nacional CADDA",
      photo: "assets/andrea_berrino.jpg",
      isHeroBento: false,
      bio: "Formada en C.A. Río Tercero y natatorios de Río Tercero. Plusmarquista sudamericana en 50m y 100m espalda, medalla de bronce panamericana en Lima 2019, múltiple mundialista de natación.",
      telemetry: [
        { label: "Panamericanos", val: "Bronce Lima 2019" },
        { label: "Récord", val: "50m y 100m Espalda Sudam." },
        { label: "Mundiales", val: "Múltiple Mundialista FINA" }
      ]
    },
    {
      id: "falchetti",
      name: "Ivano Falchetti",
      dorsal: "01",
      discipline: "Tiro",
      disciplineKey: "tiro",
      badge: "TIRO · PRECISIÓN & FOSA",
      club: "Tiro Federal Río Tercero",
      palmares: "Representante Nacional e Internacional",
      category: "Tiro de Precisión",
      period: "Fosa y Hélice",
      photo: "assets/ivano_falchetti.jpg",
      isHeroBento: false,
      bio: "Formado en Tiro Federal Río Tercero. Destacado tirador deportivo de precisión de nivel nacional e internacional en fosa y hélice, laureado representante del Tiro Federal Río Tercero.",
      telemetry: [
        { label: "Disciplina", val: "Fosa y Hélice de Precisión" },
        { label: "Alcance", val: "Nacional e Internacional" },
        { label: "Institución", val: "Tiro Federal Río Tercero" }
      ]
    }
  ],

  // Categorías de Filtro
  filterCategories: [
    { key: "todos", label: "TODOS LOS ATLETAS", count: 10 },
    { key: "basquetbol", label: "BÁSQUETBOL", count: 1 },
    { key: "automovilismo", label: "AUTOMOVILISMO", count: 1 },
    { key: "futbol", label: "FÚTBOL", count: 2 },
    { key: "tenis", label: "TENIS", count: 2 },
    { key: "natacion", label: "NATACIÓN", count: 1 },
    { key: "atletismo", label: "ATLETISMO & TRIATLÓN", count: 2 },
    { key: "tiro", label: "TIRO", count: 1 }
  ],

  // Clubes Locales Reales Verificables
  clubs: [
    {
      name: "Club Atlético Río Tercero",
      acronym: "CART",
      founded: "Fundado en 1917 (Centenario)",
      focus: "Fútbol formativo y superior · Básquetbol · Tenis · Bochas",
      description: "Fundado en 1917 (Centenario). Estadio principal de fútbol, canchas auxiliares y polideportivo cubierto. Fútbol formativo y superior (LRRF y torneos provinciales), básquetbol, tenis y bochas.",
      crest: "assets/escudo_cart.jpg",
      colors: "Azul y Blanco",
      athleteOrigin: "Claudio López, Ivanna Madruga, Andrea Berrino"
    },
    {
      name: "Club Sportivo 9 de Julio",
      acronym: "9 DE JULIO",
      founded: "Fundado en 1927 (Centenario)",
      focus: "Básquetbol · Fútbol · Vóleibol · Hockey sobre césped · Tenis",
      description: "Fundado en 1927 (Centenario). Complejo Deportivo «Gregorio Gutiérrez», parqué de básquetbol y canchas de piso sintético. Básquetbol (Liga Cordobesa, federales y ex LNB), fútbol, vóleibol, hockey sobre césped y tenis.",
      crest: "assets/escudo_9dejulio.png",
      colors: "Celeste y Blanco",
      athleteOrigin: "Pablo Prigioni, Gustavo Fernández, Catalina Primo"
    },
    {
      name: "Club Deportivo Independiente",
      acronym: "CDI",
      founded: "Mediados del Siglo XX",
      focus: "Fútbol oficial y formativo en LRRF · Tenis · Bochas · Deportes recreativos",
      description: "Fundado a mediados del Siglo XX. Estadio «Pura Molina», complejo de tenis y frontón. Fútbol oficial y formativo en LRRF, tenis, bochas y deportes recreativos.",
      crest: "assets/escudo_independiente.png",
      colors: "Rojo y Negro",
      athleteOrigin: "Planteles formativos LRRF y tenis regional"
    },
    {
      name: "Club Deportivo Casino",
      acronym: "CASINO",
      founded: "Mediados del Siglo XX",
      focus: "Fútbol federado de mayores y juveniles · Bochas · Actividades comunitarias",
      description: "Fundado a mediados del Siglo XX. Cancha de fútbol reglamentaria y sede social histórica. Fútbol federado de mayores y divisiones juveniles, bochas y actividades comunitarias.",
      crest: "assets/escudo_casino.png",
      colors: "Verde y Blanco",
      athleteOrigin: "Divisiones juveniles y fútbol federado"
    },
    {
      name: "Club Vecinos Unidos",
      acronym: "VECINOS UNIDOS",
      founded: "Segunda mitad del Siglo XX",
      focus: "Fútbol formativo · Fútbol femenino · Primera división · Contención social barrial",
      description: "Fundado en la segunda mitad del Siglo XX. Campo de juego barrial y áreas de entrenamiento multideporte. Fútbol formativo, fútbol femenino, primera división y contención social barrial.",
      crest: "assets/escudo_vecinosunidos.png",
      colors: "Amarillo y Negro",
      athleteOrigin: "Semillero barrial y fútbol femenino"
    },
    {
      name: "Río Tercero Rugby Club",
      acronym: "RTRC",
      founded: "Etapa contemporánea federada",
      focus: "Rugby masculino y femenino · Hockey formativo",
      description: "Etapa contemporánea federada. Predio con canchas de rugby reglamentarias de césped natural y club house. Rugby masculino y femenino en diversas categorías y hockey formativo.",
      crest: "assets/escudo_rtrc.png",
      colors: "Bordó / Azul y Blanco",
      athleteOrigin: "Fernando «Peny» Herrera y formativas de rugby"
    }
  ],

  // Línea de Tiempo Cronológica
  timeline: [
    {
      period: "1917 — 1927",
      title: "Fundación de los Clubes Centenarios",
      text: "Con el trazado ferroviario y el despertar industrial nacen el Club Atlético Río Tercero (1917) y Sportivo 9 de Julio (1927), forjando la cuna del tejido asociativo y deportivo de la ciudad."
    },
    {
      period: "1980",
      title: "Ivanna Madruga en Roland Garros",
      text: "La tenista riotercerense alcanza los cuartos de final individuales en París, la final de dobles en el US Open y el puesto N.° 14 del ranking mundial WTA como pionera del tenis sudamericano."
    },
    {
      period: "1995",
      title: "Oscar Galíndez: Oro Panamericano y Campeón Mundial",
      text: "Galíndez conquista la medalla de oro en los Juegos Panamericanos de Mar del Plata 1995 y se corona Campeón Mundial de Duatlón en Cancún, iniciando una era hegemónica en pruebas combinadas e Ironman."
    },
    {
      period: "1996 — 2002",
      title: "Claudio 'Piojo' López: Plata Olímpica y Doble Mundialista",
      text: "El 'Piojo' logra la medalla de plata en los Juegos Olímpicos de Atlanta 1996 y disputa como delantero titular de la Selección Argentina las Copas del Mundo de Francia 1998 y Corea-Japón 2002."
    },
    {
      period: "2008",
      title: "Bronce Olímpico y Debut Ecuménico",
      text: "Pablo Prigioni obtiene la medalla de bronce en los Juegos Olímpicos de Pekín 2008 con la Generación Dorada y proyecta su salto a la NBA. En la misma cita, Rocío Comba concreta su primer debut olímpico en atletismo."
    },
    {
      period: "2014 — 2021",
      title: "Títulos Mundiales: 'Pechito' López y Gustavo Fernández",
      text: "José María «Pechito» López se corona tricampeón mundial WTCC, bicampeón del WEC y gana las 24 Horas de Le Mans (2021). Gustavo Fernández alcanza el N.° 1 mundial ITF y conquista 5 Grand Slams individuales."
    },
    {
      period: "2017",
      title: "Ley Nacional N.º 27.378: Capital Nacional del Deportista",
      text: "El Congreso de la Nación Argentina sanciona y promulga la Ley Nacional N.º 27.378, declarando formalmente a Río Tercero Capital Nacional del Deportista como reconocimiento histórico y dispositivo de reparación comunitaria."
    },
    {
      period: "Presente",
      title: "Proyección de Élite y Sustentabilidad",
      text: "Nueva generación de proyección con Catalina Primo en River Plate y Selección Argentina; articulación del Día del Deportista (16 de noviembre) y desarrollo del primer Parque Solar Deportivo provincial para clubes."
    }
  ],

  // Propuestas Concretas para la Municipalidad
  proposals: [
    {
      code: "01",
      title: "Concurso de Diseño: Camiseta Oficial de la Selección de Río 3",
      detail: "Concurso abierto y participativo para diseñar la camiseta oficial que lucirán las selecciones y atletas que representen a Río Tercero en competencias provinciales y nacionales.",
      target: "Identidad y Representatividad"
    },
    {
      code: "02",
      title: "Beca de Movilidad 'Río Tercero Compite'",
      detail: "Fondo de financiamiento municipal de pasajes y viáticos para atletas federados juveniles que clasifican a torneos provinciales y nacionales, evitando el abandono por costo económico.",
      target: "Apoyo al Atleta Federado"
    },
    {
      code: "03",
      title: "Unidad Móvil de Telemetría y Salud Deportiva",
      detail: "Evaluaciones cardiológicas, ergometrías y controles nutricionales gratuitos para chicos y chicas de 8 a 17 años que inician su actividad en clubes de barrio.",
      target: "Salud y Prevención"
    }
  ]
};
