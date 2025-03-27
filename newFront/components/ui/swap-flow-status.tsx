import { cn } from "@/lib/utils"
import { Check, Clock, Lock } from "lucide-react"

type StepStatus = "locked" | "waiting" | "confirmed"

interface Step {
  id: string
  label: string
  status: StepStatus
}

interface SwapFlowStatusProps {
  steps: Step[]
  currentStepId: string
  className?: string
}

export function SwapFlowStatus({ steps, currentStepId, className }: SwapFlowStatusProps) {
  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStepId
          const isCompleted = steps.findIndex((s) => s.id === currentStepId) > index

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className="flex items-center">
                {index > 0 && (
                  <div className={cn("h-[2px] w-16 -ml-8 -mr-8 z-0", isCompleted ? "bg-cta-bg" : "bg-card-bg-alt")} />
                )}
                <div
                  className={cn(
                    "relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2",
                    isCurrent && "border-cta-bg",
                    isCompleted ? "bg-cta-bg border-cta-bg" : "bg-card-bg border-card-bg-alt",
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-primary-text" />
                  ) : isCurrent ? (
                    <Clock className="w-5 h-5 text-cta-bg" />
                  ) : (
                    <Lock className="w-5 h-5 text-primary-text/50" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-[2px] w-16 -ml-8 -mr-8 z-0",
                      steps.findIndex((s) => s.id === currentStepId) > index ? "bg-cta-bg" : "bg-card-bg-alt",
                    )}
                  />
                )}
              </div>
              <span className={cn("mt-2 text-xs", isCurrent ? "text-cta-bg font-bold" : "text-primary-text/70")}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

