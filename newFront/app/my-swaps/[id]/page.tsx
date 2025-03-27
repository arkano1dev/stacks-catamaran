export default function SellerSwapViewPage({ params }: { params: { id: string } }) {
  // Mock swap data - in a real app, this would be fetched based on the ID
  const swap = {
    id: params.id,
    sbtcAmount: 0.05,
    btcAddress: "bc1q9gpkxvzmadnj7vg8yvfzqxfmjdgze9g29v8qd3",
    btcAmount: 0.049, // Slightly less to account for network fees
    timeLimit: "24h",
    status: "btc_sent", // pending, btc_sent, confirmed, completed, expired, cancelled
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), // 22 hours from now
    createdBy: "ST123...ABC",
    btcTxId: "3a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z",
    btcTxConfirmations: 2,
  }

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
            href="/my-swaps"
            style={{
              color: "#FF6C00",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
            }}
          >
            ← Back to My Swaps
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
              Swap #{params.id}
            </h1>

            <div
              style={{
                display: "inline-block",
                backgroundColor: currentStatus.bgColor,
                color: currentStatus.color,
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {currentStatus.label}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {/* Swap Progress Tracker */}
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
                Swap Progress
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                  marginBottom: "32px",
                }}
              >
                {/* Progress bar */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    right: "12px",
                    height: "2px",
                    backgroundColor: "#333",
                    zIndex: 0,
                  }}
                ></div>

                {/* Progress fill */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    width:
                      swap.status === "pending"
                        ? "0%"
                        : swap.status === "btc_sent"
                          ? "33%"
                          : swap.status === "confirmed"
                            ? "66%"
                            : swap.status === "completed"
                              ? "100%"
                              : "0%",
                    height: "2px",
                    backgroundColor: "#FF6C00",
                    zIndex: 1,
                    transition: "width 0.5s ease-in-out",
                  }}
                ></div>

                {/* Step 1: Offer Created */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 2,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: "#FF6C00",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#FFFFFF",
                        maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E")`,
                        maskSize: "contain",
                        maskRepeat: "no-repeat",
                        maskPosition: "center",
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: "12px", textAlign: "center" }}>
                    Offer
                    <br />
                    Created
                  </span>
                </div>

                {/* Step 2: BTC Sent */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 2,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor:
                        swap.status === "btc_sent" || swap.status === "confirmed" || swap.status === "completed"
                          ? "#FF6C00"
                          : "#333",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "8px",
                    }}
                  >
                    {(swap.status === "btc_sent" || swap.status === "confirmed" || swap.status === "completed") && (
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
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
                    style={{
                      fontSize: "12px",
                      textAlign: "center",
                      opacity: swap.status === "pending" ? 0.5 : 1,
                    }}
                  >
                    BTC
                    <br />
                    Sent
                  </span>
                </div>

                {/* Step 3: BTC Received */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 2,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: swap.status === "confirmed" || swap.status === "completed" ? "#FF6C00" : "#333",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "8px",
                    }}
                  >
                    {(swap.status === "confirmed" || swap.status === "completed") && (
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
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
                    style={{
                      fontSize: "12px",
                      textAlign: "center",
                      opacity: swap.status === "pending" || swap.status === "btc_sent" ? 0.5 : 1,
                    }}
                  >
                    BTC
                    <br />
                    Received
                  </span>
                </div>

                {/* Step 4: Swap Completed */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 2,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: swap.status === "completed" ? "#FF6C00" : "#333",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "8px",
                    }}
                  >
                    {swap.status === "completed" && (
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
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
                    style={{
                      fontSize: "12px",
                      textAlign: "center",
                      opacity:
                        swap.status === "pending" || swap.status === "btc_sent" || swap.status === "confirmed"
                          ? 0.5
                          : 1,
                    }}
                  >
                    Swap
                    <br />
                    Completed
                  </span>
                </div>
              </div>

              <div
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  opacity: 0.7,
                }}
              >
                {swap.status === "pending" && "Waiting for BTC to be sent"}
                {swap.status === "btc_sent" && "BTC transaction is being confirmed on the network"}
                {swap.status === "confirmed" && "BTC confirmed, waiting for you to release sBTC"}
                {swap.status === "completed" && "Swap completed successfully"}
                {swap.status === "expired" && "Swap expired, funds returned to seller"}
                {swap.status === "cancelled" && "Swap was cancelled by the seller"}
              </div>
            </div>

            {/* Swap Details */}
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
                Swap Details
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
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Time Limit</div>
                  <div>{swap.timeLimit}</div>
                </div>

                <div>
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>Expires</div>
                  <div>{timeRemainingStr}</div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "#181818",
                  borderRadius: "8px",
                  padding: "16px",
                  marginBottom: "16px",
                }}
              >
                <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>BTC Address</div>
                <div
                  style={{
                    fontFamily: "monospace",
                    wordBreak: "break-all",
                  }}
                >
                  {swap.btcAddress}
                </div>
              </div>

              {swap.status === "btc_sent" && (
                <div
                  style={{
                    backgroundColor: "#181818",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ fontSize: "12px", opacity: "0.7", marginBottom: "4px" }}>BTC Transaction</div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      wordBreak: "break-all",
                      marginBottom: "8px",
                    }}
                  >
                    {swap.btcTxId.substring(0, 20)}...
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "rgba(255, 108, 0, 0.1)",
                        color: "#FF6C00",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {swap.btcTxConfirmations} confirmations
                    </div>
                    <a
                      href={`https://mempool.space/tx/${swap.btcTxId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#FF6C00",
                        fontSize: "12px",
                        textDecoration: "none",
                      }}
                    >
                      View on Explorer
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Action Section */}
            {swap.status === "btc_sent" && (
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
                  Confirm BTC Receipt
                </h2>

                <div
                  style={{
                    backgroundColor: "rgba(255, 108, 0, 0.1)",
                    borderRadius: "8px",
                    padding: "16px",
                    borderLeft: "4px solid #FF6C00",
                    marginBottom: "16px",
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
                      <h4 style={{ fontWeight: "bold", marginBottom: "4px" }}>Verify BTC Payment</h4>
                      <p style={{ fontSize: "14px" }}>
                        Please check your Bitcoin wallet or block explorer to confirm you've received the BTC payment
                        before releasing the sBTC from escrow.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={`/my-swaps/${params.id}/release`}
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
                  I've Received BTC - Release sBTC
                </a>
              </div>
            )}

            {/* Completed Section */}
            {swap.status === "completed" && (
              <div
                style={{
                  backgroundColor: "rgba(0, 200, 83, 0.1)",
                  borderRadius: "8px",
                  padding: "16px",
                  borderLeft: "4px solid #00C853",
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
                    <p style={{ fontSize: "14px" }}>
                      This swap has been successfully completed. You received the BTC payment and the buyer received the
                      sBTC from escrow.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Cancelled/Expired Section */}
            {(swap.status === "cancelled" || swap.status === "expired") && (
              <div
                style={{
                  backgroundColor: "rgba(244, 67, 54, 0.1)",
                  borderRadius: "8px",
                  padding: "16px",
                  borderLeft: "4px solid #F44336",
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
                      backgroundColor: "#F44336",
                      maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cline x1='15' y1='9' x2='9' y2='15'%3E%3C/line%3E%3Cline x1='9' y1='9' x2='15' y2='15'%3E%3C/line%3E%3C/svg%3E")`,
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      flexShrink: 0,
                    }}
                  ></div>
                  <div>
                    <h4 style={{ fontWeight: "bold", marginBottom: "4px" }}>
                      {swap.status === "cancelled" ? "Swap Cancelled" : "Swap Expired"}
                    </h4>
                    <p style={{ fontSize: "14px" }}>
                      {swap.status === "cancelled"
                        ? "This swap was cancelled. Your sBTC has been returned to your wallet."
                        : "This swap expired due to inactivity. Your sBTC has been returned to your wallet."}
                    </p>
                  </div>
                </div>
              </div>
            )}
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
          display: "none", // Set to 'flex' when you want to show it
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
            <h4 style={{ fontWeight: "bold", marginBottom: "4px" }}>BTC Payment Received</h4>
            <p style={{ fontSize: "14px" }}>You've successfully received 0.049 BTC for this swap.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

