export default function CreateOfferPage() {
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
            href="/"
            style={{
              color: "#FF6C00",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
            }}
          >
            ← Back to Home
          </a>
        </div>

        <h1
          style={{
            fontSize: "24px",
            marginBottom: "24px",
            fontWeight: "bold",
          }}
        >
          Create Swap Offer
        </h1>

        <div
          style={{
            backgroundColor: "#181818",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid #1E1E1E",
          }}
        >
          <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "14px", fontWeight: "bold" }}>sBTC Amount</label>
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  placeholder="0.0"
                  step="0.00001"
                  min="0"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    backgroundColor: "#1E1E1E",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                    fontSize: "16px",
                    fontFamily: "monospace",
                    paddingRight: "70px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#FF6C00",
                    fontWeight: "bold",
                  }}
                >
                  sBTC
                </div>
              </div>
              <div style={{ fontSize: "12px", opacity: "0.7" }}>Available balance: 0.25 sBTC</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "14px", fontWeight: "bold" }}>Buyer's BTC Address</label>
              <input
                type="text"
                placeholder="bc1q..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "#1E1E1E",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontFamily: "monospace",
                }}
              />
              <div style={{ fontSize: "12px", opacity: "0.7" }}>
                The Bitcoin address that will receive the BTC payment
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ fontSize: "14px", fontWeight: "bold" }}>Time Limit (Optional)</label>
              <select
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "#1E1E1E",
                  border: "1px solid #333",
                  borderRadius: "8px",
                  color: "#FFFFFF",
                  fontSize: "16px",
                  fontFamily: "monospace",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23FF6C00' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                }}
              >
                <option value="">No time limit</option>
                <option value="1h">1 hour</option>
                <option value="6h">6 hours</option>
                <option value="24h">24 hours</option>
                <option value="48h">48 hours</option>
                <option value="1w">1 week</option>
              </select>
              <div style={{ fontSize: "12px", opacity: "0.7" }}>
                After this time, you can reclaim your sBTC if the swap hasn't completed
              </div>
            </div>

            <div style={{ marginTop: "16px" }}>
              <a
                href="/create-offer/confirm"
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
                  width: "100%",
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
              >
                Create Offer & Lock sBTC
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

