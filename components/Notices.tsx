'use client'

import { useState } from 'react'
import { Bell, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import Nav from '@/components/Nav'

export default function Notices() {
  const [notices] = useState([
    { id: 1, title: 'Water Supply Maintenance', content: 'Water will be shut off from 10 AM to 2 PM tomorrow.', category: 'Urgent', date: '2024-01-15', author: 'Admin' },
    { id: 2, title: 'Monthly Meeting', content: 'Annual General Meeting scheduled for next Sunday.', category: 'General', date: '2024-01-20', author: 'Admin' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newNotice, setNewNotice] = useState({ title: '', content: '', category: '' })

  const handleSubmit = () => {
    // In real app, save to database
    console.log('New notice:', newNotice)
    setShowForm(false)
    setNewNotice({ title: '', content: '', category: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Notices</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Notice
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Post New Notice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setNewNotice({ ...newNotice, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Post Notice
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {notices.map((notice) => (
            <Card key={notice.id}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  {notice.title}
                </CardTitle>
                <p className="text-sm text-gray-600">{notice.category} • {notice.date} • by {notice.author}</p>
              </CardHeader>
              <CardContent>
                <p>{notice.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Nav />
    </div>
  )
}