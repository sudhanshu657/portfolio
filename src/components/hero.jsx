"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin } from "lucide-react"
import { socialLinks, heroData } from "@/data/index"

const iconMap = {
  Github,
  Linkedin,
}

export function Hero() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 12
            }}
            className="mb-6"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold font-work-sans bg-gradient-to-r from-white via-blue-100 to-emerald-200 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              {heroData.title}
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              type: "spring",
              stiffness: 80
            }}
            className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {heroData.subtitle}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="font-bold text-emerald-300"
            >
              {heroData.tagline}
            </motion.span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-3 text-lg font-semibold shadow-lg border-0 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">View My Work</span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                borderColor: "#10b981"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <a href={heroData.cvPath} download>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg bg-transparent border-2 border-gray-600 text-gray-200 hover:bg-emerald-600/10 hover:border-emerald-500 hover:text-emerald-300 transition-all duration-300 font-semibold"
                >
                  Download CV
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 1.6,
              type: "spring",
              stiffness: 120
            }}
            className="flex items-center justify-center space-x-6"
          >
            {socialLinks.map((social, index) => {
              const Icon = iconMap[social.icon]
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                  whileHover={{
                    scale: 1.3,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.8 }}
                  className="p-4 rounded-full bg-gray-800/50 hover:bg-gray-700/70 transition-all duration-300 backdrop-blur-sm border border-gray-600/30 hover:border-gray-500/50"
                >
                  <motion.div
                    whileHover={{
                      rotateY: 360,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <Icon className={`w-6 h-6 text-gray-300 transition-colors duration-300 ${social.color}`} />
                  </motion.div>
                </motion.a>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
