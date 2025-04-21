import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'

export default function BookingLoading() {
  return (
    <div className="relative min-h-screen pb-24">
      <div className="p-6">
        <Button variant="outline" size="default" asChild className="rounded-full px-5">
          <Link href={ROUTES.HOME.href}>
            Exit
          </Link>
        </Button>
      </div>

      <div className="space-y-8 px-6">
        {/* Loading title */}
        <Skeleton className="h-8 w-3/4 max-w-md" />

        {/* Loading content area */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-full max-w-lg" />
          <Skeleton className="h-12 w-full max-w-lg" />
          <Skeleton className="h-12 w-3/4 max-w-lg" />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed inset-x-0 bottom-20 z-10 bg-white">
        <Progress
          className="h-2 w-full rounded-none"
          value={0}
        />
      </div>
      <div className="fixed inset-x-0 bottom-0 z-10 h-20 bg-white shadow-md">
        <div className="flex size-full items-center justify-between px-6 py-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
