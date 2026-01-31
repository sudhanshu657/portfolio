// "use client"

// import { motion, useInView } from "framer-motion"
// import { useRef } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ExternalLink, Github } from "lucide-react"

// const projects = [
//   {
//     title: "QuickStay Booking App",
//     description:
//       "Quickstay is a full-stack hotel booking platform built with the MERN stack, featuring user authentication, hotel/room management, real-time booking, and an admin dashboard.",
//     image: "/project_1.png",
//     tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Clerk"],
//     github: "https://github.com/sudhanshu657/QuickStay",
//     demo: "https://quickstay-black.vercel.app/",
//   },
//   {
//     title: "Pictura",
//     description:
//       "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
//     image: "/project_2.png",
//     tech: ["React.js", "Tailwind CSS", "MERN", "MongoDB"],
//     github: "https://github.com/sudhanshu657/Pictura",
//     demo: "https://pictura2-client.onrender.com/",
//   },
//   {
//     title: "QuickBite",
//     description:
//       "QuickBite is a fully responsive food ordering web app built with React.js, Tailwind CSS, and Vite, featuring a modern UI and smooth user experience.It includes category-based menus, effortless ordering, and a real-time order calculator that updates instantly without page reloads.",
//     image: "/project_3.png",
//     tech: ["ClipDrop API", "React", "Tailwind CSS"],
//     github: "https://github.com/sudhanshu657/QuickBite",
//     demo: "https://cafe-management-system-olive.vercel.app/",
//   },
//   {
//     title: "Gym Website",
//     description: "A modern gym website designed to inspire and guide users on their fitness journey. With bold visuals, clear call-to-actions, and a responsive design,",
//     image: "/project_5.png",
//     tech: ["MERN", "Tailwind"],
//     github: "https://github.com/sudhanshu657/Gym-website",
//     demo: "https://gym-website-wine-eta.vercel.app/",
//   },
// ]

// export function Projects() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, margin: "-100px" })

//   const handleLinkClick = (url) => {
//     window.open(url, "_blank", "noopener,noreferrer")
//   }

//   return (
//     <section id="projects" className="py-16 bg-muted/30">
//       <div className="container mx-auto px-4">
//         <motion.div
//           ref={ref}
//           initial={{ opacity: 0, y: 50 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold font-work-sans mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//             Featured Projects
//           </h2>
//           <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//             A showcase of my recent work, demonstrating expertise in modern web development, creative problem-solving,
//             and attention to detail.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-4xl mx-auto px-4">
//           {projects.map((project, index) => (
//             <motion.div
//               key={project.title}
//               initial={{ opacity: 0, y: 50 }}
//               animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//               transition={{ duration: 0.8, delay: index * 0.2 }}
//               className="max-w-md mx-auto"
//             >
//               <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm h-full">
//                 <div className="relative overflow-hidden">
//                   <motion.img
//                     src={project.image}
//                     alt={project.title}
//                     className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//                     whileHover={{ scale: 1.05 }}
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="flex space-x-2">
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-xs px-2 py-1"
//                         onClick={() => handleLinkClick(project.github)}
//                       >
//                         <Github className="w-3 h-3 mr-1" />
//                         Code
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="secondary"
//                         className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-xs px-2 py-1"
//                         onClick={() => handleLinkClick(project.demo)}
//                       >
//                         <ExternalLink className="w-3 h-3 mr-1" />
//                         Demo
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//                 <CardContent className="p-4">
//                   <h3 className="text-lg font-bold mb-2 font-work-sans group-hover:text-primary transition-colors">
//                     {project.title}
//                   </h3>
//                   <p className="text-muted-foreground mb-3 text-sm leading-relaxed line-clamp-3">
//                     {project.description}
//                   </p>
//                   <div className="flex flex-wrap gap-1 mb-3">
//                     {project.tech.slice(0, 3).map((tech) => (
//                       <span
//                         key={tech}
//                         className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                     {project.tech.length > 3 && (
//                       <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
//                         +{project.tech.length - 3}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex space-x-2">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => handleLinkClick(project.github)}
//                       className="flex-1 text-xs py-2"
//                     >
//                       <Github className="w-3 h-3 mr-1" />
//                       GitHub
//                     </Button>
//                     <Button size="sm" onClick={() => handleLinkClick(project.demo)} className="flex-1 text-xs py-2">
//                       <ExternalLink className="w-3 h-3 mr-1" />
//                       Demo
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="text-center mt-8"
//         >
//           {/* <Button size="lg" variant="outline" className="px-8 py-3 text-lg bg-transparent">
//             View All Projects
//           </Button> */}
//         </motion.div>
//       </div>
//     </section>
//   )
// }


























