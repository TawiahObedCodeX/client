// components/upload/UploadProgress.tsx
"use client";

import { motion } from "motion/react";
import { Progress } from "@/components/ui/progress";
import { FileUp } from "lucide-react";

interface UploadProgressProps {
  progress: number;
  fileName: string;
}

export function UploadProgress({ progress, fileName }: UploadProgressProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-2 bg-slate-100 rounded-lg">
        <FileUp className="w-5 h-5 text-[#D4A017]" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-700 truncate max-w-[200px] sm:max-w-md">
          {fileName}
        </p>
        <Progress value={progress} className="h-1.5 mt-2" />
        <p className="text-xs text-slate-400 mt-1">{Math.round(progress)}% uploaded</p>
      </div>
    </div>
  );
}