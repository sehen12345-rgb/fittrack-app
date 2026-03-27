'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { goalApi } from '@/lib/api'
import { useForm } from 'react-hook-form'
import { GOAL_LABELS, GOAL_BG, GOAL_COLORS } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import dayjs from 'dayjs'

const GOAL_OPTIONS = [
  { value: 'DIET', label: '다이어트', desc: '칼로리 결핍 · 체지방 감소', emoji: '🔥' },
  { value: 'BULK', label: '벌크업', desc: '칼로리 잉여 · 근육 증가', emoji: '💪' },
  { value: 'MAINTENANCE', label: '유지', desc: 'TDEE 균형 · 체성분 유지', emoji: '⚖️' },
]

export default function GoalsPage() {
  const [showForm, setShowForm] = useState(false)
  const [goalType, setGoalType] = useState('DIET')
  const qc = useQueryClient()
  const { register, handleSubmit, reset } = useForm()

  const { data: activeGoal } = useQuery({
    queryKey: ['active-goal'],
    queryFn: () => goalApi.getActive().catch(() => null),
  })

  const { data: allGoals = [] } = useQuery({
    queryKey: ['all-goals'],
    queryFn: () => goalApi.getAll(),
  })

  const createGoal = useMutation({
    mutationFn: (data: any) => goalApi.create({ ...data, goalType }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['active-goal'] })
      qc.invalidateQueries({ queryKey: ['all-goals'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
      setShowForm(false)
      reset()
    },
  })

  const ag = activeGoal as any

  const onSubmit = (data: any) => {
    createGoal.mutate({
      startWeightKg: Number(data.startWeight),
      targetWeightKg: data.targetWeight ? Number(data.targetWeight) : undefined,
      targetDate: data.targetDate || undefined,
    })
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">목표 관리</h1>
        <button className="btn-primary flex items-center gap-2" onClick={() => setShowForm(true)}>
          <Plus size={16} /> 새 목표
        </button>
      </div>

      {ag && (
        <div className={cn('card border-2', GOAL_BG[ag.goalType])}>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold uppercase text-gray-400">현재 목표</span>
              <h2 className={cn('text-3xl font-bold mt-1', GOAL_COLORS[ag.goalType])}>
                {GOAL_LABELS[ag.goalType]}
              </h2>
            </div>
            <span className="text-3xl">
              {ag.goalType === 'DIET' ? '🔥' : ag.goalType === 'BULK' ? '💪' : '⚖️'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <p className="text-xs text-gray-400">일일 칼로리 목표</p>
              <p className="text-xl font-bold">{ag.dailyCalorieTarget} kcal</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">단백질 목표</p>
              <p className="text-xl font-bold">{ag.proteinTargetG}g</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">시작 체중</p>
              <p className="text-xl font-bold">{ag.startWeightKg} kg</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <p className="text-xs text-gray-400">탄수화물 목표</p>
              <p className="font-semibold">{ag.carbTargetG}g</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">지방 목표</p>
              <p className="font-semibold">{ag.fatTargetG}g</p>
            </div>
          </div>

          <div className="flex gap-4 mt-3 text-sm text-gray-400">
            <span>시작: {dayjs(ag.startDate).format('YYYY.MM.DD')}</span>
            {ag.targetDate && <span>목표일: {dayjs(ag.targetDate).format('YYYY.MM.DD')}</span>}
            {ag.targetWeightKg && <span>목표 체중: {ag.targetWeightKg} kg</span>}
          </div>
        </div>
      )}

      {(allGoals as any[]).filter((g: any) => !g.isActive).length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-600 mb-3">이전 목표</h2>
          <div className="space-y-3">
            {(allGoals as any[]).filter((g: any) => !g.isActive).map((g: any) => (
              <div key={g.id} className="card opacity-60">
                <div className="flex justify-between">
                  <div>
                    <span className="font-semibold">{GOAL_LABELS[g.goalType]}</span>
                    <span className="text-sm text-gray-400 ml-2">
                      {dayjs(g.startDate).format('YYYY.MM.DD')} 시작
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">{g.dailyCalorieTarget} kcal/일</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="font-bold text-xl mb-5">새 목표 설정</h3>

            <div className="grid gap-3 mb-5">
              {GOAL_OPTIONS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGoalType(g.value)}
                  className={cn(
                    'border-2 rounded-xl p-4 text-left transition-all',
                    goalType === g.value ? GOAL_BG[g.value] : 'border-gray-200',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{g.emoji}</span>
                    <div>
                      <p className="font-bold">{g.label}</p>
                      <p className="text-xs text-gray-500">{g.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">현재 체중 (kg)</label>
                  <input type="number" step="0.1" className="input" {...register('startWeight', { required: true })} placeholder="75.0" />
                </div>
                <div>
                  <label className="label">목표 체중 (kg)</label>
                  <input type="number" step="0.1" className="input" {...register('targetWeight')} placeholder="65.0" />
                </div>
              </div>
              <div>
                <label className="label">목표일 (선택)</label>
                <input type="date" className="input" {...register('targetDate')} />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" className="btn-secondary flex-1" onClick={() => setShowForm(false)}>
                  취소
                </button>
                <button type="submit" className="btn-primary flex-1" disabled={createGoal.isPending}>
                  {createGoal.isPending ? '설정 중...' : '목표 설정'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
