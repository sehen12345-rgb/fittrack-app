'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface PetProps {
  stage: number       // 0~5
  exp: number
  todayFoodDone: boolean
  todayWorkoutDone: boolean
  expProgress: number // 0~100
  nextThreshold: number | null
  foodLogDays: number
  workoutLogDays: number
}

const STAGE_DATA = [
  { name: '알', desc: '아직 태어나지 않았어요', emoji: '🥚', size: 56, color: 'from-yellow-100 to-amber-100', border: 'border-amber-200' },
  { name: '아기', desc: '막 부화했어요!', emoji: '🐣', size: 72, color: 'from-yellow-100 to-orange-100', border: 'border-orange-200' },
  { name: '꼬마', desc: '조금씩 자라고 있어요', emoji: '🐥', size: 88, color: 'from-green-100 to-emerald-100', border: 'border-emerald-200' },
  { name: '친구', desc: '건강해 보여요!', emoji: '🐤', size: 104, color: 'from-blue-100 to-cyan-100', border: 'border-cyan-200' },
  { name: '튼튼이', desc: '많이 성장했어요!', emoji: '🦆', size: 120, color: 'from-purple-100 to-violet-100', border: 'border-violet-200' },
  { name: '챔피언', desc: '최고의 건강왕!', emoji: '🦅', size: 136, color: 'from-rose-100 to-pink-100', border: 'border-pink-300' },
]

export default function PetCharacter({
  stage,
  exp,
  todayFoodDone,
  todayWorkoutDone,
  expProgress,
  nextThreshold,
  foodLogDays,
  workoutLogDays,
}: PetProps) {
  const [bounce, setBounce] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const pet = STAGE_DATA[stage] ?? STAGE_DATA[0]
  const bothDone = todayFoodDone && todayWorkoutDone

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true)
      setTimeout(() => setBounce(false), 600)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (bothDone) {
      setCelebrate(true)
      setTimeout(() => setCelebrate(false), 2000)
    }
  }, [bothDone])

  return (
    <div className={`card bg-gradient-to-br ${pet.color} border ${pet.border} relative overflow-hidden`}>
      {/* 배경 파티클 (오늘 완료 시) */}
      {celebrate && (
        <div className="absolute inset-0 pointer-events-none">
          {['🌟', '✨', '⭐', '💫'].map((star, i) => (
            <span
              key={i}
              className="absolute text-lg animate-ping"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 22}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s',
              }}
            >
              {star}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">나의 캐릭터</p>
          <h3 className="text-base font-bold text-gray-800 mt-0.5">
            {pet.name}
            {stage === 5 && <span className="ml-1">👑</span>}
          </h3>
        </div>
        <div className="text-right flex flex-col items-end gap-1">
          <div>
            <p className="text-xs text-gray-400">Lv.{stage}</p>
            <p className="text-xs font-bold text-gray-600">EXP {exp}</p>
          </div>
          <Link href="/character" className="text-xs text-violet-500 hover:text-violet-700 font-medium">
            자세히 보기 →
          </Link>
        </div>
      </div>

      {/* 캐릭터 */}
      <div className="flex justify-center my-2">
        <div className="relative">
          {/* 그림자 */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-black/10 blur-sm"
            style={{ width: pet.size * 0.7, height: 10 }}
          />
          {/* 캐릭터 이모지 */}
          <div
            className={`flex items-center justify-center transition-transform duration-300 select-none ${
              bounce ? '-translate-y-3' : 'translate-y-0'
            } ${celebrate ? 'scale-110' : 'scale-100'}`}
            style={{ fontSize: pet.size, lineHeight: 1, filter: bothDone ? 'drop-shadow(0 0 8px rgba(99,102,241,0.5))' : 'none' }}
          >
            {pet.emoji}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mb-3">{pet.desc}</p>

      {/* 오늘 인증 현황 */}
      <div className="flex gap-2 mb-3">
        <div className={`flex-1 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
          todayFoodDone
            ? 'bg-orange-400 text-white'
            : 'bg-white/60 text-gray-400 border border-gray-200'
        }`}>
          <span>🍽️</span>
          <span>식단 {todayFoodDone ? '인증 ✓' : '미인증'}</span>
        </div>
        <div className={`flex-1 flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
          todayWorkoutDone
            ? 'bg-green-500 text-white'
            : 'bg-white/60 text-gray-400 border border-gray-200'
        }`}>
          <span>🏋️</span>
          <span>운동 {todayWorkoutDone ? '인증 ✓' : '미인증'}</span>
        </div>
      </div>

      {/* 경험치 바 */}
      {stage < 5 && (
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>다음 단계까지</span>
            <span>{expProgress}%</span>
          </div>
          <div className="h-2 bg-white/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full transition-all duration-700"
              style={{ width: `${expProgress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1 text-right">
            {exp} / {nextThreshold} EXP
          </p>
        </div>
      )}

      {/* 누적 통계 */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-white/50">
        <div className="flex-1 text-center">
          <p className="text-lg font-bold text-orange-500">{foodLogDays}</p>
          <p className="text-xs text-gray-400">식단 인증일</p>
        </div>
        <div className="w-px bg-white/50" />
        <div className="flex-1 text-center">
          <p className="text-lg font-bold text-green-500">{workoutLogDays}</p>
          <p className="text-xs text-gray-400">운동 인증일</p>
        </div>
      </div>
    </div>
  )
}
