"use client";

import React from "react";
import ShimmerText from "@/components/ui/shimmer-text";
import IntroAnimation from "@/components/ui/scroll-morph-hero";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 gap-8 bg-slate-950 text-white rounded-xl border border-slate-800">
      <div className="text-center">
        <ShimmerText className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
          Capital Nacional Del Deportista
        </ShimmerText>
        <p className="mt-2 text-sm text-slate-400">
          Río Tercero · Shimmer Text Demo
        </p>
      </div>

      <div className="text-center pt-4 border-t border-slate-800 w-full max-w-md">
        <ShimmerText variant="sky" className="text-2xl font-bold tracking-tight">
          Introducing the future
        </ShimmerText>
      </div>
    </div>
  );
}

export function ShimmerTextDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <ShimmerText className="text-4xl font-bold tracking-tight">Introducing the future</ShimmerText>
    </div>
  );
}

export function ScrollMorphDemo() {
  return (
    <div className="w-full h-[800px] border border-slate-800 rounded-xl overflow-hidden relative bg-slate-950">
      <IntroAnimation />
    </div>
  );
}
