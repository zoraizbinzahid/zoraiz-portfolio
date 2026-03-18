"use client";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const email = "zoraizbinzahid@gmail.com";
  const githubLink = "https://github.com/zoraizbinzahid";
  const linkedinLink = "https://www.linkedin.com/in/zoraiz-bin-zahid-4863b91b4/";
  
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative pt-40 pb-10 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* SECTION OVERLAY */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-10">
        <span className="text-9xl font-black text-zinc-800 tracking-tighter">03</span>
        <p className="text-zinc-500 text-[10px] tracking-[0.8em] font-bold mt-[-20px]">SECTION_03</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center mb-16 group cursor-default"
      >
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase transition-all duration-500 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
          Contact Me<span className="text-cyan-400">.</span>
        </h2>
        <motion.div 
          initial={{ width: 48 }}
          whileInView={{ width: 48 }}
          className="h-1 bg-cyan-400 mt-4 rounded-full shadow-[0_0_15px_#22d3ee] transition-all duration-500 group-hover:w-32 group-hover:shadow-[0_0_25px_#22d3ee]" 
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        className="glass-card relative z-10 p-10 md:p-16 rounded-[40px] border border-white/5 max-w-2xl mx-6"
      >
        <h3 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight uppercase tracking-tighter">
          Let&apos;s build something <span className="text-cyan-400 glow-text-cyan italic px-2">extraordinary.</span>
        </h3>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          {/* PRIMARY BUTTON: Standard Mailto (Most Reliable) */}
          <a 
            href={`mailto:${email}`}
            className="group relative inline-flex items-center gap-3 bg-white text-black font-black py-4 px-10 rounded-full transition-all hover:scale-105 hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
          >
            <Mail size={18} />
            Send Email
          </a>

          {/* SECONDARY BUTTON: Copy to Clipboard (The "Safe" Fallback) */}
          <button 
            onClick={handleCopy}
            className="group inline-flex items-center gap-3 border border-white/10 text-zinc-400 font-bold py-4 px-10 rounded-full transition-all hover:bg-white/5 hover:text-white"
          >
            {copied ? <Check size={18} className="text-cyan-400" /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy Address"}
          </button>
        </div>

        {/* SOCIAL LINKS */}
        <div className="flex justify-center gap-4 mt-8">
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-cyan-400/50 transition-all">
            <Github size={24} />
          </a>
          <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-cyan-400/50 transition-all">
            <Linkedin size={24} />
          </a>
        </div>
      </motion.div>

      <footer className="mt-32 text-zinc-800 text-[10px] uppercase tracking-[0.8em] font-black pb-10">
        © 2026 Zoraiz Bin Zahid — Lahore, PK
      </footer>
      
    </section>
  );
}