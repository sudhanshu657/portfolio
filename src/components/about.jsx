"use client"

import { User } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export function About() {
  const orbitDots = [
    { color: 'bg-blue-500', delay: 0, duration: 8 },
    { color: 'bg-purple-500', delay: -2.6, duration: 8 },
    { color: 'bg-pink-500', delay: -5.3, duration: 8 },
  ]

  return (
    <div id="about" className="min-h-screen py-4 md:py-8 px-4">
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.7s ease-out forwards; }
        .animate-pulse-hover:hover { animation: pulse 0.3s ease-in-out; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3); }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-6 md:space-y-12">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8 md:mb-16 animate-scale-in delay-200">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center animate-pulse-hover">
            <User className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">About Me</h1>
        </div>

        <section className="py-4 md:py-8 px-4 md:px-8 rounded-2xl animate-fade-in-up">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Side - Profile Image with Orbit */}
              <div className="flex flex-col items-center justify-center relative py-6 md:py-12 animate-slide-in-left delay-300">
                <div className="relative group">
                  {/* Orbiting Dots Container */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {orbitDots.map((dot, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: dot.duration,
                          repeat: Infinity,
                          ease: "linear",
                          delay: dot.delay
                        }}
                        style={{
                          width: '120%',
                          height: '120%',
                        }}
                      >
                        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 ${dot.color} rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]`} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Main Profile Image */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative z-10"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent blur-xl -z-10 group-hover:from-white/20 transition-colors duration-500"></div>
                    <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl transition-all duration-500 group-hover:border-white/20">
                      <Image
                        src="/about_profile.png"
                        alt="Professional headshot"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 192px, 288px"
                      />
                    </div>
                  </motion.div>

                  {/* Subtle static outer ring */}
                  <div className="absolute inset-0 -m-4 border border-white/5 rounded-full pointer-events-none"></div>
                  <div className="absolute inset-0 -m-8 border border-white/[0.02] rounded-full pointer-events-none"></div>
                </div>
              </div>

              {/* Right Side - Text Card */}
              <div className="bg-gray-800/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl card-hover animate-slide-in-right delay-400">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white tracking-tight">
                  Who Am I ?
                </h2>

                <div className="space-y-4 text-gray-300">
                  <p className="text-lg leading-relaxed">
                    Hey there! I'm a Full Stack Developer specializing in the{" "}
                    <span className="font-semibold text-blue-400">MERN stack</span> and{" "}
                    <span className="font-semibold text-blue-400">Java</span>.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Currently pursuing my{" "}
                    <span className="font-semibold text-blue-400">
                      B.Tech in Computer Science
                    </span>{" "}
                    at MMMUT Gorakhpur, I've built several full-stack projects and developed
                    a strong foundation in{" "}
                    <span className="font-semibold text-blue-400">
                      Data Structures and Algorithms
                    </span>.
                  </p>
                  <p className="text-lg leading-relaxed">
                    My journey in tech has led me to explore various domains including{" "}
                    <span className="font-semibold text-blue-400">Web Development</span>,{" "}
                    <span className="font-semibold text-blue-400">Data Structures</span>, and{" "}
                    <span className="font-semibold text-blue-400">Modern Frameworks</span>.
                    I strongly believe in{" "}
                    <span className="font-semibold text-blue-400">continuous learning</span> and
                    staying updated with the latest industry trends.
                  </p>
                </div>

                {/* Key Expertise */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-white/90">
                    Key Expertise
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Full-Stack Development",
                      "React & Next.js",
                      "JavaScript & TypeScript",
                      "Database Design",
                      "Problem Solving",
                      "Team Collaboration",
                    ].map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-400">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}