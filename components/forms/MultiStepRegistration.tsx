// ─────────────────────────────────────────────────
// components/forms/MultiStepRegistration.tsx
// Multi-Step Form for Product Registration
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Save,
  Send,
  Loader2,
  AlertCircle,
  Package,
  Building2,
  FileUp,
  ClipboardCheck,
  Info,
} from "lucide-react"
import { toast } from "sonner"

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface FormStep {
  id: number
  title: string
  description: string
  icon: any
  isComplete: boolean
  isCurrent: boolean
}

interface MultiStepRegistrationProps {
  onSubmit?: (data: any) => void
  onSaveDraft?: (data: any) => void
  initialData?: any
}

// ─────────────────────────────────────────────────
// MultiStepRegistration Component
// ─────────────────────────────────────────────────
export function MultiStepRegistration({
  onSubmit,
  onSaveDraft,
  initialData,
}: MultiStepRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 4

  // Step configuration
  const steps: FormStep[] = [
    {
      id: 1,
      title: "Product Details",
      description: "Basic product information",
      icon: Package,
      isComplete: currentStep > 1,
      isCurrent: currentStep === 1,
    },
    {
      id: 2,
      title: "Manufacturer",
      description: "Manufacturer information",
      icon: Building2,
      isComplete: currentStep > 2,
      isCurrent: currentStep === 2,
    },
    {
      id: 3,
      title: "Documents",
      description: "Upload required files",
      icon: FileUp,
      isComplete: currentStep > 3,
      isCurrent: currentStep === 3,
    },
    {
      id: 4,
      title: "Review",
      description: "Review and submit",
      icon: ClipboardCheck,
      isComplete: false,
      isCurrent: currentStep === 4,
    },
  ]

  // Progress percentage
  const progress = (currentStep / totalSteps) * 100

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    // Add validation logic here based on step
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle next step
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1)
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } else {
      toast.error("Please fix the errors before proceeding")
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Handle save draft
  const handleSaveDraft = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSaveDraft?.({ currentStep })
      toast.success("Draft saved successfully!")
    } catch (error) {
      toast.error("Failed to save draft")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle final submit
  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onSubmit?.({})
      toast.success("Application submitted successfully!")
    } catch (error) {
      toast.error("Failed to submit application")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render step content placeholder
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Product Details</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Enter the basic information about the product you want to register.
                    All fields marked with an asterisk (*) are required.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-slate-600">
              Step 1 form content - Product name, category, description, etc.
            </p>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-slate-600">
              Step 2 form content - Manufacturer details, address, contact, etc.
            </p>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <p className="text-slate-600">
              Step 3 form content - Document upload section.
            </p>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <p className="text-slate-600">
              Step 4 form content - Review all information before submission.
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Product Registration - Step {currentStep} of {totalSteps}
        </CardTitle>
        <CardDescription>
          {steps[currentStep - 1].description}
        </CardDescription>
        {/* Step indicators */}
        <div className="flex items-center gap-2 mt-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  step.isComplete
                    ? "bg-green-500 text-white"
                    : step.isCurrent
                    ? "bg-[#2563EB] text-white ring-4 ring-blue-100"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {step.isComplete ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    step.isComplete ? "bg-green-500" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <div className="min-h-[300px]">{renderStepContent()}</div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button variant="ghost" onClick={handleSaveDraft} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
        </div>
        <div>
          {currentStep < totalSteps ? (
            <Button onClick={handleNext} className="bg-[#2563EB] hover:bg-[#1E40AF]">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}