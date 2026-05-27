// components/common/EmptyState.tsx
import { motion } from "motion/react";
import { FileX, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, actionHref, onAction }: EmptyStateProps) {
  const ActionButton = () => {
    if (actionHref) {
      return (
        <Link href={actionHref}>
          <Button variant="gold" className="gap-2">
            <Plus className="w-4 h-4" />
            {actionLabel}
          </Button>
        </Link>
      );
    }
    if (onAction) {
      return (
        <Button variant="gold" onClick={onAction} className="gap-2">
          <Plus className="w-4 h-4" />
          {actionLabel}
        </Button>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-slate-200"
    >
      <div className="p-4 bg-slate-100 rounded-full mb-6">
        <FileX className="w-12 h-12 text-slate-400" />
      </div>
      <h3 className="text-xl font-heading font-bold text-[#0D1B2A] mb-2">{title}</h3>
      <p className="text-slate-500 max-w-sm mb-6">{description}</p>
      {actionLabel && <ActionButton />}
    </motion.div>
  );
}