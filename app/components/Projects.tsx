"use client";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "motion/react";
import Image from 'next/image';
import SectionHeader from "./SectionHeader";

interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  projectUrl?: string;
}

// 1. THE STAGGER CONTAINER (Same as Skills)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // That slow, rhythmic wave
    },
  },
};

// 2. THE REVEAL ANIMATION (Same as Skills "Scale-Up-Top")
const projectRevealVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    y: 100, 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80, 
      damping: 20,
      mass: 1.2
    }
  },
};

function ProjectCard({ project }: { project: Project }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      variants={projectRevealVariants} // Apply the reveal variant here
      onClick={() => project.projectUrl && window.open(project.projectUrl, "_blank")}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      whileHover={{ scale: 1.02 }} 
      className="group min-w-[88vw] md:min-w-0 snap-center relative p-5 bg-zinc-900/20 backdrop-blur-xl rounded-[2.5rem] border border-zinc-800/50 hover:border-cyan-400/40 transition-colors duration-500 cursor-pointer overflow-hidden"
    >
      <div style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }} className="relative z-10">
        <div className="absolute inset-0 bg-cyan-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem] blur-3xl pointer-events-none" />

        {project.imageUrl && (
          <div className="relative w-full h-64 md:h-52 mb-6 overflow-hidden rounded-[1.8rem] border border-zinc-800/30">
            <Image 
              src={project.imageUrl} 
              alt={project.title}
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
          </div>
        )}

        <div className="px-2 pb-2" style={{ transform: "translateZ(40px)" }}>
          <div className="flex justify-between items-start">
            <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-cyan-400 transition-colors duration-500 tracking-tighter">
              {project.title}
            </h3>
            <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xl">↗</span>
          </div>
          
          <p className="text-zinc-400 mt-4 text-sm line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          <div className="flex gap-2 mt-6 flex-wrap">
            {project.techStack?.map((tech) => (
              <span 
                key={tech} 
                className="text-[9px] px-3 py-1 bg-zinc-950 text-cyan-400/80 font-bold uppercase tracking-widest rounded-full border border-zinc-800/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative mt-60 w-full max-w-5xl px-4 overflow-visible">
      <SectionHeader title="Selected Works" />

      <motion.div 
        variants={containerVariants} // Trigger stagger here
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-2 gap-10 mt-16 pb-10 perspective-1000"
      >
        {projects?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </motion.div>
    </section>
  );
}