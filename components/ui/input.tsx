// components/ui/input.tsx
import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { FieldError, Merge } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | FieldError | Merge<FieldError, any> | null;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    // Convert any error to a readable string
    let errorMessage: string | undefined;
    if (typeof error === "string") {
      errorMessage = error;
    } else if (error && typeof error === "object" && "message" in error) {
      errorMessage = (error as FieldError).message;
    }

    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            errorMessage && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };