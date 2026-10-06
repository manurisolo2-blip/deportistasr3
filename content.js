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
    especialidad: 'Base Armador · Estratega FIBA / NBA',
    clubOrigen: 'Club Sportivo 9 de Julio',
    logroPrincipal: 'Bronce Pekín 2008 · Ex NBA · DT Selección',
    categoria: 'Olímpico / NBA',
    epoca: '2000s - Presente',
    imagenUrl: 'assets/prigioni.jpg',
    destacado: true,
    descripcion: 'Iniciado en las divisiones formativas de Club Sportivo 9 de Julio. Medallista de Bronce en los Juegos Olímpicos de Pekín 2008 con la Generación Dorada, disputó 4 temporadas en la NBA (New York Knicks, Houston Rockets, LA Clippers), multicampeón con Baskonia en España y actual entrenador principal de la Selección Argentina Masculina Mayor.',
    legado: 'Pilar de la Generación Dorada y formador de juego reconocido mundialmente por su inteligencia táctica.',
    telemetria: [
      { label: 'JUEGOS OLÍMPICOS', val: 'Bronce Pekín 2008' },
      { label: 'NBA TRAYECTORIA', val: '4 Temporadas (NY, HOU, LAC)' },
      { label: 'EUROLIGA / ACB', val: '3x Copa Rey · 1x Liga ACB' },
      { label: 'ACTUALIDAD', val: 'DT Selección Argentina Mayor' }
    ]
  },
  {
    id: '2',
    nombre: 'José María «Pechito» López',
    disciplina: 'Automovilismo',
    especialidad: 'Piloto Hypercar WEC · Resistencia y Turismos',
    clubOrigen: 'Kartódromo Municipal Río 3',
    logroPrincipal: '3x WTCC · Ganador 24h Le Mans · 2x WEC',
    categoria: 'Mundial FIA',
    epoca: '2000s - Presente',
    imagenUrl: 'assets/pechito.jpg',
    destacado: true,
    descripcion: 'Forjado en los kartódromos y circuitos de tierra de Río Tercero. Tricampeón Mundial WTCC (2014, 2015, 2016), bicampeón del Mundial de Resistencia WEC con Toyota Gazoo Racing, triunfador absoluto de las míticas 24 Horas de Le Mans en 2021 y múltiple coronado en TC2000 y Top Race V6.',
    legado: 'Uno de los pilotos más versátiles y laureados de la historia del deporte motor argentino en pistas internacionales.',
    telemetria: [
      { label: 'TÍTULOS FIA', val: '3x WTCC · 2x WEC Mundial' },
      { label: 'HITO HISTÓRICO', val: 'Ganador 24h Le Mans 2021' },
      { label: 'EQUIPO DE FÁBRICA', val: 'Toyota Gazoo Racing / Lexus' },
      { label: 'TÍTULOS NACIONALES', val: 'TC2000, TRV6 y Súper TC2000' }
    ]
  },
  {
    id: '3',
    nombre: 'Claudio «Piojo» López',
    disciplina: 'Fútbol',
    especialidad: 'Delantero Extremo · Velocidad y Definición',
    clubOrigen: 'C.A. Río Tercero / Sportivo 9 de Julio',
    logroPrincipal: 'Plata Atlanta 1996 · 2x Mundialista FIFA',
    categoria: 'Olímpico / Mundial',
    epoca: '1992 - 2010',
    imagenUrl: 'assets/piojo_hd.jpg',
    descripcion: 'Surgido de las canchas de C.A. Río Tercero y Sportivo 9 de Julio. Medalla de Plata Olímpica en Atlanta 1996, titular en los Mundiales de Francia 1998 y Corea-Japón 2002 con la Selección Argentina. Ídolo en Valencia CF con quien disputó dos finales de Champions League, campeón en Racing Club, Lazio de Italia y Club América.',
    legado: 'Símbolo del potrero riotercerense proyectado a las máximas finales del fútbol europeo y mundial.',
    telemetria: [
      { label: 'MEDALLA OLÍMPICA', val: 'Plata Atlanta 1996' },
      { label: 'COPAS DEL MUNDO', val: 'Francia 1998 · Corea-Japón 2002' },
      { label: 'EUROPA', val: 'Valencia (2x Final UCL) · Lazio' },
      { label: 'CLUBES ORIGEN', val: 'CART y Sp. 9 de Julio' }
    ]
  },
  {
    id: '4',
    nombre: 'Gustavo Fernández',
    disciplina: 'Tenis',
    especialidad: 'Tenis Adaptado · Potencia de Revés y Estrategia',
    clubOrigen: 'Club Sportivo 9 de Julio',
    logroPrincipal: '5x Grand Slams Singles · 3x Dobles · Ex N° 1',
    categoria: 'Grand Slam / Élite',
    epoca: '2010s - Presente',
    imagenUrl: 'assets/gustavo_hd.jpg',
    descripcion: 'Criado en las canchas de polvo de ladrillo de Sportivo 9 de Julio. Conquistó 5 títulos individuales de Grand Slam (Roland Garros 2016, 2019; Australian Open 2017, 2019; Wimbledon 2019) y 3 coronas en dobles. Ex número 1 del ranking mundial de la ITF y abanderado de la delegación argentina en los Juegos Paralímpicos de Río 2016.',
    legado: 'Referente mundial de resiliencia y jerarquía técnica, situando a Río Tercero en la cima del tenis planetario.',
    telemetria: [
      { label: 'GRAND SLAMS', val: '5 Singles · 3 Dobles (8 en Total)' },
      { label: 'RANKING MUNDIAL', val: 'Ex N° 1 del Mundo ITF' },
      { label: 'JUEGOS', val: 'Abanderado Río 16 · Tokio 20' },
      { label: 'ORIGEN LOCAL', val: 'Polvo de Sp. 9 de Julio' }
    ]
  },
  {
    id: '5',
    nombre: 'Oscar Galíndez',
    disciplina: 'Atletismo',
    especialidad: 'Triatlón y Duatlón de Larga Distancia',
    clubOrigen: 'Polideportivo Municipal Río Tercero',
    logroPrincipal: 'Oro Panamericano 1995, 2003 · Olímpico Sydney',
    categoria: 'Olímpico / Ironman',
    epoca: '1990s - 2010s',
    imagenUrl: 'assets/oscar_galindez.jpg',
    descripcion: 'Pionero absoluto formado en el Polideportivo Municipal y los circuitos costeros del Río Ctalamochita. Doble Medalla de Oro en Juegos Panamericanos (Mar del Plata 1995 y Santo Domingo 2003), Campeón Mundial de Duatlón en Cancún 1995, diploma olímpico en Sydney 2000, 10 veces Campeón Argentino y multicampeón de Ironman en Brasil y Sudamérica.',
    legado: 'Máxima figura histórica del triatlón sudamericano y embajador deportivo ilustre de la ciudad.',
    telemetria: [
      { label: 'JUEGOS PANAM', val: 'Oro MDP 1995 · Oro Sto. Domingo 03' },
      { label: 'CAMPEONATO MUNDIAL', val: 'Campeón Mundial Duatlón 1995' },
      { label: 'CIRCUITO IRONMAN', val: 'Múltiple Ganador Ironman 70.3' },
      { label: 'RECONOCIMIENTO', val: 'Olímpico Sydney 2000 · Rombo Oro' }
    ]
  },
  {
    id: '6',
    nombre: 'Rocío Comba',
    disciplina: 'Atletismo',
    especialidad: 'Lanzamiento de Disco y Bala',
    clubOrigen: 'Polideportivo Municipal / Fábrica Militar',
    logroPrincipal: 'Triple Olímpica (08, 12, 16) · Récord Nacional',
    categoria: 'Triple Olímpica',
    epoca: '2005 - Presente',
    imagenUrl: 'assets/comba.jpg',
    descripcion: 'Forjada en la pista del Polideportivo Municipal y el predio de Fábrica Militar. Atleta con 3 participaciones en Juegos Olímpicos (Pekín 2008, Londres 2012, Río 2016), finalista en el Campeonato Mundial de Atletismo de Moscú 2013, dueña del récord argentino absoluto en lanzamiento de disco (62.74 m) y actual Secretaria de Deportes de la ciudad.',
    legado: 'Récord nacional histórico y figura formativa central en el desarrollo atlético municipal contemporáneo.',
    telemetria: [
      { label: 'JUEGOS OLÍMPICOS', val: 'Pekín 08 · Londres 12 · Río 16' },
      { label: 'MUNDIAL IAAF', val: 'Finalista Mundial Moscú 2013' },
      { label: 'PLUSMARCA', val: 'Récord Nacional Disco (62.74 m)' },
      { label: 'GESTIÓN LOCAL', val: 'Sec. Deportes de Río Tercero' }
    ]
  },
  {
    id: '7',
    nombre: 'Ivanna Madruga',
    disciplina: 'Tenis',
    especialidad: 'Tenista Profesional · Especialista en Arcilla',
    clubOrigen: 'Club Atlético Río Tercero',
    logroPrincipal: 'N° 14 Ranking WTA · Cuartos Roland Garros',
    categoria: 'Pionera Grand Slam',
    epoca: '1975 - 1986',
    imagenUrl: 'assets/ivanna_hd.jpg',
    descripcion: 'Pionera del tenis sudamericano formada en las canchas de polvo de ladrillo del Club Atlético Río Tercero. Alcanzó los cuartos de final individuales en Roland Garros 1980 y fue finalista del cuadro de dobles del US Open 1980. Llegó al puesto N° 14 del ranking mundial de la WTA y representó al país en Copa Federación.',
    legado: 'Primera gran embajadora internacional del deporte riotercerense en los estadios centrales del tenis mundial.',
    telemetria: [
      { label: 'ROLAND GARROS', val: 'Cuartos de Final Singles (1980)' },
      { label: 'US OPEN', val: 'Finalista de Dobles (1980)' },
      { label: 'RANKING MUNDIAL', val: 'Puesto N° 14 del Mundo (WTA)' },
      { label: 'SELECCIÓN', val: 'Capitana y Líder en Fed Cup' }
    ]
  },
  {
    id: '8',
    nombre: 'Catalina Primo',
    disciplina: 'Fútbol',
    especialidad: 'Delantera de Área · Desborde y Gol',
    clubOrigen: 'Club Sportivo 9 de Julio',
    logroPrincipal: 'Selección Argentina Mayor · River Plate',
    categoria: 'Profesional AFA',
    epoca: '2016 - Presente',
    imagenUrl: 'assets/catalina_primo.png',
    descripcion: 'Iniciada en las categorías formativas del Club Sportivo 9 de Julio. Delantera de jerarquía en el torneo semiprofesional de AFA, con destacadas campañas en Racing Club, UAI Urquiza y actual atacante de River Plate. Convocada permanente a la Selección Argentina de Fútbol Femenino Mayor y mundialista juvenil.',
    legado: 'Máxima exponente riotercerense en el fútbol femenino profesional de Primera División y torneos Conmebol.',
    telemetria: [
      { label: 'SELECCIÓN AFA', val: 'Selección Argentina Mayor y Sub-20' },
      { label: 'CLUB ACTUAL', val: 'Delantera en River Plate' },
      { label: 'COPA LIBERTADORES', val: 'Disputa de Torneos Conmebol' },
      { label: 'CLUB FORMADOR', val: 'Club Sportivo 9 de Julio' }
    ]
  },
  {
    id: '9',
    nombre: 'Andrea Berrino',
    disciplina: 'Natación',
    especialidad: 'Espaldista · Velocidad Pura en 50m y 100m',
    clubOrigen: 'C.A. Río Tercero / Natatorios Locales',
    logroPrincipal: 'Plusmarquista Sudamericana · Bronce Lima 2019',
    categoria: 'Panamericana / Récord',
    epoca: '2010s - Presente',
    imagenUrl: 'assets/andrea_berrino.jpg',
    descripcion: 'Formada en las piscinas del Club Atlético Río Tercero y natatorios municipales. Medallista de Bronce en los Juegos Panamericanos de Lima 2019, campeona y récord continental en 50m y 100m estilo espalda. Participante en múltiples Campeonatos Mundiales de Natación FINA en piscina corta y larga.',
    legado: 'Referente acuática que llevó la natación de Río Tercero a los récords continentales sudamericanos.',
    telemetria: [
      { label: 'RÉCORD CONTINENTAL', val: 'Plusmarquista Sudamericana en Espalda' },
      { label: 'JUEGOS PANAM', val: 'Medalla de Bronce Lima 2019' },
      { label: 'MUNDIALES FINA', val: 'Múltiple Representante Mundial' },
      { label: 'ORIGEN Y PILETA', val: 'Club Atlético Río Tercero' }
    ]
  },
  {
    id: '10',
    nombre: 'Ivano Falchetti',
    disciplina: 'Tiro',
    especialidad: 'Tiro al Vuelo · Fosa Olímpica y Hélice',
    clubOrigen: 'Tiro Federal Río Tercero',
    logroPrincipal: 'Múltiple Campeón Nacional e Internacional',
    categoria: 'Tiro de Precisión',
    epoca: '1990s - 2020s',
    imagenUrl: 'assets/ivano_falchetti.jpg',
    descripcion: 'Consagrado en el tradicional polígono del Tiro Federal Río Tercero. Atleta de élite en las modalidades de fosa olímpica, hélice y tiro al vuelo, sumando podios en certámenes sudamericanos, copas del mundo y copas nacionales argentinas de la Federación de Tiro.',
    legado: 'Guardián y laureado representante de la histórica tradición centenaria de tiro deportivo en Río Tercero.',
    telemetria: [
      { label: 'MODALIDAD', val: 'Fosa Olímpica y Tiro a la Hélice' },
      { label: 'COMPETENCIA', val: 'Circuitos Nacionales y Mundiales' },
      { label: 'TRAYECTORIA', val: 'Múltiples Títulos y Copas de Oro' },
      { label: 'POLÍGONO BASE', val: 'Tiro Federal Río Tercero' }
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
      description: "Institución centenaria fundada en 1917. Cuenta con estadio de fútbol reglamentario, polideportivo cubierto y canchas auxiliares. Es un pilar histórico del deporte formativo y de alta competencia en la región.",
      crest: "assets/escudo_cart.jpg",
      colors: "Azul y Blanco",
      athleteOrigin: "Claudio López, Ivanna Madruga, Andrea Berrino"
    },
    {
      name: "Club Sportivo 9 de Julio",
      acronym: "9 DE JULIO",
      founded: "Fundado en 1927 (Centenario)",
      focus: "Básquetbol federado · Fútbol · Vóleibol · Hockey · Tenis",
      description: "Fundado en 1927. Posee el Complejo «Gregorio Gutiérrez» con parqué para básquetbol y canchas de piso sintético. Referente provincial y nacional con amplia participación en torneos federados.",
      crest: "assets/escudo_9dejulio.png",
      colors: "Celeste y Blanco",
      athleteOrigin: "Pablo Prigioni, Gustavo Fernández, Catalina Primo"
    },
    {
      name: "Club Deportivo Independiente",
      acronym: "CDI",
      founded: "Mediados del Siglo XX",
      focus: "Fútbol oficial LRRF · Tenis · Bochas · Formación Social",
      description: "Fundado a mediados del Siglo XX. Dispone del Estadio «Pura Molina», complejo de tenis y frontón. Destacado semillero de planteles juveniles en la Liga Riotercerense y centro de encuentro barrial.",
      crest: "assets/escudo_independiente.png",
      colors: "Rojo y Negro",
      athleteOrigin: "Planteles formativos LRRF y tenis regional"
    },
    {
      name: "Club Deportivo Casino",
      acronym: "CASINO",
      founded: "Mediados del Siglo XX",
      focus: "Fútbol de mayores y juveniles · Bochas · Deporte Social",
      description: "Nacido a mediados del Siglo XX. Cuenta con cancha reglamentaria y sede social tradicional. Histórico competidor en torneos oficiales de la LRRF con fuerte labor comunitaria y de divisiones inferiores.",
      crest: "assets/escudo_casino.png",
      colors: "Verde y Blanco",
      athleteOrigin: "Divisiones juveniles y fútbol federado"
    },
    {
      name: "Club Vecinos Unidos",
      acronym: "VECINOS UNIDOS",
      founded: "Segunda mitad del Siglo XX",
      focus: "Fútbol formativo · Fútbol femenino · Primera división LRRF",
      description: "Institución barrial reconocida popularmente como «El León». Dispone de campo de juego y áreas multideporte, destacándose como gran semillero infantil y pionero en el desarrollo del fútbol femenino.",
      crest: "assets/escudo_vecinosunidos.png",
      colors: "Amarillo y Negro",
      athleteOrigin: "Semillero barrial y fútbol femenino"
    },
    {
      name: "Río Tercero Rugby Club",
      acronym: "RTRC",
      founded: "Etapa contemporánea federada",
      focus: "Rugby masculino y femenino · Hockey sobre césped formativo",
      description: "Hogar de «Los Zorros» en la Unión Cordobesa de Rugby. Posee predio deportivo propio con canchas de césped natural y club house, promoviendo los valores del rugby y el hockey en todas sus divisiones.",
      crest: "assets/escudo_rtrc.png",
      colors: "Bordó / Azul y Blanco",
      athleteOrigin: "Fernando «Peny» Herrera y formativas"
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
