/**
 * CONTENT.JS - Configuración y Datos Editables
 * Día del Deportista – Río Tercero (Río 3)
 * 
 * Modifica libremente los valores de este archivo para adaptar el contenido
 * de la presentación ante la Municipalidad sin tocar la estructura del código.
 * Todos los campos con [COMPLETAR] están listos para ser reemplazados con información oficial.
 */

window.SITE_CONTENT = {
  // Identidad institucional
  institution: {
    title: "Día del Deportista",
    city: "Río Tercero",
    tagline: "Capital Nacional del Deportista",
    date: "[COMPLETAR: 3 de Noviembre / Fecha Oficial]",
    motto: "El corazón de una ciudad que late al ritmo del deporte, la superación y el orgullo de nuestra identidad.",
    contactEmail: "deportes@riotercero.gob.ar [COMPLETAR]",
    contactPhone: "+54 3571 [COMPLETAR]"
  },

  // Sección 2: Manifiesto / Qué es el Día del Deportista
  manifesto: {
    eyebrow: "ESPÍRITU & VALORES",
    headline: "EL DEPORTE NO ES SOLO COMPETENCIA; ES LA HISTORIA VIVA DE RÍO TERCERO.",
    description: "Cada cancha de barrio, cada pista y cada club de nuestra ciudad forjaron a campeones mundiales y a miles de jóvenes con valores inquebrantables. El Día del Deportista es el homenaje de todo un pueblo a la pasión, la disciplina y el trabajo en equipo de nuestras generaciones."
  },

  // Sección 3: Deportes Destacados (Secciones Pinned)
  sports: [
    {
      id: "futbol",
      name: "FÚTBOL",
      subtitle: "PASIÓN DE POTREROS Y GLORIA MUNDIAL",
      stat: "10+",
      statLabel: "Clubes formativos y canchas históricas [COMPLETAR]",
      description: "La cuna de talentos que llevaron la bandera riotercerense a las copas del mundo y estadios de primer nivel. El fútbol de nuestra ciudad une barrios y construye comunidad todos los fines de semana.",
      color: "#0B1B3A",
      accent: "#FFD400"
    },
    {
      id: "tenis",
      name: "TENIS",
      subtitle: "PRECISIÓN, TIERRA BATIDA Y RESILIENCIA",
      stat: "Top Mundial",
      statLabel: "Referentes en Grand Slams y circuito internacional [COMPLETAR]",
      description: "Desde las canchas de polvo de ladrillo locales hasta las finales mundiales y el tenis adaptado de élite, Río Tercero es sinónimo de garra, técnica y orgullo en cada drive.",
      color: "#162850",
      accent: "#FF6B2C"
    },
    {
      id: "basquet",
      name: "BÁSQUET",
      subtitle: "PARQUET, TÁCTICA Y MÍSTICA COLECTIVA",
      stat: "15+",
      statLabel: "Categorías formativas y ligas activas [COMPLETAR]",
      description: "El ruido del balón picando en el parquet y el aliento ensordecedor en los tableros. Nuestra ciudad vive el básquetbol como una escuela de vida y superación.",
      color: "#1c2238",
      accent: "#FF8C00"
    },
    {
      id: "voley",
      name: "VÓLEY",
      subtitle: "POTENCIA EN LA RED Y TRABAJO EN EQUIPO",
      stat: "100%",
      statLabel: "Compromiso formativo femenino y masculino [COMPLETAR]",
      description: "Bloqueo, defensa y remate. El vóley une a las familias en los polideportivos locales, compitiendo en ligas provinciales y formando deportistas íntegros.",
      color: "#0F2B5C",
      accent: "#00E5FF"
    },
    {
      id: "natacion",
      name: "NATACIÓN",
      subtitle: "VELOCIDAD, DISCIPLINA Y AGUA ABIERTA",
      stat: "Podios",
      statLabel: "Medallas provinciales y marcas nacionales [COMPLETAR]",
      description: "Brazada a brazada en piletas olímpicas y en las aguas del río que nos da nombre. El entrenamiento constante forja nadadores de elite y salud comunitaria.",
      color: "#08335E",
      accent: "#00F0FF"
    },
    {
      id: "atletismo",
      name: "ATLETISMO",
      subtitle: "VELOCIDAD, FONDO Y SUPERACIÓN PERSONAL",
      stat: "42K",
      statLabel: "Corredores, maratonistas y triatletas de élite [COMPLETAR]",
      description: "La pista de atletismo y las calles de Río Tercero son el escenario de fondistas, velocistas y triatletas que conquistaron pruebas internacionales como el Ironman.",
      color: "#28173B",
      accent: "#FF4565"
    },
    {
      id: "hockey",
      name: "HOCKEY",
      subtitle: "GARRA, ESTRATEGIA Y CRECIMIENTO EXPONENCIAL",
      stat: "Crecimiento",
      statLabel: "Cientos de jugadoras y jugadores en competencia [COMPLETAR]",
      description: "Canchas sintéticas llenas de juventud los sábados por la mañana. El hockey en Río 3 representa compañerismo, esfuerzo y una proyección sin techo.",
      color: "#0D2E35",
      accent: "#00E676"
    }
  ],

  // Sección 4: Números que inspiran (Métricas)
  metrics: [
    { value: 18, suffix: "+", label: "Clubes e Instituciones", sub: "Forjadores de identidad deportiva [COMPLETAR]" },
    { value: 4500, suffix: "+", label: "Deportistas Federados", sub: "En competencia activa año tras año [COMPLETAR]" },
    { value: 32, suffix: "", label: "Disciplinas Prácticas", sub: "Desde el atletismo hasta deportes sobre ruedas [COMPLETAR]" },
    { value: 24, suffix: "+", label: "Escuelas Barriales", sub: "Inclusión social e iniciación deportiva [COMPLETAR]" }
  ],

  // Sección 5: Galería Horizontal de Clubes y Referentes
  gallery: [
    {
      tag: "CLUB EMBLEMÁTICO",
      title: "Club Atlético Río Tercero",
      detail: "Centenario formador de deportistas en fútbol, básquet y bochas [COMPLETAR]",
      badge: "Fundado en 19[COMPLETAR]"
    },
    {
      tag: "INSTITUCIÓN FORMATIVA",
      title: "Club Sportivo 9 de Julio",
      detail: "Epicentro deportivo regional, canchas polideportivas y básquet de liga [COMPLETAR]",
      badge: "Pilar Histórico"
    },
    {
      tag: "ORGULLO LOCAL",
      title: "Club Central Argentino",
      detail: "Espacio de pertenencia e integración comunitaria para cientos de familias [COMPLETAR]",
      badge: "Pasión Barrial"
    },
    {
      tag: "DEPORTE MOTOR Y PISTAS",
      title: "Automoto Club Río Tercero",
      detail: "Huna de grandes campeones nacionales de rally y automovilismo [COMPLETAR]",
      badge: "Tradición Tuerca"
    },
    {
      tag: "TENIS & RAQUETA",
      title: "Círculo de Ajedrez & Tenis",
      detail: "Escuelas de formación de campeones y torneos federados [COMPLETAR]",
      badge: "Alto Rendimiento"
    },
    {
      tag: "CENTRO POLIDEPORTIVO",
      title: "Polideportivo Municipal Marciano Verón",
      detail: "Instalación pública de acceso gratuito para atletismo y disciplinas múltiples [COMPLETAR]",
      badge: "Infraestructura Pública"
    }
  ],

  // Sección 6: Línea de Tiempo Deportiva
  timeline: [
    {
      year: "1950 - 1970",
      title: "Los Primeros Cimientos",
      desc: "Nacimiento de los primeros clubes de fútbol y básquetbol que organizaron la vida social y deportiva de la ciudad obrera [COMPLETAR]."
    },
    {
      year: "1980 - 1995",
      title: "El Despegue Nacional",
      desc: "Aparición de atletas y futbolistas que comenzaron a trascender a nivel provincial y en las principales ligas argentinas [COMPLETAR]."
    },
    {
      year: "1996 - 2010",
      title: "Consagración Internacional",
      desc: "Río Tercero en los ojos del mundo: representantes en Mundiales de Fútbol, títulos internacionales de tenis y podios mundiales de triatlón [COMPLETAR]."
    },
    {
      year: "2017",
      title: "Declaración Histórica",
      desc: "Reconocimiento por Ley como la 'Capital Nacional del Deportista', consolidando el legado y la identidad indiscutible de Río 3 [COMPLETAR]."
    },
    {
      year: "2026 y Futuro",
      title: "Modernización y Nuevas Generaciones",
      desc: "Impulso de programas municipales de tecnificación, inclusión social, deportes urbanos y apoyo integral al atleta juvenil [COMPLETAR]."
    }
  ],

  // Sección 7: Agenda de Eventos del Día del Deportista
  events: [
    {
      date: "[COMPLETAR: 08:30 HS]",
      title: "Maratón y Caminata Ciudadana de la Ciudad",
      place: "Paseo del Riel / Polideportivo Municipal [COMPLETAR]",
      badge: "Abierto a la Comunidad",
      desc: "Pruebas de 5K participativo y 10K competitivo con premiación a todas las categorías."
    },
    {
      date: "[COMPLETAR: 14:00 HS]",
      title: "Clínicas Deportivas con Figuras Riotercerenses",
      place: "Polideportivo Municipal y Clubes [COMPLETAR]",
      badge: "Iniciación y Máster",
      desc: "Entrenamientos abiertos de tenis, fútbol y básquet brindados por glorias de la ciudad."
    },
    {
      date: "[COMPLETAR: 18:30 HS]",
      title: "Feria de Instituciones Deportivas & Expo Salud",
      place: "Plaza San Martín / Paseo del Riel [COMPLETAR]",
      badge: "Stands y Talleres",
      desc: "Espacios de nutrición deportiva, demostraciones en vivo y kinesiología preventiva."
    },
    {
      date: "[COMPLETAR: 21:00 HS]",
      title: "Gran Gala Premios 'Capital del Deportista'",
      place: "Teatro / Anfiteatro Municipal [COMPLETAR]",
      badge: "Ceremonia Oficial",
      desc: "Reconocimiento a las promesas del año, trayectorias deportivas y menciones de honor."
    }
  ],

  // Sección 8: Propuesta para la Municipalidad (Políticas Públicas)
  proposals: [
    {
      number: "01",
      title: "Plan Integral de Infraestructura Barrial",
      desc: "Puesta en valor e iluminación LED en playones barriales para garantizar que cada niño y niña tenga una cancha digna a menos de 5 cuadras de su casa.",
      tag: "Infraestructura"
    },
    {
      number: "02",
      title: "Fondo de Becas 'Promesas Riotercerenses'",
      desc: "Creación de un fondo de estímulo económico y cobertura médica/nutricional para atletas juveniles que viajan a competir a nivel nacional.",
      tag: "Desarrollo de Talentos"
    },
    {
      number: "03",
      title: "Olimpiadas Intercolegiales 'Río 3 Activa'",
      desc: "Articulación entre escuelas secundarias y primarias para fomentar torneos anuales interdisciplinarios con foco en valores y compañerismo.",
      tag: "Educación & Comunidad"
    },
    {
      number: "04",
      title: "Centro Municipal de Biomecánica y Rendimiento",
      desc: "Apertura de un gabinete multidisciplinario gratuito para deportistas federados con kinesiólogos, psicólogos deportivos y preparadores físicos.",
      tag: "Salud y Élite"
    }
  ],

  // Sección 9: Mensaje de Cierre
  closing: {
    quote: "“EN RÍO TERCERO EL TALENTO NACE EN EL POTRERO, SE FORJA CON DISCIPLINA Y SE COMPARTE CON EL CORAZÓN DE TODO UN PUEBLO.”",
    author: "Homenaje a los Deportistas de Nuestra Ciudad [COMPLETAR]",
    ctaButton: "Presentar Proyecto a la Municipalidad",
    secondaryButton: "Descargar Documento Oficial PDF [COMPLETAR]"
  }
};
