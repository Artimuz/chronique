import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'
import Input from '@/components/ui/Input'
import { cn } from '@/lib/utils'

interface BaseFormFieldProps {
  label: string
  name: string
  error?: string
  helperText?: string
  required?: boolean
  className?: string
}

interface InputFieldProps extends BaseFormFieldProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  as?: 'input'
}

interface TextareaFieldProps extends BaseFormFieldProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
  as: 'textarea'
}

interface SelectFieldProps extends BaseFormFieldProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> {
  as: 'select'
  options?: { value: string; label: string }[]
}

type FormFieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps

export default function FormField({ 
  label, 
  name, 
  error, 
  helperText, 
  required, 
  className, 
  as = 'input',
  ...props 
}: FormFieldProps) {
  const fieldId = `field-${name}`
  const hasError = Boolean(error)

  const renderField = () => {
    const commonClasses = cn(
      'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
      hasError ? 'border-red-500 focus:ring-red-600' : 'border-gray-300'
    )

    if (as === 'textarea') {
      const textareaProps = props as TextareaFieldProps
      return (
        <textarea
          id={fieldId}
          name={name}
          className={cn(commonClasses, 'h-auto resize-y')}
          {...textareaProps}
        />
      )
    }

    if (as === 'select') {
      const selectProps = props as SelectFieldProps
      return (
        <select
          id={fieldId}
          name={name}
          className={commonClasses}
          {...selectProps}
        >
          {selectProps.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    }

    const inputProps = props as InputFieldProps
    return (
      <Input
        id={fieldId}
        name={name}
        error={hasError}
        {...inputProps}
      />
    )
  }

  return (
    <div className={className}>
      <label 
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {renderField()}
      
      {(error || helperText) && (
        <p className={cn(
          'mt-1 text-sm',
          error ? 'text-red-600' : 'text-gray-500'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  )
}