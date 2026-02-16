import * as React from "react"
import { cn } from "../utils/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-lg border border-foreground/10 bg-white px-3 py-2 text-sm resize-none",
        "placeholder:text-foreground/40",
        "transition-colors duration-200",
        "hover:border-foreground/20",
        "focus:border-icon-accent focus:outline-none focus:ring-1 focus:ring-icon-accent/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