// "use client"

// import { motion, useInView } from "framer-motion"
// import { useRef } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ExternalLink, Github } from "lucide-react"

// const projects = [
//   {
//     title: "QuickStay Booking App",
//     description:
//       "Quickstay is a full-stack hotel booking platform built with the MERN stack, featuring user authentication, hotel/room management, real-time booking, and an admin dashboard.",
//     image: "/project_1.png",
//     tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Clerk"],
//     github: "https://github.com/sudhanshu657/QuickStay",
//     demo: "https://quickstay-black.vercel.app/",
//   },
//   {
//     title: "Pictura",
//     description:
//       "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
//     image: "/project_2.png",
//     tech: ["React.js", "Tailwind CSS", "MERN", "MongoDB"],
//     github: "https://github.com/sudhanshu657/Pictura",
//     demo: "https://pictura2-client.onrender.com/",
//   },
//   {
//     title: "QuickBite",
//     description:
//       "QuickBite is a fully responsive food ordering web app built with React.js, Tailwind CSS, and Vite, featuring a modern UI and smooth user experience.It includes category-based menus, effortless ordering, and a real-time order calculator that updates instantly without page reloads.",
//     image: "/project_3.png",
//     tech: ["ClipDrop API", "React", "Tailwind CSS"],
//     github: "https://github.com/sudhanshu657/QuickBite",
//     demo: "https://cafe-management-system-olive.vercel.app/",
//   },
//   {
//     title: "Gym Website",
//     description: "A modern gym website designed to inspire and guide users on their fitness journey. With bold visuals, clear call-to-actions, and a responsive design,",
//     image: "/project_5.png",
//     tech: ["MERN", "Tailwind"],
//     github: "https://github.com/sudhanshu657/Gym-website",
//     demo: "https://gym-website-wine-eta.vercel.app/",
//   },
// ]

// export function Projects() {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true, margin: "-100px" })

//   const handleLinkClick = (url) => {
//     window.open(url, "_blank", "noopener,noreferrer")
//   }

