'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Placeholder data representing user "Quest Cards"
const projects = [
  { id: 1, title: "Velocity", stack: "Rust, Solana" },
  { id: 2, title: "Nexus", stack: "Next.js, Python" },
  { id: 3, title: "Lumina", stack: "WebGL, React" },
  { id: 4, title: "Orbit", stack: "Go, GraphQL" },
  { id: 5, title: "Aura", stack: "Framer, TS" },
  { id: 6, title: "Core", stack: "C++, CUDA" },
  { id: 7, title: "Void", stack: "Solidity, Vyper" },
];

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2));

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="bg-transparent relative overflow-hidden h-screen flex flex-col items-center justify-center pt-32 pb-48">
      {/* Title */}
      <div className="absolute top-24 w-full text-center z-50">
        <p className="font-body text-xs font-bold tracking-[0.4em] uppercase text-black/40 mb-2">The Marketplace</p>
        <h2 className="font-display text-4xl tracking-tight text-black">Living Portfolio</h2>
      </div>

      {/* Container for the 3D Carousel matching the arched reference */}
      <div className="relative w-full h-[60vh] max-h-[600px] flex items-center justify-center perspective-[1200px]">
        {projects.map((proj, i) => {
          let diff = i - activeIndex;
          if (diff > Math.floor(projects.length / 2)) diff -= projects.length;
          if (diff < -Math.floor(projects.length / 2)) diff += projects.length;

          const absDiff = Math.abs(diff);

          if (absDiff > 3) return null;

          // Arched coverflow math
          const x = diff * 140; // horizontal spacing between cards
          const y = absDiff * 60; // pushes side cards down creating the curve
          const scale = 1 - (absDiff * 0.15); // scales down side cards
          const zIndex = 50 - absDiff; // center is always top
          const opacity = 1 - (absDiff * 0.2); // fade the outer edges

          return (
            <motion.div
              key={proj.id}
              animate={{
                x,
                y,
                scale,
                zIndex,
                opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                mass: 1
              }}
              className={`absolute w-[260px] h-[360px] md:w-[320px] md:h-[420px] origin-top bg-white border border-black/10 shadow-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer group`}
              onClick={() => setActiveIndex(i)}
            >
              {/* Card "Image" Placeholder */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />

              {/* Glow Effect matching Cofolio prompt requirement */}
              <div className="absolute -inset-4 bg-gradient-to-r from-lime-400 to-fuchsia-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-full" />

              {/* Internal Content Placeholder */}
              <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white w-[90%] h-[90%] shadow-sm">
                <h3 className="font-display text-4xl font-bold tracking-tighter text-black mt-auto">
                  {proj.title}
                </h3>
                <div className="w-full h-px bg-black/10 my-4" />
                <p className="font-body text-[9px] uppercase tracking-widest text-black/60 mb-auto">
                  Tech Stack: <br />
                  <span className="font-bold text-black">{proj.stack}</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls under the carousel */}
      <div className="absolute bottom-32 z-50 flex gap-4">
        <button
          onClick={handlePrev}
          className="w-14 h-14 rounded-full bg-white border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-md group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={handleNext}
          className="w-14 h-14 rounded-full bg-white border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all shadow-md group"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Bottom reference text links from user image */}
      <div className="absolute bottom-12 z-20 flex gap-4 md:gap-8 text-[9px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-black/40 font-body">
        <span className="cursor-pointer hover:text-black transition-colors">Video Studio™</span>
        <span className="cursor-pointer hover:text-black transition-colors">APPEL</span>
        <span className="cursor-pointer hover:text-black transition-colors">Works</span>
        <span className="cursor-pointer hover:text-black transition-colors">Artifacts</span>
        <span className="cursor-pointer hover:text-black transition-colors">About</span>
        <span className="cursor-pointer hover:text-black transition-colors">Contact</span>
      </div>
    </section>
  );
};

export default Portfolio;
