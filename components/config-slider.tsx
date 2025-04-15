"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface ConfigSliderProps {
  label: string
  min?: number
  max?: number
  step?: number
  defaultValue?: number[]
  value?: number[]
  onValueChange?: (value: number[]) => void
  showValues?: boolean
  valuePrefix?: string
  valueSuffix?: string
  className?: string
  description?: string
  marks?: { value: number; label: string }[]
  isRange?: boolean
}

export function ConfigSlider({
  label,
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  value,
  onValueChange,
  showValues = true,
  valuePrefix = "",
  valueSuffix = "",
  className,
  description,
  marks,
  isRange = false,
}: ConfigSliderProps) {
  // Set appropriate default values based on whether it's a range slider or not
  const initialDefaultValue = defaultValue || (isRange ? [25, 75] : [50])
  const [internalValue, setInternalValue] = React.useState(initialDefaultValue)
  const displayValue = value || internalValue

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={label.toLowerCase().replace(/\s+/g, "-")} className="text-sm font-medium">
          {label}
        </Label>
        {showValues &&
          (isRange ? (
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-sm font-medium dark:bg-zinc-800">
                {valuePrefix}
                {displayValue[0]}
                {valueSuffix}
              </span>
              <span className="text-zinc-400">—</span>
              <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-sm font-medium dark:bg-zinc-800">
                {valuePrefix}
                {displayValue[1]}
                {valueSuffix}
              </span>
            </div>
          ) : (
            <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-sm font-medium dark:bg-zinc-800">
              {valuePrefix}
              {displayValue[0]}
              {valueSuffix}
            </span>
          ))}
      </div>

      {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}

      <Slider
        id={label.toLowerCase().replace(/\s+/g, "-")}
        min={min}
        max={max}
        step={step}
        value={value || internalValue}
        onValueChange={handleValueChange}
        className="py-2"
      />

      {marks && marks.length > 0 ? (
        <div className="relative mt-1 w-full">
          <div className="flex justify-between px-1">
            {marks.map((mark) => (
              <div
                key={mark.value}
                className="flex flex-col items-center"
                style={{
                  position: "absolute",
                  left: `${((mark.value - min) / (max - min)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{mark.label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{min}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{max}</span>
        </div>
      )}
    </div>
  )
}
