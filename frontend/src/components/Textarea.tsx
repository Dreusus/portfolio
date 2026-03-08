import * as React from "react"

import { cn } from "../utils/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-lg border bg-transparent px-3 py-2 text-base shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "transition-all duration-300",
        "hover:border-icon-accent/50 hover:shadow-sm",
        "focus:border-icon-accent",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
