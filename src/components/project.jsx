"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Code } from "lucide-react"
import Image from "next/image"
import { projects } from "@/data/index"

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleLinkClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
            <motion.div
              className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center"
              animate={{
                boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.3)", "0 0 0px rgba(59, 130, 246, 0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Code className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-work-sans">
              Featured Projects
            </h2>
          </div>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A glimpse of my recent work, reflecting{" "}
            <span className="font-semibold text-blue-400">modern web development</span>{" "}
            skills, <span className="font-semibold text-blue-400">problem-solving</span>,
            and <span className="font-semibold text-blue-400">attention to detail</span>.
          </p>
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
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLinkClick(project.github)}
                      className="flex-1 text-xs py-2 border-white/20 hover:bg-white/10"
                    >
                      <Github className="w-3 h-3 mr-1" />
                      GitHub
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleLinkClick(project.demo)}
                      className="flex-1 text-xs py-2"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}