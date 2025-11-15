import { cn } from '@/lib/utils'

interface Theme {
  id: string
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
}

interface ThemePreviewProps {
  theme: Theme
  mode?: 'desktop' | 'mobile'
  className?: string
}

export default function ThemePreview({
  theme,
  mode = 'desktop',
  className
}: ThemePreviewProps) {
  const isMobile = mode === 'mobile'

  return (
    <div className={cn(
      'border rounded-lg overflow-hidden shadow-sm',
      isMobile ? 'max-w-sm mx-auto' : 'w-full',
      className
    )}>
      <div className="bg-gray-100 p-2">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      
      <div 
        style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
        className={cn('p-4', isMobile ? 'text-sm' : '')}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b" style={{ borderColor: theme.colors.accent }}>
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: theme.colors.primary }}
            >
              B
            </div>
            <span className="font-bold">Business Name</span>
          </div>
          {!isMobile && (
            <div className="flex items-center space-x-2">
              <button 
                className="px-3 py-1 rounded text-sm font-medium"
                style={{ 
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.text
                }}
              >
                Contact
              </button>
              <button 
                className="px-3 py-1 rounded text-sm font-medium text-white"
                style={{ backgroundColor: theme.colors.primary }}
              >
                Book Now
              </button>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold mb-2">Welcome to Our Business</h2>
            <p className="text-sm opacity-80">
              Professional services with excellent customer care
            </p>
          </div>

          {/* Calendar Preview */}
          <div className="border rounded p-3" style={{ borderColor: theme.colors.accent }}>
            <h3 className="text-sm font-semibold mb-2">Calendar</h3>
            <div className={cn(
              'grid gap-1',
              isMobile ? 'grid-cols-4' : 'grid-cols-7'
            )}>
              {Array.from({ length: isMobile ? 8 : 14 }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    'aspect-square rounded text-xs flex items-center justify-center',
                    i === 5 ? 'text-white' : 'opacity-60'
                  )}
                  style={{
                    backgroundColor: i === 5 ? theme.colors.primary : theme.colors.accent,
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Card */}
          <div 
            className="border rounded p-3"
            style={{ 
              borderColor: theme.colors.accent,
              backgroundColor: theme.colors.background === '#FFFFFF' ? '#F9FAFB' : theme.colors.accent + '20'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Next Appointment</p>
                <p className="text-xs opacity-80">Tomorrow at 2:00 PM</p>
              </div>
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.colors.secondary }}
              />
            </div>
          </div>

          {isMobile && (
            <div className="flex space-x-2">
              <button 
                className="flex-1 px-3 py-2 rounded text-sm font-medium"
                style={{ 
                  backgroundColor: theme.colors.accent,
                  color: theme.colors.text
                }}
              >
                Contact
              </button>
              <button 
                className="flex-1 px-3 py-2 rounded text-sm font-medium text-white"
                style={{ backgroundColor: theme.colors.primary }}
              >
                Book
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}