'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, UtensilsCrossed, Dumbbell, TrendingUp,
  Target, User, LogOut, Bell, Trophy, Menu, X, Activity,
} from 'lucide-react'
import { useAuthStore } from '@/store/auth.store'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { notificationsApi } from '@/lib/api'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: '대시보드' },
  { href: '/food-log', icon: UtensilsCrossed, label: '식단 기록' },
  { href: '/workout-log', icon: Dumbbell, label: '운동 기록' },
  { href: '/progress', icon: TrendingUp, label: '진행 현황' },
  { href: '/goals', icon: Target, label: '목표 설정' },
  { href: '/notifications', icon: Bell, label: '알림' },
  { href: '/achievements', icon: Trophy, label: '업적' },
  { href: '/profile', icon: User, label: '프로필' },
]

function NavContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.getAll().then((r: any) => r as any[]),
    refetchInterval: 60000,
  })
  const unreadCount = (notifications as any[]).filter((n) => !n.isRead).length

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex flex-col h-full">
      {/* 로고 */}
      <div className="px-5 py-5 border-b border-blue-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-white text-base leading-none">FitTrack</p>
            <p className="text-blue-300 text-xs mt-0.5">스마트 체형 관리</p>
          </div>
        </div>
      </div>

      {/* 유저 정보 */}
      {user && (
        <div className="px-5 py-4 border-b border-blue-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white font-bold text-sm">
              {user.nickname.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white text-sm truncate">{user.nickname}</p>
              <p className="text-blue-300 text-xs truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* 네비게이션 */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-blue-100 hover:bg-white/10 hover:text-white',
              )}
            >
              <Icon size={17} />
              <span className="flex-1">{label}</span>
              {href === '/notifications' && unreadCount > 0 && (
                <span className={cn(
                  'flex-shrink-0 text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1',
                  active ? 'bg-blue-600 text-white' : 'bg-white/25 text-white',
                )}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* 로그아웃 */}
      <div className="px-3 py-3 border-t border-blue-700/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-blue-200 hover:bg-white/10 hover:text-white transition-all"
        >
          <LogOut size={17} />
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* 데스크탑 사이드바 */}
      <aside className="hidden md:flex w-60 min-h-screen bg-gradient-to-b from-blue-700 to-blue-800 flex-col shadow-xl">
        <NavContent pathname={pathname} />
      </aside>

      {/* 모바일 상단 헤더 */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-blue-700 flex items-center justify-between px-4 h-14 shadow-md">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-white" />
          <span className="text-base font-bold text-white">FitTrack</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-white/80 hover:bg-white/10"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* 모바일 오버레이 */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 모바일 드로어 */}
      <aside
        className={cn(
          'md:hidden fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-blue-700 to-blue-800 flex flex-col transition-transform duration-300 shadow-2xl',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-end p-3 border-b border-blue-600/50">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg text-white/70 hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <NavContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
        </div>
      </aside>
    </>
  )
}
