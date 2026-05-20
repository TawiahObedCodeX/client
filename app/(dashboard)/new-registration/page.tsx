// ─────────────────────────────────────────────────
// app/(dashboard)/new-registration/page.tsx
// New Product Registration Page with Multi-Step Form
// Version: 2026.1.0
// ─────────────────────────────────────────────────

"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ClipboardCheck,
  Package,
  Building2,
  FileUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Save,
  Send,
  Loader2,
  AlertCircle,
  Info,
  X,
  Plus,
  Trash2,
  Eye,
  Download,
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"

// ─────────────────────────────────────────────────
// Type Definitions
// ─────────────────────────────────────────────────
interface ProductDetails {
  productName: string
  genericName: string
  brandName: string
  category: string
  subCategory: string
  dosageForm: string
  strength: string
  packSize: string
  description: string
}

interface ManufacturerInfo {
  manufacturerName: string
  manufacturingAddress: string
  country: string
  licenseNumber: string
  gmpCertificate: string
  contactPerson: string
  contactEmail: string
  contactPhone: string
}

interface DocumentUpload {
  name: string
  file: File | null
  required: boolean
  uploaded: boolean
  description: string
}

interface RegistrationFormData {
  productDetails: ProductDetails
  manufacturerInfo: ManufacturerInfo
  documents: DocumentUpload[]
  termsAgreed: boolean
}

// ─────────────────────────────────────────────────
// Form Steps Configuration
// ─────────────────────────────────────────────────
const formSteps = [
  {
    id: 1,
    title: "Product Details",
    description: "Basic information about the product",
    icon: Package,
  },
  {
    id: 2,
    title: "Manufacturer Info",
    description: "Details about the manufacturer",
    icon: Building2,
  },
  {
    id: 3,
    title: "Documents",
    description: "Upload required documents",
    icon: FileUp,
  },
  {
    id: 4,
    title: "Review & Submit",
    description: "Review and submit application",
    icon: ClipboardCheck,
  },
]

// ─────────────────────────────────────────────────
// Product Categories
// ─────────────────────────────────────────────────
const productCategories = [
  { value: "", label: "Select a category" },
  { value: "FOOD_PRODUCTS", label: "Food Products" },
  { value: "PHARMACEUTICALS", label: "Pharmaceuticals" },
  { value: "MEDICAL_DEVICES", label: "Medical Devices" },
  { value: "COSMETICS", label: "Cosmetics" },
  { value: "HOUSEHOLD_CHEMICALS", label: "Household Chemicals" },
  { value: "HERBAL_PRODUCTS", label: "Herbal Products" },
  { value: "FOOD_SUPPLEMENTS", label: "Food Supplements" },
  { value: "VETERINARY_PRODUCTS", label: "Veterinary Products" },
]

// ─────────────────────────────────────────────────
// Required Documents by Category
// ─────────────────────────────────────────────────
const getRequiredDocuments = (category: string): DocumentUpload[] => {
  const baseDocuments: DocumentUpload[] = [
    {
      name: "product_specification",
      file: null,
      required: true,
      uploaded: false,
      description: "Detailed product specification sheet",
    },
    {
      name: "manufacturing_license",
      file: null,
      required: true,
      uploaded: false,
      description: "Valid manufacturing license",
    },
    {
      name: "gmp_certificate",
      file: null,
      required: true,
      uploaded: false,
      description: "Good Manufacturing Practice certificate",
    },
    {
      name: "certificate_of_analysis",
      file: null,
      required: true,
      uploaded: false,
      description: "Certificate of Analysis from accredited lab",
    },
  ]

  if (category === "PHARMACEUTICALS") {
    baseDocuments.push({
      name: "clinical_trial_data",
      file: null,
      required: true,
      uploaded: false,
      description: "Clinical trial data and safety reports",
    })
    baseDocuments.push({
      name: "stability_study",
      file: null,
      required: true,
      uploaded: false,
      description: "Stability study results",
    })
  }

  if (category === "FOOD_PRODUCTS" || category === "FOOD_SUPPLEMENTS") {
    baseDocuments.push({
      name: "nutritional_analysis",
      file: null,
      required: true,
      uploaded: false,
      description: "Nutritional analysis report",
    })
  }

  baseDocuments.push({
    name: "product_label",
    file: null,
    required: true,
    uploaded: false,
    description: "Product label artwork",
  })
  baseDocuments.push({
    name: "free_sale_certificate",
    file: null,
    required: false,
    uploaded: false,
    description: "Free Sale Certificate (if imported)",
  })

  return baseDocuments
}

