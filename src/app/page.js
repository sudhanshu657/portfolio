"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import  Skills  from "@/components/skills"
import { Projects } from "@/components/project"
import { Contact } from "@/components/contact"
import { FloatingCube } from "@/components/floating-cube"
import Education from "@/components/education"



export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background 3D Scene */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Environment preset="night" />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <FloatingCube />
          </Float>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Parallax Background Elements */}
      <motion.div style={{ y }} className="fixed inset-0 -z-5 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-secondary/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </motion.div>

      <Navigation />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
       <Education />
        <Contact />
      </main>
    </div>
  )
}
