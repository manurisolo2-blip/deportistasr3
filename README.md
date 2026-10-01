# Día del Deportista – Río Tercero (Río 3)
> **Capital Nacional del Deportista &bull; Córdoba, Argentina**

Sitio web oficial interactivo con **scrollytelling** de alta intensidad y diseño institucional, creado para la conmemoración del **Día del Deportista** y presentación ante la Municipalidad de Río Tercero.

---

## 🚀 Tecnologías & Stack

- **HTML5 semántico + CSS3 moderno** (Variables nativas, tipografías fluidas con `clamp()`, `clip-path`).
- **JavaScript ES6 Vanilla** modular y comentado en español.
- **GSAP 3.12** + **ScrollTrigger** + **MotionPathPlugin** (animaciones cinéticas sincronizadas a 60 FPS).
- **Lenis 1.1** (scroll suave e inercial de alta fidelidad).
- **Gráficos SVG** personalizados (canchas, pelotas, raqueta, red de básquet, carriles y pista de atletismo).
- **Accesibilidad**: Soporte nativo para `prefers-reduced-motion` y diseño 100% responsivo (Mobile First).

---

## 🏆 Estructura de la Presentación

1. **Hero**: Impacto visual con "Día del Deportista – Río Tercero" y balón flotante interactivo.
2. **Qué es el Día del Deportista**: Manifiesto con texto iluminado palabra por palabra mediante scroll.
3. **Nuestros Deportes**: Paneles *pinned* para Fútbol, Tenis, Básquet, Vóley, Natación, Atletismo y Hockey con micro-animaciones interactivas SVG.
4. **Números que Inspiran**: Métricas y contadores de impacto deportivo local.
5. **Galería Horizontal**: Recorrido horizontal de clubes e instituciones formativas de la ciudad.
6. **Línea de Tiempo**: Historia deportiva desde los años 50 hasta la declaración oficial por Ley como *Capital Nacional del Deportista*.
7. **Agenda & Actividades**: Cronograma de clínicas, maratones, expo deportiva y galas.
8. **Propuestas para la Municipalidad**: 4 proyectos estratégicos de políticas públicas e infraestructura deportiva.
9. **Cierre Institucional**: Convergencia final de pelotas en el sello oficial y contacto municipal.

---

## 🛠️ Personalización de Contenidos

Todos los textos y estadísticas con marcas `[COMPLETAR]` se encuentran centralizados en:
📁 **`content.js`**

Podés editar ese archivo directamente para actualizar cifras, fechas oficiales o nombres de clubes sin necesidad de modificar el código visual.

---

## 💻 Ejecución Local

Para visualizar el sitio en local:
```bash
python -m http.server 8080
```
Y abrir en el navegador `http://localhost:8080`.
