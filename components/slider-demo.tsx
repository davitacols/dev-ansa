"use client"

import * as React from "react"
import { ConfigSlider } from "@/components/config-slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SliderDemo() {
  const [depthValue, setDepthValue] = React.useState([3])
  const [sizeRange, setSizeRange] = React.useState([10, 500])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Directory Depth</CardTitle>
          <CardDescription>Control how deep the file structure analysis should go</CardDescription>
        </CardHeader>
        <CardContent>
          <ConfigSlider
            label="Maximum Depth"
            min={1}
            max={10}
            step={1}
            defaultValue={depthValue}
            value={depthValue}
            onValueChange={setDepthValue}
            description="Limit how many directory levels to analyze"
            marks={[
              { value: 1, label: "Root" },
              { value: 3, label: "Shallow" },
              { value: 6, label: "Medium" },
              { value: 10, label: "Deep" },
            ]}
          />

          <div className="mt-6 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
            <pre className="text-sm">
              <code>{`ansa-fs --depth ${depthValue[0]} ./my-project`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>File Size Filter</CardTitle>
          <CardDescription>Filter files by size (in KB)</CardDescription>
        </CardHeader>
        <CardContent>
          <ConfigSlider
            label="Size Range"
            min={0}
            max={1000}
            step={10}
            defaultValue={sizeRange}
            value={sizeRange}
            onValueChange={setSizeRange}
            valueSuffix=" KB"
            description="Only include files within this size range"
            isRange={true}
          />

          <div className="mt-6 rounded-md bg-zinc-50 p-4 dark:bg-zinc-900">
            <pre className="text-sm">
              <code>{`ansa-fs --min-size ${sizeRange[0]} --max-size ${sizeRange[1]} ./my-project`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
