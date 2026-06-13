
"use client"

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, where, orderBy } from "firebase/firestore"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Info } from "lucide-react"

export function AdSlider() {
  const db = useFirestore()

  const adsQuery = useMemoFirebase(() => {
    if (!db) return null
    return query(
      collection(db, "ads"), 
      where("isActive", "==", true),
      orderBy("createdAt", "desc")
    )
  }, [db])

  const { data: ads, loading } = useCollection(adsQuery)

  if (loading || !ads || ads.length === 0) return null

  return (
    <div className="px-5 py-2">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 flex items-center gap-1.5">
          <Info className="w-3 h-3" />
          Promoted
        </h2>
      </div>
      <Carousel 
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {ads.map((ad: any) => (
            <CarouselItem key={ad.id}>
              <Link 
                href={ad.linkUrl || "#"} 
                target="_blank"
                className="block group relative aspect-[21/9] w-full rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl"
              >
                <Image 
                  src={ad.imageUrl} 
                  alt={ad.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary animate-bling">Special Offer</p>
                    <h3 className="text-sm font-bold text-white tracking-tight">{ad.title}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-primary transition-colors">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
