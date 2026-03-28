'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { authApi, userApi } from '@/lib/api'
import { useAuthStore } from '@/store/auth.store'
import { Eye, EyeOff, Activity } from 'lucide-react'

interface RegisterForm {
  email: string
  password: string
  nickname: string
}

export default function RegisterPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<RegisterForm>()

  const onSubmit = async (data: RegisterForm) => {
    try {
      setError('')
      const res = await authApi.register(data) as any
      const { accessToken, refreshToken } = res
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      const user = await userApi.getMe() as any
      setAuth(user, accessToken, refreshToken)
      router.push('/onboarding')
    } catch (err: any) {
      setError(err.message || '회원가입에 실패했습니다.')
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Activity size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold">HealthSnack</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold leading-tight mb-4">
            지금 시작하세요<br />무료입니다
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            회원가입 후 목표를 설정하면<br />맞춤 칼로리와 매크로가 자동 계산됩니다.
          </p>
          <div className="space-y-3">
            {[
              '✓ 개인 맞춤 TDEE 자동 계산',
              '✓ 식단 & 운동 기록 무제한',
              '✓ 체중 변화 그래프 분석',
              '✓ 업적 & 연속 기록 시스템',
            ].map((item) => (
              <p key={item} className="text-blue-100 text-sm">{item}</p>
            ))}
          </div>
        </div>
        <p className="text-blue-300 text-sm">© 2026 HealthSnack. All rights reserved.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Activity size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-blue-600">HealthSnack</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">회원가입</h1>
          <p className="text-gray-500 text-sm mb-8">계정을 만들고 바로 시작하세요</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">닉네임</label>
              <input
                className="input"
                placeholder="헬스왕"
                {...register('nickname', { required: true, minLength: 2 })}
              />
              {errors.nickname && <p className="text-xs text-red-500 mt-1">2자 이상 입력해주세요</p>}
            </div>
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
                  placeholder="8자 이상"
                  autoComplete="new-password"
                  {...register('password', { required: true, minLength: 8 })}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">8자 이상 입력해주세요</p>}
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
                  가입 중...
                </span>
              ) : '회원가입'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
