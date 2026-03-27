'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { authApi, userApi } from '@/lib/api'
import { useAuthStore } from '@/store/auth.store'
import { Eye, EyeOff, Activity } from 'lucide-react'

interface LoginForm {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    try {
      setError('')
      const res = await authApi.login(data) as any
      const { accessToken, refreshToken } = res
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      const user = await userApi.getMe() as any
      setAuth(user, accessToken, refreshToken)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || '이메일 또는 비밀번호를 확인해주세요.')
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Activity size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold">FitTrack</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            목표에 맞는<br />스마트 체형 관리
          </h2>
          <p className="text-blue-200 text-lg">
            다이어트 · 벌크업 · 유지어터<br />당신의 목표를 달성하세요.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { label: '🔥 다이어트', desc: '칼로리 결핍 관리' },
              { label: '💪 벌크업', desc: '근육량 증가 추적' },
              { label: '⚖️ 유지', desc: '체성분 균형 유지' },
            ].map((item) => (
              <div key={item.label} className="bg-white/10 rounded-xl p-3">
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-blue-200 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-blue-300 text-sm">© 2026 FitTrack. All rights reserved.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Activity size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600">FitTrack</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">로그인</h1>
          <p className="text-gray-500 text-sm mb-8">계정에 접속해서 오늘의 목표를 달성하세요</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="label">이메일</label>
              <input
                type="email"
                className="input"
                placeholder="user@example.com"
                autoComplete="email"
                {...register('email', { required: true })}
              />
            </div>
            <div>
              <label className="label">비밀번호</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="input pr-11"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  {...register('password', { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl text-sm">
                <span>⚠</span><span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn-primary w-full py-3 text-base" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  로그인 중...
                </span>
              ) : '로그인'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            계정이 없으신가요?{' '}
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
