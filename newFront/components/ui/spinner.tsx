import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg"
  variant?: "primary" | "secondary" | "white"
  className?: string
  label?: string
}

export function Spinner({ size = "md", variant = "primary", className, label }: SpinnerProps) {
  const sizeClasses = {
    xs: "w-3 h-3 border-2",
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  }

  const variantClasses = {
    primary: "border-cta-bg border-t-transparent",
    secondary: "border-primary-text border-t-transparent",
    white: "border-white border-t-transparent",
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn("rounded-full animate-spin-slow", sizeClasses[size], variantClasses[variant], className)}
        aria-hidden="true"
      />
      {label && <span className="mt-2 text-sm opacity-70">{label}</span>}
    </div>
  )
}

