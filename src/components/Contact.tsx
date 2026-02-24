import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="bg-primary px-6 py-32 md:py-48" ref={ref}>
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          className="font-display text-4xl font-light tracking-wide text-primary-foreground md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Let's Build Something
          <br />
          <span className="italic">Beautiful</span>
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "80px" } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-10 h-px bg-primary-foreground/30"
        />

        <motion.p
          className="font-body mt-10 text-sm font-light tracking-wide text-primary-foreground/60"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Ready to transform your brand? Let's talk.
        </motion.p>

        <motion.a
          href="mailto:hello@brandcure.in"
          className="mt-8 inline-block border border-primary-foreground/20 px-12 py-5 font-body text-xs tracking-[0.3em] uppercase text-primary-foreground transition-all duration-500 hover:bg-primary-foreground hover:text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Get in Touch
        </motion.a>
      </div>

      <motion.div
        className="mx-auto mt-32 max-w-6xl border-t border-primary-foreground/10 pt-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
      >
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-display text-lg tracking-[0.2em] text-primary-foreground/80">
            BRAND<span className="text-[1.15em] relative -top-[0.01em]">C</span>URE
          </p>
          <p className="font-body text-[10px] tracking-[0.2em] text-primary-foreground/30">
            © 2026 BrandCure. All rights reserved.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
