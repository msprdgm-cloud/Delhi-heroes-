
"use client"

import { useUser, useFirestore, useDoc } from "@/firebase"
import { doc } from "firebase/firestore"
import { useMemo } from "react"

export type AppRole = "owner" | "admin" | "user"

export function useRole() {
  const { user, loading: authLoading } = useUser()
  const db = useFirestore()

  const userDocRef = useMemo(() => {
    if (!db || !user?.uid) return null
    return doc(db, "users", user.uid)
  }, [db, user?.uid])

  const { data: profile, loading: profileLoading } = useDoc(userDocRef)

  const role: AppRole = profile?.role || "user"
  const isOwner = role === "owner"
  const isAdmin = role === "admin" || role === "owner"
  const loading = authLoading || profileLoading

  return {
    role,
    isOwner,
    isAdmin,
    loading,
    profile
  }
}
