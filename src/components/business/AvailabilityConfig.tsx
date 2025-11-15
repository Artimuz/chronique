'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import FormField from '@/components/form/FormField'
import TimePicker from '@/components/form/TimePicker'

interface DaySchedule {
  isOpen: boolean
  openTime: string
  closeTime: string
  breaks: { start: string; end: string }[]
}

interface WeekSchedule {
  [key: string]: DaySchedule
}

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]

const dayLabels = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday'
}

export default function AvailabilityConfig() {
  const [schedule, setSchedule] = useState<WeekSchedule>(() => {
    const defaultSchedule: WeekSchedule = {}
    daysOfWeek.forEach(day => {
      defaultSchedule[day] = {
        isOpen: day !== 'sunday',
        openTime: '09:00',
        closeTime: '17:00',
        breaks: []
      }
    })
    return defaultSchedule
  })

  const [globalSettings, setGlobalSettings] = useState({
    maxHoursPerDay: 8,
    maxHoursPerWeek: 40,
    appointmentDuration: 60,
    bufferTime: 15
  })

  const handleDayToggle = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen: !prev[day].isOpen
      }
    }))
  }

  const handleTimeChange = (day: string, field: 'openTime' | 'closeTime', value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }))
  }

  const addBreak = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        breaks: [
          ...prev[day].breaks,
          { start: '12:00', end: '13:00' }
        ]
      }
    }))
  }

  const removeBreak = (day: string, index: number) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        breaks: prev[day].breaks.filter((_, i) => i !== index)
      }
    }))
  }

  const handleBreakChange = (day: string, index: number, field: 'start' | 'end', value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        breaks: prev[day].breaks.map((breakItem, i) =>
          i === index ? { ...breakItem, [field]: value } : breakItem
        )
      }
    }))
  }

  const copyToAllDays = (sourceDay: string) => {
    const sourceSchedule = schedule[sourceDay]
    setSchedule(prev => {
      const newSchedule = { ...prev }
      daysOfWeek.forEach(day => {
        if (day !== sourceDay) {
          newSchedule[day] = { ...sourceSchedule }
        }
      })
      return newSchedule
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Availability Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <FormField
            label="Max Hours/Day"
            type="number"
            value={globalSettings.maxHoursPerDay}
            onChange={(e) => setGlobalSettings(prev => ({
              ...prev,
              maxHoursPerDay: parseInt(e.target.value)
            }))}
          />
          <FormField
            label="Max Hours/Week"
            type="number"
            value={globalSettings.maxHoursPerWeek}
            onChange={(e) => setGlobalSettings(prev => ({
              ...prev,
              maxHoursPerWeek: parseInt(e.target.value)
            }))}
          />
          <FormField
            label="Appointment Duration (min)"
            type="number"
            value={globalSettings.appointmentDuration}
            onChange={(e) => setGlobalSettings(prev => ({
              ...prev,
              appointmentDuration: parseInt(e.target.value)
            }))}
          />
          <FormField
            label="Buffer Time (min)"
            type="number"
            value={globalSettings.bufferTime}
            onChange={(e) => setGlobalSettings(prev => ({
              ...prev,
              bufferTime: parseInt(e.target.value)
            }))}
          />
        </div>

        <div className="space-y-4">
          {daysOfWeek.map(day => (
            <Card key={day} variant="outline" className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={schedule[day].isOpen}
                    onChange={() => handleDayToggle(day)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <h3 className="text-lg font-medium text-gray-900">
                    {dayLabels[day as keyof typeof dayLabels]}
                  </h3>
                </div>
                
                {schedule[day].isOpen && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToAllDays(day)}
                  >
                    Copy to All Days
                  </Button>
                )}
              </div>

              {schedule[day].isOpen && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Open Time
                      </label>
                      <TimePicker
                        value={schedule[day].openTime}
                        onChange={(value) => handleTimeChange(day, 'openTime', value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Close Time
                      </label>
                      <TimePicker
                        value={schedule[day].closeTime}
                        onChange={(value) => handleTimeChange(day, 'closeTime', value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Breaks
                      </label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addBreak(day)}
                      >
                        Add Break
                      </Button>
                    </div>
                    
                    {schedule[day].breaks.map((breakItem, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <TimePicker
                          value={breakItem.start}
                          onChange={(value) => handleBreakChange(day, index, 'start', value)}
                        />
                        <span className="text-gray-500">to</span>
                        <TimePicker
                          value={breakItem.end}
                          onChange={(value) => handleBreakChange(day, index, 'end', value)}
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeBreak(day, index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline">
            Reset to Default
          </Button>
          <Button>
            Save Availability
          </Button>
        </div>
      </Card>
    </div>
  )
}