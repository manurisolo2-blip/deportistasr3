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
      if (athlete.dorsal) {
        modalDorsal.textContent = `#${athlete.dorsal}`;
        modalDorsal.classList.remove('hidden');
      } else {
        modalDorsal.classList.add('hidden');
      }
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
      }, 0);

    if (videoIntroHeader) {
      videoTl.to(videoIntroHeader, {
        opacity: 0.1,
        y: -12,
        duration: 0.35
      }, 0);
    }

    videoTl
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
  let isVideoInView = false;
  let userManuallyPaused = false;

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

  function handleUserTogglePlay() {
    if (!spotVideo) return;
    if (spotVideo.paused) {
      userManuallyPaused = false;
      spotVideo.play().catch(() => {});
    } else {
      userManuallyPaused = true;
      spotVideo.pause();
    }
  }

  if (spotVideo && videoPlayToggle) {
    videoPlayToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      handleUserTogglePlay();
    });

    spotVideo.addEventListener('play', () => updatePlayPauseUI(false));
    spotVideo.addEventListener('pause', () => updatePlayPauseUI(true));
  }

  // Clic directo sobre el video para reproducir/pausar
  if (spotVideo) {
    spotVideo.addEventListener('click', (e) => {
      e.stopPropagation();
      handleUserTogglePlay();
    });
  }

  // ------------------------------------------------------------------------
  // Pausar automáticamente cuando NO esté en pantalla (IntersectionObserver)
  // ------------------------------------------------------------------------
  if (typeof IntersectionObserver !== 'undefined' && spotVideo) {
    // Si al cargar la página el video no está dentro de la pantalla, pausarlo
    const rect = (videoSpotContainer || spotVideo).getBoundingClientRect();
    const isInitiallyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isInitiallyVisible && !spotVideo.paused) {
      spotVideo.pause();
    }

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVideoInView = entry.isIntersecting;
          if (!entry.isIntersecting) {
            // Fuera de la pantalla: pausar el video
            if (!spotVideo.paused) {
              spotVideo.pause();
            }
          } else {
            // En pantalla: reanudar si el usuario no lo pausó manualmente
            if (!userManuallyPaused && spotVideo.paused) {
              spotVideo.play().catch(() => {});
            }
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    videoObserver.observe(videoSpotContainer || spotVideo);
  }

  // Pausar también si la pestaña pasa a segundo plano
  document.addEventListener('visibilitychange', () => {
    if (!spotVideo) return;
    if (document.hidden) {
      if (!spotVideo.paused) {
        spotVideo.pause();
      }
    } else {
      if (isVideoInView && !userManuallyPaused && spotVideo.paused) {
        spotVideo.play().catch(() => {});
      }
    }
  });

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
      if (isVideoInView && !userManuallyPaused && spotVideo.paused) {
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


  // ------------------------------------------------------------------------
  // 12. MOSAICO DINÁMICO & CONSTELACIÓN 3D DE ATLETAS (SCROLL MORPH HERO)
  // ------------------------------------------------------------------------
  function initAthletesMorph() {
    const stage = document.getElementById('morphStageBox');
    const universe = document.getElementById('morphCardsUniverse');
    const modeButtons = document.querySelectorAll('.morph-mode-btn');
    if (!stage || !universe || !window.DEPORTISTAS_DATA) return;

    // Crear 20 tarjetas representativas a partir de los datos oficiales
    const rawData = window.DEPORTISTAS_DATA;
    const athletes = rawData.length >= 20 ? rawData.slice(0, 20) : [...rawData, ...rawData].slice(0, 20);
    const total = athletes.length;

    universe.innerHTML = athletes.map((atleta, i) => `
      <div class="morph-card-item" data-id="${atleta.id}" data-index="${i}" tabindex="0" role="button" aria-label="Abrir ficha técnica de ${atleta.nombre}">
        <div class="morph-card-inner">
          <!-- Cara Frontal -->
          <div class="morph-card-face morph-card-front">
            <img src="${atleta.imagenUrl}" alt="${atleta.nombre}" class="morph-card-img" loading="eager" />
            <div class="morph-card-overlay"></div>
            <div class="morph-card-info">
              <span class="morph-card-badge">${atleta.disciplina}</span>
              <h4 class="morph-card-title">${atleta.nombre}</h4>
            </div>
            ${atleta.dorsal ? `<span class="morph-card-dorsal">#${atleta.dorsal}</span>` : ''}
          </div>
          <!-- Cara Posterior (Flip 3D) -->
          <div class="morph-card-face morph-card-back">
            <span class="morph-back-club">${atleta.clubOrigen}</span>
            <p class="morph-back-achievement">${atleta.logroPrincipal}</p>
            <div class="morph-back-action">VER FICHA</div>
          </div>
        </div>
      </div>
    `).join('');

    const cardEls = universe.querySelectorAll('.morph-card-item');

    // Generar coordenadas dispersas pseudoaleatorias
    const scatterCoords = athletes.map(() => ({
      x: (Math.random() - 0.5) * 850,
      y: (Math.random() - 0.5) * 550,
      rot: (Math.random() - 0.5) * 60,
      scale: 0.75
    }));

    let currentPhase = 'circle';

    function calculateTargets(phase) {
      const rect = stage.getBoundingClientRect();
      const W = rect.width || 800;
      const H = rect.height || 680;
      const isMobile = W < 768;
      const minDim = Math.min(W, H);

      return athletes.map((_, i) => {
        if (phase === 'scatter') {
          const s = scatterCoords[i];
          return { x: s.x, y: s.y, rot: s.rot, scale: s.scale, opacity: 0.85 };
        }

        if (phase === 'arc') {
          const spread = isMobile ? 115 : 145;
          const step = spread / (total - 1);
          const arcRadius = isMobile ? minDim * 1.15 : minDim * 0.98;
          const startAngle = -90 - spread / 2;
          const angle = startAngle + i * step;
          const rad = (angle * Math.PI) / 180;
          return {
            x: Math.cos(rad) * arcRadius,
            y: Math.sin(rad) * arcRadius + H * 0.35 + arcRadius * 0.85,
            rot: angle + 90,
            scale: isMobile ? 0.88 : 1,
            opacity: 1
          };
        }

        // 'circle' (Constelación Orbital)
        const circleRadius = Math.min(minDim * 0.40, isMobile ? 180 : 315);
        const angle = (i / total) * 360;
        const rad = (angle * Math.PI) / 180;
        return {
          x: Math.cos(rad) * circleRadius,
          y: Math.sin(rad) * circleRadius,
          rot: angle + 90,
          scale: isMobile ? 0.84 : 1,
          opacity: 1
        };
      });
    }

    function renderPhase(phase, duration = 1.0) {
      currentPhase = phase;
      const targets = calculateTargets(phase);

      cardEls.forEach((card, i) => {
        const t = targets[i];
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            x: t.x,
            y: t.y,
            rotation: t.rot,
            scale: t.scale,
            opacity: t.opacity,
            duration: duration,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        } else {
          card.style.transform = `translate(${t.x}px, ${t.y}px) rotate(${t.rot}deg) scale(${t.scale})`;
          card.style.opacity = t.opacity;
        }
      });

      modeButtons.forEach(btn => {
        if (btn.getAttribute('data-phase') === phase) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Render inicial
    setTimeout(() => {
      renderPhase('circle', 0.8);
    }, 150);

    // Botones de modo interactivo
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const ph = btn.getAttribute('data-phase') || 'circle';
        renderPhase(ph, 1.2);
      });
    });

    // ScrollTrigger para morphing reactivo al deslizar la pantalla
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: stage,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => renderPhase('circle', 1.0),
        onLeave: () => renderPhase('arc', 1.2),
        onEnterBack: () => renderPhase('circle', 1.0),
      });
    }

    // Efecto de inclinación 3D (Parallax) con el movimiento del ratón
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      if (typeof gsap !== 'undefined') {
        gsap.to(universe, {
          rotationY: nx * 14,
          rotationX: -ny * 12,
          duration: 0.5,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }
    });

    stage.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(universe, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
    });

    // Clic en cualquier tarjeta de la constelación -> abre la ficha técnica modal con la foto grande
    universe.addEventListener('click', (e) => {
      const card = e.target.closest('.morph-card-item');
      if (!card) return;
      const id = card.getAttribute('data-id');
      const athlete = window.DEPORTISTAS_DATA.find(d => String(d.id) === String(id));
      if (athlete) {
        openAthleteModal(athlete);
      }
    });

    // Accesibilidad teclado (Enter / Espacio)
    universe.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.morph-card-item');
        if (card) {
          e.preventDefault();
          const id = card.getAttribute('data-id');
          const athlete = window.DEPORTISTAS_DATA.find(d => String(d.id) === String(id));
          if (athlete) openAthleteModal(athlete);
        }
      }
    });

    // Redimensionamiento responsivo
    window.addEventListener('resize', () => {
      renderPhase(currentPhase, 0.3);
    });
  }

  // Inicializar Mosaico 3D
  initAthletesMorph();

  // Sincronización inicial completada con renderCards()
});
