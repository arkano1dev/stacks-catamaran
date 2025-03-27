"use client"

import { useEffect, useState } from "react"
import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastVariant = "success" | "error" | "warning" | "info"

interface ToastNotificationProps {
  open?: boolean
  variant?: ToastVariant
  title: string
  description?: string
  duration?: number
  onClose?: () => void
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
}

export function ToastNotification({
  open = true,
  variant = "info",
  title,
  description,
  duration = 5000,
  onClose,
  position = "bottom-right",
}: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(open)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    setIsVisible(open)
    if (open) {
      setIsExiting(false)
    }
  }, [open])

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration])

  const handleClose = () => {
    setIsExiting(true)
    const exitTimer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300) // Match this with the CSS animation duration
    return () => clearTimeout(exitTimer)
  }

  if (!isVisible) return null

  const variantStyles = {
    success: {
      bgColor: "rgba(0, 200, 83, 0.1)",
      borderColor: "#00C853",
      iconColor: "#00C853",
      icon: <CheckCircle className="w-5 h-5" style={{ color: "#00C853" }} />,
    },
    error: {
      bgColor: "rgba(244, 67, 54, 0.1)",
      borderColor: "#F44336",
      iconColor: "#F44336",
      icon: <XCircle className="w-5 h-5" style={{ color: "#F44336" }} />,
    },
    warning: {
      bgColor: "rgba(255, 152, 0, 0.1)",
      borderColor: "#FF9800",
      iconColor: "#FF9800",
      icon: <AlertCircle className="w-5 h-5" style={{ color: "#FF9800" }} />,
    },
    info: {
      bgColor: "rgba(33, 150, 243, 0.1)",
      borderColor: "#2196F3",
      iconColor: "#2196F3",
      icon: <Info className="w-5 h-5" style={{ color: "#2196F3" }} />,
    },
  }

  const currentStyle = variantStyles[variant]

  const positionStyles = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  }

  return (
    <div
      className={cn(
        "fixed z-50 max-w-md rounded-lg border border-card-bg-alt shadow-lg border-l-4",
        positionStyles[position],
        isExiting ? "animate-exit" : "animate-enter",
      )}
      style={{
        backgroundColor: "var(--card-bg)",
        borderLeftColor: currentStyle.borderColor,
        animation: isExiting ? "slideOutRight 0.3s forwards" : "slideInRight 0.3s forwards",
      }}
    >
      <div className="flex p-4">
        <div className="flex-shrink-0">{currentStyle.icon}</div>
        <div className="ml-3">
          <h3 className="font-bold">{title}</h3>
          {description && <div className="mt-1 text-sm opacity-70">{description}</div>}
        </div>
        <button
          type="button"
          className="ml-auto flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {duration > 0 && (
        <div
          className="h-1 bg-opacity-20 rounded-b-lg"
          style={{
            backgroundColor: currentStyle.borderColor,
            width: "100%",
            animation: `shrink ${duration / 1000}s linear forwards`,
          }}
        />
      )}

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