// ─────────────────────────────────────────────────
// Initial Form Data
// ─────────────────────────────────────────────────
const initialFormData: RegistrationFormData = {
  productDetails: {
    productName: "",
    genericName: "",
    brandName: "",
    category: "",
    subCategory: "",
    dosageForm: "",
    strength: "",
    packSize: "",
    description: "",
  },
  manufacturerInfo: {
    manufacturerName: "",
    manufacturingAddress: "",
    country: "",
    licenseNumber: "",
    gmpCertificate: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
  },
  documents: getRequiredDocuments(""),
  termsAgreed: false,
}

// ─────────────────────────────────────────────────
// Main Registration Page Component
// ─────────────────────────────────────────────────
export default function NewRegistrationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPreview, setShowPreview] = useState(false)

  // Calculate progress
  const progress = (currentStep / formSteps.length) * 100

  // Handle product details change
  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      productDetails: {
        ...prev.productDetails,
        [name]: value,
      },
    }))

    // Update required documents when category changes
    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        documents: getRequiredDocuments(value),
      }))
    }

    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle manufacturer info change
  const handleManufacturerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      manufacturerInfo: {
        ...prev.manufacturerInfo,
        [name]: value,
      },
    }))

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle file upload
  const handleFileUpload = (index: number, file: File | null) => {
    setFormData((prev) => {
      const newDocuments = [...prev.documents]
      newDocuments[index] = {
        ...newDocuments[index],
        file,
        uploaded: file !== null,
      }
      return { ...prev, documents: newDocuments }
    })
  }

  // Validate current step
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.productDetails.productName.trim()) {
          newErrors.productName = "Product name is required"
        }
        if (!formData.productDetails.category) {
          newErrors.category = "Category is required"
        }
        if (!formData.productDetails.description.trim()) {
          newErrors.description = "Description is required"
        } else if (formData.productDetails.description.trim().length < 10) {
          newErrors.description = "Description must be at least 10 characters"
        }
        break

      case 2:
        if (!formData.manufacturerInfo.manufacturerName.trim()) {
          newErrors.manufacturerName = "Manufacturer name is required"
        }
        if (!formData.manufacturerInfo.country.trim()) {
          newErrors.country = "Country is required"
        }
        if (!formData.manufacturerInfo.contactEmail.trim()) {
          newErrors.contactEmail = "Contact email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.manufacturerInfo.contactEmail)) {
          newErrors.contactEmail = "Invalid email format"
        }
        break

      case 3:
        const missingRequired = formData.documents.some(
          (doc) => doc.required && !doc.uploaded
        )
        if (missingRequired) {
          newErrors.documents = "Please upload all required documents"
        }
        break

      case 4:
        if (!formData.termsAgreed) {
          newErrors.termsAgreed = "You must agree to the terms and conditions"
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navigation handlers
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < formSteps.length) {
        setCurrentStep((prev) => prev + 1)
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } else {
      toast.error("Please fix the errors before proceeding")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSaveDraft = () => {
    toast.success("Application saved as draft")
    // In production, this would save to the database
  }

  // Handle final submission
  const handleSubmit = async () => {
    if (!validateStep(4)) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Application submitted successfully!")
      router.push("/dashboard/applications")
    } catch (error) {
      toast.error("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─────────────────────────────────────────────────
  // Render Step 1: Product Details
  // ─────────────────────────────────────────────────
  const renderProductDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productDetails.productName}
            onChange={handleProductChange}
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
              errors.productName
                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
            }`}
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="mt-1 text-xs text-red-600">{errors.productName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Brand Name
          </label>
          <input
            type="text"
            name="brandName"
            value={formData.productDetails.brandName}
            onChange={handleProductChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="Enter brand name (if different)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Generic Name
          </label>
          <input
            type="text"
            name="genericName"
            value={formData.productDetails.genericName}
            onChange={handleProductChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="Enter generic/chemical name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.productDetails.category}
            onChange={handleProductChange}
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
              errors.category
                ? "border-red-300 focus:border-red-500"
                : "border-slate-200 focus:border-[#2563EB]"
            }`}
          >
            {productCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-xs text-red-600">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Dosage Form
          </label>
          <input
            type="text"
            name="dosageForm"
            value={formData.productDetails.dosageForm}
            onChange={handleProductChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="e.g., Tablet, Cream, Liquid"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Strength/Concentration
          </label>
          <input
            type="text"
            name="strength"
            value={formData.productDetails.strength}
            onChange={handleProductChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="e.g., 500mg, 5%"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Pack Size
        </label>
        <input
          type="text"
          name="packSize"
          value={formData.productDetails.packSize}
          onChange={handleProductChange}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          placeholder="e.g., 30 tablets, 100ml"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Product Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={formData.productDetails.description}
          onChange={handleProductChange}
          rows={4}
          className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all resize-none ${
            errors.description
              ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
          }`}
          placeholder="Provide a detailed description of the product, its intended use, and any relevant information..."
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-xs text-slate-400">
          {formData.productDetails.description.length} characters (minimum 10)
        </p>
      </div>
    </div>
  )

  // ─────────────────────────────────────────────────
  // Render Step 2: Manufacturer Info
  // ─────────────────────────────────────────────────
  const renderManufacturerInfo = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">Manufacturer Information</p>
            <p className="text-xs text-blue-700 mt-1">
              Provide details about the manufacturer. If the manufacturer is the same as your company, you can use your company details.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Manufacturer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="manufacturerName"
            value={formData.manufacturerInfo.manufacturerName}
            onChange={handleManufacturerChange}
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
              errors.manufacturerName
                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
            }`}
            placeholder="Enter manufacturer name"
          />
          {errors.manufacturerName && (
            <p className="mt-1 text-xs text-red-600">{errors.manufacturerName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="country"
            value={formData.manufacturerInfo.country}
            onChange={handleManufacturerChange}
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
              errors.country
                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
            }`}
            placeholder="Enter country of manufacture"
          />
          {errors.country && (
            <p className="mt-1 text-xs text-red-600">{errors.country}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Manufacturing Address
          </label>
          <textarea
            name="manufacturingAddress"
            value={formData.manufacturerInfo.manufacturingAddress}
            onChange={handleManufacturerChange}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
            placeholder="Enter full manufacturing address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            License Number
          </label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.manufacturerInfo.licenseNumber}
            onChange={handleManufacturerChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="Enter manufacturing license number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            GMP Certificate Number
          </label>
          <input
            type="text"
            name="gmpCertificate"
            value={formData.manufacturerInfo.gmpCertificate}
            onChange={handleManufacturerChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="Enter GMP certificate number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Person
          </label>
          <input
            type="text"
            name="contactPerson"
            value={formData.manufacturerInfo.contactPerson}
            onChange={handleManufacturerChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="Enter contact person name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.manufacturerInfo.contactEmail}
            onChange={handleManufacturerChange}
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 focus:bg-white outline-none transition-all ${
              errors.contactEmail
                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-200 focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
            }`}
            placeholder="Enter contact email"
          />
          {errors.contactEmail && (
            <p className="mt-1 text-xs text-red-600">{errors.contactEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Contact Phone
          </label>
          <input
            type="text"
            name="contactPhone"
            value={formData.manufacturerInfo.contactPhone}
            onChange={handleManufacturerChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="Enter contact phone number"
          />
        </div>
      </div>
    </div>
  )

  // ─────────────────────────────────────────────────
  // Render Step 3: Documents
  // ─────────────────────────────────────────────────
  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">Required Documents</p>
            <p className="text-xs text-amber-700 mt-1">
              All documents marked with an asterisk (*) are required. Accepted formats: PDF, JPG, PNG (max 10MB each).
            </p>
          </div>
        </div>
      </div>

      {errors.documents && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{errors.documents}</p>
        </div>
      )}

      <div className="space-y-4">
        {formData.documents.map((doc, index) => (
          <div
            key={doc.name}
            className={`border rounded-xl p-4 transition-all ${
              doc.uploaded
                ? "border-green-300 bg-green-50"
                : doc.required
                ? "border-slate-200 bg-white"
                : "border-slate-100 bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    doc.uploaded
                      ? "bg-green-100"
                      : doc.required
                      ? "bg-blue-50"
                      : "bg-slate-100"
                  }`}
                >
                  {doc.uploaded ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <FileUp
                      className={`w-5 h-5 ${
                        doc.required ? "text-blue-600" : "text-slate-400"
                      }`}
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium text-[#0F172A] text-sm">
                    {doc.name
                      .split("_")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                    {doc.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500">{doc.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {doc.uploaded && doc.file && (
                  <span className="text-xs text-green-600 font-medium">
                    {doc.file.name}
                  </span>
                )}
                <label className="cursor-pointer">
                  <Button
                    variant={doc.uploaded ? "outline" : "default"}
                    size="sm"
                    className={
                      doc.uploaded
                        ? "border-green-300 text-green-700 hover:bg-green-50"
                        : "bg-[#2563EB] hover:bg-[#1E40AF]"
                    }
                    asChild
                  >
                    <span>
                      {doc.uploaded ? (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Change
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-1" />
                          Upload
                        </>
                      )}
                    </span>
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null
                      handleFileUpload(index, file)
                    }}
                  />
                </label>
                {doc.uploaded && (
                  <button
                    onClick={() => handleFileUpload(index, null)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // ─────────────────────────────────────────────────
  // Render Step 4: Review & Submit
  // ─────────────────────────────────────────────────
  const renderReview = () => (
    <div className="space-y-6">
      {/* Product Details Summary */}
      <div className="border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-[#2563EB]" />
          Product Details
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-slate-500">Product Name</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.productDetails.productName || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Category</dt>
            <dd className="font-medium text-[#0F172A]">
              {productCategories.find((c) => c.value === formData.productDetails.category)?.label || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Brand Name</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.productDetails.brandName || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Generic Name</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.productDetails.genericName || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Dosage Form</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.productDetails.dosageForm || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Strength</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.productDetails.strength || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Pack Size</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.productDetails.packSize || "—"}
            </dd>
          </div>
        </dl>
        <div className="mt-4">
          <dt className="text-sm text-slate-500">Description</dt>
          <dd className="mt-1 text-sm text-[#0F172A]">
            {formData.productDetails.description || "—"}
          </dd>
        </div>
      </div>

      {/* Manufacturer Summary */}
      <div className="border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#2563EB]" />
          Manufacturer Information
        </h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-slate-500">Manufacturer Name</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.manufacturerInfo.manufacturerName || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Country</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.manufacturerInfo.country || "—"}
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm text-slate-500">Address</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.manufacturerInfo.manufacturingAddress || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">License Number</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.manufacturerInfo.licenseNumber || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">GMP Certificate</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.manufacturerInfo.gmpCertificate || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Contact Person</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.manufacturerInfo.contactPerson || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Contact Email</dt>
            <dd className="font-medium text-[#0F172A]">
              {formData.manufacturerInfo.contactEmail || "—"}
            </dd>
          </div>
        </dl>
      </div>

      {/* Documents Summary */}
      <div className="border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <FileUp className="w-5 h-5 text-[#2563EB]" />
          Documents ({formData.documents.filter((d) => d.uploaded).length} of{" "}
          {formData.documents.filter((d) => d.required).length} required uploaded)
        </h3>
        <div className="space-y-2">
          {formData.documents.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                {doc.uploaded ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                ) : doc.required ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                )}
                <span className="text-sm text-slate-700">
                  {doc.name
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
              </div>
              <span className="text-xs text-slate-500">
                {doc.uploaded ? doc.file?.name : doc.required ? "Required" : "Optional"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="border rounded-xl p-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.termsAgreed}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, termsAgreed: e.target.checked }))
            }
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
          />
          <div>
            <p className="text-sm font-medium text-[#0F172A]">
              I confirm that all information provided is accurate and complete
            </p>
            <p className="text-xs text-slate-500 mt-1">
              By submitting this application, I agree to the FDA Ghana terms and conditions,
              and I understand that providing false information may result in legal consequences.
            </p>
          </div>
        </label>
        {errors.termsAgreed && (
          <p className="mt-2 text-xs text-red-600">{errors.termsAgreed}</p>
        )}
      </div>
    </div>
  )

  // ─────────────────────────────────────────────────
  // Main Render
  // ─────────────────────────────────────────────────
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">New Product Registration</h1>
        <p className="text-slate-500 mt-1">
          Submit a new product registration application to FDA Ghana
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {formSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                index < formSteps.length - 1 ? "flex-1" : ""
              }`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                    currentStep > step.id
                      ? "bg-green-500 text-white"
                      : currentStep === step.id
                      ? "bg-[#2563EB] text-white shadow-md"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium hidden sm:block ${
                    currentStep >= step.id ? "text-[#0F172A]" : "text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < formSteps.length - 1 && (
                <div className="flex-1 mx-2 mt-[-8px]">
                  <div
                    className={`h-1 rounded-full ${
                      currentStep > step.id ? "bg-green-500" : "bg-slate-200"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {(() => {
              const StepIcon = formSteps[currentStep - 1].icon
              return (
                <>
                  <StepIcon className="w-5 h-5 text-[#2563EB]" />
                  {formSteps[currentStep - 1].title}
                </>
              )
            })()}
          </CardTitle>
          <CardDescription>
            Step {currentStep} of {formSteps.length}: {formSteps[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && renderProductDetails()}
          {currentStep === 2 && renderManufacturerInfo()}
          {currentStep === 3 && renderDocuments()}
          {currentStep === 4 && renderReview()}
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
            <Button variant="ghost" onClick={handleSaveDraft}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
          </div>
          <div>
            {currentStep < formSteps.length ? (
              <Button
                onClick={handleNext}
                className="bg-[#2563EB] hover:bg-[#1E40AF]"
              >
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

      {/* Back to Dashboard */}
      <div className="mt-6 text-center">
        <Link
          href="/dashboard"
          className="text-sm text-slate-500 hover:text-[#2563EB] transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}