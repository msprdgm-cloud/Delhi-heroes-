
"use client"

import { useState, useEffect } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Scale, Info, Lock, Globe } from "lucide-react"

export function TermsOverlay() {
  const [open, setOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    const hasAccepted = localStorage.getItem("delhi_heroes_terms_accepted")
    if (!hasAccepted) {
      setOpen(true)
    }
  }, [])

  const handleAccept = () => {
    if (accepted) {
      localStorage.setItem("delhi_heroes_terms_accepted", "true")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-[90vw] rounded-3xl p-6 bg-card border-border/50">
        <DialogHeader className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold font-headline text-center">Global Community Terms</DialogTitle>
          <DialogDescription className="text-center text-xs">
            Review our international compliance and zero-tolerance safety standards.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[300px] w-full rounded-2xl border border-border/50 p-4 my-4 bg-background/50">
          <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
            <section className="space-y-2 border-l-2 border-primary pl-3">
              <h4 className="font-bold text-foreground flex items-center gap-1">
                <Shield className="w-3 h-3 text-primary" /> 1. Zero-Tolerance Policy
              </h4>
              <p>Misuse of the "Hero" status, posting harmful content, or impersonation will lead to an immediate and permanent ban. The Owner maintains absolute authority over all accounts.</p>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-foreground flex items-center gap-1">
                <Globe className="w-3 h-3" /> 2. International Privacy (GDPR/CCPA)
              </h4>
              <p>We respect global data rights. By using this app, you consent to secure data processing and storage. International users' data is handled with the highest encryption standards.</p>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-foreground flex items-center gap-1">
                <Lock className="w-3 h-3 text-primary" /> 3. Admin & Owner Authority
              </h4>
              <p className="font-semibold text-primary/80">Privileged User Clause:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Admins are legally bound to protect community data confidentiality.</li>
                <li>The "Owner" has total access to verify, flag, or remove any community content without notice.</li>
                <li>Content scraping or unauthorized data usage is strictly prohibited.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h4 className="font-bold text-foreground flex items-center gap-1">
                <Scale className="w-3 h-3" /> 4. Indian IT Act Compliance
              </h4>
              <p>Compliant with IT Act 2000 and the Digital Personal Data Protection (DPDP) Act. All users agree to Indian legal jurisdiction for any disputes.</p>
            </section>

            <p className="italic pt-2 text-[10px]">Version: 2.1 - Last Updated: June 2024 (International Edition)</p>
          </div>
        </ScrollArea>

        <div className="flex items-start space-x-3 p-2">
          <Checkbox 
            id="terms" 
            checked={accepted} 
            onCheckedChange={(checked) => setAccepted(checked as boolean)}
            className="mt-1"
          />
          <label 
            htmlFor="terms" 
            className="text-xs font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I acknowledge the Owner's absolute authority and the global safety framework.
          </label>
        </div>

        <DialogFooter className="mt-4">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl font-bold h-12"
            disabled={!accepted}
            onClick={handleAccept}
          >
            I Agree & Enter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
