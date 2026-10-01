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

  // Desplazamiento automático si se carga con hash (ej: #deportes)
  if (window.location.hash) {
    const hashTarget = document.querySelector(window.location.hash);
    if (hashTarget) {
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(hashTarget, { offset: -70, immediate: true });
        } else {
          hashTarget.scrollIntoView();
        }
      }, 200);
    }
  }

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
  // 8. FÍSICA DE LA PELOTA VIAJERA CON TEXTURA REAL, SOMBRA Y SQUASH & STRETCH
  // ------------------------------------------------------------------------
  const physicsBall = document.getElementById('physicsBall');
  const ballVisual = document.getElementById('ballVisual');
  const ballShadow = document.getElementById('ballGroundShadow');

  if (!prefersReducedMotion && physicsBall && ballVisual && ballShadow) {
    
    // Posición inicial en el Hero
    gsap.set(physicsBall, {
      x: () => window.innerWidth > 900 ? window.innerWidth * 0.76 : window.innerWidth * 0.65,
      y: -160,
      opacity: 0
    });
    gsap.set(ballShadow, { scale: 0.2, opacity: 0.05 });

    // Caída inicial con gravedad real y squash & stretch en el primer impacto
    const heroDropTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    heroDropTl
      // 1. Aceleración por gravedad
      .to(physicsBall, {
        y: () => window.innerHeight * 0.45,
        opacity: 1,
        duration: 1.1,
        ease: 'bounce.out'
      })
      .to(ballShadow, {
        scale: 1,
        opacity: 0.75,
        duration: 1.1,
        ease: 'bounce.out'
      }, 0)
      // 2. Squash elástico al tocar el piso
      .to(ballVisual, {
        scaleX: 1.2,
        scaleY: 0.8,
        duration: 0.1,
        ease: 'power1.inOut'
      }, '-=0.25')
      .to(ballVisual, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.35,
        ease: 'elastic.out(1.2, 0.4)'
      });

    // Trayectoria continua de scrollytelling con rodadura física (scrub suave 0.8)
    const ballJourney = gsap.timeline({
      scrollTrigger: {
        trigger: '#main-content',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8
      }
    });

    // 1. Desplazamiento hacia Manifiesto (rueda con rotación angular física y leve compresión)
    ballJourney
      .to(physicsBall, {
        x: () => window.innerWidth * 0.15,
        y: () => window.innerHeight * 0.62,
        rotation: 540,
        ease: 'power1.inOut'
      })
      .to(ballShadow, { scale: 0.95, opacity: 0.65 }, '<')
      .to(ballVisual, { scaleX: 1.06, scaleY: 0.94, duration: 0.1, yoyo: true, repeat: 1 }, '-=0.15');

    // 2. Rebote y desplazamiento hacia Fútbol (acelera hacia la derecha en altura media)
    ballJourney
      .to(physicsBall, {
        x: () => window.innerWidth > 900 ? window.innerWidth * 0.72 : window.innerWidth * 0.55,
        y: () => window.innerHeight * 0.48,
        rotation: 1080,
        ease: 'power1.inOut'
      })
      .to(ballShadow, { scale: 1.05, opacity: 0.72 }, '<')
      .to(ballVisual, { scaleX: 1.08, scaleY: 0.92, duration: 0.1, yoyo: true, repeat: 1 }, '-=0.15');

    // 3. Tenis (diagonal descendente hacia el polvo de ladrillo)
    ballJourney
      .to(physicsBall, {
        x: () => window.innerWidth * 0.22,
        y: () => window.innerHeight * 0.58,
        rotation: 1620,
        ease: 'power1.inOut'
      })
      .to(ballShadow, { scale: 0.85, opacity: 0.6 }, '<');

    // 4. Básquet (elevación en arco y caída hacia el aro)
    ballJourney
      .to(physicsBall, {
        x: () => window.innerWidth > 900 ? window.innerWidth * 0.68 : window.innerWidth * 0.5,
        y: () => window.innerHeight * 0.38,
        rotation: 2160,
        ease: 'power2.out'
      })
      .to(ballShadow, { scale: 0.6, opacity: 0.35 }, '<')
      .to(physicsBall, {
        y: () => window.innerHeight * 0.52,
        rotation: 2400,
        ease: 'power2.in'
      })
      .to(ballShadow, { scale: 1, opacity: 0.7 }, '<');

    // 5. Atletismo (recta de aceleración potente)
    ballJourney
      .to(physicsBall, {
        x: () => window.innerWidth * 0.18,
        y: () => window.innerHeight * 0.64,
        rotation: 3000,
        ease: 'power1.inOut'
      })
      .to(ballShadow, { scale: 0.9, opacity: 0.65 }, '<');

    // 6. Cierre (absorción central hacia el emblema cívico)
    ballJourney
      .to(physicsBall, {
        x: () => window.innerWidth * 0.5,
        y: () => window.innerHeight * 0.45,
        rotation: 3600,
        scale: 0.35,
        opacity: 0,
        ease: 'power2.in'
      })
      .to(ballShadow, { scale: 0.1, opacity: 0 }, '<');
  }

  // ------------------------------------------------------------------------
  // 9. ESCENARIOS VECTORIALES CON FÍSICA CINEMÁTICA Y BIOMECÁNICA
  // ------------------------------------------------------------------------
  if (!prefersReducedMotion) {

    // 9.1 FÚTBOL: Comba de tiro con efecto Magnus, estirada del arquero y red reactiva
    const keeperFigure = document.getElementById('keeperFigure');
    const keeperAirShadow = document.getElementById('keeperAirShadow');
    const stageSoccerBall = document.getElementById('stageSoccerBall');
    const stageSoccerShadow = document.getElementById('stageSoccerShadow');
    const soccerShotCurveTrail = document.getElementById('soccerShotCurveTrail');
    const goalNetMesh = document.getElementById('goalNetMesh');
    const goalCallout = document.getElementById('goalCallout');

    if (keeperFigure && stageSoccerBall && goalCallout) {
      if (soccerShotCurveTrail) {
        const trailLen = soccerShotCurveTrail.getTotalLength ? soccerShotCurveTrail.getTotalLength() : 450;
        gsap.set(soccerShotCurveTrail, { strokeDasharray: trailLen, strokeDashoffset: trailLen });
      }

      const soccerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-futbol',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 0.8
        }
      });

      // 1. Fase de disparo: Pelota viaja con curva ascendente hacia el ángulo superior derecho
      soccerTl
        .to(stageSoccerBall, {
          x: 360,
          y: -165,
          rotation: 900,
          scale: 0.8,
          duration: 0.85,
          ease: 'power2.inOut'
        })
        .to(soccerShotCurveTrail, {
          strokeDashoffset: 0,
          duration: 0.85,
          ease: 'power2.inOut'
        }, 0);

      // Sombra en el césped se difumina y reduce al despegar
      if (stageSoccerShadow) {
        soccerTl.to(stageSoccerShadow, {
          scale: 0.15,
          opacity: 0,
          duration: 0.45,
          ease: 'power1.out'
        }, 0);
      }

      // 2. Arquero: anticipación y estirada horizontal en el aire hacia la pelota
      soccerTl.to(keeperFigure, {
        x: '+=85',
        y: '-=60',
        rotation: -32,
        transformOrigin: 'bottom center',
        duration: 0.85,
        ease: 'power2.out'
      }, 0);

      if (keeperAirShadow) {
        soccerTl.to(keeperAirShadow, {
          scale: 0.4,
          opacity: 0.15,
          duration: 0.85
        }, 0);
      }

      // 3. Impacto en la red del ángulo: deformación elástica de la malla y amortiguación
      soccerTl
        .to(goalNetMesh, {
          scaleX: 1.25,
          scaleY: 1.15,
          transformOrigin: 'top right',
          duration: 0.12,
          ease: 'power1.in'
        })
        .to(goalNetMesh, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.35,
          ease: 'elastic.out(1.4, 0.25)'
        })
        .to(stageSoccerBall, {
          x: '+=10',
          y: '+=8',
          rotation: '+=45',
          duration: 0.18,
          ease: 'power1.out'
        }, '<');

      // 4. Aparición del callout editorial
      soccerTl.to(goalCallout, {
        opacity: 1,
        scale: 1.1,
        transformOrigin: 'center center',
        duration: 0.35,
        ease: 'back.out(2)'
      }, '-=0.15');
    }

    // 9.2 TENIS: Swing en cadena cinética, parábola, impacto en polvo y kick de salida
    const racketGroup = document.getElementById('racketGroup');
    const tennisBallVisual = document.getElementById('tennisBallVisual');
    const tennisArcPath = document.getElementById('tennisArcPath');
    const tennisSpeedTrail = document.getElementById('tennisSpeedTrail');
    const clayDustGroup = document.getElementById('clayDustGroup');
    const tennisCallout = document.getElementById('tennisCallout');

    if (racketGroup && tennisBallVisual) {
      if (tennisArcPath) {
        const arcLen = tennisArcPath.getTotalLength ? tennisArcPath.getTotalLength() : 480;
        gsap.set(tennisArcPath, { strokeDasharray: arcLen, strokeDashoffset: arcLen });
      }

      const tennisTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-tenis',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 0.8
        }
      });

      tennisTl
        // 1. Armado hacia atrás (backswing)
        .to(racketGroup, {
          rotation: -75,
          x: '-=30',
          y: '+=15',
          transformOrigin: '80% 90%',
          duration: 0.3,
          ease: 'power1.inOut'
        })
        // 2. Aceleración explosiva hacia la pelota
        .to(racketGroup, {
          rotation: 35,
          x: '+=70',
          y: '-=22',
          transformOrigin: '80% 90%',
          duration: 0.45,
          ease: 'power3.out'
        })
        // 3. Momento del impacto en cuerdas: squash breve y salida veloz
        .to(tennisBallVisual, {
          scaleX: 1.25,
          scaleY: 0.78,
          duration: 0.06
        }, '-=0.35')
        .to(tennisBallVisual, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.1
        })
        // 4. Trayectoria de topspin sobre la red hacia el fleje de arcilla
        .to(tennisBallVisual, {
          x: '+=210',
          y: '+=70',
          rotation: 680,
          duration: 0.55,
          ease: 'power2.in'
        }, '<')
        .to(tennisArcPath, {
          strokeDashoffset: 160,
          duration: 0.55
        }, '<');

      if (tennisSpeedTrail) {
        tennisTl.to(tennisSpeedTrail, {
          opacity: 0.8,
          duration: 0.15
        }, '-=0.5').to(tennisSpeedTrail, {
          opacity: 0,
          duration: 0.35
        });
      }

      // 5. Pique en el polvo de ladrillo: deformación por contacto y estallido de polvo
      tennisTl
        .to(tennisBallVisual, {
          scaleX: 1.35,
          scaleY: 0.68,
          duration: 0.08,
          ease: 'power1.inOut'
        })
        .to(clayDustGroup, {
          opacity: 1,
          scale: 1.8,
          duration: 0.15
        }, '<')
        .to(tennisBallVisual, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.1
        })
        // 6. Rebote vivo (kick de topspin profundo hacia el fondo)
        .to(tennisBallVisual, {
          x: '+=130',
          y: '-=45',
          rotation: 1080,
          scale: 1.12,
          duration: 0.45,
          ease: 'power1.out'
        })
        .to(tennisArcPath, {
          strokeDashoffset: 0,
          duration: 0.45
        }, '<')
        .to(clayDustGroup, {
          opacity: 0,
          scale: 2.6,
          duration: 0.35
        }, '-=0.3');

      // 7. Callout de punto
      if (tennisCallout) {
        tennisTl.to(tennisCallout, {
          opacity: 1,
          scale: 1.08,
          duration: 0.3,
          ease: 'back.out(2)'
        }, '-=0.2');
      }
    }

    // 9.3 BÁSQUET: Tiro parabólico con rotación inversa (backspin), impacto y sacudida de red
    const basketBallItem = document.getElementById('basketBallItem');
    const basketRimLine = document.getElementById('basketRimLine');
    const basketNetGroup = document.getElementById('basketNetGroup');
    const basketCallout = document.getElementById('basketCallout');

    if (basketBallItem && basketNetGroup) {
      const basketTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-basquet',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 0.8
        }
      });

      basketTl
        // 1. Fase ascendente de la parábola con backspin continuo
        .to(basketBallItem, {
          x: 120,
          y: -25,
          rotation: -320,
          duration: 0.5,
          ease: 'power2.out'
        })
        // 2. Caída por gravedad hacia el aro
        .to(basketBallItem, {
          x: 185,
          y: 65,
          rotation: -540,
          duration: 0.42,
          ease: 'power2.in'
        })
        // 3. Roce con el aro metálico: vibración instantánea del metal
        .to(basketRimLine, {
          y: 4,
          duration: 0.06,
          yoyo: true,
          repeat: 3
        }, '-=0.08')
        // 4. Paso limpio a través de la red (swish)
        .to(basketBallItem, {
          x: 190,
          y: 115,
          rotation: -640,
          duration: 0.22,
          ease: 'power1.in'
        })
        // 5. Deformación ondulada y retracción de la malla de algodón
        .to(basketNetGroup, {
          scaleY: 1.48,
          scaleX: 0.78,
          transformOrigin: 'top center',
          duration: 0.16
        }, '-=0.15')
        .to(basketNetGroup, {
          scaleY: 0.88,
          scaleX: 1.15,
          duration: 0.16
        })
        .to(basketNetGroup, {
          scaleY: 1,
          scaleX: 1,
          duration: 0.38,
          ease: 'elastic.out(1.2, 0.35)'
        })
        // 6. Caída hacia el parquet y pequeño rebote
        .to(basketBallItem, {
          y: 215,
          rotation: -780,
          duration: 0.38,
          ease: 'power2.in'
        }, '-=0.25')
        .to(basketBallItem, {
          y: 190,
          duration: 0.18,
          ease: 'power1.out'
        })
        .to(basketBallItem, {
          y: 215,
          opacity: 0.35,
          duration: 0.15,
          ease: 'power1.in'
        });

      if (basketCallout) {
        basketTl.to(basketCallout, {
          opacity: 1,
          scale: 1.1,
          duration: 0.3,
          ease: 'back.out(2)'
        }, '-=0.4');
      }
    }

    // 9.4 ATLETISMO: Trazado de pista, zancada biomecánica y cruce de meta
    const trackLinePath = document.getElementById('trackLinePath');
    const trackRunner = document.getElementById('trackRunner');
    const runnerShadow = document.getElementById('runnerShadow');
    const runnerCallout = document.getElementById('runnerCallout');

    if (trackLinePath && trackRunner) {
      const pathLen = trackLinePath.getTotalLength ? trackLinePath.getTotalLength() : 620;
      gsap.set(trackLinePath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });

      const runnerTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-atletismo',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 0.8
        }
      });

      runnerTl
        // 1. Dibujo de la línea de andarivel en pista
        .to(trackLinePath, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'none'
        })
        // 2. Aceleración del fondista a lo largo de la curva
        .to(trackRunner, {
          x: '+=250',
          y: '-=130',
          scale: 1.25,
          rotation: -10,
          duration: 1,
          ease: 'power1.inOut'
        }, 0);

      if (runnerShadow) {
        runnerTl.to(runnerShadow, {
          scaleX: 1.2,
          scaleY: 0.85,
          duration: 1
        }, 0);
      }

      if (runnerCallout) {
        runnerTl.to(runnerCallout, {
          opacity: 1,
          scale: 1.08,
          duration: 0.35,
          ease: 'back.out(2)'
        }, '-=0.3');
      }
    }

    // 9.5 NATACIÓN: Carriles, ondulación de agua, rolido de crol y brazada
    const swimLaneA = document.getElementById('swimLaneA');
    const swimLaneB = document.getElementById('swimLaneB');
    const swimLaneC = document.getElementById('swimLaneC');
    const waterWave1 = document.getElementById('waterWave1');
    const waterWave2 = document.getElementById('waterWave2');
    const swimmerGlyph = document.getElementById('swimmerGlyph');
    const swimmerWake = document.getElementById('swimmerWake');
    const swimmerArmRecovery = document.getElementById('swimmerArmRecovery');
    const swimCallout = document.getElementById('swimCallout');

    if (swimmerGlyph) {
      const swimTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#sport-natacion',
          start: 'top 65%',
          end: 'bottom 40%',
          scrub: 0.8
        }
      });

      // 1. Desplazamiento del nadador a lo largo de la piscina
      swimTl.to(swimmerGlyph, {
        x: '+=260',
        duration: 1,
        ease: 'none'
      });

      // 2. Rolido biomecánico del cuerpo durante el crol
      swimTl.to(swimmerGlyph, {
        rotation: 6,
        yoyo: true,
        repeat: 3,
        duration: 0.25,
        ease: 'sine.inOut'
      }, 0);

      // 3. Estela de espuma expandiéndose detrás
      if (swimmerWake) {
        swimTl.to(swimmerWake, {
          scaleX: 1.35,
          opacity: 0.65,
          duration: 0.5,
          yoyo: true,
          repeat: 1
        }, 0);
      }

      // 4. Movimiento del brazo en fase de recobro aéreo
      if (swimmerArmRecovery) {
        swimTl.to(swimmerArmRecovery, {
          rotation: 25,
          transformOrigin: 'right center',
          yoyo: true,
          repeat: 3,
          duration: 0.25
        }, 0);
      }

      // 5. Ondulación de las líneas de agua y boyas
      if (waterWave1 && waterWave2) {
        swimTl.to(waterWave1, { x: 30, duration: 1, ease: 'sine.inOut' }, 0);
        swimTl.to(waterWave2, { x: -25, duration: 1, ease: 'sine.inOut' }, 0);
      }

      if (swimCallout) {
        swimTl.to(swimCallout, {
          opacity: 1,
          scale: 1.08,
          duration: 0.35,
          ease: 'back.out(2)'
        }, '-=0.25');
      }
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
