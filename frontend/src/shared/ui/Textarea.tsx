import * as React from "react"

import { cn } from "../utils/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:border-icon-accent",
        "hover:border-icon-accent/50 hover:shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
