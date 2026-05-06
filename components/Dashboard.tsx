'use client'

import { useState } from 'react'
import { Bell, MessageSquare, Calendar, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Nav from '@/components/Nav'

export default function Dashboard() {
  const [notices] = useState([
    { id: 1, title: 'Water Supply Maintenance', category: 'Urgent', date: '2024-01-15' },
    { id: 2, title: 'Monthly Meeting', category: 'General', date: '2024-01-20' },
  ])

  const [complaints] = useState([
    { id: 1, title: 'Broken Lift', status: 'In Progress' },
    { id: 2, title: 'Parking Issue', status: 'Pending' },
  ])

  const [meetings] = useState([
    { id: 1, title: 'Annual General Meeting', date: '2024-01-25', time: '10:00 AM' },
  ])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center">SocietyHub</h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-16 flex flex-col items-center justify-center">
            <MessageSquare className="h-6 w-6 mb-1" />
            Raise Complaint
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
            <Bell className="h-6 w-6 mb-1" />
            View Notices
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
            <Calendar className="h-6 w-6 mb-1" />
            Meetings
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center">
            <CreditCard className="h-6 w-6 mb-1" />
            Pay Maintenance
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center col-span-2">
            <Bell className="h-6 w-6 mb-1" />
            Post Notice
          </Button>
        </div>

        {/* Latest Notices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Latest Notices
            </CardTitle>
          </CardHeader>
          <CardContent>
            {notices.map((notice) => (
              <div key={notice.id} className="mb-2 p-2 bg-gray-100 rounded">
                <h3 className="font-medium">{notice.title}</h3>
                <p className="text-sm text-gray-600">{notice.category} • {notice.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Pending Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            {complaints.map((complaint) => (
              <div key={complaint.id} className="mb-2 p-2 bg-gray-100 rounded">
                <h3 className="font-medium">{complaint.title}</h3>
                <p className="text-sm text-gray-600">{complaint.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Meetings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {meetings.map((meeting) => (
              <div key={meeting.id} className="mb-2 p-2 bg-gray-100 rounded">
                <h3 className="font-medium">{meeting.title}</h3>
                <p className="text-sm text-gray-600">{meeting.date} at {meeting.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Nav />
    </div>
  )
}