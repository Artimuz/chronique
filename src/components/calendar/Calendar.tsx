'use client'

import { useState, useCallback } from 'react'
import { Calendar as BigCalendar, momentLocalizer, View, Views } from 'react-big-calendar'
import moment from 'moment'
import CalendarToolbar from './CalendarToolbar'
import AppointmentModal from './AppointmentModal'
import TimeSlot from './TimeSlot'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

interface Appointment {
  id: string
  title: string
  start: Date
  end: Date
  customer?: string
  status?: 'confirmed' | 'pending' | 'cancelled'
  notes?: string
}

interface CalendarProps {
  appointments?: Appointment[]
  onAppointmentSelect?: (appointment: Appointment | null) => void
  onSlotSelect?: (slotInfo: { start: Date; end: Date }) => void
  readOnly?: boolean
  userRole?: 'customer' | 'business'
  className?: string
}

export default function Calendar({
  appointments = [],
  onAppointmentSelect = () => {},
  onSlotSelect = () => {},
  readOnly = false,
  userRole = 'customer',
  className = ''
}: CalendarProps) {
  const [view, setView] = useState<View>(Views.WEEK)
  const [date, setDate] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const mockAppointments: Appointment[] = appointments.length > 0 ? appointments : [
    {
      id: '1',
      title: 'Consultation - John Doe',
      start: new Date(2024, 0, 15, 10, 0),
      end: new Date(2024, 0, 15, 11, 0),
      customer: 'John Doe',
      status: 'confirmed',
      notes: 'Initial consultation'
    },
    {
      id: '2',
      title: 'Follow-up - Jane Smith',
      start: new Date(2024, 0, 16, 14, 0),
      end: new Date(2024, 0, 16, 15, 30),
      customer: 'Jane Smith',
      status: 'pending',
      notes: 'Follow-up appointment'
    }
  ]

  const handleSelectEvent = useCallback((event: Appointment) => {
    setSelectedAppointment(event)
    setIsModalOpen(true)
    onAppointmentSelect(event)
  }, [onAppointmentSelect])

  const handleSelectSlot = useCallback((slotInfo: { start: Date; end: Date }) => {
    if (!readOnly) {
      setSelectedAppointment({
        id: '',
        title: '',
        start: slotInfo.start,
        end: slotInfo.end,
        status: 'pending'
      })
      setIsModalOpen(true)
      onSlotSelect(slotInfo)
    }
  }, [readOnly, onSlotSelect])

  const handleNavigate = (newDate: Date) => {
    setDate(newDate)
  }

  const handleViewChange = (newView: View) => {
    setView(newView)
  }

  const eventStyleGetter = (event: Appointment) => {
    let backgroundColor = '#3B82F6'
    
    if (event.status === 'pending') {
      backgroundColor = '#F59E0B'
    } else if (event.status === 'cancelled') {
      backgroundColor = '#EF4444'
    } else if (event.status === 'confirmed') {
      backgroundColor = '#10B981'
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    }
  }

  const dayPropGetter = (date: Date) => {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    return {
      style: {
        backgroundColor: isWeekend ? '#F9FAFB' : undefined
      }
    }
  }

  const components = {
    toolbar: (props: any) => (
      <CalendarToolbar
        {...props}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        userRole={userRole}
      />
    ),
    timeSlotWrapper: (props: any) => (
      <TimeSlot {...props} readOnly={readOnly} />
    )
  }

  return (
    <div className={`h-full ${className}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full">
        <BigCalendar
          localizer={localizer}
          events={mockAppointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          view={view}
          onView={setView}
          date={date}
          onNavigate={handleNavigate}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable={!readOnly}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          components={components}
          step={30}
          timeslots={2}
          min={new Date(2024, 0, 1, 8, 0, 0)}
          max={new Date(2024, 0, 1, 20, 0, 0)}
          formats={{
            timeGutterFormat: 'HH:mm',
            eventTimeRangeFormat: ({ start, end }) => 
              `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`
          }}
        />
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedAppointment(null)
        }}
        appointment={selectedAppointment}
        userRole={userRole}
        readOnly={readOnly}
      />
    </div>
  )
}