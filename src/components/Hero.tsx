'use client';

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden px-6 bg-[#FAFAFA]">
      <div className="flex h-full w-full flex-col items-center justify-center mt-32">
        {/* Kinetic Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center flex flex-col items-center"
        >
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-6xl font-black tracking-tight text-black sm:text-7xl md:text-8xl lg:text-9xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            >
              Stop Building
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-6xl font-black tracking-tight text-black sm:text-7xl md:text-8xl lg:text-9xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
            >
              Alone.
            </motion.h1>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="mx-auto mt-12 h-px bg-black/20"
          />

          <motion.p
            className="font-body mt-8 max-w-lg text-sm font-medium tracking-[0.1em] uppercase text-black/60 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            The portfolio platform where student founders meet, build, and ship. No resumes. Just proof.
          </motion.p>

          {/* Glassmorphic CTA */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-16 group relative px-8 py-4 bg-white/50 backdrop-blur-md border border-black/10 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-all" />
            <span className="relative z-10 font-body text-xs font-bold tracking-[0.2em] uppercase text-black">
              Claim Your Username
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
