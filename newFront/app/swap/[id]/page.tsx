"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ResponsiveCard } from "@/components/ui/responsive-card"
import { Spinner } from "@/components/ui/spinner"
import { ButtonWithLoading } from "@/components/ui/button-with-loading"
import { useNotification } from "@/contexts/notification-context"

export default function SwapViewPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isSendingBtc, setIsSendingBtc] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const { showToast } = useNotification()

  // Mock swap data - in a real app, this would be fetched based on the ID
  const swap = {
    id: params.id,
    sbtcAmount: 0.05,
    btcAddress: "bc1q9gpkxvzmadnj7vg8yvfzqxfmjdgze9g29v8qd3",
    btcAmount: 0.049, // Slightly less to account for network fees
    timeLimit: "24h",
    status: "pending", // pending, btc_sent, confirmed, completed, expired, cancelled
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), // 22 hours from now
    createdBy: "ST123...ABC",
  }

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Calculate time remaining
  const expiresAt = new Date(swap.expiresAt)
  const now = new Date()
  const timeRemaining = expiresAt.getTime() - now.getTime()
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60))
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))

  // Format the time remaining string
  const timeRemainingStr = timeRemaining > 0 ? `${hoursRemaining}h ${minutesRemaining}m remaining` : "Expired"

  // Status display configuration
  const statusConfig = {
    pending: {
      label: "Waiting for BTC",
      color: "#FF6C00",
      bgColor: "rgba(255, 108, 0, 0.1)",
    },
    btc_sent: {
      label: "BTC Sent (Confirming)",
      color: "#FF6C00",
      bgColor: "rgba(255, 108, 0, 0.1)",
    },
    confirmed: {
      label: "BTC Confirmed",
      color: "#00C853",
      bgColor: "rgba(0, 200, 83, 0.1)",
    },
    completed: {
      label: "Swap Completed",
      color: "#00C853",
      bgColor: "rgba(0, 200, 83, 0.1)",
    },
    expired: {
      label: "Swap Expired",
      color: "#F44336",
      bgColor: "rgba(244, 67, 54, 0.1)",
    },
    cancelled: {
      label: "Swap Cancelled",
      color: "#F44336",
      bgColor: "rgba(244, 67, 54, 0.1)",
    },
  }

  const currentStatus = statusConfig[swap.status as keyof typeof statusConfig]

  const handleSendBtc = () => {
    setIsSendingBtc(true)

    // Simulate API call
    setTimeout(() => {
      setIsSendingBtc(false)
      showToast("BTC Sent", "You've marked this transaction as sent. The seller will be notified.", "success")
      // In a real app, you would update the status and redirect
    }, 2000)
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(swap.btcAddress)
    showToast("Address Copied", "BTC address copied to clipboard", "info")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header
          walletAddress={isWalletConnected ? "ST123...ABC" : undefined}
          onConnectClick={() => {
            setIsWalletConnected(true)
            showToast("Wallet Connected", "Your wallet has been connected successfully", "success")
          }}
          onDisconnect={() => {
            setIsWalletConnected(false)
            showToast("Wallet Disconnected", "Your wallet has been disconnected", "info")
          }}
        />
        <div className="container py-8">
          <div className="flex justify-center items-center py-32">
            <Spinner size="lg" label="Loading swap details..." />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        walletAddress={isWalletConnected ? "ST123...ABC" : undefined}
        onConnectClick={() => {
          setIsWalletConnected(true)
          showToast("Wallet Connected", "Your wallet has been connected successfully", "success")
        }}
        onDisconnect={() => {
          setIsWalletConnected(false)
          showToast("Wallet Disconnected", "Your wallet has been disconnected", "info")
        }}
      />

      <div className="container py-6 md:py-8">
        <ResponsiveCard animation="fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-xl font-bold">Swap #{params.id}</h1>

            <div
              className="inline-block rounded-lg px-3 py-1 text-sm font-bold mt-2 md:mt-0"
              style={{
                backgroundColor: currentStatus.bgColor,
                color: currentStatus.color,
              }}
            >
              {currentStatus.label}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Swap Details */}
            <ResponsiveCard className="bg-card-bg-alt" padding="md" animation="slide-in-up">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h2 className="text-lg font-bold">Swap Details</h2>

                <div
                  className="text-sm mt-2 md:mt-0"
                  style={{
                    color: timeRemaining > 0 ? "var(--primary-text)" : "#F44336",
                  }}
                >
                  {timeRemainingStr}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <div className="text-xs opacity-70 mb-1">sBTC Amount</div>
                  <div className="font-bold text-lg">{swap.sbtcAmount} sBTC</div>
                </div>

                <div>
                  <div className="text-xs opacity-70 mb-1">BTC Amount (Recommended)</div>
                  <div className="font-bold text-lg">{swap.btcAmount} BTC</div>
                </div>

                <div>
                  <div className="text-xs opacity-70 mb-1">Created By</div>
                  <div>
                    {swap.createdBy.substring(0, 6)}...{swap.createdBy.substring(swap.createdBy.length - 4)}
                  </div>
                </div>

                <div>
                  <div className="text-xs opacity-70 mb-1">Created</div>
                  <div>{new Date(swap.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </ResponsiveCard>

            {/* BTC Address */}
            <ResponsiveCard
              className="bg-card-bg-alt"
              padding="md"
              animation="slide-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="text-lg font-bold mb-4">Send BTC to This Address</h2>

              <div className="bg-card-bg rounded-lg p-4 mb-4 relative break-all font-mono">
                {swap.btcAddress}
                <button
                  onClick={handleCopyAddress}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-cta-bg text-primary-text border-none rounded px-2 py-1 text-xs font-mono cursor-pointer"
                >
                  Copy
                </button>
              </div>

              <div
                className="rounded-lg p-4 mb-4 border-l-4 flex items-start gap-3"
                style={{
                  backgroundColor: "rgba(255, 108, 0, 0.1)",
                  borderLeftColor: "#FF6C00",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#FF6C00",
                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E")`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    flexShrink: 0,
                  }}
                ></div>
                <div>
                  <h4 className="font-bold mb-1">Important</h4>
                  <p className="text-sm">
                    Send exactly {swap.btcAmount} BTC to this address. The sBTC will be released to your wallet once the
                    BTC transaction is confirmed.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <ButtonWithLoading
                  variant="primary"
                  fullWidth={true}
                  isLoading={isSendingBtc}
                  loadingText="Processing..."
                  onClick={handleSendBtc}
                >
                  I've Sent BTC
                </ButtonWithLoading>

                <div className="text-xs opacity-70 text-center">
                  This will notify the seller that you've sent the BTC
                </div>
              </div>
            </ResponsiveCard>

            {/* Swap Progress */}
            <ResponsiveCard
              className="bg-card-bg-alt"
              padding="md"
              animation="slide-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h2 className="text-lg font-bold mb-4">Swap Progress</h2>

              <div className="relative mb-8 px-6">
                {/* Progress bar */}
                <div className="absolute top-3 left-6 right-6 h-0.5 bg-card-bg-alt z-0"></div>

                {/* Progress fill */}
                <div
                  className="absolute top-3 left-6 h-0.5 bg-cta-bg z-1 transition-all duration-500"
                  style={{
                    width:
                      swap.status === "pending"
                        ? "0%"
                        : swap.status === "btc_sent"
                          ? "50%"
                          : swap.status === "confirmed" || swap.status === "completed"
                            ? "100%"
                            : "0%",
                  }}
                ></div>

                <div className="flex justify-between">
                  {/* Step 1: Escrow Created */}
                  <div className="flex flex-col items-center z-10">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center mb-2"
                      style={{
                        backgroundColor: "#FF6C00",
                      }}
                    >
                      <div
                        className="w-3 h-3"
                        style={{
                          backgroundColor: "#FFFFFF",
                          maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E")`,
                          maskSize: "contain",
                          maskRepeat: "no-repeat",
                          maskPosition: "center",
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-center">
                      Escrow
                      <br />
                      Created
                    </span>
                  </div>

                  {/* Step 2: BTC Sent */}
                  <div className="flex flex-col items-center z-10">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center mb-2"
                      style={{
                        backgroundColor:
                          swap.status === "btc_sent" || swap.status === "confirmed" || swap.status === "completed"
                            ? "#FF6C00"
                            : "#333",
                      }}
                    >
                      {(swap.status === "btc_sent" || swap.status === "confirmed" || swap.status === "completed") && (
                        <div
                          className="w-3 h-3"
                          style={{
                            backgroundColor: "#FFFFFF",
                            maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E")`,
                            maskSize: "contain",
                            maskRepeat: "no-repeat",
                            maskPosition: "center",
                          }}
                        ></div>
                      )}
                    </div>
                    <span
                      className="text-xs text-center"
                      style={{
                        opacity: swap.status === "pending" ? 0.5 : 1,
                      }}
                    >
                      BTC
                      <br />
                      Sent
                    </span>
                  </div>

                  {/* Step 3: Swap Completed */}
                  <div className="flex flex-col items-center z-10">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center mb-2"
                      style={{
                        backgroundColor:
                          swap.status === "confirmed" || swap.status === "completed" ? "#FF6C00" : "#333",
                      }}
                    >
                      {(swap.status === "confirmed" || swap.status === "completed") && (
                        <div
                          className="w-3 h-3"
                          style={{
                            backgroundColor: "#FFFFFF",
                            maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E")`,
                            maskSize: "contain",
                            maskRepeat: "no-repeat",
                            maskPosition: "center",
                          }}
                        ></div>
                      )}
                    </div>
                    <span
                      className="text-xs text-center"
                      style={{
                        opacity: swap.status === "pending" || swap.status === "btc_sent" ? 0.5 : 1,
                      }}
                    >
                      Swap
                      <br />
                      Completed
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-center opacity-70">
                {swap.status === "pending" && "Waiting for BTC to be sent"}
                {swap.status === "btc_sent" && "BTC transaction is being confirmed on the network"}
                {swap.status === "confirmed" && "BTC confirmed, sBTC will be released soon"}
                {swap.status === "completed" && "Swap completed successfully"}
                {swap.status === "expired" && "Swap expired, funds returned to seller"}
                {swap.status === "cancelled" && "Swap was cancelled by the seller"}
              </div>
            </ResponsiveCard>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  )
}

