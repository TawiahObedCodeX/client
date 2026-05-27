// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-GH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatReferenceNo(id: string, createdAt: Date): string {
  const year = createdAt.getFullYear();
  const padded = id.slice(-4);
  return `FDA-${year}-${padded}`;
}

export function calculateSLADeadline(submittedAt: Date, category: string): Date {
  const days = category === "DRUG" ? 90 : 60;
  const deadline = new Date(submittedAt);
  deadline.setDate(deadline.getDate() + days);
  return deadline;
}