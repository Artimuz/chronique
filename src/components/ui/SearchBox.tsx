'use client'

import { useState, useRef } from 'react'
import Button from './Button'

interface SearchBoxProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export default function SearchBox({ 
  placeholder = "Search businesses...", 
  onSearch = () => {},
  className = ""
}: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = async () => {
    if (!query.trim()) return
    
    setIsSearching(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    onSearch(query.trim())
    setIsSearching(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <div className={`relative max-w-md w-full ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          disabled={isSearching}
        />
        
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          {query && !isSearching && (
            <button
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 mr-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          
          <Button
            onClick={handleSearch}
            disabled={!query.trim() || isSearching}
            size="sm"
          >
            {isSearching ? '...' : 'Search'}
          </Button>
        </div>
      </div>
    </div>
  )
}