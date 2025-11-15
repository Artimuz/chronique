'use client'

import { useState, useEffect } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import FormField from '@/components/form/FormField'
import DatePicker from '@/components/form/DatePicker'
import TimePicker from '@/components/form/TimePicker'
import Toast from '@/components/ui/Toast'

interface Appointment {
  id: string
  title: string
  start: Date
  end: Date
  customer?: string
  status?: 'confirmed' | 'pending' | 'cancelled'
  notes?: string
}

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  appointment?: Appointment | null
  userRole?: 'customer' | 'business'
  readOnly?: boolean
}

export default function AppointmentModal({
  isOpen,
  onClose,
  appointment,
  userRole = 'customer',
  readOnly = false
}: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    customer: '',
    notes: '',
    status: 'pending' as 'confirmed' | 'pending' | 'cancelled'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (appointment) {
      setFormData({
        title: appointment.title || '',
        date: appointment.start.toISOString().split('T')[0],
        startTime: appointment.start.toTimeString().slice(0, 5),
        endTime: appointment.end.toTimeString().slice(0, 5),
        customer: appointment.customer || '',
        notes: appointment.notes || '',
        status: appointment.status || 'pending'
      })
    } else {
      setFormData({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        customer: '',
        notes: '',
        status: 'pending'
      })
    }
  }, [appointment])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setShowToast(true)
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: string) => {
    setFormData(prev => ({ ...prev, date }))
  }

  const handleTimeChange = (field: 'startTime' | 'endTime', time: string) => {
    setFormData(prev => ({ ...prev, [field]: time }))
  }

  const handleDelete = async () => {
    if (!appointment?.id) return
    
    const confirmed = window.confirm('Are you sure you want to cancel this appointment?')
    if (confirmed) {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsLoading(false)
      onClose()
    }
  }

  const isNewAppointment = !appointment?.id
  const canEdit = !readOnly && (userRole === 'business' || isNewAppointment)
  const canDelete = !readOnly && userRole === 'business' && !isNewAppointment

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={isNewAppointment ? 'Book Appointment' : 'Appointment Details'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={userRole === 'customer' ? 'Appointment with...' : 'Service description'}
            required
            disabled={!canEdit}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <DatePicker
                value={formData.date}
                onChange={handleDateChange}
                disabled={!canEdit}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <TimePicker
                  value={formData.startTime}
                  onChange={(time) => handleTimeChange('startTime', time)}
                  disabled={!canEdit}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <TimePicker
                  value={formData.endTime}
                  onChange={(time) => handleTimeChange('endTime', time)}
                  disabled={!canEdit}
                />
              </div>
            </div>
          </div>

          {(userRole === 'business' || !isNewAppointment) && (
            <FormField
              label="Customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              disabled={!canEdit || userRole === 'customer'}
            />
          )}

          {userRole === 'business' && !isNewAppointment && (
            <FormField
              label="Status"
              name="status"
              as="select"
              value={formData.status}
              onChange={handleChange}
              disabled={!canEdit}
              options={[
                { value: 'pending', label: 'Pending' },
                { value: 'confirmed', label: 'Confirmed' },
                { value: 'cancelled', label: 'Cancelled' }
              ]}
            />
          )}

          <FormField
            label="Notes"
            name="notes"
            as="textarea"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            disabled={!canEdit}
          />

          <div className="flex justify-between pt-4">
            <div>
              {canDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  Cancel Appointment
                </Button>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {canEdit ? 'Cancel' : 'Close'}
              </Button>
              
              {canEdit && (
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : isNewAppointment ? 'Book Appointment' : 'Update'}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Modal>

      {showToast && (
        <Toast
          message={isNewAppointment ? 'Appointment booked successfully!' : 'Appointment updated successfully!'}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}