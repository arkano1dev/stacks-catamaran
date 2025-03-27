"use client"

import type { ReactNode } from "react"
import { Button } from "./button"
import { Spinner } from "./spinner"

interface ButtonWithLoadingProps {
  children: ReactNode
  isLoading?: boolean
  loadingText?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost" | "btc" | "sbtc"
  size?: "default" | "sm" | "lg" | "icon"
  fullWidth?: boolean
  disabled?: boolean
  type?: "button" | "submit" | "reset"
  className?: string
}

export function ButtonWithLoading({
  children,
  isLoading = false,
  loadingText,
  onClick,
  variant = "primary",
  size = "default",
  fullWidth = false,
  disabled = false,
  type = "button",
  className,
}: ButtonWithLoadingProps) {
  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      className={className}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Spinner
            size="xs"
            variant={variant === "primary" || variant === "btc" || variant === "sbtc" ? "white" : "primary"}
          />
          {loadingText || children}
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

