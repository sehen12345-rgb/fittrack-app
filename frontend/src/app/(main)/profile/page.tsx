'use client'

import { useAuthStore } from '@/store/auth.store'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/lib/api'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const ACTIVITY_LABELS: Record<string, string> = {
  SEDENTARY: '거의 앉아있음',
  LIGHTLY_ACTIVE: '가벼운 활동 (주 1~3회)',
  MODERATELY_ACTIVE: '보통 활동 (주 3~5회)',
  VERY_ACTIVE: '활동적 (주 6~7회)',
  EXTRA_ACTIVE: '매우 활동적',
}

export default function ProfilePage() {
  const { user, setUser } = useAuthStore()
  const [editing, setEditing] = useState(false)
  const qc = useQueryClient()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      nickname: user?.nickname,
      gender: user?.profile?.gender || 'MALE',
      heightCm: user?.profile?.heightCm,
      activityLevel: user?.profile?.activityLevel || 'MODERATELY_ACTIVE',
    },
  })

  const update = useMutation({
    mutationFn: (data: any) => userApi.updateProfile(data),
    onSuccess: async () => {
      const updated = await userApi.getMe() as any
      setUser(updated)
      setEditing(false)
    },
  })

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">프로필</h1>

      <div className="card">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-500">
            {user?.nickname?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-xl font-bold">{user?.nickname}</p>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        {!editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400">성별</p>
                <p className="font-semibold mt-1">
                  {user?.profile?.gender === 'MALE' ? '남성' : user?.profile?.gender === 'FEMALE' ? '여성' : '기타'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-400">키</p>
                <p className="font-semibold mt-1">{user?.profile?.heightCm ? `${user.profile.heightCm} cm` : '—'}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400">활동 수준</p>
              <p className="font-semibold mt-1">
                {ACTIVITY_LABELS[user?.profile?.activityLevel ?? ''] || '—'}
              </p>
            </div>
            <button className="btn-secondary w-full" onClick={() => setEditing(true)}>
              프로필 수정
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit((d) => update.mutate(d))} className="space-y-4">
            <div>
              <label className="label">닉네임</label>
              <input className="input" {...register('nickname')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">성별</label>
                <select className="input" {...register('gender')}>
                  <option value="MALE">남성</option>
                  <option value="FEMALE">여성</option>
                  <option value="OTHER">기타</option>
                </select>
              </div>
              <div>
                <label className="label">키 (cm)</label>
                <input type="number" className="input" {...register('heightCm')} />
              </div>
            </div>
            <div>
              <label className="label">활동 수준</label>
              <select className="input" {...register('activityLevel')}>
                {Object.entries(ACTIVITY_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button type="button" className="btn-secondary flex-1" onClick={() => setEditing(false)}>취소</button>
              <button type="submit" className="btn-primary flex-1" disabled={update.isPending}>
                {update.isPending ? '저장 중...' : '저장'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
