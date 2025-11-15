import Link from 'next/link'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'

interface BusinessCardProps {
  business?: {
    id: string
    name: string
    slug: string
    description: string
    logo?: string
    banner?: string
    category: string
    rating: number
    reviewCount: number
    isPublic: boolean
  }
  loading?: boolean
}

export default function BusinessCard({ business, loading = false }: BusinessCardProps) {
  if (loading) {
    return (
      <Card>
        <Loading variant="skeleton" />
      </Card>
    )
  }

  // Mock data for demonstration
  const mockBusiness = business || {
    id: '1',
    name: 'Sample Business',
    slug: 'sample-business',
    description: 'Professional services with excellent customer care',
    logo: '/placeholder-logo.jpg',
    banner: '/placeholder-banner.jpg',
    category: 'Professional Services',
    rating: 4.8,
    reviewCount: 124,
    isPublic: true
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
      <Link href={`/${mockBusiness.slug}`}>
        <div className="space-y-4">
          <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
            {mockBusiness.banner ? (
              <Image
                src={mockBusiness.banner}
                alt={`${mockBusiness.name} banner`}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
            )}
            
            <div className="absolute bottom-2 left-2">
              <div className="w-12 h-12 bg-white rounded-full p-1 shadow-md">
                {mockBusiness.logo ? (
                  <Image
                    src={mockBusiness.logo}
                    alt={`${mockBusiness.name} logo`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-sm">
                      {mockBusiness.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
              {mockBusiness.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{mockBusiness.category}</p>
            <p className="text-sm text-gray-700 line-clamp-2">
              {mockBusiness.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="text-sm font-medium text-gray-900 ml-1">
                  {mockBusiness.rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({mockBusiness.reviewCount} reviews)
              </span>
            </div>
            
            <Button size="sm">
              View Calendar
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  )
}