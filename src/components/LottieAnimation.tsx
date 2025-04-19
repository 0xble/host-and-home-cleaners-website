'use client'

import type { LottieComponentProps, LottieRefCurrentProps } from 'lottie-react'
import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface LottieAnimationProps extends LottieComponentProps {
  className?: string
  onPlay?: () => void
}

export default function LottieAnimation({ className, onPlay, ...props }: LottieAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (onPlay) {
      lottieRef.current?.goToAndPlay(0, true)
    }
  }, [onPlay])

  return (
    <div className={className}>
      <Lottie
        lottieRef={lottieRef}
        autoplay={false}
        loop={false}
        {...props}
      />
    </div>
  )
}
