'use client'

import { useState } from 'react'
import { Calendar, Plus, Vote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Nav from '@/components/Nav'

export default function Meetings() {
  const [meetings] = useState([
    {
      id: 1,
      title: 'Annual General Meeting',
      description: 'Discuss society matters and elect new committee.',
      date: '2024-01-25',
      time: '10:00 AM',
      poll: {
        question: 'Should we increase maintenance fees?',
        options: [
          { text: 'Yes', votes: 15 },
          { text: 'No', votes: 8 },
        ],
        totalVotes: 23
      }
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [newMeeting, setNewMeeting] = useState({ title: '', description: '', date: '', time: '' })

  const handleSubmit = () => {
    // In real app, save to database
    console.log('New meeting:', newMeeting)
    setShowForm(false)
    setNewMeeting({ title: '', description: '', date: '', time: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Meetings</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Meeting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Meeting title"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Meeting agenda"
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {meetings.map((meeting) => (
            <Card key={meeting.id}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {meeting.title}
                </CardTitle>
                <p className="text-sm text-gray-600">{meeting.date} at {meeting.time}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{meeting.description}</p>
                {meeting.poll && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium flex items-center mb-2">
                      <Vote className="h-4 w-4 mr-2" />
                      Poll: {meeting.poll.question}
                    </h4>
                    <div className="space-y-2">
                      {meeting.poll.options.map((option, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{option.text}</span>
                          <span className="text-sm text-gray-600">
                            {option.votes} votes ({Math.round((option.votes / meeting.poll.totalVotes) * 100)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Total votes: {meeting.poll.totalVotes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Nav />
    </div>
  )
}