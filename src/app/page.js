"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import dynamic from "next/dynamic"

// Lazy load heavy components
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"

// Lazy load custom components
const FloatingCube = dynamic(() => import("@/components/floating-cube").then((mod) => mod.FloatingCube), { ssr: false })
const FloatingBubbles = dynamic(() => import("@/components/floating-bubbles").then((mod) => mod.FloatingBubbles), { ssr: false })
const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false })

import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import Skills from "@/components/skills"
import { Projects } from "@/components/project"
import { Contact } from "@/components/contact"
import Education from "@/components/education"

export default function Portfolio() {
  const [isClient, setIsClient] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Background 3D Scene - Only load on client and wrap in a check to avoid SSR issues */}
      {isClient && (
        <div className="fixed inset-0 -z-10">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
              <FloatingCube />
              <FloatingBubbles count={40} />
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      )}

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

      {isClient && <Chatbot />}
    </div>
  )
}
