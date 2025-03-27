"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "./button"

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Check if user has a preference stored
    const storedPreference = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Default to dark mode unless explicitly set to light
    const shouldBeDark = storedPreference === "light" ? false : true

    setIsDarkMode(shouldBeDark)
    applyTheme(shouldBeDark)
  }, [])

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.remove("light")
    } else {
      document.documentElement.classList.add("light")
    }
    localStorage.setItem("theme", dark ? "dark" : "light")
  }

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    applyTheme(newMode)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}

