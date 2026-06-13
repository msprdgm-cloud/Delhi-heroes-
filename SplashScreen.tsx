
"use client"

import { useState, useEffect } from "react"
import { ShieldCheck } from "lucide-react"

export function SplashScreen() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted || !isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-1000 animate-fade-in overflow-hidden">
      <div className="text-center flex flex-col items-center max-w-md w-full px-6 space-y-6">
        <div className="relative mb-2">
          <div className="w-20 h-20 rounded-[1.75rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_40px_rgba(227,30,36,0.35)] animate-glow">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
        </div>
        
        <div className="flex flex-col items-center w-full text-center -space-y-1.5">
          <h1 className="text-6xl font-black text-simple-red tracking-tighter uppercase italic animate-beep-delhi leading-none font-headline">Delhi</h1>
          <h1 className="text-5xl font-black text-simple-blue tracking-tighter uppercase italic animate-beep-heroes leading-none font-headline">Heroes</h1>
        </div>

        <div className="flex flex-col items-center w-full space-y-3 mt-8">
          <div className="w-full max-w-[260px] animate-float">
            <div className="bg-secondary/40 backdrop-blur-md rounded-full py-3 px-6 border border-white/5 animate-bling">
              <p className="text-primary font-black tracking-[0.25em] uppercase text-[10px]">
                CONNECT. SHARE. CHAT.
              </p>
            </div>
          </div>
          <div className="w-full max-w-[260px] animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="bg-secondary/40 backdrop-blur-md rounded-full py-3 px-6 border border-white/5 animate-bling" style={{ animationDelay: '1s' }}>
              <p className="text-white font-black tracking-[0.15em] uppercase text-[10px]">
                GOOD VIBES. PEACE. LOVE.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
