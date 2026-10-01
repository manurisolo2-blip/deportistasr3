/**
 * ==========================================================================
 * DÍA DEL DEPORTISTA · RÍO TERCERO (RÍO 3)
 * Controlador Front-End · Física de Scroll, GSAP, Lenis y Scrollytelling
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. VERIFICACIÓN DE PREFERENCIAS DE MOVIMIENTO (ACCESIBILIDAD)
  // ------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------------------
  // 2. INICIALIZACIÓN DE LENIS (SCROLL SUAVE E INERCIAL)
  // ------------------------------------------------------------------------
  let lenis = null;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // Registrar plugins de GSAP
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  }

  // ------------------------------------------------------------------------
  // 3. MENÚ DE NAVEGACIÓN MÓVIL
  // ------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('is-open');
    });

    // Cerrar al hacer clic en un enlace de navegación
    const navAnchors = mainNav.querySelectorAll('.nav-anchor');
    navAnchors.forEach(a => {
      a.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 4. CURSOR FINO CON INTERPOLACIÓN SUAVE (LERP)
  // ------------------------------------------------------------------------
  const fineCursor = document.getElementById('fineCursor');
  if (fineCursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currX = mouseX;
    let currY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
      currX += (mouseX - currX) * 0.22;
      currY += (mouseY - currY) * 0.22;
      gsap.set(fineCursor, {
        x: currX,
        y: currY,
        overwrite: 'auto'
      });
    });

    const clickables = document.querySelectorAll('a, button, .score-card, .club-sheet, .dossier-card');
    clickables.forEach(elem => {
      elem.addEventListener('mouseenter', () => fineCursor.classList.add('cursor-grow'));
      elem.addEventListener('mouseleave', () => fineCursor.classList.remove('cursor-grow'));
    });
  }

  // ------------------------------------------------------------------------
  // 5. NAVEGACIÓN SUAVE ENTRE ANCLAS
  // ------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 6. BARRA DE PROGRESO DE LECTURA Y ESTADO ACTIVO
  // ------------------------------------------------------------------------
  const progressLine = document.getElementById('scrollProgressLine');
  if (progressLine) {
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressLine.style.width = `${self.progress * 100}%`;
      }
    });
  }

  const monitoredSections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-anchor');

  monitoredSections.forEach(sec => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 45%',
      end: 'bottom 45%',
      onEnter: () => setNavActive(sec.id),
      onEnterBack: () => setNavActive(sec.id)
    });
  });

  function setNavActive(id) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 7. MANIFIESTO: REVELACIÓN PROGRESIVA DE PALABRAS
  // ------------------------------------------------------------------------
  const manifestoContainer = document.getElementById('manifestoWords');
  if (manifestoContainer) {
    const rawWords = manifestoContainer.textContent.trim().split(/\s+/);
    manifestoContainer.innerHTML = rawWords
      .map(w => `<span class="manifesto-word-unit">${w}</span> `)
      .join('');

    const wordUnits = manifestoContainer.querySelectorAll('.manifesto-word-unit');

    if (!prefersReducedMotion) {
      gsap.fromTo(wordUnits,
        { opacity: 0.25 },
        {
          opacity: 1,
          stagger: 0.03,
          scrollTrigger: {
            trigger: '#manifiesto',
            start: 'top 75%',
            end: 'center 45%',
            scrub: 0.8
          }
        }
      );
    }
  }

  // ------------------------------------------------------------------------
  // 8. FÍSICA DE LA PELOTA VIAJERA CON SOMBRA PROYECTADA Y SQUASH & STRETCH
  // ------------------------------------------------------------------------
  const physicsBall = document.getElementById('physicsBall');
  const ballVisual = document.getElementById('ballVisual');
  const ballShadow = document.getElementById('ballGroundShadow');

  if (!prefersReducedMotion && physicsBall && ballVisual && ballShadow) {
    
    // Posición inicial en el Hero
    gsap.set(physicsBall, {
      x: () => window.innerWidth > 900 ? window.innerWidth * 0.76 : window.innerWidth * 0.65,
      y: -140,
      opacity: 0
    });
    gsap.set(ballShadow, { scale: 0.3, opacity: 0.1 });

    // Rebote inicial con squash & stretch realista al cargar el Hero
    const heroBounceTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    heroBounceTl
      .to(physicsBall, {
        y: () => window.innerHeight * 0.45,
        opacity: 1,
        duration: 1.2,
        ease: 'bounce.out'
      })
      .to(ballShadow, {
        scale: 1,
        opacity: 0.7,
        duration: 1.2,
        ease: 'bounce.out'
      }, 0)
      // Squash sutil al impactar el "piso" del título
      .to(ballVisual, {
        scaleX: 1.15,
        scaleY: 0.85,
        duration: 0.12,
        ease: 'power1.inOut'
      }, '-=0.25')
      .to(ballVisual, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.25,
        ease: 'elastic.out(1.2, 0.4)'
      });

    // Trayectoria continua ligada al avance del scroll (Scrub suave 0.8)
    const ballJourney = gsap.timeline({
      scrollTrigger: {
        trigger: '#main-content',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8
      }
    });

    // 1. Manifiesto
    ballJourney.to(physicsBall, {
      x: () => window.innerWidth * 0.15,
      y: () => window.innerHeight * 0.6,
      rotation: 360,
      ease: 'none'
    });
    ballJourney.to(ballShadow, { scale: 0.85, opacity: 0.55 }, '<');

    // 2. Fútbol
    ballJourney.to(physicsBall, {
      x: () => window.innerWidth > 900 ? window.innerWidth * 0.72 : window.innerWidth * 0.55,
      y: () => window.innerHeight * 0.48,
      rotation: 720,
      ease: 'none'
    });

    // 3. Tenis
    ballJourney.to(physicsBall, {
      x: () => window.innerWidth * 0.25,
      y: () => window.innerHeight * 0.55,
      rotation: 1080,
      ease: 'none'
    });

    // 4. Básquet
    ballJourney.to(physicsBall, {
      x: () => window.innerWidth > 900 ? window.innerWidth * 0.7 : window.innerWidth * 0.5,
      y: () => window.innerHeight * 0.42,
      rotation: 1440,
      ease: 'none'
    });

    // 5. Atletismo
    ballJourney.to(physicsBall, {
      x: () => window.innerWidth * 0.2,
      y: () => window.innerHeight * 0.62,
      rotation: 1800,
      ease: 'none'
    });

    // 6. Cierre
    ballJourney.to(physicsBall, {
      x: () => window.innerWidth * 0.5,
      y: () => window.innerHeight * 0.45,
      rotation: 2160,
      scale: 0.5,
      opacity: 0,
      ease: 'power2.in'
    });
  }

  // ------------------------------------------------------------------------
  // 9. ESCENARIOS VECTORIALES POR DISCIPLINA (FÍSICA ESPECÍFICA)
  // ------------------------------------------------------------------------
  if (!prefersReducedMotion) {

    // 9.1 FÚTBOL: Estirada del arquero y gol
    const keeperFigure = document.getElementById('keeperFigure');
    const goalCallout = document.getElementById('goalCallout');
    if (keeperFigure && goalCallout) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-futbol',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 0.8
        }
      })
      .to(keeperFigure, {
        x: '-=60',
        y: '-=30',
        rotation: -20,
        transformOrigin: 'bottom center',
        duration: 1
      })
      .to(goalCallout, {
        opacity: 1,
        scale: 1.15,
        transformOrigin: 'center center',
        duration: 0.5
      }, '-=0.3');
    }

    // 9.2 TENIS: Swing en tres tiempos (preparación, golpe seco, seguimiento)
    const racketGroup = document.getElementById('racketGroup');
    const tennisBallVisual = document.getElementById('tennisBallVisual');
    const tennisArc = document.getElementById('tennisArcPath');
    if (racketGroup && tennisBallVisual && tennisArc) {
      const arcLen = tennisArc.getTotalLength ? tennisArc.getTotalLength() : 380;
      gsap.set(tennisArc, { strokeDasharray: arcLen, strokeDashoffset: arcLen });

      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-tenis',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 0.8
        }
      })
      // 1. Preparación hacia atrás
      .to(racketGroup, {
        rotation: -50,
        x: '-=15',
        duration: 0.4
      })
      // 2. Impacto acelerado hacia adelante y follow-through
      .to(racketGroup, {
        rotation: 35,
        x: '+=45',
        y: '-=10',
        duration: 0.7,
        ease: 'power3.out'
      })
      // 3. Disparo de la pelota con curva parabólica y pique
      .to(tennisBallVisual, {
        x: '+=320',
        y: '+=30',
        scale: 1.25,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.6')
      .to(tennisArc, {
        strokeDashoffset: 0,
        duration: 1
      }, '-=1');
    }

    // 9.3 BÁSQUET: Tiro parabólico, impacto en aro y sacudida de red
    const basketBallItem = document.getElementById('basketBallItem');
    const basketNetGroup = document.getElementById('basketNetGroup');
    if (basketBallItem && basketNetGroup) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-basquet',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 0.8
        }
      })
      .to(basketBallItem, {
        x: 185,
        y: 65,
        duration: 0.8,
        ease: 'power1.out'
      })
      // Descenso a través de la red
      .to(basketBallItem, {
        x: 190,
        y: 110,
        duration: 0.3,
        ease: 'power2.in'
      })
      // Deformación física de la red
      .to(basketNetGroup, {
        scaleY: 1.3,
        scaleX: 0.88,
        transformOrigin: 'top center',
        duration: 0.25
      }, '-=0.15')
      .to(basketNetGroup, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.35,
        ease: 'elastic.out(1, 0.4)'
      })
      .to(basketBallItem, {
        y: 220,
        opacity: 0.3,
        duration: 0.5
      });
    }

    // 9.4 ATLETISMO: Trazado de pista y zancada
    const trackLine = document.getElementById('trackLinePath');
    const trackRunner = document.getElementById('trackRunner');
    if (trackLine && trackRunner) {
      gsap.set(trackLine, { strokeDasharray: 600, strokeDashoffset: 600 });

      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-atletismo',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 0.8
        }
      })
      .to(trackLine, {
        strokeDashoffset: 0,
        duration: 1
      })
      .to(trackRunner, {
        x: '+=250',
        y: '-=90',
        scale: 1.2,
        duration: 1
      }, '<');
    }

    // 9.5 NATACIÓN: Carriles y avance
    const swimLaneA = document.getElementById('swimLaneA');
    const swimmerGlyph = document.getElementById('swimmerGlyph');
    if (swimLaneA && swimmerGlyph) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-natacion',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 0.8
        }
      })
      .to(swimmerGlyph, {
        x: '+=300',
        rotation: 4,
        duration: 1
      });
    }
  }

  // ------------------------------------------------------------------------
  // 10. MARCADOR DE NÚMEROS: ANIMACIÓN CONDICIONAL (SIN ARRANQUE EN CERO)
  // ------------------------------------------------------------------------
  const scoreNumbers = document.querySelectorAll('.score-num');
  scoreNumbers.forEach(elem => {
    const finalValue = parseInt(elem.getAttribute('data-target'), 10);
    if (!isNaN(finalValue) && !prefersReducedMotion) {
      ScrollTrigger.create({
        trigger: elem,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: finalValue,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              elem.textContent = Math.floor(counterObj.val).toLocaleString('es-AR');
            }
          });
        }
      });
    }
  });

  // ------------------------------------------------------------------------
  // 11. CLUBES: SCROLL HORIZONTAL CONDICIONAL (SOLO EN ESCRITORIO/TABLET)
  // ------------------------------------------------------------------------
  const clubsTrack = document.getElementById('clubsTrack');
  const clubsWrapper = document.getElementById('clubsTrackWrapper');

  if (clubsTrack && clubsWrapper && window.innerWidth > 768 && !prefersReducedMotion) {
    const getTravelDistance = () => -(clubsTrack.scrollWidth - window.innerWidth + 80);

    gsap.to(clubsTrack, {
      x: getTravelDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: '#clubes',
        pin: true,
        scrub: 0.8,
        start: 'top top',
        end: () => `+=${clubsTrack.scrollWidth - window.innerWidth + 300}`,
        invalidateOnRefresh: true
      }
    });
  }

  // ------------------------------------------------------------------------
  // 12. LÍNEA DE TIEMPO: TRAZADO VERTICAL CON SCROLL
  // ------------------------------------------------------------------------
  const timelineStroke = document.getElementById('timelineDrawnStroke');
  if (timelineStroke && !prefersReducedMotion) {
    gsap.set(timelineStroke, { strokeDasharray: 800, strokeDashoffset: 800 });

    gsap.to(timelineStroke, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#timelineChronicle',
        start: 'top 75%',
        end: 'bottom 55%',
        scrub: 0.8
      }
    });
  }

  // Refrescar cálculo de coordenadas
  ScrollTrigger.refresh();
});
