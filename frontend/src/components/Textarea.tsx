import * as React from "react"
import { cn } from "../utils/utils"
import { motion } from 'framer-motion'

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <motion.textarea
      data-slot="textarea"
      whileFocus={{ scale: 1.005 }}
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border-2 border-foreground/10 bg-white/70 backdrop-blur-sm",
        "px-4 py-3 text-base shadow-sm transition-all duration-300 outline-none resize-none",
        "placeholder:text-foreground/40",
        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:border-icon-accent/30 hover:bg-white hover:shadow-md",
        "focus:border-icon-accent focus:bg-white focus:shadow-lg focus:shadow-icon-accent/10",
        "placeholder:transition-all placeholder:duration-300 focus:placeholder:translate-x-1",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