//   return (
//     <section id="projects" className="py-16 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
//       <div className="container mx-auto px-4">
//         <motion.div
//           ref={ref}
//           initial={{ opacity: 0, y: 50 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <motion.h2 
//             className="text-3xl md:text-4xl font-bold font-work-sans mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             Featured Projects
//           </motion.h2>
//           <motion.p 
//             className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
//             initial={{ y: 20, opacity: 0 }}
//             animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             A showcase of my recent work, demonstrating expertise in modern web development, creative problem-solving,
//             and attention to detail.
//           </motion.p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-4xl mx-auto px-4">
//           {projects.map((project, index) => (
//             <motion.div
//               key={project.title}
//               initial={{ opacity: 0, y: 50, rotateX: 15 }}
//               animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 15 }}
//               transition={{ 
//                 duration: 0.8, 
//                 delay: index * 0.2,
//                 type: "spring",
//                 stiffness: 100,
//                 damping: 15
//               }}
//               whileHover={{ y: -10, transition: { duration: 0.3 } }}
//               className="max-w-md mx-auto"
//             >
//               <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm h-full border border-white/10">
//                 <div className="relative overflow-hidden">
//                   <motion.img
//                     src={project.image}
//                     alt={project.title}
//                     className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
//                     whileHover={{ scale: 1.05 }}
//                     initial={{ scale: 1.1, opacity: 0 }}
//                     animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
//                     transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
//                   />
//                   <motion.div 
//                     className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     initial={{ opacity: 0 }}
//                     whileHover={{ opacity: 1 }}
//                   />
//                   <motion.div 
//                     className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     initial={{ y: 20, opacity: 0 }}
//                     whileHover={{ y: 0, opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div className="flex space-x-2">
//                       <motion.div
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Button
//                           size="sm"
//                           variant="secondary"
//                           className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-xs px-2 py-1"
//                           onClick={() => handleLinkClick(project.github)}
//                         >
//                           <Github className="w-3 h-3 mr-1" />
//                           Code
//                         </Button>
//                       </motion.div>
//                       <motion.div
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Button
//                           size="sm"
//                           variant="secondary"
//                           className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-xs px-2 py-1"
//                           onClick={() => handleLinkClick(project.demo)}
//                         >
//                           <ExternalLink className="w-3 h-3 mr-1" />
//                           Demo
//                         </Button>
//                       </motion.div>
//                     </div>
//                   </motion.div>
//                 </div>
//                 <CardContent className="p-4">
//                   <motion.h3 
//                     className="text-lg font-bold mb-2 font-work-sans group-hover:text-primary transition-colors"
//                     initial={{ x: -20, opacity: 0 }}
//                     animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
//                     transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
//                   >
//                     {project.title}
//                   </motion.h3>
//                   <motion.p 
//                     className="text-muted-foreground mb-3 text-sm leading-relaxed line-clamp-3"
//                     initial={{ x: -20, opacity: 0 }}
//                     animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
//                     transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
//                   >
//                     {project.description}
//                   </motion.p>
//                   <motion.div 
//                     className="flex flex-wrap gap-1 mb-3"
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
//                     transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
//                   >
//                     {project.tech.slice(0, 3).map((tech, techIndex) => (
//                       <motion.span
//                         key={tech}
//                         className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
//                         initial={{ scale: 0, opacity: 0 }}
//                         animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
//                         transition={{ 
//                           duration: 0.3, 
//                           delay: index * 0.2 + 0.7 + techIndex * 0.1,
//                           type: "spring",
//                           stiffness: 200
//                         }}
//                         whileHover={{ scale: 1.1 }}
//                       >
//                         {tech}
//                       </motion.span>
//                     ))}
//                     {project.tech.length > 3 && (
//                       <motion.span 
//                         className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium"
//                         initial={{ scale: 0, opacity: 0 }}
//                         animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
//                         transition={{ 
//                           duration: 0.3, 
//                           delay: index * 0.2 + 1.0,
//                           type: "spring",
//                           stiffness: 200
//                         }}
//                         whileHover={{ scale: 1.1 }}
//                       >
//                         +{project.tech.length - 3}
//                       </motion.span>
//                     )}
//                   </motion.div>
//                   <motion.div 
//                     className="flex space-x-2"
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
//                     transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
//                   >
//                     <motion.div
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex-1"
//                     >
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleLinkClick(project.github)}
//                         className="w-full text-xs py-2 border-white/20 hover:bg-white/10"
//                       >
//                         <Github className="w-3 h-3 mr-1" />
//                         GitHub
//                       </Button>
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="flex-1"
//                     >
//                       <Button 
//                         size="sm" 
//                         onClick={() => handleLinkClick(project.demo)} 
//                         className="w-full text-xs py-2"
//                       >
//                         <ExternalLink className="w-3 h-3 mr-1" />
//                         Demo
//                       </Button>
//                     </motion.div>
//                   </motion.div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//           transition={{ duration: 0.8, delay: 0.8 }}
//           className="text-center mt-8"
//         >
//           {/* <Button size="lg" variant="outline" className="px-8 py-3 text-lg bg-transparent">
//             View All Projects
//           </Button> */}
//         </motion.div>
//       </div>
//     </section>
//   )
// }



















