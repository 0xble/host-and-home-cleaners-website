import type { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StepLayoutProps {
  title: string | ReactNode
  description?: string | ReactNode
  children: ReactNode
  className?: string
  label?: string
}

export function StepLayout({
  title,
  description,
  children,
  className,
  label,
}: StepLayoutProps) {
  return (
    <Card className="max-w-4xl mx-auto rounded-none border-0 shadow-none">
      <CardHeader className="pt-2">
        {label && (
          <div className="text-sm font-medium text-muted-foreground mb-2">{label}</div>
        )}
        <CardTitle>
          {title}
        </CardTitle>
        {description && (
          <CardDescription>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={cn('px-6', className)}>
        {children}
      </CardContent>
    </Card>
  )
}
