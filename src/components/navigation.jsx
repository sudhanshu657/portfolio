"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map(item => item.href.substring(1))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (e, href) => {
    if (e) e.preventDefault()
    const id = href.substring(1)
    const element = document.getElementById(id)
    
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      // If mobile menu is open, close it first and wait slightly for the layout to stabilize
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          })
        }, 100)
      } else {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? "bg-background/95 backdrop-blur-xl border-b border-white/10" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between ml-2 md:ml-5 mr-2 md:mr-7">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl sm:text-3xl font-bold font-work-sans flex items-center tracking-tight"
          >
            <span className="text-blue-500 mr-1">&lt;</span>
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Sudh
            </span>
            <span className="text-blue-500 ml-1">/&gt;</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className={`transition-colors duration-200 font-medium text-sm lg:text-base ${
                  activeSection === item.href.substring(1) ? "text-primary" : "text-foreground/70 hover:text-primary"
                }`}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-12 w-12 text-foreground"
            >
              {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 px-4 flex flex-col items-start space-y-1.5 border-t border-white/5 mt-4">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={(e) => scrollToSection(e, item.href)}
                      className={`w-full py-2.5 px-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center group ${
                        isActive 
                          ? "bg-blue-600/10 text-blue-400" 
                          : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      <motion.span 
                        animate={isActive ? { x: 5 } : { x: 0 }}
                        className="flex items-center"
                      >
                        {item.name}
                      </motion.span>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}