"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ExternalLink } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description?: string;
  projectUrl?: string; 
  image?: {
    asset: { _ref: string; _type: string; };
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
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative group h-[520px] w-full perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(50px)" }} 
        className="glass-card relative h-full w-full rounded-[32px] p-5 shadow-2xl overflow-hidden flex flex-col transition-all duration-500 group-hover:border-cyan-500/40"
      >
        <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-white/5 grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700">
          {project.image && (
            <Image 
              src={urlFor(project.image).url()} 
              alt={project.title} 
              fill 
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
            />
          )}
          
          {project.projectUrl && (
            <a 
              href={project.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} 
              className="absolute top-3 right-3 p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-cyan-500 hover:text-black z-50 shadow-lg"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <p className="text-cyan-400 font-mono text-[9px] uppercase tracking-[0.3em]">Case Study</p>
          <h3 className="text-xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed">
            {project.description || "Building high-performance digital experiences with modern tech."}
          </p>
          
          {/* Added consistent button here too */}
          {project.projectUrl && (
            <div className="mt-4">
              <a 
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                View Live Project ↗
              </a>
            </div>
          )}
        </div>

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