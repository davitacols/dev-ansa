"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

type AnimationStyle = "particles" | "gradient" | "waves" | "grid" | "noise"

interface AnimatedBackgroundProps {
  className?: string
  style?: AnimationStyle
  color?: string
  secondaryColor?: string
  density?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
  interactive?: boolean
  opacity?: number
}

export function AnimatedBackground({
  className = "",
  style = "particles",
  color,
  secondaryColor,
  density = "medium",
  speed = "medium",
  interactive = false,
  opacity = 0.1,
}: AnimatedBackgroundProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Default colors based on theme
  const defaultPrimaryColor = isDark ? "emerald" : "emerald"
  const defaultSecondaryColor = isDark ? "blue" : "blue"

  // Use provided colors or defaults
  const primaryColor = color || defaultPrimaryColor
  const finalSecondaryColor = secondaryColor || defaultSecondaryColor

  // Map density to actual values
  const densityMap = {
    low: style === "particles" ? 10 : 3,
    medium: style === "particles" ? 20 : 5,
    high: style === "particles" ? 30 : 8,
  }

  // Map speed to duration values (in seconds)
  const speedMap = {
    slow: style === "gradient" ? 30 : 15,
    medium: style === "gradient" ? 20 : 10,
    fast: style === "gradient" ? 10 : 5,
  }

  const particleCount = densityMap[density]
  const animationDuration = speedMap[speed]

  // Choose the appropriate background style
  switch (style) {
    case "particles":
      return (
        <ParticlesBackground
          className={className}
          primaryColor={primaryColor}
          secondaryColor={finalSecondaryColor}
          particleCount={particleCount}
          duration={animationDuration}
          interactive={interactive}
          opacity={opacity}
        />
      )
    case "gradient":
      return (
        <GradientBackground
          className={className}
          primaryColor={primaryColor}
          secondaryColor={finalSecondaryColor}
          duration={animationDuration}
          opacity={opacity}
        />
      )
    case "waves":
      return (
        <WavesBackground
          className={className}
          primaryColor={primaryColor}
          secondaryColor={finalSecondaryColor}
          waveCount={particleCount}
          duration={animationDuration}
          opacity={opacity}
        />
      )
    case "grid":
      return (
        <GridBackground
          className={className}
          primaryColor={primaryColor}
          secondaryColor={finalSecondaryColor}
          density={density}
          duration={animationDuration}
          opacity={opacity}
        />
      )
    case "noise":
      return (
        <NoiseBackground
          className={className}
          primaryColor={primaryColor}
          secondaryColor={finalSecondaryColor}
          opacity={opacity}
        />
      )
    default:
      return (
        <ParticlesBackground
          className={className}
          primaryColor={primaryColor}
          secondaryColor={finalSecondaryColor}
          particleCount={particleCount}
          duration={animationDuration}
          interactive={interactive}
          opacity={opacity}
        />
      )
  }
}

// Particles Background
interface ParticlesBackgroundProps {
  className?: string
  primaryColor: string
  secondaryColor: string
  particleCount: number
  duration: number
  interactive: boolean
  opacity: number
}

function ParticlesBackground({
  className = "",
  primaryColor,
  secondaryColor,
  particleCount,
  duration,
  interactive,
  opacity,
}: ParticlesBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement for interactive mode
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)

      return () => {
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [interactive])

  // Generate particles
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * duration + duration / 2,
    delay: Math.random() * 5,
    color: Math.random() > 0.5 ? primaryColor : secondaryColor,
  }))

  // Function to get color classes based on the color name
  const getColorClasses = (colorName: string) => {
    switch (colorName) {
      case 'blue':
        return 'bg-blue-500 dark:bg-blue-400';
      case 'emerald':
        return 'bg-emerald-500 dark:bg-emerald-400';
      // Add more color options as needed
      default:
        return 'bg-gray-500 dark:bg-gray-400';
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      style={{ opacity }}
      suppressHydrationWarning={true}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${getColorClasses(particle.color)}`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: interactive
              ? [0, (mousePosition.x / (containerRef.current?.offsetWidth || 1)) * 100 - 50, 0]
              : [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: interactive
              ? [0, (mousePosition.y / (containerRef.current?.offsetHeight || 1)) * 100 - 50, 0]
              : [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          suppressHydrationWarning={true}
        />
      ))}
    </div>
  )
}

// Gradient Background
interface GradientBackgroundProps {
  className?: string
  primaryColor: string
  secondaryColor: string
  duration: number
  opacity: number
}

function GradientBackground({
  className = "",
  primaryColor,
  secondaryColor,
  duration,
  opacity,
}: GradientBackgroundProps) {
  // Helper function to get gradient classes based on color names
  const getGradientClasses = (primary: string, secondary: string) => {
    // Create mappings for the specific combinations you need
    const gradientClasses = {
      'emerald-blue': 'from-emerald-50/30 via-transparent to-blue-50/30 dark:from-emerald-900/20 dark:via-transparent dark:to-blue-900/20',
      'blue-emerald': 'from-blue-50/30 via-transparent to-emerald-50/30 dark:from-blue-900/20 dark:via-transparent dark:to-emerald-900/20',
      // Add more combinations as needed
    }
    
    const key = `${primary}-${secondary}`;
    return gradientClasses[key] || 'from-gray-50/30 via-transparent to-gray-50/30 dark:from-gray-900/20 dark:via-transparent dark:to-gray-900/20';
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${getGradientClasses(primaryColor, secondaryColor)}`}
        style={{ opacity }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
        suppressHydrationWarning={true}
      />
    </div>
  )
}

