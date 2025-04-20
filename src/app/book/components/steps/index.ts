import { ServiceSelectionStep } from './ServiceSelectionStep'
import { CustomerDetailsStep } from './CustomerDetailsStep'
import { AddressInputStep } from './AddressInputStep'
import { GettingStartedStep } from './GettingStartedStep'
import { ChooseYourServiceStep } from './ChooseYourServiceStep'
import { TellUsAboutYourPlaceStep } from './TellUsAboutYourPlaceStep'
import { SizeSelectionStep } from './SizeSelectionStep'
import { HoursSelectionStep } from './HoursSelectionStep'
import { BookingStep } from '../../types/steps'
import type { BaseStepProps } from '../../types/steps'
import type { ComponentType } from 'react'

type StepComponent = ComponentType<BaseStepProps>

export const STEP_COMPONENTS: Partial<Record<BookingStep, StepComponent>> = {
  [BookingStep.GETTING_STARTED]: GettingStartedStep,
  [BookingStep.CHOOSE_YOUR_SERVICE]: ChooseYourServiceStep,
  [BookingStep.SERVICE_SELECTION]: ServiceSelectionStep,
  [BookingStep.TELL_US_ABOUT_YOUR_PLACE]: TellUsAboutYourPlaceStep,
  [BookingStep.SIZE_SELECTION]: SizeSelectionStep,
  [BookingStep.HOURS_SELECTION]: HoursSelectionStep,
  [BookingStep.CUSTOMER_DETAILS]: CustomerDetailsStep,
  [BookingStep.ADDRESS_INPUT]: AddressInputStep,
  // Add other steps as they are created
} as const