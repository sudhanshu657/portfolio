// "use client"

// import { motion, useInView } from "framer-motion"
// import { useRef } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"

// const skills = [
//   { name: "React/Next.js", level: 95, color: "from-blue-500 to-cyan-500" },
//   { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-400" },
//   { name: "Framer Motion", level: 85, color: "from-purple-500 to-pink-500" },
//   { name: "Three.js", level: 80, color: "from-green-500 to-emerald-500" },
//   { name: "Tailwind CSS", level: 95, color: "from-teal-500 to-cyan-500" },
//   { name: "Node.js", level: 85, color: "from-green-600 to-green-400" },
// ]

// const techIcons = [
//   { name: "React", icon: "⚛️", color: "text-blue-400", delay: 0 },
//   { name: "Next.js", icon: "▲", color: "text-white", delay: 0.2 },
//   { name: "TypeScript", icon: "TS", color: "text-blue-500", delay: 0.4 },
//   { name: "Node.js", icon: "🟢", color: "text-green-500", delay: 0.6 },
//   { name: "Tailwind", icon: "🎨", color: "text-cyan-400", delay: 0.8 },
//   { name: "Three.js", icon: "🎲", color: "text-green-400", delay: 1.0 },
// ]

// const tools = [
//   "React",
//   "Next.js",
//   "TypeScript",
//   "Framer Motion",
//   "Three.js",
//   "Tailwind CSS",
//   "Node.js",
//   "Express",
//   "MongoDB",
//   "PostgreSQL",
//   "Git",
//   "Docker",
//   "Figma",
//   "Adobe Creative Suite",
//   "Vercel",
//   "AWS",
// ]

// export function Skills() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, margin: "-100px" })

//   return (
//     <section id="skills" className="py-20 relative overflow-hidden">
//       <div className="absolute inset-0 pointer-events-none">
//         {techIcons.map((tech, index) => (
//           <motion.div
//             key={tech.name}
//             initial={{ opacity: 0, y: 100, rotate: 0 }}
//             animate={
//               isInView
//                 ? {
//                     opacity: 0.1,
//                     y: 0,
//                     rotate: 360,
//                     x: [0, 50, -50, 0],
//                   }
//                 : { opacity: 0, y: 100, rotate: 0 }
//             }
//             transition={{
//               duration: 20,
//               delay: tech.delay,
//               repeat: Number.POSITIVE_INFINITY,
//               repeatType: "reverse",
//               ease: "linear",
//             }}
//             className={`absolute text-6xl ${tech.color}`}
//             style={{
//               left: `${10 + index * 15}%`,
//               top: `${20 + (index % 3) * 20}%`,
//             }}
//           >
//             {tech.icon}
//           </motion.div>
//         ))}
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         <motion.div
//           ref={ref}
//           initial={{ opacity: 0, y: 50 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl md:text-5xl font-bold font-work-sans mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//             Skills & Expertise
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
//             A comprehensive toolkit of modern technologies and frameworks to build exceptional digital experiences.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-2 gap-12 mb-16">
//           {/* Skill Levels */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
//               <CardContent className="p-8">
//                 <h3 className="text-2xl font-bold mb-8 font-work-sans">Technical Proficiency</h3>
//                 <div className="space-y-6">
//                   {skills.map((skill, index) => (
//                     <motion.div
//                       key={skill.name}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//                       transition={{ duration: 0.6, delay: index * 0.1 }}
//                       className="group"
//                     >
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="font-medium group-hover:text-primary transition-colors">{skill.name}</span>
//                         <span className="text-sm text-muted-foreground">{skill.level}%</span>
//                       </div>
//                       <div className="relative">
//                         <Progress value={isInView ? skill.level : 0} className="h-3 bg-muted" />
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
//                           transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
//                           className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${skill.color} shadow-lg`}
//                         />
//                         <motion.div
//                           initial={{ width: 0, opacity: 0 }}
//                           animate={isInView ? { width: `${skill.level}%`, opacity: 0.5 } : { width: 0, opacity: 0 }}
//                           transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
//                           className={`absolute top-0 left-0 h-3 rounded-full bg-gradient-to-r ${skill.color} blur-sm`}
//                         />
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Tools & Technologies */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
//               <CardContent className="p-8">
//                 <h3 className="text-2xl font-bold mb-8 font-work-sans">Tools & Technologies</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {tools.map((tool, index) => (
//                     <motion.span
//                       key={tool}
//                       initial={{ opacity: 0, scale: 0, rotateY: 180 }}
//                       animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0, rotateY: 180 }}
//                       transition={{ duration: 0.6, delay: index * 0.05 }}
//                       whileHover={{
//                         scale: 1.1,
//                         rotateY: 360,
//                         boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
//                       }}
//                       className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary rounded-full text-sm font-medium hover:from-primary/20 hover:to-accent/20 transition-all cursor-default border border-primary/20 backdrop-blur-sm"
//                     >
//                       {tool}
//                     </motion.span>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="text-center"
//         >
//           <h3 className="text-2xl font-bold mb-8 font-work-sans">Core Technologies</h3>
//           <div className="flex justify-center items-center gap-8 flex-wrap">
//             {techIcons.map((tech, index) => (
//               <motion.div
//                 key={tech.name}
//                 initial={{ opacity: 0, scale: 0, y: 50 }}
//                 animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 50 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 + 0.8 }}
//                 whileHover={{
//                   scale: 1.2,
//                   y: -10,
//                   rotate: [0, -10, 10, 0],
//                   transition: { duration: 0.3 },
//                 }}
//                 className="group cursor-pointer"
//               >
//                 <div className="relative">
//                   <motion.div
//                     animate={{
//                       y: [0, -10, 0],
//                       rotate: [0, 5, -5, 0],
//                     }}
//                     transition={{
//                       duration: 3,
//                       repeat: Number.POSITIVE_INFINITY,
//                       delay: index * 0.2,
//                     }}
//                     className={`text-4xl ${tech.color} group-hover:drop-shadow-lg transition-all`}
//                   >
//                     {tech.icon}
//                   </motion.div>
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     whileHover={{ opacity: 1 }}
//                     className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-muted-foreground whitespace-nowrap"
//                   >
//                     {tech.name}
//                   </motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }




