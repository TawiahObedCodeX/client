// components/forms/ReviewForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const reviewSchema = z.object({
  action: z.enum(["APPROVED", "REJECTED", "RETURNED_FOR_INFO", "ESCALATED"]),
  notes: z.string().min(5, "Review notes are required"),
  isInternal: z.boolean().default(false),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function ReviewForm({ onSubmit, isSubmitting }: ReviewFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      action: "APPROVED",
      isInternal: false,
    },
  });

  const action = watch("action");

  const actionLabels: Record<string, string> = {
    APPROVED: "Approve Application",
    REJECTED: "Reject Application",
    RETURNED_FOR_INFO: "Request Additional Information",
    ESCALATED: "Escalate to Senior Officer",
  };

  const actionVariant: Record<string, "default" | "destructive" | "outline"> = {
    APPROVED: "default",
    REJECTED: "destructive",
    RETURNED_FOR_INFO: "default",
    ESCALATED: "default",
  };

  const actionExtraClass: Record<string, string> = {
    APPROVED: "bg-emerald-600 hover:bg-emerald-700",
    REJECTED: "",
    RETURNED_FOR_INFO: "bg-amber-600 hover:bg-amber-700",
    ESCALATED: "bg-purple-600 hover:bg-purple-700",
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="action">Decision</Label>
        <Select
          value={action}
          onValueChange={(val) => setValue("action", val as any)}
        >
          <SelectTrigger id="action" className="mt-1.5">
            <SelectValue placeholder="Select decision" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="APPROVED">✅ Approve</SelectItem>
            <SelectItem value="REJECTED">❌ Reject</SelectItem>
            <SelectItem value="RETURNED_FOR_INFO">🔄 Request More Info</SelectItem>
            <SelectItem value="ESCALATED">⬆️ Escalate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes">Review Notes</Label>
        <Textarea
          id="notes"
          {...register("notes")}
          rows={5}
          placeholder="Provide detailed reasoning for your decision..."
          error={errors.notes?.message}
        />
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="isInternal"
          checked={watch("isInternal")}
          onCheckedChange={(checked) => setValue("isInternal", checked === true)}
        />
        <Label htmlFor="isInternal" className="cursor-pointer">
          Internal note (visible only to FDA staff)
        </Label>
      </div>

      <Button
        type="submit"
        variant={actionVariant[action]}
        className={actionExtraClass[action]}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : actionLabels[action]}
      </Button>
    </form>
  );
}