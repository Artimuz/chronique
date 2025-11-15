'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/ui/Loading'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'customer' | 'business'
}

export default function ProtectedRoute({ 
  children, 
  requiredRole 
}: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate auth check
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Mock authentication - replace with real auth logic
        const mockUser = {
          isAuthenticated: true,
          role: 'customer'
        }
        
        setIsAuthenticated(mockUser.isAuthenticated)
        setUserRole(mockUser.role)
        
        if (!mockUser.isAuthenticated) {
          router.push('/login')
          return
        }
        
        if (requiredRole && mockUser.role !== requiredRole) {
          router.push('/dashboard')
          return
        }
      } catch (error) {
        setIsAuthenticated(false)
        router.push('/login')
      }
    }

    checkAuth()
  }, [router, requiredRole])

  if (isAuthenticated === null) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return null
  }

  if (requiredRole && userRole !== requiredRole) {
    return null
  }

  return <>{children}</>
}