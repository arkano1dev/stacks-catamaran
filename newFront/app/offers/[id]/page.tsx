"use client"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export default function OfferDetailPage({ params }: { params: { id: string } }) {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)

  // Mock offer data - in a real app, this would be fetched based on the ID
  const offer = {
    id: params.id,
    sbtcAmount: 0.05,
    btcAmount: 0.049,
    rate: 0.98, // 1 sBTC = 0.98 BTC
    timeLimit: "24h",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    expiresAt: new Date(Date.now() + 21 * 60 * 60 * 1000).toISOString(), // 21 hours from now
    createdBy: "ST123...ABC",
    btcAddress: "bc1q9gpkxvzmadnj7vg8yvfzqxfmjdgze9g29v8qd3",
  }

  // Calculate time remaining
  const formatTimeRemaining = () => {
    const now = new Date()
    const expiry = new Date(offer.expiresAt)
    const timeRemaining = expiry.getTime() - now.getTime()

    if (timeRemaining <= 0) return "Expired"

    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60))
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))

    return `${hoursRemaining}h ${minutesRemaining}m remaining`
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #333",
          paddingBottom: "20px",
          marginBottom: "40px",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#FFFFFF",
          }}
        >
          <Logo size="sm" />
          <span style={{ fontWeight: "bold" }}>Catamaran Swaps</span>
        </Link>

        {isWalletConnected ? (
          <div
            style={{
              fontSize: "14px",
              padding: "6px 12px",
              borderRadius: "9999px",
              backgroundColor: "#1E1E1E",
            }}
          >
            wallet_123...abc
          </div>
        ) : (
          <button
            onClick={() => setIsWalletConnected(true)}
            style={{
              backgroundColor: "#FF6C00",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "9999px",
              padding: "8px 16px",
              fontFamily: "monospace",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Connect Wallet
          </button>
        )}
      </header>

      <main>
        <div style={{ marginBottom: "32px" }}>
          <Link
            href="/offers"
            style={{
              color: "#FF6C00",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
            }}
          >
            ← Back to Offers
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "#181818",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #1E1E1E",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "24px",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Offer #{params.id}
            </h1>

            <div
              style={{
                display: "inline-block",
                backgroundColor: "rgba(255, 108, 0, 0.1)",
                color: "#FF6C00",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {formatTimeRemaining()}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div
              style={{
                backgroundColor: "#1E1E1E",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                Offer Details
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>sBTC Amount</div>
                  <div style={{ fontWeight: "bold", fontSize: "18px" }}>{offer.sbtcAmount} sBTC</div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>BTC Amount</div>
                  <div style={{ fontWeight: "bold", fontSize: "18px" }}>{offer.btcAmount} BTC</div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Rate</div>
                  <div style={{ fontWeight: "bold" }}>1 sBTC = {offer.rate} BTC</div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Time Limit</div>
                  <div>{offer.timeLimit}</div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Created By</div>
                  <div>{offer.createdBy}</div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Created</div>
                  <div>{new Date(offer.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#1E1E1E",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                How It Works
              </h2>

              <ol
                style={{
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <li>
                  <span style={{ opacity: "0.7" }}>Click "Take Offer" to initiate the swap</span>
                </li>
                <li>
                  <span style={{ opacity: "0.7" }}>Send {offer.btcAmount} BTC to the provided Bitcoin address</span>
                </li>
                <li>
                  <span style={{ opacity: "0.7" }}>
                    Once the BTC transaction is confirmed, you'll receive {offer.sbtcAmount} sBTC automatically
                  </span>
                </li>
              </ol>
            </div>

            <div
              style={{
                backgroundColor: "rgba(255, 108, 0, 0.1)",
                borderRadius: "8px",
                padding: "16px",
                borderLeft: "4px solid #FF6C00",
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
                    backgroundColor: "#FF6C00",
                    maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='12' y1='8' x2='12' y2='12'%3E%3C/line%3E%3Cline x1='12' y1='16' x2='12.01' y2='16'%3E%3C/line%3E%3C/svg%3E")`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    flexShrink: 0,
                  }}
                ></div>
                <div>
                  <h4 style={{ fontWeight: "bold", marginBottom: "4px" }}>Important</h4>
                  <p style={{ fontSize: "14px" }}>
                    This is a trustless swap. The sBTC is locked in escrow and will only be released when your BTC
                    payment is confirmed. Make sure to send the exact amount of BTC specified.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px" }}>
              <Link
                href={`/swap/${offer.id}`}
                style={{
                  backgroundColor: "#FF6C00",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "12px 24px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-block",
                  textAlign: "center",
                  flexGrow: 1,
                }}
              >
                Take This Offer
              </Link>

              <Link
                href="/offers"
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  border: "2px solid #333",
                  borderRadius: "9999px",
                  padding: "12px 24px",
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "inline-block",
                  textAlign: "center",
                  flexGrow: 1,
                }}
              >
                Back to Offers
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

