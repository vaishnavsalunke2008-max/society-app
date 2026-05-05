'use client'

import { useState } from 'react'
import { MessageSquare, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Nav from '@/components/Nav'
import { isSecurity } from '@/lib/auth'

export default function Complaints() {
  const [complaints] = useState([
    { id: 1, title: 'Broken Lift', description: 'Lift in Block A is not working since morning.', status: 'In Progress', date: '2024-01-15', raisedBy: 'A-101' },
    { id: 2, title: 'Parking Issue', description: 'Unauthorized vehicle parked in my spot.', status: 'Pending', date: '2024-01-14', raisedBy: 'B-205' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newComplaint, setNewComplaint] = useState({ title: '', description: '' })

  const handleSubmit = () => {
    // In real app, save to database
    console.log('New complaint:', newComplaint)
    setShowForm(false)
    setNewComplaint({ title: '', description: '' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'In Progress': return 'bg-blue-100 text-blue-800'
      case 'Resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Complaints</h1>
          {!isSecurity() && (
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Raise Complaint
            </Button>
          )}
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Raise New Complaint</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Brief title of the complaint"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({ ...newComplaint, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the issue"
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Submit Complaint
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {complaints.map((complaint) => (
            <Card key={complaint.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    {complaint.title}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </CardTitle>
                <p className="text-sm text-gray-600">{complaint.date} • {complaint.raisedBy}</p>
              </CardHeader>
              <CardContent>
                <p>{complaint.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Nav />
    </div>
  )
}