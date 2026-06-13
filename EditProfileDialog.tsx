
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFirestore, useUser } from "@/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { toast } from "@/hooks/use-toast"
import { Loader2, Camera, User as UserIcon } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"

export function EditProfileDialog({ currentName, currentAvatar }: { currentName?: string, currentAvatar?: string }) {
  const { user } = useUser()
  const db = useFirestore()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(currentName || "")
  const [avatar, setAvatar] = useState(currentAvatar || PlaceHolderImages[4].imageUrl)
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    if (!user || !name) return
    setLoading(true)
    const userRef = doc(db, "users", user.uid)
    
    updateDoc(userRef, {
      displayName: name,
      avatarUrl: avatar
    }).then(() => {
      setOpen(false)
      toast({ title: "Identity Updated", description: "Your hero profile has been synced." })
    }).catch(() => {
      toast({ variant: "destructive", title: "Update Failed" })
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1 bg-primary hover:bg-primary/90 h-10 rounded-xl font-bold text-white">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="rounded-[2.5rem] bg-card border-border/50 p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-black font-headline uppercase italic text-primary">Refine Identity</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 relative">
                <Image src={avatar} alt="Avatar" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar w-full py-2">
              {PlaceHolderImages.slice(4, 10).map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setAvatar(img.imageUrl)}
                  className={`relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 cursor-pointer border-2 transition-all ${avatar === img.imageUrl ? 'border-primary' : 'border-transparent opacity-50'}`}
                >
                  <Image src={img.imageUrl} alt="Option" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest ml-1 text-muted-foreground">Hero Name</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="pl-10 bg-secondary/30 border-none rounded-xl h-12 font-bold"
                placeholder="Enter display name"
              />
            </div>
          </div>

          <Button 
            className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20"
            disabled={loading || !name}
            onClick={handleUpdate}
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
