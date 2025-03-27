"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { ToastNotification } from "@/components/ui/toast-notification"

type ToastVariant = "success" | "error" | "warning" | "info"
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"

interface Toast {
  id: string
  title: string
  description?: string
  variant: ToastVariant
  duration?: number
  position?: ToastPosition
}

interface NotificationContextType {
  showToast: (
    title: string,
    description?: string,
    variant?: ToastVariant,
    duration?: number,
    position?: ToastPosition,
  ) => string
  dismissToast: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (
    title: string,
    description?: string,
    variant: ToastVariant = "info",
    duration = 5000,
    position: ToastPosition = "bottom-right",
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    setToasts((prevToasts) => [...prevToasts, { id, title, description, variant, duration, position }])

    return id
  }

  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ showToast, dismissToast }}>
      {children}

      {/* Render all active toasts */}
      {toasts.map((toast) => (
        <ToastNotification
          key={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          duration={toast.duration}
          position={toast.position}
          onClose={() => dismissToast(toast.id)}
        />
      ))}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)

  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }

  return context
}

