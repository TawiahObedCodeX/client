// hooks/useUpload.ts
import { useState } from "react";

interface UseUploadOptions {
  onSuccess?: (fileKey: string, fileName: string) => void;
  onError?: (error: Error) => void;
}

export function useUpload({ onSuccess, onError }: UseUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setProgress(0);

    try {
      // Get presigned URL
      const presignRes = await fetch("/api/uploads/presigned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      if (!presignRes.ok) throw new Error("Failed to get upload URL");

      const { url, fileKey } = await presignRes.json();

      // Upload with progress tracking
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      });

      await new Promise((resolve, reject) => {
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.onload = () => {
          if (xhr.status === 200) resolve(null);
          else reject(new Error("Upload failed"));
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(file);
      });

      onSuccess?.(fileKey, file.name);
      return { fileKey, fileName: file.name };
    } catch (err) {
      onError?.(err instanceof Error ? err : new Error("Upload failed"));
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading, progress };
}