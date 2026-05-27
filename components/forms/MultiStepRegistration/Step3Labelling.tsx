// components/forms/MultiStepRegistration/Step3Labelling.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export function Step3Labelling() {
  const { register, watch, setValue } = useFormContext();
  const hasSideEffects = watch("hasSideEffects");

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-heading font-bold text-[#0D1B2A]">Labelling & Safety Information</h3>
      <p className="text-slate-500 -mt-4">Provide product labelling details and safety warnings.</p>

      <div className="space-y-6">
        <div>
          <Label htmlFor="labelArtworkFile">Label Artwork / Mock-up (Optional)</Label>
          <input
            type="file"
            id="labelArtworkFile"
            accept="image/*,application/pdf"
            className="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
            {...register("labelArtworkFile")}
          />
          <p className="text-xs text-slate-400 mt-1">Upload product label artwork (JPG, PNG, PDF)</p>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="hasSideEffects"
            checked={hasSideEffects}
            onCheckedChange={(checked) => setValue("hasSideEffects", checked === true)}
          />
          <Label htmlFor="hasSideEffects" className="cursor-pointer">This product has known side effects or adverse reactions</Label>
        </div>

        {hasSideEffects && (
          <div className="pl-8 border-l-4 border-amber-300">
            <Label htmlFor="sideEffectsDescription">Side Effects Description</Label>
            <Textarea
              id="sideEffectsDescription"
              {...register("sideEffectsDescription")}
              rows={3}
              placeholder="Describe all known side effects, frequency, and severity"
            />
          </div>
        )}

        <div>
          <Label htmlFor="contraindications">Contraindications & Warnings</Label>
          <Textarea
            id="contraindications"
            {...register("contraindications")}
            rows={3}
            placeholder="Who should not use this product? Any special warnings?"
          />
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
        <p className="text-sm text-amber-800">
          <strong>Regulatory Requirement:</strong> All labelling must comply with FDA Ghana's Labelling Guidelines. 
          The submitted label artwork will be reviewed for compliance.
        </p>
      </div>
    </div>
  );
}