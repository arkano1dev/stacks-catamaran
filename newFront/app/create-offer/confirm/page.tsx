export default function ConfirmOfferPage() {
  // Mock swap details
  const swapDetails = {
    id: "swap_" + Math.random().toString(36).substring(2, 10),
    sbtcAmount: 0.05,
    btcAddress: "bc1q9gpkxvzmadnj7vg8yvfzqxfmjdgze9g29v8qd3",
    timeLimit: "24h",
    status: "active",
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    swapUrl: "https://catamaranswaps.com/swap/abc123def456",
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
        <div style={{ marginBottom: "32px" }}>
          <a
            href="/create-offer"
            style={{
              color: "#FF6C00",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
            }}
          >
            ← Back to Offer Form
          </a>
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
            Swap Offer Created!
          </h1>

          <p
            style={{
              marginBottom: "24px",
              opacity: "0.7",
              textAlign: "center",
            }}
          >
            Your sBTC has been locked in escrow. Share the link below with your trading partner.
          </p>

          <div
            style={{
              backgroundColor: "#1E1E1E",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
              position: "relative",
            }}
          >
            <input
              type="text"
              value={swapDetails.swapUrl}
              readOnly
              style={{
                width: "100%",
                backgroundColor: "transparent",
                border: "none",
                color: "#FFFFFF",
                fontSize: "14px",
                fontFamily: "monospace",
                outline: "none",
              }}
            />
            <button
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#FF6C00",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "4px",
                padding: "4px 8px",
                fontSize: "12px",
                fontFamily: "monospace",
                cursor: "pointer",
              }}
            >
              Copy
            </button>
          </div>

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
              Swap Details
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>sBTC Amount</div>
                <div style={{ fontWeight: "bold" }}>{swapDetails.sbtcAmount} sBTC</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Status</div>
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "rgba(255, 108, 0, 0.1)",
                    color: "#FF6C00",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Escrow Active
                </div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>BTC Address</div>
                <div style={{ fontSize: "14px", wordBreak: "break-all" }}>{swapDetails.btcAddress}</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Time Limit</div>
                <div>{swapDetails.timeLimit}</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Created</div>
                <div>{new Date(swapDetails.createdAt).toLocaleString()}</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Expires</div>
                <div>{new Date(swapDetails.expiresAt).toLocaleString()}</div>
              </div>
            </div>
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
                <h4 style={{ fontWeight: "bold", marginBottom: "4px" }}>What happens next?</h4>
                <p style={{ fontSize: "14px" }}>
                  Share the swap link with your trading partner. They'll need to send BTC to the specified address to
                  complete the swap. Once confirmed, your sBTC will be released to them.
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
              href="/my-swaps"
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
              View My Swaps
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

