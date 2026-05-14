'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { signUp, UserRole } from '@/lib/auth'
import { redirectToDashboard } from '@/lib/roleHandler'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<UserRole | ''>('')
  const [adminCode, setAdminCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password.trim() || !confirmPassword.trim() || !role) {
      setError('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (role === 'admin' && !adminCode.trim()) {
      setError('Admin invite code is required.')
      return
    }

    setLoading(true)

    try {
      const userData = await signUp(email.trim(), password.trim(), role, adminCode.trim())
      alert('Success! Redirecting to dashboard...')
      router.push(redirectToDashboard(userData))
    } catch (err: any) {
      alert('Error during signup: ' + (err.message || 'Signup failed'))
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-8 shadow-sm">
        <div>
          <h2 className="text-center text-3xl font-bold text-slate-900">SocietyHub Signup</h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Create your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
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
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
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
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role === 'admin' && (
            <div>
              <Label htmlFor="adminCode">Admin Invite Code</Label>
              <Input
                id="adminCode"
                type="password"
                placeholder="Enter admin invite code"
                value={adminCode}
                onChange={(event) => setAdminCode(event.target.value)}
                required
              />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}