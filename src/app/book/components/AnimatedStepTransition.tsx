import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface AnimatedStepTransitionProps {
  children: ReactNode
  direction: 'forward' | 'backward'
  currentStep: string | number
}

const variants = {
  enter: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? '-100%' : '100%',
    opacity: 0,
  }),
}

export function AnimatedStepTransition({
  children,
  direction,
  currentStep,
}: AnimatedStepTransitionProps) {
  return (
    <div className="relative overflow-hidden">
      <AnimatePresence
        mode="wait"
        initial={false}
        custom={direction}
      >
        <motion.div
          key={currentStep}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { duration: 0.3, ease: 'easeInOut' },
            opacity: { duration: 0.3, ease: 'easeInOut' },
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
