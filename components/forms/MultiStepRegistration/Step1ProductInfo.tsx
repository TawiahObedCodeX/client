// components/forms/MultiStepRegistration/Step1ProductInfo.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RegistrationFormData } from "./index";

const productCategories = [
  { value: "FOOD", label: "Food Products" },
  { value: "DRUG", label: "Pharmaceutical Drugs" },
  { value: "COSMETIC", label: "Cosmetics" },
  { value: "MEDICAL_DEVICE", label: "Medical Devices" },
  { value: "NUTRITIONAL_SUPPLEMENT", label: "Nutritional Supplements" },
  { value: "PESTICIDE", label: "Pesticides" },
  { value: "HOUSEHOLD_CHEMICAL", label: "Household Chemicals" },
];

export function Step1ProductInfo() {
  const { register, formState: { errors }, setValue, watch } = useFormContext<RegistrationFormData>();
  const category = watch("category");

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-heading font-bold text-[#0D1B2A]">Product Identity</h3>
      <p className="text-slate-500 -mt-4">Provide the basic information about your product.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="productName" className="required">Official Product Name</Label>
          <Input
            id="productName"
            {...register("productName")}
            placeholder="e.g., Alpha Immune Booster Syrup"
            error={errors.productName?.message}
          />
        </div>

        <div>
          <Label htmlFor="brandName">Brand Name</Label>
          <Input id="brandName" {...register("brandName")} placeholder="Brand name (if applicable)" />
        </div>

        <div>
          <Label htmlFor="genericName">Generic / Scientific Name</Label>
          <Input id="genericName" {...register("genericName")} placeholder="Botanical Extract Complex" />
        </div>

        <div>
          <Label htmlFor="category" className="required">Product Category</Label>
          <Select value={category} onValueChange={(val) => setValue("category", val as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {productCategories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <Label htmlFor="dosageForm">Dosage Form</Label>
          <Input id="dosageForm" {...register("dosageForm")} placeholder="Tablet, Capsule, Liquid, etc." />
        </div>

        <div>
          <Label htmlFor="strength">Strength / Concentration</Label>
          <Input id="strength" {...register("strength")} placeholder="e.g., 500mg, 10%" />
        </div>

        <div>
          <Label htmlFor="packSize">Pack Size</Label>
          <Input id="packSize" {...register("packSize")} placeholder="e.g., 30 tablets, 100ml bottle" />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="intendedUse" className="required">Intended Use / Indication</Label>
          <Textarea
            id="intendedUse"
            {...register("intendedUse")}
            rows={4}
            placeholder="Describe the purpose, target users, and intended benefits..."
            className={errors.intendedUse ? "border-red-500" : ""}
          />
          {errors.intendedUse && <p className="text-red-500 text-sm mt-1">{errors.intendedUse.message}</p>}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="activeIngredients">Active Ingredients</Label>
          <Textarea
            id="activeIngredients"
            {...register("activeIngredients")}
            rows={3}
            placeholder="List all active ingredients and their quantities"
          />
        </div>

        <div>
          <Label htmlFor="storageConditions">Storage Conditions</Label>
          <Input id="storageConditions" {...register("storageConditions")} placeholder="e.g., Store below 30°C, protect from light" />
        </div>

        <div>
          <Label htmlFor="shelfLife">Shelf Life</Label>
          <Input id="shelfLife" {...register("shelfLife")} placeholder="e.g., 24 months from manufacture" />
        </div>
      </div>
    </div>
  );
}