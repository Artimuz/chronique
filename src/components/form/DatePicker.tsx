'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  value?: string
  onChange?: (date: string) => void
  min?: string
  max?: string
  disabled?: boolean
  placeholder?: string
  className?: string
}

export default function DatePicker({
  value = '',
  onChange = () => {},
  min,
  max,
  disabled = false,
  placeholder = 'Select date',
  className
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (dateString: string) => {
    if (!dateString) return placeholder
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleDateSelect = (dateString: string) => {
    onChange(dateString)
    setIsOpen(false)
  }

  const generateCalendarDays = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      days.push({
        day,
        dateString,
        isToday: day === today.getDate(),
        isSelected: dateString === value
      })
    }
    
    return days
  }

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
        <span>{formatDate(value)}</span>
        <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg p-3">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((dayData, index) => (
              <div key={index} className="aspect-square">
                {dayData ? (
                  <button
                    type="button"
                    onClick={() => handleDateSelect(dayData.dateString)}
                    className={cn(
                      'w-full h-full text-sm rounded hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600',
                      dayData.isSelected && 'bg-blue-600 text-white hover:bg-blue-700',
                      dayData.isToday && !dayData.isSelected && 'bg-blue-100 text-blue-900',
                      !dayData.isSelected && !dayData.isToday && 'text-gray-900'
                    )}
                  >
                    {dayData.day}
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-between">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleDateSelect(new Date().toISOString().split('T')[0])}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Today
            </button>
          </div>
        </div>
      )}

      {/* Invisible input for form submission */}
      <input
        type="hidden"
        value={value}
        min={min}
        max={max}
      />
    </div>
  )
}