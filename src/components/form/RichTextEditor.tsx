'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface RichTextEditorProps {
  value?: string
  onChange?: (content: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
}

export default function RichTextEditor({
  value = '',
  onChange = () => {},
  placeholder = 'Start typing...',
  className,
  minHeight = '200px'
}: RichTextEditorProps) {
  const [content, setContent] = useState(value)
  const [activeTools, setActiveTools] = useState<Set<string>>(new Set())

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML
    setContent(newContent)
    onChange(newContent)
  }

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    updateActiveTools()
  }

  const updateActiveTools = () => {
    const newActiveTools = new Set<string>()
    
    if (document.queryCommandState('bold')) newActiveTools.add('bold')
    if (document.queryCommandState('italic')) newActiveTools.add('italic')
    if (document.queryCommandState('underline')) newActiveTools.add('underline')
    if (document.queryCommandState('insertOrderedList')) newActiveTools.add('ol')
    if (document.queryCommandState('insertUnorderedList')) newActiveTools.add('ul')
    
    setActiveTools(newActiveTools)
  }

  const toolbarButtons = [
    { command: 'bold', icon: 'B', title: 'Bold' },
    { command: 'italic', icon: 'I', title: 'Italic' },
    { command: 'underline', icon: 'U', title: 'Underline' },
    { command: 'insertUnorderedList', icon: '•', title: 'Bullet List' },
    { command: 'insertOrderedList', icon: '1.', title: 'Numbered List' },
    { command: 'formatBlock', value: 'h2', icon: 'H2', title: 'Heading 2' },
    { command: 'formatBlock', value: 'h3', icon: 'H3', title: 'Heading 3' },
  ]

  return (
    <div className={cn('border border-gray-300 rounded-lg overflow-hidden', className)}>
      <div className="flex items-center space-x-1 p-2 bg-gray-50 border-b border-gray-300">
        {toolbarButtons.map((button) => (
          <button
            key={button.command + (button.value || '')}
            type="button"
            onClick={() => executeCommand(button.command, button.value)}
            className={cn(
              'px-3 py-1 text-sm font-medium rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
              activeTools.has(button.command) || activeTools.has(button.command.replace('insert', '').toLowerCase())
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700'
            )}
            title={button.title}
          >
            {button.icon}
          </button>
        ))}
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <button
          type="button"
          onClick={() => executeCommand('createLink', prompt('Enter URL:') || '')}
          className="px-3 py-1 text-sm font-medium text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Add Link"
        >
          🔗
        </button>
        
        <button
          type="button"
          onClick={() => executeCommand('unlink')}
          className="px-3 py-1 text-sm font-medium text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Remove Link"
        >
          🔗❌
        </button>
      </div>
      
      <div
        contentEditable
        className="p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
        style={{ minHeight }}
        onInput={handleContentChange}
        onMouseUp={updateActiveTools}
        onKeyUp={updateActiveTools}
        dangerouslySetInnerHTML={{ __html: content }}
        data-placeholder={placeholder}
      />
      
      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9CA3AF;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}