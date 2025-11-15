import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SearchBox from '@/components/ui/SearchBox'
import BusinessCard from '@/components/business/BusinessCard'
import Pagination from '@/components/ui/Pagination'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Service
            </h1>
            <SearchBox />
          </div>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Featured Businesses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BusinessCard />
              <BusinessCard />
              <BusinessCard />
            </div>
          </section>
          
          <Pagination />
        </div>
      </main>
      <Footer />
    </>
  )
}