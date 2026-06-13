"use client"

import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from "lucide-react"

export function StoryRow() {
  const users = [
    { name: "Rahul", image: PlaceHolderImages[4].imageUrl },
    { name: "Priya", image: PlaceHolderImages[5].imageUrl },
    { name: "Amit", image: PlaceHolderImages[6].imageUrl },
    { name: "Sonia", image: PlaceHolderImages[0].imageUrl },
    { name: "Vikram", image: PlaceHolderImages[1].imageUrl },
    { name: "Anjali", image: PlaceHolderImages[2].imageUrl },
  ]

  return (
    <div className="flex gap-5 overflow-x-auto py-6 px-4 no-scrollbar bg-background">
      <div className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer group">
        <div className="relative">
          <div className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-muted-foreground/50 p-1 flex items-center justify-center transition-colors group-hover:border-primary">
            <Avatar className="w-full h-full">
              <AvatarImage src={PlaceHolderImages[4].imageUrl} alt="My Story" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 border-2 border-background shadow-lg transition-transform group-hover:scale-110">
            <Plus className="w-3 h-3 text-white stroke-[3px]" />
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">You</span>
      </div>

      {users.map((user, i) => (
        <div key={i} className="flex flex-col items-center space-y-2 flex-shrink-0 cursor-pointer group">
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary via-orange-500 to-yellow-500 transition-transform group-hover:scale-105 active:scale-95">
            <div className="p-0.5 rounded-full bg-background">
              <Avatar className="w-16 h-16">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <span className="text-[10px] font-bold text-foreground truncate w-16 text-center tracking-tighter">
            {user.name}
          </span>
        </div>
      ))}
    </div>
  )
}