"use client"

import { useState, useCallback } from 'react'

interface UploadOptions {
  maxSizeMB?: number
  allowedTypes?: string[]
}

interface UploadResult {
  url: string
  key: string
  fileName: string
  fileSize: number
}

export function useUpload(options: UploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const { maxSizeMB = 10, allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'] } = options

  const validateFile = useCallback((file: File): string | null => {
    const maxBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxBytes) {
      return `File size exceeds ${maxSizeMB}MB limit`
    }

    const ext = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!allowedTypes.includes(ext)) {
      return `File type ${ext} is not allowed. Accepted: ${allowedTypes.join(', ')}`
    }

    return null
  }, [maxSizeMB, allowedTypes])

  const upload = useCallback(async (file: File): Promise<UploadResult | null> => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return null
    }

    setIsUploading(true)
    setProgress(0)
    setError(null)

    try {
      setProgress(100)
      return {
        url: URL.createObjectURL(file),
        key: `${Date.now()}_${file.name}`,
        fileName: file.name,
        fileSize: file.size,
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed'
      setError(message)
      return null
    } finally {
      setIsUploading(false)
    }
  }, [validateFile])

  const reset = useCallback(() => {
    setProgress(0)
    setError(null)
    setIsUploading(false)
  }, [])

  return { upload, isUploading, progress, error, reset }
}
