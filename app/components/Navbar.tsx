"use client";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const width = useTransform(scrollY, [0, 100], ["max-content", "min(95%, 500px)"]);
  const top = useTransform(scrollY, [0, 100], ["24px", "12px"]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjusting the offset to 100 makes detection more accurate
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Works", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  // --- NEW: THE FIX FOR NAVIGATION ---
  const handleNavClick = (id: string) => {
    if (id === "home") {
      // Force scroll to absolute 0 for Home
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Standard scroll for other sections
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false); // Close mobile menu on click
  };

  return (
    <motion.header 
      style={{ width, top }}
      className="fixed left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center"
    >
      <motion.nav 
        className="flex items-center justify-between w-full px-6 py-3 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 shadow-[0_0_50px_-12px_rgba(34,211,238,0.2)] rounded-full"
      >
        {/* LOGO / ACTIVE SECTION NAME (Mobile Only) */}
        <div className="md:hidden text-cyan-400 text-[10px] font-black tracking-widest uppercase">
          {activeSection === 'home' ? 'Zoraiz' : activeSection}
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)} // Updated handler
              className="group relative flex flex-col items-center gap-1"
            >
              <span className={`text-[10px] uppercase tracking-[0.3em] font-extrabold transition-all duration-300
                ${activeSection === item.id ? 'text-cyan-400' : 'text-zinc-500 hover:text-zinc-300'}`}>
                {item.name}
              </span>
              {activeSection === item.id && (
                <motion.div layoutId="activeIndicator" className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
              )}
            </button>
          ))}
        </div>

        {/* BURGER BUTTON */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }} className="w-5 h-0.5 bg-zinc-300 rounded-full" />
          <motion.div animate={{ opacity: isOpen ? 0 : 1 }} className="w-5 h-0.5 bg-zinc-300 rounded-full" />
          <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }} className="w-5 h-0.5 bg-zinc-300 rounded-full" />
        </button>
      </motion.nav>

      {/* MOBILE DROP DOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 10, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden w-full bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/80 rounded-3xl p-6 mt-2 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)} // Updated handler
                className={`text-sm uppercase tracking-[0.4em] font-bold text-center py-2
                  ${activeSection === item.id ? 'text-cyan-400' : 'text-zinc-500'}`}
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}