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

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(targetEl, { offset: -70, duration: 1.0 });
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
  const tradingCards = Array.from(document.querySelectorAll('.trading-card'));
  const liveCounter = document.getElementById('directoryLiveCounter');
  const emptyState = document.getElementById('emptyStateContainer');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  let activeDiscipline = 'todos';
  let activeSearchQuery = '';

  // Filtrar tarjetas
  function applyFilters() {
    let visibleCount = 0;
    const query = activeSearchQuery.trim().toLowerCase();

    tradingCards.forEach(card => {
      const cardDiscipline = card.getAttribute('data-discipline') || '';
      const cardKeywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const cardText = card.innerText.toLowerCase();

      // Validación por disciplina
      const matchesDiscipline = (activeDiscipline === 'todos') || (cardDiscipline === activeDiscipline);

      // Validación por texto de búsqueda
      let matchesSearch = true;
      if (query.length > 0) {
        matchesSearch = cardKeywords.includes(query) || cardText.includes(query);
      }

      if (matchesDiscipline && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Actualizar contador en vivo
    if (liveCounter) {
      liveCounter.textContent = `MOSTRANDO ${visibleCount} DE ${tradingCards.length} ATLETAS FEDERADOS`;
    }

    // Toggle de estado vacío
    if (emptyState) {
      if (visibleCount === 0) {
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
      }
    }
  }

  // Escuchar clics en los chips de disciplina
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });

      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      activeDiscipline = chip.getAttribute('data-filter') || 'todos';

      applyFilters();
    });
  });

  // Escuchar entrada en el campo de búsqueda
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value;
      applyFilters();
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

  // Botón para restablecer filtros
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      activeSearchQuery = '';
      activeDiscipline = 'todos';

      filterChips.forEach(c => {
        if (c.getAttribute('data-filter') === 'todos') {
          c.classList.add('active');
          c.setAttribute('aria-selected', 'true');
        } else {
          c.classList.remove('active');
          c.setAttribute('aria-selected', 'false');
        }
      });

      applyFilters();
      if (searchInput) searchInput.focus();
    });
  }

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

  // Ejecución inicial de filtros
  applyFilters();
});
