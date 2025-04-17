"use client"

import { motion, AnimatePresence, type Variants } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

// Types for transition props
export type TransitionType =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "rotate"
  | "flip"
  | "zoom"
  | "none"

export type EasingType =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate"

interface PageTransitionProps {
  children: ReactNode
  className?: string
  type?: TransitionType
  duration?: number
  delay?: number
  easing?: EasingType
  staggerChildren?: boolean
  staggerDelay?: number
  enabled?: boolean
}

// Mapping of easing types to actual easing functions
const easingMap = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  circIn: [0.55, 0, 1, 0.45],
  circOut: [0, 0.55, 0.45, 1],
  circInOut: [0.85, 0, 0.15, 1],
  backIn: [0.36, 0, 0.66, -0.56],
  backOut: [0.34, 1.56, 0.64, 1],
  backInOut: [0.68, -0.6, 0.32, 1.6],
  anticipate: [0.38, 0.1, 0.12, 0.96],
}

// Generate variants based on transition type
const generateVariants = (type: TransitionType, duration: number, easing: EasingType): Variants => {
  const easingValue = easingMap[easing]
  const transition = { duration, ease: easingValue }

  switch (type) {
    case "fade":
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition },
        exit: { opacity: 0, transition: { ...transition, duration: duration * 0.75 } },
      }
    case "slide-up":
      return {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0, transition },
        exit: { opacity: 0, y: -50, transition: { ...transition, duration: duration * 0.75 } },
      }
    case "slide-down":
      return {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0, transition },
        exit: { opacity: 0, y: 50, transition: { ...transition, duration: duration * 0.75 } },
      }
    case "slide-left":
      return {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0, transition },
        exit: { opacity: 0, x: -50, transition: { ...transition, duration: duration * 0.75 } },
      }
    case "slide-right":
      return {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0, transition },
        exit: { opacity: 0, x: 50, transition: { ...transition, duration: duration * 0.75 } },
      }
    case "scale":
      return {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1, transition },
        exit: { opacity: 0, scale: 1.1, transition: { ...transition, duration: duration * 0.75 } },
      }
    case "rotate":
      return {
        initial: { opacity: 0, rotate: -5 },
        animate: { opacity: 1, rotate: 0, transition },
        exit: { opacity: 0, rotate: 5, transition: { ...transition, duration: duration * 0.75 } },
      }
    case "flip":
      return {
        initial: { opacity: 0, rotateX: 90 },
        animate: { opacity: 1, rotateX: 0, transition },
        exit: { opacity: 0, rotateX: -90, transition: { ...transition, duration: duration * 0.75 } },
      }
    case "zoom":
      return {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1, transition },
        exit: { opacity: 0, scale: 1.5, transition: { ...transition, duration: duration * 0.75 } },
      }
    case "none":
    default:
      return {
        initial: {},
        animate: {},
        exit: {},
      }
  }
}

// Child item variants for staggered animations
const childVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export function PageTransition({
  children,
  className = "",
  type = "fade",
  duration = 0.4,
  delay = 0,
  easing = "easeInOut",
  staggerChildren = false,
  staggerDelay = 0.1,
  enabled = true,
}: PageTransitionProps) {
  const pathname = usePathname()
  const [renderKey, setRenderKey] = useState(pathname)

  // Update the key when the pathname changes to trigger the animation
  useEffect(() => {
    setRenderKey(pathname)
  }, [pathname])

  // Generate variants based on props
  const variants = generateVariants(type, duration, easing)

  // If animations are disabled, just render the children
  if (!enabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={renderKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{
          delay,
          duration,
          ease: easingMap[easing],
        }}
        className={className}
      >
        {staggerChildren ? (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              animate: {
                transition: {
                  staggerChildren: staggerDelay,
                },
              },
              exit: {
                transition: {
                  staggerChildren: staggerDelay / 2,
                  staggerDirection: -1,
                },
              },
            }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </motion.div>
    </AnimatePresence>
  )
}

// Export individual transition components for convenience
export function FadeTransition(props: Omit<PageTransitionProps, "type">) {
  return <PageTransition {...props} type="fade" />
}

export function SlideUpTransition(props: Omit<PageTransitionProps, "type">) {
  return <PageTransition {...props} type="slide-up" />
}

export function SlideDownTransition(props: Omit<PageTransitionProps, "type">) {
  return <PageTransition {...props} type="slide-down" />
}

export function SlideLeftTransition(props: Omit<PageTransitionProps, "type">) {
  return <PageTransition {...props} type="slide-left" />
}

export function SlideRightTransition(props: Omit<PageTransitionProps, "type">) {
  return <PageTransition {...props} type="slide-right" />
}

export function ScaleTransition(props: Omit<PageTransitionProps, "type">) {
  return <PageTransition {...props} type="scale" />
}

export function RotateTransition(props: Omit<PageTransitionProps, "type">) {
  return <PageTransition {...props} type="rotate" />
}

export function FlipTransition(props: Omit<PageTransitionProps, "type">) {
  return <PageTransition {...props} type="flip" />
}

export function ZoomTransition(props: Omit<PageTransitionProps, "type">) {
  return <PageTransition {...props} type="zoom" />
}

// Staggered child item component
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  )
}

// Add StaggerChildren component that was missing
export function StaggerChildren({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Layout transition component for smoother layout changes
export function LayoutTransition({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Page wrapper that automatically applies transitions
export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <PageTransition type="fade" duration={0.4} className="min-h-screen">
      {children}
    </PageTransition>
  )
}
