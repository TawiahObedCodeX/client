// components/forms/FormPersist.tsx
"use client";

import { useEffect } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";

interface FormPersistProps {
  storageKey: string;
  debounceMs?: number;
}

export function FormPersist({ storageKey, debounceMs = 500 }: FormPersistProps) {
  const { watch, reset } = useFormContext();
  const formValues = watch();

  // Save to localStorage on change
  useEffect(() => {
    const handler = setTimeout(() => {
      if (formValues && Object.keys(formValues).length > 0) {
        localStorage.setItem(storageKey, JSON.stringify(formValues));
        console.log(`[FormPersist] Saved to ${storageKey}`);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [formValues, storageKey, debounceMs]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        reset(parsed);
        console.log(`[FormPersist] Restored from ${storageKey}`);
      } catch (e) {
        console.error("Failed to restore form data", e);
      }
    }
  }, [storageKey, reset]);

  return null;
}