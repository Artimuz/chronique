import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { cn } from '@/lib/utils'

interface Appointment {
  id: string
  title: string
  start: Date
  end: Date
  customer?: string
  business?: string
  status?: 'confirmed' | 'pending' | 'cancelled'
  notes?: string
}

interface AppointmentCardProps {
  appointment: Appointment
  userRole?: 'customer' | 'business'
  onEdit?: (appointment: Appointment) => void
  onCancel?: (appointmentId: string) => void
  className?: string
}

export default function AppointmentCard({
  appointment,
  userRole = 'customer',
  onEdit = () => {},
  onCancel = () => {},
  className
}: AppointmentCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-700 bg-green-100'
      case 'pending':
        return 'text-yellow-700 bg-yellow-100'
      case 'cancelled':
        return 'text-red-700 bg-red-100'
      default:
        return 'text-gray-700 bg-gray-100'
    }
  }

  const isUpcoming = appointment.start > new Date()
  const isPast = appointment.start < new Date()

  return (
    <>
      <Card 
        className={cn(
          'hover:shadow-md transition-shadow cursor-pointer',
          isPast && 'opacity-75',
          className
        )}
        onClick={() => setShowDetails(true)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900">{appointment.title}</h3>
              <span className={cn(
                'px-2 py-1 text-xs font-medium rounded-full capitalize',
                getStatusColor(appointment.status || 'pending')
              )}>
                {appointment.status || 'pending'}
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>📅</span>
                <span>{formatDate(appointment.start)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🕐</span>
                <span>
                  {formatTime(appointment.start)} - {formatTime(appointment.end)}
                </span>
              </div>
              {userRole === 'business' && appointment.customer && (
                <div className="flex items-center space-x-2">
                  <span>👤</span>
                  <span>{appointment.customer}</span>
                </div>
              )}
              {userRole === 'customer' && appointment.business && (
                <div className="flex items-center space-x-2">
                  <span>🏢</span>
                  <span>{appointment.business}</span>
                </div>
              )}
            </div>

            {appointment.notes && (
              <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                {appointment.notes}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-2 ml-4">
            {isUpcoming && appointment.status !== 'cancelled' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(appointment)
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation()
                    onCancel(appointment.id)
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title="Appointment Details"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {appointment.title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={cn(
                'px-2 py-1 text-sm font-medium rounded-full capitalize',
                getStatusColor(appointment.status || 'pending')
              )}>
                {appointment.status || 'pending'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <p className="mt-1 text-sm text-gray-900">{formatDate(appointment.start)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <p className="mt-1 text-sm text-gray-900">
                {formatTime(appointment.start)} - {formatTime(appointment.end)}
              </p>
            </div>
          </div>

          {(appointment.customer || appointment.business) && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {userRole === 'business' ? 'Customer' : 'Business'}
              </label>
              <p className="mt-1 text-sm text-gray-900">
                {userRole === 'business' ? appointment.customer : appointment.business}
              </p>
            </div>
          )}

          {appointment.notes && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <p className="mt-1 text-sm text-gray-900">{appointment.notes}</p>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowDetails(false)}
            >
              Close
            </Button>
            {isUpcoming && appointment.status !== 'cancelled' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDetails(false)
                    onEdit(appointment)
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowDetails(false)
                    onCancel(appointment.id)
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}