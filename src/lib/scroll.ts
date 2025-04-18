import { ROUTES } from './routes'

export function scrollToSection(sectionId: string) {
  const pathname = window.location.pathname
  const isHomePage = pathname === '/' || pathname === ROUTES.HOME.href

  if (!isHomePage) {
    // If not on home page, navigate to home page with hash
    window.location.href = `${ROUTES.HOME.href}#${sectionId}`
    return
  }

  const element = document.getElementById(sectionId)
  if (element) {
    const headerOffset = 80 // Adjust this value based on your header height
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    // Use requestAnimationFrame to ensure smooth scrolling works
    requestAnimationFrame(() => {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    })
  }
}
