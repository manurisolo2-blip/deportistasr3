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

      // Sincronización bidireccional: cuando ScrollTrigger crea/actualiza pines o dimensiones
      ScrollTrigger.addEventListener('refresh', () => {
        if (lenis) lenis.resize();
      });
    }

    // Observador continuo de dimensiones del documento para que el límite de Lenis nunca quede desfasado
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        if (lenis) lenis.resize();
      });
      resizeObserver.observe(document.body);
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
        class="group relative bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl trading-card cursor-pointer"
        data-discipline="${atleta.disciplina.toUpperCase()}"
        data-id="${atleta.id}"
        tabindex="0"
        role="button"
        aria-label="Ver ficha detallada de ${atleta.nombre}"
      >
        <!-- Contenedor Fotográfico con proporción cuadrada 1:1 de alto impacto -->
        <div class="relative aspect-square w-full overflow-hidden bg-slate-100 border-b border-slate-200 card-photo-frame">
          <img
            src="${atleta.imagenUrl}"
            alt="${atleta.nombre}"
            class="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 card-athlete-photo"
            loading="lazy"
          />
          <!-- Badge de Disciplina Deportiva -->
          <div class="absolute top-2.5 left-2.5 z-10 card-badges-wrap">
            <span class="bg-slate-900/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider card-badge-discipline shadow-sm">
              ${atleta.disciplina}
            </span>
          </div>
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
            <div class="card-athlete-specialty font-mono text-xs font-bold text-sky-700 mt-0.5 mb-2.5">
              ${atleta.especialidad || '&nbsp;'}
            </div>

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
                <span class="bg-slate-900 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">
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
    if (lenis) {
      lenis.resize();
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
  // MODAL INTERACTIVO DE DETALLE DE DEPORTISTA (FICHA EDITORIAL EN ALTA RESOLUCIÓN)
  // ------------------------------------------------------------------------
  const athleteModal = document.getElementById('athleteDetailModal');
  const athleteModalCloseBtn = document.getElementById('athleteModalCloseBtn');
  const modalAthleteActionClose = document.getElementById('modalAthleteActionClose');
  const athleteModalCard = document.getElementById('athleteModalCard');

  const modalImg = document.getElementById('modalAthleteImg');
  const modalDiscipline = document.getElementById('modalAthleteDiscipline');
  const modalDorsal = document.getElementById('modalAthleteDorsal');
  const modalClub = document.getElementById('modalAthleteClub');
  const modalName = document.getElementById('modalAthleteName');
  const modalSpecialty = document.getElementById('modalAthleteSpecialty');
  const modalAchievement = document.getElementById('modalAthleteAchievement');
  const modalBio = document.getElementById('modalAthleteBio');
  const modalTelemetryBox = document.getElementById('modalAthleteTelemetryBox');
  const modalTelemetryGrid = document.getElementById('modalAthleteTelemetryGrid');
  const modalLegacyBox = document.getElementById('modalAthleteLegacyBox');
  const modalLegacy = document.getElementById('modalAthleteLegacy');
  const modalEpoca = document.getElementById('modalAthleteEpoca');

  function openAthleteModal(athlete) {
    if (!athleteModal || !athlete) return;

    if (modalImg) {
      modalImg.src = athlete.imagenUrl || '';
      modalImg.alt = athlete.nombre || 'Deportista de Río Tercero';
    }
    if (modalDiscipline) modalDiscipline.textContent = athlete.disciplina || '';
    if (modalDorsal) {
      modalDorsal.classList.add('hidden');
    }
    if (modalClub) modalClub.textContent = athlete.clubOrigen || 'Río Tercero';
    if (modalName) modalName.textContent = athlete.nombre || '';
    if (modalSpecialty) {
      if (athlete.especialidad) {
        modalSpecialty.textContent = athlete.especialidad;
        modalSpecialty.classList.remove('hidden');
      } else {
        modalSpecialty.classList.add('hidden');
      }
    }
    if (modalAchievement) modalAchievement.textContent = athlete.logroPrincipal || '';
    if (modalBio) modalBio.textContent = athlete.descripcion || '';

    // Telemetría
    if (modalTelemetryGrid && modalTelemetryBox) {
      if (athlete.telemetria && athlete.telemetria.length > 0) {
        modalTelemetryGrid.innerHTML = athlete.telemetria.map(item => `
          <div class="athlete-modal-telemetry-item">
            <span class="item-label">${item.label}</span>
            <span class="item-val">${item.val}</span>
          </div>
        `).join('');
        modalTelemetryBox.classList.remove('hidden');
      } else {
        modalTelemetryBox.classList.add('hidden');
      }
    }

    // Legado
    if (modalLegacyBox && modalLegacy) {
      if (athlete.legado) {
        modalLegacy.textContent = `"${athlete.legado}"`;
        modalLegacyBox.classList.remove('hidden');
      } else {
        modalLegacyBox.classList.add('hidden');
      }
    }

    // Época
    if (modalEpoca) {
      if (athlete.epoca) {
        modalEpoca.textContent = `Época: ${athlete.epoca}`;
        modalEpoca.classList.remove('hidden');
      } else {
        modalEpoca.classList.add('hidden');
      }
    }

    // Mostrar modal con animación fluida
    athleteModal.classList.remove('hidden');
    requestAnimationFrame(() => {
      athleteModal.classList.add('is-open');
    });
    athleteModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (typeof lenis !== 'undefined' && lenis) {
      lenis.stop();
    }
    if (athleteModalCloseBtn) {
      athleteModalCloseBtn.focus();
    }
  }

  function closeAthleteModal() {
    if (!athleteModal || !athleteModal.classList.contains('is-open')) return;
    athleteModal.classList.remove('is-open');
    athleteModal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      athleteModal.classList.add('hidden');
      document.body.style.overflow = '';
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.start();
      }
    }, 280);
  }

  if (athleteModalCloseBtn) athleteModalCloseBtn.addEventListener('click', closeAthleteModal);
  if (modalAthleteActionClose) modalAthleteActionClose.addEventListener('click', closeAthleteModal);

  if (athleteModal) {
    athleteModal.addEventListener('click', (e) => {
      if (e.target === athleteModal) {
        closeAthleteModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && athleteModal && athleteModal.classList.contains('is-open')) {
      closeAthleteModal();
    }
  });

  // Delegación de clics y teclado en tarjetas del directorio
  if (cardsGrid) {
    cardsGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.trading-card');
      if (!card || !window.DEPORTISTAS_DATA) return;
      const athleteId = card.getAttribute('data-id');
      const athleteName = card.querySelector('.card-name-title')?.textContent.trim();
      const athlete = window.DEPORTISTAS_DATA.find(d => 
        (athleteId && String(d.id) === String(athleteId)) ||
        (athleteName && normalize(d.nombre) === normalize(athleteName))
      );
      if (athlete) {
        openAthleteModal(athlete);
      }
    });

    cardsGrid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.trading-card');
        if (card && window.DEPORTISTAS_DATA) {
          e.preventDefault();
          const athleteId = card.getAttribute('data-id');
          const athleteName = card.querySelector('.card-name-title')?.textContent.trim();
          const athlete = window.DEPORTISTAS_DATA.find(d => 
            (athleteId && String(d.id) === String(athleteId)) ||
            (athleteName && normalize(d.nombre) === normalize(athleteName))
          );
          if (athlete) openAthleteModal(athlete);
        }
      }
    });
  }


  // ------------------------------------------------------------------------
  // 6. ANIMACIONES MECÁNICAS DE ENTRADA CON GSAP & EFECTO TELÓN
  // ------------------------------------------------------------------------
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {

    // Scroll Expansion Hero: El texto aparece cuando está chico y se agranda durante la animación
    const heroCard = document.getElementById('heroExpandCard');
    const heroTextLayer = document.getElementById('heroExpandTextLayer');
    const heroTitle = document.getElementById('heroTitle');
    const heroLead = document.getElementById('heroLead');
    const heroExpandHint = document.getElementById('heroExpandInnerBadge');
    const heroBackdrop = document.querySelector('.hero-bg-backdrop');

    if (typeof ScrollTrigger !== 'undefined' && heroSection && heroCard && heroTextLayer) {
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        const { isMobile } = context.conditions;
        const initialTitleScale = isMobile ? 0.58 : 0.36;
        const leadYTarget = isMobile ? 18 : 28;

        // Estado inicial: Texto centrado en el medio de la tarjeta chica
        gsap.set(heroTextLayer, {
          opacity: 1,
          y: 0
        });

        if (heroTitle) {
          gsap.set(heroTitle, {
            scale: initialTitleScale,
            transformOrigin: 'center center'
          });
        }

        // La bajada editorial no ocupa espacio en el flujo normal para que el título esté 100% centrado al medio
        if (heroLead) {
          gsap.set(heroLead, {
            autoAlpha: 0,
            xPercent: -50,
            y: leadYTarget + 14
          });
        }

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

        // 1. La tarjeta se agranda desde el centro hasta ocupar todo el hero (0% a 70%)
        heroExpandTl
          .to(heroCard, {
            width: '100vw',
            height: '100vh',
            borderRadius: 0,
            boxShadow: 'none',
            ease: 'power2.inOut',
            duration: 0.7
          }, 0)
          // 2. El título se agranda hasta su escala nativa 1.0 (resolución vectorial 100% nítida)
          .to(heroTitle, {
            scale: 1,
            ease: 'power2.inOut',
            duration: 0.7
          }, 0)
          // 3. El indicador "Deslizá para expandir" se oculta al comenzar el scroll
          .to(heroExpandHint, {
            opacity: 0,
            y: 10,
            ease: 'power1.out',
            duration: 0.18
          }, 0)
          // 4. El fondo difuminado desaparece
          .to(heroBackdrop, {
            opacity: 0,
            ease: 'power1.out',
            duration: 0.45
          }, 0)
          // 5. El texto de bajada editorial aparece suavemente debajo del título agrandado sin solaparse
          .to(heroLead, {
            autoAlpha: 1,
            y: leadYTarget,
            ease: 'power2.out',
            duration: 0.28
          }, 0.5);
      });
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

    // Entrada de Trading Cards al entrar al viewport (Fade suave y perfectamente alineado)
    if (cardsGrid) {
      ScrollTrigger.batch('.trading-card', {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            opacity: 0,
            duration: 0.45,
            ease: 'power2.out',
            clearProps: 'all'
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
  // Espacio Audiovisual: Reproductor Scroll-to-Scale con Liquid Glass Controls
  // Modular para Múltiples Videos (Spot Oficial y Entrevista ITR3)
  // ------------------------------------------------------------------------
  function formatVideoTime(secs) {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function initScrollVideoPlayer({
    trackId,
    containerId,
    videoId,
    controlsId,
    playToggleId,
    progressBarId,
    soundToggleId,
    maximizeBtnId
  }) {
    const trackEl = document.getElementById(trackId);
    const containerEl = document.getElementById(containerId);
    const videoEl = document.getElementById(videoId);
    const controlsEl = document.getElementById(controlsId);
    const playToggleEl = document.getElementById(playToggleId);
    const progressBarEl = document.getElementById(progressBarId);
    const soundToggleEl = document.getElementById(soundToggleId);
    const maximizeBtnEl = document.getElementById(maximizeBtnId);

    if (!trackEl || !containerEl || !videoEl) return;

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
      const isMobile = window.innerWidth < 768;
      const startScale = isMobile ? 0.46 : 0.35;

      gsap.set(containerEl, {
        scale: startScale,
        transformOrigin: 'center center'
      });

      if (controlsEl) {
        gsap.set(controlsEl, {
          opacity: 0,
          y: 10,
          pointerEvents: 'none'
        });
        controlsEl.classList.remove('is-revealed');
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackEl,
          start: 'top top',
          end: '+=65%',
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress >= 0.52) {
              if (controlsEl) controlsEl.classList.add('is-revealed');
            } else {
              if (controlsEl) controlsEl.classList.remove('is-revealed');
            }
          }
        }
      });

      tl.to(containerEl, {
        scale: 1,
        ease: 'power1.out',
        duration: 0.52
      }, 0);

      if (controlsEl) {
        tl.to(controlsEl, {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          duration: 0.12
        }, 0.52)
        .to({}, { duration: 0.48 }, 0.52);
      }
    } else if (controlsEl) {
      controlsEl.classList.add('is-revealed');
    }

    let isVideoInView = false;
    let userManuallyPaused = false;

    function updatePlayPauseUI(isPaused) {
      if (!playToggleEl) return;
      const playIcon = playToggleEl.querySelector('.play-icon-play');
      const pauseIcon = playToggleEl.querySelector('.play-icon-pause');
      if (isPaused) {
        if (playIcon) playIcon.classList.remove('hidden');
        if (pauseIcon) pauseIcon.classList.add('hidden');
        playToggleEl.setAttribute('title', 'Reanudar video');
        playToggleEl.setAttribute('aria-label', 'Reanudar video');
      } else {
        if (playIcon) playIcon.classList.add('hidden');
        if (pauseIcon) pauseIcon.classList.remove('hidden');
        playToggleEl.setAttribute('title', 'Pausar video');
        playToggleEl.setAttribute('aria-label', 'Pausar video');
      }
    }

    function togglePlay() {
      if (!videoEl) return;
      if (videoEl.paused) {
        userManuallyPaused = false;
        videoEl.play().catch(() => {});
      } else {
        userManuallyPaused = true;
        videoEl.pause();
      }
    }

    if (playToggleEl) {
      playToggleEl.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
      });
    }

    videoEl.addEventListener('play', () => updatePlayPauseUI(false));
    videoEl.addEventListener('pause', () => updatePlayPauseUI(true));

    videoEl.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });

    if (typeof IntersectionObserver !== 'undefined') {
      const rect = containerEl.getBoundingClientRect();
      const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isInitiallyVisible && !videoEl.paused) {
        videoEl.pause();
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVideoInView = entry.isIntersecting;
            if (!entry.isIntersecting) {
              if (!videoEl.paused) videoEl.pause();
            } else {
              if (!userManuallyPaused && videoEl.paused) {
                videoEl.play().catch(() => {});
              }
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(containerEl);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (!videoEl.paused) videoEl.pause();
      } else {
        if (isVideoInView && !userManuallyPaused && videoEl.paused) {
          videoEl.play().catch(() => {});
        }
      }
    });

    let isSeeking = false;
    function updateProgress() {
      if (!videoEl || isSeeking || !progressBarEl) return;
      const duration = videoEl.duration || 0;
      const current = videoEl.currentTime || 0;
      if (duration > 0) {
        const pct = (current / duration) * 100;
        progressBarEl.value = pct;
        progressBarEl.style.background = `linear-gradient(to right, #ffffff ${pct}%, rgba(255,255,255,0.25) ${pct}%)`;
      }
    }

    if (progressBarEl) {
      videoEl.addEventListener('timeupdate', updateProgress);
      videoEl.addEventListener('loadedmetadata', updateProgress);

      progressBarEl.addEventListener('input', () => {
        isSeeking = true;
        const duration = videoEl.duration || 0;
        const pct = parseFloat(progressBarEl.value);
        progressBarEl.style.background = `linear-gradient(to right, #ffffff ${pct}%, rgba(255,255,255,0.25) ${pct}%)`;
      });

      progressBarEl.addEventListener('change', () => {
        const duration = videoEl.duration || 0;
        const pct = parseFloat(progressBarEl.value);
        videoEl.currentTime = (pct / 100) * duration;
        isSeeking = false;
        if (isVideoInView && !userManuallyPaused && videoEl.paused) {
          videoEl.play().catch(() => {});
        }
      });
    }

    if (soundToggleEl) {
      const soundOff = soundToggleEl.querySelector('.sound-icon-off');
      const soundOn = soundToggleEl.querySelector('.sound-icon-on');

      soundToggleEl.addEventListener('click', (e) => {
        e.stopPropagation();
        videoEl.muted = !videoEl.muted;
        if (!videoEl.muted) {
          if (videoEl.paused) videoEl.play().catch(() => {});
          if (soundOff) soundOff.classList.add('hidden');
          if (soundOn) soundOn.classList.remove('hidden');
          soundToggleEl.setAttribute('title', 'Silenciar sonido');
          soundToggleEl.setAttribute('aria-label', 'Silenciar sonido');
        } else {
          if (soundOff) soundOff.classList.remove('hidden');
          if (soundOn) soundOn.classList.add('hidden');
          soundToggleEl.setAttribute('title', 'Activar sonido');
          soundToggleEl.setAttribute('aria-label', 'Activar sonido');
        }
      });
    }

    function updateMaxUI(isMax) {
      if (!maximizeBtnEl) return;
      const expandIcon = maximizeBtnEl.querySelector('.max-icon-expand');
      const compressIcon = maximizeBtnEl.querySelector('.max-icon-compress');
      if (isMax) {
        if (expandIcon) expandIcon.classList.add('hidden');
        if (compressIcon) compressIcon.classList.remove('hidden');
        maximizeBtnEl.setAttribute('title', 'Restaurar pantalla (Esc)');
        maximizeBtnEl.setAttribute('aria-label', 'Restaurar pantalla');
      } else {
        if (expandIcon) expandIcon.classList.remove('hidden');
        if (compressIcon) compressIcon.classList.add('hidden');
        maximizeBtnEl.setAttribute('title', 'Pantalla completa');
        maximizeBtnEl.setAttribute('aria-label', 'Pantalla completa');
      }
    }

    function toggleFullscreen() {
      const isFull =
        document.fullscreenElement === containerEl ||
        document.webkitFullscreenElement === containerEl ||
        containerEl.classList.contains('is-cinema-maximized');

      if (!isFull) {
        if (containerEl.requestFullscreen) {
          containerEl.requestFullscreen().catch(() => {
            containerEl.classList.add('is-cinema-maximized');
            updateMaxUI(true);
          });
        } else if (containerEl.webkitRequestFullscreen) {
          containerEl.webkitRequestFullscreen();
        } else if (videoEl.webkitEnterFullscreen) {
          videoEl.webkitEnterFullscreen();
        } else {
          containerEl.classList.add('is-cinema-maximized');
          updateMaxUI(true);
        }
      } else {
        if (document.exitFullscreen && document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen && document.webkitFullscreenElement) {
          document.webkitExitFullscreen();
        }
        containerEl.classList.remove('is-cinema-maximized');
        updateMaxUI(false);
      }
    }

    if (maximizeBtnEl) {
      maximizeBtnEl.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFullscreen();
      });
    }

    document.addEventListener('fullscreenchange', () => {
      const isFull = document.fullscreenElement === containerEl;
      updateMaxUI(isFull);
    });
    document.addEventListener('webkitfullscreenchange', () => {
      const isFull = document.webkitFullscreenElement === containerEl;
      updateMaxUI(isFull);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && containerEl.classList.contains('is-cinema-maximized')) {
        containerEl.classList.remove('is-cinema-maximized');
        updateMaxUI(false);
      }
      const isFull =
        document.fullscreenElement === containerEl ||
        (containerEl && containerEl.classList.contains('is-cinema-maximized'));
      if (isFull) {
        if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          if (videoEl.paused) videoEl.play().catch(() => {});
          else videoEl.pause();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          videoEl.currentTime = Math.min(videoEl.duration || 0, videoEl.currentTime + 5);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          videoEl.currentTime = Math.max(0, videoEl.currentTime - 5);
        }
      }
    });

    containerEl.addEventListener('dblclick', (e) => {
      if (controlsEl && e.target.closest('#' + controlsId)) return;
      toggleFullscreen();
    });
  }

  // 1. Inicializar Spot Oficial Municipalidad
  initScrollVideoPlayer({
    trackId: 'videoScrollTrack',
    containerId: 'videoSpotContainer',
    videoId: 'spotVideoOfficial',
    controlsId: 'videoFloatingControls',
    playToggleId: 'videoPlayToggle',
    progressBarId: 'videoProgressBar',
    soundToggleId: 'videoSoundToggle',
    maximizeBtnId: 'videoMaximizeBtn'
  });

  // 2. Inicializar Entrevista ITR3
  initScrollVideoPlayer({
    trackId: 'interviewScrollTrack',
    containerId: 'interviewSpotContainer',
    videoId: 'interviewVideoOfficial',
    controlsId: 'interviewFloatingControls',
    playToggleId: 'interviewPlayToggle',
    progressBarId: 'interviewProgressBar',
    soundToggleId: 'interviewSoundToggle',
    maximizeBtnId: 'interviewMaximizeBtn'
  });

  // Sincronización inicial completa tras construir pines y tarjetas
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
  if (lenis) {
    lenis.resize();
  }

  // Sincronización de seguridad al terminar la carga de imágenes, fuentes web y recursos pesados
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
    if (lenis) {
      lenis.resize();
    }
    updateHeaderAndScroll();
  });
});
