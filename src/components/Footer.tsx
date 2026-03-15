'use client';

import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="bg-[#050505] text-[#FAFAFA] pt-32 pb-8 px-8 md:px-12 lg:px-16 overflow-hidden relative z-20 flex flex-col justify-between min-h-screen border-t border-black/10">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 w-full z-10">

                <div className="flex flex-col gap-4 max-w-2xl">
                    <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-white/50">Say Hello</p>
                    <h2 className="font-display text-4xl md:text-6xl font-light tracking-tighter hover:italic transition-all duration-300 cursor-pointer">
                        hello@brandcure.com
                    </h2>
                    <p className="font-body text-xs md:text-sm tracking-[0.1em] text-white/60 leading-relaxed mt-4">
                        We partner with ambitious startups and enterprises to build premium digital experiences. No resumes. Just proof.
                    </p>
                </div>

                <div className="flex flex-col gap-6 items-start md:items-end text-left md:text-right">
                    <button className="bg-white text-black rounded-full px-12 py-5 font-body text-xs tracking-[0.3em] font-medium uppercase hover:bg-white/90 hover:scale-105 transition-all w-full md:w-auto shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        Hire the Studio
                    </button>
                    <button className="bg-transparent border border-white/20 text-white rounded-full px-12 py-5 font-body text-xs tracking-[0.3em] font-medium uppercase hover:bg-white/5 hover:border-white/50 hover:scale-105 transition-all w-full md:w-auto">
                        Join the Team
                    </button>
                </div>

            </div>

            {/* Address & Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full mt-24 mb-16 text-white/50 font-body text-[10px] tracking-[0.2em] uppercase z-10">
                <div className="flex flex-col gap-2">
                    <span className="text-white/30 mb-2">Location</span>
                    <span>200 Blvd of the Americas</span>
                    <span>Suite 202</span>
                    <span>Lakewood NJ 08701</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-white/30 mb-2">Connect</span>
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter (X)</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-white/30 mb-2">Legal</span>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>

            {/* Massive Typography spanning the bottom */}
            <div className="w-full mt-auto pt-12 pb-4 flex justify-center items-center relative z-0">
                {/* Changed to a refined Display font styling matching the premium vibe */}
                <h1 className="font-display font-medium text-[16vw] leading-[0.75] tracking-[-0.04em] text-white text-center whitespace-nowrap overflow-hidden opacity-90">
                    Brandcure.
                </h1>
            </div>

            {/* Bottom Final Row */}
            <div className="flex justify-between items-center text-[9px] font-body tracking-[0.4em] uppercase text-white/30 pt-6 border-t border-white/10 z-10 relative">
                <div>
                    © {new Date().getFullYear()} BRANDCURE.
                </div>
                <div className="hidden md:block">
                    ALL RIGHTS RESERVED.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
