"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { ExternalLink, Briefcase, Clock, Users, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface StarProps {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  animationDelay: number
}

export default function SpacePortfolio() {
  const [stars, setStars] = useState<StarProps[]>([])
  const [titleText, setTitleText] = useState("")
  const [showScrollPrompt, setShowScrollPrompt] = useState(true)
  const cursorRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  const fullTitle = "JJettas"
  const typewriterSpeed = 80

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollPrompt(false)
      } else {
        setShowScrollPrompt(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const generateStars = () => {
      const newStars: StarProps[] = []
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 4,
        })
      }
      setStars(newStars)
    }

    generateStars()
    window.addEventListener("resize", generateStars)
    return () => window.removeEventListener("resize", generateStars)
  }, [])

  useEffect(() => {
    const typeTitle = async () => {
      setTitleText("")
      for (let i = 0; i <= fullTitle.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, typewriterSpeed))
        setTitleText(fullTitle.slice(0, i))
      }
    }
    typeTitle()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`
      }
    }

    const handleMouseDown = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform += " scale(1.5)"
      }
    }

    const handleMouseUp = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = cursorRef.current.style.transform.replace(" scale(1.5)", "")
      }
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mousedown", handleMouseDown, { passive: true })
    document.addEventListener("mouseup", handleMouseUp, { passive: true })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      controls.start({
        opacity: [0, 1],
        y: [50, 0],
        transition: { duration: 0.6, staggerChildren: 0.1 },
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [controls])

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-white overflow-x-hidden cursor-none relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="nebula-1"></div>
        <div className="nebula-2"></div>
        <div className="nebula-3"></div>

        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.animationDelay}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: "translate3d(-12px, -12px, 0)",
          willChange: "transform",
        }}
      >
        <div className="w-full h-full bg-white rounded-full transition-transform duration-75 ease-out" />
      </div>

      {showScrollPrompt && (
        <div
          className="fixed bottom-8 z-40 pointer-events-auto"
          style={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "2rem",
            zIndex: 40,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{
              duration: 1.2,
              delay: 3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Button
              onClick={handleScrollDown}
              className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/40 hover:to-blue-500/40 border border-purple-400/30 backdrop-blur-sm text-white px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      )}

      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <motion.h1
              className="text-8xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {titleText}
              <motion.span
                className="inline-block w-1 h-20 bg-white ml-2"
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl mb-4 text-gray-300"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              Roblox Developer
            </motion.p>
            <motion.p
              className="text-lg md:text-xl text-gray-400"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: 2.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              3 Years of Lua Mastery • Age 17
            </motion.p>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: false }}
            >
              Available for Work
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: false }}
              >
                <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/30 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                  <CardContent className="p-6 text-center">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                    <h3 className="text-xl font-semibold mb-2 text-white">Commissions</h3>
                    <p className="text-gray-300">Custom Roblox game development and scripting solutions</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: false }}
              >
                <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                    <h3 className="text-xl font-semibold mb-2 text-white">Part-Time</h3>
                    <p className="text-gray-300">Flexible scheduling for ongoing projects and maintenance</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: false }}
              >
                <Card className="bg-gradient-to-br from-cyan-900/50 to-teal-900/50 border-cyan-500/30 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                    <h3 className="text-xl font-semibold mb-2 text-white">Full-Time</h3>
                    <p className="text-gray-300">Ready to join a dedicated development team</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: false }}
            >
              Featured Project
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: false }}
            >
              <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-500/30 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/20">
                <CardContent className="p-0">
                  <div className="relative">
                    <motion.img
                      src="/pet-legends.png"
                      alt="Pet Legends - Roblox Game"
                      className="w-full h-64 md:h-80 object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Pet Legends</h3>
                      <p className="text-gray-200 mb-4">
                        A comprehensive pet simulator showcasing advanced Lua scripting, game mechanics, and user
                        experience design. Features complex pet systems, trading mechanics, and immersive gameplay
                        loops.
                      </p>
                      <Button
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        onClick={() =>
                          window.open("https://www.roblox.com/games/139797513890723/Pet-Legends", "_blank")
                        }
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Play Game
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              className="text-5xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: false }}
            >
              Let's Connect
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: false }}
            >
              Ready to bring your Roblox vision to life? Let's discuss your project!
            </motion.p>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: false }}
              >
                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <img src="/discord-logo.png" alt="Discord" className="w-12 h-12 object-contain" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Discord</h3>
                    <p className="text-2xl font-mono text-purple-300 mb-2">velliua</p>
                    <p className="text-gray-400 text-sm">Send me a message to get started!</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: false }}
              >
                <Card className="bg-gradient-to-br from-green-900/50 to-blue-900/50 border-green-500/30 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                      <img src="/roblox-logo.png" alt="Roblox" className="w-12 h-12 object-contain" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">Roblox Profile</h3>
                    <p className="text-gray-400 text-sm mb-4">Check out my Roblox profile and games</p>
                    <Button
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 w-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      onClick={() => window.open("https://www.roblox.com/users/8019543437/profile/", "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
