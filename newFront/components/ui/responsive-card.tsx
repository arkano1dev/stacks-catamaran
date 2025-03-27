import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ResponsiveCardProps {
  children: ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg"
  animation?: "fade-in" | "slide-in-up" | "none"
}

export function ResponsiveCard({ children, className, padding = "md", animation = "none" }: ResponsiveCardProps) {
  const paddingClasses = {
    none: "p-0",
    sm: "p-3 md:p-4",
    md: "p-4 md:p-6",
    lg: "p-6 md:p-8",
  }

  const animationClasses = {
    "fade-in": "fade-in",
    "slide-in-up": "slide-in-up",
    none: "",
  }

  return (
    <div
      className={cn(
        "rounded-[1rem] bg-card-bg border border-card-bg-alt shadow-sm w-full",
        paddingClasses[padding],
        animationClasses[animation],
        className,
      )}
    >
      {children}
    </div>
  )
}

