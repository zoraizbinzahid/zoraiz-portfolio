"use client";
import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      
      {/* 1. SUBTLE BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/[0.05] blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        {/* THE NAME: Professional & Clean Scaling */}
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-2">
          Zoraiz Bin Zahid
        </h1>

        {/* 2. TYPING ANIMATION: Professional Sequences */}
        <div className="h-12 md:h-14 flex items-center justify-center">
          <TypeAnimation
            sequence={[
              "Full Stack Web Developer",
              2000,
              "React & Django Specialist with MongoDB",
              2000,
              "Next.js & Django Developer",
              2000,
              "Interactive UI/UX with Framer Motion",
              2000,
              "Modern Styling with Tailwind CSS",
              2000,
              "Architecting Scalable Digital Solutions",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-cyan-400 text-lg md:text-2xl font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          />
        </div>
      </motion.div>

      {/* 3. REFINED INTRODUCTION (No Buttons) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-xl mt-8"
      >
        <p className="text-zinc-500 text-base md:text-lg font-medium leading-relaxed tracking-tight">
          Building scalable web applications with a focus on 
          <span className="text-zinc-300 font-semibold"> clean architecture </span> 
          and <span className="text-zinc-300 font-semibold"> seamless user experiences</span>.
        </p>
      </motion.div>
    </section>
  );
}