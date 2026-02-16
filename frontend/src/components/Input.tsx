import * as React from "react"
import { cn } from "../utils/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-foreground/10 bg-white px-3 py-2 text-sm",
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

export { Input }
