'use client'

import Link from 'next/link'
import { useState } from 'react'
import SearchBox from '@/components/ui/SearchBox'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">BookingApp</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <SearchBox />
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
            
            <button 
              onClick={() => setIsUserMenuOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isUserMenuOpen} 
        onClose={() => setIsUserMenuOpen(false)}
        title="Menu"
      >
        <div className="space-y-4">
          <SearchBox />
          <div className="flex flex-col space-y-2">
            <Link href="/login">
              <Button variant="outline" className="w-full">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </Modal>
    </header>
  )
}