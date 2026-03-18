"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ExternalLink } from "lucide-react"; // Make sure to install lucide-react

interface Project {
  _id: string;
  title: string;
  description?: string; // Added field
  liveUrl?: string;     // Added field
  image?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  tags?: string[];
}

export default function ProjectCard({ project }: { project: Project }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative group h-[520px] w-full perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="glass-card relative h-full w-full rounded-[32px] p-5 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 group-hover:border-cyan-500/40"
      >
        {/* Project Thumbnail Area */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/5 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700">
          {project.image && (
            <Image 
              src={urlFor(project.image).url()} 
              alt={project.title} 
              fill 
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/60 via-transparent to-transparent" />
          
          {/* Live Link Overlay */}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute top-3 right-3 p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500 hover:text-black"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>

        {/* Project Info */}
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-cyan-400 font-mono text-[9px] uppercase tracking-[0.3em]">
              Case Study
            </p>
          </div>
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
            {project.description || "Building high-performance digital experiences with modern tech."}
          </p>
        </div>

        {/* Tags at Bottom */}
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {project.tags?.slice(0, 3).map((tag: string) => (
            <span key={tag} className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest px-2.5 py-1 bg-white/5 rounded-full border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}