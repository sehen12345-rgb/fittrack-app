'use client'

import { cn, GOAL_LABELS, formatKcal, formatGram } from '@/lib/utils'
import { Flame } from 'lucide-react'

interface Props {
  goal: {
    type: string
    calorieTarget: number
    proteinTarget: number
    carbTarget: number
    fatTarget: number
    calorieProgress: number
    proteinProgress: number
  } | null
  food: {
    totalCalories: number
    totalProtein: number
    totalCarb: number
    totalFat: number
  }
  caloriesBurned: number
  netCalories: number
}

const GOAL_THEME: Record<string, { gradient: string; ring: string; badge: string; bar: string }> = {
  DIET: {
    gradient: 'from-red-50 to-orange-50',
    ring: 'ring-red-200',
    badge: 'bg-red-100 text-red-700',
    bar: 'bg-red-400',
  },
  BULK: {
    gradient: 'from-blue-50 to-sky-50',
    ring: 'ring-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    bar: 'bg-blue-500',
  },
  MAINTENANCE: {
    gradient: 'from-green-50 to-emerald-50',
    ring: 'ring-green-200',
    badge: 'bg-green-100 text-green-700',
    bar: 'bg-green-500',
  },
}

export default function CalorieSummaryCard({ goal, food, caloriesBurned, netCalories }: Props) {
  if (!goal) {
    return (
      <div className="card flex flex-col items-center justify-center h-48 text-gray-400 border-dashed border-2">
        <Flame size={28} className="mb-2 opacity-30" />
        <p className="font-medium">목표를 설정해주세요</p>
        <p className="text-xs mt-1">목표 설정 메뉴에서 시작하세요</p>
      </div>
    )
  }

  const theme = GOAL_THEME[goal.type] ?? GOAL_THEME['MAINTENANCE']
  const remaining = goal.calorieTarget - food.totalCalories + caloriesBurned
  const progress = Math.min(100, goal.calorieProgress)

  return (
    <div className={cn('card bg-gradient-to-br ring-1', theme.gradient, theme.ring)}>
      {/* 헤더 */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full', theme.badge)}>
            {GOAL_LABELS[goal.type]}
          </span>
          <div className="flex items-end gap-2 mt-3">
            <p className="text-5xl font-black text-gray-900 leading-none">
              {formatKcal(food.totalCalories)}
            </p>
            <p className="text-gray-400 text-sm mb-1">/ {formatKcal(goal.calorieTarget)}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1.5">오늘 섭취 칼로리</p>
        </div>

        <div className="text-right bg-white/60 rounded-xl px-3 py-2.5 backdrop-blur-sm">
          <p className="text-xs text-gray-400 mb-0.5">운동 소모</p>
          <p className="font-bold text-orange-500 text-sm">-{formatKcal(caloriesBurned)}</p>
          <div className="my-1.5 border-t border-gray-200" />
          <p className="text-xs text-gray-400 mb-0.5">잔여 칼로리</p>
          <p className={cn('font-bold text-sm', remaining >= 0 ? 'text-gray-800' : 'text-red-500')}>
            {remaining >= 0 ? formatKcal(remaining) : `-${formatKcal(Math.abs(remaining))}`}
          </p>
        </div>
      </div>

      {/* 진행 바 */}
      <div className="mb-1.5">
        <div className="flex justify-between items-center mb-1.5">
          <p className="text-xs text-gray-500 font-medium">칼로리 달성률</p>
          <p className={cn('text-xs font-bold', progress >= 100 ? 'text-red-500' : 'text-gray-600')}>
            {progress}%
          </p>
        </div>
        <div className="progress-bar h-3">
          <div
            className={cn('progress-fill', theme.bar)}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 매크로 */}
      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          { label: '단백질', value: food.totalProtein, target: goal.proteinTarget, color: 'bg-blue-400', textColor: 'text-blue-600' },
          { label: '탄수화물', value: food.totalCarb, target: goal.carbTarget, color: 'bg-amber-400', textColor: 'text-amber-600' },
          { label: '지방', value: food.totalFat, target: goal.fatTarget, color: 'bg-pink-400', textColor: 'text-pink-600' },
        ].map((m) => {
          const pct = Math.min(100, m.target > 0 ? (m.value / m.target) * 100 : 0)
          return (
            <div key={m.label} className="bg-white/70 backdrop-blur-sm rounded-xl p-3">
              <div className="flex justify-between items-center mb-0.5">
                <p className="text-xs text-gray-400">{m.label}</p>
                <p className={cn('text-xs font-bold', m.textColor)}>{Math.round(pct)}%</p>
              </div>
              <p className="font-bold text-gray-900 text-sm">{formatGram(m.value)}</p>
              <p className="text-xs text-gray-400">/ {m.target}g</p>
              <div className="progress-bar mt-2">
                <div className={cn('progress-fill', m.color)} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
