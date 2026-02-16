"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "../utils/utils"
import { motion } from 'framer-motion'

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-sm font-medium leading-none text-foreground/70",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        "transition-colors duration-200",
        "peer-focus:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Label }
