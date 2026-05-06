'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Nav from '@/components/Nav'
import { logOut, onAuthStateChange, UserData, UserRole } from '@/lib/auth'
import { canAccessDashboard } from '@/lib/roleHandler'

const roleActions: Record<UserRole, string[]> = {
  admin: ['Manage Residents', 'View Complaints', 'Post Notices'],
  resident: ['Raise Complaint', 'View Notices', 'Add Visitor'],
  security: ['Visitor Entry', 'Approve/Reject Visitors', 'View Visitor Logs'],
}

const roleLabels: Record<UserRole, string> = {
  admin: 'Admin Dashboard',
  resident: 'Resident Dashboard',
  security: 'Security Dashboard',
}

export default function RoleDashboard({ role }: { role: UserRole }) {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user, data) => {
      if (!user || !data) {
        router.replace('/')
        return
      }

      if (!canAccessDashboard(data, role)) {
        router.replace('/dashboard')
        return
      }

      setUserData(data)
      setLoading(false)
    })

    return unsubscribe
  }, [router, role])

  const handleLogout = async () => {
    try {
      await logOut()
      router.push('/')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <p className="text-center text-sm text-slate-500">Loading...</p>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="mx-auto flex max-w-md flex-col gap-6">
        <header className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
              <h1 className="mt-3 text-2xl font-semibold text-slate-900">{roleLabels[role]}</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>

        <div className="grid gap-3">
          {roleActions[role].map((label) => (
            <Button key={label} variant="outline" className="justify-start rounded-3xl px-5 py-4 text-left">
              {label}
            </Button>
          ))}
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm leading-6 text-slate-600">
            This dashboard is built for mobile devices with a clean role-based layout. Use these action buttons as placeholders for future society management features.
          </p>
        </div>
      </div>
      <Nav />
    </div>
  )
}
