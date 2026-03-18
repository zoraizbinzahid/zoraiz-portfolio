"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export default function Background() {
  // 1. Use a simple state but initialize it inside useEffect with a small trick
  const [isRendered, setIsRendered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 28 });

  useEffect(() => {
    // This solves the "Cascading Render" error by moving the update
    // to the next tick of the event loop.
    const timeout = setTimeout(() => setIsRendered(true), 0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, [mouseX, mouseY]);

  // If we aren't on the client yet, return a plain black div
  // This matches the server-side HTML exactly, so NO errors occur.
  if (!isRendered) {
    return <div className="fixed inset-0 bg-[#09090b] -z-10" />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#09090b]">
      {/* 1. THE TECH GRID */}
      <div 
        className="absolute inset-0 opacity-[0.2]" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px' 
        }} 
      />

      {/* 2. THE SPOTLIGHT */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"
        style={{
          left: springX,
          top: springY,
          x: "-50%",
          y: "-50%",
        }}
      />

      {/* 3. VIGNETTE */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: `radial-gradient(circle at center, transparent 30%, #09090b 100%)` 
        }} 
      />
    </div>
  );
}