// //new code
// "use client";

// import { motion, TargetAndTransition } from "framer-motion";
// import Image from "next/image";

// const skills = [
//     { src: "/api.png", alt: "Java" },
//     { src: "/c.png", alt: "C" },
//     { src: "/html.png", alt: "Html" },
//     { src: "/java(2).png", alt: "CSS" },
//     { src: "/js(2).png", alt: "Javascript" },
//     { src: "/re.svg", alt: "React" },
//     { src: "/mongo.png", alt: "MongoDB" },
//     { src: "/nodejs.png", alt: "Node.js" },
//     { src: "/exp.svg", alt: "Express" },
//     { src: "/tail.svg", alt: "TailwindCSS" },
//     { src: "/fm.svg", alt: "Framer Motion" },
//     { src: "/three.svg", alt: "Threejs" },
//     { src: "/next.svg", alt: "Nextjs" },
//     { src: "/git(2).svg", alt: "Git" },
//     { src: "/typescript.svg", alt: "Typescipt" },
//     { src: "/api.png", alt: "API" },
//     { src: "/mysql(2).png", alt: "MySQL" },
// ];

// const floatAnimation: TargetAndTransition = {
//     y: [0, -10, 0], 
//     transition: {
//         duration: 3,
//         repeat: Infinity,
//         repeatType: "mirror",
//         ease: "easeInOut",
//     },
// };

// const Skills = () => {
//     return (
//         <section className=" py-16 text-center mt-10 scroll-m-10" id="skills">
//             <h2 className="text-5xl font-bold text-white">Skills</h2>
//             <div className="flex flex-wrap justify-center gap-20 mt-20">
//                 {skills.map((skill, index) => (
//                     <motion.div
//                         key={index}
//                         animate={floatAnimation}
//                         className="p-4 rounded-xl shadow-lg"
//                     >
//                         <Image src={skill.src} alt={skill.alt} width={64} height={64} />
//                     </motion.div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default Skills;


//new code 
import React from "react";
import { motion } from "framer-motion";

const skills = [

  { src: "/c.png", alt: "C" },
  { src: "/html (2).png", alt: "Html" },
  { src: "/java (2).png", alt: "CSS" },
  { src: "/js (2).png", alt: "Javascript" },
  { src: "/react (2).png", alt: "React" },
  { src: "/mongo03.svg", alt: "MongoDB" },
  { src: "/nodejs.png", alt: "Node.js" },
  { src: "/express (2).png", alt: "Express" },
  { src: "/tailwind.svg", alt: "TailwindCSS" },
  { src: "/database (2).png", alt: "Framer Motion" },
  { src: "/css (1).png", alt: "Threejs" },
  { src: "/next03.svg", alt: "Nextjs" },
  { src: "/github03.svg", alt: "Git" },
  { src: "/typescript.png", alt: "Typescript" },
  { src: "/api03.svg", alt: "API" },
  { src: "/mysql03.svg", alt: "MySQL" },
];

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
    <section className="py-16 text-center mt-10 scroll-m-10" id="skills">
      <h2 className="text-5xl font-bold text-white">Skills</h2>
      <div className="flex flex-wrap justify-center gap-20 mt-20">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            animate={floatAnimation}
            className="p-4 rounded-xl shadow-lg"
          >
            <img src={skill.src} alt={skill.alt} width={64} height={64} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
