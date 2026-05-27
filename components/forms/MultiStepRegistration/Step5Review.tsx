// components/forms/MultiStepRegistration/Step5Review.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RegistrationFormData } from "./index";

export function Step5Review() {
  const { watch, register, formState: { errors } } = useFormContext<RegistrationFormData>();
  const data = watch();

  const formatCategory = (cat: string) => {
    const map: Record<string, string> = {
      FOOD: "Food Products",
      DRUG: "Pharmaceutical Drugs",
      COSMETIC: "Cosmetics",
      MEDICAL_DEVICE: "Medical Devices",
      NUTRITIONAL_SUPPLEMENT: "Nutritional Supplements",
      PESTICIDE: "Pesticides",
      HOUSEHOLD_CHEMICAL: "Household Chemicals",
    };
    return map[cat] || cat;
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-heading font-bold text-[#0D1B2A]">Review & Submit</h3>
      <p className="text-slate-500 -mt-4">Please verify all information before submitting.</p>

      <div className="bg-slate-50 rounded-2xl border border-slate-200 divide-y divide-slate-200">
        <div className="p-6">
          <h4 className="font-heading font-bold text-[#0D1B2A] mb-4">Product Information</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-500">Product Name</dt>
              <dd className="font-medium">{data.productName || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Brand Name</dt>
              <dd className="font-medium">{data.brandName || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Category</dt>
              <dd className="font-medium">{formatCategory(data.category)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Dosage Form</dt>
              <dd className="font-medium">{data.dosageForm || "—"}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-slate-500">Intended Use</dt>
              <dd className="font-medium">{data.intendedUse || "—"}</dd>
            </div>
          </dl>
        </div>

        <div className="p-6">
          <h4 className="font-heading font-bold text-[#0D1B2A] mb-4">Manufacturer Details</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-500">Manufacturer</dt>
              <dd className="font-medium">{data.manufacturerName || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Country of Origin</dt>
              <dd className="font-medium">{data.countryOfOrigin || "—"}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-slate-500">Address</dt>
              <dd className="font-medium">{data.manufacturerAddress || "—"}</dd>
            </div>
          </dl>
        </div>

        <div className="p-6">
          <h4 className="font-heading font-bold text-[#0D1B2A] mb-4">Documents</h4>
          <ul className="list-disc list-inside text-sm space-y-1">
            {(data.documents || []).map((doc, idx) => (
              <li key={idx} className="text-slate-600">{doc.fileName} ({doc.type})</li>
            ))}
            {(data.documents || []).length === 0 && <li className="text-slate-400">No documents uploaded</li>}
          </ul>
        </div>
      </div>

      <div className="flex items-start gap-3 pt-4">
        <Checkbox id="termsAccepted" {...register("termsAccepted")} />
        <Label htmlFor="termsAccepted" className="cursor-pointer text-sm leading-relaxed">
          I confirm that all information provided is accurate and complete. I agree to comply with the 
          FDA Ghana's regulatory requirements and understand that providing false information may result 
          in rejection or legal action.
        </Label>
      </div>
      {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>}
    </div>
  );
}