"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "QuickStay Booking App",
    description:
      "Quickstay is a full-stack hotel booking platform built with the MERN stack, featuring user authentication, hotel/room management, real-time booking, and an admin dashboard.",
    image: "/project_1.png",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Clerk"],
    github: "https://github.com/sudhanshu657/QuickStay",
    demo: "https://quickstay-black.vercel.app/",
  },
  {
    title: "Pictura",
    description:
      "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/project_2.png",
    tech: ["ClipDrop API", "Tailwind CSS", "MERN", "MongoDB"],
    github: "https://github.com/sudhanshu657/Pictura",
    demo: "https://pictura2-client.onrender.com/",
  },
  {
    title: "SnapCart-E-comm",
    description:
      "Built a full-stack e-commerce platform with persistent carts, real-time updates, and secure checkout to improve user retention. Designed a fast, responsive interface for a smooth shopping experience and implemented reliable user synchronization for accurate account and data management.",
    image: "/project_3.png",
    tech: [ "Next js", "Tailwind CSS"],
    github: "https://github.com/sudhanshu657/SnapCart_Ecommerce",
    demo: "https://snap-cart-ecommerce-mu.vercel.app/",
  },
  {
    title: "Gym Website",
    description: "A modern gym website designed to inspire and guide users on their fitness journey. With bold visuals, clear call-to-actions, and a responsive design,",
    image: "/project_5.png",
    tech: ["MERN", "Tailwind"],
    github: "https://github.com/sudhanshu657/Gym-website",
    demo: "https://gym-website-wine-eta.vercel.app/",
  },
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleLinkClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="projects" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-work-sans mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          {/* <motion.p 
            className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          > */}
           <p className="text-lg text-gray-300 leading-relaxed mb-6">
  A glimpse of my recent work, reflecting{" "}
  <span className="font-semibold text-green-400">modern web development</span>{" "}
  skills, <span className="font-semibold text-green-400">problem-solving</span>, 
  and <span className="font-semibold text-green-400">attention to detail</span>.
</p>
          {/* </motion.p> */}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-4xl mx-auto px-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: 15 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="max-w-md mx-auto"
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm h-full border border-white/10">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <motion.div 
                    className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-xs px-2 py-1"
                          onClick={() => handleLinkClick(project.github)}
                        >
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-xs px-2 py-1"
                          onClick={() => handleLinkClick(project.demo)}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                <CardContent className="p-4">
                  <motion.h3 
                    className="text-lg font-bold mb-2 font-work-sans group-hover:text-primary transition-colors"
                    initial={{ x: -20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p 
                    className="text-muted-foreground mb-3 text-sm leading-relaxed line-clamp-3"
                    initial={{ x: -20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                  >
                    {project.description}
                  </motion.p>
                  <motion.div 
                    className="flex flex-wrap gap-1 mb-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                  >
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.2 + 0.7 + techIndex * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.tech.length > 3 && (
                      <motion.span 
                        className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.2 + 1.0,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        +{project.tech.length - 3}
                      </motion.span>
                    )}
                  </motion.div>
                  <motion.div 
                    className="flex space-x-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleLinkClick(project.github)}
                        className="w-full text-xs py-2 border-white/20 hover:bg-white/10"
                      >
                        <Github className="w-3 h-3 mr-1" />
                        GitHub
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button 
                        size="sm" 
                        onClick={() => handleLinkClick(project.demo)} 
                        className="w-full text-xs py-2"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8"
        >
          {/* <Button size="lg" variant="outline" className="px-8 py-3 text-lg bg-transparent">
            View All Projects
          </Button> */}
        </motion.div>
      </div>
    </section>
  )
}