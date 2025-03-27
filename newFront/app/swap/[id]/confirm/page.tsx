export default function SwapConfirmPage({ params }: { params: { id: string } }) {
  // Mock swap data - in a real app, this would be fetched based on the ID
  const swap = {
    id: params.id,
    sbtcAmount: 0.05,
    btcAddress: "bc1q9gpkxvzmadnj7vg8yvfzqxfmjdgze9g29v8qd3",
    btcAmount: 0.049, // Slightly less to account for network fees
    timeLimit: "24h",
    status: "btc_sent", // Now updated to btc_sent
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), // 22 hours from now
    createdBy: "ST123...ABC",
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
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#FFFFFF",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#FFFFFF",
              clipPath:
                "polygon(20% 80%, 80% 80%, 80% 70%, 60% 70%, 60% 50%, 80% 50%, 80% 40%, 60% 40%, 60% 20%, 40% 20%, 40% 40%, 20% 40%, 20% 50%, 40% 50%, 40% 70%, 20% 70%)",
            }}
          ></div>
          <span style={{ fontWeight: "bold" }}>Catamaran Swaps</span>
        </a>

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
      </header>

      <main>
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
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 108, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#FF6C00",
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M22 11.08V12a10 10 0 1 1-5.93-9.14'%3E%3C/path%3E%3Cpolyline points='22 4 12 14.01 9 11.01'%3E%3C/polyline%3E%3C/svg%3E")`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                }}
              ></div>
            </div>
          </div>

          <h1
            style={{
              fontSize: "24px",
              marginBottom: "8px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            BTC Payment Marked as Sent
          </h1>

          <p
            style={{
              marginBottom: "24px",
              opacity: "0.7",
              textAlign: "center",
            }}
          >
            The seller has been notified that you've sent the BTC payment.
          </p>

          <div
            style={{
              backgroundColor: "#1E1E1E",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                marginBottom: "16px",
                fontWeight: "bold",
              }}
            >
              What Happens Next?
            </h3>

            <ol
              style={{
                paddingLeft: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <li>
                <span style={{ opacity: "0.7" }}>
                  The Bitcoin network will confirm your transaction (this typically takes 10-60 minutes)
                </span>
              </li>
              <li>
                <span style={{ opacity: "0.7" }}>
                  Once confirmed, the sBTC will be automatically released to your wallet
                </span>
              </li>
              <li>
                <span style={{ opacity: "0.7" }}>You'll receive a notification when the swap is complete</span>
              </li>
            </ol>
          </div>

          <div
            style={{
              backgroundColor: "rgba(255, 108, 0, 0.1)",
              borderRadius: "8px",
              padding: "16px",
              borderLeft: "4px solid #FF6C00",
              marginBottom: "24px",
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
                  If you haven't already sent the BTC, please do so immediately to the address provided. The swap will
                  expire if the BTC is not received within the time limit.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <a
              href={`/swap/${params.id}`}
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
              Back to Swap Details
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

