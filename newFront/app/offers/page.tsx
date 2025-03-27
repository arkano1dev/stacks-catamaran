"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { ResponsiveCard } from "@/components/ui/responsive-card"
import { Spinner } from "@/components/ui/spinner"
import { ButtonWithLoading } from "@/components/ui/button-with-loading"
import { useNotification } from "@/contexts/notification-context"

// Mock data for offers
const mockOffers = [
  {
    id: "offer_1a2b3c",
    sbtcAmount: 0.05,
    btcAmount: 0.049,
    rate: 0.98, // 1 sBTC = 0.98 BTC
    timeLimit: "24h",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    expiresAt: new Date(Date.now() + 21 * 60 * 60 * 1000).toISOString(), // 21 hours from now
    createdBy: "ST123...ABC",
  },
  {
    id: "offer_4d5e6f",
    sbtcAmount: 0.1,
    btcAmount: 0.099,
    rate: 0.99, // 1 sBTC = 0.99 BTC
    timeLimit: "48h",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    expiresAt: new Date(Date.now() + 43 * 60 * 60 * 1000).toISOString(), // 43 hours from now
    createdBy: "ST456...DEF",
  },
  {
    id: "offer_7g8h9i",
    sbtcAmount: 0.25,
    btcAmount: 0.2475,
    rate: 0.99, // 1 sBTC = 0.99 BTC
    timeLimit: "12h",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    expiresAt: new Date(Date.now() + 11 * 60 * 60 * 1000).toISOString(), // 11 hours from now
    createdBy: "ST789...GHI",
  },
  {
    id: "offer_0j1k2l",
    sbtcAmount: 0.5,
    btcAmount: 0.495,
    rate: 0.99, // 1 sBTC = 0.99 BTC
    timeLimit: "72h",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    expiresAt: new Date(Date.now() + 60 * 60 * 60 * 1000).toISOString(), // 60 hours from now
    createdBy: "ST012...JKL",
  },
  {
    id: "offer_3m4n5o",
    sbtcAmount: 0.02,
    btcAmount: 0.0196,
    rate: 0.98, // 1 sBTC = 0.98 BTC
    timeLimit: "24h",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(), // 18 hours from now
    createdBy: "ST345...MNO",
  },
  {
    id: "offer_6p7q8r",
    sbtcAmount: 0.15,
    btcAmount: 0.1485,
    rate: 0.99, // 1 sBTC = 0.99 BTC
    timeLimit: "48h",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    expiresAt: new Date(Date.now() + 40 * 60 * 60 * 1000).toISOString(), // 40 hours from now
    createdBy: "ST678...PQR",
  },
  {
    id: "offer_9s0t1u",
    sbtcAmount: 0.075,
    btcAmount: 0.074,
    rate: 0.987, // 1 sBTC = 0.987 BTC
    timeLimit: "36h",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    expiresAt: new Date(Date.now() + 32 * 60 * 60 * 1000).toISOString(), // 32 hours from now
    createdBy: "ST901...STU",
  },
  {
    id: "offer_2v3w4x",
    sbtcAmount: 0.3,
    btcAmount: 0.297,
    rate: 0.99, // 1 sBTC = 0.99 BTC
    timeLimit: "24h",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), // 22 hours from now
    createdBy: "ST234...VWX",
  },
]

// Filter options
type FilterOption = {
  label: string
  value: string
}

const amountFilters: FilterOption[] = [
  { label: "All Amounts", value: "all" },
  { label: "< 0.05 sBTC", value: "lt_0.05" },
  { label: "0.05 - 0.1 sBTC", value: "0.05_0.1" },
  { label: "0.1 - 0.5 sBTC", value: "0.1_0.5" },
  { label: "> 0.5 sBTC", value: "gt_0.5" },
]

const timeFilters: FilterOption[] = [
  { label: "All Time Limits", value: "all" },
  { label: "< 24 hours", value: "lt_24" },
  { label: "24 - 48 hours", value: "24_48" },
  { label: "> 48 hours", value: "gt_48" },
]

