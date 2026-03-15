'use client';

import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 mix-blend-difference"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Replaced logo icon with pure typography as requested */}
      <a href="#" className="font-display text-lg tracking-[0.4em] text-white">
        BRANDCURE
      </a>
      <a
        href="#contact"
        className="font-body text-[10px] tracking-[0.3em] uppercase text-white transition-opacity duration-300 hover:opacity-60"
      >
        Contact
      </a>
    </motion.nav>
  );
};

export default Navbar;
