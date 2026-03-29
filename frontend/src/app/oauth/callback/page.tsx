'use client'

import { Suspense } from 'react'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { userApi } from '@/lib/api'

function OAuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuthStore()

  useEffect(() => {
    const error = searchParams.get('error')
    if (error) {
      router.replace(`/login?error=${encodeURIComponent('소셜 로그인에 실패했습니다. 다시 시도해주세요.')}`)
      return
    }

    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')

    if (!accessToken || !refreshToken) {
      router.replace('/login?error=' + encodeURIComponent('소셜 로그인 처리 중 오류가 발생했습니다.'))
      return
    }

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    userApi.getMe()
      .then((user: any) => {
        setAuth(user, accessToken, refreshToken)
        if (!user.profile?.heightCm) {
          router.replace('/onboarding')
        } else {
          router.replace('/dashboard')
        }
      })
      .catch(() => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        router.replace('/login?error=' + encodeURIComponent('로그인 처리 중 오류가 발생했습니다.'))
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

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <OAuthCallbackContent />
    </Suspense>
  )
}
