"use client";
import { motion } from "motion/react";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="relative w-full flex flex-col items-center py-12 overflow-visible">
      {/* THE ATMOSPHERIC BACKGROUND FOG */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[250px] bg-cyan-500/[0.05] rounded-full pointer-events-none -z-10"
        style={{ filter: "blur(100px)" }}
      />
      
      <div className="relative z-10 flex flex-col items-center group">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          // THIS HANDLES THE HOVER COLOR SHIFT & INTENSE GLOW
          whileHover={{
            color: "#22d3ee", // Cyan-400
            textShadow: "0 0 30px rgba(34,211,238,0.6), 0 0 60px rgba(34,211,238,0.3)"
          }}
          className="text-white/90 text-3xl md:text-5xl font-black tracking-tight uppercase text-center transition-all duration-500 cursor-default"
          style={{ 
            // Default "Resting" Glow
            textShadow: "0 0 20px rgba(34,211,238,0.15)" 
          }}
        >
          {title}
        </motion.h2>
        
        {/* Animated accent line that grows and brightens on hover */}
        <motion.div 
          initial={{ width: "30px", opacity: 0.3 }}
          whileInView={{ opacity: 1 }}
          className="h-[2px] bg-cyan-400 mt-4 transition-all duration-500 group-hover:w-20 group-hover:bg-cyan-300 group-hover:shadow-[0_0_15px_#22d3ee]"
        />
      </div>
    </div>
  );
}