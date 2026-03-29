'use client'

import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from '@/lib/api'
import { useEffect, useState } from 'react'

const STAGE_DATA = [
  { name: '알', emoji: '🥚', expRequired: 0, color: 'from-yellow-100 to-amber-100', border: 'border-amber-300', textColor: 'text-amber-700' },
  { name: '아기', emoji: '🐣', expRequired: 1, color: 'from-yellow-100 to-orange-100', border: 'border-orange-300', textColor: 'text-orange-700' },
  { name: '꼬마', emoji: '🐥', expRequired: 7, color: 'from-green-100 to-emerald-100', border: 'border-emerald-300', textColor: 'text-emerald-700' },
  { name: '친구', emoji: '🐤', expRequired: 20, color: 'from-blue-100 to-cyan-100', border: 'border-cyan-300', textColor: 'text-cyan-700' },
  { name: '튼튼이', emoji: '🦆', expRequired: 50, color: 'from-purple-100 to-violet-100', border: 'border-violet-300', textColor: 'text-violet-700' },
  { name: '챔피언', emoji: '🦅', expRequired: 100, color: 'from-rose-100 to-pink-100', border: 'border-pink-300', textColor: 'text-rose-700' },
]

const MOOD_DATA = {
  happy:   { emoji: '😄', label: '신나요!',    bg: 'bg-yellow-100', text: 'text-yellow-700' },
  content: { emoji: '😊', label: '기분 좋아요', bg: 'bg-green-100',  text: 'text-green-700' },
  tired:   { emoji: '😴', label: '좀 피곤해요', bg: 'bg-blue-100',   text: 'text-blue-600' },
  sad:     { emoji: '😢', label: '보고 싶었어요', bg: 'bg-gray-100',  text: 'text-gray-500' },
}

const MOOD_MESSAGES: Record<string, string[]> = {
  happy:   ['오늘 식단이랑 운동 모두 완료! 최고예요! 🎉', '완벽한 하루! 점점 강해지고 있어요!', '이 기세 그대로 내일도 함께해요! ✨'],
  content: ['잘 하고 있어요! 운동도 도전해봐요 💪', '오늘 한 가지 완료! 이제 하나 더!', '좋아요, 이 페이스로 계속 가요!'],
  tired:   ['어제는 쉬셨군요... 오늘 다시 시작해봐요!', '조금 기운이 없어요. 오늘 꼭 기록해주세요!', '작은 것부터 시작해봐요. 같이해요! 🌱'],
  sad:     ['많이 보고 싶었어요... 다시 시작해봐요! 🥺', '언제든 돌아와요! 항상 기다리고 있어요.', '지금부터라도 괜찮아요. 같이 해봐요!'],
}

