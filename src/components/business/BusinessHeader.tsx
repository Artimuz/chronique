import Image from 'next/image'
import Button from '@/components/ui/Button'

interface BusinessHeaderProps {
  business?: {
    name: string
    description: string
    logo?: string
    banner?: string
    category: string
    rating: number
    reviewCount: number
    contact: {
      phone?: string
      email?: string
      website?: string
      address?: string
    }
  }
}

export default function BusinessHeader({ business }: BusinessHeaderProps) {
  // Mock data for demonstration
  const mockBusiness = business || {
    name: 'Sample Business',
    description: 'Professional services with excellent customer care and attention to detail',
    logo: '/placeholder-logo.jpg',
    banner: '/placeholder-banner.jpg',
    category: 'Professional Services',
    rating: 4.8,
    reviewCount: 124,
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'contact@samplebusiness.com',
      website: 'www.samplebusiness.com',
      address: '123 Business St, City, State 12345'
    }
  }

  return (
    <div className="relative">
      <div className="h-64 bg-gray-100 overflow-hidden">
        {mockBusiness.banner ? (
          <Image
            src={mockBusiness.banner}
            alt={`${mockBusiness.name} banner`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>

      <div className="relative -mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-white rounded-full p-2 shadow-md">
                {mockBusiness.logo ? (
                  <Image
                    src={mockBusiness.logo}
                    alt={`${mockBusiness.name} logo`}
                    width={88}
                    height={88}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-2xl">
                      {mockBusiness.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {mockBusiness.name}
                  </h1>
                  <p className="text-lg text-gray-600 mb-2">
                    {mockBusiness.category}
                  </p>
                  <p className="text-gray-700 mb-4 max-w-2xl">
                    {mockBusiness.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="font-medium text-gray-900 ml-1">
                        {mockBusiness.rating}
                      </span>
                      <span className="text-gray-500 ml-1">
                        ({mockBusiness.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    {mockBusiness.contact.phone && (
                      <div className="flex items-center">
                        <span className="mr-2">📞</span>
                        {mockBusiness.contact.phone}
                      </div>
                    )}
                    {mockBusiness.contact.email && (
                      <div className="flex items-center">
                        <span className="mr-2">✉️</span>
                        {mockBusiness.contact.email}
                      </div>
                    )}
                    {mockBusiness.contact.website && (
                      <div className="flex items-center">
                        <span className="mr-2">🌐</span>
                        {mockBusiness.contact.website}
                      </div>
                    )}
                    {mockBusiness.contact.address && (
                      <div className="flex items-center">
                        <span className="mr-2">📍</span>
                        {mockBusiness.contact.address}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 md:mt-0">
                  <Button>
                    Book Now
                  </Button>
                  <Button variant="outline">
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}