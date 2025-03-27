export default function MySwapsPage() {
  // Mock swap data
  const swaps = [
    {
      id: "swap_abc123",
      sbtcAmount: 0.05,
      btcAddress: "bc1q9gpkxvzmadnj7vg8yvfzqxfmjdgze9g29v8qd3",
      timeLimit: "24h",
      status: "active",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      swapUrl: "https://catamaranswaps.com/swap/abc123def456",
    },
    {
      id: "swap_def456",
      sbtcAmount: 0.1,
      btcAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      timeLimit: "48h",
      status: "completed",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      swapUrl: "https://catamaranswaps.com/swap/def456ghi789",
    },
  ]

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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            My Swaps
          </h1>

          <a
            href="/create-offer"
            style={{
              backgroundColor: "#FF6C00",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "9999px",
              padding: "8px 16px",
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: "pointer",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            + New Swap
          </a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {swaps.map((swap) => (
            <div
              key={swap.id}
              style={{
                backgroundColor: "#181818",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid #1E1E1E",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Swap ID</div>
                  <div style={{ fontWeight: "bold" }}>{swap.id}</div>
                </div>

                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: swap.status === "active" ? "rgba(255, 108, 0, 0.1)" : "rgba(0, 200, 83, 0.1)",
                    color: swap.status === "active" ? "#FF6C00" : "#00C853",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {swap.status === "active" ? "Escrow Active" : "Completed"}
                </div>
              </div>

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
                  <div style={{ fontWeight: "bold" }}>{swap.sbtcAmount} sBTC</div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Created</div>
                  <div>{new Date(swap.createdAt).toLocaleDateString()}</div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Expires</div>
                  <div>{new Date(swap.expiresAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <a
                  href={`/swap/${swap.id}`}
                  style={{
                    color: "#FF6C00",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  View Details
                </a>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      color: "#FFFFFF",
                      border: "1px solid #333",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      fontFamily: "monospace",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Copy Link
                  </button>

                  {swap.status === "active" && (
                    <button
                      style={{
                        backgroundColor: "rgba(255, 108, 0, 0.1)",
                        color: "#FF6C00",
                        border: "1px solid #FF6C00",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        fontFamily: "monospace",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel Swap
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {swaps.length === 0 && (
          <div
            style={{
              backgroundColor: "#181818",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid #1E1E1E",
              textAlign: "center",
            }}
          >
            <p style={{ marginBottom: "16px", opacity: "0.7" }}>You don't have any swaps yet</p>

            <a
              href="/create-offer"
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
              }}
            >
              Create Your First Swap
            </a>
          </div>
        )}
      </main>
    </div>
  )
}

