'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { userApi } from '@/lib/api'

export default function OAuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuthStore()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')

    if (!accessToken || !refreshToken) {
      router.replace('/login')
      return
    }

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    userApi.getMe()
      .then((user: any) => {
        setAuth(user, accessToken, refreshToken)
        // 온보딩 체크: 프로필 미완성이면 온보딩으로
        if (!user.profile?.heightCm) {
          router.replace('/onboarding')
        } else {
          router.replace('/dashboard')
        }
      })
      .catch(() => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        router.replace('/login')
      })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">로그인 처리 중...</p>
      </div>
    </div>
  )
}
