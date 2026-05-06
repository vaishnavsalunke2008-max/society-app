'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChange, UserData } from '@/lib/auth'
import { redirectToDashboard } from '@/lib/roleHandler'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user, userData) => {
      if (user && userData) {
        router.replace(redirectToDashboard(userData))
      } else {
        router.replace('/')
      }
    })

    return unsubscribe
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <p className="text-center text-sm text-slate-500">Checking authentication...</p>
    </div>
  )
}