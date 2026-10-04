"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface VideoScrollHeroProps {
  videoSrc?: string;
  enableAnimations?: boolean;
  className?: string;
  startScale?: number;
  maxScale?: number;
}

export function VideoScrollHero({
  videoSrc = "assets/video_municipalidad.mp4",
  enableAnimations = true,
  className = "",
  startScale = 0.8,
  maxScale = 1.0,
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [scrollScale, setScrollScale] = useState(startScale);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!enableAnimations || shouldReduceMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress based on container position
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = containerHeight - windowHeight;
      const rawProgress = Math.min(scrolled / maxScroll, 1);
      
      // Hold initial scale until 20% scroll, then grow gently to maxScale
      const holdThreshold = 0.2;
      const progress = rawProgress < holdThreshold 
        ? 0 
        : Math.min((rawProgress - holdThreshold) / (1 - holdThreshold), 1);
      
      const newScale = startScale + (progress * (maxScale - startScale));
      setScrollScale(newScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableAnimations, shouldReduceMotion, startScale, maxScale]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!videoWrapperRef.current) return;
    if (!document.fullscreenElement) {
      videoWrapperRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const shouldAnimate = enableAnimations && !shouldReduceMotion && !isFullscreen;

  return (
    <div className={`relative ${className}`}>
      {/* Hero Section with Video */}
      <div
        ref={containerRef}
        className="relative h-[160vh] bg-background"
      >
        {/* Fixed Video Container */}
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 z-10">
          <div
            ref={videoWrapperRef}
            className={`relative flex items-center justify-center will-change-transform transition-transform duration-100 ${
              isFullscreen ? "w-screen h-screen bg-black" : ""
            }`}
            style={{
              transform: shouldAnimate ? `scale(${scrollScale})` : 'scale(1)',
              transformOrigin: "center center",
            }}
          >
            <video
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className={`w-[88vw] max-w-5xl aspect-video object-cover shadow-2xl rounded-2xl border border-border/40 ${
                isFullscreen ? "!w-full !h-full !max-w-none !rounded-none !border-0 object-contain" : ""
              }`}
            >
              <source src={videoSrc} type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>

            {/* Video Overlay Content */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 flex flex-col justify-end p-6 sm:p-10 rounded-2xl pointer-events-none ${
                isFullscreen ? "rounded-none" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: scrollScale > startScale + 0.05 || isFullscreen ? 1 : 0.4 }}
              transition={{ duration: 0.4 }}
            >
              <div className="max-w-2xl text-white">
                <span className="inline-block font-mono text-xs font-bold uppercase tracking-wider text-sky-400 mb-1">
                  MUNICIPALIDAD DE RÍO TERCERO
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-2 drop-shadow-md">
                  RÍO TERCERO EN ACCIÓN
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-slate-200 drop-shadow">
                  Spot institucional y archivo deportivo oficial de la Capital Nacional del Deportista.
                </p>
              </div>
            </motion.div>

            {/* Controles Flotantes: Audio y Maximizar */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="bg-slate-900/85 hover:bg-slate-900 text-white font-mono text-xs px-3.5 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
                aria-label={isMuted ? "Activar Sonido" : "Silenciar"}
              >
                <span>{isMuted ? "Activar Sonido" : "Silenciar"}</span>
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="bg-slate-900/85 hover:bg-slate-900 text-white font-mono text-xs px-3.5 py-2 rounded-full backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
                aria-label={isFullscreen ? "Minimizar" : "Maximizar"}
              >
                <span>{isFullscreen ? "Minimizar" : "Maximizar"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
