'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { authenticate, getUserRole, setUserSession, UserRole } from '@/lib/auth'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole | ''>('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const existingRole = getUserRole()
    if (existingRole) {
      router.replace(`/dashboard/${existingRole}`)
    }
  }, [router])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!username.trim() || !password.trim() || !role) {
      setError('Please enter all fields and select your role.')
      return
    }

    const user = authenticate(username.trim(), password.trim(), role)
    if (!user) {
      setError('Invalid credentials. Try one of the demo users below.')
      return
    }

    setUserSession(user)
    router.push(`/dashboard/${user.role}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-sm">
        <div>
          <h2 className="text-center text-3xl font-bold text-slate-900">SocietyHub Login</h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Use one of the demo users below to log in by role.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div>
            <Label>Select Role</Label>
            <Select onValueChange={(value) => setRole(value as UserRole)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resident">Resident</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button className="w-full" type="submit">
            Log in
          </Button>
        </form>

        <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Demo users</p>
          <ul className="mt-3 space-y-2">
            <li>Admin: adminuser / admin123</li>
            <li>Resident: resident1 / res123</li>
            <li>Security: security1 / sec123</li>
          </ul>
        </div>
      </div>
    </div>
  )
}