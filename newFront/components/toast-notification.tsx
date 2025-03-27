"use client"

import { useEffect, useState } from "react"

type ToastVariant = "success" | "error" | "warning" | "info"

interface ToastNotificationProps {
  open?: boolean
  variant?: ToastVariant
  title: string
  description?: string
  duration?: number
  onClose?: () => void
}

export function ToastNotification({
  open = true,
  variant = "info",
  title,
  description,
  duration = 5000,
  onClose,
}: ToastNotificationProps) {
  const [isVisible, setIsVisible] = useState(open)

  useEffect(() => {
    setIsVisible(open)
  }, [open])

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const variantStyles = {
    success: {
      bgColor: "rgba(0, 200, 83, 0.1)",
      borderColor: "#00C853",
      iconColor: "#00C853",
      iconPath: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M22 11.08V12a10 10 0 1 1-5.93-9.14'%3E%3C/path%3E%3Cpolyline points='22 4 12 14.01 9 11.01'%3E%3C/polyline%3E%3C/svg%3E")`,
    },
    error: {
      bgColor: "rgba(244, 67, 54, 0.1)",
      borderColor: "#F44336",
      iconColor: "#F44336",
      iconPath: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='15' y1='9' x2='9' y2='15'%3E%3C/line%3E%3Cline x1='9' y1='9' x2='15' y2='15'%3E%3C/line%3E%3C/svg%3E")`,
    },
    warning: {
      bgColor: "rgba(255, 152, 0, 0.1)",
      borderColor: "#FF9800",
      iconColor: "#FF9800",
      iconPath: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'%3E%3C/path%3E%3Cline x1='12' y1='9' x2='12' y2='13'%3E%3C/line%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'%3E%3C/line%3E%3C/svg%3E")`,
    },
    info: {
      bgColor: "rgba(33, 150, 243, 0.1)",
      borderColor: "#2196F3",
      iconColor: "#2196F3",
      iconPath: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='16' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='8' x2='12.01' y2='8'%3E%3C/line%3E%3C/svg%3E")`,
    },
  }

  const currentStyle = variantStyles[variant]

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: currentStyle.bgColor,
        borderLeft: `4px solid ${currentStyle.borderColor}`,
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "300px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        zIndex: 50,
        animation: "slideIn 0.3s ease-out forwards",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            backgroundColor: currentStyle.iconColor,
            maskImage: currentStyle.iconPath,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            flexShrink: 0,
          }}
        ></div>
        <div>
          <h4 style={{ fontWeight: "bold", marginBottom: "4px" }}>{title}</h4>
          {description && <p style={{ fontSize: "14px" }}>{description}</p>}
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            onClose?.()
          }}
          style={{
            background: "none",
            border: "none",
            color: "#FFFFFF",
            opacity: 0.5,
            cursor: "pointer",
            padding: "0",
            marginLeft: "auto",
            width: "20px",
            height: "20px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "9px",
              width: "2px",
              height: "20px",
              backgroundColor: "#FFFFFF",
              transform: "rotate(45deg)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "9px",
              width: "2px",
              height: "20px",
              backgroundColor: "#FFFFFF",
              transform: "rotate(-45deg)",
            }}
          ></div>
        </button>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

