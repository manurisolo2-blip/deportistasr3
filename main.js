/**
 * ==========================================================================
 * RÍO TERCERO · CAPITAL NACIONAL DEL DEPORTISTA (LEY 27.380 / 27.396)
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

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (progressLine && docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressLine.style.width = `${scrollPercent}%`;
    }

    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  }, { passive: true });

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
        class="group relative bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-slate-900 hover:shadow-lg trading-card ${
          atleta.destacado ? 'card-featured' : ''
        }"
        data-discipline="${atleta.disciplina.toUpperCase()}"
      >
        <!-- Dorsal Fantasma Técnico en Capa Posterior -->
        <span class="pointer-events-none absolute right-2 top-2 font-mono text-8xl font-black text-slate-100 select-none transition-colors group-hover:text-amber-100 card-dorsal-watermark" aria-hidden="true">
          ${atleta.dorsal}
        </span>

        <!-- Contenedor Fotográfico Vertical -->
        <div class="relative aspect-[3/4] w-full overflow-hidden bg-slate-100 border-b border-slate-200 card-photo-frame">
          <img
            src="${atleta.imagenUrl}"
            alt="${atleta.nombre}"
            class="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 card-athlete-photo"
            loading="lazy"
          />
          <!-- Badges Deportivos -->
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 card-badges-wrap">
            <span class="bg-slate-950 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider card-badge-discipline">
              ${atleta.disciplina}
            </span>
            <span class="bg-amber-500 text-slate-950 font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider card-badge-category">
              ${atleta.categoria}
            </span>
          </div>
        </div>

        <!-- Datos Editoriales -->
        <div class="p-5 flex-1 flex flex-col justify-between relative z-10 card-content-body">
          <div>
            <p class="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest card-club-origin">
              ${atleta.clubOrigen}
            </p>
            <h3 class="mt-1 font-['Bebas_Neue',sans-serif] text-3xl font-black uppercase tracking-tight text-slate-950 group-hover:text-amber-600 transition-colors card-name-title">
              ${atleta.nombre}
            </h3>
          </div>

          <!-- Telemetría y Palmarés Inferior -->
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-left card-telemetry-row">
            <div class="telemetry-info">
              <span class="block font-mono text-[9px] uppercase tracking-wider text-slate-600 telemetry-label">
                Consagración
              </span>
              <span class="font-sans text-xs font-bold text-slate-800 telemetry-val">
                ${atleta.logroPrincipal}
              </span>
            </div>
            <span class="font-mono text-xs font-bold text-slate-600 group-hover:text-slate-950 group-hover:translate-x-0.5 transition-all telemetry-arrow" aria-hidden="true">
              →
            </span>
          </div>
        </div>
      </article>
    `).join('');
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
  // 6. ANIMACIONES MECÁNICAS DE ENTRADA CON GSAP
  // ------------------------------------------------------------------------
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {

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
          y: 24,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out'
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
          y: 24,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
  }

  // Sincronización inicial completada con renderCards()
});
