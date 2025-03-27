"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Logo } from "@/components/ui/logo"
import { useNotification } from "@/contexts/notification-context"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const { showToast } = useNotification()
  const isMobile = useMobile()

  const handleConnectWallet = () => {
    setIsWalletConnected(true)
    showToast("Wallet Connected", "Your wallet has been connected successfully", "success")
  }

  return (
    <div className="min-h-screen">
      <Header
        activePage="home"
        walletAddress={isWalletConnected ? "ST123...ABC" : undefined}
        onConnectClick={handleConnectWallet}
        onDisconnect={() => {
          setIsWalletConnected(false)
          showToast("Wallet Disconnected", "Your wallet has been disconnected", "info")
        }}
      />

      <main className="container py-8 md:py-16">
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
          <div className="mb-8 animate-pulse-glow">
            {/* Don't use href here since we're not making it a link */}
            <Logo size={isMobile ? "md" : "lg"} />
          </div>

          <h1 className="text-xl md:text-2xl font-bold mb-4 fade-in">Trustless Peer-to-Peer Asset Swaps</h1>

          <p className="mb-8 opacity-70 max-w-md fade-in" style={{ animationDelay: "0.2s" }}>
            Exchange BTC and sBTC securely with no middleman. Your assets, your control, every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 slide-in-up" style={{ animationDelay: "0.4s" }}>
            <Link href="/create-offer" className="btn btn-primary text-center px-6 py-3">
              Create Offer
            </Link>

            <Link href="/offers" className="btn btn-secondary text-center px-6 py-3">
              Browse Offers
            </Link>

            {!isWalletConnected && (
              <button
                onClick={handleConnectWallet}
                className="btn btn-ghost border-2 border-card-bg-alt text-center px-6 py-3"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

