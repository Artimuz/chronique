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

interface ThemeSelectorProps {
  themes: Theme[]
  selectedTheme: Theme
  onThemeSelect: (theme: Theme) => void
  className?: string
}

export default function ThemeSelector({
  themes,
  selectedTheme,
  onThemeSelect,
  className
}: ThemeSelectorProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onThemeSelect(theme)}
          className={cn(
            'p-4 rounded-lg border-2 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500',
            selectedTheme.id === theme.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          )}
        >
          <div className="space-y-3">
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">{theme.name}</h3>
            </div>
            
            <div className="flex space-x-1">
              <div 
                className="w-6 h-6 rounded-full border border-gray-200"
                style={{ backgroundColor: theme.colors.primary }}
                title="Primary color"
              />
              <div 
                className="w-6 h-6 rounded-full border border-gray-200"
                style={{ backgroundColor: theme.colors.secondary }}
                title="Secondary color"
              />
              <div 
                className="w-6 h-6 rounded-full border border-gray-200"
                style={{ backgroundColor: theme.colors.accent }}
                title="Accent color"
              />
              <div 
                className="w-6 h-6 rounded-full border border-gray-200"
                style={{ backgroundColor: theme.colors.background }}
                title="Background color"
              />
              <div 
                className="w-6 h-6 rounded-full border border-gray-200"
                style={{ backgroundColor: theme.colors.text }}
                title="Text color"
              />
            </div>
            
            <div 
              className="h-12 rounded border border-gray-200 p-2"
              style={{ 
                backgroundColor: theme.colors.background,
                color: theme.colors.text
              }}
            >
              <div 
                className="h-2 rounded mb-1"
                style={{ backgroundColor: theme.colors.primary, width: '70%' }}
              />
              <div 
                className="h-2 rounded"
                style={{ backgroundColor: theme.colors.accent, width: '50%' }}
              />
            </div>
            
            {selectedTheme.id === theme.id && (
              <div className="flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  )
}