export default function ReleaseEscrowPage({ params }: { params: { id: string } }) {
  // Mock swap data - in a real app, this would be fetched based on the ID
  const swap = {
    id: params.id,
    sbtcAmount: 0.05,
    btcAddress: "bc1q9gpkxvzmadnj7vg8yvfzqxfmjdgze9g29v8qd3",
    btcAmount: 0.049,
    timeLimit: "24h",
    status: "btc_sent",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    createdBy: "ST123...ABC",
    btcTxId: "3a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z",
    btcTxConfirmations: 2,
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
        <div style={{ marginBottom: "32px" }}>
          <a
            href={`/my-swaps/${params.id}`}
            style={{
              color: "#FF6C00",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
            }}
          >
            ← Back to Swap Details
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
          <h1
            style={{
              fontSize: "24px",
              marginBottom: "24px",
              fontWeight: "bold",
            }}
          >
            Release sBTC from Escrow
          </h1>

          <div
            style={{
              backgroundColor: "#1E1E1E",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Swap Summary
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
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>{swap.sbtcAmount} sBTC</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>BTC Amount</div>
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>{swap.btcAmount} BTC</div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Buyer Address</div>
                <div>
                  {swap.buyerAddress.substring(0, 6)}...{swap.buyerAddress.substring(swap.buyerAddress.length - 4)}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>BTC Transaction</div>
                <div>
                  {swap.btcTxId.substring(0, 6)}...{swap.btcTxId.substring(swap.btcTxId.length - 4)}
                </div>
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
                <h4 style={{ fontWeight: "bold", marginBottom: "4px" }}>Important</h4>
                <p style={{ fontSize: "14px" }}>
                  By confirming, you are releasing the sBTC from escrow to the buyer. This action cannot be undone. Make
                  sure you have received the BTC payment before proceeding.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <a
              href={`/my-swaps/${params.id}/complete`}
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
              Confirm & Release sBTC
            </a>

            <a
              href={`/my-swaps/${params.id}`}
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
              Cancel
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

