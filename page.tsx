
"use client"

import { useState, useEffect } from "react"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { BottomNav } from "@/components/BottomNav"
import { StoryRow } from "@/components/StoryRow"
import { PostCard } from "@/components/PostCard"
import { AIHeroTool } from "@/components/AIHeroTool"
import { CreatePostDialog } from "@/components/CreatePostDialog"
import { AdSlider } from "@/components/AdSlider"
import { Bell, Search, Loader2, Flame, ShieldCheck } from "lucide-react"
import { collection, query, orderBy, limit } from "firebase/firestore"

export default function HomePage() {
  const db = useFirestore()
  const [subtitle, setSubtitle] = useState("Hey Hero, breathe in peace. ✨")

  useEffect(() => {
    const phrases = [
      "Good Vibes. Peace. Love. 🌟",
      "Hey Hero, breathe in peace. ✨",
      "Keep it real, keep it peaceful. 🕊️"
    ]
    // Move random logic inside useEffect to avoid hydration mismatch
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    setSubtitle(randomPhrase)
  }, [])

  const postsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(collection(db, "posts"), orderBy("createdAt", "desc"), limit(20))
  }, [db])

  const { data: posts, loading: postsLoading } = useCollection(postsQuery)

  return (
    <div className="min-h-screen bg-background pb-20 max-w-lg mx-auto border-x border-white/5">
      <header className="sticky top-0 z-40 glass-morphism px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex flex-col space-y-0.5">
          <h1 className="flex items-center gap-1 leading-none">
            <div className="flex items-center gap-1">
              <span className="text-3xl text-hero-red-3d animate-beep-delhi leading-none">Delhi</span>
              <span className="text-2xl text-hero-blue-3d mt-1 animate-beep-heroes leading-none">Heroes</span>
            </div>
            <div className="flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-accent animate-glow fill-accent/20" />
            </div>
          </h1>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-1.5 whitespace-nowrap animate-bling">
            <span>{subtitle}</span>
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-secondary/50 hover:bg-primary/10 transition-colors cursor-pointer text-muted-foreground hover:text-primary">
            <Search className="w-5 h-5" />
          </div>
          <div className="relative p-2.5 rounded-2xl bg-secondary/50 hover:bg-primary/10 transition-colors cursor-pointer text-muted-foreground hover:text-primary">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-accent border-2 border-background rounded-full animate-pulse" />
          </div>
        </div>
      </header>

      <main className="space-y-0 bg-background">
        <StoryRow />

        <AdSlider />

        <div className="px-5 py-8">
          <AIHeroTool />
        </div>

        <div className="px-5 space-y-0">
          <div className="flex items-center justify-between mb-8 px-1">
            <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Community Feed</h2>
            <div className="h-[1px] flex-1 mx-6 bg-white/5" />
            <span className="text-[10px] font-black text-accent uppercase tracking-widest">LATEST</span>
          </div>

          {postsLoading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-5">
              <Loader2 className="w-10 h-10 animate-spin text-primary/30" />
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.3em] text-center">
                Syncing Vibe Network...
              </p>
            </div>
          ) : posts && posts.length > 0 ? (
            posts.map((post: any) => (
              <PostCard 
                key={post.id} 
                id={post.id}
                user={post.authorName}
                location={post.location}
                avatar={post.authorAvatar}
                image={post.imageUrl}
                caption={post.caption}
                likes={post.likesCount || 0}
              />
            ))
          ) : (
            <div className="py-24 text-center space-y-5 px-10">
              <div className="w-24 h-24 rounded-full bg-secondary/30 mx-auto flex items-center justify-center border border-white/5">
                <Flame className="w-10 h-10 text-muted-foreground/20" />
              </div>
              <p className="text-sm text-muted-foreground font-semibold tracking-tight">Be the first to ignite peace in Delhi.</p>
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">App is ready in preview mode</p>
            </div>
          )}
        </div>
      </main>

      <CreatePostDialog />
      <BottomNav />
    </div>
  )
}
