"use client";

import React, { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

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
  startScale = 0.35,
  maxScale = 1.0,
}: VideoScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [scrollScale, setScrollScale] = useState(startScale);
  const [isFrenado, setIsFrenado] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [userManuallyPaused, setUserManuallyPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!enableAnimations || shouldReduceMotion) {
      setScrollScale(maxScale);
      setIsFrenado(true);
      return;
    }

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const scrolled = Math.max(0, -rect.top);
      const maxScroll = containerHeight - windowHeight;
      const rawProgress = Math.min(scrolled / maxScroll, 1);
      
      const growthCutoff = 0.52;
      if (rawProgress < growthCutoff) {
        const growthProgress = rawProgress / growthCutoff;
        const currentScale = startScale + growthProgress * (maxScale - startScale);
        setScrollScale(currentScale);
        setIsFrenado(false);
      } else {
        setScrollScale(maxScale);
        setIsFrenado(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableAnimations, shouldReduceMotion, startScale, maxScale]);

  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        } else {
          if (!userManuallyPaused && videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [userManuallyPaused]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!videoWrapperRef.current) return;
    if (!document.fullscreenElement) {
      videoWrapperRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setUserManuallyPaused(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setUserManuallyPaused(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pct = parseFloat(e.target.value);
    if (videoRef.current && duration > 0) {
      const target = (pct / 100) * duration;
      videoRef.current.currentTime = target;
      setCurrentTime(target);
    }
  };

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const shouldAnimate = enableAnimations && !shouldReduceMotion && !isFullscreen;

  return (
    <div className={`relative ${className}`}>
      {/* Hero Section with Video */}
      <div
        ref={containerRef}
        className="relative h-[140vh] bg-background"
      >
        {/* Fixed Video Container */}
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 z-10">
          <div
            ref={videoWrapperRef}
            className={`relative flex items-center justify-center will-change-transform transition-transform duration-75 ${
              isFullscreen ? "w-screen h-screen bg-black" : ""
            }`}
            style={{
              transform: shouldAnimate ? `scale(${scrollScale})` : "scale(1)",
              transformOrigin: "center center",
            }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              className={`w-[88vw] max-w-4xl aspect-video object-cover shadow-2xl rounded-2xl border border-border/40 cursor-pointer ${
                isFullscreen ? "!w-full !h-full !max-w-none !rounded-none !border-0 object-contain" : ""
              }`}
            >
              Tu navegador no soporta la reproducción de video.
            </video>

            {/* Barra de Controles: Liquid Glass ultra-transparente según referencia (Sin engranaje ni tiempo) */}
            <div
              className={`absolute bottom-3 left-3 right-3 z-20 flex items-center gap-2.5 bg-slate-950/25 backdrop-blur-xl border border-white/15 border-t-white/30 rounded-lg px-3 py-1.5 shadow-2xl transition-all duration-300 ${
                isFrenado || isFullscreen
                  ? "opacity-100 pointer-events-auto translate-y-0"
                  : "opacity-0 pointer-events-none translate-y-2"
              } ${isFullscreen ? "max-w-3xl mx-auto left-8 right-8 bottom-8" : ""}`}
            >
              {/* Play / Pausa */}
              <button
                type="button"
                onClick={togglePlay}
                className="w-7 h-7 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 rounded transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label={isPlaying ? "Pausar" : "Reanudar"}
                title={isPlaying ? "Pausar" : "Reanudar"}
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                ) : (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>
                )}
              </button>

              {/* Barra para adelantar y atrasar */}
              <div className="flex-1 flex items-center relative h-5 px-1 cursor-pointer">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progressPct}
                  onChange={handleSeek}
                  style={{
                    background: `linear-gradient(to right, #ffffff ${progressPct}%, rgba(255,255,255,0.25) ${progressPct}%)`
                  }}
                  className="w-full h-[3px] hover:h-[5px] rounded appearance-none cursor-pointer accent-white transition-all"
                  aria-label="Adelantar o atrasar video"
                  title="Adelantar o atrasar"
                />
              </div>

              {/* Silenciar / Activar sonido */}
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="w-7 h-7 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 rounded transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label={isMuted ? "Activar Sonido" : "Silenciar"}
                title={isMuted ? "Activar Sonido" : "Silenciar"}
              >
                {isMuted ? (
                  <svg className="w-4 h-4 text-white stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                ) : (
                  <svg className="w-4 h-4 text-white stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                )}
              </button>

              {/* Maximizar / Restaurar (4 esquinas) */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="w-7 h-7 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 rounded transition-all cursor-pointer hover:scale-105 active:scale-95"
                aria-label={isFullscreen ? "Restaurar" : "Maximizar"}
                title={isFullscreen ? "Restaurar" : "Maximizar"}
              >
                {isFullscreen ? (
                  <svg className="w-4 h-4 text-white stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
                ) : (
                  <svg className="w-4 h-4 text-white stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
