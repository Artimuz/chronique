'use client'

import { useState } from 'react'
import Link from 'next/link'
import FormField from '@/components/form/FormField'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'customer' as 'customer' | 'business'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate registration API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setShowToast(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <FormField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <FormField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <FormField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <FormField
          label="Account Type"
          name="role"
          as="select"
          value={formData.role}
          onChange={handleChange}
          options={[
            { value: 'customer', label: 'Customer - Book services' },
            { value: 'business', label: 'Business - Provide services' }
          ]}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link 
          href="/login" 
          className="text-blue-600 hover:text-blue-500"
        >
          Already have an account →
        </Link>
      </div>

      {showToast && (
        <Toast
          message="Registration attempt completed"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}