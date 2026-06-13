
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, MessageCircle, User, Zap, ShieldCheck, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRole } from "@/hooks/use-role"

export function BottomNav() {
  const pathname = usePathname()
  const { isAdmin } = useRole()

  const navItems = [
    { href: "/", label: "HOME", icon: Home },
    { href: "/discovery", label: "DISCOVER", icon: Compass },
    { href: "/lab", label: "HERO LAB", icon: Sparkles },
    { href: "/trending", label: "TRENDS", icon: Zap },
    { href: "/chat", label: "CHAT", icon: MessageCircle },
    { href: "/profile", label: "PROFILE", icon: User },
  ]

  if (isAdmin) {
    navItems.push({ href: "/admin", label: "ADMIN", icon: ShieldCheck })
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-morphism border-t border-border/30 flex justify-around items-center h-20 px-2 md:max-w-lg md:mx-auto md:rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center space-y-1.5 w-full transition-all duration-300 relative group",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <span className="absolute -top-6 w-1 h-1 rounded-full bg-primary animate-glow" />
            )}
            <Icon className={cn(
              "w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110 group-active:scale-90", 
              isActive && "drop-shadow-[0_0_12px_rgba(227,30,36,0.8)]"
            )} />
            <span className="text-[7px] md:text-[8px] font-black tracking-widest uppercase">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
