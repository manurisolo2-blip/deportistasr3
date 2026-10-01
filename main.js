/**
 * ==========================================================================
 * DÍA DEL DEPORTISTA – RÍO TERCERO (RÍO 3)
 * Archivo Principal de JavaScript | Scrollytelling, GSAP, ScrollTrigger & Lenis
 * ==========================================================================
 *
 * Desarrollado con arquitectura Front-End Senior optimizada a 60 FPS:
 * - Animación sincronizada con GPU (transform3d, opacity y stroke-dashoffset).
 * - Control de desplazamiento suave con Lenis y sincronización con GSAP Ticker.
 * - Soporte total para prefers-reduced-motion y vista responsiva (Mobile First).
 * - Totalmente comentado en español para la defensa institucional del proyecto.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. CARGA DE CONTENIDOS DINÁMICOS DESDE CONTENT.JS
  // ------------------------------------------------------------------------
  // Permite que la municipalidad o el equipo edite cifras y textos sin tocar el código.
  const content = window.SITE_CONTENT || {};
  if (content.institution) {
    const elTagline = document.getElementById('heroTagline');
    if (elTagline && content.institution.tagline) {
      elTagline.textContent = content.institution.tagline;
    }
  }

  // ------------------------------------------------------------------------
  // 2. DETECCIÓN DE PREFERENCIAS DE MOVIMIENTO (ACCESIBILIDAD)
  // ------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------------------
  // 3. INICIALIZACIÓN DE LENIS (SCROLL SUAVE MODERNO)
  // ------------------------------------------------------------------------
  let lenis = null;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponencial suave
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8
    });

    // Sincronizar el scroll de Lenis con GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Integrar Lenis al ciclo de render (Ticker) de GSAP para evitar desfasajes
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Desactivar el retardo de suavizado para máxima precisión de tracking
    gsap.ticker.lagSmoothing(0);
  }

  // Registrar plugins de GSAP
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  }

  // ------------------------------------------------------------------------
  // 4. CURSOR PERSONALIZADO (SOLO EN DISPOSITIVOS CON PUNTERO FINO)
  // ------------------------------------------------------------------------
  const customCursor = document.getElementById('customCursor');
  if (customCursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Bucle suave de interpolación lineal (Lerp) para el cursor
    gsap.ticker.add(() => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      gsap.set(customCursor, {
        x: cursorX,
        y: cursorY,
        overwrite: 'auto'
      });
    });

    // Efecto de crecimiento al pasar sobre elementos interactivos
    const interactives = document.querySelectorAll('a, button, .metric-card, .gallery-card, .event-card, .proposal-card, .pillar-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => customCursor.classList.add('cursor-grow'));
      el.addEventListener('mouseleave', () => customCursor.classList.remove('cursor-grow'));
    });
  }

  // ------------------------------------------------------------------------
  // 5. NAVEGACIÓN SUAVE Y ANCLAS
  // ------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-links a, .hero-actions a, .scroll-cue');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -60, duration: 1.4 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. BARRA DE PROGRESO DE LECTURA SUPERIOR
  // ------------------------------------------------------------------------
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressBar.style.width = `${self.progress * 100}%`;
      }
    });
  }

  // ------------------------------------------------------------------------
  // 7. NAVEGACIÓN FLOTANTE ACTIVA SEGÚN SECCIÓN VISIBLE
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-item');

  sections.forEach(sec => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () => setActiveNav(sec.id),
      onEnterBack: () => setActiveNav(sec.id)
    });
  });

  function setActiveNav(id) {
    navItems.forEach(item => {
      if (item.getAttribute('data-target') === id) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 8. CAMBIO DINÁMICO DE COLOR DE FONDO POR DISCIPLINA / SECCIÓN
  // ------------------------------------------------------------------------
  const themedSections = document.querySelectorAll('[data-theme]');
  const themeColors = {
    night: '#0B1B3A',
    electric: '#0E1F42',
    clay: '#142242',
    hardwood: '#1C1C36',
    ocean: '#0F2B5C',
    azure: '#08335E',
    terracotta: '#28173B',
    turq: '#0D2E35'
  };

  themedSections.forEach(elem => {
    const themeKey = elem.getAttribute('data-theme');
    const color = themeColors[themeKey];
    if (color) {
      ScrollTrigger.create({
        trigger: elem,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => { document.body.style.backgroundColor = color; },
        onEnterBack: () => { document.body.style.backgroundColor = color; }
      });
    }
  });

  // ------------------------------------------------------------------------
  // 9. ANIMACIONES DEL HERO (ENTRADA Y FLOTACIÓN DE LA PELOTA)
  // ------------------------------------------------------------------------
  const mainBallTraveler = document.getElementById('scrollyBallTraveler');
  const heroTitle = document.getElementById('heroTitle');
  const heroSubtitle = document.getElementById('heroSubtitle');
  const heroBadge = document.querySelector('.hero-badge');
  const heroActions = document.querySelector('.hero-actions');
  const scrollCue = document.getElementById('scrollCue');

  if (!prefersReducedMotion) {
    // Posición inicial de la pelota: Caída desde arriba rebotando hasta el título
    gsap.set(mainBallTraveler, {
      x: window.innerWidth * 0.72,
      y: -120,
      scale: 1.3,
      rotation: -180,
      opacity: 0
    });

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .to(mainBallTraveler, {
        y: window.innerHeight * 0.38,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        ease: 'bounce.out'
      })
      .from(heroBadge, {
        opacity: 0,
        y: -30,
        duration: 0.8
      }, '-=1.2')
      .from('.title-line-1', {
        opacity: 0,
        y: 40,
        duration: 0.8
      }, '-=0.8')
      .from('.title-line-2', {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 0.9,
        ease: 'back.out(1.7)'
      }, '-=0.6')
      .from('.title-line-3', {
        opacity: 0,
        y: 30,
        duration: 0.8
      }, '-=0.6')
      .from([heroSubtitle, heroActions, scrollCue], {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8
      }, '-=0.4');

    // Efecto sutil de flotación de la pelota en el Hero mientras está ociosa
    gsap.to(mainBallTraveler, {
      y: '+=20',
      rotation: '+=15',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // ------------------------------------------------------------------------
  // 10. SECCIÓN 2: QUÉ ES EL DÍA DEL DEPORTISTA (REVELACIÓN PALABRA POR PALABRA)
  // ------------------------------------------------------------------------
  const manifestoTextEl = document.getElementById('manifestoText');
  if (manifestoTextEl) {
    // Dividir el texto en palabras individuales envueltas en <span>
    const rawWords = manifestoTextEl.textContent.trim().split(/\s+/);
    manifestoTextEl.innerHTML = rawWords
      .map(word => `<span class="manifesto-word">${word}</span> `)
      .join('');

    const wordSpans = manifestoTextEl.querySelectorAll('.manifesto-word');

    if (!prefersReducedMotion) {
      gsap.fromTo(wordSpans,
        {
          opacity: 0.18,
          color: 'rgba(247, 247, 242, 0.2)'
        },
        {
          opacity: 1,
          color: '#F7F7F2',
          stagger: 0.04,
          scrollTrigger: {
            trigger: '#manifiesto',
            start: 'top 70%',
            end: 'center 40%',
            scrub: 1
          }
        }
      );
    } else {
      wordSpans.forEach(w => w.classList.add('is-revealed'));
    }
  }

  // ------------------------------------------------------------------------
  // 11. ORQUESTACIÓN DE LA PELOTA VIAJERA GLOBAL A TRAVÉS DE LAS SECCIONES
  // ------------------------------------------------------------------------
  if (!prefersReducedMotion && mainBallTraveler) {

    // Crear una línea de tiempo principal ligada al scroll (scrub)
    const masterBallTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#main-content',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2
      }
    });

    // Etapa 1: Del Hero a la sección Manifiesto (se desplaza hacia la izquierda rotando)
    masterBallTl.to(mainBallTraveler, {
      x: () => window.innerWidth * 0.18,
      y: () => window.innerHeight * 0.65,
      scale: 0.9,
      rotation: 360,
      ease: 'none'
    });

    // Etapa 2: A través de Deportes - Panel Fútbol
    masterBallTl.to(mainBallTraveler, {
      x: () => window.innerWidth * 0.75,
      y: () => window.innerHeight * 0.5,
      scale: 1.1,
      rotation: 720,
      ease: 'none'
    });

    // Etapa 3: Hacia la raqueta de Tenis (diagonal enérgica)
    masterBallTl.to(mainBallTraveler, {
      x: () => window.innerWidth * 0.65,
      y: () => window.innerHeight * 0.55,
      scale: 0.85,
      rotation: 1080,
      ease: 'none'
    });

    // Etapa 4: Hacia el aro de Básquet (cae en picada vertical)
    masterBallTl.to(mainBallTraveler, {
      x: () => window.innerWidth * 0.7,
      y: () => window.innerHeight * 0.45,
      scale: 1.05,
      rotation: 1440,
      ease: 'none'
    });

    // Etapa 5: Hacia la pista de Natación y Atletismo
    masterBallTl.to(mainBallTraveler, {
      x: () => window.innerWidth * 0.8,
      y: () => window.innerHeight * 0.6,
      scale: 0.9,
      rotation: 1800,
      ease: 'none'
    });

    // Etapa 6: Sección Métricas (se posiciona en el costado derecho)
    masterBallTl.to(mainBallTraveler, {
      x: () => window.innerWidth * 0.85,
      y: () => window.innerHeight * 0.7,
      scale: 0.95,
      rotation: 2160,
      ease: 'none'
    });

    // Etapa 7: Galería Horizontal (pasa al centro inferior)
    masterBallTl.to(mainBallTraveler, {
      x: () => window.innerWidth * 0.5,
      y: () => window.innerHeight * 0.85,
      scale: 0.75,
      rotation: 2520,
      ease: 'none'
    });

    // Etapa 8: Línea de Tiempo (acompaña el descenso por el eje central)
    masterBallTl.to(mainBallTraveler, {
      x: () => window.innerWidth * 0.22,
      y: () => window.innerHeight * 0.5,
      scale: 0.8,
      rotation: 2880,
      ease: 'none'
    });

    // Etapa 9: Agenda y Propuestas
    masterBallTl.to(mainBallTraveler, {
      x: () => window.innerWidth * 0.82,
      y: () => window.innerHeight * 0.4,
      scale: 0.9,
      rotation: 3240,
      ease: 'none'
    });

    // Etapa 10: Cierre - Converge hacia el emblema central
    masterBallTl.to(mainBallTraveler, {
      x: () => window.innerWidth * 0.5,
      y: () => window.innerHeight * 0.38,
      scale: 0.6,
      rotation: 3600,
      opacity: 0,
      ease: 'power2.in'
    });
  }

  // ------------------------------------------------------------------------
  // 12. ESCENARIOS SVG ESPECÍFICOS POR DEPORTE (SCRUBBED MICRO-ANIMATIONS)
  // ------------------------------------------------------------------------
  if (!prefersReducedMotion) {

    // 12.1 FÚTBOL: Arquero que se estira y texto ¡GOL!
    const keeperGroup = document.getElementById('keeperGroup');
    const svgGoalText = document.getElementById('svgGoalText');
    if (keeperGroup && svgGoalText) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-futbol',
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1
        }
      })
      .to(keeperGroup, {
        x: '-=70',
        y: '-=40',
        rotation: -25,
        transformOrigin: 'bottom center',
        duration: 1
      })
      .to(svgGoalText, {
        opacity: 1,
        scale: 1.2,
        transformOrigin: 'center center',
        duration: 0.6
      }, '-=0.3');
    }

    // 12.2 TENIS: Swing de la raqueta y disparo de la pelota de tenis
    const tennisRacket = document.getElementById('tennisRacket');
    const tennisBall = document.getElementById('tennisBall');
    const tennisTrail = document.getElementById('tennisTrail');
    if (tennisRacket && tennisBall && tennisTrail) {
      const tennisPathLen = tennisTrail.getTotalLength ? tennisTrail.getTotalLength() : 400;
      gsap.set(tennisTrail, { strokeDasharray: tennisPathLen, strokeDashoffset: tennisPathLen });

      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-tenis',
          start: 'top 65%',
          end: 'bottom 35%',
          scrub: 1
        }
      })
      .to(tennisRacket, {
        rotation: 40,
        x: '+=40',
        y: '-=20',
        duration: 1
      })
      .to(tennisBall, {
        x: '+=380',
        y: '-=40',
        scale: 1.4,
        duration: 1
      }, '-=0.8')
      .to(tennisTrail, {
        strokeDashoffset: 0,
        duration: 1
      }, '-=1');
    }

    // 12.3 BÁSQUET: Pelota entra en el aro y sacude la red
    const basketballItem = document.getElementById('basketballItem');
    const basketballNet = document.getElementById('basketballNet');
    if (basketballItem && basketballNet) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-basquet',
          start: 'top 65%',
          end: 'bottom 35%',
          scrub: 1
        }
      })
      .to(basketballItem, {
        x: 120, // entra directamente por el aro
        y: 110,
        duration: 1,
        ease: 'power2.in'
      })
      .to(basketballNet, {
        scaleY: 1.35,
        scaleX: 0.85,
        transformOrigin: 'top center',
        duration: 0.3
      }, '-=0.2')
      .to(basketballNet, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.3
      })
      .to(basketballItem, {
        y: 280,
        opacity: 0.2,
        duration: 0.5
      });
    }

    // 12.4 VÓLEY: Parábola de remate
    const voleyBall = document.getElementById('voleyBall');
    if (voleyBall) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-voley',
          start: 'top 65%',
          end: 'bottom 35%',
          scrub: 1
        }
      })
      .to(voleyBall, {
        x: '+=180',
        y: '+=200',
        scale: 1.3,
        rotation: 360,
        duration: 1
      });
    }

    // 12.5 NATACIÓN: Carriles que se dibujan y nadador que avanza
    const lane1 = document.getElementById('lane1');
    const lane2 = document.getElementById('lane2');
    const swimmerIcon = document.getElementById('swimmerIcon');
    if (lane1 && swimmerIcon) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-natacion',
          start: 'top 65%',
          end: 'bottom 35%',
          scrub: 1
        }
      })
      .fromTo([lane1, lane2], { strokeDashoffset: 500 }, { strokeDashoffset: 0, duration: 1 })
      .to(swimmerIcon, {
        x: '+=380',
        rotation: 6,
        duration: 1
      }, '-=1');
    }

    // 12.6 ATLETISMO: Pista de atletismo y silueta del corredor
    const trackLane1 = document.getElementById('trackLane1');
    const runnerFigure = document.getElementById('runnerFigure');
    if (trackLane1 && runnerFigure) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-atletismo',
          start: 'top 65%',
          end: 'bottom 35%',
          scrub: 1
        }
      })
      .fromTo(trackLane1, { strokeDasharray: 800, strokeDashoffset: 800 }, { strokeDashoffset: 0, duration: 1 })
      .to(runnerFigure, {
        x: '+=280',
        y: '-=120',
        scale: 1.25,
        duration: 1
      }, '-=1');
    }

    // 12.7 HOCKEY: Golpe del palo y bocha disparada
    const hockeyStick = document.getElementById('hockeyStick');
    const hockeyBall = document.getElementById('hockeyBall');
    if (hockeyStick && hockeyBall) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-hockey',
          start: 'top 65%',
          end: 'bottom 35%',
          scrub: 1
        }
      })
      .to(hockeyStick, {
        rotation: 45,
        duration: 0.6
      })
      .to(hockeyBall, {
        x: '+=180',
        duration: 0.6
      }, '-=0.4');
    }
  }

  // ------------------------------------------------------------------------
  // 13. SECCIÓN 4: CONTADORES NUMÉRICOS ANIMADOS
  // ------------------------------------------------------------------------
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'), 10) || 0;

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (!prefersReducedMotion) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              counter.textContent = Math.floor(obj.val).toLocaleString('es-AR');
            }
          });
        } else {
          counter.textContent = target.toLocaleString('es-AR');
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 14. SECCIÓN 5: GALERÍA HORIZONTAL CON SCROLLTRIGGER PIN
  // ------------------------------------------------------------------------
  const horizontalTrack = document.getElementById('horizontalTrack');
  const galleryWrapper = document.getElementById('galleryPinWrapper');

  if (horizontalTrack && galleryWrapper && !prefersReducedMotion) {
    // Calculamos el desplazamiento total requerido para mostrar todas las tarjetas
    const getScrollAmount = () => {
      const trackWidth = horizontalTrack.scrollWidth;
      return -(trackWidth - window.innerWidth + 120);
    };

    gsap.to(horizontalTrack, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: '#galeria',
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${horizontalTrack.scrollWidth - window.innerWidth + 400}`,
        invalidateOnRefresh: true
      }
    });
  }

  // ------------------------------------------------------------------------
  // 15. SECCIÓN 6: LÍNEA DE TIEMPO SVG DIBUJADA CON EL SCROLL
  // ------------------------------------------------------------------------
  const timelinePathDrawn = document.getElementById('timelinePathDrawn');
  const milestones = document.querySelectorAll('.milestone-item');

  if (timelinePathDrawn && !prefersReducedMotion) {
    const timelineLen = 1000;
    gsap.set(timelinePathDrawn, {
      strokeDasharray: timelineLen,
      strokeDashoffset: timelineLen
    });

    gsap.to(timelinePathDrawn, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#timelineContainer',
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 1
      }
    });

    milestones.forEach(item => {
      gsap.from(item, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 16. SECCIÓN 7 & 8: TARJETAS DE EVENTOS Y PROPUESTAS MUNICIPALES (STAGGER)
  // ------------------------------------------------------------------------
  const eventCards = document.querySelectorAll('.event-card');
  if (eventCards.length && !prefersReducedMotion) {
    gsap.from(eventCards, {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#eventsGrid',
        start: 'top 75%'
      }
    });
  }

  const proposalCards = document.querySelectorAll('.proposal-card');
  if (proposalCards.length && !prefersReducedMotion) {
    gsap.from(proposalCards, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.9,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '#proposalsGrid',
        start: 'top 75%'
      }
    });
  }

  // ------------------------------------------------------------------------
  // 17. SECCIÓN 9: CONVERGENCIA FINAL Y SELLO MUNICIPAL
  // ------------------------------------------------------------------------
  const finalEmblem = document.getElementById('finalEmblem');
  const convergeParticles = document.querySelectorAll('.converge-particle');

  if (finalEmblem && convergeParticles.length && !prefersReducedMotion) {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#cierre',
        start: 'top 60%',
        end: 'center 45%',
        scrub: 1
      }
    })
    .to(convergeParticles, {
      x: 0,
      y: 0,
      scale: 0.2,
      opacity: 0,
      stagger: 0.05,
      duration: 1
    })
    .to(finalEmblem, {
      scale: 1.1,
      opacity: 1,
      filter: 'drop-shadow(0 0 45px rgba(255, 212, 0, 0.7))',
      duration: 1
    }, '-=0.5')
    .to(finalEmblem, {
      scale: 1,
      duration: 0.4
    });
  }

  // Refrescar ScrollTrigger para asegurar que todas las alturas se computen correctamente
  ScrollTrigger.refresh();
});
