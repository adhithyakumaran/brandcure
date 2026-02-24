import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="px-6 py-32 md:py-48" ref={ref}>
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Pricing
        </motion.p>

        <motion.h2
          className="font-display mt-4 text-4xl font-light tracking-wide text-foreground md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Simple & Transparent
        </motion.h2>

        <motion.div
          className="mx-auto mt-20 max-w-md border border-border p-12 md:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
            Landing Page
          </span>
          <div className="mt-6 flex items-baseline justify-center gap-1">
            <span className="font-display text-6xl font-light text-foreground md:text-7xl">₹3,500</span>
          </div>
          <p className="font-body mt-4 text-sm font-light text-muted-foreground">
            Single page, fully responsive, conversion-optimized
          </p>
          <div className="mt-4 space-y-2">
            {["Custom Design", "Mobile Responsive", "SEO Optimized", "Fast Delivery"].map((feature) => (
              <p key={feature} className="font-body text-xs tracking-wide text-muted-foreground/80">
                {feature}
              </p>
            ))}
          </div>
          <motion.a
            href="#contact"
            className="mt-10 inline-block bg-primary px-10 py-4 font-body text-xs tracking-[0.3em] uppercase text-primary-foreground transition-all duration-300 hover:tracking-[0.4em]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