const rateFilters: FilterOption[] = [
  { label: "All Rates", value: "all" },
  { label: "< 0.98 BTC", value: "lt_0.98" },
  { label: "0.98 - 0.99 BTC", value: "0.98_0.99" },
  { label: "> 0.99 BTC", value: "gt_0.99" },
]

const sortOptions: FilterOption[] = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Highest Amount", value: "amount_high" },
  { label: "Lowest Amount", value: "amount_low" },
  { label: "Best Rate", value: "rate_best" },
]

export default function OffersPage() {
  const [amountFilter, setAmountFilter] = useState<string>("all")
  const [timeFilter, setTimeFilter] = useState<string>("all")
  const [rateFilter, setRateFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false)
  const itemsPerPage = 5

  const { showToast } = useNotification()

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Filter offers based on selected filters
  const filteredOffers = mockOffers.filter((offer) => {
    // Amount filter
    if (amountFilter !== "all") {
      if (amountFilter === "lt_0.05" && offer.sbtcAmount >= 0.05) return false
      if (amountFilter === "0.05_0.1" && (offer.sbtcAmount < 0.05 || offer.sbtcAmount > 0.1)) return false
      if (amountFilter === "0.1_0.5" && (offer.sbtcAmount < 0.1 || offer.sbtcAmount > 0.5)) return false
      if (amountFilter === "gt_0.5" && offer.sbtcAmount <= 0.5) return false
    }

    // Time filter
    if (timeFilter !== "all") {
      const timeInHours = Number.parseInt(offer.timeLimit)
      if (timeFilter === "lt_24" && timeInHours >= 24) return false
      if (timeFilter === "24_48" && (timeInHours < 24 || timeInHours > 48)) return false
      if (timeFilter === "gt_48" && timeInHours <= 48) return false
    }

    // Rate filter
    if (rateFilter !== "all") {
      if (rateFilter === "lt_0.98" && offer.rate >= 0.98) return false
      if (rateFilter === "0.98_0.99" && (offer.rate < 0.98 || offer.rate > 0.99)) return false
      if (rateFilter === "gt_0.99" && offer.rate <= 0.99) return false
    }

    return true
  })

  // Sort offers based on selected sort option
  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (sortBy === "amount_high") {
      return b.sbtcAmount - a.sbtcAmount
    } else if (sortBy === "amount_low") {
      return a.sbtcAmount - b.sbtcAmount
    } else if (sortBy === "rate_best") {
      return b.rate - a.rate
    }
    return 0
  })

  // Pagination
  const totalPages = Math.ceil(sortedOffers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedOffers = sortedOffers.slice(startIndex, startIndex + itemsPerPage)

  // Format time remaining
  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expiry = new Date(expiresAt)
    const timeRemaining = expiry.getTime() - now.getTime()

    if (timeRemaining <= 0) return "Expired"

    const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60))
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))

    return `${hoursRemaining}h ${minutesRemaining}m`
  }

  const handleTakeOffer = (offerId: string) => {
    setIsActionLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsActionLoading(false)
      showToast("Offer Accepted", "You've successfully taken this offer. Proceed to send BTC.", "success")
      // In a real app, you would redirect to the swap page
    }, 1500)
  }

  return (
    <div className="min-h-screen">
      <Header
        activePage="offers"
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-xl font-bold mb-4 md:mb-0">Available Offers</h1>

          <Link href="/create-offer" className="btn btn-primary text-sm">
            + Create Offer
          </Link>
        </div>

        {/* Filters */}
        <ResponsiveCard className="mb-6" animation="fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">Amount</label>
              <select
                value={amountFilter}
                onChange={(e) => setAmountFilter(e.target.value)}
                className="w-full p-2 bg-card-bg-alt border border-card-bg-alt rounded-lg text-sm appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23FF6C00' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  paddingRight: "40px",
                }}
              >
                {amountFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Time Limit</label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="w-full p-2 bg-card-bg-alt border border-card-bg-alt rounded-lg text-sm appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23FF6C00' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  paddingRight: "40px",
                }}
              >
                {timeFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Rate</label>
              <select
                value={rateFilter}
                onChange={(e) => setRateFilter(e.target.value)}
                className="w-full p-2 bg-card-bg-alt border border-card-bg-alt rounded-lg text-sm appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23FF6C00' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  paddingRight: "40px",
                }}
              >
                {rateFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 bg-card-bg-alt border border-card-bg-alt rounded-lg text-sm appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23FF6C00' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 16px center",
                  paddingRight: "40px",
                }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </ResponsiveCard>

        {/* Results */}
        <div className="mb-6">
          <div className="text-sm opacity-70 mb-4">
            {isLoading ? "Loading offers..." : `Showing ${paginatedOffers.length} of ${filteredOffers.length} offers`}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Spinner size="lg" label="Loading offers..." />
            </div>
          ) : paginatedOffers.length > 0 ? (
            <div className="flex flex-col gap-4">
              {paginatedOffers.map((offer, index) => (
                <ResponsiveCard key={offer.id} animation="slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <div className="text-xs opacity-70 mb-1">Offer ID</div>
                      <div className="font-bold">{offer.id}</div>
                    </div>

                    <div
                      className="inline-block bg-opacity-10 rounded-md px-2 py-1 text-xs font-bold mt-2 md:mt-0"
                      style={{
                        backgroundColor: "rgba(255, 108, 0, 0.1)",
                        color: "#FF6C00",
                      }}
                    >
                      {formatTimeRemaining(offer.expiresAt)} remaining
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs opacity-70 mb-1">sBTC Amount</div>
                      <div className="font-bold text-lg">{offer.sbtcAmount} sBTC</div>
                    </div>

                    <div>
                      <div className="text-xs opacity-70 mb-1">BTC Amount</div>
                      <div className="font-bold text-lg">{offer.btcAmount} BTC</div>
                    </div>

                    <div>
                      <div className="text-xs opacity-70 mb-1">Rate</div>
                      <div className="font-bold">1 sBTC = {offer.rate} BTC</div>
                    </div>

                    <div>
                      <div className="text-xs opacity-70 mb-1">Time Limit</div>
                      <div>{offer.timeLimit}</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div className="text-sm opacity-70 mb-3 sm:mb-0">
                      Created by {offer.createdBy.substring(0, 6)}...
                      {offer.createdBy.substring(offer.createdBy.length - 4)}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <ButtonWithLoading
                        variant="primary"
                        size="sm"
                        isLoading={isActionLoading}
                        loadingText="Processing..."
                        onClick={() => handleTakeOffer(offer.id)}
                        className="w-full sm:w-auto"
                      >
                        Take Offer
                      </ButtonWithLoading>

                      <Link href={`/offers/${offer.id}`} className="btn btn-ghost text-sm w-full sm:w-auto text-center">
                        View Details
                      </Link>
                    </div>
                  </div>
                </ResponsiveCard>
              ))}
            </div>
          ) : (
            <ResponsiveCard className="py-8 text-center">
              <p className="mb-4 opacity-70">No offers match your filter criteria</p>
              <button
                onClick={() => {
                  setAmountFilter("all")
                  setTimeFilter("all")
                  setRateFilter("all")
                  showToast("Filters Reset", "All filters have been reset", "info")
                }}
                className="btn btn-primary"
              >
                Reset Filters
              </button>
            </ResponsiveCard>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-md text-sm ${
                currentPage === 1
                  ? "bg-card-bg-alt opacity-50 cursor-not-allowed"
                  : "bg-card-bg-alt hover:bg-opacity-80"
              }`}
            >
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 flex items-center justify-center rounded-md text-sm ${
                    currentPage === page ? "bg-cta-bg text-primary-text" : "bg-card-bg-alt hover:bg-opacity-80"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-md text-sm ${
                currentPage === totalPages
                  ? "bg-card-bg-alt opacity-50 cursor-not-allowed"
                  : "bg-card-bg-alt hover:bg-opacity-80"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

