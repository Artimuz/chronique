'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ThemeSelector from '@/components/theme/ThemeSelector'
import ColorPalette from '@/components/theme/ColorPalette'
import ThemePreview from '@/components/theme/ThemePreview'

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

const defaultThemes: Theme[] = [
  {
    id: 'blue',
    name: 'Ocean Blue',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#60A5FA',
      background: '#F8FAFC',
      text: '#1F2937'
    }
  },
  {
    id: 'green',
    name: 'Forest Green',
    colors: {
      primary: '#10B981',
      secondary: '#047857',
      accent: '#34D399',
      background: '#F0FDF4',
      text: '#1F2937'
    }
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    colors: {
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      accent: '#A78BFA',
      background: '#FAF5FF',
      text: '#1F2937'
    }
  }
]

export default function ThemeCustomizer() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(defaultThemes[0])
  const [customColors, setCustomColors] = useState(selectedTheme.colors)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop')

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme)
    setCustomColors(theme.colors)
  }

  const handleColorChange = (colorKey: string, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: value
    }))
  }

  const handleSave = () => {
    // Save theme settings
    console.log('Saving theme:', { ...selectedTheme, colors: customColors })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Theme Selection
            </h2>
            <ThemeSelector
              themes={defaultThemes}
              selectedTheme={selectedTheme}
              onThemeSelect={handleThemeSelect}
            />
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Color Customization
            </h2>
            <ColorPalette
              colors={customColors}
              onColorChange={handleColorChange}
            />
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Preview Mode
            </h2>
            <div className="flex space-x-2 mb-4">
              <Button
                variant={previewMode === 'desktop' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('desktop')}
              >
                Desktop
              </Button>
              <Button
                variant={previewMode === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreviewMode('mobile')}
              >
                Mobile
              </Button>
            </div>
          </Card>

          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">
              Reset
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Theme
            </Button>
          </div>
        </div>

        <div className="lg:sticky lg:top-6">
          <Card>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Live Preview
            </h2>
            <ThemePreview
              theme={{ ...selectedTheme, colors: customColors }}
              mode={previewMode}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}