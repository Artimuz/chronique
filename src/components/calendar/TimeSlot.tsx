'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TimeSlotProps {
  children?: ReactNode
  value?: Date
  readOnly?: boolean
  className?: string
}

export default function TimeSlot({ 
  children, 
  value, 
  readOnly = false,
  className 
}: TimeSlotProps) {
  const isCurrentTime = value && isCurrentTimeSlot(value)
  const isPastTime = value && isPastTimeSlot(value)

  return (
    <div 
      className={cn(
        'relative h-full border-r border-gray-100 hover:bg-blue-50 transition-colors',
        readOnly && 'cursor-default',
        !readOnly && 'cursor-pointer',
        isCurrentTime && 'bg-blue-100',
        isPastTime && readOnly && 'bg-gray-50 opacity-50',
        className
      )}
    >
      {isCurrentTime && (
        <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500 z-10" />
      )}
      
      {children}
      
      {!readOnly && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-center h-full">
            <div className="text-xs text-blue-600 bg-white px-2 py-1 rounded shadow-sm">
              Click to book
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function isCurrentTimeSlot(slotTime: Date): boolean {
  const now = new Date()
  const slotStart = new Date(slotTime)
  const slotEnd = new Date(slotTime.getTime() + 30 * 60 * 1000) // 30 minutes later

  return now >= slotStart && now <= slotEnd
}

function isPastTimeSlot(slotTime: Date): boolean {
  const now = new Date()
  return slotTime < now
}