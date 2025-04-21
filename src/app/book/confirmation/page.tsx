import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function Confirmation() {
  return (
    <div className="container max-w-lg py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Booking Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 text-center">
          <CheckCircle2 className="h-12 w-12 text-green-500" />

          <p className="text-muted-foreground">
            Your booking has been confirmed.
          </p>

          <div className="pt-4">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
