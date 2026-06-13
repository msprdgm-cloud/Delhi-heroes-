"use client"

import { useState } from "react"
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Loader2, Globe } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { useFirestore, useUser } from "@/firebase"
import { doc, updateDoc, increment } from "firebase/firestore"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"
import { toast } from "@/hooks/use-toast"
import { translatePost } from "@/ai/flows/translate-post-flow"

interface PostCardProps {
  id: string
  user: string
  location: string
  avatar: string
  image: string
  caption: string
  likes: number
}

export function PostCard({ id, user, location, avatar, image, caption, likes }: PostCardProps) {
  const db = useFirestore()
  const { user: currentUser } = useUser()
  const [localLikes, setLocalLikes] = useState(likes)
  const [isLiked, setIsLiked] = useState(false)
  const [translatedText, setTranslatedText] = useState<string | null>(null)
  const [translating, setTranslating] = useState(false)

  const handleLike = () => {
    if (!currentUser) {
      toast({ title: "Login Required", description: "You need to be a hero to like stories!" })
      return
    }

    const postRef = doc(db, "posts", id)
    const newLikeStatus = !isLiked
    setIsLiked(newLikeStatus)
    setLocalLikes(prev => newLikeStatus ? prev + 1 : prev - 1)

    updateDoc(postRef, {
      likesCount: increment(newLikeStatus ? 1 : -1)
    }).catch(async (err) => {
      const permissionError = new FirestorePermissionError({
        path: postRef.path,
        operation: 'update',
        requestResourceData: { likesCount: 'increment' }
      })
      errorEmitter.emit('permission-error', permissionError)
      setIsLiked(!newLikeStatus)
      setLocalLikes(prev => !newLikeStatus ? prev + 1 : prev - 1)
    })
  }

  const handleTranslate = async () => {
    if (translatedText) {
      setTranslatedText(null)
      return
    }
    setTranslating(true)
    try {
      const result = await translatePost({ text: caption })
      setTranslatedText(result.translatedText)
    } catch (err) {
      toast({ variant: "destructive", title: "AI Error", description: "Could not translate right now." })
    } finally {
      setTranslating(false)
    }
  }

  return (
    <Card className="border-none shadow-2xl bg-secondary/20 backdrop-blur-md overflow-hidden mb-6 last:mb-24 rounded-[2.5rem]">
      <CardHeader className="flex flex-row items-center justify-between p-5">
        <div className="flex items-center space-x-3">
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary to-accent">
            <Avatar className="w-11 h-11 border-2 border-background">
              <AvatarImage src={avatar} alt={user} />
              <AvatarFallback>{user[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="text-sm font-black text-foreground leading-none">{user}</p>
            <p className="text-[10px] text-muted-foreground mt-1.5 uppercase tracking-widest font-black opacity-60">{location}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-secondary/50 rounded-full">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={image}
            alt="Post content"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start p-5 space-y-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-5">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLike}
              className={`p-0 h-auto transition-all hover:scale-110 active:scale-90 ${isLiked ? 'text-primary' : 'text-foreground hover:text-primary'}`}
            >
              <Heart className={`w-7 h-7 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" className="p-0 h-auto text-foreground hover:text-primary transition-all hover:scale-110 active:scale-90">
              <MessageCircle className="w-7 h-7" />
            </Button>
            <Button variant="ghost" size="icon" className="p-0 h-auto text-foreground hover:text-primary transition-all hover:scale-110 active:scale-90">
              <Send className="w-7 h-7" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="p-0 h-auto text-foreground hover:text-primary transition-all hover:scale-110 active:scale-90">
            <Bookmark className="w-7 h-7" />
          </Button>
        </div>

        <div className="space-y-2.5 w-full">
          <p className="text-sm font-black text-foreground tracking-tight">{localLikes} likes</p>
          <div className="text-sm text-foreground/90 leading-relaxed">
            <span className="font-black mr-2 text-primary">{user}</span>
            <span className="font-medium">{translatedText || caption}</span>
          </div>
          <div className="flex items-center gap-2 pt-1.5">
             <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest opacity-40">Active Node</span>
             <span className="w-1 h-1 rounded-full bg-white/10" />
             <Button 
              variant="link" 
              className="p-0 h-auto text-[10px] text-primary font-black uppercase tracking-widest hover:opacity-80"
              onClick={handleTranslate}
              disabled={translating}
             >
               {translating ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Globe className="w-3 h-3 mr-1" />}
               {translatedText ? "Show Original" : "View translation"}
             </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
