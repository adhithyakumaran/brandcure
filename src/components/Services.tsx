import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  { title: "AI Ads", desc: "Performance-driven ad creatives powered by artificial intelligence." },
  { title: "AI UGC", desc: "Authentic user-generated content at scale, crafted by AI." },
  { title: "Web Design", desc: "Stunning, conversion-focused websites that tell your brand story." },
  { title: "Branding", desc: "Complete brand identity systems built for the modern era." },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="px-6 py-32 md:py-48" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          What We Do
        </motion.p>

        <motion.h2
          className="font-display mt-4 text-4xl font-light tracking-wide text-foreground md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Services
        </motion.h2>

        <div className="mt-20 grid gap-0 md:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group border-t border-border py-12 pr-12 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
            >
              <span className="font-body text-[10px] tracking-[0.3em] text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="font-display mt-4 text-3xl font-light text-foreground transition-all duration-500 group-hover:tracking-wider md:text-4xl">
                {service.title}
              </h3>
              <p className="font-body mt-4 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
