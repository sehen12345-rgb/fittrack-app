'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { goalApi, userApi } from '@/lib/api'
import { useAuthStore } from '@/store/auth.store'

const GOAL_OPTIONS = [
  { value: 'DIET', label: '다이어트', desc: '체지방 감소 · 칼로리 결핍', color: 'border-red-400 bg-red-50', emoji: '🔥' },
  { value: 'BULK', label: '벌크업', desc: '근육 증가 · 칼로리 잉여', color: 'border-blue-400 bg-blue-50', emoji: '💪' },
  { value: 'MAINTENANCE', label: '유지', desc: '현재 체형 유지 · TDEE 균형', color: 'border-green-400 bg-green-50', emoji: '⚖️' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [step, setStep] = useState(1)
  const [goalType, setGoalType] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch } = useForm()

  const onProfileSubmit = async (data: any) => {
    setLoading(true)
    try {
      await userApi.updateProfile({
        gender: data.gender,
        birthDate: data.birthDate,
        heightCm: Number(data.heightCm),
        activityLevel: data.activityLevel,
      })
      setStep(2)
    } finally {
      setLoading(false)
    }
  }

  const onGoalSubmit = async (data: any) => {
    if (!goalType) return
    setLoading(true)
    try {
      await goalApi.create({
        goalType,
        startWeightKg: Number(data.startWeight),
        targetWeightKg: data.targetWeight ? Number(data.targetWeight) : undefined,
        targetDate: data.targetDate || undefined,
      })
      const user = await userApi.getMe() as any
      setUser(user)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <div className="flex gap-2 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className={`h-2 flex-1 rounded-full ${step >= s ? 'bg-blue-500' : 'bg-gray-200'}`} />
          ))}
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-5">
            <h2 className="text-2xl font-bold">신체 정보 입력</h2>
            <p className="text-gray-500 text-sm">정확한 칼로리 계산을 위해 필요합니다.</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">성별</label>
                <select className="input" {...register('gender', { required: true })}>
                  <option value="MALE">남성</option>
                  <option value="FEMALE">여성</option>
                  <option value="OTHER">기타</option>
                </select>
              </div>
              <div>
                <label className="label">키 (cm)</label>
                <input type="number" className="input" placeholder="170" {...register('heightCm', { required: true })} />
              </div>
            </div>

            <div>
              <label className="label">생년월일</label>
              <input type="date" className="input" {...register('birthDate', { required: true })} />
            </div>

            <div>
              <label className="label">활동 수준</label>
              <select className="input" {...register('activityLevel', { required: true })}>
                <option value="SEDENTARY">거의 앉아있음 (사무직)</option>
                <option value="LIGHTLY_ACTIVE">가벼운 활동 (주 1~3회)</option>
                <option value="MODERATELY_ACTIVE">보통 활동 (주 3~5회)</option>
                <option value="VERY_ACTIVE">활동적 (주 6~7회)</option>
                <option value="EXTRA_ACTIVE">매우 활동적 (운동선수 수준)</option>
              </select>
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? '저장 중...' : '다음'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onGoalSubmit)} className="space-y-5">
            <h2 className="text-2xl font-bold">목표 설정</h2>
            <p className="text-gray-500 text-sm">어떤 목표를 향해 나아갈까요?</p>

            <div className="grid gap-3">
              {GOAL_OPTIONS.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGoalType(g.value)}
                  className={`border-2 rounded-xl p-4 text-left transition-all ${
                    goalType === g.value ? g.color + ' border-opacity-100' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{g.emoji}</span>
                  <p className="font-bold mt-1">{g.label}</p>
                  <p className="text-sm text-gray-500">{g.desc}</p>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">현재 체중 (kg)</label>
                <input type="number" step="0.1" className="input" placeholder="75.0" {...register('startWeight', { required: true })} />
              </div>
              <div>
                <label className="label">목표 체중 (kg)</label>
                <input type="number" step="0.1" className="input" placeholder="65.0" {...register('targetWeight')} />
              </div>
            </div>

            <div>
              <label className="label">목표일 (선택)</label>
              <input type="date" className="input" {...register('targetDate')} />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading || !goalType}
            >
              {loading ? '설정 중...' : '시작하기'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
