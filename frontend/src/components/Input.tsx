import * as React from "react"
import { cn } from "../utils/utils"
import { motion } from 'framer-motion'

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <motion.input
      type={type}
      data-slot="input"
      whileFocus={{ scale: 1.01 }}
      className={cn(
        "file:text-foreground placeholder:text-foreground/40 selection:bg-icon-accent/20 selection:text-foreground",
        "flex h-11 w-full min-w-0 rounded-xl border-2 border-foreground/10 bg-white/70 backdrop-blur-sm",
        "px-4 py-2 text-base shadow-sm transition-all duration-300 outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:border-icon-accent/30 hover:bg-white hover:shadow-md",
        "focus:border-icon-accent focus:bg-white focus:shadow-lg focus:shadow-icon-accent/10",
        "placeholder:transition-all placeholder:duration-300 focus:placeholder:translate-x-1",
        className
      )}
      {...props}
    />
  )
}

export { Input }
