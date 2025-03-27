export default function SwapCompletedPage({ params }: { params: { id: string } }) {
  // Mock swap data - in a real app, this would be fetched based on the ID
  const swap = {
    id: params.id,
    sbtcAmount: 0.05,
    btcAddress: "bc1q9gpkxvzmadnj7vg8yvfzqxfmjdgze9g29v8qd3",
    btcAmount: 0.049,
    timeLimit: "24h",
    status: "completed",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date().toISOString(),
    buyerAddress: "ST456...XYZ",
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
                backgroundColor: "rgba(0, 200, 83, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#00C853",
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
            Swap Completed Successfully!
          </h1>

          <p
            style={{
              marginBottom: "24px",
              opacity: "0.7",
              textAlign: "center",
            }}
          >
            You have released the sBTC from escrow and the swap is now complete.
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
              Transaction Summary
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>BTC Received</div>
                <div style={{ fontWeight: "bold" }}>{swap.btcAmount} BTC</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>sBTC Released</div>
                <div style={{ fontWeight: "bold" }}>{swap.sbtcAmount} sBTC</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Buyer</div>
                <div>{swap.buyerAddress}</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Completed</div>
                <div>{new Date(swap.completedAt).toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(0, 200, 83, 0.1)",
              borderRadius: "8px",
              padding: "16px",
              borderLeft: "4px solid #00C853",
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
                  backgroundColor: "#00C853",
                  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M22 11.08V12a10 10 0 1 1-5.93-9.14'%3E%3C/path%3E%3Cpolyline points='22 4 12 14.01 9 11.01'%3E%3C/polyline%3E%3C/svg%3E")`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  flexShrink: 0,
                }}
              ></div>
              <div>
                <h4 style={{ fontWeight: "bold", marginBottom: "4px" }}>Success</h4>
                <p style={{ fontSize: "14px" }}>
                  The swap has been successfully completed. The buyer has received the sBTC and you have received the
                  BTC payment.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <a
              href="/my-swaps"
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
              Back to My Swaps
            </a>

            <a
              href="/create-offer"
              style={{
                backgroundColor: "transparent",
                color: "#FFFFFF",
                border: "2px solid #FF6C00",
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
              Create New Swap
            </a>
          </div>
        </div>
      </main>

      {/* Toast Notification - This would be conditionally rendered in a real app */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "rgba(0, 200, 83, 0.1)",
          borderLeft: "4px solid #00C853",
          borderRadius: "8px",
          padding: "16px",
          maxWidth: "300px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          display: "flex",
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
              backgroundColor: "#00C853",
              maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M22 11.08V12a10 10 0 1 1-5.93-9.14'%3E%3C/path%3E%3Cpolyline points='22 4 12 14.01 9 11.01'%3E%3C/polyline%3E%3C/svg%3E")`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              flexShrink: 0,
            }}
          ></div>
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "4px" }}>Swap Completed</h4>
            <p style={{ fontSize: "14px" }}>sBTC has been released to the buyer.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

