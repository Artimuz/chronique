'use client'

import { View, Views } from 'react-big-calendar'
import Button from '@/components/ui/Button'

interface CalendarToolbarProps {
  date: Date
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void
  onView: (view: View) => void
  view: View
  userRole?: 'customer' | 'business'
  className?: string
}

export default function CalendarToolbar({
  date,
  onNavigate,
  onView,
  view,
  userRole = 'customer',
  className = ''
}: CalendarToolbarProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      ...(view === Views.DAY && { day: 'numeric' })
    })
  }

  const viewLabels = {
    [Views.MONTH]: 'Month',
    [Views.WEEK]: 'Week',
    [Views.DAY]: 'Day',
    [Views.AGENDA]: 'Agenda'
  }

  const availableViews = userRole === 'business' 
    ? [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]
    : [Views.MONTH, Views.WEEK, Views.DAY]

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 bg-gray-50 ${className}`}>
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('PREV')}
          >
            ‹
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('TODAY')}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('NEXT')}
          >
            ›
          </Button>
        </div>
        
        <h2 className="text-lg font-semibold text-gray-900">
          {formatDate(date)}
        </h2>
      </div>

      <div className="flex items-center space-x-2">
        {availableViews.map((viewOption) => (
          <Button
            key={viewOption}
            variant={view === viewOption ? 'default' : 'outline'}
            size="sm"
            onClick={() => onView(viewOption)}
          >
            {viewLabels[viewOption]}
          </Button>
        ))}
      </div>
    </div>
  )
}