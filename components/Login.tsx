'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [role, setRole] = useState('')
  const [step, setStep] = useState<'phone' | 'otp' | 'role'>('phone')

  const sendOTP = async () => {
    // Mock OTP sending
    alert(`OTP sent to ${phoneNumber}`)
    setStep('otp')
  }

  const verifyOTP = async () => {
    // Mock OTP verification
    if (otp === '123456') {
      setStep('role')
    } else {
      alert('Invalid OTP. Use 123456 for demo.')
    }
  }

  const selectRole = () => {
    // Save role to localStorage for demo
    localStorage.setItem('userRole', role)
    localStorage.setItem('userPhone', phoneNumber)
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            SocietyHub Login
          </h2>
          <p className="text-center text-sm text-gray-600 mt-2">
            Demo: Use any phone number, OTP: 123456
          </p>
        </div>
        {step === 'phone' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <Button onClick={sendOTP} className="w-full">
              Send OTP
            </Button>
          </div>
        )}
        {step === 'otp' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <Button onClick={verifyOTP} className="w-full">
              Verify OTP
            </Button>
          </div>
        )}
        {step === 'role' && (
          <div className="space-y-4">
            <div>
              <Label>Select Your Role</Label>
              <Select onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resident">Resident</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={selectRole} className="w-full" disabled={!role}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}