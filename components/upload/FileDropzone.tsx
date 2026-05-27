// components/upload/FileDropzone.tsx
"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { UploadProgress } from "./UploadProgress";

interface FileDropzoneProps {
  onUploadComplete: (fileKey: string, fileName: string) => void;
  acceptedFileTypes?: string[];
  maxSizeMB?: number;
  className?: string;
}

export function FileDropzone({
  onUploadComplete,
  acceptedFileTypes = ["application/pdf", "image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  maxSizeMB = 10,
  className,
}: FileDropzoneProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    try {
      // Get presigned URL from API
      const response = await fetch("/api/uploads/presigned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      if (!response.ok) throw new Error("Failed to get upload URL");

      const { url, fileKey } = await response.json();

      // Upload to S3
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) throw new Error("Upload failed");

      clearInterval(interval);
      setProgress(100);

      // Notify parent
      onUploadComplete(fileKey, file.name);

      // Reset after short delay
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 1000);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Upload failed. Please try again.");
      clearInterval(interval);
      setUploading(false);
      setProgress(0);
    }
  }, [maxSizeMB, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    multiple: false,
    disabled: uploading,
  });

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all",
          isDragActive
            ? "border-[#D4A017] bg-[#D4A017]/5"
            : "border-slate-300 hover:border-[#D4A017] bg-slate-50",
          uploading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        {isDragActive ? (
          <p className="text-[#D4A017]">Drop the file here...</p>
        ) : (
          <>
            <p className="text-slate-600">Drag & drop a file here, or click to select</p>
            <p className="text-xs text-slate-400 mt-2">
              Supported: PDF, Images, Word documents (Max {maxSizeMB}MB)
            </p>
          </>
        )}
      </div>

      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <UploadProgress progress={progress} fileName="Uploading..." />
          </motion.div>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-500 text-sm mt-2 flex items-center gap-1"
          >
            <X className="w-4 h-4" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}