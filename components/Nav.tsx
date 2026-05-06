'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Home, Bell, MessageSquare, Calendar } from 'lucide-react'
import { onAuthStateChange, UserData } from '@/lib/auth'
import { getDashboardPath } from '@/lib/roleHandler'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/notices', label: 'Notices', icon: Bell },
  { href: '/complaints', label: 'Complaints', icon: MessageSquare },
  { href: '/meetings', label: 'Meetings', icon: Calendar },
]

export default function Nav() {
  const pathname = usePathname()
  const [dashboardHref, setDashboardHref] = useState('/dashboard')

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user, userData) => {
      if (user && userData) {
        setDashboardHref(getDashboardPath(userData.role))
      } else {
        setDashboardHref('/dashboard')
      }
    })

    return unsubscribe
  }, [])

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const href = item.href === '/dashboard' ? dashboardHref : item.href
            const isActive =
              item.href === '/dashboard'
                ? pathname.startsWith('/dashboard')
                : pathname === item.href
            return (
              <Link
                key={item.href}
                href={href}
                className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}