export const SERVICES = [
  {
    id: 'standard',
    name: 'Standard Cleaning',
    description: 'Regular maintenance cleaning for your home',
  },
  {
    id: 'deep',
    name: 'Deep Cleaning',
    description: 'Thorough cleaning of all areas including hard to reach spots',
  },
  {
    id: 'move-in-out',
    name: 'Move In/Out Cleaning',
    description: 'Detailed cleaning when moving in or out of a property',
  },
  {
    id: 'vacation-rental',
    name: 'Vacation Rental Cleaning',
    description: 'Specialized cleaning for vacation rental properties',
  },
] as const

export const ARRIVAL_WINDOWS = [
  {
    id: '8-10',
    name: '8:00 AM - 10:00 AM',
  },
  {
    id: '10-12',
    name: '10:00 AM - 12:00 PM',
  },
  {
    id: '12-2',
    name: '12:00 PM - 2:00 PM',
  },
  {
    id: '2-4',
    name: '2:00 PM - 4:00 PM',
  },
  {
    id: '4-6',
    name: '4:00 PM - 6:00 PM',
  },
] as const

export const FREQUENCIES = [
  {
    id: 'one-time',
    name: 'One Time',
    description: 'Single cleaning service',
  },
  {
    id: 'weekly',
    name: 'Weekly',
    description: 'Regular cleaning every week',
  },
  {
    id: 'bi-weekly',
    name: 'Bi-Weekly',
    description: 'Regular cleaning every two weeks',
  },
  {
    id: 'monthly',
    name: 'Monthly',
    description: 'Regular cleaning once a month',
  },
] as const

export const HOME_SIZES = [
  {
    id: 'small',
    name: 'Small Home',
    description: 'Up to 1,000 sq ft',
    baseHours: 2,
  },
  {
    id: 'medium',
    name: 'Medium Home',
    description: '1,000 - 2,000 sq ft',
    baseHours: 3,
  },
  {
    id: 'large',
    name: 'Large Home',
    description: '2,000 - 3,000 sq ft',
    baseHours: 4,
  },
  {
    id: 'xl',
    name: 'Extra Large Home',
    description: '3,000+ sq ft',
    baseHours: 5,
  },
] as const

export const US_STATES = [
  { id: 'HI', name: 'Hawaii' },
  { id: 'SC', name: 'South Carolina' },
] as const