export default function CharacterPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['character'],
    queryFn: () => analyticsApi.getCharacter(),
  })

  const [bounce, setBounce] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true)
      setTimeout(() => setBounce(false), 600)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const d = data as any
  const stage = d?.stage ?? 0
  const mood: keyof typeof MOOD_DATA = d?.mood ?? 'sad'
  const pet = STAGE_DATA[stage] ?? STAGE_DATA[0]
  const moodInfo = MOOD_DATA[mood]
  const messages = MOOD_MESSAGES[mood]
  const bothDone = d?.todayFoodDone && d?.todayWorkoutDone

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-violet-500" />
          <p className="text-sm text-gray-400">캐릭터 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      {/* 헤더 */}
      <div className="mb-7">
        <p className="text-sm text-violet-500 font-semibold mb-1">나의 피트니스 파트너</p>
        <h1 className="text-2xl font-bold text-gray-900">캐릭터 키우기</h1>
        <p className="text-gray-500 text-sm mt-1">매일 식단과 운동을 기록하면 캐릭터가 자라요</p>
      </div>

      {/* 메인 캐릭터 카드 */}
      <div className={`card bg-gradient-to-br ${pet.color} border ${pet.border} mb-5 relative overflow-hidden`}>
        {/* 완료 파티클 */}
        {bothDone && (
          <div className="absolute inset-0 pointer-events-none">
            {['🌟', '✨', '⭐', '💫', '🎊'].map((star, i) => (
              <span
                key={i}
                className="absolute text-xl animate-ping"
                style={{ top: `${10 + i * 16}%`, left: `${5 + i * 20}%`, animationDelay: `${i * 0.3}s`, animationDuration: '2s' }}
              >
                {star}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className={`text-2xl font-extrabold ${pet.textColor}`}>
              {pet.name}
              {stage === 5 && <span className="ml-2">👑</span>}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">Lv.{stage} · {d?.exp ?? 0} EXP</p>
          </div>
          {/* 기분 뱃지 */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${moodInfo.bg} ${moodInfo.text}`}>
            <span>{moodInfo.emoji}</span>
            <span>{moodInfo.label}</span>
          </div>
        </div>

        {/* 캐릭터 + 말풍선 */}
        <div className="flex items-end gap-6 my-4">
          <div className="relative flex-shrink-0">
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-black/10 blur-sm"
              style={{ width: 120, height: 12 }}
            />
            <div
              className={`transition-transform duration-300 select-none ${bounce ? '-translate-y-4' : 'translate-y-0'} ${bothDone ? 'scale-110' : 'scale-100'}`}
              style={{ fontSize: 128, lineHeight: 1, filter: bothDone ? 'drop-shadow(0 0 12px rgba(139,92,246,0.5))' : 'none' }}
            >
              {pet.emoji}
            </div>
          </div>

          {/* 말풍선 */}
          <div className="flex-1 relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-white">
              <p className="text-sm font-medium text-gray-700">{messages[msgIndex % messages.length]}</p>
            </div>
            <div className="absolute -left-2 bottom-3 w-3 h-3 bg-white/80 rotate-45 border-l border-b border-white" />
            {messages.length > 1 && (
              <button
                onClick={() => setMsgIndex((i) => i + 1)}
                className="mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                다음 말 보기 →
              </button>
            )}
          </div>
        </div>

        {/* 경험치 바 */}
        {stage < 5 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>다음 단계까지</span>
              <span className="font-semibold">{d?.exp ?? 0} / {d?.nextThreshold} EXP ({d?.expProgress ?? 0}%)</span>
            </div>
            <div className="h-3 bg-white/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full transition-all duration-700"
                style={{ width: `${d?.expProgress ?? 0}%` }}
              />
            </div>
          </div>
        )}
        {stage === 5 && (
          <div className="mt-4 text-center">
            <span className="inline-block bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm font-bold px-5 py-2 rounded-full">
              🏆 최고 단계 달성!
            </span>
          </div>
        )}
      </div>

      {/* 오늘 미션 */}
      <div className="card mb-5">
        <h3 className="text-sm font-bold text-gray-700 mb-3">오늘의 미션</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
            d?.todayFoodDone ? 'bg-orange-50 border border-orange-200' : 'bg-gray-50 border border-gray-200'
          }`}>
            <span className="text-2xl">🍽️</span>
            <div>
              <p className={`text-xs font-semibold ${d?.todayFoodDone ? 'text-orange-600' : 'text-gray-400'}`}>
                식단 기록
              </p>
              <p className={`text-xs ${d?.todayFoodDone ? 'text-orange-500' : 'text-gray-400'}`}>
                {d?.todayFoodDone ? '✓ 완료! +1 EXP' : '미완료'}
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
            d?.todayWorkoutDone ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
          }`}>
            <span className="text-2xl">🏋️</span>
            <div>
              <p className={`text-xs font-semibold ${d?.todayWorkoutDone ? 'text-green-600' : 'text-gray-400'}`}>
                운동 기록
              </p>
              <p className={`text-xs ${d?.todayWorkoutDone ? 'text-green-500' : 'text-gray-400'}`}>
                {d?.todayWorkoutDone ? '✓ 완료! +2 EXP' : '미완료'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 7일 활동 */}
      <div className="card mb-5">
        <h3 className="text-sm font-bold text-gray-700 mb-3">최근 7일 활동</h3>
        <div className="grid grid-cols-7 gap-1.5">
          {(d?.recentActivity ?? []).map((day: any, i: number) => {
            const label = new Date(day.date).toLocaleDateString('ko-KR', { weekday: 'short' })
            const isToday = i === 6
            return (
              <div key={day.date} className="flex flex-col items-center gap-1">
                <p className={`text-xs font-medium ${isToday ? 'text-violet-600' : 'text-gray-400'}`}>{label}</p>
                <div className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center gap-0.5 text-xs
                  ${day.foodDone || day.workoutDone ? 'bg-violet-100 border border-violet-200' : 'bg-gray-100 border border-gray-200'}
                  ${isToday ? 'ring-2 ring-violet-400 ring-offset-1' : ''}
                `}>
                  <span className={day.foodDone ? 'opacity-100' : 'opacity-20'}>🍽️</span>
                  <span className={day.workoutDone ? 'opacity-100' : 'opacity-20'}>🏋️</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span>🍽️</span> 식단 기록</span>
          <span className="flex items-center gap-1"><span>🏋️</span> 운동 기록</span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded bg-violet-100 border border-violet-200" /> 인증 완료
          </span>
        </div>
      </div>

      {/* 진화 경로 */}
      <div className="card mb-5">
        <h3 className="text-sm font-bold text-gray-700 mb-4">진화 경로</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {STAGE_DATA.map((s, i) => {
            const isUnlocked = i <= stage
            const isCurrent = i === stage
            return (
              <div
                key={i}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? `${s.color} ${s.border} bg-gradient-to-br shadow-sm`
                    : isUnlocked
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-gray-50 border-gray-100 opacity-40'
                }`}
              >
                <span
                  className={`text-3xl select-none transition-all ${isCurrent ? 'scale-125' : ''}`}
                  style={{ filter: isUnlocked ? 'none' : 'grayscale(1)' }}
                >
                  {s.emoji}
                </span>
                <p className={`text-xs font-bold ${isCurrent ? s.textColor : 'text-gray-500'}`}>{s.name}</p>
                <p className="text-[10px] text-gray-400">
                  {i === 0 ? '시작' : `${s.expRequired} EXP`}
                </p>
                {isCurrent && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${s.textColor} bg-white/70`}>현재</span>
                )}
                {isUnlocked && !isCurrent && (
                  <span className="text-[10px] text-gray-400">✓ 달성</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 스탯 */}
      <div className="card">
        <h3 className="text-sm font-bold text-gray-700 mb-4">캐릭터 스탯</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-orange-50 rounded-xl">
            <p className="text-2xl font-extrabold text-orange-500">{d?.foodLogDays ?? 0}</p>
            <p className="text-xs text-gray-500 mt-0.5">식단 인증일</p>
            <p className="text-[10px] text-orange-400 mt-0.5">+{d?.foodLogDays ?? 0} EXP</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <p className="text-2xl font-extrabold text-green-500">{d?.workoutLogDays ?? 0}</p>
            <p className="text-xs text-gray-500 mt-0.5">운동 인증일</p>
            <p className="text-[10px] text-green-400 mt-0.5">+{(d?.workoutLogDays ?? 0) * 2} EXP</p>
          </div>
          <div className="text-center p-3 bg-violet-50 rounded-xl">
            <p className="text-2xl font-extrabold text-violet-500">{d?.exp ?? 0}</p>
            <p className="text-xs text-gray-500 mt-0.5">총 EXP</p>
            <p className="text-[10px] text-violet-400 mt-0.5">Lv.{stage}</p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-xl">
            <p className="text-2xl font-extrabold text-blue-500">{d?.currentStreak ?? 0}</p>
            <p className="text-xs text-gray-500 mt-0.5">현재 스트릭</p>
            <p className="text-[10px] text-blue-400 mt-0.5">연속 식단 기록일</p>
          </div>
        </div>
      </div>
    </div>
  )
}
