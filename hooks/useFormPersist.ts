"use client"

import { useEffect, useCallback } from 'react'

const STORAGE_PREFIX = 'firms_form_'

export function useFormPersist(formKey: string, formData: any) {
  const storageKey = `${STORAGE_PREFIX}${formKey}`

  const saveDraft = useCallback(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(formData))
    } catch {
    }
  }, [storageKey, formData])

  const loadDraft = useCallback(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  }, [storageKey])

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(storageKey)
    } catch {
    }
  }, [storageKey])

  useEffect(() => {
    const handleBeforeUnload = () => saveDraft()
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [saveDraft])

  return { saveDraft, loadDraft, clearDraft }
}
