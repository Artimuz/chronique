'use client'

import { ReactNode } from 'react'

interface RoleGuardProps {
  children: ReactNode
  allowedRoles: ('customer' | 'business')[]
  userRole?: 'customer' | 'business'
  fallback?: ReactNode
}

export default function RoleGuard({ 
  children, 
  allowedRoles, 
  userRole = 'customer',
  fallback = null 
}: RoleGuardProps) {
  if (!allowedRoles.includes(userRole)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}