"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle"
import { Loader } from "@/components/ui/loader"
import { Logo } from "@/components/ui/logo"
import { SwapFlowStatus } from "@/components/ui/swap-flow-status"
import { ToastNotification } from "@/components/ui/toast-notification"
import { WalletModal } from "@/components/ui/wallet-modal"

export default function StyleGuidePage() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [currentStep, setCurrentStep] = useState("step1")

  const steps = [
    { id: "step1", label: "Connect", status: "confirmed" as const },
    { id: "step2", label: "Deposit", status: "waiting" as const },
    { id: "step3", label: "Confirm", status: "locked" as const },
  ]

  const handleShowToast = (variant: "success" | "error" | "warning" | "info") => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="container-narrow py-8">
        <h1 className="text-xl mb-8">Catamaran Swaps Style Guide</h1>

        <section className="mb-12">
          <h2 className="text-lg mb-4">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <div className="h-20 bg-primary-bg border border-card-bg-alt rounded-lg"></div>
              <span className="mt-2 text-sm">Primary Background</span>
              <code className="text-xs text-primary-text/70">#000000</code>
            </div>
            <div className="flex flex-col">
              <div className="h-20 bg-card-bg rounded-lg"></div>
              <span className="mt-2 text-sm">Card Background</span>
              <code className="text-xs text-primary-text/70">#181818</code>
            </div>
            <div className="flex flex-col">
              <div className="h-20 bg-cta-bg rounded-lg"></div>
              <span className="mt-2 text-sm">CTA Background</span>
              <code className="text-xs text-primary-text/70">#FF6C00</code>
            </div>
            <div className="flex flex-col">
              <div className="h-20 bg-btc-color rounded-lg"></div>
              <span className="mt-2 text-sm">BTC Color</span>
              <code className="text-xs text-primary-text/70">#F7931A</code>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg mb-4">Typography</h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-xl">Heading 1 (32px)</h1>
              <code className="text-xs text-primary-text/70">text-xl</code>
            </div>
            <div>
              <h2 className="text-lg">Heading 2 (24px)</h2>
              <code className="text-xs text-primary-text/70">text-lg</code>
            </div>
            <div>
              <h3 className="text-base font-bold">Heading 3 (16px bold)</h3>
              <code className="text-xs text-primary-text/70">text-base font-bold</code>
            </div>
            <div>
              <p className="text-base">Body Text (16px)</p>
              <code className="text-xs text-primary-text/70">text-base</code>
            </div>
            <div>
              <p className="text-sm">Small Text (14px)</p>
              <code className="text-xs text-primary-text/70">text-sm</code>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg mb-4">Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Button variant="primary" className="mr-2">
                  Primary Button
                </Button>
                <code className="text-xs text-primary-text/70">variant="primary"</code>
              </div>
              <div>
                <Button variant="secondary" className="mr-2">
                  Secondary Button
                </Button>
                <code className="text-xs text-primary-text/70">variant="secondary"</code>
              </div>
              <div>
                <Button variant="ghost" className="mr-2">
                  Ghost Button
                </Button>
                <code className="text-xs text-primary-text/70">variant="ghost"</code>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Button variant="btc" className="mr-2">
                  BTC Button
                </Button>
                <code className="text-xs text-primary-text/70">variant="btc"</code>
              </div>
              <div>
                <Button variant="sbtc" className="mr-2">
                  SBTC Button
                </Button>
                <code className="text-xs text-primary-text/70">variant="sbtc"</code>
              </div>
              <div>
                <Button variant="primary" glow={true} className="mr-2">
                  Glowing Button
                </Button>
                <code className="text-xs text-primary-text/70">glow={true}</code>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg mb-4">Card</h2>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description text goes here</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the main content area of the card.</p>
            </CardContent>
            <CardFooter>
              <Button variant="primary">Action</Button>
            </CardFooter>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-lg mb-4">Swap Flow Status</h2>
          <SwapFlowStatus steps={steps} currentStepId={currentStep} />
          <div className="mt-4 flex space-x-2">
            <Button variant="secondary" size="sm" onClick={() => setCurrentStep("step1")}>
              Step 1
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setCurrentStep("step2")}>
              Step 2
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setCurrentStep("step3")}>
              Step 3
            </Button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg mb-4">Loader</h2>
          <div className="flex items-center space-x-8">
            <div className="flex flex-col items-center">
              <Loader size="sm" />
              <span className="mt-2 text-sm">Small</span>
            </div>
            <div className="flex flex-col items-center">
              <Loader size="md" />
              <span className="mt-2 text-sm">Medium</span>
            </div>
            <div className="flex flex-col items-center">
              <Loader size="lg" />
              <span className="mt-2 text-sm">Large</span>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg mb-4">Logo</h2>
          <div className="flex items-center space-x-8">
            <div className="flex flex-col items-center">
              <Logo size="sm" />
              <span className="mt-2 text-sm">Small</span>
            </div>
            <div className="flex flex-col items-center">
              <Logo size="md" />
              <span className="mt-2 text-sm">Medium</span>
            </div>
            <div className="flex flex-col items-center">
              <Logo size="lg" />
              <span className="mt-2 text-sm">Large</span>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-lg mb-4">Interactive Components</h2>
          <div className="space-y-4">
            <div>
              <Button variant="primary" onClick={() => setIsWalletModalOpen(true)}>
                Open Wallet Modal
              </Button>
            </div>
            <div className="space-x-2">
              <Button variant="secondary" onClick={() => handleShowToast("success")}>
                Success Toast
              </Button>
              <Button variant="secondary" onClick={() => handleShowToast("error")}>
                Error Toast
              </Button>
              <Button variant="secondary" onClick={() => handleShowToast("warning")}>
                Warning Toast
              </Button>
              <Button variant="secondary" onClick={() => handleShowToast("info")}>
                Info Toast
              </Button>
            </div>
            <div>
              <DarkModeToggle />
              <span className="ml-2">Dark Mode Toggle</span>
            </div>
          </div>
        </section>
      </div>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={(walletId) => {
          setIsWalletModalOpen(false)
          handleShowToast("success")
        }}
      />

      {showToast && (
        <ToastNotification
          title="Toast Notification"
          description="This is an example toast notification"
          variant="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </main>
  )
}

