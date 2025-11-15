'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  step?: number // minutes
}

export default function TimePicker({
  value = '',
  onChange = () => {},
  disabled = false,
  placeholder = 'Select time',
  className,
  step = 30
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatTime = (timeString: string) => {
    if (!timeString) return placeholder
    const [hours, minutes] = timeString.split(':')
    const date = new Date()
    date.setHours(parseInt(hours, 10))
    date.setMinutes(parseInt(minutes, 10))
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const generateTimeSlots = () => {
    const slots = []
    const startHour = 0
    const endHour = 24
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += step) {
        const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        const displayTime = formatTime(timeString)
        
        slots.push({
          value: timeString,
          display: displayTime,
          isSelected: timeString === value
        })
      }
    }
    
    return slots
  }

  const handleTimeSelect = (timeString: string) => {
    onChange(timeString)
    setIsOpen(false)
  }

  const timeSlots = generateTimeSlots()

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
          !value && 'text-gray-500'
        )}
      >
        <span>{formatTime(value)}</span>
        <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {timeSlots.map((slot) => (
            <button
              key={slot.value}
              type="button"
              onClick={() => handleTimeSelect(slot.value)}
              className={cn(
                'w-full px-3 py-2 text-left text-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600',
                slot.isSelected && 'bg-blue-600 text-white hover:bg-blue-700'
              )}
            >
              {slot.display}
            </button>
          ))}
          
          <div className="border-t border-gray-200 p-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-xs text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Invisible input for form submission */}
      <input
        type="hidden"
        value={value}
      />
    </div>
  )
}