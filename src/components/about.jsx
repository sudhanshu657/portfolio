


"use client"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function About() {
  return (
    <div id="about" className="min-h-screen bg-background py-8 md:py-16 px-4">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.7s ease-out forwards;
        }

        .animate-pulse-hover:hover {
          animation: pulse 0.3s ease-in-out;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-12 md:space-y-24">
        {/* About Me Section */}
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8 md:mb-16 animate-scale-in delay-200">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center animate-pulse-hover">
            <User className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">About Me</h1>
        </div>

        <section className="bg-background py-8 md:py-16 px-4 md:px-8 rounded-2xl animate-fade-in-up">
          <div className="max-w-6xl mx-auto">
            {/* Content */}
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Side - Photos */}


              <div className="flex flex-col items-center space-y-4 md:space-y-6 animate-slide-in-left delay-300">
                <div className="relative animate-pulse-hover group">
                  <img
                    src="/about_profile.png"
                    alt="Professional headshot"
                    className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-80 xl:h-80 rounded-full object-cover shadow-2xl border-4 border-white/20 transition-all duration-500 hover:scale-105 hover:rotate-3 hover:shadow-3xl animate-float"
                  />

                  {/* Animated border ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-spin-slow opacity-60 scale-110"></div>

                  {/* Floating particles effect */}
                  <div className="absolute -inset-4 rounded-full animate-ping opacity-20 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                </div>

                {/* Optional: Add some floating elements around the image */}
                <div className="absolute top-0 left-0 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
                <div className="absolute top-10 right-0 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-0 left-5 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '1s' }}></div>
              </div>


              {/* Right Side - Text Card */}
              <div className="bg-gray-800 rounded-xl p-6 md:p-8 shadow-2xl card-hover animate-slide-in-right delay-400">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-balance text-white animate-fade-in-up delay-500">
                  Who Am I ?
                </h2>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <p className="text-lg leading-relaxed mb-3">
                    Hey there! I'm a Full Stack Developer specializing in the{" "}
                    <span className="font-semibold text-green-300">MERN stack</span> and{" "}
                    <span className="font-semibold text-green-300">Java</span>.
                  </p>
                  <p className="text-lg leading-relaxed mb-3">
                    Currently pursuing my{" "}
                    <span className="font-semibold text-green-300">
                      B.Tech in Computer Science
                    </span>{" "}
                    at MMMUT Gorakhpur, I've built several full-stack projects and developed
                    a strong foundation in{" "}
                    <span className="font-semibold text-green-300">
                      Data Structures and Algorithms
                    </span>
                    .
                  </p>

                  <p className="text-lg leading-relaxed mb-3">
                    My journey in tech has led me to explore various domains including{" "}
                    <span className="font-semibold text-green-300">Web Development</span>,{" "}
                    <span className="font-semibold text-green-300">Data Structures</span>, and{" "}
                    <span className="font-semibold text-green-300">Modern Frameworks</span>.
                    I strongly believe in{" "}
                    <span className="font-semibold text-green-300">continuous learning</span> and
                    staying updated with the latest{" "}
                    <span className="font-semibold text-green-300">industry trends</span>.
                  </p>
                </div>

                {/* Key Skills */}
                <div className="mb-6 md:mb-8 animate-fade-in-up delay-800">
                  <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-white">
                    Key Expertise
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {[
                      "Full-Stack Development",
                      "React & Next.js",
                      "JavaScript & TypeScript",
                      "Database Design",
                      "Problem Solving",
                      "Team Collaboration",
                    ].map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: `${0.9 + index * 0.1}s` }}>
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-hover"></div>
                        <span className="text-xs md:text-sm text-gray-200">
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