'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/auth.store'
import { userApi } from '@/lib/api'
import {
  Camera, Lock, Trash2, ChevronRight, AlertTriangle, Check,
} from 'lucide-react'

interface PasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function SettingsPage() {
  const { user, setUser, logout } = useAuthStore()
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [avatarLoading, setAvatarLoading] = useState(false)
  const [avatarMsg, setAvatarMsg] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteInput, setDeleteInput] = useState('')

  const { register, handleSubmit, reset, watch, formState: { isSubmitting, errors } } = useForm<PasswordForm>()

  // 프로필 이미지 업로드
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarLoading(true)
    setAvatarMsg('')
    try {
      const updated = await userApi.uploadAvatar(file) as any
      setUser({ ...user!, profileImageUrl: updated.profileImageUrl })
      setAvatarMsg('프로필 이미지가 업데이트되었습니다.')
    } catch (err: any) {
      setAvatarMsg(err.message || '이미지 업로드에 실패했습니다.')
    } finally {
      setAvatarLoading(false)
    }
  }

  // 비밀번호 변경
  const onChangePassword = async (data: PasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      setPwMsg('새 비밀번호가 일치하지 않습니다.')
      return
    }
    setPwMsg('')
    try {
      await userApi.changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword })
      setPwMsg('비밀번호가 변경되었습니다.')
      reset()
    } catch (err: any) {
      setPwMsg(err.message || '비밀번호 변경에 실패했습니다.')
    }
  }

  // 회원 탈퇴
  const handleDeleteAccount = async () => {
    if (deleteInput !== user?.nickname) return
    try {
      await userApi.deleteAccount()
      logout()
      router.push('/login')
    } catch (err: any) {
      alert(err.message || '탈퇴에 실패했습니다.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
        <p className="text-gray-500 text-sm mt-1">계정 및 앱 환경설정을 관리하세요</p>
      </div>

      {/* 프로필 이미지 */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Camera size={18} className="text-blue-600" />
          프로필 이미지
        </h2>
        <div className="flex items-center gap-5">
          <div className="relative">
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="프로필"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-100"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                {user?.nickname?.charAt(0)}
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
              disabled={avatarLoading}
            >
              <Camera size={13} />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{user?.nickname}</p>
            <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
            <button
              onClick={() => fileRef.current?.click()}
              className="mt-2 text-xs text-blue-600 hover:underline"
              disabled={avatarLoading}
            >
              {avatarLoading ? '업로드 중...' : '이미지 변경'}
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
        {avatarMsg && (
          <p className={`mt-3 text-sm flex items-center gap-1.5 ${avatarMsg.includes('실패') ? 'text-red-600' : 'text-green-600'}`}>
            <Check size={14} />{avatarMsg}
          </p>
        )}
      </section>

      {/* 비밀번호 변경 */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lock size={18} className="text-blue-600" />
          비밀번호 변경
        </h2>
        <form onSubmit={handleSubmit(onChangePassword)} className="space-y-4">
          <div>
            <label className="label">현재 비밀번호</label>
            <input
              type="password"
              className="input"
              placeholder="현재 비밀번호"
              {...register('currentPassword', { required: '현재 비밀번호를 입력하세요.' })}
            />
            {errors.currentPassword && <p className="text-xs text-red-500 mt-1">{errors.currentPassword.message}</p>}
          </div>
          <div>
            <label className="label">새 비밀번호</label>
            <input
              type="password"
              className="input"
              placeholder="새 비밀번호 (8자 이상)"
              {...register('newPassword', { required: '새 비밀번호를 입력하세요.', minLength: { value: 8, message: '8자 이상 입력하세요.' } })}
            />
            {errors.newPassword && <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>}
          </div>
          <div>
            <label className="label">새 비밀번호 확인</label>
            <input
              type="password"
              className="input"
              placeholder="새 비밀번호 재입력"
              {...register('confirmPassword', { required: '비밀번호를 다시 입력하세요.' })}
            />
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {pwMsg && (
            <p className={`text-sm flex items-center gap-1.5 ${pwMsg.includes('실패') || pwMsg.includes('일치') || pwMsg.includes('올바르지') ? 'text-red-600' : 'text-green-600'}`}>
              <Check size={14} />{pwMsg}
            </p>
          )}

          <button type="submit" className="btn-primary py-2.5" disabled={isSubmitting}>
            {isSubmitting ? '변경 중...' : '비밀번호 변경'}
          </button>
        </form>
      </section>

      {/* 앱 정보 */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">앱 정보</h2>
        <div className="space-y-3 text-sm">
          {[
            { label: '버전', value: 'v1.0.0' },
            { label: '개발', value: 'HealthSnack Team' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-gray-600">
              <span>{label}</span>
              <span className="font-medium text-gray-900">{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 회원 탈퇴 */}
      <section className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
        <h2 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
          <Trash2 size={18} />
          회원 탈퇴
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          탈퇴하면 모든 데이터(식단, 운동, 측정 기록)가 영구적으로 삭제됩니다.
        </p>
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 text-sm text-red-600 border border-red-200 rounded-xl px-4 py-2.5 hover:bg-red-50 transition-colors"
          >
            <AlertTriangle size={15} />
            회원 탈퇴하기
            <ChevronRight size={15} />
          </button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-red-700 font-medium">
              정말 탈퇴하시겠습니까? 확인을 위해 닉네임 <strong>{user?.nickname}</strong>을 입력하세요.
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="input border-red-200 focus:ring-red-300"
              placeholder={user?.nickname}
            />
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                disabled={deleteInput !== user?.nickname}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                탈퇴 확인
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); setDeleteInput('') }}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
