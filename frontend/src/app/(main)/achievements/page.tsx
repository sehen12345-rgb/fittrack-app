'use client'

import { useQuery } from '@tanstack/react-query'
import { achievementsApi } from '@/lib/api'
import { Trophy, Lock } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

export default function AchievementsPage() {
  const { data: myAchievements = [], isLoading: loadingMy } = useQuery({
    queryKey: ['achievements', 'my'],
    queryFn: () => achievementsApi.getMy().then((r: any) => r as any[]),
  })

  const { data: allAchievements = [], isLoading: loadingAll } = useQuery({
    queryKey: ['achievements', 'all'],
    queryFn: () => achievementsApi.getAll().then((r: any) => r as any[]),
  })

  const isLoading = loadingMy || loadingAll
  const unlockedIds = new Set(myAchievements.map((ua: any) => ua.achievementId))
  const unlockedMap = new Map(myAchievements.map((ua: any) => [ua.achievementId, ua.unlockedAt]))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  const unlockedCount = unlockedIds.size

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">업적</h1>
        <p className="text-sm text-gray-500 mt-1">
          {allAchievements.length}개 중 {unlockedCount}개 달성
        </p>
      </div>

      {/* 달성률 바 */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">달성률</span>
          <span className="text-sm font-bold text-blue-600">
            {allAchievements.length > 0
              ? Math.round((unlockedCount / allAchievements.length) * 100)
              : 0}
            %
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{
              width: `${allAchievements.length > 0 ? (unlockedCount / allAchievements.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* 달성 완료 */}
      {unlockedCount > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            달성 완료 ({unlockedCount})
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {allAchievements
              .filter((a: any) => unlockedIds.has(a.id))
              .map((a: any) => (
                <div
                  key={a.id}
                  className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Trophy size={24} className="text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{a.title}</p>
                    <p className="text-sm text-gray-500">{a.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {dayjs(unlockedMap.get(a.id)).format('MM/DD')}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 미달성 */}
      {allAchievements.filter((a: any) => !unlockedIds.has(a.id)).length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            미달성 ({allAchievements.length - unlockedCount})
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {allAchievements
              .filter((a: any) => !unlockedIds.has(a.id))
              .map((a: any) => (
                <div
                  key={a.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl opacity-70"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-700">{a.title}</p>
                    <p className="text-sm text-gray-400">{a.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {allAchievements.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Trophy size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-base font-medium">업적이 없습니다</p>
        </div>
      )}
    </div>
  )
}
