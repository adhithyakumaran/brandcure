import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  { name: "Grewbie", type: "SaaS Platform", url: "https://www.grewbie.com/" },
  { name: "SRP Travels", type: "Landing Page", url: "https://srp-travels-web-page.vercel.app/" },
  { name: "Houses of Medusa", type: "E-Commerce", url: "https://www.housesofmedusa.com/" },
  { name: "ChatPilot", type: "Landing Page", url: "https://chatpilot.co.in/" },
  { name: "Better Day Tours", type: "Landing Page", url: "https://betterdaytours.vercel.app/" },
];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-primary px-6 py-32 md:py-48" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="font-body text-[10px] tracking-[0.4em] uppercase text-primary-foreground/60"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Selected Work
        </motion.p>

        <motion.h2
          className="font-display mt-4 text-4xl font-light tracking-wide text-primary-foreground md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Portfolio
        </motion.h2>

        <div className="mt-20 space-y-0">
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-t border-primary-foreground/10 py-8 transition-all duration-500 hover:pl-4"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
            >
              <div className="flex items-baseline gap-6">
                <span className="font-body text-[10px] tracking-[0.3em] text-primary-foreground/40">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl font-light text-primary-foreground transition-all duration-500 group-hover:tracking-wider md:text-4xl">
                  {project.name}
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/40">
                  {project.type}
                </span>
                <motion.span
                  className="text-primary-foreground/40 transition-all duration-300 group-hover:text-primary-foreground group-hover:translate-x-1"
                >
                  →
                </motion.span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
