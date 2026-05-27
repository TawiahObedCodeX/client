// components/ui/button.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion, MotionProps } from "motion/react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-[#0D1B2A] text-white hover:bg-[#1A3047] shadow-sm",
        gold: "bg-gradient-to-r from-[#D4A017] to-[#F0C040] text-[#0D1B2A] hover:brightness-110 shadow-md font-bold",
        outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
        ghost: "hover:bg-slate-100 text-slate-600",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  motion?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, motion: useMotion = false, children, ...props }, ref) => {
    const Component = useMotion ? motion.button : "button";
    const motionProps = useMotion ? { whileTap: { scale: 0.97 }, whileHover: { scale: 1.02 } } : {};
    
    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...motionProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };