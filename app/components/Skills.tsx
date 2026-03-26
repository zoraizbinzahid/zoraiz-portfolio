"use client";
import { motion, Variants } from "motion/react"; 
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import SectionHeader from "./SectionHeader"; 
import Magnetic from "./Magnetic"; 

const builder = imageUrlBuilder(client);

interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
}

interface Skill {
  _id: string;
  title: string;
  icon?: SanityImage;
}

const urlFor = (source: SanityImage) => builder.image(source);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const scaleUpTopVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0, 
    y: 100, 
    transformOrigin: "bottom" 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,  
      damping: 15,    
      mass: 1.5,      
    }
  },
};

export default function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="relative mt-40 w-full max-w-5xl px-4 mx-auto flex flex-col items-center">
      <SectionHeader title="Tech Stack" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 md:gap-12 justify-items-center mt-10"
      >
        {skills.map((skill) => (
          <motion.div 
            key={skill._id} 
            variants={scaleUpTopVariants}
            className="w-full flex justify-center"
          >
            <Magnetic>
              <div className="flex flex-col items-center gap-4 group cursor-none">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-500">
                  {skill.icon && (
                    <Image 
                      src={urlFor(skill.icon).url()} 
                      alt={skill.title} 
                      width={35}
                      height={35}
                      // FIXED: Removed grayscale classes so colors always show
                      className="object-contain transition-all duration-500"
                    />
                  )}
                </div>
                <p className="text-[9px] text-zinc-500 group-hover:text-cyan-400 font-bold uppercase tracking-[0.2em] transition-colors">
                  {skill.title}
                </p>
              </div>
            </Magnetic>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}