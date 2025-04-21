import type { UseFormReturn } from 'react-hook-form'
import type { BookingFormData } from '../types'
import { useEffect } from 'react'

interface ValidationConfig {
  fields?: (keyof BookingFormData)[]
  customValidation?: (formData: Partial<BookingFormData>) => boolean
  alwaysValid?: boolean
}

export function useStepValidation(
  form: UseFormReturn<BookingFormData>,
  onValidityChangeAction: (isValid: boolean) => void,
  config: ValidationConfig,
) {
  const { watch, formState: { errors } } = form

  useEffect(() => {
    if (config.alwaysValid) {
      onValidityChangeAction(true)
      return
    }

    const subscription = watch((formData) => {
      if (!formData)
        return

      let isValid = true

      // Check for field errors and existence
      if (config.fields) {
        for (const field of config.fields) {
          const value = formData[field]
          const error = errors[field]

          if (error || !value) {
            isValid = false
            break
          }
        }
      }

      // Run custom validation if provided
      if (config.customValidation && isValid) {
        isValid = config.customValidation(formData as Partial<BookingFormData>)
      }

      onValidityChangeAction(isValid)
    })

    return () => subscription.unsubscribe()
  }, [watch, errors, config, onValidityChangeAction])
}