// Waves Background
interface WavesBackgroundProps {
  className?: string
  primaryColor: string
  secondaryColor: string
  waveCount: number
  duration: number
  opacity: number
}

function WavesBackground({
  className = "",
  primaryColor,
  secondaryColor,
  waveCount,
  duration,
  opacity,
}: WavesBackgroundProps) {
  const waves = Array.from({ length: waveCount }).map((_, i) => ({
    id: i,
    amplitude: Math.random() * 20 + 10,
    frequency: Math.random() * 0.02 + 0.01,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.5 + 0.5,
    color: i % 2 === 0 ? primaryColor : secondaryColor,
    opacity: (Math.random() * 0.3 + 0.1) * opacity,
  }))

  // Function to get color classes based on the color name
  const getWaveColorClasses = (colorName: string) => {
    switch (colorName) {
      case 'blue':
        return 'bg-blue-500/10 dark:bg-blue-400/10';
      case 'emerald':
        return 'bg-emerald-500/10 dark:bg-emerald-400/10';
      // Add more color options as needed
      default:
        return 'bg-gray-500/10 dark:bg-gray-400/10';
    }
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          className={`absolute bottom-0 left-0 right-0 ${getWaveColorClasses(wave.color)}`}
          style={{
            height: wave.amplitude * 2,
            opacity: wave.opacity,
          }}
          animate={{
            y: [0, -wave.amplitude, 0, wave.amplitude, 0],
          }}
          transition={{
            duration: duration * wave.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          suppressHydrationWarning={true}
        />
      ))}
    </div>
  )
}

// Grid Background
interface GridBackgroundProps {
  className?: string
  primaryColor: string
  secondaryColor: string
  density: "low" | "medium" | "high"
  duration: number
  opacity: number
}

function GridBackground({
  className = "",
  primaryColor,
  secondaryColor,
  density,
  duration,
  opacity,
}: GridBackgroundProps) {
  // Map density to grid size
  const gridSizeMap = {
    low: 8,
    medium: 12,
    high: 16,
  }

  const gridSize = gridSizeMap[density]
  const gridItems = Array.from({ length: gridSize * gridSize }).map((_, i) => ({
    id: i,
    row: Math.floor(i / gridSize),
    col: i % gridSize,
    delay: Math.random() * 2,
    color: Math.random() > 0.7 ? primaryColor : Math.random() > 0.5 ? secondaryColor : "gray",
  }))

  // Function to get color classes based on the color name
  const getGridColorClasses = (colorName: string) => {
    switch (colorName) {
      case 'blue':
        return 'bg-blue-500/10 dark:bg-blue-400/10 border border-blue-200/5 dark:border-blue-700/5';
      case 'emerald':
        return 'bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-200/5 dark:border-emerald-700/5';
      case 'gray':
        return 'bg-gray-500/10 dark:bg-gray-400/10 border border-gray-200/5 dark:border-gray-700/5';
      // Add more color options as needed
      default:
        return 'bg-gray-500/10 dark:bg-gray-400/10 border border-gray-200/5 dark:border-gray-700/5';
    }
  };

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none grid", className)}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        opacity,
      }}
      suppressHydrationWarning={true}
    >
      {gridItems.map((item) => (
        <motion.div
          key={item.id}
          className={getGridColorClasses(item.color)}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: duration / 2,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          suppressHydrationWarning={true}
        />
      ))}
    </div>
  )
}

// Noise Background
interface NoiseBackgroundProps {
  className?: string
  primaryColor: string
  secondaryColor: string
  opacity: number
}

function NoiseBackground({ className = "", primaryColor, secondaryColor, opacity }: NoiseBackgroundProps) {
  // Function to get gradient classes based on color names for the noise component
  const getNoiseGradientClasses = (primary: string, secondary: string) => {
    // Create mappings for the specific combinations you need
    const gradientClasses = {
      'emerald-blue': 'from-emerald-500/5 via-transparent to-blue-500/5 dark:from-emerald-400/5 dark:via-transparent dark:to-blue-400/5',
      'blue-emerald': 'from-blue-500/5 via-transparent to-emerald-500/5 dark:from-blue-400/5 dark:via-transparent dark:to-emerald-400/5',
      // Add more combinations as needed
    }
    
    const key = `${primary}-${secondary}`;
    return gradientClasses[key] || 'from-gray-500/5 via-transparent to-gray-500/5 dark:from-gray-400/5 dark:via-transparent dark:to-gray-400/5';
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)} style={{ opacity }} suppressHydrationWarning={true}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feBlend mode="multiply" in2="SourceGraphic" result="monoNoise" />
          <feColorMatrix in="monoNoise" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${getNoiseGradientClasses(primaryColor, secondaryColor)} mix-blend-overlay`}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
        suppressHydrationWarning={true}
      />
    </div>
  )
}

// Export individual background components for direct use
export { ParticlesBackground, GradientBackground, WavesBackground, GridBackground, NoiseBackground }