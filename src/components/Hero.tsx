import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const websiteScreenshots = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400&h=300&fit=crop",
];

const ScrollingRow = ({ direction, speed, offset = 0 }: { direction: "left" | "right"; speed: number; offset?: number }) => {
  const images = [...websiteScreenshots, ...websiteScreenshots];
  return (
    <div className="flex gap-4 whitespace-nowrap" style={{ 
      animation: `scroll-${direction} ${speed}s linear infinite`,
      animationDelay: `${offset}s`,
    }}>
      {images.map((src, i) => (
        <div key={i} className="w-[280px] h-[180px] md:w-[340px] md:h-[220px] flex-shrink-0 rounded-lg overflow-hidden">
          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const screenshotsOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.5, 0.85]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.3, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.3, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={sectionRef} className="relative flex h-screen flex-col items-center overflow-hidden px-6">
      <div className="flex h-full w-full flex-col items-center justify-center">
        {/* Scrolling website screenshots background */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-4"
          style={{ opacity: screenshotsOpacity }}
        >
          <ScrollingRow direction="left" speed={40} />
          <ScrollingRow direction="right" speed={45} offset={-2} />
          <ScrollingRow direction="left" speed={38} offset={-5} />
          <ScrollingRow direction="right" speed={42} offset={-3} />
          <ScrollingRow direction="left" speed={44} offset={-1} />
        </motion.div>

        {/* Overlay gradient — fades out on scroll to reveal screenshots */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-background"
          style={{ opacity: overlayOpacity }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

        {/* Subtle background grain */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center"
          style={{ opacity: textOpacity, scale: textScale }}
        >
          <motion.h1
            className="font-display text-6xl font-light tracking-[0.3em] text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
            initial={{ letterSpacing: "0.6em", opacity: 0 }}
            animate={{ letterSpacing: "0.3em", opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            BRAND<span className="font-normal text-[1.15em] relative -top-[0.02em]">C</span>URE
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="mx-auto mt-8 h-px bg-foreground"
          />

          <motion.p
            className="font-body mt-8 text-sm font-light tracking-[0.25em] uppercase text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            AI-Powered Branding Studio
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute bottom-12 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
            <div className="h-8 w-px bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
