import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface StepLayoutProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  contentClassName?: string
}

export function StepLayout({
  title,
  description,
  children,
  className = "rounded-none border-0 shadow-none",
  contentClassName = "px-6"
}: StepLayoutProps) {
  return (
    <Card className={className}>
      <CardHeader className="pt-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={contentClassName}>
        {children}
      </CardContent>
    </Card>
  )
}