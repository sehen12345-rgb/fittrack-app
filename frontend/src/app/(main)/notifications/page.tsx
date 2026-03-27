'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationsApi } from '@/lib/api'
import { Bell, CheckCheck, AlertCircle, Trophy, TrendingUp, Dumbbell, Utensils } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.extend(relativeTime)
dayjs.locale('ko')

const TYPE_META: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  MEAL_REMINDER: { icon: <Utensils size={18} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  WORKOUT_REMINDER: { icon: <Dumbbell size={18} />, color: 'text-blue-600', bg: 'bg-blue-100' },
  GOAL_PROGRESS: { icon: <TrendingUp size={18} />, color: 'text-green-600', bg: 'bg-green-100' },
  WEIGHT_ALERT: { icon: <AlertCircle size={18} />, color: 'text-red-600', bg: 'bg-red-100' },
  ACHIEVEMENT: { icon: <Trophy size={18} />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  WEEKLY_REPORT: { icon: <TrendingUp size={18} />, color: 'text-blue-600', bg: 'bg-blue-100' },
}

export default function NotificationsPage() {
  const queryClient = useQueryClient()
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.getAll() as Promise<any[]>,
  })

  const markRead = useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const markAllRead = async () => {
    const unread = notifications.filter((n) => !n.isRead)
    await Promise.all(unread.map((n) => notificationsApi.markRead(n.id)))
    queryClient.invalidateQueries({ queryKey: ['notifications'] })
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">알림</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-500 mt-1">읽지 않은 알림 {unreadCount}개</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            <CheckCheck size={16} />
            모두 읽음
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Bell size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-base font-medium">알림이 없습니다</p>
          <p className="text-sm mt-1">식단, 운동 기록을 시작하면 알림이 쌓입니다.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n: any) => {
            const meta = TYPE_META[n.type] ?? TYPE_META['GOAL_PROGRESS']
            return (
              <div
                key={n.id}
                onClick={() => !n.isRead && markRead.mutate(n.id)}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${
                  n.isRead
                    ? 'bg-white border-gray-100 opacity-70'
                    : 'bg-white border-blue-100 shadow-sm hover:border-blue-200'
                }`}
              >
                <div className={`flex-shrink-0 p-2 rounded-xl ${meta.bg} ${meta.color}`}>
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-semibold ${n.isRead ? 'text-gray-500' : 'text-gray-900'}`}>
                      {n.title}
                    </p>
                    {!n.isRead && (
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {dayjs(n.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
