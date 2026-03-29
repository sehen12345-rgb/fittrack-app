'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { authApi, userApi } from '@/lib/api'
import { useAuthStore } from '@/store/auth.store'
import { Eye, EyeOff, Activity, X } from 'lucide-react'

interface LoginForm {
  email: string
  password: string
}

const SOCIAL_PROVIDERS = [
  {
    id: 'GOOGLE',
    label: 'Google',
    buttonClass: 'border border-gray-200 text-gray-700 hover:bg-gray-50',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    placeholder: 'example@gmail.com',
  },
  {
    id: 'KAKAO',
    label: '카카오',
    buttonClass: 'bg-[#FEE500] text-[#3C1E1E] hover:bg-[#F0D800]',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3C1E1E">
        <path d="M12 3C6.48 3 2 6.56 2 10.92c0 2.72 1.69 5.12 4.25 6.54L5.1 21l4.66-2.82c.72.1 1.47.16 2.24.16 5.52 0 10-3.56 10-7.92S17.52 3 12 3z"/>
      </svg>
    ),
    placeholder: 'example@kakao.com',
  },
  {
    id: 'NAVER',
    label: '네이버',
    buttonClass: 'bg-[#03C75A] text-white hover:bg-[#02B350]',
    icon: <span className="font-black text-base leading-none">N</span>,
    placeholder: 'example@naver.com',
  },
]

function SocialLoginModal({
  provider,
  onClose,
  onSuccess,
}: {
  provider: typeof SOCIAL_PROVIDERS[0]
  onClose: () => void
  onSuccess: (accessToken: string, refreshToken: string) => void
}) {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'email' | 'nickname'>('email')
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => { emailRef.current?.focus() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authApi.socialLogin({
        provider: provider.id,
        email,
        nickname: nickname || undefined,
      }) as any
      onSuccess(res.accessToken, res.refreshToken)
    } catch (err: any) {
      const msg = err.message || ''
      if (msg.includes('일반 계정')) {
        setError(msg)
      } else if (step === 'email' && !nickname) {
        // 처음 가입 시 닉네임 입력 유도
        setStep('nickname')
        setLoading(false)
        return
      } else {
        setError(msg || '로그인에 실패했습니다. 다시 시도해주세요.')
      }
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            provider.id === 'GOOGLE' ? 'bg-white border border-gray-200' :
            provider.id === 'KAKAO' ? 'bg-[#FEE500]' : 'bg-[#03C75A]'
          }`}>
            {provider.icon}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{provider.label}로 계속하기</h2>
            <p className="text-xs text-gray-400">{provider.label} 이메일을 입력하세요</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">{provider.label} 이메일</label>
            <input
              ref={emailRef}
              type="email"
              className="input"
              placeholder={provider.placeholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={step === 'nickname'}
            />
          </div>

          {step === 'nickname' && (
            <div>
              <label className="label">닉네임 <span className="text-gray-400 font-normal">(처음 가입 시)</span></label>
              <input
                autoFocus
                type="text"
                className="input"
                placeholder="헬스왕"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                minLength={2}
                maxLength={20}
                required
              />
              <p className="text-xs text-gray-400 mt-1">2~20자, 나중에 변경 가능합니다</p>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 text-red-600 bg-red-50 border border-red-100 px-3 py-2.5 rounded-xl text-sm">
              <span>⚠</span><span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-3 text-sm"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                처리 중...
              </span>
            ) : step === 'nickname' ? '가입하고 시작하기' : '계속'}
          </button>

          {step === 'nickname' && (
            <button type="button" className="w-full text-sm text-gray-400 hover:text-gray-600" onClick={() => setStep('email')}>
              ← 이메일 변경
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

function LoginPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuthStore()
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [socialProvider, setSocialProvider] = useState<typeof SOCIAL_PROVIDERS[0] | null>(null)
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>()

  useEffect(() => {
    const urlError = searchParams.get('error')
    if (urlError) setError(decodeURIComponent(urlError))
  }, [searchParams])

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

  const handleSocialSuccess = async (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    const user = await userApi.getMe() as any
    setAuth(user, accessToken, refreshToken)
    setSocialProvider(null)
    if (!user.profile?.heightCm) {
      router.push('/onboarding')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <>
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

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-400">또는 소셜 로그인</span>
              </div>
            </div>

            <div className="space-y-3">
              {SOCIAL_PROVIDERS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSocialProvider(p)}
                  className={`flex items-center justify-center gap-3 w-full py-3 rounded-xl text-sm font-medium transition-colors ${p.buttonClass}`}
                >
                  {p.icon}
                  {p.label}로 계속하기
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              계정이 없으신가요?{' '}
              <Link href="/register" className="text-blue-600 font-semibold hover:underline">회원가입</Link>
            </p>
          </div>
        </div>
      </div>

      {socialProvider && (
        <SocialLoginModal
          provider={socialProvider}
          onClose={() => setSocialProvider(null)}
          onSuccess={handleSocialSuccess}
        />
      )}
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginPageContent />
    </Suspense>
  )
}
