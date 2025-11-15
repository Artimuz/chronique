'use client'

import { useState } from 'react'
import FormField from '@/components/form/FormField'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ImageUpload from '@/components/form/ImageUpload'
import Toast from '@/components/ui/Toast'

export default function BusinessSettings() {
  const [formData, setFormData] = useState({
    businessName: '',
    slug: '',
    description: '',
    category: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    isPublic: true
  })
  const [logo, setLogo] = useState<File | null>(null)
  const [banner, setBanner] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setShowToast(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Profile</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Business Name"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
            
            <FormField
              label="Custom URL Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              helperText="yoursite.com/your-slug"
              required
            />
          </div>

          <FormField
            label="Description"
            name="description"
            as="textarea"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Category"
              name="category"
              as="select"
              value={formData.category}
              onChange={handleChange}
              options={[
                { value: '', label: 'Select a category' },
                { value: 'health', label: 'Health & Wellness' },
                { value: 'beauty', label: 'Beauty & Spa' },
                { value: 'fitness', label: 'Fitness & Sports' },
                { value: 'education', label: 'Education & Training' },
                { value: 'professional', label: 'Professional Services' },
                { value: 'automotive', label: 'Automotive' },
                { value: 'home', label: 'Home Services' }
              ]}
              required
            />

            <FormField
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <FormField
              label="Website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <FormField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Logo
              </label>
              <ImageUpload
                onFileSelect={setLogo}
                accept="image/*"
                maxSize={5}
                preview
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner Image
              </label>
              <ImageUpload
                onFileSelect={setBanner}
                accept="image/*"
                maxSize={10}
                preview
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isPublic"
              checked={formData.isPublic}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">
              Make business page public
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Card>

      {showToast && (
        <Toast
          message="Business settings saved successfully"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}