'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

interface SidebarProps {
  userRole?: 'customer' | 'business'
}

export default function Sidebar({ userRole = 'customer' }: SidebarProps) {
  const pathname = usePathname()

  const customerNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
    { name: 'All Businesses', href: '/businesses', icon: 'businesses' },
    { name: 'My Appointments', href: '/my-appointments', icon: 'appointments' },
    { name: 'Settings', href: '/settings', icon: 'settings' },
  ]

  const businessNavItems = [
    { name: 'Business Dashboard', href: '/business-dashboard', icon: 'dashboard' },
    { name: 'Calendar', href: '/business/calendar', icon: 'calendar' },
    { name: 'Appointments', href: '/business/appointments', icon: 'appointments' },
    { name: 'Profile', href: '/business/profile', icon: 'profile' },
    { name: 'Theme', href: '/business/theme', icon: 'theme' },
    { name: 'Availability', href: '/business/availability', icon: 'availability' },
  ]

  const navItems = userRole === 'business' ? businessNavItems : customerNavItems

  const isActive = (href: string) => pathname === href

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen sticky top-0">
      <div className="p-4">
        <Card className="mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">U</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">User Name</p>
              <p className="text-sm text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>
        </Card>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive(item.href)
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3">
                {item.icon === 'dashboard' && '📊'}
                {item.icon === 'businesses' && '🏢'}
                {item.icon === 'appointments' && '📅'}
                {item.icon === 'settings' && '⚙️'}
                {item.icon === 'calendar' && '📆'}
                {item.icon === 'profile' && '👤'}
                {item.icon === 'theme' && '🎨'}
                {item.icon === 'availability' && '🕐'}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button variant="outline" className="w-full">
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  )
}