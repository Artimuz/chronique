interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  variant?: 'spinner' | 'skeleton'
}

export default function Loading({ 
  size = 'md', 
  text,
  variant = 'spinner' 
}: LoadingProps) {
  if (variant === 'skeleton') {
    return <LoadingSkeleton size={size} />
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizeClasses[size]}`} />
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  )
}

function LoadingSkeleton({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const heights = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8'
  }

  return (
    <div className="animate-pulse">
      <div className={`bg-gray-300 rounded ${heights[size]} mb-2`} />
      <div className={`bg-gray-300 rounded ${heights[size]} w-3/4 mb-2`} />
      <div className={`bg-gray-300 rounded ${heights[size]} w-1/2`} />
    </div>
  )
}