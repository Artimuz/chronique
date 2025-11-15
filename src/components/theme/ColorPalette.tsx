'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Colors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

interface ColorPaletteProps {
  colors: Colors
  onColorChange: (colorKey: string, value: string) => void
  className?: string
}

export default function ColorPalette({
  colors,
  onColorChange,
  className
}: ColorPaletteProps) {
  const [activeColor, setActiveColor] = useState<string | null>(null)

  const colorLabels = {
    primary: 'Primary Color',
    secondary: 'Secondary Color',
    accent: 'Accent Color',
    background: 'Background Color',
    text: 'Text Color'
  }

  const presetColors = [
    '#3B82F6', '#1E40AF', '#60A5FA', // Blues
    '#10B981', '#047857', '#34D399', // Greens
    '#8B5CF6', '#7C3AED', '#A78BFA', // Purples
    '#F59E0B', '#D97706', '#FBBF24', // Yellows/Oranges
    '#EF4444', '#DC2626', '#F87171', // Reds
    '#6B7280', '#374151', '#9CA3AF', // Grays
    '#FFFFFF', '#F9FAFB', '#1F2937', // Neutrals
  ]

  const handleColorClick = (colorKey: string, color: string) => {
    onColorChange(colorKey, color)
    setActiveColor(null)
  }

  return (
    <div className={cn('space-y-6', className)}>
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {colorLabels[key as keyof typeof colorLabels]}
          </label>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveColor(activeColor === key ? null : key)}
                className="w-12 h-10 rounded-lg border-2 border-gray-300 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ backgroundColor: value }}
              />
              <input
                type="color"
                value={value}
                onChange={(e) => onColorChange(key, e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            
            <input
              type="text"
              value={value}
              onChange={(e) => onColorChange(key, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="#000000"
            />
          </div>

          {activeColor === key && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-2">Quick colors:</p>
              <div className="grid grid-cols-7 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorClick(key, color)}
                    className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Color Preview</h4>
        <div 
          className="h-20 rounded-lg border p-4 space-y-2"
          style={{ 
            backgroundColor: colors.background,
            color: colors.text 
          }}
        >
          <div 
            className="h-3 rounded"
            style={{ backgroundColor: colors.primary, width: '80%' }}
          />
          <div 
            className="h-3 rounded"
            style={{ backgroundColor: colors.secondary, width: '60%' }}
          />
          <div 
            className="h-3 rounded"
            style={{ backgroundColor: colors.accent, width: '40%' }}
          />
        </div>
      </div>
    </div>
  )
}