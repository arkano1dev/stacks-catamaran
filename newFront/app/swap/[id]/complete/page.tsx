export default function SwapCompletePage({ params }: { params: { id: string } }) {
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
            The BTC payment has been confirmed and the sBTC has been released to your wallet.
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
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>sBTC Received</div>
                <div style={{ fontWeight: "bold" }}>0.05 sBTC</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>BTC Sent</div>
                <div style={{ fontWeight: "bold" }}>0.049 BTC</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Swap ID</div>
                <div>{params.id}</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Completed</div>
                <div>{new Date().toLocaleString()}</div>
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
                  Your sBTC is now available in your wallet. Thank you for using Catamaran Swaps!
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <a
              href="/"
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
              Back to Home
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
    </div>
  )
}

