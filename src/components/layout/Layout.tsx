import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
  userRole?: 'customer' | 'business'
}

export default function Layout({ 
  children, 
  showSidebar = true, 
  userRole = 'customer' 
}: LayoutProps) {
  if (!showSidebar) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}