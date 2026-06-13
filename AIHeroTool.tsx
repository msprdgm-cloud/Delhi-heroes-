"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Loader2, Wand2, ArrowRight } from "lucide-react"
import { refineHeroStory } from "@/ai/flows/hero-story-refinement"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AIHeroTool() {
  const [text, setText] = useState("")
  const [style, setStyle] = useState<"inspiring" | "professional" | "narrator">("inspiring")
  const [refined, setRefined] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRefine = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      const result = await refineHeroStory({ originalText: text, refinementStyle: style })
      setRefined(result.refinedText)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-none bg-gradient-to-br from-secondary/40 to-secondary/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -mr-10 -mt-10" />
      
      <CardHeader className="flex flex-row items-center space-x-3 p-6 pb-2">
        <div className="p-3 rounded-2xl bg-primary text-white shadow-[0_0_20px_rgba(227,30,36,0.5)] animate-glow">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <CardTitle className="text-xl font-headline font-bold">Magic Refiner</CardTitle>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Powered by Gemini AI</p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5 p-6">
        <div className="relative">
          <Textarea
            placeholder="Tell your story raw... we'll make it legendary."
            className="bg-background/40 min-h-[120px] border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-primary/50 text-sm placeholder:text-muted-foreground/50 resize-none p-4"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={style} onValueChange={(v: any) => setStyle(v)}>
            <SelectTrigger className="flex-1 bg-background/40 border-none rounded-2xl h-12 px-4 font-bold text-xs uppercase tracking-wider">
              <SelectValue placeholder="Select Style" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border/50 rounded-2xl">
              <SelectItem value="inspiring">Inspiring</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="narrator">Storyteller</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            onClick={handleRefine}
            disabled={loading || !text}
            className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-12 px-8 font-bold uppercase tracking-widest shadow-[0_10px_20px_rgba(227,30,36,0.3)] transition-all hover:scale-105 active:scale-95 flex-1 sm:flex-none"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5 mr-2" />}
            Refine
          </Button>
        </div>

        {refined && (
          <div className="p-5 rounded-[1.5rem] bg-primary/5 border border-primary/20 animate-fade-in space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Refined Result</span>
              <Sparkles className="w-3 h-3 text-primary" />
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed italic">"{refined}"</p>
            <Button
              variant="link"
              className="text-primary text-xs font-bold p-0 h-auto hover:no-underline flex items-center gap-1 group"
              onClick={() => { setText(refined); setRefined(""); }}
            >
              Apply this magic <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}