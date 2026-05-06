'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUserRole } from '@/lib/auth'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const role = getUserRole()
    if (role) {
      router.replace(`/dashboard/${role}`)
    } else {
      router.replace('/')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <p className="text-center text-sm text-slate-500">Checking your role and redirecting...</p>
    </div>
  )
}