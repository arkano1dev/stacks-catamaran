"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "./button"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

interface WalletOption {
  id: string
  name: string
  icon: string
  description?: string
}

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (walletId: string) => void
}

export function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null)

  const walletOptions: WalletOption[] = [
    {
      id: "leather",
      name: "Leather",
      icon: "🧰",
      description: "Connect with Leather wallet",
    },
    {
      id: "xverse",
      name: "Xverse",
      icon: "🌌",
      description: "Connect with Xverse wallet",
    },
    {
      id: "asigna",
      name: "Asigna",
      icon: "✍️",
      description: "Connect with Asigna wallet",
    },
    {
      id: "fordefi",
      name: "FordeFi",
      icon: "🔐",
      description: "Connect with FordeFi wallet",
    },
  ]

  const handleConnect = (walletId: string) => {
    setConnecting(walletId)
    // Simulate connection delay
    setTimeout(() => {
      setConnecting(null)
      onConnect(walletId)
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-bg/80 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Connect Wallet</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.id}
              className="flex items-center p-4 rounded-lg bg-card-bg-alt hover:bg-card-bg-alt/80 transition-colors"
              onClick={() => handleConnect(wallet.id)}
              disabled={connecting !== null}
            >
              <div className="flex items-center justify-center w-10 h-10 text-2xl">{wallet.icon}</div>
              <div className="ml-4 text-left">
                <h3 className="font-bold">{wallet.name}</h3>
                {wallet.description && <p className="text-sm text-primary-text/70">{wallet.description}</p>}
              </div>
              {connecting === wallet.id && (
                <div className="ml-auto">
                  <div className="w-5 h-5 border-2 border-cta-bg border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

