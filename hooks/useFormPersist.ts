// hooks/useFormPersist.ts
import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";

export function useFormPersist<T extends Record<string, any>>(
  storageKey: string,
  watch: UseFormWatch<T>,
  debounceMs: number = 500
) {
  useEffect(() => {
    const subscription = watch((value) => {
      const handler = setTimeout(() => {
        if (value && Object.keys(value).length > 0) {
          localStorage.setItem(storageKey, JSON.stringify(value));
        }
      }, debounceMs);

      return () => clearTimeout(handler);
    });

    return () => subscription.unsubscribe();
  }, [watch, storageKey, debounceMs]);
}