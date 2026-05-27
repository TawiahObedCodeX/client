// components/forms/MultiStepRegistration/Step2Manufacturer.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function Step2Manufacturer() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-heading font-bold text-[#0D1B2A]">
        Manufacturer & Origin Details
      </h3>
      <p className="text-slate-500 -mt-4">
        Information about the product manufacturer and country of origin.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="countryOfOrigin" className="required">
            Country of Origin
          </Label>
          <Input
            id="countryOfOrigin"
            {...register("countryOfOrigin")}
            placeholder="e.g., Ghana, India, China"
            error={errors.countryOfOrigin?.message}
          />
        </div>

        <div>
          <Label htmlFor="manufacturerName" className="required">
            Manufacturer Name
          </Label>
          <Input
            id="manufacturerName"
            {...register("manufacturerName")}
            placeholder="Full legal name of manufacturer"
            error={errors.manufacturerName?.message}
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="manufacturerAddress" className="required">
            Manufacturer Address
          </Label>
          <Textarea
            id="manufacturerAddress"
            {...register("manufacturerAddress")}
            rows={4}
            placeholder="Complete physical address including city, region, country"
            error={errors.manufacturerAddress?.message}
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="importerName">
            Importer Name (if different from manufacturer)
          </Label>
          <Input
            id="importerName"
            {...register("importerName")}
            placeholder="Name of the importing company in Ghana"
          />
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <p className="text-sm text-slate-600">
          <strong className="text-[#0D1B2A]">Note:</strong> All manufacturing sites must be
          registered with the FDA Ghana. You will need to upload the Manufacturer's License
          in the Documents section.
        </p>
      </div>
    </div>
  );
}