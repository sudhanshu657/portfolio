"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/index";

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  },
};

const Skills = () => {
  return (
    <section className="py-8 text-center mt-0 scroll-m-10" id="skills">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Skills</h2>
      <div className="flex flex-wrap justify-center gap-12 md:gap-20 mt-10 px-4">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            animate={floatAnimation}
            className="p-4 rounded-xl shadow-lg bg-card/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <img 
              src={skill.src} 
              alt={skill.alt} 
              width={64} 
              height={64} 
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
            <p className="mt-2 text-xs text-gray-400 font-medium">{skill.alt}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
