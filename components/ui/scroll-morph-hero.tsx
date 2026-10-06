"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

export interface AthleteData {
  id?: string;
  nombre: string;
  disciplina: string;
  especialidad?: string;
  clubOrigen: string;
  logroPrincipal: string;
  categoria?: string;
  epoca?: string;
  imagenUrl: string;
  descripcion?: string;
  legado?: string;
  telemetria?: Array<{ label: string; val: string }>;
}

interface FlipCardProps {
  athlete: AthleteData;
  index: number;
  total: number;
  phase: AnimationPhase;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
  onClick: (athlete: AthleteData) => void;
}

// --- FlipCard Component ---
const IMG_WIDTH = 75;
const IMG_HEIGHT = 105;

function FlipCard({
  athlete,
  index,
  total,
  phase,
  target,
  onClick,
}: FlipCardProps) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="cursor-pointer group select-none"
      onClick={() => onClick(athlete)}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180, scale: 1.12 }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-xl bg-slate-900 border border-white/20"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={athlete.imagenUrl}
            alt={athlete.nombre}
            className="h-full w-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-1.5 left-1.5 right-1.5 text-left">
            <p className="text-[7px] font-mono font-bold text-sky-400 uppercase tracking-tight truncate">
              {athlete.disciplina}
            </p>
            <p className="text-[8.5px] font-sans font-black text-white uppercase tracking-tight leading-tight truncate">
              {athlete.nombre}
            </p>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-xl bg-slate-950 flex flex-col items-center justify-between p-2 border border-sky-500/40"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center w-full">
            <span className="text-[6.5px] font-mono font-bold text-sky-400 uppercase tracking-widest block mb-0.5">
              {athlete.clubOrigen}
            </span>
            <p className="text-[8px] font-bold text-white leading-tight line-clamp-2">
              {athlete.logroPrincipal}
            </p>
          </div>
          <div className="w-full bg-sky-600/90 hover:bg-sky-500 text-white text-[7.5px] font-mono font-bold uppercase py-1 px-1.5 rounded text-center transition-colors shadow-sm">
            Ver Ficha
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 20 Atletas Históricos de Río Tercero
const DEFAULT_ATHLETES: AthleteData[] = [
  {
    id: "1",
    nombre: "Pablo Prigioni",
    disciplina: "Básquetbol",
    especialidad: "Base Armador · FIBA / NBA",
    clubOrigen: "Club Sportivo 9 de Julio",
    logroPrincipal: "Bronce Pekín 2008 · Ex NBA · DT Selección",
    categoria: "Olímpico / NBA",
    epoca: "2000s - Presente",
    imagenUrl: "assets/prigioni.jpg",
    descripcion: "Iniciado en las formativas de Club Sportivo 9 de Julio. Medallista de Bronce en los Juegos Olímpicos de Pekín 2008 con la Generación Dorada, disputó 4 temporadas en la NBA (Knicks, Rockets, Clippers), multicampeón de ACB/Euroliga y actual DT de la Selección Argentina Mayor.",
    legado: "Pilar de la Generación Dorada y formador de juego reconocido mundialmente.",
    telemetria: [
      { label: "JUEGOS OLÍMPICOS", val: "Bronce Pekín 2008" },
      { label: "NBA TRAYECTORIA", val: "4 Temporadas (NY, HOU, LAC)" },
      { label: "ACTUALIDAD", val: "DT Selección Argentina Mayor" },
    ],
  },
  {
    id: "2",
    nombre: "José María «Pechito» López",
    disciplina: "Automovilismo",
    especialidad: "Piloto Hypercar WEC · Resistencia",
    clubOrigen: "Kartódromo Municipal Río 3",
    logroPrincipal: "3x WTCC · Ganador 24h Le Mans · 2x WEC",
    categoria: "Mundial FIA",
    epoca: "2000s - Presente",
    imagenUrl: "assets/pechito.jpg",
    descripcion: "Forjado en los kartódromos y circuitos de tierra de Río Tercero. Tricampeón Mundial WTCC (2014, 2015, 2016), bicampeón del Mundial de Resistencia WEC con Toyota Gazoo Racing y triunfador absoluto de las 24 Horas de Le Mans en 2021.",
    legado: "Uno de los pilotos más versátiles y laureados de la historia del automovilismo argentino.",
    telemetria: [
      { label: "TÍTULOS FIA", val: "3x WTCC · 2x WEC Mundial" },
      { label: "HITO HISTÓRICO", val: "Ganador 24h Le Mans 2021" },
      { label: "EQUIPO OFICIAL", val: "Toyota Gazoo Racing / Lexus" },
    ],
  },
  {
    id: "3",
    nombre: "Claudio «Piojo» López",
    disciplina: "Fútbol",
    especialidad: "Delantero Extremo · Velocidad",
    clubOrigen: "C.A. Río Tercero / Sportivo 9 de Julio",
    logroPrincipal: "Plata Atlanta 1996 · 2x Mundialista FIFA",
    categoria: "Olímpico / Mundial",
    epoca: "1990s - 2000s",
    imagenUrl: "assets/piojo_lopez.jpg",
    descripcion: "Medallista de plata en Atlanta 1996 y mundialista con la Selección Argentina en Francia 1998 y Corea-Japón 2002. Figura histórica de Valencia CF, Lazio y Racing Club.",
    legado: "Emblema del fútbol vertical de elite de los años 90 y 2000.",
    telemetria: [
      { label: "JUEGOS OLÍMPICOS", val: "Medalla de Plata Atlanta 1996" },
      { label: "COPAS DEL MUNDO", val: "Francia 1998 y Corea-Japón 2002" },
      { label: "EUROPA", val: "Valencia CF, SS Lazio" },
    ],
  },
  {
    id: "4",
    nombre: "Gustavo «Lobito» Fernández",
    disciplina: "Tenis Adaptado",
    especialidad: "Singles y Dobles en Silla de Ruedas",
    clubOrigen: "Club Sportivo 9 de Julio",
    logroPrincipal: "N.º 1 del Mundo · 5x Grand Slam · 2x Roland Garros",
    categoria: "Grand Slam / ITF",
    epoca: "2010s - Presente",
    imagenUrl: "assets/gustavo_fernandez.jpg",
    descripcion: "Ex número 1 del ranking mundial individual de la ITF, ganador de múltiples torneos de Grand Slam (Australian Open, Roland Garros, Wimbledon) y abanderado paralímpico nacional.",
    legado: "Máximo referente histórico del tenis adaptado latinoamericano.",
    telemetria: [
      { label: "RANKING ITF", val: "N.º 1 del Mundo Individual" },
      { label: "GRAND SLAMS", val: "5x Títulos Individuales Mayores" },
      { label: "PARALÍMPICOS", val: "Múltiple Abanderado Argentino" },
    ],
  },
  {
    id: "5",
    nombre: "Ivanna Madruga",
    disciplina: "Tenis",
    especialidad: "Singles WTA · Finalista Roland Garros",
    clubOrigen: "Club Sportivo 9 de Julio",
    logroPrincipal: "Top 14 WTA · Finalista Roland Garros Dobles",
    categoria: "Grand Slam / WTA",
    epoca: "1970s - 1980s",
    imagenUrl: "assets/ivanna_madruga.jpg",
    descripcion: "Pionera absoluta del tenis femenino argentino profesional. Alcanzó el puesto 14 del ranking mundial WTA, disputó finales de dobles en Roland Garros y representó al país en Copa Federación.",
    legado: "Precursora del tenis femenino argentino de alta competencia en el circuito internacional.",
    telemetria: [
      { label: "MEJOR RANKING", val: "Top 14 Mundial WTA" },
      { label: "GRAND SLAM", val: "Finalista Dobles Roland Garros" },
      { label: "COPA FEDERACIÓN", val: "Líder histórica del equipo nacional" },
    ],
  },
  {
    id: "6",
    nombre: "Oscar Galíndez",
    disciplina: "Triatlón",
    especialidad: "Hombre de Hierro · Ironman & Olímpico",
    clubOrigen: "Deporte Comunitario Río 3",
    logroPrincipal: "Olímpico Sydney 2000 · Subcampeón Mundial Ironman",
    categoria: "Olímpico / Ironman",
    epoca: "1990s - 2010s",
    imagenUrl: "assets/oscar_galindez.jpg",
    descripcion: "Leyenda viva del triatlón mundial. Representante olímpico en Sydney 2000, subcampeón del mundo Ironman 70.3 y ganador en múltiples ediciones del Ironman de Brasil.",
    legado: "Ícono de la resistencia física y la longevidad competitiva en triatlón.",
    telemetria: [
      { label: "JUEGOS OLÍMPICOS", val: "Sydney 2000" },
      { label: "MUNDIAL IRONMAN", val: "Subcampeón Mundial 70.3" },
      { label: "TÍTULOS", val: "Múltiple Campeón Panamericano" },
    ],
  },
  {
    id: "7",
    nombre: "Andrea Berrino",
    disciplina: "Natación",
    especialidad: "Estilo Espalda y Libre · Velocidad",
    clubOrigen: "Club Sportivo 9 de Julio",
    logroPrincipal: "Panamericana · Récords Sudamericanos",
    categoria: "Internacional FINA",
    epoca: "2010s - Presente",
    imagenUrl: "assets/andrea_berrino.jpg",
    descripcion: "Representante argentina en Copas del Mundo y Juegos Panamericanos. Poseedora de múltiples plusmarcas argentinas y sudamericanas en 50m, 100m y 200m espalda.",
    legado: "Referente ineludible de la natación argentina contemporánea.",
    telemetria: [
      { label: "PLUSMARCAS", val: "Múltiple Récord Sudamericano" },
      { label: "JUEGOS PANAMERICANOS", val: "Medallista Toronto y Lima" },
      { label: "MUNDIALES FINA", val: "Semifinalista en piscina corta y larga" },
    ],
  },
  {
    id: "8",
    nombre: "Anahí Sosa",
    disciplina: "Gimnasia Rítmica",
    especialidad: "Maza, Aro y Cinta · Gimnasia Individual",
    clubOrigen: "Gimnasia Río Tercero",
    logroPrincipal: "Múltiple Campeona Sudamericana · Panamericana",
    categoria: "Internacional FIG",
    epoca: "1990s - 2000s",
    imagenUrl: "assets/anahi_sosa.jpg",
    descripcion: "Dominadora absoluta de la gimnasia rítmica argentina durante más de una década, con múltiples medallas en Juegos Panamericanos y Sudamericanos.",
    legado: "Símbolo de la disciplina artística y precisión técnica en gimnasia.",
    telemetria: [
      { label: "TRAYECTORIA", val: "10x Campeona Argentina Consecutiva" },
      { label: "SUDAMERICANOS", val: "Múltiples Medallas de Oro" },
      { label: "PANAMERICANOS", val: "Finalista de Élite" },
    ],
  },
  {
    id: "9",
    nombre: "Lucas Suárez",
    disciplina: "Fútbol",
    especialidad: "Defensor Central / Lateral Izquierdo",
    clubOrigen: "Club Deportivo Casino",
    logroPrincipal: "Campeón Panamericano · Primera División",
    categoria: "AFA / Internacional",
    epoca: "2010s - Presente",
    imagenUrl: "assets/lucas_suarez.jpg",
    descripcion: "Formado en las canchas de Río Tercero. Campeón en Juegos Panamericanos de Lima 2019 con la Selección Argentina Sub-23 y actual defensor de Primera División (Talleres de Córdoba).",
    legado: "Solidez defensiva y proyección en la elite del fútbol argentino.",
    telemetria: [
      { label: "SELECCIÓN NACIONAL", val: "Oro Panamericano Lima 2019" },
      { label: "CLUB ACTUAL", val: "Club Atlético Talleres" },
      { label: "COMPETENCIAS", val: "Copa Libertadores y Liga Profesional" },
    ],
  },
  {
    id: "10",
    nombre: "Nicolás Tagarelli",
    disciplina: "Tiro Deportivo",
    especialidad: "Fosa Olímpica y Skeet",
    clubOrigen: "Tiro Federal Río Tercero",
    logroPrincipal: "Campeón Sudamericano · Récord Nacional",
    categoria: "Federativo / ISSF",
    epoca: "2000s - Presente",
    imagenUrl: "assets/nicolas_tagarelli.jpg",
    descripcion: "Tirador de alto rendimiento con destacada participación en torneos sudamericanos y panamericanos en tiro al vuelo y fosa olímpica.",
    legado: "Tradición y precisión en el histórico Tiro Federal Río Tercero.",
    telemetria: [
      { label: "CAMPEONATOS", val: "Campeón Sudamericano ISSF" },
      { label: "SELECCIÓN", val: "Tirador Federado Nacional" },
      { label: "POLÍGONO", val: "Tiro Federal Río Tercero" },
    ],
  },
  {
    id: "11",
    nombre: "Rocío Comba",
    disciplina: "Atletismo",
    especialidad: "Lanzamiento de Disco · Fuerza Explosiva",
    clubOrigen: "Centro Deportivo Río Tercero",
    logroPrincipal: "3x Olímpica (Pekín 2008, Londres 2012, Río 2016)",
    categoria: "Olímpica / World Athletics",
    epoca: "2000s - 2010s",
    imagenUrl: "assets/rocio_comba.jpg",
    descripcion: "La atleta femenina más laureada de la ciudad. Tres participaciones olímpicas consecutivas y plusmarquista nacional de lanzamiento de disco.",
    legado: "Abanderada del atletismo cordobés en la elite de los Juegos Olímpicos.",
    telemetria: [
      { label: "JUEGOS OLÍMPICOS", val: "3x Participaciones (2008, 2012, 2016)" },
      { label: "MUNDIALES", val: "Finalista Mundial Moscú 2013" },
      { label: "MÉTRICA", val: "Récord Nacional de Disco" },
    ],
  },
  {
    id: "12",
    nombre: "Juan Manuel «Pato» Silva",
    disciplina: "Bochas",
    especialidad: "Puntaje y Bochas de Estilo",
    clubOrigen: "Club Deportivo Central",
    logroPrincipal: "Campeón Mundial y Panamericano",
    categoria: "Mundial / Federativo",
    epoca: "1990s - 2010s",
    imagenUrl: "assets/pato_silva.jpg",
    descripcion: "Campeón del Mundo de bochas, deporte de riquísima tradición en la ciudad con decenas de títulos internacionales.",
    legado: "Referencia nacional en el deporte bochófilo de alta competencia.",
    telemetria: [
      { label: "MUNDIALES", val: "Campeón del Mundo por Equipos" },
      { label: "PANAMERICANOS", val: "Múltiple Medallista de Oro" },
      { label: "ORIGEN", val: "Club Deportivo Central" },
    ],
  },
  {
    id: "13",
    nombre: "Franco Ferrato",
    disciplina: "Basquetbol",
    especialidad: "Alero Formativo · Liga Nacional",
    clubOrigen: "Club Sportivo 9 de Julio",
    logroPrincipal: "Liga Nacional de Básquet",
    categoria: "Profesional AdC",
    epoca: "2010s - Presente",
    imagenUrl: "assets/franco_ferrato.jpg",
    descripcion: "Formado en las divisiones formativas de Río Tercero, compitió en la Liga Nacional y Torneo Nacional de Ascenso.",
    legado: "Compromiso y vigencia del semillero basquetbolístico de la ciudad.",
    telemetria: [
      { label: "LIGA NACIONAL", val: "Plantel de Liga A" },
      { label: "CLUB DE ORIGEN", val: "Sportivo 9 de Julio" },
      { label: "POSICIÓN", val: "Alero / Escolta" },
    ],
  },
  {
    id: "14",
    nombre: "Fernando Cravero",
    disciplina: "Automovilismo",
    especialidad: "Turismo Nacional y Monomarcas",
    clubOrigen: "Talleres y Pistas Río 3",
    logroPrincipal: "Campeón Argentino de Turismo",
    categoria: "Nacional CDA",
    epoca: "1980s - 1990s",
    imagenUrl: "assets/fernando_cravero.jpg",
    descripcion: "Piloto apasionado y protagonista durante años de los certámenes nacionales de automovilismo de velocidad en pista.",
    legado: "Parte de la gloriosa tradición tuerca que distingue a Río Tercero.",
    telemetria: [
      { label: "CATEGORÍA", val: "Turismo Nacional" },
      { label: "PODIOS", val: "Múltiples victorias en circuitos nacionales" },
      { label: "DISCIPLINA", val: "Automovilismo de Pista" },
    ],
  },
  {
    id: "15",
    nombre: "Jorge «Pato» Rossi",
    disciplina: "Ciclismo",
    especialidad: "Ruta y Pista · Resistencia",
    clubOrigen: "Velódromo Río Tercero",
    logroPrincipal: "Campeón Argentino de Ciclismo en Ruta",
    categoria: "Federativo UCRA",
    epoca: "1970s - 1980s",
    imagenUrl: "assets/pato_rossi.jpg",
    descripcion: "Pedalista histórico que conquistó pruebas clásicas del calendario ciclista argentino de ruta y pista.",
    legado: "Inspirador de generaciones de ciclistas y triatletas en la región.",
    telemetria: [
      { label: "ARGENTINOS", val: "Campeón Nacional de Ruta" },
      { label: "VUELTAS", val: "Ganador de etapas en clásicas provinciales" },
      { label: "MODALIDAD", val: "Ruta y Pista" },
    ],
  },
  {
    id: "16",
    nombre: "Walter Maldonado",
    disciplina: "Boxeo",
    especialidad: "Categoría Mediano · Guardia Diestra",
    clubOrigen: "Gimnasio Municipal de Box",
    logroPrincipal: "Campeón Provincial y Nacional",
    categoria: "FAB / Profesional",
    epoca: "1980s - 1990s",
    imagenUrl: "assets/walter_maldonado.jpg",
    descripcion: "Púgil valiente y técnico que representó a Río Tercero en los cuadriláteros más exigentes del país.",
    legado: "Representante de la tenacidad y el temple del boxeo local.",
    telemetria: [
      { label: "FEDERACIÓN", val: "Federación Argentina de Box" },
      { label: "TÍTULO", val: "Campeón Cordobés de los Medianos" },
      { label: "TRAYECTORIA", val: "Más de 30 combates profesionales" },
    ],
  },
  {
    id: "17",
    nombre: "Gabriel Reinaldi",
    disciplina: "Rugby",
    especialidad: "Tercera Línea · Scrum y Tackle",
    clubOrigen: "Los Zorros Rugby Club",
    logroPrincipal: "Unión Cordobesa de Rugby",
    categoria: "Unión Cordobesa",
    epoca: "2000s - 2010s",
    imagenUrl: "assets/gabriel_reinaldi.jpg",
    descripcion: "Capitán y referente de Los Zorros Rugby Club, impulsando la disciplina de la ovalada en la ciudad.",
    legado: "Valores, liderazgo y crecimiento del rugby en la Capital del Deportista.",
    telemetria: [
      { label: "CLUB", val: "Los Zorros Rugby Club" },
      { label: "LIGA", val: "Unión Cordobesa de Rugby" },
      { label: "ROL", val: "Capitán y Formador" },
    ],
  },
  {
    id: "18",
    nombre: "Lucas Rimoldi",
    disciplina: "Fútbol",
    especialidad: "Mediocampista Central · Distribución",
    clubOrigen: "Club Sportivo 9 de Julio",
    logroPrincipal: "Primera División AFA · Carrera en Europa",
    categoria: "AFA / Internacional",
    epoca: "2000s - 2010s",
    imagenUrl: "assets/lucas_rimoldi.jpg",
    descripcion: "Mediocampista con amplia trayectoria en la Primera División de Argentina (Racing Club, Colón, Talleres) y fútbol europeo.",
    legado: "Presencia y jerarquía en las máximas ligas profesionales.",
    telemetria: [
      { label: "PRIMERA DIVISIÓN", val: "Racing Club, Colón, Quilmes" },
      { label: "EUROPA", val: "Genoa (Italia), PAS Giannina (Grecia)" },
      { label: "ORIGEN", val: "Sportivo 9 de Julio" },
    ],
  },
  {
    id: "19",
    nombre: "Noelia Martínez",
    disciplina: "Atletismo",
    especialidad: "Velocidad 100m y 200m",
    clubOrigen: "Centro Deportivo Río Tercero",
    logroPrincipal: "Campeona Nacional y Sudamericana",
    categoria: "World Athletics",
    epoca: "2010s - Presente",
    imagenUrl: "assets/noelia_martinez.jpg",
    descripcion: "Velocista destacada en pruebas cortas y postas, con títulos sudamericanos y podios nacionales.",
    legado: "Velocidad y dedicación en la pista de atletismo.",
    telemetria: [
      { label: "SUDAMERICANOS", val: "Medallista de Oro en Posta 4x100" },
      { label: "NACIONALES", val: "Múltiple Campeona Argentina de Velocidad" },
      { label: "DISCIPLINA", val: "100m, 200m y 400m Llanos" },
    ],
  },
  {
    id: "20",
    nombre: "Maximiliano Cavallone",
    disciplina: "Pelota Paleta",
    especialidad: "Delantero de Frontón y Trinquete",
    clubOrigen: "Club Atlético Río Tercero",
    logroPrincipal: "Campeón Panamericano y Mundialista",
    categoria: "FIPV / Mundial",
    epoca: "2000s - Presente",
    imagenUrl: "assets/maximiliano_cavallone.jpg",
    descripcion: "Representante argentino en campeonatos mundiales de pelota vasca y frontón, con múltiples consagraciones.",
    legado: "Maestría y puntería en una de las disciplinas más tradicionales del país.",
    telemetria: [
      { label: "MUNDIAL FIPV", val: "Finalista Campeonato Mundial" },
      { label: "PANAMERICANO", val: "Medallista de Oro Frontón" },
      { label: "ORIGEN", val: "Club Atlético Río Tercero" },
    ],
  },
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

interface ScrollMorphHeroProps {
  athletes?: AthleteData[];
  onSelectAthlete?: (athlete: AthleteData) => void;
  className?: string;
}

export function ScrollMorphHero({
  athletes = DEFAULT_ATHLETES,
  onSelectAthlete,
  className = "",
}: ScrollMorphHeroProps) {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalAthletes = athletes.length;
  const maxScroll = 3000;

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    setContainerSize({
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
    });

    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), maxScroll);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;

      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), maxScroll);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll, maxScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  const scrollRotate = useTransform(virtualScroll, [600, maxScroll], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scatterPositions = useMemo(() => {
    return athletes.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, [athletes]);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  const handleCardClick = (athlete: AthleteData) => {
    setSelectedAthlete(athlete);
    if (onSelectAthlete) {
      onSelectAthlete(athlete);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[750px] md:h-[820px] bg-[#FAF9F5] border border-slate-200 rounded-2xl overflow-hidden select-none shadow-sm ${className}`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center perspective-1000 relative">
        {/* Intro Text */}
        <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            className="text-2xl font-black uppercase tracking-tight text-slate-900 md:text-5xl font-['Plus_Jakarta_Sans',sans-serif]"
          >
            Río Tercero · Archivo Atlético
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 0.65 - morphValue }
                : { opacity: 0 }
            }
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-3 text-xs font-mono font-bold tracking-[0.25em] text-sky-700 uppercase"
          >
            Desplázate para Explorar las Figuras
          </motion.p>
        </div>

        {/* Arc Active Content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute top-[8%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
        >
          <span className="inline-block font-mono text-[11px] font-bold text-sky-700 bg-sky-100/80 px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-sky-300/40">
            Mosaico Dinámico de Atletas
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight uppercase font-['Plus_Jakarta_Sans',sans-serif]">
            Capital Nacional del Deportista
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-lg leading-relaxed mt-2">
            Haz clic en cualquier tarjeta para desplegar la ficha técnica, biografía deportiva y telemetría de consagración.
          </p>
        </motion.div>

        {/* 3D Morphing Cards Cluster */}
        <div className="relative flex items-center justify-center w-full h-full">
          {athletes.map((athlete, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i] || { x: 0, y: 0, rotation: 0, scale: 0.6, opacity: 0 };
            } else if (introPhase === "line") {
              const lineSpacing = 85;
              const lineTotalWidth = totalAthletes * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);

              // Circular constellation
              const circleRadius = Math.min(minDimension * 0.38, 360);
              const circleAngle = (i / totalAthletes) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius,
                rotation: circleAngle + 90,
              };

              // Bottom Arc
              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.35 : 1.15);
              const arcApexY = containerSize.height * (isMobile ? 0.38 : 0.28);
              const arcCenterY = arcApexY + arcRadius;

              const spreadAngle = isMobile ? 110 : 140;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (totalAthletes - 1);

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 0.75;
              const boundedRotation = -scrollProgress * maxRotation;

              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;

              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.35 : 1.7,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={athlete.id || i}
                athlete={athlete}
                index={i}
                total={totalAthletes}
                phase={introPhase}
                target={target}
                onClick={handleCardClick}
              />
            );
          })}
        </div>
      </div>

      {/* Modal de Detalle con Imagen Grande e Información Completa */}
      <AnimatePresence>
        {selectedAthlete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setSelectedAthlete(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 25, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row gap-6 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón Cerrar */}
              <button
                type="button"
                onClick={() => setSelectedAthlete(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer font-bold text-lg"
                aria-label="Cerrar modal"
              >
                ×
              </button>

              {/* Columna Izquierda: Imagen Grande */}
              <div className="w-full md:w-5/12 flex-shrink-0">
                <div className="relative aspect-square md:aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-100 shadow-md border border-slate-200">
                  <img
                    src={selectedAthlete.imagenUrl}
                    alt={selectedAthlete.nombre}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-white font-mono text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                    {selectedAthlete.disciplina}
                  </div>
                </div>
              </div>

              {/* Columna Derecha: Información Completa */}
              <div className="w-full md:w-7/12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-700 uppercase mb-1">
                    <span className="text-slate-400">Club de Origen:</span>
                    <span>{selectedAthlete.clubOrigen}</span>
                  </div>

                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-black uppercase text-slate-950 tracking-tight leading-tight">
                    {selectedAthlete.nombre}
                  </h3>

                  {selectedAthlete.especialidad && (
                    <p className="font-mono text-xs font-bold text-sky-700 mt-1 mb-3">
                      {selectedAthlete.especialidad}
                    </p>
                  )}

                  {/* Consagración Cumbre */}
                  <div className="relative bg-white rounded-xl p-3.5 mb-4 border-[2.5px] border-transparent [background:linear-gradient(#ffffff,#ffffff)_padding-box,linear-gradient(90deg,#0092df_0%,#41a934_100%)_border-box] shadow-[0_10px_25px_-8px_rgba(0,146,223,0.12),0_4px_12px_-2px_rgba(65,169,52,0.08)]">
                    <span className="block font-mono text-[10px] font-bold text-sky-700 uppercase tracking-wider">
                      Consagración Cumbre
                    </span>
                    <p className="text-base font-extrabold text-slate-900 mt-0.5 leading-snug">
                      {selectedAthlete.logroPrincipal}
                    </p>
                  </div>

                  {/* Biografía */}
                  {selectedAthlete.descripcion && (
                    <div className="mb-4">
                      <span className="block font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Trayectoria & Biografía
                      </span>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        {selectedAthlete.descripcion}
                      </p>
                    </div>
                  )}

                  {/* Telemetría Deportiva */}
                  {selectedAthlete.telemetria && selectedAthlete.telemetria.length > 0 && (
                    <div className="mb-4">
                      <span className="block font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Telemetría de Rendimiento
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedAthlete.telemetria.map((item, idx) => (
                          <div
                            key={idx}
                            className="bg-transparent p-0"
                          >
                            <span className="block font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                              {item.label}
                            </span>
                            <span className="text-xs font-bold text-slate-800 mt-0.5 block">
                              {item.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Legado */}
                  {selectedAthlete.legado && (
                    <div className="border-l-2 border-sky-500 pl-3 py-1 bg-transparent">
                      <p className="text-xs italic text-slate-500">
                        "{selectedAthlete.legado}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  {selectedAthlete.epoca && (
                    <span className="font-mono text-xs font-bold text-slate-500">
                      Época: {selectedAthlete.epoca}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedAthlete(null)}
                    className="font-mono text-xs font-bold text-sky-700 hover:text-sky-800 uppercase"
                  >
                    Cerrar Ficha
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ScrollMorphHero;
export { ScrollMorphHero as IntroAnimation };
