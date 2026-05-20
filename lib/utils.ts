// lib/utils.ts - General Utility Functions
// Contains helper functions used throughout the application

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes with proper conflict resolution
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string to a readable format
 * Example: "2026-03-15" → "March 15, 2026"
 */
export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  
  // Check if date is valid
  if (isNaN(date.getTime())) return 'Invalid date'
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Formats a date to relative time (e.g., "2 hours ago", "3 days ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}

/**
 * Generates a unique application ID for FDA submissions
 * Format: FDA-YYYY-NNN (Year-SequentialNumber)
 */
export function generateApplicationId(year: number, sequence: number): string {
  return `FDA-${year}-${String(sequence).padStart(3, '0')}`
}

/**
 * Returns status badge color classes based on application status
 */
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'DRAFT': 'bg-slate-100 text-slate-700 border-slate-200',
    'SUBMITTED': 'bg-blue-100 text-blue-700 border-blue-200',
    'UNDER_REVIEW': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'PENDING_PAYMENT': 'bg-amber-100 text-amber-700 border-amber-200',
    'DOCUMENT_VERIFICATION': 'bg-purple-100 text-purple-700 border-purple-200',
    'QUALITY_ASSESSMENT': 'bg-cyan-100 text-cyan-700 border-cyan-200',
    'APPROVED': 'bg-green-100 text-green-700 border-green-200',
    'REJECTED': 'bg-red-100 text-red-700 border-red-200',
    'CANCELLED': 'bg-gray-100 text-gray-700 border-gray-200',
  }
  
  return statusColors[status] || 'bg-slate-100 text-slate-700 border-slate-200'
}

/**
 * Truncates text with ellipsis
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Converts a string to title case
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generates initials from a full name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Creates a delay (useful for testing or animations)
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}