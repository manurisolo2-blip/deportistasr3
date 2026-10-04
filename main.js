/**
 * ==========================================================================
 * RÍO TERCERO · CAPITAL NACIONAL DEL DEPORTISTA (LEY NACIONAL N.º 27.378)
 * Controlador Front-End · Modo Claro Editorial, Trading Cards & Telemetría
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. PREFERENCIAS DE MOVIMIENTO (ACCESIBILIDAD)
  // ------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------------------
  // 2. SCROLL SUAVE (LENIS)
  // ------------------------------------------------------------------------
  let lenis = null;
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5
    });

    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // Registrar plugins de GSAP
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ------------------------------------------------------------------------
  // 3. BARRA DE PROGRESO DE LECTURA & HEADER SCROLL
  // ------------------------------------------------------------------------
  const progressLine = document.getElementById('scrollProgressLine');
  const siteHeader = document.getElementById('siteHeader');
  const heroSection = document.getElementById('inicio');

  function updateHeaderAndScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (progressLine && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressLine.style.width = `${scrollPercent}%`;
    }

    if (siteHeader) {
      const contenido = document.getElementById('contenido') || document.getElementById('explorador');
      let inHero = true;

      if (contenido) {
        const rect = contenido.getBoundingClientRect();
        // El header está en el hero mientras el telón de contenido no alcance la cabecera
        inHero = rect.top > (siteHeader.offsetHeight || 65);
      } else {
        const hero = heroSection || document.getElementById('inicio');
        const heroHeight = hero ? hero.offsetHeight : window.innerHeight;
        inHero = scrollTop < heroHeight;
      }

      if (!inHero) {
        siteHeader.classList.add('scrolled');
        siteHeader.classList.remove('in-hero');
      } else {
        siteHeader.classList.remove('scrolled');
        siteHeader.classList.add('in-hero');
      }
    }
  }

  window.addEventListener('scroll', updateHeaderAndScroll, { passive: true });
  window.addEventListener('resize', updateHeaderAndScroll, { passive: true });
  if (lenis) {
    lenis.on('scroll', updateHeaderAndScroll);
  }
  updateHeaderAndScroll();

  // ------------------------------------------------------------------------
  // 4. NAVEGACIÓN SUAVE ENTRE ANCLAS & ESTADO ACTIVO
  // ------------------------------------------------------------------------
  const navAnchors = document.querySelectorAll('.nav-anchor');
  const monitoredSections = document.querySelectorAll('section[id], footer[id]');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNav');

  // Control del Menú Móvil Desplegable
  function closeMobileNav() {
    if (mainNav && mainNav.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      if (mobileNavToggle) {
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileNavToggle.setAttribute('aria-label', 'Abrir menú');
      }
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
  }

  function toggleMobileNav() {
    if (!mainNav || !mobileNavToggle) return;
    const isOpen = mainNav.classList.contains('is-open');
    if (isOpen) {
      closeMobileNav();
    } else {
      mainNav.classList.add('is-open');
      mobileNavToggle.setAttribute('aria-expanded', 'true');
      mobileNavToggle.setAttribute('aria-label', 'Cerrar menú');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    }
  }

  if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileNav();
    });

    // Cerrar al pulsar Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        closeMobileNav();
      }
    });

    // Cerrar si redimensiona la pantalla a escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && mainNav.classList.contains('is-open')) {
        closeMobileNav();
      }
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('is-open') && !mainNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        closeMobileNav();
      }
    });
  }

  // Desplazamiento suave al hacer clic en enlaces de ancla
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          closeMobileNav();
          const headerOffset = window.innerWidth <= 768 ? -58 : -70;
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: headerOffset, duration: 1.0 });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });

  // Resaltado de sección activa en menú
  if (typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    monitoredSections.forEach(sec => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 45%',
        end: 'bottom 45%',
        onEnter: () => setActiveNav(sec.id),
        onEnterBack: () => setActiveNav(sec.id)
      });
    });
  }

  function setActiveNav(id) {
    navAnchors.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 5. MOTOR DE FILTRADO Y BÚSQUEDA INTERACTIVA (TRADING CARDS)
  // ------------------------------------------------------------------------
  const searchInput = document.getElementById('athleteSearchInput');
  const chipsContainer = document.getElementById('disciplineChipsContainer');
  const filterChips = document.querySelectorAll('.filter-chip-btn');
  const cardsGrid = document.getElementById('tradingCardsGrid');
  const liveCounter = document.getElementById('directoryLiveCounter');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  let disciplinaActiva = 'TODOS';
  let busqueda = '';

  function normalize(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function renderCards() {
    if (!cardsGrid || !window.DEPORTISTAS_DATA) return;

    const queryNorm = normalize(busqueda);

    const filtrados = window.DEPORTISTAS_DATA.filter(dep => {
      const depDiscNorm = normalize(dep.disciplina);
      const activeDiscNorm = normalize(disciplinaActiva);

      const coincideDisciplina =
        disciplinaActiva === 'TODOS' ||
        depDiscNorm === activeDiscNorm ||
        (disciplinaActiva === 'TIRO' && depDiscNorm.includes('tiro')) ||
        (disciplinaActiva === 'ATLETISMO' && (depDiscNorm.includes('atletismo') || depDiscNorm.includes('triatlon')));

      const coincideTexto =
        queryNorm === '' ||
        normalize(dep.nombre).includes(queryNorm) ||
        normalize(dep.clubOrigen).includes(queryNorm) ||
        normalize(dep.logroPrincipal).includes(queryNorm) ||
        normalize(dep.disciplina).includes(queryNorm) ||
        normalize(dep.categoria).includes(queryNorm);

      return coincideDisciplina && coincideTexto;
    });

    if (liveCounter) {
      liveCounter.textContent = `MOSTRANDO ${filtrados.length} DE ${window.DEPORTISTAS_DATA.length} ATLETAS OFICIALES`;
    }

    if (filtrados.length === 0) {
      cardsGrid.innerHTML = `
        <div style="grid-column: 1 / -1;" class="text-center py-20 border border-dashed border-slate-300 rounded-lg bg-white p-8">
          <p class="font-mono text-sm uppercase text-slate-600 font-bold mb-4">
            No se encontraron registros para el filtro seleccionado.
          </p>
          <button class="empty-state-reset-btn" id="inlineResetBtn">Restablecer Filtros y Búsqueda</button>
        </div>
      `;
      const btn = document.getElementById('inlineResetBtn');
      if (btn) btn.addEventListener('click', resetFilters);
      return;
    }

    cardsGrid.innerHTML = filtrados.map(atleta => `
      <article
        class="group relative bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl trading-card"
        data-discipline="${atleta.disciplina.toUpperCase()}"
      >
        <!-- Contenedor Fotográfico con proporción cuadrada 1:1 de alto impacto -->
        <div class="relative aspect-square w-full overflow-hidden bg-slate-100 border-b border-slate-200 card-photo-frame">
          <img
            src="${atleta.imagenUrl}"
            alt="${atleta.nombre}"
            class="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 card-athlete-photo"
            loading="lazy"
          />
          <!-- Badge de Disciplina Deportiva -->
          <div class="absolute top-2.5 left-2.5 z-10 card-badges-wrap">
            <span class="bg-slate-900/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider card-badge-discipline shadow-sm">
              ${atleta.disciplina}
            </span>
          </div>
          ${atleta.dorsal ? `
            <span class="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">
              #${atleta.dorsal}
            </span>
          ` : ''}
        </div>

        <!-- Datos Editoriales Limpios y Equilibrados -->
        <div class="p-5 flex-1 flex flex-col justify-between relative z-10 card-content-body">
          <div>
            <!-- Club Formador -->
            <div class="card-club-formador-box flex items-center gap-1.5 text-xs font-mono font-bold text-sky-700 mb-1">
              <span class="text-slate-400 font-semibold">ORIGEN:</span>
              <span class="text-slate-800 uppercase tracking-tight">${atleta.clubOrigen}</span>
            </div>

            <!-- Nombre del Atleta -->
            <h3 class="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-black uppercase tracking-tight text-slate-950 transition-colors card-name-title group-hover:text-sky-600">
              ${atleta.nombre}
            </h3>

            <!-- Especialidad / Puesto -->
            ${atleta.especialidad ? `
              <div class="card-athlete-specialty font-mono text-xs font-bold text-sky-700 mt-0.5 mb-2.5">
                ${atleta.especialidad}
              </div>
            ` : ''}

            <!-- Biografía Deportiva Concisa -->
            <p class="card-athlete-bio text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              ${atleta.descripcion || ''}
            </p>
          </div>

          <!-- Fila Inferior: Consagración y Época -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-left card-telemetry-row">
            <div class="telemetry-info">
              <span class="block font-mono text-[9px] uppercase tracking-wider text-slate-600 font-bold telemetry-label">
                Consagración Cumbre
              </span>
              <span class="font-sans text-xs font-bold text-slate-900 telemetry-val">
                ${atleta.logroPrincipal}
              </span>
            </div>
            <div class="flex items-center gap-2">
              ${atleta.epoca ? `
                <span class="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  ${atleta.epoca}
                </span>
              ` : ''}
              <span class="font-mono text-sm font-bold text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all telemetry-arrow" aria-hidden="true">
                →
              </span>
            </div>
          </div>
        </div>
      </article>
    `).join('');

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }

  function updateChipButtons() {
    const chips = document.querySelectorAll('.filter-chip-btn');
    chips.forEach(chip => {
      const chipFilter = chip.getAttribute('data-filter') || 'TODOS';
      if (chipFilter.toUpperCase() === disciplinaActiva.toUpperCase()) {
        chip.classList.add('active');
        chip.setAttribute('aria-selected', 'true');
      } else {
        chip.classList.remove('active');
        chip.setAttribute('aria-selected', 'false');
      }
    });
  }

  function resetFilters() {
    disciplinaActiva = 'TODOS';
    busqueda = '';
    if (searchInput) searchInput.value = '';
    updateChipButtons();
    renderCards();
    if (searchInput) searchInput.focus();
  }

  // Escuchar clics en los chips de disciplina
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      disciplinaActiva = chip.getAttribute('data-filter') || 'TODOS';
      updateChipButtons();
      renderCards();
    });
  });

  // Escuchar entrada en el campo de búsqueda
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      busqueda = e.target.value;
      renderCards();
    });
  }

  // Atajo de teclado: presionar '/' enfoca el campo de búsqueda
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    } else if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.blur();
    }
  });

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', resetFilters);
  }

  // Render inicial de tarjetas
  renderCards();

  // ------------------------------------------------------------------------
  // 6. ANIMACIONES MECÁNICAS DE ENTRADA CON GSAP & EFECTO TELÓN
  // ------------------------------------------------------------------------
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {

    // Scroll Expansion Hero: No hay texto inicial -> Se agranda todo el hero -> Aparece el texto
    const heroCard = document.getElementById('heroExpandCard');
    const heroTextLayer = document.getElementById('heroExpandTextLayer');
    const heroExpandHint = document.getElementById('heroExpandInnerBadge');
    const heroBackdrop = document.querySelector('.hero-bg-backdrop');

    if (typeof ScrollTrigger !== 'undefined' && heroSection && heroCard && heroTextLayer) {
      // Estado inicial: sin texto visible
      gsap.set(heroTextLayer, {
        opacity: 0,
        y: 28,
        scale: 0.96
      });

      const heroExpandTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 0.7,
          anticipatePin: 1
        }
      });

      // 1. La tarjeta se agranda desde el centro hasta ocupar todo el hero (0% a 65%)
      heroExpandTl
        .to(heroCard, {
          width: '100vw',
          height: '100vh',
          borderRadius: 0,
          boxShadow: 'none',
          ease: 'power2.inOut',
          duration: 0.65
        }, 0)
        .to(heroExpandHint, {
          opacity: 0,
          y: 10,
          ease: 'power1.out',
          duration: 0.2
        }, 0)
        .to(heroBackdrop, {
          opacity: 0,
          ease: 'power1.out',
          duration: 0.45
        }, 0);

      // 2. Una vez que ocupa todo el hero, aparece el texto (62% a 100%)
      heroExpandTl
        .to(heroTextLayer, {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
          duration: 0.35
        }, 0.62);
    }

    // Efecto Telón (Curtain Parallax): el fondo y contenido suben y cubren limpiamente al Hero
    if (typeof ScrollTrigger !== 'undefined' && heroSection) {
      gsap.to(heroSection, {
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.main-body-curtain',
          start: 'top bottom',
          end: 'top 15%',
          scrub: true
        }
      });
    }

    // Entrada sutil del Hero Bento
    gsap.from('#heroBentoCard', {
      opacity: 0,
      y: 24,
      duration: 0.85,
      ease: 'power2.out',
      delay: 0.15
    });

    gsap.from('.bento-side-column > *', {
      opacity: 0,
      y: 20,
      stagger: 0.12,
      duration: 0.75,
      ease: 'power2.out',
      delay: 0.25
    });

    // Entrada de Trading Cards al entrar al viewport
    if (cardsGrid) {
      ScrollTrigger.batch('.trading-card', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            y: 28,
            stagger: 0.08,
            duration: 0.65,
            ease: 'power2.out'
          });
        }
      });
    }

    // Entrada de tarjetas de clubes
    ScrollTrigger.batch('.club-editorial-card', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.55,
          ease: 'power2.out',
          clearProps: 'transform'
        });
      }
    });

    // Entrada de propuestas municipales
    ScrollTrigger.batch('.proposal-dossier-card', {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.55,
          ease: 'power2.out',
          clearProps: 'transform'
        });
      }
    });

    // Animación de movimiento orgánico al scrollear en las curvas divisorias
    if (typeof ScrollTrigger !== 'undefined') {
      document.querySelectorAll('.section-divider-curve').forEach((divider, idx) => {
        const track = divider.querySelector('.curve-motion-track');
        if (track) {
          // Alternar dirección de desplazamiento para mayor dinamismo
          const direction = idx % 2 === 0 ? 1 : -1;
          gsap.fromTo(track,
            { x: -50 * direction },
            {
              x: 50 * direction,
              ease: 'none',
              scrollTrigger: {
                trigger: divider,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.0
              }
            }
          );
        }
      });
    }
  }

  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // Espacio Audiovisual: Spot Oficial Municipalidad (Scroll-to-Scale)
  // Comportamiento: Inicia chiquito -> Scroll agranda un poco -> Se frena -> Se puede controlar y maximizar
  // ------------------------------------------------------------------------
  const videoScrollTrack = document.getElementById('videoScrollTrack');
  const videoSpotContainer = document.getElementById('videoSpotContainer');
  const videoIntroHeader = document.getElementById('videoIntroHeader');
  const spotVideo = document.getElementById('spotVideoOfficial');
  const videoFloatingControls = document.getElementById('videoFloatingControls');
  const videoPlayToggle = document.getElementById('videoPlayToggle');
  const videoProgressBar = document.getElementById('videoProgressBar');
  const videoTimeDisplay = document.getElementById('videoTimeDisplay');
  const videoSoundToggle = document.getElementById('videoSoundToggle');
  const videoMaximizeBtn = document.getElementById('videoMaximizeBtn');

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion && videoScrollTrack && videoSpotContainer) {
    const isMobile = window.innerWidth < 768;
    // 1. El video aparece CHIQUITO en la pantalla
    const startScale = isMobile ? 0.46 : 0.35;

    gsap.set(videoSpotContainer, {
      scale: startScale,
      transformOrigin: 'center center'
    });

    if (videoFloatingControls) {
      gsap.set(videoFloatingControls, {
        opacity: 0,
        y: 10,
        pointerEvents: 'none'
      });
      videoFloatingControls.classList.remove('is-revealed');
    }

    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: videoScrollTrack,
        start: 'top top',
        end: '+=65%',
        pin: true,
        scrub: 0.65,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Cuando el video termina de agrandarse y SE FRENA (progreso >= 52%),
          // se habilitan los controles y la barra de reproducción
          if (self.progress >= 0.52) {
            if (videoFloatingControls) videoFloatingControls.classList.add('is-revealed');
          } else {
            if (videoFloatingControls) videoFloatingControls.classList.remove('is-revealed');
          }
        }
      }
    });

    // Fase A: Al hacer scroll, el video se agranda un poco (de startScale a 1.0)
    videoTl
      .to(videoSpotContainer, {
        scale: 1,
        ease: 'power1.out',
        duration: 0.52
      }, 0)
      // Desvanecimiento sutil del encabezado introductorio
      .to(videoIntroHeader, {
        opacity: 0.1,
        y: -12,
        duration: 0.35
      }, 0)
      // Fase B: SE FRENA. Al frenarse (52% del recorrido), se revela la barra de controles
      .to(videoFloatingControls, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.12
      }, 0.52)
      // El video permanece frenado y visible durante el resto del pin
      .to({}, { duration: 0.48 }, 0.52);
  } else if (videoFloatingControls) {
    videoFloatingControls.classList.add('is-revealed');
  }

  // ------------------------------------------------------------------------
  // Reproductor: Formato de Tiempo (mm:ss)
  // ------------------------------------------------------------------------
  function formatVideoTime(secs) {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  // ------------------------------------------------------------------------
  // Control de Play / Pausa (Botón simplificado y clic en video)
  // ------------------------------------------------------------------------
  function updatePlayPauseUI(isPaused) {
    if (!videoPlayToggle) return;
    const playIconPlay = videoPlayToggle.querySelector('.play-icon-play');
    const playIconPause = videoPlayToggle.querySelector('.play-icon-pause');
    if (isPaused) {
      if (playIconPlay) playIconPlay.classList.remove('hidden');
      if (playIconPause) playIconPause.classList.add('hidden');
      videoPlayToggle.setAttribute('title', 'Reanudar video');
      videoPlayToggle.setAttribute('aria-label', 'Reanudar video');
    } else {
      if (playIconPlay) playIconPlay.classList.add('hidden');
      if (playIconPause) playIconPause.classList.remove('hidden');
      videoPlayToggle.setAttribute('title', 'Pausar video');
      videoPlayToggle.setAttribute('aria-label', 'Pausar video');
    }
  }

  if (spotVideo && videoPlayToggle) {
    videoPlayToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (spotVideo.paused) {
        spotVideo.play().catch(() => {});
      } else {
        spotVideo.pause();
      }
    });

    spotVideo.addEventListener('play', () => updatePlayPauseUI(false));
    spotVideo.addEventListener('pause', () => updatePlayPauseUI(true));
  }

  // Clic directo sobre el video para reproducir/pausar
  if (spotVideo) {
    spotVideo.addEventListener('click', (e) => {
      e.stopPropagation();
      if (spotVideo.paused) {
        spotVideo.play().catch(() => {});
      } else {
        spotVideo.pause();
      }
    });
  }

  // ------------------------------------------------------------------------
  // Barra interactiva para adelantar y atrasar (Seek Scrubber)
  // ------------------------------------------------------------------------
  let isSeeking = false;

  function updateProgressBar() {
    if (!spotVideo || isSeeking || !videoProgressBar) return;
    const duration = spotVideo.duration || 0;
    const current = spotVideo.currentTime || 0;
    if (duration > 0) {
      const pct = (current / duration) * 100;
      videoProgressBar.value = pct;
      videoProgressBar.style.background = `linear-gradient(to right, #ffffff ${pct}%, rgba(255,255,255,0.25) ${pct}%)`;
    }
    if (videoTimeDisplay) {
      videoTimeDisplay.textContent = `${formatVideoTime(current)} / ${formatVideoTime(duration)}`;
    }
  }

  if (spotVideo && videoProgressBar) {
    spotVideo.addEventListener('timeupdate', updateProgressBar);
    spotVideo.addEventListener('loadedmetadata', updateProgressBar);

    // Al arrastrar o hacer clic para adelantar/atrasar
    videoProgressBar.addEventListener('input', () => {
      isSeeking = true;
      const duration = spotVideo.duration || 0;
      const pct = parseFloat(videoProgressBar.value);
      const targetTime = (pct / 100) * duration;
      videoProgressBar.style.background = `linear-gradient(to right, #ffffff ${pct}%, rgba(255,255,255,0.25) ${pct}%)`;
      if (videoTimeDisplay) {
        videoTimeDisplay.textContent = `${formatVideoTime(targetTime)} / ${formatVideoTime(duration)}`;
      }
    });

    videoProgressBar.addEventListener('change', () => {
      const duration = spotVideo.duration || 0;
      const pct = parseFloat(videoProgressBar.value);
      spotVideo.currentTime = (pct / 100) * duration;
      isSeeking = false;
      if (spotVideo.paused) {
        spotVideo.play().catch(() => {});
      }
    });
  }

  // ------------------------------------------------------------------------
  // Control de Sonido Interactivo (Botón simplificado)
  // ------------------------------------------------------------------------
  if (spotVideo && videoSoundToggle) {
    const soundIconOff = videoSoundToggle.querySelector('.sound-icon-off');
    const soundIconOn = videoSoundToggle.querySelector('.sound-icon-on');

    videoSoundToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      spotVideo.muted = !spotVideo.muted;
      if (!spotVideo.muted) {
        if (spotVideo.paused) spotVideo.play().catch(() => {});
        if (soundIconOff) soundIconOff.classList.add('hidden');
        if (soundIconOn) soundIconOn.classList.remove('hidden');
        videoSoundToggle.setAttribute('title', 'Silenciar sonido');
        videoSoundToggle.setAttribute('aria-label', 'Silenciar sonido');
      } else {
        if (soundIconOff) soundIconOff.classList.remove('hidden');
        if (soundIconOn) soundIconOn.classList.add('hidden');
        videoSoundToggle.setAttribute('title', 'Activar sonido');
        videoSoundToggle.setAttribute('aria-label', 'Activar sonido');
      }
    });
  }

  // ------------------------------------------------------------------------
  // Control de Maximizar / Pantalla Completa (Botón simplificado)
  // ------------------------------------------------------------------------
  function updateMaximizeUI(isMaximized) {
    if (!videoMaximizeBtn) return;
    const maxIconExpand = videoMaximizeBtn.querySelector('.max-icon-expand');
    const maxIconCompress = videoMaximizeBtn.querySelector('.max-icon-compress');

    if (isMaximized) {
      if (maxIconExpand) maxIconExpand.classList.add('hidden');
      if (maxIconCompress) maxIconCompress.classList.remove('hidden');
      videoMaximizeBtn.setAttribute('title', 'Restaurar pantalla (Esc)');
      videoMaximizeBtn.setAttribute('aria-label', 'Restaurar pantalla');
    } else {
      if (maxIconExpand) maxIconExpand.classList.remove('hidden');
      if (maxIconCompress) maxIconCompress.classList.add('hidden');
      videoMaximizeBtn.setAttribute('title', 'Pantalla completa');
      videoMaximizeBtn.setAttribute('aria-label', 'Pantalla completa');
    }
  }

  function toggleMaximize() {
    if (!videoSpotContainer) return;

    const isCurrentlyFullscreen = 
      document.fullscreenElement === videoSpotContainer || 
      document.webkitFullscreenElement === videoSpotContainer ||
      videoSpotContainer.classList.contains('is-cinema-maximized');

    if (!isCurrentlyFullscreen) {
      if (videoSpotContainer.requestFullscreen) {
        videoSpotContainer.requestFullscreen().catch(() => {
          videoSpotContainer.classList.add('is-cinema-maximized');
          updateMaximizeUI(true);
        });
      } else if (videoSpotContainer.webkitRequestFullscreen) {
        videoSpotContainer.webkitRequestFullscreen();
      } else if (spotVideo && spotVideo.webkitEnterFullscreen) {
        spotVideo.webkitEnterFullscreen(); // iOS Safari
      } else {
        videoSpotContainer.classList.add('is-cinema-maximized');
        updateMaximizeUI(true);
      }
    } else {
      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen && document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
      }
      videoSpotContainer.classList.remove('is-cinema-maximized');
      updateMaximizeUI(false);
    }
  }

  if (videoMaximizeBtn) {
    videoMaximizeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMaximize();
    });
  }

  document.addEventListener('fullscreenchange', () => {
    const isFull = document.fullscreenElement === videoSpotContainer;
    updateMaximizeUI(isFull);
  });
  document.addEventListener('webkitfullscreenchange', () => {
    const isFull = document.webkitFullscreenElement === videoSpotContainer;
    updateMaximizeUI(isFull);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoSpotContainer && videoSpotContainer.classList.contains('is-cinema-maximized')) {
      videoSpotContainer.classList.remove('is-cinema-maximized');
      updateMaximizeUI(false);
    }
    // Atajos cuando el contenedor está en pantalla completa
    const isFull = document.fullscreenElement === videoSpotContainer || (videoSpotContainer && videoSpotContainer.classList.contains('is-cinema-maximized'));
    if (isFull && spotVideo) {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (spotVideo.paused) spotVideo.play().catch(() => {});
        else spotVideo.pause();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        spotVideo.currentTime = Math.min(spotVideo.duration || 0, spotVideo.currentTime + 5);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        spotVideo.currentTime = Math.max(0, spotVideo.currentTime - 5);
      }
    }
  });

  if (videoSpotContainer) {
    videoSpotContainer.addEventListener('dblclick', (e) => {
      if (e.target.closest('#videoFloatingControls')) return;
      toggleMaximize();
    });
  }

  // Sincronización inicial completada con renderCards()
});
