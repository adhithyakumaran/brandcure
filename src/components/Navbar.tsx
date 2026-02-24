import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <a href="#" className="font-display text-sm tracking-[0.3em] text-primary-foreground">
        BC
      </a>
      <a
        href="#contact"
        className="font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground transition-opacity duration-300 hover:opacity-60"
      >
        Contact
      </a>
    </motion.nav>
  );
};

export default Navbar;
