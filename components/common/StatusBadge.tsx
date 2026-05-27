// components/common/StatusBadge.tsx
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { variant: "default" | "success" | "warning" | "error" | "info" | "gold"; label: string }> = {
  DRAFT: { variant: "default", label: "Draft" },
  SUBMITTED: { variant: "info", label: "Submitted" },
  UNDER_REVIEW: { variant: "warning", label: "Under Review" },
  PENDING_INFO: { variant: "warning", label: "Pending Info" },
  ESCALATED: { variant: "error", label: "Escalated" },
  APPROVED: { variant: "success", label: "Approved" },
  REJECTED: { variant: "error", label: "Rejected" },
  WITHDRAWN: { variant: "default", label: "Withdrawn" },
  EXPIRED: { variant: "default", label: "Expired" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { variant: "default", label: status };
  return (
    <Badge variant={config.variant as any} className={cn("font-mono text-xs", className)}>
      {config.label}
    </Badge>
  );
}