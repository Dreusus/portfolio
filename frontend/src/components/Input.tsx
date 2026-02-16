import * as React from "react"
import { cn } from "../utils/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border bg-accent-warm/50 px-4 py-2 text-sm",
        "placeholder:text-foreground/40",
        "transition-all duration-200",
        "hover:bg-accent-warm/70",
        "focus:bg-accent-warm focus:border-icon-accent focus:outline-none focus:ring-2 focus:ring-icon-accent/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
