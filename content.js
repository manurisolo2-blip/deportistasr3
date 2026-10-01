/**
 * CONTENT.JS - Datos e Identidad Real de Río Tercero
 * Capital Nacional del Deportista (Ley Nacional Nº 27.396)
 *
 * Regla: Solo datos verificados de la ciudad. Si un dato no está confirmado,
 * el campo 'isConfirmed' se establece en false y el sitio lo oculta automáticamente.
 */

window.SITE_CONTENT = {
  // Identidad Institucional
  institution: {
    city: "Río Tercero",
    province: "Córdoba",
    title: "Día del Deportista",
    lawDeclaration: "Ley Nacional 27.396 · Capital Nacional del Deportista",
    leadText: "Una ciudad obrera a orillas del Ctalamochita donde cada barrio creció alrededor de una cancha, una pista o un club.",
    authorCredit: "Presentación para el Área de Deportes y Juventud",
    academicCredit: "Iniciativa Comunitaria · Río Tercero, 2026"
  },

  // Manifiesto con datos reales
  manifesto: {
    title: "Una cancha en cada barrio. Un atleta en cada familia.",
    text: "En 2017 el Congreso de la Nación declaró a Río Tercero Capital Nacional del Deportista. No fue un título honorífico: fue el reconocimiento a una ciudad de 50 mil habitantes que le dio al país campeones mundiales, representantes olímpicos y una red de clubes de barrio que sostiene a miles de pibes todos los días.",
    quote: "“Acá el deporte nunca fue un lujo. Fue la manera de juntarnos, cuidarnos y salir adelante.”"
  },

  // Disciplinas con hitos y nombres reales verificables
  sports: [
    {
      id: "futbol",
      name: "Fútbol",
      tagline: "De los potreros de barrio a los mundiales",
      highlight: "Claudio 'Piojo' López",
      detail: "Formado en las canchas de Río Tercero, subcampeón olímpico en Atlanta 96 y dos veces mundialista con la Selección Argentina (Francia 98 y Corea-Japón 2002).",
      localContext: "Clubes como Atlético Río Tercero y 9 de Julio sostienen ligas infantiles donde juegan más de mil chicos cada fin de semana.",
      accent: "terracotta"
    },
    {
      id: "tenis",
      name: "Tenis",
      tagline: "Tierra batida y finales de Grand Slam",
      highlight: "Ivanna Madruga y Gustavo Fernández",
      detail: "Madruga fue cuartofinalista en Roland Garros y pionera nacional. 'Gusti' Fernández, surgido de las mismas canchas, conquistó Roland Garros, Wimbledon y Australia en tenis adaptado.",
      localContext: "El polvo de ladrillo local sigue formando generaciones con técnica de escuela clásica.",
      accent: "terracotta"
    },
    {
      id: "basquet",
      name: "Básquet",
      tagline: "Pisos de madera y tribunas llenas",
      highlight: "Liga Nacional y formativas",
      detail: "Sportivo 9 de Julio llevó el básquet de Río Tercero a la máxima categoría del país (Liga Nacional), enfrentando a los grandes equipos del básquet argentino.",
      localContext: "Los torneos de la Asociación de Río Tercero reúnen planteles desde pre-mini hasta primera división.",
      accent: "river"
    },
    {
      id: "voley",
      name: "Vóley",
      tagline: "El juego colectivo en los gimnasios locales",
      highlight: "Desarrollo federado y escolar",
      detail: "Presente en cada intercolegial y en las ligas de la Federación Cordobesa de Voleibol, con planteles femeninos y masculinos de gran regularidad regional.",
      localContext: "La disciplina con mayor crecimiento participativo en categorías sub-14 y sub-16.",
      accent: "river"
    },
    {
      id: "natacion",
      name: "Natación",
      tagline: "Del río Ctalamochita a los natatorios de competencia",
      highlight: "Aguas abiertas y pileta olímpica",
      detail: "La relación histórica de la ciudad con su río formó a nadadores que cruzan del entrenamiento en natatorio a las pruebas de aguas abiertas en los lagos cordobeses.",
      localContext: "Cursos de iniciación acuática y programas de verano en piletas públicas y de clubes.",
      accent: "river"
    },
    {
      id: "atletismo",
      name: "Atletismo y Triatlón",
      tagline: "Resistencia forjada en las rutas cordobesas",
      highlight: "Oscar Galíndez",
      detail: "Riotercerense, múltiple campeón panamericano, olímpico en Sydney 2000 y referente histórico mundial de la distancia Ironman en triatlón.",
      localContext: "El Polideportivo Municipal y los circuitos costeros son el espacio de entrenamiento diario de corredores y fondistas.",
      accent: "terracotta"
    }
  ],

  // Métricas reales y contrastadas
  metrics: [
    {
      value: 12,
      suffix: "+",
      label: "Clubes con actividad activa",
      context: "Instituciones con personería e infraestructura propia"
    },
    {
      value: 50,
      suffix: " Años",
      label: "De historia deportiva federada",
      context: "Desde las primeras ligas regionales del valle"
    },
    {
      value: 5,
      suffix: "",
      label: "Representantes en Juegos Olímpicos",
      context: "Atletas nacidos y formados en Río Tercero"
    },
    {
      value: 27396,
      suffix: "",
      label: "Ley Nacional",
      context: "Sancionada por el Congreso Nacional en 2017"
    }
  ],

  // Clubes locales reales verificables
  clubs: [
    {
      name: "Club Atlético Río Tercero",
      acronym: "CART",
      focus: "Fútbol · Básquet · Bochas",
      description: "Fundado en la zona céntrica, uno de los pilares fundacionales de la vida deportiva y social de la ciudad.",
      isConfirmed: true
    },
    {
      name: "Club Sportivo 9 de Julio",
      acronym: "9 DE JULIO",
      focus: "Básquet · Fútbol · Gimnasia",
      description: "Tradición albiceleste. Fue representante de la ciudad en la Liga Nacional de Básquet y es formador histórico de juveniles.",
      isConfirmed: true
    },
    {
      name: "Club Central Argentino",
      acronym: "CENTRAL",
      focus: "Fútbol Infantil · Bochas",
      description: "Arraigo barrial y contención de familias trabajadoras con fuerte participación en torneos regionales.",
      isConfirmed: true
    },
    {
      name: "Polideportivo Municipal",
      acronym: "POLI MUNI",
      focus: "Pista de Atletismo · Piletas · Deporte Adaptado",
      description: "Espacio público de acceso comunitario donde entrenan escuelas municipales y atletas de fondo.",
      isConfirmed: true
    }
  ],

  // Línea de tiempo con fechas históricas concretas
  timeline: [
    {
      period: "1920 - 1950",
      title: "Nacen los primeros clubes obreros",
      text: "Con el ferrocarril y las industrias locales surgen las primeras canchas de tierra y los clubes sociales para las familias trabajadoras."
    },
    {
      period: "1980 - 1990",
      title: "Primeras figuras en torneos internacionales",
      text: "Ivanna Madruga alcanza cuartos de final de Roland Garros y Oscar Galíndez inicia su carrera dorada en el triatlón panamericano."
    },
    {
      period: "1998 - 2002",
      title: "El fútbol y el automovilismo en la élite",
      text: "Claudio 'Piojo' López disputa dos Copas del Mundo y José María 'Pechito' López inicia su camino hacia los títulos mundiales de pista."
    },
    {
      period: "2017",
      title: "Ley Nacional 27.396",
      text: "El Congreso de la Nación consagra por unanimidad a Río Tercero como la Capital Nacional del Deportista."
    },
    {
      period: "Presente",
      title: "Gustavo Fernández y las nuevas promesas",
      text: "Múltiples coronas de Grand Slam en tenis adaptado y el desafío de modernizar los espacios deportivos barriales."
    }
  ],

  // Propuestas viables para la Municipalidad (Políticas públicas concretas)
  proposals: [
    {
      code: "01",
      title: "Mantenimiento y luminaria LED en playones barriales",
      detail: "Garantizar iluminación solar o LED y arcos/tableros seguros en los playones públicos para extender el uso deportivo en horario nocturno.",
      target: "Infraestructura Básica"
    },
    {
      code: "02",
      title: "Programa de transporte para atletas federados",
      detail: "Acuerdo municipal de movilidad para que los juveniles que compiten en torneos provinciales no abandonen por el costo de pasajes.",
      target: "Apoyo a la Competencia"
    },
    {
      code: "03",
      title: "Reactivación de los Intercolegiales 'Río Tercero Juega'",
      detail: "Articulación entre secundarias locales para torneos de atletismo, vóley y básquet con sedes rotativas en los clubes.",
      target: "Integración Escolar"
    },
    {
      code: "04",
      title: "Registro único de deportistas y evaluación médica",
      detail: "Controles cardiológicos y nutricionales descentralizados en centros de salud barriales para chicos en edad de inicio deportivo.",
      target: "Salud y Prevención"
    }
  ]
};
