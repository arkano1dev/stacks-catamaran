"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/ui/logo"

interface HeaderProps {
  walletAddress?: string
  onDisconnect?: () => void
  onConnectClick?: () => void
  activePage?: "home" | "offers" | "my-swaps" | "create-offer"
}

export function Header({ walletAddress, onDisconnect, onConnectClick, activePage = "home" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const formatWalletAddress = (address: string) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <header
      style={{
        borderBottom: `1px solid var(--card-bg-alt)`,
        padding: "1rem 0",
        position: "relative",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {/* Logo section - using a div instead of a Link wrapper */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Logo size="sm" />
              <span style={{ fontWeight: "bold" }}>Catamaran Swaps</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: "flex",
              gap: "1rem",
            }}
            className="hidden md:flex"
          >
            <Link
              href="/offers"
              style={{
                color: activePage === "offers" ? "#FF6C00" : "var(--primary-text)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: activePage === "offers" ? "bold" : "normal",
              }}
            >
              Browse Offers
            </Link>
            <Link
              href="/create-offer"
              style={{
                color: activePage === "create-offer" ? "#FF6C00" : "var(--primary-text)",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: activePage === "create-offer" ? "bold" : "normal",
              }}
            >
              Create Offer
            </Link>
            {walletAddress && (
              <Link
                href="/my-swaps"
                style={{
                  color: activePage === "my-swaps" ? "#FF6C00" : "var(--primary-text)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: activePage === "my-swaps" ? "bold" : "normal",
                }}
              >
                My Swaps
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <button
            className="md:hidden btn btn-ghost p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Wallet connection */}
          <div className="hidden md:block">
            {walletAddress ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    fontSize: "0.875rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    backgroundColor: "var(--card-bg-alt)",
                  }}
                >
                  {formatWalletAddress(walletAddress)}
                </div>
                <button
                  className="btn btn-secondary"
                  style={{ padding: "0.25rem 0.75rem", fontSize: "0.875rem" }}
                  onClick={onDisconnect}
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={onConnectClick}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden absolute left-0 right-0 top-full z-50 slide-in-up"
          style={{
            backgroundColor: "var(--card-bg)",
            borderBottom: "1px solid var(--card-bg-alt)",
            padding: "1rem",
          }}
        >
          <nav className="flex flex-col gap-4 mb-4">
            <Link
              href="/offers"
              style={{
                color: activePage === "offers" ? "#FF6C00" : "var(--primary-text)",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: activePage === "offers" ? "bold" : "normal",
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Offers
            </Link>
            <Link
              href="/create-offer"
              style={{
                color: activePage === "create-offer" ? "#FF6C00" : "var(--primary-text)",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: activePage === "create-offer" ? "bold" : "normal",
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Create Offer
            </Link>
            {walletAddress && (
              <Link
                href="/my-swaps"
                style={{
                  color: activePage === "my-swaps" ? "#FF6C00" : "var(--primary-text)",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: activePage === "my-swaps" ? "bold" : "normal",
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                My Swaps
              </Link>
            )}
          </nav>

          {walletAddress ? (
            <div className="flex flex-col gap-2">
              <div
                style={{
                  fontSize: "0.875rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "9999px",
                  backgroundColor: "var(--card-bg-alt)",
                  display: "inline-block",
                  width: "fit-content",
                }}
              >
                {formatWalletAddress(walletAddress)}
              </div>
              <button
                className="btn btn-secondary"
                style={{ width: "fit-content" }}
                onClick={() => {
                  onDisconnect?.()
                  setMobileMenuOpen(false)
                }}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                onConnectClick?.()
                setMobileMenuOpen(false)
              }}
            >
              Connect Wallet
            </button>
          )}
        </div>
      )}
    </header>
  )
}

