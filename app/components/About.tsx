"use client";
import SectionHeader from "./SectionHeader";
import { motion } from "motion/react";
import Image from "next/image";

interface AboutProps {
  bio: string;
  profileImage: string; 
}

export default function About({ bio, profileImage }: AboutProps) {
  return (
    <section id="about" className="relative mt-40 w-full max-w-5xl px-4 flex flex-col items-center">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/[0.04] blur-[120px] rounded-full pointer-events-none -z-10" />

      <SectionHeader title="About Me" />

      <div className="flex flex-col md:flex-row items-center gap-16 mt-16 w-full relative z-10">
        
        {/* Profile Picture: Very slow scale and fade */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ 
            duration: 1.5, 
            ease: [0.22, 1, 0.36, 1], // Quintic ease-out for a smooth finish
          }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-full group"
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-zinc-950 border-2 border-zinc-800 transition-colors duration-700 group-hover:border-cyan-400/40 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <Image 
              src={profileImage} 
              alt="Profile" 
              width={400} 
              height={400} 
              className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000" 
            />
          </div>
        </motion.div>

        {/* Bio Text: Slow, noticeable drift-up */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4 // Delayed start so the image reveals first
          }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex-1 text-center md:text-left"
        >
          <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed tracking-tight">
  {bio}
</p>
        </motion.div>
      </div>
    </section>
  );
}