import type { ButtonProps } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useRef } from 'react'

interface GradientButtonProps extends ButtonProps {
  className?: string
}

export function GradientButton({
  className,
  children,
  ...props
}: GradientButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button)
      return

    const updateMousePosition = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      button.style.setProperty('--mouse-x', x.toString())
      button.style.setProperty('--mouse-y', y.toString())
    }

    button.addEventListener('mousemove', updateMousePosition)
    return () => button.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <button
      ref={buttonRef}
      className={cn(
        buttonVariants({ size: 'lg' }),
        'text-lg font-normal',
        'relative overflow-hidden transition-all duration-100 ease-in-out',
        'before:absolute before:inset-0 before:z-[1] before:bg-gradient-to-br before:from-gradient-start before:via-gradient-middle before:to-gradient-end before:opacity-0 before:transition-all hover:before:opacity-100',
        'after:absolute after:inset-0 after:z-[1] after:bg-gradient-to-br after:from-gradient-start after:via-gradient-middle after:to-gradient-end after:transition-all',
        'after:bg-[position:calc((100_-_var(--mouse-x,_0))_*_1%)_calc((100_-_var(--mouse-y,_0))_*_1%)]',
        '[&>span]:relative [&>span]:z-[2] text-white',
        'active:scale-[0.96]',
        'active:after:from-primary active:after:via-primary active:after:to-primary',
        'active:before:opacity-100 active:before:from-primary active:before:via-primary active:before:to-primary',
        'transform-gpu',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
    </button>
  )
}
