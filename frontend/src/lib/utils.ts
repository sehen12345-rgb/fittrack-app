import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const GOAL_LABELS: Record<string, string> = {
  DIET: '다이어트',
  BULK: '벌크업',
  MAINTENANCE: '유지',
}

export const GOAL_COLORS: Record<string, string> = {
  DIET: 'text-red-500',
  BULK: 'text-blue-500',
  MAINTENANCE: 'text-green-500',
}

export const GOAL_BG: Record<string, string> = {
  DIET: 'bg-red-50 border-red-200',
  BULK: 'bg-blue-50 border-blue-200',
  MAINTENANCE: 'bg-green-50 border-green-200',
}

export const MEAL_LABELS: Record<string, string> = {
  BREAKFAST: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
  SNACK: '간식',
}

export function formatKcal(value: number): string {
  return `${Math.round(value).toLocaleString()} kcal`
}

export function formatGram(value: number): string {
  return `${Math.round(value)}g`
}
