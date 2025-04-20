import type { UseFormReturn } from 'react-hook-form'
import type { BookingFormValid } from './form'

export enum BookingStep {
  GETTING_STARTED = 0,
  CHOOSE_YOUR_SERVICE = 1,
  SERVICE_SELECTION = 2,
  TELL_US_ABOUT_YOUR_PLACE = 3,
  SIZE_SELECTION = 4,
  HOURS_SELECTION = 5,
  CUSTOMER_DETAILS = 6,
  ADDRESS_INPUT = 7,
  SCHEDULE = 8,
  CONFIRMATION = 9,
}

export interface BaseStepProps {
  form: UseFormReturn<BookingFormValid>;
  onValidityChange: (isValid: boolean) => void;
}