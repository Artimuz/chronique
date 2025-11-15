'use client'

import { useState } from 'react'
import Link from 'next/link'
import FormField from '@/components/form/FormField'
import Button from '@/components/ui/Button'
import Toast from '@/components/ui/Toast'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setShowToast(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link 
          href="/register" 
          className="text-blue-600 hover:text-blue-500"
        >
          Create account →
        </Link>
      </div>

      {showToast && (
        <Toast
          message="Login attempt completed"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}