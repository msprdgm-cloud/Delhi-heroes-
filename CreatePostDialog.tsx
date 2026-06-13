"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Image as ImageIcon, Sparkles, Loader2, Wand2 } from "lucide-react"
import { useUser, useFirestore } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { refineHeroStory } from "@/ai/flows/hero-story-refinement"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function CreatePostDialog() {
  const { user } = useUser()
  const db = useFirestore()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [caption, setCaption] = useState("")
  const [loading, setLoading] = useState(false)
  const [refining, setRefining] = useState(false)
  const [selectedImage, setSelectedImage] = useState(PlaceHolderImages[0].imageUrl)

  const handleOpenAttempt = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault()
      toast({ 
        title: "Login Required", 
        description: "You need an ID to share your hero story." 
      })
      router.push("/login")
      return
    }
  }

  const handleCreatePost = async () => {
    if (!user || !caption) return
    setLoading(true)
    try {
      addDoc(collection(db, "posts"), {
        authorId: user.uid,
        authorName: user.displayName || "Anonymous Hero",
        authorAvatar: user.photoURL || PlaceHolderImages[4].imageUrl,
        imageUrl: selectedImage,
        caption: caption,
        likesCount: 0,
        location: "Delhi, India",
        createdAt: serverTimestamp(),
      })
      setCaption("")
      setOpen(false)
      toast({ title: "Hero Story Posted!", description: "Your update is now live on the feed." })
    } catch (err) {
      toast({ variant: "destructive", title: "Post Failed", description: "Something went wrong while sharing." })
    } finally {
      setLoading(false)
    }
  }

  const handleAIRefine = async () => {
    if (!caption) return
    setRefining(true)
    try {
      const result = await refineHeroStory({ originalText: caption, refinementStyle: "inspiring" })
      setCaption(result.refinedText)
      toast({ title: "AI Magic Applied!", description: "Caption refined for maximum impact." })
    } catch (err) {
      toast({ variant: "destructive", title: "AI Error", description: "Failed to refine caption." })
    } finally {
      setRefining(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="fixed bottom-24 right-6 z-50 md:right-[calc(50%-220px)] flex flex-col items-end gap-2">
          {/* Enhanced Animated Call-to-Action Label */}
          <div className="bg-primary/20 backdrop-blur-xl px-4 py-1.5 rounded-full border border-primary/30 animate-bounce mb-2 shadow-[0_8px_20px_rgba(227,30,36,0.15)] ring-1 ring-white/5">
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] leading-none">Share Story!</p>
          </div>
          
          <Button 
            onClick={handleOpenAttempt}
            className="w-[72px] h-[72px] rounded-full bg-gradient-to-tr from-primary to-accent shadow-[0_15px_40px_rgba(227,30,36,0.3)] hover:scale-110 active:scale-90 transition-all animate-hero-button p-0 flex items-center justify-center group"
          >
            <div className="relative">
              <Plus className="w-10 h-10 text-white transition-transform duration-500 group-hover:rotate-90" />
              <Sparkles className="absolute -top-3 -right-3 w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </Button>
        </div>
      </DialogTrigger>
      
      <DialogContent className="max-w-md w-[95vw] rounded-[2.5rem] bg-card border-border/50 p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-black font-headline tracking-tighter uppercase italic text-primary">
            SHARE YOUR <span className="text-foreground font-light">STORY</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Select Visual</label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {PlaceHolderImages.slice(0, 6).map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedImage(img.imageUrl)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all flex-shrink-0 ${selectedImage === img.imageUrl ? 'border-primary scale-95' : 'border-transparent opacity-60'}`}
                >
                  <Image src={img.imageUrl} alt="Option" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Write Caption</label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleAIRefine}
                disabled={refining || !caption}
                className="h-7 text-[10px] font-bold text-primary bg-primary/10 rounded-lg"
              >
                {refining ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Wand2 className="w-3 h-3 mr-1" />}
                REFINE WITH AI
              </Button>
            </div>
            <Textarea 
              placeholder="What's happening in your part of Delhi?"
              className="bg-secondary/30 border-none rounded-2xl h-32 resize-none p-4 text-sm"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <Button 
            className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20"
            disabled={loading || !caption}
            onClick={handleCreatePost}
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Post as Hero"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
