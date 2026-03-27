'use client'

import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from '@/lib/api'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts'
import { GOAL_LABELS } from '@/lib/utils'

export default function ProgressPage() {
  const { data: weightTrend = [] } = useQuery({
    queryKey: ['weight-trend'],
    queryFn: () => analyticsApi.getWeightTrend(30),
  })

  const { data: calorieTrend = [] } = useQuery({
    queryKey: ['calorie-trend'],
    queryFn: () => analyticsApi.getCalorieTrend(14),
  })

  const { data: progress } = useQuery({
    queryKey: ['goal-progress'],
    queryFn: () => analyticsApi.getGoalProgress(),
  })

  const { data: weekly } = useQuery({
    queryKey: ['weekly-report'],
    queryFn: () => analyticsApi.getWeeklyReport(),
  })

  const p = progress as any
  const w = weekly as any

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">진행 현황</h1>

      {p && (
        <div className="card">
          <h2 className="font-bold mb-4">목표 달성 현황</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500">현재 목표</p>
              <p className="text-xl font-bold text-blue-600">{GOAL_LABELS[p.goal?.goalType]}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500">현재 체중</p>
              <p className="text-xl font-bold">{p.currentWeight ?? '—'} kg</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500">체중 변화</p>
              <p className={`text-xl font-bold ${(p.weightChange ?? 0) < 0 ? 'text-green-500' : 'text-red-500'}`}>
                {p.weightChange > 0 ? '+' : ''}{p.weightChange ?? 0} kg
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500">진행률</p>
              <p className="text-xl font-bold text-blue-600">{p.progressPercent ?? 0}%</p>
            </div>
          </div>
          {p.progressPercent > 0 && (
            <div className="mt-4 progress-bar">
              <div className="progress-fill bg-blue-500" style={{ width: `${p.progressPercent}%` }} />
            </div>
          )}
        </div>
      )}

      <div className="card">
        <h2 className="font-bold mb-4">체중 변화 (최근 30일)</h2>
        {(weightTrend as any[]).length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weightTrend as any[]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} unit="kg" />
              <Tooltip formatter={(v: number) => [`${v} kg`, '체중']} />
              <Line type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-40 text-gray-400">
            체중 기록이 없습니다
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="font-bold mb-4">칼로리 섭취 추이 (최근 14일)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={calorieTrend as any[]}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
            <YAxis tick={{ fontSize: 11 }} unit=" kcal" />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalCalories" name="칼로리" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {w && (
        <div className="card">
          <h2 className="font-bold mb-4">주간 요약</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '평균 칼로리', value: `${w.calories?.dailyAverage?.calories ?? 0} kcal` },
              { label: '평균 단백질', value: `${w.calories?.dailyAverage?.protein ?? 0}g` },
              { label: '평균 탄수화물', value: `${w.calories?.dailyAverage?.carb ?? 0}g` },
              { label: '평균 지방', value: `${w.calories?.dailyAverage?.fat ?? 0}g` },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="font-bold mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
