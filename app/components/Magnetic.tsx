"use client";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";

export default function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    
    // Safety check to ensure the ref exists
    if (!ref.current) return;

    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate the distance from the center of the element to the mouse
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // 0.3 is the "magnetic pull" strength — lower is subtler, higher is stronger
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}