'use client'

import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from '@/lib/api'
import CalorieSummaryCard from '@/components/dashboard/CalorieSummaryCard'
import { TrendingUp, Dumbbell, Scale, Target, Plus, ArrowRight } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import Link from 'next/link'
import { GOAL_LABELS } from '@/lib/utils'
import { useAuthStore } from '@/store/auth.store'

dayjs.locale('ko')

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => analyticsApi.getDashboard(),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
          <p className="text-sm text-gray-400">로딩 중...</p>
        </div>
      </div>
    )
  }

  const d = dashboard as any

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* 헤더 */}
      <div className="mb-7">
        <p className="text-sm text-blue-500 font-semibold mb-1">{dayjs().format('YYYY년 M월 D일 dddd')}</p>
        <h1 className="text-2xl font-bold text-gray-900">
          안녕하세요, {user?.nickname ?? ''}님 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">오늘도 목표를 향해 나아가봐요</p>
      </div>

      {/* 메인 카드 + 사이드 카드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2">
          <CalorieSummaryCard
            goal={d?.goal}
            food={d?.food ?? { totalCalories: 0, totalProtein: 0, totalCarb: 0, totalFat: 0 }}
            caloriesBurned={d?.workout?.totalCaloriesBurned ?? 0}
            netCalories={d?.netCalories ?? 0}
          />
        </div>

        <div className="flex flex-col gap-4">
          {/* 운동 카드 */}
          <div className="card flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Dumbbell size={18} className="text-orange-500" />
              </div>
              <span className="text-sm font-medium text-gray-500">오늘 운동</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{d?.workout?.sessionCount ?? 0}
              <span className="text-lg font-semibold text-gray-400 ml-1">세션</span>
            </p>
            <p className="text-sm text-gray-400 mt-1">{d?.workout?.totalCaloriesBurned ?? 0} kcal 소모</p>
            <Link href="/workout-log" className="flex items-center gap-1 text-xs text-blue-500 font-medium mt-3 hover:text-blue-700">
              운동 기록하기 <ArrowRight size={12} />
            </Link>
          </div>

          {/* 체중 카드 */}
          <div className="card flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Scale size={18} className="text-blue-500" />
              </div>
              <span className="text-sm font-medium text-gray-500">현재 체중</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {d?.latestWeight ? `${d.latestWeight}` : '—'}
              <span className="text-lg font-semibold text-gray-400 ml-1">kg</span>
            </p>
            <Link href="/body-metrics" className="flex items-center gap-1 text-xs text-blue-500 font-medium mt-3 hover:text-blue-700">
              체중 기록하기 <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* 현재 목표 배너 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 mb-5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Target size={18} className="text-white" />
            </div>
            <div>
              <p className="text-blue-200 text-xs font-medium">현재 목표</p>
              <p className="font-bold text-lg">{d?.goal ? GOAL_LABELS[d.goal.type] : '목표 미설정'}</p>
            </div>
          </div>
          <Link
            href="/goals"
            className="flex items-center gap-2 text-sm bg-white/20 hover:bg-white/30 text-white font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            {d?.goal ? '변경' : '설정하기'}
            <ArrowRight size={14} />
          </Link>
        </div>
        {d?.goal && (
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-blue-200 text-xs">일일 칼로리 목표</p>
              <p className="font-bold">{d.goal.calorieTarget} kcal</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <p className="text-blue-200 text-xs">단백질 목표</p>
              <p className="font-bold">{d.goal.proteinTarget}g</p>
            </div>
          </div>
        )}
      </div>

      {/* 빠른 이동 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: '/food-log', label: '식단 기록', icon: '🍽️', desc: '음식 추가', color: 'hover:border-orange-200 hover:bg-orange-50' },
          { href: '/workout-log', label: '운동 기록', icon: '🏋️', desc: '운동 추가', color: 'hover:border-green-200 hover:bg-green-50' },
          { href: '/progress', label: '진행 현황', icon: '📈', desc: '차트 보기', color: 'hover:border-blue-200 hover:bg-blue-50' },
          { href: '/body-metrics', label: '체중 기록', icon: '⚖️', desc: '측정값 입력', color: 'hover:border-purple-200 hover:bg-purple-50' },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`card border border-gray-100 text-center transition-all ${item.color}`}
          >
            <p className="text-3xl mb-2">{item.icon}</p>
            <p className="font-semibold text-sm text-gray-800">{item.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
