"use client";

import React from "react";
import IntroAnimation, { ScrollMorphHero } from "./scroll-morph-hero";

export default function Demo() {
  return (
    <div className="w-full h-[800px] border border-slate-800 rounded-xl overflow-hidden relative bg-slate-950">
      <IntroAnimation />
    </div>
  );
}

export { Demo as ScrollMorphHeroDemo };
