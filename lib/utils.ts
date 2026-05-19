// lib/utils.ts - Utility functions for the FDA Ghana application

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes with proper conflict resolution
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string to a readable format
 * Example: "2026-03-15" → "March 15, 2026"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Generates a unique application ID for FDA submissions
 * Format: FDA-YYYY-NNN (Year-SequentialNumber)
 */
export function generateApplicationId(year: number, sequence: number): string {
  return `FDA-${year}-${String(sequence).padStart(3, '0')}`;
}

/**
 * Returns status badge color classes based on application status
 */
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'Approved': 'bg-green-100 text-green-700',
    'Under Review': 'bg-blue-100 text-blue-700',
    'Pending Payment': 'bg-amber-100 text-amber-700',
    'Draft': 'bg-slate-100 text-slate-700',
    'Rejected': 'bg-red-100 text-red-700',
  };
  
  return statusColors[status] || 'bg-slate-100 text-slate-700';
}