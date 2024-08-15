type Page = {
  name: string
  href: string
  priority: number
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
}

export const COMPANY_PAGES: Page[] = [
  {
    name: 'Home',
    href: '/',
    priority: 1,
    changeFrequency: 'weekly',
  },
  {
    name: 'About',
    href: '/about',
    priority: 0.4,
    changeFrequency: 'monthly',
  },
  {
    name: 'Booking',
    href: 'https://pristinemaidcleaning.bookingkoala.com/booknow',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    name: 'Apply',
    href: '/apply',
    priority: 0.6,
    changeFrequency: 'monthly',
  },
  {
    name: 'Login',
    href: 'https://pristinemaidcleaning.bookingkoala.com/login',
    priority: 0,
    changeFrequency: 'never',
  },
  {
    name: 'Checklist',
    href: '/checklist',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
]

export const SERVICE_PAGES: Page[] = [
  {
    name: 'Deep Cleaning',
    href: '/services/deep-cleaning',
    priority: 1,
    changeFrequency: 'monthly',
  },
  {
    name: 'Airbnb Cleaning',
    href: '/services/airbnb-cleaning',
    priority: 1,
    changeFrequency: 'monthly',
  },
  {
    name: 'Move In/Out Cleaning',
    href: '/services/move-cleaning',
    priority: 1,
    changeFrequency: 'monthly',
  },
  {
    name: 'Post-Construction Cleaning',
    href: '/services/post-construction-cleaning',
    priority: 1,
    changeFrequency: 'monthly',
  },
  {
    name: 'Office Cleaning',
    href: '/services/office-cleaning',
    priority: 1,
    changeFrequency: 'monthly',
  },
  {
    name: 'Standard Cleaning',
    href: '/services/standard-cleaning',
    priority: 1,
    changeFrequency: 'monthly',
  },
]

export const LEGAL_PAGES: Page[] = [
  {
    name: 'Privacy Policy',
    href: '/privacy',
    priority: 0.1,
    changeFrequency: 'yearly',
  },
  {
    name: 'Terms of Service',
    href: '/terms',
    priority: 0.1,
    changeFrequency: 'yearly',
  },
]

export const LOCATION_PAGES: Page[] = [
  {
    name: 'Myrtle Beach',
    href: '/house-cleaning-services-myrtle-beach',
    priority: 1,
    changeFrequency: 'weekly',
  },
]

export const ALL_PAGES: Page[] = [
  ...COMPANY_PAGES,
  ...LEGAL_PAGES,
  ...SERVICE_PAGES,
  ...LOCATION_PAGES,
]
